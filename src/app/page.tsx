"use client";

import { useEffect, useRef, useState, type ComponentType, type ReactNode } from "react";
import HeroCollage from "./HeroCollage";
import LeadForm from "./LeadForm";
import { Logo } from "./Logo";
import {
  IconChart,
  IconFacebook,
  IconGlobe,
  IconPen,
  IconSearch,
  IconShop,
} from "./ServiceIcons";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Mail,
  MapPin,
  Megaphone,
  Menu,
  MousePointerClick,
  Phone,
  Plus,
  Star,
  Target,
  TrendingUp,
  X,
} from "lucide-react";

/* ----------------------------------------------------------------- *
 * Inline brand icons (not shipped in this lucide build)
 * ----------------------------------------------------------------- */
type IconProps = { className?: string };

function Facebook({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.9 3.78-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.9h-2.34V22c4.78-.79 8.43-4.94 8.43-9.94Z" />
    </svg>
  );
}

function Instagram({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

function Linkedin({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

function Youtube({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2C0 8.08 0 12 0 12s0 3.92.5 5.8a3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14C24 15.92 24 12 24 12s0-3.92-.5-5.8ZM9.6 15.57V8.43L15.82 12 9.6 15.57Z" />
    </svg>
  );
}

function Tiktok({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06Z" />
    </svg>
  );
}

/* ----------------------------------------------------------------- *
 * Scroll-reveal wrapper
 * ----------------------------------------------------------------- */
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

/* ----------------------------------------------------------------- *
 * Buttons (mprez vocabulary)
 * ----------------------------------------------------------------- */
function PillButton({
  children,
  href = "#kontakt",
  variant = "violet",
}: {
  children: ReactNode;
  href?: string;
  variant?: "violet" | "lime";
}) {
  const isViolet = variant === "violet";
  return (
    <a href={href} className="group inline-flex items-center gap-2">
      <span
        className={`inline-flex items-center rounded-full px-6 py-3.5 text-sm font-semibold uppercase tracking-wide transition-transform duration-200 group-hover:scale-[1.02] ${
          isViolet ? "bg-violet text-white" : "bg-lime text-ink"
        }`}
      >
        {children}
      </span>
      <span
        className={`flex h-12 w-12 items-center justify-center rounded-full transition-transform duration-200 group-hover:rotate-45 ${
          isViolet ? "bg-white text-ink" : "bg-ink text-lime"
        }`}
      >
        <ArrowUpRight className="h-5 w-5" />
      </span>
    </a>
  );
}

function ArrowLink({
  children,
  href = "#kontakt",
}: {
  children: ReactNode;
  href?: string;
}) {
  return (
    <a
      href={href}
      className="group inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-paper/90"
    >
      {children}
      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-lime transition-all duration-200 group-hover:bg-lime group-hover:text-ink">
        <ArrowRight className="h-4 w-4" />
      </span>
    </a>
  );
}

function CircleArrow() {
  return (
    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-paper/70 transition-all duration-200 group-hover:border-lime group-hover:bg-lime group-hover:text-ink">
      <ArrowUpRight className="h-4 w-4" />
    </span>
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

/* ----------------------------------------------------------------- *
 * Data
 * ----------------------------------------------------------------- */
const CLIENTS = [
  { src: "/logos/ocean-residences.svg", alt: "Ocean Residences" },
  { src: "/logos/nordic-roots.svg", alt: "Nordic Roots" },
  { src: "/logos/admiral-p.svg", alt: "Admiral P" },
  { src: "/logos/nettbutikk.svg", alt: "Nettbutikk" },
  { src: "/logos/smartshoes.svg", alt: "Smartshoes" },
];

const SERVICES: {
  icon: ComponentType<IconProps>;
  title: string;
  body: string;
}[] = [
  {
    icon: IconGlobe,
    title: "Nettsider som selger",
    body: "Fokus på salg, ikke bare pent design. Sider bygget for å gjøre besøkende om til kunder.",
  },
  {
    icon: IconSearch,
    title: "Google Ads",
    body: "Bli funnet av de som allerede er klare til å kjøpe — uten å sløse budsjettet på feil klikk.",
  },
  {
    icon: IconFacebook,
    title: "Facebook / Meta Ads",
    body: "Skap behov og synlighet hos folk som ennå ikke vet at de trenger deg.",
  },
  {
    icon: IconShop,
    title: "Nettbutikk",
    body: "Flere salg fra trafikken du allerede har, med en butikk som konverterer.",
  },
  {
    icon: IconChart,
    title: "Sporing & måling",
    body: "Full oversikt over hva annonsekronene faktisk gir tilbake — ingen synsing.",
  },
  {
    icon: IconPen,
    title: "Design & innhold",
    body: "Budskap, bilder og tekst som bygger tillit og får folk til å handle.",
  },
];

const FEATURES = [
  {
    eyebrow: "Nettsider",
    title: "En nettside som jobber som din beste selger",
    body: "Folk bestemmer seg på sekunder. Jeg bygger lynraske, mobilvennlige sider med et tydelig budskap og en klar vei til kontakt — så besøk blir til henvendelser, ikke bare trafikk.",
    cta: "Se hvordan jeg bygger",
    icon: MousePointerClick,
    stat: "+218%",
    statLabel: "flere henvendelser",
  },
  {
    eyebrow: "Annonsering",
    title: "Annonser som treffer kjøpsklare kunder",
    body: "Google Ads fanger de som søker akkurat nå. Meta Ads skaper behov hos de som ikke vet at de trenger deg ennå. Sammen gir de en jevn, forutsigbar strøm av nye kunder.",
    cta: "Se hvordan annonsering funker",
    icon: Target,
    stat: "3,4x",
    statLabel: "avkastning på annonser",
  },
  {
    eyebrow: "Én å forholde seg til",
    title: "Spar tid og slipp byrå-byråkrati",
    body: "Du snakker med meg — ikke fem mellomledd. Jeg tar meg av det tekniske, holder det jeg lover, og forklarer alt på vanlig norsk, så du kan bruke tiden på å drive bedriften.",
    cta: "Slik jobber jeg",
    icon: TrendingUp,
    stat: "1",
    statLabel: "fast kontaktperson",
  },
];

const PROCESS = [
  {
    n: "01",
    title: "Vi tar en hyggelig prat",
    body: "Ingen pushy salgssamtale. Vi snakker om bedriften din, målene dine og hvor pengene i dag forsvinner i salgstrakten.",
  },
  {
    n: "02",
    title: "Jeg legger en plan",
    body: "Du får en konkret plan for nettside og annonsering — hva vi gjør, hvorfor, og hva du kan forvente å få igjen for det.",
  },
  {
    n: "03",
    title: "Vi bygger og lanserer",
    body: "Jeg bygger nettsiden som selger og setter opp annonsene. Du slipper å løfte en finger.",
  },
  {
    n: "04",
    title: "Vi optimaliserer og vokser",
    body: "Lansering er starten, ikke slutten. Jeg følger tallene tett og justerer fortløpende.",
  },
];

const WORK = [
  { name: "Åsbekken maskin", tag: "Anleggsnettside", img: "/collage/aasbekken.webp" },
  { name: "Manneprat", tag: "Kampanje-landingsside", img: "/collage/manneprat.webp" },
  { name: "Smestadpsykologene", tag: "Psykologklinikk", img: "/collage/okklinikken.webp" },
  { name: "Hel Ved Panel", tag: "Nettbutikk", img: "/collage/helvedpanel.webp" },
  { name: "Flyt Elektro", tag: "Elektriker-nettside", img: "/collage/flytelektro.webp" },
  { name: "Strömstad Biltvätt", tag: "Biltvätt-nettside", img: "/collage/biltvatt.webp" },
];

const REVIEWS = [
  {
    name: "Elise S. Ulgaard",
    role: "Daglig leder",
    initial: "E",
    text: "Profesjonell, ærlig og leverte langt over forventning. Nettsiden ser proff ut og henvendelsene har økt.",
  },
  {
    name: "Tonje Vik",
    role: "Gründer",
    initial: "T",
    text: "Fantastisk god hjelp. Han tok seg tid til å forstå bedriften min og resultatene kom raskt.",
  },
  {
    name: "Hilde Vermedal",
    role: "Markedsansvarlig",
    initial: "H",
    text: "Kan sakene sine, er serviceinnstilt og forklarer på et vis som er lett å forstå — selv uten teknisk bakgrunn.",
  },
  {
    name: "Fredrik Stensrød",
    role: "Butikkeier",
    initial: "F",
    text: "Knall kvalitet og service. Leverer som lovet og er super enkel å samarbeide med.",
  },
  {
    name: "Eric Jones",
    role: "Selvstendig",
    initial: "E",
    text: "Kan virkelig faget sitt. Ærlige råd og resultater som faktisk syns på bunnlinjen.",
  },
  {
    name: "Diana Carlsson",
    role: "Daglig leder",
    initial: "D",
    text: "Superdyktig, raskt og pålitelig. Kan varmt anbefale til alle som vil ha flere kunder.",
  },
];

const FAQS = [
  {
    q: "Hva koster det å jobbe med deg?",
    a: "Det kommer an på hva du trenger. Jeg gir deg alltid en fast pris før vi starter — ingen skjulte kostnader. Book en uforpliktende prat, så får du et konkret tilbud.",
  },
  {
    q: "Er jeg låst til en lang kontrakt?",
    a: "Nei. Jeg beholder kunder fordi de er fornøyde, ikke fordi de er bundet. Du sitter ikke fast i lange bindingstider.",
  },
  {
    q: "Hvor fort vil jeg se resultater?",
    a: "Google Ads kan gi henvendelser allerede de første ukene. Meta Ads og SEO bygger seg opp over litt lengre tid. Jeg er alltid ærlig om hva du realistisk kan forvente.",
  },
  {
    q: "Hvor mye må jeg bruke i annonsebudsjett?",
    a: "Det avhenger av bransje og mål. Jeg hjelper deg å finne et budsjett som gir lønnsom vekst uten unødig risiko — og vi skrur opp når vi ser at det funker.",
  },
  {
    q: "Trenger jeg både Google, Meta og ny nettside?",
    a: "Ikke nødvendigvis. Vi starter der du får mest igjen for pengene. Jeg anbefaler kun det jeg mener faktisk vil lønne seg for deg.",
  },
  {
    q: "Hva om jeg ikke kan noe om teknologi?",
    a: "Helt greit — det er derfor du leier meg. Jeg tar meg av det tekniske og forklarer alt på vanlig norsk.",
  },
];

/* ----------------------------------------------------------------- *
 * Page
 * ----------------------------------------------------------------- */
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const nav = [
    { label: "Tjenester", href: "#tjenester" },
    { label: "Slik jobber jeg", href: "#prosess" },
    { label: "Prosjekter", href: "#prosjekter" },
    { label: "Kundene", href: "#kundene" },
    { label: "Spørsmål", href: "#faq" },
  ];

  return (
    <div className="relative overflow-x-clip">
      {/* ===================== NAV ===================== */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-[100rem] items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
          <Logo size={34} />

          <nav className="hidden items-center gap-9 lg:flex">
            {/* Tjenester med dropdown */}
            <div className="group relative">
              <a
                href="#tjenester"
                className="flex items-center gap-1 text-[15px] font-medium text-paper/85 transition-colors hover:text-lime"
              >
                Tjenester
                <svg className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>
              </a>
              <div className="pointer-events-none absolute left-0 top-full z-50 w-52 pt-2 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100 translate-y-1 group-hover:translate-y-0">
              <div className="rounded-2xl border border-line bg-ink-2 p-2 shadow-xl">
                <a
                  href="/nettside"
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-paper/85 transition-colors hover:bg-white/5 hover:text-lime"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-lime/10 text-lime text-xs">✦</span>
                  Ny nettside
                </a>
              </div>
              </div>
            </div>
            {nav.slice(1).map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-[15px] font-medium text-paper/85 transition-colors hover:text-lime"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <a
              href="#"
              className="hidden text-[15px] font-semibold tracking-wide text-paper/60 transition-colors hover:text-lime lg:inline"
            >
              EN
            </a>
            <a
              href="/kontakt"
              className="hidden rounded-full bg-violet px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition-transform hover:scale-105 sm:inline-flex"
            >
              Ta kontakt
            </a>
            <button
              aria-label="Meny"
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-paper lg:hidden"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-white/10 bg-ink/95 px-5 py-4 backdrop-blur-xl lg:hidden">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-xl px-4 py-3 text-base font-medium text-paper/90 hover:bg-white/5"
              >
                {n.label}
              </a>
            ))}
            <a
              href="/nettside"
              onClick={() => setMenuOpen(false)}
              className="block rounded-xl px-4 py-3 pl-8 text-sm font-medium text-lime hover:bg-white/5"
            >
              ✦ Ny nettside
            </a>
            <a
              href="/kontakt"
              onClick={() => setMenuOpen(false)}
              className="mt-2 block rounded-xl bg-violet px-4 py-3 text-center text-sm font-semibold uppercase tracking-wide text-white"
            >
              Ta kontakt
            </a>
          </div>
        )}
      </header>

      {/* ===================== HERO ===================== */}
      <section id="top" className="relative isolate overflow-hidden">
        <HeroCollage />

        <div className="mx-auto max-w-[96rem] px-5 pb-24 pt-44 text-center sm:px-8 sm:pt-56 lg:pb-32">
          <Reveal>
            <span className="eyebrow inline-flex items-center gap-2 rounded-full border border-line bg-ink-2/60 px-4 py-1.5 text-muted backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-lime" />
              Markedsføring og nettsider
            </span>
          </Reveal>

          <Reveal delay={70}>
            <div className="relative mt-8">
              {/* soft shadow behind the headline — darkest in the centre, fades out */}
              <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[150%] w-[125%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(4,7,18,0.92),rgba(4,7,18,0.45)_48%,transparent_78%)] blur-[6px]" />
              <h1
                className="display mx-auto max-w-none"
                style={{
                  fontSize: "clamp(2.75rem, 6vw, 6.25rem)",
                  lineHeight: 0.92,
                  fontVariationSettings: '"wght" 820, "wdth" 62',
                  fontStretch: "62%",
                  transform: "scaleY(1.24)",
                  transformOrigin: "center",
                }}
              >
                Nettsider som <span style={{ color: "#dbff9c" }}>selger.</span>
                <br />
                Annonser som <span style={{ color: "#dbff9c" }}>virker.</span>
              </h1>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <p className="mx-auto mt-9 max-w-xl text-lg" style={{ color: "#ffffff" }}>
              Jeg tetter hullene i din digitale salgstrakt, slik at du får mer
              igjen for hver krone du bruker på annonsering.
            </p>
          </Reveal>

          <Reveal delay={210}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <PillButton href="/kontakt">Book en hyggelig prat</PillButton>
            </div>
          </Reveal>

          <Reveal delay={280}>
            <div className="mt-10 inline-flex items-center gap-3 rounded-2xl border border-line bg-ink-2/60 px-4 py-3 backdrop-blur">
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
        </div>
      </section>

      {/* ===================== CLIENT MARQUEE ===================== */}
      <section aria-label="Kunder" className="border-y border-black/10 bg-lime py-6 text-ink">
        <div className="flex items-center">
          <div className="marquee-track items-center gap-14 sm:gap-20">
            {[...CLIENTS, ...CLIENTS].map((c, i) => (
              <span
                key={i}
                className="flex h-11 w-[165px] shrink-0 items-center justify-center sm:h-14 sm:w-[200px]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.src}
                  alt={c.alt}
                  className="max-h-full max-w-full object-contain"
                  draggable={false}
                />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== MISSION ===================== */}
      <section className="relative bg-forest py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="relative">
              <h2 className="display text-[clamp(2.6rem,8vw,6rem)] text-paper">
                Fra klikk <span className="text-lime">→</span> til
                <br />
                betalende <span className="text-lime">kunder.</span>
              </h2>
              <div className="pointer-events-none hidden absolute -top-10 right-8 w-28 -rotate-6 sm:block sm:-top-12 sm:right-12 sm:w-40 lg:right-24 lg:w-52">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/mascot-quote.webp" alt="" aria-hidden className="floaty w-full" />
              </div>
            </div>
          </Reveal>
          <div className="mt-14 grid items-center gap-10 border-t border-white/10 pt-12 lg:grid-cols-2 lg:gap-16">
            {/* photo */}
            <Reveal>
              <div className="relative">
                <div className="absolute -inset-4 -z-10 rounded-[2.25rem] bg-lime/10 blur-2xl" />
                <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.8)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/sebastian.webp"
                    alt="Sebastian Myrvold"
                    className="aspect-[4/3] w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute bottom-4 left-4 rounded-2xl border border-white/10 bg-ink/65 px-4 py-2.5 backdrop-blur">
                    <p className="text-sm font-semibold leading-tight text-paper">
                      Sebastian Myrvold
                    </p>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-lime">
                      Myrvold Marketing
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* text */}
            <Reveal delay={120}>
              <div className="space-y-6">
                <p className="eyebrow text-lime">Oppdraget mitt</p>
                <p className="text-xl text-paper/90">
                  Utvannet budskap, dårlig design eller annonser som blør penger
                  — det er disse hullene som dreper resultatene dine.
                </p>
                <p className="text-lg text-paper/65">
                  Jeg er én person du forholder deg til, ikke et stort byrå med
                  fem mellomledd. Jeg bygger nettsiden som selger og styrer
                  annonseringen som fyller den med riktige kunder — så du kan
                  bruke tiden din på å drive bedriften.
                </p>
                <ArrowLink href="#prosess">Slik jobber jeg</ArrowLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===================== SERVICES BENTO ===================== */}
      <section id="tjenester" className="bg-[#08080c] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="eyebrow text-lime">Mine tjenester</p>
            <div className="mt-4 grid items-end gap-6 md:grid-cols-2">
              <h2 className="display text-[clamp(2rem,5.5vw,4rem)]">
                En løsning for hver bedrift
              </h2>
              <p className="text-[#a2a7bb] md:pb-2">
                Brikkene som sammen bygger en salgstrakt som faktisk leverer. Du
                kan starte med én — eller la dem jobbe sammen.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={(i % 3) * 80}>
                <div className="group flex h-full flex-col rounded-3xl p-7 transition-colors duration-300 hover:bg-white/[0.04]">
                  <div className="flex items-start justify-between">
                    <s.icon className="h-16 w-16" />
                    <CircleArrow />
                  </div>
                  <h3 className="display mt-6 text-2xl">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#a2a7bb]">{s.body}</p>
                </div>
              </Reveal>
            ))}

            {/* indigo promo card */}
            <Reveal delay={120} className="sm:col-span-2 lg:col-span-3">
              <div className="flex h-full flex-col justify-between rounded-3xl bg-violet p-7 text-white sm:p-9">
                <div className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-center">
                  <div>
                    <Megaphone className="h-8 w-8" />
                    <h3 className="display mt-5 text-[clamp(1.6rem,3.5vw,2.6rem)]">
                      Jeg bygger det. Du høster kundene.
                    </h3>
                    <p className="mt-3 max-w-md text-white/80">
                      Usikker på hvor du skal starte? Få en gratis, ærlig
                      vurdering av nettsiden og annonseringen din — helt
                      uforpliktende.
                    </p>
                  </div>
                  <div className="md:justify-self-end">
                    <PillButton href="#kontakt" variant="lime">
                      Få en gratis vurdering
                    </PillButton>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===================== FEATURE ROWS ===================== */}
      <section className="bg-ink pb-8">
        <div className="mx-auto max-w-7xl space-y-5 px-5 sm:px-8">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={(i % 2) * 80}>
              <div
                className={`grid items-center gap-8 rounded-[2rem] border border-line bg-ink-2 p-8 sm:p-10 lg:grid-cols-2 ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* visual */}
                <div className="relative overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-forest-2 to-ink p-8">
                  <div className="absolute -right-10 -top-10 h-40 w-40 glow-lime opacity-50" />
                  <f.icon className="h-9 w-9 text-lime" />
                  <p className="display mt-8 text-[clamp(3rem,7vw,5rem)] text-lime">{f.stat}</p>
                  <p className="text-sm uppercase tracking-wider text-paper/70">{f.statLabel}</p>
                </div>
                {/* text */}
                <div>
                  <p className="eyebrow text-lime">{f.eyebrow}</p>
                  <h3 className="display mt-4 text-[clamp(1.8rem,3.6vw,2.8rem)]">{f.title}</h3>
                  <p className="mt-4 text-muted">{f.body}</p>
                  <div className="mt-7">
                    <ArrowLink href="#kontakt">{f.cta}</ArrowLink>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===================== BIG STATEMENT ===================== */}
      <section className="bg-ink py-24 text-center sm:py-32">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <Reveal>
            <p className="eyebrow text-lime">Min filosofi</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="display mx-auto mt-6 text-[clamp(2.2rem,6.5vw,5.4rem)]">
              En bra idé er greit.
              <br />
              En nettside som <span className="text-lime">selger</span> er bedre.
            </h2>
          </Reveal>
        </div>
      </section>

      {/* ===================== PROCESS / METHODOLOGY ===================== */}
      <section id="prosess" className="bg-forest py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* mock dashboard visual on lime */}
            <Reveal>
              <div className="relative rounded-[2rem] bg-lime p-6 sm:p-10">
                <div className="rounded-2xl border border-black/10 bg-ink shadow-2xl">
                  <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                    <span className="ml-3 text-[10px] uppercase tracking-wider text-white/40">
                      Resultater · siste 30 dager
                    </span>
                  </div>
                  <div className="space-y-4 p-5">
                    <div className="flex gap-3">
                      <div className="flex-1 rounded-xl border border-white/10 bg-ink-2 p-3">
                        <p className="display text-2xl text-lime">+218%</p>
                        <p className="text-[10px] uppercase tracking-wide text-white/50">Leads</p>
                      </div>
                      <div className="flex-1 rounded-xl border border-white/10 bg-ink-2 p-3">
                        <p className="display text-2xl text-lime">3,4x</p>
                        <p className="text-[10px] uppercase tracking-wide text-white/50">ROAS</p>
                      </div>
                      <div className="flex-1 rounded-xl border border-white/10 bg-ink-2 p-3">
                        <p className="display text-2xl text-lime">5.0</p>
                        <p className="text-[10px] uppercase tracking-wide text-white/50">Rating</p>
                      </div>
                    </div>
                    <div className="flex h-28 items-end gap-2 rounded-xl border border-white/10 bg-ink-2 p-3">
                      {[35, 50, 42, 65, 58, 78, 90].map((h, idx) => (
                        <div
                          key={idx}
                          className="flex-1 rounded-t bg-gradient-to-t from-lime/30 to-lime"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* numbered list */}
            <div>
              <Reveal>
                <p className="eyebrow text-lime">Slik jobber jeg</p>
                <h2 className="display mt-4 text-[clamp(2rem,4.5vw,3.4rem)] text-paper">
                  Enkelt for deg, fra start til vekst
                </h2>
              </Reveal>
              <div className="mt-8 divide-y divide-white/10 border-t border-white/10">
                {PROCESS.map((p, i) => (
                  <Reveal key={p.n} delay={i * 70}>
                    <div className="flex gap-5 py-5">
                      <span className="display text-3xl text-lime">{p.n}</span>
                      <div>
                        <h3 className="text-lg font-semibold text-paper">{p.title}</h3>
                        <p className="mt-1.5 text-sm text-paper/60">{p.body}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== PORTFOLIO ===================== */}
      <section id="prosjekter" className="bg-ink py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="eyebrow text-lime">Utvalgte prosjekter</p>
                <h2 className="display mt-4 text-[clamp(2rem,5vw,3.8rem)]">
                  Litt av det jeg har bygget
                </h2>
              </div>
              <ArrowLink href="#kontakt">Se alle prosjekter</ArrowLink>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WORK.map((w, i) => (
              <Reveal
                key={w.name}
                delay={(i % 4) * 70}
                className={i >= 4 ? "hidden sm:block" : ""}
              >
                <a
                  href="#kontakt"
                  className="group block h-full overflow-hidden rounded-3xl border border-line bg-ink-2"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={w.img}
                      alt={`${w.name} – nettside laget av Myrvold Marketing`}
                      className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                    <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-ink/60 text-paper backdrop-blur transition-colors group-hover:bg-lime group-hover:text-ink">
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3 p-5">
                    <h3 className="text-lg font-semibold">{w.name}</h3>
                    <p className="shrink-0 text-xs uppercase tracking-wider text-muted">{w.tag}</p>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== LEAD MAGNET ===================== */}
      <section id="kontakt" className="bg-forest py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <div>
                <p className="eyebrow text-lime">100 % gratis · 0 forpliktelser</p>
                <h2 className="display mt-5 text-[clamp(2.4rem,6vw,4.6rem)] text-paper">
                  Få et gratis
                  <br />
                  <span className="text-lime">designforslag?</span>
                </h2>
                <p className="mt-5 max-w-md text-paper/70">
                  Et skreddersydd designforslag på ny nettside for bedriften din
                  — uforpliktende, og helt gratis.
                </p>

                <ul className="mt-8 space-y-4">
                  {[
                    ["Skreddersydd", "Designet kun for din bedrift og bransje."],
                    ["Konkrete idéer", "Se hvordan nettsiden din kan selge mer."],
                    ["Ingen binding", "Du bestemmer om du vil gå videre."],
                  ].map(([t, d]) => (
                    <li key={t} className="flex gap-4">
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-lime text-ink">
                        <Check className="h-4 w-4" />
                      </span>
                      <p className="text-sm text-paper/90">
                        <span className="font-semibold text-paper">{t}:</span> {d}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <LeadForm />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===================== TESTIMONIALS ===================== */}
      <section id="kundene" className="bg-ink py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="eyebrow text-lime">Anmeldelser fra våre kunder</p>
                <h2 className="display mt-4 text-[clamp(2rem,5vw,3.8rem)]">
                  Tilbakemeldinger fra bedrifter
                </h2>
              </div>
              <div className="inline-flex items-center gap-3 rounded-2xl border border-line bg-ink-2 px-4 py-3">
                <GoogleWord />
                <Stars />
                <span className="text-sm font-bold">5.0</span>
              </div>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {REVIEWS.map((r, i) => (
              <Reveal key={r.name} delay={(i % 3) * 80}>
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

      {/* ===================== CTA BAND ===================== */}
      <section className="bg-forest py-24 sm:py-28">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-5 text-center sm:px-8">
          <Reveal>
            <h2 className="display text-[clamp(2.6rem,7.5vw,6rem)] text-paper">
              Book en <span className="text-lime">hyggelig</span>
              <br />
              prat <span className="text-lime">→</span> i dag.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="max-w-xl text-lg text-paper/70">
              Ingen pushy salgsprat. Bare en ærlig samtale om hvordan du kan få
              flere kunder fra nettsiden og annonsene dine.
            </p>
          </Reveal>
          <Reveal delay={160}>
            <PillButton href="mailto:sebastian@myrvold.marketing">
              Ta kontakt med Sebastian
            </PillButton>
          </Reveal>
        </div>
      </section>

      {/* ===================== FAQ ===================== */}
      <section id="faq" className="bg-ink py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="grid gap-6 md:grid-cols-2 md:items-end">
              <div>
                <p className="eyebrow text-lime">Ofte stilte spørsmål</p>
                <h2 className="display mt-4 text-[clamp(2rem,5vw,3.8rem)]">
                  Ærlige svar, ingen tåkeprat
                </h2>
              </div>
              <p className="text-muted md:pb-2">
                Lurer du på noe som ikke står her? Send meg en melding — jeg
                svarer ærlig, uten salgssnakk.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-x-12 md:grid-cols-2">
            {FAQS.map((f, i) => {
              const open = openFaq === i;
              return (
                <Reveal key={f.q} delay={(i % 2) * 60}>
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
                        <Plus className="h-4 w-4" />
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

      {/* ===================== FOOTER ===================== */}
      <footer className="border-t border-line bg-ink-2">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
            <div>
              <Logo size={40} />
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">
                Jeg hjelper deg med å bygge en nettside som konverterer, og
                markedsføre den slik at potensielle kunder blir trofaste kunder.
              </p>
              <div className="mt-6 flex gap-3">
                {[
                  { Icon: Facebook, href: "https://www.facebook.com/MyrvoldMarketing", label: "Facebook" },
                  { Icon: Instagram, href: "https://www.instagram.com/myrvoldmarketing/", label: "Instagram" },
                  { Icon: Tiktok, href: "https://www.tiktok.com/@myrvoldmarketing", label: "TikTok" },
                  { Icon: Youtube, href: "https://www.youtube.com/@MyrvoldMarketing", label: "YouTube" },
                ].map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-paper/70 transition-colors hover:border-lime hover:text-lime"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="eyebrow text-muted">Tjenester</p>
              <ul className="mt-5 space-y-3 text-sm">
                {["Ny nettside", "Google Ads", "Facebook / Meta Ads", "Nettbutikk"].map((t) => (
                  <li key={t}>
                    <a href="#tjenester" className="text-paper/80 transition-colors hover:text-lime">
                      {t}
                    </a>
                  </li>
                ))}
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

          <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 text-xs text-muted sm:flex-row">
            <p>© {new Date().getFullYear()} Myrvold Marketing. Alle rettigheter reservert.</p>
            <p>Nettside, design og drift av Myrvold Marketing.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
