import React from 'react';
import { PageLayout } from '../components/PageLayout';
import { Link, useRouter } from '../router';
import {
  Activity,
  Feather,
  Brain,
  Flame,
  Droplets,
  Moon,
  Shield,
  Heart,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const CATEGORIES_DATA = [
  {
    id: 'piles',
    slug: 'piles',
    title: 'बवासीर व सिटिंग समस्या (Piles & Sitting Care)',
    shortDesc: 'लगातार कुर्सी पर बैठने से गुदा नसों पर दबाव, कब्ज, जलन, मस्से और बवासीर का आयुर्वेदिक समाधान।',
    icon: Activity,
    accent: 'bg-orange-50 text-orange-600 border-orange-200',
    dosha: 'अपान वायु अवरोध एवं पित्त-रक्त प्रकोप',
    herbs: ['त्रिफला गुग्गुलु', 'जात्यादि तैलम', 'अर्शकुठार रस', 'नागकेसर'],
    remedyCount: 8,
  },
  {
    id: 'hair',
    slug: 'hair',
    title: 'बाल झड़ना व हेयर ग्रोथ (Hair Growth & Fall)',
    shortDesc: 'तेजी से झड़ते बाल, गंजापन, रूसी (डैंड्रफ) और असमय सफेद बालों के लिए शिरोभ्यंग व पोषण।',
    icon: Feather,
    accent: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    dosha: 'शिरोगत पित्त प्रकोप एवं अस्थि धातु पोषण न्यूनता',
    herbs: ['महाभृंगराज तैल', 'आंवला स्वरस', 'ब्राह्मी', 'मेथी दाना'],
    remedyCount: 10,
  },
  {
    id: 'mental-health',
    slug: 'mental-health',
    title: 'तनाव, चिंता व मानसिक शांति (Mental Peace & Stress)',
    shortDesc: 'कार्य का दबाव, अनियंत्रित ओवरथिंकिंग, घबराहट, पैनिक अटैक और डिप्रेशन से प्राकृतिक मुक्ति।',
    icon: Brain,
    accent: 'bg-blue-50 text-blue-600 border-blue-200',
    dosha: 'प्राण वात एवं साधक पित्त क्षोभ',
    herbs: ['अश्वगंधा चूर्ण', 'शंखपुष्पी सीरप', 'जटामांसी अर्क', 'ब्राह्मी घृत'],
    remedyCount: 7,
  },
  {
    id: 'digestion',
    slug: 'digestion',
    title: 'पाचन, गैस व एसिडिटी (Digestion & Gut Health)',
    shortDesc: 'खट्टी डकारें, सीने में जलन, पेट फूलना, मंदाग्नि और पुरानी कब्ज को ठीक करने के शास्त्रीय नियम।',
    icon: Flame,
    accent: 'bg-amber-50 text-amber-600 border-amber-200',
    dosha: 'जठराग्नि मंदता एवं आम संचय',
    herbs: ['हिंग्वाष्टक चूर्ण', 'अविपत्तिकर चूर्ण', 'लवण भास्कर', 'सौंफ-जीरा जल'],
    remedyCount: 9,
  },
  {
    id: 'skin',
    slug: 'skin',
    title: 'त्वचा रोग व रक्त शुद्धि (Skin Care & Glow)',
    shortDesc: 'कील-मुहासे, सोरायसिस, दाद, खाज-खुजली और त्वचा एलर्जी के लिए शुद्ध रक्तशोधक चिकित्सा।',
    icon: Droplets,
    accent: 'bg-rose-50 text-rose-600 border-rose-200',
    dosha: 'रक्त धातु दृष्टि एवं पित्त-कफ विकृति',
    herbs: ['नीम पत्र अर्क', 'मंजिष्ठादि क्वाथ', 'खदिरारिष्ट', 'हरिद्रा खंड'],
    remedyCount: 6,
  },
  {
    id: 'sleep',
    slug: 'sleep',
    title: 'गहरी नींद व अनिद्रा उपचार (Sleep & Relaxation)',
    shortDesc: 'बिस्तर पर करवटें बदलना, देर रात तक नींद न आना और अधूरी नींद की समस्या का सुखद समाधान।',
    icon: Moon,
    accent: 'bg-indigo-50 text-indigo-600 border-indigo-200',
    dosha: 'तर्पण कफ क्षय एवं व्यान वात असंतुलन',
    herbs: ['सर्पगंधा घनवटी', 'जायफल दुग्ध', 'पाद-अभ्यंग तैल', 'तुलसी चाय'],
    remedyCount: 5,
  },
  {
    id: 'immunity',
    slug: 'immunity',
    title: 'रोग प्रतिरोधक क्षमता (Immunity Boost & Ojas)',
    shortDesc: 'बार-बार बीमार पड़ना, संक्रमण का खतरा और शारीरिक कमजोरी दूर कर ओजस बढ़ाने के उपाय।',
    icon: Shield,
    accent: 'bg-teal-50 text-teal-600 border-teal-200',
    dosha: 'ओजस क्षय एवं रस धातु अशोधन',
    herbs: ['गिलोय सत्व', 'च्यवनप्राश अवलेह', 'तुलसी अर्क', 'मुलेठी क्वाथ'],
    remedyCount: 8,
  },
  {
    id: 'general',
    slug: 'general',
    title: 'सामान्य स्वास्थ्य व बुखार (General Wellness & Fever)',
    shortDesc: 'मौसमी वायरल बुखार, सिरदर्द, बदन दर्द, थकान और दैनिक जीवन की सामान्य स्वास्थ्य समस्याएं।',
    icon: Heart,
    accent: 'bg-purple-50 text-purple-600 border-purple-200',
    dosha: 'वात-कफ ज्वर एवं आमाशय आम दोष',
    herbs: ['सुदर्शन घनवटी', 'महासुदर्शन काढ़ा', 'गिलोय वटी', 'सोंठ चूर्ण'],
    remedyCount: 11,
  },
];

export const CategoriesPage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <PageLayout
      pageTitle="आयुर्वेदिक स्वास्थ्य श्रेणियां (Health Categories)"
      pageSubtitle="आयुर्वेद में प्रत्येक रोग का संबंध त्रिदोष असंतुलन से होता है। अपनी बीमारी की श्रेणी चुनें और विशेषज्ञ आयुर्वेदिक जानकारी व घरेलू उपाय देखें।"
      badge="संपूर्ण स्वास्थ्य मार्गदर्शिका"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES_DATA.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                onClick={() => navigate(`/category/${cat.slug}`)}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 hover:border-orange-300 shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-2xl border ${cat.accent}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-stone-500 bg-stone-100 px-2.5 py-1 rounded-full">
                      {cat.remedyCount} नुस्खे उपलब्ध
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-amber-950 font-serif group-hover:text-orange-600 transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-stone-500 font-medium mt-0.5">
                      दोष: {cat.dosha}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {cat.shortDesc}
                  </p>

                  <div className="pt-2">
                    <p className="text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                      प्रमुख जड़ी-बूटियां:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.herbs.map((h, i) => (
                        <span
                          key={i}
                          className="text-[11px] bg-amber-50 text-amber-900 border border-amber-200/60 px-2 py-0.5 rounded-lg"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-stone-100 mt-6 flex items-center justify-between text-xs font-bold text-orange-600 group-hover:translate-x-1 transition-transform">
                  <span>विस्तृत उपचार व गाइड पढ़ें</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 bg-gradient-to-r from-orange-500 to-amber-600 rounded-3xl p-8 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold font-serif">क्या अपनी बीमारी समझ नहीं आ रही?</h3>
            <p className="text-sm text-orange-100 max-w-xl">
              छोटेलाल जी के मुफ़्त AI डायग्नोसिस टूल में अपने लक्षण लिखें, सिस्टम तुरंत आपका दोष और उपचार बताएगा।
            </p>
          </div>
          <Link
            href="/diagnose"
            className="shrink-0 bg-white text-orange-600 font-bold px-6 py-3.5 rounded-xl text-sm shadow hover:bg-amber-50 transition-colors"
          >
            मुफ़्त AI जांच शुरू करें →
          </Link>
        </div>
      </div>
    </PageLayout>
  );
};
