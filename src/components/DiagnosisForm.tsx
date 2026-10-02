import React, { useState, useRef } from 'react';
import { HealthCategory, SeverityLevel, AppLanguage, SymptomInput } from '../types';
import { CATEGORY_INFO } from '../data/mockData';
import {
  Upload,
  X,
  Mic,
  MicOff,
  Sparkles,
  Info,
  Clock,
  Activity,
  FileText,
  AlertCircle,
  Camera,
  Languages,
} from 'lucide-react';
import { ChotelalAvatar } from './ChotelalAvatar';
import { InteractiveBodyDiagram } from './InteractiveBodyDiagram';

interface DiagnosisFormProps {
  selectedCategory: HealthCategory;
  onSelectCategory: (cat: HealthCategory) => void;
  onSubmit: (input: SymptomInput) => void;
  isLoading: boolean;
  currentLanguage: AppLanguage;
}

export const DiagnosisForm: React.FC<DiagnosisFormProps> = ({
  selectedCategory,
  onSelectCategory,
  onSubmit,
  isLoading,
  currentLanguage,
}) => {
  const [symptoms, setSymptoms] = useState('');
  const [duration, setDuration] = useState('1 to 2 weeks');
  const [severity, setSeverity] = useState<SeverityLevel>('moderate');
  const [sittingHours, setSittingHours] = useState(8);
  const [stressLevel, setStressLevel] = useState<'low' | 'moderate' | 'high'>('moderate');
  const [waterIntake, setWaterIntake] = useState(2.5);
  const [dietType, setDietType] = useState<'vegetarian' | 'non_vegetarian' | 'vegan'>('vegetarian');

  // Image upload state
  const [imageBase64, setImageBase64] = useState<string | undefined>(undefined);
  const [imageName, setImageName] = useState<string | undefined>(undefined);
  const [imageMimeType, setImageMimeType] = useState<string>('image/jpeg');

  // Speech-to-text "बोलकर बताओ" (Web Speech API) with Hindi/English toggle
  const [isListening, setIsListening] = useState(false);
  const [voiceSpeechLang, setVoiceSpeechLang] = useState<'hi-IN' | 'en-IN'>('hi-IN');
  const [speechInterim, setSpeechInterim] = useState('');
  const recognitionRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeCategoryInfo = CATEGORY_INFO[selectedCategory];

  // Quick symptoms presets for active category
  const symptomPresets = {
    piles_sitting: [
      'शौच के समय तेज दर्द व खून (Bleeding Piles)',
      'गुदा पर मस्से व सूजन (Anal Swelling)',
      'घंटों कुर्सी पर बैठने से टेलबोन/कमर में अकड़न (Tailbone sitting pain)',
      'पुरानी कब्ज व मल त्याग में खिंचाव (Severe Constipation)',
      'कांच जैसा चुभन व जलन (Anal Fissure Cut)',
    ],
    mental_health: [
      'रात को नींद नहीं आती, मन में बेचैनी (Insomnia & Racing thoughts)',
      'अचानक दिल की धड़कन तेज होना व घबराहट (Panic & Anxiety)',
      'काम में फोकस नहीं बनता, हमेशा थकान (Brain Fog & Burnout)',
      'छोटी-छोटी बातों पर गुस्सा व चिड़चिड़ापन (Mood Swings)',
    ],
    hair_growth: [
      'कंघी और तकिए पर गुच्छे में बाल गिरना (Severe Hair Fall)',
      'सिर के बीच में मांग चौड़ी हो रही है (Thinning & Crown Widening)',
      'जिद्दी डैंड्रफ, पपड़ी व स्कैल्प पर खुजली (Itchy Dandruff Flakes)',
      'कम उम्र में ही बाल सफेद होना (Premature Greying)',
    ],
    general: [
      'हल्का बुखार, बदन दर्द और ठंड लगना (Viral Fever & Body Ache)',
      'सीने में तेज जलन, खट्टी डकारें (Acid Reflux & GERD)',
      'पेट में भारीपन, गैस और अपच (Stomach Gas & Bloating)',
      'घुटनों और उंगलियों के जोड़ों में सुबह दर्द (Joint Pain)',
    ],
  }[selectedCategory];

  const handleAddSymptomPreset = (presetText: string) => {
    if (!symptoms) {
      setSymptoms(presetText);
    } else if (!symptoms.includes(presetText)) {
      setSymptoms(`${symptoms}, ${presetText}`);
    }
  };

  // Image Upload handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('कृपया 10MB से छोटी तस्वीर अपलोड करें।');
        return;
      }
      setImageName(file.name);
      setImageMimeType(file.type || 'image/jpeg');

      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageBase64(undefined);
    setImageName(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Speech-to-text handler (Web Speech API) with Hindi/English toggle
  const toggleVoiceRecording = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('आपके ब्राउज़र में वॉइस इनपुट समर्थित नहीं है। कृपया टाइप करें या Chrome / Edge का उपयोग करें।');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      setSpeechInterim('');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = voiceSpeechLang;
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsListening(true);
        setSpeechInterim('');
      };

      recognition.onresult = (event: any) => {
        let interimText = '';
        let finalText = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const t = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalText += t + ' ';
          } else {
            interimText += t;
          }
        }

        if (finalText) {
          setSymptoms((prev) => (prev ? `${prev.trim()}, ${finalText.trim()}` : finalText.trim()));
          setSpeechInterim('');
        } else if (interimText) {
          setSpeechInterim(interimText);
        }
      };

      recognition.onerror = (e: any) => {
        console.warn('SpeechRecognition error:', e);
        setIsListening(false);
        setSpeechInterim('');
      };

      recognition.onend = () => {
        setIsListening(false);
        setSpeechInterim('');
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      console.warn('SpeechRecognition start error:', e);
      setIsListening(false);
      setSpeechInterim('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim() && !imageBase64) {
      alert('कृपया अपनी समस्या के कुछ लक्षण लिखें या कोई फोटो/रिपोर्ट अपलोड करें।');
      return;
    }

    onSubmit({
      category: selectedCategory,
      symptoms: symptoms.trim(),
      duration,
      severity,
      lifestyle: {
        sittingHours,
        stressLevel,
        waterIntakeLiters: waterIntake,
        dietType,
      },
      imageBase64,
      imageName,
      language: currentLanguage,
    });
  };

  return (
    <section id="symptom-checker" className="py-12 bg-white scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-2">
            <Activity className="w-3.5 h-3.5 text-orange-600" />
            <span>AI स्वास्थ्य परामर्श इंजन</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            छोटेलाल जी से अपनी समस्या साझा करें
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            लक्षण बताएं या फोटो/रिपोर्ट अपलोड करें — AI तुरंत संभावित बीमारी, 7-दिन का डाइट चार्ट, पर्चा और डॉक्टर गाइड बताएगा।
          </p>
        </div>

        {/* Category Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
          {(
            [
              { id: 'piles_sitting', label: 'बवासीर व सिटिंग', icon: '🪑' },
              { id: 'mental_health', label: 'तनाव व नींद', icon: '🧠' },
              { id: 'hair_growth', label: 'हेयर फॉल व डैंड्रफ', icon: '🌿' },
              { id: 'general', label: 'बुखार व सामान्य', icon: '🩺' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectCategory(tab.id)}
              className={`p-3 rounded-xl border-2 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                selectedCategory === tab.id
                  ? 'border-orange-600 bg-orange-50 text-orange-900 shadow-xs ring-1 ring-orange-600/30'
                  : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Interactive Human Body Diagram */}
        <div className="mb-6">
          <InteractiveBodyDiagram
            onAddSymptom={handleAddSymptomPreset}
            selectedSymptomsText={symptoms}
          />
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl border-2 border-amber-200/90 shadow-xl overflow-hidden">
          {/* Form Header Info Banner */}
          <div className="bg-gradient-to-r from-amber-600 to-orange-600 px-6 py-3.5 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs sm:text-sm font-bold">
                चयनित: {activeCategoryInfo.hindiTitle} ({activeCategoryInfo.title})
              </span>
            </div>
            <span className="text-[11px] bg-white/20 px-2 py-0.5 rounded-md font-medium">
              गोपनीय व सुरक्षित 🔒
            </span>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            {/* Quick Presets */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                त्वरित लक्षण चुनें (Click to Add Common Symptoms):
              </label>
              <div className="flex flex-wrap gap-2">
                {symptomPresets?.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleAddSymptomPreset(preset)}
                    className="text-xs bg-slate-100 hover:bg-orange-100 text-slate-700 hover:text-orange-900 font-semibold px-3 py-1.5 rounded-lg border border-slate-200 hover:border-orange-300 transition-all text-left"
                  >
                    + {preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Symptoms Text Area with 🎤 Bolkar Batao Button & Language Toggle */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <label className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-orange-600" />
                  <span>अपनी बीमारी या तकलीफ का विस्तार से वर्णन करें:</span>
                </label>

                {/* Bolkar Batao Controls */}
                <div className="flex items-center gap-2">
                  {/* Hindi / English Language Toggle */}
                  <div className="inline-flex rounded-lg border border-slate-300 bg-slate-100 p-0.5 text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => setVoiceSpeechLang('hi-IN')}
                      className={`px-2 py-0.5 rounded-md transition-all ${
                        voiceSpeechLang === 'hi-IN'
                          ? 'bg-orange-600 text-white shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                      title="हिन्दी में बोलें"
                    >
                      🇮🇳 हिन्दी
                    </button>
                    <button
                      type="button"
                      onClick={() => setVoiceSpeechLang('en-IN')}
                      className={`px-2 py-0.5 rounded-md transition-all ${
                        voiceSpeechLang === 'en-IN'
                          ? 'bg-orange-600 text-white shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                      title="Speak in English"
                    >
                      🇬🇧 English
                    </button>
                  </div>

                  {/* 🎤 Bolkar Batao Button */}
                  <button
                    type="button"
                    onClick={toggleVoiceRecording}
                    className={`text-xs font-black px-3.5 py-1.5 rounded-xl border flex items-center gap-2 transition-all shadow-xs ${
                      isListening
                        ? 'bg-red-600 text-white border-red-700 animate-pulse ring-2 ring-red-300'
                        : 'bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white border-orange-600'
                    }`}
                    title="माइक पर बोलकर लक्षण बताएं"
                  >
                    {isListening ? (
                      <>
                        <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                        <MicOff className="w-3.5 h-3.5" />
                        <span>रोकें (Stop Listening)</span>
                      </>
                    ) : (
                      <>
                        <Mic className="w-3.5 h-3.5 text-white" />
                        <span>🎤 बोलकर बताओ</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Real-time speaking banner */}
              {isListening && (
                <div className="mb-2 px-3 py-2 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-bold flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
                    <span>
                      {voiceSpeechLang === 'hi-IN'
                        ? 'सुन रहा हूँ... अपनी तकलीफ खुलकर बोलिए'
                        : 'Listening... speak your symptoms freely'}
                    </span>
                  </div>
                  {speechInterim && (
                    <span className="italic text-slate-600 font-normal truncate max-w-[200px]">
                      "{speechInterim}"
                    </span>
                  )}
                </div>
              )}

              <textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="उदा. पिछले 1 हफ्ते से शौच के समय जलन होती है और कुर्सी पर 2 घंटे से ज्यादा नहीं बैठ पाता। पेट भी साफ नहीं रहता..."
                rows={4}
                className="w-full p-4 rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-sm sm:text-base text-slate-800 placeholder-slate-400 outline-hidden transition-all resize-y"
              />
              <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1">
                <span>आप हिन्दी, English या Hinglish किसी भी भाषा में बोलकर या लिखकर बता सकते हैं।</span>
                <span className="font-bold text-slate-400">
                  {symptoms.length} अक्षर
                </span>
              </div>
            </div>

            {/* Severity and Duration Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Severity Level */}
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  तकलीफ का स्तर (Severity):
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(
                    [
                      { id: 'mild', label: 'हल्का (Mild)', color: 'emerald' },
                      { id: 'moderate', label: 'मध्यम (Moderate)', color: 'amber' },
                      { id: 'severe', label: 'गंभीर (Severe)', color: 'red' },
                    ] as const
                  ).map((lvl) => (
                    <button
                      key={lvl.id}
                      type="button"
                      onClick={() => setSeverity(lvl.id)}
                      className={`py-2 px-2 rounded-xl text-xs font-bold border-2 transition-all ${
                        severity === lvl.id
                          ? 'border-orange-600 bg-orange-50 text-orange-950 shadow-xs'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {lvl.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  यह तकलीफ कब से है? (Duration):
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-xs sm:text-sm font-semibold text-slate-800 bg-white outline-hidden"
                  >
                    <option value="1 to 3 days">1 से 3 दिन (Recent)</option>
                    <option value="1 to 2 weeks">1 से 2 हफ्ते (1-2 Weeks)</option>
                    <option value="1 to 3 months">1 से 3 महीने (1-3 Months)</option>
                    <option value="More than 6 months">6 महीने या इससे अधिक (Chronic)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Lifestyle Factors (Especially for Piles & Sitting) */}
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-4">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                <Info className="w-4 h-4 text-orange-600" />
                <span>जीवनशैली कारक (आयुर्वेदिक वात-पित्त परीक्षण के लिए महत्वपूर्ण):</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Sitting Hours */}
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>रोजाना सिटिंग (बैठना):</span>
                    <span className="text-orange-700">{sittingHours} घंटे/दिन</span>
                  </div>
                  <input
                    type="range"
                    min={2}
                    max={14}
                    value={sittingHours}
                    onChange={(e) => setSittingHours(Number(e.target.value))}
                    className="w-full accent-orange-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>2 घंटे</span>
                    <span>8 घंटे (डेस्क)</span>
                    <span>14 घंटे</span>
                  </div>
                </div>

                {/* Daily Water */}
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>दैनिक पानी सेवन:</span>
                    <span className="text-blue-700">{waterIntake} लीटर</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    step={0.5}
                    value={waterIntake}
                    onChange={(e) => setWaterIntake(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>1L (कम)</span>
                    <span>2.5L</span>
                    <span>5L</span>
                  </div>
                </div>

                {/* Stress Level */}
                <div>
                  <span className="block text-xs font-bold text-slate-700 mb-1">
                    मानसिक तनाव का स्तर:
                  </span>
                  <div className="grid grid-cols-3 gap-1">
                    {(['low', 'moderate', 'high'] as const).map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setStressLevel(s)}
                        className={`py-1 rounded-md text-[11px] font-bold border ${
                          stressLevel === s
                            ? 'bg-amber-600 text-white border-amber-700'
                            : 'bg-white text-slate-700 border-slate-300'
                        }`}
                      >
                        {s === 'low' ? 'कम' : s === 'moderate' ? 'मध्यम' : 'ज्यादा'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Photo / Prescription / Lab Report Upload Section */}
            <div>
              <label className="block text-sm font-black text-slate-900 mb-1 flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-orange-600" />
                <span>तस्वीर या रिपोर्ट अपलोड करें (Photo / Prescription / Area / Report):</span>
                <span className="text-xs font-normal text-slate-500">(वैकल्पिक / Optional)</span>
              </label>

              {!imageBase64 ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-300 hover:border-orange-500 rounded-2xl p-6 text-center cursor-pointer transition-all hover:bg-orange-50/30 group"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div className="w-12 h-12 mx-auto rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <Upload className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-bold text-slate-700">
                    यहाँ क्लिक करके फोटो या मेडिकल रिपोर्ट अपलोड करें
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    स्कैल्प/बाल, जीभ की स्थिति, सिटिंग पोस्चर, पुरानी पर्ची या ब्लड टेस्ट रिपोर्ट (PNG, JPG)
                  </p>
                </div>
              ) : (
                <div className="relative rounded-2xl border-2 border-emerald-500 bg-emerald-50/40 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={imageBase64}
                      alt="Uploaded preview"
                      className="w-16 h-16 object-cover rounded-xl border border-slate-300 shadow-xs"
                    />
                    <div>
                      <span className="text-xs font-bold text-emerald-800 block">
                        तस्वीर सफलतापूर्वक संलग्न ✓
                      </span>
                      <p className="text-xs text-slate-600 truncate max-w-xs">{imageName}</p>
                      <span className="text-[10px] text-slate-400">
                        AI विजन मॉडल इस तस्वीर का सटीक विश्लेषण करेगा।
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="p-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                    title="हटाएं"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Disclaimer Alert */}
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>छोटेलाल जी का डिस्क्लेमर:</strong> यह AI प्लेटफॉर्म पारंपरिक आयुर्वेदिक सिद्धांतों व साक्ष्य-आधारित स्वास्थ्य जानकारी प्रदान करता है। अत्यधिक आपात स्थिति में तुरंत निकटतम अस्पताल जाएं।
              </span>
            </div>

            {/* Big Action Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 px-6 rounded-2xl text-white font-extrabold text-base sm:text-lg shadow-xl transition-all flex items-center justify-center gap-3 ${
                isLoading
                  ? 'bg-slate-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 shadow-orange-500/30 hover:scale-[1.01]'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                  <span>छोटेलाल जी आपके लक्षणों का विश्लेषण कर रहे हैं...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>छोटेलाल जी से AI निदान एवं उपचार प्राप्त करें</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Loading Mascot Dialogue */}
        {isLoading && (
          <div className="mt-8 text-center bg-white p-6 rounded-2xl border-2 border-amber-300 shadow-lg animate-pulse">
            <div className="flex justify-center mb-3">
              <ChotelalAvatar size="lg" expression="thinking" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              "बेटा, 1 मिनट दो... मैं आपकी समस्या और वात-पित्त की स्थिति देख रहा हूँ!"
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              आयुर्वेदिक संहिताओं, एर्गोनॉमिक सिटिंग व क्लिनिकल डेटा से सबसे उपयुक्त उपाय तैयार हो रहा है...
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
