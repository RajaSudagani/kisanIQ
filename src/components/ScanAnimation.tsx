import React, { useEffect, useState } from 'react';
import { Cpu, Leaf, CloudRain, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

const STAGES = [
  { label: 'Reading field image & leaf structure...', icon: Leaf },
  { label: 'Detecting visible foliage symptoms & lesions...', icon: Sparkles },
  { label: 'Estimating crop health severity & infection risk...', icon: Cpu },
  { label: 'Fetching live & forecast weather signals...', icon: CloudRain },
  { label: 'Evaluating treatment conditions with rule engine...', icon: ShieldCheck },
  { label: 'Preparing 15-second farmer field advisory...', icon: CheckCircle2 }
];

export const ScanAnimation: React.FC = () => {
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStage((prev) => (prev < STAGES.length - 1 ? prev + 1 : prev));
    }, 600); // Progress rapidly through stages

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="kisaniq-card p-8 sm:p-12 text-center bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white rounded-2xl shadow-2xl relative overflow-hidden border border-emerald-800/80 my-8">
      
      {/* Radar Scan Line effect */}
      <div className="radar-line" />

      {/* Central Visual Spinner */}
      <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20 border-t-emerald-400 animate-spin" />
        <div className="w-16 h-16 rounded-2xl bg-emerald-900/80 border border-emerald-500/40 text-emerald-300 flex items-center justify-center shadow-lg">
          <Cpu className="w-8 h-8 animate-pulse" />
        </div>
      </div>

      <h3 className="text-2xl font-extrabold text-white font-heading mb-2">
        KisanIQ Field Intelligence Engine
      </h3>
      <p className="text-xs text-slate-300 max-w-md mx-auto mb-8">
        Synthesizing multi-modal crop vision, local microclimate parameters, and spray safety rule thresholds.
      </p>

      {/* Stage Progression Checklist */}
      <div className="max-w-md mx-auto space-y-2.5 text-left bg-white/5 p-4 rounded-xl border border-white/10">
        {STAGES.map((st, idx) => {
          const Icon = st.icon;
          const isDone = idx < currentStage;
          const isCurrent = idx === currentStage;

          return (
            <div
              key={idx}
              className={`flex items-center gap-3 text-xs p-2 rounded-lg transition-all ${
                isCurrent
                  ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40'
                  : isDone
                  ? 'text-slate-300 opacity-80'
                  : 'text-slate-500 opacity-40'
              }`}
            >
              <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                isDone ? 'bg-emerald-500 text-slate-900' : isCurrent ? 'bg-amber-400 text-slate-900 animate-pulse' : 'bg-slate-700 text-slate-400'
              }`}>
                {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Icon className="w-3 h-3" />}
              </div>
              <span className="flex-1">{st.label}</span>
            </div>
          );
        })}
      </div>

    </div>
  );
};
