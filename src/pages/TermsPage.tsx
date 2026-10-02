import React from 'react';
import { PageLayout } from '../components/PageLayout';
import { FileText, CheckSquare, AlertOctagon, Scale, ShieldAlert, Copyright, Mail, Lock } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <PageLayout
      pageTitle="नियम और शर्तें (Terms & Conditions)"
      pageSubtitle="छोटेलाल जी हेल्थ प्लेटफॉर्म का उपयोग करने से पूर्व कृपया इन नियमों एवं शर्तों को ध्यानपूर्वक पढ़ें।"
      badge="उपयोग नियम व कानूनी अधिकार"
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

        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8">
          <div className="text-xs text-slate-500 border-b border-slate-100 pb-3 flex items-center justify-between">
            <span>प्रभावी तिथि: <strong>1 अक्टूबर 2026</strong> | Chotelal Ji Health</span>
            <span className="font-semibold text-orange-600">स्वामित्व: सुमित श्रीवास</span>
          </div>

          {/* User Agreement on IP */}
          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100 text-blue-950 text-xs sm:text-sm space-y-2">
            <p className="font-bold flex items-center gap-1.5 text-blue-900">
              <Lock className="w-4 h-4 text-blue-600" />
              बौद्धिक संपदा स्वीकृति (User Agreement):
            </p>
            <p className="italic">
              &ldquo;By using Chotelal Ji Health, you acknowledge that all intellectual property rights belong exclusively to Sumit Shrivas. You agree not to copy, modify, or redistribute any part of this platform without written permission.&rdquo;
            </p>
          </div>

          {/* Section 1 */}
          <div className="space-y-3">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-serif flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-orange-500" />
              <span>1. उपयोगकर्ता पात्रता (User Eligibility)</span>
            </h3>
            <p>
              इस वेबसाइट की सेवाओं का उपयोग करने के लिए आपकी आयु कम से कम <strong>18 वर्ष</strong> होनी चाहिए। यदि आप 18 वर्ष से कम आयु के हैं, तो आप केवल अपने माता-पिता या कानूनी अभिभावक की उपस्थिति और सहमति से ही इस मंच का उपयोग कर सकते हैं।
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-3">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-serif flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-600" />
              <span>2. स्वीकार्य उपयोग नीति (Acceptable Use Policy)</span>
            </h3>
            <p>
              छोटेलाल जी हेल्थ केवल वैध व्यक्तिगत स्वास्थ्य प्रश्नों और आयुर्वेदिक शैक्षिक मार्गदर्शन के लिए बनाया गया है। आप सहमत हैं कि:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
              <li>आप कोई भी भ्रामक, झूठी या अनुचित स्वास्थ्य जानकारी दर्ज नहीं करेंगे।</li>
              <li>आप इस प्लेटफॉर्म का उपयोग किसी भी प्रकार के अवैध, अनैतिक या सिस्टम को नुकसान पहुंचाने वाले उद्देश्य के लिए नहीं करेंगे।</li>
              <li>प्लेटफॉर्म के स्रोत कोड, एपीआई या एआई मॉडल को अनधिकृत रूप से स्क्रैप अथवा रिवर्स-इंजीनियर नहीं करेंगे।</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="space-y-3">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-serif flex items-center gap-2">
              <AlertOctagon className="w-5 h-5 text-red-500" />
              <span>3. कोई चिकित्सीय वारंटी नहीं (No Medical Guarantee)</span>
            </h3>
            <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-slate-800 text-xs sm:text-sm space-y-2">
              <p>
                <strong>महत्वपूर्ण स्पष्टीकरण:</strong> छोटेलाल जी हेल्थ पर प्रदान की जाने वाली AI व RAG रिपोर्ट, नुस्खे एवं परामर्श पारंपरिक आयुर्वेदिक ग्रंथों (चरक संहिता, सुश्रुत संहिता) पर आधारित <strong>शैक्षिक सुझाव (Educational Suggestions)</strong> हैं। यह किसी लाइसेंस प्राप्त एलोपैथिक डॉक्टर या विशेषज्ञ की औपचारिक नैदानिक जांच का विकल्प नहीं है।
              </p>
              <p>
                हर व्यक्ति की शारीरिक प्रकृति और दोष भिन्न होते हैं, अतः किसी भी उपचार के पूर्व अपने चिकित्सक से परामर्श लें।
              </p>
            </div>
          </div>

          {/* Section 4 */}
          <div className="space-y-3">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-serif flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-blue-500" />
              <span>4. उपयोगकर्ता की ज़िम्मेदारी व आपात स्थिति (User Responsibility in Emergencies)</span>
            </h3>
            <p>
              किसी भी गंभीर, जीवन-घातक या आपातकालीन स्थिति (जैसे अत्यधिक खून बहना, सीने में दर्द, सांस लेने में तकलीफ या बेहोशी) में उपयोगकर्ता की यह व्यक्तिगत ज़िम्मेदारी होगी कि वह बिना समय गंवाए नज़दीकी अस्पताल जाए अथवा <strong>राष्ट्रीय आपातकालीन हेल्पलाइन 108</strong> पर तुरंत संपर्क करे।
            </p>
          </div>

          {/* Section 5 */}
          <div className="space-y-3">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-serif flex items-center gap-2">
              <Scale className="w-5 h-5 text-purple-500" />
              <span>5. लागू कानून एवं क्षेत्राधिकार (Governing Law - India)</span>
            </h3>
            <p>
              ये नियम और शर्तें भारत के गणराज्य के कानूनों और बौद्धिक संपदा अधिनियमों के अनुसार शासित हैं। किसी भी प्रकार के उल्लंघन पर सक्षम भारतीय न्यायालयों के अंतर्गत कानूनी कार्यवाही की जाएगी।
            </p>
          </div>

          {/* Contact Controller */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>प्रश्नों हेतु संपर्क: <strong>sumitshrivas24@gmail.com</strong></span>
            <span>Designed & Developed by Sumit Shrivas | © 2026 All Rights Reserved</span>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
