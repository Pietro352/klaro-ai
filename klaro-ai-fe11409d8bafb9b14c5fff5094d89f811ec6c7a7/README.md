# Klaro AI

Un'interfaccia di chat AI moderna, veloce e deployabile su Vercel in pochi minuti.

## Stack

- **Frontend** — HTML/CSS/JS vanilla, zero framework, zero build step
- **Backend** — [Vercel Serverless Functions](https://vercel.com/docs/functions) (Node.js)
- **LLM** — [Groq](https://groq.com) (`gpt-oss-20b` / `gpt-oss-120b`)
- **Image generation** — [Pollinations](https://pollinations.ai)
- **Klaro Max** — [Puter.js](https://puter.com) (client-side, nessuna chiave)

## Avvio rapido

### 1 — Clona e installa

```bash
git clone https://github.com/tuo-username/klaro-ai.git
cd klaro-ai
npm install -g vercel   # se non l'hai già
```

### 2 — Variabili d'ambiente

```bash
cp .env.example .env
# Apri .env e inserisci le tue chiavi API
```

| Variabile | Obbligatoria | Descrizione |
|---|---|---|
| `GROQ_API_KEY` | ✅ | Chiave Groq per il modello LLM (Klaro Free) |
| `POLLINATIONS_API_KEY` | ❌ | Chiave Pollinations per la generazione immagini (Klaro Image, tier Free) |

### 3 — Avvia in locale

```bash
vercel dev
```

Apri [http://localhost:3000](http://localhost:3000).

## Deploy su Vercel

**Da dashboard:** vai su [vercel.com/new](https://vercel.com/new), importa il repo GitHub `Pietro352/...`, Vercel riconosce da solo la cartella `api/` (nessuna configurazione di build necessaria — "Framework Preset: Other"). Prima del primo deploy, o subito dopo, imposta le variabili d'ambiente in **Project Settings → Environment Variables**: `GROQ_API_KEY` e (opzionale) `POLLINATIONS_API_KEY`.

**Da terminale:**

```bash
vercel link          # la prima volta, collega la cartella al progetto Vercel
vercel env add GROQ_API_KEY
vercel env add POLLINATIONS_API_KEY   # opzionale
vercel --prod
```

## Struttura del progetto

```
klaro-ai/
├── index.html                   # Frontend completo (single-file app)
├── favicon.png / favicon.svg    # Icone
├── api/
│   ├── chat.js                  # Endpoint /api/chat  → Groq LLM
│   └── generate-image.js        # Endpoint /api/generate-image → Pollinations
├── vercel.json                  # Configurazione Vercel (timeout funzioni)
└── .env.example
```

Nota: **niente `package.json` necessario** — le funzioni in `api/` usano `module.exports` (CommonJS) e `fetch` nativo di Node 18+, quindi Vercel le esegue senza build step né dipendenze da installare.

## Klaro Max (nuovo)

Aggiunta la modalità **Klaro Max**, basata su [Puter.js](https://puter.com) — nessuna chiave API, nessun backend: paga l'utente col proprio account Puter gratuito.

- **Klaro Free** — modello attuale (Groq via `/api/chat`), sempre gratis.
- **Klaro Max** / **Klaro Max Think** — modelli più potenti (quest'ultimo con ragionamento visibile in un blocco "💭 Ragionamento" collassabile).
- **Klaro Image** — usa il motore Free (Pollinations) di base; se Max è attivo passa in automatico a un motore di qualità superiore via Puter, con fallback automatico su Free in caso di errore.
- **Passa a Max** — bottone nel menu modelli e modale con tabella comparativa; apre il popup di login/registrazione Puter (`puter.auth.signIn()`), gratuito.
- **Menu "+"** (in stile Claude/Gemini): allega file/foto, acquisisci screenshot (via `getDisplayMedia`), aggiungi la chat a un progetto (raggruppamento locale), scegli una "competenza" (persona/system prompt dedicato), aggiungi un connettore, aggiungi plugin (placeholder), ricerca web (arricchisce il prompt con un estratto da Wikipedia).
- **Connettori (solo Max)** — GitHub (token personale, elenca i repo), Todoist (token API, elenca le attività), Gmail (richiede un Client ID OAuth Google creato da te su console.cloud.google.com, scope `gmail.readonly`, per vedere le email non lette). I token restano solo in `localStorage`, mai inviati a un server tuo.

Tutto vive in `index.html`: nessun file/funzione aggiuntiva da deployare.

## Licenza

MIT
