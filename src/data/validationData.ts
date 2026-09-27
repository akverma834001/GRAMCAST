import { ValidationMetric, ValidationTimeSeriesPoint } from '../types';

export const VALIDATION_METRICS_SUMMARY: Record<string, ValidationMetric> = {
  rainfall: {
    parameter: 'rainfall',
    originalBlockMAE: 8.4, // mm
    gramcastMAE: 3.1,      // mm (63% reduction in error)
    originalBlockRMSE: 11.2,
    gramcastRMSE: 4.8,
    biasReductionPct: 62.8,
    correlationCoeff: 0.89,
    observationsCompared: 240
  },
  temperature: {
    parameter: 'temperature',
    originalBlockMAE: 2.8, // °C
    gramcastMAE: 1.1,      // °C
    originalBlockRMSE: 3.6,
    gramcastRMSE: 1.5,
    biasReductionPct: 58.4,
    correlationCoeff: 0.94,
    observationsCompared: 240
  },
  humidity: {
    parameter: 'humidity',
    originalBlockMAE: 12.5, // %
    gramcastMAE: 5.2,       // %
    originalBlockRMSE: 16.1,
    gramcastRMSE: 7.0,
    biasReductionPct: 56.5,
    correlationCoeff: 0.91,
    observationsCompared: 240
  }
};

// 14-day historical validation time series comparing Coarse Block vs GRAMCAST Downscaled vs Ground Observed
export const RAINFALL_VALIDATION_SERIES: ValidationTimeSeriesPoint[] = [
  { date: "14 Sep", observed: 14.2, blockForecast: 8.0, gramcastDownscaled: 13.5 },
  { date: "15 Sep", observed: 22.0, blockForecast: 10.5, gramcastDownscaled: 20.8 },
  { date: "16 Sep", observed: 5.4, blockForecast: 9.0, gramcastDownscaled: 6.2 },
  { date: "17 Sep", observed: 0.0, blockForecast: 4.5, gramcastDownscaled: 0.8 },
  { date: "18 Sep", observed: 0.0, blockForecast: 3.0, gramcastDownscaled: 0.0 },
  { date: "19 Sep", observed: 18.6, blockForecast: 7.5, gramcastDownscaled: 17.4 },
  { date: "20 Sep", observed: 31.2, blockForecast: 15.0, gramcastDownscaled: 29.5 },
  { date: "21 Sep", observed: 12.0, blockForecast: 8.0, gramcastDownscaled: 11.2 },
  { date: "22 Sep", observed: 4.1, blockForecast: 7.2, gramcastDownscaled: 4.8 },
  { date: "23 Sep", observed: 0.0, blockForecast: 2.0, gramcastDownscaled: 0.0 },
  { date: "24 Sep", observed: 8.5, blockForecast: 6.0, gramcastDownscaled: 8.1 },
  { date: "25 Sep", observed: 16.4, blockForecast: 9.5, gramcastDownscaled: 15.8 },
  { date: "26 Sep", observed: 24.8, blockForecast: 12.0, gramcastDownscaled: 23.5 },
  { date: "27 Sep", observed: 15.0, blockForecast: 8.5, gramcastDownscaled: 16.2 }
];

export const TEMPERATURE_VALIDATION_SERIES: ValidationTimeSeriesPoint[] = [
  { date: "14 Sep", observed: 27.5, blockForecast: 30.0, gramcastDownscaled: 27.8 },
  { date: "15 Sep", observed: 26.8, blockForecast: 29.5, gramcastDownscaled: 27.1 },
  { date: "16 Sep", observed: 28.4, blockForecast: 30.5, gramcastDownscaled: 28.6 },
  { date: "17 Sep", observed: 30.1, blockForecast: 31.0, gramcastDownscaled: 29.9 },
  { date: "18 Sep", observed: 31.2, blockForecast: 31.8, gramcastDownscaled: 31.0 },
  { date: "19 Sep", observed: 27.0, blockForecast: 29.8, gramcastDownscaled: 27.4 },
  { date: "20 Sep", observed: 25.5, blockForecast: 29.0, gramcastDownscaled: 25.9 },
  { date: "21 Sep", observed: 27.2, blockForecast: 29.5, gramcastDownscaled: 27.5 },
  { date: "22 Sep", observed: 28.8, blockForecast: 30.2, gramcastDownscaled: 28.6 },
  { date: "23 Sep", observed: 29.5, blockForecast: 30.8, gramcastDownscaled: 29.3 },
  { date: "24 Sep", observed: 28.0, blockForecast: 30.0, gramcastDownscaled: 28.2 },
  { date: "25 Sep", observed: 27.1, blockForecast: 29.5, gramcastDownscaled: 27.3 },
  { date: "26 Sep", observed: 26.4, blockForecast: 29.0, gramcastDownscaled: 26.7 },
  { date: "27 Sep", observed: 27.8, blockForecast: 29.8, gramcastDownscaled: 28.0 }
];

// Officer monitored Panchayats table data
export interface OfficerPanchayatRow {
  id: string;
  name: string;
  hindiName: string;
  elevation: number;
  rainfallMm: number;
  rainProb: number;
  risk: 'Low' | 'Moderate' | 'High';
  riskType: string;
  confidence: 'High' | 'Moderate' | 'Limited';
  primaryAdvisory: string;
  hindiPrimaryAdvisory: string;
  stationDistanceKm: number;
}

export const KANKE_BLOCK_OFFICER_SUMMARY = {
  totalPanchayatsMonitored: 24,
  highRiskCount: 4,
  moderateRiskCount: 8,
  lowRiskCount: 12,
  blockNwpRainfallAvg: 8.5,
  downscaledRainfallSpread: "6.5 – 24.0 mm",
  modelStatus: "Operational (Cycle 06Z Calibrated)",
  lastUpdated: "28 Sep, 08:00 AM IST",
  panchayats: [
    {
      id: "p1",
      name: "Sukurhutu",
      hindiName: "सुकुरहुटू",
      elevation: 614,
      rainfallMm: 21.0,
      rainProb: 84,
      risk: "High" as const,
      riskType: "Waterlogging & Runoff",
      confidence: "High" as const,
      primaryAdvisory: "Halt irrigation; open field drainage bunds",
      hindiPrimaryAdvisory: "सिंचाई रोकें; निकासी नाली खोलें",
      stationDistanceKm: 3.1
    },
    {
      id: "p2",
      name: "Kanke (HQ)",
      hindiName: "कांके (मुख्यालय)",
      elevation: 628,
      rainfallMm: 15.0,
      rainProb: 72,
      risk: "Moderate" as const,
      riskType: "Heavy Showers / Spray drift",
      confidence: "Moderate" as const,
      primaryAdvisory: "Postpone chemical spraying and harvesting",
      hindiPrimaryAdvisory: "छिड़काव व कटाई टालें",
      stationDistanceKm: 6.2
    },
    {
      id: "p3",
      name: "Borea",
      hindiName: "बोड़ेया",
      elevation: 622,
      rainfallMm: 17.0,
      rainProb: 76,
      risk: "Moderate" as const,
      riskType: "Riverbank Seepage",
      confidence: "High" as const,
      primaryAdvisory: "Protect grain threshing floors; secure pumps",
      hindiPrimaryAdvisory: "खलिहान सुरक्षित रखें; पंप हटाएं",
      stationDistanceKm: 2.4
    },
    {
      id: "p4",
      name: "Pithoria",
      hindiName: "पिठोरिया",
      elevation: 672,
      rainfallMm: 10.0,
      rainProb: 65,
      risk: "Low" as const,
      riskType: "Breezy conditions",
      confidence: "High" as const,
      primaryAdvisory: "Vegetable staking and early weeding safe",
      hindiPrimaryAdvisory: "सब्जी बंधाई व निराई सुरक्षित",
      stationDistanceKm: 7.8
    },
    {
      id: "p5",
      name: "Arsande",
      hindiName: "अरसंडे",
      elevation: 635,
      rainfallMm: 18.5,
      rainProb: 78,
      risk: "Moderate" as const,
      riskType: "Intense afternoon rain",
      confidence: "Moderate" as const,
      primaryAdvisory: "Delay fertilizer top dressing until Friday",
      hindiPrimaryAdvisory: "उर्वरक छिड़काव शुक्रवार तक टालें",
      stationDistanceKm: 4.5
    },
    {
      id: "p6",
      name: "Nagri Rural",
      hindiName: "नगड़ी ग्रामीण",
      elevation: 648,
      rainfallMm: 23.5,
      rainProb: 86,
      risk: "High" as const,
      riskType: "Localized Cloudburst Risk",
      confidence: "Moderate" as const,
      primaryAdvisory: "Halt paddy transplantation & tractor work",
      hindiPrimaryAdvisory: "धान रोपाई व जुताई कार्य रोकें",
      stationDistanceKm: 9.1
    },
    {
      id: "p7",
      name: "Hulhudoo",
      hindiName: "हुलहुडू",
      elevation: 618,
      rainfallMm: 22.0,
      rainProb: 81,
      risk: "High" as const,
      riskType: "Waterlogging in depression",
      confidence: "Limited" as const,
      primaryAdvisory: "Monitor low-lying maize bunds closely",
      hindiPrimaryAdvisory: "मक्का खेतों में जलजमाव पर नजर रखें",
      stationDistanceKm: 14.2
    },
    {
      id: "p8",
      name: "Mandra",
      hindiName: "मांदरा",
      elevation: 655,
      rainfallMm: 9.0,
      rainProb: 45,
      risk: "Low" as const,
      riskType: "Scattered passing showers",
      confidence: "Moderate" as const,
      primaryAdvisory: "Routine farm operations permitted",
      hindiPrimaryAdvisory: "सामान्य कृषि कार्य जारी रखें",
      stationDistanceKm: 11.5
    }
  ]
};

// Self-correction learning cycle example data
export const LEARNING_CYCLE_SAMPLE = {
  cycleId: "CAL-2026-0927-06Z",
  panchayat: "Kanke (HQ)",
  date: "Yesterday, 27 Sep",
  predictedRainfallMm: 18.0,
  observedRainfallMm: 15.0,
  absoluteErrorMm: 3.0,
  errorNature: "Overprediction by 3.0 mm during evening convective dissipation",
  physicsFeedback: "Planetary Boundary Layer (PBL) humidity decayed 40 minutes faster than standard scheme.",
  calibrationAdjustment: "Negative bias offset of -1.8 mm applied to diurnal cooling parameter.",
  status: "Calibrated & Stored in Local Memory Matrix"
};
