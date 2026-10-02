import React, { useState } from 'react';
import { PageLayout } from '../components/PageLayout';
import { Link } from '../router';
import { Leaf, Search, Sparkles, BookOpen, Shield } from 'lucide-react';
import { VoiceReadButton } from '../components/VoiceReadButton';

interface HerbItem {
  id: string;
  name: string;
  hindiName: string;
  botanicalName: string;
  rasa: string; // Taste
  virya: string; // Potency (Hot / Cold)
  vipaka: string;
  doshaKarma: string;
  keyBenefits: string[];
  recommendedDosage: string;
  contraindications: string;
}

const HERBS_DATABASE: HerbItem[] = [
  {
    id: 'triphala',
    name: 'Triphala (Three Sacred Fruits)',
    hindiName: 'त्रिफला (आमलकी, हरीतकी, विभीतकी)',
    botanicalName: 'Emblica officinalis, Terminalia chebula, Terminalia bellirica',
    rasa: 'पंचरस (लवण रहित सभी 5 रस)',
    virya: 'अनुष्णशीत (समशीतोष्ण)',
    vipaka: 'मधुर',
    doshaKarma: 'त्रिदोषशामक (विशेषतः कफ व पित्त शामक)',
    keyBenefits: [
      'आंतों की स्वाभाविक क्रमाकुंचन गति को पुनः सक्रिय करता है।',
      'गुदा नसों की सूजन और अर्श (बवासीर) के दर्द में राहत देता है।',
      'नेत्र ज्योति बढ़ाता है और शरीर से टॉक्सिन्स को बाहर निकालता है।',
    ],
    recommendedDosage: '3 से 5 ग्राम रात को गुनगुने पानी या शहद के साथ।',
    contraindications: 'गर्भावस्था में और तीव्र अतिसार (लूज मोशन) में न लें।',
  },
  {
    id: 'ashwagandha',
    name: 'Ashwagandha (Indian Ginseng)',
    hindiName: 'अश्वगंधा (अश्वगंधा मूल)',
    botanicalName: 'Withania somnifera',
    rasa: 'तिक्त, कषाय, मधुर',
    virya: 'उष्ण (Hot)',
    vipaka: 'मधुर',
    doshaKarma: 'वात-कफ शामक, धातुवर्धक',
    keyBenefits: [
      'कोर्टिसोल (स्ट्रेस हार्मोन) को 30% तक कम कर नसों को शांत करता है।',
      'अनिद्रा, चिंता और ओवरथिंकिंग को समाप्त कर गहरी नींद लाता है।',
      'मांसपेशियों और जोड़ों की ताकत बढ़ाता है।',
    ],
    recommendedDosage: '2 से 3 ग्राम चूर्ण या 1 कैप्सूल रात को गुनगुने दूध के साथ।',
    contraindications: 'अत्यधिक पित्त प्रकोप या उच्च बुखार में सावधानी रखें।',
  },
  {
    id: 'giloy',
    name: 'Giloy / Guduchi (Amrita - Nectar of Life)',
    hindiName: 'गिलोय (अमृता)',
    botanicalName: 'Tinospora cordifolia',
    rasa: 'तिक्त, कषाय',
    virya: 'उष्ण',
    vipaka: 'मधुर',
    doshaKarma: 'त्रिदोष शामक (विशेषतः पित्त व रक्त शोधक)',
    keyBenefits: [
      'सभी प्रकार के पुराने और मौसमी वायरल बुखार को तोड़ता है।',
      'प्लेटलेट काउंट को नियंत्रित रखता है और रोग प्रतिरोधक क्षमता बढ़ाता है।',
      'लिवर को डिटॉक्स कर पाचन अग्नि को संतुलित करता है।',
    ],
    recommendedDosage: '15-20 ml स्वरस या 1-2 गोली सुबह खाली पेट।',
    contraindications: 'शिशुओं के लिए बिना वैद्यकीय परामर्श के न दें।',
  },
  {
    id: 'brahmi',
    name: 'Brahmi (Brain & Memory Herb)',
    hindiName: 'ब्राह्मी',
    botanicalName: 'Bacopa monnieri',
    rasa: 'तिक्त, कषाय',
    virya: 'शीत (Cooling)',
    vipaka: 'मधुर',
    doshaKarma: 'वात-पित्त शामक, मेध्य रसायन',
    keyBenefits: [
      'मस्तिष्क के न्यूरॉन्स की रक्षा करता है और याददाश्त तेज करता है।',
      'अत्यधिक सोचने और घबराहट को शांत करता है।',
      'स्कैल्प की नसों को ठंडक देकर बालों का झड़ना रोकता है।',
    ],
    recommendedDosage: '1-2 चम्मच शर्बत/स्वरस अथवा 500mg अर्क।',
    contraindications: 'अत्यधिक मंद नाड़ी (Bradycardia) वाले मरीज सीमित लें।',
  },
  {
    id: 'amla',
    name: 'Amla (Indian Gooseberry)',
    hindiName: 'आमलकी (आंवला)',
    botanicalName: 'Phyllanthus emblica',
    rasa: 'अम्ल प्रधान पंचरस',
    virya: 'शीत (Cooling)',
    vipaka: 'मधुर',
    doshaKarma: 'त्रिदोषशामक (विशेषतः पित्तशामक)',
    keyBenefits: [
      'विटामिन सी का सबसे समृद्ध प्राकृतिक स्रोत (संतरे से 20 गुना अधिक)।',
      'बालों को सफेद होने से रोकता है और स्कैल्प को पोषण देता है।',
      'पेट की एसिडिटी और सीने की जलन को तुरंत शांत करता है।',
    ],
    recommendedDosage: '15-20 ml स्वरस सुबह खाली पेट पानी के साथ।',
    contraindications: 'अत्यधिक खांसी या ठंड में थोड़ा शहद मिलाकर लें।',
  },
  {
    id: 'neem',
    name: 'Neem (Divine Healer & Blood Purifier)',
    hindiName: 'नीम पत्र व छाल',
    botanicalName: 'Azadirachta indica',
    rasa: 'तिक्त (कड़वा)',
    virya: 'शीत (Cooling)',
    vipaka: 'कटु',
    doshaKarma: 'कफ-पित्त शामक, कृमिघ्न',
    keyBenefits: [
      'रक्त को गहराई से शुद्ध कर कील-मुहासे और त्वचा रोग मिटाता है।',
      'बैक्टीरियल और फंगल संक्रमण से प्राकृतिक रक्षा करता है।',
      'दांतों और मसूड़ों को स्वस्थ रखता है।',
    ],
    recommendedDosage: '2-4 ताजे कोमल पत्ते या 1 गोली सवेरे।',
    contraindications: 'गर्भवती महिलाएं और अत्यधिक दुर्बल व्यक्ति न लें।',
  },
  {
    id: 'tulsi',
    name: 'Holy Basil (Queen of Herbs)',
    hindiName: 'तुलसी (श्यामा व रामा)',
    botanicalName: 'Ocimum sanctum',
    rasa: 'कटु, तिक्त',
    virya: 'उष्ण (Hot)',
    vipaka: 'कटु',
    doshaKarma: 'कफ-वात शामक, दीपन',
    keyBenefits: [
      'फेफड़ों में जमे कफ को पिघलाकर सांस की नली साफ करती है।',
      'तनाव घटाने और मानसिक ताजगी देने वाला शक्तिशाली एडाप्टोजेन।',
      'हृदय और रक्त परिसंचरण को स्वस्थ रखती है।',
    ],
    recommendedDosage: '4-5 ताजे पत्ते सुबह चबाएं या काढ़े में उबालें।',
    contraindications: 'पित्त की अत्यधिक गर्मी में दूध के साथ न लें।',
  },
  {
    id: 'shatavari',
    name: 'Shatavari (Nourishing Rasayana)',
    hindiName: 'शतावरी',
    botanicalName: 'Asparagus racemosus',
    rasa: 'मधुर, तिक्त',
    virya: 'शीत (Cooling)',
    vipaka: 'मधुर',
    doshaKarma: 'वात-पित्त शामक, बल्य, रसायन',
    keyBenefits: [
      'शरीर के ओजस और ऊर्जा को बढ़ाकर कमजोरी मिटाती है।',
      'अमाशय की म्यूकोसल लाइनिंग को सुरक्षित कर एसिडिटी खत्म करती है।',
      'स्त्री एवं पुरुष दोनों के हार्मोनल संतुलन को दुरुस्त रखती है।',
    ],
    recommendedDosage: '3 ग्राम चूर्ण गुनगुने दूध और मिश्री के साथ।',
    contraindications: 'अत्यधिक कफ जमा होने पर न लें।',
  },
  {
    id: 'guggulu',
    name: 'Shuddha Guggulu (Purified Oleo-Gum-Resin)',
    hindiName: 'शुद्ध गुग्गुलु',
    botanicalName: 'Commiphora mukul',
    rasa: 'तिक्त, कटु, कषाय',
    virya: 'उष्ण (Hot)',
    vipaka: 'कटु',
    doshaKarma: 'वात-कफ शामक, मेदोहर, सूजन नाशक',
    keyBenefits: [
      'गुदा नसों की सूजन, मस्सों और जोड़ों के दर्द को तेजी से घटाता है।',
      'रक्त वाहिकाओं में जमे कोलेस्ट्रॉल और ब्लॉकेज को साफ करता है।',
      'घाव भरने की प्रक्रिया को 3 गुना तेज करता है।',
    ],
    recommendedDosage: '500mg से 1 ग्राम भोजनोपरांत गुनगुने पानी से।',
    contraindications: 'लिवर या किडनी की गंभीर बीमारी में केवल वैद्य परामर्श से लें।',
  },
];

export const HerbsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHerbs = HERBS_DATABASE.filter(
    (h) =>
      h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.hindiName.includes(searchTerm) ||
      h.botanicalName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageLayout
      pageTitle="जड़ी-बूटी ज्ञानकोष (Herbs Encyclopedia)"
      pageSubtitle="आयुर्वेद की 50+ दिव्य औषधीय वनस्पतियों का शास्त्रीय परिचय — रस, वीर्य, विपाक, रोगोपचार और सटीक सेवन विधि।"
      badge="आयुर्वेदिक वनस्पति विज्ञान"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* Search */}
        <div className="bg-white rounded-3xl p-6 shadow-xs border border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="जड़ी-बूटी खोजें (उदा. त्रिफला, गिलोय, अश्वगंधा)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-orange-400 text-sm bg-stone-50/60"
            />
          </div>
          <div className="text-xs text-stone-500">
            दिखाई जा रही जड़ी-बूटियां: <strong>{filteredHerbs.length}</strong>
          </div>
        </div>

        {/* Top Audio Banner */}
        <VoiceReadButton
          textToSpeak="नमस्ते बेटा! यह छोटेलाल जी का आयुर्वेदिक जड़ी-बूटी ज्ञानकोष है। हमारे ऋषि-मुनियों ने त्रिफला, अश्वगंधा, गिलोय और ब्राह्मी जैसी दिव्य जड़ी-बूटियों में स्वास्थ्य का अमृत संजोया है। आप किसी भी जड़ी-बूटी के माइक बटन पर क्लिक करके उसके रस, गुण, वीर्य, लाभ और सावधानियां सुन सकते हैं।"
          label="जड़ी-बूटी ज्ञानकोष के बारे में छोटेलाल जी से सुनें"
          sublabel="शास्त्रीय द्रव्यों के गुण, प्रभाव व सेवन विधि की मौखिक जानकारी"
          variant="banner"
        />

        {/* Herbs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHerbs.map((herb) => (
            <div
              key={herb.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 shadow-xs hover:shadow-md transition-all duration-300 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100">
                    <Leaf className="w-5 h-5" />
                  </div>
                  <VoiceReadButton
                    textToSpeak={`${herb.hindiName}। रस: ${herb.rasa}। वीर्य: ${herb.virya}। प्रभाव: ${herb.doshaKarma}। मुख्य लाभ: ${herb.keyBenefits.join('। ')}। खुराक: ${herb.recommendedDosage}। सावधानी: ${herb.contraindications}।`}
                    label="लाभ सुनें"
                    variant="compact"
                    title="इस जड़ी-बूटी के लाभ सुनें"
                  />
                </div>

                <div>
                  <h4 className="text-xl font-bold text-amber-950 font-serif">{herb.hindiName}</h4>
                  <p className="text-xs text-stone-400 italic mt-0.5">{herb.botanicalName}</p>
                </div>

                {/* Ayurvedic Attributes Box */}
                <div className="grid grid-cols-3 gap-2 bg-[#FDFBF7] p-2.5 rounded-xl border border-amber-100/80 text-[11px] text-center">
                  <div>
                    <span className="text-stone-400 block">रस (Taste)</span>
                    <span className="font-bold text-amber-950">{herb.rasa}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block">वीर्य (Potency)</span>
                    <span className="font-bold text-orange-600">{herb.virya}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block">विपाक (Vipaka)</span>
                    <span className="font-bold text-amber-950">{herb.vipaka}</span>
                  </div>
                </div>

                <div className="space-y-1.5 pt-2">
                  <p className="text-xs font-bold text-stone-800">प्रमुख औषधीय लाभ:</p>
                  <ul className="space-y-1 text-xs text-stone-600">
                    {herb.keyBenefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-emerald-600 font-bold">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 space-y-1.5 text-xs">
                <p className="text-orange-700 font-semibold">
                  <strong>खुराक:</strong> {herb.recommendedDosage}
                </p>
                <p className="text-stone-400 text-[11px]">
                  <strong>सावधानी:</strong> {herb.contraindications}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};
