import React, { useState } from 'react';
import { Sparkles, Bot, Layers, CheckCircle2, Search, ArrowRight, Star, Tag } from 'lucide-react';
import { SubmittedAgentIdea } from '../types';

interface ShowRoomGalleryProps {
  currentSubmission?: SubmittedAgentIdea | null;
  onBackToApp: () => void;
}

const PRESET_SHOWROOM_AGENTS: SubmittedAgentIdea[] = [
  {
    id: 'showroom-1',
    innovatorName: 'Carlos Mendes',
    innovatorRole: 'Operações & Logística',
    agentName: 'Robbi9 • Despacho Expresso',
    dor: 'Demora na validação de comprovantes de frete e atualização manual de status nos pedidos de transporte.',
    solucao: 'Agente que extrai dados via OCR de romaneios e notas fiscais, conferindo automaticamente no ERP e notificando o time via Teams.',
    frequencia: 'Diariamente (mais de 15x por dia)',
    status: 'Publicado no ShowRoom',
    submittedAt: '15/09/2026',
    benefits: [
      'Economia de 3 horas/dia da equipe operacional em digitação de romaneios.',
      'Rastreabilidade em tempo real com zero erros de digitação de valores.'
    ]
  },
  {
    id: 'showroom-2',
    innovatorName: 'Juliana Costa',
    innovatorRole: 'Recursos Humanos',
    agentName: 'Robbi9 • Onboarding Buddy',
    dor: 'Envio manual de kits de boas-vindas, agendamento de treinamentos iniciais e coleta de documentos de novos contratados.',
    solucao: 'Agente conversacional que guia o novo colaborador no Slack/Teams, agenda as reuniões de integração e valida envio dos documentos.',
    frequencia: 'Semanalmente a cada nova turma de colaboradores',
    status: 'Publicado no ShowRoom',
    submittedAt: '01/09/2026',
    benefits: [
      '100% de pontualidade no recebimento de acessos e documentos no dia 1.',
      'Aumento da satisfação (eNPS) dos novos colaboradores nos primeiros 30 dias.'
    ]
  },
  {
    id: 'showroom-3',
    innovatorName: 'Roberto Silveira',
    innovatorRole: 'Financeiro & Controladoria',
    agentName: 'Robbi9 • Conciliador Bancário IA',
    dor: 'Conciliação manual de extratos de 6 contas bancárias diferentes com relatórios de vendas do sistema legado.',
    solucao: 'Agente autônomo que consolida os extratos às 06h da manhã, cruza divergências com aprendizado de máquina e gera o relatório para aprovação.',
    frequencia: 'Diariamente às 06:00',
    status: 'Publicado no ShowRoom',
    submittedAt: '18/08/2026',
    benefits: [
      'Fechamento diário concluído em 15 minutos em vez de 2h30.',
      'Identificação preventiva de tarifas indevidas e pagamentos duplicados.'
    ]
  }
];

export const ShowRoomGallery: React.FC<ShowRoomGalleryProps> = ({
  currentSubmission,
  onBackToApp
}) => {
  const [filter, setFilter] = useState<'all' | 'publicados' | 'planejamento'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const allAgents = [
    ...(currentSubmission ? [currentSubmission] : []),
    ...PRESET_SHOWROOM_AGENTS
  ];

  const filtered = allAgents.filter(agent => {
    const matchesSearch = 
      agent.agentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.innovatorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.dor.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;
    if (filter === 'publicados') return agent.status === 'Publicado no ShowRoom';
    if (filter === 'planejamento') return agent.status !== 'Publicado no ShowRoom';
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 text-left animate-fadeIn">
      {/* Showroom Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl border border-indigo-500/20 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Vitrine de Inovações • Biti9
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              ShowRoom Fábrica de Ideias
            </h2>
            <p className="text-slate-300 text-sm max-w-xl mt-1">
              Conheça os agentes criados pelos inovadores das rodadas anteriores e acompanhe a evolução do seu novo agente até o lançamento!
            </p>
          </div>

          <button
            type="button"
            onClick={onBackToApp}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 transition-all cursor-pointer flex items-center gap-2"
          >
            <span>Voltar ao Convite do Robbi9</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="mt-6 pt-5 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por dor, agente ou autor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Todos ({allAgents.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('planejamento')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                filter === 'planejamento'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Em Planejamento ({allAgents.filter(a => a.status !== 'Publicado no ShowRoom').length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('publicados')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                filter === 'publicados'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Publicados ({PRESET_SHOWROOM_AGENTS.length})
            </button>
          </div>
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((agent) => {
          const isCurrent = agent.id === currentSubmission?.id;
          return (
            <div
              key={agent.id}
              className={`rounded-2xl p-6 transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                isCurrent
                  ? 'bg-gradient-to-br from-indigo-900/90 via-purple-900/80 to-slate-900 border-2 border-amber-400 shadow-2xl text-white ring-4 ring-amber-400/20'
                  : 'bg-white border border-slate-200 hover:shadow-xl text-slate-800'
              }`}
            >
              {isCurrent && (
                <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-400 to-amber-500 text-slate-900 font-extrabold text-[10px] uppercase tracking-wider px-4 py-1 rounded-bl-xl shadow flex items-center gap-1">
                  <Star className="w-3 h-3 fill-slate-900" />
                  Sua Ideia Desta Rodada!
                </div>
              )}

              <div>
                {/* Status & Category */}
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      agent.status === 'Publicado no ShowRoom'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-900 border border-amber-300'
                    }`}
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    {agent.status}
                  </span>
                  <span className={`text-xs ${isCurrent ? 'text-indigo-200' : 'text-slate-400'}`}>
                    {agent.submittedAt}
                  </span>
                </div>

                {/* Title */}
                <h3 className={`text-lg font-bold mb-2 flex items-center gap-2 ${isCurrent ? 'text-amber-200' : 'text-slate-900'}`}>
                  <Bot className={`w-5 h-5 ${isCurrent ? 'text-amber-400' : 'text-indigo-600'}`} />
                  {agent.agentName}
                </h3>

                <p className={`text-xs mb-3 font-medium ${isCurrent ? 'text-slate-300' : 'text-slate-500'}`}>
                  Idealizado por: <strong className={isCurrent ? 'text-white' : 'text-slate-700'}>{agent.innovatorName}</strong>
                  {agent.innovatorRole && ` (${agent.innovatorRole})`}
                </p>

                {/* Dor resolvida */}
                <div className={`p-3 rounded-xl mb-3 text-xs ${isCurrent ? 'bg-slate-800/80 border border-slate-700' : 'bg-slate-50 border border-slate-100'}`}>
                  <span className={`block font-semibold mb-1 ${isCurrent ? 'text-indigo-300' : 'text-indigo-700'}`}>
                    🎯 Dor do dia a dia atendida:
                  </span>
                  <p className={isCurrent ? 'text-slate-200' : 'text-slate-600'}>{agent.dor}</p>
                </div>

                {/* Como Funciona */}
                <div className={`p-3 rounded-xl text-xs mb-4 ${isCurrent ? 'bg-slate-800/80 border border-slate-700' : 'bg-slate-50 border border-slate-100'}`}>
                  <span className={`block font-semibold mb-1 ${isCurrent ? 'text-purple-300' : 'text-purple-700'}`}>
                    ⚙️ Mecânica do Agente com IA:
                  </span>
                  <p className={isCurrent ? 'text-slate-200' : 'text-slate-600'}>{agent.solucao}</p>
                </div>

                {/* Benefits */}
                {agent.benefits && (
                  <div className="space-y-1 mb-4">
                    {agent.benefits.map((b, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-xs">
                        <Sparkles className={`w-3 h-3 mt-0.5 shrink-0 ${isCurrent ? 'text-amber-400' : 'text-indigo-500'}`} />
                        <span className={isCurrent ? 'text-slate-200' : 'text-slate-600'}>{b}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div className={`pt-3 border-t flex items-center justify-between text-xs ${isCurrent ? 'border-slate-800 text-slate-300' : 'border-slate-100 text-slate-500'}`}>
                <span>Frequência: <strong className={isCurrent ? 'text-white' : 'text-slate-700'}>{agent.frequencia}</strong></span>
                {agent.meetingDate && (
                  <span className="text-amber-400 font-semibold">
                    Kick-off: {agent.meetingDate}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
