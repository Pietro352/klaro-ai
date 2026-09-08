// Vercel Serverless Function — POST /api/chat
// Riceve { messages, modelTier } dal frontend e interroga Groq.
// Richiede la variabile d'ambiente GROQ_API_KEY (Project Settings → Environment Variables).

const MODELS = {
  light: 'openai/gpt-oss-20b',
  pro: 'openai/gpt-oss-120b'
};

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Metodo non consentito' });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GROQ_API_KEY non configurata su Vercel' });
  }

  try {
    const { messages, modelTier } = req.body || {};
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Parametro "messages" mancante o non valido' });
    }

    const model = MODELS[modelTier] || MODELS.light;

    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.7,
        max_tokens: 2048
      })
    });

    const data = await groqResponse.json();

    if (!groqResponse.ok) {
      const message = data?.error?.message || 'Errore dal servizio Groq';
      return res.status(groqResponse.status).json({ error: message });
    }

    const reply = data?.choices?.[0]?.message?.content?.trim() || 'Nessuna risposta.';
    return res.status(200).json({ reply });
  } catch (error) {
    console.error('Errore /api/chat:', error);
    return res.status(500).json({ error: 'Servizio IA non disponibile. Riprova tra poco.' });
  }
};
