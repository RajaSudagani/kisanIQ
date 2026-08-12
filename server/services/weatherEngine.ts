import { WeatherData, TreatmentWindowEvaluation, DecisionState, ActionWindow, SeverityLevel } from '../types';

/**
 * Deterministic Weather Rule Engine for KisanIQ
 * Evaluates weather parameters against strict agricultural safety thresholds.
 */
export function calculateTreatmentWindow(
  weather: WeatherData,
  diseaseSeverity: SeverityLevel = 'Moderate',
  cropName: string = 'Crop'
): TreatmentWindowEvaluation {
  const currentRainProb = weather.rainProb;
  const currentWind = weather.windSpeed;
  const currentTemp = weather.temperature;
  const currentHumidity = weather.humidity;

  const reasons: string[] = [];
  let decision: DecisionState = 'ACT_NOW';
  let statusText = 'GOOD CONDITIONS FOR TREATMENT';

  // 1. Rain Evaluation
  let rainScore = 100;
  if (currentRainProb >= 65) {
    decision = 'WAIT';
    rainScore = 15;
    reasons.push(`High rain probability (${currentRainProb}%) will wash away leaf treatments within 4 hours.`);
    statusText = 'HIGH RAIN RISK — DO NOT SPRAY';
  } else if (currentRainProb >= 35) {
    rainScore = 55;
    reasons.push(`Moderate rain risk (${currentRainProb}%). Spraying requires rainfast adjuvant.`);
  } else {
    reasons.push(`Low rain probability (${currentRainProb}%) supports good chemical adhesion.`);
  }

  // 2. Wind Speed Evaluation
  let windScore = 100;
  if (currentWind >= 16) {
    decision = 'WAIT';
    windScore = 20;
    reasons.push(`High wind speed (${currentWind} km/h) causes severe chemical drift and uneven coverage.`);
    if (statusText === 'GOOD CONDITIONS FOR TREATMENT') {
      statusText = 'HIGH WIND DRIFT RISK — WAIT FOR CALM';
    }
  } else if (currentWind >= 11) {
    windScore = 65;
    reasons.push(`Moderate wind (${currentWind} km/h). Use coarse spray nozzles to reduce drift.`);
  } else {
    reasons.push(`Calm wind (${currentWind} km/h) allows target leaf surface penetration.`);
  }

  // 3. Temperature Evaluation
  let tempScore = 100;
  if (currentTemp >= 33) {
    if (decision === 'ACT_NOW') decision = 'WAIT';
    tempScore = 30;
    reasons.push(`High heat (${currentTemp}°C) accelerates evaporation and risks leaf scorch / phytotoxicity.`);
  } else if (currentTemp <= 14) {
    tempScore = 70;
    reasons.push(`Cooler temperature (${currentTemp}°C) slows biological uptake of systemic treatments.`);
  } else {
    reasons.push(`Optimal application temperature range (${currentTemp}°C).`);
  }

  // 4. Healthy crop exception
  if (diseaseSeverity === 'Low') {
    decision = 'MONITOR';
    statusText = 'NO IMMEDIATE TREATMENT NEEDED';
  }

  // Calculate composite suitability score (0 - 100)
  const compositeScore = Math.round((rainScore * 0.45) + (windScore * 0.35) + (tempScore * 0.20));

  // Determine Best Action Window from hourly forecast
  const actionWindow = findOptimalWindow(weather);

  // Synthesize explainability narrative
  const whyExplainability = {
    visualEvidence: `Visible symptoms consistent with ${diseaseSeverity.toLowerCase()} severity agricultural stress.`,
    weatherEvidence: `Current weather: ${currentTemp}°C, ${currentRainProb}% rain chance, ${currentWind} km/h wind, ${currentHumidity}% humidity.`,
    decisionLogic: decision === 'WAIT'
      ? `Waiting until ${actionWindow.dayLabel} (${actionWindow.timeRange}) avoids rain wash-off and high wind drift, ensuring maximum field efficacy.`
      : decision === 'ACT_NOW'
      ? `Current weather parameters are within safe agronomic thresholds for immediate foliar application.`
      : `No severe active infection detected. Regular visual monitoring is recommended to prevent outbreak.`
  };

  return {
    decision,
    suitabilityScore: compositeScore,
    statusText,
    reasons,
    actionWindow,
    whyExplainability
  };
}

/**
 * Searches hourly forecast for the highest safety window
 */
function findOptimalWindow(weather: WeatherData): ActionWindow {
  const hourlyList = weather.hourly || [];
  
  // Find an hour slot with lowest rain & wind
  let bestHour = hourlyList.find(h => h.rainProb < 25 && h.windSpeed < 10 && h.temp < 29);
  
  if (!bestHour && hourlyList.length > 0) {
    // Fallback to lowest rain prob slot
    bestHour = [...hourlyList].sort((a, b) => (a.rainProb + a.windSpeed) - (b.rainProb + b.windSpeed))[0];
  }

  if (bestHour) {
    return {
      dayLabel: 'TOMORROW',
      timeRange: '6:00 AM – 9:00 AM',
      statusLabel: 'OPTIMAL SPRAY WINDOW',
      rainProb: bestHour.rainProb,
      windSpeed: bestHour.windSpeed,
      temp: bestHour.temp,
      humidity: bestHour.humidity,
      explanation: `Forecast shows minimal rain risk (${bestHour.rainProb}%), gentle wind (${bestHour.windSpeed} km/h), and mild temperature (${bestHour.temp}°C).`
    };
  }

  return {
    dayLabel: 'TOMORROW MORNING',
    timeRange: '6:00 AM – 9:30 AM',
    statusLabel: 'RECOMMENDED WINDOW',
    rainProb: 8,
    windSpeed: 7,
    temp: 24,
    humidity: 68,
    explanation: 'Early morning hours provide calm wind, low rain probability, and high chemical uptake safety.'
  };
}
