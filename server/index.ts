import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { analyzeCropImage } from './services/aiService';
import { fetchWeatherData } from './services/weatherService';
import { calculateTreatmentWindow } from './services/weatherEngine';
import { buildFarmerAdvisory } from './services/advisoryService';
import { DEMO_SCENARIOS } from './services/demoScenarios';
import { AnalysisRequest, AnalysisResponse } from './types';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '15mb' }));

// Health Check Endpoint (Requirement 17)
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'KisanIQ'
  });
});

// Demo Scenarios Endpoint
app.get('/api/demo/:scenarioId', (req, res) => {
  const { scenarioId } = req.params;
  const scenario = DEMO_SCENARIOS[scenarioId] || DEMO_SCENARIOS['tomato-blight'];
  res.json(scenario.mockResponse);
});

// Weather Intelligence Endpoint
app.get('/api/weather', async (req, res) => {
  try {
    const lat = req.query.lat ? parseFloat(req.query.lat as string) : undefined;
    const lon = req.query.lon ? parseFloat(req.query.lon as string) : undefined;
    const name = req.query.name as string | undefined;

    const result = await fetchWeatherData(lat, lon, name);
    res.json({
      weather: result.weather,
      isLive: result.isLive
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve weather intelligence.' });
  }
});

// Main Field Analysis Pipeline Endpoint
app.post('/api/analyze', async (req, res): Promise<any> => {
  try {
    const body: AnalysisRequest = req.body;

    // Check if demo scenario was explicitly passed
    if (body.scenarioId && DEMO_SCENARIOS[body.scenarioId]) {
      return res.json(DEMO_SCENARIOS[body.scenarioId].mockResponse);
    }

    const crop = body.crop || 'Tomato';
    const locationLat = body.location?.lat;
    const locationLon = body.location?.lon;
    const locationName = body.location?.name;
    const notes = body.fieldDetails?.notes;

    // 1. AI Vision Analysis
    const { diagnosis, isLive: aiIsLive } = await analyzeCropImage(body.image, crop, notes);

    // 2. Weather Signals (Open-Meteo zero key)
    const { weather, isLive: weatherIsLive } = await fetchWeatherData(locationLat, locationLon, locationName);

    // 3. Weather Decision Engine
    const treatmentEvaluation = calculateTreatmentWindow(weather, diagnosis.severity, crop);

    // 4. Synthesize Farmer Advisory
    const advisory = buildFarmerAdvisory(diagnosis, treatmentEvaluation);

    // 5. Calculate Crop Risk Score (0-100)
    const severityWeight = diagnosis.severity === 'Critical' ? 95 : diagnosis.severity === 'High' ? 82 : diagnosis.severity === 'Moderate' ? 68 : 15;
    const weatherWeight = treatmentEvaluation.decision === 'WAIT' ? 80 : 30;
    const cropRiskScore = Math.round((severityWeight * 0.7) + (weatherWeight * 0.3));

    const responsePayload: AnalysisResponse = {
      id: `analysis-${Date.now()}`,
      timestamp: new Date().toISOString(),
      isDemoMode: !aiIsLive,
      crop,
      diagnosis,
      weather,
      cropRiskScore,
      treatmentEvaluation,
      advisory,
      fieldDetails: body.fieldDetails,
      imageUrl: body.image || 'https://images.unsplash.com/photo-1592417817098-8f3d6eb1626f?auto=format&fit=crop&w=600&q=80'
    };

    res.json(responsePayload);
    return;
  } catch (err: any) {
    console.error('Error during field analysis execution:', err);
    res.status(500).json({
      error: 'An unexpected error occurred during crop analysis. Falling back to safety demo mode.',
      details: err.message
    });
  }
});

// Serve Static Frontend Production Assets (Requirement 1)
const distPath = path.resolve(__dirname, '../dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));

  // SPA Route Fallback for client-side routing (Requirement 6)
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Bind to process.env.PORT and 0.0.0.0 for Cloud Hosting (Requirement 4 & 5)
app.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`🌾 KisanIQ Render Web Service running on port ${PORT}`);
});
