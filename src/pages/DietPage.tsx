import React, { useState } from 'react';
import { PageLayout } from '../components/PageLayout';
import {
  Flame,
  Droplets,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Clock,
  Volume2,
  Square,
  Loader2,
  RefreshCw,
  TrendingDown,
  TrendingUp,
  Activity,
  Coffee,
  Sun,
  Sunset,
  Moon,
  CupSoda,
  Apple,
  Salad,
  Info,
  Printer,
  ChevronRight,
} from 'lucide-react';
import { playChotelalVoice, stopChotelalVoice, subscribeVoiceStatus } from '../lib/chotelalVoice';
import { fetchWithFallback } from '../lib/api-config';

interface MealSectionData {
  time: string;
  title: string;
  titleEn: string;
  items: string[];
  calories: string;
  protein?: string;
  ayurvedicBenefit: string;
  bestTime: string;
  tag: string;
}

interface DietPlan {
  goal: string;
  goalTitle: string;
  targetCalories: string;
  waterSchedule: string;
  doshaFocus: string;
  summary: string;
  chotelalPersonalAdvice: string;
  sections: {
    midDayDrinks: MealSectionData;
    breakfast: MealSectionData;
    lunch: MealSectionData;
    snacks: MealSectionData;
    dinner: MealSectionData;
  };
  foodsToFavor: string[];
  foodsToAvoid: string[];
}

export const DietPage: React.FC = () => {
  // Mode: 'expert' (AI Diet Generator) or 'rules' (Dosha Diet Charts & Rules)
  const [activeTab, setActiveTab] = useState<'expert' | 'rules'>('expert');

  // Diet Expert Form State
  const [goal, setGoal] = useState<'weight_loss' | 'weight_gain' | 'normal'>('weight_loss');
  const [currentWeight, setCurrentWeight] = useState<string>('74');
  const [targetWeight, setTargetWeight] = useState<string>('64');
  const [dietType, setDietType] = useState<'veg' | 'non_veg' | 'eggitarian' | 'jain'>('veg');
  const [age, setAge] = useState<string>('28');
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('male');
  const [activityLevel, setActivityLevel] = useState<'sedentary' | 'moderate' | 'active'>('moderate');
  const [healthIssues, setHealthIssues] = useState<string[]>(['gas']);

  // Generation & Results State
  const [isLoading, setIsLoading] = useState(false);
  const [dietResult, setDietResult] = useState<DietPlan | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Subscribe to voice status
  React.useEffect(() => {
    const unsub = subscribeVoiceStatus((speaking) => {
      setIsPlayingAudio(speaking);
    });
    return () => unsub();
  }, []);

  const toggleHealthIssue = (issue: string) => {
    setHealthIssues((prev) =>
      prev.includes(issue) ? prev.filter((i) => i !== issue) : [...prev, issue]
    );
  };

  const handleGenerateDiet = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    stopChotelalVoice();

    try {
      const response = await fetchWithFallback('https://chotelalji-tts.sumitshrivas24.workers.dev/api/diet/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          goal,
          currentWeight: Number(currentWeight) || 70,
          targetWeight: Number(targetWeight) || 62,
          dietType,
          age: Number(age) || 30,
          gender,
          activityLevel,
          healthIssues,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate diet');
      }

      const data = await response.json();
      if (data.success && data.dietPlan) {
        setDietResult(data.dietPlan);
        // Play Chotelal Ji greeting advice
        const speech = `नमस्ते बेटा! आपके लिए यह संपूर्ण 5 चरणों का आहार चार्ट तैयार है। ${data.dietPlan.chotelalPersonalAdvice}`;
        playChotelalVoice(speech);
      }
    } catch (err) {
      console.error('Diet generation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceToggle = () => {
    if (isPlayingAudio) {
      stopChotelalVoice();
    } else if (dietResult) {
      const speech = `नमस्ते बेटा! आपके ${
        dietResult.goal === 'weight_loss'
          ? 'वजन घटाने'
          : dietResult.goal === 'weight_gain'
          ? 'वजन बढ़ाने'
          : 'स्वास्थ्य संतुलन'
      } के लिए मैंने यह विशेष 5 चरणों का आहार चार्ट बनाया है। ${dietResult.chotelalPersonalAdvice}। नाश्ते में ${dietResult.sections.breakfast.titleEn} लें और रात को 8 बजे से पहले हल्का भोजन करें।`;
      playChotelalVoice(speech);
    }
  };

  return (
    <PageLayout
      pageTitle="AI डाइट एक्सपर्ट व संपूर्ण पोषण चार्ट (Diet Expert)"
      pageSubtitle="वजन घटाने (Weight Loss), वजन बढ़ाने (Weight Gain) या स्वस्थ संतुलन के लिए 5-मील आयुर्वेदिक एवं वैज्ञानिक डाइट चार्ट 1 मिनट में पाएं।"
      badge="AI Personalized Diet"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Navigation Tabs between AI Diet Expert and Ayurvedic Rules */}
        <div className="flex items-center justify-center">
          <div className="bg-[#111827] p-1.5 rounded-2xl border border-white/10 flex items-center gap-1 shadow-xl">
            <button
              onClick={() => setActiveTab('expert')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'expert'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(0,212,255,0.4)]'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sparkles className="w-4 h-4 text-cyan-300" />
              <span>AI डाइट एक्सपर्ट (Smart Diet Planner)</span>
            </button>

            <button
              onClick={() => setActiveTab('rules')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'rules'
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Flame className="w-4 h-4 text-orange-400" />
              <span>आयुर्वेदिक आहार नियम व त्रिदोष चार्ट</span>
            </button>
          </div>
        </div>

        {/* TAB 1: AI DIET EXPERT */}
        {activeTab === 'expert' && (
          <div className="space-y-10">
            {/* INTAKE CARD */}
            {!dietResult ? (
              <div className="bg-[#111827] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-[0_0_35px_rgba(0,212,255,0.1)] space-y-8">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <div className="inline-flex items-center gap-2 bg-cyan-500/20 border border-cyan-400/40 px-3.5 py-1 rounded-full text-xs font-bold text-cyan-300 shadow-sm">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>30 वर्षों का आयुर्वेदिक व पोषण अनुभव</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white font-serif tracking-tight">
                    अपनी जरूरत के अनुसार संपूर्ण डाइट तैयार करवाएं
                  </h2>
                  <p className="text-sm text-slate-300">
                    अपना लक्ष्य चुनें और कुछ आवश्यक प्रश्नों के उत्तर दें। AI आपके लिए नाश्ता, दोपहर का भोजन, शाम का स्नैक, रात्रिभोज और मध्याह्न पेय का सटीक चार्ट तैयार करेगा।
                  </p>
                </div>

                <form onSubmit={handleGenerateDiet} className="space-y-8 max-w-4xl mx-auto">
                  {/* QUESTION 1: GOAL SELECTION */}
                  <div className="space-y-3">
                    <label className="block text-sm font-bold text-white uppercase tracking-wider">
                      १. आपका मुख्य लक्ष्य क्या है? (Select Your Primary Goal) *
                    </label>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Weight Loss */}
                      <button
                        type="button"
                        onClick={() => {
                          setGoal('weight_loss');
                          setCurrentWeight('76');
                          setTargetWeight('66');
                        }}
                        className={`p-5 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden group ${
                          goal === 'weight_loss'
                            ? 'bg-gradient-to-br from-emerald-950/60 to-[#111827] border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                            : 'bg-white/5 border-white/10 hover:border-white/20 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
                            <TrendingDown className="w-6 h-6" />
                          </div>
                          {goal === 'weight_loss' && (
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10B981]" />
                          )}
                        </div>
                        <h4 className="text-base font-bold text-white font-serif mb-1">
                          वजन घटाना (Weight Loss)
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          पेट की चर्बी कम करना, मेटाबॉलिज्म तेज करना और हल्का, ऊर्जावान शरीर पाना।
                        </p>
                      </button>

                      {/* Weight Gain */}
                      <button
                        type="button"
                        onClick={() => {
                          setGoal('weight_gain');
                          setCurrentWeight('52');
                          setTargetWeight('64');
                        }}
                        className={`p-5 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden group ${
                          goal === 'weight_gain'
                            ? 'bg-gradient-to-br from-blue-950/60 to-[#111827] border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.3)]'
                            : 'bg-white/5 border-white/10 hover:border-white/20 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400">
                            <TrendingUp className="w-6 h-6" />
                          </div>
                          {goal === 'weight_gain' && (
                            <span className="w-2.5 h-2.5 rounded-full bg-blue-400 shadow-[0_0_8px_#3B82F6]" />
                          )}
                        </div>
                        <h4 className="text-base font-bold text-white font-serif mb-1">
                          वजन बढ़ाना (Weight Gain)
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          मांसपेशियों का विकास, दुर्बलता दूर करना, ओजस और प्राकृतिक बल में वृद्धि।
                        </p>
                      </button>

                      {/* Normal / Fitness Maintenance */}
                      <button
                        type="button"
                        onClick={() => {
                          setGoal('normal');
                          setCurrentWeight('65');
                          setTargetWeight('65');
                        }}
                        className={`p-5 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden group ${
                          goal === 'normal'
                            ? 'bg-gradient-to-br from-purple-950/60 to-[#111827] border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.3)]'
                            : 'bg-white/5 border-white/10 hover:border-white/20 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400">
                            <Activity className="w-6 h-6" />
                          </div>
                          {goal === 'normal' && (
                            <span className="w-2.5 h-2.5 rounded-full bg-purple-400 shadow-[0_0_8px_#A855F7]" />
                          )}
                        </div>
                        <h4 className="text-base font-bold text-white font-serif mb-1">
                          सामान्य संतुलन (Normal Fitness)
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          वर्तमान वजन बनाए रखना, पाचन मजबूत करना और रोग प्रतिरोधक क्षमता बढ़ाना।
                        </p>
                      </button>
                    </div>
                  </div>

                  {/* QUESTION 2: WEIGHT, HEIGHT & DEMOGRAPHICS */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        वर्तमान वजन (Current Weight) *
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          required
                          min="30"
                          max="200"
                          value={currentWeight}
                          onChange={(e) => setCurrentWeight(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 focus:bg-white/10 focus:border-cyan-400 text-white font-bold text-sm focus:outline-hidden"
                        />
                        <span className="absolute right-3.5 top-2.5 text-xs text-slate-400">kg</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        लक्ष्य वजन (Target Weight) *
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          required
                          min="30"
                          max="200"
                          value={targetWeight}
                          onChange={(e) => setTargetWeight(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 focus:bg-white/10 focus:border-cyan-400 text-white font-bold text-sm focus:outline-hidden"
                        />
                        <span className="absolute right-3.5 top-2.5 text-xs text-slate-400">kg</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        आपकी उम्र (Age) *
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          required
                          min="10"
                          max="100"
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 focus:bg-white/10 focus:border-cyan-400 text-white font-bold text-sm focus:outline-hidden"
                        />
                        <span className="absolute right-3.5 top-2.5 text-xs text-slate-400">वर्ष</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        लिंग (Gender) *
                      </label>
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value as any)}
                        className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-[#1F2937] text-white font-medium text-sm focus:border-cyan-400 focus:outline-hidden"
                      >
                        <option value="male">पुरुष (Male)</option>
                        <option value="female">महिला (Female)</option>
                        <option value="other">अन्य (Other)</option>
                      </select>
                    </div>
                  </div>

                  {/* QUESTION 3: DIETARY PREFERENCE (VEG / NON-VEG / EGG / JAIN) */}
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-white uppercase tracking-wider">
                      २. खानपान की प्राथमिकता (Dietary Preference) *
                    </label>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { id: 'veg', label: 'शुद्ध शाकाहारी', sub: 'Vegetarian' },
                        { id: 'non_veg', label: 'मांसाहारी', sub: 'Non-Vegetarian' },
                        { id: 'eggitarian', label: 'अंडा शामिल', sub: 'Eggitarian' },
                        { id: 'jain', label: 'जैन सात्विक', sub: 'No Onion/Garlic' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setDietType(item.id as any)}
                          className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                            dietType === item.id
                              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold shadow-[0_0_12px_rgba(0,212,255,0.3)]'
                              : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/20'
                          }`}
                        >
                          <span className="block text-sm">{item.label}</span>
                          <span className="text-[11px] text-slate-400">{item.sub}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* QUESTION 4: PHYSICAL ACTIVITY & DIGESTIVE ISSUES */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-2">
                        दैनिक शारीरिक गतिविधि (Activity Level)
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'sedentary', label: 'कम (Desk Job)' },
                          { id: 'moderate', label: 'मध्यम (Walks)' },
                          { id: 'active', label: 'सक्रिय (Workout)' },
                        ].map((act) => (
                          <button
                            key={act.id}
                            type="button"
                            onClick={() => setActivityLevel(act.id as any)}
                            className={`p-2.5 rounded-xl border text-xs text-center transition-all cursor-pointer ${
                              activityLevel === act.id
                                ? 'bg-purple-500/20 border-purple-400 text-purple-300 font-bold'
                                : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                            }`}
                          >
                            {act.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-2">
                        पेट या पाचन संबंधी कोई समस्या? (Gut Issues)
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { id: 'gas', label: 'गैस / एसिडिटी' },
                          { id: 'kabz', label: 'कब्ज (Constipation)' },
                          { id: 'piles', label: 'बवासीर / जलन' },
                          { id: 'lethargy', label: 'सुस्ती व भारीपन' },
                          { id: 'none', label: 'कोई समस्या नहीं' },
                        ].map((issue) => (
                          <button
                            key={issue.id}
                            type="button"
                            onClick={() => toggleHealthIssue(issue.id)}
                            className={`px-3 py-1.5 rounded-lg border text-xs transition-all cursor-pointer ${
                              healthIssues.includes(issue.id)
                                ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                                : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                            }`}
                          >
                            {issue.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* SUBMIT BUTTON */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold py-4 px-8 rounded-2xl text-base shadow-[0_0_30px_rgba(0,212,255,0.4)] transition-all cursor-pointer disabled:opacity-50 transform hover:scale-[1.01]"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>छोटेलाल जी आपके लिए परफेक्ट डाइट तैयार कर रहे हैं...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5" />
                          <span>मेरी संपूर्ण 5-मील डाइट तैयार करें (Generate My Diet Plan)</span>
                          <ChevronRight className="w-5 h-5 ml-1" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              /* RESULT VIEW: 5 RICH SECTIONS */
              <div className="space-y-8 animate-fadeIn">
                {/* Result Header & Actions */}
                <div className="bg-[#111827] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-[0_0_35px_rgba(0,212,255,0.15)] flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="space-y-2 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/40 px-3 py-1 rounded-full text-xs font-bold text-emerald-300">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{dietResult.goalTitle}</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-white font-serif">
                      छोटेलाल जी का संपूर्ण आयुर्वेदिक डाइट चार्ट
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                      {dietResult.summary}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 shrink-0">
                    {/* Voice Button */}
                    <button
                      onClick={handleVoiceToggle}
                      className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs transition-all cursor-pointer shadow-lg ${
                        isPlayingAudio
                          ? 'bg-rose-500 text-white animate-pulse shadow-[0_0_15px_rgba(244,63,94,0.5)]'
                          : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 shadow-[0_0_20px_rgba(0,212,255,0.35)]'
                      }`}
                    >
                      {isPlayingAudio ? (
                        <>
                          <Square className="w-4 h-4" />
                          <span>आवाज़ रोकें (Stop)</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-4 h-4" />
                          <span>छोटेलाल जी से सलाह सुनें</span>
                        </>
                      )}
                    </button>

                    {/* Reset Button */}
                    <button
                      onClick={() => setDietResult(null)}
                      className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-slate-300 hover:text-white px-4 py-3 rounded-2xl text-xs font-bold border border-white/10 transition-all cursor-pointer"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>पुनः जांचें</span>
                    </button>
                  </div>
                </div>

                {/* Macro Highlights Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-[#111827] border border-white/10 rounded-2xl p-4 text-center">
                    <span className="text-[11px] font-bold text-slate-400 block uppercase">दैनिक कैलोरी लक्ष्य</span>
                    <span className="text-xl font-bold text-cyan-400 font-mono mt-0.5 block">{dietResult.targetCalories}</span>
                  </div>
                  <div className="bg-[#111827] border border-white/10 rounded-2xl p-4 text-center">
                    <span className="text-[11px] font-bold text-slate-400 block uppercase">दैनिक जल सेवन</span>
                    <span className="text-xl font-bold text-blue-400 font-mono mt-0.5 block">{dietResult.waterSchedule.split(' ')[0]} L</span>
                  </div>
                  <div className="bg-[#111827] border border-white/10 rounded-2xl p-4 text-center">
                    <span className="text-[11px] font-bold text-slate-400 block uppercase">दोष संतुलन</span>
                    <span className="text-sm font-bold text-purple-400 mt-1 block truncate">{dietResult.doshaFocus.split(' ')[0]}</span>
                  </div>
                  <div className="bg-[#111827] border border-white/10 rounded-2xl p-4 text-center">
                    <span className="text-[11px] font-bold text-slate-400 block uppercase">आहार स्वरूप</span>
                    <span className="text-sm font-bold text-emerald-400 mt-1 block uppercase">{dietType} सात्विक</span>
                  </div>
                </div>

                {/* 5 MEAL SECTIONS */}
                <div className="space-y-6">
                  {/* SECTION 1: MID-DAY DRINKS & MORNING DETOX */}
                  <div className="bg-[#111827] border border-white/10 rounded-3xl overflow-hidden shadow-xl hover:border-cyan-400/40 transition-all">
                    {/* Visual Graphic Banner */}
                    <div className="relative h-44 sm:h-52 bg-gradient-to-r from-emerald-950 via-teal-900 to-cyan-950 p-6 flex flex-col justify-between overflow-hidden">
                      {/* Decorative SVG Glass Artwork */}
                      <div className="absolute right-4 -bottom-6 opacity-20 pointer-events-none">
                        <svg width="220" height="220" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cyan-300">
                          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                          <circle cx="12" cy="12" r="10" />
                        </svg>
                      </div>

                      <div className="flex items-center justify-between relative z-10">
                        <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-md">
                          <CupSoda className="w-3.5 h-3.5" />
                          <span>१. {dietResult.sections.midDayDrinks.tag}</span>
                        </span>
                        <span className="bg-black/40 text-cyan-300 border border-white/10 text-xs font-mono px-3 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-md">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{dietResult.sections.midDayDrinks.time}</span>
                        </span>
                      </div>

                      <div className="relative z-10 space-y-1">
                        <h3 className="text-xl sm:text-2xl font-black text-white font-serif">
                          {dietResult.sections.midDayDrinks.title}
                        </h3>
                        <p className="text-xs text-cyan-200">
                          {dietResult.sections.midDayDrinks.titleEn} • {dietResult.sections.midDayDrinks.calories}
                        </p>
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="p-6 sm:p-8 space-y-5">
                      <div className="space-y-2">
                        <strong className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">
                          क्या और कैसे पिएं (Recommended Drinks):
                        </strong>
                        <ul className="space-y-2 text-sm text-slate-200">
                          {dietResult.sections.midDayDrinks.items.map((it, idx) => (
                            <li key={idx} className="flex items-start gap-2.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                              <span>{it}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-200 leading-relaxed">
                        <strong>आयुर्वेदिक लाभ: </strong>
                        {dietResult.sections.midDayDrinks.ayurvedicBenefit}
                      </div>
                    </div>
                  </div>

                  {/* SECTION 2: BREAKFAST */}
                  <div className="bg-[#111827] border border-white/10 rounded-3xl overflow-hidden shadow-xl hover:border-amber-400/40 transition-all">
                    {/* Visual Graphic Banner */}
                    <div className="relative h-44 sm:h-52 bg-gradient-to-r from-amber-950 via-orange-950 to-yellow-950 p-6 flex flex-col justify-between overflow-hidden">
                      <div className="absolute right-4 -bottom-6 opacity-20 pointer-events-none">
                        <svg width="220" height="220" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-amber-300">
                          <circle cx="12" cy="12" r="4" />
                          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                        </svg>
                      </div>

                      <div className="flex items-center justify-between relative z-10">
                        <span className="bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-md">
                          <Sun className="w-3.5 h-3.5" />
                          <span>२. {dietResult.sections.breakfast.tag}</span>
                        </span>
                        <span className="bg-black/40 text-amber-300 border border-white/10 text-xs font-mono px-3 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-md">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{dietResult.sections.breakfast.time}</span>
                        </span>
                      </div>

                      <div className="relative z-10 space-y-1">
                        <h3 className="text-xl sm:text-2xl font-black text-white font-serif">
                          {dietResult.sections.breakfast.title}
                        </h3>
                        <p className="text-xs text-amber-200">
                          {dietResult.sections.breakfast.titleEn} • {dietResult.sections.breakfast.calories} • Protein: {dietResult.sections.breakfast.protein || '15g'}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 sm:p-8 space-y-5">
                      <div className="space-y-2">
                        <strong className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                          नाश्ते में क्या लें (Breakfast Options):
                        </strong>
                        <ul className="space-y-2 text-sm text-slate-200">
                          {dietResult.sections.breakfast.items.map((it, idx) => (
                            <li key={idx} className="flex items-start gap-2.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                              <span>{it}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 leading-relaxed">
                        <strong>आयुर्वेदिक नियम: </strong>
                        {dietResult.sections.breakfast.ayurvedicBenefit}
                      </div>
                    </div>
                  </div>

                  {/* SECTION 3: LUNCH (PEAK JATHARAGNI) */}
                  <div className="bg-[#111827] border border-white/10 rounded-3xl overflow-hidden shadow-xl hover:border-blue-400/40 transition-all">
                    {/* Visual Graphic Banner */}
                    <div className="relative h-44 sm:h-52 bg-gradient-to-r from-blue-950 via-indigo-950 to-sky-950 p-6 flex flex-col justify-between overflow-hidden">
                      <div className="absolute right-4 -bottom-6 opacity-20 pointer-events-none">
                        <svg width="220" height="220" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-blue-300">
                          <circle cx="12" cy="12" r="10" />
                          <circle cx="12" cy="12" r="6" />
                          <circle cx="12" cy="12" r="2" />
                        </svg>
                      </div>

                      <div className="flex items-center justify-between relative z-10">
                        <span className="bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-md">
                          <Flame className="w-3.5 h-3.5 text-orange-400" />
                          <span>३. {dietResult.sections.lunch.tag} (सर्वोत्तम पाचन काल)</span>
                        </span>
                        <span className="bg-black/40 text-blue-300 border border-white/10 text-xs font-mono px-3 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-md">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{dietResult.sections.lunch.time}</span>
                        </span>
                      </div>

                      <div className="relative z-10 space-y-1">
                        <h3 className="text-xl sm:text-2xl font-black text-white font-serif">
                          {dietResult.sections.lunch.title}
                        </h3>
                        <p className="text-xs text-blue-200">
                          {dietResult.sections.lunch.titleEn} • {dietResult.sections.lunch.calories} • Protein: {dietResult.sections.lunch.protein || '18g'}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 sm:p-8 space-y-5">
                      <div className="space-y-2">
                        <strong className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                          दोपहर की संपूर्ण थाली (Complete Lunch Plate):
                        </strong>
                        <ul className="space-y-2 text-sm text-slate-200">
                          {dietResult.sections.lunch.items.map((it, idx) => (
                            <li key={idx} className="flex items-start gap-2.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                              <span>{it}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-200 leading-relaxed">
                        <strong>छोटेलाल जी का सूत्र: </strong>
                        {dietResult.sections.lunch.ayurvedicBenefit}
                      </div>
                    </div>
                  </div>

                  {/* SECTION 4: SNACKS */}
                  <div className="bg-[#111827] border border-white/10 rounded-3xl overflow-hidden shadow-xl hover:border-purple-400/40 transition-all">
                    {/* Visual Graphic Banner */}
                    <div className="relative h-44 sm:h-52 bg-gradient-to-r from-purple-950 via-fuchsia-950 to-violet-950 p-6 flex flex-col justify-between overflow-hidden">
                      <div className="absolute right-4 -bottom-6 opacity-20 pointer-events-none">
                        <svg width="220" height="220" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-purple-300">
                          <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                          <line x1="6" y1="1" x2="6" y2="4" />
                          <line x1="10" y1="1" x2="10" y2="4" />
                          <line x1="14" y1="1" x2="14" y2="4" />
                        </svg>
                      </div>

                      <div className="flex items-center justify-between relative z-10">
                        <span className="bg-purple-500/20 text-purple-300 border border-purple-400/30 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-md">
                          <Coffee className="w-3.5 h-3.5" />
                          <span>४. {dietResult.sections.snacks.tag}</span>
                        </span>
                        <span className="bg-black/40 text-purple-300 border border-white/10 text-xs font-mono px-3 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-md">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{dietResult.sections.snacks.time}</span>
                        </span>
                      </div>

                      <div className="relative z-10 space-y-1">
                        <h3 className="text-xl sm:text-2xl font-black text-white font-serif">
                          {dietResult.sections.snacks.title}
                        </h3>
                        <p className="text-xs text-purple-200">
                          {dietResult.sections.snacks.titleEn} • {dietResult.sections.snacks.calories}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 sm:p-8 space-y-5">
                      <div className="space-y-2">
                        <strong className="text-xs font-bold text-purple-400 uppercase tracking-wider block">
                          शाम का पौष्टिक स्नैक (Healthy Evening Options):
                        </strong>
                        <ul className="space-y-2 text-sm text-slate-200">
                          {dietResult.sections.snacks.items.map((it, idx) => (
                            <li key={idx} className="flex items-start gap-2.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 shrink-0" />
                              <span>{it}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-200 leading-relaxed">
                        <strong>स्वास्थ्य लाभ: </strong>
                        {dietResult.sections.snacks.ayurvedicBenefit}
                      </div>
                    </div>
                  </div>

                  {/* SECTION 5: DINNER */}
                  <div className="bg-[#111827] border border-white/10 rounded-3xl overflow-hidden shadow-xl hover:border-rose-400/40 transition-all">
                    {/* Visual Graphic Banner */}
                    <div className="relative h-44 sm:h-52 bg-gradient-to-r from-slate-950 via-rose-950 to-indigo-950 p-6 flex flex-col justify-between overflow-hidden">
                      <div className="absolute right-4 -bottom-6 opacity-20 pointer-events-none">
                        <svg width="220" height="220" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-rose-300">
                          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                        </svg>
                      </div>

                      <div className="flex items-center justify-between relative z-10">
                        <span className="bg-rose-500/20 text-rose-300 border border-rose-400/30 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-md">
                          <Moon className="w-3.5 h-3.5" />
                          <span>५. {dietResult.sections.dinner.tag} (सूर्य ढलने के बाद)</span>
                        </span>
                        <span className="bg-black/40 text-rose-300 border border-white/10 text-xs font-mono px-3 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-md">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{dietResult.sections.dinner.time}</span>
                        </span>
                      </div>

                      <div className="relative z-10 space-y-1">
                        <h3 className="text-xl sm:text-2xl font-black text-white font-serif">
                          {dietResult.sections.dinner.title}
                        </h3>
                        <p className="text-xs text-rose-200">
                          {dietResult.sections.dinner.titleEn} • {dietResult.sections.dinner.calories}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 sm:p-8 space-y-5">
                      <div className="space-y-2">
                        <strong className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                          रात्रिभोज मेनू (Light Dinner Menu):
                        </strong>
                        <ul className="space-y-2 text-sm text-slate-200">
                          {dietResult.sections.dinner.items.map((it, idx) => (
                            <li key={idx} className="flex items-start gap-2.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 shrink-0" />
                              <span>{it}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-200 leading-relaxed">
                        <strong>पाचन व नींद का नियम: </strong>
                        {dietResult.sections.dinner.ayurvedicBenefit}
                      </div>
                    </div>
                  </div>
                </div>

                {/* FOODS TO FAVOR & FOODS TO AVOID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Favor */}
                  <div className="bg-[#111827] border border-emerald-500/30 rounded-3xl p-6 sm:p-8 space-y-4">
                    <h4 className="text-lg font-bold text-emerald-400 font-serif flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>विशेष रूप से क्या खाएं (Foods to Favor):</span>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {dietResult.foodsToFavor.map((f, i) => (
                        <span
                          key={i}
                          className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold px-3 py-1.5 rounded-xl"
                        >
                          ✓ {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Avoid */}
                  <div className="bg-[#111827] border border-rose-500/30 rounded-3xl p-6 sm:p-8 space-y-4">
                    <h4 className="text-lg font-bold text-rose-400 font-serif flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      <span>सख्त परहेज करें (Foods to Avoid):</span>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {dietResult.foodsToAvoid.map((f, i) => (
                        <span
                          key={i}
                          className="bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold px-3 py-1.5 rounded-xl"
                        >
                          ✗ {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: DOSHA RULES & CHARTS */}
        {activeTab === 'rules' && (
          <div className="space-y-10">
            {/* 4 Golden Rules */}
            <div className="bg-[#111827] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
              <h3 className="text-xl font-bold text-white font-serif flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-400" />
                <span>छोटेलाल जी के ४ स्वर्णिम आहार नियम (Golden Dietary Rules):</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-1.5">
                  <span className="font-bold text-cyan-400 block">१. भूख लगने पर ही भोजन करें</span>
                  <p className="text-slate-300">
                    जब तक पहला भोजन पूरी तरह न पच जाए, दोबारा न खाएं। बिना भूख के खाना आम दोष (Toxins) पैदा करता है।
                  </p>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-1.5">
                  <span className="font-bold text-cyan-400 block">२. भोजन के तुरंत बाद पानी न पिएं</span>
                  <p className="text-slate-300">
                    &ldquo;भोजनान्ते विषं वारि&rdquo; - भोजन के तुरंत बाद ठंडा पानी जठराग्नि को बुझा देता है। भोजन के 45 मिनट बाद ही गुनगुना पानी पिएं।
                  </p>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-1.5">
                  <span className="font-bold text-cyan-400 block">३. ३२ बार चबाकर खाएं</span>
                  <p className="text-slate-300">
                    पाचन मुंह की लार (Saliva) से शुरू होता है। जब आप खूब चबाते हैं तो पेट को पचाने में कोई जोर नहीं लगाना पड़ता।
                  </p>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-1.5">
                  <span className="font-bold text-cyan-400 block">४. सूर्य ढलने के बाद हल्का भोजन</span>
                  <p className="text-slate-300">
                    रात में शरीर की पाचन शक्ति धीमी हो जाती है। रात 8 बजे से पहले सुपाच्य सूप, दलिया या मूंग खिचड़ी लें।
                  </p>
                </div>
              </div>
            </div>

            {/* Dosha Specific Charts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Vata Diet */}
              <div className="bg-[#111827] rounded-3xl p-6 border border-white/10 shadow-xl space-y-4">
                <div className="pb-3 border-b border-white/10">
                  <span className="text-xs font-bold text-amber-400 bg-amber-500/20 px-2.5 py-0.5 rounded-full">
                    वायु प्रधान
                  </span>
                  <h4 className="text-xl font-bold text-white font-serif mt-1">वात शामक आहार</h4>
                  <p className="text-xs text-slate-400">गैस, बवासीर, अनिद्रा व जोड़ों के दर्द में</p>
                </div>
                <div className="space-y-2 text-xs">
                  <strong className="text-emerald-400 block">सर्वोत्तम खाद्य पदार्थ:</strong>
                  <ul className="space-y-1 text-slate-300">
                    <li>• गर्म, तैलीय (घी युक्त) और ताजा पका भोजन</li>
                    <li>• पपीता, चीकू, आम, भीगी अंजीर व मुनक्का</li>
                    <li>• मूंग दाल, तिल का तेल, देशी गाय का घी</li>
                    <li>• अदरक, दालचीनी, हींग और अजवाइन</li>
                  </ul>
                </div>
                <div className="space-y-1 text-xs pt-2 border-t border-white/10">
                  <strong className="text-rose-400 block">परहेज करें:</strong>
                  <p className="text-slate-400">सूखे चने, राजमा, छोले, ठंडी चीजें, कच्चा सलाद और बासी खाना।</p>
                </div>
              </div>

              {/* Pitta Diet */}
              <div className="bg-[#111827] rounded-3xl p-6 border border-white/10 shadow-xl space-y-4">
                <div className="pb-3 border-b border-white/10">
                  <span className="text-xs font-bold text-rose-400 bg-rose-500/20 px-2.5 py-0.5 rounded-full">
                    अग्नि प्रधान
                  </span>
                  <h4 className="text-xl font-bold text-white font-serif mt-1">पित्त शामक आहार</h4>
                  <p className="text-xs text-slate-400">एसिडिटी, बाल झड़ना व त्वचा रोग में</p>
                </div>
                <div className="space-y-2 text-xs">
                  <strong className="text-emerald-400 block">सर्वोत्तम खाद्य पदार्थ:</strong>
                  <ul className="space-y-1 text-slate-300">
                    <li>• नारियल पानी, आंवला मुरब्बा, मिश्री</li>
                    <li>• लौकी, तोरई, ककड़ी, खीरा और अनार</li>
                    <li>• गाय का ठंडा दूध, सौंफ का शर्बत, धनिया</li>
                    <li>• गन्ने का ताजा रस, तरबूज</li>
                  </ul>
                </div>
                <div className="space-y-1 text-xs pt-2 border-t border-white/10">
                  <strong className="text-rose-400 block">परहेज करें:</strong>
                  <p className="text-slate-400">लाल मिर्च, समोसा, चाय-कॉफी, शराब, खटाई और अत्यधिक नमक।</p>
                </div>
              </div>

              {/* Kapha Diet */}
              <div className="bg-[#111827] rounded-3xl p-6 border border-white/10 shadow-xl space-y-4">
                <div className="pb-3 border-b border-white/10">
                  <span className="text-xs font-bold text-blue-400 bg-blue-500/20 px-2.5 py-0.5 rounded-full">
                    जल-पृथ्वी प्रधान
                  </span>
                  <h4 className="text-xl font-bold text-white font-serif mt-1">कफ शामक आहार</h4>
                  <p className="text-xs text-slate-400">मोटापा, सुस्ती, कफ व सर्दी-खांसी में</p>
                </div>
                <div className="space-y-2 text-xs">
                  <strong className="text-emerald-400 block">सर्वोत्तम खाद्य पदार्थ:</strong>
                  <ul className="space-y-1 text-slate-300">
                    <li>• हल्का, गर्म, सूखा और थोड़ा तीखा भोजन</li>
                    <li>• पुराना जौ (Barley), बाजरा, मक्का</li>
                    <li>• गर्म पानी में शहद, त्रिकटु, तुलसी चाय</li>
                    <li>• करेला, मेथी, परवल और मूली</li>
                  </ul>
                </div>
                <div className="space-y-1 text-xs pt-2 border-t border-white/10">
                  <strong className="text-rose-400 block">परहेज करें:</strong>
                  <p className="text-slate-400">दही, आइसक्रीम, मिठाई, भारी पराठे, केला और दिन में सोना।</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};
