// Vercel Serverless Function — POST /api/generate-image
// Riceve { prompt } dal frontend e genera un'immagine con Pollinations.
// POLLINATIONS_API_KEY è opzionale (Project Settings → Environment Variables):
// se assente si usa l'endpoint pubblico.

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Metodo non consentito' });
  }

  try {
    const { prompt } = req.body || {};
    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Parametro "prompt" mancante o non valido' });
    }

    const apiKey = process.env.POLLINATIONS_API_KEY;
    const params = new URLSearchParams({
      width: '1024',
      height: '1024',
      nologo: 'true',
      seed: String(Date.now() % 1000000)
    });
    if (apiKey) params.set('token', apiKey);

    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?${params.toString()}`;

    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      return res.status(imageResponse.status).json({ error: 'Errore dal servizio di generazione immagini' });
    }

    const buffer = Buffer.from(await imageResponse.arrayBuffer());
    const contentType = imageResponse.headers.get('content-type') || 'image/png';
    const dataUrl = `data:${contentType};base64,${buffer.toString('base64')}`;

    return res.status(200).json({ url: dataUrl });
  } catch (error) {
    console.error('Errore /api/generate-image:', error);
    return res.status(500).json({ error: "Impossibile generare l'immagine. Riprova tra poco." });
  }
};
