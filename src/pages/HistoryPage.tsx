import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { History, Trash2, ArrowRight, Calendar, Leaf, Filter } from 'lucide-react';
import { AnalysisResponse } from '../../server/types';
import { getAnalysisHistory, clearAnalysisHistory } from '../services/storage';

interface HistoryPageProps {
  onSelectAnalysis: (analysis: AnalysisResponse) => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({ onSelectAnalysis }) => {
  const [history, setHistory] = useState<AnalysisResponse[]>(getAnalysisHistory());
  const [cropFilter, setCropFilter] = useState<string>('ALL');

  const handleClear = () => {
    if (confirm('Are you sure you want to clear your local field analysis history?')) {
      clearAnalysisHistory();
      setHistory([]);
    }
  };

  const filteredHistory = cropFilter === 'ALL'
    ? history
    : history.filter(item => item.crop === cropFilter);

  return (
    <div className="space-y-8 py-6 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
            <History className="w-4 h-4 text-emerald-600" />
            <span>LocalStorage Persistence</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 font-heading">
            Field Inspection History
          </h1>
          <p className="text-xs text-slate-500">
            Review past crop diagnoses, weather decisions, and recommended treatment windows saved on this device.
          </p>
        </div>

        {history.length > 0 && (
          <button
            onClick={handleClear}
            className="text-xs text-red-600 font-bold hover:text-red-700 flex items-center gap-1.5 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-lg border border-red-200 transition-colors self-start sm:self-center"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs font-medium">
        <span className="text-slate-500 font-bold flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" />
          <span>Filter Crop:</span>
        </span>
        {['ALL', 'Tomato', 'Rice', 'Cotton', 'Chili', 'Maize'].map((c) => (
          <button
            key={c}
            onClick={() => setCropFilter(c)}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              cropFilter === c
                ? 'bg-emerald-900 text-white font-bold border-emerald-900'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* History List */}
      {filteredHistory.length === 0 ? (
        <div className="kisaniq-card p-12 text-center bg-white space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
            <Leaf className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 font-heading">No Saved Field Analyses</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Run your first crop field analysis to store history on this device.
          </p>
          <Link to="/analyze" className="btn-primary text-xs py-2.5 px-4 inline-flex">
            <span>Analyze Crop Now</span>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredHistory.map((item) => (
            <div
              key={item.id}
              className="kisaniq-card p-6 bg-white hover:border-emerald-300 transition-colors space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.crop}
                      className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
                    />
                  )}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-extrabold text-slate-900 text-lg font-heading">{item.crop}</span>
                      <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {item.diagnosis.severity}
                      </span>
                      <span className="text-xs text-slate-400">
                        {new Date(item.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-800">{item.diagnosis.likelyIssue}</h4>
                    <p className="text-xs text-slate-500 line-clamp-1">
                      Decision: <strong className="text-slate-800">{item.treatmentEvaluation.decision}</strong> — {item.treatmentEvaluation.actionWindow.dayLabel} {item.treatmentEvaluation.actionWindow.timeRange}
                    </p>
                  </div>
                </div>

                <Link
                  to="/result"
                  onClick={() => onSelectAnalysis(item)}
                  className="btn-secondary text-xs py-2 px-3 self-start sm:self-center flex items-center gap-1.5 shrink-0"
                >
                  <span>Re-open Report</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
