import React from 'react';
import { Calendar, Clock, CloudRain, Wind, Thermometer, Droplets, CheckCircle2 } from 'lucide-react';
import { ActionWindow as ActionWindowType } from '../../server/types';

interface ActionWindowProps {
  actionWindow: ActionWindowType;
}

export const ActionWindowCard: React.FC<ActionWindowProps> = ({ actionWindow }) => {
  return (
    <div className="kisaniq-card p-6 border-l-4 border-l-emerald-600 bg-gradient-to-r from-emerald-50/50 via-white to-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-100">
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Recommended Action Window
            </span>
            <div className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading flex items-center gap-2">
              <span>{actionWindow.dayLabel}</span>
              <span className="text-emerald-700">{actionWindow.timeRange}</span>
            </div>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-900 text-xs font-bold px-3 py-1.5 rounded-lg border border-emerald-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          <span>{actionWindow.statusLabel}</span>
        </div>
      </div>

      {/* Forecast Conditions during this window */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
            <CloudRain className="w-4 h-4 text-blue-500" />
            <span>Rain Prob</span>
          </div>
          <div className="text-lg font-bold text-slate-800">{actionWindow.rainProb}%</div>
          <div className="text-[10px] text-emerald-600 font-semibold">Low Rain Risk</div>
        </div>

        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
            <Wind className="w-4 h-4 text-teal-500" />
            <span>Wind Speed</span>
          </div>
          <div className="text-lg font-bold text-slate-800">{actionWindow.windSpeed} km/h</div>
          <div className="text-[10px] text-emerald-600 font-semibold">Calm Breeze</div>
        </div>

        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
            <Thermometer className="w-4 h-4 text-amber-500" />
            <span>Temperature</span>
          </div>
          <div className="text-lg font-bold text-slate-800">{actionWindow.temp}°C</div>
          <div className="text-[10px] text-emerald-600 font-semibold">Mild Temp</div>
        </div>

        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
            <Droplets className="w-4 h-4 text-cyan-500" />
            <span>Humidity</span>
          </div>
          <div className="text-lg font-bold text-slate-800">{actionWindow.humidity}%</div>
          <div className="text-[10px] text-slate-500 font-semibold">Good Absorption</div>
        </div>

      </div>

      <p className="text-sm text-slate-600 bg-emerald-50/70 p-3 rounded-lg border border-emerald-100">
        <span className="font-semibold text-emerald-900">Why this window? </span>
        {actionWindow.explanation}
      </p>
    </div>
  );
};
