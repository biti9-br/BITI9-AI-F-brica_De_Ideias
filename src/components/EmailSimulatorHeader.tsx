import React, { useState } from 'react';
import { Mail, Volume2, VolumeX, Sparkles, RefreshCw, LayoutGrid, User } from 'lucide-react';
import { sounds } from '../utils/audio';

interface EmailSimulatorHeaderProps {
  innovatorName: string;
  onUpdateInnovatorName: (name: string) => void;
  onOpenShowroom: () => void;
  onRestart: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  currentStepTitle: string;
}

export const EmailSimulatorHeader: React.FC<EmailSimulatorHeaderProps> = ({
  innovatorName,
  onUpdateInnovatorName,
  onOpenShowroom,
  onRestart,
  soundEnabled,
  onToggleSound,
  currentStepTitle
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(innovatorName);

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempName.trim()) {
      onUpdateInnovatorName(tempName.trim());
    }
    setIsEditingName(false);
  };

  return (
    <header className="w-full bg-slate-900/90 backdrop-blur-md border-b border-indigo-900/50 text-white text-xs py-2 px-3 sm:px-6 sticky top-0 z-40 shadow-sm">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Brand / Email context */}
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            <Mail className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold tracking-wide">Fábrica de Ideias • Biti9</span>
          </div>
          <span className="hidden md:inline text-slate-400">|</span>
          <span className="hidden md:inline text-slate-300 truncate font-medium">
            Convite Surpresa do Inovador
          </span>
        </div>

        {/* User identification & utility controls */}
        <div className="flex items-center gap-2">
          {/* Innovator Name trigger */}
          {isEditingName ? (
            <form onSubmit={handleSaveName} className="flex items-center gap-1">
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                placeholder="Seu nome"
                className="bg-slate-800 border border-indigo-400 text-white px-2 py-0.5 rounded text-xs focus:outline-none"
                autoFocus
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 px-2 py-0.5 rounded text-[11px] font-semibold"
              >
                Salvar
              </button>
            </form>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditingName(true)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
              title="Clique para personalizar seu nome"
            >
              <User className="w-3 h-3 text-pink-400" />
              <span className="max-w-[120px] truncate font-medium">{innovatorName}</span>
              <span className="text-[10px] text-slate-400 underline">alterar</span>
            </button>
          )}

          {/* Showroom Button */}
          <button
            type="button"
            onClick={onOpenShowroom}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-900/60 hover:bg-indigo-800/70 text-indigo-200 border border-indigo-700/50 transition-colors cursor-pointer"
          >
            <LayoutGrid className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">ShowRoom</span>
          </button>

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={onToggleSound}
            className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
              soundEnabled
                ? 'bg-amber-400/20 text-amber-300 border-amber-400/30 hover:bg-amber-400/30'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
            }`}
            title={soundEnabled ? 'Silenciar efeitos sonoros' : 'Ativar efeitos comemorativos'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* Restart / Re-trigger Surprise */}
          <button
            type="button"
            onClick={onRestart}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700 transition-colors cursor-pointer"
            title="Reiniciar convite surpresa"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
