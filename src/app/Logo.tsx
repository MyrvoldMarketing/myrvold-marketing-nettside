import type { CSSProperties } from "react";

const LIME = "#dbff9c";

/* The Notch-M mark. viewBox is tight to the path bounds (x 8→44, y 14→46)
   so it always aligns flush with the wordmark. */
export function LogoMark({
  color = LIME,
  className = "",
  style,
}: {
  color?: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg viewBox="8 14 36 32" className={className} style={style} aria-hidden focusable="false">
      <path
        d="M8 46 V14 H20 V26 L26 20 L32 26 V14 H44 V46 H34 V26 L26 33 L18 26 V46 Z"
        fill={color}
      />
    </svg>
  );
}

/* Full horizontal lockup: mark + "MYRVOLD / MARKETING", optically aligned.
   Sizes derive from `size` (the mark height in px) so proportions stay locked. */
export function Logo({
  size = 36,
  mark = LIME,
  top = "#ffffff",
  sub = LIME,
  href = "#top",
  className = "",
}: {
  size?: number;
  mark?: string;
  top?: string;
  sub?: string;
  href?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      aria-label="Myrvold Marketing"
      className={`inline-flex items-center ${className}`}
      style={{ gap: size * 0.28 }}
    >
      <LogoMark color={mark} style={{ height: size, width: "auto" }} />
      <span className="flex flex-col" style={{ lineHeight: 0.92 }}>
        <span
          className="display"
          style={{
            fontSize: size * 0.66,
            color: top,
            fontVariationSettings: '"wght" 820, "wdth" 72',
            letterSpacing: "0.01em",
          }}
        >
          Myrvold
        </span>
        <span
          style={{
            fontSize: size * 0.2,
            color: sub,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.485em",
            textIndent: "0.485em",
            marginTop: size * 0.05,
          }}
        >
          Marketing
        </span>
      </span>
    </a>
  );
}
