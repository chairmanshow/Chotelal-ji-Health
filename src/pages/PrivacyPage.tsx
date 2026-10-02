import React from 'react';
import { PageLayout } from '../components/PageLayout';
import { Shield, Lock, EyeOff, UserCheck, Mail, Database, Copyright } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <PageLayout
      pageTitle="गोपनीयता नीति (Privacy Policy)"
      pageSubtitle="छोटेलाल जी हेल्थ पर आपकी व्यक्तिगत व स्वास्थ्य संबंधी जानकारी की सुरक्षा हमारी सर्वोच्च प्राथमिकता है।"
      badge="100% डेटा सुरक्षा व स्वामित्व अधिकार"
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
            <span>अंतिम नवीनीकरण: <strong>1 अक्टूबर 2026</strong> | Chotelal Ji Health</span>
            <span className="font-semibold text-orange-600">डेटा नियंत्रक: सुमित श्रीवास</span>
          </div>

          {/* DATA CONTROLLER MANDATORY CLAUSE */}
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-950 text-xs sm:text-sm space-y-2">
            <h4 className="font-bold text-sm text-blue-900 flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-blue-600" />
              Data Controller Information:
            </h4>
            <p className="font-medium text-slate-800">
              &ldquo;Data Controller: Sumit Shrivas (sumitshrivas24@gmail.com). For any data-related queries or deletion requests, contact the above email.&rdquo;
            </p>
          </div>

          {/* Section 1 */}
          <div className="space-y-3">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-serif flex items-center gap-2">
              <Database className="w-5 h-5 text-orange-500" />
              <span>1. हम कौन सी जानकारी एकत्र करते हैं (Information We Collect)</span>
            </h3>
            <p>
              छोटेलाल जी हेल्थ का मुख्य उद्देश्य आपको सुरक्षित और सटीक स्वास्थ्य परामर्श देना है। जब आप हमारी सेवाओं का उपयोग करते हैं, तो हम केवल निम्नलिखित न्यूनतम जानकारी ही एकत्र करते हैं:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>
                <strong>स्वास्थ्य लक्षण एवं रोग विवरण:</strong> आपके द्वारा बताए गए लक्षण, बीमारी की अवधि (Duration), गंभीरता (Severity), और बैठने का समय।
              </li>
              <li>
                <strong>Google Auth विवरण:</strong> सुरक्षित लॉगिन हेतु आपका नाम, ईमेल और प्रोफ़ाइल चित्र (सुरक्षित Firebase प्रमाणीकरण के अंतर्गत)।
              </li>
              <li>
                <strong>प्रिस्क्रिप्शन नाम:</strong> आयुर्वेदिक पर्चा (PDF) डाउनलोड करने के लिए मरीज द्वारा स्वेच्छा से दिया गया नाम और उम्र।
              </li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="space-y-3">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-serif flex items-center gap-2">
              <EyeOff className="w-5 h-5 text-emerald-600" />
              <span>2. हम आपके डेटा का उपयोग कैसे करते हैं (How We Use Your Data)</span>
            </h3>
            <p>
              एकत्र की गई जानकारी का उपयोग केवल और केवल निम्नलिखित कार्यों के लिए किया जाता है:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>
                उन्नत RAG तकनीक और शास्त्रीय आयुर्वेदिक ज्ञान (चरक व सुश्रुत संहिता) के आधार पर आपके त्रिदोष (वात-पित्त-कफ) का विश्लेषण करने के लिए।
              </li>
              <li>
                व्यक्तिगत घरेलू नुस्खे, आहार नियम, योगासन और मुफ़्त प्रिस्क्रिप्शन पर्चा तैयार करने के लिए।
              </li>
              <li>
                हम आपका व्यक्तिगत डेटा कभी भी किसी तीसरे पक्ष, फार्मास्युटिकल कंपनी या विज्ञापनदाता को नहीं बेचते।
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="space-y-3">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-serif flex items-center gap-2">
              <Lock className="w-5 h-5 text-blue-500" />
              <span>3. डेटा सुरक्षा व एन्क्रिप्शन (Data Security)</span>
            </h3>
            <p>
              हम आधुनिक 256-बिट SSL/TLS एन्क्रिप्शन और सुरक्षित क्लाउड इन्फ्रास्ट्रक्चर का उपयोग करते हैं। आपके परामर्श सत्र और वॉइस कॉल डेटा पूर्णतः सुरक्षित रहते हैं।
            </p>
          </div>

          {/* Section 4 */}
          <div className="space-y-3">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-serif flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-purple-500" />
              <span>4. आपके अधिकार व डेटा विलोपन (Your Rights & Data Deletion)</span>
            </h3>
            <p>
              आपको अपने डेटा को देखने, संशोधित करने अथवा हमारे सिस्टम से पूर्णतः हटाने (Permanent Deletion) का पूर्ण अधिकार है। इसके लिए आप सीधे डेटा नियंत्रक <strong>sumitshrivas24@gmail.com</strong> पर ईमेल भेज सकते हैं।
            </p>
          </div>

          {/* Bottom attribution */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>डेटा सहायता: <strong>sumitshrivas24@gmail.com</strong></span>
            <span>Designed & Developed by Sumit Shrivas | © 2026 All Rights Reserved</span>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
