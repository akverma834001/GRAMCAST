import { BlockSourceForecast, DownscalingProcessingStep, PanchayatDownscaledResult, DataSourceTransparency } from '../types';

export const BLOCK_SOURCE_FORECASTS: Record<string, BlockSourceForecast> = {
  "Bodh Gaya": {
    blockName: "Bodh Gaya",
    district: "Gaya",
    state: "Bihar",
    spatialResolution: "Block Level (10–12 km NWP)",
    modelName: "NWP Regional Model (NCUM / IMD GFS Ensemble)",
    bulletinTime: "Issued Today 06:00 AM IST",
    tempC: 31.4,
    rainfallMm: 45.0,
    humidity: 78,
    windSpeedKmH: 14,
    rainProb: 72,
    pressureHpa: 1005
  },
  "Kanke": {
    blockName: "Kanke",
    district: "Ranchi",
    state: "Jharkhand",
    spatialResolution: "Block Level (10–12 km NWP)",
    modelName: "IMD Multi-Model Ensemble (12km Coarse Grid)",
    bulletinTime: "Issued Today 06:00 AM IST",
    tempC: 29.2,
    rainfallMm: 8.5,
    humidity: 74,
    windSpeedKmH: 12,
    rainProb: 65,
    pressureHpa: 1008
  }
};

export const DOWNSCALED_PANCHAYAT_RESULTS: Record<string, PanchayatDownscaledResult[]> = {
  "Bodh Gaya": [
    {
      id: "panchayat-bakrour",
      name: "Bakrour",
      hindiName: "बकरौर",
      elevationM: 114,
      rainfallMm: 54.0,
      rainfallUncertaintyMm: 6.0,
      tempC: 30.2,
      humidity: 84,
      windSpeedKmH: 11,
      confidencePct: 91,
      deltaRainMm: +9.0,
      deltaTempC: -1.2,
      riskLevel: "High",
      imageUrl: "/images/panchayat_borea.jpg",
      spatialFactors: [
        {
          name: "Proximity to Falgu River Basin",
          hindiName: "फल्गु नदी बेसिन सामीप्य",
          impact: "Model considers riparian moisture convergence (+12% relative humidity enhancement)",
          hindiImpact: "नदी तटवर्ती नमी के संघनन से वर्षा में स्थानीय वृद्धि",
          icon: "droplet"
        },
        {
          name: "Higher Vegetation Canopy (NDVI 0.61)",
          hindiName: "सघन वनस्पति आवरण (NDVI 0.61)",
          impact: "Model considers lower Bowen ratio and reduced surface thermal turbulence",
          hindiImpact: "सघन पेड़-पौधे सतह को ठंडा रख बादलों को केंद्रित करते हैं",
          icon: "trees"
        },
        {
          name: "Alluvial Lowland Depression",
          hindiName: "जलोढ़ निचला क्षेत्र",
          impact: "Model considers cold air pooling and moisture trapping in river bend",
          hindiImpact: "निचले भागों में जल ठहराव की संभावना",
          icon: "mountain"
        }
      ],
      advisorySummary: "High rainfall spell (54 mm). Delay irrigation immediately. Inspect paddy field drainage bunds to avoid root asphyxiation.",
      hindiAdvisorySummary: "भारी वर्षा (54 मिमी) की संभावना। सिंचाई तुरंत रोकें। धान के खेतों में जलनिकासी की व्यवस्था सुनिश्चित करें।"
    },
    {
      id: "panchayat-mocharim",
      name: "Mocharim",
      hindiName: "मोचरिम",
      elevationM: 111,
      rainfallMm: 48.0,
      rainfallUncertaintyMm: 5.0,
      tempC: 30.8,
      humidity: 79,
      windSpeedKmH: 13,
      confidencePct: 88,
      deltaRainMm: +3.0,
      deltaTempC: -0.6,
      riskLevel: "Moderate",
      imageUrl: "/images/panchayat_sukurhutu.jpg",
      spatialFactors: [
        {
          name: "Alluvial Clay Depressions",
          hindiName: "चिकनी मिट्टी के गड्ढे",
          impact: "Model considers slow soil percolation rate (0.4 cm/hr)",
          hindiImpact: "धीमी रिसाव दर के कारण सतह पर जलभराव जोखिम",
          icon: "layers"
        },
        {
          name: "Moderate Vegetation Index (NDVI 0.48)",
          hindiName: "मध्यम वनस्पति सूचकांक",
          impact: "Model considers active paddy transpiration flux",
          hindiImpact: "खेतों से वाष्पोत्सर्जन नमी को बनाए रखता है",
          icon: "trees"
        }
      ],
      advisorySummary: "Moderate rain spell (48 mm). Do not apply nitrogenous top-dressing or sprays today. Favourable for wetland puddle transplanting.",
      hindiAdvisorySummary: "मध्यम वर्षा (48 मिमी)। आज यूरिया या कीटनाशक न छिड़कें। धान रोपाई के लिए अनुकूल।"
    },
    {
      id: "panchayat-bodh-gaya-rural",
      name: "Bodh Gaya Rural",
      hindiName: "बोधगया ग्रामीण",
      elevationM: 118,
      rainfallMm: 41.0,
      rainfallUncertaintyMm: 7.0,
      tempC: 31.5,
      humidity: 75,
      windSpeedKmH: 15,
      confidencePct: 86,
      deltaRainMm: -4.0,
      deltaTempC: +0.1,
      riskLevel: "Moderate",
      imageUrl: "/images/panchayat_kanke_hq.jpg",
      spatialFactors: [
        {
          name: "Peri-urban & Field Mosaic",
          hindiName: "मिश्रित ग्रामीण भू-उपयोग",
          impact: "Model considers higher sensible heat flux over partially built terrain",
          hindiImpact: "हल्की गर्मी के कारण बादलों की गति तेज रहती है",
          icon: "building"
        },
        {
          name: "Gentle Undulating Plain",
          hindiName: "समतल पठारी ढलान",
          impact: "Model considers moderate surface drainage velocity",
          hindiImpact: "पानी का तेज बहाव, कम रुकावट",
          icon: "compass"
        }
      ],
      advisorySummary: "Rainfall expected (41 mm). Suitable for vegetable beds with raised ridges. Keep harvest produce covered in tarpaulins.",
      hindiAdvisorySummary: "वर्षा संभावित (41 मिमी)। कटी फसलों को सुरक्षित रखें। मेड़ों पर उगाई सब्जियों के लिए उपयुक्त।"
    },
    {
      id: "panchayat-itawan",
      name: "Itawan",
      hindiName: "इटवां",
      elevationM: 125,
      rainfallMm: 36.0,
      rainfallUncertaintyMm: 8.0,
      tempC: 32.1,
      humidity: 71,
      windSpeedKmH: 16,
      confidencePct: 84,
      deltaRainMm: -9.0,
      deltaTempC: +0.7,
      riskLevel: "Low",
      imageUrl: "/images/panchayat_nagri.jpg",
      spatialFactors: [
        {
          name: "Open Upland Topography",
          hindiName: "खुला ऊपरी मैदानी क्षेत्र",
          impact: "Model considers distance from river moisture source and higher wind dispersion",
          hindiImpact: "नदी से दूरी और तेज हवाओं से वर्षा की मात्रा 9 मिमी कम",
          icon: "wind"
        },
        {
          name: "Sandy Loam Soil Texture",
          hindiName: "बलुई दोमट मिट्टी",
          impact: "Model considers high infiltration rate (2.2 cm/hr), zero water stagnation risk",
          hindiImpact: "पानी जल्दी सोखने वाली मिट्टी, शून्य जलभराव",
          icon: "layers"
        }
      ],
      advisorySummary: "Lighter showers (36 mm). Safe for pulse crops and maize weeding before evening. Monitor soil moisture before next irrigation round.",
      hindiAdvisorySummary: "हल्की वर्षा (36 मिमी)। दलहन व मक्का के खेत कार्य के लिए सुरक्षित। शाम से पहले निराई पूरी करें।"
    }
  ],
  "Kanke": [
    {
      id: "panchayat-sukurhutu",
      name: "Sukurhutu",
      hindiName: "सुकुरहुटू",
      elevationM: 614,
      rainfallMm: 21.0,
      rainfallUncertaintyMm: 4.0,
      tempC: 27.5,
      humidity: 84,
      windSpeedKmH: 12,
      confidencePct: 89,
      deltaRainMm: +12.5,
      deltaTempC: -1.7,
      riskLevel: "High",
      imageUrl: "/images/panchayat_sukurhutu.jpg",
      spatialFactors: [
        {
          name: "Low-Lying Valley Basin (614m)",
          hindiName: "निचला घाटी बेसिन (614 मी)",
          impact: "Model considers convective cloud stalling and moisture retention in valley sink",
          hindiImpact: "घाटी में नमी रुकने से वर्षा में +12.5 मिमी की बढ़ोतरी",
          icon: "mountain"
        },
        {
          name: "Heavy Clay-Loam Saturated Soil",
          hindiName: "भारी चिकनी दोमट मिट्टी",
          impact: "Model considers near-zero hydraulic conductivity under saturated conditions",
          hindiImpact: "जलभराव की अत्यंत संवेदनशील स्थिति",
          icon: "droplet"
        }
      ],
      advisorySummary: "High rainfall in valley (21 mm). Waterlogging in lowland plots. Delay spraying and keep paddy field drainage cuts clear.",
      hindiAdvisorySummary: "घाटी में अधिक वर्षा (21 मिमी)। निचले खेतों में जलभराव का खतरा। दवा छिड़काव स्थगित रखें।"
    },
    {
      id: "panchayat-borea",
      name: "Borea",
      hindiName: "बोड़ेया",
      elevationM: 622,
      rainfallMm: 17.0,
      rainfallUncertaintyMm: 3.0,
      tempC: 28.4,
      humidity: 80,
      windSpeedKmH: 11,
      confidencePct: 92,
      deltaRainMm: +8.5,
      deltaTempC: -0.8,
      riskLevel: "Moderate",
      imageUrl: "/images/panchayat_borea.jpg",
      spatialFactors: [
        {
          name: "Riparian Jumar River Corridor",
          hindiName: "जुमार नदी तटीय गलियारा",
          impact: "Model considers localized river boundary layer vapor plume (+6% RH)",
          hindiImpact: "नदी की आर्द्रता से दोपहर में संवहनीय बादल बनते हैं",
          icon: "droplet"
        }
      ],
      advisorySummary: "Moderate showers (17 mm). Postpone chemical spray on commercial marigold and vegetables. Harvested produce should remain under shed.",
      hindiAdvisorySummary: "मध्यम वर्षा (17 मिमी)। गेंदा फूल व सब्जियों पर छिड़काव न करें। कटी फसल को शेड में रखें।"
    },
    {
      id: "panchayat-kanke-hq",
      name: "Kanke (HQ)",
      hindiName: "कांके (मुख्यालय)",
      elevationM: 628,
      rainfallMm: 15.0,
      rainfallUncertaintyMm: 3.5,
      tempC: 28.0,
      humidity: 78,
      windSpeedKmH: 14,
      confidencePct: 90,
      deltaRainMm: +6.5,
      deltaTempC: -1.2,
      riskLevel: "Moderate",
      imageUrl: "/images/panchayat_kanke_hq.jpg",
      spatialFactors: [
        {
          name: "Reservoir Catchment Basin",
          hindiName: "कांके जलाशय जलग्रहण बेसिन",
          impact: "Model considers local evaporation feedback from Kanke lake water spread",
          hindiImpact: "जलाशय से वाष्पीकरण स्थानीय वर्षा को बढ़ाता है",
          icon: "droplet"
        }
      ],
      advisorySummary: "Rain likely (12–18 mm). No supplemental irrigation needed today. Clear minor bund drainage channels.",
      hindiAdvisorySummary: "वर्षा की संभावना (12–18 मिमी)। आज अतिरिक्त सिंचाई की जरूरत नहीं। मेड़ों की नालियां साफ रखें।"
    },
    {
      id: "panchayat-nagri-rural",
      name: "Nagri Rural",
      hindiName: "नगड़ी ग्रामीण",
      elevationM: 648,
      rainfallMm: 12.0,
      rainfallUncertaintyMm: 4.0,
      tempC: 27.8,
      humidity: 76,
      windSpeedKmH: 15,
      confidencePct: 88,
      deltaRainMm: +3.5,
      deltaTempC: -1.4,
      riskLevel: "Moderate",
      imageUrl: "/images/panchayat_nagri.jpg",
      spatialFactors: [
        {
          name: "Open Upland Red Loam Ridge",
          hindiName: "खुला ऊपरी पठार व लाल मिट्टी",
          impact: "Model considers wind funneling (bursts up to 28 km/h) and rapid percolation",
          hindiImpact: "तेज हवाएं और तेज पानी सोखने वाली लाल मिट्टी",
          icon: "wind"
        }
      ],
      advisorySummary: "Moderate showers (10–15 mm). Hold irrigation for upland maize. Strengthen earthen bunds to prevent topsoil displacement.",
      hindiAdvisorySummary: "मध्यम वर्षा (10–15 मिमी)। मक्का में सिंचाई रोकें। मिट्टी का कटाव रोकने के लिए मेड़ मजबूत करें।"
    },
    {
      id: "panchayat-pithoria",
      name: "Pithoria",
      hindiName: "पिठोरिया",
      elevationM: 672,
      rainfallMm: 10.0,
      rainfallUncertaintyMm: 2.5,
      tempC: 26.2,
      humidity: 74,
      windSpeedKmH: 18,
      confidencePct: 94,
      deltaRainMm: +1.5,
      deltaTempC: -3.0,
      riskLevel: "Low",
      imageUrl: "/images/panchayat_pithoria.jpg",
      spatialFactors: [
        {
          name: "Elevated Ridge Topography (672m ASL)",
          hindiName: "पठारी कटक ऊंचाई (672 मी)",
          impact: "Model considers environmental lapse rate (-0.65°C / 100m) and fast wind clearing",
          hindiImpact: "ऊंचाई के कारण 3°C ठंडा मौसम व शून्य जलभराव",
          icon: "mountain"
        }
      ],
      advisorySummary: "Light to moderate breezy showers (10 mm). Excellent natural hillside drainage. Safe for tomato and cauliflower intercultural operations.",
      hindiAdvisorySummary: "हल्की हवादार वर्षा (10 मिमी)। प्राकृतिक ढलान से पानी नहीं जमेगा। सब्जी फसलों में निराई-गुड़ाई सुरक्षित।"
    }
  ]
};

export const DOWNSCALING_PIPELINE_STEPS: DownscalingProcessingStep[] = [
  {
    id: "step-1",
    title: "Ingesting Block-Level Forecast",
    hindiTitle: "प्रखंड स्तरीय पूर्वानुमान का अंतर्ग्रहण",
    detail: "Reading coarse 10–12 km NWP grid cell (IMD GFS / NCUM regional bulletin)",
    hindiDetail: "10-12 किमी मोटे ग्रिड का संख्यात्मक मौसम पूर्वानुमान लोड किया जा रहा है",
    state: "pending"
  },
  {
    id: "step-2",
    title: "Extracting Micro-Spatial & Environmental Features",
    hindiTitle: "सूक्ष्म-स्थलाकृतिक व पर्यावरणीय विशेषताओं का निष्कर्षण",
    detail: "Sampling SRTM 30m Digital Elevation Model, Sentinel-2 NDVI canopy & hydrographic vectors",
    hindiDetail: "30 मीटर डिजिटल एलिवेशन मॉडल, उपग्रह वनस्पति सूचकांक व जल स्रोतों का विश्लेषण",
    state: "pending"
  },
  {
    id: "step-3",
    title: "Applying Physics-Guided Atmospheric Constraints",
    hindiTitle: "भौतिकी-आधारित वायुमंडलीय नियमों का अनुप्रयोग",
    detail: "Computing orographic uplift precipitation mass balance, thermal lapse rate and moisture convergence flux",
    hindiDetail: "पर्वतीय उत्थान, तापमान लैप्स दर एवं द्रव्यमान संरक्षण नियमों का अनुप्रयोग",
    state: "pending"
  },
  {
    id: "step-4",
    title: "Generating Panchayat-Level Spatial Downscaling",
    hindiTitle: "ग्राम पंचायत स्तर पर उच्च-रिजॉल्यूशन डाउनस्केलिंग",
    detail: "Reconstructing field-scale 1 km spatial resolution predictions across distinct Panchayat polygons",
    hindiDetail: "प्रत्येक ग्राम पंचायत सीमा के लिए 1 किमी रिजॉल्यूशन पर मौसम अनुमान तैयार",
    state: "pending"
  },
  {
    id: "step-5",
    title: "Quantifying Prediction Uncertainty Bounds",
    hindiTitle: "पूर्वानुमान अनिश्चितता व विश्वसनीयता का निर्धारण",
    detail: "Deriving ±mm confidence interval through historical station calibration and local spatial variance",
    hindiDetail: "ऐतिहासिक स्टेशन डेटा से ± मिमी अनिश्चितता व प्रतिशत विश्वसनीयता की गणना",
    state: "pending"
  },
  {
    id: "step-6",
    title: "Synthesizing Agro-Meteorological Advisories",
    hindiTitle: "कृषि-मौसम सलाह का स्वचालित निर्माण",
    detail: "Translating downscaled weather risks into actionable crop-specific field guidelines",
    hindiDetail: "स्थानीय मौसम जोखिमों को फसल अनुसार व्यावहारिक कृषि सलाह में परिवर्तित किया गया",
    state: "pending"
  }
];

export const DATA_SOURCES_TRANSPARENCY: DataSourceTransparency[] = [
  {
    category: "Meteorological Forecast",
    name: "Coarse Block NWP Model",
    provider: "IMD / NCMRWF (GFS & NCUM Global Ensemble)",
    nominalResolution: "10–12 km Grid",
    status: "Demonstration Benchmark",
    description: "Operational numerical weather prediction baseline representing generalized regional atmospheric flow."
  },
  {
    category: "Elevation & Topography",
    name: "SRTM Digital Elevation Model",
    provider: "NASA / ISRO Bhuvan",
    nominalResolution: "30m Spatial Grid",
    status: "Historical",
    description: "High-precision digital elevation, terrain slope gradient, valley depression basins, and aspect angles."
  },
  {
    category: "Vegetation & Soil Moisture",
    name: "Multispectral NDVI & Soil Indices",
    provider: "ESA Sentinel-2 & Sentinel-1 SAR",
    nominalResolution: "10m Multispectral",
    status: "Historical",
    description: "Crop canopy density, Normalized Difference Vegetation Index (NDVI), and surface roughness."
  },
  {
    category: "Space Telemetry",
    name: "Thermal Infrared Radiance (TIR)",
    provider: "INSAT-3DR Geostationary Imager",
    nominalResolution: "4 km Synoptic",
    status: "Historical",
    description: "Convective cloud top brightness temperature and localized cloud cluster detection."
  },
  {
    category: "Ground Validation",
    name: "Automated Weather Station (AWS)",
    provider: "IMD District Agromet Units (DAMUs) & KVK Network",
    nominalResolution: "Point Gauge Telemetry",
    status: "Demonstration Benchmark",
    description: "15-minute telemetry tipping-bucket rain gauge (0.2mm), anemometers, and thermohygrometers."
  },
  {
    category: "Panchayat Spatial Boundaries",
    name: "Gram Panchayat Cadastral Geometries",
    provider: "Panchayati Raj GIS / Survey of India",
    nominalResolution: "Vector Polygons",
    status: "Historical",
    description: "Official administrative village and Gram Panchayat administrative polygons."
  }
];
