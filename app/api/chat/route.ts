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
    const { message = '', history = [], currentDiagnosisContext } = await req.json().catch(() => ({}));

    if (!message) {
      return new Response(JSON.stringify({ error: 'Message cannot be empty.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
      });
    }

    const apiKey =
      (typeof process !== 'undefined' ? process.env?.GEMINI_API_KEY : '') ||
      (typeof (globalThis as any).env !== 'undefined' ? (globalThis as any).env?.GEMINI_API_KEY : '');

    const contextSnippet = currentDiagnosisContext
      ? `Current Patient Context:
Condition: ${currentDiagnosisContext.primaryCondition || 'General issue'}
Category: ${currentDiagnosisContext.category || 'General'}
Symptoms: ${currentDiagnosisContext.symptoms || ''}`
      : 'No prior diagnosis context available.';

    const systemInstruction = `You are 'Chotelal Ji' (छोटेलाल जी) - the affectionate, knowledgeable, and caring Indian grandfather and holistic Ayurvedic Vaidya from 'Chotelal ji Health'.
Speak in warm, comforting, respectful Hindi/Hinglish ("नमस्ते बेटा", "घबराओ मत मेरे बच्चे", "मैं हूँ ना").
Provide concise (100 to 200 words), encouraging, and practical Ayurvedic tips and reassurance.
${contextSnippet}`;

    if (apiKey) {
      try {
        const contents = [
          ...history.map((h: any) => ({
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
              generationConfig: { temperature: 0.6 },
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (reply) {
            return new Response(JSON.stringify({ reply }), {
              status: 200,
              headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
            });
          }
        }
      } catch (e) {
        console.warn('Chat gemini error:', e);
      }
    }

    const fallbackReplies = [
      `नमस्ते बेटा! आपकी बात मैंने समझी। हमेशा याद रखें कि शरीर को स्वस्थ रखने के लिए शुद्ध खानपान और मन की शांति सबसे पहली दवा है। पानी भरपूर पिएं और कोई भी परेशानी हो तो मुझसे बेझिझक पूछें।`,
      `बिल्कुल बेटा! आयुर्वेद में कहा गया है - 'आहार संभवं वस्तु रोगाश्चाहार संभवाः'। जो भी उपचार मैंने बताया है, उसे नियमित रूप से 7 दिन करें। छोटेलाल जी आपके साथ हैं!`,
    ];
    const reply = fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message || 'Chat failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
    });
  }
}
