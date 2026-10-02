import React from 'react';
import { ChotelalFace } from './ChotelalFace';

interface ChotelalAvatarProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  expression?: 'welcoming' | 'thinking' | 'advising' | 'doctor' | 'speaking';
  showBadge?: boolean;
  showStatus?: boolean;
  className?: string;
  glow?: boolean;
}

export const ChotelalAvatar: React.FC<ChotelalAvatarProps> = ({
  size = 'md',
  showStatus = false,
  className = '',
  glow = false,
}) => {
  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      {glow && (
        <div className="absolute inset-0 rounded-full bg-orange-400/30 blur-lg animate-pulse" />
      )}
      <ChotelalFace size={size as any} />
      {showStatus && (
        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full shadow-xs" />
      )}
    </div>
  );
};
