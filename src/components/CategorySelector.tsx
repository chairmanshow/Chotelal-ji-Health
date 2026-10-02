import React from 'react';
import { HealthCategory } from '../types';
import { CATEGORY_INFO } from '../data/mockData';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface CategorySelectorProps {
  selectedCategory: HealthCategory;
  onSelectCategory: (category: HealthCategory) => void;
  onScrollToDiagnosis: () => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategory,
  onSelectCategory,
  onScrollToDiagnosis,
}) => {
  const categories = Object.values(CATEGORY_INFO);

  const getEmoji = (id: string) => {
    switch (id) {
      case 'piles_sitting':
        return '🪑';
      case 'mental_health':
        return '🧠';
      case 'hair_growth':
        return '🌿';
      default:
        return '🩺';
    }
  };

  const getThemeColor = (id: string, isSelected: boolean) => {
    switch (id) {
      case 'piles_sitting':
        return isSelected
          ? 'border-orange-500 bg-orange-50/70 shadow-md ring-2 ring-orange-500/30'
          : 'border-slate-200 bg-white hover:border-orange-300 hover:shadow-sm';
      case 'mental_health':
        return isSelected
          ? 'border-indigo-500 bg-indigo-50/70 shadow-md ring-2 ring-indigo-500/30'
          : 'border-slate-200 bg-white hover:border-indigo-300 hover:shadow-sm';
      case 'hair_growth':
        return isSelected
          ? 'border-emerald-500 bg-emerald-50/70 shadow-md ring-2 ring-emerald-500/30'
          : 'border-slate-200 bg-white hover:border-emerald-300 hover:shadow-sm';
      default:
        return isSelected
          ? 'border-amber-500 bg-amber-50/70 shadow-md ring-2 ring-amber-500/30'
          : 'border-slate-200 bg-white hover:border-amber-300 hover:shadow-sm';
    }
  };

  return (
    <section id="categories" className="py-12 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold text-orange-600 uppercase tracking-widest bg-orange-100 px-3 py-1 rounded-full">
            स्पेशलाइज्ड श्रेणियां
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 tracking-tight">
            हमारे 4 मुख्य स्वास्थ्य विभाग (Specialized Healthcare Verticals)
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            छोटेलाल जी इन 4 क्षेत्रों में गहन आयुर्वेदिक और आधुनिक चिकित्सा अनुभव रखते हैं। अपना विभाग चुनें:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;

            return (
              <div
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id as HealthCategory);
                  onScrollToDiagnosis();
                }}
                className={`relative rounded-2xl p-6 border-2 transition-all cursor-pointer flex flex-col justify-between ${getThemeColor(
                  cat.id,
                  isSelected
                )}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white shadow-xs flex items-center justify-center text-2xl border border-slate-100">
                      {getEmoji(cat.id)}
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {cat.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 leading-snug">
                    {cat.hindiTitle}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 mb-3">{cat.title}</p>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {cat.description}
                  </p>

                  <div className="space-y-1.5 border-t border-slate-100 pt-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      प्रमुख लक्षण:
                    </span>
                    {cat.quickSymptoms.slice(0, 2).map((symptom, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{symptom}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-orange-600">
                  <span>{isSelected ? 'चयनित श्रेणी ✓' : 'जांच शुरू करें'}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
