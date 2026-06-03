"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import LeadForm from "../LeadForm";
import { Logo } from "../Logo";
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Check,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Star,
  Zap,
} from "lucide-react";

/* Reusable bits — duplicated from the landing page so the contact page
   stands on its own. Keep visual language identical. */

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.transitionDelay = `${delay}ms`;
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

function Stars() {
  return (
    <div className="flex gap-0.5 text-lime">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} className="h-4 w-4 fill-lime" />
      ))}
    </div>
  );
}

function GoogleWord() {
  return (
    <span className="text-lg font-bold leading-none">
      <span className="text-[#4285F4]">G</span>
      <span className="text-[#EA4335]">o</span>
      <span className="text-[#FBBC05]">o</span>
      <span className="text-[#4285F4]">g</span>
      <span className="text-[#34A853]">l</span>
      <span className="text-[#EA4335]">e</span>
    </span>
  );
}

const QUICK_TESTIMONIALS = [
  {
    name: "Elise S. Ulgaard",
    role: "Daglig leder",
    initial: "E",
    text: "Profesjonell, ærlig og leverte langt over forventning. Henvendelsene har økt.",
  },
  {
    name: "Tonje Vik",
    role: "Gründer",
    initial: "T",
    text: "Fantastisk god hjelp. Tok seg tid til å forstå bedriften — resultatene kom raskt.",
  },
  {
    name: "Fredrik Stensrød",
    role: "Butikkeier",
    initial: "F",
    text: "Knall kvalitet og service. Leverer som lovet og er super enkel å samarbeide med.",
  },
];

const TRUST_POINTS = [
  {
    icon: Clock,
    title: "Svar innen 24 timer",
    body: "Du hører fra meg personlig — ingen automatiske svar.",
  },
  {
    icon: ShieldCheck,
    title: "Ingen forpliktelser",
    body: "En uforpliktende prat. Du bestemmer om vi går videre.",
  },
  {
    icon: Zap,
    title: "Konkret og raskt",
    body: "Du får et tydelig forslag — ikke runde formuleringer.",
  },
];

const CONTACT_FAQS = [
  {
    q: "Hva skjer etter jeg sender skjemaet?",
    a: "Jeg ser på bedriften din og lager et personlig designforslag. Du får det tilsendt på e-post innen 1–2 virkedager — uten oppfølgingsmas.",
  },
  {
    q: "Koster det noe å ta kontakt?",
    a: "Nei. Førstesamtalen og designforslaget er 100 % gratis og uforpliktende.",
  },
  {
    q: "Hva om jeg ikke vet hva jeg trenger?",
    a: "Helt greit — det er derfor du tar kontakt. Vi går gjennom situasjonen din sammen, og jeg gir ærlige råd om hva som faktisk vil lønne seg.",
  },
  {
    q: "Jobber du med små bedrifter?",
    a: "Ja. Jeg jobber mest med små og mellomstore norske bedrifter som vil ha mer ut av nettsiden og annonseringen sin.",
  },
];

export default function KontaktPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="relative overflow-x-clip">
      {/* Minimal top bar — full nav hidden on the contact page to keep focus on the form. */}
      <div className="absolute inset-x-0 top-0 z-50">
        <div className="mx-auto flex max-w-[100rem] items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
          <Logo size={34} href="/" />
        </div>
      </div>

      {/* ===================== HERO + FORM (above-the-fold) ===================== */}
      <section className="relative isolate overflow-hidden bg-forest pt-24 sm:pt-32">
        {/* subtle glow */}
        <div className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[680px] w-[680px] -translate-x-1/2 glow-violet opacity-30" />
        <div className="pointer-events-none absolute -bottom-32 right-0 -z-10 h-[520px] w-[520px] glow-lime opacity-30" />

        <div className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 sm:pb-24">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-start lg:gap-16">
            {/* LEFT — value prop */}
            <div>
              <Reveal>
                <span className="eyebrow inline-flex items-center gap-2 rounded-full border border-line bg-ink-2/60 px-4 py-1.5 text-muted backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                  Ta kontakt
                </span>
              </Reveal>

              <Reveal delay={70}>
                <h1 className="display mt-8 text-[clamp(2.6rem,6vw,5.2rem)] text-paper">
                  La oss bygge
                  <br />
                  <span className="text-lime">noe som selger.</span>
                </h1>
              </Reveal>

              <Reveal delay={140}>
                <p className="mt-6 max-w-lg text-lg text-paper/80">
                  Fortell hva du trenger hjelp med — markedsføring, nettside,
                  eller begge. Du hører fra meg innen 24 timer. Uforpliktende og
                  helt gratis.
                </p>
              </Reveal>

              {/* trust strip */}
              <Reveal delay={210}>
                <ul className="mt-8 grid gap-3 sm:grid-cols-3">
                  {TRUST_POINTS.map((t) => (
                    <li
                      key={t.title}
                      className="rounded-2xl border border-line bg-ink-2/50 p-4 backdrop-blur"
                    >
                      <t.icon className="h-5 w-5 text-lime" />
                      <p className="mt-3 text-sm font-semibold text-paper">{t.title}</p>
                      <p className="mt-1 text-xs text-paper/60">{t.body}</p>
                    </li>
                  ))}
                </ul>
              </Reveal>

              {/* Google rating */}
              <Reveal delay={280}>
                <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-line bg-ink-2/60 px-4 py-3 backdrop-blur">
                  <GoogleWord />
                  <span className="h-6 w-px bg-line" />
                  <Stars />
                  <span className="text-sm font-bold">5.0</span>
                  <span className="h-6 w-px bg-line" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                    Topprangert tjeneste 2026
                  </span>
                </div>
              </Reveal>

              {/* alt contact */}
              <Reveal delay={340}>
                <div className="mt-10">
                  <p className="eyebrow text-paper/50">Foretrekker du direkte?</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <a
                      href="tel:+4747717879"
                      className="group inline-flex items-center gap-3 rounded-2xl border border-line bg-ink-2/60 px-4 py-3 transition-colors hover:border-lime"
                    >
                      <Phone className="h-4 w-4 text-lime" />
                      <span className="text-sm font-semibold text-paper">477 17 879</span>
                    </a>
                    <a
                      href="mailto:sebastian@myrvold.marketing"
                      className="group inline-flex items-center gap-3 rounded-2xl border border-line bg-ink-2/60 px-4 py-3 transition-colors hover:border-lime"
                    >
                      <Mail className="h-4 w-4 text-lime" />
                      <span className="text-sm font-semibold text-paper">
                        sebastian@myrvold.marketing
                      </span>
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* RIGHT — form */}
            <Reveal delay={120}>
              <div id="skjema" className="lg:sticky lg:top-28">
                <LeadForm variant="contact" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===================== SOCIAL PROOF ===================== */}
      <section className="bg-ink py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="eyebrow text-lime">Ekte ord fra ekte kunder</p>
                <h2 className="display mt-4 text-[clamp(2rem,4.5vw,3.2rem)] text-paper">
                  De stolte på meg først
                </h2>
              </div>
              <div className="inline-flex items-center gap-3 rounded-2xl border border-line bg-ink-2 px-4 py-3">
                <GoogleWord />
                <Stars />
                <span className="text-sm font-bold">5.0</span>
              </div>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {QUICK_TESTIMONIALS.map((r, i) => (
              <Reveal key={r.name} delay={i * 80}>
                <figure className="flex h-full flex-col rounded-3xl border border-line bg-ink-2 p-6">
                  <div className="flex items-center justify-between">
                    <Stars />
                    <span className="text-lg font-bold leading-none text-[#4285F4]">G</span>
                  </div>
                  <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-paper/90">
                    “{r.text}”
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-lime/15 text-sm font-bold text-lime">
                      {r.initial}
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-paper">{r.name}</span>
                      <span className="block text-xs text-muted">{r.role}</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== PROCESS PREVIEW ===================== */}
      <section className="bg-forest py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="eyebrow text-lime">Slik fungerer det</p>
            <h2 className="display mt-4 text-[clamp(2rem,4.5vw,3.2rem)] text-paper">
              Tre enkle steg
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              {
                n: "01",
                icon: MessageCircle,
                title: "Du tar kontakt",
                body: "Fyll ut skjemaet (tar 2 minutter) eller ring meg direkte.",
              },
              {
                n: "02",
                icon: Calendar,
                title: "Vi tar en kort prat",
                body: "En uforpliktende samtale der jeg blir kjent med bedriften din.",
              },
              {
                n: "03",
                icon: Check,
                title: "Du får et forslag",
                body: "Et skreddersydd designforslag og en konkret plan — uten salgspress.",
              },
            ].map((p, i) => (
              <Reveal key={p.n} delay={i * 80}>
                <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-ink-2/40 p-7 backdrop-blur">
                  <div className="flex items-center justify-between">
                    <span className="display text-3xl text-lime">{p.n}</span>
                    <p.icon className="h-6 w-6 text-paper/60" />
                  </div>
                  <h3 className="display mt-6 text-xl text-paper">{p.title}</h3>
                  <p className="mt-2 text-sm text-paper/70">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== FAQ — objection handling ===================== */}
      <section className="bg-ink py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <Reveal>
            <p className="eyebrow text-lime">Det folk lurer på</p>
            <h2 className="display mt-4 text-[clamp(2rem,4.5vw,3.2rem)] text-paper">
              Spørsmål før du tar kontakt
            </h2>
          </Reveal>

          <div className="mt-10">
            {CONTACT_FAQS.map((f, i) => {
              const open = openFaq === i;
              return (
                <Reveal key={f.q} delay={i * 60}>
                  <div className="border-b border-line">
                    <button
                      onClick={() => setOpenFaq(open ? null : i)}
                      className="flex w-full items-center justify-between gap-6 py-5 text-left"
                    >
                      <span className="text-lg font-semibold text-paper">{f.q}</span>
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line transition-all ${
                          open ? "rotate-45 bg-lime text-ink" : "text-lime"
                        }`}
                      >
                        +
                      </span>
                    </button>
                    <div
                      className={`grid transition-all duration-300 ease-out ${
                        open ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="text-muted">{f.a}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================== STICKY-FEEL CTA ===================== */}
      <section className="bg-forest py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">
          <Reveal>
            <h2 className="display text-[clamp(2.2rem,5.5vw,4.4rem)] text-paper">
              Klar for <span className="text-lime">flere kunder?</span>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mx-auto mt-6 max-w-xl text-lg text-paper/70">
              Det tar 2 minutter å fylle ut skjemaet. Du forplikter deg til
              ingenting.
            </p>
          </Reveal>
          <Reveal delay={160}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <a href="#skjema" className="group inline-flex items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-lime px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-ink transition-transform duration-200 group-hover:scale-[1.02]">
                  Ta kontakt nå
                </span>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-lime transition-transform duration-200 group-hover:rotate-45">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </a>
              <a
                href="tel:+4747717879"
                className="group inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-paper/90"
              >
                Eller ring 477 17 879
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-lime transition-all duration-200 group-hover:bg-lime group-hover:text-ink">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer className="border-t border-line bg-ink-2">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr_1fr]">
            <div>
              <Logo size={40} />
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">
                Jeg hjelper deg med å bygge en nettside som konverterer, og
                markedsføre den slik at potensielle kunder blir trofaste kunder.
              </p>
            </div>

            <div>
              <p className="eyebrow text-muted">Naviger</p>
              <ul className="mt-5 space-y-3 text-sm">
                <li>
                  <a href="/" className="text-paper/80 transition-colors hover:text-lime">
                    Forsiden
                  </a>
                </li>
                <li>
                  <a
                    href="/#tjenester"
                    className="text-paper/80 transition-colors hover:text-lime"
                  >
                    Tjenester
                  </a>
                </li>
                <li>
                  <a
                    href="/#prosjekter"
                    className="text-paper/80 transition-colors hover:text-lime"
                  >
                    Prosjekter
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="eyebrow text-muted">Ta kontakt</p>
              <ul className="mt-5 space-y-3 text-sm text-paper/80">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-lime" />
                  Thereses Gate 28C, 0168 Oslo
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-lime" />
                  <a href="mailto:sebastian@myrvold.marketing" className="hover:text-lime">
                    sebastian@myrvold.marketing
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-lime" />
                  <a href="tel:+4747717879" className="hover:text-lime">
                    477 17 879
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 text-xs text-muted sm:flex-row">
            <p>© {new Date().getFullYear()} Myrvold Marketing. Alle rettigheter reservert.</p>
            <p>Nettside, design og drift av Myrvold Marketing.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
