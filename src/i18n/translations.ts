export type Language = 'en' | 'te' | 'hi';

export interface TranslationDictionary {
  brandName: string;
  tagline: string;
  subTagline: string;
  navDashboard: string;
  navAnalyze: string;
  navWeather: string;
  navHistory: string;
  navAbout: string;
  btnAnalyzeCrop: string;
  btnTryDemo: string;
  actNow: string;
  wait: string;
  doNotAct: string;
  monitor: string;
  demoModeLabel: string;
  selectCrop: string;
  uploadPhoto: string;
  locationLabel: string;
  analyzeButtonText: string;
}

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  en: {
    brandName: 'KisanIQ',
    tagline: 'See the Problem. Know the Risk. Act at the Right Time.',
    subTagline: 'AI-powered field intelligence that turns crop images, location and weather signals into clear agricultural action.',
    navDashboard: 'Dashboard',
    navAnalyze: 'Analyze Field',
    navWeather: 'Weather',
    navHistory: 'History',
    navAbout: 'How It Works',
    btnAnalyzeCrop: 'Analyze My Crop',
    btnTryDemo: 'Try Live Demo',
    actNow: 'ACT NOW',
    wait: 'WAIT',
    doNotAct: 'DO NOT ACT',
    monitor: 'MONITOR',
    demoModeLabel: 'Demo Mode Active',
    selectCrop: 'Select Crop',
    uploadPhoto: 'Upload Crop Photo',
    locationLabel: 'Field Location',
    analyzeButtonText: 'Analyze Crop'
  },
  te: {
    brandName: 'కిసాన్ IQ',
    tagline: 'సమస్యను చూడండి. ప్రమాదాన్ని తెలుసుకోండి. సరైన సమయంలో చర్య తీసుకోండి.',
    subTagline: 'పంట చిత్రాలు, లొకేషన్ మరియు వాతావరణ సంకేతాలను స్పష్టమైన వ్యవసాయ నిర్ణయాలుగా మార్చే AI టెక్నాలజీ.',
    navDashboard: 'డాష్‌బోర్డ్',
    navAnalyze: 'పంట విశ్లేషణ',
    navWeather: 'వాతావరణం',
    navHistory: 'చరిత్ర',
    navAbout: 'ఇది ఎలా పనిచేస్తుంది',
    btnAnalyzeCrop: 'నా పంటను విశ్లేషించండి',
    btnTryDemo: 'డెమో ప్రయత్నించండి',
    actNow: 'ఇప్పుడే స్ప్రే చేయండి',
    wait: 'ఆగండి',
    doNotAct: 'చేయవద్దు',
    monitor: 'గమనించండి',
    demoModeLabel: 'డెమో మోడ్ యాక్టివ్',
    selectCrop: 'పంటను ఎంచుకోండి',
    uploadPhoto: 'పంట ఫోటోను అప్‌లోడ్ చేయండి',
    locationLabel: 'పొలం లొకేషన్',
    analyzeButtonText: 'పంటను విశ్లేషించండి'
  },
  hi: {
    brandName: 'किसान IQ',
    tagline: 'समस्या देखें। जोखिम जानें। सही समय पर कार्रवाई करें।',
    subTagline: 'एआई-संचालित कृषि तकनीक जो फसल की छवियों, स्थान और मौसम के संकेतों को स्पष्ट कृषि सलाह में बदलती है।',
    navDashboard: 'डैशबोर्ड',
    navAnalyze: 'फसल विश्लेषण',
    navWeather: 'मौसम',
    navHistory: 'इतिहास',
    navAbout: 'यह कैसे काम करता है',
    btnAnalyzeCrop: 'मेरी फसल का विश्लेषण करें',
    btnTryDemo: 'डेमो आज़माएं',
    actNow: 'अभी छिड़काव करें',
    wait: 'रुकें',
    doNotAct: 'कार्रवाई न करें',
    monitor: 'निगरानी करें',
    demoModeLabel: 'डेमो मोड सक्रिय',
    selectCrop: 'फसल चुनें',
    uploadPhoto: 'फसल की फोटो अपलोड करें',
    locationLabel: 'खेत का स्थान',
    analyzeButtonText: 'फसल का विश्लेषण करें'
  }
};
