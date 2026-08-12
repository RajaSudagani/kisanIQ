import { DemoScenario, AnalysisResponse } from '../types';

export const DEMO_SCENARIOS: Record<string, DemoScenario> = {
  'tomato-blight': {
    id: 'tomato-blight',
    title: 'Tomato — Early Blight',
    crop: 'Tomato',
    problem: 'Likely Early Blight (Alternaria solani)',
    confidence: 92,
    severity: 'Moderate',
    decision: 'WAIT',
    decisionReason: 'Rain is expected within the next 4 hours (76% probability).',
    recommendedWindow: 'Tomorrow morning 6:00 AM – 9:00 AM',
    sampleImage: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb1626f?auto=format&fit=crop&w=600&q=80',
    mockResponse: {
      id: 'demo-analysis-tomato-blight',
      timestamp: new Date().toISOString(),
      isDemoMode: true,
      crop: 'Tomato',
      cropRiskScore: 72,
      imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb1626f?auto=format&fit=crop&w=600&q=80',
      diagnosis: {
        crop: 'Tomato',
        likelyIssue: 'Early Blight (Alternaria solani)',
        confidence: 92,
        severity: 'Moderate',
        symptoms: [
          'Dark brown concentric circular spots ("target spots") on lower mature leaves',
          'Yellow halo surround around foliage lesions',
          'Mild leaf curling and lower canopy wilting'
        ],
        possibleCauses: [
          'High relative humidity and warm foliage wetness',
          'Fungal spore survival in soil & plant debris',
          'Overhead sprinkler irrigation wetness'
        ],
        immediateActions: [
          'Prune and safely destroy lower infected leaves near soil',
          'Sanitize pruning tools between plants using 70% alcohol',
          'Avoid overhead sprinkler watering; switch to drip lines'
        ],
        treatmentGuidance: {
          cultural: [
            'Mulch crop bed with clean straw to prevent soil-splash spore transmission',
            'Stake plants to improve lower leaf ventilation'
          ],
          biological: [
            'Apply bio-fungicide containing Bacillus subtilis or Trichoderma viride'
          ],
          chemical: [
            'Use copper hydroxide or chlorothalonil fungicide approved locally for tomato early blight.',
            'Always follow product label instructions and local extension guidelines.'
          ]
        },
        prevention: [
          'Practice 2-3 year crop rotation with non-solanaceous crops',
          'Plant blight-resistant tomato varieties in high moisture zones'
        ],
        weatherRiskNote: 'Approaching rain will wash off foliar treatments if applied today.',
        needsExpertReview: false
      },
      weather: {
        locationName: 'Guntur Rural, Andhra Pradesh',
        lat: 16.3067,
        lon: 80.4365,
        temperature: 28,
        humidity: 82,
        rainProb: 76,
        windSpeed: 9,
        conditionText: 'Thunderstorms Expected',
        icon: 'rain',
        hourly: [
          { time: '12 PM', timestamp: 1, temp: 29, humidity: 75, rainProb: 30, rainAmount: 0.1, windSpeed: 8, suitabilityScore: 60 },
          { time: '3 PM', timestamp: 2, temp: 28, humidity: 82, rainProb: 76, rainAmount: 4.2, windSpeed: 9, suitabilityScore: 15 },
          { time: '6 PM', timestamp: 3, temp: 26, humidity: 88, rainProb: 65, rainAmount: 2.1, windSpeed: 11, suitabilityScore: 25 },
          { time: '9 PM', timestamp: 4, temp: 25, humidity: 90, rainProb: 40, rainAmount: 0.5, windSpeed: 7, suitabilityScore: 45 },
          { time: '6 AM', timestamp: 5, temp: 23, humidity: 72, rainProb: 8, rainAmount: 0.0, windSpeed: 6, suitabilityScore: 94, isRecommendedWindow: true },
          { time: '9 AM', timestamp: 6, temp: 26, humidity: 65, rainProb: 12, rainAmount: 0.0, windSpeed: 7, suitabilityScore: 90, isRecommendedWindow: true }
        ],
        daily: [
          { dayName: 'Today', dateStr: 'Aug 12', diseaseRiskScore: 78, rainProbability: 76, treatmentSuitability: 25, riskLabel: 'High' },
          { dayName: 'Tomorrow', dateStr: 'Aug 13', diseaseRiskScore: 40, rainProbability: 12, treatmentSuitability: 92, riskLabel: 'Moderate' },
          { dayName: 'Day 2', dateStr: 'Aug 14', diseaseRiskScore: 35, rainProbability: 18, treatmentSuitability: 88, riskLabel: 'Low' },
          { dayName: 'Day 3', dateStr: 'Aug 15', diseaseRiskScore: 30, rainProbability: 10, treatmentSuitability: 95, riskLabel: 'Low' }
        ]
      },
      treatmentEvaluation: {
        decision: 'WAIT',
        suitabilityScore: 32,
        statusText: 'RAIN APPROACHING — DO NOT SPRAY TODAY',
        reasons: [
          'Rain probability is 76% over the next 4 hours.',
          'Foliar spray applied now will wash off before leaf absorption occurs.',
          'Optimal treatment window forecast tomorrow 6:00 AM – 9:00 AM.'
        ],
        actionWindow: {
          dayLabel: 'TOMORROW',
          timeRange: '6:00 AM – 9:00 AM',
          statusLabel: 'GOOD CONDITIONS',
          rainProb: 8,
          windSpeed: 6,
          temp: 23,
          humidity: 72,
          explanation: 'Clear sky, low rain chance (8%), and calm morning breeze.'
        },
        whyExplainability: {
          visualEvidence: 'Dark concentric circular lesions and surrounding yellowing detected on leaves.',
          weatherEvidence: 'Rain probability is 76% over the next 4 hours with high atmospheric humidity.',
          decisionLogic: 'Waiting until tomorrow morning prevents rain wash-off and optimizes chemical efficiency.'
        }
      },
      advisory: {
        summaryTitle: "Today's Field Action Plan",
        crop: 'Tomato',
        likelyIssue: 'Early Blight',
        riskLevel: 'Moderate',
        doNow: [
          'Remove heavily affected lower leaves and dispose of them outside the plot.',
          'Ensure drip lines are clear and avoid overhead spraying.'
        ],
        treatmentSummary: 'Fungicide treatment required (Chlorothalonil or Copper hydroxide).',
        doNotTreatReason: 'Rain is expected within 4 hours, which will wash off treatment.',
        bestTimeToAct: 'Tomorrow 6:00 AM – 9:00 AM',
        whyDetails: 'Low rain chance (8%), calm wind (6 km/h), and cool morning temp (23°C).'
      }
    }
  },

  'rice-blast': {
    id: 'rice-blast',
    title: 'Rice — Leaf Blast',
    crop: 'Rice',
    problem: 'Likely Leaf Blast (Magnaporthe oryzae)',
    confidence: 89,
    severity: 'High',
    decision: 'ACT_NOW',
    decisionReason: 'Current weather is calm, dry, and ideal for systemic fungicide application.',
    recommendedWindow: 'Today 4:00 PM – 6:30 PM',
    sampleImage: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=600&q=80',
    mockResponse: {
      id: 'demo-analysis-rice-blast',
      timestamp: new Date().toISOString(),
      isDemoMode: true,
      crop: 'Rice',
      cropRiskScore: 84,
      imageUrl: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=600&q=80',
      diagnosis: {
        crop: 'Rice',
        likelyIssue: 'Rice Leaf Blast (Magnaporthe oryzae)',
        confidence: 89,
        severity: 'High',
        symptoms: [
          'Spindle-shaped or diamond-shaped lesions with gray/white centers',
          'Reddish-brown margins on rice leaf blades',
          'Rapid lesion coalescence leading to leaf tip necrosis'
        ],
        possibleCauses: [
          'Excessive nitrogen fertilizer application',
          'High relative humidity (>90%) with nocturnal dew',
          'Airborne fungal spore dispersion'
        ],
        immediateActions: [
          'Suspend nitrogenous fertilizer top-dressing immediately',
          'Maintain 2-5 cm standing water in paddy fields',
          'Apply recommended blast fungicide during dry window'
        ],
        treatmentGuidance: {
          cultural: [
            'Maintain continuous thin water layer in field',
            'Avoid excessive nitrogen applications'
          ],
          biological: [
            'Foliar spray with Pseudomonas fluorescens @ 10g/L'
          ],
          chemical: [
            'Apply Tricyclazole 75% WP or Azoxystrobin + Difenoconazole as per label guidance.'
          ]
        },
        prevention: [
          'Select blast-resistant cultivars (e.g. Swarna, MTU 1010)',
          'Treat seeds with Carbendazim before sowing'
        ],
        weatherRiskNote: 'Dry window active for next 18 hours. Ideal spray time.',
        needsExpertReview: false
      },
      weather: {
        locationName: 'Thanjavur Delta, Tamil Nadu',
        lat: 10.7870,
        lon: 79.1378,
        temperature: 27,
        humidity: 65,
        rainProb: 10,
        windSpeed: 7,
        conditionText: 'Clear & Favorable',
        icon: 'sun',
        hourly: [
          { time: '12 PM', timestamp: 1, temp: 28, humidity: 62, rainProb: 10, rainAmount: 0.0, windSpeed: 7, suitabilityScore: 92 },
          { time: '3 PM', timestamp: 2, temp: 27, humidity: 65, rainProb: 12, rainAmount: 0.0, windSpeed: 6, suitabilityScore: 95, isRecommendedWindow: true },
          { time: '6 PM', timestamp: 3, temp: 25, humidity: 70, rainProb: 15, rainAmount: 0.0, windSpeed: 5, suitabilityScore: 90 },
          { time: '9 PM', timestamp: 4, temp: 24, humidity: 78, rainProb: 15, rainAmount: 0.0, windSpeed: 4, suitabilityScore: 85 }
        ],
        daily: [
          { dayName: 'Today', dateStr: 'Aug 12', diseaseRiskScore: 84, rainProbability: 10, treatmentSuitability: 95, riskLabel: 'High' },
          { dayName: 'Tomorrow', dateStr: 'Aug 13', diseaseRiskScore: 70, rainProbability: 20, treatmentSuitability: 85, riskLabel: 'High' },
          { dayName: 'Day 2', dateStr: 'Aug 14', diseaseRiskScore: 50, rainProbability: 15, treatmentSuitability: 90, riskLabel: 'Moderate' },
          { dayName: 'Day 3', dateStr: 'Aug 15', diseaseRiskScore: 40, rainProbability: 10, treatmentSuitability: 92, riskLabel: 'Low' }
        ]
      },
      treatmentEvaluation: {
        decision: 'ACT_NOW',
        suitabilityScore: 95,
        statusText: 'EXCELLENT CONDITIONS — TREAT TODAY',
        reasons: [
          'Rain probability is under 12% for the next 24 hours.',
          'Wind speed (7 km/h) is gentle, ensuring target spray retention.',
          'High blast disease severity requires immediate action to protect yield.'
        ],
        actionWindow: {
          dayLabel: 'TODAY',
          timeRange: 'NOW – 6:30 PM',
          statusLabel: 'SUITABLE NOW',
          rainProb: 10,
          windSpeed: 7,
          temp: 27,
          humidity: 65,
          explanation: 'Clear sky and low wind offer peak fungicide absorption.'
        },
        whyExplainability: {
          visualEvidence: 'Spindle-shaped blast lesions covering >15% leaf surface area.',
          weatherEvidence: 'Calm winds (7 km/h), mild temp (27°C), low rain risk (10%).',
          decisionLogic: 'High disease risk combined with optimal dry weather makes immediate spraying necessary.'
        }
      },
      advisory: {
        summaryTitle: "Today's Field Action Plan",
        crop: 'Rice',
        likelyIssue: 'Leaf Blast',
        riskLevel: 'High',
        doNow: [
          'Stop nitrogen top-dressing immediately.',
          'Prepare blast fungicide spray (Tricyclazole or Azoxystrobin).'
        ],
        treatmentSummary: 'Apply recommended systemic blast fungicide today.',
        bestTimeToAct: 'Act Now (Today before 6:30 PM)',
        whyDetails: 'Favorable calm winds (7 km/h) and dry weather (10% rain chance).'
      }
    }
  },

  'cotton-pest': {
    id: 'cotton-pest',
    title: 'Cotton — Pest Damage',
    crop: 'Cotton',
    problem: 'Likely Pink Bollworm / Leafhopper Damage',
    confidence: 86,
    severity: 'Moderate',
    decision: 'WAIT',
    decisionReason: 'High wind speed (22 km/h) causes unsafe chemical drift.',
    recommendedWindow: 'Tomorrow early morning 6:00 AM – 8:30 AM',
    sampleImage: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=600&q=80',
    mockResponse: {
      id: 'demo-analysis-cotton-pest',
      timestamp: new Date().toISOString(),
      isDemoMode: true,
      crop: 'Cotton',
      cropRiskScore: 68,
      imageUrl: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=600&q=80',
      diagnosis: {
        crop: 'Cotton',
        likelyIssue: 'Leafhopper & Pink Bollworm Pest Attack',
        confidence: 86,
        severity: 'Moderate',
        symptoms: [
          'Downward leaf curling and brown "hopperburn" leaf edges',
          'Small feeding punctures on square bracts',
          'Stunted terminal leaf shoots'
        ],
        possibleCauses: [
          'Dry spell followed by sudden gusty winds assisting pest mobility',
          'Lack of beneficial predator insects (ladybugs, lacewings)'
        ],
        immediateActions: [
          'Install yellow sticky traps (10 traps per acre)',
          'Install pheromone traps for Pink Bollworm monitoring',
          'Postpone foliar spray until wind dies down'
        ],
        treatmentGuidance: {
          cultural: [
            'Maintain clean field borders free of alternate weed hosts'
          ],
          biological: [
            'Release Trichogramma chilonis egg parasitoids @ 60,000/acre',
            'Spray 5% Neem Seed Kernel Extract (NSKE)'
          ],
          chemical: [
            'Use recommended insecticide like Flonicamid or Imidacloprid as per local guidelines.'
          ]
        },
        prevention: [
          'Intercrop with cowpea or maize as trap crop',
          'Avoid prophylactic synthetic pyrethroid sprays'
        ],
        weatherRiskNote: 'High gusty winds will blow spray off target into neighboring fields.',
        needsExpertReview: false
      },
      weather: {
        locationName: 'Nagpur District, Maharashtra',
        lat: 21.1458,
        lon: 79.0882,
        temperature: 32,
        humidity: 48,
        rainProb: 5,
        windSpeed: 22,
        conditionText: 'Windy & Sunny',
        icon: 'wind',
        hourly: [
          { time: '12 PM', timestamp: 1, temp: 33, humidity: 45, rainProb: 5, rainAmount: 0.0, windSpeed: 24, suitabilityScore: 20 },
          { time: '3 PM', timestamp: 2, temp: 32, humidity: 48, rainProb: 5, rainAmount: 0.0, windSpeed: 22, suitabilityScore: 25 },
          { time: '6 PM', timestamp: 3, temp: 29, humidity: 55, rainProb: 8, rainAmount: 0.0, windSpeed: 16, suitabilityScore: 45 },
          { time: '6 AM', timestamp: 4, temp: 24, humidity: 65, rainProb: 5, rainAmount: 0.0, windSpeed: 6, suitabilityScore: 92, isRecommendedWindow: true }
        ],
        daily: [
          { dayName: 'Today', dateStr: 'Aug 12', diseaseRiskScore: 68, rainProbability: 5, treatmentSuitability: 25, riskLabel: 'Moderate' },
          { dayName: 'Tomorrow', dateStr: 'Aug 13', diseaseRiskScore: 50, rainProbability: 10, treatmentSuitability: 92, riskLabel: 'Moderate' },
          { dayName: 'Day 2', dateStr: 'Aug 14', diseaseRiskScore: 45, rainProbability: 15, treatmentSuitability: 88, riskLabel: 'Low' },
          { dayName: 'Day 3', dateStr: 'Aug 15', diseaseRiskScore: 35, rainProbability: 5, treatmentSuitability: 95, riskLabel: 'Low' }
        ]
      },
      treatmentEvaluation: {
        decision: 'WAIT',
        suitabilityScore: 25,
        statusText: 'HIGH WIND DRIFT RISK — WAIT FOR CALM WIND',
        reasons: [
          'Wind speed is 22 km/h (unsafe limit: >15 km/h).',
          'Pesticide mist will drift off cotton canopy, wasting input cost and risking drift contamination.',
          'Wind is expected to subside tomorrow morning (6 km/h).'
        ],
        actionWindow: {
          dayLabel: 'TOMORROW',
          timeRange: '6:00 AM – 8:30 AM',
          statusLabel: 'CALM WIND WINDOW',
          rainProb: 5,
          windSpeed: 6,
          temp: 24,
          humidity: 65,
          explanation: 'Wind drops to 6 km/h with dry conditions.'
        },
        whyExplainability: {
          visualEvidence: 'Downward leaf cupping and edge browning matching sucking pest damage.',
          weatherEvidence: 'Wind speed is 22 km/h with low humidity (48%).',
          decisionLogic: 'High winds cause aerosol drift and inefficiency. Waiting for morning calm is required.'
        }
      },
      advisory: {
        summaryTitle: "Today's Field Action Plan",
        crop: 'Cotton',
        likelyIssue: 'Sucking Pests / Leafhopper',
        riskLevel: 'Moderate',
        doNow: [
          'Set up yellow sticky traps to monitor pest population density.',
          'Delay chemical spray until high wind subsides.'
        ],
        treatmentSummary: 'Spray recommended systemic insecticide or NSKE 5%.',
        doNotTreatReason: 'Wind speed (22 km/h) is too high for safe spraying.',
        bestTimeToAct: 'Tomorrow 6:00 AM – 8:30 AM',
        whyDetails: 'Wind drops from 22 km/h to a calm 6 km/h tomorrow morning.'
      }
    }
  },

  'healthy-tomato': {
    id: 'healthy-tomato',
    title: 'Tomato — Healthy Crop',
    crop: 'Tomato',
    problem: 'No major visible disease detected',
    confidence: 94,
    severity: 'Low',
    decision: 'MONITOR',
    decisionReason: 'Crop foliage shows robust health. Continue routine field monitoring.',
    recommendedWindow: 'Routine check in 3 days',
    sampleImage: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=600&q=80',
    mockResponse: {
      id: 'demo-analysis-healthy-tomato',
      timestamp: new Date().toISOString(),
      isDemoMode: true,
      crop: 'Tomato',
      cropRiskScore: 12,
      imageUrl: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=600&q=80',
      diagnosis: {
        crop: 'Tomato',
        likelyIssue: 'Healthy Crop (No Active Disease)',
        confidence: 94,
        severity: 'Low',
        symptoms: [
          'Vibrant green uniform leaf pigmentation',
          'Sturdy stems without visible lesion spots',
          'Healthy flower cluster development'
        ],
        possibleCauses: [
          'Good soil nutrition and balanced irrigation',
          'Adequate plant spacing and sunlight exposure'
        ],
        immediateActions: [
          'Continue regular crop scouting twice a week',
          'Maintain current drip irrigation schedule'
        ],
        treatmentGuidance: {
          cultural: [
            'Maintain weed-free plot perimeters'
          ],
          biological: [
            'Optional preventive bio-fertilizer soil drenching'
          ],
          chemical: [
            'No chemical sprays required at this time.'
          ]
        },
        prevention: [
          'Keep foliage dry during irrigation',
          'Monitor weather for sudden rainfall bursts'
        ],
        weatherRiskNote: 'Weather is favorable for plant growth.',
        needsExpertReview: false
      },
      weather: {
        locationName: 'Nashik District, Maharashtra',
        lat: 19.9975,
        lon: 73.7898,
        temperature: 25,
        humidity: 60,
        rainProb: 15,
        windSpeed: 8,
        conditionText: 'Partly Cloudy',
        icon: 'sun',
        hourly: [
          { time: '12 PM', timestamp: 1, temp: 26, humidity: 58, rainProb: 15, rainAmount: 0.0, windSpeed: 8, suitabilityScore: 90 },
          { time: '3 PM', timestamp: 2, temp: 25, humidity: 60, rainProb: 15, rainAmount: 0.0, windSpeed: 8, suitabilityScore: 92 },
          { time: '6 PM', timestamp: 3, temp: 23, humidity: 65, rainProb: 10, rainAmount: 0.0, windSpeed: 7, suitabilityScore: 94 }
        ],
        daily: [
          { dayName: 'Today', dateStr: 'Aug 12', diseaseRiskScore: 12, rainProbability: 15, treatmentSuitability: 90, riskLabel: 'Low' },
          { dayName: 'Tomorrow', dateStr: 'Aug 13', diseaseRiskScore: 15, rainProbability: 10, treatmentSuitability: 95, riskLabel: 'Low' },
          { dayName: 'Day 2', dateStr: 'Aug 14', diseaseRiskScore: 18, rainProbability: 20, treatmentSuitability: 88, riskLabel: 'Low' },
          { dayName: 'Day 3', dateStr: 'Aug 15', diseaseRiskScore: 14, rainProbability: 10, treatmentSuitability: 92, riskLabel: 'Low' }
        ]
      },
      treatmentEvaluation: {
        decision: 'MONITOR',
        suitabilityScore: 90,
        statusText: 'HEALTHY CANOPY — NO SPRAY NEEDED',
        reasons: [
          'No visible disease or pest damage detected.',
          'Save chemical costs and preserve beneficial insects.',
          'Re-inspect in 3–5 days.'
        ],
        actionWindow: {
          dayLabel: 'NEXT SCOUTING',
          timeRange: 'In 3 Days',
          statusLabel: 'ROUTINE MONITORING',
          rainProb: 10,
          windSpeed: 7,
          temp: 24,
          humidity: 62,
          explanation: 'Regular inspection recommended to maintain crop health.'
        },
        whyExplainability: {
          visualEvidence: 'Clean green leaf canopy with no brown spots or lesions.',
          weatherEvidence: 'Normal seasonal weather parameters (25°C, 60% humidity).',
          decisionLogic: 'No treatment is required. Preserving crop natural ecosystem.'
        }
      },
      advisory: {
        summaryTitle: "Today's Field Action Plan",
        crop: 'Tomato',
        likelyIssue: 'Healthy Crop',
        riskLevel: 'Low',
        doNow: [
          'No treatment needed.',
          'Continue regular field walk and watering schedule.'
        ],
        treatmentSummary: 'No chemical inputs required. Keep up good field management!',
        bestTimeToAct: 'Routine check in 3 days',
        whyDetails: 'Foliage appears vigorous and disease-free (94% confidence).'
      }
    }
  }
};
