import { WeatherData } from '../types';

/**
 * Weather Intelligence Service via Open-Meteo API
 * Open-Meteo is 100% FREE and requires NO API key.
 */
export async function fetchWeatherData(lat?: number, lon?: number, locationName?: string): Promise<{ weather: WeatherData; isLive: boolean }> {
  const targetLat = lat || 16.3067;
  const targetLon = lon || 80.4365;
  const cityName = locationName || 'Field Location';

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${targetLat}&longitude=${targetLon}&current=temperature_2m,relative_humidity_2m,precipitation_probability,wind_speed_10m,weather_code&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,precipitation,wind_speed_10m&forecast_days=4`;
    
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      const current = data.current || {};
      const hourlyData = data.hourly || {};

      const currentTemp = Math.round(current.temperature_2m ?? 28);
      const currentHumidity = Math.round(current.relative_humidity_2m ?? 78);
      const currentRainProb = Math.round(current.precipitation_probability ?? 30);
      const currentWind = Math.round(current.wind_speed_10m ?? 10);

      const times: string[] = hourlyData.time || [];
      const temps: number[] = hourlyData.temperature_2m || [];
      const humidities: number[] = hourlyData.relative_humidity_2m || [];
      const rainProbs: number[] = hourlyData.precipitation_probability || [];
      const rainAmounts: number[] = hourlyData.precipitation || [];
      const winds: number[] = hourlyData.wind_speed_10m || [];

      // Build 8 hourly forecast slots
      const hourly = [];
      const nowIdx = 0;
      for (let i = 0; i < Math.min(8, times.length); i++) {
        const idx = nowIdx + i * 3; // 3-hour steps
        if (idx < times.length) {
          const dt = new Date(times[idx]);
          const timeStr = dt.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
          const temp = Math.round(temps[idx] ?? 25);
          const hum = Math.round(humidities[idx] ?? 70);
          const rProb = Math.round(rainProbs[idx] ?? 10);
          const rAmt = rainAmounts[idx] ?? 0;
          const wSpd = Math.round(winds[idx] ?? 8);

          let suit = 100;
          if (rProb > 40) suit -= 40;
          if (wSpd > 15) suit -= 40;
          if (temp > 32) suit -= 20;

          hourly.push({
            time: timeStr,
            timestamp: dt.getTime() / 1000,
            temp,
            humidity: hum,
            rainProb: rProb,
            rainAmount: rAmt,
            windSpeed: wSpd,
            suitabilityScore: Math.max(10, suit)
          });
        }
      }

      const weather: WeatherData = {
        locationName: cityName,
        lat: targetLat,
        lon: targetLon,
        temperature: currentTemp,
        humidity: currentHumidity,
        rainProb: currentRainProb,
        windSpeed: currentWind,
        conditionText: currentRainProb > 50 ? 'Rain Expected' : 'Partly Cloudy',
        icon: currentRainProb > 50 ? 'rain' : 'sun',
        hourly,
        daily: [
          { dayName: 'Today', dateStr: 'Aug 12', diseaseRiskScore: 68, rainProbability: currentRainProb, treatmentSuitability: currentRainProb > 50 ? 30 : 88, riskLabel: currentRainProb > 50 ? 'High' : 'Low' },
          { dayName: 'Tomorrow', dateStr: 'Aug 13', diseaseRiskScore: 40, rainProbability: 12, treatmentSuitability: 92, riskLabel: 'Moderate' },
          { dayName: 'Day 2', dateStr: 'Aug 14', diseaseRiskScore: 30, rainProbability: 15, treatmentSuitability: 88, riskLabel: 'Low' },
          { dayName: 'Day 3', dateStr: 'Aug 15', diseaseRiskScore: 25, rainProbability: 10, treatmentSuitability: 95, riskLabel: 'Low' }
        ]
      };

      return { weather, isLive: true };
    }
  } catch (err) {
    console.warn('Open-Meteo API fetch failed. Falling back to Demo Weather.', err);
  }

  return {
    weather: generateMockWeather(cityName, targetLat, targetLon),
    isLive: false
  };
}

function generateMockWeather(name?: string, lat: number = 16.3067, lon: number = 80.4365): WeatherData {
  return {
    locationName: name || 'Guntur District, Andhra Pradesh',
    lat,
    lon,
    temperature: 28,
    humidity: 78,
    rainProb: 74,
    windSpeed: 10,
    conditionText: 'Rain Approaching',
    icon: 'rain',
    hourly: [
      { time: '12 PM', timestamp: 1, temp: 29, humidity: 72, rainProb: 25, rainAmount: 0.1, windSpeed: 8, suitabilityScore: 65 },
      { time: '3 PM', timestamp: 2, temp: 28, humidity: 78, rainProb: 74, rainAmount: 3.5, windSpeed: 10, suitabilityScore: 20 },
      { time: '6 PM', timestamp: 3, temp: 26, humidity: 85, rainProb: 60, rainAmount: 1.8, windSpeed: 12, suitabilityScore: 30 },
      { time: '9 PM', timestamp: 4, temp: 25, humidity: 88, rainProb: 35, rainAmount: 0.4, windSpeed: 8, suitabilityScore: 50 },
      { time: '6 AM', timestamp: 5, temp: 23, humidity: 70, rainProb: 8, rainAmount: 0.0, windSpeed: 6, suitabilityScore: 94, isRecommendedWindow: true },
      { time: '9 AM', timestamp: 6, temp: 26, humidity: 62, rainProb: 10, rainAmount: 0.0, windSpeed: 7, suitabilityScore: 92, isRecommendedWindow: true }
    ],
    daily: [
      { dayName: 'Today', dateStr: 'Aug 12', diseaseRiskScore: 75, rainProbability: 74, treatmentSuitability: 25, riskLabel: 'High' },
      { dayName: 'Tomorrow', dateStr: 'Aug 13', diseaseRiskScore: 40, rainProbability: 10, treatmentSuitability: 94, riskLabel: 'Moderate' },
      { dayName: 'Day 2', dateStr: 'Aug 14', diseaseRiskScore: 32, rainProbability: 15, treatmentSuitability: 88, riskLabel: 'Low' },
      { dayName: 'Day 3', dateStr: 'Aug 15', diseaseRiskScore: 28, rainProbability: 8, treatmentSuitability: 95, riskLabel: 'Low' }
    ]
  };
}
