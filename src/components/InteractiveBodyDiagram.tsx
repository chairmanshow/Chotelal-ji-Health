import React, { useState } from 'react';
import {
  Activity,
  CheckCircle2,
  Plus,
  Sparkles,
  Info,
  Flame,
  Brain,
  ChevronRight,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';

interface BodyPart {
  id: string;
  nameHindi: string;
  nameEnglish: string;
  dosha: string;
  color: string;
  x: number; // percentage on SVG
  y: number; // percentage on SVG
  radius: number;
  symptoms: string[];
}

const BODY_PARTS: BodyPart[] = [
  {
    id: 'head',
    nameHindi: 'सिर एवं स्कैल्प (Head & Scalp)',
    nameEnglish: 'Head, Scalp & Mind',
    dosha: 'शिरोगत वात-पित्त',
    color: '#F59E0B',
    x: 50,
    y: 11,
    radius: 7,
    symptoms: [
      'गुच्छों में बाल झड़ना व गंजापन (Severe Hair Fall)',
      'जिद्दी रूसी, स्कैल्प में पपड़ी व खुजली (Dandruff & Itch)',
      'आधा सीसी सिरदर्द या माइग्रेन (Migraine & Headache)',
      'रात को नींद न आना व बेचैनी (Insomnia & Racing Thoughts)',
      'तनाव, काम में फोकस न होना (Mental Fog & Anxiety)',
    ],
  },
  {
    id: 'eyes_face',
    nameHindi: 'आंखें व चेहरा (Eyes & Face)',
    nameEnglish: 'Eyes, Vision & Facial Skin',
    dosha: 'आलोचक पित्त एवं भ्राजक पित्त',
    color: '#EC4899',
    x: 50,
    y: 17,
    radius: 5,
    symptoms: [
      'स्क्रीन देखने से आंखों में सूखापन व जलन (Dry Eyes & Strain)',
      'चेहरे पर कील-मुंहासे व लाल दाने (Pimples & Acne)',
      'आंखों के नीचे काले घेरे (Dark Circles & Fatigue)',
      'चेहरे पर झुर्रियां या असमय ढीलापन (Dull Skin)',
    ],
  },
  {
    id: 'neck',
    nameHindi: 'गला एवं थायरॉयड (Throat & Thyroid)',
    nameEnglish: 'Throat, Vocal & Thyroid',
    dosha: 'उदान वात एवं बोधक कफ',
    color: '#8B5CF6',
    x: 50,
    y: 23,
    radius: 5,
    symptoms: [
      'गले में लगातार खराश व कफ अटकना (Throat Phlegm)',
      'थायरॉयड असंतुलन व वजन बढ़ना/घटना (Thyroid Imbalance)',
      'आवाज बैठना या सूखी खांसी (Dry Cough & Hoarseness)',
      'गर्दन की नसों में अकड़न व दर्द (Cervical Stiffness)',
    ],
  },
  {
    id: 'chest',
    nameHindi: 'छाती एवं श्वसन (Chest & Heart)',
    nameEnglish: 'Chest, Respiration & Heart',
    dosha: 'प्राण वात एवं अवलम्बक कफ',
    color: '#EF4444',
    x: 50,
    y: 33,
    radius: 8,
    symptoms: [
      'सीने में तेज जलन व खट्टी डकारें (GERD & Heartburn)',
      'सीढ़ियां चढ़ने पर सांस फूलना (Breathlessness on Exertion)',
      'अचानक दिल की धड़कन तेज होना व घबराहट (Palpitations)',
      'छाती में भारीपन व बलगम का जमाव (Chest Congestion)',
    ],
  },
  {
    id: 'stomach',
    nameHindi: 'पेट एवं पाचन (Stomach & Gut)',
    nameEnglish: 'Stomach, Digestion & Liver',
    dosha: 'समान वात एवं पाचक पित्त (मंदाग्नि)',
    color: '#10B981',
    x: 50,
    y: 45,
    radius: 9,
    symptoms: [
      'खाना खाने के तुरंत बाद पेट फूलना व भारी गैस (Bloating & Gas)',
      'पुरानी कब्ज व मल त्याग में अत्यधिक जोर लगाना (Constipation)',
      'नाभि डिगना या नाभि के आसपास ऐंठन (Navel Displacement)',
      'एसिडिटी, पेट में गुड़गुड़ाहट व कच्ची डकारें (Acid Indigestion)',
      'आंतों में सूजन व आईबीएस (IBS / Mucus in Stool)',
    ],
  },
  {
    id: 'pelvic',
    nameHindi: 'गुदा एवं पेल्विक (Anorectal & Pelvis)',
    nameEnglish: 'Anorectal Piles, Fissure & Pelvic Floor',
    dosha: 'अपान वायु अवरोध एवं रक्त-पित्त',
    color: '#EA580C',
    x: 50,
    y: 56,
    radius: 8,
    symptoms: [
      'शौच के समय तेज दर्द व खून गिरना (Bleeding Piles / Arsha)',
      'गुदा द्वार पर बाहरी मस्से व सूजन (External Piles Lumps)',
      'कांच की तरह चुभन व घंटों जलन (Anal Fissure Cut)',
      'कुर्सी पर बैठने में टेलबोन व गुदा में तेज दर्द (Sitting Pain)',
      'बार-बार पेशाब की हाजत या जलन (Pelvic & Urinary Burn)',
    ],
  },
  {
    id: 'back',
    nameHindi: 'कमर, रीढ़ व टेलबोन (Back & Spine)',
    nameEnglish: 'Spine, Coccyx & Lower Back',
    dosha: 'कटिगत अपान वात',
    color: '#6366F1',
    x: 50,
    y: 50,
    radius: 7,
    symptoms: [
      '8 घंटे कुर्सी पर बैठने से लोअर बैक में तेज दर्द (Desk Back Pain)',
      'टेलबोन (रीढ़ की अंतिम हड्डी) में बैठने पर दर्द (Coccygodynia)',
      'कमर से पैर के अंगूठे तक नसों का खिंचाव (Sciatica Nerve Pain)',
      'सुबह उठते ही पीठ में भीषण जकड़न (Morning Spine Stiffness)',
    ],
  },
  {
    id: 'arms',
    nameHindi: 'हाथ, कंधे व कलाई (Arms & Shoulders)',
    nameEnglish: 'Shoulders, Arms & Wrist',
    dosha: 'अंसगत वात (Frozen Shoulder)',
    color: '#06B6D4',
    x: 26,
    y: 38,
    radius: 7,
    symptoms: [
      'कंधे में जकड़न, हाथ ऊपर न उठना (Frozen Shoulder)',
      'माउस/लैपटॉप चलाने से कलाई व उंगलियों में दर्द (Carpal Tunnel)',
      'हाथों में सुन्नपन व चींटियां रेंगने जैसा लगना (Tingling & Numbness)',
      'कोहनी में दर्द (Tennis Elbow & Strain)',
    ],
  },
  {
    id: 'legs',
    nameHindi: 'घुटने, पैर व जोड़ (Legs, Knees & Joints)',
    nameEnglish: 'Knees, Legs, Joints & Uric Acid',
    dosha: 'जानुगत संधिवात एवं आमवात',
    color: '#14B8A6',
    x: 50,
    y: 78,
    radius: 10,
    symptoms: [
      'घुटनों में दर्द, कट-कट की आवाज व सूजन (Knee Arthritis)',
      'यूरिक एसिड बढ़ने से पैर के अंगूठे में जलन व सूजन (Gout Pain)',
      'पिंडलियों में रात को भीषण ऐंठन व खिंचाव (Calf Muscle Cramps)',
      'एड़ी में सुबह जमीन पर पैर रखते ही तेज दर्द (Plantar Heel Pain)',
      'पैरों में भारीपन, नसों का फूलना (Varicose Veins)',
    ],
  },
];

interface InteractiveBodyDiagramProps {
  onAddSymptom: (symptomText: string) => void;
  selectedSymptomsText: string;
}

export const InteractiveBodyDiagram: React.FC<InteractiveBodyDiagramProps> = ({
  onAddSymptom,
  selectedSymptomsText,
}) => {
  const [activePartId, setActivePartId] = useState<string>('pelvic');
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  const activePart = BODY_PARTS.find((p) => p.id === activePartId) || BODY_PARTS[0];

  const handleSelectSymptom = (sym: string) => {
    onAddSymptom(sym);
    setAddedNotice(sym);
    setTimeout(() => {
      setAddedNotice(null);
    }, 2200);
  };

  return (
    <div className="bg-gradient-to-br from-amber-50/60 via-white to-orange-50/40 rounded-3xl p-4 sm:p-6 border-2 border-amber-200/80 shadow-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-amber-200/60">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-black mb-1">
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
            <span>इंटरएक्टिव शारीरिक अंग चयन (Interactive Body Map)</span>
          </div>
          <h4 className="text-base sm:text-lg font-black text-slate-900">
            शरीर के जिस अंग में तकलीफ है, उस पर क्लिक करें
          </h4>
          <p className="text-xs text-slate-500">
            Click on any body part to explore specific Ayurvedic symptoms & auto-fill diagnosis form.
          </p>
        </div>

        {/* Quick horizontal badges on mobile/tablet */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 text-xs">
          <span className="text-[11px] font-bold text-slate-500 whitespace-nowrap">शॉर्टकट:</span>
          {['head', 'chest', 'stomach', 'pelvic', 'legs'].map((partKey) => {
            const p = BODY_PARTS.find((b) => b.id === partKey)!;
            const isCur = activePartId === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setActivePartId(p.id)}
                className={`px-2.5 py-1 rounded-lg font-bold text-[11px] whitespace-nowrap transition-all ${
                  isCur
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-orange-50 border border-slate-200'
                }`}
              >
                {p.nameHindi.split(' ')[0]}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left Column: Anatomical Visual Body Map with Hotspots */}
        <div className="md:col-span-5 flex flex-col items-center justify-center relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-950 p-4 rounded-2xl shadow-inner border border-slate-700/60 min-h-[360px]">
          {/* Subtle status label */}
          <div className="absolute top-3 left-3 bg-slate-800/80 backdrop-blur-xs px-2.5 py-1 rounded-full border border-slate-700 text-[10px] font-bold text-amber-300 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>अंग पर टैप करें (Tap to Select)</span>
          </div>

          {/* SVG Human Figure */}
          <div className="relative w-full max-w-[220px] aspect-[1/2] mx-auto select-none">
            <svg
              viewBox="0 0 100 200"
              className="w-full h-full drop-shadow-xl"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id="bodySkinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#334155" />
                  <stop offset="50%" stopColor="#1E293B" />
                  <stop offset="100%" stopColor="#0F172A" />
                </linearGradient>
                <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Anatomical Human Body Silhouette Paths */}
              {/* Head */}
              <circle cx="50" cy="22" r="13" fill="url(#bodySkinGrad)" stroke="#475569" strokeWidth="1.2" />
              {/* Neck */}
              <path d="M 45 34 L 45 44 L 55 44 L 55 34 Z" fill="url(#bodySkinGrad)" stroke="#475569" strokeWidth="1" />
              {/* Torso & Pelvis */}
              <path
                d="M 32 44 C 28 50, 24 70, 26 95 C 27 108, 33 118, 38 122 L 50 125 L 62 122 C 67 118, 73 108, 74 95 C 76 70, 72 50, 68 44 Z"
                fill="url(#bodySkinGrad)"
                stroke="#475569"
                strokeWidth="1.2"
              />
              {/* Left Arm */}
              <path
                d="M 28 46 C 22 55, 17 72, 15 90 C 14 100, 13 112, 16 116 C 18 118, 22 115, 23 106 C 25 90, 28 72, 32 58 Z"
                fill="url(#bodySkinGrad)"
                stroke="#475569"
                strokeWidth="1"
              />
              {/* Right Arm */}
              <path
                d="M 72 46 C 78 55, 83 72, 85 90 C 86 100, 87 112, 84 116 C 82 118, 78 115, 77 106 C 75 90, 72 72, 68 58 Z"
                fill="url(#bodySkinGrad)"
                stroke="#475569"
                strokeWidth="1"
              />
              {/* Left Leg */}
              <path
                d="M 38 122 C 37 138, 36 156, 38 175 C 38 186, 36 195, 33 198 C 36 200, 42 199, 44 190 C 47 172, 48 152, 48 126 Z"
                fill="url(#bodySkinGrad)"
                stroke="#475569"
                strokeWidth="1.2"
              />
              {/* Right Leg */}
              <path
                d="M 62 122 C 63 138, 64 156, 62 175 C 62 186, 64 195, 67 198 C 64 200, 58 199, 56 190 C 53 172, 52 152, 52 126 Z"
                fill="url(#bodySkinGrad)"
                stroke="#475569"
                strokeWidth="1.2"
              />

              {/* Spine Line */}
              <line x1="50" y1="44" x2="50" y2="124" stroke="#334155" strokeWidth="1" strokeDasharray="2,2" />

              {/* Clickable Hotspot Circles for each body part */}
              {BODY_PARTS.map((part) => {
                const isSelected = activePartId === part.id;
                // Scale SVG coords from 100% to our SVG's 0-100 x 0-200 viewBox
                const cx = part.x;
                const cy = (part.y / 100) * 200;

                return (
                  <g
                    key={part.id}
                    onClick={() => setActivePartId(part.id)}
                    className="cursor-pointer group"
                  >
                    {/* Pulsing ring if selected */}
                    {isSelected && (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={part.radius * 2.2}
                        fill="none"
                        stroke={part.color}
                        strokeWidth="2"
                        className="animate-ping opacity-75 origin-center"
                      />
                    )}

                    {/* Outer glow aura */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isSelected ? part.radius * 1.5 : part.radius * 1.1}
                      fill={part.color}
                      opacity={isSelected ? 0.35 : 0.15}
                      className="transition-all duration-300 group-hover:opacity-40"
                    />

                    {/* Core pin */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={part.radius * 0.9}
                      fill={isSelected ? '#F59E0B' : part.color}
                      stroke="#FFFFFF"
                      strokeWidth={isSelected ? 2 : 1.2}
                      className="transition-all duration-200 shadow-md transform group-hover:scale-110"
                    />

                    {/* Center white dot */}
                    <circle cx={cx} cy={cy} r="2" fill="#FFFFFF" />
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Active selection tag at bottom */}
          <div className="mt-3 text-center">
            <span className="text-xs font-bold text-slate-300">
              चयनित: <span className="text-amber-400 font-black">{activePart.nameHindi.split(' ')[0]}</span>
            </span>
          </div>
        </div>

        {/* Right Column: Symptom Options for Selected Body Part */}
        <div className="md:col-span-7 flex flex-col justify-between">
          <div className="bg-white rounded-2xl p-5 border border-amber-200 shadow-xs">
            {/* Header info of selected part */}
            <div className="flex items-start justify-between gap-3 mb-3 pb-3 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: activePart.color }}
                  />
                  <h5 className="text-base font-black text-slate-900">
                    {activePart.nameHindi}
                  </h5>
                </div>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {activePart.nameEnglish}
                </p>
              </div>

              <div className="text-right">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black">
                  दोष: {activePart.dosha}
                </span>
              </div>
            </div>

            {/* Notification alert on adding */}
            {addedNotice && (
              <div className="mb-3 px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="truncate">"{addedNotice}" फॉर्म में जोड़ दिया गया!</span>
              </div>
            )}

            {/* List of Symptoms to Select */}
            <p className="text-xs font-bold text-slate-600 mb-2 flex items-center justify-between">
              <span>लक्षण पर क्लिक करके फॉर्म में जोड़ें (+):</span>
              <span className="text-[11px] text-amber-700 font-semibold">
                (Click to auto-append)
              </span>
            </p>

            <div className="space-y-2">
              {activePart.symptoms.map((symptom, idx) => {
                const isAlreadyIncluded = selectedSymptomsText.includes(symptom);

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectSymptom(symptom)}
                    className={`w-full text-left p-2.5 sm:p-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all flex items-center justify-between gap-3 group ${
                      isAlreadyIncluded
                        ? 'bg-amber-50/80 border-amber-300 text-amber-900 font-bold'
                        : 'bg-slate-50 hover:bg-orange-50/60 border-slate-200 hover:border-orange-300 text-slate-800'
                    }`}
                  >
                    <span className="leading-snug">{symptom}</span>
                    <span
                      className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                        isAlreadyIncluded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white border border-slate-300 group-hover:border-orange-500 text-slate-500 group-hover:text-orange-600'
                      }`}
                    >
                      {isAlreadyIncluded ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : (
                        <Plus className="w-3.5 h-3.5" />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Switch to next body parts pills */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-bold text-slate-400 mr-1">अन्य अंग:</span>
              {BODY_PARTS.map((part) => (
                <button
                  key={part.id}
                  type="button"
                  onClick={() => setActivePartId(part.id)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                    activePartId === part.id
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {part.nameHindi.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
