import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, Cpu, Globe, ShieldAlert, ChevronDown } from 'lucide-react';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  isDemoMode?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ language, onLanguageChange, isDemoMode = true }) => {
  const location = useLocation();
  const t = TRANSLATIONS[language];

  const navItems = [
    { path: '/', label: t.navDashboard },
    { path: '/analyze', label: t.navAnalyze },
    { path: '/weather', label: t.navWeather },
    { path: '/history', label: t.navHistory },
    { path: '/about', label: t.navAbout },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="container flex items-center justify-between h-16">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-emerald-900 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-800 transition-colors shadow-md">
            <Leaf className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-emerald-950 font-heading">
                Kisan<span className="text-emerald-600">IQ</span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                AI Field Guard
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block">Agricultural Intelligence</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-white text-emerald-900 shadow-sm font-semibold'
                    : 'text-slate-600 hover:text-emerald-800 hover:bg-white/50'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Section: Language Selector + Demo Mode Badge + CTA */}
        <div className="flex items-center gap-3">
          
          {/* Demo Mode Badge */}
          {isDemoMode && (
            <div className="hidden sm:flex items-center gap-1.5 bg-amber-50 border border-amber-200/80 text-amber-800 text-xs font-semibold px-2.5 py-1 rounded-full">
              <Cpu className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
              <span>Demo Mode</span>
            </div>
          )}

          {/* Language Switcher */}
          <div className="relative flex items-center bg-slate-100 rounded-lg p-1 text-xs font-medium border border-slate-200">
            <Globe className="w-3.5 h-3.5 text-slate-500 ml-1 mr-1" />
            <select
              value={language}
              onChange={(e) => onLanguageChange(e.target.value as Language)}
              className="bg-transparent text-slate-800 font-semibold cursor-pointer outline-none pr-1"
            >
              <option value="en">English</option>
              <option value="te">తెలుగు</option>
              <option value="hi">हिन्दी</option>
            </select>
          </div>

          {/* Analyze CTA */}
          <Link
            to="/analyze"
            className="hidden sm:inline-flex items-center gap-1.5 bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-all shadow-sm"
          >
            <Leaf className="w-3.5 h-3.5" />
            <span>Analyze Field</span>
          </Link>
        </div>
      </div>

      {/* Mobile Bar */}
      <div className="md:hidden flex items-center justify-around bg-white border-t border-slate-100 py-2 px-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`text-xs font-semibold px-2 py-1 rounded-md ${
                isActive ? 'text-emerald-700 bg-emerald-50' : 'text-slate-600'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </header>
  );
};
