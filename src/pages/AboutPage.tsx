import React from 'react';
import { PageLayout } from '../components/PageLayout';
import { ChotelalAvatar } from '../components/ChotelalAvatar';
import { Link } from '../router';
import { ShieldCheck, Heart, Sparkles, Award, Clock, Users, ArrowRight } from 'lucide-react';
import { VoiceReadButton } from '../components/VoiceReadButton';

export const AboutPage: React.FC = () => {
  return (
    <PageLayout
      pageTitle="छोटेलाल जी के बारे में (About Chotelal Ji)"
      pageSubtitle="30 वर्षों का समर्पित आयुर्वेदिक अनुभव, निःस्वार्थ सेवा भावना और हर भारतीय तक गुणवत्तापूर्ण स्वास्थ्य सहायता पहुंचाने का पवित्र संकल्प।"
      badge="हमारा मिशन व दर्शन"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Intro Hero Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-amber-100 shadow-sm flex flex-col sm:flex-row items-center gap-8 text-center sm:text-left">
          <div className="p-3 bg-amber-50 rounded-3xl border border-amber-200/80 inline-block shrink-0">
            <ChotelalAvatar size="xl" expression="welcoming" />
          </div>

          <div className="space-y-3">
            <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
              संस्थापक व मुख्य परामर्शदाता
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-amber-950 font-serif">
              छोटेलाल जी
            </h3>
            <p className="text-xs text-stone-500 font-medium">
              30+ वर्ष शास्त्रीय आयुर्वेदिक शोध एवं नाड़ी परीक्षा अनुभव
            </p>
            <p className="text-sm text-stone-700 leading-relaxed font-normal">
              &ldquo;स्वास्थ्य कोई व्यापार नहीं, जीवन का अधिकार है। जब हमारी दादी-नानी के नुस्खे और चरक संहिता का ज्ञान सही तकनीक से जुड़ता है, तो महंगे डॉक्टरों और गैर-जरूरी ऑपरेशनों की ज़रूरत खत्म हो जाती है।&rdquo;
            </p>

            <div className="pt-2">
              <VoiceReadButton
                textToSpeak="नमस्ते बेटा! मैं छोटेलाल जी हूँ। मेरा 30 वर्षों का संकल्प है कि हर व्यक्ति तक आयुर्वेद का सही, हानिरहित और प्राकृतिक ज्ञान पहुंचे। स्वास्थ्य कोई व्यापार नहीं, बल्कि आपका मौलिक अधिकार है। यदि आपको कोई भी स्वास्थ्य कष्ट है, तो बेझिझक मुझसे अपनी समस्या साझा करें।"
                label="छोटेलाल जी का संदेश सुनें"
                variant="pill"
              />
            </div>
          </div>
        </div>

        {/* Mission & Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
              १
            </div>
            <h4 className="text-lg font-bold text-amber-950 font-serif">सुलभ एवं निःशुल्क</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              हमारा मुख्य उद्देश्य हर वर्ग के व्यक्ति को बिना किसी फीस, सब्सक्रिप्शन या छिपे हुए शुल्क के प्रामाणिक स्वास्थ्य परामर्श देना है।
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              २
            </div>
            <h4 className="text-lg font-bold text-amber-950 font-serif">100% प्राकृतिक</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              कोई हानिकारक केमिकल, स्टेरॉयड या आदत डालने वाली गोलियां नहीं। केवल रसोई के मसाले, आहार नियम और सुरक्षित जड़ी-बूटियां।
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
              ३
            </div>
            <h4 className="text-lg font-bold text-amber-950 font-serif">AI व प्राचीन ज्ञान</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              30 वर्षों के हजारों मामलों के अनुभव को आधुनिक AI में पिरोया गया है ताकि किसी भी समय 1 मिनट में सटीक जांच मिल सके।
            </p>
          </div>
        </div>

        {/* The Story */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200 shadow-xs space-y-4 text-sm sm:text-base text-stone-700 leading-relaxed">
          <h3 className="text-2xl font-bold text-amber-950 font-serif">
            छोटेलाल जी हेल्थ की यात्रा
          </h3>
          <p>
            छोटेलाल जी ने अपने जीवन के 30 से अधिक वर्ष भारत के विभिन्न भागों में रहकर दुर्लभ वनस्पतियों के अध्ययन और रोगियों की प्रत्यक्ष सेवा में बिताए। उन्होंने देखा कि आधुनिक जीवनशैली — विशेषकर आईटी, बैंकिंग और दुकानदारी में बैठने वाले युवाओं — में बवासीर (Piles), गैस, तनाव और बाल झड़ने की समस्याएं महामारी की तरह फैल रही हैं।
          </p>
          <p>
            अज्ञानतावश लोग हजारों रुपए के गैर-जरूरी ऑपरेशन और खतरनाक केमिकल दवाओं के चक्कर में पड़ जाते हैं, जबकि सही समय पर केवल सिट्ज बाथ, त्रिफला, सही बैठने के तरीके और पानी के नियम से इन बीमारियों को जड़ से ठीक किया जा सकता है।
          </p>
          <p>
            इसी पीड़ा को दूर करने के लिए &ldquo;छोटेलाल जी हेल्थ&rdquo; प्लेटफॉर्म की स्थापना की गई — जहां कोई भी व्यक्ति बिना किसी झिझक के अपनी बीमारी साझा कर सकता है और मुफ़्त में पूरा मार्गदर्शन पा सकता है।
          </p>
        </div>

        {/* Bottom CTA */}
        <div className="text-center pt-4">
          <Link
            href="/diagnose"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold px-8 py-4 rounded-2xl text-base shadow-md transition-all"
          >
            <Sparkles className="w-5 h-5" />
            <span>छोटेलाल जी से मुफ़्त AI परामर्श लें →</span>
          </Link>
        </div>
      </div>
    </PageLayout>
  );
};
