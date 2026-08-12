import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, ArrowLeft, ShieldCheck, AlertCircle, CheckCircle2, Sparkles, Sprout, Share2, Printer } from 'lucide-react';
import { AnalysisResponse } from '../../server/types';
import { ActNowWaitCard } from '../components/ActNowWaitCard';
import { ActionWindowCard } from '../components/ActionWindow';
import { WeatherTimeline } from '../components/WeatherTimeline';
import { RiskForecast72h } from '../components/RiskForecast72h';
import { AdvisoryCard } from '../components/AdvisoryCard';
import { ExplainabilityPanel } from '../components/ExplainabilityPanel';
import { DEMO_SCENARIOS } from '../../server/services/demoScenarios';

interface ResultPageProps {
  analysis?: AnalysisResponse | null;
}

export const ResultPage: React.FC<ResultPageProps> = ({ analysis }) => {
  // Use current analysis or fallback to Tomato Early Blight demo response
  const data = analysis || DEMO_SCENARIOS['tomato-blight'].mockResponse;
  const { crop, diagnosis, weather, cropRiskScore, treatmentEvaluation, advisory, imageUrl } = data;

  const severityBadgeClass = diagnosis.severity === 'Critical' ? 'bg-red-100 text-red-800 border-red-300'
    : diagnosis.severity === 'High' ? 'bg-red-50 text-red-700 border-red-200'
    : diagnosis.severity === 'Moderate' ? 'bg-amber-50 text-amber-800 border-amber-200'
    : 'bg-emerald-50 text-emerald-800 border-emerald-200';

  return (
    <div className="space-y-10 py-6 max-w-5xl mx-auto">
      
      {/* Top Action Bar */}
      <div className="flex items-center justify-between gap-4">
        <Link to="/analyze" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-emerald-800 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Analyze Another Crop</span>
        </Link>

        <div className="flex items-center gap-2">
          {data.isDemoMode && (
            <span className="text-[11px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full border border-amber-200">
              Demo Intelligence Active
            </span>
          )}
          <button
            onClick={() => window.print()}
            className="p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
            title="Print Field Report"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 1. DIAGNOSIS HEADER CARD (Section 18, 20) */}
      <div className="kisaniq-card p-6 sm:p-8 bg-white border-emerald-100 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Leaf Photo */}
          {imageUrl && (
            <div className="md:col-span-4 h-48 sm:h-56 rounded-xl overflow-hidden border border-slate-200 shadow-sm relative group">
              <img src={imageUrl} alt={diagnosis.likelyIssue} className="w-full h-full object-cover" />
              <div className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                Analyzed Foliage
              </div>
            </div>
          )}

          {/* Diagnosis Details */}
          <div className={`${imageUrl ? 'md:col-span-8' : 'md:col-span-12'} space-y-3`}>
            
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded">
                {crop}
              </span>
              <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded border ${severityBadgeClass}`}>
                Severity: {diagnosis.severity}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
              {diagnosis.likelyIssue}
            </h1>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Confidence: <strong className="text-emerald-800">{diagnosis.confidence}%</strong></span>
              </div>
              {diagnosis.confidence < 60 && (
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
                  Low Confidence — Recommend Clearer Photo
                </span>
              )}
            </div>

            <p className="text-xs text-slate-600 leading-relaxed pt-1">
              Visible symptoms detected match agronomic indicators for {diagnosis.likelyIssue}.
            </p>

          </div>

        </div>

        {/* Symptoms Breakdown Cards */}
        <div className="pt-4 border-t border-slate-100 space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">What We Found</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {diagnosis.symptoms.map((symptom, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800 font-medium flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                <span>{symptom}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. CROP RISK SCORE METER (Section 19) */}
      <div className="kisaniq-card p-6 bg-white border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
            Composite Field Risk Index
          </span>
          <div className="text-3xl font-extrabold text-slate-900 font-heading">
            Crop Risk Score: <span className="text-amber-600">{cropRiskScore}</span> / 100
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Combines disease infection severity (70%) and weather risk spread conditions (30%).
          </p>
        </div>

        <div className="w-full sm:w-64 space-y-1">
          <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full rounded-full ${
                cropRiskScore > 75 ? 'bg-red-500' : cropRiskScore > 40 ? 'bg-amber-500' : 'bg-emerald-500'
              }`}
              style={{ width: `${cropRiskScore}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] font-bold text-slate-400">
            <span>Low Risk (0)</span>
            <span>Moderate (50)</span>
            <span>Critical (100)</span>
          </div>
        </div>
      </div>

      {/* 3. SIGNATURE FEATURE: ACT NOW OR WAIT? (Section 2, 26) */}
      <ActNowWaitCard evaluation={treatmentEvaluation} cropRiskScore={cropRiskScore} />

      {/* 4. RECOMMENDED ACTION WINDOW (Section 27) */}
      <ActionWindowCard actionWindow={treatmentEvaluation.actionWindow} />

      {/* 5. 24-HOUR WEATHER TIMELINE (Section 28) */}
      <WeatherTimeline hourly={weather.hourly} />

      {/* 6. 72-HOUR PREDICTIVE CROP RISK (Section 29) */}
      <RiskForecast72h daily={weather.daily} />

      {/* 7. TREATMENT PLAN (Section 22) */}
      <div className="kisaniq-card p-6 sm:p-8 bg-white border-slate-200 space-y-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900 font-heading">Agronomic Treatment Guidance</h3>
          <p className="text-xs text-slate-500">Structured field management, biological controls, and chemical safety notes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Cultural Practices */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-emerald-800">
              Cultural Field Practices
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {diagnosis.treatmentGuidance.cultural.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Biological Options */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-teal-800">
              Biological Controls
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {diagnosis.treatmentGuidance.biological.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-teal-600 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Chemical Guidance (With mandatory safety notes) */}
          <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-amber-900">
              Approved Chemical Guidance
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {diagnosis.treatmentGuidance.chemical.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="text-[10px] text-amber-800 italic pt-2 border-t border-amber-200/60">
              * Always follow local agronomic guidelines and product label instructions.
            </div>
          </div>

        </div>
      </div>

      {/* 8. EXPLAINABILITY PANEL (Section 31) */}
      <ExplainabilityPanel whyExplainability={treatmentEvaluation.whyExplainability} />

      {/* 9. FINAL 15-SECOND FARMER ADVISORY (Section 30) */}
      <AdvisoryCard advisory={advisory} />

    </div>
  );
};
