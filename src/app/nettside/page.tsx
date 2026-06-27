"use client";

import { useRef, useEffect, type ReactNode } from "react";
import LeadForm from "../LeadForm";
import { Logo } from "../Logo";
import { Check } from "lucide-react";

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

function TiktokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06Z" />
    </svg>
  );
}

export default function NettsidenPage() {
  return (
    <div className="relative overflow-x-clip">
      {/* NAV */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-[100rem] items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
          <Logo size={34} href="/" />
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

      {/* HERO + FORM */}
      <section className="bg-forest pt-36 pb-24 sm:pt-44 sm:pb-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <p className="eyebrow text-lime">100 % gratis · 0 forpliktelser</p>
              <h1 className="display mt-5 text-[clamp(2.8rem,6vw,4.8rem)] text-paper leading-none">
                Få et gratis<br />
                <span className="text-lime">designforslag</span>
              </h1>
              <p className="mt-6 max-w-md text-paper/70">
                Et skreddersydd designforslag på ny nettside eller nettbutikk for bedriften din — uforpliktende, og helt gratis. Book deretter et møte for å få se det med Sebastian.
              </p>
              <ul className="mt-8 space-y-3">
                {[
                  "Skreddersydd din bedrift",
                  "Ferdig innen 3 virkedager",
                  "Book møte for å få se forslaget",
                  "Liker du det? Vi prater pris. Liker du det ikke? Du betaler ingenting.",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-3 text-sm text-paper/80">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-lime text-ink">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={120}>
              <LeadForm />
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-ink py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <Logo size={32} />
              <p className="mt-4 max-w-xs text-sm text-paper/55">
                Jeg hjelper deg med å bygge en nettside som konverterer, og
                markedsføre den slik at potensielle kunder blir trofaste kunder.
              </p>
              <div className="mt-6 flex gap-3">
                {[
                  { Icon: ({ className }: { className?: string }) => <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>, href: "https://www.facebook.com/MyrvoldMarketing", label: "Facebook" },
                  { Icon: ({ className }: { className?: string }) => <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>, href: "https://www.instagram.com/myrvoldmarketing/", label: "Instagram" },
                  { Icon: TiktokIcon, href: "https://www.tiktok.com/@myrvoldmarketing", label: "TikTok" },
                  { Icon: ({ className }: { className?: string }) => <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden><path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2C0 8.08 0 12 0 12s0 3.92.5 5.8a3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14C24 15.92 24 12 24 12s0-3.92-.5-5.8ZM9.6 15.57V8.43L15.82 12 9.6 15.57Z"/></svg>, href: "https://www.youtube.com/@MyrvoldMarketing", label: "YouTube" },
                ].map(({ Icon, href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-paper/70 transition-colors hover:border-lime hover:text-lime">
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="eyebrow text-muted">Tjenester</p>
              <ul className="mt-5 space-y-3 text-sm">
                {["Ny nettside", "Google Ads", "Facebook / Meta Ads", "Nettbutikk"].map((t) => (
                  <li key={t}><a href="/#tjenester" className="text-paper/80 transition-colors hover:text-lime">{t}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow text-muted">Lenker</p>
              <ul className="mt-5 space-y-3 text-sm">
                {[
                  { label: "Forsiden", href: "/" },
                  { label: "Prosjekter", href: "/#prosjekter" },
                  { label: "Kontakt", href: "/kontakt" },
                  { label: "Gratis designforslag", href: "/nettside" },
                ].map((l) => (
                  <li key={l.label}><a href={l.href} className="text-paper/80 transition-colors hover:text-lime">{l.label}</a></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-line pt-8 flex flex-wrap items-center justify-between gap-4 text-xs text-paper/40">
            <p>© {new Date().getFullYear()} Myrvold Marketing. Alle rettigheter forbeholdt.</p>
            <p>sebastian@myrvold.marketing</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
