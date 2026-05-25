# TALENTIO — Guida al Deploy (Per Non-Tecnici)

Questa guida ti porta dal codice a un sito live in circa **30 minuti**.
Non serve saper programmare.

---

## Cosa avrai alla fine

- Sito TALENTIO live su internet (es. `talentio.vercel.app` o il tuo dominio)
- Form di waitlist funzionante che salva le email su database
- Gratuito fino a migliaia di utenti

---

## Servizi necessari (tutti gratuiti nella versione base)

| Servizio | Cosa fa | Costo |
|---------|---------|-------|
| **Vercel** | Ospita il sito | Gratis |
| **Supabase** | Database per le email waitlist | Gratis |
| **GitHub** | Repository del codice | Gratis |

---

## STEP 1 — Crea il database su Supabase (5 minuti)

1. Vai su **[supabase.com](https://supabase.com)** → clicca "Start your project"
2. Registrati con Google o email
3. Crea un nuovo progetto:
   - **Name:** `talentio`
   - **Database Password:** scegli una password sicura (salvala!)
   - **Region:** `West EU (Ireland)` — il più vicino all'Italia
4. Aspetta ~2 minuti che il progetto si crei
5. Nel menu a sinistra, clicca **SQL Editor**
6. Copia e incolla questo SQL e clicca **RUN**:

```sql
-- Crea la tabella waitlist
CREATE TABLE waitlist (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email       TEXT UNIQUE NOT NULL,
  role        TEXT CHECK (role IN ('freelance', 'pmi', 'agency')),
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- Permetti inserimenti senza autenticazione (solo insert, non read)
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "allow_insert_waitlist"
  ON waitlist FOR INSERT
  WITH CHECK (true);
```

7. Vai su **Project Settings** (icona ingranaggio in basso a sinistra) → **API**
8. Copia e salva questi due valori:
   - **Project URL** (es. `https://abcdef.supabase.co`)
   - **anon/public** key (stringa lunga che inizia con `eyJ...`)

---

## STEP 2 — Metti il codice su GitHub (5 minuti)

1. Vai su **[github.com](https://github.com)** → crea un account se non ce l'hai
2. Clicca **"New repository"**
   - Nome: `talentio`
   - Private ✓ (consigliato)
   - Clicca **Create repository**
3. Sulla pagina del repository vuoto, clicca **"uploading an existing file"**
4. Carica l'intera cartella `talentio/` del progetto
   - Trascina i file o usa il bottone "choose your files"
5. Clicca **Commit changes**

---

## STEP 3 — Deploy su Vercel (10 minuti)

1. Vai su **[vercel.com](https://vercel.com)** → clicca "Start Deploying"
2. Clicca **"Import Git Repository"** → connetti il tuo GitHub
3. Trova il repository `talentio` e clicca **Import**
4. **IMPORTANTE:** Prima di cliccare Deploy, aggiungi le variabili d'ambiente:
   - Clicca **"Environment Variables"**
   - Aggiungi la prima:
     - **Name:** `NEXT_PUBLIC_SUPABASE_URL`
     - **Value:** incolla il Project URL di Supabase (es. `https://abcdef.supabase.co`)
   - Aggiungi la seconda:
     - **Name:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - **Value:** incolla la chiave `anon/public` di Supabase
5. Clicca **Deploy**
6. Aspetta ~2 minuti → il tuo sito è live!

Vercel ti darà un URL tipo `talentio-xxxxx.vercel.app` — funziona già!

---

## STEP 4 — Collega il dominio personalizzato (opzionale, 10 minuti)

Se hai acquistato `talentio.eu` o simile:

1. Su Vercel → **Settings** → **Domains**
2. Scrivi il tuo dominio → clicca **Add**
3. Vercel ti mostrerà dei record DNS da aggiungere
4. Vai sul pannello del tuo registrar (es. GoDaddy, Register.it, Namecheap)
5. Aggiungi i record DNS come indicato da Vercel
6. Attendi 10-30 minuti → il dominio è collegato

---

## Come vedere le email della waitlist

1. Vai su **supabase.com** → apri il tuo progetto
2. Nel menu a sinistra clicca **Table Editor**
3. Clicca sulla tabella **waitlist**
4. Vedi tutte le email registrate, con data e ruolo

Puoi esportarle come CSV cliccando **Export** in alto a destra.

---

## Aggiornare il sito

Per modificare i testi della landing page:
1. Apri il file `talentio/src/app/page.tsx`
2. Modifica i testi (tutto quello tra le virgolette)
3. Salva e carica di nuovo su GitHub
4. Vercel rileva automaticamente le modifiche e rideploya in 2 minuti

---

## Problemi comuni

| Problema | Soluzione |
|---------|---------|
| Il form dà errore "Errore del server" | Controlla che le variabili d'ambiente su Vercel siano corrette |
| Il sito non carica | Aspetta 5 minuti — la prima build può essere lenta |
| Le email non appaiono su Supabase | Verifica che l'SQL del STEP 1 sia stato eseguito correttamente |
| Dominio non funziona | I DNS possono richiedere fino a 24h di propagazione |

---

## Prossimi passi dopo il lancio

1. ✅ Condividi il link su LinkedIn, community tech italiane, newsletter
2. ✅ Aggiungi il link in firma email
3. ✅ Posta in: Indie Hackers Italia, GitHub Italy, gruppi Telegram dev
4. ✅ Monitora le iscrizioni su Supabase ogni giorno
5. ✅ Quando raggiungi 100 iscritti — inizia a intervistarne 10 per capire cosa vogliono

---

*Hai problemi? Apri un issue su GitHub o contatta il founder.*
