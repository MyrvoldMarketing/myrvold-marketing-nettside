export const runtime = "nodejs";

const EVENT_TYPE =
  "https://api.calendly.com/event_types/7a049681-d0cd-4c2a-95b5-ca50139015a0";

export async function POST(req: Request) {
  const { startTime, name, email, phone } = await req.json();
  const token = process.env.CALENDLY_TOKEN;
  if (!token) return Response.json({ error: "no token" }, { status: 500 });

  const res = await fetch("https://api.calendly.com/invitees", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
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
  const data = await res.json();
  return Response.json(data, { status: res.ok ? 200 : res.status });
}
