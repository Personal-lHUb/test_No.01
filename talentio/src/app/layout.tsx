import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TALENTIO — Il Network AI per Professionisti Tech Italiani",
  description:
    "TALENTIO connette freelance, P.IVA e agenzie tech con le PMI giuste — in 24 ore. AI matching, revenue sharing, contratti automatizzati.",
  keywords: [
    "freelance tech italia",
    "p.iva digitale",
    "marketplace freelance",
    "ai matching professionisti",
    "lavoro digitale pmi",
  ],
  openGraph: {
    title: "TALENTIO — Il Network AI per Professionisti Tech",
    description:
      "Matching automatico in 24h. Revenue sharing. Business intelligence. Zero burocrazia.",
    type: "website",
    locale: "it_IT",
  },
  twitter: {
    card: "summary_large_image",
    title: "TALENTIO — Il Network AI per Professionisti Tech",
    description: "Matching automatico in 24h. Revenue sharing. Business intelligence.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
