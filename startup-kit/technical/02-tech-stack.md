# Architettura Tecnica · 02 — Tech Stack e Database Schema

---

## 1. Stack Tecnologico Completo

### 1.1 Frontend

| Layer | Tecnologia | Motivazione |
|-------|-----------|-------------|
| Framework | **Next.js 15** (App Router) | SSR/SSG, API routes, ottimo per SEO, grande ecosystem |
| Linguaggio | **TypeScript** | Type safety end-to-end, riduce bug in produzione |
| Styling | **TailwindCSS + shadcn/ui** | Velocità di sviluppo, componenti accessibili, design system |
| State management | **Zustand** | Leggero, semplice, sufficiente per l'MVP |
| Form | **React Hook Form + Zod** | Validazione type-safe, performance |
| API client | **Apollo Client** (GraphQL) | Caching intelligente, integrazione React |
| PWA | **next-pwa** | Service worker, installabile su iOS/Android |
| Charts | **Recharts** | Dashboard BI, leggero |
| Deploy | **Vercel** | Zero-config, Edge Network globale |

### 1.2 Backend

| Layer | Tecnologia | Motivazione |
|-------|-----------|-------------|
| Runtime | **Node.js 22 LTS** | Ecosystem npm, shared types con frontend |
| Framework API | **Fastify** | 3x più veloce di Express, plugin ecosystem |
| API layer | **GraphQL (Pothos)** | Schema type-safe, code-first, ottimo per relazioni complesse |
| ORM | **Prisma** | Type-safe queries, migration automatiche, ottimo DX |
| Job queue | **BullMQ** (Redis) | Background jobs per matching, email, billing |
| AI/ML service | **FastAPI** (Python) | Matching engine, embedding pipeline |
| Lingua | **TypeScript (Node) + Python (AI)** | |
| Deploy | **Railway** (MVP) → **AWS ECS** (scale) | |

### 1.3 Database

| Database | Uso | Hosting MVP |
|----------|-----|-------------|
| **PostgreSQL 16** | Dati primari (utenti, progetti, contratti, transazioni) | Supabase |
| **pgvector extension** | Vettori embedding per matching AI | Supabase (built-in) |
| **Redis** | Cache, sessioni, job queue, rate limiting | Upstash (serverless) |
| **S3-compatible** | File (portfolio, documenti, foto profilo) | Supabase Storage → AWS S3 |

### 1.4 AI/ML

| Componente | Tecnologia | Note |
|-----------|-----------|------|
| Embedding generation | **OpenAI text-embedding-3-large** (1536 dim) | API call, nessun training iniziale |
| LLM per BI + parsing | **GPT-4o** via OpenAI API | Insights, requirement parsing, ottimizzazione profilo |
| Vector search | **pgvector** (cosine similarity) | Integrato in PostgreSQL, no servizio separato |
| ML scorer | **scikit-learn** (Python) | Gradient Boosting per compatibility scoring |
| Orchestrazione AI | **LangChain** (Python) | Chain matching + BI pipeline |

### 1.5 Pagamenti

| Componente | Tecnologia |
|-----------|-----------|
| Marketplace payments | **Stripe Connect** (pagamenti split automatici) |
| Abbonamenti | **Stripe Billing** (webhook-driven) |
| Royalty distribution | Custom logic via Stripe Connect `transfer` API |
| Fatturazione elettronica | **Aruba/Fatture in Cloud API** (integrazione SDI) |

### 1.6 Authentication

| Componente | Tecnologia |
|-----------|-----------|
| Auth provider | **Supabase Auth** (JWT + refresh token) |
| Social login | Google OAuth, LinkedIn OAuth |
| P.IVA verification | Agenzia Entrate REST API (verifica sincrona) |
| MFA | TOTP via Supabase Auth |

---

## 2. Database Schema

### 2.1 Entità principali (PostgreSQL)

```sql
-- USERS
CREATE TABLE users (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email       TEXT UNIQUE NOT NULL,
  role        TEXT CHECK (role IN ('freelance','agency','pmi','admin')) NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now()
);

-- PROFILES (freelance/agency)
CREATE TABLE profiles (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           UUID REFERENCES users(id) ON DELETE CASCADE,
  type              TEXT CHECK (type IN ('freelance','agency')),
  display_name      TEXT NOT NULL,
  bio               TEXT,
  location          TEXT,
  p_iva             TEXT,
  p_iva_verified    BOOLEAN DEFAULT false,
  skills            TEXT[],                        -- ['React', 'Node.js', 'PostgreSQL']
  hourly_rate_min   INTEGER,                       -- EUR
  hourly_rate_max   INTEGER,
  availability      TEXT CHECK (availability IN ('available','busy','partial')),
  embedding         VECTOR(1536),                  -- pgvector
  reputation_score  NUMERIC(4,2) DEFAULT 0,        -- 0-10
  total_projects    INTEGER DEFAULT 0,
  verified          BOOLEAN DEFAULT false,
  created_at        TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_profiles_embedding ON profiles USING ivfflat (embedding vector_cosine_ops);

-- COMPANIES (PMI)
CREATE TABLE companies (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          UUID REFERENCES users(id) ON DELETE CASCADE,
  name             TEXT NOT NULL,
  p_iva            TEXT UNIQUE NOT NULL,
  p_iva_verified   BOOLEAN DEFAULT false,
  size             TEXT CHECK (size IN ('micro','small','medium','large')),
  sector           TEXT,
  website          TEXT,
  created_at       TIMESTAMPTZ DEFAULT now()
);

-- PROJECTS
CREATE TABLE projects (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id       UUID REFERENCES companies(id) ON DELETE CASCADE,
  title            TEXT NOT NULL,
  description      TEXT NOT NULL,
  skills_required  TEXT[],
  budget_min       INTEGER,                        -- EUR
  budget_max       INTEGER,
  timeline_days    INTEGER,
  status           TEXT CHECK (status IN ('draft','open','matching','in_progress','completed','cancelled')) DEFAULT 'open',
  embedding        VECTOR(1536),                   -- pgvector
  created_at       TIMESTAMPTZ DEFAULT now(),
  expires_at       TIMESTAMPTZ
);

CREATE INDEX idx_projects_embedding ON projects USING ivfflat (embedding vector_cosine_ops);

-- MATCHES (AI-generated)
CREATE TABLE matches (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id       UUID REFERENCES projects(id),
  profile_id       UUID REFERENCES profiles(id),
  ai_score         NUMERIC(5,4),                   -- 0-1, cosine similarity
  composite_score  NUMERIC(5,4),                   -- 0-1, after boosting
  status           TEXT CHECK (status IN ('pending','accepted_freelance','accepted_pmi','active','rejected','completed')) DEFAULT 'pending',
  created_by_ai    BOOLEAN DEFAULT true,
  human_reviewed   BOOLEAN DEFAULT false,
  created_at       TIMESTAMPTZ DEFAULT now()
);

-- CONTRACTS
CREATE TABLE contracts (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id          UUID REFERENCES matches(id),
  value_total       INTEGER NOT NULL,              -- EUR centesimi
  royalty_pct       NUMERIC(4,2) NOT NULL,         -- es. 4.50
  royalty_amount    INTEGER NOT NULL,              -- EUR centesimi
  start_date        DATE,
  end_date          DATE,
  milestone_count   INTEGER DEFAULT 1,
  status            TEXT CHECK (status IN ('draft','signed','active','completed','disputed','cancelled')) DEFAULT 'draft',
  stripe_payment_intent TEXT,
  docusign_envelope_id  TEXT,
  created_at        TIMESTAMPTZ DEFAULT now()
);

-- TRANSACTIONS
CREATE TABLE transactions (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_id      UUID REFERENCES contracts(id),
  amount           INTEGER NOT NULL,               -- EUR centesimi
  type             TEXT CHECK (type IN ('payment','royalty','refund','subscription')),
  direction        TEXT CHECK (direction IN ('in','out')),
  stripe_id        TEXT,
  status           TEXT CHECK (status IN ('pending','completed','failed')),
  created_at       TIMESTAMPTZ DEFAULT now()
);

-- REVIEWS
CREATE TABLE reviews (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_id      UUID REFERENCES contracts(id),
  reviewer_id      UUID REFERENCES users(id),
  reviewee_id      UUID REFERENCES users(id),
  score            INTEGER CHECK (score BETWEEN 1 AND 5),
  text             TEXT,
  verified         BOOLEAN DEFAULT false,          -- completamento contratto verificato
  created_at       TIMESTAMPTZ DEFAULT now()
);

-- SUBSCRIPTIONS
CREATE TABLE subscriptions (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          UUID REFERENCES users(id),
  tier             TEXT NOT NULL,                  -- 'starter','pro','agency','pmi_basic','pmi_pro'
  status           TEXT CHECK (status IN ('trialing','active','past_due','cancelled')),
  started_at       TIMESTAMPTZ DEFAULT now(),
  trial_ends_at    TIMESTAMPTZ,
  next_billing_at  TIMESTAMPTZ,
  stripe_sub_id    TEXT UNIQUE,
  stripe_customer_id TEXT
);
```

### 2.2 Indici principali

```sql
-- Ricerca veloce per utente
CREATE INDEX idx_profiles_user_id ON profiles(user_id);
CREATE INDEX idx_projects_company_id ON projects(company_id);
CREATE INDEX idx_matches_project_id ON matches(project_id);
CREATE INDEX idx_matches_profile_id ON matches(profile_id);

-- Filtraggio per status
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_matches_status ON matches(status);

-- Ricerca full-text su skill
CREATE INDEX idx_profiles_skills ON profiles USING GIN(skills);
CREATE INDEX idx_projects_skills ON projects USING GIN(skills_required);
```

---

## 3. Infrastruttura per Fase

### MVP (0 → 2.000 utenti) — Costo ~€400/mese

| Servizio | Tier | Costo/mese |
|---------|------|------------|
| Vercel (frontend) | Pro | €20 |
| Supabase (DB + Auth + Storage) | Pro | €25 |
| Railway (backend Node + Python) | Hobby → Pro | €60 |
| Upstash Redis | Pay-per-use | €15 |
| OpenAI API | Pay-per-use | ~€150 |
| Stripe | 0.25% + fee | ~€100 (su €40K GMV) |
| Resend (email) | Pro | €20 |
| DocuSign | Starter | €30 |
| **Totale** | | **~€420/mese** |

### Scale (2.000 → 50.000 utenti) — Costo ~€4.500/mese

Migrazione a AWS:
- ECS Fargate (backend): ~€400/mese
- RDS PostgreSQL Multi-AZ: ~€600/mese
- ElastiCache Redis: ~€200/mese
- CloudFront + S3: ~€150/mese
- OpenAI API: ~€1.500/mese (ottimizzare con caching)
- Stripe: ~€1.000/mese (su €400K GMV)

---

*Documento successivo: [03 — AI Engine](./03-ai-engine.md)*
