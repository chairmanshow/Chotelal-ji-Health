import React from 'react';

interface ChotelalFaceProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero';
}

/**
 * Official Chotelal Ji Face Logo
 * Pure circular crop: White circle with Chotelal Orange border (#FF9933)
 * Elderly 60-year-old Indian Ayurvedic Vaidya with spectacles, tilak & warm smile
 * No full body, no laptop, no background clutter
 */
export const ChotelalFace: React.FC<ChotelalFaceProps> = ({
  className = '',
  size = 'md',
}) => {
  const sizeClasses = {
    xs: 'w-8 h-8',       // Chat avatar
    sm: 'w-10 h-10',     // Navbar
    md: 'w-16 h-16',     // Card / Modal
    lg: 'w-24 h-24',     // Call / Profile
    xl: 'w-32 h-32',     // Hero section
    hero: 'w-32 h-32 sm:w-40 sm:h-40',
  }[size];

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 rounded-full bg-white ${sizeClasses} ${className}`}
      title="Chotelal Ji - 30 Years Experienced Ayurvedic Vaidya"
    >
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full drop-shadow-sm transition-transform duration-200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Skin Gradient */}
          <linearGradient id="cfSkin" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FDE3C8" />
            <stop offset="100%" stopColor="#E9AF82" />
          </linearGradient>

          {/* Hair Silver Gradient */}
          <linearGradient id="cfHair" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F8FAFC" />
            <stop offset="50%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>

          {/* Orange Border Gradient */}
          <linearGradient id="cfOrangeBorder" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF9933" />
            <stop offset="100%" stopColor="#EA580C" />
          </linearGradient>

          {/* Kurta Collar Gradient */}
          <linearGradient id="cfKurta" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EA580C" />
            <stop offset="50%" stopColor="#FF9933" />
            <stop offset="100%" stopColor="#EA580C" />
          </linearGradient>

          {/* Spectacles Gold Rim */}
          <linearGradient id="cfGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>

          {/* Circular Clip Path to guarantee exact circular crop */}
          <clipPath id="cfCircleClip">
            <circle cx="200" cy="200" r="186" />
          </clipPath>
        </defs>

        {/* 1. Base White Circle Background */}
        <circle cx="200" cy="200" r="196" fill="#FFFFFF" />

        {/* 2. Content clipped to inner circle */}
        <g clipPath="url(#cfCircleClip)">
          {/* Subtle soft backdrop light */}
          <circle cx="200" cy="180" r="186" fill="#FFFBF5" />

          {/* Neck & Shoulders (Kurta base) */}
          <path
            d="M80 400 C80 320 130 295 200 295 C270 295 320 320 320 400 Z"
            fill="url(#cfKurta)"
          />
          {/* Kurta V-Neck & Button Trim */}
          <path d="M175 295 L200 345 L225 295 Z" fill="#FDE3C8" />
          <path d="M197 345 L203 345 L203 400 L197 400 Z" fill="#D97706" />
          <circle cx="200" cy="365" r="3" fill="#FFFFFF" />
          <circle cx="200" cy="385" r="3" fill="#FFFFFF" />

          {/* Neck */}
          <path
            d="M170 240 L170 300 C170 310 230 310 230 300 L230 240 Z"
            fill="#E9AF82"
          />

          {/* Ears */}
          <circle cx="118" cy="195" r="22" fill="#E9AF82" />
          <circle cx="118" cy="195" r="14" fill="#D49568" />
          <circle cx="282" cy="195" r="22" fill="#E9AF82" />
          <circle cx="282" cy="195" r="14" fill="#D49568" />

          {/* Head & Face Contour */}
          <path
            d="M125 180 C125 100 275 100 275 180 C275 240 245 275 200 275 C155 275 125 240 125 180 Z"
            fill="url(#cfSkin)"
          />

          {/* Silver/White Side Hair */}
          <path
            d="M125 180 C120 130 145 90 190 85 C170 95 140 115 135 160 C130 190 125 205 115 205 C118 190 122 185 125 180 Z"
            fill="url(#cfHair)"
          />
          <path
            d="M275 180 C280 130 255 90 210 85 C230 95 260 115 265 160 C270 190 275 205 285 205 C282 190 278 185 275 180 Z"
            fill="url(#cfHair)"
          />

          {/* Top Distinguished Receding Silver Hair Cap */}
          <path
            d="M145 105 C165 70 235 70 255 105 C240 92 215 88 200 88 C185 88 160 92 145 105 Z"
            fill="url(#cfHair)"
          />

          {/* Forehead Ayurvedic Red/Saffron Tilak */}
          <path
            d="M198 120 C198 115 202 115 202 120 L202 140 C202 145 198 145 198 140 Z"
            fill="#DC2626"
          />
          <circle cx="200" cy="144" r="2.5" fill="#F59E0B" />

          {/* Gentle Forehead Wisdom Wrinkles */}
          <path
            d="M165 132 Q200 128 235 132"
            stroke="#D49568"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M172 142 Q200 138 228 142"
            stroke="#D49568"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Eyebrows (Distinguished Grey/White) */}
          <path
            d="M150 162 Q170 156 185 163"
            stroke="#94A3B8"
            strokeWidth="4.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M215 163 Q230 156 250 162"
            stroke="#94A3B8"
            strokeWidth="4.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Kind Smiling Eyes */}
          <ellipse cx="168" cy="180" rx="9" ry="8" fill="#FFFFFF" />
          <circle cx="169" cy="180" r="5" fill="#451A03" />
          <circle cx="171" cy="178" r="1.5" fill="#FFFFFF" />

          <ellipse cx="232" cy="180" rx="9" ry="8" fill="#FFFFFF" />
          <circle cx="231" cy="180" r="5" fill="#451A03" />
          <circle cx="233" cy="178" r="1.5" fill="#FFFFFF" />

          {/* Laugh lines around eyes */}
          <path d="M148 178 Q152 181 149 185" stroke="#D49568" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M252 178 Q248 181 251 185" stroke="#D49568" strokeWidth="1.5" strokeLinecap="round" fill="none" />

          {/* Classic Gold-Rimmed Round Glasses */}
          <circle cx="168" cy="180" r="19" stroke="url(#cfGold)" strokeWidth="3.5" fill="#FFFFFF" fillOpacity="0.25" />
          <circle cx="232" cy="180" r="19" stroke="url(#cfGold)" strokeWidth="3.5" fill="#FFFFFF" fillOpacity="0.25" />
          {/* Bridge */}
          <path d="M187 178 Q200 173 213 178" stroke="url(#cfGold)" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          {/* Temples */}
          <path d="M149 178 L122 173" stroke="url(#cfGold)" strokeWidth="3" strokeLinecap="round" />
          <path d="M251 178 L278 173" stroke="url(#cfGold)" strokeWidth="3" strokeLinecap="round" />

          {/* Nose */}
          <path
            d="M200 175 L200 205 Q200 213 194 213 L206 213 Q200 213 200 205"
            stroke="#D49568"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Distinguished Silver Mustache (Caring Vaidya look) */}
          <path
            d="M165 230 Q185 224 200 227 Q215 224 235 230 Q225 242 200 236 Q175 242 165 230 Z"
            fill="url(#cfHair)"
            stroke="#CBD5E1"
            strokeWidth="1"
          />

          {/* Warm Reassuring Smile */}
          <path
            d="M178 244 Q200 258 222 244"
            stroke="#991B1B"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Gentle Chin Dimple */}
          <path
            d="M194 265 Q200 268 206 265"
            stroke="#D49568"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* 3. Outer Orange Border (Chotelal Orange #FF9933) */}
        <circle
          cx="200"
          cy="200"
          r="191"
          stroke="url(#cfOrangeBorder)"
          strokeWidth="14"
          fill="none"
        />
        {/* Subtle Inner Accent Rim */}
        <circle
          cx="200"
          cy="200"
          r="184"
          stroke="#FED7AA"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </div>
  );
};
