import React from 'react';
import { Leaf, ShieldAlert, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-emerald-950 text-slate-300 pt-12 pb-8 border-t border-emerald-900 mt-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-emerald-900/60">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Leaf className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white font-heading">
                Kisan<span className="text-emerald-400">IQ</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm max-w-md">
              "See the Problem. Know the Risk. Act at the Right Time."
            </p>
            <p className="text-xs text-slate-400">
              AI-powered agricultural field intelligence converting crop photos, location data, and weather signals into clear farm action decisions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-3">Quick Navigation</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="/" className="hover:text-emerald-400 transition-colors">Dashboard</a></li>
              <li><a href="/analyze" className="hover:text-emerald-400 transition-colors">Analyze My Crop</a></li>
              <li><a href="/weather" className="hover:text-emerald-400 transition-colors">Weather Intelligence</a></li>
              <li><a href="/history" className="hover:text-emerald-400 transition-colors">Field History</a></li>
              <li><a href="/about" className="hover:text-emerald-400 transition-colors">How KisanIQ Works</a></li>
            </ul>
          </div>

          {/* Scenarios */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-3">Demo Scenarios</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Tomato Early Blight (WAIT)</li>
              <li>Rice Leaf Blast (ACT NOW)</li>
              <li>Cotton Pest Damage (WAIT)</li>
              <li>Healthy Tomato (MONITOR)</li>
            </ul>
          </div>
        </div>

        {/* Safety Disclaimer Banner */}
        <div className="mt-8 bg-emerald-900/40 border border-emerald-800/60 rounded-xl p-4 flex items-start gap-3 text-xs text-slate-300">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-amber-300">Agronomic Disclaimer: </span>
            KisanIQ provides decision-support guidance based on visual symptoms and weather risk models. It does not replace professional agronomic testing. Always follow local agricultural extension guidelines and chemical product labels before applying treatments.
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center text-xs text-slate-500 flex items-center justify-center gap-1">
          <span>KisanIQ AgriTech Hackathon Build</span>
          <span>•</span>
          <span>Built for Farmer Livelihood & Food Security</span>
        </div>
      </div>
    </footer>
  );
};
