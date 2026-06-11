import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sei dentro! — TALENTIO",
  description: "Iscrizione alla waitlist confermata.",
  robots: { index: false, follow: false },
};

export default function GraziePage() {
  return (
    <div className="min-h-screen bg-bg grid-bg flex items-center justify-center px-6">

      <div className="max-w-lg text-center">

        {/* Logo */}
        <div className="font-display font-black text-2xl tracking-widest gradient-text-teal mb-12">
          TALENTIO
        </div>

        {/* Check */}
        <div className="w-20 h-20 rounded-full bg-teal/10 border border-teal/25
                        flex items-center justify-center text-4xl mx-auto mb-8">
          ✓
        </div>

        <h1 className="font-display font-black text-4xl gradient-text mb-4">
          Sei dentro!
        </h1>

        <p className="text-muted-fg leading-relaxed mb-2">
          Ti abbiamo aggiunto alla waitlist di TALENTIO.
          Sarai tra i primi a ricevere l&apos;invito alla beta privata.
        </p>

        <p className="text-sm text-teal mb-10 font-medium">
          Il tuo prezzo fondatore è bloccato. 🔒
        </p>

        {/* What's next */}
        <div className="text-left bg-surface border border-white/8 rounded-2xl p-6 mb-8">
          <p className="text-xs font-mono tracking-widest text-muted mb-4">COSA SUCCEDE ADESSO</p>
          <ul className="space-y-3">
            {[
              "Riceverai un&apos;email di conferma a breve",
              "Ti avviseremo quando la beta privata apre (fine estate 2026)",
              "Hai il prezzo fondatore bloccato — più basso del prezzo di lancio",
              "Più persone porti nel network, prima ottieni l&apos;accesso",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-white/80">
                <span className="text-teal flex-shrink-0 mt-0.5">{i + 1}.</span>
                <span dangerouslySetInnerHTML={{ __html: item }} />
              </li>
            ))}
          </ul>
        </div>

        <Link
          href="/"
          className="text-sm text-muted-fg hover:text-white transition-colors"
        >
          ← Torna alla homepage
        </Link>
      </div>
    </div>
  );
}
