import React, { useState } from 'react';
import { 
  CloudRain, 
  Thermometer, 
  Droplets, 
  Wind, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  Sprout, 
  Wheat, 
  ShoppingBag, 
  ShieldAlert, 
  ShieldCheck, 
  HelpCircle, 
  Fingerprint, 
  MapPin, 
  Sun,
  Cloud
} from 'lucide-react';
import { PanchayatData, Language, DayForecast } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { AudioNarrator } from '../components/AudioNarrator';
import { SuperResolutionVisual } from '../components/SuperResolutionVisual';

interface MyPanchayatViewProps {
  weather: PanchayatData;
  lang: Language;
  onOpenLocationModal: () => void;
  onNavigateTo: (tab: any) => void;
}

export const MyPanchayatView: React.FC<MyPanchayatViewProps> = ({
  weather,
  lang,
  onOpenLocationModal,
  onNavigateTo
}) => {
  const t = TRANSLATIONS[lang];
  const [whyOpen, setWhyOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<DayForecast>(weather.forecast7Day[0]);

  // Risk severity helpers
  const getRiskBadgeClass = (severity: string) => {
    switch (severity) {
      case 'High': return 'badge-high';
      case 'Moderate': return 'badge-moderate';
      default: return 'badge-low';
    }
  };

  const getAdvisoryIcon = (cat: string) => {
    switch (cat) {
      case 'irrigation': return <Sprout size={18} />;
      case 'fieldWork': return <Wheat size={18} />;
      case 'harvesting': return <ShoppingBag size={18} />;
      default: return <Droplets size={18} />;
    }
  };

  const getWeatherIcon = (iconName: string, size = 24) => {
    switch (iconName) {
      case 'heavy-rain':
      case 'rain':
      case 'cloud-rain':
        return <CloudRain size={size} color="#0284c7" />;
      case 'sun':
        return <Sun size={size} color="#f59e0b" />;
      default:
        return <Cloud size={size} color="#64748b" />;
    }
  };

  return (
    <div>
      {/* Location & Breadcrumb Header Bar */}
      <div className="location-header-bar">
        <div className="location-breadcrumbs">
          <MapPin size={20} color="var(--gov-navy)" />
          <span>{weather.state}</span>
          <span style={{ color: 'var(--neutral-400)' }}>/</span>
          <span>{weather.district}</span>
          <span style={{ color: 'var(--neutral-400)' }}>/</span>
          <span>{weather.block} Block</span>
          <span style={{ color: 'var(--neutral-400)' }}>/</span>
          <span className="breadcrumb-active">{weather.name}</span>
        </div>

        <div className="location-meta">
          <AudioNarrator weather={weather} lang={lang} />
          
          <button 
            className="btn btn-secondary btn-sm"
            onClick={onOpenLocationModal}
          >
            {t.changeLocation}
          </button>
        </div>
      </div>

      {/* SECTION 6: Current Weather Card (Farmer Hero) */}
      <div className="weather-hero-card">
        <div className="hero-top-row">
          <div>
            <div className="hero-update-text">
              <Clock size={14} />
              <span>{t.updated}: {lang === 'hi' ? weather.hindiUpdatedTime : weather.updatedTime}</span>
              <span style={{ opacity: 0.6 }}>•</span>
              <span>Elevation: {weather.elevation}m ASL</span>
            </div>
            <h1 className="hero-location-title">
              {t.weatherIn} {lang === 'hi' ? weather.hindiName : weather.name}
            </h1>
          </div>

          <div className="hero-status-pill">
            <CloudRain size={20} color="#38bdf8" />
            <span>{lang === 'hi' ? weather.current.hindiStatus : weather.current.status}</span>
          </div>
        </div>

        {/* 4 Large Metrics */}
        <div className="hero-metrics-grid">
          {/* Temperature */}
          <div className="metric-item">
            <span className="metric-label">
              <Thermometer size={16} />
              {t.temperature}
            </span>
            <span className="metric-value-large">{weather.current.temp}°C</span>
            <span className="metric-subtext">
              {lang === 'hi' ? "अधिकतम 28°C • न्यूनतम 22°C" : "Max 28°C • Min 22°C"}
            </span>
          </div>

          {/* Rainfall Expected */}
          <div className="metric-item">
            <span className="metric-label">
              <CloudRain size={16} />
              {t.rainfallExpected}
            </span>
            <span className="metric-value-large" style={{ color: '#38bdf8' }}>
              {weather.current.rainfallExpected}
            </span>
            <span className="metric-subtext">
              {lang === 'hi' ? "दोपहर बाद वर्षा का मुख्य समय" : "Chiefly in afternoon (1:30–5 PM)"}
            </span>
          </div>

          {/* Rain Probability */}
          <div className="metric-item">
            <span className="metric-label">
              <Droplets size={16} />
              {t.rainProbability}
            </span>
            <span className="metric-value-large">{weather.current.rainProb}%</span>
            <span className="metric-subtext">
              {lang === 'hi' ? "उच्च संभावना (Rain likely)" : "High likelihood today"}
            </span>
          </div>

          {/* Humidity & Wind */}
          <div className="metric-item">
            <span className="metric-label">
              <Wind size={16} />
              {t.humidity} & {t.wind}
            </span>
            <span className="metric-value-large">{weather.current.humidity}%</span>
            <span className="metric-subtext">
              Wind: {weather.current.windSpeedKmH} km/h ({weather.current.windDirection})
            </span>
          </div>
        </div>
      </div>

      {/* Real Panchayat Field Profile Banner */}
      <div 
        className="gov-card" 
        style={{ 
          padding: 0, 
          overflow: 'hidden', 
          marginBottom: 24, 
          border: '1px solid var(--neutral-200)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
          gap: 0
        }}
      >
        <div style={{ position: 'relative', minHeight: 210, overflow: 'hidden' }}>
          <img 
            src={weather.imageUrl || '/images/panchayat_kanke_hq.jpg'} 
            alt={weather.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <span 
            className="badge" 
            style={{ 
              position: 'absolute', 
              top: 10, 
              left: 10, 
              background: 'rgba(15, 23, 42, 0.85)', 
              color: '#ffffff', 
              backdropFilter: 'blur(4px)', 
              fontSize: '0.72rem',
              border: '1px solid rgba(255,255,255,0.2)',
              padding: '3px 8px'
            }}
          >
            {lang === 'hi' ? "वास्तविक पंचायत क्षेत्र परिदृश्य" : "Real Panchayat Area Ground Landscape"}
          </span>
          <div 
            style={{ 
              position: 'absolute', 
              bottom: 0, 
              left: 0, 
              right: 0, 
              background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0) 100%)',
              padding: '12px 14px 8px',
              color: '#ffffff',
              fontSize: '0.75rem',
              lineHeight: 1.3
            }}
          >
            {lang === 'hi' ? (weather.hindiImageCaption || weather.imageCaption) : weather.imageCaption}
          </div>
        </div>

        <div style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span className="badge badge-navy" style={{ fontSize: '0.7rem' }}>
              {lang === 'hi' ? "स्थानीय सूक्ष्म-जलवायु प्रोफाइल" : "Microclimate Terrain Profile"}
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--neutral-500)' }}>
              Elevation: <strong>{weather.elevation}m ASL</strong>
            </span>
          </div>

          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--gov-navy)', marginBottom: 8 }}>
            {lang === 'hi' ? `${weather.hindiName} का विशिष्ट भौगोलिक क्षेत्र` : `${weather.name} Physical Catchment & Farm Biome`}
          </h3>

          <p style={{ fontSize: '0.83rem', color: 'var(--neutral-600)', lineHeight: 1.5, marginBottom: 12 }}>
            {lang === 'hi'
              ? `ग्रामकास्ट इस क्षेत्र की स्थानीय ढलान, जल संचयन और मिट्टी की प्रकृति के आधार पर ब्लॉक के औसत 12 किमी पूर्वानुमान को 1 किमी रिजॉल्यूशन पर डाउनस्केल करता है।`
              : `GRAMCAST accounts for ${weather.name}'s specific micro-topography, surface roughness, and vegetation to calibrate coarse 12km block NWP into field-level guidance.`}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 8, background: 'var(--neutral-50)', padding: 10, borderRadius: 8, border: '1px solid var(--neutral-200)', fontSize: '0.78rem' }}>
            <div>
              <span style={{ color: 'var(--neutral-500)', display: 'block' }}>Terrain:</span>
              <strong style={{ color: 'var(--gov-navy)' }}>{weather.fingerprint.terrain.split('(')[0]}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--neutral-500)', display: 'block' }}>Rain vs Block:</span>
              <strong style={{ color: weather.blockForecastComparison.panchayatRainfallMm > weather.blockForecastComparison.blockRainfallMm ? '#0284c7' : '#059669' }}>
                {weather.blockForecastComparison.panchayatRainfallMm > weather.blockForecastComparison.blockRainfallMm ? '+' : ''}
                {(weather.blockForecastComparison.panchayatRainfallMm - weather.blockForecastComparison.blockRainfallMm).toFixed(1)} mm
              </strong>
            </div>
            <div>
              <span style={{ color: 'var(--neutral-500)', display: 'block' }}>AWS Telemetry:</span>
              <strong style={{ color: 'var(--neutral-800)' }}>{weather.confidence.stationDistanceKm} km</strong>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 7: 7-Day Forecast Horizontal Timeline */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h2 style={{ fontSize: '1.18rem', fontWeight: 700, color: 'var(--gov-navy)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>{t.navForecast}</span>
            <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--neutral-500)' }}>
              ({weather.name})
            </span>
          </h2>
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => onNavigateTo('forecast')}
          >
            {lang === 'hi' ? "विस्तृत पूर्वानुमान देखें" : "View Detailed Hourly"} →
          </button>
        </div>

        <div className="forecast-scroll-container">
          {weather.forecast7Day.map((dayItem) => {
            const isSelected = selectedDay.day === dayItem.day;
            return (
              <div 
                key={dayItem.day} 
                className={`forecast-day-card ${isSelected ? 'active-day' : ''}`}
                onClick={() => setSelectedDay(dayItem)}
                style={{ cursor: 'pointer' }}
              >
                <span className="forecast-day-name">
                  {lang === 'hi' ? dayItem.hindiDay : dayItem.day}
                </span>
                <span className="forecast-day-date">{dayItem.date}</span>

                <div className="forecast-icon-box">
                  {getWeatherIcon(dayItem.icon)}
                </div>

                <div className="forecast-temp-range">
                  {dayItem.tempMax}° / <span style={{ fontSize: '0.9rem', color: 'var(--neutral-500)' }}>{dayItem.tempMin}°</span>
                </div>

                <div className="forecast-rain-tag">
                  <Droplets size={12} />
                  <span>{dayItem.rainProb}% rain</span>
                </div>

                <div className="forecast-amount-text">
                  {dayItem.rainfallMm}
                </div>

                <span 
                  className={`badge ${getRiskBadgeClass(dayItem.riskLevel)}`}
                  style={{ marginTop: 8, fontSize: '0.65rem', padding: '2px 6px' }}
                >
                  {dayItem.riskLevel} Risk
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 8: Weather Risk Section */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--gov-navy)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <ShieldAlert size={20} color="var(--warning-amber)" />
              <span>{t.weatherRisks}</span>
            </h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--neutral-500)' }}>
              {lang === 'hi' ? "आपकी पंचायत के लिए वर्तमान मौसम जोखिम" : "Current weather risks identified for this Panchayat"}
            </p>
          </div>

          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => onNavigateTo('risks')}
          >
            {lang === 'hi' ? "सभी चेतावनियां देखें" : "Alert Center"} →
          </button>
        </div>

        <div className="risks-grid">
          {weather.risks.map((risk) => (
            <div key={risk.id} className={`risk-card risk-${risk.severity.toLowerCase()}`}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--gov-navy)' }}>
                  {risk.name === 'Heavy Rain' ? '🌧' : risk.name === 'Waterlogging' ? '💧' : risk.name === 'Heat Stress' ? '☀' : '🌾'}{' '}
                  {lang === 'hi' ? risk.hindiName : risk.name}
                </span>
                <span className={`badge ${getRiskBadgeClass(risk.severity)}`}>
                  {risk.severity} Risk
                </span>
              </div>

              <p style={{ fontSize: '0.88rem', color: 'var(--neutral-700)', lineHeight: 1.45 }}>
                {lang === 'hi' ? risk.hindiDescription : risk.description}
              </p>

              <div style={{ fontSize: '0.74rem', color: 'var(--neutral-500)', marginTop: 'auto', paddingTop: 6, borderTop: '1px solid var(--neutral-100)' }}>
                <strong>Vulnerable:</strong> {risk.affectedArea}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 9: “WHAT SHOULD I DO?” SECTION */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--agri-green-dark)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Sprout size={22} color="var(--agri-green)" />
              <span>{t.whatToDo}</span>
            </h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--neutral-500)' }}>
              <strong>{t.weatherBasedGuidance}</strong> — {lang === 'hi' ? "सीधी कृषि सलाह" : "Actionable decisions based on expected precipitation"}
            </p>
          </div>

          <button 
            className="btn btn-success btn-sm"
            onClick={() => onNavigateTo('agriculture')}
          >
            {lang === 'hi' ? "विस्तृत फसल सलाह" : "Crop Advisories"} →
          </button>
        </div>

        <div className="advisory-grid">
          {weather.guidance.map((item) => (
            <div key={item.category} className="advisory-card">
              <div className="advisory-card-header">
                <span className="advisory-category-title">
                  {getAdvisoryIcon(item.category)}
                  <span>{lang === 'hi' ? item.hindiTitle : item.title}</span>
                </span>
                
                <span className={`advisory-status-badge status-${item.status}`}>
                  {item.status === 'delay' ? (lang === 'hi' ? "टालें / रोकें" : "Delay / Avoid") :
                   item.status === 'proceed' ? (lang === 'hi' ? "अनुकूल" : "Proceed") :
                   (lang === 'hi' ? "सावधानी" : "Caution")}
                </span>
              </div>

              <p className="advisory-text">
                {lang === 'hi' ? item.hindiRecommendation : item.recommendation}
              </p>

              <div style={{ marginTop: 'auto', fontSize: '0.74rem', color: 'var(--neutral-500)' }}>
                Category: <strong>{item.category.toUpperCase()}</strong> • Weather Trigger: {weather.current.rainfallExpected}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 13 & 14: Core Visual: Block to Panchayat Super Resolution Banner */}
      <SuperResolutionVisual weather={weather} lang={lang} />

      {/* SECTION 10 & 11: “Why this forecast?” & Forecast Confidence */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 18, marginBottom: 28 }}>
        {/* Why this forecast (Expandable) */}
        <div className="gov-card">
          <div 
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
            onClick={() => setWhyOpen(!whyOpen)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <HelpCircle size={18} color="var(--gov-navy)" />
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--gov-navy)' }}>
                {t.whyPredict}
              </h3>
            </div>
            {whyOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>

          <p style={{ fontSize: '0.84rem', color: 'var(--neutral-600)', marginTop: 8 }}>
            {t.whyPredictIntro}
          </p>

          {/* Quick list of factors */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
            {weather.whyPredict.factors.map((f, idx) => (
              <div key={idx} style={{ padding: '8px 12px', background: 'var(--neutral-50)', borderRadius: 6, border: '1px solid var(--neutral-200)', fontSize: '0.82rem' }}>
                <strong style={{ color: 'var(--gov-navy)' }}>{lang === 'hi' ? f.hindiTitle : f.title}:</strong>{' '}
                <span style={{ color: 'var(--neutral-700)' }}>{lang === 'hi' ? f.hindiDesc : f.desc}</span>
              </div>
            ))}
          </div>

          {whyOpen && (
            <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid var(--neutral-200)' }}>
              <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: 4 }}>
                {t.localWeatherPattern}
              </h4>
              <p style={{ fontSize: '0.84rem', color: 'var(--neutral-700)', lineHeight: 1.5 }}>
                {lang === 'hi' ? weather.whyPredict.hindiLocalPatternNote : weather.whyPredict.localPatternNote}
              </p>
            </div>
          )}
        </div>

        {/* SECTION 11: Forecast Confidence */}
        <div className="gov-card">
          <div className="gov-card-header">
            <div className="gov-card-title">
              <ShieldCheck size={18} color="#059669" />
              <span>{t.confidenceTitle}</span>
            </div>
            <span className={`badge ${weather.confidence.level === 'High' ? 'badge-low' : weather.confidence.level === 'Moderate' ? 'badge-moderate' : 'badge-high'}`}>
              {weather.confidence.level} Confidence
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: weather.confidence.level === 'High' ? '#ecfdf5' : '#fffbeb',
              color: weather.confidence.level === 'High' ? '#059669' : '#d97706',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1.2rem',
              flexShrink: 0
            }}>
              ✓
            </div>
            <div>
              <div style={{ fontWeight: 700, color: 'var(--neutral-900)', fontSize: '0.95rem' }}>
                {lang === 'hi' ? weather.confidence.hindiLevel : `${weather.confidence.level} confidence`}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--neutral-600)' }}>
                {lang === 'hi' ? weather.confidence.hindiExplanation : weather.confidence.explanation}
              </div>
            </div>
          </div>

          <div style={{ background: 'var(--neutral-50)', padding: 12, borderRadius: 8, border: '1px solid var(--neutral-200)', marginBottom: 12 }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: 4 }}>
              {t.whyConfidenceMatters}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--neutral-600)', lineHeight: 1.4 }}>
              {t.confidenceExpl}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: 'var(--neutral-500)', paddingTop: 8, borderTop: '1px solid var(--neutral-200)' }}>
            <span>Telemetry station: {weather.confidence.stationDistanceKm} km</span>
            <span>Satellite Pass: {weather.confidence.satellitePass}</span>
          </div>
        </div>
      </div>

      {/* SECTION 15: Panchayat Weather Fingerprint */}
      <div className="gov-card" style={{ marginBottom: 28 }}>
        <div className="gov-card-header">
          <div className="gov-card-title">
            <Fingerprint size={20} color="var(--gov-navy)" />
            <span>{t.fingerprintTitle}</span>
          </div>
          <span className="badge badge-navy" style={{ fontSize: '0.7rem' }}>
            Unique Terrain & Biome Profile
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, marginBottom: 16 }}>
          <div style={{ padding: 12, background: 'var(--neutral-50)', borderRadius: 8, border: '1px solid var(--neutral-200)' }}>
            <div style={{ fontSize: '0.74rem', color: 'var(--neutral-500)', fontWeight: 600 }}>Rainfall Pattern</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--gov-navy)', marginTop: 2 }}>
              {lang === 'hi' ? weather.fingerprint.hindiRainfallPattern : weather.fingerprint.rainfallPattern}
            </div>
          </div>

          <div style={{ padding: 12, background: 'var(--neutral-50)', borderRadius: 8, border: '1px solid var(--neutral-200)' }}>
            <div style={{ fontSize: '0.74rem', color: 'var(--neutral-500)', fontWeight: 600 }}>Terrain & Elevation</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--gov-navy)', marginTop: 2 }}>
              {lang === 'hi' ? weather.fingerprint.hindiTerrain : weather.fingerprint.terrain}
            </div>
          </div>

          <div style={{ padding: 12, background: 'var(--neutral-50)', borderRadius: 8, border: '1px solid var(--neutral-200)' }}>
            <div style={{ fontSize: '0.74rem', color: 'var(--neutral-500)', fontWeight: 600 }}>Vegetation & Cover</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--gov-navy)', marginTop: 2 }}>
              {lang === 'hi' ? weather.fingerprint.hindiVegetation : weather.fingerprint.vegetation}
            </div>
          </div>

          <div style={{ padding: 12, background: 'var(--neutral-50)', borderRadius: 8, border: '1px solid var(--neutral-200)' }}>
            <div style={{ fontSize: '0.74rem', color: 'var(--neutral-500)', fontWeight: 600 }}>Seasonality & Bias</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--gov-navy)', marginTop: 2 }}>
              {weather.fingerprint.historicalBias}
            </div>
          </div>
        </div>

        <div style={{ padding: 12, background: '#eff6ff', borderRadius: 8, border: '1px solid #bfdbfe', fontSize: '0.84rem', color: '#1e3a8a', marginBottom: 16 }}>
          <strong>{t.whyFingerprintMatters}:</strong> {lang === 'hi' ? weather.fingerprint.hindiWhyItMatters : weather.fingerprint.whyItMatters}
        </div>

        {/* Local Ground Truth & Observational Feeds Dual Card */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
          {/* Real Panchayat Field Photo */}
          <div style={{ background: 'var(--neutral-50)', padding: 12, borderRadius: 10, border: '1px solid var(--neutral-200)' }}>
            <div style={{ borderRadius: 8, overflow: 'hidden', height: 140, position: 'relative', marginBottom: 8 }}>
              <img 
                src={weather.imageUrl || '/images/panchayat_kanke_hq.jpg'} 
                alt={weather.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <span style={{ position: 'absolute', bottom: 6, left: 6, fontSize: '0.68rem', color: '#ffffff', background: 'rgba(15,23,42,0.85)', padding: '2px 6px', borderRadius: 4 }}>
                {weather.name} Catchment • {weather.elevation}m ASL
              </span>
            </div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--gov-navy)' }}>
              {lang === 'hi' ? `${weather.hindiName} स्थलाकृति` : `${weather.name} Field Topography`}
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--neutral-600)', marginTop: 2 }}>
              {lang === 'hi' ? (weather.hindiImageCaption || weather.imageCaption) : weather.imageCaption}
            </div>
          </div>

          {/* Telemetry AWS Station Photo */}
          <div style={{ background: 'var(--neutral-50)', padding: 12, borderRadius: 10, border: '1px solid var(--neutral-200)' }}>
            <div style={{ borderRadius: 8, overflow: 'hidden', height: 140, position: 'relative', marginBottom: 8 }}>
              <img 
                src="/images/agri_weather_station.jpg" 
                alt="Local Agro-Meteorological Weather Station"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <span style={{ position: 'absolute', bottom: 6, left: 6, fontSize: '0.68rem', color: '#ffffff', background: 'rgba(15,23,42,0.85)', padding: '2px 6px', borderRadius: 4 }}>
                Telemetry AWS Unit • {weather.confidence.stationDistanceKm} km away
              </span>
            </div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--gov-navy)' }}>
              Automated Weather Station (AWS)
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--neutral-600)', marginTop: 2 }}>
              Tipping bucket rain gauge (0.2mm) • Ultrasonic anemometer • TDR soil probe (15 & 30cm)
            </div>
            <div style={{ color: '#059669', fontWeight: 600, fontSize: '0.72rem', marginTop: 4 }}>
              ✓ 15-minute telemetry sync with IMD/KVK network
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
