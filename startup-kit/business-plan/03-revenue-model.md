# Business Plan · 03 — Revenue Model

---

## 1. Logica del Modello Ibrido

TALENTIO adotta un modello **abbonamento + royalty** dove i due componenti si rinforzano:

- **Abbonamento:** revenue prevedibile, filtra i free-rider, finanzia lo sviluppo del prodotto
- **Royalty sulle transazioni:** allinea gli incentivi — TALENTIO guadagna di più solo quando i membri guadagnano di più; il piano più costoso ha royalty inferiore, incentivando l'upgrade

**Principio chiave:** la royalty non è una punizione — è il costo dell'infrastruttura che trova i clienti al posto tuo. I membri Starter risparmiano il 60% del tempo in business dev ma cedono il 7% del fatturato; i membri Pro pagano di più ma cedono solo il 4.5%. L'ROI rimane fortemente positivo in entrambi i casi.

### 1.1 Perché il modello ibrido è ottimale — dati di mercato verificati

| Modello | CLV vs. pure transactional | Valuation multiple | Churn primi 90 giorni | Fonte |
|---------|--------------------------|-------------------|----------------------|-------|
| Pure transactional (es. Upwork) | baseline | 1,01–1,37x revenue | **43%** | Benchmarkit 2024 |
| Pure subscription | **+70% CLV** | 2,28–2,53x revenue | ~15–20% | ACR Journal; Swell.is |
| **Hybrid sub + royalty (TALENTIO)** | **+44–78% CLV** | **~2,0–2,4x revenue** | ~15–20% | a16z; NFX |

**Conclusione:** il modello ibrido è il più favorevole agli investitori (multiplo di valutazione) E ai clienti (lower churn), pur mantenendo il link transazionale che giustifica la royalty.

### 1.2 Confronto competitivo: quanto costa davvero la concorrenza

| Piattaforma | Costo freelancer | Costo cliente | Costo totale reale | Note |
|-------------|-----------------|--------------|-------------------|------|
| **Upwork** | 0–15% | 3–10% + fees | **22–34%** del valore contratto | Costo nascosto, resistenza crescente |
| **Malt** | 2–10% | 15–20% | **17–30%** | Solo commissione, no subscription value |
| **Toptal** | 0% (margin nel blended) | blended $60–200+/ora | **30–50%** stima | Solo enterprise |
| **TALENTIO Pro + PMI Pro** | €89/mese + 4,5% | €349/mese + 4% | **~€5–9% + sub flat** | ROI positivo già al 1° progetto |

Su un progetto da €8.000: Upwork costa €1.760–€2.720; TALENTIO Pro costa €360 (royalty) + ~€178 (quota mensile bimestrale) = **€538 totale** — risparmio del 70%+ vs Upwork.

### 1.3 Evoluzione struttura fee verso la scala

**Insight da Braintrust (1,25M membri, $4B+ processed):** il modello più efficace per supply-side retention è **0% fee freelancer, fee solo lato cliente**. I freelancer non percepiscono la piattaforma come una tassa ma come un enabler.

**Roadmap evoluzione TALENTIO:**
- **Fase MVP (0–2.000 utenti):** modello attuale — royalty su entrambi i lati, subscription su entrambi i lati
- **Fase Scale (2.000–10.000 utenti):** introduzione opzione "subscription-only" per freelancer senior (€149/mese, 0% royalty) — incentiva i top earner a rimanere sulla piattaforma
- **Fase Maturità (10.000+ utenti):** struttura ottimale Braintrust-inspired — freelancer pagano solo subscription; PMI pagano subscription + royalty

---

## 2. Piani di Abbonamento

### 2.1 Lato Offerta (Freelance, P.IVA, Agenzie)

| Piano | Prezzo mensile | Royalty | Target | Incluso |
|-------|---------------|---------|--------|---------|
| **Free** | €0 | — | Esplorazione | Profilo base, ricerca limitata, nessun match AI |
| **Starter** | €39/mese | 7% | Freelance entry-level / neolaureati | 5 match/mese, profilo verificato, review |
| **Pro** | €89/mese | 4.5% | Freelance con 2+ anni di esperienza | Match illimitati, BI dashboard, priority listing |
| **Agency** | €249/mese | 3% | Team 2-20 persone | Tutto Pro × 5 seat, gestione overflow, analytics avanzati |
| **Agency Plus** | €599/mese | 2% | Agenzie 20-50 persone | Seat illimitati, API access, white-label parziale |

### 2.2 Lato Domanda (PMI)

| Piano | Prezzo mensile | Royalty | Target | Incluso |
|-------|---------------|---------|--------|---------|
| **PMI Starter** | €149/mese | 6% | PMI <20 dipendenti, 1-2 progetti/anno | 3 match/mese, contratti standard, pagamenti |
| **PMI Pro** | €349/mese | 4% | PMI 20-100 dipendenti, >3 progetti/anno | Match illimitati, BI fornitori, account manager AI |
| **PMI Scale** | €699/mese | 2.5% | PMI 100-250 dipendenti | Multi-progetto simultaneo, integrazioni HR (Zucchetti, TeamSystem) |
| **Enterprise** | Custom | Negoziabile | >250 dipendenti / Corporate | SLA dedicato, onboarding white-glove, API full |

### 2.3 Fatturazione

- Tutti i piani fatturati mensilmente o annualmente (sconto 20% annuale)
- Trial gratuito di 14 giorni per tutti i piani paganti
- Nessuna carta richiesta per il piano Free

---

## 3. Meccanismo della Royalty

### 3.1 Come funziona

1. PMI e freelance si accordano su un valore contrattuale (es. €10.000)
2. Il contratto viene firmato digitalmente sulla piattaforma
3. I pagamenti avvengono via Stripe Connect (escrow)
4. A ogni milestone completata, TALENTIO trattiene automaticamente la royalty prima di accreditare il freelance
5. Il freelance riceve il netto; la PMI paga il lordo

### 3.2 Esempio pratico

**Scenario:** Freelance Piano Pro, progetto €8.000

| Voce | Importo |
|------|---------|
| Valore contratto | €8.000 |
| Royalty TALENTIO (4.5%) | €360 |
| Netto al freelance | €7.640 |
| Abbonamento mensile freelance | €89 |
| **Revenue TALENTIO dal progetto** | **€449** |

**ROI per il freelance:**
- Ha trovato il cliente in 24h invece di 2 settimane
- Ha risparmiato ~60h di business dev (valore: €3.000-6.000 al suo tariffario)
- Ha pagato €449 alla piattaforma
- **ROI: >500%**

### 3.3 Royalty sui referral (Network Effect)

Ogni membro che porta un nuovo membro pagante guadagna:
- **1 mese gratuito** sul proprio abbonamento per ogni referral attivo
- **0.5% extra** sulla royalty del referral per i primi 12 mesi (pagato da TALENTIO, non dal membro referito)

Questo crea un flywheel: i membri migliori portano altri professionisti di qualità, che migliorano il network, che aumenta il valore per tutti.

---

## 4. Revenue Streams Secondari

| Fonte | Descrizione | Anno 1 | Anno 2 |
|-------|-------------|--------|--------|
| **Featured Profile** | Profilo in evidenza nelle ricerche target per 30 giorni | €20K | €65K |
| **Skill Badge** | Certificazioni verificate (es. AWS Partner, Google Cloud) vendute ai partner | €0 | €45K |
| **Market Intelligence Report** | Report trimestrali su trend, prezzi, skill demand — venduti a HR/VC/consulenti | €0 | €25K |
| **API Data Access** | Dati anonimizzati e aggregati per ricercatori, università, fondi | €0 | €15K |
| **Formazione / Upskilling** | Corsi consigliati dall'AI con revenue share con provider | €0 | €30K |

---

## 5. Unit Economics

### 5.1 Metriche chiave

| Metrica | Anno 1 (early) | Anno 2 (growing) | Anno 3 (mature) | Benchmark settore |
|---------|---------------|-----------------|----------------|-------------------|
| ARPU mensile | €90 | €130 | €150 | B2B marketplace: €100–€250 |
| CAC (self-serve) | €220 | €165 | €130 | Benchmark: $200–$600 |
| LTV (18 mesi avg.) | €1.620 | €2.340 | €2.700 | — |
| LTV/CAC | 7.4x | 14.2x | 20.8x | **Benchmark: 3,6x** (Benchmarkit 2024) |
| Churn mensile | 5% | 3.5% | 2.5% | Obiettivo <3%; pure transactional: 43% nei primi 90gg |
| Payback period | 2.4 mesi | 1.3 mesi | 0.9 mesi | Benchmark settore: 6–12 mesi |
| Gross Margin | 72% | 78% | 82% | Benchmark SaaS: 70–85%; Upwork GAAP: 77% (2024) |

**Nota:** i target LTV/CAC di 7–20x superano significativamente il benchmark di settore (3,6x). Anno 1 è realistico grazie al basso CAC supply-side (community-driven). Anni 2–3 richiedono retention superiore alla media — dipende dalla qualità dei match e dal NPS.

### 5.2 Breakdown costi variabili per utente/mese

| Voce | Costo |
|------|-------|
| Infrastruttura cloud (AWS/Vercel) | €3.20 |
| AI API calls (matching + BI) | €4.80 |
| Stripe fees (0.5% GMV + fisso) | ~€8.50 |
| Customer support (prorated) | €6.00 |
| **Totale costi variabili** | **~€22.50** |

Con ARPU di €150, il **contribution margin per utente è ~€127/mese** (85%).

---

## 6. Proiezioni Finanziarie

### 6.1 Scenario Base (ipotesi di crescita moderate)

| Mese | Utenti attivi | MRR | ARR run-rate |
|------|-------------|-----|-------------|
| M3 | 50 | €4.500 | €54K |
| M6 | 180 | €16.200 | €194K |
| M9 | 320 | €28.800 | €346K |
| M12 | 450 | €40.500 | €486K |
| M18 | 1.100 | €143K | €1.7M |
| M24 | 2.800 | €364K | €4.4M |
| M36 | 12.000 | €1.8M | €21.6M |

### 6.2 P&L Semplificato

| | Anno 1 | Anno 2 | Anno 3 |
|---|--------|--------|--------|
| **Revenue** | €432K | €3.9M | €21.6M |
| Costi tech (infra + AI API) | €96K | €420K | €1.8M |
| Costi personale | €180K | €900K | €3.5M |
| Marketing | €80K | €400K | €1.5M |
| Legale + compliance | €24K | €80K | €200K |
| **EBITDA** | **€52K** | **€2.1M** | **€14.6M** |
| **EBITDA %** | 12% | 54% | 68% |

### 6.3 Scenario Conservativo (−40% crescita)

| | Anno 1 | Anno 2 | Anno 3 |
|---|--------|--------|--------|
| Utenti attivi | 270 | 1.680 | 7.200 |
| ARR | €260K | €2.6M | €13M |
| EBITDA | −€70K | €1.2M | €8.5M |

Il break-even si sposta a ~Mese 15. Il modello rimane sostenibile anche con crescita significativamente inferiore alle aspettative.

---

## 7. Pricing Strategy nel Tempo

| Fase | Strategia |
|------|-----------|
| **Beta (0-200 utenti)** | Gratis o €1 simbolico — obiettivo: dati, referenze, NPS |
| **Lancio (200-2.000 utenti)** | Prezzi pubblicati sopra, early adopter lock-in con sconto 30% annuale |
| **Scale (2.000+ utenti)** | Aumento graduale ARPU (+10-15%/anno) grazie a feature premium |
| **Enterprise (anno 3+)** | Contratti custom, SLA dedicati, integrazioni ERP/HR |

---

*Prossimo documento: [04 — Go-To-Market](./04-go-to-market.md)*
