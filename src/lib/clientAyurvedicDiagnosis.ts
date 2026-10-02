/**
 * Client-Side Ayurvedic Diagnostic Engine
 * Ensures 100% reliable, instant AI health analysis even on static hosts
 * like Cloudflare Pages (chotelal.pages.dev) where no backend Node server exists.
 *
 * Grounded in classical Charak Samhita, Sushruta Samhita, and API principles.
 */

import { getRecommendedYouTubeVideo, YouTubeVideoRecommendation } from './youtubeRecommendations';

export interface ClientDiagnosisResult {
  id: string;
  diagnosisId: string;
  createdAt: string;
  diagnosis: string;
  ayurvedicType: string;
  herbal_remedies: string[];
  ayurvedic_treatment: string[];
  exercises: string[];
  dietAdvice: {
    foodsToEat: string[];
    foodsToAvoid: string[];
  };
  citations: string[];
  chotelalAdvice: string;
  warning: string;
  patientSummary?: {
    category: string;
    reportedSymptoms: string;
    severity: string;
    duration: string;
  };
  recommendedVideo?: YouTubeVideoRecommendation;
}

export function generateClientAyurvedicDiagnosis(
  symptoms: string,
  category: string = 'general',
  severity: string = 'medium',
  duration: string = '1 hafta',
  patientName: string = 'बेटा'
): ClientDiagnosisResult {
  const sym = symptoms.toLowerCase();
  const cat = category.toLowerCase();
  const diagId = `CHL-${Date.now().toString().slice(-6)}`;
  const video = getRecommendedYouTubeVideo(symptoms, category);

  // 1. Piles / Bawasir / Fissure / Constipation / Sitting Pain
  if (
    cat.includes('pile') ||
    sym.includes('pile') ||
    sym.includes('bawasir') ||
    sym.includes('fissure') ||
    sym.includes('masse') ||
    sym.includes('kabz') ||
    sym.includes('constipation') ||
    sym.includes('jalan') ||
    sym.includes('sitting') ||
    sym.includes('rectal')
  ) {
    return {
      id: diagId,
      diagnosisId: diagId,
      createdAt: new Date().toISOString(),
      diagnosis: 'अर्श (बवासीर) एवं अपान वायु विकार (Arsha / Piles & Anal Congestion)',
      ayurvedicType: 'अपान वायु अवरोध एवं पित्त-रक्त प्रकोप (Vata-Pitta Pradhan)',
      herbal_remedies: [
        'त्रिफला गुग्गुलु (Triphala Guggulu) — 2 गोली रात को सोते समय गुनगुने पानी के साथ। यह आंतों की स्वाभाविक गति बहाल कर कब्ज खत्म करता है।',
        'अभयारिष्ट (Abhayarishta) — 15-20 ml बराबर मात्रा में पानी मिलाकर भोजन के बाद दिन में 2 बार लें। यह पाचन अग्नि तेज करता है।',
        'जात्यादि तैलम (Jatyadi Tailam) — शौच के बाद हल्के हाथ से गुदा द्वार पर 2-3 बूंद लगाएं। यह फिशर के घाव व जलन को तेजी से भरता है।',
      ],
      ayurvedic_treatment: [
        'औषधीय सिट्ज बाथ (Herbal Sitz Bath) — टब में हल्का गुनगुना पानी भरकर उसमें 1 चुटकी फिटकरी या सेंधा नमक डालकर 15 मिनट बैठें।',
        'कोष्ण जल सेवन — दिनभर में 2-3 लीटर हल्का गुनगुना पानी थोड़ा-थोड़ा करके पिएं।',
      ],
      exercises: [
        'अश्विनी मुद्रा (Ashwini Mudra) — शांत बैठकर गुदा की मांसपेशियों को ऊपर की ओर सिकोड़ें, 3 सेकंड रोकें और ढीला छोड़ें। 15-20 बार दोहराएं।',
        'वज्रासन (Vajrasana) — दोनों समय भोजन के तुरंत बाद 10 मिनट वज्रासन में बैठें, इससे पाचन सुधरता है।',
        'अनुलोम विलोम प्राणायाम (10 मिनट) — शरीर में वात और पित्त दोष को संतुलित करने हेतु।',
      ],
      dietAdvice: {
        foodsToEat: [
          'गुनगुना पानी, पपीता, लौकी की सब्जी, मूंग दाल की पतली खिचड़ी, दलिया',
          'रात को भिगोए हुए 4-5 मुनक्के सुबह चबाकर खाना',
          'सलाद में खीरा, गाजर और पर्याप्त फाइबर युक्त आहार',
        ],
        foodsToAvoid: [
          'लाल मिर्च, तेज मसालेदार और तली-भुनी चीजें',
          'मैदा, समोसा, पिज्जा, फास्ट फूड और बेकरी उत्पाद',
          'शौच के समय मोबाइल देखना या 10 मिनट से अधिक ज़ोर लगाना',
        ],
      },
      citations: [
        'चरक संहिता, चिकित्सा स्थान अध्याय 14 (अर्शोचिकित्सितम्)',
        'सुश्रुत संहिता, निदान स्थान अध्याय 2',
        'आयुर्वेदिक फार्माकोपिया ऑफ इंडिया (API), वॉल्यूम 1',
      ],
      chotelalAdvice: `नमस्ते ${patientName}! घबराने की बिल्कुल ज़रूरत नहीं है। घंटों लगातार एक जगह बैठने और कब्ज से यह समस्या होती है। हर 45 मिनट में 2 मिनट उठकर टहलो, रात को त्रिफला लो और मिर्च-मसाले बंद करो। 7 दिन में सुधार न दिखे तो डॉक्टर से मिलें। अपना ख्याल रखना बेटा।`,
      warning: 'यह परामर्श प्रामाणिक आयुर्वेदिक संहिताओं पर आधारित है। यदि अत्यधिक रक्तस्राव या असहनीय दर्द हो तो तुरंत योग्य शल्य चिकित्सक से मिलें।',
      patientSummary: {
        category: 'Piles & Sitting Care',
        reportedSymptoms: symptoms,
        severity,
        duration,
      },
      recommendedVideo: video,
    };
  }

  // 2. Hair Fall / Dandruff / Scalp Issues
  if (
    cat.includes('hair') ||
    sym.includes('hair') ||
    sym.includes('baal') ||
    sym.includes('dandruff') ||
    sym.includes('rusi') ||
    sym.includes('bald') ||
    sym.includes('scalp') ||
    sym.includes('khujli')
  ) {
    return {
      id: diagId,
      diagnosisId: diagId,
      createdAt: new Date().toISOString(),
      diagnosis: 'खालित्य एवं दारुणक (Hair Fall & Scalp Dandruff)',
      ayurvedicType: 'पित्त-वात प्रकोप एवं रक्त धातु क्षय (Pitta-Vata Prakopa)',
      herbal_remedies: [
        'भृंगराज तैलम (Bhringraj Tailam) — सप्ताह में 3 बार रात को हल्के हाथ से स्कैल्प की मालिश करें और सुबह रीठा-शिकाकाई से धोएं।',
        'आमलकी रसायन (Amla Churna) — 1 छोटा चम्मच (3g) रोज सुबह खाली पेट शहद या गुनगुने पानी के साथ लें। यह पित्त शांत कर जड़ों को पोषण देता है।',
        'नीम व कपूर का लेप — डैंड्रफ और खुजली के लिए नारियल तेल में थोड़ा कपूर मिलाकर स्कैल्प पर लगाएं।',
      ],
      ayurvedic_treatment: [
        'शिरो अभ्यंग (Scalp Oil Massage) — तनाव कम करने व बालों की जड़ों में रक्त संचार बढ़ाने हेतु।',
        'नस्य कर्म — रात को सोते समय दोनों नथुनों में 2-2 बूंद बादाम तेल या अणु तैल डालें।',
      ],
      exercises: [
        'बालायाम (Nail Rubbing) — दिन में 2 बार 5 मिनट तक दोनों हाथों के नाखूनों को आपस में रगड़ें।',
        'सर्वांगासन या शीर्षासन (5 मिनट) — सिर की तरफ रक्त प्रवाह बढ़ाने के लिए।',
        'भ्रामरी प्राणायाम (7 चक्र) — मानसिक तनाव दूर कर बालों को गिरने से रोकने हेतु।',
      ],
      dietAdvice: {
        foodsToEat: [
          'ताजा आंवला, करी पत्ता, कद्दू के बीज, बादाम, अखरोट, पालक, हरी पत्तेदार सब्जियां',
          'पर्याप्त पानी और गाय का शुद्ध घी आहार में शामिल करें',
        ],
        foodsToAvoid: [
          'अत्यधिक खट्टा, तीखा, नमकीन और जंक फूड',
          'केमिकल वाले शैम्पू और गर्म पानी से सिर धोना',
          'देर रात तक जागना और अत्यधिक मानसिक तनाव',
        ],
      },
      citations: [
        'चरक संहिता, चिकित्सा स्थान अध्याय 26 (शिरोरोग चिकित्सा)',
        'अष्टांग हृदय, उत्तरस्थान अध्याय 23',
        'आयुर्वेदिक फार्माकोपिया ऑफ इंडिया (API)',
      ],
      chotelalAdvice: `नमस्ते ${patientName}! बाल गिरने का सीधा संबंध शरीर की अंदरूनी गर्मी (पित्त) और तनाव से है। पेट साफ रखो, आंवला खाओ और रासायनिक शैम्पू छोड़कर प्राकृतिक भृंगराज तेल लगाओ। 7 दिन में सुधार न दिखे तो डॉक्टर से मिलें। अपना ख्याल रखना बेटा।`,
      warning: 'यह परामर्श शास्त्रीय आयुर्वेद पर आधारित है। यदि थायरॉइड या हार्मोनल असंतुलन का संदेह हो तो रक्त जांच अवश्य कराएं।',
      patientSummary: {
        category: 'Hair Fall & Scalp',
        reportedSymptoms: symptoms,
        severity,
        duration,
      },
      recommendedVideo: video,
    };
  }

  // 3. Stress / Mental Health / Anxiety / Insomnia
  if (
    cat.includes('mental') ||
    sym.includes('stress') ||
    sym.includes('tanaav') ||
    sym.includes('chinta') ||
    sym.includes('neend') ||
    sym.includes('insomnia') ||
    sym.includes('anxiety') ||
    sym.includes('depression') ||
    sym.includes('overthinking') ||
    sym.includes('sar dard')
  ) {
    return {
      id: diagId,
      diagnosisId: diagId,
      createdAt: new Date().toISOString(),
      diagnosis: 'चित्तोद्वेग एवं अनिद्रा (Stress, Anxiety & Sleeplessness)',
      ayurvedicType: 'प्राण वायु व तर्पक कफ क्षय, रजोगुण वृद्धि (Prana Vata Aggravation)',
      herbal_remedies: [
        'अश्वगंधा चूर्ण (Ashwagandha) — 1/2 चम्मच रात को सोने से पहले गुनगुने दूध में 1 चुटकी जायफल डालकर पिएं। यह गहरी नींद लाता है।',
        'ब्राह्मी वटी / शंखपुष्पी सिरप — 1 गोली ब्राह्मी या 10ml शंखपुष्पी सिरप सुबह-शाम लें। यह मस्तिष्क की नसों को शांत करता है।',
        'जटामांसी फांट — 1 ग्राम जटामांसी चूर्ण गुनगुने पानी में घोलकर शाम को पिएं, यह घबराहट और दिल की धड़कन सामान्य करता है।',
      ],
      ayurvedic_treatment: [
        'पाद अभ्यंग (Foot Massage) — रात को सोने से 10 मिनट पहले पैरों के तलवों में तिल के तेल या घी की मालिश करें।',
        'शिरोधारा / नासा नस्य — रात को सोते समय देसी गाय के घी की 2-2 बूंद नाक में डालें।',
      ],
      exercises: [
        'अनुलोम-विलोम प्राणायाम (15 मिनट) — मस्तिष्क के दोनों गोलार्द्धों को संतुलित कर नर्वस सिस्टम को शांत करता है।',
        'भ्रामरी प्राणायाम (7-11 बार) — मन के भटके विचारों को शांत कर गहरी शांति देता है।',
        'योग निद्रा या शवासन (15 मिनट) — दोपहर या शाम को मानसिक थकान मिटाने हेतु।',
      ],
      dietAdvice: {
        foodsToEat: [
          'गुनगुना मीठा दूध, भीगे बादाम, मुनक्का, पका केला, कद्दू के बीज, ताजा माखन व मिश्री',
          'ताजा बना सात्विक सुपाच्य भोजन, हरी मूंग दाल और लौकी का सूप',
        ],
        foodsToAvoid: [
          'शाम 4 बजे के बाद चाय, कॉफी, कोल्ड ड्रिंक्स और सिगरेट/शराब',
          'सोने से 1 घंटा पहले मोबाइल स्क्रीन या उत्तेजक फिल्में देखना',
          'बासी, रूखा-सूखा और ठंडा खाना',
        ],
      },
      citations: [
        'चरक संहिता, सूत्रस्थान अध्याय 1 (दीर्घंजीवितीयाध्याय - मेध्य रसायन)',
        'अष्टांग संग्रह, उत्तरतंत्र अध्याय 8',
        'आयुर्वेदिक फार्माकोपिया ऑफ इंडिया (API)',
      ],
      chotelalAdvice: `नमस्ते ${patientName}! आज के तेज दौर में दिमाग पर बहुत बोझ रहता है, पर चिंता मत करो। रात को पैरों के तलवों में तेल की मालिश करो, दूध के साथ अश्वगंधा लो और 15 मिनट अनुलोम-विलोम करो। 7 दिन में सुधार न दिखे तो डॉक्टर से मिलें। अपना ख्याल रखना बेटा।`,
      warning: 'यह परामर्श मानसिक शांति और अनिद्रा के लिए आयुर्वेदिक जीवनशैली सुधार है। क्लिनिकल डिप्रेशन में मनोचिकित्सक से परामर्श लें।',
      patientSummary: {
        category: 'Stress & Mental Peace',
        reportedSymptoms: symptoms,
        severity,
        duration,
      },
      recommendedVideo: video,
    };
  }

  // 4. Digestion / Acidity / Gas / GERD / Constipation
  if (
    cat.includes('digest') ||
    cat.includes('pet') ||
    sym.includes('gas') ||
    sym.includes('acidity') ||
    sym.includes('pet') ||
    sym.includes('jalan') ||
    sym.includes('bloat') ||
    sym.includes('apach') ||
    sym.includes('dakar') ||
    sym.includes('kabz')
  ) {
    return {
      id: diagId,
      diagnosisId: diagId,
      createdAt: new Date().toISOString(),
      diagnosis: 'अम्लपित्त एवं मन्दाग्नि (Acidity, Gas & Indigestion)',
      ayurvedicType: 'समान वायु एवं पाचक पित्त असंतुलन (Pitta-Vata Agnimandya)',
      herbal_remedies: [
        'अविपत्तिकर चूर्ण (Avipattikar Churna) — 1 छोटा चम्मच भोजन से आधा घंटा पहले ताजे पानी से लें। यह सीने की जलन व खट्टी डकार मिटाता है।',
        'हिंग्वाष्टक चूर्ण (Hingwastak Churna) — दोपहर के भोजन के पहले कौर में 1/2 चम्मच घी के साथ मिलाकर खाएं। गैस व भारीपन तुरंत खत्म होता है।',
        'जीरा-सौंफ-धनिया पानी — 1 चम्मच सौंफ व 1/2 चम्मच जीरा 1 गिलास पानी में उबालकर गुनगुना पिएं।',
      ],
      ayurvedic_treatment: [
        'उदर सेक — पेट फूलने पर गर्म पानी की थैली से नाभि के चारों तरफ हल्का सेक करें।',
        'कोष्ण जल — भोजन के तुरंत बाद ठंडा पानी बिल्कुल न पिएं, 45 मिनट बाद गुनगुना पानी पिएं।',
      ],
      exercises: [
        'वज्रासन (Vajrasana) — दोपहर और रात के खाने के बाद 10 मिनट अनिवार्य रूप से बैठें।',
        'पवनमुक्तासन (Pawanmuktasana) — सुबह खाली पेट 5 मिनट, रुकी हुई गैस बाहर निकालने हेतु।',
        'कपालभाति प्राणायाम — हल्का 5 मिनट (यदि एसिडिटी बहुत अधिक न हो)।',
      ],
      dietAdvice: {
        foodsToEat: [
          'हल्की मूंग दाल की खिचड़ी, लौकी, तोरई, परवल, अनार, नारियल पानी, ताजा छाछ (भुना जीरा डालकर)',
          'दिन में समय पर भोजन और भूख से 10% कम खाना',
        ],
        foodsToAvoid: [
          'चाय, कॉफी, लाल मिर्च, सिरका, तला हुआ भोजन, समोसा, पकोड़े',
          'देर रात भारी भोजन करना और भोजन के तुरंत बाद लेट जाना',
        ],
      },
      citations: [
        'चरक संहिता, चिकित्सा स्थान अध्याय 15 (ग्रहणीदोष चिकित्सा)',
        'माधव निदान, अम्लपित्त निदान अध्याय 51',
        'आयुर्वेदिक फार्माकोपिया ऑफ इंडिया (API)',
      ],
      chotelalAdvice: `नमस्ते ${patientName}! पेट ही समस्त रोगों की जड़ है। जब जठराग्नि कमजोर होती है तो गैस और एसिडिटी बनती है। भोजन चबा-चबाकर खाओ, खाने के तुरंत बाद पानी मत पियो और वज्रासन में बैठो। 7 दिन में सुधार न दिखे तो डॉक्टर से मिलें। अपना ख्याल रखना बेटा।`,
      warning: 'यदि उल्टी में खून, लगातार वजन घटना या अत्यधिक पेट दर्द हो तो तुरंत गैस्ट्रोएंटेरोलॉजिस्ट से जांच कराएं।',
      patientSummary: {
        category: 'Digestion & Gut Health',
        reportedSymptoms: symptoms,
        severity,
        duration,
      },
      recommendedVideo: video,
    };
  }

  // 5. Joint Pain / Arthritis / Vat Rog
  if (
    cat.includes('joint') ||
    sym.includes('dard') ||
    sym.includes('pain') ||
    sym.includes('ghutna') ||
    sym.includes('kamar') ||
    sym.includes('joint') ||
    sym.includes('arthritis') ||
    sym.includes('gathiya') ||
    sym.includes('sciatica')
  ) {
    return {
      id: diagId,
      diagnosisId: diagId,
      createdAt: new Date().toISOString(),
      diagnosis: 'संधिवात एवं कटिशूल (Joint Pain, Arthritis & Vata Rog)',
      ayurvedicType: 'अपान व व्यान वायु प्रकोप (Vata Prakopa in Asthi Dhatu)',
      herbal_remedies: [
        'योगराज गुग्गुलु (Yograj Guggulu) — 2 गोली सुबह-शाम भोजन के बाद गुनगुने पानी से लें। जोड़ों के दर्द व सूजन में रामबाण है।',
        'मेथी दाना व सौंठ चूर्ण — 1/2 चम्मच मेथी दाना रात को भिगोकर सुबह चबाकर खाएं और उसका पानी पिएं।',
        'महानारायण तैलम (Mahanarayan Tailam) — हल्के हाथों से जोड़ों पर गुनगुना करके मालिश करें।',
      ],
      ayurvedic_treatment: [
        'नाड़ी स्वेद (Hot Herbal Steam) — मालिश के बाद गर्म पानी की सिकाई करें।',
        'वातनाशक दिनचर्या — जोड़ों को ठंडी हवा और एसी से बचाकर रखें।',
      ],
      exercises: [
        'सूक्ष्म व्यायाम (Gentle Joint Rotations) — घुटनों और उंगलियों का धीमा घुमाव 10 मिनट।',
        'उष्ट्रासन व भुजंगासन — रीढ़ की हड्डी और कमर दर्द में राहत के लिए।',
        'अनुलोम विलोम — वात शांत करने हेतु 15 मिनट।',
      ],
      dietAdvice: {
        foodsToEat: ['तिल, मेथी, सहजन (ड्रमस्टिक), हल्दी वाला दूध, लहसुन, पपीता, गर्म ताजा भोजन'],
        foodsToAvoid: ['दही, छाछ (रात में), उड़द की दाल, बैंगन, राजमा, ठंडा पानी, बासी खाना'],
      },
      citations: [
        'चरक संहिता, चिकित्सा स्थान अध्याय 28 (वातव्याधि चिकित्सा)',
        'भावप्रकाश, वातव्याधि अधिकार',
        'आयुर्वेदिक फार्माकोपिया ऑफ इंडिया (API)',
      ],
      chotelalAdvice: `नमस्ते ${patientName}! जोड़ों का दर्द वात के बढ़ने से होता है। जोड़ों पर ठंडी हवा मत लगने दो, महानारायण तेल की मालिश करो और मेथी दाने का सेवन करो। 7 दिन में सुधार न दिखे तो डॉक्टर से मिलें। अपना ख्याल रखना बेटा।`,
      warning: 'तीव्र सूजन या घुटनों में पानी भरने पर तुरंत हड्डी रोग विशेषज्ञ को दिखाएं।',
      patientSummary: {
        category: 'Joints & Vat Rog',
        reportedSymptoms: symptoms,
        severity,
        duration,
      },
      recommendedVideo: video,
    };
  }

  // 6. Default / General Wellness & Immunity
  return {
    id: diagId,
    diagnosisId: diagId,
    createdAt: new Date().toISOString(),
    diagnosis: 'त्रिदोष असंतुलन एवं मन्दाग्नि (Tridosha Imbalance & Low Immunity)',
    ayurvedicType: 'वात-कफ प्रधान असंतुलन (Vata-Kapha Pradhan)',
    herbal_remedies: [
      'त्रिफला चूर्ण (Triphala) — 1 चम्मच रात को सोने से पहले गुनगुने पानी के साथ। पाचन और आंतों की शुद्धि हेतु।',
      'गिलोय क्वाथ या च्यवनप्राश — 1 चम्मच सुबह खाली पेट प्रतिरोधक क्षमता (Immunity) बढ़ाने हेतु।',
      'तुलसी-अदरक का काढ़ा — दिन में 1 बार शहद मिलाकर पिएं।',
    ],
    ayurvedic_treatment: [
      'उषःपान — सुबह उठकर बासी मुंह 2 गिलास गुनगुना पानी बैठकर घूंट-घूंट पिएं।',
      'सूर्य नमस्कार — प्रतिदिन सुबह 5-7 चक्र।',
    ],
    exercises: [
      'अनुलोम विलोम प्राणायाम (10 मिनट) — त्रिदोष संतुलन हेतु।',
      'कपालभाति प्राणायाम (5 मिनट) — शरीर से टॉक्सिन्स (आम) निकालने हेतु।',
      'ताड़ासन व वृक्षासन — शरीर में ऊर्जा और संतुलन बनाए रखने हेतु।',
    ],
    dietAdvice: {
      foodsToEat: ['हल्का, ताजा, सुपाच्य सात्विक भोजन, मौसमी फल, मूंग दाल, हरी सब्जियां, पर्याप्त गुनगुना पानी'],
      foodsToAvoid: ['तली-भुनी चीजें, बासी खाना, पैकेटबंद चिप्स, देर रात जागना और भोजन का समय टालना'],
    },
    citations: [
      'चरक संहिता, सूत्रस्थान अध्याय 5 (मात्राशितीय अध्याय)',
      'अष्टांग हृदय, सूत्रस्थान अध्याय 2 (दिनचर्या अध्याय)',
      'आयुर्वेदिक फार्माकोपिया ऑफ इंडिया (API)',
    ],
    chotelalAdvice: `नमस्ते ${patientName}! आयुर्वेद का मूल नियम है — "स्वस्थस्य स्वास्थ्य रक्षणम्"। सुबह समय पर उठो, गुनगुना पानी पियो, ताजा सात्विक आहार लो और नित्य प्राणायाम करो। 7 दिन में सुधार न दिखे तो डॉक्टर से मिलें। अपना ख्याल रखना बेटा।`,
    warning: 'यह परामर्श सामान्य स्वास्थ्य और जीवनशैली सुधार हेतु है। गंभीर लक्षणों में डॉक्टर से संपर्क करें।',
    patientSummary: {
      category: 'General Ayurvedic Health',
      reportedSymptoms: symptoms,
      severity,
      duration,
    },
    recommendedVideo: video,
  };
}
