"use client";

import { useState, useEffect, useRef } from "react";

// ─── WAITLIST FORM ─────────────────────────────────────────────────────────────

function WaitlistForm({ variant = "default" }: { variant?: "default" | "compact" }) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !role) {
      setErrorMsg("Seleziona il tuo ruolo e inserisci l'email.");
      return;
    }
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Errore durante l'iscrizione.");
        setStatus("error");
      } else {
        setStatus("success");
        window.location.href = "/grazie";
      }
    } catch {
      setErrorMsg("Errore di rete. Riprova tra qualche secondo.");
      setStatus("error");
    }
  }

  if (variant === "compact") {
    return (
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-lg">
        <input
          type="email"
          placeholder="La tua email professionale"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-4 py-3 rounded-xl bg-surface2 border border-white/10 text-white placeholder:text-muted-fg text-sm"
          required
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-6 py-3 rounded-xl bg-accent text-white font-semibold text-sm hover:bg-indigo-500 transition-colors disabled:opacity-60 whitespace-nowrap"
        >
          {status === "loading" ? "..." : "Unisciti →"}
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-4">
      <div className="flex gap-2">
        {[
          { value: "freelance", label: "Freelance / P.IVA" },
          { value: "pmi", label: "PMI / Azienda" },
          { value: "agency", label: "Agenzia" },
        ].map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setRole(opt.value)}
            className={`flex-1 py-2 px-2 rounded-lg text-xs font-medium transition-all border ${
              role === opt.value
                ? "border-accent bg-accent/15 text-accent"
                : "border-white/10 bg-surface text-muted-fg hover:border-white/25"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <input
        type="email"
        placeholder="La tua email professionale"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-3 rounded-xl bg-surface border border-white/10 text-white placeholder:text-muted-fg text-sm"
        required
      />

      {errorMsg && <p className="text-red-400 text-xs">{errorMsg}</p>}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-accent to-indigo-400 text-white font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {status === "loading" ? "Iscrizione in corso…" : "Entra nella waitlist — è gratis →"}
      </button>

      <p className="text-xs text-muted-fg text-center">
        Niente spam. Solo aggiornamenti sull&apos;accesso anticipato.
      </p>
    </form>
  );
}

// ─── ANIMATED COUNTER ─────────────────────────────────────────────────────────

function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayed, setDisplayed] = useState("0");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const numericValue = parseFloat(value.replace(/[^0-9.]/g, ""));
    const isDecimal = value.includes(".");
    const duration = 1400;
    const steps = 60;
    const stepTime = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = numericValue * eased;
      setDisplayed(isDecimal ? current.toFixed(1) : Math.round(current).toLocaleString("it-IT"));
      if (step >= steps) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [started, value]);

  return <span ref={ref}>{displayed}{suffix}</span>;
}

// ─── MAIN PAGE ─────────────────────────────────────────────────────────────────

export default function Home() {
  const [waitlistCount] = useState(247);

  return (
    <div className="min-h-screen bg-bg text-white overflow-x-hidden">

      {/* ── NAV ──────────────────────────────────────────────────── */}
      <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-4
                      bg-bg/80 backdrop-blur-xl border-b border-white/5">
        <div className="font-display font-black text-xl tracking-widest gradient-text-teal">
          TALENTIO
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-fg">
          <a href="#come-funziona" className="hover:text-white transition-colors">Come funziona</a>
          <a href="#features" className="hover:text-white transition-colors">Funzionalità</a>
          <a href="#prezzi" className="hover:text-white transition-colors">Prezzi</a>
        </div>
        <a
          href="#waitlist"
          className="px-4 py-2 rounded-lg bg-accent/15 border border-accent/30 text-accent
                     text-sm font-medium hover:bg-accent/25 transition-colors"
        >
          Accesso anticipato
        </a>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center
                          px-6 pt-20 pb-16 grid-bg">

        {/* Background orb */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-[600px] h-[600px] rounded-full pointer-events-none
                        bg-radial-gradient opacity-30 blur-3xl"
             style={{ background: "radial-gradient(circle, rgba(91,107,255,0.25) 0%, transparent 70%)" }}
        />

        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                          bg-teal/10 border border-teal/25 text-teal text-xs font-mono
                          tracking-widest mb-8 animate-fade-up">
            <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse-slow" />
            BETA PRIVATA IN PREPARAZIONE · {waitlistCount} IN LISTA
          </div>

          {/* Headline */}
          <h1 className="font-display font-black text-5xl md:text-7xl leading-[0.9] mb-6
                         gradient-text animate-fade-up delay-100">
            Il network AI<br />
            per professionisti<br />
            <span className="gradient-text-teal">tech italiani.</span>
          </h1>

          {/* Sub */}
          <p className="text-lg md:text-xl text-muted-fg max-w-2xl leading-relaxed mb-10
                        animate-fade-up delay-200">
            TALENTIO connette <strong className="text-white">freelance, P.IVA e agenzie</strong> con
            le PMI giuste — in 24 ore, non in settimane. AI matching, revenue sharing,
            contratti automatizzati. Intervento umano minimo.
          </p>

          {/* CTA */}
          <div className="animate-fade-up delay-300 mb-6">
            <WaitlistForm />
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-muted-fg
                          animate-fade-up delay-400">
            <span className="flex items-center gap-1.5">
              <span className="text-teal">✓</span> Gratis nella beta
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-teal">✓</span> Prezzo fondatore bloccato
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-teal">✓</span> Niente carta di credito
            </span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs text-muted tracking-widest font-mono">SCOPRI</span>
          <div className="w-px h-8 bg-gradient-to-b from-muted to-transparent scroll-indicator" />
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────── */}
      <section className="py-20 px-6 border-y border-white/5 bg-surface/50">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "2.1", suffix: "M", label: "P.IVA in Italia", sub: "di cui 400K nel tech" },
            { value: "890", suffix: "M€", label: "Mercato SAM", sub: "freelance tech IT" },
            { value: "74", suffix: "%", label: "PMI insoddisfatte", sub: "dei tempi di ricerca" },
            { value: "24", suffix: "h", label: "Match garantito", sub: "vs 3-6 settimane media" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display font-black text-3xl md:text-4xl gradient-text-teal mb-1">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm font-medium text-white mb-0.5">{stat.label}</div>
              <div className="text-xs text-muted-fg">{stat.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────── */}
      <section id="come-funziona" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-16">
            <p className="text-xs font-mono tracking-widest text-accent mb-3">COME FUNZIONA</p>
            <h2 className="font-display font-black text-4xl md:text-5xl gradient-text">
              Tre passi. Nessuna perdita di tempo.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Crea il profilo",
                desc: "Inserisci skill, tariffa e disponibilità. L'AI costruisce il tuo profilo semantico in background. Ci vogliono 5 minuti.",
                icon: "◎",
                color: "accent",
              },
              {
                step: "02",
                title: "Ricevi i match",
                desc: "Entro 24 ore l'AI seleziona i 3-5 progetti (o profili) più compatibili. Non parole chiave — matching semantico reale.",
                icon: "⬡",
                color: "teal",
              },
              {
                step: "03",
                title: "Lavora e incassa",
                desc: "Firma il contratto in piattaforma, gestisci le milestone, ricevi il pagamento automaticamente. Zero burocrazia.",
                icon: "◈",
                color: "accent",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative p-8 rounded-2xl bg-surface border border-white/8 card-hover"
              >
                <div className="font-mono text-xs text-muted-fg mb-4 tracking-widest">
                  STEP {item.step}
                </div>
                <div className={`text-4xl mb-4 ${item.color === "teal" ? "text-teal" : "text-accent"}`}>
                  {item.icon}
                </div>
                <h3 className="font-display font-bold text-xl text-white mb-3">{item.title}</h3>
                <p className="text-sm text-muted-fg leading-relaxed">{item.desc}</p>

                {/* Connector line */}
                {item.step !== "03" && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-white/10 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────── */}
      <section id="features" className="py-24 px-6 bg-surface/30">
        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-16">
            <p className="text-xs font-mono tracking-widest text-teal mb-3">FUNZIONALITÀ CHIAVE</p>
            <h2 className="font-display font-black text-4xl md:text-5xl gradient-text">
              Tutto quello che manca<br />ai portali esistenti.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: "🤖",
                title: "AI Matching Semantico",
                desc: "Non semplice ricerca per parole chiave. Il nostro modello capisce contesto, esperienza pregressa e fit con il progetto. Match medio in <2 secondi.",
                badge: "Cuore del sistema",
                badgeColor: "accent",
              },
              {
                icon: "💰",
                title: "Revenue Sharing",
                desc: "La royalty decresce con il tier: più investi nella piattaforma, meno cedi. E ogni referral che fai ti genera crediti. Il network lavora per te.",
                badge: "Unico nel settore",
                badgeColor: "teal",
              },
              {
                icon: "📊",
                title: "Business Intelligence",
                desc: "Ogni settimana ricevi 3-5 insight personalizzati: benchmark tariffe, skill emergenti, opportunità che stai mancando. Basati sui dati reali del network.",
                badge: "Solo per i Pro",
                badgeColor: "accent",
              },
              {
                icon: "📄",
                title: "Contratti e Pagamenti Automatizzati",
                desc: "Firma digitale, escrow Stripe, rilascio per milestone, fattura auto-generata (conforme SDI). Dal match al pagamento senza email, senza Excel.",
                badge: "Fine burocrazia",
                badgeColor: "teal",
              },
              {
                icon: "⭐",
                title: "Peer Review Verificata",
                desc: "Solo chi ha completato un contratto può lasciare una review. Un sistema di credibility score protegge dai profili falsi e dalle review inventate.",
                badge: "Fiducia garantita",
                badgeColor: "accent",
              },
              {
                icon: "🏢",
                title: "Piano Agency",
                desc: "Gestisci il tuo team di collaboratori, fai overflow strutturato e monetizza i tuoi referral. Il piano Agency trasforma il tuo network in un asset.",
                badge: "Per agenzie",
                badgeColor: "teal",
              },
            ].map((feat) => (
              <div
                key={feat.title}
                className="flex gap-5 p-6 rounded-2xl bg-surface border border-white/8 card-hover"
              >
                <div className="text-3xl flex-shrink-0 mt-1">{feat.icon}</div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-display font-bold text-lg text-white">{feat.title}</h3>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-mono tracking-wide
                        ${feat.badgeColor === "teal"
                          ? "bg-teal/10 text-teal border border-teal/20"
                          : "bg-accent/10 text-accent border border-accent/20"
                        }`}
                    >
                      {feat.badge}
                    </span>
                  </div>
                  <p className="text-sm text-muted-fg leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOR WHO ──────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-16">
            <p className="text-xs font-mono tracking-widest text-accent mb-3">PER CHI È</p>
            <h2 className="font-display font-black text-4xl md:text-5xl gradient-text">
              Costruito per tre tipi<br />di professionisti.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                role: "Freelance / P.IVA",
                emoji: "👨‍💻",
                color: "accent",
                pains: [
                  "8-12h/sett. di business development non pagato",
                  "Portali saturi di profili low-cost esteri",
                  "Nessuna visibilità sui prezzi di mercato",
                ],
                gains: [
                  "Match qualificati entro 24h senza cercare",
                  "Royalty ridotta per chi usa la piattaforma di più",
                  "BI settimanale: tariffa vs mercato, skill gap",
                ],
              },
              {
                role: "PMI",
                emoji: "🏭",
                color: "teal",
                pains: [
                  "3-6 settimane per trovare il profilo giusto",
                  "35% dei contratti non arriva a completamento",
                  "Gestione frammentata: portale + email + bancario",
                ],
                gains: [
                  "3-5 profili verificati e scorati in 24h",
                  "Garanzia di qualità: rimatch gratuito se non funziona",
                  "Fine-to-end: contratto → firma → pagamento → fattura",
                ],
              },
              {
                role: "Agenzie",
                emoji: "🏢",
                color: "accent",
                pains: [
                  "Overflow non gestito = opportunità perse",
                  "Nessun guadagno strutturato dai referral",
                  "Gestione collaboratori ad hoc e non tracciata",
                ],
                gains: [
                  "Overflow monetizzato attraverso il network",
                  "Royalty per ogni collaboratore ingaggiato",
                  "Dashboard centralizzata per tutti i progetti",
                ],
              },
            ].map((card) => (
              <div
                key={card.role}
                className="p-6 rounded-2xl bg-surface border border-white/8 card-hover"
              >
                <div className="text-4xl mb-4">{card.emoji}</div>
                <h3
                  className={`font-display font-bold text-xl mb-5
                    ${card.color === "teal" ? "text-teal" : "text-accent"}`}
                >
                  {card.role}
                </h3>

                <div className="mb-5">
                  <p className="text-xs font-mono tracking-widest text-muted mb-3">PRIMA</p>
                  <ul className="space-y-2">
                    {card.pains.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-xs text-muted-fg">
                        <span className="text-red-400 mt-0.5 flex-shrink-0">✗</span>{p}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-xs font-mono tracking-widest text-muted mb-3">CON TALENTIO</p>
                  <ul className="space-y-2">
                    {card.gains.map((g) => (
                      <li key={g} className="flex items-start gap-2 text-xs text-white/80">
                        <span className="text-teal mt-0.5 flex-shrink-0">✓</span>{g}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────────── */}
      <section id="prezzi" className="py-24 px-6 bg-surface/30">
        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-16">
            <p className="text-xs font-mono tracking-widest text-teal mb-3">PREZZI</p>
            <h2 className="font-display font-black text-4xl md:text-5xl gradient-text">
              Abbonamento + royalty.<br />Paghi solo quando guadagni.
            </h2>
            <p className="text-muted-fg mt-4 max-w-xl mx-auto text-sm">
              La royalty è la % che la piattaforma trattiene su ogni progetto completato.
              Chi paga di più ha royalty inferiore. L&apos;obiettivo è che il tuo ROI sia sempre positivo.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              {
                name: "Starter",
                who: "Freelance entry",
                price: "€39",
                royalty: "7%",
                features: ["5 match/mese", "Profilo verificato", "Review system", "Contratti standard"],
                cta: "Unisciti in waitlist",
                featured: false,
              },
              {
                name: "Pro",
                who: "Freelance / P.IVA",
                price: "€89",
                royalty: "4.5%",
                features: ["Match illimitati", "BI dashboard", "Priority listing", "Insights settimanali", "Chat avanzata"],
                cta: "Unisciti in waitlist",
                featured: true,
              },
              {
                name: "Agency",
                who: "Team 2-20 persone",
                price: "€249",
                royalty: "3%",
                features: ["5 seat inclusi", "Gestione overflow", "Analytics team", "Revenue sharing referral", "API access"],
                cta: "Unisciti in waitlist",
                featured: false,
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`relative p-6 rounded-2xl border card-hover flex flex-col
                  ${plan.featured
                    ? "bg-accent/10 border-accent/40 glow-accent"
                    : "bg-surface border-white/8"
                  }`}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full
                                  bg-accent text-white text-xs font-mono tracking-widest whitespace-nowrap">
                    PIÙ SCELTO
                  </div>
                )}

                <div className="mb-5">
                  <div className="font-display font-black text-2xl text-white">{plan.name}</div>
                  <div className="text-xs text-muted-fg mb-4">{plan.who}</div>
                  <div className="flex items-end gap-1">
                    <span className="font-display font-black text-4xl text-white">{plan.price}</span>
                    <span className="text-muted-fg text-sm mb-1">/mese</span>
                  </div>
                  <div className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted-fg
                                  bg-white/5 px-3 py-1 rounded-full">
                    <span className="text-accent">+</span> {plan.royalty} royalty sui progetti
                  </div>
                </div>

                <ul className="space-y-2.5 mb-6 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-white/80">
                      <span className="text-teal text-xs">✓</span>{f}
                    </li>
                  ))}
                </ul>

                <a
                  href="#waitlist"
                  className={`block w-full py-3 rounded-xl text-center text-sm font-semibold transition-colors
                    ${plan.featured
                      ? "bg-accent text-white hover:bg-indigo-500"
                      : "bg-white/8 text-white hover:bg-white/12 border border-white/10"
                    }`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-muted-fg">
            Prezzi per i fondatori early-adopter — bloccati a vita. Aumenteranno al lancio pubblico.
          </p>
        </div>
      </section>

      {/* ── WAITLIST CTA ─────────────────────────────────────────── */}
      <section id="waitlist" className="py-28 px-6 relative overflow-hidden">

        <div className="absolute inset-0 pointer-events-none"
             style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(91,107,255,0.1) 0%, transparent 70%)" }} />

        <div className="relative z-10 max-w-2xl mx-auto text-center">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                          bg-teal/10 border border-teal/25 text-teal text-xs font-mono
                          tracking-widest mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse-slow" />
            {waitlistCount} PROFESSIONISTI GIÀ IN LISTA
          </div>

          <h2 className="font-display font-black text-4xl md:text-6xl gradient-text mb-6">
            Unisciti ai fondatori.<br />Blocca il prezzo ora.
          </h2>

          <p className="text-muted-fg mb-10 max-w-lg mx-auto leading-relaxed">
            I primi <strong className="text-white">500 membri</strong> ottengono il prezzo fondatore
            bloccato a vita, accesso beta prioritario e il badge
            <strong className="text-teal"> &ldquo;Membro Fondatore&rdquo;</strong> permanente sul profilo.
          </p>

          <div className="flex justify-center mb-8">
            <WaitlistForm />
          </div>

          {/* Social proof mini */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-fg">
            {["Dev Full-Stack · Milano", "UX Designer · Roma", "PMI Manifattura · Torino"].map((p) => (
              <div key={p} className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent to-teal" />
                <span className="text-xs">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-surface/30">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display font-black text-3xl text-center gradient-text mb-12">
            Domande frequenti
          </h2>

          <div className="space-y-4">
            {[
              {
                q: "La beta è davvero gratuita?",
                a: "Sì. I primi 200 utenti beta accedono gratuitamente per tutta la fase di test. Passerete all'abbonamento solo quando la piattaforma va live — al prezzo fondatore bloccato.",
              },
              {
                q: "Come funziona la royalty?",
                a: "Quando concludi un progetto attraverso TALENTIO, la piattaforma trattiene una % del valore contrattuale (7% Starter, 4.5% Pro, 3% Agency). In cambio hai trovato il cliente in 24h senza business development.",
              },
              {
                q: "Solo per sviluppatori?",
                a: "No. Il focus iniziale è sul settore Tech/Digital/IT: sviluppatori, designer, marketer digitali, data analyst, consulenti IT, PM. L'espansione ad altri settori è pianificata per l'anno 2.",
              },
              {
                q: "Come viene verificata la qualità dei profili?",
                a: "Con un sistema di peer review verificata: solo chi ha completato un contratto può lasciare una review. Un credibility score protegge dalle review false. I profili PMI vengono verificati tramite P.IVA.",
              },
              {
                q: "Quando parte la beta?",
                a: "Stiamo costruendo il prodotto. L'obiettivo è avere la beta chiusa attiva entro fine estate 2026. Chi è in waitlist sarà il primo a essere contattato.",
              },
            ].map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="font-display font-black text-xl tracking-widest gradient-text-teal">
            TALENTIO
          </div>
          <p className="text-xs text-muted-fg text-center">
            © 2026 TALENTIO · Connecting Talent to Opportunity · Italy → Europe
          </p>
          <div className="flex gap-6 text-xs text-muted-fg">
            <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
            <a href="/termini" className="hover:text-white transition-colors">Termini</a>
            <a href="mailto:hello@talentio.eu" className="hover:text-white transition-colors">Contatti</a>
          </div>
        </div>
      </footer>

    </div>
  );
}

// ─── FAQ ITEM (client component for toggle) ────────────────────────────────────

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-xl bg-surface border border-white/8 overflow-hidden cursor-pointer
                 hover:border-white/15 transition-colors"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between p-5">
        <span className="font-medium text-sm text-white pr-4">{q}</span>
        <span className={`text-muted-fg transition-transform flex-shrink-0 ${open ? "rotate-180" : ""}`}>
          ▾
        </span>
      </div>
      {open && (
        <div className="px-5 pb-5 text-sm text-muted-fg leading-relaxed border-t border-white/5 pt-4">
          {a}
        </div>
      )}
    </div>
  );
}
