import React from 'react';
import { CheckCircle2, Clock, AlertTriangle, Eye, ShieldCheck, CloudRain, Wind, Thermometer, Droplets } from 'lucide-react';
import { TreatmentWindowEvaluation, DecisionState } from '../../server/types';

interface ActNowWaitCardProps {
  evaluation: TreatmentWindowEvaluation;
  cropRiskScore?: number;
}

export const ActNowWaitCard: React.FC<ActNowWaitCardProps> = ({ evaluation, cropRiskScore = 72 }) => {
  const { decision, suitabilityScore, statusText, reasons, actionWindow } = evaluation;

  const decisionConfig: Record<DecisionState, {
    label: string;
    subText: string;
    badgeClass: string;
    bgGradient: string;
    icon: React.ReactNode;
    accentColor: string;
  }> = {
    ACT_NOW: {
      label: 'ACT NOW',
      subText: 'Favorable weather conditions for field treatment.',
      badgeClass: 'badge-act-now',
      bgGradient: 'from-emerald-900 via-emerald-950 to-slate-900',
      icon: <CheckCircle2 className="w-10 h-10 text-emerald-400" />,
      accentColor: '#10b981'
    },
    WAIT: {
      label: 'WAIT',
      subText: 'Adverse weather risk detected. Postpone spray for safety.',
      badgeClass: 'badge-wait',
      bgGradient: 'from-amber-950 via-slate-900 to-amber-900',
      icon: <Clock className="w-10 h-10 text-amber-400" />,
      accentColor: '#f59e0b'
    },
    DO_NOT_ACT: {
      label: 'DO NOT ACT',
      subText: 'Hazardous field or weather conditions present.',
      badgeClass: 'badge-do-not-act',
      bgGradient: 'from-red-950 via-slate-900 to-red-900',
      icon: <AlertTriangle className="w-10 h-10 text-red-400" />,
      accentColor: '#ef4444'
    },
    MONITOR: {
      label: 'MONITOR',
      subText: 'No urgent chemical action required. Routine field checks.',
      badgeClass: 'badge-monitor',
      bgGradient: 'from-blue-950 via-slate-900 to-slate-900',
      icon: <Eye className="w-10 h-10 text-blue-400" />,
      accentColor: '#3b82f6'
    }
  };

  const currentConfig = decisionConfig[decision];

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${currentConfig.bgGradient} text-white p-6 sm:p-8 shadow-xl border border-white/10`}>
      
      {/* Decorative Radar Circle */}
      <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full border border-white/10 pointer-events-none opacity-20" />
      <div className="absolute -right-6 -top-6 w-48 h-48 rounded-full border border-white/10 pointer-events-none opacity-30" />

      {/* Header Label */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-300 bg-white/10 px-3 py-1 rounded-full backdrop-blur-md">
          Signature Decision Engine
        </span>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Deterministically Calculated</span>
        </div>
      </div>

      {/* Main Decision Banner */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* Big Decision Badge & Icon */}
        <div className="md:col-span-7 space-y-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
              {currentConfig.icon}
            </div>
            <div>
              <div className="text-sm font-medium text-slate-300">Action Recommendation</div>
              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight font-heading flex items-center gap-3">
                <span className={currentConfig.badgeClass}>
                  {currentConfig.label}
                </span>
              </div>
            </div>
          </div>

          <p className="text-lg font-medium text-slate-200 leading-snug">
            {currentConfig.subText}
          </p>

          {/* Key Why Reasons */}
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Why did KisanIQ decide this?
            </div>
            <ul className="space-y-1.5 text-sm text-slate-200">
              {reasons.map((reason, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Suitability Score Gauge */}
        <div className="md:col-span-5 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 flex flex-col justify-between items-center text-center">
          
          <div className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
            Treatment Suitability Score
          </div>

          <div className="relative flex items-center justify-center my-2">
            <svg className="w-32 h-32">
              <circle
                cx="64"
                cy="64"
                r="52"
                stroke="currentColor"
                strokeWidth="10"
                className="text-white/10"
                fill="transparent"
              />
              <circle
                cx="64"
                cy="64"
                r="52"
                stroke={currentConfig.accentColor}
                strokeWidth="10"
                strokeDasharray={326}
                strokeDashoffset={326 - (326 * suitabilityScore) / 100}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-3xl font-extrabold font-heading text-white">{suitabilityScore}</span>
              <span className="text-[10px] uppercase font-semibold text-slate-400">/ 100</span>
            </div>
          </div>

          <div className="text-xs font-bold tracking-wide uppercase px-3 py-1 rounded-md bg-white/10 text-slate-200">
            {statusText}
          </div>
        </div>
      </div>

    </div>
  );
};
