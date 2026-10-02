import React from 'react';
import { ChotelalFace } from './ChotelalFace';

interface ChotelalLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  showSubtitle?: boolean;
  className?: string;
  badgeOnly?: boolean;
}

/**
 * Official Chotelal Ji Health Logo
 * Pure circular face mascot with white background and orange border (#FF9933)
 */
export const ChotelalLogo: React.FC<ChotelalLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  className = '',
  badgeOnly = false,
}) => {
  const titleSizes = {
    sm: 'text-sm',
    md: 'text-base sm:text-lg',
    lg: 'text-xl sm:text-2xl',
    xl: 'text-2xl sm:text-3xl',
    hero: 'text-3xl sm:text-4xl',
  }[size];

  const subtitleSizes = {
    sm: 'text-[9px]',
    md: 'text-[11px]',
    lg: 'text-xs',
    xl: 'text-xs sm:text-sm',
    hero: 'text-sm tracking-widest',
  }[size];

  if (badgeOnly) {
    return <ChotelalFace size={size} className={className} />;
  }

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <ChotelalFace size={size} />

      <div className="flex flex-col text-left">
        <div className={`font-black tracking-tight text-slate-900 font-serif leading-none ${titleSizes}`}>
          Chotelal Ji <span className="text-[#FF9933]">Health</span>
        </div>
        {showSubtitle && (
          <div className={`font-semibold text-slate-500 mt-1 leading-tight ${subtitleSizes}`}>
            Aapki Sehat, Hamari Zimmedari
          </div>
        )}
      </div>
    </div>
  );
};
