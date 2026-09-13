# Klaro AI

Un'interfaccia di chat AI moderna, veloce e deployabile su GitHub Pages in pochi minuti.

## Stack

- **Frontend** — HTML/CSS/JS vanilla, zero framework, zero build step
- **Backend** — Client-side (nessun backend richiesto)
- **LLM** — [Groq](https://groq.com) (`mixtral-8x7b-32768` / `llama-3.1-70b-versatile`)
- **Image generation** — [Pollinations](https://pollinations.ai)
- **Klaro Max** — [Puter.js](https://puter.com) (client-side, nessuna chiave)

## Avvio rapido

### 1 — Clona e installa

```bash
git clone https://github.com/tuo-username/klaro-ai.git
cd klaro-ai
```

### 2 — Configurazione locale

Apri `index.html` nel browser. Al primo accesso, verrà richiesto di inserire:
- **GROQ_API_KEY** — Chiave API da [groq.com](https://console.groq.com)
- (Opzionale) **POLLINATIONS_API_KEY** — Per la generazione avanzata di immagini

La chiave viene salvata nel `localStorage` del browser (solo locale, non sincronizzata).

### 3 — Avvia in locale

Opzione 1 — Apri direttamente il file:
```bash
# Su macOS
open index.html

# Su Linux/Windows, apri manualmente in browser
```

Opzione 2 — Usa un server locale (consigliato):
```bash
# Con Python 3
python -m http.server 8000

# Con Node.js
npx http-server

# Con Ruby
ruby -run -ehttpd . -p8000
```

Poi apri [http://localhost:8000](http://localhost:8000).

## Deploy su GitHub Pages

1. **Assicurati che il repo sia pubblico**
2. Vai su **Settings → Pages**
3. Seleziona **Branch: main** (o il tuo default) e **Folder: / (root)**
4. Clicca **Save**

Il sito sarà disponibile a: `https://[username].github.io/klaro-ai`

**Nota sulla sicurezza:** La GROQ_API_KEY viene salvata nel `localStorage` del browser locale. Su GitHub Pages:
- La chiave NON è esposta pubblicamente (rimane solo nel tuo browser)
- Ciascun utente che accede al sito deve inserire la propria chiave API
- Per un'istanza condivisa o pubblica, valuta un'alternativa (backend proxy, Vercel, ecc.)

## Struttura del progetto

```
klaro-ai/
├── index.html                   # Frontend completo (single-file app)
├── favicon.png / favicon.svg    # Icone
├── api/
│   └── chat.js                  # Wrapper Groq client-side
└── README.md
```

## Klaro Max (nuovo)

Aggiunta la modalità **Klaro Max**, basata su [Puter.js](https://puter.com) — nessuna chiave API, nessun backend: paga l'utente col proprio account Puter gratuito.

- **Klaro Free** — modello attuale (Groq via `/api/chat.js`), sempre gratis.
- **Klaro Max** / **Klaro Max Think** — modelli più potenti (quest'ultimo con ragionamento visibile in un blocco "💭 Ragionamento" collassabile).
- **Klaro Image** — usa il motore Free (Pollinations) di base; se Max è attivo passa in automatico a un motore di qualità superiore via Puter, con fallback automatico su Free in caso di errore.
- **Passa a Max** — bottone nel menu modelli e modale con tabella comparativa; apre il popup di login/registrazione Puter (`puter.auth.signIn()`), gratuito.
- **Menu "+"** (in stile Claude/Gemini): allega file/foto, acquisisci screenshot (via `getDisplayMedia`), aggiungi la chat a un progetto (raggruppamento locale), scegli una "competenza" (persona/specialista).
- **Connettori (solo Max)** — GitHub (token personale, elenca i repo), Todoist (token API, elenca le attività), Gmail (richiede un Client ID OAuth Google creato da te su console.cloud.google.com).

Tutto vive in `index.html`: nessun file/funzione aggiuntiva da deployare.

## Ottenere la GROQ_API_KEY

1. Vai su [console.groq.com](https://console.groq.com)
2. Crea un account o accedi
3. Vai a **Keys** (nella sidebar)
4. Clicca **Create API Key**
5. Copia la chiave
6. Incollala in Klaro AI quando richiesto

## Licenza

MIT
