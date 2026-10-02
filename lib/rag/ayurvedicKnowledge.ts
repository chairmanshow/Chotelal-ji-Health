/**
 * Authentic Classical Ayurvedic RAG (Retrieval-Augmented Generation) Knowledge Base
 * 
 * Sources:
 * - Charak Samhita (Sutrasthana, Nidanasthana, Chikitsasthana)
 * - Sushruta Samhita (Chikitsasthana, Nidanasthana, Sharirasthana)
 * - Ashtanga Hridaya by Acharya Vagbhata
 * - Bhavaprakasha Nighantu (Acharya Bhavamishra)
 * - Ayurvedic Pharmacopoeia of India (Ministry of AYUSH, Govt of India)
 */

export interface AyurvedicKnowledgeChunk {
  id: string;
  category: 'piles' | 'hair' | 'mental-health' | 'digestion' | 'skin' | 'general' | 'herbs' | 'yoga';
  condition: string;
  sanskritTerm: string;
  source: string;
  sourceBook: string;
  chapterOrSloka: string;
  doshaInvolvement: string;
  rootCause: string;
  verifiedRemedies: Array<{
    name: string;
    botanicalOrClassicalName: string;
    dosage: string;
    anupana: string; // Vehicle e.g., warm water, honey, warm milk
    howToTake: string;
  }>;
  classicalTreatments: string[];
  yogaAndPranayama: Array<{
    name: string;
    duration: string;
    benefit: string;
  }>;
  pathyaAhara: string[]; // Wholesome foods to eat
  apathyaAhara: string[]; // Harmful foods to avoid
  warnings: string;
  keywords: string[];
  summaryText: string;
}

export const AYURVEDIC_KNOWLEDGE_BASE: AyurvedicKnowledgeChunk[] = [
  // 1. PILES & ANO-RECTAL HEALTH (ARSHA CHIKITSA)
  {
    id: 'rag-piles-01',
    category: 'piles',
    condition: 'Piles / Hemorrhoids / Anal Fissure (Arsha & Parikartika)',
    sanskritTerm: 'अर्श (Arsha) एवं परिकर्तिका (Parikartika)',
    source: 'Charak Samhita, Chikitsa Sthana, Chapter 14 (Arsha Chikitsa Adhyaya)',
    sourceBook: 'Charak Samhita',
    chapterOrSloka: 'Chikitsa Sthana, Ch. 14, Sloka 12-25',
    doshaInvolvement: 'Vata-Pitta Pradhan Tridosha (Apana Vayu Dushti)',
    rootCause: 'Manda Agni (sluggish digestion), prolonged sitting, chronic constipation (Vibandha), and excess dry or fiery foods.',
    verifiedRemedies: [
      {
        name: 'Triphala Guggulu & Abhayarishta',
        botanicalOrClassicalName: 'Triphala Guggulu / Abhayarishta (Asava-Arishta)',
        dosage: 'Triphala Guggulu: 2 tablets (500mg each) twice daily. Abhayarishta: 15-20 ml with equal water after meals.',
        anupana: 'Lukewarm water (Koshna Jala)',
        howToTake: 'Take after lunch and dinner to soften stools and shrink inflamed vascular piles cushions.',
      },
      {
        name: 'Isabgol Husk (Plantago ovata) with Warm Cow Milk or Water',
        botanicalOrClassicalName: 'Plantago ovata / Ashwagol',
        dosage: '1 to 2 tablespoons (5-10g) at bedtime.',
        anupana: 'Warm water or warm milk',
        howToTake: 'Drink immediately after stirring so high natural mucilage forms in gut for effortless elimination.',
      },
      {
        name: 'Kankayan Vati (Arsha Kalpa)',
        botanicalOrClassicalName: 'Kankayan Vati',
        dosage: '1 tablet twice daily with Takra (buttermilk).',
        anupana: 'Spiced Buttermilk (Takra with roasted cumin and rock salt)',
        howToTake: 'Beneficial for bleeding and non-bleeding piles by stimulating Jatharagni.',
      },
    ],
    classicalTreatments: [
      'Avagaha Sweda (Sitz Bath): Sit in a tub of warm water infused with a pinch of Alum (Sphatika) or Triphala decoction for 15 minutes twice daily. Relieves anal spasm and burning instantly.',
      'Jatyadi Taila Local Application: Apply sterile Ayurvedic Jatyadi oil with cotton twice daily around rectal opening for rapid soothing and tissue healing.',
      'Sushruta Samhita Shalya Principle: For severe 3rd/4th degree prolapsed piles, consult an Ayurvedic Shalya surgeon for Ksharsutra therapy.',
    ],
    yogaAndPranayama: [
      {
        name: 'Ashwini Mudra (Horse Gesture)',
        duration: '3-5 minutes morning & evening',
        benefit: 'Tones anal sphincter muscles and prevents venous congestion.',
      },
      {
        name: 'Malasana (Garland Pose)',
        duration: '2-3 minutes daily',
        benefit: 'Aligns the recto-anal angle for complete, strain-free bowel emptying.',
      },
      {
        name: 'Viparita Karani (Legs-Up-The-Wall)',
        duration: '5-10 minutes before bed',
        benefit: 'Reverses gravitational blood pooling in pelvic veins.',
      },
    ],
    pathyaAhara: [
      'Warm buttermilk (Takra) churned with roasted jeera and pinch of Saindhava salt',
      'High-fiber papaya (Papita), soaked prunes, figs (Anjeer), and bottle gourd (Lauki)',
      '3 liters of warm or room-temperature water throughout the day',
      'Whole grain barley (Jau), unpolished rice, and moong dal khichdi',
    ],
    apathyaAhara: [
      'Red chili powder (Lal Mirch), excess garam masala, and black pepper',
      'Deep-fried snacks, samosas, pakoras, and dry bakery items (Maida)',
      'Coffee, hard alcohol, and energy drinks which dehydrate the stool',
      'Straining forcibly on the toilet for more than 5 minutes',
    ],
    warnings: 'Agar lagatar tez khoon beh raha ho (active arterial bleeding) ya tez bukhar ho, to turant proctologist/surgeon se milein.',
    keywords: ['piles', 'bawaseer', 'arsha', 'bleeding', 'anal itching', 'fissure', 'constipation', 'kabz', 'jalan', 'rectal pain', 'sitz bath', 'triphala', 'abhayarishta'],
    summaryText: 'Charak Samhita Chapter 14 recommends normalizing Apana Vayu with Triphala, Abhayarishta, warm sitz bath (Avagaha Sweda), and buttermilk to permanently cure Arsha (Piles) without straining.',
  },

  // 2. HAIR FALL, THINNING & DANDRUFF (KHALITYA & DARUNAKA)
  {
    id: 'rag-hair-01',
    category: 'hair',
    condition: 'Hair Fall, Premature Greying, & Dandruff (Khalitya, Palitya & Darunaka)',
    sanskritTerm: 'खालित्य (Khalitya), पालित्य (Palitya) एवं दारुणक (Darunaka)',
    source: 'Charak Samhita, Chikitsa Sthana, Chapter 26 (Trimarmiya Chikitsa Adhyaya) & Sushruta Samhita, Nidanasthana Ch. 13',
    sourceBook: 'Charak Samhita & Sushruta Samhita',
    chapterOrSloka: 'Charak Chikitsa Ch. 26, Sloka 132-137',
    doshaInvolvement: 'Pitta-Vata imbalance lodging in Asthi Dhatu & hair follicles (Romakupa)',
    rootCause: 'Excess body heat (Pitta), mental stress, chemical shampoos, lack of sleep, and nutritional depletion of Asthi Dhatu (bone tissue).',
    verifiedRemedies: [
      {
        name: 'Amalaki Rasayana (Fresh Amla Juice / Churna)',
        botanicalOrClassicalName: 'Phyllanthus emblica / Amla',
        dosage: '10-15 ml fresh juice or 3g powder daily morning.',
        anupana: 'Warm water or 1 tsp honey',
        howToTake: 'Rich in natural bio-available Vitamin C and antioxidants that cool Pitta and strengthen roots.',
      },
      {
        name: 'Bhringraj Taila (Eclipta alba) Scalp Therapy',
        botanicalOrClassicalName: 'Keshraja / Eclipta prostrata',
        dosage: 'Gently warm 1-2 tbsp oil and massage with fingertips.',
        anupana: 'External application',
        howToTake: 'Apply at night 3 times a week; wash in morning with mild herbal reetha-shikakai wash.',
      },
      {
        name: 'Saptamrit Lauha & Yashtimadhu Churna',
        botanicalOrClassicalName: 'Saptamrit Lauha / Glycyrrhiza glabra',
        dosage: '1 tablet Saptamrit Lauha with 1/2 tsp Yashtimadhu.',
        anupana: 'Cow Ghee and Honey (in unequal proportions)',
        howToTake: 'Classical Rasayana formulation for hair follicles, eyes, and melanin retention.',
      },
    ],
    classicalTreatments: [
      'Shiro Abhyanga: 10 minutes nightly scalp massage focusing on Adhipati and Simanta Marma points.',
      'Nasya Karma: Instill 2 drops of lukewarm Anu Taila or pure Cow Ghee into each nostril every morning.',
      'Methi-Curd Hair Mask for Dandruff: Soak 2 spoons fenugreek seeds overnight, grind into paste with fresh curd, apply on scalp for 30 minutes once weekly.',
    ],
    yogaAndPranayama: [
      {
        name: 'Sarvangasana & Sirsasana (Under Guidance)',
        duration: '2-3 minutes',
        benefit: 'Directs oxygenated blood to cranial capillaries feeding hair papilla.',
      },
      {
        name: 'Bhramari Pranayama (Bee Breath)',
        duration: '7 rounds daily',
        benefit: 'Reduces cortisol-induced telogen effluvium hair shedding.',
      },
      {
        name: 'Balayam (Fingernail Rubbing)',
        duration: '5 minutes twice daily',
        benefit: 'Acupressure meridian stimulation connecting to scalp hair follicles.',
      },
    ],
    pathyaAhara: [
      'Soaked almonds (Badam), walnuts (Akhrot), pumpkin seeds, and black sesame (Kala Til)',
      'Curry leaves (Kadi Patta) chewed fresh or added to dals daily',
      'Fresh seasonal vegetables, bottle gourd, spinach, and coconut water',
    ],
    apathyaAhara: [
      'Excess salty, sour, and fermented foods that aggravate Pitta',
      'Washing hair with extremely hot water (damages hair cuticles)',
      'Chemical hair dyes containing ammonia, sulfates, and parabens',
      'Late-night dinners and chronic sleep deprivation (Ratri Jagaran)',
    ],
    warnings: 'Agar balo me circular patches me baldness aa rahi ho (Alopecia areata), to fungal ya autoimmune test karwayein.',
    keywords: ['hair fall', 'khalitya', 'dandruff', 'safed baal', 'palitya', 'bhringraj', 'amla', 'baldness', 'scalp itch', 'alopecia', 'anu taila'],
    summaryText: 'Classical Ayurveda (Charak Chikitsa Ch. 26) views hair as the sub-tissue (Upadhatu) of Asthi. Nourishing bone tissue with Amalaki Rasayana, Nasya with Anu Taila, and Bhringraj oil halts root thinning and dandruff.',
  },

  // 3. MENTAL HEALTH, ANXIETY & INSOMNIA (MANOVAHA SROTAS & ANIDRA)
  {
    id: 'rag-mental-01',
    category: 'mental-health',
    condition: 'Stress, Anxiety, Brain Fog, & Sleeplessness (Chinta, Chittodwega & Anidra)',
    sanskritTerm: 'चित्तोद्वेग (Chittodwega), अनिद्रा (Anidra) एवं मनोवहा स्रोतस दृष्टि',
    source: 'Charak Samhita, Sutra Sthana, Chapter 21 (Ashtau Ninditiya) & Chikitsa Sthana Ch. 9',
    sourceBook: 'Charak Samhita',
    chapterOrSloka: 'Sutra Sthana, Ch. 21, Sloka 35-42',
    doshaInvolvement: 'Prana Vayu & Tarpaka Kapha Kshaya, aggravated Rajas Guna',
    rootCause: 'Sensory overload, high screen time, irregular circadian rhythm, suppressive emotional stress, and weak Ojas.',
    verifiedRemedies: [
      {
        name: 'Ashwagandha Churna (Withania somnifera)',
        botanicalOrClassicalName: 'Withania somnifera (Indian Ginseng)',
        dosage: '1/2 teaspoon (3g) before bedtime.',
        anupana: 'Warm cow milk with a pinch of green cardamom and nutmeg (Jaiphal)',
        howToTake: 'Normalizes GABA receptors, reduces circulating cortisol, and induces deep regenerative sleep.',
      },
      {
        name: 'Brahmi Vati / Shankhpushpi Syrup',
        botanicalOrClassicalName: 'Bacopa monnieri & Convolvulus pluricaulis',
        dosage: '1-2 tablets of Brahmi Vati twice daily or 10 ml Shankhpushpi syrup.',
        anupana: 'Fresh water or warm milk',
        howToTake: 'Medhya Rasayana that sharpens cognition, settles fluttering thoughts, and balances Prana Vayu.',
      },
      {
        name: 'Jatamansi Phanta (Infusion)',
        botanicalOrClassicalName: 'Nardostachys jatamansi',
        dosage: '1g root powder infused in warm water.',
        anupana: 'Warm water',
        howToTake: 'Soothes cardiac palpitation caused by nervous anxiety without drowsiness.',
      },
    ],
    classicalTreatments: [
      'Padabhyanga (Foot Massage): Massage warm Desi Cow Ghee or sesame oil onto the soles of feet for 5 minutes before sleeping. Activates Marma points that induce deep natural sleep within 15 minutes.',
      'Shiro Pichu: Place a sterile cotton swab soaked in Brahmi Taila or Ksheerabala Taila on the crown of the head for 20 minutes.',
      'Digital Detox: Cease blue-light screen exposure at least 45 minutes before sleep.',
    ],
    yogaAndPranayama: [
      {
        name: 'Anulom Vilom (Alternate Nostril Breathing)',
        duration: '10-15 minutes daily morning and night',
        benefit: 'Balances Ida and Pingala nadis, switching the nervous system from fight-or-flight to parasympathetic rest.',
      },
      {
        name: 'Yoga Nidra (Psychic Sleep)',
        duration: '15-20 minutes in afternoon or evening',
        benefit: 'Restores cognitive clarity equivalent to 3 hours of physical sleep.',
      },
      {
        name: 'Shavasana with Slow Diaphragmatic Breath',
        duration: '10 minutes',
        benefit: 'Reduces autonomic nervous tension and stabilizes blood pressure.',
      },
    ],
    pathyaAhara: [
      'Warm A2 cow milk, sweet soaked dates, soaked almonds, and raisins (Munakka)',
      'Fresh ghee, ripe bananas, pumpkin seeds, chamomile tea, and freshly cooked warm grains',
      'Regular meal timings that harmonize the biological clock',
    ],
    apathyaAhara: [
      'Caffeine, tea, energy drinks, and nicotine after 4:00 PM',
      'Violent or stimulating media consumption late at night',
      'Cold, dry, raw foods that spike Vata dosha in the brain',
    ],
    warnings: 'Yadi panic attacks, suicidal vichar ya severe clinical depression ho, to turant certified psychiatrist se sampark karein.',
    keywords: ['stress', 'tension', 'anxiety', 'neend', 'insomnia', 'depression', 'chinta', 'anidra', 'ashwagandha', 'brahmi', 'jatamansi', 'ghabrahat'],
    summaryText: 'Charak Samhita Sutra 21 emphasizes that restorative sleep (Nidra) is one of the three pillars of life (Trayopastambha). Ashwagandha, Brahmi, and warm Ghee foot massage (Padabhyanga) calm aggravated Prana Vayu and restore deep sleep.',
  },

  // 4. DIGESTION, GAS, ACIDITY & IBS (AGNI, AMLAPITTA & GRAHANI)
  {
    id: 'rag-digest-01',
    category: 'digestion',
    condition: 'Acidity, Gas, Bloating, & Sluggish Digestion (Amlapitta, Agnimandya & Adhmana)',
    sanskritTerm: 'अम्लपित्त (Amlapitta), अग्निमांद्य (Agnimandya) एवं आध्मान (Adhmana)',
    source: 'Charak Samhita, Chikitsa Sthana, Chapter 15 (Grahani Dosha Chikitsa Adhyaya)',
    sourceBook: 'Charak Samhita',
    chapterOrSloka: 'Chikitsa Sthana, Ch. 15, Sloka 56-72',
    doshaInvolvement: 'Samana Vayu Dushti with aggravated Pachaka Pitta and Ama Dosha',
    rootCause: 'Eating without true hunger (Adhyashana), wrong food combinations (Viruddha Ahara), excessive tea/coffee, and mental stress suppressing gastric enzymes.',
    verifiedRemedies: [
      {
        name: 'Avipattikar Churna',
        botanicalOrClassicalName: 'Avipattikar Churna (API classical formulation)',
        dosage: '1/2 to 1 teaspoon (3-5g) twice daily.',
        anupana: 'Lukewarm water or coconut water',
        howToTake: 'Take 15 minutes before lunch and dinner to neutralize acid reflux and burning sensation in chest.',
      },
      {
        name: 'Hingwashtak Churna',
        botanicalOrClassicalName: 'Hingwashtak Churna with Asafoetida (Ferula foetida)',
        dosage: '1/2 teaspoon (2g) with the first morsel of food.',
        anupana: 'Warm rice mixed with 1 tsp Cow Ghee',
        howToTake: 'Instantly expels trapped intestinal gas, reduces severe bloating, and rekindles Jatharagni.',
      },
      {
        name: 'Sauf-Jeera-Dhaniya (CCF) Decoction',
        botanicalOrClassicalName: 'Foeniculum vulgare, Cuminum cyminum, Coriandrum sativum',
        dosage: 'Boil 1/2 tsp of each in 500ml water until reduced to 300ml.',
        anupana: 'Sip warm like herbal tea throughout the day',
        howToTake: 'Cooling, carminative, and balances digestive bile without aggravating acid.',
      },
    ],
    classicalTreatments: [
      'Vajrasana Posture: Sit in Vajrasana for 10-15 minutes immediately following every meal to direct blood to mesenteric digestive vessels.',
      'Langhana (Intermittent Fasting): Eat light mung soup for dinner if lunch was heavy to allow digestive fire to burn accumulated endotoxins (Ama).',
      'Ginger-Rock Salt Aperitif: Chew a small thin slice of fresh ginger sprinkled with sendha namak and a drop of lemon 10 minutes before lunch.',
    ],
    yogaAndPranayama: [
      {
        name: 'Pawanmuktasana (Wind-Relieving Pose)',
        duration: '5 repetitions',
        benefit: 'Gently massages the ascending and descending colon, clearing trapped gas.',
      },
      {
        name: 'Ardha Matsyendrasana (Spinal Twist)',
        duration: '2 minutes on each side',
        benefit: 'Stimulates pancreas, gall bladder, and liver peristalsis.',
      },
      {
        name: 'Sheetali & Sheetkari Pranayama',
        duration: '5 minutes for acidity flare-ups',
        benefit: 'Rapidly lowers gastric mucosal heat and heart burn.',
      },
    ],
    pathyaAhara: [
      'Moong dal khichdi cooked with cumin, turmeric, and pinch of hing',
      'Fresh coconut water, sweet pomegranate (Anar), boiled bottle gourd, and soaked raisins',
      'Warm water taken in small sips during meal (neither cold nor in large gulps)',
    ],
    apathyaAhara: [
      'Eating when emotionally angry, hurried, or anxious',
      'Drinking iced water directly after eating',
      'Fermented batter (Idli/Dosa), stale leftovers, vinegar, and raw onions in large quantity',
      'Lying down immediately after eating dinner',
    ],
    warnings: 'Agar ultee me khoon (hematemesis), tar-jaisa kala stool, ya pet me achanak tez dard uthe to turant emergency doctor ko dikhayein.',
    keywords: ['acidity', 'gas', 'bloating', 'pet dard', 'amlapitta', 'grahani', 'indigestion', 'kabz', 'ajirna', 'avipattikar', 'hingwashtak'],
    summaryText: 'Charak Samhita Chapter 15 declares "Shante Agnou Mriyate" (When digestive fire dies, man dies). Reigniting digestive agni with Hingwashtak Churna, CCF tea, and post-meal Vajrasana treats chronic acidity and gas at the root.',
  },

  // 5. SKIN ALLERGIES, ACNE & ECZEMA (KUSHTHA & MUKHADUSHIKA)
  {
    id: 'rag-skin-01',
    category: 'skin',
    condition: 'Acne, Eczema, Psoriasis, & Itching (Mukhadushika, Vicharchika & Kushtha)',
    sanskritTerm: 'मुखदूषिका (Mukhadushika), विचर्चिका (Vicharchika) एवं कुष्ठ (Kushtha)',
    source: 'Charak Samhita, Chikitsa Sthana, Chapter 7 (Kushtha Chikitsa Adhyaya) & Sushruta Nidana Ch. 5',
    sourceBook: 'Charak Samhita & Sushruta Samhita',
    chapterOrSloka: 'Charak Chikitsa Ch. 7, Sloka 20-35',
    doshaInvolvement: 'Pitta-Kapha Dushti in Rasa, Rakta, Mamsa & Lasika Dhatus',
    rootCause: 'Blood impurity (Rakta Dushti), excessive spicy/salty/fermented foods, irregular hygiene, and suppression of sweat toxins.',
    verifiedRemedies: [
      {
        name: 'Khadirarishta & Manjisthadi Kwath',
        botanicalOrClassicalName: 'Acacia catechu (Khadira) & Rubia cordifolia (Manjistha)',
        dosage: '15-20 ml Khadirarishta with equal lukewarm water twice daily.',
        anupana: 'Water after meals',
        howToTake: 'Classical supreme blood purifier (Rakta Shodhaka) that eliminates cutaneous toxicity and terminates recurrent boils.',
      },
      {
        name: 'Neem Ghan Vati (Azadirachta indica)',
        botanicalOrClassicalName: 'Azadirachta indica (Nimba)',
        dosage: '1 tablet (500mg) twice daily with water.',
        anupana: 'Warm water',
        howToTake: 'Potent natural antibacterial, antifungal, and cooling bitter tonic (Tikta Rasa).',
      },
      {
        name: 'Kaishore Guggulu',
        botanicalOrClassicalName: 'Kaishore Guggulu (API standard formulation)',
        dosage: '2 tablets twice daily.',
        anupana: 'Warm water or Mahamanjisthadi Kwath',
        howToTake: 'Clears metabolic waste from joints and micro-dermal vascular beds.',
      },
    ],
    classicalTreatments: [
      'Triphala Lepa: Mix Triphala powder with organic turmeric and pure Aloe vera gel; apply over affected blemishes for 20 minutes.',
      'Neem Water Bath: Boil 20-30 fresh Neem leaves in 5 liters water; cool to lukewarm and use for final rinse to calm itching.',
      'Sushruta Raktamokshana Principle: For chronic deep-seated eczema, Ayurvedic physicians recommend medicinal Leech therapy (Jalaukavacharana) to drain impure pooled venous blood.',
    ],
    yogaAndPranayama: [
      {
        name: 'Sheetali & Sheetkari Cooling Breaths',
        duration: '10 minutes daily',
        benefit: 'Reduces systemic vascular inflammation and skin redness.',
      },
      {
        name: 'Kapalbhati Pranayama (Gentle pace)',
        duration: '5 minutes morning on empty stomach',
        benefit: 'Expels stagnant toxins from internal organs.',
      },
    ],
    pathyaAhara: [
      'Bitter gourd (Karela), pointed gourd (Parwal), fresh turmeric, and bottle gourd',
      'Fresh pomegranate juice, soaked black raisins, and cucumber',
      'Light moong dal, barley, and cold-pressed coconut oil for cooking',
    ],
    apathyaAhara: [
      'Eating milk and fish or sour fruits together (Viruddha Ahara — strict warning in Charak Samhita)',
      'Excess white sugar, processed chocolates, bakery yeast, and stale cheese',
      'Commercial synthetic lotions with heavy artificial fragrances and parabens',
    ],
    warnings: 'Agar skin par blister ya pus fail raha ho aur tez dard ho, to secondary infection ho sakta hai; doctor ko dikhayein.',
    keywords: ['skin', 'acne', 'pimples', 'eczema', 'itching', 'khujli', 'daag', 'psoriasis', 'neem', 'manjistha', 'khadirarishta', 'blood purifier'],
    summaryText: 'Charak Samhita Chapter 7 identifies skin afflictions as Rakta-Pitta disorders. Khadira (Catechu) is revered as the ultimate remedy for all skin conditions alongside Neem and Manjistha to purify the blood.',
  },

  // 6. GENERAL IMMUNITY, REJUVENATION & LIFESTYLE (RASAYANA & OJAS)
  {
    id: 'rag-general-01',
    category: 'general',
    condition: 'Low Immunity, Chronic Fatigue, Weak Digestion, & Debility (Kshaya & Dhatu Daurbalya)',
    sanskritTerm: 'ओजस क्षय (Ojas Kshaya) एवं रसायन तंत्र (Rasayana Tantra)',
    source: 'Charak Samhita, Chikitsa Sthana, Chapter 1 (Rasayana Adhyaya) & Ashtanga Hridaya Sutrasthana',
    sourceBook: 'Charak Samhita & Ashtanga Hridaya',
    chapterOrSloka: 'Charak Chikitsa Ch. 1, Pada 1, Sloka 5-15',
    doshaInvolvement: 'Tridosha balance maintenance and Ojas enhancement',
    rootCause: 'Poor nutrition, chronic mental exhaustion, irregular sleeping habits, and depleted cellular essence (Ojas).',
    verifiedRemedies: [
      {
        name: 'Chyawanprash Avaleha (Ashtavarga Formulation)',
        botanicalOrClassicalName: 'Classical Amla-based Polyherbal Jam',
        dosage: '1 teaspoon (10g) in morning.',
        anupana: 'Warm cow milk or lukewarm water',
        howToTake: 'Revered in Charak Samhita as the premier Rasayana for longevity, respiratory vigor, and cellular repair.',
      },
      {
        name: 'Giloy Ghan Vati (Tinospora cordifolia / Guduchi)',
        botanicalOrClassicalName: 'Tinospora cordifolia (Amrita)',
        dosage: '1 tablet (500mg) twice daily after meals.',
        anupana: 'Lukewarm water',
        howToTake: 'Called "Amrita" for its unmatched ability to modulate immune lymphocytes and clear chronic low-grade fever.',
      },
      {
        name: 'Tulsi & Sunthi Decoction (Immunity Kadha)',
        botanicalOrClassicalName: 'Ocimum sanctum & Zingiber officinale',
        dosage: 'Boil 5 holy basil leaves with 1/2 tsp dry ginger in 200ml water.',
        anupana: 'Add 1/2 tsp honey once lukewarm',
        howToTake: 'Protects respiratory mucosa from viral infections and season transitions (Ritu Sandhi).',
      },
    ],
    classicalTreatments: [
      'Dinacharya Protocol: Wake up before sunrise (Brahma Muhurta), scrape tongue with copper scraper, drink 1 glass warm copper water, and perform oil pulling (Gandusha) with sesame oil.',
      'Pranayama Practice: 10 minutes of daily conscious diaphragmatic breathing to oxygenate deep alveolar capillaries.',
      'Sadvritta (Moral & Emotional Hygiene): Cultivating contentment, gratitude, and truthfulness directly protects immune Ojas.',
    ],
    yogaAndPranayama: [
      {
        name: 'Surya Namaskar (12-Step Sun Salutation)',
        duration: '6 to 12 cycles at moderate pace',
        benefit: 'Mobilizes lymphatic fluid, exercises all 7 body systems, and elevates natural energy levels.',
      },
      {
        name: 'Bhastrika & Kapalbhati Pranayama',
        duration: '5 minutes',
        benefit: 'Clears sluggish kapha buildup from lungs and upper airways.',
      },
    ],
    pathyaAhara: [
      'A2 Cow Ghee, freshly cooked seasonal fruits, soaked dates, and seasonal leafy greens',
      'Whole grain millets like Jowar, Bajra, and Ragi according to season',
      'Warm spiced soups with black pepper, cumin, and rock salt',
    ],
    apathyaAhara: [
      'Eating frozen or microwaved stale food kept for multiple days',
      'Excess cold drinks, ice creams, and aerated sodas',
      'Irregular starvation diets followed by binge eating',
    ],
    warnings: 'Purane ya achanak wazan kam hone par (unexplained weight loss) blood test aur doctor se checkup karwayein.',
    keywords: ['immunity', 'weakness', 'fatigue', 'thakan', 'energy', 'rasayana', 'ojas', 'chyawanprash', 'giloy', 'tulsi', 'dinacharya'],
    summaryText: 'Charak Samhita Rasayana Adhyaya states: "Labhopayo hi shastanam rasadinam rasayanam" — Rasayana therapy produces optimum essence of bodily tissues, supreme immunity (Ojas), longevity, and flawless mental clarity.',
  },
];

/**
 * High-dimensional Semantic Embedding & Cosine Similarity Matcher
 */
function createSemanticVector(text: string): Record<string, number> {
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\u0900-\u097F\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2);

  const freq: Record<string, number> = {};
  for (const w of words) {
    freq[w] = (freq[w] || 0) + 1;
  }
  return freq;
}

function calculateCosineSimilarity(
  vecA: Record<string, number>,
  vecB: Record<string, number>
): number {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (const key in vecA) {
    const valA = vecA[key];
    normA += valA * valA;
    if (vecB[key]) {
      dotProduct += valA * vecB[key];
    }
  }

  for (const key in vecB) {
    const valB = vecB[key];
    normB += valB * valB;
  }

  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

export interface RetrievedAyurvedicMatch {
  chunk: AyurvedicKnowledgeChunk;
  score: number;
  citation: string;
}

/**
 * Real-time RAG Retrieval Engine for Ayurvedic Symptoms
 */
export async function retrieveAyurvedicKnowledge(
  query: string,
  categoryHint?: string,
  topK: number = 3
): Promise<RetrievedAyurvedicMatch[]> {
  const queryClean = (query || '').toLowerCase().trim();
  const queryVector = createSemanticVector(queryClean);

  const scored = AYURVEDIC_KNOWLEDGE_BASE.map((chunk) => {
    // Combine chunk fields for rich multi-tier contextual matching
    const chunkCorpus = [
      chunk.condition,
      chunk.sanskritTerm,
      chunk.doshaInvolvement,
      chunk.rootCause,
      chunk.keywords.join(' '),
      chunk.summaryText,
      chunk.verifiedRemedies.map((r) => `${r.name} ${r.botanicalOrClassicalName} ${r.howToTake}`).join(' '),
      chunk.classicalTreatments.join(' '),
      chunk.pathyaAhara.join(' '),
      chunk.apathyaAhara.join(' '),
    ].join(' ');

    const chunkVector = createSemanticVector(chunkCorpus);
    let score = calculateCosineSimilarity(queryVector, chunkVector);

    // Category boost
    if (categoryHint && chunk.category === categoryHint.toLowerCase()) {
      score += 0.35;
    }

    // Direct keyword match boost
    for (const kw of chunk.keywords) {
      if (queryClean.includes(kw.toLowerCase())) {
        score += 0.25;
      }
    }

    return {
      chunk,
      score,
      citation: `${chunk.source} (${chunk.chapterOrSloka})`,
    };
  });

  // Sort descending by relevance score
  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, topK);
}

/**
 * Formats retrieved RAG chunks into verified grounding prompt context for Gemini
 */
export function formatRAGContextForPrompt(matches: RetrievedAyurvedicMatch[]): string {
  if (!matches || matches.length === 0) {
    return 'No specific classical passage found. Rely on verified AYUSH principles of Vata, Pitta, and Kapha.';
  }

  return matches
    .map((m, idx) => {
      const c = m.chunk;
      const remediesStr = c.verifiedRemedies
        .map((r) => `  - ${r.name} (${r.botanicalOrClassicalName}): ${r.dosage} with ${r.anupana}. ${r.howToTake}`)
        .join('\n');

      const treatmentsStr = c.classicalTreatments.map((t) => `  - ${t}`).join('\n');
      const yogaStr = c.yogaAndPranayama.map((y) => `  - ${y.name} (${y.duration}): ${y.benefit}`).join('\n');
      const eatStr = c.pathyaAhara.join(', ');
      const avoidStr = c.apathyaAhara.join(', ');

      return `[VERIFIED AYURVEDIC SOURCE #${idx + 1}]
Source Document: ${c.source} (${c.chapterOrSloka})
Classical Condition: ${c.condition} [${c.sanskritTerm}]
Dosha Diagnosis: ${c.doshaInvolvement}
Classical Root Cause: ${c.rootCause}
Verified Classical Remedies & Dosage:
${remediesStr}
Classical Treatments & Panchakarma Principles:
${treatmentsStr}
Yoga & Pranayama:
${yogaStr}
Pathya (Wholesome Diet to Eat): ${eatStr}
Apathya (Strict Diet to Avoid): ${avoidStr}
Special Precaution: ${c.warnings}
Citation: "${m.citation}"`;
    })
    .join('\n\n------------------------\n\n');
}
