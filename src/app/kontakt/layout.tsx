import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ta kontakt — Myrvold Marketing | Få et gratis designforslag",
  description:
    "Få et skreddersydd designforslag på ny nettside — gratis og uforpliktende. Svar innen 24 timer. Ingen forpliktelser, ingen salgspress.",
  openGraph: {
    title: "Ta kontakt — Myrvold Marketing",
    description:
      "Få et skreddersydd designforslag på ny nettside — gratis og uforpliktende. Svar innen 24 timer.",
    type: "website",
    locale: "nb_NO",
  },
};

export default function KontaktLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
