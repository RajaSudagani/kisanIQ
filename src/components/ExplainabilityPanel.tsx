import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Eye, CloudRain, Cpu } from 'lucide-react';

interface ExplainabilityPanelProps {
  whyExplainability: {
    visualEvidence: string;
    weatherEvidence: string;
    decisionLogic: string;
  };
}

export const ExplainabilityPanel: React.FC<ExplainabilityPanelProps> = ({ whyExplainability }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="kisaniq-card p-6 bg-white border-emerald-100">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left focus:outline-none"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base font-heading">
              Why did KisanIQ recommend this?
            </h3>
            <p className="text-xs text-slate-500">Transparent AI explainability breakdown</p>
          </div>
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
      </button>

      {isOpen && (
        <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Visual Evidence */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
              <Eye className="w-4 h-4 text-emerald-600" />
              <span>1. Visual Evidence</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              {whyExplainability.visualEvidence}
            </p>
          </div>

          {/* Weather Evidence */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-800">
              <CloudRain className="w-4 h-4 text-blue-600" />
              <span>2. Weather Evidence</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              {whyExplainability.weatherEvidence}
            </p>
          </div>

          {/* Decision Logic */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800">
              <Cpu className="w-4 h-4 text-amber-600" />
              <span>3. Rule Engine Logic</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              {whyExplainability.decisionLogic}
            </p>
          </div>

        </div>
      )}
    </div>
  );
};
