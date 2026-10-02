import React from 'react';
import {
  Flame,
  Brain,
  Feather,
  Stethoscope,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export interface CategoryItem {
  id: string;
  title: string;
  titleHindi: string;
  description: string;
  badge: string;
  iconName: 'flame' | 'brain' | 'feather' | 'stethoscope';
  stats: string;
  commonSymptoms: string[];
}

interface CategoryCardProps {
  category: CategoryItem;
  onSelect: (categoryId: string) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  onSelect,
}) => {
  const getIcon = () => {
    switch (category.iconName) {
      case 'flame':
        return <Flame className="w-6 h-6 text-[#FF9933]" />;
      case 'brain':
        return <Brain className="w-6 h-6 text-indigo-600" />;
      case 'feather':
        return <Feather className="w-6 h-6 text-emerald-600" />;
      default:
        return <Stethoscope className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <div
      onClick={() => onSelect(category.id)}
      className="group bg-white rounded-2xl p-6 border-2 border-slate-200/90 hover:border-[#FF9933] shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden transform hover:-translate-y-1"
    >
      {/* Top Accent Strip on hover */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#FF9933] opacity-0 group-hover:opacity-100 transition-opacity" />

      <div>
        {/* Header: Icon + Badge */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="w-12 h-12 rounded-xl bg-slate-50 group-hover:bg-[#FF9933]/15 flex items-center justify-center transition-colors shadow-2xs border border-slate-100">
            {getIcon()}
          </div>
          <span className="text-[11px] font-black px-2.5 py-1 rounded-full bg-[#FFFDD0] text-[#1E3A8A] border border-[#FF9933]/30">
            {category.badge}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-black text-slate-900 group-hover:text-[#1E3A8A] transition-colors">
          {category.titleHindi}
        </h3>
        <p className="text-xs font-bold text-slate-400 mt-0.5">{category.title}</p>

        {/* Description */}
        <p className="text-sm text-slate-600 mt-3 leading-relaxed">
          {category.description}
        </p>

        {/* Common Symptoms Bullets */}
        <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
          {category.commonSymptoms.slice(0, 3).map((sym, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs text-slate-600">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="truncate">{sym}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs font-bold text-slate-500">{category.stats}</span>
        <span className="inline-flex items-center gap-1 text-xs font-black text-[#FF9933] group-hover:text-amber-700">
          <span>जांच शुरू करें</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </div>
  );
};
