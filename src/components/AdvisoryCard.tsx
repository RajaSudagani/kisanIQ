import React from 'react';
import { AlertCircle, CheckCircle2, Clock, HelpCircle, ShieldAlert, Sparkles, Sprout } from 'lucide-react';
import { FarmerAdvisory } from '../../server/types';

interface AdvisoryCardProps {
  advisory: FarmerAdvisory;
}

export const AdvisoryCard: React.FC<AdvisoryCardProps> = ({ advisory }) => {
  return (
    <div className="kisaniq-card p-6 sm:p-8 bg-gradient-to-br from-emerald-900 to-slate-900 text-white rounded-2xl shadow-xl relative overflow-hidden">
      
      {/* Top Banner */}
      <div className="flex items-center justify-between gap-4 pb-4 mb-6 border-b border-emerald-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-400/20 text-emerald-300 flex items-center justify-center font-bold">
            <Sprout className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Instant Farmer Action Card
            </span>
            <h2 className="text-2xl font-extrabold font-heading text-white">{advisory.summaryTitle}</h2>
          </div>
        </div>

        <span className="text-xs font-semibold bg-white/10 px-3 py-1 rounded-full text-emerald-200 border border-white/10 hidden sm:inline-block">
          15-Second Action Guide
        </span>
      </div>

      {/* Grid of 5 Clear Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Section 1: Do This Now */}
        <div className="bg-white/5 backdrop-blur-md rounded-xl p-5 border border-white/10 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm uppercase tracking-wider">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>1. Do This Now</span>
          </div>
          <ul className="space-y-2 text-sm text-slate-200">
            {advisory.doNow.map((action, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="font-bold text-emerald-400">•</span>
                <span>{action}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 2: Treatment */}
        <div className="bg-white/5 backdrop-blur-md rounded-xl p-5 border border-white/10 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm uppercase tracking-wider">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <span>2. Treatment</span>
          </div>
          <p className="text-sm text-slate-200 leading-relaxed">
            {advisory.treatmentSummary}
          </p>
          <p className="text-xs text-slate-400 italic">
            Use approved products according to label guidance and local extension advice.
          </p>
        </div>

        {/* Section 3: Do Not Treat Yet (Conditional) */}
        {advisory.doNotTreatReason && (
          <div className="bg-amber-500/10 backdrop-blur-md rounded-xl p-5 border border-amber-500/30 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm uppercase tracking-wider">
              <AlertCircle className="w-5 h-5 text-amber-400" />
              <span>3. Do Not Treat Yet</span>
            </div>
            <p className="text-sm text-amber-200 font-semibold">
              {advisory.doNotTreatReason}
            </p>
          </div>
        )}

        {/* Section 4: Best Time To Act */}
        <div className="bg-emerald-500/10 backdrop-blur-md rounded-xl p-5 border border-emerald-500/30 space-y-2">
          <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm uppercase tracking-wider">
            <Clock className="w-5 h-5 text-emerald-400" />
            <span>{advisory.doNotTreatReason ? '4.' : '3.'} Best Time To Act</span>
          </div>
          <div className="text-xl font-extrabold text-white font-heading">
            {advisory.bestTimeToAct}
          </div>
        </div>

      </div>

      {/* Section 5: Why? */}
      <div className="mt-6 pt-4 border-t border-emerald-800/80 flex items-start gap-3 bg-white/5 p-4 rounded-xl">
        <HelpCircle className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300">
          <span className="font-bold text-amber-300 uppercase tracking-wide mr-1.5">Why this timing?</span>
          {advisory.whyDetails}
        </div>
      </div>

    </div>
  );
};
