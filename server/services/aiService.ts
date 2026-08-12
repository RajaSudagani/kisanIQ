import { GoogleGenerativeAI } from '@google/generative-ai';
import { AIDiagnosis, CropType } from '../types';

export async function analyzeCropImage(
  base64Image?: string,
  cropType: CropType = 'Tomato',
  fieldNotes?: string
): Promise<{ diagnosis: AIDiagnosis; isLive: boolean }> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey && base64Image) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      // Clean base64 string if data URI header is present
      const cleanBase64 = base64Image.replace(/^data:image\/\w+;base64,/, '');

      const prompt = `You are KisanIQ, an expert agronomic crop health AI.
Analyze this field photo of a ${cropType} crop.
Field notes provided: "${fieldNotes || 'None'}".

You MUST return ONLY valid JSON matching this exact structure without markdown formatting or preamble:
{
  "crop": "${cropType}",
  "likelyIssue": "Name of likely disease or pest or 'Healthy Crop'",
  "confidence": 85,
  "severity": "Moderate",
  "symptoms": ["Symptom 1", "Symptom 2"],
  "possibleCauses": ["Cause 1", "Cause 2"],
  "immediateActions": ["Action 1", "Action 2"],
  "treatmentGuidance": {
    "cultural": ["Cultural practice 1"],
    "biological": ["Biological control 1"],
    "chemical": ["Approved chemical guidance note"]
  },
  "prevention": ["Prevention tip 1"],
  "weatherRiskNote": "Weather impact note",
  "needsExpertReview": false
}

Rules:
- Severity MUST be one of: "Low", "Moderate", "High", "Critical".
- Confidence MUST be an integer between 40 and 98.
- Never guarantee 100% lab certainty; use terms like "Likely diagnosis".
- Chemical recommendations MUST contain safety disclaimer: "Use only products approved for this crop in your region. Follow label instructions."`;

      const imagePart = {
        inlineData: {
          data: cleanBase64,
          mimeType: 'image/jpeg'
        }
      };

      const result = await model.generateContent([prompt, imagePart]);
      const text = result.response.text();
      
      // Parse JSON payload cleanly
      const jsonText = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed: AIDiagnosis = JSON.parse(jsonText);

      return { diagnosis: parsed, isLive: true };
    } catch (err) {
      console.warn('Gemini API analysis failed or key invalid. Falling back to Demo AI.', err);
    }
  }

  // Fallback intelligent mock diagnosis
  return {
    diagnosis: generateFallbackDiagnosis(cropType, fieldNotes),
    isLive: false
  };
}

function generateFallbackDiagnosis(crop: CropType, notes?: string): AIDiagnosis {
  switch (crop) {
    case 'Rice':
      return {
        crop: 'Rice',
        likelyIssue: 'Rice Leaf Blast (Magnaporthe oryzae)',
        confidence: 89,
        severity: 'High',
        symptoms: [
          'Spindle-shaped leaf lesions with gray centers and dark borders',
          'Necrotic brown spots on upper canopy',
          'Slight lodging of affected tillers'
        ],
        possibleCauses: ['High relative humidity', 'Excessive nitrogen fertilization', 'Nocturnal leaf wetness'],
        immediateActions: ['Withhold nitrogen fertilizer', 'Maintain 2-3 cm standing water', 'Apply protective fungicide during dry window'],
        treatmentGuidance: {
          cultural: ['Drain and re-flood field to lower humidity', 'Maintain optimum plant population density'],
          biological: ['Spray Pseudomonas fluorescens @ 10g/L'],
          chemical: ['Apply Tricyclazole 75% WP or Azoxystrobin following label instructions and local approval.']
        },
        prevention: ['Use certified blast-resistant seeds', 'Avoid dense seeding'],
        weatherRiskNote: 'High moisture accelerates fungal spore germination.',
        needsExpertReview: false
      };

    case 'Cotton':
      return {
        crop: 'Cotton',
        likelyIssue: 'Leafhopper & Sucking Pest Attack',
        confidence: 86,
        severity: 'Moderate',
        symptoms: ['Downward leaf curling', 'Marginal yellowing ("hopperburn")', 'Bract puncture marks'],
        possibleCauses: ['Hot dry weather followed by wind gusts', 'Spotted predator imbalance'],
        immediateActions: ['Install 10 yellow sticky traps per acre', 'Postpone spraying until wind drops below 15 km/h'],
        treatmentGuidance: {
          cultural: ['Destroy weeds along bunds'],
          biological: ['Foliar spray with 5% Neem Seed Kernel Extract (NSKE)'],
          chemical: ['Spray Flonicamid 50% WG or Imidacloprid strictly according to product label guidelines.']
        },
        prevention: ['Intercrop with cowpea', 'Avoid excessive synthetic pyrethroids'],
        weatherRiskNote: 'High winds cause spray drift and poor leaf retention.',
        needsExpertReview: false
      };

    case 'Chili':
      return {
        crop: 'Chili',
        likelyIssue: 'Chili Leaf Curl Virus / Thrips Damage',
        confidence: 88,
        severity: 'Moderate',
        symptoms: ['Upward cupping of young leaves', 'Stunted plant growth', 'Brittle thick leaves'],
        possibleCauses: ['Thrips and whitefly vector transmission', 'Dry weather stress'],
        immediateActions: ['Remove severely stunted plants', 'Install blue and yellow sticky traps'],
        treatmentGuidance: {
          cultural: ['Mulch with silver reflection sheets'],
          biological: ['Spray Lecanicillium lecanii bio-agent'],
          chemical: ['Use systemic vector insecticide approved in your region. Follow label instructions.']
        },
        prevention: ['Plant border crop of maize or sorghum'],
        weatherRiskNote: 'Dry sunny weather increases thrips population.',
        needsExpertReview: false
      };

    case 'Maize':
      return {
        crop: 'Maize',
        likelyIssue: 'Fall Armyworm (Spodoptera frugiperda)',
        confidence: 91,
        severity: 'High',
        symptoms: ['Windowpane leaf damage', 'Ragged holes in whorl leaves', 'Sawdust-like frass in whorls'],
        possibleCauses: ['Moth oviposition in early crop stage', 'Warm temperatures'],
        immediateActions: ['Apply sand/sawdust into whorls', 'Apply recommended bio-pesticide'],
        treatmentGuidance: {
          cultural: ['Intercrop with desmodium / push-pull technology'],
          biological: ['Apply Metarhizium anisopliae into plant whorls'],
          chemical: ['Apply Chlorantraniliprole 18.5% SC into central whorls as per label directions.']
        },
        prevention: ['Deep autumn plowing', 'Erect bird perches'],
        weatherRiskNote: 'Avoid spraying before heavy downpour.',
        needsExpertReview: false
      };

    default: // Tomato & others
      return {
        crop: crop || 'Tomato',
        likelyIssue: 'Early Blight (Alternaria solani)',
        confidence: 92,
        severity: 'Moderate',
        symptoms: [
          'Dark concentric circular spots ("target spots") on mature lower leaves',
          'Yellowing around spots',
          'Lower foliage defoliation'
        ],
        possibleCauses: [
          'Fungal spore survival in soil',
          'Frequent leaf wetness from sprinkler irrigation',
          'Warm humid temperature'
        ],
        immediateActions: [
          'Prune and destroy infected lower leaves',
          'Sanitize shears between plants',
          'Switch to drip irrigation'
        ],
        treatmentGuidance: {
          cultural: ['Mulch beds with clean straw to prevent soil splash', 'Stake plants for ventilation'],
          biological: ['Spray bio-fungicide Bacillus subtilis'],
          chemical: ['Use copper hydroxide or chlorothalonil fungicide approved locally for tomato early blight.']
        },
        prevention: ['Rotate crops every 2 years', 'Plant resistant varieties'],
        weatherRiskNote: 'Approaching rain will wash off foliar treatments if applied today.',
        needsExpertReview: false
      };
  }
}
