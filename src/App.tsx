import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { AnalyzePage } from './pages/AnalyzePage';
import { ResultPage } from './pages/ResultPage';
import { WeatherPage } from './pages/WeatherPage';
import { HistoryPage } from './pages/HistoryPage';
import { AboutPage } from './pages/AboutPage';
import { Language } from './i18n/translations';
import { AnalysisResponse } from '../server/types';
import { DEMO_SCENARIOS } from '../server/services/demoScenarios';

const AppContent: React.FC = () => {
  const [language, setLanguage] = useState<Language>('en');
  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisResponse | null>(null);
  const navigate = useNavigate();

  const handleSelectScenario = (scenarioId: string) => {
    const scenario = DEMO_SCENARIOS[scenarioId] || DEMO_SCENARIOS['tomato-blight'];
    setCurrentAnalysis(scenario.mockResponse);
    navigate('/result');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-emerald-200">
      
      <Navbar
        language={language}
        onLanguageChange={setLanguage}
        isDemoMode={true}
      />

      <main className="flex-1 container py-4">
        <Routes>
          <Route
            path="/"
            element={
              <LandingPage
                language={language}
                onSelectScenario={handleSelectScenario}
              />
            }
          />
          <Route
            path="/dashboard"
            element={<DashboardPage currentAnalysis={currentAnalysis || undefined} />}
          />
          <Route
            path="/analyze"
            element={<AnalyzePage onAnalysisComplete={setCurrentAnalysis} />}
          />
          <Route
            path="/result"
            element={<ResultPage analysis={currentAnalysis} />}
          />
          <Route
            path="/weather"
            element={<WeatherPage />}
          />
          <Route
            path="/history"
            element={<HistoryPage onSelectAnalysis={setCurrentAnalysis} />}
          />
          <Route
            path="/about"
            element={<AboutPage />}
          />
        </Routes>
      </main>

      <Footer />

    </div>
  );
};

export const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
