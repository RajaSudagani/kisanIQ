import React from 'react';
import { Play, Sparkles, AlertCircle, CheckCircle2, Clock, Eye } from 'lucide-react';
import { DEMO_SCENARIOS } from '../../server/services/demoScenarios';

interface DemoScenarioSelectorProps {
  onSelectScenario: (scenarioId: string) => void;
  isLoading?: boolean;
}

export const DemoScenarioSelector: React.FC<DemoScenarioSelectorProps> = ({ onSelectScenario, isLoading }) => {
  const scenarioList = Object.values(DEMO_SCENARIOS);

  return (
    <div className="kisaniq-card p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white rounded-2xl shadow-xl border border-emerald-800/60">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Hackathon Demo Center</span>
          </div>
          <h2 className="text-2xl font-extrabold font-heading text-white">
            Try KisanIQ Live Scenarios
          </h2>
          <p className="text-xs text-slate-300">
            Click any scenario to immediately experience KisanIQ field intelligence decision workflow in &lt;60 seconds.
          </p>
        </div>

        <span className="text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-3 py-1.5 rounded-full shrink-0">
          Instant 1-Click Execution
        </span>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {scenarioList.map((sc) => {
          const decisionBadge = sc.decision === 'ACT_NOW' ? 'badge-act-now text-xs py-1 px-2.5'
            : sc.decision === 'WAIT' ? 'badge-wait text-xs py-1 px-2.5'
            : sc.decision === 'DO_NOT_ACT' ? 'badge-do-not-act text-xs py-1 px-2.5'
            : 'badge-monitor text-xs py-1 px-2.5';

          return (
            <div
              key={sc.id}
              className="group bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/15 transition-all flex flex-col justify-between space-y-4 hover:border-emerald-400/50 hover:shadow-lg"
            >
              {/* Image Preview & Badge */}
              <div className="relative h-28 rounded-lg overflow-hidden border border-white/10">
                <img
                  src={sc.sampleImage}
                  alt={sc.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2">
                  <span className={decisionBadge}>{sc.decision}</span>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  {sc.confidence}% Conf.
                </div>
              </div>

              {/* Title & Issue */}
              <div className="space-y-1">
                <h4 className="font-bold text-white text-sm font-heading group-hover:text-emerald-300 transition-colors">
                  {sc.title}
                </h4>
                <p className="text-xs text-slate-300 line-clamp-1">
                  {sc.problem}
                </p>
                <div className="text-[11px] text-amber-300 font-medium">
                  {sc.decisionReason}
                </div>
              </div>

              {/* Trigger Button */}
              <button
                disabled={isLoading}
                onClick={() => onSelectScenario(sc.id)}
                className="w-full bg-emerald-700 hover:bg-emerald-600 active:bg-emerald-800 text-white font-semibold text-xs py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-sm disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Run Scenario</span>
              </button>
            </div>
          );
        })}
      </div>

    </div>
  );
};
