import React from 'react';
import {
  X,
  TrendingUp,
  DollarSign,
  Users,
  ShieldCheck,
  Package,
  Video,
  FileSpreadsheet,
  Award,
  Zap,
} from 'lucide-react';
import { ChotelalAvatar } from './ChotelalAvatar';

interface StartupRoadmapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StartupRoadmapModal: React.FC<StartupRoadmapModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl border border-slate-200 my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-700 via-orange-600 to-amber-800 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ChotelalAvatar size="sm" expression="doctor" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black">
                  Chotelal ji Health — Startup Blueprint & Revenue Engine
                </h3>
                <span className="bg-amber-300 text-slate-900 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                  Industry Grade
                </span>
              </div>
              <p className="text-xs text-amber-100">
                फाउंडर गाइड: प्रति-यूजर मोनेटाइजेशन, बिजनेस मॉडल एवं 4-लेवल रेवेन्यू आर्किटेक्चर
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-8 max-h-[80vh] overflow-y-auto">
          {/* Executive Overview */}
          <div className="p-5 rounded-2xl bg-amber-50/70 border-2 border-amber-200 flex flex-col md:flex-row items-center gap-5">
            <div className="shrink-0 text-center">
              <ChotelalAvatar size="md" expression="welcoming" />
              <span className="text-xs font-bold text-amber-900 block mt-1">मस्कट ब्रांडिंग</span>
            </div>
            <div className="text-xs sm:text-sm text-slate-700 space-y-2">
              <p>
                <strong>छोटेलाल जी क्यों काम करेंगे?</strong> भारतीय स्वास्थ्य में 'विश्वास (Trust)' सबसे बड़ा कारक है। एक बुजुर्ग, अनुभवी वैद/डॉक्टर का यह कैरेक्टर मरीज के मन से झिझक (Hesitation) मिटाता है — विशेषकर <em>बवासीर, मानसिक तनाव और हेयर फॉल</em> जैसी समस्याओं में जहां लोग डॉक्टर से सीधे बोलने में शर्माते हैं।
              </p>
              <p className="text-emerald-800 font-bold">
                ✓ AI Triage फ़्री हुक है (Zero CAC User Funnel) ➔ उपचार में प्रामाणिक किट व डॉक्टर परामर्श से सीधा रेवेन्यू जनरेट होता है।
              </p>
            </div>
          </div>

          {/* 4 Pillars of Per-User Revenue */}
          <div>
            <h4 className="text-base sm:text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-600" />
              <span>प्रति यूजर 4 प्रत्यक्ष कमाई के साधन (4 Direct Revenue Streams)</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Stream 1 */}
              <div className="p-5 rounded-2xl border-2 border-orange-200 bg-white shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-orange-600" />
                    <h5 className="font-bold text-sm text-slate-900">1. हर्बल रेमेडी किट ई-कॉमर्स</h5>
                  </div>
                  <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    45-55% मार्जिन
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  जब AI बवासीर या हेयर फॉल डिटेक्ट करता है, तो सीधे प्रमाणित किट (उदा. अर्श-मुक्ति किट ₹899, मेमोरी फोम कुशन ₹749, महाभृंगराज तेल ₹599) ऑर्डर होती है।
                </p>
                <div className="pt-2 border-t text-[11px] font-bold text-slate-700 flex justify-between">
                  <span>औसत आर्डर मूल्य (AOV):</span>
                  <span className="text-orange-700">₹750 – ₹1,200</span>
                </div>
              </div>

              {/* Stream 2 */}
              <div className="p-5 rounded-2xl border-2 border-indigo-200 bg-white shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Video className="w-5 h-5 text-indigo-600" />
                    <h5 className="font-bold text-sm text-slate-900">2. डॉक्टर टेलीकंसल्टेशन कमीशन</h5>
                  </div>
                  <span className="text-xs font-black text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                    25-30% कट
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  गंभीर लक्षणों पर प्लेटफॉर्म सत्यापित बीएएमएस व एमबीबीएस डॉक्टरों के साथ 1-on-1 वीडियो अपॉइंटमेंट (₹199 / ₹499) बुक कराता है।
                </p>
                <div className="pt-2 border-t text-[11px] font-bold text-slate-700 flex justify-between">
                  <span>प्रति कंसल्टेशन रेवेन्यू:</span>
                  <span className="text-indigo-700">₹50 – ₹150 प्रति कॉल</span>
                </div>
              </div>

              {/* Stream 3 */}
              <div className="p-5 rounded-2xl border-2 border-emerald-200 bg-white shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                    <h5 className="font-bold text-sm text-slate-900">3. स्वास्थ्य पत्रिका (Digital Rx PDF)</h5>
                  </div>
                  <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    95% ग्रॉस प्रॉफिट
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  रोगी के लिए व्यक्तिगत 30-दिन का डाइट चार्ट, योगासन रूटीन और नुस्खों की संपूर्ण प्रिस्क्रिप्शन रिपोर्ट (मात्र ₹49 या किट के साथ निःशुल्क)।
                </p>
                <div className="pt-2 border-t text-[11px] font-bold text-slate-700 flex justify-between">
                  <span>डिजिटल डाउनलोड:</span>
                  <span className="text-emerald-700">₹49 – ₹99 प्रति यूजर</span>
                </div>
              </div>

              {/* Stream 4 */}
              <div className="p-5 rounded-2xl border-2 border-amber-200 bg-white shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-600" />
                    <h5 className="font-bold text-sm text-slate-900">4. 'छोटेलाल जी परिवार' सब्सक्रिप्शन</h5>
                  </div>
                  <span className="text-xs font-black text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                    Recurring ARR
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  वार्षिक ₹999 का हेल्थ पास जिसमें परिवार के लिए असीमित AI सलाह, हर महीने 25% स्टोर डिस्काउंट और त्रैमासिक डॉक्टर फॉलो-अप मिलता है।
                </p>
                <div className="pt-2 border-t text-[11px] font-bold text-slate-700 flex justify-between">
                  <span>लाइफटाइम वैल्यू (LTV):</span>
                  <span className="text-amber-800">₹1,500 – ₹2,400</span>
                </div>
              </div>
            </div>
          </div>

          {/* Unit Economics Snapshot */}
          <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-4">
            <h4 className="text-base font-black text-amber-400 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              <span>यूनिट इकोनॉमिक्स (Target Industry Metrics)</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                  ग्राहक अर्जन लागत (CAC)
                </span>
                <span className="text-lg font-black text-white mt-1">₹120 – ₹180</span>
                <span className="text-[10px] text-emerald-400 block">AI हुक से न्यूनतम</span>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                  औसत बास्केट साइज
                </span>
                <span className="text-lg font-black text-amber-400 mt-1">₹850</span>
                <span className="text-[10px] text-slate-300 block">किट + डिलीवरी</span>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                  ग्रॉस प्रॉफिट मार्जिन
                </span>
                <span className="text-lg font-black text-emerald-400 mt-1">52%</span>
                <span className="text-[10px] text-slate-300 block">D2C मैन्युफैक्चरिंग</span>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                  लाइफटाइम वैल्यू (LTV)
                </span>
                <span className="text-lg font-black text-cyan-400 mt-1">₹1,450</span>
                <span className="text-[10px] text-slate-300 block">LTV:CAC &gt; 8x</span>
              </div>
            </div>
          </div>

          {/* Ayush & Legal Compliance */}
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-emerald-900">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
              <span>आयुष मंत्रालय व विधिक अनुपालन (Legal & Regulatory Checklist)</span>
            </div>
            <ul className="space-y-1 list-disc list-inside text-emerald-900">
              <li>
                <strong>Telemedicine Practice Guidelines 2020:</strong> सभी डॉक्टर वीडियो कॉल्स रजिस्टर्ड मेडिकल प्रैक्टिशनर्स द्वारा ही संचालित होंगे।
              </li>
              <li>
                <strong>Drugs and Cosmetics Act, 1940 (Schedule T):</strong> सभी उत्पाद जीएमपी (GMP) प्रमाणित आयुर्वेदिक निर्माण इकाइयों से ही पैक होते हैं।
              </li>
              <li>
                <strong>AI Disclaimer:</strong> प्लेटफॉर्म पर हमेशा स्पष्ट डिस्क्लेमर रहता है कि यह आपातकालीन चिकित्सा की जगह नहीं लेता।
              </li>
            </ul>
          </div>
        </div>

        <div className="p-4 bg-slate-100 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors"
          >
            समझ गया, प्रोडक्ट पर वापस जाएं
          </button>
        </div>
      </div>
    </div>
  );
};
