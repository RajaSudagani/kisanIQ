import React from 'react';
import { Leaf, Cpu, CloudRain, ShieldCheck, Sparkles, Sprout, CheckCircle2, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-12 py-8 max-w-4xl mx-auto">
      
      {/* Hero Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
          Agronomic Intelligence Architecture
        </span>
        <h1 className="text-4xl font-extrabold text-slate-900 font-heading">
          How KisanIQ Works
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl mx-auto">
          KisanIQ acts as a real-time bridge between raw field conditions and expert agronomic guidance, combining Gemini AI crop vision with a deterministic weather safety rule engine.
        </p>
      </div>

      {/* 5-STEP WORKFLOW (Section 43) */}
      <div className="kisaniq-card p-8 bg-white space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 font-heading border-b border-slate-100 pb-3">
          The 5-Step KisanIQ Intelligence Workflow
        </h2>

        <div className="space-y-6">
          
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 font-extrabold text-base flex items-center justify-center shrink-0">
              1
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base font-heading">Step 1: Capture</h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-1">
                The farmer captures a photo of affected foliage and specifies the crop species and field location.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 font-extrabold text-base flex items-center justify-center shrink-0">
              2
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base font-heading">Step 2: Understand</h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-1">
                Google Gemini AI vision analyzes visible symptoms, estimates infection probability, and classifies severity (Low, Moderate, High, Critical).
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 font-extrabold text-base flex items-center justify-center shrink-0">
              3
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base font-heading">Step 3: Check Weather</h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-1">
                KisanIQ queries local microclimate forecasts for upcoming rainfall timing, wind speed, relative humidity, and solar heat.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 font-extrabold text-base flex items-center justify-center shrink-0">
              4
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base font-heading">Step 4: Decide ("Act Now or Wait?")</h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-1">
                A code-level deterministic weather rule engine evaluates spray safety limits (rain wash-off risk, wind drift threshold, heat phytotoxicity) to determine the exact action state.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-900 text-white font-extrabold text-base flex items-center justify-center shrink-0">
              5
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base font-heading">Step 5: Act</h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-1">
                The farmer receives a 15-second visual field advisory card detailing what to do now, what to avoid, optimal treatment window, and why.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* SYSTEM ARCHITECTURE DIAGRAM (Section 44) */}
      <div className="kisaniq-card p-8 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white space-y-6 rounded-2xl shadow-xl">
        <div className="text-center space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            System Architecture
          </span>
          <h2 className="text-2xl font-extrabold text-white font-heading">
            Field Signal → Intelligence → Decision → Action
          </h2>
        </div>

        <div className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-4 text-xs font-mono text-center">
          
          <div className="p-3 bg-emerald-500/20 rounded-xl border border-emerald-500/30 font-bold text-emerald-300">
            FARMER INPUT (Crop Photo + Geolocation + Field Parameters)
          </div>

          <div className="text-emerald-400 text-sm font-bold">↓</div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-slate-200">
            <div className="p-3 bg-white/10 rounded-xl border border-white/15">
              <span className="font-bold text-teal-300 block mb-1">AI VISION</span>
              <span>Gemini 1.5 Flash Vision Diagnosis</span>
            </div>
            <div className="p-3 bg-white/10 rounded-xl border border-white/15">
              <span className="font-bold text-blue-300 block mb-1">WEATHER API</span>
              <span>OpenWeather Forecast Signals</span>
            </div>
            <div className="p-3 bg-white/10 rounded-xl border border-white/15">
              <span className="font-bold text-amber-300 block mb-1">RULE ENGINE</span>
              <span>calculateTreatmentWindow()</span>
            </div>
          </div>

          <div className="text-emerald-400 text-sm font-bold">↓</div>

          <div className="p-4 bg-gradient-to-r from-amber-500/30 to-emerald-500/30 rounded-xl border border-amber-400/50 text-white font-bold font-heading text-sm">
            ACTIONABLE FARMER ADVISORY ("ACT NOW OR WAIT?")
          </div>

        </div>
      </div>

    </div>
  );
};
