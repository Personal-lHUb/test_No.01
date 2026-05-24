# Roadmap · 01 — MVP Features e User Stories

---

## 1. Principi di Prioritizzazione

Le feature sono prioritizzate con il framework **RICE**:
- **R**each: quanti utenti tocca
- **I**mpact: quanto impatta sul KPI principale (transazione completata)
- **C**onfidence: quanto siamo sicuri della stima
- **E**ffort: settimane di sviluppo

**Regola d'oro MVP:** se non abilita una transazione completa (match → contratto → pagamento → review), aspetta la fase 2.

---

## 2. User Stories per Ruolo

### 2.1 Freelance / P.IVA

#### Onboarding
- **US-F01:** Come freelance, posso registrarmi con email o LinkedIn OAuth
- **US-F02:** Come freelance, posso inserire skill, bio, tariffa oraria e disponibilità nel profilo
- **US-F03:** Come freelance, posso caricare link al portfolio (GitHub, Behance, sito personale)
- **US-F04:** Come freelance, posso verificare la mia P.IVA inserendo il codice fiscale (validato via API)
- **US-F05:** Come freelance, posso scegliere un piano di abbonamento e pagare con carta via Stripe

#### Matching e Opportunità
- **US-F06:** Come freelance, ricevo una notifica email/push quando l'AI trova un match per il mio profilo
- **US-F07:** Come freelance, posso vedere il dettaglio del progetto matchato prima di decidere
- **US-F08:** Come freelance, posso accettare o rifiutare un match con un click (+ motivazione opzionale)
- **US-F09:** Come freelance, posso vedere tutti i miei match in una dashboard cronologica

#### Contratti e Pagamenti
- **US-F10:** Come freelance, posso firmare digitalmente il contratto standard direttamente in piattaforma
- **US-F11:** Come freelance, ricevo il pagamento automaticamente sulla mia IBAN al completamento di ogni milestone
- **US-F12:** Come freelance, ricevo una notifica quando la PMI approva una milestone
- **US-F13:** Come freelance, posso scaricare la fattura auto-generata in formato PDF

#### Review e Reputazione
- **US-F14:** Come freelance, ricevo un invito a lasciare una review alla PMI al completamento del progetto
- **US-F15:** Come freelance, posso vedere il mio reputation score e le mie review pubbliche
- **US-F16:** Come freelance, posso segnalare una review che ritiene falsa

#### Business Intelligence (Fase 2)
- **US-F17:** Come freelance, posso vedere il benchmark della mia tariffa rispetto al mercato (anonimizzato)
- **US-F18:** Come freelance, ricevo settimanalmente 3-5 insight personalizzati per crescere

---

### 2.2 PMI (lato domanda)

#### Onboarding
- **US-P01:** Come PMI, posso registrare l'azienda con P.IVA (verifica automatica)
- **US-P02:** Come PMI, posso descrivere il tipo di azienda, settore e dimensione
- **US-P03:** Come PMI, posso scegliere un piano PMI e attivare il trial gratuito di 14 giorni

#### Ricerca Talent
- **US-P04:** Come PMI, posso pubblicare un progetto con titolo, descrizione, skill richieste, budget e timeline
- **US-P05:** Come PMI, ricevo entro 24h una shortlist di 3-5 profili matchati dall'AI
- **US-P06:** Come PMI, posso vedere il profilo completo, le review e lo score di ogni candidato proposto
- **US-P07:** Come PMI, posso selezionare uno o più candidati da contattare
- **US-P08:** Come PMI, posso richiedere altri match se non sono soddisfatta dei primi (fino a 2 volte gratis)

#### Contratti e Pagamenti
- **US-P09:** Come PMI, posso firmare il contratto standard con firma digitale in piattaforma
- **US-P10:** Come PMI, posso strutturare il pagamento in milestone (es. 30% inizio, 70% fine)
- **US-P11:** Come PMI, pago via carta o bonifico SEPA — i fondi vanno in escrow fino all'approvazione
- **US-P12:** Come PMI, approvo la milestone completata con un click per sbloccare il pagamento
- **US-P13:** Come PMI, ricevo fatture automatiche per ogni pagamento effettuato

#### Review
- **US-P14:** Come PMI, posso lasciare una review al freelance al completamento del progetto
- **US-P15:** Come PMI, posso segnalare problemi di qualità durante il progetto (apertura disputa)

---

### 2.3 Agenzie / Team

- **US-A01:** Come agenzia, posso creare un account team con più seat (piano Agency)
- **US-A02:** Come agenzia, posso invitare collaboratori al mio account
- **US-A03:** Come agenzia, posso gestire progetti interni ed esterni dalla stessa dashboard
- **US-A04:** Come agenzia, posso fare overflow: assegnare un progetto ricevuto a un freelance del network
- **US-A05:** Come agenzia, guadagno royalty quando un mio collaboratore viene ingaggiato tramite il network

---

### 2.4 Piattaforma / Admin (interno)

- **US-ADM01:** Come admin, posso vedere KPI real-time: utenti, match, GMV, churn
- **US-ADM02:** Come admin, posso approvare manualmente profili flaggati per anomalie
- **US-ADM03:** Come admin, posso gestire dispute aperte con tool di mediazione
- **US-ADM04:** Come admin, posso bloccare utenti che violano i termini di servizio
- **US-ADM05:** Come admin, posso lanciare manualmente il re-matching per progetti bloccati

---

## 3. Feature List per Fase MVP

### Fase 0 — Foundation (Settimane 1-6) ← MINIMO VIABLE

| ID | Feature | Priorità | Settimane |
|----|---------|---------|-----------|
| F-01 | Auth (email + Google OAuth) | P0 | 0.5 |
| F-02 | Profilo freelance (skills, bio, tariffa, P.IVA) | P0 | 1 |
| F-03 | Profilo PMI (azienda, P.IVA, settore) | P0 | 0.5 |
| F-04 | Post progetto (PMI) | P0 | 1 |
| F-05 | Abbonamento Stripe (trial 14gg + payment) | P0 | 1 |
| F-06 | Email transazionali (welcome, match, contratto) | P0 | 0.5 |
| F-07 | Dashboard utente base (profilo + storico) | P0 | 0.5 |
| F-08 | Admin panel base (utenti, progetti, KPI) | P1 | 1 |
| **TOTALE** | | | **6 settimane** |

### Fase 1 — AI Core (Settimane 7-14)

| ID | Feature | Priorità | Settimane |
|----|---------|---------|-----------|
| F-09 | Embedding pipeline (OpenAI + pgvector) | P0 | 1.5 |
| F-10 | Matching engine v1 (cosine similarity + composite score) | P0 | 2 |
| F-11 | Notifica match (email + in-app) | P0 | 0.5 |
| F-12 | Accept/reject match con motivazione | P0 | 0.5 |
| F-13 | Chat in-app tra PMI e freelance post-match | P1 | 1 |
| F-14 | Review system (post-contratto) | P0 | 1 |
| F-15 | Reputation score (calcolo + display) | P1 | 0.5 |
| F-16 | PWA (installabile su mobile) | P2 | 1 |
| **TOTALE** | | | **8 settimane** |

### Fase 2 — Contratti e Pagamenti (Settimane 15-22)

| ID | Feature | Priorità | Settimane |
|----|---------|---------|-----------|
| F-17 | Template contratto + firma digitale (HelloSign) | P0 | 2 |
| F-18 | Pagamento escrow via Stripe Connect | P0 | 2 |
| F-19 | Milestone management (setup + approvazione) | P0 | 1 |
| F-20 | Royalty calculation + distribuzione automatica | P0 | 1 |
| F-21 | Fattura auto-generata (PDF + SDI) | P1 | 1.5 |
| F-22 | Dispute system (apertura + risoluzione) | P1 | 0.5 |
| **TOTALE** | | | **8 settimane** |

### Fase 3 — Intelligence Layer (Settimane 23-30)

| ID | Feature | Priorità | Settimane |
|----|---------|---------|-----------|
| F-23 | BI dashboard freelance (benchmark tariffe, skill gap) | P1 | 2 |
| F-24 | Weekly AI insights (GPT-4o, personalizzati) | P1 | 1.5 |
| F-25 | Referral program (tracking + credito automatico) | P1 | 1 |
| F-26 | Piano Agency (multi-seat, overflow) | P2 | 2 |
| F-27 | Featured profile (listing sponsorizzato) | P2 | 0.5 |
| F-28 | Analytics avanzati per PMI (trend talent, prezzi) | P2 | 1 |
| **TOTALE** | | | **8 settimane** |

---

## 4. Criteri di Accettazione — Feature Core

### F-10: Matching Engine v1

**Given** un progetto pubblicato da una PMI  
**When** il matching engine viene eseguito  
**Then:**
- Almeno 3 profili vengono restituiti entro 5 secondi
- Ogni profilo ha un `composite_score` > 0.6
- I profili hanno almeno il 50% delle skill richieste
- Il budget stimato rientra nel budget del progetto ±20%

**Edge cases da gestire:**
- Nessun profilo disponibile → notifica admin + match manuale entro 4h
- Tutti i profili rifiutano → rimatch automatico entro 24h (pool allargato)

### F-18: Pagamento Escrow

**Given** un contratto firmato  
**When** la PMI completa il pagamento  
**Then:**
- I fondi sono in escrow Stripe entro 5 minuti
- Email di conferma a PMI con ricevuta
- Email a freelance "Fondi in escrow — puoi iniziare il lavoro"
- Milestone sbloccata automaticamente

**When** la PMI approva una milestone  
**Then:**
- Stripe trasferisce automaticamente al netto royalty entro 24h
- Royalty accreditata al conto PRONET
- Fattura auto-generata per entrambe le parti

---

*Documento successivo: [02 — Milestones](./02-milestones.md)*
