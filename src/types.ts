export interface InnovatorAnswers {
  q1_dor: string;
  q2_solucao: string;
  q3_frequencia: string;
}

export interface MeetingSchedule {
  date: string; // e.g. "05/10/2026"
  time: string; // e.g. "14:00"
  meetingType: 'remoto' | 'hibrido';
}

export interface SubmittedAgentIdea {
  id: string;
  innovatorName: string;
  innovatorRole?: string;
  agentName: string;
  dor: string;
  solucao: string;
  frequencia: string;
  meetingDate?: string;
  meetingTime?: string;
  status: 'Planejamento' | 'Em Construção' | 'Publicado no ShowRoom';
  submittedAt: string;
  benefits?: string[];
}
