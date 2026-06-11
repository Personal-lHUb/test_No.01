# Roadmap · 02 — Milestones e Timeline

---

## 1. Timeline Generale

```
MESE  1   2   3   4   5   6   7   8   9  10  11  12  18  24  36
      ├───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┤
      │   FASE 0  │   FASE 1  │   FASE 2  │   FASE 3  │ EU PREP│
      │ Foundation│  AI Core  │ Contratti │Intelligence│        │
      │           │           │Pagamenti  │            │        │
      │  BETA     │           │  LANCIO   │   SCALE    │        │
      │  privata  │           │  Italia   │            │        │
```

---

## 2. Milestone di Prodotto

### M0 — Alpha privata (Fine Mese 1)
**Obiettivo:** Piattaforma funzionante per test interni

Deliverable:
- [ ] Auth funzionante (email + Google)
- [ ] Creazione profilo freelance e PMI
- [ ] Pubblicazione progetto
- [ ] Abbonamento Stripe (trial)
- [ ] Database schema implementato
- [ ] Deploy su Vercel + Supabase

**Criterio di successo:** Il founder può completare un flusso end-to-end (registrazione → progetto → matching manuale) senza errori.

---

### M1 — Beta chiusa (Fine Mese 3)
**Obiettivo:** 50 utenti reali testano la piattaforma

Deliverable:
- [ ] Embedding pipeline funzionante
- [ ] Matching engine v1 attivo
- [ ] Notifiche email operative
- [ ] Review system base
- [ ] 50 profili freelance onboarded manualmente
- [ ] 10 PMI pilota attive con progetti reali

**Criterio di successo:**
- 10 match completati
- NPS ≥ 35 (survey post-match)
- Matching latency < 10 secondi
- 0 bug critici in produzione

---

### M2 — Beta aperta con pagamenti (Fine Mese 5)
**Obiettivo:** Prima transazione reale completata sulla piattaforma

Deliverable:
- [ ] Stripe Connect attivo (escrow + royalty split)
- [ ] Contratto digitale (HelloSign integrato)
- [ ] Milestone management funzionante
- [ ] Fattura auto-generata
- [ ] 200 utenti totali in beta

**Criterio di successo:**
- Almeno 5 contratti firmati e pagamenti completati
- GMV > €0 (anche €1.000 è sufficiente per validare)
- Royalty calcolata e accreditata correttamente al 100%
- 0 dispute non risolte

---

### M3 — Lancio pubblico Italia (Fine Mese 7)
**Obiettivo:** Apertura al pubblico, primi utenti paganti acquisiti da canali

Deliverable:
- [ ] Landing page pubblica con SEO ottimizzato
- [ ] Blog + primo report di mercato pubblicato
- [ ] Referral program attivo
- [ ] PWA installabile
- [ ] Prezzi pubblici + piani visibili
- [ ] Pagina press/media

**Criterio di successo:**
- 200 utenti paganti (non beta)
- CAC ≤ €220
- Churn mensile ≤ 6%
- ARR run-rate ≥ €50K

---

### M4 — Intelligence Layer (Fine Mese 9)
**Obiettivo:** Attivazione BI e insights personalizzati

Deliverable:
- [ ] BI dashboard per freelance attiva
- [ ] Weekly AI insights via email
- [ ] Benchmark tariffe (anonimizzato)
- [ ] Piano Agency lanciato

**Criterio di successo:**
- 500 utenti attivi paganti
- NPS ≥ 50
- CTR su insights settimanali ≥ 25%
- ARR run-rate ≥ €200K

---

### M5 — Serie A ready (Fine Mese 12)
**Obiettivo:** Metriche pronte per fundraising Series A

Deliverable:
- [ ] 1.500+ utenti attivi
- [ ] ARR ≥ €1M
- [ ] 3 case study documentati (PMI + freelance + agenzia)
- [ ] LTV/CAC ≥ 8x
- [ ] Churn ≤ 3.5%
- [ ] Team: 6-8 persone (CTO, 2 dev, 1 growth, 1 ops, 1 customer success)

---

### M6 — Espansione Europea (Mese 18-24)
**Obiettivo:** Presenza attiva in almeno 2 paesi EU oltre Italia

Deliverable:
- [ ] Piattaforma in inglese (+ 1 lingua locale)
- [ ] Compliance GDPR + normativa locale attiva
- [ ] Partnership con 1 acceleratore EU
- [ ] 5.000+ utenti totali (IT + EU)
- [ ] ARR ≥ €3M

---

## 3. Milestone di Team

| Mese | Hire critico | Motivazione |
|------|-------------|-------------|
| **Mese 1** | CTO / Lead Dev (co-founder) | Senza questo hire, lo sviluppo non parte |
| **Mese 3** | Community Manager / Growth | Necessario per la fase 0 → beta aperta |
| **Mese 5** | Customer Success (part-time) | Onboarding white-glove per i primi utenti paganti |
| **Mese 7** | 2° Sviluppatore (frontend) | Accelerare la fase di lancio |
| **Mese 9** | Head of Marketing / Content | Scalare l'acquisizione organica |
| **Mese 12** | Business Development | Partnerships agenzie + PMI enterprise |

---

## 4. Milestone di Business

| Milestone | Target | Mese |
|-----------|--------|------|
| Prima transazione sulla piattaforma | >€0 GMV | M5 |
| Break-even mensile | Revenue > Costi | M11-13 |
| €1M ARR | 1.000 utenti × €100 ARPU | M12-14 |
| Prima partnership associazione di categoria | CNA / Confartigianato | M5 |
| Primo articolo press nazionale | Sole 24 Ore / Wired IT / StartupItalia | M8 |
| Prima agenzia > 10 collaboratori onboarded | — | M6 |
| 10.000 contratti completati cumulativi | — | M18 |

---

## 5. Rischi per Milestone e Piano di Contingenza

| Milestone | Rischio principale | Piano B |
|-----------|------------------|---------|
| **M1 — Beta chiusa** | CTO non trovato in tempo | Assumere una dev agency per l'MVP (€30-50K), cercare CTO in parallelo |
| **M2 — Pagamenti** | Stripe Connect approvazione lenta | Avviare il processo Stripe subito al mese 1; avere un fallback (bonifici manuali + royalty manuale) |
| **M3 — Lancio** | Acquisizione utenti troppo lenta | Reclutamento manuale aggressivo (founder goes direct), offerta "3 mesi gratis" per le prime 100 PMI |
| **M4 — BI** | Qualità AI insights insufficiente | A/B test su messaggi curati a mano vs AI; lanciare BI solo quando qualità supera soglia NPS |
| **M5 — Serie A ready** | Churn troppo alto | Interviste settimanali, pivot su onboarding, ridurre fricción nel primo match |

---

## 6. Checklist pre-lancio pubblico (M3)

### Prodotto
- [ ] Matching engine testato con >100 match reali
- [ ] Zero P0/P1 bug aperti
- [ ] Load test completato (500 utenti simultanei)
- [ ] Mobile experience testata su iOS Safari e Android Chrome
- [ ] Flusso completo (registrazione → match → contratto → pagamento) completato in <20 minuti

### Legal & Compliance
- [ ] T&C e Privacy Policy redatti da avvocato specializzato
- [ ] GDPR compliance verificata
- [ ] Contratto standard revisionato da legale
- [ ] P.IVA verification flow approvato dall'Agenzia delle Entrate

### Business
- [ ] Prezzi e piani confermati
- [ ] Metodo di pagamento accettato (Stripe approvato per marketplace)
- [ ] Processo di rimborso documentato
- [ ] SLA cliente documentato

### Marketing
- [ ] Landing page live
- [ ] SEO on-page ottimizzato per keyword primarie
- [ ] Email di benvenuto testata su mobile
- [ ] Analytics (PostHog/Mixpanel) configurati per KPI critici

---

## 7. KPI Dashboard — Cosa Misurare Ogni Settimana

| KPI | Strumento | Target M3 | Target M6 | Target M12 |
|-----|-----------|-----------|-----------|------------|
| Utenti attivi | PostHog | 200 | 500 | 1.500 |
| MRR | Stripe | €6K | €25K | €85K |
| Match creati/settimana | DB query | 50 | 200 | 800 |
| Match acceptance rate | DB | >40% | >50% | >60% |
| Contratti firmati/settimana | DB | 5 | 25 | 100 |
| Contratti completati/tot. | DB | >80% | >85% | >88% |
| GMV settimanale | Stripe | €5K | €30K | €150K |
| NPS | Typeform | >45 | >52 | >58 |
| Churn mensile | ChurnKey | <6% | <4% | <3% |
| CAC | Spreadsheet | <€220 | <€170 | <€130 |

---

*Fine Roadmap — Torna a: [README](../README.md)*
