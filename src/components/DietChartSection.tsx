import React, { useState, useEffect } from 'react';
import {
  Utensils,
  Download,
  Calendar,
  Sparkles,
  CheckCircle2,
  XCircle,
  Clock,
  Coffee,
  Sun,
  Sunset,
  Moon,
  Leaf,
  RefreshCw,
} from 'lucide-react';
import { generateDietChartPDF } from '../lib/pdfGenerator';

interface MealPlanDay {
  day: string;
  earlyMorning?: string;
  breakfast: string;
  lunch: string;
  eveningSnack: string;
  dinner: string;
  bedtime?: string;
}

interface DietChartData {
  condition: string;
  doshaFocus: string;
  keyPrinciple: string;
  foodsToEat: string[];
  foodsToAvoid: string[];
  weeklyPlan: MealPlanDay[];
}

interface DietChartSectionProps {
  condition: string;
  category: string;
  symptoms: string;
  dosha: string;
  patientName?: string;
}

export const DietChartSection: React.FC<DietChartSectionProps> = ({
  condition,
  category,
  symptoms,
  dosha,
  patientName = 'सम्मानित मरीज',
}) => {
  const [dietChart, setDietChart] = useState<DietChartData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');

  const fetchDietChart = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/diet-chart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ condition, category, symptoms, dosha }),
      });
      const data = await res.json();
      if (data.success && data.dietChart) {
        setDietChart(data.dietChart);
      }
    } catch (e) {
      console.warn('Diet chart fetch note, using client fallback:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDietChart();
  }, [condition, category]);

  const handleDownloadPDF = () => {
    if (!dietChart) return;
    generateDietChartPDF({
      dietChart,
      patientName,
    });
  };

  if (isLoading && !dietChart) {
    return (
      <div className="bg-white rounded-3xl p-8 border-2 border-amber-200 shadow-lg text-center my-8">
        <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-3 animate-spin">
          <Utensils className="w-6 h-6 text-orange-600" />
        </div>
        <h4 className="text-base font-black text-slate-800">
          छोटेलाल जी आपके लिए 7-दिन का व्यक्तिगत आयुर्वेदिक आहार चार्ट बना रहे हैं...
        </h4>
        <p className="text-xs text-slate-500 mt-1">
          दोषीय संतुलन (वात, पित्त, कफ) के अनुसार सात्विक भोजन योजना तैयार हो रही है।
        </p>
      </div>
    );
  }

  if (!dietChart) return null;

  const currentDayPlan = dietChart.weeklyPlan?.[selectedDayIndex] || dietChart.weeklyPlan?.[0];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-200/90 shadow-xl my-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-amber-100">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center shrink-0 shadow-md">
            <Utensils className="w-6 h-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-orange-100 text-orange-800 text-xs font-black mb-1">
              <Sparkles className="w-3.5 h-3.5 text-orange-600" />
              <span>7-दिन का व्यक्तिगत डाइट चार्ट (Personalized Ayurvedic Diet)</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              आपकी बीमारी के अनुसार सात्विक आहार योजना
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              दोष शमन: <span className="font-bold text-amber-700">{dietChart.doshaFocus}</span>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* View mode toggle */}
          <div className="hidden sm:inline-flex rounded-xl bg-slate-100 p-1 text-xs font-bold border border-slate-200">
            <button
              onClick={() => setViewMode('card')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                viewMode === 'card'
                  ? 'bg-white text-slate-900 shadow-2xs font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              दिन-वार (Day-by-Day)
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                viewMode === 'table'
                  ? 'bg-white text-slate-900 shadow-2xs font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              संपूर्ण तालिका (Full Table)
            </button>
          </div>

          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-black text-xs sm:text-sm shadow-md hover:shadow-lg transition-all transform hover:scale-[1.02]"
            title="7-दिन का डाइट चार्ट PDF में डाउनलोड करें"
          >
            <Download className="w-4 h-4" />
            <span>Download Diet PDF</span>
          </button>
        </div>
      </div>

      {/* Ayurvedic Key Principle */}
      {dietChart.keyPrinciple && (
        <div className="mt-4 p-4 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-start gap-3">
          <Leaf className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-black text-amber-900 block">
              आयुर्वेदिक आहार सूत्र (Dietary Principle):
            </span>
            <p className="text-xs text-amber-800 leading-relaxed font-medium">
              {dietChart.keyPrinciple}
            </p>
          </div>
        </div>
      )}

      {/* Pathya (Foods to Eat) and Apathya (Foods to Avoid) Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        {/* Foods to Eat */}
        <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <h4 className="text-sm font-black text-emerald-900">
              ✓ क्या खाएं (Foods to Favor / Pathya)
            </h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {dietChart.foodsToEat.map((food, idx) => (
              <span
                key={idx}
                className="text-xs bg-white text-emerald-800 font-bold px-3 py-1.5 rounded-xl border border-emerald-200 shadow-2xs"
              >
                {food}
              </span>
            ))}
          </div>
        </div>

        {/* Foods to Avoid */}
        <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200">
          <div className="flex items-center gap-2 mb-3">
            <XCircle className="w-5 h-5 text-rose-600" />
            <h4 className="text-sm font-black text-rose-900">
              ✗ क्या बिल्कुल न खाएं (Strictly Avoid / Apathya)
            </h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {dietChart.foodsToAvoid.map((food, idx) => (
              <span
                key={idx}
                className="text-xs bg-white text-rose-800 font-bold px-3 py-1.5 rounded-xl border border-rose-200 shadow-2xs"
              >
                {food}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Day Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 select-none scrollbar-none">
        {dietChart.weeklyPlan.map((plan, index) => (
          <button
            key={index}
            onClick={() => setSelectedDayIndex(index)}
            className={`px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedDayIndex === index
                ? 'bg-orange-600 text-white shadow-md'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{plan.day.split(' ')[0]}</span>
            <span className="opacity-80 text-[10px]">
              {plan.day.includes('(') ? `(${plan.day.split('(')[1]}` : ''}
            </span>
          </button>
        ))}
      </div>

      {/* Day-by-Day Card View */}
      {viewMode === 'card' && currentDayPlan && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Morning Detox */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50/40 border border-amber-200/80">
            <div className="flex items-center gap-2 text-amber-800 font-black text-xs uppercase tracking-wider mb-2">
              <Sun className="w-4 h-4 text-amber-600" />
              <span>1. उषापान (Early Detox)</span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
              {currentDayPlan.earlyMorning || 'गुनगुना तांबे का पानी'}
            </p>
            <span className="text-[11px] text-amber-700 font-medium mt-2 block">
              समय: सुबह 6:00 - 7:00 बजे
            </span>
          </div>

          {/* Breakfast */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50/40 border border-orange-200/80">
            <div className="flex items-center gap-2 text-orange-800 font-black text-xs uppercase tracking-wider mb-2">
              <Coffee className="w-4 h-4 text-orange-600" />
              <span>2. नाश्ता (Breakfast)</span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
              {currentDayPlan.breakfast}
            </p>
            <span className="text-[11px] text-orange-700 font-medium mt-2 block">
              समय: सुबह 8:30 - 9:30 बजे
            </span>
          </div>

          {/* Lunch */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50/40 border border-emerald-200/80">
            <div className="flex items-center gap-2 text-emerald-800 font-black text-xs uppercase tracking-wider mb-2">
              <Sunset className="w-4 h-4 text-emerald-600" />
              <span>3. दोपहर का भोजन (Lunch)</span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
              {currentDayPlan.lunch}
            </p>
            <span className="text-[11px] text-emerald-700 font-medium mt-2 block">
              समय: दोपहर 1:00 - 2:00 बजे
            </span>
          </div>

          {/* Evening Snack & Dinner */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50/40 border border-indigo-200/80">
            <div className="flex items-center gap-2 text-indigo-800 font-black text-xs uppercase tracking-wider mb-2">
              <Moon className="w-4 h-4 text-indigo-600" />
              <span>4. डिनर व रात्रि पेय</span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
              {currentDayPlan.dinner}
            </p>
            <div className="text-[11px] text-indigo-700 font-medium mt-2 pt-2 border-t border-indigo-100">
              <span className="font-bold">शाम/रात: </span>
              {currentDayPlan.eveningSnack} • {currentDayPlan.bedtime || 'त्रिफला'}
            </div>
          </div>
        </div>
      )}

      {/* Full 7-Day Table View */}
      {viewMode === 'table' && (
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left text-xs">
            <thead className="bg-amber-100/70 text-slate-900 font-black">
              <tr>
                <th className="p-3">दिन (Day)</th>
                <th className="p-3">उषापान (Early Morning)</th>
                <th className="p-3">नाश्ता (Breakfast)</th>
                <th className="p-3">दोपहर का भोजन (Lunch)</th>
                <th className="p-3">शाम का अल्पाहार (Snack)</th>
                <th className="p-3">रात्रि का भोजन (Dinner)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {dietChart.weeklyPlan.map((item, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}>
                  <td className="p-3 font-bold text-orange-700 whitespace-nowrap">{item.day}</td>
                  <td className="p-3 text-slate-700">{item.earlyMorning || 'गुनगुना पानी'}</td>
                  <td className="p-3 text-slate-800 font-semibold">{item.breakfast}</td>
                  <td className="p-3 text-slate-800">{item.lunch}</td>
                  <td className="p-3 text-slate-700">{item.eveningSnack}</td>
                  <td className="p-3 text-slate-800 font-semibold">{item.dinner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
