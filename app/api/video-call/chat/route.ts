export const runtime = 'edge';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
};

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}

export async function POST(req: Request) {
  try {
    const { message = '', history = [] } = await req.json().catch(() => ({}));

    if (!message || !message.trim()) {
      return new Response(JSON.stringify({ error: 'Message cannot be empty.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
      });
    }

    const apiKey =
      (typeof process !== 'undefined' ? process.env?.GEMINI_API_KEY : '') ||
      (typeof (globalThis as any).env !== 'undefined' ? (globalThis as any).env?.GEMINI_API_KEY : '');

    const systemInstruction = `You are Chotelal Ji. Answer in short, caring Hinglish sentences. Do not give long paragraphs. Speak warmly like a loving Indian grandfather and experienced Ayurvedic doctor. Give quick, practical tips. Max 2-3 short sentences.`;

    if (apiKey) {
      try {
        const contents = [
          ...history.slice(-6).map((h: any) => ({
            role: h.sender === 'user' ? 'user' : 'model',
            parts: [{ text: h.text }],
          })),
          {
            role: 'user',
            parts: [{ text: message }],
          },
        ];

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'User-Agent': 'aistudio-build',
            },
            body: JSON.stringify({
              systemInstruction: { parts: [{ text: systemInstruction }] },
              contents,
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 150,
              },
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (reply) {
            return new Response(JSON.stringify({ reply: reply.trim() }), {
              status: 200,
              headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
            });
          }
        }
      } catch (e) {
        console.warn('Video call chat Gemini error:', e);
      }
    }

    // Smart Hinglish fallbacks if key is not configured or network issue
    const lower = message.toLowerCase();
    let reply = 'नमस्ते बेटा! चिंता मत करो, मैं हूँ ना। थोड़ा गुनगुना पानी पियो और मुझे बताओ क्या तकलीफ है।';

    if (lower.includes('bavasir') || lower.includes('piles') || lower.includes('dard') || lower.includes('blood')) {
      reply = 'बेटा, मिर्च-मसाला तुरंत बंद करो और रात को 1 चम्मच त्रिफला गुनगुने पानी से लो। गर्म पानी के टब में 10 मिनट बैठो, तुरंत आराम मिलेगा।';
    } else if (lower.includes('neend') || lower.includes('stress') || lower.includes('tension') || lower.includes('headache')) {
      reply = 'बेटा, ज्यादा मत सोचो। रात को तलवों पर थोड़ा सरसों या बादाम का तेल मालिश करो और गहरी सांस लो। दिमाग बिल्कुल शांत हो जाएगा।';
    } else if (lower.includes('baal') || lower.includes('hair') || lower.includes('dandruff')) {
      reply = 'बेटा, भृंगराज और आंवला का तेल हल्का गुनगुना करके उंगलियों के पोरों से लगाओ। 14 दिन में बाल गिरना रुक जाएगा।';
    } else if (lower.includes('pet') || lower.includes('gas') || lower.includes('acidity') || lower.includes('kabz')) {
      reply = 'बेटा, खाने के 1 घंटे बाद 1 गिलास छाछ में भुना जीरा और काला नमक डालकर पियो। कब्ज और गैस जड़ से खत्म हो जाएगी।';
    }

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message || 'Video call chat failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
    });
  }
}
