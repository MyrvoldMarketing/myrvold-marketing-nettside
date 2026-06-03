import type { CSSProperties, ReactNode } from "react";

/* ===================================================================
 * Notch-M (concept 05) — refined, with correct lockup alignment.
 * /logo-samples
 * =================================================================== */

const LIME = "#dbff9c";
const INK = "#07100c";
const GREEN = "#2fae66";
const BLUE = "#2d6be4";

/* The mark — solid bars forming an "M" with a notch (concept 05). */
function Mark({
  color = LIME,
  className = "",
  style,
}: {
  color?: string;
  className?: string;
  style?: CSSProperties;
}) {
  // viewBox is tight to the path bounds (x 8→44, y 14→46) so the mark fills
  // its box with no empty padding — keeps it aligned with the wordmark.
  return (
    <svg viewBox="8 14 36 32" className={className} style={style} aria-hidden>
      <path
        d="M8 46 V14 H20 V26 L26 20 L32 26 V14 H44 V46 H34 V26 L26 33 L18 26 V46 Z"
        fill={color}
      />
    </svg>
  );
}

/* Horizontal lockup — mark inline with stacked wordmark, optically aligned. */
function LockupH({
  mark = LIME,
  top = "#ffffff",
  sub = LIME,
  size = 40,
}: {
  mark?: string;
  top?: string;
  sub?: string;
  size?: number;
}) {
  // wordmark scales off the mark height so the proportions stay locked
  const titlePx = size * 0.66;
  const subPx = size * 0.2;
  return (
    <div className="inline-flex items-center" style={{ gap: size * 0.28 }}>
      <Mark color={mark} style={{ height: size, width: "auto" }} />
      <div className="flex flex-col" style={{ lineHeight: 0.92 }}>
        <span
          className="display"
          style={{
            fontSize: titlePx,
            color: top,
            fontVariationSettings: '"wght" 820, "wdth" 72',
            letterSpacing: "0.01em",
          }}
        >
          Myrvold
        </span>
        <span
          style={{
            fontSize: subPx,
            color: sub,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.485em",
            textIndent: "0.485em",
            marginTop: size * 0.06,
          }}
        >
          Marketing
        </span>
      </div>
    </div>
  );
}

/* Vertical / stacked lockup — like the original (mark over wordmark). */
function LockupV({
  mark = LIME,
  top = "#ffffff",
  sub = LIME,
  size = 64,
}: {
  mark?: string;
  top?: string;
  sub?: string;
  size?: number;
}) {
  const titlePx = size * 0.42;
  const subPx = size * 0.16;
  return (
    <div className="inline-flex flex-col items-center" style={{ gap: size * 0.14 }}>
      <Mark color={mark} style={{ height: size, width: "auto" }} />
      <div className="flex flex-col items-center" style={{ lineHeight: 0.92 }}>
        <span
          className="display"
          style={{
            fontSize: titlePx,
            color: top,
            fontVariationSettings: '"wght" 820, "wdth" 72',
            letterSpacing: "0.02em",
          }}
        >
          Myrvold
        </span>
        <span
          style={{
            fontSize: subPx,
            color: sub,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.5em",
            textIndent: "0.5em",
          }}
        >
          Marketing
        </span>
      </div>
    </div>
  );
}

function Card({
  label,
  bg,
  border,
  children,
}: {
  label: string;
  bg: string;
  border?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="mb-2 text-xs font-medium text-muted">{label}</p>
      <div
        className={`flex min-h-[120px] items-center justify-center rounded-2xl p-6 ${
          border ? "border border-line" : ""
        }`}
        style={{ background: bg }}
      >
        {children}
      </div>
    </div>
  );
}

export default function LogoSamples() {
  return (
    <main className="min-h-screen bg-ink px-6 py-16 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow text-lime">Myrvold Marketing · konsept 05 — Notch-M</p>
        <h1
          className="display mt-3 text-[clamp(2rem,5vw,3.5rem)]"
          style={{ fontVariationSettings: '"wght" 820, "wdth" 70' }}
        >
          Logo — justert &amp; innrettet
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Symbolet er nå låst til teksten i en ryddig lockup (vannrett og
          stablet), med riktig optisk innretting. «MARKETING» er sperret slik at
          den flukter med bredden på «MYRVOLD», akkurat som i originalen. Under
          ser du fargevarianter for mørk, lys og enfarget bruk.
        </p>

        {/* PRIMARY */}
        <h2 className="eyebrow mt-14 text-lime">Primær — vannrett</h2>
        <div className="mt-4 grid gap-5 md:grid-cols-2">
          <Card label="På mørk (lime)" bg={INK} border>
            <LockupH mark={LIME} top="#ffffff" sub={LIME} size={56} />
          </Card>
          <Card label="På lys (heritage-grønn)" bg="#ffffff">
            <LockupH mark={GREEN} top={BLUE} sub={GREEN} size={56} />
          </Card>
        </div>

        {/* STACKED */}
        <h2 className="eyebrow mt-12 text-lime">Stablet — som originalen</h2>
        <div className="mt-4 grid gap-5 md:grid-cols-2">
          <Card label="På mørk" bg={INK} border>
            <LockupV mark={LIME} top="#ffffff" sub={LIME} size={72} />
          </Card>
          <Card label="På lys (heritage)" bg="#ffffff">
            <LockupV mark={GREEN} top={BLUE} sub={GREEN} size={72} />
          </Card>
        </div>

        {/* MONO + ICON */}
        <h2 className="eyebrow mt-12 text-lime">Enfarget &amp; ikon</h2>
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Card label="Hvit (mono, mørk bg)" bg={INK} border>
            <LockupH mark="#ffffff" top="#ffffff" sub="#ffffff" size={44} />
          </Card>
          <Card label="Sort (mono, lys bg)" bg="#ffffff">
            <LockupH mark={INK} top={INK} sub={INK} size={44} />
          </Card>
          <Card label="Favicon — lime flis" bg={INK} border>
            <div
              className="flex h-16 w-16 items-center justify-center rounded-2xl"
              style={{ background: LIME }}
            >
              <Mark color={INK} style={{ height: 34 }} />
            </div>
          </Card>
          <Card label="Ikon alene" bg={INK} border>
            <Mark color={LIME} style={{ height: 44 }} />
          </Card>
        </div>

        {/* NAV PREVIEW */}
        <h2 className="eyebrow mt-12 text-lime">I navigasjonen</h2>
        <div className="mt-4 flex items-center justify-between rounded-2xl border border-line bg-ink-2/70 px-6 py-4">
          <LockupH mark={LIME} top="#ffffff" sub={LIME} size={36} />
          <div className="hidden gap-8 text-sm text-paper/85 sm:flex">
            <span>Tjenester</span>
            <span>Prosjekter</span>
            <span>Kundene</span>
          </div>
          <span className="rounded-full bg-violet px-5 py-2 text-sm font-semibold uppercase tracking-wide text-white">
            Ta kontakt
          </span>
        </div>
      </div>
    </main>
  );
}
