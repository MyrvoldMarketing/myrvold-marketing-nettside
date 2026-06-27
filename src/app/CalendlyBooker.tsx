"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Check, ChevronLeft, ChevronRight } from "lucide-react";

type Slot = { start_time: string; status: string };
type Stage = "dates" | "form" | "booking" | "confirmed";

const DAYS = ["Man", "Tir", "Ons", "Tor", "Fre"];
const MONTHS = [
  "januar", "februar", "mars", "april", "mai", "juni",
  "juli", "august", "september", "oktober", "november", "desember",
];

function mondayOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  d.setDate(d.getDate() - (day === 0 ? 6 : day - 1));
  d.setHours(0, 0, 0, 0);
  return d;
}

function addDays(date: Date, n: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

function fmtTime(iso: string) {
  return new Date(iso).toLocaleTimeString("nb-NO", {
    hour: "2-digit", minute: "2-digit", timeZone: "Europe/Oslo",
  });
}

function fmtDate(d: Date, opts?: Intl.DateTimeFormatOptions) {
  return d.toLocaleDateString("nb-NO", { timeZone: "Europe/Oslo", ...opts });
}

const inputCls =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-paper placeholder:text-paper/40 focus:border-lime focus:outline-none";

export function CalendlyBooker({ onBack }: { onBack: () => void }) {
  const [weekStart, setWeekStart] = useState<Date>(() => mondayOfWeek(new Date()));
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [stage, setStage] = useState<Stage>("dates");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [confirmedSlot, setConfirmedSlot] = useState("");

  useEffect(() => {
    setLoading(true);
    setSlots([]);
    const start = weekStart.toISOString();
    const end = addDays(weekStart, 7).toISOString();
    fetch(`/api/calendly/times?start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}`)
      .then((r) => r.json())
      .then((data) => {
        setSlots((data.collection ?? []).filter((s: Slot) => s.status === "available"));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [weekStart]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const weekDays = Array.from({ length: 5 }, (_, i) => addDays(weekStart, i));

  const monthLabel = (() => {
    const m0 = weekDays[0].getMonth(), m4 = weekDays[4].getMonth();
    const y = weekDays[4].getFullYear();
    return m0 === m4
      ? `${MONTHS[m0]} ${y}`
      : `${MONTHS[m0]} / ${MONTHS[m4]} ${y}`;
  })();

  const daySlots = selectedDate
    ? slots.filter((s) => sameDay(new Date(s.start_time), selectedDate))
    : [];

  async function book() {
    if (!name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Fyll inn navn og gyldig e-post.");
      return;
    }
    setError("");
    setStage("booking");
    try {
      const res = await fetch("/api/calendly/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ startTime: selectedSlot, name, email, phone }),
      });
      const data = await res.json();
      if (res.ok) {
        setConfirmedSlot(selectedSlot!);
        setStage("confirmed");
      } else {
        setError(data.message || data.error || "Noe gikk galt. Prøv igjen.");
        setStage("form");
      }
    } catch {
      setError("Nettverksfeil. Prøv igjen.");
      setStage("form");
    }
  }

  /* ── Bekreftet ── */
  if (stage === "confirmed") {
    const d = new Date(confirmedSlot);
    return (
      <div className="flex flex-col items-center gap-5 py-8 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-lime text-ink">
          <Check className="h-7 w-7" />
        </span>
        <div>
          <h3 className="display text-2xl text-paper">Møte booket!</h3>
          <p className="mt-2 text-sm font-semibold text-lime capitalize">
            {fmtDate(d, { weekday: "long", day: "numeric", month: "long" })} kl. {fmtTime(confirmedSlot)}
          </p>
          <p className="mt-1 text-sm text-paper/50">Du får en bekreftelse på e-post.</p>
        </div>
      </div>
    );
  }

  /* ── Skjema ── */
  if (stage === "form" || stage === "booking") {
    return (
      <div className="space-y-5">
        <div>
          <h3 className="display text-2xl text-paper">Dine detaljer</h3>
          <p className="mt-1 text-sm font-semibold text-lime capitalize">
            {fmtDate(new Date(selectedSlot!), { weekday: "long", day: "numeric", month: "long" })} kl.{" "}
            {fmtTime(selectedSlot!)}
          </p>
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-paper/60">Navn</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ola Nordmann" className={inputCls} />
        </div>
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-paper/60">E-post</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="navn@firma.no" className={inputCls} />
        </div>
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-paper/60">
            Telefon <span className="font-normal normal-case text-paper/40">(valgfritt)</span>
          </label>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+47 123 45 678" className={inputCls} />
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <div className="flex flex-col gap-3">
          <button
            onClick={book}
            disabled={stage === "booking"}
            className="flex w-full items-center justify-center rounded-xl bg-lime px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-ink transition-transform hover:scale-[1.02] disabled:opacity-70"
          >
            {stage === "booking" ? "Booker …" : "Book møte"}
          </button>
          <button
            onClick={() => setStage("dates")}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 px-5 py-3.5 text-sm font-semibold text-paper hover:border-white/30"
          >
            <ArrowLeft className="h-4 w-4" /> Endre tid
          </button>
        </div>
      </div>
    );
  }

  /* ── Datovelger ── */
  return (
    <div className="space-y-5">
      <div>
        <h3 className="display text-2xl text-paper">Book et møte</h3>
        <p className="mt-1.5 text-sm text-paper/60">Velg en tid — jeg viser deg forslaget på Google Meet.</p>
      </div>

      {/* Ukenavigasjon */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => { setWeekStart(addDays(weekStart, -7)); setSelectedDate(null); }}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-paper/60 hover:border-white/30 hover:text-paper"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-sm font-semibold capitalize text-paper">{monthLabel}</span>
        <button
          onClick={() => { setWeekStart(addDays(weekStart, 7)); setSelectedDate(null); }}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-paper/60 hover:border-white/30 hover:text-paper"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Dager */}
      <div className="grid grid-cols-5 gap-1.5">
        {weekDays.map((day, i) => {
          const hasSlots = slots.some((s) => sameDay(new Date(s.start_time), day));
          const isSelected = selectedDate && sameDay(day, selectedDate);
          const isPast = day < today;
          return (
            <button
              key={i}
              disabled={!hasSlots || isPast}
              onClick={() => setSelectedDate(day)}
              className={`flex flex-col items-center rounded-xl py-3 transition-colors ${
                isSelected
                  ? "bg-lime text-ink"
                  : hasSlots && !isPast
                  ? "border border-white/10 text-paper hover:border-lime hover:text-lime"
                  : "border border-white/5 cursor-not-allowed text-paper/20"
              }`}
            >
              <span className="text-[10px] font-bold uppercase tracking-wider">{DAYS[i]}</span>
              <span className="mt-1 text-lg font-bold leading-none">{day.getDate()}</span>
            </button>
          );
        })}
      </div>

      {/* Tidspunkter */}
      {loading && (
        <p className="text-center text-sm text-paper/40">Laster ledige tider …</p>
      )}

      {selectedDate && !loading && (
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-paper/60 capitalize">
            {fmtDate(selectedDate, { weekday: "long", day: "numeric", month: "long" })}
          </p>
          {daySlots.length === 0 ? (
            <p className="text-sm text-paper/40">Ingen ledige tider denne dagen.</p>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {daySlots.map((slot) => (
                <button
                  key={slot.start_time}
                  onClick={() => { setSelectedSlot(slot.start_time); setStage("form"); }}
                  className="rounded-xl border border-white/10 py-2.5 text-sm font-semibold text-paper transition-colors hover:border-lime hover:text-lime"
                >
                  {fmtTime(slot.start_time)}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <button
        onClick={onBack}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 px-5 py-3.5 text-sm font-semibold text-paper hover:border-white/30"
      >
        <ArrowLeft className="h-4 w-4" /> Tilbake
      </button>
    </div>
  );
}
