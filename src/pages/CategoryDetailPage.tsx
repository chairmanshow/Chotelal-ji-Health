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
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { VoiceReadButton } from '../components/VoiceReadButton';

interface CategoryConfig {
  title: string;
  hindiTitle: string;
  dosha: string;
  intro: string;
  causes: string[];
  symptoms: string[];
  herbalRemedies: Array<{ name: string; dosage: string; benefit: string }>;
  dietDos: string[];
  dietDonts: string[];
  yoga: Array<{ name: string; benefit: string }>;
  whenToSeeDoctor: string[];
}

const CATEGORY_MAP: Record<string, CategoryConfig> = {
  piles: {
    title: 'Piles, Fissure & Sitting Care',
    hindiTitle: 'अर्श (बवासीर), एनल फिशर एवं सिटिंग प्रेशर विकार',
    dosha: 'अपान वायु अवरोध एवं पित्त-रक्त प्रकोप (Vata & Pitta-Rakta Aggravation)',
    intro:
      'आजकल ऑफिस में 8 से 10 घंटे लगातार एक ही जगह बैठने, कम पानी पीने और सख्त मल (कब्ज) के कारण गुदा क्षेत्र की रक्त शिराओं (नसें) में सूजन आ जाती है। आयुर्वेद में इसे अर्श कहा जाता है। सही समय पर खानपान सुधारने से यह बिना ऑपरेशन पूरी तरह ठीक हो सकता है।',
    causes: [
      'लगातार 6 से 8 घंटे से अधिक सख्त कुर्सी पर बैठना',
      'कम फाइबर वाला भोजन, मैदा, फास्ट फूड और कम पानी पीना',
      'शौच (मल त्याग) के समय अत्यधिक ज़ोर लगाना',
      'दीर्घकालिक पुरानी कब्ज या बार-बार पेट खराब होना',
    ],
    symptoms: [
      'शौच के समय गुदा में तेज चुभन, दर्द और जलन होना',
      'शौच के बाद या साथ में चमकदार लाल खून की बूंदें आना',
      'गुदा द्वार पर छोटे या बड़े मस्सों का उभरना',
      'कुर्सी पर बैठते समय टेलबोन या गुदा में भारी दबाव व असहजता',
    ],
    herbalRemedies: [
      {
        name: 'त्रिफला गुग्गुलु एवं गुनगुना पानी',
        dosage: 'रात को सोने से पहले 1 चम्मच त्रिफला चूर्ण या 2 वटी',
        benefit: 'मल को नर्म बनाकर प्राकृतिक गति बहाल करता है, जोर लगाने की ज़रूरत नहीं पड़ती।',
      },
      {
        name: 'औषधीय सिट्ज बाथ (Sitz Bath)',
        dosage: 'दिन में 2 बार (गुनगुने पानी में चुटकी भर फिटकरी या सेंधा नमक डालकर 15 मिनट बैठें)',
        benefit: 'दर्द, जलन और मस्सों की सूजन में 10 मिनट में 80% तक त्वरित आराम मिलता है।',
      },
      {
        name: 'जात्यादि तैलम स्थानीय लेप',
        dosage: 'शौच के बाद गुदा द्वार पर 2-3 बूंद हल्के हाथ से लगाएं',
        benefit: 'फिशर के कट और बवासीर के घाव को तेजी से भरता है और जलन शांत करता है।',
      },
    ],
    dietDos: [
      'पका पपीता, अमरूद, भीगी मुनक्का और अंजीर का सेवन करें',
      'दिनभर में कम से कम 3 से 3.5 लीटर गुनगुना या सादा पानी पिएं',
      'भोजन में छाछ (मट्ठा) में भुना जीरा और सेंधा नमक मिलाकर दोपहर में लें',
    ],
    dietDonts: [
      'लाल मिर्च, गरम मसाले, समोसा, कचौड़ी व तला-भुना बिल्कुल बंद रखें',
      'देर रात भारी भोजन न करें',
      'चाय और कॉफी का अत्यधिक सेवन न करें',
    ],
    yoga: [
      { name: 'अश्विनी मुद्रा (Ashwini Mudra)', benefit: 'गुदा मांसपेशियों का संकुचन मस्सों की सूजन घटाता है।' },
      { name: 'मूलाधार बंध व पवनमुक्तासन', benefit: 'अपान वायु को सुचारू कर पुरानी गैस और कब्ज मिटाता है।' },
    ],
    whenToSeeDoctor: [
      'शौच के समय लगातार पिचकारी जैसा तेज खून आना',
      'मस्सा बाहर आकर नीला पड़ जाना और अंदर न जाना',
      'तेज असहनीय दर्द जिसके साथ 101°F बुखार या मवाद आना (भगंदर का लक्षण)',
    ],
  },
  hair: {
    title: 'Hair Fall & Hair Growth Care',
    hindiTitle: 'खालित्य (बालों का झड़ना), असमय सफेदी व डैंड्रफ',
    dosha: 'शिरोगत पित्त प्रकोप एवं अस्थि धातु पोषण न्यूनता',
    intro:
      'बाल हमारे आंतरिक स्वास्थ्य और पाचन का आईना हैं। जब शरीर में पित्त दोष बढ़ जाता है और स्कैल्प की जड़ों तक आवश्यक पोषण व रक्त नहीं पहुंचता, तो हेयर फॉलिकल्स सुप्त हो जाते हैं। आयुर्वेद में आंवला और भृंगराज को बालों का अमृत माना गया है।',
    causes: [
      'अत्यधिक मानसिक तनाव, चिंता और देर रात तक जागना',
      'कठोर केमिकल युक्त शैम्पू और हीटिंग टूल्स का उपयोग',
      'शरीर में आयरन (हीमोग्लोबिन), फेरिटिन और विटामिन B12/D3 की कमी',
      'पेट में अत्यधिक गर्मी, एसिडिटी और कब्ज होना',
    ],
    symptoms: [
      'कंघी करते समय या नहाते समय 100 से ज्यादा बालों का टूटना',
      'माथे की हेयरलाइन का पीछे खिसकना और मांग चौड़ी होना',
      'स्कैल्प में अत्यधिक खुजली, सूखी या तैलीय रूसी (Dandruff)',
      'बालों का बेजान, पतला और दोमुंहा होना',
    ],
    herbalRemedies: [
      {
        name: 'महाभृंगराज तैल से शिरोभ्यंग',
        dosage: 'सप्ताह में 2-3 बार हल्का गुनगुना करके 10 मिनट मालिश',
        benefit: 'जड़ों में रक्त संचार बढ़ाकर सुप्त रोम-कूपों को पुनः सक्रिय करता है।',
      },
      {
        name: 'ताजा आंवला स्वरस एवं 5 करी पत्ते',
        dosage: 'सुबह खाली पेट 20ml आंवला रस गुनगुने पानी के साथ',
        benefit: 'विटामिन सी का प्राकृतिक भंडार, असमय सफेदी और कमजोरी रोकता है।',
      },
      {
        name: 'मेथी दाना व दही का प्राकृतिक लेप',
        dosage: 'हफ्ते में 1 बार 30 मिनट बालों पर लगाकर धोएं',
        benefit: 'डैंड्रफ को जड़ से समाप्त कर प्राकृतिक कंडीशनिंग देता है।',
      },
    ],
    dietDos: [
      'दालें, भीगे बादाम, काले तिल और कद्दू के बीज खाएं',
      'हरी सब्जियां (पालक, मेथी) और चुकंदर का सलाद लें',
      'नारियल पानी और आंवला मुरब्बा दैनिक दिनचर्या में जोड़ें',
    ],
    dietDonts: [
      'अत्यधिक खट्टा, तीखा और बासी भोजन बंद करें',
      'गर्म पानी से कभी भी सिर न धोएं (गुनगुना या ठंडा पानी इस्तेमाल करें)',
      'गीले बालों में जोर से कंघी न करें',
    ],
    yoga: [
      { name: 'सर्वांगासन या अधोमुख श्वानासन', benefit: 'गुरुत्वाकर्षण से सिर की त्वचा तक ताजा ऑक्सीजन युक्त रक्त पहुंचता है।' },
      { name: 'बालायाम (नाखून रगड़ना)', benefit: 'नाखूनों के एक्यूप्रेशर पॉइंट्स बालों की जड़ों को उद्दीप्त करते हैं।' },
    ],
    whenToSeeDoctor: [
      'गोल-गोल सिक्कों के आकार में अचानक बाल गायब होना (Alopecia Areata)',
      'स्कैल्प में लाल पपड़ी, पस या लगातार फफोले पड़ना',
      'तेजी से वजन घटना या अत्यधिक ठंड लगना (थायरॉयड समस्या)',
    ],
  },
  'mental-health': {
    title: 'Mental Peace, Stress & Anxiety Care',
    hindiTitle: 'चित्त उद्वेग (तनाव, घबराहट), ओवरथिंकिंग व अनिद्रा',
    dosha: 'प्राण वात एवं साधक पित्त क्षोभ (Prana Vata Imbalance)',
    intro:
      'निरंतर स्क्रीन टाइम, काम की प्रतिस्पर्धा और ओवरथिंकिंग से मस्तिष्क की नसें थक जाती हैं। आयुर्वेद में मेध्य रसायनों (अश्वगंधा, शंखपुष्पी) और प्राणायाम के माध्यम से मन को बिना किसी आदत या साइड इफेक्ट के शांत करने की अद्भुत विद्या है।',
    causes: [
      'सोने से ठीक पहले तक मोबाइल या लैपटॉप स्क्रीन चलाना',
      'कार्यस्थल का दबाव और भविष्य की अत्यधिक चिंता',
      'शारीरिक श्रम की कमी और दिनभर बंद कमरों में बैठना',
      'कैफीन (चाय-कॉफी, एनर्जी ड्रिंक्स) का अत्यधिक सेवन',
    ],
    symptoms: [
      'दिमाग में विचारों का निरंतर चलना और मन शांत न होना',
      'छाती में हल्की घबराहट, दिल की धड़कन तेज महसूस होना',
      'बिस्तर पर लेटने के बाद 1-2 घंटे तक नींद न आना',
      'छोटी-छोटी बातों पर चिड़चिड़ापन और सुबह उठने पर भी थकान रहना',
    ],
    herbalRemedies: [
      {
        name: 'अश्वगंधा चूर्ण व गुनगुना दूध',
        dosage: 'सोने से 45 मिनट पहले 1/2 चम्मच अश्वगंधा + चुटकी भर जायफल',
        benefit: 'स्ट्रेस हार्मोन (कोर्टिसोल) घटाकर गहरी प्राकृतिक नींद लाता है।',
      },
      {
        name: 'शंखपुष्पी एवं ब्राह्मी मेध्य अर्क',
        dosage: 'सुबह नाश्ते के बाद 2 चम्मच सादे पानी के साथ',
        benefit: 'न्यूरॉन्स को शांत करता है, स्मृति और एकाग्रता बढ़ाता है।',
      },
      {
        name: 'पाद-अभ्यंग (पैरों के तलवों की मालिश)',
        dosage: 'सोने से पूर्व 5 मिनट तिल के तेल या घी से मालिश',
        benefit: 'तलवों की नसें सीधे मस्तिष्क से जुड़ी हैं; यह तनाव का सबसे अचूक प्राचीन उपाय है।',
      },
    ],
    dietDos: [
      'शुद्ध गाय का देशी घी भोजन में 1 चम्मच जरूर लें',
      'मखाना, बादाम और अखरोट का सेवन करें',
      'शाम 7 बजे से पहले हल्का और सुपाच्य भोजन लें',
    ],
    dietDonts: [
      'शाम 5 बजे के बाद कॉफी, चाय या सोडा न लें',
      'सोते समय रील्स या उत्तेजक वीडियो न देखें (डिजिटल सनसेट)',
      'अल्कोहल या धूम्रपान से बचें',
    ],
    yoga: [
      { name: 'भ्रामरी प्राणायाम (7-11 बार)', benefit: 'मस्तिष्क में अल्फा तरंगे पैदा कर तुरंत शांति देता है।' },
      { name: 'अनुलोम-विलोम व शवासन', benefit: 'स्नायु तंत्र को रीसेट कर तनाव का स्तर शून्य करता है।' },
    ],
    whenToSeeDoctor: [
      'आत्महत्या या स्वयं को नुकसान पहुंचाने के तीव्र विचार आना',
      'लगातार 4-5 दिनों तक बिना सोए रहना',
      'छाती में तेज असहनीय दर्द जो पैनिक अटैक जैसा लगे',
    ],
  },
  digestion: {
    title: 'Digestion, Gas & Acidity Care',
    hindiTitle: 'अग्निमांद्य, अम्लपित्त (एसिडिटी), गैस व पुरानी कब्ज',
    dosha: 'जठराग्नि मंदता एवं आम संचय (Low Digestive Fire & Toxins)',
    intro:
      'आयुर्वेद का मुख्य सिद्धांत है - "सर्वे रोगाः मन्दाग्नौ" अर्थात सभी रोगों की जड़ कमजोर पाचन अग्नि है। जब खाना ठीक से पचता नहीं है, तो शरीर में "आम" (विषाक्त तत्व) बनता है जिससे गैस, खट्टी डकारें, सीने में जलन और कब्ज होती है।',
    causes: [
      'बिना भूख के भोजन करना या भूख लगने पर भी न खाना',
      'भोजन करते समय पानी पीना या भोजन के तुरंत बाद ठंडा पानी पीना',
      'देर रात भोजन करके तुरंत सो जाना',
      'मैदा, बेकरी प्रोडक्ट्स और अत्यधिक तीखे तले भोजन का सेवन',
    ],
    symptoms: [
      'भोजन के 1-2 घंटे बाद पेट फूलना, भारीपन और गैस बनना',
      'सीने और गले में खट्टा पानी या जलन (GERD/Acidity)',
      'सुबह पेट पूरी तरह साफ न होना और दिनभर आलस्य रहना',
      'जीभ पर सफेद मैल (Clogged Tongue / Ama sign) जमना',
    ],
    herbalRemedies: [
      {
        name: 'हिंग्वाष्टक चूर्ण व गुनगुना पानी',
        dosage: 'भोजन के पहले निवाले के साथ या भोजनोपरांत 1/2 चम्मच',
        benefit: 'पेट फूलना, गैस और सीने की जलन 10 मिनट में खत्म करता है।',
      },
      {
        name: 'अविपत्तिकर चूर्ण',
        dosage: 'सुबह-शाम भोजन से पहले 1 चम्मच पानी के साथ',
        benefit: 'अतिरिक्त पित्त और एसिडिटी को शांत कर आंतों को ठंडक देता है।',
      },
      {
        name: 'जीरा, सौंफ व धनिया पाचक जल (CCF Tea)',
        dosage: 'दिनभर में 2-3 बार घूंट-घूंट करके पिएं',
        benefit: 'जठराग्नि को प्रदीप्त कर भोजन का सहज पाचन कराता है।',
      },
    ],
    dietDos: [
      'मूंग दाल, पतली खिचड़ी, दलिया और लौकी/तोरई का सूप लें',
      'भोजन हमेशा चबा-चबाकर और शांत मन से करें',
      'भोजन के 45 मिनट बाद ही गुनगुना पानी पिएं',
    ],
    dietDonts: [
      'फ्रिज का ठंडा पानी, कोल्ड ड्रिंक्स और आइसक्रीम बंद करें',
      'दही और उड़द दाल का रात में सेवन न करें',
      'दूध के साथ खट्टे फल या नमकीन चीजें कभी न खाएं',
    ],
    yoga: [
      { name: 'वज्रासन (भोजन के तुरंत बाद 10 मिनट)', benefit: 'पाचन अंगों में रक्त प्रवाह 3 गुना बढ़ाता है।' },
      { name: 'कपालभाति व पवनमुक्तासन', benefit: 'आंतों की गतिशीलता सुधार कर कब्ज तोड़ता है।' },
    ],
    whenToSeeDoctor: [
      'मल में काला खून आना या लगातार उल्टियां होना',
      'अचानक पेट के दाहिने हिस्से में तेज असहनीय दर्द होना',
      'बिना किसी कारण के तेजी से वजन घटना',
    ],
  },
  skin: {
    title: 'Skin Care & Blood Purification',
    hindiTitle: 'कुष्ठ (त्वचा विकार), कील-मुहासे, सोरायसिस व एलर्जी',
    dosha: 'रक्त धातु दृष्टि एवं पित्त प्रकोप (Impaired Blood Tissue)',
    intro:
      'बाहरी क्रीम लगाने से त्वचा के रोग कभी स्थायी रूप से ठीक नहीं होते। आयुर्वेद त्वचा को रक्त का दर्पण मानता है। जब रक्त में दूषित पित्त और टॉक्सिन्स जमा होते हैं, तो त्वचा पर मुंहासे, दाद, खुजली और एलर्जी के रूप में निकलते हैं।',
    causes: [
      'दूषित खानपान (सड़ा-गला, बासी, जंक फूड)',
      'विरुद्ध आहार (जैसे दूध और मछली, दूध और कटहल एक साथ खाना)',
      'शरीर में अत्यधिक गर्मी और पसीने का रुकना',
      'केमिकल साबुन और स्टेरॉयड क्रीम का अत्यधिक उपयोग',
    ],
    symptoms: [
      'चेहरे और पीठ पर बार-बार पस वाले कील-मुहासे निकलना',
      'त्वचा पर लाल चकत्ते, तेज खुजली और जलन होना',
      'त्वचा का अत्यधिक सूखा पड़ना या पपड़ीदार होना',
      'धूप में निकलने पर त्वचा में लालिमा और चुभन',
    ],
    herbalRemedies: [
      {
        name: 'नीम पत्र एवं मंजिष्ठादि काढ़ा',
        dosage: 'सुबह खाली पेट 20ml काढ़ा गुनगुने पानी के साथ',
        benefit: 'रक्त को गहराई से शुद्ध कर त्वचा के टॉक्सिन्स बाहर निकालता है।',
      },
      {
        name: 'शुद्ध हरिद्रा खंड',
        dosage: 'रात को 1 चम्मच गुनगुने दूध या पानी से',
        benefit: 'प्राकृतिक एंटी-एलर्जिक और एंटी-बैक्टीरियल सुरक्षा प्रदान करता है।',
      },
      {
        name: 'गुलाब जल व चंदन का प्राकृतिक लेप',
        dosage: 'सप्ताह में 2 बार चेहरे पर लगाएं',
        benefit: 'अतिरिक्त पित्त और गर्मी को शांत कर प्राकृतिक चमक लौटाता है।',
      },
    ],
    dietDos: [
      'खीरा, तरबूज, अनार और नारियल पानी लें',
      'करेला, नीम और गिलोय जैसे तिक्त (कड़वे) रसों का सेवन करें',
      'सूती और ढीले कपड़े पहनें',
    ],
    dietDonts: [
      'गुड़, बैंगन, अरबी, खटाई और लाल मिर्च से पूर्ण परहेज रखें',
      'दूध के साथ नमक वाली चीजें न खाएं',
      'दिन में सोने की आदत बंद करें (कफ बढ़ता है)',
    ],
    yoga: [
      { name: 'शीतली व शीतकारी प्राणायाम', benefit: 'शरीर के आंतरिक तापमान को तुरंत 2-3 डिग्री ठंडा करता है।' },
      { name: 'सूर्य नमस्कार', benefit: 'पसीने के रास्ते त्वचा के छिद्रों की गंदगी साफ करता है।' },
    ],
    whenToSeeDoctor: [
      'त्वचा पर तेजी से फैलने वाले फफोले पड़ना',
      'शरीर पर मवाद आना और 102°F से अधिक बुखार होना',
      'होठों और आंखों के आसपास अचानक तीव्र सूजन आ जाना',
    ],
  },
  sleep: {
    title: 'Sleep Disorders & Insomnia Care',
    hindiTitle: 'अनिद्रा (Sleep Issues), बेचैनी व स्लीप एपनिया',
    dosha: 'तर्पण कफ क्षय एवं व्यान वात असंतुलन (Disturbed Sleep Cycles)',
    intro:
      'आयुर्वेद में आहार, निद्रा और ब्रह्मचर्य को "त्रय उपस्तंभ" (जीवन के तीन मजबूत खंभे) कहा गया है। यदि नींद पूरी नहीं होगी तो कोई भी दवा शरीर पर असर नहीं करेगी। प्राकृतिक पाद-अभ्यंग और सर्पगंधा से नींद की गोलियों से हमेशा के लिए मुक्ति पाई जा सकती है।',
    causes: [
      'देर रात तक स्क्रीन पर ब्लू लाइट का एक्सपोजर',
      'अनियमित सोने और जागने का समय',
      'शाम को भारी और गरिष्ठ भोजन करना',
      'मस्तिष्क में निरंतर तनाव और अगली सुबह की चिंता',
    ],
    symptoms: [
      'बिस्तर पर जाने के बाद 2-3 घंटे तक नींद न आना',
      'रात में बार-बार आंख खुलना और फिर नींद न लगना',
      'सुबह उठने पर सिर में भारीपन और आंखों में जलन रहना',
      'दिनभर सुस्ती और किसी काम में मन न लगना',
    ],
    herbalRemedies: [
      {
        name: 'जायफल व गाय का गुनगुना दूध',
        dosage: 'सोने से 30 मिनट पूर्व 1 कप दूध + चुटकी भर जायफल',
        benefit: 'प्राकृतिक रूप से मेलाटोनिन बढ़ाकर गहरी सुखद नींद देता है।',
      },
      {
        name: 'तिल तेल या देशी घी से पाद-अभ्यंग',
        dosage: 'रोजाना रात को तलवों पर 5 मिनट मालिश',
        benefit: 'मस्तिष्क की अतिरिक्त गर्मी पैरों के रास्ते खींचकर शांति देता है।',
      },
      {
        name: 'सर्पगंधा एवं ब्राह्मी वटी',
        dosage: 'रात को 1 गोली वैद्यकीय सलाह अनुसार',
        benefit: 'नर्वस सिस्टम को शिथिल कर अनिद्रा की आदत तोड़ता है।',
      },
    ],
    dietDos: [
      'रात को हल्का मूंग दाल सूप या दलिया लें',
      'सोने से पूर्व 1 गिलास गुनगुना पानी पिएं',
      'कैमोमाइल या तुलसी की गर्म हर्बल चाय पिएं',
    ],
    dietDonts: [
      'शाम 6 बजे के बाद कॉफी, चाय, चॉकलेट न लें',
      'बेडरूम में मोबाइल चार्जिंग पर न रखें',
      'बिस्तर पर बैठकर ऑफिस का काम न करें',
    ],
    yoga: [
      { name: 'योग निद्रा (Yoga Nidra - 15 मिनट)', benefit: '4 घंटे की नींद के बराबर विश्रांति प्रदान करता है।' },
      { name: 'शवासन एवं नाड़ी शोधन प्राणायाम', benefit: 'पैरासिम्पेथेटिक नर्वस सिस्टम को सक्रिय करता है।' },
    ],
    whenToSeeDoctor: [
      'सोते समय सांस रुक जाना (Sleep Apnea लक्षण)',
      'लगातार 1 हफ्ते तक बिल्कुल नींद न आना',
      'नींद में अत्यधिक पसीना आना या दिल की धड़कन बढ़ जाना',
    ],
  },
  immunity: {
    title: 'Immunity Boost & Ojas Care',
    hindiTitle: 'ओजस वृद्धि, व्याधिक्षमत्व एवं संक्रमण सुरक्षा',
    dosha: 'ओजस क्षय एवं रस धातु अशोधन (Depleted Vitality & Immunity)',
    intro:
      'आयुर्वेद में रोग प्रतिरोधक क्षमता को "ओजस" कहा जाता है। यह सातों धातुओं (रस, रक्त, मांस, मेद, अस्थि, मज्जा, शुक्र) का शुद्ध सार है। गिलोय, तुलसी और च्यवनप्राश शरीर के सुरक्षा चक्र को इतना मजबूत कर देते हैं कि मौसमी वायरस असर नहीं कर पाते।',
    causes: [
      'अत्यधिक एंटीबायोटिक्स और अंग्रेजी दर्दनिवारक दवाओं का सेवन',
      'शारीरिक व्यायाम और धूप (विटामिन D) की कमी',
      'असंतुलित व पोषक तत्वों से हीन भोजन',
      'दीर्घकालिक मानसिक तनाव और नींद की कमी',
    ],
    symptoms: [
      'मौसम बदलते ही तुरंत सर्दी, जुकाम और खांसी होना',
      'घाव या चोट का बहुत देर से भरना',
      'हर समय बिना किसी भारी काम के भी अत्यधिक कमजोरी महसूस होना',
      'बार-बार पेट या त्वचा में संक्रमण होना',
    ],
    herbalRemedies: [
      {
        name: 'शुद्ध गिलोय घनवटी / स्वरस',
        dosage: 'सुबह खाली पेट 1-2 वटी गुनगुने पानी के साथ',
        benefit: 'शरीर की टी-सेल्स और एंटीबॉडीज को 5 गुना मजबूत बनाता है।',
      },
      {
        name: 'आयुष काढ़ा (तुलसी, दालचीनी, सोंठ, काली मिर्च)',
        dosage: 'दिन में 1 बार हल्का गुनगुना घूंट-घूंट करके पिएं',
        benefit: 'श्वसन तंत्र को रोगाणुओं से मुक्त रखता है।',
      },
      {
        name: 'स्वर्ण भस्म युक्त च्यवनप्राश',
        dosage: 'सुबह 1 चम्मच दूध के साथ',
        benefit: 'सातों धातुओं को पुष्ट कर शरीर में ओजस का संचार करता है।',
      },
    ],
    dietDos: [
      'हल्दी वाला गुनगुना दूध (Golden Milk) रात को पिएं',
      'ताजे मौसमी फल, आंवला और हरी सब्जियां खाएं',
      'रोजाना 15-20 मिनट सुबह की धूप में बैठें',
    ],
    dietDonts: [
      'ठंडी तासीर वाली और बासी चीजें न खाएं',
      'सफेद चीनी और मैदा का अत्यधिक सेवन बंद करें',
      'धूम्रपान और जंक फूड से बचें',
    ],
    yoga: [
      { name: 'सूर्य नमस्कार (12 चक्र)', benefit: 'पूरे शरीर के अंगों और ग्रंथियों को सक्रिय करता है।' },
      { name: 'कपालभाति व भस्त्रिका प्राणायाम', benefit: 'फेफड़ों की क्षमता बढ़ाकर ऑक्सीजन का स्तर बढ़ाता है।' },
    ],
    whenToSeeDoctor: [
      'बुखार 103°F से अधिक होना और 3 दिन से न उतरना',
      'सांस लेने में अत्यधिक कठिनाई होना',
      'शरीर पर लाल चकत्ते या रक्तस्राव के संकेत दिखना',
    ],
  },
  general: {
    title: 'General Health, Viral Fever & Fatigue',
    hindiTitle: 'मौसमी ज्वर (Fever), शारीरिक कमजोरी व दैनिक स्वास्थ्य',
    dosha: 'वात-कफ ज्वर एवं आमाशय आम दोष (Seasonal Viral & Fatigue)',
    intro:
      'मौसम बदलते ही शरीर की रोग प्रतिरोधक क्षमता अस्थायी रूप से घट जाती है जिससे मौसमी बुखार, सिरदर्द, बदन दर्द और कमजोरी होती है। आयुर्वेद में बुखार का पहला इलाज "लंघन" (हल्का भोजन) और गिलोय काढ़ा है, जिससे शरीर बिना किसी साइड इफेक्ट के तुरंत स्वस्थ हो जाता है।',
    causes: [
      'मौसम में अचानक बदलाव (गर्मी से एसी में जाना, भीगना)',
      'वायरल या बैक्टीरियल संक्रमण का प्रसार',
      'शरीर में डिहाइड्रेशन (पानी की कमी) होना',
      'लगातार अधिक काम और विश्राम की कमी',
    ],
    symptoms: [
      'शरीर का तापमान बढ़ना, कंपकंपी लगना और बदन में तेज दर्द',
      'भूख बिल्कुल न लगना और मुंह का स्वाद कड़वा होना',
      'आंखों और माथे में भारीपन या दर्द होना',
      'उठने-बैठने में चक्कर आना और अत्यधिक थकान होना',
    ],
    herbalRemedies: [
      {
        name: 'गिलोय, तुलसी व सोंठ काढ़ा',
        dosage: 'दिन में 2 से 3 बार आधा गिलास गुनगुना',
        benefit: 'बुखार का तापमान तोड़ता है, बदन दर्द दूर करता है और प्लेटलेट्स नियंत्रित रखता है।',
      },
      {
        name: 'महासुदर्शन घनवटी',
        dosage: '2 गोली दिन में 2 बार भोजनोपरांत',
        benefit: 'सभी प्रकार के पुराने और मौसमी बुखार को जड़ से शांत करती है।',
      },
      {
        name: 'लंघन (मूंग दाल का हल्का पानी)',
        dosage: 'बुखार रहने तक सामान्य भारी भोजन की जगह लें',
        benefit: 'पाचन तंत्र को विश्राम मिलता है और शरीर की ऊर्जा बीमारी से लड़ने में लगती है।',
      },
    ],
    dietDos: [
      'खूब गुनगुना पानी पिएं, निर्जलीकरण न होने दें',
      'पतली मूंग दाल की खिचड़ी, सेब का रस या मौसमी का रस लें',
      'पर्याप्त विश्राम और गहरी नींद लें',
    ],
    dietDonts: [
      'दूध, दही, चावल, पराठे और तला-भुना बिल्कुल न लें',
      'ठंडे पानी से कभी न नहाएं',
      'बुखार में भारी कसरत या भागदौड़ न करें',
    ],
    yoga: [
      { name: 'शवासन (पूर्ण विश्राम मुद्रा)', benefit: 'शरीर को स्वतः हील होने का अवसर देता है।' },
      { name: 'शीतल प्राणायाम (हल्का अनुलोम विलोम)', benefit: 'तापमान को संतुलित करता है।' },
    ],
    whenToSeeDoctor: [
      'बुखार 103°F से अधिक होना और दवाओं से भी न उतरना',
      'शरीर पर लाल चकत्ते पड़ना (डेंगू का संकेत)',
      'अत्यधिक उल्टियां और पानी भी पेट में न रुकना',
    ],
  },
};

export const CategoryDetailPage: React.FC<{ slug: string }> = ({ slug }) => {
  const { navigate } = useRouter();
  const cat = CATEGORY_MAP[slug] || CATEGORY_MAP['general'];

  return (
    <PageLayout
      pageTitle={cat.hindiTitle}
      pageSubtitle={cat.intro}
      badge={cat.title}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Dosha & Overview Card */}
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-3xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-amber-200/60">
            <div>
              <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
                आयुर्वेदिक कारण एवं दोष विश्लेषण
              </span>
              <h3 className="text-xl font-bold text-amber-950 font-serif mt-1">
                {cat.dosha}
              </h3>
            </div>
            <Link
              href="/diagnose"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-xs transition-colors shrink-0"
            >
              <Sparkles className="w-4 h-4" />
              <span>अपने लक्षण की जांच करें (Free)</span>
            </Link>
          </div>
          <p className="text-sm text-stone-700 leading-relaxed mt-4">
            {cat.intro}
          </p>

          {/* Voice explanation player */}
          <div className="mt-6 pt-5 border-t border-amber-200/70">
            <VoiceReadButton
              textToSpeak={`नमस्ते बेटा! ${cat.hindiTitle} के विषय में छोटेलाल जी का परामर्श सुनें। ${cat.intro}। आयुर्वेद के अनुसार इसके मुख्य कारण हैं: ${cat.causes.join(', ')}। घबराएं नहीं, नियमित घरेलू नुस्खों व खानपान के सही नियमों से यह समस्या पूरी तरह ठीक हो सकती है।`}
              label={`${cat.hindiTitle} के बारे में छोटेलाल जी से सुनें`}
              sublabel="समस्या के कारण, लक्षण और आयुर्वेदिक समाधान की व्यक्तिगत आवाज़ में व्याख्या"
              variant="banner"
              className="bg-white/80"
            />
          </div>
        </div>

        {/* Causes & Symptoms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Causes */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-4">
            <h4 className="text-lg font-bold text-amber-950 font-serif flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span>मुख्य कारण (Root Causes):</span>
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-stone-700">
              {cat.causes.map((c, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-red-50 text-red-600 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Symptoms */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-4">
            <h4 className="text-lg font-bold text-amber-950 font-serif flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>सामान्य लक्षण (Symptoms):</span>
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-stone-700">
              {cat.symptoms.map((s, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Herbal Remedies */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
              छोटेलाल जी के प्रमाणित नुस्खे
            </span>
            <h4 className="text-2xl font-bold text-amber-950 font-serif">
              प्रामाणिक घरेलू जड़ी-बूटी उपचार (Herbal Remedies)
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {cat.herbalRemedies.map((remedy, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-[#FDFBF7] border border-amber-100/90 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="inline-block w-7 h-7 rounded-xl bg-orange-500 text-white font-bold text-xs flex items-center justify-center">
                      {i + 1}
                    </span>
                    <VoiceReadButton
                      textToSpeak={`${remedy.name}। खुराक: ${remedy.dosage}। लाभ: ${remedy.benefit}।`}
                      label="सुनें"
                      variant="compact"
                      title="इस नुस्खे की खुराक व लाभ सुनें"
                    />
                  </div>
                  <h5 className="font-bold text-base text-amber-950 font-serif">{remedy.name}</h5>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    <strong>खुराक:</strong> {remedy.dosage}
                  </p>
                </div>
                <p className="text-xs text-emerald-800 font-medium pt-2 border-t border-amber-100">
                  {remedy.benefit}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Diet Rules (Do's & Don'ts) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-emerald-50/50 border border-emerald-200/80 rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-bold text-emerald-950 font-serif flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>क्या खाएं (पथ्य - Diet Do&apos;s):</span>
              </h4>
              <VoiceReadButton
                textToSpeak={`इस समस्या में आपको क्या खाना चाहिए: ${cat.dietDos.join(', ')}।`}
                label="सुनें"
                variant="compact"
                title="पथ्य आहार सुनें"
              />
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700">
              {cat.dietDos.map((d, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-rose-50/50 border border-rose-200/80 rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-bold text-rose-950 font-serif flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
                <span>किससे परहेज करें (अपथ्य - Diet Don&apos;ts):</span>
              </h4>
              <VoiceReadButton
                textToSpeak={`इस समस्या में क्या नहीं खाना चाहिए और किससे परहेज करना चाहिए: ${cat.dietDonts.join(', ')}।`}
                label="सुनें"
                variant="compact"
                title="अपथ्य परहेज सुनें"
              />
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700">
              {cat.dietDonts.map((d, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">✕</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Yoga & Exercises */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-bold text-amber-950 font-serif">
              सहायक योगासन एवं मुद्राएं (Yoga & Pranayama):
            </h4>
            <VoiceReadButton
              textToSpeak={`सहायक योगासन: ${cat.yoga.map((y) => `${y.name}, इसका लाभ है: ${y.benefit}`).join('। ')}।`}
              label="सभी योगासन सुनें"
              variant="compact"
              title="सभी योगासन सुनें"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cat.yoga.map((y, i) => (
              <div key={i} className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1 relative">
                <div className="flex items-center justify-between">
                  <h5 className="font-bold text-sm text-amber-950">{y.name}</h5>
                  <VoiceReadButton
                    textToSpeak={`${y.name}। इसका लाभ: ${y.benefit}।`}
                    label="सुनें"
                    variant="compact"
                    title="यह आसन सुनें"
                  />
                </div>
                <p className="text-xs text-stone-600">{y.benefit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Doctor Red Flags */}
        <div className="bg-amber-100/60 border border-amber-300 rounded-3xl p-6 sm:p-8 space-y-3">
          <h4 className="text-base font-bold text-amber-950 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-800" />
            <span>डॉक्टर से कब मिलें? (खतरे के संकेत / Red Flags):</span>
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm text-stone-800">
            {cat.whenToSeeDoctor.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-amber-800 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom CTA */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-3xl p-8 text-white text-center space-y-4 shadow-lg">
          <h3 className="text-2xl font-bold font-serif">
            क्या आप इस समस्या से जूझ रहे हैं?
          </h3>
          <p className="text-sm text-orange-100 max-w-xl mx-auto">
            1 मिनट का मुफ़्त AI डायग्नोसिस करें और अपने व्यक्तिगत लक्षणों के अनुसार सटीक पर्चा और खुराक प्राप्त करें।
          </p>
          <div className="pt-2">
            <Link
              href="/diagnose"
              className="inline-flex items-center gap-2 bg-white text-orange-600 font-bold px-8 py-3.5 rounded-xl text-sm shadow hover:bg-amber-50 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              <span>मुफ़्त AI जांच करें (Start Free Diagnosis)</span>
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
