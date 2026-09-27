import { PanchayatData } from '../types';

export const PANCHAYAT_WEATHER_STORE: Record<string, PanchayatData> = {
  "Kanke (HQ)": {
    id: "panchayat-kanke",
    name: "Kanke (HQ)",
    hindiName: "कांके (मुख्यालय)",
    block: "Kanke",
    district: "Ranchi",
    state: "Jharkhand",
    lat: 23.4358,
    lng: 85.3211,
    elevation: 628,
    updatedTime: "Today, 08:00 AM",
    hindiUpdatedTime: "आज, सुबह 08:00 बजे",
    current: {
      temp: 28,
      rainfallExpected: "12–18 mm",
      rainfallExpectedMm: 15,
      rainProb: 72,
      humidity: 78,
      windSpeedKmH: 14,
      windDirection: "ESE (पूर्व-दक्षिण-पूर्व)",
      pressureHpa: 1008,
      status: "Rain likely today",
      hindiStatus: "आज वर्षा की संभावना"
    },
    forecast7Day: [
      {
        day: "Today",
        hindiDay: "आज",
        date: "28 Sep",
        tempMin: 22,
        tempMax: 28,
        rainProb: 72,
        rainfallMm: "12–18 mm",
        rainfallVal: 15,
        condition: "Moderate Rain Likely",
        hindiCondition: "मध्यम वर्षा की संभावना",
        icon: "cloud-rain",
        riskLevel: "Moderate",
        riskText: "Waterlogging in low tracts",
        hindiRiskText: "निचले खेतों में जलभराव"
      },
      {
        day: "Tomorrow",
        hindiDay: "कल",
        date: "29 Sep",
        tempMin: 23,
        tempMax: 30,
        rainProb: 35,
        rainfallMm: "2–5 mm",
        rainfallVal: 3.5,
        condition: "Scattered Passing Showers",
        hindiCondition: "छिटपुट बौछारें",
        icon: "cloud",
        riskLevel: "Low",
        riskText: "Low weather hazard",
        hindiRiskText: "कम जोखिम"
      },
      {
        day: "Wed",
        hindiDay: "बुध",
        date: "30 Sep",
        tempMin: 21,
        tempMax: 29,
        rainProb: 20,
        rainfallMm: "0–2 mm",
        rainfallVal: 1,
        condition: "Partly Cloudy & Dry",
        hindiCondition: "आंशिक बादल, सूखा",
        icon: "sun",
        riskLevel: "Low",
        riskText: "Favourable field work",
        hindiRiskText: "खेत कार्य के अनुकूल"
      },
      {
        day: "Thu",
        hindiDay: "गुरु",
        date: "01 Oct",
        tempMin: 22,
        tempMax: 27,
        rainProb: 80,
        rainfallMm: "25–35 mm",
        rainfallVal: 30,
        condition: "Heavy Rain Spell",
        hindiCondition: "भारी वर्षा का दौर",
        icon: "heavy-rain",
        riskLevel: "High",
        riskText: "Heavy rain & runoff alert",
        hindiRiskText: "भारी वर्षा चेतावनी"
      },
      {
        day: "Fri",
        hindiDay: "शुक्र",
        date: "02 Oct",
        tempMin: 21,
        tempMax: 26,
        rainProb: 65,
        rainfallMm: "10–16 mm",
        rainfallVal: 13,
        condition: "Intermittent Rain",
        hindiCondition: "रुक-रुक कर वर्षा",
        icon: "cloud-rain",
        riskLevel: "Moderate",
        riskText: "Soil saturation",
        hindiRiskText: "मिट्टी में अत्यधिक नमी"
      },
      {
        day: "Sat",
        hindiDay: "शनि",
        date: "03 Oct",
        tempMin: 22,
        tempMax: 29,
        rainProb: 30,
        rainfallMm: "1–4 mm",
        rainfallVal: 2.5,
        condition: "Clear Breaks",
        hindiCondition: "धूप और बादल",
        icon: "cloud",
        riskLevel: "Low",
        riskText: "Normal conditions",
        hindiRiskText: "सामान्य स्थिति"
      },
      {
        day: "Sun",
        hindiDay: "रवि",
        date: "04 Oct",
        tempMin: 21,
        tempMax: 31,
        rainProb: 15,
        rainfallMm: "0 mm",
        rainfallVal: 0,
        condition: "Warm & Sunny",
        hindiCondition: "खुला मौसम और धूप",
        icon: "sun",
        riskLevel: "Low",
        riskText: "Good harvest window",
        hindiRiskText: "फसल कटाई अनुकूल"
      }
    ],
    hourly: [
      { time: "08:00 AM", temp: 24, rainProb: 30, rainfallMm: 0.2, humidity: 82 },
      { time: "11:00 AM", temp: 27, rainProb: 45, rainfallMm: 1.5, humidity: 76 },
      { time: "02:00 PM", temp: 28, rainProb: 75, rainfallMm: 6.8, humidity: 79 },
      { time: "05:00 PM", temp: 26, rainProb: 70, rainfallMm: 5.2, humidity: 84 },
      { time: "08:00 PM", temp: 24, rainProb: 50, rainfallMm: 1.8, humidity: 88 },
      { time: "11:00 PM", temp: 23, rainProb: 25, rainfallMm: 0.3, humidity: 91 }
    ],
    risks: [
      {
        id: "risk-heavy-rain",
        name: "Heavy Rain",
        hindiName: "भारी वर्षा",
        severity: "Moderate",
        icon: "cloud-rain",
        description: "Rainfall may be higher than normal (12–18 mm). Consider delaying harvesting or chemical spray if possible.",
        hindiDescription: "वर्षा सामान्य से अधिक (12–18 मिमी) हो सकती है। कटाई या दवा छिड़काव टालने पर विचार करें।",
        affectedArea: "Valley slopes and cultivated plots"
      },
      {
        id: "risk-waterlogging",
        name: "Waterlogging",
        hindiName: "जलभराव",
        severity: "Moderate",
        icon: "droplets",
        description: "Low-lying areas may experience temporary water accumulation. Clear drainage furrows in standing crops.",
        hindiDescription: "निचले खेतों में अस्थायी जलभराव हो सकता है। खड़ी फसलों में जल निकासी नालियां साफ रखें।",
        affectedArea: "Lowland paddy tracts near Kanke Dam canal"
      },
      {
        id: "risk-heat-stress",
        name: "Heat Stress",
        hindiName: "तापमान तनाव",
        severity: "Low",
        icon: "thermometer-sun",
        description: "Max temperatures remain moderate (28°C). No heat stress impact expected today.",
        hindiDescription: "अधिकतम तापमान 28°C रहेगा। फसलों या पशुओं पर गर्मी का कोई विपरीत प्रभाव नहीं।",
        affectedArea: "Whole Panchayat"
      },
      {
        id: "risk-dry-spell",
        name: "Dry Spell",
        hindiName: "सूखा दौर",
        severity: "Low",
        icon: "sun",
        description: "Adequate moisture retention in root zone over the next 4 days.",
        hindiDescription: "अगले 4 दिनों तक मिट्टी में पर्याप्त नमी बनी रहने की संभावना है।",
        affectedArea: "Upland red loam soils"
      }
    ],
    guidance: [
      {
        category: "irrigation",
        title: "Irrigation",
        hindiTitle: "सिंचाई",
        icon: "sprout",
        status: "delay",
        recommendation: "Rain is expected today (12–18 mm). Irrigation may not be necessary for standing crops.",
        hindiRecommendation: "आज 12–18 मिमी वर्षा की संभावना है। खड़ी फसलों में सिंचाई की आवश्यकता नहीं है।",
        urgency: "medium"
      },
      {
        category: "fieldWork",
        title: "Field Work",
        hindiTitle: "खेत कार्य",
        icon: "wheat",
        status: "caution",
        recommendation: "Complete weeding or land preparation before afternoon rainfall window (around 01:30 PM).",
        hindiRecommendation: "दोपहर 01:30 बजे से पहले निराई-गुड़ाई या खेत की तैयारी पूरी कर लें।",
        urgency: "medium"
      },
      {
        category: "harvesting",
        title: "Harvesting",
        hindiTitle: "फसल कटाई",
        icon: "shopping-bag",
        status: "delay",
        recommendation: "Rain may affect harvested produce. Delay open-threshing and keep harvested bundles covered with tarpaulin.",
        hindiRecommendation: "बारिश से कटी फसल खराब हो सकती है। खलिहान में खुले अनाज को तिरपाल से ढक कर रखें।",
        urgency: "high"
      },
      {
        category: "spraying",
        title: "Spraying",
        hindiTitle: "दवा छिड़काव",
        icon: "spray-can",
        status: "delay",
        recommendation: "Rain may reduce the effectiveness of pesticide/fertilizer application. Avoid foliar spraying today.",
        hindiRecommendation: "बारिश से दवा धूल सकती है। कीटनाशक या यूरिया का छिड़काव आज न करें।",
        urgency: "high"
      }
    ],
    whyPredict: {
      factors: [
        {
          title: "Block Forecast Input",
          hindiTitle: "प्रखंड पूर्वानुमान इनपुट",
          desc: "Coarse 12 km NWP model indicates broad frontal boundary over Ranchi district with 8 mm mean rain.",
          hindiDesc: "12 किमी ग्रिड मॉडल पूरे रांची जिले में 8 मिमी औसत वर्षा का संकेत दे रहा है।"
        },
        {
          title: "Local Elevation & Terrain",
          hindiTitle: "स्थानीय स्थलाकृति व ऊंचाई",
          desc: "Kanke plateau ridge at 628 m forces incoming moist ESE winds to condense, enhancing local precipitation by +40%.",
          hindiDesc: "628 मीटर ऊंची कांके रिड नमी वाली हवाओं को रोकती है, जिससे वर्षा 40% बढ़ जाती है।"
        },
        {
          title: "Satellite Observations",
          hindiTitle: "उपग्रह प्रेक्षण (INSAT-3DR)",
          desc: "Infrared thermal sensors detect expanding convective cloud top temperature below -52°C over northern Kanke corridor.",
          hindiDesc: "इन्फ्रारेड सेंसर कांके के ऊपर घने बादलों के विस्तार को दर्ज कर रहे हैं।"
        },
        {
          title: "Vegetation & Soil Moisture",
          hindiTitle: "वनस्पति व मिट्टी नमी (Sentinel-2)",
          desc: "High soil moisture index (0.68) around agricultural clusters reduces thermal turbulence, stabilizing local rain cell.",
          hindiDesc: "खेतों में पर्याप्त नमी स्थानीय वर्षा बादलों को केंद्रित रखती है।"
        }
      ],
      localPatternNote: "Your Panchayat has historically shown higher rainfall retention than eastern Ranchi blocks due to the local reservoir basin effect.",
      hindiLocalPatternNote: "जलाशय और रिड के प्रभाव से आपके पंचायत में पास के अन्य क्षेत्रों की तुलना में वर्षा अधिक रुकती है।"
    },
    confidence: {
      level: "Moderate",
      hindiLevel: "मध्यम विश्वसनीयता",
      explanation: "Local automatic weather station is 6.2 km away. Rainfall estimate is calibrated against terrain radar and satellite pass.",
      hindiExplanation: "स्थानीय मौसम केंद्र 6.2 किमी दूर है। रडार और उपग्रह से पूर्वानुमान कैलिब्रेट किया गया है।",
      satellitePass: "INSAT-3DR 07:15 AM IST",
      stationDistanceKm: 6.2
    },
    fingerprint: {
      rainfallPattern: "Moderate to high orographic enhancement",
      hindiRainfallPattern: "मध्यम से उच्च पर्वतीय प्रभाव",
      terrain: "Mixed plateau slope (628 m)",
      hindiTerrain: "पठारी ढलान (628 मी)",
      elevationM: 628,
      vegetation: "Dense agricultural & orchard cover (NDVI 0.54)",
      hindiVegetation: "सघन कृषि क्षेत्र (NDVI 0.54)",
      seasonality: "Monsoon-sensitive, quick runoff",
      hindiSeasonality: "मानसून-संवेदनशील, तेज बहाव",
      historicalBias: "+2.8 mm above regional block average",
      whyItMatters: "GRAMCAST uses local elevation, nearby reservoir moisture, and soil conditions to downscale coarse block forecasts specifically for Kanke fields.",
      hindiWhyItMatters: "ग्रामकास्ट स्थानीय ऊंचाई, तालाब और मिट्टी की नमी का उपयोग करके ब्लॉक के पूर्वानुमान को आपके खेतों के अनुसार सटीक बनाता है।"
    },
    blockForecastComparison: {
      blockRainfallMm: 8.5,
      panchayatRainfallMm: 15.0,
      blockTempC: 29.2,
      panchayatTempC: 28.0,
      varianceReason: "Orographic uplift against central plateau rim concentrates rainfall in Kanke basin, creating a 6.5 mm localized surplus compared to generalized block average.",
      hindiVarianceReason: "पठारी ऊंचाई के कारण बादलों का दबाव कांके बेसिन में अधिक वर्षा (+6.5 मिमी) करता है, जबकि ब्लॉक का सामान्य औसत कम रहता है।"
    }
  },
  "Sukurhutu": {
    id: "panchayat-sukurhutu",
    name: "Sukurhutu",
    hindiName: "सुकुरहुटू",
    block: "Kanke",
    district: "Ranchi",
    state: "Jharkhand",
    lat: 23.4612,
    lng: 85.3054,
    elevation: 614,
    updatedTime: "Today, 08:00 AM",
    hindiUpdatedTime: "आज, सुबह 08:00 बजे",
    current: {
      temp: 27.5,
      rainfallExpected: "18–24 mm",
      rainfallExpectedMm: 21,
      rainProb: 84,
      humidity: 84,
      windSpeedKmH: 12,
      windDirection: "SE",
      pressureHpa: 1007,
      status: "Heavy showers likely",
      hindiStatus: "तेज बौछारों की संभावना"
    },
    forecast7Day: [
      {
        day: "Today",
        hindiDay: "आज",
        date: "28 Sep",
        tempMin: 22,
        tempMax: 27,
        rainProb: 84,
        rainfallMm: "18–24 mm",
        rainfallVal: 21,
        condition: "Heavy Showers Likely",
        hindiCondition: "तेज बौछारें",
        icon: "heavy-rain",
        riskLevel: "High",
        riskText: "Water accumulation in dips",
        hindiRiskText: "निचले भागों में जलभराव"
      },
      {
        day: "Tomorrow",
        hindiDay: "कल",
        date: "29 Sep",
        tempMin: 22,
        tempMax: 29,
        rainProb: 40,
        rainfallMm: "4–8 mm",
        rainfallVal: 6,
        condition: "Scattered Rain",
        hindiCondition: "छिटपुट वर्षा",
        icon: "cloud-rain",
        riskLevel: "Moderate",
        riskText: "Wet soil conditions",
        hindiRiskText: "गीली मिट्टी"
      },
      {
        day: "Wed",
        hindiDay: "बुध",
        date: "30 Sep",
        tempMin: 21,
        tempMax: 29,
        rainProb: 25,
        rainfallMm: "1–3 mm",
        rainfallVal: 2,
        condition: "Mostly Dry",
        hindiCondition: "मुख्य रूप से सूखा",
        icon: "cloud",
        riskLevel: "Low",
        riskText: "Field access improves",
        hindiRiskText: "खेत आवागमन सामान्य"
      },
      {
        day: "Thu",
        hindiDay: "गुरु",
        date: "01 Oct",
        tempMin: 21,
        tempMax: 26,
        rainProb: 88,
        rainfallMm: "30–42 mm",
        rainfallVal: 36,
        condition: "Intense Downpour",
        hindiCondition: "मूसलाधार वर्षा",
        icon: "heavy-rain",
        riskLevel: "High",
        riskText: "Severe waterlogging risk",
        hindiRiskText: "गंभीर जलभराव खतरा"
      },
      {
        day: "Fri",
        hindiDay: "शुक्र",
        date: "02 Oct",
        tempMin: 20,
        tempMax: 26,
        rainProb: 60,
        rainfallMm: "8–14 mm",
        rainfallVal: 11,
        condition: "Light Showers",
        hindiCondition: "हल्की बौछारें",
        icon: "cloud-rain",
        riskLevel: "Moderate",
        riskText: "Moderate moisture",
        hindiRiskText: "मध्यम नमी"
      },
      {
        day: "Sat",
        hindiDay: "शनि",
        date: "03 Oct",
        tempMin: 21,
        tempMax: 29,
        rainProb: 20,
        rainfallMm: "0–2 mm",
        rainfallVal: 1,
        condition: "Clear Sky",
        hindiCondition: "साफ आकाश",
        icon: "sun",
        riskLevel: "Low",
        riskText: "Good conditions",
        hindiRiskText: "अनुकूल स्थिति"
      },
      {
        day: "Sun",
        hindiDay: "रवि",
        date: "04 Oct",
        tempMin: 21,
        tempMax: 30,
        rainProb: 10,
        rainfallMm: "0 mm",
        rainfallVal: 0,
        condition: "Sunny & Mild",
        hindiCondition: "धूप",
        icon: "sun",
        riskLevel: "Low",
        riskText: "Optimal spraying",
        hindiRiskText: "छिड़काव अनुकूल"
      }
    ],
    hourly: [
      { time: "08:00 AM", temp: 23, rainProb: 40, rainfallMm: 0.8, humidity: 88 },
      { time: "11:00 AM", temp: 26, rainProb: 60, rainfallMm: 3.2, humidity: 82 },
      { time: "02:00 PM", temp: 27, rainProb: 88, rainfallMm: 9.4, humidity: 85 },
      { time: "05:00 PM", temp: 25, rainProb: 80, rainfallMm: 6.1, humidity: 89 },
      { time: "08:00 PM", temp: 24, rainProb: 45, rainfallMm: 1.2, humidity: 92 },
      { time: "11:00 PM", temp: 23, rainProb: 20, rainfallMm: 0.1, humidity: 94 }
    ],
    risks: [
      {
        id: "risk-waterlogging",
        name: "Waterlogging",
        hindiName: "जलभराव",
        severity: "High",
        icon: "droplets",
        description: "Low-lying valley basin causes rapid runoff convergence. Up to 24 mm rain will saturate low paddy bunds.",
        hindiDescription: "निचले इलाके में वर्षा का पानी तेजी से जमा होगा। धान के मेड़ों से पानी निकासी का प्रबंध करें।",
        affectedArea: "Sukurhutu lowland agricultural belt"
      },
      {
        id: "risk-heavy-rain",
        name: "Heavy Rain",
        hindiName: "भारी वर्षा",
        severity: "Moderate",
        icon: "cloud-rain",
        description: "Expected 18–24 mm rainfall. Halt open fertilizer top dressing.",
        hindiDescription: "18–24 मिमी बारिश की संभावना। यूरिया का खुला छिड़काव न करें।",
        affectedArea: "Entire village boundary"
      },
      {
        id: "risk-heat-stress",
        name: "Heat Stress",
        hindiName: "तापमान तनाव",
        severity: "Low",
        icon: "thermometer-sun",
        description: "Cloud cover keeps maximum temperature at 27.5°C.",
        hindiDescription: "बादल रहने से तापमान 27.5°C पर नियंत्रित रहेगा।",
        affectedArea: "None"
      }
    ],
    guidance: [
      {
        category: "irrigation",
        title: "Irrigation",
        hindiTitle: "सिंचाई",
        icon: "sprout",
        status: "delay",
        recommendation: "High rainfall expected (18–24 mm). Stop all tube-well irrigation immediately.",
        hindiRecommendation: "भारी बारिश (18–24 मिमी) होगी। नलकूप या मोटर सिंचाई तुरंत रोक दें।",
        urgency: "high"
      },
      {
        category: "fieldWork",
        title: "Field Work",
        hindiTitle: "खेत कार्य",
        icon: "wheat",
        status: "delay",
        recommendation: "Field soil will be saturated. Avoid heavy machinery or tractor operations on soft loams.",
        hindiRecommendation: "खेत दलदली हो सकते हैं। ट्रैक्टर या भारी जुताई का कार्य टालें।",
        urgency: "medium"
      },
      {
        category: "harvesting",
        title: "Harvesting",
        hindiTitle: "फसल कटाई",
        icon: "shopping-bag",
        status: "delay",
        recommendation: "Keep harvested maize and vegetables elevated and strictly protected from standing puddles.",
        hindiRecommendation: "तोड़ी गई मक्का और सब्जियों को जमीन से ऊपर और सुरक्षित शेड में रखें।",
        urgency: "high"
      },
      {
        category: "spraying",
        title: "Spraying",
        hindiTitle: "दवा छिड़काव",
        icon: "spray-can",
        status: "delay",
        recommendation: "Heavy downpours will wash away agricultural chemicals. Postpone until Thursday.",
        hindiRecommendation: "तेज बारिश से दवा बह जाएगी। छिड़काव गुरुवार तक स्थगित रखें।",
        urgency: "high"
      }
    ],
    whyPredict: {
      factors: [
        {
          title: "Valley Basin Convergence",
          hindiTitle: "घाटी बेसिन संगम",
          desc: "Elevation is 614 m (14 m below Kanke HQ). Air drainage into this natural depression pools atmospheric moisture.",
          hindiDesc: "614 मीटर ऊंचाई होने से आसपास की आर्द्र हवा इस घाटी में एकत्र होकर घने बादल बनाती है।"
        },
        {
          title: "Soil Saturation Sensor",
          hindiTitle: "मृदा संतृप्ति सेंसर",
          desc: "Local clay-loam profile exhibits slow percolation rate (4.2 mm/hr), triggering high waterlogging alert.",
          hindiDesc: "दोमट मिट्टी में पानी रिसने की दर धीमी होने से जलभराव का खतरा अधिक है।"
        }
      ],
      localPatternNote: "Sukurhutu records 15-20% higher peak rain events than upper Kanke during active monsoon spells.",
      hindiLocalPatternNote: "सक्रिय मानसून में सुकुरहुटू में ऊपरी कांके से 15-20% अधिक बारिश दर्ज होती है।"
    },
    confidence: {
      level: "High",
      hindiLevel: "उच्च विश्वसनीयता",
      explanation: "Proximity to Kanke reservoir telemetry station (3.1 km) gives high-confidence ground truth verification.",
      hindiExplanation: "कांके जलाशय स्टेशन (3.1 किमी) के नजदीक होने से सटीक डेटा उपलब्ध है।",
      satellitePass: "INSAT-3DR 07:15 AM IST",
      stationDistanceKm: 3.1
    },
    fingerprint: {
      rainfallPattern: "High intensity, drainage sensitive",
      hindiRainfallPattern: "तीव्र वर्षा, जल निकासी संवेदनशील",
      terrain: "Low-lying valley basin (614 m)",
      hindiTerrain: "निचला घाटी क्षेत्र (614 मी)",
      elevationM: 614,
      vegetation: "Intensive paddy & seasonal vegetables",
      hindiVegetation: "गहन धान एवं मौसमी सब्जियां",
      seasonality: "Monsoon flood prone",
      hindiSeasonality: "मानसून जलभराव प्रवण",
      historicalBias: "+6.0 mm above block forecast",
      whyItMatters: "GRAMCAST recognizes Sukurhutu's lower altitude depression, predicting +6 mm more rain than the generalized Block bulletin.",
      hindiWhyItMatters: "ग्रामकास्ट सुकुरहुटू की निचली भौगोलिक बनावट को पहचान कर ब्लॉक बुलेटिन से 6 मिमी अधिक वर्षा का सटीक अनुमान देता है।"
    },
    blockForecastComparison: {
      blockRainfallMm: 8.5,
      panchayatRainfallMm: 21.0,
      blockTempC: 29.2,
      panchayatTempC: 27.5,
      varianceReason: "Valley topography traps moisture; convective cells stall over Sukurhutu basin resulting in +12.5 mm variation over block NWP baseline.",
      hindiVarianceReason: "घाटी में नमी फंसने से सुकुरहुटू में ब्लॉक औसत (8.5 मिमी) की तुलना में 21 मिमी तक वर्षा संभव है।"
    }
  },
  "Pithoria": {
    id: "panchayat-pithoria",
    name: "Pithoria",
    hindiName: "पिठोरिया",
    block: "Kanke",
    district: "Ranchi",
    state: "Jharkhand",
    lat: 23.5183,
    lng: 85.2981,
    elevation: 672,
    updatedTime: "Today, 08:00 AM",
    hindiUpdatedTime: "आज, सुबह 08:00 बजे",
    current: {
      temp: 26.2,
      rainfallExpected: "8–12 mm",
      rainfallExpectedMm: 10,
      rainProb: 65,
      humidity: 74,
      windSpeedKmH: 18,
      windDirection: "E",
      pressureHpa: 1005,
      status: "Breezy with light to moderate showers",
      hindiStatus: "हवादार, हल्की से मध्यम वर्षा"
    },
    forecast7Day: [
      {
        day: "Today",
        hindiDay: "आज",
        date: "28 Sep",
        tempMin: 20,
        tempMax: 26,
        rainProb: 65,
        rainfallMm: "8–12 mm",
        rainfallVal: 10,
        condition: "Breezy Showers",
        hindiCondition: "हवादार वर्षा",
        icon: "cloud-rain",
        riskLevel: "Low",
        riskText: "Well-drained slopes",
        hindiRiskText: "ढलान से पानी निकल जाएगा"
      },
      {
        day: "Tomorrow",
        hindiDay: "कल",
        date: "29 Sep",
        tempMin: 21,
        tempMax: 28,
        rainProb: 25,
        rainfallMm: "1–3 mm",
        rainfallVal: 2,
        condition: "Pleasant & Breezy",
        hindiCondition: "सुहावना व हवादार",
        icon: "cloud",
        riskLevel: "Low",
        riskText: "Favourable for fields",
        hindiRiskText: "खेत कार्य हेतु उत्तम"
      },
      {
        day: "Wed",
        hindiDay: "बुध",
        date: "30 Sep",
        tempMin: 20,
        tempMax: 28,
        rainProb: 15,
        rainfallMm: "0 mm",
        rainfallVal: 0,
        condition: "Clear & Bright",
        hindiCondition: "साफ व धूप",
        icon: "sun",
        riskLevel: "Low",
        riskText: "Ideal spraying day",
        hindiRiskText: "छिड़काव के लिए आदर्श"
      },
      {
        day: "Thu",
        hindiDay: "गुरु",
        date: "01 Oct",
        tempMin: 21,
        tempMax: 25,
        rainProb: 75,
        rainfallMm: "20–28 mm",
        rainfallVal: 24,
        condition: "Heavy Ridge Rain",
        hindiCondition: "पहाड़ी भारी वर्षा",
        icon: "heavy-rain",
        riskLevel: "Moderate",
        riskText: "Soil erosion on steep slopes",
        hindiRiskText: "ढलानों पर मिट्टी कटाव"
      },
      {
        day: "Fri",
        hindiDay: "शुक्र",
        date: "02 Oct",
        tempMin: 20,
        tempMax: 26,
        rainProb: 50,
        rainfallMm: "5–10 mm",
        rainfallVal: 7,
        condition: "Scattered Rain",
        hindiCondition: "छिटपुट बारिश",
        icon: "cloud-rain",
        riskLevel: "Low",
        riskText: "Normal moisture",
        hindiRiskText: "सामान्य नमी"
      },
      {
        day: "Sat",
        hindiDay: "शनि",
        date: "03 Oct",
        tempMin: 21,
        tempMax: 28,
        rainProb: 20,
        rainfallMm: "0–2 mm",
        rainfallVal: 1,
        condition: "Mild Sunshine",
        hindiCondition: "हल्की धूप",
        icon: "sun",
        riskLevel: "Low",
        riskText: "Safe harvest",
        hindiRiskText: "सुरक्षित कटाई"
      },
      {
        day: "Sun",
        hindiDay: "रवि",
        date: "04 Oct",
        tempMin: 20,
        tempMax: 29,
        rainProb: 10,
        rainfallMm: "0 mm",
        rainfallVal: 0,
        condition: "Dry & Clear",
        hindiCondition: "शुष्क व साफ",
        icon: "sun",
        riskLevel: "Low",
        riskText: "No weather hazard",
        hindiRiskText: "कोई जोखिम नहीं"
      }
    ],
    hourly: [
      { time: "08:00 AM", temp: 22, rainProb: 35, rainfallMm: 0.3, humidity: 78 },
      { time: "11:00 AM", temp: 25, rainProb: 50, rainfallMm: 1.8, humidity: 72 },
      { time: "02:00 PM", temp: 26, rainProb: 65, rainfallMm: 4.5, humidity: 75 },
      { time: "05:00 PM", temp: 24, rainProb: 60, rainfallMm: 2.8, humidity: 80 },
      { time: "08:00 PM", temp: 23, rainProb: 35, rainfallMm: 0.6, humidity: 82 },
      { time: "11:00 PM", temp: 21, rainProb: 15, rainfallMm: 0.0, humidity: 85 }
    ],
    risks: [
      {
        id: "risk-waterlogging",
        name: "Waterlogging",
        hindiName: "जलभराव",
        severity: "Low",
        icon: "droplets",
        description: "High elevation (672 m) and natural drainage prevent water stagnation.",
        hindiDescription: "ऊंचे पठार (672 मी) और प्राकृतिक ढलान के कारण जलभराव की कोई संभावना नहीं है।",
        affectedArea: "None"
      },
      {
        id: "risk-heavy-rain",
        name: "Heavy Rain",
        hindiName: "भारी वर्षा",
        severity: "Low",
        icon: "cloud-rain",
        description: "Rainfall expected between 8–12 mm. Well within soil holding capacity.",
        hindiDescription: "8–12 मिमी वर्षा मिट्टी की सोखने की क्षमता के भीतर है।",
        affectedArea: "Upper terraced fields"
      },
      {
        id: "risk-heat-stress",
        name: "Heat Stress",
        hindiName: "तापमान तनाव",
        severity: "Low",
        icon: "thermometer-sun",
        description: "Cool plateau breeze keeps max temperature at 26.2°C.",
        hindiDescription: "ठंडी पठारी हवाओं से तापमान 26.2°C बना रहेगा।",
        affectedArea: "None"
      }
    ],
    guidance: [
      {
        category: "irrigation",
        title: "Irrigation",
        hindiTitle: "सिंचाई",
        icon: "sprout",
        status: "delay",
        recommendation: "8–12 mm rain will meet moisture demand for vegetable and maize plots.",
        hindiRecommendation: "8–12 मिमी बारिश सब्जी और मक्का की फसल के लिए पर्याप्त है।",
        urgency: "medium"
      },
      {
        category: "fieldWork",
        title: "Field Work",
        hindiTitle: "खेत कार्य",
        icon: "wheat",
        status: "proceed",
        recommendation: "Slopes will drain rapidly. Terraced weeding and staking can proceed comfortably.",
        hindiRecommendation: "ढलानों पर पानी नहीं रुकेगा। सब्जियों में बंधाई व निराई का कार्य किया जा सकता है।",
        urgency: "normal"
      },
      {
        category: "harvesting",
        title: "Harvesting",
        hindiTitle: "फसल कटाई",
        icon: "shopping-bag",
        status: "caution",
        recommendation: "Vegetable harvests can continue; store crates in dry barn by 1:00 PM.",
        hindiRecommendation: "सब्जियों की तुड़ाई जारी रख सकते हैं; दोपहर 1 बजे तक छाया में सुरक्षित रखें।",
        urgency: "medium"
      },
      {
        category: "spraying",
        title: "Spraying",
        hindiTitle: "दवा छिड़काव",
        icon: "spray-can",
        status: "caution",
        recommendation: "Wind gust up to 18 km/h may cause chemical drift. Spray early morning before 10 AM.",
        hindiRecommendation: "हवा की गति 18 किमी/घंटे तक हो सकती है। सुबह 10 बजे से पहले ही छिड़काव करें।",
        urgency: "medium"
      }
    ],
    whyPredict: {
      factors: [
        {
          title: "Plateau Ridge Microclimate",
          hindiTitle: "पठारी कटक सूक्ष्म जलवायु",
          desc: "672 m elevation cools air adiabatically, producing lower maximum temperatures (-1.8°C cooler than Kanke HQ).",
          hindiDesc: "672 मीटर ऊंचाई के कारण तापमान कांके से 1.8°C कम रहता है।"
        },
        {
          title: "Terraced Surface Runoff",
          hindiTitle: "सीढ़ीदार खेत बहाव",
          desc: "Slope gradient of 4.8% accelerates lateral drainage, preventing any waterlogging even during active spells.",
          hindiDesc: "4.8% ढलान होने से पानी तुरंत बह जाता है और जलभराव नहीं होता।"
        }
      ],
      localPatternNote: "Pithoria's elevated location triggers earlier cloud breakups and cooler night temperatures.",
      hindiLocalPatternNote: "पिठोरिया की ऊंचाई से बादल जल्दी छंटते हैं और रातें अपेक्षाकृत ठंडी रहती हैं।"
    },
    confidence: {
      level: "High",
      hindiLevel: "उच्च विश्वसनीयता",
      explanation: "Consistent Doppler radar reflectivity from Ranchi IMD radar station confirms high-confidence precipitation band.",
      hindiExplanation: "रांची मौसम रडार से सीधा सिगनल मिलने के कारण पूर्वानुमान अत्यधिक विश्वसनीय है।",
      satellitePass: "INSAT-3DR 07:15 AM IST",
      stationDistanceKm: 7.8
    },
    fingerprint: {
      rainfallPattern: "Moderate, rapid drainage",
      hindiRainfallPattern: "मध्यम, त्वरित जल निकासी",
      terrain: "Elevated plateau ridge (672 m)",
      hindiTerrain: "ऊंचा पठारी कटक (672 मी)",
      elevationM: 672,
      vegetation: "Extensive vegetable belts (Tomato, Cabbage)",
      hindiVegetation: "व्यापक सब्जी पट्टी (टमाटर, पत्तागोभी)",
      seasonality: "Cooler winter entry, low flood vulnerability",
      hindiSeasonality: "जल्दी ठंड, बाढ़ से पूरी तरह सुरक्षित",
      historicalBias: "+1.5 mm above block baseline",
      whyItMatters: "GRAMCAST factors in the 44-meter elevation difference from Kanke basin, correctly predicting cooler temps and zero waterlogging.",
      hindiWhyItMatters: "ग्रामकास्ट कांके से 44 मीटर अधिक ऊंचाई को जोड़कर कम तापमान और शून्य जलभराव का सही अनुमान देता है।"
    },
    blockForecastComparison: {
      blockRainfallMm: 8.5,
      panchayatRainfallMm: 10.0,
      blockTempC: 29.2,
      panchayatTempC: 26.2,
      varianceReason: "Higher elevation produces faster wind clearing and 3.0°C cooler ambient temperature compared to uniform block forecast.",
      hindiVarianceReason: "ऊंचाई और हवा के प्रवाह से तापमान ब्लॉक औसत से 3.0°C ठंडा रहता है।"
    }
  },
  "Borea": {
    id: "panchayat-borea",
    name: "Borea",
    hindiName: "बोड़ेया",
    block: "Kanke",
    district: "Ranchi",
    state: "Jharkhand",
    lat: 23.4190,
    lng: 85.3420,
    elevation: 622,
    updatedTime: "Today, 08:00 AM",
    hindiUpdatedTime: "आज, सुबह 08:00 बजे",
    current: {
      temp: 28.4,
      rainfallExpected: "14–20 mm",
      rainfallExpectedMm: 17,
      rainProb: 76,
      humidity: 80,
      windSpeedKmH: 11,
      windDirection: "E",
      pressureHpa: 1008,
      status: "Rain likely in afternoon",
      hindiStatus: "दोपहर में वर्षा की संभावना"
    },
    forecast7Day: [
      {
        day: "Today",
        hindiDay: "आज",
        date: "28 Sep",
        tempMin: 22,
        tempMax: 28.4,
        rainProb: 76,
        rainfallMm: "14–20 mm",
        rainfallVal: 17,
        condition: "Rain Likely",
        hindiCondition: "वर्षा की संभावना",
        icon: "cloud-rain",
        riskLevel: "Moderate",
        riskText: "Canal overflow risk",
        hindiRiskText: "नहर जलभराव जोखिम"
      },
      {
        day: "Tomorrow",
        hindiDay: "कल",
        date: "29 Sep",
        tempMin: 23,
        tempMax: 30,
        rainProb: 30,
        rainfallMm: "2–5 mm",
        rainfallVal: 3,
        condition: "Scattered Showers",
        hindiCondition: "छिटपुट वर्षा",
        icon: "cloud",
        riskLevel: "Low",
        riskText: "Low risk",
        hindiRiskText: "कम जोखिम"
      },
      {
        day: "Wed",
        hindiDay: "बुध",
        date: "30 Sep",
        tempMin: 22,
        tempMax: 29,
        rainProb: 20,
        rainfallMm: "0–1 mm",
        rainfallVal: 0.5,
        condition: "Partly Cloudy",
        hindiCondition: "आंशिक बादल",
        icon: "sun",
        riskLevel: "Low",
        riskText: "Field access open",
        hindiRiskText: "खेत कार्य अनुकूल"
      },
      {
        day: "Thu",
        hindiDay: "गुरु",
        date: "01 Oct",
        tempMin: 22,
        tempMax: 27,
        rainProb: 82,
        rainfallMm: "28–38 mm",
        rainfallVal: 33,
        condition: "Heavy Rain Spell",
        hindiCondition: "भारी बारिश",
        icon: "heavy-rain",
        riskLevel: "High",
        riskText: "Riparian overflow alert",
        hindiRiskText: "नदी तट जलभराव चेतावनी"
      },
      {
        day: "Fri",
        hindiDay: "शुक्र",
        date: "02 Oct",
        tempMin: 21,
        tempMax: 27,
        rainProb: 55,
        rainfallMm: "6–12 mm",
        rainfallVal: 9,
        condition: "Light Rain",
        hindiCondition: "हल्की बारिश",
        icon: "cloud-rain",
        riskLevel: "Low",
        riskText: "Easing rains",
        hindiRiskText: "बारिश में कमी"
      },
      {
        day: "Sat",
        hindiDay: "शनि",
        date: "03 Oct",
        tempMin: 22,
        tempMax: 29,
        rainProb: 25,
        rainfallMm: "1–3 mm",
        rainfallVal: 2,
        condition: "Sun Breaks",
        hindiCondition: "धूप-छांव",
        icon: "cloud",
        riskLevel: "Low",
        riskText: "Normal",
        hindiRiskText: "सामान्य"
      },
      {
        day: "Sun",
        hindiDay: "रवि",
        date: "04 Oct",
        tempMin: 22,
        tempMax: 31,
        rainProb: 15,
        rainfallMm: "0 mm",
        rainfallVal: 0,
        condition: "Sunny",
        hindiCondition: "धूप",
        icon: "sun",
        riskLevel: "Low",
        riskText: "Good harvesting",
        hindiRiskText: "कटाई अनुकूल"
      }
    ],
    hourly: [
      { time: "08:00 AM", temp: 24, rainProb: 30, rainfallMm: 0.2, humidity: 84 },
      { time: "11:00 AM", temp: 27, rainProb: 50, rainfallMm: 2.1, humidity: 78 },
      { time: "02:00 PM", temp: 28.4, rainProb: 76, rainfallMm: 8.2, humidity: 80 },
      { time: "05:00 PM", temp: 26.5, rainProb: 70, rainfallMm: 5.5, humidity: 85 },
      { time: "08:00 PM", temp: 24.5, rainProb: 40, rainfallMm: 1.0, humidity: 89 },
      { time: "11:00 PM", temp: 23.5, rainProb: 20, rainfallMm: 0.0, humidity: 92 }
    ],
    risks: [
      {
        id: "risk-waterlogging",
        name: "Waterlogging",
        hindiName: "जलभराव",
        severity: "Moderate",
        icon: "droplets",
        description: "Riparian proximity to Jumar river tributary causes temporary bank seepage in adjoining lowland tracts.",
        hindiDescription: "जुमार नदी के निकट होने से निचले खेतों में जल स्तर बढ़ सकता है।",
        affectedArea: "Lowlands near Jumar river bank"
      },
      {
        id: "risk-heavy-rain",
        name: "Heavy Rain",
        hindiName: "भारी वर्षा",
        severity: "Moderate",
        icon: "cloud-rain",
        description: "14–20 mm anticipated rainfall.",
        hindiDescription: "14–20 मिमी वर्षा की संभावना।",
        affectedArea: "Entire Panchayat"
      },
      {
        id: "risk-heat-stress",
        name: "Heat Stress",
        hindiName: "तापमान तनाव",
        severity: "Low",
        icon: "thermometer-sun",
        description: "Normal ambient temperatures.",
        hindiDescription: "सामान्य तापमान।",
        affectedArea: "None"
      }
    ],
    guidance: [
      {
        category: "irrigation",
        title: "Irrigation",
        hindiTitle: "सिंचाई",
        icon: "sprout",
        status: "delay",
        recommendation: "Rainfall expected today. Turn off canal pumps and surface siphons.",
        hindiRecommendation: "आज वर्षा की संभावना है। नहर पंप और सिंचाई बंद रखें।",
        urgency: "medium"
      },
      {
        category: "fieldWork",
        title: "Field Work",
        hindiTitle: "खेत कार्य",
        icon: "wheat",
        status: "caution",
        recommendation: "Reinforce field bunds near river discharge channels.",
        hindiRecommendation: "नदी के किनारे वाले खेतों के मेड़ मजबूत कर लें।",
        urgency: "medium"
      },
      {
        category: "harvesting",
        title: "Harvesting",
        hindiTitle: "फसल कटाई",
        icon: "shopping-bag",
        status: "delay",
        recommendation: "Postpone paddy grain drying; maintain cover.",
        hindiRecommendation: "धान सुखाने का काम टालें; अनाज सुरक्षित ढक कर रखें।",
        urgency: "high"
      },
      {
        category: "spraying",
        title: "Spraying",
        hindiTitle: "दवा छिड़काव",
        icon: "spray-can",
        status: "delay",
        recommendation: "Do not apply systemic fungicides prior to rain spell.",
        hindiRecommendation: "वर्षा से पूर्व फफूंदनाशक या कीटनाशक न डालें।",
        urgency: "high"
      }
    ],
    whyPredict: {
      factors: [
        {
          title: "Riparian River Corridor",
          hindiTitle: "नदी गलियारा प्रभाव",
          desc: "Proximity to river channel generates localized humidity plume (+6% relative humidity), feeding afternoon cumulus clouds.",
          hindiDesc: "नदी के कारण हवा में नमी अधिक रहती है, जिससे दोपहर में घने बादल बनते हैं।"
        },
        {
          title: "Alluvial Soil Permeability",
          hindiTitle: "जलोढ़ मिट्टी पारगम्यता",
          desc: "Riverbed sand-silt strata allows medium absorption, preventing prolonged pooling outside immediate banks.",
          hindiDesc: "बलुई दोमट मिट्टी पानी को सामान्य रूप से सोख लेती है।"
        }
      ],
      localPatternNote: "Borea regularly catches localized convective cells forming along the Subarnarekha-Jumar watershed.",
      hindiLocalPatternNote: "बोड़ेया में जुमार नदी जलक्षेत्र के कारण स्थानीय बारिश के बादल बनते हैं।"
    },
    confidence: {
      level: "High",
      hindiLevel: "उच्च विश्वसनीयता",
      explanation: "Calibrated using automatic gauge at Borea bridge and high-resolution Sentinel-1 SAR moisture maps.",
      hindiExplanation: "बोड़ेया पुल के स्वचालित रेनगेज और उपग्रह से सत्यापित।",
      satellitePass: "INSAT-3DR 07:15 AM IST",
      stationDistanceKm: 2.4
    },
    fingerprint: {
      rainfallPattern: "Afternoon convective showers",
      hindiRainfallPattern: "दोपहर बाद स्थानीय बौछारें",
      terrain: "Riparian river basin (622 m)",
      hindiTerrain: "नदी तटीय समतल (622 मी)",
      elevationM: 622,
      vegetation: "Commercial vegetable and floriculture",
      hindiVegetation: "व्यावसायिक सब्जी एवं गेंदा फूल की खेती",
      seasonality: "Monsoon river overflow vulnerable",
      hindiSeasonality: "नदी उफान संवेदनशील",
      historicalBias: "+4.1 mm above block forecast",
      whyItMatters: "GRAMCAST adjusts for the river moisture feedback, anticipating 17 mm rain instead of the coarse 8.5 mm regional average.",
      hindiWhyItMatters: "ग्रामकास्ट नदी की नमी को जोड़कर ब्लॉक के 8.5 मिमी की तुलना में 17 मिमी का सटीक अनुमान लगाता है।"
    },
    blockForecastComparison: {
      blockRainfallMm: 8.5,
      panchayatRainfallMm: 17.0,
      blockTempC: 29.2,
      panchayatTempC: 28.4,
      varianceReason: "River microclimate generates higher surface latent heat flux, driving +8.5 mm excess rain over block average.",
      hindiVarianceReason: "नदी किनारे नमी अधिक होने से वर्षा ब्लॉक औसत से दुगुनी हो सकती है।"
    }
  }
};

// Fallback/Deterministic generator for any other Panchayat across India
export function getPanchayatWeatherData(panchayatName: string, blockName: string, districtName: string, stateName: string): PanchayatData {
  if (PANCHAYAT_WEATHER_STORE[panchayatName]) {
    return PANCHAYAT_WEATHER_STORE[panchayatName];
  }

  // Deterministic pseudo-random seed based on name string
  let hash = 0;
  for (let i = 0; i < panchayatName.length; i++) {
    hash = (hash << 5) - hash + panchayatName.charCodeAt(i);
    hash |= 0;
  }
  const absHash = Math.abs(hash);
  const tempOffset = (absHash % 7) - 3; // -3 to +3
  const rainOffset = (absHash % 15) - 5; // -5 to +9 mm
  const baseRain = Math.max(2, 14 + rainOffset);
  const rainProb = Math.min(92, Math.max(20, 50 + (absHash % 40)));
  const elevation = 450 + (absHash % 350);

  const riskLevel: 'Low' | 'Moderate' | 'High' = baseRain > 22 ? 'High' : baseRain > 12 ? 'Moderate' : 'Low';

  return {
    id: `panchayat-${panchayatName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
    name: panchayatName,
    hindiName: panchayatName,
    block: blockName,
    district: districtName,
    state: stateName,
    lat: 23.4 + ((absHash % 100) / 500),
    lng: 85.3 + (((absHash >> 2) % 100) / 500),
    elevation: elevation,
    updatedTime: "Today, 08:00 AM",
    hindiUpdatedTime: "आज, सुबह 08:00 बजे",
    current: {
      temp: 28 + tempOffset,
      rainfallExpected: `${Math.max(0, baseRain - 3)}–${baseRain + 4} mm`,
      rainfallExpectedMm: baseRain,
      rainProb: rainProb,
      humidity: 70 + (absHash % 18),
      windSpeedKmH: 10 + (absHash % 12),
      windDirection: "ESE",
      pressureHpa: 1008,
      status: baseRain > 10 ? "Rain likely today" : "Scattered clouds with dry spells",
      hindiStatus: baseRain > 10 ? "आज वर्षा की संभावना" : "आंशिक बादल व सामान्य मौसम"
    },
    forecast7Day: [
      {
        day: "Today",
        hindiDay: "आज",
        date: "28 Sep",
        tempMin: 21,
        tempMax: 28 + tempOffset,
        rainProb: rainProb,
        rainfallMm: `${Math.max(0, baseRain - 3)}–${baseRain + 4} mm`,
        rainfallVal: baseRain,
        condition: baseRain > 12 ? "Rain Likely" : "Scattered Clouds",
        hindiCondition: baseRain > 12 ? "वर्षा की संभावना" : "आंशिक बादल",
        icon: baseRain > 20 ? "heavy-rain" : baseRain > 8 ? "cloud-rain" : "cloud",
        riskLevel: riskLevel,
        riskText: riskLevel === 'High' ? "Heavy rain alert" : riskLevel === 'Moderate' ? "Moderate rainfall alert" : "Normal conditions",
        hindiRiskText: riskLevel === 'High' ? "भारी वर्षा चेतावनी" : riskLevel === 'Moderate' ? "मध्यम वर्षा चेतावनी" : "सामान्य स्थिति"
      },
      {
        day: "Tomorrow",
        hindiDay: "कल",
        date: "29 Sep",
        tempMin: 22,
        tempMax: 30 + tempOffset,
        rainProb: Math.round(rainProb * 0.6),
        rainfallMm: "3–6 mm",
        rainfallVal: 4.5,
        condition: "Passing Showers",
        hindiCondition: "छिटपुट बौछारें",
        icon: "cloud",
        riskLevel: "Low",
        riskText: "Low weather risk",
        hindiRiskText: "कम जोखिम"
      },
      {
        day: "Wed",
        hindiDay: "बुध",
        date: "30 Sep",
        tempMin: 21,
        tempMax: 29 + tempOffset,
        rainProb: 25,
        rainfallMm: "0–2 mm",
        rainfallVal: 1,
        condition: "Partly Cloudy",
        hindiCondition: "धूप व बादल",
        icon: "sun",
        riskLevel: "Low",
        riskText: "Field work safe",
        hindiRiskText: "खेत कार्य अनुकूल"
      },
      {
        day: "Thu",
        hindiDay: "गुरु",
        date: "01 Oct",
        tempMin: 21,
        tempMax: 27 + tempOffset,
        rainProb: 75,
        rainfallMm: "22–32 mm",
        rainfallVal: 27,
        condition: "Heavy Rain Spell",
        hindiCondition: "भारी बारिश का दौर",
        icon: "heavy-rain",
        riskLevel: "High",
        riskText: "Waterlogging risk",
        hindiRiskText: "जलभराव खतरा"
      },
      {
        day: "Fri",
        hindiDay: "शुक्र",
        date: "02 Oct",
        tempMin: 20,
        tempMax: 27 + tempOffset,
        rainProb: 55,
        rainfallMm: "8–14 mm",
        rainfallVal: 11,
        condition: "Intermittent Rain",
        hindiCondition: "रुक-रुक कर बारिश",
        icon: "cloud-rain",
        riskLevel: "Moderate",
        riskText: "Wet conditions",
        hindiRiskText: "नमी बनी रहेगी"
      },
      {
        day: "Sat",
        hindiDay: "शनि",
        date: "03 Oct",
        tempMin: 21,
        tempMax: 29 + tempOffset,
        rainProb: 30,
        rainfallMm: "1–3 mm",
        rainfallVal: 2,
        condition: "Clear Breaks",
        hindiCondition: "साफ मौसम",
        icon: "cloud",
        riskLevel: "Low",
        riskText: "Safe",
        hindiRiskText: "सुरक्षित"
      },
      {
        day: "Sun",
        hindiDay: "रवि",
        date: "04 Oct",
        tempMin: 21,
        tempMax: 31 + tempOffset,
        rainProb: 15,
        rainfallMm: "0 mm",
        rainfallVal: 0,
        condition: "Sunny",
        hindiCondition: "धूप",
        icon: "sun",
        riskLevel: "Low",
        riskText: "Harvest safe",
        hindiRiskText: "कटाई अनुकूल"
      }
    ],
    hourly: [
      { time: "08:00 AM", temp: 24, rainProb: 30, rainfallMm: 0.2, humidity: 80 },
      { time: "11:00 AM", temp: 27, rainProb: 45, rainfallMm: 1.5, humidity: 75 },
      { time: "02:00 PM", temp: 28, rainProb: rainProb, rainfallMm: 5.5, humidity: 78 },
      { time: "05:00 PM", temp: 26, rainProb: rainProb - 5, rainfallMm: 4.2, humidity: 82 },
      { time: "08:00 PM", temp: 24, rainProb: 40, rainfallMm: 1.1, humidity: 86 },
      { time: "11:00 PM", temp: 23, rainProb: 20, rainfallMm: 0.2, humidity: 89 }
    ],
    risks: [
      {
        id: "risk-heavy-rain",
        name: "Heavy Rain",
        hindiName: "भारी वर्षा",
        severity: riskLevel,
        icon: "cloud-rain",
        description: `Expected rainfall is ${baseRain} mm. Adjust field operations according to local drainage.`,
        hindiDescription: `अनुमानित वर्षा ${baseRain} मिमी है। जल निकासी के अनुसार खेत का काम करें।`,
        affectedArea: "Agricultural plots"
      },
      {
        id: "risk-waterlogging",
        name: "Waterlogging",
        hindiName: "जलभराव",
        severity: riskLevel === 'High' ? 'Moderate' : 'Low',
        icon: "droplets",
        description: "Low-lying patches may retain water temporarily.",
        hindiDescription: "निचले भागों में कुछ समय पानी जमा हो सकता है।",
        affectedArea: "Lowland fields"
      },
      {
        id: "risk-heat-stress",
        name: "Heat Stress",
        hindiName: "तापमान तनाव",
        severity: "Low",
        icon: "thermometer-sun",
        description: "Comfortable ambient temperature.",
        hindiDescription: "मौसम सामान्य रहेगा।",
        affectedArea: "None"
      }
    ],
    guidance: [
      {
        category: "irrigation",
        title: "Irrigation",
        hindiTitle: "सिंचाई",
        icon: "sprout",
        status: baseRain > 8 ? "delay" : "proceed",
        recommendation: baseRain > 8 ? "Rain is expected today. Irrigation may not be necessary." : "Light moisture needed; irrigate selectively.",
        hindiRecommendation: baseRain > 8 ? "आज वर्षा की संभावना है। सिंचाई की आवश्यकता नहीं है।" : "हल्की सिंचाई की आवश्यकता है।",
        urgency: "medium"
      },
      {
        category: "fieldWork",
        title: "Field Work",
        hindiTitle: "खेत कार्य",
        icon: "wheat",
        status: "caution",
        recommendation: "Plan field operations before afternoon showers.",
        hindiRecommendation: "दोपहर की बारिश से पहले आवश्यक खेत कार्य निपटा लें।",
        urgency: "medium"
      },
      {
        category: "harvesting",
        title: "Harvesting",
        hindiTitle: "फसल कटाई",
        icon: "shopping-bag",
        status: baseRain > 12 ? "delay" : "caution",
        recommendation: "Keep harvested produce protected under tarpaulins.",
        hindiRecommendation: "कटी फसल को तिरपाल से सुरक्षित रखें।",
        urgency: "high"
      },
      {
        category: "spraying",
        title: "Spraying",
        hindiTitle: "दवा छिड़काव",
        icon: "spray-can",
        status: "delay",
        recommendation: "Avoid chemical spraying prior to anticipated precipitation.",
        hindiRecommendation: "संभावित बारिश से पहले दवा का छिड़काव न करें।",
        urgency: "high"
      }
    ],
    whyPredict: {
      factors: [
        {
          title: "Block Forecast Downscaling",
          hindiTitle: "ब्लॉक पूर्वानुमान डाउनस्केलिंग",
          desc: `Coarse block forecast calibrated with ${panchayatName}'s local topography and terrain slope.`,
          hindiDesc: `ब्लॉक के पूर्वानुमान को ${panchayatName} की स्थलाकृति और ढलान के आधार पर समायोजित किया गया।`
        },
        {
          title: "Satellite Observations",
          hindiTitle: "उपग्रह प्रेक्षण",
          desc: "Multi-spectral INSAT-3DR thermal channels indicate localized cloud development.",
          hindiDesc: "इन्फ्रारेड उपग्रह चित्रों में स्थानीय बादलों का विस्तार दर्ज हुआ है।"
        }
      ],
      localPatternNote: "Your Panchayat exhibits distinct microclimate variations compared to neighboring blocks.",
      hindiLocalPatternNote: "आपके पंचायत की स्थानीय जलवायु पास के क्षेत्रों से भिन्न व्यवहार करती है।"
    },
    confidence: {
      level: "Moderate",
      hindiLevel: "मध्यम विश्वसनीयता",
      explanation: "Calibrated using nearest district meteorological station and satellite radar passes.",
      hindiExplanation: "निकटतम मौसम केंद्र और उपग्रह से सत्यापित।",
      satellitePass: "INSAT-3DR 07:15 AM IST",
      stationDistanceKm: 8.5
    },
    fingerprint: {
      rainfallPattern: "Moderate local variation",
      hindiRainfallPattern: "मध्यम स्थानीय बदलाव",
      terrain: `Plateau terrain (${elevation} m)`,
      hindiTerrain: `पठारी क्षेत्र (${elevation} मी)`,
      elevationM: elevation,
      vegetation: "Mixed agriculture and horticulture",
      hindiVegetation: "मिश्रित कृषि एवं बागवानी",
      seasonality: "Monsoon active",
      hindiSeasonality: "मानसून सक्रिय",
      historicalBias: "+1.8 mm over block model",
      whyItMatters: "GRAMCAST accounts for localized slope and soil texture to deliver field-level accuracy.",
      hindiWhyItMatters: "ग्रामकास्ट स्थानीय ढलान और मिट्टी की प्रकृति को ध्यान में रखकर सटीक जानकारी देता है।"
    },
    blockForecastComparison: {
      blockRainfallMm: 9.0,
      panchayatRainfallMm: baseRain,
      blockTempC: 29.0,
      panchayatTempC: 28.0 + tempOffset,
      varianceReason: `Elevation (${elevation} m) and moisture convergence produce a ${Math.abs(baseRain - 9.0).toFixed(1)} mm deviation from generalized block forecast.`,
      hindiVarianceReason: `स्थानीय ऊंचाई (${elevation} मी) के कारण ब्लॉक औसत से अंतर दिखाई दे रहा है।`
    }
  };
}
