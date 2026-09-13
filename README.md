# Klaro AI

Un'interfaccia di chat AI moderna, veloce e deployabile su GitHub Pages.

## Stack

- **Frontend** — HTML/CSS/JS vanilla, zero framework, zero build step
- **LLM** — [Groq](https://groq.com)
- **Image generation** — [Pollinations](https://pollinations.ai)
- **Klaro Max** — [Puter.js](https://puter.com) (client-side, nessuna chiave)

## Avvio rapido

### 1 — Clona il repo

```bash
git clone https://github.com/Pietro352/klaro-ai.git
cd klaro-ai
```

### 2 — Configura il secret su GitHub

1. Vai su **Settings → Secrets and variables → Actions**
2. Clicca **New repository secret**
3. Nome: `GROQ_API_KEY`
4. Valore: la tua chiave da [console.groq.com](https://console.groq.com)
5. Clicca **Add secret**

### 3 — Deploy

Il sito si deploya automaticamente su GitHub Pages quando fai un push su `main`.

Url: `https://[username].github.io/klaro-ai`

## Sviluppo locale

Apri `index.html` nel browser. **Nota:** in locale la chiave API non è iniettata (è solo nel deploy via GitHub Pages).

Se vuoi testarla in locale:

```bash
# 1. Copia index.html
cp index.html index.local.html

# 2. Sostituisci __GROQ_API_KEY__ manualmente con la tua chiave
# (o usa sed)

# 3. Apri in un server locale:
python -m http.server 8000
```

Poi accedi a `http://localhost:8000/index.local.html`

## Struttura

```
klaro-ai/
├── index.html                # Frontend (chiave iniettata al deploy)
├── favicon.svg / favicon.png # Icone
├── api/
│   └── chat.js              # Wrapper Groq client-side
├── .github/workflows/
│   └── deploy.yml           # GitHub Actions workflow
└── README.md
```

## Ottenere la GROQ_API_KEY

1. Vai su [console.groq.com](https://console.groq.com)
2. Crea un account o accedi
3. Vai a **Keys** (nella sidebar)
4. Clicca **Create API Key**
5. Copia la chiave
6. Mettila nei GitHub Secrets come `GROQ_API_KEY`

## Klaro Max

- **Klaro Free** — Groq LLM, gratis
- **Klaro Max** / **Klaro Max Think** — Modelli Puter.js (utente paga col suo account Puter)
- **Klaro Image** — Pollinations (Free) + Puter (Max)

Tutto vive in `index.html`: nessun backend da deployare.

## Licenza

MIT
