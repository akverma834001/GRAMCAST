import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  ArrowRight, 
  Layers, 
  CloudRain, 
  Thermometer, 
  Wind, 
  Droplets, 
  Compass, 
  ShieldCheck, 
  Info, 
  CheckCircle2, 
  Play, 
  RotateCcw, 
  ExternalLink,
  ChevronDown,
  HelpCircle,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { Language, LocationHierarchy, RiskSeverity } from '../types';
import { 
  BLOCK_SOURCE_FORECASTS, 
  DOWNSCALED_PANCHAYAT_RESULTS, 
  DOWNSCALING_PIPELINE_STEPS,
  DATA_SOURCES_TRANSPARENCY 
} from '../data/downscalingData';
import { TRANSLATIONS } from '../data/translations';

interface DownscaleEngineViewProps {
  currentLocation: LocationHierarchy;
  onSelectPanchayat: (name: string) => void;
  onNavigateTo: (tab: any) => void;
  lang: Language;
}

export const DownscaleEngineView: React.FC<DownscaleEngineViewProps> = ({
  currentLocation,
  onSelectPanchayat,
  onNavigateTo,
  lang
}) => {
  const t = TRANSLATIONS[lang];

  // Block selector (Default to Bodh Gaya as specified in SIH problem statement, or Kanke)
  const [selectedBlockKey, setSelectedBlockKey] = useState<string>(
    currentLocation.block === 'Kanke' ? 'Kanke' : 'Bodh Gaya'
  );

  const blockSource = BLOCK_SOURCE_FORECASTS[selectedBlockKey] || BLOCK_SOURCE_FORECASTS["Bodh Gaya"];
  const panchayatResults = DOWNSCALED_PANCHAYAT_RESULTS[selectedBlockKey] || DOWNSCALED_PANCHAYAT_RESULTS["Bodh Gaya"];

  // Processing state: 'idle' | 'running' | 'completed'
  const [executionState, setExecutionState] = useState<'idle' | 'running' | 'completed'>('completed');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(6);
  const [selectedPanchayatId, setSelectedPanchayatId] = useState<string>(panchayatResults[0]?.id || '');
  const [showConfidenceTooltip, setShowConfidenceTooltip] = useState(false);

  // Set default selected panchayat on block switch
  useEffect(() => {
    if (panchayatResults.length > 0) {
      setSelectedPanchayatId(panchayatResults[0].id);
    }
  }, [selectedBlockKey]);

  // Run downscaling animation
  const handleStartDownscaling = () => {
    setExecutionState('running');
    setCurrentStepIndex(0);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      setCurrentStepIndex(step);
      if (step >= DOWNSCALING_PIPELINE_STEPS.length) {
        clearInterval(interval);
        setExecutionState('completed');
      }
    }, 600);
  };

  const selectedPanchayat = panchayatResults.find(p => p.id === selectedPanchayatId) || panchayatResults[0];

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span className="badge badge-navy" style={{ fontSize: '0.72rem' }}>
            SIH Problem SIH26074 • Core Feature
          </span>
          <span className="badge" style={{ background: '#e0f2fe', color: '#0369a1', fontSize: '0.72rem' }}>
            Physics-Guided Adaptive Downscaling
          </span>
        </div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--gov-navy)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Cpu size={26} color="var(--gov-navy)" />
          <span>{lang === 'hi' ? "मौसम पूर्वानुमान डाउनस्केलिंग इंजन" : "Weather Forecast Downscaling Engine"}</span>
        </h1>
        <p style={{ fontSize: '0.86rem', color: 'var(--neutral-600)', maxWidth: 840, lineHeight: 1.5, marginTop: 4 }}>
          {lang === 'hi'
            ? "मोटे ब्लॉक-स्तरीय (10-12 किमी) मौसम पूर्वानुमान को सूक्ष्म-स्थलाकृति, उपग्रह प्रेक्षणों एवं वायुमंडलीय भौतिकी द्वारा उच्च-रिजॉल्यूशन ग्राम पंचायत स्तर पर परिवर्तित करें।"
            : "Transforming coarse Block-level (10–12 km) numerical forecasts into field-calibrated Panchayat-level intelligence through digital elevation modeling, surface roughness, and physics-guided atmospheric constraints."}
        </p>
      </div>

      {/* Block Demonstration Selector Bar */}
      <div className="gov-card" style={{ padding: '14px 20px', marginBottom: 24, background: '#f8fafc', border: '1px solid var(--neutral-300)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--gov-navy)' }}>
              {lang === 'hi' ? "प्रदर्शन ब्लॉक चुनें:" : "Select Demonstration Block:"}
            </span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                className={`btn btn-sm ${selectedBlockKey === 'Bodh Gaya' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setSelectedBlockKey('Bodh Gaya')}
                style={{ fontWeight: 600, fontSize: '0.8rem' }}
              >
                Bodh Gaya Block (Bihar)
              </button>
              <button
                className={`btn btn-sm ${selectedBlockKey === 'Kanke' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setSelectedBlockKey('Kanke')}
                style={{ fontWeight: 600, fontSize: '0.8rem' }}
              >
                Kanke Block (Jharkhand)
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              className="btn btn-primary"
              onClick={handleStartDownscaling}
              disabled={executionState === 'running'}
              style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', fontWeight: 700 }}
            >
              {executionState === 'running' ? (
                <>
                  <span className="spinner" style={{ width: 16, height: 16, border: '2px solid #fff', borderTopColor: 'transparent', borderRadius: '50%', display: 'inline-block', animation: 'spin 1s linear infinite' }}></span>
                  <span>{lang === 'hi' ? "डाउनस्केलिंग जारी..." : "Executing Downscaling..."}</span>
                </>
              ) : (
                <>
                  <Play size={16} />
                  <span>{lang === 'hi' ? "पंचायत पूर्वानुमान डाउनस्केल करें" : "Downscale Block Forecast"}</span>
                </>
              )}
            </button>
            {executionState === 'completed' && (
              <button
                className="btn btn-secondary btn-sm"
                onClick={handleStartDownscaling}
                title="Rerun sequence"
              >
                <RotateCcw size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* SECTION 5: Original Block Forecast (Source Forecast) */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="badge" style={{ background: '#fef3c7', color: '#92400e', fontWeight: 700, fontSize: '0.72rem', border: '1px solid #fde68a' }}>
              SOURCE FORECAST (BEFORE DOWNSCALING)
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--neutral-500)' }}>
              Spatial Resolution: <strong>{blockSource.spatialResolution}</strong>
            </span>
          </div>
          <span style={{ fontSize: '0.76rem', color: 'var(--neutral-500)' }}>
            Model: {blockSource.modelName} • {blockSource.bulletinTime}
          </span>
        </div>

        <div 
          className="gov-card" 
          style={{ 
            padding: 20, 
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', 
            color: '#ffffff',
            border: '2px dashed #475569'
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 16, borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: 12 }}>
            <div>
              <div style={{ fontSize: '0.76rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Coarse Numerical Weather Prediction Grid Cell
              </div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc', marginTop: 2 }}>
                {blockSource.blockName} Block ({blockSource.district}, {blockSource.state})
              </h2>
            </div>
            <div style={{ background: 'rgba(239, 68, 68, 0.2)', border: '1px solid #ef4444', padding: '6px 12px', borderRadius: 6, fontSize: '0.78rem', color: '#fca5a5' }}>
              ⚠️ Single uniform value across all Panchayats in block before downscaling
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16 }}>
            <div style={{ background: 'rgba(255,255,255,0.06)', padding: 12, borderRadius: 8 }}>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 6 }}>
                <CloudRain size={14} color="#38bdf8" />
                Rainfall Mean
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#38bdf8', marginTop: 4 }}>
                {blockSource.rainfallMm} mm
              </div>
              <div style={{ fontSize: '0.72rem', color: '#cbd5e1' }}>
                Uniform block baseline
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.06)', padding: 12, borderRadius: 8 }}>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Thermometer size={14} color="#f97316" />
                Temperature
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f97316', marginTop: 4 }}>
                {blockSource.tempC}°C
              </div>
              <div style={{ fontSize: '0.72rem', color: '#cbd5e1' }}>
                Area-averaged ambient
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.06)', padding: 12, borderRadius: 8 }}>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Droplets size={14} color="#34d399" />
                Humidity
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#34d399', marginTop: 4 }}>
                {blockSource.humidity}%
              </div>
              <div style={{ fontSize: '0.72rem', color: '#cbd5e1' }}>
                Synoptic surface moisture
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.06)', padding: 12, borderRadius: 8 }}>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Wind size={14} color="#cbd5e1" />
                Wind Speed
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', marginTop: 4 }}>
                {blockSource.windSpeedKmH} km/h
              </div>
              <div style={{ fontSize: '0.72rem', color: '#cbd5e1' }}>
                Regional gradient flow
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.06)', padding: 12, borderRadius: 8 }}>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Compass size={14} color="#a78bfa" />
                Rain Probability
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#a78bfa', marginTop: 4 }}>
                {blockSource.rainProb}%
              </div>
              <div style={{ fontSize: '0.72rem', color: '#cbd5e1' }}>
                Coarse probability density
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 6: The Downscaling Engine Architecture & Inputs */}
      <div className="gov-card" style={{ marginBottom: 24 }}>
        <div className="gov-card-header">
          <div className="gov-card-title">
            <Layers size={20} color="var(--gov-navy)" />
            <span>{lang === 'hi' ? "डाउनस्केलिंग इंजन इनपुट मैट्रिक्स" : "Downscaling Engine Input Matrix"}</span>
          </div>
          <span className="badge badge-navy" style={{ fontSize: '0.7rem' }}>
            Multi-Source Fusion (NWP + DEM + Multispectral)
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 16 }}>
          {/* Meteorological Inputs */}
          <div style={{ background: '#f8fafc', padding: 14, borderRadius: 8, border: '1px solid var(--neutral-200)' }}>
            <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0369a1', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              <CloudRain size={16} />
              1. Meteorological Inputs
            </h4>
            <ul style={{ fontSize: '0.78rem', color: 'var(--neutral-700)', paddingLeft: 18, lineHeight: 1.6, margin: 0 }}>
              <li><strong>Coarse NWP Rain:</strong> 12 km grid accumulation</li>
              <li><strong>Surface Temp & Dew Point:</strong> T2M and TD2M profiles</li>
              <li><strong>Relative Humidity:</strong> Columnar vapor pressure</li>
              <li><strong>Wind Vectors:</strong> U10 & V10 directional sheer</li>
              <li><strong>Surface Pressure:</strong> 1005 hPa barometric isobar</li>
            </ul>
            <div style={{ marginTop: 8, fontSize: '0.7rem', color: '#059669', fontWeight: 600 }}>
              Status: Operational Demonstration Ingest
            </div>
          </div>

          {/* Spatial & Environmental Inputs */}
          <div style={{ background: '#f8fafc', padding: 14, borderRadius: 8, border: '1px solid var(--neutral-200)' }}>
            <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#059669', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              <Compass size={16} />
              2. Spatial & Terrain Inputs
            </h4>
            <ul style={{ fontSize: '0.78rem', color: 'var(--neutral-700)', paddingLeft: 18, lineHeight: 1.6, margin: 0 }}>
              <li><strong>SRTM DEM:</strong> 30m Digital Elevation Model</li>
              <li><strong>Slope Gradient & Aspect:</strong> Sun-facing windward angles</li>
              <li><strong>Sentinel-2 NDVI:</strong> Vegetative transpiration index</li>
              <li><strong>Hydrography:</strong> Distance to rivers & water reservoirs</li>
              <li><strong>Soil Texture:</strong> Clay, loam & red laterite permeability</li>
            </ul>
            <div style={{ marginTop: 8, fontSize: '0.7rem', color: '#059669', fontWeight: 600 }}>
              Status: High-Resolution Spatial Grids Active
            </div>
          </div>

          {/* Historical Climatology & Calibration */}
          <div style={{ background: '#f8fafc', padding: 14, borderRadius: 8, border: '1px solid var(--neutral-200)' }}>
            <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#7c3aed', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              <ShieldCheck size={16} />
              3. Historical Bias Calibration
            </h4>
            <ul style={{ fontSize: '0.78rem', color: 'var(--neutral-700)', paddingLeft: 18, lineHeight: 1.6, margin: 0 }}>
              <li><strong>10-Year Climatology:</strong> Micro-basin rainfall anomalies</li>
              <li><strong>IMD AWS Telemetry:</strong> Ground gauge ground-truth error matrix</li>
              <li><strong>Lapse Rate Adaptation:</strong> Dynamic adiabatic cooling adjustment</li>
              <li><strong>Runoff Retention:</strong> Soil moisture saturation index</li>
              <li><strong>Uncertainty Calibration:</strong> Empirical residual bounds</li>
            </ul>
            <div style={{ marginTop: 8, fontSize: '0.7rem', color: '#059669', fontWeight: 600 }}>
              Status: Physics-Constrained Calibration
            </div>
          </div>
        </div>

        {/* SECTION 7: Downscaling Processing Pipeline Animation */}
        <div style={{ background: '#0f172a', padding: 18, borderRadius: 10, color: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="spinner" style={{ width: 10, height: 10, borderRadius: '50%', background: '#38bdf8' }}></span>
              <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#f8fafc' }}>
                {lang === 'hi' ? "डाउनस्केलिंग प्रक्रिया क्रम" : "GRAMCAST Downscaling Execution Trace"}
              </span>
            </div>
            <span style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
              {executionState === 'running' 
                ? `Processing Step ${currentStepIndex + 1} of ${DOWNSCALING_PIPELINE_STEPS.length}` 
                : "All 6 Downscaling Stages Complete ✓"}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {DOWNSCALING_PIPELINE_STEPS.map((step, idx) => {
              const isPast = currentStepIndex > idx;
              const isCurrent = currentStepIndex === idx;

              return (
                <div 
                  key={step.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: 6,
                    background: isCurrent ? 'rgba(56, 189, 248, 0.15)' : isPast ? 'rgba(255,255,255,0.04)' : 'transparent',
                    border: isCurrent ? '1px solid #38bdf8' : '1px solid rgba(255,255,255,0.08)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      background: isPast ? '#059669' : isCurrent ? '#0284c7' : '#334155',
                      color: '#ffffff'
                    }}>
                      {isPast ? '✓' : idx + 1}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 600, color: isCurrent ? '#38bdf8' : isPast ? '#f1f5f9' : '#94a3b8' }}>
                        {lang === 'hi' ? step.hindiTitle : step.title}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: isCurrent ? '#cbd5e1' : '#64748b' }}>
                        {lang === 'hi' ? step.hindiDetail : step.detail}
                      </div>
                    </div>
                  </div>

                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: isPast ? '#34d399' : isCurrent ? '#38bdf8' : '#64748b' }}>
                    {isPast ? 'DONE ✓' : isCurrent ? 'COMPUTING...' : 'QUEUED'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* SECTION 8: Panchayat-Level Output (Downscaled Forecast Table & Details) */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="badge badge-low" style={{ fontWeight: 800, fontSize: '0.72rem' }}>
                GRAMCAST DOWNSCALED FORECAST (OUTPUT)
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--neutral-500)' }}>
                Spatial Resolution: <strong>Panchayat Level (1 km Grid)</strong>
              </span>
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--gov-navy)', marginTop: 2 }}>
              {lang === 'hi' 
                ? `${blockSource.blockName} प्रखंड की विभिन्न पंचायतों का स्थानीयकृत पूर्वानुमान` 
                : `Localized Panchayat Forecasts in ${blockSource.blockName} Block`}
            </h3>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--neutral-500)' }}>
            Notice variations across same Block (Source: {blockSource.rainfallMm} mm)
          </span>
        </div>

        {/* Comparison Table */}
        <div className="gov-card" style={{ padding: 0, overflow: 'hidden', marginBottom: 20 }}>
          <div style={{ overflowX: 'auto' }}>
            <table className="gov-table" style={{ margin: 0 }}>
              <thead>
                <tr>
                  <th>Gram Panchayat</th>
                  <th>Elevation</th>
                  <th>Downscaled Rain</th>
                  <th>Uncertainty</th>
                  <th>Variance vs Block</th>
                  <th>Temperature</th>
                  <th>Humidity</th>
                  <th>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <span>Confidence</span>
                      <button
                        onClick={() => setShowConfidenceTooltip(!showConfidenceTooltip)}
                        style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0, color: 'var(--neutral-400)' }}
                        title="What is confidence?"
                      >
                        <HelpCircle size={14} />
                      </button>
                    </div>
                  </th>
                  <th>Risk Level</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {panchayatResults.map((p) => {
                  const isSelected = p.id === selectedPanchayatId;
                  return (
                    <tr 
                      key={p.id}
                      style={{
                        background: isSelected ? '#f0fdf4' : 'transparent',
                        cursor: 'pointer'
                      }}
                      onClick={() => setSelectedPanchayatId(p.id)}
                    >
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          {p.imageUrl && (
                            <img 
                              src={p.imageUrl} 
                              alt={p.name} 
                              style={{ width: 36, height: 28, borderRadius: 4, objectFit: 'cover' }} 
                            />
                          )}
                          <div>
                            <span style={{ fontWeight: 700, color: 'var(--gov-navy)' }}>{p.name}</span>
                            <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--neutral-500)' }}>
                              {p.hindiName}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td style={{ fontSize: '0.82rem' }}>{p.elevationM} m</td>
                      <td>
                        <span style={{ fontSize: '1.05rem', fontWeight: 800, color: p.rainfallMm > blockSource.rainfallMm ? '#0284c7' : 'var(--gov-navy)' }}>
                          {p.rainfallMm} mm
                        </span>
                      </td>
                      <td style={{ fontSize: '0.8rem', color: 'var(--neutral-600)' }}>
                        ±{p.rainfallUncertaintyMm} mm
                      </td>
                      <td>
                        <span 
                          style={{ 
                            fontWeight: 700, 
                            fontSize: '0.82rem',
                            color: p.deltaRainMm > 0 ? '#0284c7' : p.deltaRainMm < 0 ? '#ea580c' : 'var(--neutral-600)' 
                          }}
                        >
                          {p.deltaRainMm > 0 ? `+${p.deltaRainMm} mm` : `${p.deltaRainMm} mm`}
                        </span>
                      </td>
                      <td style={{ fontSize: '0.84rem' }}>{p.tempC}°C</td>
                      <td style={{ fontSize: '0.84rem' }}>{p.humidity}%</td>
                      <td>
                        <span style={{ fontWeight: 700, color: '#059669', fontSize: '0.84rem' }}>
                          {p.confidencePct}%
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${p.riskLevel === 'High' ? 'badge-high' : p.riskLevel === 'Moderate' ? 'badge-moderate' : 'badge-low'}`}>
                          {p.riskLevel}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn btn-secondary btn-sm"
                          style={{ padding: '4px 8px', fontSize: '0.72rem' }}
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectPanchayat(p.name);
                            onNavigateTo('panchayat');
                          }}
                        >
                          Inspect
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Uncertainty Tooltip Box */}
          {showConfidenceTooltip && (
            <div style={{ background: '#f8fafc', padding: 12, borderTop: '1px solid var(--neutral-200)', fontSize: '0.78rem', color: 'var(--neutral-600)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Info size={16} color="#0284c7" style={{ flexShrink: 0 }} />
              <span>
                <strong>Confidence & Uncertainty Explanation:</strong> Confidence represents model certainty based on available input data and historical agreement. It is not a guarantee of observed weather. In this prototype, values demonstrate physics-guided calibration intervals.
              </span>
            </div>
          )}
        </div>

        {/* SECTION 10: Spatial Difference View ("Why are Panchayat forecasts different?") */}
        <div className="gov-card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, borderBottom: '1px solid var(--neutral-200)', paddingBottom: 10 }}>
            <div>
              <div style={{ fontSize: '0.74rem', color: 'var(--neutral-500)', textTransform: 'uppercase' }}>
                Explainable AI & Physics Inspection
              </div>
              <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--gov-navy)' }}>
                {lang === 'hi' 
                  ? `क्यों ${selectedPanchayat.name} का पूर्वानुमान ब्लॉक से अलग है?` 
                  : `Why is ${selectedPanchayat.name}'s Forecast Different from the Block?`}
              </h4>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: selectedPanchayat.rainfallMm > blockSource.rainfallMm ? '#0284c7' : 'var(--gov-navy)' }}>
                {selectedPanchayat.rainfallMm} ± {selectedPanchayat.rainfallUncertaintyMm} mm
              </span>
              <span style={{ display: 'block', fontSize: '0.74rem', color: 'var(--neutral-500)' }}>
                Block baseline: {blockSource.rainfallMm} mm ({selectedPanchayat.deltaRainMm > 0 ? `+${selectedPanchayat.deltaRainMm} mm` : `${selectedPanchayat.deltaRainMm} mm`})
              </span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14, marginBottom: 16 }}>
            {selectedPanchayat.spatialFactors.map((factor, fIdx) => (
              <div 
                key={fIdx}
                style={{ 
                  background: 'var(--neutral-50)', 
                  padding: 12, 
                  borderRadius: 8, 
                  border: '1px solid var(--neutral-200)' 
                }}
              >
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: 4 }}>
                  {lang === 'hi' ? factor.hindiName : factor.name}
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--neutral-600)', lineHeight: 1.45, margin: 0 }}>
                  {lang === 'hi' ? factor.hindiImpact : factor.impact}
                </p>
              </div>
            ))}
          </div>

          {/* Localized Agricultural Recommendation Generated from this downscaling */}
          <div style={{ background: '#f0fdf4', padding: 14, borderRadius: 8, border: '1px solid #bbf7d0', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
            <div style={{ flex: 1, minWidth: 280 }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#166534', textTransform: 'uppercase', marginBottom: 2 }}>
                Agro-Meteorological Advisory Derived From Downscaled Output:
              </div>
              <div style={{ fontSize: '0.84rem', color: '#14532d', fontWeight: 500 }}>
                {lang === 'hi' ? selectedPanchayat.hindiAdvisorySummary : selectedPanchayat.advisorySummary}
              </div>
            </div>

            <button
              className="btn btn-primary btn-sm"
              onClick={() => {
                onSelectPanchayat(selectedPanchayat.name);
                onNavigateTo('advisory');
              }}
              style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}
            >
              <span>{lang === 'hi' ? "विस्तृत कृषि सलाह देखें" : "Generate Crop Advisory"}</span>
              <ExternalLink size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 20: Data Transparency Notice */}
      <div style={{ background: '#f8fafc', padding: 14, borderRadius: 8, border: '1px solid var(--neutral-200)', fontSize: '0.76rem', color: 'var(--neutral-500)', lineHeight: 1.5 }}>
        <strong>Data Transparency & Scientific Integrity Notice:</strong> GRAMCAST demonstrates physics-guided spatial downscaling for SIH problem statement SIH26074. The original block forecasts and downscaled values displayed are based on calibrated regional benchmarks and historical simulation to prove system architecture and feasibility without relying on unstable external APIs.
      </div>
    </div>
  );
};
