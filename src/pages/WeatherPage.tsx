import React from 'react';
import { CloudRain, Wind, Thermometer, Droplets, Sun, MapPin, Sparkles } from 'lucide-react';
import { WeatherTimeline } from '../components/WeatherTimeline';
import { RiskForecast72h } from '../components/RiskForecast72h';
import { DEMO_SCENARIOS } from '../../server/services/demoScenarios';

export const WeatherPage: React.FC = () => {
  const weather = DEMO_SCENARIOS['tomato-blight'].mockResponse.weather;

  return (
    <div className="space-y-8 py-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
            <CloudRain className="w-4 h-4 text-emerald-600" />
            <span>Agronomic Weather Signals</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 font-heading">
            Weather Intelligence Dashboard
          </h1>
          <p className="text-xs text-slate-500">
            Real-time rainfall timing, wind speed, and spray safety window evaluations for {weather.locationName}
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-900 text-xs font-bold px-3 py-1.5 rounded-lg border border-emerald-200">
          <MapPin className="w-4 h-4 text-emerald-700" />
          <span>{weather.locationName}</span>
        </div>
      </div>

      {/* Weather Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="kisaniq-card p-5 space-y-1 bg-white">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase">
            <span>Air Temperature</span>
            <Thermometer className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-heading">{weather.temperature}°C</div>
          <div className="text-xs text-emerald-700 font-semibold">Suitable for spraying</div>
        </div>

        <div className="kisaniq-card p-5 space-y-1 bg-white">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase">
            <span>Rain Probability</span>
            <CloudRain className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-heading">{weather.rainProb}%</div>
          <div className="text-xs text-amber-700 font-semibold">Rain expected in 4h</div>
        </div>

        <div className="kisaniq-card p-5 space-y-1 bg-white">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase">
            <span>Wind Speed</span>
            <Wind className="w-4 h-4 text-teal-500" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-heading">{weather.windSpeed} km/h</div>
          <div className="text-xs text-emerald-700 font-semibold">Calm breeze limit ok</div>
        </div>

        <div className="kisaniq-card p-5 space-y-1 bg-white">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase">
            <span>Relative Humidity</span>
            <Droplets className="w-4 h-4 text-cyan-500" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-heading">{weather.humidity}%</div>
          <div className="text-xs text-amber-700 font-semibold">Spore wetness risk</div>
        </div>

      </div>

      {/* 24-HOUR WEATHER TIMELINE */}
      <WeatherTimeline hourly={weather.hourly} />

      {/* 72-HOUR PREDICTIVE RISK FORECAST */}
      <RiskForecast72h daily={weather.daily} />

    </div>
  );
};
