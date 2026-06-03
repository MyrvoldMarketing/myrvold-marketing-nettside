import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./SmoothScroll";

// Wide + heavy grotesque for display headlines (Druk-style, like the ref).
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Myrvold Marketing — Nettsider som selger. Annonser som virker.",
  description:
    "Jeg tetter hullene i din digitale salgstrakt, slik at du får mer igjen for hver krone du bruker på annonsering. Nettsider, Google Ads og Meta Ads for norske bedrifter.",
  openGraph: {
    title: "Myrvold Marketing — Nettsider som selger. Annonser som virker.",
    description:
      "Jeg tetter hullene i din digitale salgstrakt, slik at du får mer igjen for hver krone du bruker på annonsering.",
    type: "website",
    locale: "nb_NO",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nb" className={`${archivo.variable} ${inter.variable}`}>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
