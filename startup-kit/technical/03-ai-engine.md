# Architettura Tecnica · 03 — AI Engine

---

## 1. Overview del Sistema AI

Il sistema AI di PRONET è composto da **quattro moduli distinti** che comunicano tra loro:

```
┌─────────────────────────────────────────────────────────────┐
│                    AI ENGINE PRONET                         │
│                                                             │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────┐   │
│  │  MATCHING   │  │   SCORING    │  │   BUSINESS      │   │
│  │  ENGINE     │  │   ENGINE     │  │   INTELLIGENCE  │   │
│  │             │  │              │  │                 │   │
│  │ Trova i     │  │ Ranka i      │  │ Suggerisce come │   │
│  │ profili     │  │ candidati    │  │ crescere a ogni │   │
│  │ compatibili │  │ per rilevanza│  │ membro          │   │
│  └──────┬──────┘  └──────┬───────┘  └────────┬────────┘   │
│         │                │                    │            │
│  ┌──────▼────────────────▼────────────────────▼────────┐   │
│  │              EMBEDDING PIPELINE                      │   │
│  │  Converte profili e progetti in vettori numerici     │   │
│  │  OpenAI text-embedding-3-large (1536 dimensioni)    │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              FEEDBACK LOOP                          │   │
│  │  Ogni accettazione/rifiuto migliora il modello      │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Modulo 1 — Embedding Pipeline

### Cosa fa
Converte profili testuali e requisiti di progetto in vettori numerici (1536 dimensioni) che catturano il significato semantico — non solo le parole chiave.

### Come funziona

**Per i profili freelance:**
```python
def build_profile_text(profile: Profile) -> str:
    """
    Costruisce un testo strutturato che cattura tutto il contesto del profilo.
    """
    return f"""
    Professionista: {profile.display_name}
    Specializzazione: {', '.join(profile.skills)}
    Esperienza: {profile.years_experience} anni
    Tariffa: €{profile.hourly_rate_min}-{profile.hourly_rate_max}/ora
    Disponibilità: {profile.availability}
    Bio: {profile.bio}
    Progetti completati: {profile.total_projects}
    Score reputazione: {profile.reputation_score}/10
    Settori preferiti: {', '.join(profile.preferred_sectors)}
    Progetti recenti: {format_recent_projects(profile.projects[-3:])}
    """

async def generate_profile_embedding(profile: Profile) -> list[float]:
    text = build_profile_text(profile)
    response = await openai.embeddings.create(
        model="text-embedding-3-large",
        input=text
    )
    return response.data[0].embedding
```

**Per i progetti PMI:**
```python
def build_project_text(project: Project) -> str:
    return f"""
    Progetto: {project.title}
    Descrizione: {project.description}
    Skill richieste: {', '.join(project.skills_required)}
    Budget: €{project.budget_min}-{project.budget_max}
    Durata: {project.timeline_days} giorni
    Tipo azienda: {project.company.size} — {project.company.sector}
    """
```

### Quando viene eseguita
- Al salvataggio/modifica di un profilo (asincrono, via BullMQ)
- Alla pubblicazione di un nuovo progetto (sincrono, risposta entro 2 secondi)
- Ogni 30 giorni per tutti i profili (refresh embedding con eventuali nuovi dati)

---

## 3. Modulo 2 — Matching Engine

### Pipeline di matching (per un progetto aperto)

```
Fase 1: Pre-filter (SQL, istantaneo)
  → Filtra profili per: disponibilità = 'available' o 'partial'
  → Budget compatibile (tariffa giornaliera × giorni stima ≤ budget_max)
  → Almeno 1 skill in comune con skills_required

Fase 2: Vector similarity (pgvector, <500ms)
  → SELECT profili ORDER BY embedding <=> project.embedding LIMIT 50
  → Restituisce top-50 per cosine similarity

Fase 3: Composite scoring (Python ML, <1 secondo)
  → Per ognuno dei 50 candidati, calcola composite_score:

Fase 4: Output
  → Top 5 profili per composite_score
  → Salvati nella tabella matches
  → Notifica inviata a PMI e freelance
```

### Formula del Composite Score

```python
def compute_composite_score(
    semantic_similarity: float,    # 0-1, da pgvector
    skill_overlap: float,          # 0-1, % skill in comune
    budget_fit: float,             # 0-1, tariff vs budget
    reputation_score: float,       # 0-10, normalizzato 0-1
    completion_rate: float,        # 0-1, % progetti completati
    response_rate: float,          # 0-1, % match rispostI nelle 24h
) -> float:

    weights = {
        'semantic': 0.35,
        'skill':    0.25,
        'budget':   0.15,
        'reputation': 0.15,
        'completion': 0.07,
        'response':   0.03,
    }

    return (
        semantic_similarity * weights['semantic'] +
        skill_overlap       * weights['skill'] +
        budget_fit          * weights['budget'] +
        reputation_score    * weights['reputation'] +
        completion_rate     * weights['completion'] +
        response_rate       * weights['response']
    )
```

### Frequenza di esecuzione

| Trigger | Azione |
|---------|--------|
| Nuovo progetto pubblicato | Matching immediato (sincrono, entro 5 secondi) |
| Nuovo profilo completato | Check su progetti aperti compatibili (asincrono, entro 1h) |
| Cron ogni ora | Re-matching per progetti senza match accettato dopo 24h |
| Profilo aggiornato | Re-embedding + re-check progetti aperti (asincrono) |

---

## 4. Modulo 3 — Scoring & Reputazione

### Come si costruisce il reputation_score (0-10)

```python
def calculate_reputation_score(profile_id: str) -> float:
    reviews = get_reviews(profile_id)
    contracts = get_completed_contracts(profile_id)

    if not reviews:
        return 5.0  # punteggio neutro per nuovi profili

    # Media pesata delle review (review recenti pesano di più)
    weighted_avg = compute_time_weighted_average(reviews)

    # Bonus/malus per comportamenti oggettivi
    completion_bonus = min(1.0, len(contracts) / 10)     # +1 dopo 10 progetti
    response_bonus = get_response_rate(profile_id) * 0.5  # fino a +0.5
    no_dispute_bonus = 0.5 if get_dispute_rate(profile_id) < 0.05 else 0

    raw_score = weighted_avg + completion_bonus + response_bonus + no_dispute_bonus
    return min(10.0, round(raw_score, 2))
```

### Protezione dalle review false (Peer Review Trust)

La piattaforma usa un sistema di **peer review verificata**:
- Solo chi ha un contratto completato può lasciare una review
- I reviewer hanno a loro volta un credibility_score (review di reviewer attendibili pesano di più)
- Review outlier (>2σ dalla media del reviewee) vengono flaggate per revisione
- Report di altri utenti possono attivare una revisione manuale

```
credibility_score(reviewer) = media dei voti ricevuti come reviewee × (contratti completati / 5)
```

---

## 5. Modulo 4 — Business Intelligence

### Per ogni membro, l'AI genera insights personalizzati settimanali:

**Esempio output per un freelance React senior:**

```json
{
  "profile_id": "...",
  "generated_at": "2026-05-24",
  "insights": [
    {
      "type": "pricing",
      "priority": "high",
      "message": "La tua tariffa (€350/giorno) è il 23% sotto la media dei dev React senior in Italia (€455/giorno). Potresti aumentare senza perdere match.",
      "action": "Aggiorna la tua tariffa"
    },
    {
      "type": "skill_gap",
      "priority": "medium",
      "message": "I progetti React che cercano anche TypeScript avanzato hanno il 40% in più di budget rispetto ai tuoi match attuali. Hai già TypeScript di base.",
      "action": "Aggiungi TypeScript al profilo se hai esperienza"
    },
    {
      "type": "opportunity",
      "priority": "medium",
      "message": "Questa settimana ci sono 8 progetti aperti che corrispondono al tuo profilo. Il tuo match score medio è 0.78 — sopra la soglia di notifica.",
      "action": "Controlla i nuovi match"
    },
    {
      "type": "network",
      "priority": "low",
      "message": "Hai 3 colleghi nel network che non hai ancora connesso. I profili connessi ricevono il 15% di match in più.",
      "action": "Connetti il tuo network"
    }
  ]
}
```

### Come viene generato

```python
async def generate_bi_insights(profile_id: str) -> list[Insight]:
    profile = get_profile(profile_id)
    market_data = get_market_benchmarks(profile.skills, profile.location)
    match_history = get_match_history(profile_id, days=90)

    prompt = f"""
    Sei un advisor di carriera per professionisti tech italiani.
    
    Profilo: {profile.to_dict()}
    Benchmark di mercato: {market_data}
    Storico match ultimi 90 giorni: {match_history}
    
    Genera 3-5 insight concreti e azionabili per aiutare questo professionista 
    a massimizzare i propri guadagni sulla piattaforma.
    
    Formato: JSON con campi type, priority, message, action.
    Tono: diretto, concreto, basato sui dati. No overpromise.
    """

    response = await openai.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": prompt}],
        response_format={"type": "json_object"}
    )

    return parse_insights(response.choices[0].message.content)
```

---

## 6. Feedback Loop e Miglioramento Continuo

Ogni interazione degli utenti con i match è un segnale di training:

| Azione utente | Segnale | Peso |
|--------------|---------|------|
| Match accettato + contratto completato | Forte positivo | +3 |
| Match accettato + contratto cancellato | Debole negativo | -1 |
| Match rifiutato con motivazione | Segnale qualitativo | Usato per prompt tuning |
| Match ignorato (no risposta 48h) | Neutro/debole negativo | -0.5 |
| Review 4-5 stelle post-contratto | Forte positivo | +2 |
| Review 1-2 stelle post-contratto | Forte negativo | -2 |

### Re-training del Composite Scorer

Il modello Gradient Boosting viene re-addestrato ogni 30 giorni su:
- Dataset: tutti i match + outcomes degli ultimi 6 mesi
- Feature: semantic_similarity, skill_overlap, budget_fit, reputation, completion_rate, response_rate
- Target: `match_outcome` (completed_5_stars=1, completed=0.7, cancelled=0, ignored=-0.3)
- Validazione: hold-out 20%, AUC-ROC target > 0.82

---

## 7. Roadmap AI (Post-MVP)

| Feature | Quando | Descrizione |
|---------|--------|-------------|
| **Parsing requisiti NLP** | M4 | AI estrae automaticamente skill, budget, timeline da descrizioni informali |
| **Proactive outreach** | M6 | AI suggerisce a freelance di candidarsi proattivamente su progetti a fit alto |
| **Price negotiation AI** | M8 | Suggerisce range di prezzo ottimale per contratto specifico |
| **Fraud detection** | M6 | Rilevamento anomalie nei pattern di review e transazioni |
| **Fine-tuned embedding model** | M12 | Modello custom addestrato su dati PRONET per embedding più accurati del mercato italiano |
| **Contract auto-draft** | M10 | AI genera bozza contratto da specifiche del progetto |

---

*Documento successivo: [MVP Features](../roadmap/01-mvp-features.md)*
