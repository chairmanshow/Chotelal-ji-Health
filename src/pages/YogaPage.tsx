import React, { useState } from 'react';
import { PageLayout } from '../components/PageLayout';
import { Link } from '../router';
import { Activity, Clock, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';
import { VoiceReadButton } from '../components/VoiceReadButton';

interface YogaItem {
  id: string;
  name: string;
  hindiName: string;
  category: 'asanas' | 'pranayama' | 'mudras';
  targetCondition: string;
  instructions: string[];
  timing: string;
  benefits: string;
  precautions: string;
}

const YOGA_PRACTICES: YogaItem[] = [
  {
    id: 'ashwini-mudra',
    name: 'Ashwini Mudra (Horse Gesture Pelvic Exercise)',
    hindiName: 'अश्विनी मुद्रा (पेल्विक नस संकुचन)',
    category: 'mudras',
    targetCondition: 'बवासीर (Piles), एनल फिशर, पेल्विक कमजोरी',
    instructions: [
      'सुखासन या पद्मासन में रीढ़ की हड्डी सीधी रखकर बैठें।',
      'सांस अंदर लेते हुए गुदा (Anal sphincter) की मांसपेशियों को ऊपर की ओर संकुचित करें (खींचें)।',
      'इस संकुचन को 3 से 5 सेकंड तक रोककर रखें।',
      'सांस छोड़ते हुए धीरे-धीरे गुदा की मांसपेशियों को पूर्ण रूप से ढीला छोड़ें।',
      'इसे 15 से 20 बार दोहराएं।',
    ],
    timing: 'सुबह खाली पेट शौच के उपरांत एवं शाम को भोजन से पूर्व।',
    benefits: 'गुदा क्षेत्र में रुका हुआ दूषित रक्त हृदय की ओर लौटता है और मस्सों की सूजन व दबाव 70% तक घटता है।',
    precautions: 'यदि तीव्र दर्द या ताजा ब्लीडिंग हो तो अत्यंत हल्के हाथ से करें, अत्यधिक बल न लगाएं।',
  },
  {
    id: 'bhramari',
    name: 'Bhramari Pranayama (Humming Bee Breath)',
    hindiName: 'भ्रामरी प्राणायाम (गुंजन ध्यान)',
    category: 'pranayama',
    targetCondition: 'तनाव, चिंता, ओवरथिंकिंग, अनिद्रा ও उच्च रक्तचाप',
    instructions: [
      'शांत स्थान पर बैठें, दोनों अंगूठों से दोनों कानों के छिद्रों को बंद करें।',
      'तर्जनी उंगली माथे पर और बाकी उंगलियां आंखों के ऊपर हल्के से रखें (षण्मुखी मुद्रा)।',
      'गहरी लंबी सांस लें, और सांस छोड़ते हुए भंवरे की तरह ॐ या गुंजन की ध्वनि निकालें।',
      'मस्तिष्क में हो रहे कंपन को महसूस करें। 7 से 11 बार करें।',
    ],
    timing: 'प्रातःकाल खाली पेट या रात को सोने से ठीक पहले।',
    benefits: 'मस्तिष्क में गामा और अल्फा तरंगें पैदा कर पैरासिम्पेथेटिक नर्वस सिस्टम को शांत करता है।',
    precautions: 'कान में गंभीर संक्रमण या मवाद बह रहा हो तो न करें।',
  },
  {
    id: 'sarvangasana',
    name: 'Sarvangasana (Shoulder Stand / Legs up the Wall)',
    hindiName: 'सर्वांगासन (अथवा दीवार के सहारे विपरीता करणी)',
    category: 'asanas',
    targetCondition: 'बालों का झड़ना, थायरॉयड, कमजोरी व चेहरे की कांति',
    instructions: [
      'पीठ के बल लेटें, दोनों पैरों को धीरे-धीरे 90 डिग्री पर उठाएं।',
      'हाथों से कमर को सहारा देते हुए शरीर को कंधों पर सीधा खड़ा करें।',
      'ठोड़ी को छाती (जालंधर बंध) से सटाकर रखें।',
      'यदि यह कठिन लगे, तो दीवार के सहारे पैरों को 90 डिग्री पर टिकाकर 5-10 मिनट विश्राम करें।',
    ],
    timing: 'सुबह खाली पेट 3 से 5 मिनट।',
    benefits: 'गुरुत्वाकर्षण की मदद से सिर और चेहरे की कोशिकाओं तक शुद्ध ऑक्सीजन युक्त रक्त पहुंचता है।',
    precautions: 'उच्च रक्तचाप, सर्वाइकल स्पॉन्डिलाइटिस या हृदय रोग वाले मरीज पूर्ण सर्वांगासन न करें।',
  },
  {
    id: 'vajrasana',
    name: 'Vajrasana (Thunderbolt Pose)',
    hindiName: 'वज्रासन (पाचन का अचूक आसन)',
    category: 'asanas',
    targetCondition: 'गैस, बदहजमी, एसिडिटी, कब्ज व भोजन के बाद भारीपन',
    instructions: [
      'घुटनों को मोड़कर पंजों पर बैठें, दोनों अंगूठे आपस में मिले हों और एड़ियों पर नितंब टिके हों।',
      'दोनों हथेलियों को दोनों घुटनों पर रखें, रीढ़ बिल्कुल सीधी रखें।',
      'आंखें बंद कर सामान्य सांस लेते हुए 10 से 15 मिनट बैठें।',
    ],
    timing: 'भोजन (दोपहर या रात) के तुरंत बाद।',
    benefits: 'पैरों में जाने वाले रक्त को मोड़कर पेट के आमाशय और आंतों में भेजता है जिससे पाचन अग्नि 3 गुना तीव्र होती है।',
    precautions: 'घुटनों में गंभीर आर्थराइटिस या चोट हो तो तकिया लगाकर बैठें।',
  },
  {
    id: 'balayam',
    name: 'Balayam (Nail Rubbing Acupressure)',
    hindiName: 'बालायाम (नाखून रगड़ने की प्राकृतिक क्रिया)',
    category: 'mudras',
    targetCondition: 'बालों का असमय गिरना, पतला होना व गंजापन',
    instructions: [
      'दोनों हाथों की हथेलियों को आमने-सामने लाएं।',
      'चारों उंगलियों के नाखूनों को एक दूसरे के नाखूनों से तेजी से रगड़ें (घर्षण करें)।',
      'दोनों अंगूठों के नाखूनों को न रगड़ें।',
      'दिन में 2 बार 5-10 मिनट तक करें।',
    ],
    timing: 'दिन में कभी भी, खाली समय में या टीवी देखते हुए।',
    benefits: 'नाखूनों की नसों के रिफ्लेक्स स्कैल्प के हेयर फॉलिकल्स से जुड़े हैं, जो सुप्त जड़ों को सक्रिय करते हैं।',
    precautions: 'गर्भवती महिलाएं और उच्च रक्तचाप के तीव्र दौर में न करें।',
  },
];

export const YogaPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'asanas' | 'pranayama' | 'mudras'>('all');

  const filtered = YOGA_PRACTICES.filter(
    (p) => filter === 'all' || p.category === filter
  );

  return (
    <PageLayout
      pageTitle="योग, प्राणायाम व मुद्रा निर्देशिका (Yoga & Exercises)"
      pageSubtitle="औषधियों के साथ-साथ सही योगासन शरीर के आंतरिक अंगों में रक्त प्रवाह बढ़ाते हैं और रोग को जड़ से समाप्त करने में सहायता करते हैं।"
      badge="प्राचीन योग चिकित्सा"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {[
            { id: 'all', label: 'सभी योग अभ्यास' },
            { id: 'asanas', label: 'योगासन (Asanas)' },
            { id: 'pranayama', label: 'प्राणायाम (Breathing)' },
            { id: 'mudras', label: 'मुद्राएं (Mudras)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                filter === tab.id
                  ? 'bg-orange-500 text-white shadow-xs'
                  : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Top Audio Banner */}
        <VoiceReadButton
          textToSpeak="नमस्ते बेटा! योग और प्राणायाम केवल व्यायाम नहीं, बल्कि आपके शरीर की आंतरिक ऊर्जा और त्रिदोषों को संतुलित करने का दिव्य माध्यम है। बवासीर में अश्विनी मुद्रा, तनाव में भ्रामरी प्राणायाम, और पाचन में वज्रासन अमृत समान फल देते हैं। किसी भी आसन के साथ लगे माइक बटन को दबाकर आप छोटेलाल जी से उसके नियम व लाभ सुन सकते हैं।"
          label="योग व प्राणायाम मार्गदर्शिका छोटेलाल जी से सुनें"
          sublabel="आसनों, प्राणायाम व मुद्राओं के सही शास्त्रीय अभ्यास की व्यक्तिगत ऑडियो गाइड"
          variant="banner"
        />

        {/* Practices Cards */}
        <div className="space-y-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100">
                <div>
                  <span className="text-[11px] font-bold text-orange-600 uppercase tracking-wider bg-orange-50 px-2.5 py-0.5 rounded-full">
                    {item.targetCondition}
                  </span>
                  <h3 className="text-2xl font-bold text-amber-950 font-serif mt-1">
                    {item.hindiName}
                  </h3>
                  <p className="text-xs text-stone-400">{item.name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 text-xs text-stone-600 bg-stone-50 px-3 py-1.5 rounded-lg shrink-0">
                    <Clock className="w-3.5 h-3.5 text-orange-500" />
                    <span>{item.timing}</span>
                  </div>
                  <VoiceReadButton
                    textToSpeak={`${item.hindiName}। लक्षित समस्या: ${item.targetCondition}। करने की विधि: ${item.instructions.join('। ')}। समय: ${item.timing}। लाभ: ${item.benefits}। सावधानी: ${item.precautions}।`}
                    label="विधि सुनें"
                    variant="compact"
                    title="इस योगाभ्यास की विधि व लाभ सुनें"
                  />
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
                  अभ्यास की प्रामाणिक विधि (Step-by-Step):
                </p>
                <ol className="space-y-2 text-xs sm:text-sm text-stone-700">
                  {item.instructions.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-stone-100 text-xs">
                <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-100 text-emerald-950">
                  <strong className="block text-emerald-800 mb-1">विशेष लाभ:</strong>
                  {item.benefits}
                </div>
                <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/80 text-amber-950">
                  <strong className="block text-amber-800 mb-1">सावधानी:</strong>
                  {item.precautions}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};
