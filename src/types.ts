export type UserRole = 'farmer' | 'officer' | 'technical';
export type Language = 'en' | 'hi';

export type NavTab = 
  | 'home'
  | 'panchayat'
  | 'map'
  | 'forecast'
  | 'risks'
  | 'agriculture'
  | 'insights'
  | 'officer'
  | 'validation'
  | 'self-correction'
  | 'about';

export type RiskSeverity = 'Low' | 'Moderate' | 'High';
export type ConfidenceLevel = 'High' | 'Moderate' | 'Limited';

export interface LocationHierarchy {
  state: string;
  district: string;
  block: string;
  panchayat: string;
}

export interface DayForecast {
  day: string;
  hindiDay: string;
  date: string;
  tempMin: number;
  tempMax: number;
  rainProb: number;
  rainfallMm: string;
  rainfallVal: number;
  condition: string;
  hindiCondition: string;
  icon: 'rain' | 'sun' | 'cloud' | 'cloud-rain' | 'heavy-rain';
  riskLevel: RiskSeverity;
  riskText: string;
  hindiRiskText: string;
}

export interface HourlyForecast {
  time: string;
  temp: number;
  rainProb: number;
  rainfallMm: number;
  humidity: number;
}

export interface WeatherRiskItem {
  id: string;
  name: string;
  hindiName: string;
  severity: RiskSeverity;
  icon: string;
  description: string;
  hindiDescription: string;
  affectedArea: string;
}

export interface AdvisoryItem {
  category: 'irrigation' | 'fieldWork' | 'harvesting' | 'spraying' | 'sowing';
  title: string;
  hindiTitle: string;
  icon: string;
  status: 'delay' | 'proceed' | 'caution';
  recommendation: string;
  hindiRecommendation: string;
  urgency: 'high' | 'medium' | 'normal';
}

export interface WeatherFingerprint {
  rainfallPattern: string;
  hindiRainfallPattern: string;
  terrain: string;
  hindiTerrain: string;
  elevationM: number;
  vegetation: string;
  hindiVegetation: string;
  seasonality: string;
  hindiSeasonality: string;
  historicalBias: string;
  whyItMatters: string;
  hindiWhyItMatters: string;
}

export interface PanchayatData {
  id: string;
  name: string;
  hindiName: string;
  block: string;
  district: string;
  state: string;
  lat: number;
  lng: number;
  elevation: number; // in meters
  updatedTime: string;
  hindiUpdatedTime: string;
  current: {
    temp: number;
    rainfallExpected: string;
    rainfallExpectedMm: number;
    rainProb: number;
    humidity: number;
    windSpeedKmH: number;
    windDirection: string;
    pressureHpa: number;
    status: string;
    hindiStatus: string;
  };
  forecast7Day: DayForecast[];
  hourly: HourlyForecast[];
  risks: WeatherRiskItem[];
  guidance: AdvisoryItem[];
  whyPredict: {
    factors: { title: string; hindiTitle: string; desc: string; hindiDesc: string }[];
    localPatternNote: string;
    hindiLocalPatternNote: string;
  };
  confidence: {
    level: ConfidenceLevel;
    hindiLevel: string;
    explanation: string;
    hindiExplanation: string;
    satellitePass: string;
    stationDistanceKm: number;
  };
  fingerprint: WeatherFingerprint;
  // Block vs downscaled metrics
  blockForecastComparison: {
    blockRainfallMm: number;
    panchayatRainfallMm: number;
    blockTempC: number;
    panchayatTempC: number;
    varianceReason: string;
    hindiVarianceReason: string;
  };
}

export interface BlockComparisonData {
  blockName: string;
  district: string;
  coarseGridResolutionKm: number; // e.g., 10-12 km
  downscaledResolutionKm: number; // e.g., 1-2 km
  blockAvgRainfallMm: number;
  blockAvgTempC: number;
  panchayats: {
    id: string;
    name: string;
    elevation: number;
    rainfallMm: number;
    tempC: number;
    risk: RiskSeverity;
    confidence: ConfidenceLevel;
  }[];
}

export interface ValidationMetric {
  parameter: 'rainfall' | 'temperature' | 'humidity';
  originalBlockMAE: number;
  gramcastMAE: number;
  originalBlockRMSE: number;
  gramcastRMSE: number;
  biasReductionPct: number;
  correlationCoeff: number;
  observationsCompared: number;
}

export interface ValidationTimeSeriesPoint {
  date: string;
  observed: number;
  blockForecast: number;
  gramcastDownscaled: number;
}
