import { RecommendedProduct, DoctorProfile } from '../types';

export const PRODUCTS_CATALOG: RecommendedProduct[] = [
  // 1. Piles & Sitting Related Products
  {
    id: 'prod-piles-1',
    name: 'Chotelal Ji Arsh-Mukti Complete Piles Care Kit',
    hindiName: 'छोटेलाल जी अर्श-मुक्ति बवासीर केयर किट',
    category: 'piles_sitting',
    price: 899,
    originalPrice: 1499,
    rating: 4.9,
    reviewsCount: 1420,
    image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=500&auto=format&fit=crop&q=80',
    description: 'Triple Action Ayurvedic Formula: Arshoghni Vati, Pure Triphala Guggulu & Natural Soothing Cooling Gel for burning, swelling & fissure relief.',
    keyIngredients: ['Triphala Extract', 'Guggulu', 'Nagkesar', 'Neem Leaf', 'Aloe Vera'],
    badge: 'Bestseller ⭐',
    inStock: true
  },
  {
    id: 'prod-piles-2',
    name: 'Ergonomic U-Cut Memory Foam Coccyx Seat Cushion',
    hindiName: 'एर्गोनोमिक टेलबोन और बवासीर सिटिंग कुशन',
    category: 'piles_sitting',
    price: 749,
    originalPrice: 1299,
    rating: 4.8,
    reviewsCount: 890,
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&auto=format&fit=crop&q=80',
    description: 'Relieves 100% direct pressure on tailbone & anal veins during prolonged office sitting. Medical grade high-density memory foam.',
    keyIngredients: ['Orthopedic Memory Foam', 'Breathable Mesh Cover', 'Anti-slip Base'],
    badge: 'Doctor Recommended',
    inStock: true
  },
  {
    id: 'prod-piles-3',
    name: 'Herbal Sitz Bath Salt & Ayurvedic Tub Kit',
    hindiName: 'हर्बल सिट्ज बाथ साल्ट और टब किट',
    category: 'piles_sitting',
    price: 549,
    originalPrice: 899,
    rating: 4.7,
    reviewsCount: 654,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=500&auto=format&fit=crop&q=80',
    description: 'Warm soothing bath salt with Epsom, Tea Tree, Lavender & Turmeric for quick relief from acute anal pain and itching.',
    keyIngredients: ['Epsom Salt', 'Haldi Extract', 'Tea Tree Oil', 'Camphor'],
    badge: 'Instant Pain Relief',
    inStock: true
  },

  // 2. Mental Health & Stress Products
  {
    id: 'prod-mental-1',
    name: 'Chotelal Ji KSM-66 Ashwagandha + Brahmi Stress Shield',
    hindiName: 'छोटेलाल जी अश्वगंधा व ब्राह्मी स्ट्रेस शील्ड',
    category: 'mental_health',
    price: 649,
    originalPrice: 1100,
    rating: 4.9,
    reviewsCount: 1980,
    image: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=500&auto=format&fit=crop&q=80',
    description: 'Clinically studied adaptogen capsules that reduce cortisol (stress hormone) by 27%, ease overthinking and promote calm mental focus.',
    keyIngredients: ['KSM-66 Ashwagandha', 'Brahmi Bacopa', 'Shankhpushpi', 'Jatamansi'],
    badge: 'Stress Relief',
    inStock: true
  },
  {
    id: 'prod-mental-2',
    name: 'Nidra Shanti Deep Sleep Herbal Chamomile & Jatamansi Elixir',
    hindiName: 'निद्रा शांति डीप स्लीप हर्बल सिरप / टी',
    category: 'mental_health',
    price: 499,
    originalPrice: 799,
    rating: 4.8,
    reviewsCount: 710,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&auto=format&fit=crop&q=80',
    description: 'Non-addictive natural sleep booster with Chamomile, Tagar & Nutmeg. Fall asleep within 30 minutes without morning drowsiness.',
    keyIngredients: ['Tagar Root', 'Chamomile Flowers', 'Jaiphal', 'Tagara'],
    badge: 'Sound Sleep',
    inStock: true
  },

  // 3. Hair Growth & Scalp Products
  {
    id: 'prod-hair-1',
    name: 'Chotelal Ji Maha-Bhringraj & Rosemary 21-Herb Hair Oil',
    hindiName: 'छोटेलाल जी महाभृंगराज एवं रोज़मेरी हेयर ग्रोथ ऑयल',
    category: 'hair_growth',
    price: 599,
    originalPrice: 999,
    rating: 4.9,
    reviewsCount: 2340,
    image: 'https://images.unsplash.com/photo-1608248597359-009761937ffb?w=500&auto=format&fit=crop&q=80',
    description: 'Traditional Kshir-Pak Vidhi oil infused with Bhringraj, Rosemary essential drops, Amla, Onion seed & Brahmi for reviving dormant roots.',
    keyIngredients: ['Bhringraj (Keshraj)', 'Rosemary Oil', 'Amla', 'Brahmi', 'Cold Pressed Sesame'],
    badge: 'Top Rated for Hair Fall',
    inStock: true
  },
  {
    id: 'prod-hair-2',
    name: 'Ayurvedic Biotin & Keratin Booster Tablets',
    hindiName: 'आयुर्वेदिक बायोटिन व केराटिन हेयर वाइटेलिटी',
    category: 'hair_growth',
    price: 699,
    originalPrice: 1199,
    rating: 4.7,
    reviewsCount: 820,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=80',
    description: 'Plant-derived D-Biotin with Sesbania Grandiflora extract and Ayurvedic herbs to stop root thinning and accelerate thick regrowth.',
    keyIngredients: ['Sesbania Agathi', 'Bamboo Silica', 'Amla', 'Methi Extract'],
    badge: '100% Plant Based',
    inStock: true
  },

  // 4. General Health & Fever Products
  {
    id: 'prod-gen-1',
    name: 'Chotelal Ji Ayush Kwath & Giloy Ghanvati Immunity Booster',
    hindiName: 'छोटेलाल जी आयुष क्वाथ और गिलोय घनवटी',
    category: 'general',
    price: 399,
    originalPrice: 650,
    rating: 4.9,
    reviewsCount: 1650,
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&auto=format&fit=crop&q=80',
    description: 'Ancient fever & viral shield: Pure Giloy (Amrita), Tulsi, Dalchini, Sunthi & Kali Mirch. Elevates platelet count and relieves body ache.',
    keyIngredients: ['Pure Giloy Stem', 'Krishna Tulsi', 'Sunthi (Dry Ginger)', 'Maricha'],
    badge: 'Fever & Viral Defense',
    inStock: true
  },
  {
    id: 'prod-gen-2',
    name: 'Pachak Amrit Gut & Acidity Relief Churna',
    hindiName: 'पाचक अमृत गैस, एसिडिटी व बदहजमी चूर्ण',
    category: 'general',
    price: 349,
    originalPrice: 599,
    rating: 4.8,
    reviewsCount: 1120,
    image: 'https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?w=500&auto=format&fit=crop&q=80',
    description: 'Instant relief from hyperacidity, burning chest, gas and chronic indigestion without English antacids.',
    keyIngredients: ['Hing', 'Ajwain', 'Kala Namak', 'Jeera', 'Saunf'],
    badge: 'Instant Acidity Relief',
    inStock: true
  }
];

export const VERIFIED_DOCTORS: DoctorProfile[] = [
  {
    id: 'doc-1',
    name: 'Dr. Rameshwar Nath Sharma',
    qualification: 'BAMS, MD (Ayurveda), Ph.D',
    experienceYears: 24,
    specialty: 'Senior Ayurvedic Proctologist & Digestive Specialist',
    languages: ['Hindi', 'English'],
    rating: 4.95,
    consultationFee: 299,
    availableNext: 'Available in 10 mins',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'doc-2',
    name: 'Dr. Ananya Mathur',
    qualification: 'MBBS, DNB (Psychiatry), Mind-Body Wellness',
    experienceYears: 14,
    specialty: 'Stress, Insomnia & Mental Wellness Consultant',
    languages: ['Hindi', 'English'],
    rating: 4.9,
    consultationFee: 499,
    availableNext: 'Today, 4:00 PM',
    avatar: 'https://images.unsplash.com/photo-1594824813587-033878b277ff?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'doc-3',
    name: 'Dr. Vikramaditya Joshi',
    qualification: 'BAMS (Ksharsutra Specialist), Fellowship Proctology',
    experienceYears: 18,
    specialty: 'Ksharsutra & Advanced Piles / Fissure Non-Surgical Cure',
    languages: ['Hindi', 'English'],
    rating: 4.98,
    consultationFee: 349,
    availableNext: 'Available in 25 mins',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'doc-4',
    name: 'Dr. Meenakshi Sundaram',
    qualification: 'MD (Dermatology & Ayurvedic Trichology)',
    experienceYears: 12,
    specialty: 'Hair Regrowth, Scalp Disorders & Hormone Balance',
    languages: ['English', 'Hindi'],
    rating: 4.88,
    consultationFee: 399,
    availableNext: 'Today, 5:30 PM',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&auto=format&fit=crop&q=80'
  }
];

export const CATEGORY_INFO = {
  piles_sitting: {
    id: 'piles_sitting',
    title: 'Piles, Fissure & Sitting Issues',
    hindiTitle: 'बवासीर, फिशर और सिटिंग दर्द',
    icon: 'Chair',
    badge: '100% Confidential',
    description: 'Long desk work pain, tailbone stiffness, bleeding piles & fissure relief with proven herbal Ksharsutra therapy.',
    quickSymptoms: [
      'Pain or bleeding during bowel movement (शौच के समय दर्द या खून)',
      'Lump or swelling around anal area (मस्से या सूजन)',
      'Severe tailbone/lower back ache from 8+ hours chair sitting (लंबे समय बैठने से दर्द)',
      'Sharp burning sensation like cut or tear (कांच जैसा चुभन/फिशर)'
    ]
  },
  mental_health: {
    id: 'mental_health',
    title: 'Mental Health & Stress',
    hindiTitle: 'मानसिक स्वास्थ्य और तनाव',
    icon: 'Brain',
    badge: 'Compassionate Care',
    description: 'Overthinking, insomnia, workplace burnout, panic attacks and anxiety restored with Medhya Rasayanas.',
    quickSymptoms: [
      'Constant racing thoughts and restless chest (घबराहट व बेचैनी)',
      'Insomnia / waking up multiple times at night (अनिद्रा व नींद ना आना)',
      'Brain fog & unable to concentrate at work (दिमागी थकान)',
      'Unexplained sadness, fatigue & low motivation (चिड़चिड़ापन व तनाव)'
    ]
  },
  hair_growth: {
    id: 'hair_growth',
    title: 'Hair Growth & Scalp Care',
    hindiTitle: 'हेयर ग्रोथ और बालों का झड़ना',
    icon: 'Sparkles',
    badge: 'Roots Revival',
    description: 'Severe hair shedding, receding hairline, stubborn dandruff, and thinning reversed naturally.',
    quickSymptoms: [
      'More than 100 hairs falling daily in shower/comb (गुच्छे में बाल झड़ना)',
      'Widening partition or visible scalp crown (मांग चौड़ी होना / गंजापन)',
      'Persistent white dandruff flakes & itchy scalp (रूसी व खुजली)',
      'Premature grey hair & brittle texture (कम उम्र में बाल सफेद होना)'
    ]
  },
  general: {
    id: 'general',
    title: 'General Health & Fever',
    hindiTitle: 'सामान्य रोग, बुखार व गैस',
    icon: 'ShieldAlert',
    badge: 'Whole Body Wellness',
    description: 'Seasonal viral fever, recurring cough/cold, acid reflux, gut indigestion, and joint pain.',
    quickSymptoms: [
      'Fever with chills and body ache (बुखार, ठंड और बदन दर्द)',
      'Chronic acidity, chest burning & belching (खट्टी डकारें व सीने में जलन)',
      'Bloating, stomach heaviness & indigestion (पेट फूलना व गैस)',
      'Knee or joint stiffness when getting up (घुटनों व जोड़ों का दर्द)'
    ]
  }
};
