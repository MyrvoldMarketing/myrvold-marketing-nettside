/* Lead-form endpoint for the "Få et gratis designforslag" 3-step form. */
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type Payload = {
  variant?: "design" | "contact";
  helpWith?: string;
  helpWithDetails?: string;
  hasWebsite?: string;
  runsAds?: string;
  website?: string;
  industry?: string;
  goal?: string;
  budget?: string;
  timeline?: string;
  siteType?: string;
  inspirasjonslenker?: string;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let data: Payload;
  try {
    data = (await req.json()) as Payload;
  } catch {
    return Response.json({ ok: false, error: "Ugyldig forespørsel." }, { status: 400 });
  }

  // Honeypot
  if ((data.company ?? "").trim() !== "") {
    return Response.json({ ok: true });
  }

  const helpWith = (data.helpWith ?? "").trim();
  const helpWithDetails = (data.helpWithDetails ?? "").trim();
  const hasWebsite = (data.hasWebsite ?? "").trim();
  const runsAds = (data.runsAds ?? "").trim();
  const website = (data.website ?? "").trim();
  const industry = (data.industry ?? "").trim();
  const goal = (data.goal ?? "").trim();
  const budget = (data.budget ?? "").trim();
  const timeline = (data.timeline ?? "").trim();
  const siteType = (data.siteType ?? "").trim();
  const inspirasjonslenker = (data.inspirasjonslenker ?? "").trim();
  const name = (data.name ?? "").trim();
  const email = (data.email ?? "").trim();
  const phone = (data.phone ?? "").trim();

  if (!name) {
    return Response.json({ ok: false, error: "Skriv inn navnet ditt." }, { status: 422 });
  }
  if (!email || !EMAIL_RE.test(email)) {
    return Response.json(
      { ok: false, error: "Skriv inn en gyldig e-postadresse." },
      { status: 422 },
    );
  }
  if (!industry) {
    return Response.json(
      { ok: false, error: "Fortell kort hva bedriften driver med." },
      { status: 422 },
    );
  }

  const isContact = (data.variant ?? "design") === "contact";
  const formLabel = isContact ? "TA KONTAKT" : "DESIGNFORSLAG";

  const to = process.env.LEAD_TO ?? "sebastian@myrvold.marketing";
  const fromAddress = process.env.LEAD_FROM ?? "sebastian@myrvold.marketing";
  const fromName = process.env.LEAD_FROM_NAME ?? "Myrvold Marketing";

  const subject = `[${formLabel}] ${industry || name}`;
  const text = [
    `=== ${formLabel} === myrvold.marketing`,
    "",
    `Navn:      ${name}`,
    `E-post:    ${email}`,
    `Telefon:   ${phone || "(ikke oppgitt)"}`,
    "",
    `Bedrift/bransje: ${industry}`,
    `Trenger hjelp m/:${helpWith ? ` ${helpWith}` : " (ikke valgt)"}`,
    helpWithDetails ? `Beskrivelse:\n${helpWithDetails}\n` : "",
    `Har nettside:    ${hasWebsite || "(ikke svart)"}`,
    `Annonserer i dag:${runsAds ? ` ${runsAds}` : " (ikke svart)"}`,
    `Nettside-URL:    ${website || "(ingen)"}`,
    "",
    siteType ? `Type:      ${siteType}` : "",
    inspirasjonslenker ? `Inspirasjon:\n${inspirasjonslenker}\n` : "",
    `Mål:       ${goal || "(ikke valgt)"}`,
    `Budsjett:  ${budget || "(ikke valgt)"}`,
    `Tidsplan:  ${timeline || "(ikke valgt)"}`,
    "",
  ].join("\n");

  try {
    // Bruker cPanel sin lokale Exim (port 25, ingen auth) som primær.
    // Fallback til SMTP med auth om SMTP_PASS er satt.
    const smtpPass = process.env.SMTP_PASS;
    const transporter = smtpPass
      ? nodemailer.createTransport({
          host: process.env.SMTP_HOST ?? "localhost",
          port: parseInt(process.env.SMTP_PORT ?? "587"),
          secure: parseInt(process.env.SMTP_PORT ?? "587") === 465,
          auth: { user: process.env.SMTP_USER ?? fromAddress, pass: smtpPass },
        })
      : nodemailer.createTransport({
          host: "localhost",
          port: 25,
          secure: false,
          ignoreTLS: true,
        });

    await transporter.sendMail({
      from: `"${fromName}" <${fromAddress}>`,
      to,
      replyTo: email,
      subject,
      text,
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[lead] send failed:", err);
    return Response.json(
      { ok: false, error: "Kunne ikke sende akkurat nå. Prøv igjen eller kontakt meg direkte." },
      { status: 502 },
    );
  }
}
