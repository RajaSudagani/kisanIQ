import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, ArrowRight, ShieldCheck, Cpu, CloudRain, Clock, Sparkles, CheckCircle2, Play, Eye, AlertTriangle, Sprout } from 'lucide-react';
import { DemoScenarioSelector } from '../components/DemoScenarioSelector';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface LandingPageProps {
  language: Language;
  onSelectScenario: (scenarioId: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ language, onSelectScenario }) => {
  const navigate = useNavigate();
  const t = TRANSLATIONS[language];

  return (
    <div className="space-y-16 py-8">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 text-white p-8 sm:p-14 border border-emerald-800/80 shadow-2xl">
        
        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          
          {/* Left Column: Heading & Value Prop */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>REAL-TIME AGRICULTURAL INTELLIGENCE</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-heading leading-[1.1] text-white">
              See the Problem.<br />
              Know the Risk.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">
                Act at the Right Time.
              </span>
            </h1>

            <p className="text-lg text-slate-300 font-normal leading-relaxed max-w-xl">
              {t.subTagline}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/analyze"
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-base px-6 py-3.5 rounded-xl shadow-lg shadow-emerald-500/25 transition-all flex items-center gap-2 group"
              >
                <Leaf className="w-5 h-5" />
                <span>{t.btnAnalyzeCrop}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="#demo-center"
                className="bg-white/10 hover:bg-white/15 text-white font-semibold text-base px-6 py-3.5 rounded-xl border border-white/20 transition-all flex items-center gap-2 backdrop-blur-md"
              >
                <Play className="w-4 h-4 fill-current text-amber-300" />
                <span>{t.btnTryDemo}</span>
              </a>
            </div>

            {/* Quick stats */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-xs text-slate-300">
              <div>
                <div className="font-extrabold text-white text-base font-heading">AI Vision</div>
                <div>Disease Symptoms</div>
              </div>
              <div>
                <div className="font-extrabold text-amber-300 text-base font-heading">Rule Engine</div>
                <div>Spray Safety Window</div>
              </div>
              <div>
                <div className="font-extrabold text-emerald-400 text-base font-heading">15-Sec</div>
                <div>Farmer Advisory</div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Product Composition */}
          <div className="lg:col-span-5">
            <div className="kisaniq-card p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl space-y-4">
              
              <div className="text-xs font-bold uppercase tracking-wider text-slate-300 pb-2 border-b border-white/10 flex items-center justify-between">
                <span>Active Field Intelligence</span>
                <span className="text-emerald-400 font-mono">LIVE SNAPSHOT</span>
              </div>

              {/* Card 1: Crop Diagnosis Overlay */}
              <div className="p-3.5 rounded-xl bg-white/10 border border-white/15 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase font-bold text-emerald-400">AI Diagnosis</div>
                  <div className="text-base font-extrabold text-white font-heading">Tomato — Early Blight</div>
                  <div className="text-xs text-slate-300">Concentric brown spots on lower foliage</div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-extrabold text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-500/40">
                    92% Conf.
                  </span>
                </div>
              </div>

              {/* Card 2: Weather Risk Overlay */}
              <div className="p-3.5 rounded-xl bg-white/10 border border-white/15 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase font-bold text-amber-300">Weather Signal</div>
                  <div className="text-sm font-bold text-white">Rain Expected in 4 Hours (76%)</div>
                  <div className="text-xs text-slate-300">Wind: 9 km/h • Temp: 28°C</div>
                </div>
                <CloudRain className="w-6 h-6 text-blue-400" />
              </div>

              {/* Signature Card 3: ACT NOW / WAIT Banner */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/30 via-slate-900 to-emerald-500/30 border border-amber-400/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-amber-300 tracking-wider">Signature Decision</span>
                  <span className="badge-wait text-xs py-1 px-3">WAIT</span>
                </div>
                <div className="text-xs font-bold text-white">
                  Optimal Window: Tomorrow 6:00 AM – 9:00 AM
                </div>
                <div className="text-[11px] text-slate-300">
                  Prevents rain wash-off &amp; maximizes chemical absorption.
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* DEMO SCENARIO CENTER */}
      <section id="demo-center">
        <DemoScenarioSelector onSelectScenario={onSelectScenario} />
      </section>

      {/* SIGNATURE PIPELINE: FROM FIELD SIGNAL TO FIELD DECISION */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
            KisanIQ Intelligence Engine
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 font-heading">
            From Field Signal to Field Decision
          </h2>
          <p className="text-sm text-slate-600">
            KisanIQ connects what you see in the field with what the weather is about to do.
          </p>
        </div>

        {/* 6 Step Horizontal Pipeline Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          
          <div className="kisaniq-card p-4 space-y-2 text-center bg-white">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 font-extrabold text-xs flex items-center justify-center mx-auto">
              01
            </div>
            <div className="font-bold text-slate-900 text-xs font-heading">FIELD IMAGE</div>
            <p className="text-[11px] text-slate-500">Photo of foliage + Crop type</p>
          </div>

          <div className="kisaniq-card p-4 space-y-2 text-center bg-white">
            <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 font-extrabold text-xs flex items-center justify-center mx-auto">
              02
            </div>
            <div className="font-bold text-slate-900 text-xs font-heading">AI VISION</div>
            <p className="text-[11px] text-slate-500">Gemini disease &amp; severity</p>
          </div>

          <div className="kisaniq-card p-4 space-y-2 text-center bg-white">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 font-extrabold text-xs flex items-center justify-center mx-auto">
              03
            </div>
            <div className="font-bold text-slate-900 text-xs font-heading">WEATHER INTELLIGENCE</div>
            <p className="text-[11px] text-slate-500">Rain, wind &amp; temp forecast</p>
          </div>

          <div className="kisaniq-card p-4 space-y-2 text-center bg-white">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 font-extrabold text-xs flex items-center justify-center mx-auto">
              04
            </div>
            <div className="font-bold text-slate-900 text-xs font-heading">RISK ENGINE</div>
            <p className="text-[11px] text-slate-500">Spread risk (0–100)</p>
          </div>

          <div className="kisaniq-card p-4 space-y-2 text-center bg-white">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 font-extrabold text-xs flex items-center justify-center mx-auto">
              05
            </div>
            <div className="font-bold text-slate-900 text-xs font-heading">ACTION WINDOW</div>
            <p className="text-[11px] text-slate-500">Exact spray safety hours</p>
          </div>

          <div className="kisaniq-card p-4 space-y-2 text-center bg-gradient-to-b from-emerald-900 to-slate-900 text-white">
            <div className="w-8 h-8 rounded-lg bg-white/20 text-white font-extrabold text-xs flex items-center justify-center mx-auto">
              06
            </div>
            <div className="font-bold text-white text-xs font-heading">FARMER ADVISORY</div>
            <p className="text-[11px] text-slate-300">15-second clear guidance</p>
          </div>

        </div>
      </section>

      {/* CORE VALUE PROPOSITION GRID */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
            Key Differentiators
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 font-heading">
            Not a Chatbot. Serious Field Intelligence.
          </h2>
          <p className="text-sm text-slate-600">
            Generic AI chatbots give long text. KisanIQ turns unstructured field inputs into concrete agricultural decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="kisaniq-card p-6 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-heading">"Act Now or Wait?"</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Synthesizes crop diagnosis with rain forecast, wind drift limits, and temperature thresholds to recommend exact action timing.
            </p>
          </div>

          <div className="kisaniq-card p-6 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-heading">Deterministic Rule Engine</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We never let an LLM alone decide chemical spray safety. Our code-level rule engine evaluates strict agronomic safety limits.
            </p>
          </div>

          <div className="kisaniq-card p-6 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-heading">15-Second Action Guide</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Designed for busy smallholder farmers. Clear visual cards answering: What is wrong? What to do now? When to spray? Why?
            </p>
          </div>

        </div>
      </section>

    </div>
  );
};
