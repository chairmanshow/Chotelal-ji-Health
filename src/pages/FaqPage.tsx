import React, { useState } from 'react';
import { PageLayout } from '../components/PageLayout';
import { Link } from '../router';
import { ChevronDown, HelpCircle, Sparkles, PhoneCall, MessageCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS_LIST: FaqItem[] = [
  {
    question: 'क्या छोटेलाल जी एक रियल (भौतिक) डॉक्टर हैं?',
    answer:
      'छोटेलाल जी एक AI स्वास्थ्य सहायक (AI Health Assistant) हैं, जो 30 वर्षों के प्रामाणिक शास्त्रीय आयुर्वेदिक ज्ञान और हजारों सफल स्वास्थ्य केस स्टडीज के अनुभव पर प्रशिक्षित हैं। वे आपको पारंपरिक आयुर्वेद के सिद्धांतों के अनुसार सरल भाषा में सटीक मार्गदर्शन और घरेलू नुस्खे प्रदान करते हैं।',
  },
  {
    question: 'क्या AI डायग्नोसिस और परामर्श पूरी तरह मुफ़्त है?',
    answer:
      'हाँ, बिल्कुल! छोटेलाल जी हेल्थ पर AI लक्षण जांच, त्रिदोष विश्लेषण, घरेलू नुस्खे और प्रिस्क्रिप्शन पर्चा डाउनलोड करना 100% मुफ़्त है। हमारा उद्देश्य हर भारतीय तक बिना किसी आर्थिक बोझ के स्वास्थ्य सहायता पहुंचाना है।',
  },
  {
    question: 'क्या यहाँ से दवाइयाँ या प्रोडक्ट्स खरीदे जा सकते हैं?',
    answer:
      'अभी नहीं। हमारा मंच पूरी तरह गैर-व्यावसायिक है और हम कोई दवाइयां या प्रोडक्ट्स नहीं बेचते हैं। हम केवल आपको सही जड़ी-बूटियों, उनकी खुराक और रसोई में तैयार होने वाले घरेलू नुस्खों की प्रामाणिक जानकारी देते हैं, जिन्हें आप किसी भी नज़दीकी पंसारी या आयुर्वेदिक स्टोर से ले सकते हैं।',
  },
  {
    question: 'आपातकालीन या गंभीर स्थिति (Emergency) में क्या करें?',
    answer:
      'किसी भी गंभीर स्थिति (जैसे बहुत अधिक खून आना, असहनीय दर्द, सीने में दर्द या तेज बुखार) में कृपया वेबसाइट पर समय न गंवाएं। तुरंत राष्ट्रीय आपातकालीन नंबर 108 पर कॉल करें या अपने नज़दीकी अस्पताल के इमरजेंसी वार्ड में जाएं।',
  },
  {
    question: 'क्या मेरी बातचीत और बीमारी की जानकारी गोपनीय रहती है?',
    answer:
      'हाँ, 100% गोपनीय! आपके द्वारा साझा किए गए लक्षण और विवरण केवल आपका व्यक्तिगत स्वास्थ्य विश्लेषण करने के लिए उपयोग किए जाते हैं। हम आपका डेटा किसी भी विज्ञापनदाता या तीसरे पक्ष के साथ कभी भी साझा नहीं करते।',
  },
  {
    question: 'क्या मैं WhatsApp पर भी छोटेलाल जी से बात कर सकता हूँ?',
    answer:
      'हाँ, बिल्कुल! आप नीचे दिए गए हरे WhatsApp बटन पर क्लिक करके सीधे अपने मोबाइल से 24x7 कभी भी अपनी भाषा में स्वास्थ्य संबंधी सवाल पूछ सकते हैं। छोटेलाल जी का AI इंजन तुरंत उत्तर देगा।',
  },
  {
    question: 'क्या आयुर्वेदिक नुस्खों का कोई साइड इफेक्ट होता है?',
    answer:
      'हमारे द्वारा बताए गए नुस्खे (जैसे त्रिफला, सिट्ज बाथ, जीरा-सौंफ काढ़ा, आंवला) अत्यंत सुरक्षित और प्राकृतिक हैं। फिर भी, यदि आपको कोई एलर्जी है, आप गर्भवती हैं या पहले से अन्य दवाएं ले रहे हैं, तो दी गई सावधानी को पढ़ें और अपने डॉक्टर से परामर्श अवश्य लें।',
  },
  {
    question: 'पर्चा (Prescription PDF) कैसे प्राप्त करें?',
    answer:
      'जैसे ही आप AI लक्षण जांच (Diagnose) पूरी करते हैं, स्क्रीन पर "पर्चा डाउनलोड करें (Download PDF)" का बटन दिखाई देगा। उस पर क्लिक करते ही एक सुंदर और विस्तृत 10-सेक्शन वाला आयुर्वेदिक पर्चा आपके फोन या कंप्यूटर पर सेव हो जाएगा।',
  },
];

export const FaqPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <PageLayout
      pageTitle="अक्सर पूछे जाने वाले प्रश्न (FAQ)"
      pageSubtitle="छोटेलाल जी, AI डायग्नोसिस, निशुल्क सेवा और स्वास्थ्य सुझावों से जुड़े सभी सामान्य सवालों के स्पष्ट और सरल जवाब।"
      badge="सामान्य प्रश्नोत्तर"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="space-y-4">
          {FAQS_LIST.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-stone-200/90 shadow-xs overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-stone-50/60 transition-colors cursor-pointer"
                >
                  <span className="font-bold text-base sm:text-lg text-amber-950 font-serif">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-amber-50 text-orange-600 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-orange-500 text-white' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-stone-700 leading-relaxed border-t border-stone-100 bg-[#FDFBF7]/50">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions? */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-3xl p-8 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md mt-12">
          <div className="space-y-1">
            <h3 className="text-xl font-bold font-serif">क्या आपका सवाल यहाँ नहीं मिला?</h3>
            <p className="text-xs sm:text-sm text-orange-100">
              हमारी टीम से सीधे संपर्क करें या WhatsApp पर तुरंत पूछें।
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/contact"
              className="bg-white text-orange-600 font-bold px-5 py-2.5 rounded-xl text-xs shadow hover:bg-amber-50 transition-colors"
            >
              संपर्क करें →
            </Link>
            <a
              href="https://wa.me/?text=%E0%A4%A8%E0%A4%AE%E0%A4%B8%E0%A5%8D%E0%A4%A4%E0%A5%87%20%E0%A4%9B%E0%A5%8B%E0%A4%9F%E0%A5%87%E0%A4%B2%E0%A4%BE%E0%A4%B2%20%E0%A4%9C%E0%A5%80!"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow transition-colors flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp चैट</span>
            </a>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
