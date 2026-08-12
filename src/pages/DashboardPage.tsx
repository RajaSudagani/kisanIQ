import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, CloudRain, Wind, Thermometer, Droplets, Clock, AlertTriangle, ShieldCheck, ArrowRight, Activity, Sprout } from 'lucide-react';
import { AnalysisResponse } from '../../server/types';
import { getAnalysisHistory } from '../services/storage';

interface DashboardPageProps {
  currentAnalysis?: AnalysisResponse;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ currentAnalysis }) => {
  const history = getAnalysisHistory();
  const latest = currentAnalysis || (history.length > 0 ? history[0] : null);

  return (
    <div className="space-y-8 py-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
            <Activity className="w-4 h-4 text-emerald-600" />
            <span>Field Intelligence Center</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 font-heading">
            Agricultural Dashboard
          </h1>
          <p className="text-xs text-slate-500">
            Real-time crop risk status, microclimate conditions, and spray timing advisory
          </p>
        </div>

        <Link to="/analyze" className="btn-primary text-xs py-2.5 px-4 shadow-md">
          <Leaf className="w-4 h-4" />
          <span>New Field Analysis</span>
        </Link>
      </div>

      {/* TOP-LEVEL METRICS CARDS GRID (Section 12) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1: Field Health */}
        <div className="kisaniq-card p-5 space-y-3 bg-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">Field Health</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Sprout className="w-4 h-4" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center pt-1">
            <div className="bg-emerald-50 p-2 rounded-lg border border-emerald-100">
              <div className="text-lg font-extrabold text-emerald-700">2</div>
              <div className="text-[10px] text-emerald-800 font-semibold">Healthy</div>
            </div>
            <div className="bg-amber-50 p-2 rounded-lg border border-amber-100">
              <div className="text-lg font-extrabold text-amber-700">1</div>
              <div className="text-[10px] text-amber-800 font-semibold">Attention</div>
            </div>
            <div className="bg-red-50 p-2 rounded-lg border border-red-100">
              <div className="text-lg font-extrabold text-red-700">0</div>
              <div className="text-[10px] text-red-800 font-semibold">Critical</div>
            </div>
          </div>
        </div>

        {/* Card 2: Weather Overview */}
        <div className="kisaniq-card p-5 space-y-3 bg-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">Live Weather</span>
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
              <CloudRain className="w-4 h-4" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1.5 text-slate-700 font-medium">
              <Thermometer className="w-3.5 h-3.5 text-amber-500" />
              <span>{latest ? latest.weather.temperature : 28}°C</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-700 font-medium">
              <Droplets className="w-3.5 h-3.5 text-cyan-500" />
              <span>{latest ? latest.weather.humidity : 78}% RH</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-700 font-medium">
              <CloudRain className="w-3.5 h-3.5 text-blue-500" />
              <span>{latest ? latest.weather.rainProb : 74}% Rain</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-700 font-medium">
              <Wind className="w-3.5 h-3.5 text-teal-500" />
              <span>{latest ? latest.weather.windSpeed : 10} km/h</span>
            </div>
          </div>
        </div>

        {/* Card 3: Crop Risk Score */}
        <div className="kisaniq-card p-5 space-y-3 bg-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">Crop Risk Score</span>
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-3xl font-extrabold text-slate-900 font-heading">
              {latest ? latest.cropRiskScore : 72} <span className="text-sm font-semibold text-slate-400">/ 100</span>
            </div>
            <span className="text-xs font-bold uppercase px-2.5 py-1 rounded bg-amber-100 text-amber-800 border border-amber-200">
              Moderate Risk
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-amber-500 h-full rounded-full"
              style={{ width: `${latest ? latest.cropRiskScore : 72}%` }}
            />
          </div>
        </div>

        {/* Card 4: Today's Decision */}
        <div className="kisaniq-card p-5 space-y-3 bg-gradient-to-br from-emerald-900 to-slate-900 text-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-emerald-400 tracking-wider">Today's Decision</span>
            <div className="w-8 h-8 rounded-lg bg-white/10 text-emerald-300 flex items-center justify-center font-bold">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="badge-wait text-xs py-1 px-3">
              {latest ? latest.treatmentEvaluation.decision : 'WAIT'}
            </span>
          </div>
          <p className="text-xs text-slate-300 line-clamp-1 font-medium">
            "{latest ? latest.treatmentEvaluation.reasons[0] : 'Rain expected within next 4 hours.'}"
          </p>
          <div className="pt-2 border-t border-white/10 text-[11px] text-amber-300 font-semibold flex items-center gap-1">
            <span>Best window:</span>
            <span>{latest ? `${latest.treatmentEvaluation.actionWindow.dayLabel} ${latest.treatmentEvaluation.actionWindow.timeRange}` : 'Tomorrow 6:00 AM – 9:00 AM'}</span>
          </div>
        </div>

      </div>

      {/* LATEST ANALYSIS DETAILED HIGHLIGHT */}
      {latest && (
        <div className="kisaniq-card p-6 bg-white border-emerald-200 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Active Field Report
              </span>
              <h2 className="text-xl font-bold text-slate-900 font-heading">
                {latest.crop} — {latest.diagnosis.likelyIssue}
              </h2>
            </div>
            <Link
              to="/result"
              className="btn-secondary text-xs py-2 px-3 self-start sm:self-center flex items-center gap-1"
            >
              <span>View Full AI Advisory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-slate-500 font-semibold block mb-0.5">Confidence Level</span>
              <span className="text-base font-extrabold text-slate-800">{latest.diagnosis.confidence}%</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-slate-500 font-semibold block mb-0.5">Infection Severity</span>
              <span className="text-base font-extrabold text-amber-600">{latest.diagnosis.severity}</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-slate-500 font-semibold block mb-0.5">Spray Safety Status</span>
              <span className="text-base font-extrabold text-emerald-700">{latest.treatmentEvaluation.statusText}</span>
            </div>
          </div>
        </div>
      )}

      {/* RECENT ANALYSES TABLE */}
      <div className="kisaniq-card p-6 bg-white space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 font-heading">Recent Field Analyses</h3>
          <Link to="/history" className="text-xs font-bold text-emerald-700 hover:underline">
            View All History ({history.length})
          </Link>
        </div>

        {history.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300 text-xs text-slate-500">
            No saved field analyses yet. Click "New Field Analysis" to inspect your crop!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">Crop</th>
                  <th className="p-3">Diagnosis</th>
                  <th className="p-3">Severity</th>
                  <th className="p-3">Decision</th>
                  <th className="p-3">Best Window</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {history.slice(0, 5).map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3 font-bold text-slate-800">{item.crop}</td>
                    <td className="p-3 text-slate-700">{item.diagnosis.likelyIssue}</td>
                    <td className="p-3 font-semibold text-amber-700">{item.diagnosis.severity}</td>
                    <td className="p-3 font-bold">
                      <span className={
                        item.treatmentEvaluation.decision === 'ACT_NOW' ? 'text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded'
                        : item.treatmentEvaluation.decision === 'WAIT' ? 'text-amber-700 bg-amber-50 px-2 py-0.5 rounded'
                        : 'text-blue-700 bg-blue-50 px-2 py-0.5 rounded'
                      }>
                        {item.treatmentEvaluation.decision}
                      </span>
                    </td>
                    <td className="p-3 text-slate-600 font-medium">
                      {item.treatmentEvaluation.actionWindow.dayLabel} {item.treatmentEvaluation.actionWindow.timeRange}
                    </td>
                    <td className="p-3">
                      <Link to="/result" className="text-emerald-700 font-bold hover:underline">
                        Open Report
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};
