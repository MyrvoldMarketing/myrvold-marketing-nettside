"use client";

import { useRef, useEffect, type ReactNode } from "react";
import LeadForm from "../LeadForm";
import { Logo } from "../Logo";
import { Check, ArrowRight } from "lucide-react";

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
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add("revealed"), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className={`reveal-wrap ${className}`}>
      {children}
    </div>
  );
}

export default function NettsidenPage() {
  return (
    <div className="relative overflow-x-clip">
      {/* NAV */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-[100rem] items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
          <a href="/"><Logo size={34} /></a>
          <nav className="hidden items-center gap-9 lg:flex">
            <a href="/#tjenester" className="text-[15px] font-medium text-paper/85 transition-colors hover:text-lime">Tjenester</a>
            <a href="/#prosess" className="text-[15px] font-medium text-paper/85 transition-colors hover:text-lime">Slik jobber jeg</a>
            <a href="/#prosjekter" className="text-[15px] font-medium text-paper/85 transition-colors hover:text-lime">Prosjekter</a>
            <a href="/#kundene" className="text-[15px] font-medium text-paper/85 transition-colors hover:text-lime">Kundene</a>
            <a href="/#faq" className="text-[15px] font-medium text-paper/85 transition-colors hover:text-lime">Spørsmål</a>
          </nav>
          <a
            href="/kontakt"
            className="hidden rounded-full bg-violet px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition-transform hover:scale-105 sm:inline-flex"
          >
            Ta kontakt
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="bg-ink pt-40 pb-24 sm:pt-48 sm:pb-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="eyebrow text-lime">100 % gratis · 0 forpliktelser</p>
            <h1 className="display mt-5 text-[clamp(2.8rem,7vw,5.5rem)] text-paper leading-none">
              Få et gratis<br />
              <span className="text-lime">designforslag</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-paper/70">
              Et skreddersydd designforslag på ny nettside for bedriften din — uforpliktende, og helt gratis. Du får det tilsendt på e-post innen 1–2 virkedager.
            </p>
            <ul className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-8">
              {[
                "Skreddersydd din bedrift",
                "Ferdig innen 1–2 virkedager",
                "Ingen binding",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2 text-sm text-paper/80">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lime text-ink">
                    <Check className="h-3 w-3" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* FORM */}
      <section className="bg-forest py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <Reveal>
              <h2 className="display text-[clamp(2rem,4vw,3.2rem)] text-paper">
                Hva skjer når<br />du sender inn?
              </h2>
              <ol className="mt-8 space-y-6">
                {[
                  ["Jeg ser på bedriften din", "Jeg undersøker din bransje, konkurrenter og nåværende nettside."],
                  ["Du får designforslaget", "Et personlig designforslag sendes på e-post innen 1–2 virkedager."],
                  ["Du bestemmer selv", "Ingen masing, ingen binding — du tar kontakt om du vil gå videre."],
                ].map(([title, desc], i) => (
                  <li key={i} className="flex gap-5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-lime text-ink font-bold text-sm">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-paper">{title}</p>
                      <p className="mt-1 text-sm text-paper/70">{desc}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-10 rounded-2xl border border-white/10 bg-ink/40 p-6">
                <p className="text-sm font-semibold text-lime uppercase tracking-wider">Tidligere kunder sier</p>
                <blockquote className="mt-3 text-paper/80 italic">
                  "Profesjonell, ærlig og leverte langt over forventning. Nettsiden ser proff ut og henvendelsene har økt."
                </blockquote>
                <p className="mt-2 text-xs text-paper/50">— Elise S. Ulgaard, Daglig leder</p>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <LeadForm />
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-ink border-t border-line py-10 text-center text-sm text-paper/40">
        <p>© {new Date().getFullYear()} Myrvold Marketing</p>
        <div className="mt-3 flex justify-center gap-6">
          <a href="/" className="hover:text-lime transition-colors">Hjem</a>
          <a href="/kontakt" className="hover:text-lime transition-colors">Kontakt</a>
        </div>
      </footer>
    </div>
  );
}
