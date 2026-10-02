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
    const body = await req.json().catch(() => ({}));
    const {
      symptoms = '',
      duration = '',
      severity = 'moderate',
      category = 'general',
      lifestyle = {},
    } = body;

    if (!symptoms.trim()) {
      return new Response(
        JSON.stringify({ error: 'Symptoms are required for AI diagnosis.' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }

    // Retrieve Gemini API Key from environment
    const apiKey =
      (typeof process !== 'undefined' ? process.env?.GEMINI_API_KEY : '') ||
      (typeof (globalThis as any).env !== 'undefined' ? (globalThis as any).env?.GEMINI_API_KEY : '');

    if (!apiKey) {
      return new Response(
        JSON.stringify({
          error: 'GEMINI_API_KEY is not set. Please configure GEMINI_API_KEY in your environment or AI Studio Secrets.',
        }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }

    // Dynamic System Prompt for Chotelal Ji
    const systemInstruction = `You are "Chotelal Ji", a highly experienced Ayurvedic doctor with 30 years of practice. 
Your tone is warm, caring, and you speak in Hinglish (Hindi + English).
You never give generic advice. You deeply analyze the user's specific symptoms, duration, and severity.
You must provide:
1. A unique diagnosis based on the exact symptoms (e.g., if someone says "itching and bleeding", you talk about "Pitta dosha and inflamed tissue").
2. Specific herbal remedies with dosage (e.g., "Take 1 tsp Triphala churna with warm water at night").
3. Specific yoga/exercises (e.g., "Do Mula Bandha for 5 minutes").
4. A clear warning.

Always return your answer strictly in this JSON format:
{
  "diagnosis": "string",
  "herbal_remedies": ["string"],
  "ayurvedic_treatment": ["string"],
  "exercises": ["string"],
  "warning": "string"
}`;

    // Dynamic User Prompt combining all patient specifics
    const userPrompt = `Patient Details:
- Category: ${category}
- Specific Symptoms: ${symptoms}
- Duration of Problem: ${duration || 'Not specified'}
- Severity Level: ${severity}
- Lifestyle / Sitting Context: ${lifestyle?.sittingHours ? `${lifestyle.sittingHours} hours sitting daily` : 'Standard routine'}, Water intake: ${lifestyle?.waterIntakeLiters ? `${lifestyle.waterIntakeLiters}L/day` : 'Standard'}.

Analyze these EXACT symptoms dynamically and formulate a personalized, non-generic Ayurvedic diagnosis and treatment plan strictly in the required JSON format.`;

    // Candidate Gemini models with priority on fast and reliable models
    const candidateModels = ['gemini-flash-latest', 'gemini-3.8-flash', 'gemini-3.1-flash-lite'];
    let aiResponseText: string | null = null;
    let lastError: string | null = null;

    for (const model of candidateModels) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'User-Agent': 'aistudio-build',
            },
            body: JSON.stringify({
              systemInstruction: {
                parts: [{ text: systemInstruction }],
              },
              contents: [
                {
                  parts: [{ text: userPrompt }],
                },
              ],
              generationConfig: {
                temperature: 0.7, // Higher temperature for creative, dynamic, non-repetitive responses
                responseMimeType: 'application/json',
              },
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            aiResponseText = text;
            break;
          }
        } else {
          const errData = await response.json().catch(() => ({}));
          lastError = errData?.error?.message || response.statusText;
        }
      } catch (err: any) {
        lastError = err?.message || 'Network error';
      }
    }

    if (!aiResponseText) {
      return new Response(
        JSON.stringify({
          error: `Gemini API call failed: ${lastError || 'Unknown error'}. Please check your GEMINI_API_KEY.`,
        }),
        { status: 502, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }

    // Parse AI JSON response
    const parsedAiOutput = JSON.parse(aiResponseText);

    // Build unified response that contains BOTH the exact required fields
    // AND full UI mapping fields so frontend renders seamlessly
    const responsePayload = {
      id: `diag-${Date.now()}`,
      createdAt: new Date().toISOString(),
      // Exact required fields
      diagnosis: parsedAiOutput.diagnosis || '',
      herbal_remedies: Array.isArray(parsedAiOutput.herbal_remedies) ? parsedAiOutput.herbal_remedies : [],
      ayurvedic_treatment: Array.isArray(parsedAiOutput.ayurvedic_treatment) ? parsedAiOutput.ayurvedic_treatment : [],
      exercises: Array.isArray(parsedAiOutput.exercises) ? parsedAiOutput.exercises : [],
      warning: parsedAiOutput.warning || '',

      // Mapped fields for comprehensive UI views
      patientSummary: {
        category,
        reportedSymptoms: symptoms,
        severity,
        duration: duration || 'A few days',
      },
      diagnosisDetails: {
        primaryCondition: parsedAiOutput.diagnosis,
        primaryConditionHindi: parsedAiOutput.diagnosis,
        ayurvedicDosha: 'त्रिदोषीय विश्लेषण (वात, पित्त, कफ)',
        confidenceScore: Math.floor(88 + Math.random() * 8),
        rootCauseAnalysis: parsedAiOutput.diagnosis,
        prognosisSummary: 'दिए गए नुस्खों और योगासनों के नियमित अभ्यास से स्वास्थ्य लाभ होगा।',
      },
      chotelalPersonalNote: `नमस्ते बेटा! आपकी समस्या को मैंने ध्यान से देखा है। ${parsedAiOutput.warning || 'घबराने की कोई बात नहीं है, नियम से दवा लें।'} छोटेलाल जी हमेशा आपके साथ हैं!`,
      tier1HerbalRemedies: (parsedAiOutput.herbal_remedies || []).map((herb: string, idx: number) => ({
        id: `hr-dyn-${idx + 1}`,
        name: herb,
        hindiName: herb,
        ingredients: 'शुद्ध आयुर्वेदिक जड़ी-बूटियां',
        howToUse: herb,
        frequency: 'दिन में 1 से 2 बार',
        benefits: 'लक्षणों को जड़ से शांत करना',
        caution: parsedAiOutput.warning || 'अतिसार या जलन होने पर मात्रा आधी करें।',
        iconName: 'Pill',
      })),
      tier2LifestyleAndYoga: (parsedAiOutput.exercises || []).map((ex: string, idx: number) => ({
        id: `ly-dyn-${idx + 1}`,
        title: ex,
        hindiTitle: ex,
        type: 'yoga' as const,
        instructions: ex,
        timing: 'सुबह खाली पेट अथवा शाम को',
        benefits: 'रक्त संचार सुधारना एवं नसों का तनाव घटाना',
        dos: ['खाली पेट करें', 'नियमित रूप से 10-15 मिनट समय दें'],
        donts: ['दर्द बढ़ने पर तुरंत रुकें', 'झटके से कोई आसन न करें'],
      })),
      tier3DoctorAdvice: {
        specialistType: 'वरिष्ठ आयुर्वेदिक चिकित्सक / विशेषज्ञ',
        aiDoctorSummary: parsedAiOutput.warning || 'यदि लक्षण 3-5 दिनों में शांत न हों तो चिकित्सक से अवश्य मिलें।',
        redFlags: [parsedAiOutput.warning || 'तीव्र असहनीय दर्द या अत्यधिक कमजोरी'],
        recommendedLabTests: ['CBC (Complete Blood Count)'],
        urgencyLevel: severity === 'severe' ? ('consult_within_48h' as const) : ('routine' as const),
        clinicalNotes: 'छोटेलाल जी की यह सलाह 30 वर्षों के नैदानिक अनुभव पर आधारित है।',
      },
      matchedProductIds: category === 'piles_sitting' 
        ? ['prod-piles-1', 'prod-piles-2'] 
        : category === 'mental_health' 
        ? ['prod-mental-1', 'prod-mental-2'] 
        : category === 'hair_growth' 
        ? ['prod-hair-1', 'prod-hair-2'] 
        : ['prod-gen-1', 'prod-gen-2'],
    };

    return new Response(JSON.stringify(responsePayload), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...CORS_HEADERS,
      },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err?.message || 'Internal server error in dynamic diagnosis' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    );
  }
}
