import { AnalysisRequest, AnalysisResponse, CropType, WeatherData } from '../../server/types';
import { DEMO_SCENARIOS } from '../../server/services/demoScenarios';

// Relative path '/api' for unified production Web Service & Vite proxy in dev
const API_BASE = (import.meta as any).env?.VITE_API_URL || '';

export async function runFieldAnalysis(payload: AnalysisRequest): Promise<AnalysisResponse> {
  // If scenarioId is passed, use client side demo scenario immediately if backend is quiet
  if (payload.scenarioId && DEMO_SCENARIOS[payload.scenarioId]) {
    try {
      const res = await fetch(`${API_BASE}/api/demo/${payload.scenarioId}`);
      if (res.ok) return await res.json();
    } catch {
      // client side fallback
      return DEMO_SCENARIOS[payload.scenarioId].mockResponse;
    }
  }

  try {
    const res = await fetch(`${API_BASE}/api/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Backend service offline or unreachable. Using Client-Side Demo AI Engine.', err);
  }

  // Fallback to scenario based on crop selection
  const targetScenario = payload.crop === 'Rice' ? 'rice-blast'
    : payload.crop === 'Cotton' ? 'cotton-pest'
    : 'tomato-blight';

  return DEMO_SCENARIOS[targetScenario].mockResponse;
}

export async function fetchWeather(lat?: number, lon?: number, name?: string): Promise<{ weather: WeatherData; isLive: boolean }> {
  try {
    const params = new URLSearchParams();
    if (lat) params.append('lat', lat.toString());
    if (lon) params.append('lon', lon.toString());
    if (name) params.append('name', name);

    const res = await fetch(`${API_BASE}/api/weather?${params.toString()}`);
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('Weather API endpoint unreachable. Returning fallback weather.', err);
  }

  return {
    weather: DEMO_SCENARIOS['tomato-blight'].mockResponse.weather,
    isLive: false
  };
}

export async function getDemoScenario(scenarioId: string): Promise<AnalysisResponse> {
  if (DEMO_SCENARIOS[scenarioId]) {
    return DEMO_SCENARIOS[scenarioId].mockResponse;
  }
  return DEMO_SCENARIOS['tomato-blight'].mockResponse;
}
