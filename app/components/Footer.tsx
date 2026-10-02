import React from 'react';
import {
  PhoneCall,
  Mail,
  MapPin,
  ShieldCheck,
  Heart,
  ExternalLink,
} from 'lucide-react';

interface FooterProps {
  onNavigate?: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleLink = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      if (typeof window !== 'undefined') {
        window.history.pushState({}, '', path);
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 font-sans border-t-4 border-[#FF9933]">
      {/* Top Value Banner */}
      <div className="bg-[#1E3A8A] text-white py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <h4 className="text-lg font-black tracking-tight text-white">
              क्या आपको तत्काल आयुर्वेदिक सलाह की आवश्यकता है?
            </h4>
            <p className="text-xs text-amber-200 mt-0.5">
              हमारे 1800-CHOTELAL हेल्पलाइन पर निःशुल्क संपर्क करें या AI रोग जांच शुरू करें।
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleLink('/diagnose')}
              className="px-5 py-2.5 rounded-xl bg-[#FF9933] hover:bg-amber-600 text-white font-black text-xs shadow-md transition-colors"
            >
              Start Free Diagnosis
            </button>
            <button
              onClick={() => handleLink('/doctors')}
              className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-[#1E3A8A] font-black text-xs shadow-md transition-colors"
            >
              Consult Doctor
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FF9933] flex items-center justify-center font-black text-white text-base">
                CJH
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                Chotelal Ji <span className="text-[#FF9933]">Health</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              छोटेलाल जी हेल्थ भारत का अग्रणी एआई-संचालित आयुर्वेदिक प्लेटफॉर्म है। 30+ वर्षों के पारंपरिक ज्ञान और आधुनिक तकनीक के संगम से प्राकृतिक व स्थायी स्वास्थ्य समाधान।
            </p>
            <div className="space-y-1.5 text-xs text-slate-400 pt-2">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-[#FF9933]" />
                <span>हेल्पलाइन: 1800-CHOTELAL (टोल-फ्री, 24x7)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#FF9933]" />
                <span>ईमेल: support@chotelaljihealth.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#FF9933]" />
                <span>मुख्यालय: अस्सी घाट, वाराणसी, उत्तर प्रदेश - 221005</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-sm font-black text-white uppercase tracking-wider mb-4 border-l-2 border-[#FF9933] pl-2">
              नेविगेशन (Explore)
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleLink('/')} className="hover:text-[#FF9933] transition-colors">
                  मुख्य पृष्ठ (Home)
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/diagnose')} className="hover:text-[#FF9933] transition-colors">
                  AI रोग जांच (Diagnose)
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/products')} className="hover:text-[#FF9933] transition-colors">
                  हर्बल उत्पाद (Products)
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/doctors')} className="hover:text-[#FF9933] transition-colors">
                  डॉक्टर परामर्श (Doctors)
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/tracker')} className="hover:text-[#FF9933] transition-colors">
                  हेल्थ ट्रैकर (Daily Tracker)
                </button>
              </li>
            </ul>
          </div>

          {/* Specialties */}
          <div>
            <h5 className="text-sm font-black text-white uppercase tracking-wider mb-4 border-l-2 border-[#FF9933] pl-2">
              प्रमुख क्षेत्र (Verticals)
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleLink('/diagnose')} className="hover:text-[#FF9933] transition-colors">
                  बवासीर व सिटिंग स्ट्रेन (Piles)
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/diagnose')} className="hover:text-[#FF9933] transition-colors">
                  मानसिक तनाव व अनिद्रा (Mental Care)
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/diagnose')} className="hover:text-[#FF9933] transition-colors">
                  हेयर फॉल व डैंड्रफ (Hair Care)
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/diagnose')} className="hover:text-[#FF9933] transition-colors">
                  पाचन व गैस विकार (Gut Health)
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/blog')} className="hover:text-[#FF9933] transition-colors">
                  आयुर्वेदिक शोध एवं ब्लॉग
                </button>
              </li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h5 className="text-sm font-black text-white uppercase tracking-wider mb-4 border-l-2 border-[#FF9933] pl-2">
              कंपनी एवं सहायता
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleLink('/about')} className="hover:text-[#FF9933] transition-colors">
                  छोटेलाल जी के बारे में (About)
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/contact')} className="hover:text-[#FF9933] transition-colors">
                  संपर्क करें (Contact Us)
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/history')} className="hover:text-[#FF9933] transition-colors">
                  पुराने पर्चे (Saved Prescriptions)
                </button>
              </li>
              <li>
                <a href="#disclaimer" className="hover:text-[#FF9933] transition-colors">
                  गोपनीयता नीति (Privacy Policy)
                </a>
              </li>
              <li>
                <a href="#disclaimer" className="hover:text-[#FF9933] transition-colors">
                  नियम एवं शर्तें (Terms of Service)
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div id="disclaimer" className="mt-12 p-4 rounded-2xl bg-slate-800/80 border border-slate-700 text-[11px] text-slate-400 leading-relaxed">
          <div className="flex items-center gap-2 text-amber-400 font-bold mb-1">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>वैधानिक सूचना एवं अस्वीकरण (Statutory Medical Disclaimer):</span>
          </div>
          <p>
            छोटेलाल जी हेल्थ प्लेटफॉर्म पर उपलब्ध सभी जानकारी, एआई निदान, घरेलू नुस्खे और पर्चा केवल शैक्षिक एवं सामान्य स्वास्थ्य जागरूकता के उद्देश्य से प्रदान किए गए हैं। यह किसी योग्य पंजीकृत बीएएमएस या एलोपैथिक डॉक्टर की व्यक्तिगत चिकित्सकीय सलाह का विकल्प नहीं है। किसी भी गंभीर लक्षण, तीव्र दर्द, रक्तस्राव या आपातकालीन स्थिति में तुरंत नजदीकी अस्पताल या डॉक्टर से परामर्श करें।
          </p>
        </div>

        {/* Bottom copyright */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Chotelal Ji Health. सर्वाधिकार सुरक्षित (All Rights Reserved).</p>
          <div className="flex items-center gap-4 text-slate-400 text-xs">
            <span>Website: www.chotelaljihealth.com</span>
            <span>•</span>
            <span>Ayush Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
