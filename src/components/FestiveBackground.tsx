import React from 'react';

export const FestiveBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 select-none">
      {/* Dynamic colorful gradients attuned to navy blue */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
      <div className="absolute top-3/4 -left-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />

      {/* Floating festive confetti / party streamers dots */}
      <div className="absolute top-12 left-12 w-3 h-3 rounded-full bg-pink-400 opacity-60 animate-ping" style={{ animationDuration: '3s' }} />
      <div className="absolute top-24 right-20 w-4 h-4 rounded-full bg-amber-400 opacity-70 animate-bounce" style={{ animationDuration: '4s' }} />
      <div className="absolute top-1/2 left-8 w-3 h-3 rounded-md rotate-45 bg-indigo-400 opacity-60 animate-pulse" />
      <div className="absolute bottom-24 right-16 w-3 h-3 rounded-full bg-emerald-400 opacity-70 animate-bounce" style={{ animationDuration: '3.5s' }} />
      <div className="absolute bottom-16 left-24 w-4 h-4 rounded-md rotate-12 bg-purple-400 opacity-50" />
      
      {/* Subtle party garland / flags across top */}
      <div className="absolute top-0 inset-x-0 flex justify-around opacity-40">
        {[
          '#F43F5E', '#3B82F6', '#F59E0B', '#10B981', '#8B5CF6', 
          '#EC4899', '#06B6D4', '#F43F5E', '#3B82F6', '#F59E0B'
        ].map((color, i) => (
          <div
            key={i}
            className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[18px] transition-transform duration-700 hover:scale-125"
            style={{ borderTopColor: color }}
          />
        ))}
      </div>
    </div>
  );
};
