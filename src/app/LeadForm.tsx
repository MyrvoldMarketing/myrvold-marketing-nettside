"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";

type FormData = {
  helpWith: string;
  helpWithDetails: string;
  hasWebsite: "" | "ja" | "nei";
  website: string;
  runsAds: "" | "ja" | "nei";
  industry: string;
  goal: string;
  budget: string;
  timeline: string;
  siteType: "" | "nettside" | "nettbutikk";
  inspirasjonslenker: string;
  name: string;
  email: string;
  phone: string;
  company: string; // honeypot
};

const EMPTY: FormData = {
  helpWith: "",
  helpWithDetails: "",
  hasWebsite: "",
  website: "",
  runsAds: "",
  industry: "",
  goal: "",
  budget: "",
  timeline: "",
  siteType: "",
  inspirasjonslenker: "",
  name: "",
  email: "",
  phone: "",
  company: "",
};

const HELP_WITH = [
  "Markedsføring",
  "Nettsider",
  "Begge deler",
  "Annet",
];

const needsWebsite = (h: string) => h === "Nettsider" || h === "Begge deler";
const needsMarketing = (h: string) => h === "Markedsføring" || h === "Begge deler";
const isOther = (h: string) => h === "Annet";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-paper placeholder:text-paper/40 focus:border-lime focus:outline-none";

const GOALS_DEFAULT = [
  "Flere kunder og henvendelser",
  "Ny nettside fra bunnen",
  "Redesign / oppfriskning",
  "Nettbutikk / e-handel",
  "Annonsering (Google / Meta)",
  "Vet ikke helt — trenger råd",
];

const GOALS_MARKETING = [
  "Flere kunder via annonsering",
  "Skape mer synlighet og kjennskap",
  "Bedre avkastning (ROAS)",
  "Google Ads-hjelp",
  "Meta / Facebook Ads-hjelp",
  "Strategi og rådgivning",
];

const GOALS_WEBSITE = [
  "Ny nettside fra bunnen",
  "Redesign / oppfriskning",
  "Nettbutikk / e-handel",
  "Bedre konvertering",
  "Raskere / mer mobilvennlig",
  "Vet ikke — trenger råd",
];

const GOALS_BOTH = [
  "Flere kunder og henvendelser",
  "Ny nettside + annonsering",
  "Bedre konvertering på eksisterende side",
  "Skalere opp synligheten",
  "Full digital salgstrakt",
  "Strategi og rådgivning",
];

const BUDGETS = [
  "Under 15 000 kr",
  "15 000 – 30 000 kr",
  "30 000 – 60 000 kr",
  "60 000 kr +",
];

const TIMELINES = [
  "Så fort som mulig",
  "Innen 1–2 måneder",
  "Innen 3–6 måneder",
  "Bare utforsker",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type LeadFormVariant = "design" | "contact";

export default function LeadForm({ variant = "design" }: { variant?: LeadFormVariant } = {}) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(EMPTY);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const isContact = variant === "contact";
  const total = 3;

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  const goalsList = isContact
    ? isOther(data.helpWith)
      ? []
      : needsWebsite(data.helpWith) && needsMarketing(data.helpWith)
        ? GOALS_BOTH
        : needsMarketing(data.helpWith)
          ? GOALS_MARKETING
          : needsWebsite(data.helpWith)
            ? GOALS_WEBSITE
            : GOALS_DEFAULT
    : GOALS_DEFAULT;

  function validateStep(): string {
    if (step === 1) {
      if (isContact) {
        if (!data.helpWith) return "Velg hva du trenger hjelp med.";
        if (isOther(data.helpWith) && !data.helpWithDetails.trim())
          return "Beskriv kort hva du trenger hjelp med.";
        if (!data.industry.trim()) return "Fortell kort hva bedriften driver med.";
        if (needsWebsite(data.helpWith)) {
          if (!data.hasWebsite) return "Velg om du har en nettside i dag.";
          if (data.hasWebsite === "ja" && !data.website.trim())
            return "Skriv inn URL-en til nettsiden din.";
        }
        if (needsMarketing(data.helpWith) && !data.runsAds)
          return "Velg om du annonserer i dag.";
      } else {
        if (!data.hasWebsite) return "Velg om du har en nettside i dag.";
        if (data.hasWebsite === "ja" && !data.website.trim())
          return "Skriv inn URL-en til nettsiden din.";
        if (!data.industry.trim()) return "Fortell kort hva bedriften driver med.";
      }
    }
    if (step === 2) {
      if (!isContact) {
        if (!data.siteType) return "Velg nettside eller nettbutikk.";
      } else {
        if (goalsList.length > 0 && !data.goal) return "Velg hva du ønsker å oppnå.";
        if (!data.budget) return "Velg et omtrentlig budsjett.";
      }
    }
    if (step === 3 && isContact) {
      if (!data.budget) return "Velg et omtrentlig budsjett.";
      if (!data.name.trim()) return "Skriv inn navnet ditt.";
      if (!EMAIL_RE.test(data.email.trim())) return "Skriv inn en gyldig e-postadresse.";
    }
    return "";
  }

  async function next() {
    const v = validateStep();
    if (v) { setError(v); return; }
    setError("");

    // For design variant: fire-and-forget API call, then always advance to Calendly
    if (!isContact && step === 2) {
      fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, variant }),
      }).catch(() => {/* ignore — Calendly handles the booking */});
    }

    setStep((s) => Math.min(total, s + 1));
  }

  function back() {
    setError("");
    setStep((s) => Math.max(1, s - 1));
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const v = validateStep();
    if (v) {
      setError(v);
      return;
    }

    setStatus("submitting");
    setError("");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, variant }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setError(json.error || "Noe gikk galt. Prøv igjen.");
      }
    } catch {
      setStatus("error");
      setError("Nettverksfeil. Sjekk tilkoblingen og prøv igjen.");
    }
  }

  if (status === "success") {
    if (!isContact) {
      return (
        <div className="rounded-3xl border border-lime/30 bg-ink/60 p-7 backdrop-blur sm:p-9">
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-lime text-ink">
              <Check className="h-7 w-7" />
            </span>
            <h3 className="display text-2xl text-paper">Forespørselen er sendt!</h3>
            <p className="max-w-xs text-sm text-paper/70">
              Jeg lager designforslaget og sender det innen 3 virkedager. Book gjerne et møte for å få se det sammen.
            </p>
          </div>
          <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
            <iframe
              src="https://calendly.com/sebastian-myrvold/30min?hide_landing_page_details=1&hide_gdpr_banner=1&background_color=0a0f1e&text_color=f0ede6&primary_color=b3f000"
              width="100%"
              height="520"
              frameBorder="0"
              title="Book møte med Sebastian"
            />
          </div>
          <p className="mt-3 text-center text-xs text-paper/40">
            Tilgjengelig man–fre. Møtet holdes på Google Meet.
          </p>
        </div>
      );
    }
    return (
      <div className="rounded-3xl border border-lime/30 bg-ink/60 p-7 backdrop-blur sm:p-9">
        <div className="flex flex-col items-center gap-4 py-8 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-lime text-ink">
            <Check className="h-7 w-7" />
          </span>
          <h3 className="display text-2xl text-paper">Takk! Forespørselen er sendt.</h3>
          <p className="max-w-xs text-sm text-paper/70">
            Jeg ser på forespørselen din og tar kontakt innen 24 timer.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      noValidate
      className="rounded-3xl border border-white/10 bg-ink/60 p-7 backdrop-blur sm:p-9"
    >
      {/* progress */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-paper/60">
          Steg {step} av {total}
        </p>
        <div className="flex gap-1.5">
          {Array.from({ length: total }).map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-8 rounded-full transition-colors ${
                i < step ? "bg-lime" : "bg-white/10"
              }`}
            />
          ))}
        </div>
      </div>

      {/* STEP 1 — om bedriften / nettside */}
      {step === 1 && (
        <div className="space-y-5">
          <div>
            <h3 className="display text-2xl text-paper">
              {isContact ? "Hva trenger du hjelp med?" : "Om bedriften din"}
            </h3>
            <p className="mt-1.5 text-sm text-paper/60">
              {isContact
                ? "Velg det som passer best — vi tar detaljene i samtalen."
                : "La oss starte med å bli kjent."}
            </p>
          </div>

          {isContact && (
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-paper/60">
                Hva trenger du hjelp med?
              </label>
              <div className="grid gap-2 sm:grid-cols-2">
                {HELP_WITH.map((h) => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => update("helpWith", h)}
                    className={`rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                      data.helpWith === h
                        ? "border-lime bg-lime/10 text-lime"
                        : "border-white/10 bg-white/[0.03] text-paper hover:border-white/30"
                    }`}
                  >
                    {h}
                  </button>
                ))}
              </div>
            </div>
          )}

          {isContact && isOther(data.helpWith) && (
            <div>
              <label
                htmlFor="lead-help-details"
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-paper/60"
              >
                Fortell hva du trenger hjelp med
              </label>
              <textarea
                id="lead-help-details"
                rows={4}
                placeholder="Beskriv kort hva du ønsker hjelp med …"
                value={data.helpWithDetails}
                onChange={(e) => update("helpWithDetails", e.target.value)}
                className={inputClass}
              />
            </div>
          )}

          {(!isContact || needsWebsite(data.helpWith)) && (
            <>
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-paper/60">
                  Har du en nettside i dag?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(["ja", "nei"] as const).map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => update("hasWebsite", v)}
                      className={`rounded-xl border px-4 py-3 text-sm font-semibold capitalize transition-colors ${
                        data.hasWebsite === v
                          ? "border-lime bg-lime/10 text-lime"
                          : "border-white/10 bg-white/[0.03] text-paper hover:border-white/30"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {data.hasWebsite === "ja" && (
                <div>
                  <label
                    htmlFor="lead-website"
                    className="mb-2 block text-xs font-semibold uppercase tracking-wider text-paper/60"
                  >
                    URL til nettsiden
                  </label>
                  <input
                    id="lead-website"
                    type="text"
                    autoComplete="url"
                    placeholder="dittfirma.no"
                    value={data.website}
                    onChange={(e) => update("website", e.target.value)}
                    className={inputClass}
                  />
                </div>
              )}
            </>
          )}

          {isContact && needsMarketing(data.helpWith) && (
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-paper/60">
                Annonserer du i dag (Google / Meta)?
              </label>
              <div className="grid grid-cols-2 gap-3">
                {(["ja", "nei"] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => update("runsAds", v)}
                    className={`rounded-xl border px-4 py-3 text-sm font-semibold capitalize transition-colors ${
                      data.runsAds === v
                        ? "border-lime bg-lime/10 text-lime"
                        : "border-white/10 bg-white/[0.03] text-paper hover:border-white/30"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <label
              htmlFor="lead-industry"
              className="mb-2 block text-xs font-semibold uppercase tracking-wider text-paper/60"
            >
              Bedriftsnavn
            </label>
            <input
              id="lead-industry"
              type="text"
              placeholder="F.eks. Hansen Snekker AS"
              value={data.industry}
              onChange={(e) => update("industry", e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      )}

      {/* STEP 2 — design: nettside/nettbutikk + inspirasjon | contact: mål og budsjett */}
      {step === 2 && !isContact && (
        <div className="space-y-5">
          <div>
            <h3 className="display text-2xl text-paper">Hva skal vi lage?</h3>
            <p className="mt-1.5 text-sm text-paper/60">
              Fortell litt om hva du ser for deg.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-paper/60">
              Nettside eller nettbutikk?
            </label>
            <div className="grid grid-cols-2 gap-3">
              {(["nettside", "nettbutikk"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => update("siteType", v)}
                  className={`rounded-xl border px-4 py-3 text-sm font-semibold capitalize transition-colors ${
                    data.siteType === v
                      ? "border-lime bg-lime/10 text-lime"
                      : "border-white/10 bg-white/[0.03] text-paper hover:border-white/30"
                  }`}
                >
                  {v.charAt(0).toUpperCase() + v.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="lead-inspirasjon"
              className="mb-2 block text-xs font-semibold uppercase tracking-wider text-paper/60"
            >
              Er det en eller flere sider du liker i dag?{" "}
              <span className="text-paper/40 normal-case font-normal">(valgfritt)</span>
            </label>
            <textarea
              id="lead-inspirasjon"
              rows={4}
              placeholder={"Lim inn én eller flere lenker, én per linje:\nhttps://eksempel.no\nhttps://annenside.no"}
              value={data.inspirasjonslenker}
              onChange={(e) => update("inspirasjonslenker", e.target.value)}
              className={inputClass}
            />
            <p className="mt-1.5 text-xs text-paper/40">Fra konkurrent, inspirasjon eller andre nettsider du liker.</p>
          </div>
        </div>
      )}

      {step === 2 && isContact && (
        <div className="space-y-5">
          <div>
            <h3 className="display text-2xl text-paper">Mål og budsjett</h3>
            <p className="mt-1.5 text-sm text-paper/60">
              Så jeg kan tilpasse forslaget til dine behov.
            </p>
          </div>

          {goalsList.length > 0 && (
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-paper/60">
                Hva ønsker du å oppnå?
              </label>
              <div className="grid gap-2">
                {goalsList.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => update("goal", g)}
                    className={`rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                      data.goal === g
                        ? "border-lime bg-lime/10 text-lime"
                        : "border-white/10 bg-white/[0.03] text-paper hover:border-white/30"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-paper/60">
              Omtrentlig budsjett
            </label>
            <div className="grid gap-2 sm:grid-cols-2">
              {BUDGETS.map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => update("budget", b)}
                  className={`rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                    data.budget === b
                      ? "border-lime bg-lime/10 text-lime"
                      : "border-white/10 bg-white/[0.03] text-paper hover:border-white/30"
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-paper/60">
              Når ønsker du å komme i gang?
            </label>
            <div className="grid gap-2 sm:grid-cols-2">
              {TIMELINES.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => update("timeline", t)}
                  className={`rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                    data.timeline === t
                      ? "border-lime bg-lime/10 text-lime"
                      : "border-white/10 bg-white/[0.03] text-paper hover:border-white/30"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* STEP 3 — design: Calendly | contact: kontaktinfo */}
      {step === 3 && !isContact && (
        <div className="space-y-4">
          <div>
            <h3 className="display text-2xl text-paper">Book et møte</h3>
            <p className="mt-1.5 text-sm text-paper/60">
              Velg en tid — jeg viser deg forslaget på Google Meet.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <iframe
              src="https://calendly.com/sebastian-myrvold/30min?hide_landing_page_details=1&hide_gdpr_banner=1&background_color=0a0f1e&text_color=f0ede6&primary_color=b3f000"
              width="100%"
              height="520"
              frameBorder="0"
              title="Book møte med Sebastian"
            />
          </div>
        </div>
      )}

      {step === 3 && isContact && (
        <div className="space-y-5">
          <div>
            <h3 className="display text-2xl text-paper">Hvor sender jeg forslaget?</h3>
            <p className="mt-1.5 text-sm text-paper/60">
              Jeg ser på forespørselen din og tar kontakt innen 24 timer.
            </p>
          </div>

          <div>
            <label
              htmlFor="lead-name"
              className="mb-2 block text-xs font-semibold uppercase tracking-wider text-paper/60"
            >
              Navn
            </label>
            <input
              id="lead-name"
              type="text"
              autoComplete="name"
              placeholder="Ola Nordmann"
              value={data.name}
              onChange={(e) => update("name", e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="lead-email"
              className="mb-2 block text-xs font-semibold uppercase tracking-wider text-paper/60"
            >
              E-post
            </label>
            <input
              id="lead-email"
              type="email"
              autoComplete="email"
              placeholder="navn@firma.no"
              value={data.email}
              onChange={(e) => update("email", e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="lead-phone"
              className="mb-2 block text-xs font-semibold uppercase tracking-wider text-paper/60"
            >
              Telefon <span className="text-paper/40">(valgfritt)</span>
            </label>
            <input
              id="lead-phone"
              type="tel"
              autoComplete="tel"
              placeholder="+47 123 45 678"
              value={data.phone}
              onChange={(e) => update("phone", e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      )}

      {/* Honeypot — must stay empty; bots fill it */}
      <input
        type="text"
        name="_hp"
        value={data.company}
        onChange={(e) => update("company", e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ display: "none" }}
      />

      {error && (
        <p role="alert" className="mt-4 text-sm text-red-400">
          {error}
        </p>
      )}

      {/* nav buttons — skjules på steg 3 for design (Calendly tar over) */}
      {!(step === total && !isContact) && (
        <div className="mt-7 flex flex-col gap-3">
          {step < total && (
            <button
              type="button"
              onClick={next}
              disabled={status === "submitting"}
              className="group flex w-full items-center justify-center gap-3 rounded-xl bg-violet px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "submitting" ? "Sender …" : "Neste"}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          )}

          {step === total && isContact && (
            <button
              type="submit"
              disabled={status === "submitting"}
              className="group flex w-full items-center justify-center gap-3 rounded-xl bg-violet px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "submitting" ? "Sender …" : "Send forespørsel"}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          )}

          {step > 1 && (
            <button
              type="button"
              onClick={back}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 px-5 py-3.5 text-sm font-semibold text-paper transition-colors hover:border-white/30"
            >
              <ArrowLeft className="h-4 w-4" />
              Tilbake
            </button>
          )}
        </div>
      )}

      <p className="mt-4 text-center text-xs text-paper/50">
        Ingen spam, ingen forpliktelser. Helt gratis.
      </p>
    </form>
  );
}
