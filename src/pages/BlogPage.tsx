import React, { useState } from 'react';
import { PageLayout } from '../components/PageLayout';
import { Link } from '../router';
import { BookOpen, Calendar, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { VoiceReadButton } from '../components/VoiceReadButton';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  content: string[];
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'desk-job-piles-prevention',
    title: '8 घंटे कुर्सी पर बैठने वालों को बवासीर और टेलबोन दर्द से कैसे बचें?',
    excerpt: 'ऑफिस में काम करने वाले 65% युवाओं में पाइल्स और एनल फिशर की समस्या क्यों तेजी से बढ़ रही है और इसे बिना सर्जरी कैसे रोकें।',
    category: 'बवासीर केयर',
    date: '15 Sep 2026',
    readTime: '4 मिनट',
    content: [
      'आजकल की आधुनिक जीवनशैली में लगातार 8 से 10 घंटे डेस्क पर बैठना सबसे सामान्य बात हो गई है। परंतु क्या आप जानते हैं कि जब आप लगातार बिना उठे बैठते हैं, तो गुदा क्षेत्र की नसों पर सामान्य से 3 गुना अधिक रक्त दबाव पड़ता है?',
      'आयुर्वेद में इसे अपान वायु का अवरोध कहा जाता है। सख्त कुर्सी पर बैठने से टेलबोन और गुदा शिराओं में रक्त का थक्का या सूजन बनने लगती है जो आगे चलकर बवासीर और फिशर का रूप ले लेती है।',
      'बचाव के 3 अचूक नियम:',
      '1. 45 मिनट का नियम: हर 45 मिनट में 2 मिनट के लिए खड़े हों और थोड़ा टहलें।',
      '2. एर्गोनोमिक कुशन: यू-कट (U-cut) मेमोरी फोम कुशन का उपयोग करें ताकि टेलबोन पर सीधा दबाव न पड़े।',
      '3. 3 लीटर जल नियम: मेज पर हमेशा तांबे की बोतल रखें और दिनभर में कम से कम 3 लीटर पानी अवश्य पिएं।',
    ],
  },
  {
    id: 'post-2',
    slug: 'ashwagandha-sleep-science',
    title: 'अश्वगंधा और जायफल का दूध: नींद की गोलियों से बेहतर और सुरक्षित क्यों?',
    excerpt: 'अनिद्रा और तनाव से जूझ रहे युवाओं के लिए आयुर्वेद का यह प्राचीन क्षीरपाक नुस्खा कैसे मेलाटोनिन हार्मोन को स्वाभाविक रूप से बढ़ाता है।',
    category: 'मानसिक शांति',
    date: '12 Sep 2026',
    readTime: '5 मिनट',
    content: [
      'बाजार में मिलने वाली नींद की अंग्रेजी दवाइयां मस्तिष्क के रिसेप्टर्स को जबरन सुन्न कर देती हैं, जिससे अगली सुबह सिर भारी रहता है और कुछ दिनों बाद उनकी लत लग जाती है।',
      'इसके विपरीत, आयुर्वेद का अश्वगंधा और जायफल का क्षीरपाक मस्तिष्क को पोषण देकर कोर्टिसोल (स्ट्रेस हार्मोन) को शांत करता है।',
      'बनाने की शास्त्रीय विधि:',
      'एक कप गाय के दूध में आधा चम्मच शुद्ध अश्वगंधा चूर्ण और चुटकी भर जायफल पाउडर मिलाएं। इसे 3 मिनट तक धीमी आंच पर उबालें और सोने से 45 मिनट पूर्व गुनगुना पिएं।',
      'इसके साथ ही दोनों पैरों के तलवों पर 5 मिनट देशी घी से मालिश करने से 10 मिनट में गहरी शांति मिलती है।',
    ],
  },
  {
    id: 'post-3',
    slug: 'amla-bhringraj-hair-regrowth',
    title: 'केमिकल सीरम छोड़ें: आंवला और भृंगराज से बाल दोबारा उगाने का वैज्ञानिक रहस्य',
    excerpt: 'बालों की जड़ों (हेयर फॉलिकल्स) को दोबारा सक्रिय करने के लिए आयुर्वेद की शिरोभ्यंग विधि और ताजे आंवले के सेवन के चमत्कारी परिणाम।',
    category: 'हेयर केयर',
    date: '10 Sep 2026',
    readTime: '4 मिनट',
    content: [
      'बाल गिरना कोई बाहरी त्वचा की समस्या नहीं है, यह शरीर में अतिरिक्त पित्त गर्मी और स्कैल्प की नसों में रक्त प्रवाह कम होने का परिणाम है।',
      'महाभृंगराज तेल में मौजूद घटक जब गुनगुने रूप में उंगलियों के पोरों से स्कैल्प में समाते हैं, तो सुप्त पड़े रोम-कूपों को जागृत करते हैं।',
      'प्रतिदिन सुबह 20ml आंवला स्वरस और 5 करी पत्ते चबाकर खाने से शरीर को प्राकृतिक बायोटिन, विटामिन सी और फेरिटिन मिलता है जो 45 दिनों में बालों के झड़ने को 85% तक कम कर देता है।',
    ],
  },
  {
    id: 'post-4',
    slug: 'triphala-benefits-guide',
    title: 'त्रिफला: अमृत के समान यह 3 फलों का मिश्रण शरीर को कैसे डिटॉक्स करता है?',
    excerpt: 'आमलकी, हरीतकी और विभीतकी का सही अनुपात और इसे अलग-अलग ऋतुओं में किस अनुपान के साथ लेना चाहिए।',
    category: 'घरेलू नुस्खे',
    date: '05 Sep 2026',
    readTime: '6 मिनट',
    content: [
      'चरक संहिता में महर्षि चरक ने लिखा है कि जो व्यक्ति एक वर्ष तक नियम से त्रिफला का सेवन करता है, वह सौ वर्षों तक निरोगी और युवा रहता है।',
      'त्रिफला केवल पेट साफ करने का चूर्ण नहीं है, यह एक शक्तिशाली रसायन है जो आंखों की रोशनी, त्वचा की कांति और आंतों की कोशिकाओं को पुनर्जीवित करता है।',
      'रात को गुनगुने पानी से लेने पर यह विरेचक (कब्ज नाशक) होता है, और सुबह शहद व घी के साथ लेने पर यह रसायन (ऊर्जा वर्धक) का कार्य करता है।',
    ],
  },
];

export const BlogPage: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <PageLayout
      pageTitle="स्वास्थ्य ब्लॉग एवं आयुर्वेदिक ज्ञान लेख"
      pageSubtitle="दैनिक जीवन में आयुर्वेद, रोग निवारण और निरोगी जीवनशैली पर सरल, वैज्ञानिक और प्रामाणिक मार्गदर्शिका।"
      badge="आयुर्वेदिक ज्ञानगंगा"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {selectedPost ? (
          /* SINGLE POST VIEW */
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm space-y-6">
            <button
              onClick={() => setSelectedPost(null)}
              className="text-xs font-bold text-orange-600 hover:underline flex items-center gap-1 cursor-pointer"
            >
              ← सभी लेखों की सूची पर वापस जाएं
            </button>

            <div className="space-y-2">
              <span className="text-xs font-bold text-orange-700 bg-orange-50 px-2.5 py-1 rounded-full">
                {selectedPost.category}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-amber-950 font-serif leading-tight">
                {selectedPost.title}
              </h2>
              <div className="flex items-center gap-4 text-xs text-stone-500 pt-2 border-b border-stone-100 pb-4">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {selectedPost.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {selectedPost.readTime}
                </span>
                <span>लेखक: छोटेलाल जी रिसर्च टीम</span>
              </div>

              {/* Audio reading button */}
              <div className="pt-2">
                <VoiceReadButton
                  textToSpeak={`${selectedPost.title}। ${selectedPost.content.join('। ')}`}
                  label="यह पूरा लेख छोटेलाल जी की आवाज़ में सुनें"
                  sublabel="विस्तृत आयुर्वेदिक वैज्ञानिक विश्लेषण व मार्गदर्शन"
                  variant="banner"
                />
              </div>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-stone-700 leading-relaxed pt-2">
              {selectedPost.content.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-stone-500">
                क्या आप भी इस समस्या के सटीक लक्षण जांचना चाहते हैं?
              </p>
              <Link
                href="/diagnose"
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow-xs transition-colors"
              >
                मुफ़्त AI लक्षण जांच करें →
              </Link>
            </div>
          </div>
        ) : (
          /* BLOG LIST VIEW */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {BLOG_POSTS.map((post) => (
              <div
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 hover:border-orange-300 shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between group space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <span className="font-bold text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-full">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-amber-950 font-serif group-hover:text-orange-600 transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-orange-600 group-hover:translate-x-1 transition-transform">
                  <span>पूरा लेख पढ़ें</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
};
