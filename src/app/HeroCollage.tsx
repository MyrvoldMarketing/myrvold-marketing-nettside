"use client";

/* ----------------------------------------------------------------- *
 * HeroCollage — a wall of real website screenshots tilted into TRUE
 * 3D perspective (parent `perspective` + child rotateX/Y/Z) so the
 * field recedes into the distance with real depth. Tiles stay LARGE
 * and bright (like the mprez reference); darkening is a soft centre
 * vignette so the corner tiles keep their colour. Columns scroll.
 * ----------------------------------------------------------------- */

const SHOTS = [
  "/collage/ekelund.jpg?v=2",
  "/collage/helvedpanel.jpg?v=2",
  "/collage/ents.jpg?v=2",
  "/collage/manneprat.jpg?v=2",
  "/collage/haldentaxi.jpg?v=2",
  "/collage/okklinikken.png",
  "/collage/adpoint.png",
  "/collage/helvedpanel2.png",
  "/collage/proline.png",
  "/collage/nordicroots.png",
  "/collage/flytelektro.png",
  "/collage/aasbekken.png",
  "/collage/marinservice.png",
  "/collage/biltvatt.png",
  "/collage/nettbutikk.png",
  "/collage/camping.png",
];

const COL_COUNT = 5;
const PER_COL = 9;

// One config per column: scroll speed, direction, and a vertical order
// of shots offset per column so neighbours never repeat.
const COLUMNS = Array.from({ length: COL_COUNT }, (_, i) => ({
  dur: `${58 + ((i * 9) % 24)}s`,
  reverse: i % 2 === 1,
  order: Array.from({ length: PER_COL }, (_, j) => (i * 2 + j * 3) % SHOTS.length),
}));

function SiteShot({ src }: { src: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-ink-2 shadow-[0_22px_46px_-18px_rgba(0,0,0,0.85)]">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="ml-2 h-1.5 w-14 rounded bg-white/10" />
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        aria-hidden
        draggable={false}
        loading="eager"
        className="block h-auto w-full"
      />
    </div>
  );
}

export default function HeroCollage() {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-[#070e24]"
      style={{ perspective: "2300px", perspectiveOrigin: "58% 30%" }}
    >
      {/* 3D-tilted wall: grid mapped onto a receding plane.
          A long perspective keeps the lean UNIFORM across every row
          (no fanning); scale() pulls it in close. */}
      <div
        className="absolute left-1/2 top-1/2 flex gap-4"
        style={{
          width: "2200px",
          height: "1600px",
          transform:
            "translate(-40%, -50%) rotateX(30deg) rotateY(-11deg) rotateZ(24deg) scale(1.32)",
        }}
      >
        {COLUMNS.map((col, ci) => (
          <div key={ci} className="flex-1 overflow-hidden">
            <div
              className={`col-track ${col.reverse ? "reverse" : ""}`}
              style={{ ["--dur" as string]: col.dur }}
            >
              {[...col.order, ...col.order].map((s, i) => (
                <SiteShot key={i} src={SHOTS[s]} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* soft midnight-blue filter over the whole wall (like the ref) */}
      <div className="absolute inset-0 bg-[#16265f] opacity-[0.12] mix-blend-multiply" />
      <div className="absolute inset-0 bg-[#22356f] opacity-[0.05]" />
      {/* soft darkening — focused behind the text, corners stay brighter */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#070e24]/60 via-transparent to-[#070e24]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_58%_46%_at_50%_46%,rgba(7,13,38,0.82),rgba(7,13,38,0.08)_78%)]" />
      <div className="absolute -top-32 left-1/2 h-[680px] w-[680px] -translate-x-1/2 glow-violet opacity-30" />
    </div>
  );
}
