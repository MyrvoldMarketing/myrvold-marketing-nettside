import nodemailer from "nodemailer";

export const runtime = "nodejs";

const EVENT_TYPE =
  "https://api.calendly.com/event_types/7a049681-d0cd-4c2a-95b5-ca50139015a0";

function fmtDT(iso: string) {
  return iso.replace(/[-:.]/g, "").replace(/\d{3}Z$/, "Z");
}

function makeICS(startTime: string, name: string, email: string, description: string) {
  const start = new Date(startTime);
  const end = new Date(start.getTime() + 30 * 60 * 1000);
  const uid = `${Date.now()}-myrvold@myrvold.marketing`;
  const now = fmtDT(new Date().toISOString());
  const desc = description.replace(/\n/g, "\\n").replace(/,/g, "\\,");

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Myrvold Marketing//NO",
    "CALSCALE:GREGORIAN",
    "METHOD:REQUEST",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${now}`,
    `DTSTART:${fmtDT(start.toISOString())}`,
    `DTEND:${fmtDT(end.toISOString())}`,
    `SUMMARY:Designforslag — ${name}`,
    `DESCRIPTION:${desc}`,
    `ORGANIZER;CN=Sebastian Myrvold:mailto:sebastian@myrvold.marketing`,
    `ATTENDEE;RSVP=TRUE;CN=${name}:mailto:${email}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export async function POST(req: Request) {
  const body = await req.json();
  const {
    startTime, name, email, phone,
    industry, siteType, inspirasjonslenker, hasWebsite, website,
  } = body;

  const token = process.env.CALENDLY_TOKEN;
  if (!token) return Response.json({ error: "no token" }, { status: 500 });

  // 1. Book møtet via Calendly API
  const calRes = await fetch("https://api.calendly.com/invitees", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      event_type: EVENT_TYPE,
      start_time: startTime,
      invitee: {
        name,
        email,
        timezone: "Europe/Oslo",
        ...(phone ? { text_reminder_number: phone } : {}),
      },
    }),
  });
  const calData = await calRes.json();
  if (!calRes.ok) {
    return Response.json(calData, { status: calRes.status });
  }

  // 2. Send e-post til Sebastian med .ics vedlegg
  try {
    const meetingDate = new Date(startTime).toLocaleString("nb-NO", {
      weekday: "long", day: "numeric", month: "long",
      hour: "2-digit", minute: "2-digit", timeZone: "Europe/Oslo",
    });

    const emailLines = [
      `=== NYTT DESIGNFORSLAG-MØTE ===`,
      ``,
      `Tid:        ${meetingDate}`,
      `Navn:       ${name}`,
      `E-post:     ${email}`,
      `Telefon:    ${phone || "(ikke oppgitt)"}`,
      ``,
      `Bedrift:    ${industry || "(ikke oppgitt)"}`,
      `Type:       ${siteType || "(ikke valgt)"}`,
      `Har nettside: ${hasWebsite || "(ikke svart)"}`,
      website ? `Nettside:   ${website}` : "",
      inspirasjonslenker ? `\nInspirasjon:\n${inspirasjonslenker}` : "",
    ].filter((l) => l !== undefined).join("\n");

    const icsContent = makeICS(startTime, name, email, emailLines);

    const smtpPass = process.env.SMTP_PASS;
    const host = process.env.SMTP_HOST ?? "localhost";
    const port = parseInt(process.env.SMTP_PORT ?? "465");
    const user = process.env.SMTP_USER ?? "sebastian@myrvold.marketing";
    const to = process.env.LEAD_TO ?? "sebastian@myrvold.marketing";

    const transporter = smtpPass
      ? nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass: smtpPass } })
      : nodemailer.createTransport({ host: "localhost", port: 25, secure: false, ignoreTLS: true });

    await transporter.sendMail({
      from: `"Myrvold Marketing" <${user}>`,
      to,
      replyTo: email,
      subject: `[MØTE BOOKET] ${name} — ${new Date(startTime).toLocaleDateString("nb-NO", { day: "numeric", month: "short", timeZone: "Europe/Oslo" })}`,
      text: emailLines,
      attachments: [
        {
          filename: "mote-myrvold.ics",
          content: icsContent,
          contentType: "text/calendar; method=REQUEST",
        },
      ],
    });
  } catch (err) {
    console.error("[book] e-post feilet:", JSON.stringify(err, Object.getOwnPropertyNames(err)));
    // Booking er OK selv om e-post feiler
  }

  return Response.json(calData);
}
