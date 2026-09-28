import React, { useState } from 'react';
import { 
  Sprout, 
  Wheat, 
  Droplets, 
  AlertTriangle, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle, 
  Info, 
  Wind, 
  Thermometer, 
  CloudRain, 
  ArrowRight,
  Shield,
  Layers
} from 'lucide-react';
import { PanchayatData, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface AgricultureViewProps {
  weather: PanchayatData;
  lang: Language;
}

type CropType = 'paddy' | 'maize' | 'vegetables' | 'pulses' | 'wheat';
type GrowthStage = 'sowing' | 'vegetative' | 'flowering' | 'harvesting';
type IrrigationSource = 'tubewell' | 'canal' | 'rainfed' | 'drip';
type SoilType = 'clayey' | 'sandy' | 'alluvial' | 'lateritic';

export const AgricultureView: React.FC<AgricultureViewProps> = ({ weather, lang }) => {
  const t = TRANSLATIONS[lang];

  // Interactive Context Selectors (Section 16)
  const [selectedCrop, setSelectedCrop] = useState<CropType>('paddy');
  const [selectedStage, setSelectedStage] = useState<GrowthStage>('vegetative');
  const [selectedIrrigation, setSelectedIrrigation] = useState<IrrigationSource>('tubewell');
  const [selectedSoil, setSelectedSoil] = useState<SoilType>('clayey');

  // Selected Risk Panchayat for Section 17 (Panchayat Risk Matrix)
  const [selectedRiskPanchayat, setSelectedRiskPanchayat] = useState<string>(weather.name);

  // Derive dynamic crop recommendations based on weather + user context
  const getContextualAdvisory = () => {
    // Weather condition flags
    const isRainy = weather.current.rainfallExpectedMm > 15;
    const isHumid = weather.current.humidity > 70;
    const isWindy = weather.current.windSpeedKmH > 18;

    let weatherRisk = "Normal meteorological conditions for crop cycle.";
    let agronomicAction = "Continue standard agronomic practices.";
    let fieldMonitoring = "Regular routine field inspection.";
    let irrigationRecommendation = "Standard irrigation schedule.";

    if (selectedCrop === 'paddy') {
      if (selectedStage === 'sowing' || selectedStage === 'vegetative') {
        if (isRainy) {
          weatherRisk = "Heavy downpour risk may submerge young seedlings or breach earthen field bunds.";
          agronomicAction = "Postpone planned tubewell irrigation. Ensure 3-5 cm standing water level by packing bund spillways with mud. Delay top-dressing of urea by 48h to prevent surface runoff into drainage streams.";
          fieldMonitoring = "Check peripheral bunds for overflow after peak rain hours (02:00 PM – 05:00 PM).";
          irrigationRecommendation = "HOLD IRRIGATION: Expected 18–35 mm precipitation will fully recharge root zone.";
        } else {
          weatherRisk = "Mild evaporative demand; stable monsoon conditions.";
          agronomicAction = "Maintain 2-3 cm baseline standing water in translocated paddy plots.";
          fieldMonitoring = "Inspect for stem borer dead hearts.";
          irrigationRecommendation = "Maintain regulated canal or tubewell inflow.";
        }
      } else if (selectedStage === 'flowering') {
        if (isWindy && isRainy) {
          weatherRisk = "Gusty winds (>18 km/h) combined with rain during anthesis can cause flower shedding and sterility.";
          agronomicAction = "Ensure smooth surface drainage to avoid prolonged root asphyxiation. Avoid any foliar fertilizer or pest spray.";
          fieldMonitoring = "Inspect panicle emergence and check for blast lesions on upper flag leaf.";
          irrigationRecommendation = "Maintain moist soil without stagnant deep submergence.";
        } else {
          weatherRisk = "Moderate humidity favorable for grain filling.";
          agronomicAction = "Maintain saturation to shallow water depth (2 cm).";
          fieldMonitoring = "Monitor brown planthopper (BPH) populations at base of tillers.";
          irrigationRecommendation = "Light intermittent irrigation.";
        }
      } else { // harvesting
        weatherRisk = isRainy ? "High risk of damp grain mold, shattering, and lodging of ripe paddy stalks." : "Clear window suitable for harvesting.";
        agronomicAction = isRainy ? "Strictly delay mechanical combine harvesting. Threshed grain must be shifted under moisture-proof tarpaulin covers." : "Safe to proceed with cutting and sun-drying grain on raised threshing floors.";
        fieldMonitoring = "Check harvested grain moisture (target < 14% before storage bag packing).";
        irrigationRecommendation = "DRAIN FIELD completely 10 days prior to combine entry.";
      }
    } else if (selectedCrop === 'maize') {
      if (isRainy) {
        weatherRisk = "High risk of root zone waterlogging. Maize cannot tolerate standing water around root crowns for > 12 hours.";
        agronomicAction = "Clear out inter-row furrows immediately to expedite runoff. Do not apply whorl granules during rain.";
        fieldMonitoring = "Examine lower leaves for yellowing indicating nitrogen leaching from saturated soil.";
        irrigationRecommendation = "SUSPEND all irrigation until soil tension returns to normal.";
      } else {
        weatherRisk = "Favorable sunshine for cob filling.";
        agronomicAction = "Perform earthing up around root crowns if soil is workable.";
        fieldMonitoring = "Monitor for Fall Armyworm (FAW) egg masses on lower leaf surfaces.";
        irrigationRecommendation = "Apply light irrigation at silking/tasseling if soil feels dry.";
      }
    } else if (selectedCrop === 'vegetables') {
      if (isHumid && isRainy) {
        weatherRisk = "Elevated humidity (>75%) with warm temps creates severe risk of fungal downy/late blight and fruit rot.";
        agronomicAction = "Stake tall indeterminate tomato vines. Improve airflow by trimming lower senescent leaves. Plan protective copper fungicide spray ONLY once foliage dries on next clear morning.";
        fieldMonitoring = "Scout undersides of leaves for water-soaked circular lesions.";
        irrigationRecommendation = "PAUSE drip and furrow irrigation for at least 36 hours.";
      } else {
        weatherRisk = "Normal vegetative growing conditions.";
        agronomicAction = "Harvest mature fruits in the morning cool hours.";
        fieldMonitoring = "Check yellow sticky traps for whitefly and thrips vectors.";
        irrigationRecommendation = "Provide regulated morning drip irrigation.";
      }
    } else if (selectedCrop === 'pulses') {
      if (isRainy) {
        weatherRisk = "High sensitivity to water stagnation causing collar rot and phytophthora root rot.";
        agronomicAction = "Ensure drainage channels between raised beds are open and unimpeded.";
        fieldMonitoring = "Look for wilting plants along lower terrace edges.";
        irrigationRecommendation = "Zero irrigation required; rainfed replenishment sufficient.";
      } else {
        weatherRisk = "Favorable flowering window.";
        agronomicAction = "Protect pollinator activity by avoiding daytime pesticide applications.";
        fieldMonitoring = "Inspect for pod borer larval entry holes.";
        irrigationRecommendation = "Critical pod filling irrigation only if soil fissures appear.";
      }
    } else { // wheat
      weatherRisk = "Thermal stress monitoring. Current daytime temps near seasonal threshold.";
      agronomicAction = "For timely sown wheat, ensure light crown root initiation (CRI) irrigation if rainfall is absent.";
      fieldMonitoring = "Check for early aphid colonies on young shoots.";
      irrigationRecommendation = isRainy ? "Delay CRI irrigation until soil moisture dries." : "Schedule light sprinkler irrigation.";
    }

    // Soil modifier
    if (selectedSoil === 'clayey' && isRainy) {
      agronomicAction += " NOTE FOR CLAYEY SOIL: Heavy clay retains water for extended durations; prioritize drainage channels to prevent root rot.";
    } else if (selectedSoil === 'sandy' && !isRainy) {
      agronomicAction += " NOTE FOR SANDY SOIL: High percolation rate; monitor topsoil dryness frequently.";
    }

    return {
      weatherRisk,
      agronomicAction,
      fieldMonitoring,
      irrigationRecommendation
    };
  };

  const advisory = getContextualAdvisory();

  // Multi-Panchayat Risk Matrix for Section 17
  const panchayatRiskProfiles = [
    {
      name: weather.name,
      elevation: `${weather.elevation}m`,
      riskCategory: "Heavy Rainfall & Runoff",
      riskLevel: "Moderate",
      riskColor: "#d97706",
      riskBg: "#fef3c7",
      forecast: `${weather.current.rainfallExpected} (${weather.current.rainfallExpectedMm} mm)`,
      reason: "Valley-floor terrain receives runoff from adjoining upper ridges. High soil saturation.",
      recommendedAction: "Delay tubewell irrigation. Open drainage outlets at edge of paddy plots."
    },
    {
      name: "Bodh Gaya Rural / Central",
      elevation: "115m",
      riskCategory: "Moderate Rain & Humidity",
      riskLevel: "Low",
      riskColor: "#059669",
      riskBg: "#ecfdf5",
      forecast: "38-42 mm rain, 75% RH",
      reason: "Balanced loam soil and moderate slope allow steady infiltration without flash waterlogging.",
      recommendedAction: "Complete inter-row weeding before afternoon shower window."
    },
    {
      name: "Bakrour (Falgu Riverbank)",
      elevation: "112m",
      riskCategory: "Waterlogging & River Rise",
      riskLevel: "High",
      riskColor: "#dc2626",
      riskBg: "#fee2e2",
      forecast: "52-56 mm rain, 84% RH",
      reason: "Low-lying proximity to Falgu riverbed. Runoff accumulation from upstream catchment.",
      recommendedAction: "Move stored grain and livestock away from riparian flood margins. Cease all chemical sprays."
    },
    {
      name: "Itawan (West Upland)",
      elevation: "128m",
      riskCategory: "Dry Spell / Light Rain Only",
      riskLevel: "Low",
      riskColor: "#0284c7",
      riskBg: "#e0f2fe",
      forecast: "34-38 mm rain, 71% RH",
      reason: "Higher elevation and rain-shadow bypass result in 35% less precipitation than riverbank Panchayats.",
      recommendedAction: "Conserve standing moisture. Safe for field tractor tillage operations."
    }
  ];

  const activePanchayatRisk = panchayatRiskProfiles.find(p => p.name === selectedRiskPanchayat) || panchayatRiskProfiles[0];

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <div style={{
            background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
            color: '#fff',
            padding: '6px 10px',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }}>
            <Sprout size={20} />
            <span style={{ fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.04em' }}>AGRO-MET ADVISORY</span>
          </div>
          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>SIH26074 Decision Support</span>
        </div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--gov-navy)' }}>
          {lang === 'hi' ? "मौसम आधारित कृषि सलाहकार प्रणाली" : "Localized Agro-Meteorological Advisory"}
        </h1>
        <p style={{ fontSize: '0.86rem', color: 'var(--neutral-600)' }}>
          Transforming downscaled Panchayat weather predictions into actionable, crop-specific field decisions for <strong>{weather.name}</strong>.
        </p>
      </div>

      {/* Critical Scientific Distinction Callout (Section 15) */}
      <div style={{
        background: '#f8fafc',
        border: '1px solid #cbd5e1',
        borderLeft: '5px solid #0284c7',
        borderRadius: 8,
        padding: '12px 16px',
        marginBottom: 20,
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12
      }}>
        <Info size={20} color="#0284c7" style={{ flexShrink: 0, marginTop: 2 }} />
        <div style={{ fontSize: '0.83rem', color: '#334155', lineHeight: 1.5 }}>
          <strong>Operational Distinction:</strong> GRAMCAST strictly separates 
          <span style={{ color: '#0284c7', fontWeight: 700 }}> Weather-Derived Meteorological Advisories </span> 
          (e.g., rainfall windows, humidity alerts, thermal thresholds) from 
          <span style={{ color: '#059669', fontWeight: 700 }}> Agronomic Field Recommendations</span>. 
          Chemical dosages and plant protection measures must always conform to official district Krishi Vigyan Kendra (KVK) and ICAR protocols.
        </div>
      </div>

      {/* SECTION 18: Farmer View (Quick Summary Banner) */}
      <div style={{
        background: 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)',
        color: '#ffffff',
        borderRadius: 14,
        padding: '20px 24px',
        marginBottom: 28,
        boxShadow: '0 8px 20px rgba(6, 78, 59, 0.2)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, flexWrap: 'wrap', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: '1.8rem' }}>🌾</span>
            <div>
              <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#6ee7b7', fontWeight: 700 }}>
                {lang === 'hi' ? "किसान मित्र दृश्य" : "Farmer Quick Decision View"}
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                {lang === 'hi' ? `${weather.name} के किसानों के लिए आज का मुख्य निर्देश` : `Today's Action for ${weather.name} Farmers`}
              </div>
            </div>
          </div>
          <div style={{
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(4px)',
            padding: '6px 14px',
            borderRadius: 20,
            fontSize: '0.82rem',
            fontWeight: 600,
            border: '1px solid rgba(255, 255, 255, 0.25)'
          }}>
            📍 {weather.name} ({weather.elevation}m ASL)
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, marginTop: 14 }}>
          {/* Today Weather */}
          <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: 14, borderRadius: 10, border: '1px solid rgba(255, 255, 255, 0.15)' }}>
            <div style={{ fontSize: '0.74rem', color: '#a7f3d0', fontWeight: 600 }}>TODAY'S WEATHER</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span>🌧</span>
              <span>{weather.current.rainfallExpected}</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#d1fae5', marginTop: 4 }}>
              Expected Rain: <strong>{weather.current.rainfallExpectedMm} mm</strong> • RH: <strong>{weather.current.humidity}%</strong>
            </div>
          </div>

          {/* Core Decision: What should I do? */}
          <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: 14, borderRadius: 10, border: '1px solid rgba(255, 255, 255, 0.15)' }}>
            <div style={{ fontSize: '0.74rem', color: '#fef08a', fontWeight: 600 }}>WHAT SHOULD I DO TODAY?</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: 4, color: '#fef08a' }}>
              Hold Scheduled Irrigation
            </div>
            <div style={{ fontSize: '0.75rem', color: '#d1fae5', marginTop: 4 }}>
              Rainfall will meet crop water demand. Save diesel & tubewell electricity.
            </div>
          </div>

          {/* Tomorrow */}
          <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: 14, borderRadius: 10, border: '1px solid rgba(255, 255, 255, 0.15)' }}>
            <div style={{ fontSize: '0.74rem', color: '#a7f3d0', fontWeight: 600 }}>TOMORROW'S OUTLOOK</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span>🌦</span>
              <span>Light scattered showers</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#d1fae5', marginTop: 4 }}>
              Rain clears gradually by afternoon.
            </div>
          </div>

          {/* Crucial Caution */}
          <div style={{ background: 'rgba(239, 68, 68, 0.2)', padding: 14, borderRadius: 10, border: '1px solid rgba(248, 113, 113, 0.4)' }}>
            <div style={{ fontSize: '0.74rem', color: '#fecaca', fontWeight: 600 }}>CRITICAL CAUTION</div>
            <div style={{ fontSize: '0.98rem', fontWeight: 700, marginTop: 4, color: '#fee2e2' }}>
              No Chemical Foliar Sprays
            </div>
            <div style={{ fontSize: '0.75rem', color: '#fecaca', marginTop: 4 }}>
              Rainfall wash-off risk is &gt;80%. Spray window opens Thursday.
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 16: CROP-SPECIFIC CONTEXT INTERACTIVE SELECTOR */}
      <div className="gov-card" style={{ marginBottom: 28 }}>
        <div className="gov-card-header">
          <div className="gov-card-title">
            <Wheat size={20} color="var(--gov-navy)" />
            <span>Interactive Crop Context Engine</span>
          </div>
          <span className="badge badge-navy">Customized to Field Context</span>
        </div>

        <p style={{ fontSize: '0.86rem', color: 'var(--neutral-600)', marginBottom: 18 }}>
          Select your crop, growth stage, irrigation infrastructure, and soil type to compute customized weather-risk mitigations:
        </p>

        {/* 4 Context Selectors Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, marginBottom: 20 }}>
          {/* Selector 1: Crop */}
          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--gov-navy)', display: 'block', marginBottom: 6 }}>
              1. CROP (फसल)
            </label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value as CropType)}
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: 8,
                border: '1px solid var(--neutral-300)',
                background: '#ffffff',
                fontSize: '0.86rem',
                fontWeight: 600,
                color: 'var(--neutral-800)',
                cursor: 'pointer'
              }}
            >
              <option value="paddy">Paddy / Rice (धान)</option>
              <option value="maize">Maize (मक्का)</option>
              <option value="vegetables">Vegetables - Tomato/Cauliflower (सब्जियां)</option>
              <option value="pulses">Pulses - Pigeonpea/Gram (दालें)</option>
              <option value="wheat">Wheat (गेहूं)</option>
            </select>
          </div>

          {/* Selector 2: Growth Stage */}
          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--gov-navy)', display: 'block', marginBottom: 6 }}>
              2. GROWTH STAGE (अवस्था)
            </label>
            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value as GrowthStage)}
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: 8,
                border: '1px solid var(--neutral-300)',
                background: '#ffffff',
                fontSize: '0.86rem',
                fontWeight: 600,
                color: 'var(--neutral-800)',
                cursor: 'pointer'
              }}
            >
              <option value="sowing">Nursery / Sowing / Emergence</option>
              <option value="vegetative">Vegetative Growth / Tillering</option>
              <option value="flowering">Flowering / Tasseling / Anthesis</option>
              <option value="harvesting">Maturity / Grain Hardening / Harvesting</option>
            </select>
          </div>

          {/* Selector 3: Irrigation Availability */}
          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--gov-navy)', display: 'block', marginBottom: 6 }}>
              3. IRRIGATION SOURCE (सिंचाई स्रोत)
            </label>
            <select
              value={selectedIrrigation}
              onChange={(e) => setSelectedIrrigation(e.target.value as IrrigationSource)}
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: 8,
                border: '1px solid var(--neutral-300)',
                background: '#ffffff',
                fontSize: '0.86rem',
                fontWeight: 600,
                color: 'var(--neutral-800)',
                cursor: 'pointer'
              }}
            >
              <option value="tubewell">Borewell / Tube Well (बिजली/डीजल पंप)</option>
              <option value="canal">Canal Network (नहर)</option>
              <option value="rainfed">Rainfed / Dryland (पूर्णतः वर्षा आधारित)</option>
              <option value="drip">Drip / Sprinkler Micro-irrigation (ड्रिप/स्प्रिंकलर)</option>
            </select>
          </div>

          {/* Selector 4: Soil Type */}
          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--gov-navy)', display: 'block', marginBottom: 6 }}>
              4. SOIL TYPE (मिट्टी का प्रकार)
            </label>
            <select
              value={selectedSoil}
              onChange={(e) => setSelectedSoil(e.target.value as SoilType)}
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: 8,
                border: '1px solid var(--neutral-300)',
                background: '#ffffff',
                fontSize: '0.86rem',
                fontWeight: 600,
                color: 'var(--neutral-800)',
                cursor: 'pointer'
              }}
            >
              <option value="clayey">Clayey Loam (चिकनी दोमट - Slow Drainage)</option>
              <option value="sandy">Sandy Loam (बलुई दोमट - Fast Percolation)</option>
              <option value="alluvial">Deep Alluvial (गहरी जलोढ़ - River Plain)</option>
              <option value="lateritic">Red Lateritic (लाल लेटेराइट - Plateau Slope)</option>
            </select>
          </div>
        </div>

        {/* Dynamic Contextual Output Cards (Section 16 Specification) */}
        <div style={{
          background: '#f0fdf4',
          border: '1px solid #bbf7d0',
          borderRadius: 12,
          padding: 20
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <ShieldCheck size={22} color="#059669" />
              <div style={{ fontWeight: 800, color: '#065f46', fontSize: '1rem' }}>
                Computed Agronomic Decision Matrix
              </div>
            </div>
            <div style={{ fontSize: '0.75rem', background: '#dcfce7', color: '#166534', padding: '4px 10px', borderRadius: 20, fontWeight: 700 }}>
              Tailored for {selectedCrop.toUpperCase()} • {selectedStage.toUpperCase()}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {/* 1. Weather Risk */}
            <div style={{ background: '#ffffff', borderRadius: 10, padding: 14, border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#dc2626', marginBottom: 6 }}>
                <AlertTriangle size={16} />
                <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase' }}>Identified Weather Risk</span>
              </div>
              <p style={{ fontSize: '0.86rem', color: '#1e293b', lineHeight: 1.45, fontWeight: 600 }}>
                {advisory.weatherRisk}
              </p>
            </div>

            {/* 2. Recommended Agronomic Action */}
            <div style={{ background: '#ffffff', borderRadius: 10, padding: 14, border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#059669', marginBottom: 6 }}>
                <CheckCircle size={16} />
                <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase' }}>Recommended Field Action</span>
              </div>
              <p style={{ fontSize: '0.86rem', color: '#1e293b', lineHeight: 1.45 }}>
                {advisory.agronomicAction}
              </p>
            </div>

            {/* 3. Field Monitoring */}
            <div style={{ background: '#ffffff', borderRadius: 10, padding: 14, border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#0284c7', marginBottom: 6 }}>
                <Info size={16} />
                <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase' }}>Field Monitoring Protocol</span>
              </div>
              <p style={{ fontSize: '0.86rem', color: '#1e293b', lineHeight: 1.45 }}>
                {advisory.fieldMonitoring}
              </p>
            </div>

            {/* 4. Irrigation Strategy */}
            <div style={{ background: '#ffffff', borderRadius: 10, padding: 14, border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#0d9488', marginBottom: 6 }}>
                <Droplets size={16} />
                <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase' }}>Irrigation Dispatch</span>
              </div>
              <p style={{ fontSize: '0.86rem', color: '#1e293b', lineHeight: 1.45, fontWeight: 600 }}>
                {advisory.irrigationRecommendation}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 17: PANCHAYAT AGRICULTURAL WEATHER RISK MAP & MATRIX */}
      <div className="gov-card" style={{ marginBottom: 28 }}>
        <div className="gov-card-header">
          <div className="gov-card-title">
            <Layers size={20} color="var(--gov-navy)" />
            <span>Panchayat Risk Map Layer (Block Comparison)</span>
          </div>
          <span className="badge badge-warning">Spatial Risk Differentiation</span>
        </div>

        <p style={{ fontSize: '0.86rem', color: 'var(--neutral-600)', marginBottom: 16 }}>
          Panchayats within the same block do not share identical risk levels. Click any Panchayat below to inspect localized risk category, downscaled forecast, and operational response:
        </p>

        {/* Panchayat Selection Buttons */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 18 }}>
          {panchayatRiskProfiles.map((p) => {
            const isSelected = p.name === selectedRiskPanchayat;
            return (
              <button
                key={p.name}
                onClick={() => setSelectedRiskPanchayat(p.name)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 8,
                  border: isSelected ? '2px solid #0284c7' : '1px solid #cbd5e1',
                  background: isSelected ? '#eff6ff' : '#ffffff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  boxShadow: isSelected ? '0 2px 6px rgba(2, 132, 199, 0.15)' : 'none'
                }}
              >
                <span style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: p.riskColor
                }}></span>
                <span style={{ fontWeight: isSelected ? 800 : 600, color: isSelected ? '#1e40af' : '#334155', fontSize: '0.86rem' }}>
                  {p.name}
                </span>
                <span style={{
                  fontSize: '0.72rem',
                  padding: '2px 6px',
                  borderRadius: 10,
                  background: p.riskBg,
                  color: p.riskColor,
                  fontWeight: 700
                }}>
                  {p.riskLevel}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Panchayat Detailed Risk Card */}
        <div style={{
          background: '#f8fafc',
          borderRadius: 12,
          border: '1px solid #e2e8f0',
          padding: 20
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, flexWrap: 'wrap', gap: 10 }}>
            <div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--gov-navy)' }}>
                {activePanchayatRisk.name}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                Elevation: {activePanchayatRisk.elevation} • Primary Risk: <strong>{activePanchayatRisk.riskCategory}</strong>
              </div>
            </div>

            <div style={{
              background: activePanchayatRisk.riskBg,
              color: activePanchayatRisk.riskColor,
              border: `1px solid ${activePanchayatRisk.riskColor}`,
              padding: '6px 14px',
              borderRadius: 20,
              fontWeight: 800,
              fontSize: '0.82rem'
            }}>
              Risk Level: {activePanchayatRisk.riskLevel.toUpperCase()}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
            <div style={{ background: '#ffffff', padding: 12, borderRadius: 8, border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 700 }}>DOWNSCALED FORECAST</div>
              <div style={{ fontSize: '0.98rem', fontWeight: 800, color: '#0f172a', marginTop: 4 }}>
                {activePanchayatRisk.forecast}
              </div>
            </div>

            <div style={{ background: '#ffffff', padding: 12, borderRadius: 8, border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 700 }}>SPATIAL INFLUENCE REASON</div>
              <div style={{ fontSize: '0.85rem', color: '#334155', marginTop: 4, lineHeight: 1.4 }}>
                {activePanchayatRisk.reason}
              </div>
            </div>

            <div style={{ background: '#ffffff', padding: 12, borderRadius: 8, border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 700 }}>MANDATED ADVISORY</div>
              <div style={{ fontSize: '0.85rem', color: '#047857', marginTop: 4, lineHeight: 1.4, fontWeight: 600 }}>
                {activePanchayatRisk.recommendedAction}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Official KVK & Agricultural Disclaimer */}
      <div style={{
        padding: 16,
        background: '#f1f5f9',
        borderRadius: 8,
        border: '1px solid #cbd5e1',
        fontSize: '0.82rem',
        color: '#475569',
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }}>
        <Shield size={20} color="#64748b" style={{ flexShrink: 0 }} />
        <span>
          <strong>Agronomic Safety Assurance:</strong> GRAMCAST provides weather-derived decision boundaries. 
          Pesticide formulations, biological controls, and fertilizer recommendations must be confirmed against 
          the package label registered under the Central Insecticides Board (CIB&RC) and validated by your local block Krishi Sahayak.
        </span>
      </div>
    </div>
  );
};
