# Klaro AI

Un'interfaccia di chat AI moderna, veloce e deployabile su GitHub Pages.

## Stack

- **Frontend** — HTML/CSS/JS vanilla, zero framework, zero build step
- **LLM** — [Groq](https://groq.com)
- **Image generation** — [Pollinations](https://pollinations.ai) (endpoint pubblico, chiamato direttamente dal browser)
- **Klaro Max** — [Puter.js](https://puter.com) (client-side, nessuna chiave tua: l'utente paga col proprio account Puter)

## Configura il secret su GitHub

1. Vai su **Settings → Secrets and variables → Actions** del repo
2. Clicca **New repository secret**
3. Nome: `GROQ_API_KEY`
4. Valore: la tua chiave da [console.groq.com/keys](https://console.groq.com/keys) (Create API Key)
5. **Add secret**

Poi attiva Pages su **Settings → Pages → Source → GitHub Actions** (va fatto una volta sola). Da qui in poi ogni push su `main` fa build + deploy automatico su `https://[utente].github.io/klaro-ai`.

### Come funziona (e perché è importante saperlo)

GitHub Pages ospita solo file statici, non c'è nessun server che possa tenere la chiave nascosta. Il workflow (`.github/workflows/deploy.yml`) prende il secret `GROQ_API_KEY` e lo scrive dentro `index.html` al momento del deploy, al posto del placeholder `__GROQ_API_KEY__`. Questo significa che:

- **la chiave non è mai nel repository** (git non la vede mai, resta solo nei Secrets di GitHub e nel file pubblicato)
- **ma è visibile nel sorgente della pagina pubblicata** — chiunque visiti il sito e faccia "Visualizza sorgente" può leggerla

Non è un bug, è un limite intrinseco di un sito 100% statico senza backend: se vuoi la chiave davvero nascosta serve un server (es. una funzione serverless), che qui abbiamo tolto di proposito per restare su GitHub Pages. Per limitare i danni se qualcuno la trova:

- crea su Groq una chiave **dedicata solo a questo progetto** (mai la tua chiave principale)
- tieni d'occhio i consumi su [console.groq.com](https://console.groq.com)
- ruotala ogni tanto (genera una nuova chiave, aggiorna il secret, il prossimo push la rimette a posto)
- il tachimetro in basso a destra limita già i danni lato client (blocca l'invio oltre 15 richieste/minuto su Free e Turbo), ma è una protezione lato browser, aggirabile da chi sa cosa fa

## Sviluppo locale

Apri `index.html` nel browser. **Nota:** in locale la chiave API non è iniettata (resta il placeholder), quindi Klaro Free/Turbo daranno errore finché non testi con una chiave vera:

```bash
# 1. Copia index.html
cp index.html index.local.html

# 2. Sostituisci __GROQ_API_KEY__ manualmente con la tua chiave
# (o usa sed: sed -i 's/__GROQ_API_KEY__/la-tua-chiave/' index.local.html)

# 3. Apri in un server locale:
python -m http.server 8000
```

Poi accedi a `http://localhost:8000/index.local.html`. **Non committare mai `index.local.html`.**

## Struttura

```
klaro-ai/
├── index.html                    # Frontend (chiave iniettata al deploy)
├── .github/workflows/
│   └── deploy.yml                # Inietta il secret e pubblica su Pages
└── README.md
```

## Klaro Max

- **Klaro Free / Klaro Turbo** — Groq, gratis, limite di 15 richieste al minuto (mostrato dal tachimetro in basso a destra, sopra la barra di invio)
- **Klaro Max** / **Klaro Max Think** — Modelli Puter.js (l'utente paga col suo account Puter, nessun limite gestito da noi)
- **Klaro Image** — Pollinations (Free) + Puter (Max)

Tutto vive in `index.html`: nessun backend da deployare.

## Licenza

MIT
