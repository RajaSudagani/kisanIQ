export type CropType = 'Tomato' | 'Rice' | 'Cotton' | 'Chili' | 'Maize' | 'Groundnut' | 'Other';

export type DecisionState = 'ACT_NOW' | 'WAIT' | 'DO_NOT_ACT' | 'MONITOR';

export type SeverityLevel = 'Low' | 'Moderate' | 'High' | 'Critical';

export interface AIDiagnosis {
  crop: string;
  likelyIssue: string;
  confidence: number;
  severity: SeverityLevel;
  symptoms: string[];
  possibleCauses: string[];
  immediateActions: string[];
  treatmentGuidance: {
    cultural: string[];
    biological: string[];
    chemical: string[];
  };
  prevention: string[];
  weatherRiskNote: string;
  needsExpertReview: boolean;
}

export interface HourlyForecast {
  time: string; // e.g. "6:00 AM"
  timestamp: number;
  temp: number; // in °C
  humidity: number; // %
  rainProb: number; // %
  rainAmount: number; // mm
  windSpeed: number; // km/h
  suitabilityScore: number; // 0 - 100
  isRecommendedWindow?: boolean;
}

export interface DailyRiskForecast {
  dayName: string; // "Today", "Tomorrow", "Day 2", "Day 3"
  dateStr: string;
  diseaseRiskScore: number; // 0 - 100
  rainProbability: number;
  treatmentSuitability: number;
  riskLabel: 'Low' | 'Moderate' | 'High';
}

export interface WeatherData {
  locationName: string;
  lat: number;
  lon: number;
  temperature: number; // °C
  humidity: number; // %
  rainProb: number; // %
  windSpeed: number; // km/h
  conditionText: string;
  icon: string;
  hourly: HourlyForecast[];
  daily: DailyRiskForecast[];
}

export interface ActionWindow {
  dayLabel: string; // e.g. "TOMORROW"
  timeRange: string; // e.g. "6:00 AM – 9:00 AM"
  statusLabel: string; // e.g. "OPTIMAL SPRAY WINDOW"
  rainProb: number;
  windSpeed: number;
  temp: number;
  humidity: number;
  explanation: string;
}

export interface TreatmentWindowEvaluation {
  decision: DecisionState;
  suitabilityScore: number; // 0-100
  statusText: string; // "GOOD CONDITIONS", "UNSUITABLE WIND", "RAIN APPROACHING", etc.
  reasons: string[];
  actionWindow: ActionWindow;
  whyExplainability: {
    visualEvidence: string;
    weatherEvidence: string;
    decisionLogic: string;
  };
}

export interface FarmerAdvisory {
  summaryTitle: string;
  crop: string;
  likelyIssue: string;
  riskLevel: SeverityLevel;
  doNow: string[];
  treatmentSummary: string;
  doNotTreatReason?: string;
  bestTimeToAct: string;
  whyDetails: string;
}

export interface AnalysisRequest {
  image?: string; // base64 or URL
  crop: CropType;
  location?: {
    lat?: number;
    lon?: number;
    name?: string;
  };
  fieldDetails?: {
    cropAgeDays?: number;
    affectedAreaPct?: number;
    recentIrrigation?: string;
    previousTreatment?: string;
    notes?: string;
  };
  scenarioId?: string; // For instant demo scenario triggering
}

export interface AnalysisResponse {
  id: string;
  timestamp: string;
  isDemoMode: boolean;
  crop: CropType;
  diagnosis: AIDiagnosis;
  weather: WeatherData;
  cropRiskScore: number; // 0 - 100
  treatmentEvaluation: TreatmentWindowEvaluation;
  advisory: FarmerAdvisory;
  fieldDetails?: AnalysisRequest['fieldDetails'];
  imageUrl?: string;
}

export interface DemoScenario {
  id: string;
  title: string;
  crop: CropType;
  problem: string;
  confidence: number;
  severity: SeverityLevel;
  decision: DecisionState;
  decisionReason: string;
  recommendedWindow: string;
  sampleImage: string;
  mockResponse: AnalysisResponse;
}
