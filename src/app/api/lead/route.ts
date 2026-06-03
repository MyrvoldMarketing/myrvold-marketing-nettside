/* Lead-form endpoint for the "Få et gratis designforslag" 3-step form. */
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type Payload = {
  helpWith?: string;
  helpWithDetails?: string;
  hasWebsite?: string;
  runsAds?: string;
  website?: string;
  industry?: string;
  goal?: string;
  budget?: string;
  timeline?: string;
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

  const to = process.env.LEAD_TO ?? "sebastian@myrvold.marketing";
  const fromAddress = process.env.LEAD_FROM ?? "leads@myrvold.marketing";
  const fromName = process.env.LEAD_FROM_NAME ?? "Myrvold Marketing";

  const subject = `Nytt lead: ${industry || name}`;
  const text = [
    "Ny henvendelse fra myrvold.marketing",
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
    `Mål:       ${goal || "(ikke valgt)"}`,
    `Budsjett:  ${budget || "(ikke valgt)"}`,
    `Tidsplan:  ${timeline || "(ikke valgt)"}`,
    "",
  ].join("\n");

  // Nodemailer — bruker SMTP konfigurert via env-variabler (cPanel SMTP)
  const smtpHost = process.env.SMTP_HOST ?? "localhost";
  const smtpPort = parseInt(process.env.SMTP_PORT ?? "587");
  const smtpUser = process.env.SMTP_USER ?? fromAddress;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpPass) {
    // SMTP ikke konfigurert ennå — logg lead så den ikke går tapt
    console.info("[lead] SMTP_PASS ikke satt — logger lead:", {
      name, email, phone, industry, helpWith, goal, budget, timeline,
    });
    return Response.json({ ok: true, delivered: false });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass },
    });

    await transporter.sendMail({
      from: `"${fromName}" <${fromAddress}>`,
      to,
      replyTo: email,
      subject,
      text,
    });

    return Response.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[lead] send failed:", err);
    return Response.json(
      { ok: false, error: "Kunne ikke sende akkurat nå. Prøv igjen eller kontakt meg direkte." },
      { status: 502 },
    );
  }
}
