export const runtime = "nodejs";

const EVENT_TYPE =
  "https://api.calendly.com/event_types/7a049681-d0cd-4c2a-95b5-ca50139015a0";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const start = searchParams.get("start");
  const end = searchParams.get("end");
  if (!start || !end)
    return Response.json({ error: "start and end required" }, { status: 400 });

  const token = process.env.CALENDLY_TOKEN;
  if (!token) return Response.json({ error: "no token" }, { status: 500 });

  const res = await fetch(
    `https://api.calendly.com/event_type_available_times?event_type=${encodeURIComponent(EVENT_TYPE)}&start_time=${encodeURIComponent(start)}&end_time=${encodeURIComponent(end)}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  const data = await res.json();
  return Response.json(data, { status: res.ok ? 200 : res.status });
}
