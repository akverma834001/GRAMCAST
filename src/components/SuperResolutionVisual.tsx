import React, { useState } from 'react';
import { Layers, Cpu, MapPin, Sliders, Info, ShieldCheck } from 'lucide-react';
import { Language, PanchayatData } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface SuperResolutionVisualProps {
  weather: PanchayatData;
  lang: Language;
}

export const SuperResolutionVisual: React.FC<SuperResolutionVisualProps> = ({
  weather,
  lang
}) => {
  const [resolutionMode, setResolutionMode] = useState<'block' | 'gramcast'>('gramcast');
  const t = TRANSLATIONS[lang];

  return (
    <div className="super-res-banner">
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="badge badge-navy" style={{ fontSize: '0.72rem' }}>
              Core Technical Concept
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--neutral-500)' }}>
              Physics-Guided Spatial Downscaling
            </span>
          </div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--gov-navy)', marginTop: 4 }}>
            {lang === 'hi' ? "प्रखंड पूर्वानुमान से पंचायत स्तर की समझ" : "From Block Forecast to Panchayat Intelligence"}
          </h2>
        </div>

        {/* Interactive Mode Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--neutral-100)', padding: 4, borderRadius: 8, border: '1px solid var(--neutral-300)' }}>
          <button
            onClick={() => setResolutionMode('block')}
            style={{
              padding: '6px 14px',
              borderRadius: 6,
              border: 'none',
              fontSize: '0.82rem',
              fontWeight: resolutionMode === 'block' ? 700 : 500,
              background: resolutionMode === 'block' ? '#ffffff' : 'transparent',
              color: resolutionMode === 'block' ? 'var(--gov-navy)' : 'var(--neutral-600)',
              boxShadow: resolutionMode === 'block' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}
          >
            <Layers size={14} />
            {t.blockView}
          </button>
          <button
            onClick={() => setResolutionMode('gramcast')}
            style={{
              padding: '6px 14px',
              borderRadius: 6,
              border: 'none',
              fontSize: '0.82rem',
              fontWeight: resolutionMode === 'gramcast' ? 700 : 500,
              background: resolutionMode === 'gramcast' ? 'var(--gov-navy)' : 'transparent',
              color: resolutionMode === 'gramcast' ? '#ffffff' : 'var(--neutral-600)',
              boxShadow: resolutionMode === 'gramcast' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}
          >
            <Sliders size={14} />
            {t.gramcastView}
          </button>
        </div>
      </div>

      {/* Interactive Transformation Stage Box */}
      <div className="super-res-flow">
        {/* Left: Coarse Block Forecast */}
        <div className={`res-stage-box ${resolutionMode === 'block' ? 'stage-accent' : ''}`}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--neutral-500)', textTransform: 'uppercase' }}>
              STEP 1: Input
            </span>
            <span className="badge" style={{ background: '#f1f5f9', color: '#475569', fontSize: '0.7rem' }}>
              ~12 km Coarse Grid
            </span>
          </div>
          
          <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--neutral-800)', marginBottom: 6 }}>
            {lang === 'hi' ? "प्रखंड स्तर का पूर्वानुमान" : "Block-Level Forecast"}
          </h4>
          <p style={{ fontSize: '0.82rem', color: 'var(--neutral-600)', marginBottom: 14 }}>
            {t.blockCoarseLabel}
          </p>

          {/* Coarse Grid Graphic */}
          <div style={{
            height: 140,
            background: '#e0f2fe',
            border: '2px dashed #0284c7',
            borderRadius: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: 8, left: 8, fontSize: '0.7rem', color: '#0369a1', fontWeight: 600 }}>
              Kanke Block (Uniform NWP Cell)
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0369a1' }}>
              {weather.blockForecastComparison.blockRainfallMm} mm
            </div>
            <div style={{ fontSize: '0.75rem', color: '#0284c7' }}>
              {lang === 'hi' ? "सभी पंचायतों के लिए एक समान" : "Uniform across all 24 Panchayats"}
            </div>
          </div>

          <div style={{ marginTop: 12, fontSize: '0.78rem', color: 'var(--neutral-500)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Info size={14} />
            <span>Missing micro-climatic hills, valleys, and river channels.</span>
          </div>
        </div>

        {/* Center: GRAMCAST Downscaling Engine */}
        <div className="res-stage-box" style={{ background: '#f8fafc', borderColor: '#cbd5e1', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            <div style={{
              width: 50,
              height: 50,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #0f2744, #059669)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px auto',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              <Cpu size={24} />
            </div>

            <div style={{ fontWeight: 700, color: 'var(--gov-navy)', fontSize: '0.95rem' }}>
              GRAMCAST Engine
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--agri-green-dark)', fontWeight: 600, margin: '2px 0 10px 0' }}>
              {lang === 'hi' ? "भौतिकी-निर्देशित एडाप्टिव मॉडल" : "Physics-Guided Downscaling"}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, textAlign: 'left', fontSize: '0.75rem', color: 'var(--neutral-700)', background: '#ffffff', padding: 10, borderRadius: 6, border: '1px solid var(--neutral-200)' }}>
              <div>• <strong>Terrain & Slopes:</strong> SRTM DEM (30m)</div>
              <div>• <strong>Satellite Radiance:</strong> INSAT-3DR TIR</div>
              <div>• <strong>Soil & Canopy:</strong> Sentinel-2 NDVI</div>
              <div>• <strong>Historical Bias:</strong> Local Kalman Matrix</div>
            </div>
          </div>
        </div>

        {/* Right: Panchayat Intelligence */}
        <div className={`res-stage-box ${resolutionMode === 'gramcast' ? 'stage-accent' : ''}`}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--agri-green-dark)', textTransform: 'uppercase' }}>
              STEP 2: Output
            </span>
            <span className="badge" style={{ background: '#ecfdf5', color: '#059669', fontSize: '0.7rem' }}>
              ~1 km Panchayat Intelligence
            </span>
          </div>

          <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: 6 }}>
            {weather.name} ({lang === 'hi' ? "डाउनस्केल्ड अनुमान" : t.downscaledEstimate})
          </h4>
          <p style={{ fontSize: '0.82rem', color: 'var(--neutral-600)', marginBottom: 14 }}>
            {t.gramcastFineLabel}
          </p>

          {/* Differentiated Grid Graphic */}
          <div style={{
            height: 140,
            background: 'linear-gradient(135deg, #ecfdf5 0%, #eff6ff 100%)',
            border: '2px solid #059669',
            borderRadius: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            <div style={{ position: 'absolute', top: 8, right: 8, background: '#059669', color: '#fff', fontSize: '0.65rem', fontWeight: 700, padding: '2px 6px', borderRadius: 4 }}>
              1 km resolution
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--gov-navy)' }}>
              {weather.current.rainfallExpected}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--agri-green-dark)', fontWeight: 600 }}>
              {weather.current.status}
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--neutral-600)', marginTop: 2 }}>
              Elevation: {weather.elevation}m | Risk: {weather.risks[0]?.severity || 'Low'}
            </div>
          </div>

          <div style={{ marginTop: 12, fontSize: '0.78rem', color: 'var(--neutral-700)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <ShieldCheck size={14} color="#059669" />
            <span><strong>Variance:</strong> {weather.blockForecastComparison.varianceReason}</span>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 16, padding: '10px 14px', background: '#f8fafc', borderRadius: 8, border: '1px solid var(--neutral-200)', fontSize: '0.84rem', color: 'var(--neutral-700)', display: 'flex', alignItems: 'center', gap: 8 }}>
        <MapPin size={16} color="var(--gov-navy)" />
        <span>
          <strong>Key Insight:</strong> <em>“Different Panchayats experience different local weather conditions within the same Block. GRAMCAST resolves these differences for actionable farm decisions.”</em>
        </span>
      </div>
    </div>
  );
};
