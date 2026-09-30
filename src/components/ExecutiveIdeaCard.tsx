import React, { useState } from 'react';
import { Copy, Check, Presentation, FileText, Sparkles, Share2 } from 'lucide-react';
import { InnovatorAnswers } from '../types';
import { sounds } from '../utils/audio';

interface ExecutiveIdeaCardProps {
  answers: InnovatorAnswers;
  innovatorName?: string;
}

export const ExecutiveIdeaCard: React.FC<ExecutiveIdeaCardProps> = ({
  answers,
  innovatorName = 'Inovador Biti9'
}) => {
  const [copied, setCopied] = useState(false);

  // Derive smart executive summary based on the answers
  const deriveExecutiveContent = () => {
    const rawDor = answers.q1_dor.trim() || 'Processos manuais e repetitivos que consomem tempo produtivo da equipe.';
    const rawSolucao = answers.q2_solucao.trim() || 'Agente de IA inteligente integrado ao fluxo de trabalho que automatiza a triagem e execução das tarefas.';
    const rawFreq = answers.q3_frequencia.trim() || 'Uso contínuo semanal';

    // Format concise "O que o robô faz"
    const whatItDoes = rawSolucao.length > 180 
      ? rawSolucao.slice(0, 180) + '...'
      : rawSolucao;

    // Derive 2 business benefits
    const benefit1 = `Redução expressiva de tempo operacional gasto com "${rawDor.slice(0, 70)}${rawDor.length > 70 ? '...' : ''}", liberando o colaborador para atividades estratégicas.`;
    const benefit2 = `Aumento da consistência e agilidade das entregas (${rawFreq}), mitigando gargalos e riscos de retrabalho manual.`;

    // Suggest a catchy agent name
    let agentName = 'Agente Inovador';
    const words = rawDor.split(' ').filter(w => w.length > 4);
    if (words.length > 0) {
      agentName = `Robbi9 • ${words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase()} Assist`;
    }

    return {
      agentName,
      whatItDoes,
      benefit1,
      benefit2,
      rawFreq
    };
  };

  const executive = deriveExecutiveContent();

  // Strict slide text format
  const copySlideText = `**O que o robô faz:** ${executive.whatItDoes}\n\n**Benefício 1:** ${executive.benefit1}\n\n**Benefício 2:** ${executive.benefit2}`;

  const handleCopy = () => {
    sounds.playPop();
    navigator.clipboard.writeText(copySlideText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-7 shadow-2xl border border-slate-700/80 text-left relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md">
            <Presentation className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                Resumo Executivo (Slide PDD)
              </span>
              <span className="text-xs text-slate-400">Por {innovatorName}</span>
            </div>
            <h4 className="text-lg font-bold text-white mt-0.5">
              {executive.agentName}
            </h4>
          </div>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 active:bg-white/30 text-white border border-white/10 transition-all cursor-pointer shadow-sm"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-300">Copiado para o Slide!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-indigo-300" />
              <span>Copiar Texto do Slide</span>
            </>
          )}
        </button>
      </div>

      {/* Executive Translation Format */}
      <div className="mt-5 space-y-4 relative z-10 text-sm">
        {/* O que o robô faz */}
        <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/60">
          <span className="block text-xs uppercase font-extrabold tracking-wider text-indigo-400 mb-1 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5" />
            O que o robô faz:
          </span>
          <p className="text-slate-200 text-sm leading-relaxed">
            {executive.whatItDoes}
          </p>
        </div>

        {/* Benefício 1 */}
        <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/60">
          <span className="block text-xs uppercase font-extrabold tracking-wider text-emerald-400 mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Benefício 1:
          </span>
          <p className="text-slate-200 text-sm leading-relaxed">
            {executive.benefit1}
          </p>
        </div>

        {/* Benefício 2 */}
        <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/60">
          <span className="block text-xs uppercase font-extrabold tracking-wider text-amber-400 mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Benefício 2:
          </span>
          <p className="text-slate-200 text-sm leading-relaxed">
            {executive.benefit2}
          </p>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400">
        <div>
          Frequência estimada de uso: <strong className="text-slate-200">{answers.q3_frequencia || 'Periódico'}</strong>
        </div>
        <div className="text-[11px] text-slate-500 italic mt-1 sm:mt-0">
          Pronto para ser apresentado na reunião de kick-off e inserido no ShowRoom
        </div>
      </div>
    </div>
  );
};
