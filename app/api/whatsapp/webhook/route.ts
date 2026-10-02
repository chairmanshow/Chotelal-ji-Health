export const runtime = 'edge';

function getEnv(key: string): string {
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key] as string;
  }
  if (typeof (globalThis as any).env !== 'undefined' && (globalThis as any).env[key]) {
    return (globalThis as any).env[key];
  }
  return '';
}

/**
 * 1. GET handler — Meta webhook verification
 */
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const mode = url.searchParams.get('hub.mode');
    const token = url.searchParams.get('hub.verify_token');
    const challenge = url.searchParams.get('hub.challenge');

    const expectedToken = getEnv('WHATSAPP_VERIFY_TOKEN');

    if (mode === 'subscribe' && token && expectedToken && token === expectedToken) {
      console.log('✓ WhatsApp webhook verified successfully');
      return new Response(challenge || '', {
        status: 200,
        headers: { 'Content-Type': 'text/plain' },
      });
    }

    console.warn('WhatsApp webhook verification failed. Token mismatch or invalid mode.');
    return new Response('Forbidden', { status: 403 });
  } catch (err: any) {
    console.error('Error in WhatsApp GET handler:', err);
    return new Response('Internal Server Error', { status: 500 });
  }
}

/**
 * 2. POST handler — Meta webhook messages receiver
 */
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));

    // Body se entry[0].changes[0].value.messages nikalo
    const changesValue = body?.entry?.[0]?.changes?.[0]?.value;
    const messages = changesValue?.messages;

    // Agar messages nahi hain (status update jaise sent/delivered/read hai), to 200 OK return karo turant
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ status: 'ok', detail: 'status_update_ignored' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const message = messages[0];
    const userPhone = message?.from;
    const messageText = message?.text?.body;

    if (!userPhone || !messageText) {
      return new Response(JSON.stringify({ status: 'ok', detail: 'non_text_or_missing_sender' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    console.log(`[WhatsApp Webhook] Incoming message from ${userPhone}: "${messageText}"`);

    // Chotelal Ji persona ke saath Gemini API call
    const systemInstruction = `You are "Chotelal Ji", a warm, loving, and highly experienced 60-year-old Ayurvedic doctor with 30 years of healing practice.
You address patients warmly with affection (e.g., "नमस्ते बेटा!", "जी बेटा", "प्यारे बच्चे").
You speak in natural Hinglish (Hindi + English mixed, using clear Roman or easy Hindi).
Guidelines:
1. Understand the user's health concern deeply with empathy.
2. Provide simple, effective Ayurvedic home remedies (घरेलू नुस्खे), dietary advice (पथ्य-अपथ्य), and yoga/lifestyle tips.
3. Keep the reply short and readable on WhatsApp (3-5 short points or paragraphs).
4. Always add a caring disclaimer: "अगर समस्या ज्यादा गंभीर हो तो तुरंत डॉक्टर को दिखाएं।"
5. Sign off lovingly as "- आपके छोटेलाल जी (आयुर्वेद विशेषज्ञ)".`;

    const apiKey = getEnv('GEMINI_API_KEY');
    let replyText = '';

    if (apiKey) {
      const candidateModels = ['gemini-flash-latest', 'gemini-3.8-flash', 'gemini-3.1-flash-lite'];
      for (const model of candidateModels) {
        try {
          const geminiRes = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'aistudio-build',
              },
              body: JSON.stringify({
                systemInstruction: { parts: [{ text: systemInstruction }] },
                contents: [{ parts: [{ text: messageText }] }],
                generationConfig: {
                  temperature: 0.7,
                  maxOutputTokens: 600,
                },
              }),
            }
          );

          if (geminiRes.ok) {
            const geminiData = await geminiRes.json();
            const text = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text && text.trim()) {
              replyText = text.trim();
              break;
            }
          }
        } catch (callErr) {
          console.warn(`Gemini call failed with ${model}:`, callErr);
        }
      }
    }

    // Fallback if AI quota exceeded or no key
    if (!replyText) {
      replyText = `नमस्ते बेटा! मैंने आपका संदेश "${messageText}" पढ़ लिया है।

🌿 छोटेलाल जी की प्रारंभिक सलाह:
1. दिन में 2-3 लीटर गुनगुना पानी पिएं।
2. तला-भुना, बासी और अत्यधिक तीखा भोजन बंद कर दें।
3. समय पर सोएं और पेट साफ रखने के लिए रात को 1 चम्मच त्रिफला चूर्ण गुनगुने पानी से लें।

विस्तृत निदान और वीडियो परामर्श के लिए हमारी वेबसाइट chotelaljihealth.in पर आएं या अपने लक्षण विस्तार से बताएं।

- आपके छोटेलाल जी (आयुर्वेद विशेषज्ञ)`;
    }

    // Gemini ka reply WhatsApp Cloud API par POST karo
    const phoneNumberId = getEnv('WHATSAPP_PHONE_NUMBER_ID');
    const whatsappToken = getEnv('WHATSAPP_TOKEN');

    if (phoneNumberId && whatsappToken) {
      try {
        const sendUrl = `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`;
        const sendRes = await fetch(sendUrl, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${whatsappToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messaging_product: 'whatsapp',
            to: userPhone,
            type: 'text',
            text: { body: replyText },
          }),
        });

        if (!sendRes.ok) {
          const errDetail = await sendRes.text();
          console.error('[WhatsApp Webhook] Failed to send WhatsApp message:', errDetail);
        } else {
          console.log(`✓ WhatsApp reply sent successfully to ${userPhone}`);
        }
      } catch (sendErr) {
        console.error('[WhatsApp Webhook] Network error sending WhatsApp message:', sendErr);
      }
    } else {
      console.warn(
        '[WhatsApp Webhook] WHATSAPP_PHONE_NUMBER_ID or WHATSAPP_TOKEN not configured. Reply was prepared:',
        replyText
      );
    }

    // Meta ko hamesha 200 return karna hota hai, warna wo retry loop me chala jayega
    return new Response(JSON.stringify({ status: 'success', sent: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.error('Error in WhatsApp POST handler:', err);
    // Hamesha 200 OK to prevent Meta continuous retry flood
    return new Response(JSON.stringify({ status: 'error_handled', error: err?.message }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
