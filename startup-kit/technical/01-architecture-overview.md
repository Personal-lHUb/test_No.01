# Architettura Tecnica · 01 — Overview

---

## 1. Principi Architetturali

| Principio | Implicazione pratica |
|-----------|---------------------|
| **AI-first** | Il matching non è un'aggiunta — è il cuore del sistema. Tutti i dati vengono raccolti pensando al training |
| **Automation-first** | Ogni flusso manuale è un debito tecnico. L'obiettivo è <2h/giorno di intervento umano |
| **Privacy & compliance** | GDPR-native, P.IVA verification italiana, Platform Work Directive EU ready |
| **MVP veloce, scale senza riscrivere** | Stack scelto per andare live in 8 settimane, ma sostenibile fino a 100K utenti senza refactor |
| **Mobile-first** | L'80% degli utenti accederà da mobile — la PWA è un cittadino di prima classe, non un'aggiunta |

---

## 2. Architettura di Sistema

```
┌─────────────────────────────────────────────────────────────┐
│                        UTENTI                               │
│   Freelance / P.IVA      PMI          Agenzie               │
└──────────────────┬──────────────────────────────────────────┘
                   │ HTTPS
┌──────────────────▼──────────────────────────────────────────┐
│                   FRONTEND LAYER                            │
│   Next.js 15 (App Router) · TypeScript · TailwindCSS        │
│   PWA (installabile, offline-capable)                       │
│   CDN: Vercel Edge Network                                  │
└──────────────────┬──────────────────────────────────────────┘
                   │ API calls
┌──────────────────▼──────────────────────────────────────────┐
│                    API GATEWAY                              │
│   GraphQL (queries/mutations) · REST (webhook + ext. API)   │
│   Rate limiting · Auth middleware · Logging                 │
└──────┬───────────┬───────────┬───────────┬──────────────────┘
       │           │           │           │
┌──────▼──┐  ┌────▼────┐  ┌───▼────┐  ┌──▼──────────┐
│  AUTH   │  │MATCHING │  │PAYMENT │  │  NOTIFICA   │
│SERVICE  │  │  AI     │  │SERVICE │  │   TIONS     │
│Supabase │  │Python + │  │Stripe  │  │Email+Push   │
│Auth     │  │FastAPI  │  │Connect │  │             │
└──────┬──┘  └────┬────┘  └───┬────┘  └─────────────┘
       │           │           │
┌──────▼───────────▼───────────▼──────────────────────────────┐
│                      DATA LAYER                             │
│  PostgreSQL (main)  │  Redis (cache)  │  pgvector (embed.)  │
│  Supabase hosted   │  Upstash        │  Supabase ext.      │
└─────────────────────────────────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────────────┐
│              SERVIZI ESTERNI                                │
│  OpenAI API · Stripe · DocuSign · Revenue Agency IT · S3    │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Flussi Utente Principali

### 3.1 Flusso Freelance — Onboarding e Primo Match

```
1. Registrazione (email/LinkedIn OAuth)
2. Verifica P.IVA → API Agenzia delle Entrate
3. Compilazione profilo (skill, portfolio, tariffa, disponibilità)
4. AI genera embedding del profilo → salvato in pgvector
5. Notifica: "Il tuo profilo è attivo — il primo match può arrivare in 24h"
6. [AI BACKGROUND] Matching engine controlla nuovi progetti ogni ora
7. Match trovato → notifica email + in-app → freelance accetta/rifiuta
8. Se accettato → chat con PMI → contratto → firma → lavoro → pagamento → review
```

### 3.2 Flusso PMI — Postare un Progetto e Ricevere Match

```
1. Registrazione aziendale (P.IVA + verifica email dominio)
2. Abbonamento PMI (trial 14 giorni)
3. Post progetto: titolo, descrizione, skill richieste, budget, timeline
4. AI genera embedding del progetto
5. Matching engine trova top 3-5 profili compatibili
6. PMI riceve email: "3 profili selezionati per il tuo progetto"
7. PMI esamina profili scorati, seleziona uno o richiede altri match
8. Contratto → firma digitale → milestone setup → pagamento escrow → lavoro → rilascio → review
```

### 3.3 Flusso Contratto e Pagamento (Automatizzato)

```
1. Match accettato da entrambe le parti
2. Template contratto pre-compilato (dati profilo + progetto)
3. Firma digitale (DocuSign API o HelloSign)
4. PMI deposita importo su escrow Stripe
5. Milestone 1 completata → freelance notifica
6. PMI approva → Stripe rilascia milestone 1 al netto royalty
7. TALENTIO riceve royalty automaticamente via Stripe Connect
8. Fattura auto-generata per entrambe le parti
9. Fine progetto → review reciproca obbligatoria
```

---

## 4. Integrazioni Esterne

| Servizio | Uso | Alternativa MVP |
|----------|-----|----------------|
| **Stripe Connect** | Pagamenti marketplace, royalty split, abbonamenti | Obbligatorio |
| **Supabase** | Auth, database PostgreSQL, storage | Firebase (fallback) |
| **OpenAI API** | Embedding profili/progetti, BI insights, parsing requisiti | Cohere (fallback) |
| **DocuSign / HelloSign** | Firma digitale contratti | PDF + email (MVP grossolano) |
| **Agenzia Entrate API** | Verifica P.IVA italiana | Verifica manuale (beta) |
| **AWS S3** | Storage portfolio, documenti | Supabase Storage (MVP) |
| **Resend / Postmark** | Email transazionali | SendGrid |
| **Sentry** | Error tracking | LogRocket |
| **PostHog** | Product analytics | Mixpanel |

---

## 5. Sicurezza e Compliance

### GDPR
- Data minimization: raccolta solo dei dati necessari al matching
- Right to erasure: pipeline di cancellazione dati in <30 giorni
- Data portability: export profilo in JSON/PDF su richiesta
- DPA (Data Processing Agreement) con tutti i vendor

### Sicurezza applicativa
- JWT + refresh token rotation (Supabase Auth)
- Rate limiting su tutte le API pubbliche
- Input sanitization + SQL injection prevention (ORM Prisma)
- HTTPS forzato, HSTS header
- Audit log per accessi sensibili (dati finanziari, contratti)
- Penetration test prima del lancio pubblico

### Compliance italiana
- Fatturazione elettronica B2B obbligatoria → integrazione SDI (Sistema di Interscambio)
- Ritenuta d'acconto automatica dove applicabile
- Privacy policy + cookie policy compliant

---

## 6. Scalabilità e SLA

| Metrica | MVP (0-2K utenti) | Scale (2K-50K utenti) |
|---------|------------------|----------------------|
| Infrastructure | Vercel + Supabase + Railway | AWS ECS + RDS + ElastiCache |
| Uptime target | 99.5% | 99.9% |
| Matching latency | <5 secondi | <2 secondi |
| API response time | <500ms (p95) | <200ms (p95) |
| Database | Supabase Free/Pro | RDS PostgreSQL Multi-AZ |
| Backup | Daily (Supabase) | Continuous (RDS point-in-time) |

---

*Documento successivo: [02 — Tech Stack](./02-tech-stack.md)*
