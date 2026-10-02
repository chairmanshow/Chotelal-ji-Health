import React from 'react';
import { PageLayout } from '../components/PageLayout';
import { AlertTriangle, ShieldCheck, HeartPulse, Stethoscope, PhoneCall, Copyright } from 'lucide-react';

export const DisclaimerPage: React.FC = () => {
  return (
    <PageLayout
      pageTitle="चिकित्सीय एवं कानूनी अस्वीकरण (Disclaimer)"
      pageSubtitle="छोटेलाल जी हेल्थ प्लेटफॉर्म के उपयोग से संबंधित अत्यंत महत्वपूर्ण स्वास्थ्य एवं कानूनी अस्वीकरण।"
      badge="महत्वपूर्ण सूचना व स्वामित्व अधिकार"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
        
        {/* MANDATORY LEGAL OWNERSHIP BANNER */}
        <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-blue-50 rounded-2xl p-6 sm:p-8 border-2 border-orange-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 text-orange-600 font-bold text-lg font-serif">
            <Copyright className="w-6 h-6 text-orange-600 shrink-0" />
            <span>Intellectual Property & Ownership Rights</span>
          </div>
          <div className="text-slate-800 text-sm sm:text-base space-y-3 leading-relaxed">
            <p className="font-semibold text-slate-900">
              This platform, &ldquo;Chotelal Ji Health&rdquo;, including but not limited to its design, source code, AI models, branding, logo, content, features, and functionality, is the exclusive intellectual property of <strong>Sumit Shrivas</strong>.
            </p>
            <p>
              All rights, title, and interest in and to this platform are owned solely by <strong>Sumit Shrivas</strong> (Email:{' '}
              <a href="mailto:sumitshrivas24@gmail.com" className="text-blue-600 font-medium hover:underline">
                sumitshrivas24@gmail.com
              </a>).
            </p>
            <p className="font-semibold text-slate-900 pt-1">
              No part of this platform may be:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-slate-700 font-medium">
              <li>Copied, reproduced, or duplicated</li>
              <li>Modified, distributed, or sold</li>
              <li>Used for commercial purposes</li>
              <li>Reverse engineered or decompiled</li>
            </ul>
            <p className="pt-1 text-rose-700 font-semibold">
              without the express written permission of Sumit Shrivas.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 bg-white/80 p-3 rounded-xl border border-orange-100">
              Any unauthorized use, reproduction, or distribution of this platform or its components will result in legal action under applicable Indian and international copyright laws.
            </p>
            <p className="text-xs font-bold text-orange-700">
              © 2026 Sumit Shrivas. All Rights Reserved.
            </p>
          </div>
        </div>

        {/* Main Highlight Card */}
        <div className="bg-amber-50/90 border-2 border-amber-300 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500 text-white rounded-xl shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-amber-950 font-serif">
              महत्वपूर्ण चिकित्सीय अस्वीकरण (Medical Notice)
            </h3>
          </div>
          <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
            कृपया ध्यान दें कि <strong>छोटेलाल जी हेल्थ</strong> एक कृत्रिम बुद्धिमत्ता (AI) एवं शास्त्रीय आयुर्वेदिक ज्ञान (RAG) आधारित सूचना व शैक्षिक मंच है। यह किसी भी पंजीकृत एलोपैथिक डॉक्टर, एमबीबीएस प्रैक्टिशनर या अस्पताल की औपचारिक आपातकालीन सेवा का प्रत्यक्ष <strong>प्रतिस्थापन (Replacement) नहीं है।</strong>
          </p>
        </div>

        {/* Detailed Disclaimer Clauses */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-2">
            <h4 className="text-lg font-bold text-slate-900 font-serif flex items-center gap-2">
              <HeartPulse className="w-5 h-5 text-orange-500" />
              <span>1. केवल शैक्षिक एवं सूचनात्मक उद्देश्य (Educational Purpose Only)</span>
            </h4>
            <p className="text-slate-600">
              इस वेबसाइट, AI डायग्नोसिस टूल, वॉइस कॉल या ब्लॉग पर दी गई समस्त स्वास्थ्य जानकारी, त्रिदोष विश्लेषण और नुस्खे चरक संहिता, सुश्रुत संहिता और आयुष दिशानिर्देशों पर आधारित सामान्य स्वास्थ्य जागरूकता और शैक्षिक मार्गदर्शन हेतु हैं।
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-lg font-bold text-slate-900 font-serif flex items-center gap-2">
              <PhoneCall className="w-5 h-5 text-red-500" />
              <span>2. आपातकालीन स्थितियों के लिए निर्देश (Emergency Guidelines)</span>
            </h4>
            <div className="p-4 bg-red-50 rounded-xl border border-red-200 text-red-900 text-xs sm:text-sm leading-relaxed">
              यदि आप या आपके परिवार का कोई सदस्य किसी गंभीर चिकित्सीय आपात स्थिति में है — जैसे कि अत्यधिक रक्तस्राव, छाती में तेज दर्द, सांस लेने में असमर्थता, तीव्र जलन या बेहोशी — तो तुरंत <strong>108 (एम्बुलेंस)</strong> पर फोन करें या नज़दीकी अस्पताल में जाएं।
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-lg font-bold text-slate-900 font-serif flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-blue-500" />
              <span>3. व्यक्तिगत स्वास्थ्य स्थिति अनुसार सलाह (Consulting Healthcare Professional)</span>
            </h4>
            <p className="text-slate-600">
              यद्यपि आयुर्वेद की जड़ी-बूटियां (जैसे त्रिफला, अश्वगंधा, गिलोय) प्राकृतिक हैं, फिर भी किसी भी पुरानी बीमारी, गर्भावस्था, स्तनपान कराने वाली माताओं, या पूर्व से अंग्रेजी दवाएं ले रहे मरीजों को कोई भी नया आयुर्वेदिक उपचार शुरू करने से पहले अपने व्यक्तिगत चिकित्सक या योग्य आयुर्वेदिक वैद्य से परामर्श अवश्य लेना चाहिए।
            </p>
          </div>

          {/* Bottom attribution */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>कानूनी व स्वामित्व: <strong>sumitshrivas24@gmail.com</strong></span>
            <span>Designed & Developed by Sumit Shrivas | © 2026 All Rights Reserved</span>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
