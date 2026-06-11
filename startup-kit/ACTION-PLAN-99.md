# TALENTIO — Piano d'Azione al 99% di Successo

> **Versione 1.0 · Giugno 2026 · Documento operativo master**
>
> Il 90% delle startup fallisce per ragioni prevedibili e prevenibili.
> Questo piano le affronta una per una, nell'ordine giusto, prima che diventino letali.

---

## La Logica del 99%

Non esiste startup con probabilità di successo del 99% da subito.
Esiste però un **processo** che porta ogni singolo step a probabilità ≥95% di completamento:

```
Probabilità di successo composta =
  Stage 0 (98%) × Stage 1 (97%) × Stage 2 (96%) × Stage 3 (95%) × Stage 4 (96%) × Stage 5 (95%)
  = ~79% di successo complessivo

vs. approccio casuale (build → hope → fail): ~10%
```

Il 99% non è un numero assoluto — è il **differenziale** tra chi segue un processo
de-risked e chi costruisce basandosi su assunzioni non validate.

**Principio fondamentale:** Non passare mai allo stage successivo senza aver superato il gate dello stage corrente.
Un gate fallito non è un fallimento — è informazione preziosa che ti salva da mesi di lavoro sprecato.

---

## Mappa dei Rischi (ordinata per probabilità × impatto)

| # | Rischio | Prob. | Impatto | Stage critico | Mitigazione |
|---|---------|-------|---------|--------------|-------------|
| R1 | Nessuno vuole pagare per il matching AI | Alta | Letale | Stage 0 | Interviste + pre-pagamento PRIMA del build |
| R2 | Cold start: network vuoto non attrae nessuno | Alta | Letale | Stage 1 | Bootstrapping manuale 50 utenti selezionati |
| R3 | Non trovi CTO / Lead Dev affidabile | Media | Letale | Stage 2 | Inizia la ricerca il giorno 1, non aspettare |
| R4 | Qualità AI matching insufficiente v1 | Alta | Alto | Stage 2 | Fallback umano, dati beta > 3 mesi |
| R5 | Churn alto in early adopters | Media | Alto | Stage 3 | Onboarding white-glove, interviste settimanali |
| R6 | Stripe Connect / compliance PMI blocca | Bassa | Alto | Stage 2 | Avvia processo Stripe al mese 1 |
| R7 | Competitor lancia feature simili (Malt) | Media | Medio | Stage 3 | Revenue sharing impossibile da copiare rapidamente |
| R8 | Esaurimento capitale prima del break-even | Media | Letale | Ogni stage | Mai spendere senza gate validato |
| R9 | Founder burnout (solo) | Media | Letale | Stage 0-1 | Co-founder entro 90 giorni, advisory board |
| R10 | Normativa P.IVA / Platform Work Directive | Bassa | Medio | Stage 2 | Legal advisor specializzato dal mese 2 |

---

## Workflow Visivo

```
  OGGI
    │
    ▼
┌──────────────────────────────────────────────────────────────────┐
│ STAGE 0 · SETTIMANE 1-4                                          │
│ VALIDAZIONE DOMANDA (zero codice, zero spesa)                    │
│                                                                  │
│ 50 interviste → 10 mock contracts → landing live → 100 waitlist  │
│                                                                  │
│ GATE ⬡: ≥20 persone disposti a pagare PRIMA che esista          │
└───────────────────────────┬──────────────────────────────────────┘
                GATE OK ▼   │   GATE FAIL → PIVOT (vedi §9)
┌──────────────────────────────────────────────────────────────────┐
│ STAGE 1 · SETTIMANE 5-12                                         │
│ MVP MANUALE (fai tu il lavoro che farà l'AI)                     │
│                                                                  │
│ 50 utenti beta → matching via email → 5 contratti → €5K GMV     │
│                                                                  │
│ GATE ⬡: 5 clienti paganti + NPS ≥ 40 + 0 churn entro 60gg      │
└───────────────────────────┬──────────────────────────────────────┘
                GATE OK ▼
┌──────────────────────────────────────────────────────────────────┐
│ STAGE 2 · MESI 4-7                                               │
│ FOUNDATION TECH (automatizza ciò che hai dimostrato manualmente) │
│                                                                  │
│ CTO hired → Auth + profili → AI matching v1 → pagamenti Stripe  │
│                                                                  │
│ GATE ⬡: 50 utenti attivi + 1° AI match accettato + €15K MRR    │
└───────────────────────────┬──────────────────────────────────────┘
                GATE OK ▼
┌──────────────────────────────────────────────────────────────────┐
│ STAGE 3 · MESI 8-12                                              │
│ PRODUCT-MARKET FIT (trova la formula che funziona)               │
│                                                                  │
│ Iterate matching → contratti → BI → 200 utenti paganti          │
│                                                                  │
│ GATE ⬡: NPS ≥ 50 + churn ≤ 3% + 200 utenti + €50K MRR         │
└───────────────────────────┬──────────────────────────────────────┘
                GATE OK ▼
┌──────────────────────────────────────────────────────────────────┐
│ STAGE 4 · MESI 13-24                                             │
│ SCALA ITALIA (moltiplica ciò che funziona)                       │
│                                                                  │
│ Content + partnerships + referral → 2.000 utenti → €500K ARR    │
│                                                                  │
│ GATE ⬡: €1M ARR + LTV/CAC ≥ 10x + NPS ≥ 55 → Series A ready   │
└───────────────────────────┬──────────────────────────────────────┘
                GATE OK ▼
┌──────────────────────────────────────────────────────────────────┐
│ STAGE 5 · MESI 25-36                                             │
│ EUROPA (replica il playbook in DE, FR, ES)                       │
│                                                                  │
│ Localizzazione → EU partnerships → 10K utenti → €5M ARR         │
│                                                                  │
│ GATE ⬡: €5M ARR + presenza 3 paesi EU + Series A chiuso        │
└──────────────────────────────────────────────────────────────────┘
```

---

## STAGE 0 — Validazione Domanda
### Settimane 1-4 · Budget: €0

**Obiettivo:** Provare che il problema esiste e che le persone pagano per risolverlo, prima di scrivere una riga di codice aggiuntiva.

**Il rischio principale da eliminare:** R1 — nessuno vuole pagare.

### Azioni in ordine di priorità

#### Settimana 1 — Le Interviste

**Azione 1.1 — 50 Problem Interviews**

Non vendere. Non pitchare. Fare solo domande.

Script da seguire (letteralmente):
```
1. "Quanto tempo passi ogni settimana a cercare nuovi clienti/profili?"
2. "Descrivimi l'ultima volta che hai perso tempo cercando. Cosa è successo?"
3. "Quanto hai guadagnato/perso per un mismatch nell'ultimo anno?"
4. "Se esistesse una piattaforma che risolvesse questo in 24h, quanto pagheresti al mese?"
5. "Potresti presentarmi 3 tuoi colleghi che hanno lo stesso problema?"
```

Target per le interviste:
- 25 freelance/P.IVA (cerca su: LinkedIn, GitHub Italy, Telegram "Freelance IT Italia")
- 15 HR manager / titolari PMI tech
- 10 titolari di agenzie digitali

Dove trovarli in 7 giorni:
- LinkedIn: messaggio diretto a dev italiani con "P.IVA" nel titolo
- Telegram: gruppi @freelanceitalia, @pythonita, @reactjsita
- GitHub: contributor di repo italiani (guarda i commit .it)
- Rete personale: 3 amici → ognuno conosce 3 persone giuste

**Cosa registrare per ogni intervista:**
```
Nome: _______________
Ruolo: freelance / PMI / agenzia
Ore/settimana perse in biz dev: ___
Perdita economica stimata/anno: €___
Willingness to pay (mensile): €___
Contatto per follow-up: ___
Referral (3 nomi): ___
```

**Segnali che validano il problema (cercare questi, non aspettarli):**
- Raccontano storie di dolore spontaneamente (senza essere sollecitati)
- Quantificano la perdita in euro, non in "frustrazione"
- Chiedono quando sarà disponibile prima che tu finisca di parlare
- Ti danno referral spontaneamente

**Segnali di allarme (se vedi questi, pivot immediato):**
- "Uso già Upwork e sono soddisfatto" (>30% delle risposte)
- Non riescono a quantificare il problema economicamente
- "Interessante ma non pagerei" (>40% delle risposte)

---

#### Settimana 2 — Mock Contracts (Smoke Test)

**Azione 2.1 — 10 Mock Matching (senza algoritmo)**

Fai il matching manualmente per 10 coppie PMI-Freelance.
Usa: email + telefono + Google Sheets come "database".

Processo:
1. Hai la lista degli intervistati → seleziona le 5 PMI con budget >€5K
2. Abbinale a mano con i 5 freelance più compatibili (skill, tariffa, disponibilità)
3. Proponi il match via email: "Ho trovato un profilo interessante per il tuo progetto"
4. Se entrambi accettano → fai da mediatore per il primo call
5. Misura: quanti si incontrano? Quanti chiudono un accordo?

**Cosa dimostra questo:** che il valore del matching è reale indipendentemente dall'AI.

**Azione 2.2 — Pre-orders (il vero smoke test)**

A 10 persone già intervistate (che hanno detto sì) offri:
- Accesso beta per 3 mesi gratuito
- In cambio: si impegnano per iscritto a pagare €X/mese quando la piattaforma va live
- Usa Stripe Payment Links con "charge later" oppure un semplice Google Form con impegno morale

**Gate intermedio:** se meno di 3 persone accettano il pre-order → problema serio, blocca tutto e rianalizza.

---

#### Settimana 3 — Landing Page Live

La landing page Next.js è già costruita (`talentio/`).
In questa settimana:

1. Segui `talentio/DEPLOY.md` → sito live su Vercel (30 minuti)
2. Registra dominio: talentio.eu (preferibile) o talentio.it (~€10/anno)
3. Collega il dominio a Vercel (istruzioni in DEPLOY.md)
4. Configura Supabase per raccogliere le email waitlist

**Traffico immediato — 5 azioni da fare il giorno stesso del launch:**

| Azione | Dove | Template |
|--------|------|---------|
| Post LinkedIn personale | LinkedIn | *"Ho passato 6 mesi a intervistare 50 freelance tech italiani. Il problema è reale e nessuno lo sta risolvendo come si deve. Sto costruendo TALENTIO. Primi 500 posti in waitlist: [link]"* |
| Post su Indie Hackers | indiehackers.com | Post "I'm building..." con dati delle interviste |
| Post su Reddit | r/italy + r/ITAtech | Condividi i dati del problema (no spam, valore prima) |
| Messaggio ai 50 intervistati | Email/WhatsApp | *"Grazie per l'intervista. Ho lanciato la lista d'attesa, ti ho riservato un posto fondatore: [link]"* |
| DM a 20 dev italiani su Twitter/X | X | Condividi il dato più sorprendente dall'intervista |

---

#### Settimana 4 — Analisi e Decisione di Gate

**Metrica di riferimento:**

| Metrica | Obiettivo | Stop/Pivot se |
|---------|-----------|--------------|
| Interviste completate | ≥ 40 | < 20 → problema di accesso al target |
| "Sì pagerei" nelle interviste | ≥ 50% | < 30% → problema di prodotto |
| Mock match accettati | ≥ 6/10 | < 4/10 → matching concept fallisce |
| Pre-orders o impegni | ≥ 10 | < 5 → non validato, non procedere |
| Email waitlist | ≥ 100 | < 50 → problema di comunicazione |
| NPS post-mock match | ≥ 45 | < 30 → esperienza deludente |

**Gate Decisionale Stage 0:**

```
TUTTI i seguenti devono essere TRUE per procedere:

□ ≥ 40 interviste completate
□ ≥ 50% ha detto che pagherebbe €30+ al mese
□ ≥ 10 pre-orders / impegni scritti raccolti
□ ≥ 100 email in waitlist
□ ≥ 1 mock match conclusosi in contratto reale

SE TRUE → Procedi a Stage 1
SE PARZIALMENTE FALSE → Pivot (vedi §9 Decision Framework)
SE TUTTE FALSE → Stop, rianalizza il problema
```

---

## STAGE 1 — MVP Manuale
### Settimane 5-12 · Budget: €5.000 max

**Obiettivo:** Servire manualmente i primi 50 utenti come se fossi l'AI. Dimostrare che il modello funziona prima di automatizzarlo.

**Il rischio principale da eliminare:** R2 — cold start del network.

**La regola d'oro di Stage 1:** Non costruire nulla che non hai dimostrato necessario manualmente.

### Azioni

#### Settimana 5-6 — Reclutamento 50 Beta

**Come costruire i 50 utenti "founding members" senza pubblicità:**

- **25 freelance:** dai referral delle interviste (ogni intervistato te ne dà 3 → hai già 150 potenziali)
- **15 PMI:** 3 PMI "ancora calde" dagli incontri → ognuna ha partner/fornitori → chiedi intro
- **10 agenzie:** cerca le 10 agenzie digitali italiane più attive su LinkedIn con <20 dipendenti

**Processo di onboarding manuale per ogni persona:**
1. Call di 20 minuti ("voglio capire il tuo caso d'uso specifico")
2. Compila tu il profilo nella tabella Supabase a loro nome
3. Stai in contatto WhatsApp (non solo email) per il primo mese
4. Sii il loro "account manager" umano

---

#### Settimana 7-9 — Matching Manuale Operativo

**Il "Matching Engine" di Stage 1:** Tu + un Google Sheet

```
GOOGLE SHEET struttura:

Tab 1 - FREELANCE
| Nome | Skill[] | Tariffa | Disponibilità | Contatto | Score |

Tab 2 - PROGETTI APERTI
| PMI | Descrizione | Skill req. | Budget | Scadenza |

Tab 3 - MATCH PROPOSTI
| Data | Freelance | PMI | Score manuale | Stato | Esito |

Tab 4 - KPI SETTIMANALI
| Week | Match proposti | Accettati | Contratti | GMV | NPS |
```

**Processo settimanale:**
- Lunedì: scorri i nuovi profili e progetti
- Martedì-Giovedì: fai i match, contatta manualmente entrambe le parti
- Venerdì: follow-up su match aperti, registra esiti nel sheet
- Domenica: analisi KPI → cosa ha funzionato questa settimana?

**Template email per il match (tono personale, non automatizzato):**
```
Oggetto: Ho trovato qualcuno per il tuo progetto [NOME PROGETTO]

Ciao [NOME],

Ho esaminato il tuo progetto e ho un profilo che penso sia 
molto compatibile: [NOME FREELANCE], specializzato in [SKILL].

Ha già lavorato su [PROGETTO SIMILE] e la sua tariffa è €[X]/giorno.

Ti metto in copia diretta se vuoi procedere con un primo call.

Un dettaglio: se il progetto va avanti, applicheremo una royalty
del [X]% sul valore contrattuale — è il modo in cui TALENTIO 
si sostiene. Te lo dico subito così è chiaro.

Fammi sapere!
```

---

#### Settimana 10-12 — Primo Contratto Reale

**Obiettivo:** chiudere almeno 5 contratti, anche piccoli (€500+).

**Template contratto minimo (Google Docs):**
Finché Stripe Connect non è configurato, usa:
- Contratto PDF firmato via DocuSign free tier (3 firme/mese gratuito)
- Pagamento tramite bonifico con IBAN (poi PayPal/Stripe link)
- Royalty: hai già l'impegno scritto del pre-order → incassa manualmente

**Come gestire i pagamenti in Stage 1:**
1. PMI paga il freelance direttamente
2. TALENTIO invia fattura separata per la royalty (es. 7% del valore)
3. Usa la fattura per testare la willingness to pay reale sulla royalty

---

### Gate Stage 1

```
TUTTI i seguenti devono essere TRUE per procedere:

□ 50 profili nel network (min. 25 freelance + 15 PMI + 10 agenzie)
□ ≥ 20 match proposti manualmente
□ ≥ 12 match accettati (acceptance rate ≥ 60%)
□ ≥ 5 contratti firmati (anche via email/PDF)
□ GMV totale ≥ €10.000
□ ≥ 3 royalty pagate volontariamente (dimostra la WTP)
□ NPS medio ≥ 40
□ 0 utenti che hanno chiesto rimborso o abbandonato

SE TRUE → Procedi a Stage 2 (assumi il CTO)
SE GATE PARZIALMENTE FALLITO → Analizza il blocco specifico (vedi §9)
```

---

## STAGE 2 — Foundation Tecnica
### Mesi 4-7 · Budget: €60.000-80.000

**Obiettivo:** Automatizzare tutto ciò che hai dimostrato funzionare in Stage 1.

**Il rischio principale da eliminare:** R3 (nessun CTO) e R4 (AI matching scarso).

### Azione Critica #1 — Trovare il CTO

Questo è l'hire più importante della tua vita imprenditoriale.

**Profilo ideale:**
- Full-stack (Next.js + Python)
- Ha già lavorato su prodotti B2B o marketplace
- Idealmente co-founder (equity 15-25%), non semplice dipendente
- Italiano o madrelingua italiana (per capire il mercato)

**Dove trovarlo (in ordine di efficacia):**

| Canale | Approccio | Tempistica |
|--------|-----------|-----------|
| **Rete personale** | Chiedi a ogni contatto: "Conosci un dev full-stack che vorrebbe co-fondare?" | Settimana 1 |
| **LinkedIn** | Cerca: "Full Stack Developer" + "Italy" + "freelance" + ultimi 5 anni | Settimana 1-2 |
| **GitHub** | Trova contributor attivi di repo Next.js/Python in Italia | Settimana 2 |
| **Community dev** | Indie Hackers, dev.to/it, Telegram @pythonita | Settimana 2-3 |
| **YC co-founder matching** | ycombinator.com/cofounder-matching (aperto a tutti) | Settimana 3 |
| **Angelist Talent** | Cerca profili "open to co-founder roles" | Settimana 3-4 |

**Processo di selezione (non affidarti all'istinto):**

1. **Primo contatto:** "Sto costruendo TALENTIO. Abbiamo già [X] utenti, [Y] match, [Z] GMV. Cerco un co-fondatore tecnico. 20 minuti per una call?"
2. **Call esplorativa:** valutiamo fit culturale, visione, ambizioni
3. **Test tecnico pagato (€500):** implementa una feature specifica in una settimana
4. **Referral check:** parla con 3 persone con cui ha lavorato in passato
5. **Periodo di prova 90 giorni:** lavoriamo insieme con equity vesting mensile

**Red flag da evitare:**
- Non ha mai lanciato un prodotto (solo progetti personali)
- Vuole stipendio di mercato + equity (non è aligned)
- Parla di "scalabilità" prima di capire il problema del cliente
- Non usa il prodotto come se fosse un utente

---

### Azione Critica #2 — Stack Setup (Mese 4)

Il CTO imposta la base tecnica seguendo l'architettura in `technical/02-tech-stack.md`.

**Priorità di sviluppo (in sequenza, non in parallelo):**

```
SPRINT 1 (2 settimane): AUTH + PROFILI
  → Supabase Auth (email + Google)
  → Form profilo freelance (skills, tariffa, disponibilità)
  → Form profilo PMI (azienda, P.IVA, settore)
  → Dashboard utente base
  → Deploy su Vercel

SPRINT 2 (2 settimane): PROGETTI + MATCHING BASE
  → PMI può pubblicare un progetto
  → Embedding pipeline (OpenAI text-embedding-3-large)
  → Matching cosine similarity v1 (pgvector)
  → Email notifica match (Resend)

SPRINT 3 (3 settimane): PAGAMENTI
  → Stripe Billing (abbonamenti)
  → Stripe Connect (marketplace payments)
  → Royalty calculation automatica
  → Webhook handler per eventi Stripe

SPRINT 4 (2 settimane): CONTRATTI + REVIEW
  → Template contratto standard
  → HelloSign integrazione (firma digitale)
  → Sistema review post-contratto
  → Dashboard KPI admin
```

**Regola critica:** Non iniziare uno sprint se quello precedente non è live in produzione con utenti reali.

---

### Azione Critica #3 — Compliance (Mese 4, in parallelo)

**Da fare il giorno 1 di Stage 2 (non rinviare):**

- [ ] Avvia processo Stripe Connect per marketplace (richiede 2-4 settimane di verifica)
- [ ] Ingaggia un commercialista specializzato in startup/P.IVA (€500-1.000/anno)
- [ ] Fai redigere T&C e Privacy Policy da un avvocato tech (€1.500-3.000 una tantum)
- [ ] Registra TALENTIO come marchio all'UIBM (€300-500)
- [ ] Apri conto business (Qonto o Hype Business — veloci e online)

---

### Gate Stage 2

```
□ Auth + profili live in produzione (non solo in staging)
□ Almeno 50 profili creati autonomamente dagli utenti (non inseriti da te)
□ AI matching engine: ≥ 10 match generati con composite_score > 0.65
□ ≥ 1 match AI accettato e contratto firmato
□ Stripe abbonamenti live: ≥ 10 pagamenti ricorrenti
□ GMV gestito via piattaforma: ≥ €5.000
□ 0 incidenti di sicurezza o perdita dati
□ Stripe Connect approvato per marketplace payments

SE TRUE → Procedi a Stage 3 (focus su product-market fit)
```

---

## STAGE 3 — Product-Market Fit
### Mesi 8-12 · Budget: €80.000-120.000

**Obiettivo:** Trovare la formula precisa che fa sì che gli utenti restino, paghino, e portino altri.

**Il rischio principale da eliminare:** R5 — churn alto.

**Come si misura il PMF:**

> *"Un prodotto ha raggiunto il PMF quando almeno il 40% degli utenti risponderebbe 'Molto deluso' se non potesse più usarlo."*
> — Sean Ellis Test

### Azioni di Stage 3

**Azione 3.1 — Sean Ellis Survey mensile**

Ogni mese, manda a tutti gli utenti attivi:
*"Come ti sentiresti se non potessi più usare TALENTIO?"*
- Molto deluso
- Un po' deluso
- Non deluso (tanto ci sono alternative)
- Non uso più TALENTIO

**Obiettivo:** >40% risponde "Molto deluso" entro mese 11.
**Se sei sotto il 25%:** interviste immediate per capire il problema.

**Azione 3.2 — Weekly Retention Analysis**

Ogni lunedì mattina, 30 minuti di analisi:

```sql
-- Utenti attivi questa settimana che erano attivi anche la scorsa
SELECT COUNT(*) FROM users
WHERE last_active >= NOW() - INTERVAL '7 days'
  AND created_at <= NOW() - INTERVAL '7 days';
```

Obiettivo: week-over-week retention ≥ 40% (utenti che tornano settimana dopo settimana).

**Azione 3.3 — Interviste di Churn**

Per ogni utente che cancella l'abbonamento:
- Chiama entro 24 ore (non email)
- Domanda unica: "Cosa avremmo dovuto fare diversamente per tenerti?"
- Registra la risposta verbatim
- Categorizza: prezzo / qualità match / funzionalità mancante / bug / altro

**Se ≥3 utenti citano lo stesso problema → risolvi entro 2 settimane.**

**Azione 3.4 — Referral Tracking**

Attiva il referral program (F-25 in roadmap):
- Ogni utente ha un link unico da condividere
- 1 mese gratis per ogni referral attivo
- Misura: referral rate (% utenti che portano almeno 1 altro utente)
- Obiettivo: ≥ 20% degli utenti attivi porta almeno 1 referral

---

### Gate Stage 3

```
□ NPS ≥ 50 (misurato con almeno 50 risposte)
□ Sean Ellis score ≥ 35% "Molto deluso" (proxy PMF)
□ Churn mensile ≤ 3%
□ Week-over-week retention ≥ 40%
□ ≥ 200 utenti attivi paganti
□ MRR ≥ €25.000 (€300K ARR run-rate)
□ ≥ 20% utenti porta almeno 1 referral
□ LTV/CAC ≥ 8x

SE TRUE → Procedi a Stage 4 (accelera la crescita)
SE NPS < 35 o Churn > 6% → NON scalare, continua a iterare il prodotto
```

⚠️ **ATTENZIONE:** scalare un prodotto senza PMF è la forma più efficiente di distruggere capitale.

---

## STAGE 4 — Scala Italia
### Mesi 13-24 · Budget: €200.000-300.000 (da fundraising)

**Obiettivo:** Moltiplicare ciò che funziona. CAC down, LTV up, network effect attivato.

**Il rischio principale da eliminare:** R8 — esaurimento capitale.

### Canali di crescita in ordine di priorità

**1. Content Marketing + SEO (mese 13-18, ROI più alto)**

Produce contenuti ad alto valore che il target cerca già:
- "Quanto guadagna un developer React in Italia nel 2026?" (benchmark mensile)
- "Come strutturare un contratto da freelance con una PMI" (guida legale)
- "Stato del lavoro digitale in Italia" (report semestrale)

Ogni articolo:
- Risolve un problema reale del target
- Ha dati originali (dal network TALENTIO, anonimizzati)
- È ottimizzato per keyword con volume ≥ 500 ricerche/mese
- Include una CTA alla waitlist/registrazione

Obiettivo mese 18: 10.000 visitatori organici/mese → 500 conversioni/mese.

**2. Referral Program Potenziato (attivo da mese 13)**

Upgrade del referral:
- Tier 1: porta 1 utente → 1 mese gratis
- Tier 2: porta 5 utenti → 3 mesi gratis + badge "Ambassador"
- Tier 3: porta 20 utenti → piano gratis a vita (costo per te: €89/mese, valore per te: rete di venditori)

**3. Partnership Associazioni (mese 14-18)**

Target: CNA Professioni, Confcommercio, Confartigianato, Assintel

Proposta per loro: "TALENTIO offre ai tuoi associati 30% di sconto + matching prioritario."
Proposta per noi: accesso a 50.000 potenziali utenti qualificati per il costo di un accordo commerciale.

**Come chiudere questi accordi:**
- Non iniziare dall'ufficio legale dell'associazione (troppo lento)
- Trova il responsabile digitale / giovani imprenditori / startup lab
- Porta dati: "I tuoi associati perdono in media €18K/anno in biz dev non pagato"
- Proponi un pilota: 50 associati per 3 mesi gratuiti, poi report

**4. Fundraising (mese 15-18)**

**Quando raccogliere: solo dopo che hai PMF confermato e MRR ≥ €25K.**

**Quanto raccogliere:** €350K-500K seed round.

**Da chi raccogliere (in ordine):**
1. Business Angel italiani con portfolio tech: CDP Venture Capital (fondo nazionale), angel.co/italy
2. Incubatori/acceleratori: Accelerace, Luiss EnLabs, Talent Garden
3. VC europei specializzati Future of Work: Point Nine Capital, Balderton, Cherry Ventures

**Cosa avere pronto PRIMA di iniziare il fundraising:**
- [ ] Data room: tutto il contenuto di `startup-kit/` in formato investor-friendly
- [ ] Deck 12 slide (vedi template §8)
- [ ] MRR chart degli ultimi 6 mesi (deve essere in crescita)
- [ ] Cohort analysis: retention per mese di acquisizione
- [ ] 3 customer case study video (60 secondi ciascuno)
- [ ] Lettera di interesse da almeno 1 associazione di categoria

---

### Gate Stage 4

```
□ €1M ARR (€83K MRR)
□ LTV/CAC ≥ 10x
□ CAC ≤ €130 (in calo rispetto a Stage 3)
□ NPS ≥ 55
□ Churn ≤ 2.5%
□ 2.000+ utenti attivi paganti
□ ≥ 3 partnership associazioni attive
□ Seed round chiuso (o break-even confermato)
□ Team: ≥ 6 persone (CTO + 2 dev + 1 growth + 1 ops + 1 CS)

SE TRUE → Procedi a Stage 5 (Europa)
```

---

## STAGE 5 — Europa
### Mesi 25-36 · Budget: da Series A (€2-5M)

**Obiettivo:** Replicare il playbook italiano in Germania, Francia, Spagna.

**Strategia di espansione:**

Non espandere in tutti i paesi contemporaneamente.
Scegli il secondo paese basandoti su dati:
- Quale paese ha più utenti attivi organici sulla piattaforma?
- Quale paese ha la community freelance tech più matura?
- Dove ha più senso la Platform Work Directive EU per noi?

**Probabile ordine:** Italia → Germania (mercato più grande, cultura PMI simile) → Francia → Spagna

**Cosa adattare per ogni paese:**
- [ ] Lingua della piattaforma
- [ ] Verifica identità fiscale locale (equivalente P.IVA)
- [ ] Compliance normativa locale sul lavoro
- [ ] Pricing adattato al potere d'acquisto locale
- [ ] Community manager madrelingua

**Cosa NON cambiare:**
- Stack tecnologico (stessa base)
- AI engine (funziona cross-lingua)
- Modello di business (abbonamento + royalty — unico nel settore)

---

## Daily Operating System — Come Gestisci le Giornate

Un sistema operativo quotidiano chiaro riduce le decisioni da prendere (decision fatigue) e mantiene il focus sul lavoro ad alto impatto.

### Struttura della settimana

```
LUNEDÌ    │ Review KPI settimana precedente (30 min)
          │ Priorità della settimana (3 obiettivi max)
          │ Sessione deep work prodotto (3-4h)

MARTEDÌ   │ Customer interviews / calls (mattina)
          │ Deep work (pomeriggio)

MERCOLEDÌ │ Team sync (quando avrai il team)
          │ Decisioni in sospeso
          │ Deep work

GIOVEDÌ   │ Lavoro di network / partnership
          │ LinkedIn post settimanale
          │ Deep work

VENERDÌ   │ Weekly review (che ha funzionato? cosa blocca?)
          │ Update KPI dashboard
          │ Pianifica la settimana successiva

WEEKEND   │ Disconnetti — la chiarezza viene dalla distanza
```

### Le 3 domande quotidiane (ogni mattina, 5 minuti)

1. **Cosa è la cosa più importante che posso fare OGGI per avanzare al gate successivo?**
2. **Cosa mi sta spaventando di fare che so dovrei fare?** (falla per prima)
3. **C'è qualcosa che sto facendo che non dovrei fare IO?** (delegalo o eliminalo)

---

## Decision Framework — Cosa Fare Quando le Cose Non Vanno

### Il Triangolo Pivot-Persevere-Stop

```
SEGNALE RICEVUTO (KPI sotto obiettivo)
         │
         ▼
È il problema del PRODOTTO o del MERCATO?
         │
    ┌────┴────┐
  PRODOTTO   MERCATO
    │              │
    ▼              ▼
Iterazione   Cambio di target
(persevera)  (pivot leggero)
    │              │
    └────┬─────────┘
         │
         ▼
Il KPI migliora entro 4 settimane?
         │
    ┌────┴────┐
   SÌ        NO
    │         │
    ▼         ▼
Continua   Il KPI migliora
           entro altre 4 settimane?
                  │
             ┌────┴────┐
            SÌ         NO
             │          │
             ▼          ▼
          Continua    STOP o PIVOT RADICALE
                      (cambia segmento / modello)
```

### Pivot playbook specifico per TALENTIO

| Scenario | Segnale | Pivot consigliato |
|----------|---------|------------------|
| Nessuno paga la royalty | <30% WTP nelle interviste | Modello solo abbonamento, niente royalty |
| Match quality scadente | Acceptance rate <30% | Matching manuale + AI come supporto (non primario) |
| Solo freelance si iscrivono, poche PMI | Squilibrio >4:1 nel network | Pivot: diventa "talent agency" per PMI (B2B puro) |
| PMI non completano i contratti | Completion rate <50% | Riduci il ticket minimo, punta su micro-progetti |
| Churn > 8% per 3 mesi consecutivi | Nonostante iterazioni | Cambia verticale (es: solo legale, solo design) |

---

## Deck Investitori — Struttura 12 Slide

Quando sei pronto per il fundraising, questo è l'ordine:

| # | Slide | Contenuto chiave |
|---|-------|-----------------|
| 1 | Cover | TALENTIO + "Il network AI per professionisti tech italiani" |
| 2 | Il Problema | Dati delle interviste. Euro persi. Percentuali reali. |
| 3 | La Soluzione | Demo screenshot o video 60 secondi |
| 4 | Traction | MRR chart, GMV, NPS, retention. Solo numeri reali. |
| 5 | Mercato | TAM/SAM/SOM con fonti citate |
| 6 | Business Model | Abbonamento + royalty. Unit economics. |
| 7 | Come funziona l'AI | Schema semplice dell'engine, nessun tecnicismo |
| 8 | Competitor | Tabella comparativa onesta (non "non abbiamo competitor") |
| 9 | Go-to-Market | Prossimi 12 mesi. Canali specifici. Budget specifico. |
| 10 | Team | Founder + CTO + advisor. LinkedIn. Track record reale. |
| 11 | Financials | P&L 3 anni. Assumptions chiare. Scenario base vs ottimistico. |
| 12 | The Ask | €X per Y mesi. Come viene usato. Milestone che si raggiungono. |

**Regola per il deck:** se un investitore non capisce la slide in 10 secondi, riscrivila.

---

## Metriche Master — Quello che Misuri Ogni Settimana

```
┌─────────────────────────────────────────────────────────────────┐
│                  TALENTIO · KPI DASHBOARD                       │
├─────────────────┬──────────────────────────────────────────────┤
│ CRESCITA        │                                              │
│ MRR             │ €_____ (+__% vs settimana prec.)            │
│ Nuovi utenti    │ _____ (freemium: __ | paid: __)             │
│ Waitlist        │ _____                                        │
├─────────────────┼──────────────────────────────────────────────┤
│ ENGAGEMENT      │                                              │
│ Match creati    │ _____                                        │
│ Match accettati │ _____  (acceptance rate: __%)                │
│ Contratti       │ _____                                        │
│ GMV settimana   │ €_____                                       │
├─────────────────┼──────────────────────────────────────────────┤
│ SALUTE          │                                              │
│ Churn mensile   │ _____% (target: <3%)                        │
│ NPS             │ _____ (target: >50)                         │
│ Completion rate │ _____% (target: >85%)                       │
├─────────────────┼──────────────────────────────────────────────┤
│ ECONOMIA        │                                              │
│ CAC             │ €_____ (target: <€150)                      │
│ LTV             │ €_____                                       │
│ LTV/CAC         │ _____x (target: >10x)                       │
│ Runway rimanente│ _____ mesi                                   │
├─────────────────┼──────────────────────────────────────────────┤
│ STAGE ATTUALE   │ _____ · Gate: __/__  (□□□□□)                │
└─────────────────┴──────────────────────────────────────────────┘
```

Strumento consigliato per il tracking: Google Sheets connesso a Supabase via script automatico.

---

## Prossime Azioni Immediate (da fare questa settimana)

Indipendentemente da tutto il resto, questi 5 step vanno completati entro 7 giorni:

| Priorità | Azione | Tempo | Bloccante per |
|----------|--------|-------|--------------|
| 🔴 P0 | Scrivi lista di 50 persone da intervistare (nomi + contatti) | 2h | Stage 0 |
| 🔴 P0 | Contatta i primi 15 per fissare intervista questa settimana | 1h | Stage 0 |
| 🔴 P0 | Deploy landing page su Vercel (segui DEPLOY.md) | 30min | Stage 0 |
| 🟡 P1 | Registra dominio talentio.eu o talentio.it | 15min | Branding |
| 🟡 P1 | Crea account Supabase + esegui SQL della tabella waitlist | 20min | Stage 0 |

---

*Piano creato: Giugno 2026 · Basato su lean startup methodology, Paul Graham essays, "The Mom Test" di Rob Fitzpatrick, "Zero to One" di Peter Thiel*
