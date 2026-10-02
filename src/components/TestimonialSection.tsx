import React from 'react';
import { Star, ShieldCheck, Quote } from 'lucide-react';

export const TestimonialSection: React.FC = () => {
  const testimonials = [
    {
      name: 'सतीश कुमार (सॉफ्टवेयर इंजीनियर, बेंगलुरु)',
      category: 'बवासीर एवं सिटिंग दर्द (Piles & Sitting)',
      rating: 5,
      story:
        'दिन में 10 घंटे लैपटॉप पर बैठने से मुझे ग्रेड 2 बवासीर और भयानक टेलबोन दर्द हो गया था। डॉक्टर सर्जरी बोल रहे थे। छोटेलाल जी की वेबसाइट से मैंने सिट्ज बाथ, त्रिफला गुग्गुलु और एर्गोनोमिक मेमोरी फोम कुशन मंगाया। 3 हफ्तों में मेरा दर्द 95% खत्म हो गया। छोटेलाल जी को कोटि-कोटि धन्यवाद!',
      verified: true,
      time: '2 हफ्ते पहले',
    },
    {
      name: 'प्रिया अग्रवाल (शिक्षिका, जयपुर)',
      category: 'तनाव व अनिद्रा (Mental Health & Insomnia)',
      rating: 5,
      story:
        'रात को 3 बजे तक नींद नहीं आती थी और सिर भारी रहता था। छोटेलाल जी के कहे अनुसार अश्वगंधा-दूध टॉनिक लिया और सोने से 1 घंटा पहले स्क्रीन बंद की। अब 11 बजते ही गहरी और शांत नींद आती है। जीवन में नई ऊर्जा आ गई है।',
      verified: true,
      time: '1 महीना पहले',
    },
    {
      name: 'अमित मिश्रा (बिजनेसमैन, लखनऊ)',
      category: 'हेयर फॉल व डैंड्रफ (Hair Regrowth)',
      rating: 5,
      story:
        'बाल इतने झड़ रहे थे कि सिर की चमड़ी दिखने लगी थी। 45 दिन पहले छोटेलाल जी का महाभृंगराज 21-जड़ी-बूटी तेल और आंवला स्वरस शुरू किया। बालों का गिरना पूरी तरह रुक गया और आगे नए बाल उगने शुरू हो गए हैं!',
      verified: true,
      time: '3 हफ्ते पहले',
    },
  ];

  return (
    <section className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-orange-600 uppercase tracking-widest bg-orange-100 px-3 py-1 rounded-full">
            सच्चे अनुभव
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3 tracking-tight">
            15,000+ लोगों ने छोटेलाल जी पर भरोसा जताया
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            बिना साइड-इफेक्ट, बिना अनावश्यक सर्जरी — प्राकृतिक आयुर्वेद और सही जीवनशैली से ठीक हुए हमारे मरीजों की सच्ची कहानियां।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-amber-50/40 rounded-3xl p-6 border border-amber-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow relative"
            >
              <Quote className="w-8 h-8 text-amber-200 absolute top-6 right-6 pointer-events-none" />
              <div>
                <div className="flex items-center gap-1 mb-2 text-amber-500">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <span className="text-[11px] font-bold text-orange-700 bg-orange-100/80 px-2.5 py-0.5 rounded-md inline-block mb-3">
                  {t.category}
                </span>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-4">
                  "{t.story}"
                </p>
              </div>

              <div className="pt-4 border-t border-amber-200/60 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{t.name}</h4>
                  <span className="text-[10px] text-slate-400">{t.time}</span>
                </div>
                {t.verified && (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" /> सत्यापित मरीज
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
