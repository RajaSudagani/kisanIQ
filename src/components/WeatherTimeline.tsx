import React from 'react';
import { CloudRain, Wind, Thermometer, Sparkles } from 'lucide-react';
import { HourlyForecast } from '../../server/types';

interface WeatherTimelineProps {
  hourly: HourlyForecast[];
}

export const WeatherTimeline: React.FC<WeatherTimelineProps> = ({ hourly }) => {
  return (
    <div className="kisaniq-card p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900 font-heading">24-Hour Treatment Weather Timeline</h3>
          <p className="text-xs text-slate-500">Hour-by-hour forecast of spray suitability parameters</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Recommended Window Highlighted</span>
        </div>
      </div>

      {/* Horizontal Scrollable Timeline Cards */}
      <div className="flex gap-3 overflow-x-auto pb-3 pt-1 scrollbar-thin">
        {hourly.map((item, idx) => {
          const isRecommended = item.isRecommendedWindow || item.suitabilityScore >= 90;
          return (
            <div
              key={idx}
              className={`min-w-[120px] flex-1 p-3.5 rounded-xl border transition-all text-center flex flex-col justify-between ${
                isRecommended
                  ? 'bg-gradient-to-b from-emerald-50 to-emerald-100/60 border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Time header */}
              <div className="text-xs font-bold text-slate-700 border-b border-slate-200/60 pb-1.5 mb-2">
                {item.time}
              </div>

              {/* Temp */}
              <div className="flex items-center justify-center gap-1 text-sm font-extrabold text-slate-800 my-1">
                <Thermometer className="w-3.5 h-3.5 text-amber-500" />
                <span>{item.temp}°C</span>
              </div>

              {/* Rain */}
              <div className="flex items-center justify-center gap-1 text-xs text-slate-600 my-0.5">
                <CloudRain className="w-3.5 h-3.5 text-blue-500" />
                <span className={item.rainProb > 40 ? 'font-bold text-blue-600' : ''}>{item.rainProb}%</span>
              </div>

              {/* Wind */}
              <div className="flex items-center justify-center gap-1 text-xs text-slate-600 my-0.5">
                <Wind className="w-3.5 h-3.5 text-teal-500" />
                <span className={item.windSpeed > 15 ? 'font-bold text-amber-600' : ''}>{item.windSpeed} km/h</span>
              </div>

              {/* Suitability Score Bar */}
              <div className="mt-3 pt-2 border-t border-slate-200/60">
                <div className="text-[10px] uppercase font-bold text-slate-500 mb-1">
                  Suitability
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      item.suitabilityScore >= 80
                        ? 'bg-emerald-500'
                        : item.suitabilityScore >= 50
                        ? 'bg-amber-500'
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${item.suitabilityScore}%` }}
                  />
                </div>
                <span className="text-[11px] font-bold text-slate-700 mt-1 block">
                  {item.suitabilityScore}%
                </span>
              </div>

              {isRecommended && (
                <span className="mt-2 text-[9px] font-bold uppercase tracking-wider bg-emerald-800 text-white py-0.5 px-1.5 rounded">
                  Best Window
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
