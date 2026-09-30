import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle2, Video, CalendarPlus, Download, Sparkles } from 'lucide-react';
import { MeetingSchedule } from '../types';
import { sounds } from '../utils/audio';

interface MeetingSchedulerProps {
  onScheduleConfirmed: (schedule: MeetingSchedule) => void;
  initialSchedule?: MeetingSchedule;
}

// Available dates between 01/10 and 15/10 (focusing on weekdays in October)
const OCTOBER_DATES = [
  { id: '2026-10-01', display: '01/10 (Qui)', dateNum: '01', dayWeek: 'Quinta' },
  { id: '2026-10-02', display: '02/10 (Sex)', dateNum: '02', dayWeek: 'Sexta' },
  { id: '2026-10-05', display: '05/10 (Seg)', dateNum: '05', dayWeek: 'Segunda' },
  { id: '2026-10-06', display: '06/10 (Ter)', dateNum: '06', dayWeek: 'Terça' },
  { id: '2026-10-07', display: '07/10 (Qua)', dateNum: '07', dayWeek: 'Quarta' },
  { id: '2026-10-08', display: '08/10 (Qui)', dateNum: '08', dayWeek: 'Quinta' },
  { id: '2026-10-09', display: '09/10 (Sex)', dateNum: '09', dayWeek: 'Sexta' },
  { id: '2026-10-12', display: '12/10 (Seg)', dateNum: '12', dayWeek: 'Segunda' },
  { id: '2026-10-13', display: '13/10 (Ter)', dateNum: '13', dayWeek: 'Terça' },
  { id: '2026-10-14', display: '14/10 (Qua)', dateNum: '14', dayWeek: 'Quarta' },
  { id: '2026-10-15', display: '15/10 (Qui)', dateNum: '15', dayWeek: 'Quinta' },
];

const TIME_SLOTS = [
  '09:30 - 10:15',
  '11:00 - 11:45',
  '14:00 - 14:45',
  '15:30 - 16:15',
  '17:00 - 17:45',
];

export const MeetingScheduler: React.FC<MeetingSchedulerProps> = ({
  onScheduleConfirmed,
  initialSchedule
}) => {
  const [selectedDate, setSelectedDate] = useState<string>(initialSchedule?.date || '05/10/2026');
  const [selectedTime, setSelectedTime] = useState<string>(initialSchedule?.time || '14:00 - 14:45');
  const [meetingType, setMeetingType] = useState<'remoto' | 'hibrido'>('remoto');
  const [isSaved, setIsSaved] = useState<boolean>(!!initialSchedule);

  const handleConfirm = () => {
    sounds.playPop();
    setIsSaved(true);
    onScheduleConfirmed({
      date: selectedDate,
      time: selectedTime,
      meetingType
    });
  };

  // Generate Google Calendar Link
  const createGoogleCalendarUrl = () => {
    const title = encodeURIComponent('🚀 Fábrica de Ideias: Kick-off do seu Novo Agente com Robbi9');
    const details = encodeURIComponent(
      'Reunião especial de kick-off para o Inovador das próximas duas semanas na Fábrica de Ideias!\n\n' +
      'Pauta:\n' +
      '1. Validação da dor e escopo do seu agente com IA\n' +
      '2. Arquitetura e prototipação com a equipe Biti9\n' +
      '3. Rumo à publicação no ShowRoom de Inovações!\n\n' +
      'Mascote: Robbi9'
    );
    const location = encodeURIComponent(meetingType === 'remoto' ? 'Google Meet (Link no e-mail)' : 'Sala de Inovação Biti9 / Remoto');
    
    // Parse date for Google Calendar
    const [day, month, year] = selectedDate.split('/');
    const startTimeStr = selectedTime.split(' - ')[0].replace(':', '');
    const endTimeStr = selectedTime.split(' - ')[1].replace(':', '');
    const dateFormatted = `${year}${month}${day}`;
    
    const dates = `${dateFormatted}T${startTimeStr}00/${dateFormatted}T${endTimeStr}00`;
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  };

  // Download .ics file
  const downloadIcs = () => {
    sounds.playPop();
    const [day, month, year] = selectedDate.split('/');
    const startTimeStr = selectedTime.split(' - ')[0].replace(':', '');
    const endTimeStr = selectedTime.split(' - ')[1].replace(':', '');
    const dateFormatted = `${year}${month}${day}`;

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Fabrica de Ideias//Biti9 Robbi9//PT',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `SUMMARY:🚀 Fábrica de Ideias: Kick-off do seu Novo Agente com Robbi9`,
      `DESCRIPTION:Reuniao especial de kick-off para o Inovador das proximas duas semanas na Fabrica de Ideias.`,
      `DTSTART:${dateFormatted}T${startTimeStr}00`,
      `DTEND:${dateFormatted}T${endTimeStr}00`,
      `LOCATION:${meetingType === 'remoto' ? 'Google Meet' : 'Sala de Inovacao Biti9'}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `Reuniao-Fabrica-de-Ideias-${day}-${month}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-indigo-100 shadow-xl text-left">
      <div className="flex items-center justify-between pb-4 border-b border-indigo-50 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-indigo-100 text-indigo-700">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-base sm:text-lg">
              Agendar Reunião de Kick-off
            </h3>
            <p className="text-xs text-slate-500">
              Período especial: <span className="font-semibold text-indigo-600">01/10 a 15/10</span>
            </p>
          </div>
        </div>

        {isSaved && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Horário Reservado
          </span>
        )}
      </div>

      {/* Date selector pills */}
      <div className="mb-4">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
          1. Escolha a melhor data (01/10 a 15/10):
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {OCTOBER_DATES.map((d) => {
            const dateStr = `${d.dateNum}/10/2026`;
            const isSelected = selectedDate === dateStr;
            return (
              <button
                type="button"
                key={d.id}
                onClick={() => {
                  setSelectedDate(dateStr);
                  setIsSaved(false);
                }}
                className={`py-2 px-2 rounded-xl text-center transition-all border text-xs flex flex-col items-center justify-center cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-700 shadow-md scale-102 ring-2 ring-indigo-400'
                    : 'bg-slate-50 hover:bg-indigo-50/70 text-slate-700 border-slate-200'
                }`}
              >
                <span className="text-[10px] uppercase font-medium opacity-80">{d.dayWeek}</span>
                <span className="text-sm font-bold">{d.dateNum}/10</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time slots */}
      <div className="mb-5">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
          2. Escolha o melhor horário:
        </label>
        <div className="flex flex-wrap gap-2">
          {TIME_SLOTS.map((t) => {
            const isSelected = selectedTime === t;
            return (
              <button
                type="button"
                key={t}
                onClick={() => {
                  setSelectedTime(t);
                  setIsSaved(false);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-purple-600 text-white border-purple-700 shadow ring-2 ring-purple-300'
                    : 'bg-slate-50 hover:bg-purple-50 text-slate-700 border-slate-200'
                }`}
              >
                <Clock className="w-3.5 h-3.5 opacity-70" />
                {t}
              </button>
            );
          })}
        </div>
      </div>

      {/* Format */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100">
        <div className="flex items-center gap-4 text-xs text-slate-600">
          <span className="font-medium text-slate-700">Formato:</span>
          <label className="inline-flex items-center gap-1.5 cursor-pointer">
            <input
              type="radio"
              name="meetingFormat"
              checked={meetingType === 'remoto'}
              onChange={() => setMeetingType('remoto')}
              className="text-indigo-600"
            />
            <Video className="w-3.5 h-3.5 text-indigo-500" /> Remoto (Google Meet)
          </label>
          <label className="inline-flex items-center gap-1.5 cursor-pointer">
            <input
              type="radio"
              name="meetingFormat"
              checked={meetingType === 'hibrido'}
              onChange={() => setMeetingType('hibrido')}
              className="text-indigo-600"
            />
            Híbrido / Presencial
          </label>
        </div>

        <button
          type="button"
          onClick={handleConfirm}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
            isSaved
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
              : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          {isSaved ? 'Horário Confirmado!' : 'Confirmar Este Horário'}
        </button>
      </div>

      {/* Action buttons to put in Calendar */}
      {isSaved && (
        <div className="mt-4 p-3 bg-indigo-50/70 rounded-xl border border-indigo-100 flex flex-col sm:flex-row items-center justify-between gap-3 animate-fadeIn">
          <div className="text-xs text-indigo-900">
            <span className="font-semibold">Agendado para:</span> {selectedDate} às {selectedTime}
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a
              href={createGoogleCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white hover:bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-lg text-xs font-semibold shadow-sm transition-colors"
            >
              <CalendarPlus className="w-3.5 h-3.5 text-indigo-600" />
              Google Agenda
            </a>
            <button
              type="button"
              onClick={downloadIcs}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white hover:bg-indigo-50 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold shadow-sm transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              Baixar .ICS
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
