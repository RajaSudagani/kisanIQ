# KisanIQ — AI Agricultural Field Intelligence Platform

> **"See the Problem. Know the Risk. Act at the Right Time."**

KisanIQ is a real-time agricultural intelligence platform that acts as an expert bridge between raw field conditions (crop leaf photos, location, live microclimate signals) and actionable agronomic decisions for smallholder farmers, agricultural extension officers, and agronomists.

---

## 🌾 The Hackathon Problem & KisanIQ Solution

### The Challenge
Farmers often struggle with diagnosing crop diseases early and timing treatments appropriately. A treatment applied right before a downpour washes away, wasting money and polluting soil; a spray applied in high winds drifts off-target onto neighboring plots.

### KisanIQ Solution
KisanIQ converts unstructured field inputs into a clear 15-second visual action plan centered around its signature decision feature:

# **"ACT NOW OR WAIT?"**

Possible States:
- 🟢 **ACT NOW**: Favorable dry & calm weather conditions active.
- 🟠 **WAIT**: Approaching rain (>60% prob) or high wind drift risk (>15 km/h). Postpone spray.
- 🔴 **DO NOT ACT**: Hazardous environmental conditions.
- 🟡 **MONITOR**: Healthy canopy detected. No chemical inputs required.

---

## 🧠 System Architecture

```
FARMER FIELD INPUT
(Crop Photo + Location + Field Details)
         │
         ├──► 1. AI Vision (Gemini 1.5 Flash) → Likely Disease + Severity + Confidence
         ├──► 2. Weather Signals (OpenWeather API) → Rain %, Wind km/h, Temp, Humidity
         └──► 3. Weather Rule Engine (calculateTreatmentWindow) → Spray Suitability Score (0-100)
         │
         ▼
ACTIONABLE FARMER ADVISORY ("ACT NOW OR WAIT?" + Best Action Window + 15-Sec Advisory)
```

> **Safety Rule**: We do *not* rely on LLMs alone to evaluate chemical spray safety. All weather parameters are processed by a deterministic code-level rule engine evaluating strict agronomic safety limits.

---

## 🚀 Key Features

1. **Signature "ACT NOW OR WAIT?" Banner**: Visually prominent, high-impact decision card.
2. **Recommended Action Window**: Exact day and time range (e.g., *Tomorrow 6:00 AM – 9:00 AM*) with low rain and calm wind.
3. **15-Second Action Card**: 5 clear bullet points: *Do This Now*, *Treatment*, *Do Not Treat Yet*, *Best Time to Act*, and *Why*.
4. **24-Hour Weather Timeline**: Hour-by-hour forecast with visual spray suitability indicators.
5. **72-Hour Predictive Crop Risk**: 3-day multi-day disease spread and weather safety outlook.
6. **Transparent AI Explainability**: Expandable breakdown of *Visual Evidence*, *Weather Evidence*, and *Decision Logic*.
7. **Robust Demo Mode**: Works 100% out of the box with or without live API keys using 4 pre-built hackathon scenarios.
8. **Multi-Language Architecture**: Built-in support for English, Telugu (తెలుగు), and Hindi (हिन्दी).

---

## 🎭 4 Hackathon Demo Scenarios

| Scenario | Crop | Disease | Confidence | Weather | KisanIQ Decision | Action Window |
|---|---|---|---|---|---|---|
| **Scenario 1** | Tomato | Early Blight | 92% | Rain expected in 4h | 🟠 **WAIT** | Tomorrow 6:00 AM – 9:00 AM |
| **Scenario 2** | Rice | Leaf Blast | 89% | Calm, dry weather | 🟢 **ACT NOW** | Today before 6:30 PM |
| **Scenario 3** | Cotton | Pest Damage | 86% | High wind (22 km/h) | 🟠 **WAIT** | Tomorrow 6:00 AM – 8:30 AM |
| **Scenario 4** | Tomato | Healthy | 94% | Normal weather | 🟡 **MONITOR** | Routine check in 3 days |

---

## 💻 Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Modern Modular CSS, Lucide Icons, React Router DOM.
- **Backend**: Node.js, Express, TypeScript, tsx.
- **AI Vision**: Google Gemini 1.5 Flash API (`@google/generative-ai`) with structured JSON schema prompt.
- **Weather Engine**: OpenWeather 5-Day / 3-Hour Forecast API + Deterministic JS Rule Engine.
- **Persistence**: LocalStorage field inspection history.

---

## 🛠️ Installation & Running Locally

### Prerequisites
- Node.js (v18+ or v20+)
- npm

### Setup Steps

1. Clone or navigate to the project root:
```bash
cd d:\Antigravity\kisaniq
```

2. Install dependencies:
```bash
npm install
```

3. Configure Environment (Optional):
```bash
cp .env.example .env
```
*(Leave API keys blank to run in instant Demo Mode!)*

4. Run Development Server (Frontend + Backend concurrently):
```bash
npm run dev
```

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:3001`

---

## 🛡️ Agronomic Disclaimer

KisanIQ provides decision-support guidance based on visual symptoms and weather risk models. It does not replace professional agronomic testing or official agricultural extension advice. Always follow local product labels and safety guidelines before applying field treatments.
