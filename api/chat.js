// Client-side Groq API wrapper
// Chiave API iniettata da GitHub Actions workflow

const GROQ_API_KEY = '__GROQ_API_KEY__';

const MODELS = {
  light: 'mixtral-8x7b-32768',
  pro: 'llama-3.1-70b-versatile'
};

async function callGroqAPI(messages, modelTier = 'light') {
  if (!GROQ_API_KEY || GROQ_API_KEY === '__GROQ_API_KEY__') {
    throw new Error('GROQ_API_KEY non configurata. Aggiungi il secret GROQ_API_KEY nei GitHub Secrets.');
  }

  const model = MODELS[modelTier] || MODELS.light;

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.7,
        max_tokens: 2048
      })
    });

    if (!response.ok) {
      const error = await response.json();
      const message = error?.error?.message || 'Errore dal servizio Groq';
      throw new Error(message);
    }

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content?.trim() || 'Nessuna risposta.';
    return { reply };
  } catch (error) {
    console.error('Errore Groq API:', error);
    throw error;
  }
}
