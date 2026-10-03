import { jsonResponse } from './_utils';

const GEMINI_MODEL = 'gemini-3.1-flash-lite';
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

export const onRequestPost: any = async (context: any) => {
  const { request, env } = context;
  const apiKey = env.GEMINI_API_KEY;
  const body: any = await request.json().catch(() => ({}));
  const { message = '', history = [], step = 1 } = body;

  if (!apiKey) {
      return jsonResponse({
        reply: 'नमस्ते बेटा, अभी AI सेवा व्यस्त है।',
        stage: 'question',
        isFinalDiagnosis: false,
        questionNumber: step
    });
  }

  const systemInstruction = `You are "Chotelal Ji", a 60-year-old Indian Ayurvedic doctor with 30 years experience.
Speak in warm Hinglish (Hindi + English mix).

CRITICAL RULES:
1. Read user's symptoms CAREFULLY. Never confuse between different body parts.
   - दांत का दर्द = Tooth problem (NOT stomach)
   - सिर दर्द = Head problem (NOT digestion)
   - पेट दर्द = Stomach problem

2. Keep replies SHORT — 50-60 words maximum.

3. Use 2-3 relevant emojis:
   🌿 (herbs), 🦷 (tooth), 💊 (medicine), 🧘 (yoga), 🍽️ (diet), 🌞 (lifestyle)

4. Always include:
   - 1-line diagnosis
   - 2-3 herbal remedies (with dosage)
   - 1 yoga/exercise tip
   - 1 Wikipedia link

5. Wikipedia link format:
   [📖 Wikipedia par padhein](https://hi.wikipedia.org/wiki/TOPIC)

6. NEVER show YouTube videos or external links other than Wikipedia.

7. End with caring line: "Apna khayal rakhna beta 🌿"

Example reply for "दांत में दर्द":
"🦷 दांत का दर्द cavity ya gum infection se ho sakta hai.
🌿 Laung ka tel (clove oil) dard wali jagah par lagao.
🌿 Namak-pani se gargle karo din me 2 baar.
🧘 Neem ki datun use karo.
[📖 Wikipedia par padhein](https://hi.wikipedia.org/wiki/दांत_का_दर्द)
Apna khayal rakhna beta 🌿"`;

  const geminiRes = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'User-Agent': 'aistudio-build' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: systemInstruction }] },
      contents: [...history.map((h: any) => ({ role: h.sender === 'user' ? 'user' : 'model', parts: [{ text: h.text }] })), { role: 'user', parts: [{ text: message }] }],
      generationConfig: { responseMimeType: 'application/json', temperature: 0.5 },
    }),
  });

  const data = await geminiRes.json();
  const text = (data as any)?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (text) {
      const parsed = JSON.parse(text);
      // Ensure it's marked as final if it contains the prescription
      parsed.isFinalDiagnosis = parsed.diagnosis || text.includes('Wikipedia'); 
      return jsonResponse(parsed);
  }
  return jsonResponse({ reply: 'Namaste beta! 🌿' });
};
