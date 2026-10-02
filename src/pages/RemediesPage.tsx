import React, { useState } from 'react';
import { PageLayout } from '../components/PageLayout';
import { Link } from '../router';
import { Sparkles, Search, Droplets, Clock, AlertCircle, ArrowRight } from 'lucide-react';
import { VoiceReadButton } from '../components/VoiceReadButton';

interface RemedyItem {
  id: string;
  name: string;
  hindiName: string;
  category: string;
  condition: string;
  ingredients: string;
  preparation: string;
  dosage: string;
  benefits: string;
  precautions: string;
}

const REMEDIES_DATABASE: RemedyItem[] = [
  {
    id: 'rem-1',
    name: 'Triphala Guggulu Night Cleanser',
    hindiName: 'त्रिफला गुग्गुलु एवं गुनगुना पानी',
    category: 'piles',
    condition: 'कब्ज, अर्श व एनल फिशर',
    ingredients: 'त्रिफला चूर्ण (आंवला, हरड़, बहेड़ा), शुद्ध गुग्गुलु, पिप्पली',
    preparation: 'गुनगुने पानी में 1 चम्मच चूर्ण घोलें या 2 वटी लें।',
    dosage: 'रात को सोने से 30 मिनट पहले',
    benefits: 'आंतों की स्वाभाविक गति बहाल करता है, शौच के समय खिंचाव खत्म करता है और मस्सों की सूजन घटाता है।',
    precautions: 'लूज मोशन (अतिसार) होने पर मात्रा आधी करें।',
  },
  {
    id: 'rem-2',
    name: 'Herbal Sitz Bath Formulation',
    hindiName: 'औषधीय सिट्ज बाथ (टब बाथ सेक)',
    category: 'piles',
    condition: 'गुदा में असहनीय दर्द, जलन व मस्से',
    ingredients: 'गुनगुना पानी, 1 चुटकी फिटकरी (Alum) या नीम की छाल का काढ़ा, 1/2 चम्मच सेंधा नमक',
    preparation: 'टब में पानी भरकर औषधियां मिलाएं और 15-20 मिनट बैठें।',
    dosage: 'शौच के उपरांत एवं रात को सोने से पहले',
    benefits: 'दर्द, खुजली और सूजन में 10 मिनट के अंदर 80% तक त्वरित आराम देता है।',
    precautions: 'पानी अधिक गर्म न हो, केवल सुखद गुनगुना हो।',
  },
  {
    id: 'rem-3',
    name: 'Ashwagandha Moon Milk Restorative',
    hindiName: 'अश्वगंधा एवं जायफल क्षीरपाक',
    category: 'mental-health',
    condition: 'तनाव, ओवरथिंकिंग व अनिद्रा',
    ingredients: '1/2 चम्मच शुद्ध अश्वगंधा चूर्ण, 1 चुटकी जायफल, 1 कप गाय का दूध',
    preparation: 'दूध को धीमी आंच पर उबालें, अश्वगंधा और जायफल मिलाकर गुनगुना पिएं।',
    dosage: 'रात को सोने से 45 मिनट पहले',
    benefits: 'कोर्टिसोल हार्मोन घटाता है, मस्तिष्क की नसों को शांत करता है और गहरी प्राकृतिक नींद लाता है।',
    precautions: 'शरीर में अत्यधिक पित्त या अल्सर होने पर चिकित्सक की सलाह लें।',
  },
  {
    id: 'rem-4',
    name: 'Brahmi & Shankhpushpi Memory Tonic',
    hindiName: 'ब्राह्मी एवं शंखपुष्पी मेध्य रस',
    category: 'mental-health',
    condition: 'मानसिक थकान, घबराहट व एकाग्रता की कमी',
    ingredients: 'ब्राह्मी पत्र अर्क, शंखपुष्पी, जटामांसी, मुलेठी',
    preparation: '2 चम्मच रस को 1/2 कप ताजे पानी में मिलाएं।',
    dosage: 'सुबह नाश्ते के बाद',
    benefits: 'न्यूरॉन्स की सक्रियता बढ़ाता है, घबराहट शांत करता है और मन को एकाग्र करता है।',
    precautions: 'खाली पेट लेने से कुछ लोगों को हल्की मिचली हो सकती है, इसलिए नाश्ते के बाद लें।',
  },
  {
    id: 'rem-5',
    name: 'Fresh Amla & Curry Leaves Scalp Elixir',
    hindiName: 'ताजा आंवला एवं मीठी नीम का रस',
    category: 'hair',
    condition: 'बालों का तेजी से गिरना व असमय सफेदी',
    ingredients: '1 ताजा आंवला या 20ml आंवला स्वरस, 5-7 ताजे करी पत्ते',
    preparation: 'आंवला और करी पत्ते को पीसकर 1 गिलास गुनगुने पानी के साथ पिएं।',
    dosage: 'रोजाना सुबह खाली पेट',
    benefits: 'स्कैल्प को विटामिन सी और आयरन देता है, जिससे बालों की जड़ें मजबूत होती हैं।',
    precautions: 'दांतों में खट्टापन महसूस होने पर सादे पानी से कुल्ला करें।',
  },
  {
    id: 'rem-6',
    name: 'Methi & Sour Curd Anti-Dandruff Pack',
    hindiName: 'मेथी दाना एवं खट्टा दही हेयर लेप',
    category: 'hair',
    condition: 'जिद्दी रूसी (Dandruff), स्कैल्प खुजली',
    ingredients: '2 चम्मच रातभर भीगी मेथी का पेस्ट, 2 चम्मच खट्टा दही, 1 चम्मच शहद',
    preparation: 'पेस्ट बनाकर स्कैल्प पर लगाएं और 30 मिनट बाद धो लें।',
    dosage: 'सप्ताह में एक बार',
    benefits: 'फंगल संक्रमण को जड़ से मिटाता है और बालों को प्राकृतिक चमक व नमी देता है।',
    precautions: 'बाल धोने के लिए केवल सादे या हल्के गुनगुने पानी का प्रयोग करें।',
  },
  {
    id: 'rem-7',
    name: 'Hingwastak Digestif Churna',
    hindiName: 'हिंग्वाष्टक चूर्ण (गैस व बदहजमी नाशक)',
    category: 'digestion',
    condition: 'पेट फूलना, सीने में जलन, खट्टी डकारें',
    ingredients: 'शुद्ध हींग, अजवाइन, सोंठ, काली मिर्च, पिप्पली, सेंधा नमक, जीरा',
    preparation: '1/2 चम्मच चूर्ण को भोजन के पहले निवाले के साथ घी में मिलाकर खाएं।',
    dosage: 'दोपहर व रात के भोजन के समय',
    benefits: 'पेट की फंसी हुई गैस तुरंत बाहर निकालता है और भारी भोजन को सहज पचाता है।',
    precautions: 'उच्च रक्तचाप (High BP) वाले मरीज नमक की मात्रा का ध्यान रखें।',
  },
  {
    id: 'rem-8',
    name: 'CCF Digestive Detox Tea',
    hindiName: 'जीरा, धनिया व सौंफ पाचक काढ़ा',
    category: 'digestion',
    condition: 'मंदाग्नि, एसिडिटी व टॉक्सिन्स (आम)',
    ingredients: 'बराबर मात्रा में साबुत जीरा, साबुत धनिया और सौंफ',
    preparation: '1 चम्मच मिश्रण को 1 लीटर पानी में 5 मिनट उबालें और छान लें।',
    dosage: 'दिनभर में घूंट-घूंट करके पिएं (थर्मस में रखकर)',
    benefits: 'अग्नि को बिना भड़काए पाचन सुधारता है और शरीर से टॉक्सिन्स बाहर निकालता है।',
    precautions: 'हमेशा ताजा बनाएं, रात का बचा हुआ न पिएं।',
  },
  {
    id: 'rem-9',
    name: 'Giloy & Tulsi Ayush Immunity Decoction',
    hindiName: 'गिलोय, तुलसी एवं सोंठ क्वाथ',
    category: 'immunity',
    condition: 'मौसमी बुखार, सर्दी-खांसी, प्लेटलेट्स की कमी',
    ingredients: 'गिलोय तना/वटी, 5 तुलसी पत्ते, 1/2 चम्मच सोंठ, 2 काली मिर्च',
    preparation: '2 गिलास पानी में उबालें जब तक आधा गिलास न बचे।',
    dosage: 'दिन में 2 बार गुनगुना पिएं',
    benefits: 'बुखार का तापमान तोड़ता है, बदन दर्द मिटाता है और रोग प्रतिरोधक क्षमता बढ़ाता है।',
    precautions: 'गर्भवती महिलाएं बिना वैद्यकीय परामर्श के न लें।',
  },
];

export const RemediesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredRemedies = REMEDIES_DATABASE.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.hindiName.includes(searchTerm) ||
      item.condition.includes(searchTerm) ||
      item.ingredients.includes(searchTerm);
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <PageLayout
      pageTitle="आयुर्वेदिक घरेलू नुस्खे लाइब्रेरी (Remedies Library)"
      pageSubtitle="30 वर्षों के शास्त्रीय परीक्षणों पर खरे उतरे सुरक्षित, सुलभ और प्राकृतिक घरेलू नुस्खे। रसोई की सामग्री से पाएं स्थायी स्वास्थ्य लाभ।"
      badge="100% प्राकृतिक उपचार"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-3xl p-6 shadow-xs border border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="नुस्खा या बीमारी खोजें (जैसे: त्रिफला, बवासीर, तनाव)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-orange-400 text-sm bg-stone-50/60"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {[
              { id: 'all', label: 'सभी नुस्खे' },
              { id: 'piles', label: 'बवासीर' },
              { id: 'hair', label: 'बाल' },
              { id: 'mental-health', label: 'तनाव' },
              { id: 'digestion', label: 'पाचन' },
              { id: 'immunity', label: 'इम्युनिटी' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === tab.id
                    ? 'bg-orange-500 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Top Audio Banner */}
        <VoiceReadButton
          textToSpeak="नमस्ते बेटा! यह छोटेलाल जी की प्रमाणित घरेलू आयुर्वेदिक नुस्खे लाइब्रेरी है। यहाँ दी गई सभी औषधियां पूर्णतः प्राकृतिक, निरापद और रसोईघर के सरल घटकों से बनाई जा सकती हैं। किसी भी नुस्खे के साथ लगे माइक बटन पर क्लिक करके आप उसकी पूरी विधि और सावधानी सुन सकते हैं।"
          label="घरेलू नुस्खे लाइब्रेरी के बारे में छोटेलाल जी से सुनें"
          sublabel="30 वर्षों के शास्त्रीय अनुभव पर आधारित सुरक्षित व प्रभावी नुस्खों की सूची"
          variant="banner"
        />

        {/* Remedies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRemedies.map((remedy) => (
            <div
              key={remedy.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-orange-700 bg-orange-50 border border-orange-200/80 px-2.5 py-0.5 rounded-full">
                    {remedy.condition}
                  </span>
                  <VoiceReadButton
                    textToSpeak={`${remedy.hindiName}। घटक द्रव्य: ${remedy.ingredients}। बनाने की विधि: ${remedy.preparation}। खुराक: ${remedy.dosage}। लाभ: ${remedy.benefits}। सावधानी: ${remedy.precautions}।`}
                    label="नुस्खा सुनें"
                    variant="compact"
                    title="यह नुस्खा सुनें"
                  />
                </div>

                <div>
                  <h4 className="text-xl font-bold text-amber-950 font-serif">{remedy.hindiName}</h4>
                  <p className="text-xs text-stone-400">{remedy.name}</p>
                </div>

                <div className="space-y-2 text-xs text-stone-600 pt-2 border-t border-stone-100">
                  <p>
                    <strong className="text-stone-800">घटक द्रव्य:</strong> {remedy.ingredients}
                  </p>
                  <p>
                    <strong className="text-stone-800">बनाने की विधि:</strong> {remedy.preparation}
                  </p>
                  <p className="flex items-center gap-1.5 text-orange-700 font-semibold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>खुराक व समय: {remedy.dosage}</span>
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 text-xs text-emerald-900 leading-relaxed">
                  <strong>मुख्य लाभ:</strong> {remedy.benefits}
                </div>
              </div>

              <div className="pt-2 text-[11px] text-amber-800 bg-amber-50/50 p-2.5 rounded-lg flex items-start gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-600" />
                <span>{remedy.precautions}</span>
              </div>
            </div>
          ))}
        </div>

        {filteredRemedies.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 max-w-md mx-auto space-y-3">
            <p className="text-stone-500 text-sm">इस खोज के लिए कोई नुस्खा नहीं मिला।</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="text-xs font-bold text-orange-600 underline"
            >
              सभी नुस्खे दोबारा देखें
            </button>
          </div>
        )}

        {/* CTA */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-3xl p-8 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="space-y-1">
            <h3 className="text-xl font-bold font-serif">अपनी समस्या के लिए व्यक्तिगत नुस्खा चाहिए?</h3>
            <p className="text-xs sm:text-sm text-orange-100">
              छोटेलाल जी के मुफ़्त AI डायग्नोसिस में अपने लक्षण लिखें और सटीक खुराक पाएं।
            </p>
          </div>
          <Link
            href="/diagnose"
            className="shrink-0 bg-white text-orange-600 font-bold px-6 py-3 rounded-xl text-sm shadow hover:bg-amber-50 transition-colors"
          >
            मुफ़्त AI जांच करें →
          </Link>
        </div>
      </div>
    </PageLayout>
  );
};
