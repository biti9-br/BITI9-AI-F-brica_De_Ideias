import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  PartyPopper,
  Calendar,
  Share2,
  Clock,
  Layers,
  Send,
  HelpCircle,
  Flame,
  Award,
  BookOpen
} from 'lucide-react';
import { Robbi9Mascot } from './components/Robbi9Mascot';
import { FestiveBackground } from './components/FestiveBackground';
import { MeetingScheduler } from './components/MeetingScheduler';
import { ExecutiveIdeaCard } from './components/ExecutiveIdeaCard';
import { ShowRoomGallery } from './components/ShowRoomGallery';
import { BITI9_LOGO_DATA } from './assets/biti9Logo';
import { InnovatorAnswers, MeetingSchedule, SubmittedAgentIdea } from './types';
import { firePartyConfetti, fireContinuousCelebration } from './utils/confetti';
import { sounds } from './utils/audio';

type AppStep = 'welcome' | 'q1' | 'q2' | 'q3' | 'final' | 'showroom';

export default function App() {
  const [step, setStep] = useState<AppStep>('welcome');
  const [innovatorName, setInnovatorName] = useState<string>('Inovador(a)');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  
  const [answers, setAnswers] = useState<InnovatorAnswers>({
    q1_dor: '',
    q2_solucao: '',
    q3_frequencia: ''
  });

  const [validationError, setValidationError] = useState<string | null>(null);
  const [schedule, setSchedule] = useState<MeetingSchedule | undefined>(undefined);
  const [submittedIdea, setSubmittedIdea] = useState<SubmittedAgentIdea | null>(null);

  // Trigger party confetti on initial welcome screen load
  useEffect(() => {
    const timer = setTimeout(() => {
      firePartyConfetti();
      sounds.playPartyHorn();
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const handleToggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    sounds.setEnabled(nextState);
  };

  const handleStartQuestions = () => {
    sounds.playFanfare();
    firePartyConfetti();
    setStep('q1');
  };

  const handleNextFromQ1 = () => {
    if (!answers.q1_dor.trim()) {
      setValidationError('Por favor, descreva brevemente a dor que você gostaria de resolver com IA.');
      return;
    }
    setValidationError(null);
    sounds.playPop();
    setStep('q2');
  };

  const handleNextFromQ2 = () => {
    if (!answers.q2_solucao.trim()) {
      setValidationError('Por favor, conte como você imagina o funcionamento desse agente.');
      return;
    }
    setValidationError(null);
    sounds.playPop();
    setStep('q3');
  };

  const handleFinish = () => {
    if (!answers.q3_frequencia.trim()) {
      setValidationError('Por favor, informe a frequência estimada de uso.');
      return;
    }
    setValidationError(null);

    // Create submitted idea record
    const newSubmission: SubmittedAgentIdea = {
      id: `agent-${Date.now()}`,
      innovatorName,
      agentName: `Robbi9 • ${answers.q1_dor.slice(0, 24)}...`,
      dor: answers.q1_dor,
      solucao: answers.q2_solucao,
      frequencia: answers.q3_frequencia,
      status: 'Planejamento',
      submittedAt: new Date().toLocaleDateString('pt-BR'),
      benefits: [
        'Eliminação de esforço manual repetitivo no dia a dia da equipe.',
        'Aceleração do tempo de resposta com precisão garantida por IA.'
      ]
    };
    setSubmittedIdea(newSubmission);

    sounds.playFanfare();
    fireContinuousCelebration(4);
    setStep('final');
  };

  const handleScheduleConfirmed = (sched: MeetingSchedule) => {
    setSchedule(sched);
    if (submittedIdea) {
      setSubmittedIdea({
        ...submittedIdea,
        meetingDate: sched.date,
        meetingTime: sched.time
      });
    }
  };

  const restartExperience = () => {
    sounds.playPop();
    setStep('welcome');
    setAnswers({ q1_dor: '', q2_solucao: '', q3_frequencia: '' });
    setSchedule(undefined);
    setTimeout(() => {
      firePartyConfetti();
      sounds.playPartyHorn();
    }, 300);
  };

  // Quick suggestion prompts for user convenience
  const q1Suggestions = [
    'Triagem manual e repetitiva de chamados e e-mails de clientes',
    'Conferência manual de relatórios e lançamentos em planilhas',
    'Digitação repetitiva de dados de notas fiscais e boletos no sistema',
    'Cobrança e acompanhamento diário de prazos de entregas de projetos'
  ];

  const q2Suggestions = [
    'Ele leria as mensagens recebidas, identificaria a prioridade e responderia as mais comuns automaticamente',
    'Ele extrairia os dados do documento PDF e preencheria diretamente os campos no nosso ERP',
    'Ele mandaria um resumo diário às 09h no Teams avisando os itens críticos que precisam da minha atenção'
  ];

  const q3Suggestions = [
    'Várias vezes ao dia (5x a 10x por dia)',
    '1 vez ao dia (rotina da manhã)',
    '2 a 3 vezes por semana',
    'Semanalmente',
    'Mensalmente (fechamento de mês)'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1528] via-[#0F1E36] to-[#080E1B] text-slate-100 flex flex-col font-sans selection:bg-pink-500 selection:text-white relative">
      <FestiveBackground />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 max-w-4xl mx-auto w-full">
        {/* ========================================================
            SCREEN 0: WELCOME / CONVITE SURPRESA (PARTY THEME)
            ======================================================== */}
        {step === 'welcome' && (
          <div className="w-full max-w-2xl text-center bg-[#0d1b33]/90 backdrop-blur-xl text-white rounded-3xl p-6 sm:p-10 shadow-2xl animate-scaleIn relative overflow-hidden">
            {/* Logo Biti9 Branca */}
            <div className="flex justify-center items-center mb-6">
              <img
                src={BITI9_LOGO_DATA}
                alt="Logo Biti9 Branca"
                className="h-11 sm:h-14 w-auto object-contain select-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
                loading="eager"
              />
            </div>

            {/* The exact requested message */}
            <div className="my-6 px-2 sm:px-6">
              <blockquote className="text-left font-normal text-white leading-relaxed tracking-tight bg-[#132442]/80 p-6 sm:p-8 rounded-2xl shadow-inner space-y-4">
                <p className="text-xl sm:text-2xl font-black text-center text-white leading-snug">
                  🎉 Eba! Você foi escolhido para ser o nosso Inovador das próximas semanas na Fábrica de Ideias! 🚀
                </p>
                <div className="pt-2 text-sm sm:text-base text-white leading-relaxed space-y-3">
                  <p className="font-semibold text-white">
                    Agora vamos transformar sua ideia em um agente! 🤖💡
                  </p>
                  <p className="text-white/90">
                    Para começarmos essa jornada, precisamos conhecer um pouquinho mais sobre o seu processo e suas necessidades. Por isso, você vai responder algumas perguntinhas que vão nos ajudar a construir um agente realmente útil para o seu dia a dia.
                  </p>
                  <p className="font-bold text-center text-white pt-2 text-base sm:text-lg">
                    Preparado para começar? Vamos nessa! 🎊✨
                  </p>
                </div>
              </blockquote>
            </div>

            {/* The exact requested button */}
            <div className="flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={handleStartQuestions}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 hover:from-blue-600 hover:via-blue-500 hover:to-blue-400 active:scale-95 text-white font-extrabold text-base sm:text-lg shadow-xl shadow-blue-900/40 transition-all duration-200 cursor-pointer flex items-center justify-center gap-3 group border-0 outline-none"
              >
                <span>clique aqui para começar</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            SCREEN 1: PERGUNTA 1
            "💡 Qual desafio do seu dia a dia você acredita que poderia ser resolvido com a ajuda da IA?
             Pense em uma tarefa repetitiva, demorada, manual ou que gera retrabalho e que poderia se tornar mais simples, rápida e eficiente com o uso da IA. 🤖✨"
            ======================================================== */}
        {step === 'q1' && (
          <div className="w-full max-w-2xl bg-[#0d1b33]/95 backdrop-blur-xl text-white rounded-3xl p-6 sm:p-9 shadow-2xl border border-blue-900/60 ring-4 ring-blue-500/10 animate-fadeIn text-left">
            {/* Question Header - Azul Marinho Destacado */}
            <div className="bg-[#122340] text-white rounded-2xl p-5 sm:p-6 border border-blue-800/40 shadow-inner mb-5">
              <h2 className="text-base sm:text-lg font-extrabold leading-snug text-white">
                💡 Qual desafio do seu dia a dia você acredita que poderia ser resolvido com a ajuda da IA?
              </h2>
              <p className="text-xs sm:text-sm text-blue-200/90 mt-2.5 leading-relaxed">
                Pense em uma tarefa repetitiva, demorada, manual ou que gera retrabalho e que poderia se tornar mais simples, rápida e eficiente com o uso da IA. 🤖✨
              </p>
            </div>

            {/* Response Area */}
            <div className="mb-5">
              <label htmlFor="q1-input" className="sr-only">
                Sua Resposta
              </label>
              <textarea
                id="q1-input"
                rows={5}
                required
                value={answers.q1_dor}
                onChange={(e) => {
                  setAnswers({ ...answers, q1_dor: e.target.value });
                  if (validationError) setValidationError(null);
                }}
                placeholder="Exemplo: Perco muito tempo conferindo e organizando manualmente relatórios e mensagens que chegam por e-mail todo início de expediente..."
                className={`w-full p-3.5 rounded-xl border ${
                  validationError ? 'border-rose-500 ring-2 ring-rose-500/30' : 'border-blue-900/80'
                } bg-[#091322]/90 focus:border-cyan-400 focus:ring-3 focus:ring-cyan-400/20 text-white placeholder-slate-400 text-sm focus:outline-none transition-all`}
                autoFocus
              />
            </div>

            {/* Validation Error */}
            {validationError && (
              <p className="text-xs text-rose-300 font-medium mb-4 bg-rose-950/60 p-2.5 rounded-lg border border-rose-800/60">
                ⚠️ {validationError}
              </p>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-blue-900/40">
              <button
                type="button"
                onClick={() => setStep('welcome')}
                className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Voltar ao início</span>
              </button>

              <button
                type="button"
                onClick={handleNextFromQ1}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 hover:from-blue-600 hover:to-cyan-500 text-white font-bold text-sm shadow-md shadow-blue-950/50 transition-all cursor-pointer flex items-center gap-2 active:scale-95 border border-cyan-400/30"
              >
                <span>Próxima Pergunta</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            SCREEN 2: PERGUNTA 2
            "🤖 Se você pudesse criar um agente para ajudar a resolver essa dor, como ele funcionaria?
             Imagine que você tivesse um assistente de IA trabalhando ao seu lado.
             O que ele faria para facilitar essa tarefa? Pense em quais informações ele receberia, quais etapas realizaria e qual resultado entregaria. 💡✨"
            ======================================================== */}
        {step === 'q2' && (
          <div className="w-full max-w-2xl bg-[#0d1b33]/95 backdrop-blur-xl text-white rounded-3xl p-6 sm:p-9 shadow-2xl border border-blue-900/60 ring-4 ring-blue-500/10 animate-fadeIn text-left">
            {/* Question Header - Azul Marinho Destacado */}
            <div className="bg-[#122340] text-white rounded-2xl p-5 sm:p-6 border border-blue-800/40 shadow-inner mb-5">
              <h2 className="text-base sm:text-lg font-extrabold leading-snug text-white">
                🤖 Se você pudesse criar um agente para ajudar a resolver essa dor, como ele funcionaria?
              </h2>
              <p className="text-xs sm:text-sm text-blue-200/90 mt-2.5 leading-relaxed">
                Imagine que você tivesse um assistente de IA trabalhando ao seu lado. O que ele faria para facilitar essa tarefa? Pense em quais informações ele receberia, quais etapas realizaria e qual resultado entregaria. 💡✨
              </p>
            </div>

            {/* Response Area */}
            <div className="mb-5">
              <label htmlFor="q2-input" className="sr-only">
                Sua Resposta
              </label>
              <textarea
                id="q2-input"
                rows={5}
                required
                value={answers.q2_solucao}
                onChange={(e) => {
                  setAnswers({ ...answers, q2_solucao: e.target.value });
                  if (validationError) setValidationError(null);
                }}
                placeholder="Exemplo: O agente receberia a planilha por Teams/e-mail, faria a leitura inteligente de todas as linhas com IA, corrigiria as inconsistências e me entregaria o resumo pronto..."
                className={`w-full p-3.5 rounded-xl border ${
                  validationError ? 'border-rose-500 ring-2 ring-rose-500/30' : 'border-blue-900/80'
                } bg-[#091322]/90 focus:border-cyan-400 focus:ring-3 focus:ring-cyan-400/20 text-white placeholder-slate-400 text-sm focus:outline-none transition-all`}
                autoFocus
              />
            </div>

            {/* Validation Error */}
            {validationError && (
              <p className="text-xs text-rose-300 font-medium mb-4 bg-rose-950/60 p-2.5 rounded-lg border border-rose-800/60">
                ⚠️ {validationError}
              </p>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-blue-900/40">
              <button
                type="button"
                onClick={() => setStep('q1')}
                className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Voltar à pergunta 1</span>
              </button>

              <button
                type="button"
                onClick={handleNextFromQ2}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 hover:from-blue-600 hover:to-cyan-500 text-white font-bold text-sm shadow-md shadow-blue-950/50 transition-all cursor-pointer flex items-center gap-2 active:scale-95 border border-cyan-400/30"
              >
                <span>Próxima Pergunta</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            SCREEN 3: PERGUNTA 3
            "📅 Com que frequência você usaria esse agente?
             Pense na sua rotina: quantas vezes você imagina que utilizaria esse agente?
             Pode ser por dia, por semana ou por mês. 🤖✨"
            ======================================================== */}
        {step === 'q3' && (
          <div className="w-full max-w-2xl bg-[#0d1b33]/95 backdrop-blur-xl text-white rounded-3xl p-6 sm:p-9 shadow-2xl border border-blue-900/60 ring-4 ring-blue-500/10 animate-fadeIn text-left">
            {/* Question Header - Azul Marinho Destacado */}
            <div className="bg-[#122340] text-white rounded-2xl p-5 sm:p-6 border border-blue-800/40 shadow-inner mb-5">
              <h2 className="text-base sm:text-lg font-extrabold leading-snug text-white">
                📅 Com que frequência você usaria esse agente?
              </h2>
              <p className="text-xs sm:text-sm text-blue-200/90 mt-2.5 leading-relaxed">
                Pense na sua rotina: quantas vezes você imagina que utilizaria esse agente? Pode ser por dia, por semana ou por mês. 🤖✨
              </p>
            </div>

            {/* Response Area */}
            <div className="mb-5">
              <label htmlFor="q3-input" className="sr-only">
                Sua Resposta
              </label>
              <textarea
                id="q3-input"
                rows={4}
                required
                value={answers.q3_frequencia}
                onChange={(e) => {
                  setAnswers({ ...answers, q3_frequencia: e.target.value });
                  if (validationError) setValidationError(null);
                }}
                placeholder="Exemplo: Usaria cerca de 3 a 4 vezes por dia, principalmente pela manhã e final da tarde..."
                className={`w-full p-3.5 rounded-xl border ${
                  validationError ? 'border-rose-500 ring-2 ring-rose-500/30' : 'border-blue-900/80'
                } bg-[#091322]/90 focus:border-cyan-400 focus:ring-3 focus:ring-cyan-400/20 text-white placeholder-slate-400 text-sm focus:outline-none transition-all`}
                autoFocus
              />
            </div>

            {/* Validation Error */}
            {validationError && (
              <p className="text-xs text-rose-300 font-medium mb-4 bg-rose-950/60 p-2.5 rounded-lg border border-rose-800/60">
                ⚠️ {validationError}
              </p>
            )}

            {/* Action Buttons with the exact "Finalizar" button */}
            <div className="flex items-center justify-between pt-4 border-t border-blue-900/40">
              <button
                type="button"
                onClick={() => setStep('q2')}
                className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Voltar à pergunta 2</span>
              </button>

              <button
                type="button"
                onClick={handleFinish}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 hover:from-blue-600 hover:to-cyan-500 text-white font-extrabold text-base shadow-lg shadow-blue-950/50 transition-all duration-200 active:scale-95 cursor-pointer flex items-center gap-2 group border border-cyan-400/30"
              >
                <span>Finalizar</span>
                <CheckCircle className="w-5 h-5 text-cyan-200 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            SCREEN 4: FINAL COMPLETION SCREEN
            "O robbi 9 aparece de novo com o tema 'Vamos contruiri uma ideia inovadora juntos'"
            "Prontinho, agora estamos prontos para dar inicio a construção do seu agente, vamos te ajudar desde o planejamento do seu agente até a publicação do seu agente no nosso ShowRoom, precisamos da sua presença na nossa reunião das entre as datas 01/10 a 15/10. "
            ======================================================== */}
        {step === 'final' && (
          <div className="w-full max-w-3xl space-y-6 animate-scaleIn">
            {/* Celebration Hero Card */}
            <div className="bg-[#0d1b33]/95 backdrop-blur-xl text-white rounded-3xl p-6 sm:p-9 shadow-2xl border border-blue-900/60 ring-4 ring-blue-500/10 text-center relative overflow-hidden">
              {/* Theme requested: "Vamos contruiri uma ideia inovadora juntos" */}
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-600 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg mb-4 border border-cyan-400/30">
                <Sparkles className="w-4 h-4 text-cyan-200" />
                <span>Vamos contruiri uma ideia inovadora juntos</span>
              </div>

              {/* Exact requested final message */}
              <div className="my-4 px-2 sm:px-4">
                <blockquote className="text-left font-normal text-white leading-relaxed bg-[#122340] p-6 sm:p-8 rounded-2xl border border-blue-800/40 shadow-inner space-y-4">
                  <p className="text-lg sm:text-xl font-bold text-center text-white leading-snug">
                    🎉 Prontinho! Agora estamos prontos para dar início à construção do seu agente! 🤖💡
                  </p>
                  <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed">
                    A partir de agora, vamos te acompanhar em todas as etapas, desde o planejamento e desenvolvimento até a publicação do seu agente no nosso ShowRoom. 🚀
                  </p>
                  <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed">
                    Para essa jornada acontecer, contamos com a sua participação nas reuniões entre os dias 01/10 e 15/10. Esse será o momento de tirar a ideia do papel e transformar sua necessidade em uma solução com IA! ✨
                  </p>
                  <p className="text-base sm:text-lg font-extrabold text-center text-cyan-300 pt-2">
                    Nos vemos lá! 🚀🤖
                  </p>
                </blockquote>
              </div>

              {/* Botão para voltar ao início */}
              <div className="pt-2 flex justify-center">
                <button
                  type="button"
                  onClick={restartExperience}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 hover:from-blue-600 hover:to-cyan-500 active:scale-95 text-white font-bold text-sm shadow-lg shadow-blue-950/50 transition-all cursor-pointer flex items-center gap-2 border border-cyan-400/30"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Voltar ao início</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            SCREEN 5: SHOWROOM GALLERY
            ======================================================== */}
        {step === 'showroom' && (
          <ShowRoomGallery
            currentSubmission={submittedIdea}
            onBackToApp={() => {
              sounds.playPop();
              setStep(submittedIdea ? 'final' : 'welcome');
            }}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full py-4 text-center text-xs text-slate-500 border-t border-slate-800/80 bg-slate-950/60 mt-auto">
        <p className="flex items-center justify-center gap-1.5 flex-wrap">
          <span>Fábrica de Ideias • Biti9</span>
          <span>•</span>
          <span>Mascote Oficial Robbi9</span>
          <span>•</span>
          <span>Inovação Contínua & Inteligência Artificial</span>
        </p>
      </footer>
    </div>
  );
}
