import React, { useState } from 'react';
import { ROBBI9_TRANSPARENT_DATA } from '../assets/robbi9Transparent';

interface Robbi9MascotProps {
  partyMode?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  pulse?: boolean;
  badgeText?: string;
  customClass?: string;
}

export const Robbi9Mascot: React.FC<Robbi9MascotProps> = ({
  partyMode = false,
  size = 'lg',
  pulse = false,
  badgeText,
  customClass = ''
}) => {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: 'w-20 h-20',
    md: 'w-28 h-28',
    lg: 'w-40 h-40 sm:w-48 sm:h-48',
    xl: 'w-56 h-56 sm:w-64 sm:h-64'
  };

  const shadowSizes = {
    sm: 'w-14 h-2.5',
    md: 'w-20 h-3',
    lg: 'w-28 sm:w-32 h-3.5',
    xl: 'w-36 sm:w-44 h-4'
  };

  return (
    <div className={`relative inline-flex flex-col items-center select-none ${customClass}`}>
      {/* Floating Robot Container */}
      <div
        className={`relative ${sizeClasses[size]} ${
          pulse ? 'animate-bounce' : 'animate-float'
        } transition-transform duration-300 hover:scale-110 flex items-center justify-center cursor-pointer`}
      >
        <div className="w-full h-full p-1 flex items-center justify-center relative bg-transparent">
          {!imageError ? (
            <img
              src={ROBBI9_TRANSPARENT_DATA}
              alt="Mascote Robbi9 - Fábrica de Ideias"
              className="w-full h-full object-contain select-none drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)] transition-transform"
              onError={() => setImageError(true)}
              loading="eager"
            />
          ) : (
            // Clean vector robot fallback
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-2xl p-2 text-center shadow-lg border border-cyan-400/30">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg border-2 border-white">
                <span className="text-2xl font-black tracking-tighter">9</span>
              </div>
              <span className="text-xs font-bold tracking-wider uppercase mt-2 text-cyan-200">Robbi9</span>
            </div>
          )}
        </div>
      </div>

      {/* Floating Shadow directly underneath */}
      <div
        className={`mt-1 rounded-[100%] bg-blue-950/60 blur-[3px] shadow-[0_0_12px_rgba(0,0,0,0.8)] animate-shadow-float ${shadowSizes[size]}`}
        aria-hidden="true"
      />
    </div>
  );
};
