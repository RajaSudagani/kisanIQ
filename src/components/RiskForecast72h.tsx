import React from 'react';
import { ShieldAlert, TrendingDown, Sun, CloudRain } from 'lucide-react';
import { DailyRiskForecast } from '../../server/types';

interface RiskForecast72hProps {
  daily: DailyRiskForecast[];
}

export const RiskForecast72h: React.FC<RiskForecast72hProps> = ({ daily }) => {
  return (
    <div className="kisaniq-card p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900 font-heading">72-Hour Predictive Crop Risk</h3>
          <p className="text-xs text-slate-500">Multi-day disease spread and weather safety outlook</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 font-semibold">
          <TrendingDown className="w-3.5 h-3.5 text-emerald-600" />
          <span>Predictive Outlook</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {daily.map((day, idx) => {
          const riskColor = day.riskLabel === 'High' ? 'text-red-600 bg-red-50 border-red-200'
            : day.riskLabel === 'Moderate' ? 'text-amber-600 bg-amber-50 border-amber-200'
            : 'text-emerald-600 bg-emerald-50 border-emerald-200';

          return (
            <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-colors space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 text-sm block font-heading">{day.dayName}</span>
                  <span className="text-xs text-slate-400">{day.dateStr}</span>
                </div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded border ${riskColor}`}>
                  {day.riskLabel} Risk
                </span>
              </div>

              {/* Disease Risk Meter */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
                  <span>Disease Spread Risk</span>
                  <span className="font-bold">{day.diseaseRiskScore}/100</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      day.diseaseRiskScore > 65 ? 'bg-red-500' : day.diseaseRiskScore > 35 ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${day.diseaseRiskScore}%` }}
                  />
                </div>
              </div>

              {/* Rain Risk */}
              <div className="flex items-center justify-between text-xs text-slate-600 pt-1 border-t border-slate-200/60">
                <span className="flex items-center gap-1">
                  <CloudRain className="w-3.5 h-3.5 text-blue-500" />
                  <span>Rain Chance</span>
                </span>
                <span className="font-bold">{day.rainProbability}%</span>
              </div>

              {/* Spray Suitability */}
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span className="flex items-center gap-1">
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>Spray Safety</span>
                </span>
                <span className="font-bold text-emerald-700">{day.treatmentSuitability}%</span>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};
