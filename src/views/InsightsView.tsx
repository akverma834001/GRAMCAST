import React from 'react';
import { 
  Fingerprint, 
  Cpu, 
  Compass, 
  TrendingUp, 
  Mountain, 
  TreePine, 
  Satellite 
} from 'lucide-react';
import { PanchayatData, Language } from '../types';
import { SuperResolutionVisual } from '../components/SuperResolutionVisual';

interface InsightsViewProps {
  weather: PanchayatData;
  lang: Language;
}

export const InsightsView: React.FC<InsightsViewProps> = ({ weather, lang }) => {

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--gov-navy)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Fingerprint size={24} color="var(--gov-navy)" />
          <span>{lang === 'hi' ? "पंचायत फिंगरप्रिंट व डाउनस्केलिंग इनसाइट्स" : "Panchayat Fingerprint & Downscaling Insights"}</span>
        </h1>
        <p style={{ fontSize: '0.84rem', color: 'var(--neutral-500)' }}>
          {weather.name} • Physics-Guided Adaptive Weather Super-Resolution
        </p>
      </div>

      {/* Super-Resolution Visual Component */}
      <SuperResolutionVisual weather={weather} lang={lang} />

      {/* SECTION 15: Detailed Panchayat Weather Fingerprint */}
      <div className="gov-card" style={{ marginBottom: 28 }}>
        <div className="gov-card-header">
          <div className="gov-card-title">
            <Fingerprint size={20} color="var(--gov-navy)" />
            <span>Panchayat Weather Fingerprint ({weather.name})</span>
          </div>
          <span className="badge badge-navy">Local Terrain Calibration</span>
        </div>

        <p style={{ fontSize: '0.88rem', color: 'var(--neutral-600)', marginBottom: 20, lineHeight: 1.5 }}>
          Every Panchayat possesses a unique topographical and microclimatic identity. GRAMCAST computes a 
          <strong> Weather Fingerprint</strong> to capture local drainage channels, elevation, canopy transpiration, 
          and historical bias.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginBottom: 20 }}>
          {/* 1. Rainfall Pattern */}
          <div style={{ padding: 16, background: 'var(--neutral-50)', borderRadius: 10, border: '1px solid var(--neutral-200)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#0284c7', marginBottom: 6 }}>
              <TrendingUp size={18} />
              <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>Rainfall Behavior</span>
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--neutral-900)' }}>
              {lang === 'hi' ? weather.fingerprint.hindiRainfallPattern : weather.fingerprint.rainfallPattern}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--neutral-600)', marginTop: 4 }}>
              Orographic enhancement from plateau rim
            </div>
          </div>

          {/* 2. Terrain & Elevation */}
          <div style={{ padding: 16, background: 'var(--neutral-50)', borderRadius: 10, border: '1px solid var(--neutral-200)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#059669', marginBottom: 6 }}>
              <Mountain size={18} />
              <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>Elevation & Relief</span>
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--neutral-900)' }}>
              {weather.elevation} meters ASL
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--neutral-600)', marginTop: 4 }}>
              {lang === 'hi' ? weather.fingerprint.hindiTerrain : weather.fingerprint.terrain}
            </div>
          </div>

          {/* 3. Vegetation & NDVI */}
          <div style={{ padding: 16, background: 'var(--neutral-50)', borderRadius: 10, border: '1px solid var(--neutral-200)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#16a34a', marginBottom: 6 }}>
              <TreePine size={18} />
              <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>Canopy & Soil</span>
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--neutral-900)' }}>
              {lang === 'hi' ? weather.fingerprint.hindiVegetation : weather.fingerprint.vegetation}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--neutral-600)', marginTop: 4 }}>
              Active boundary layer transpiration
            </div>
          </div>

          {/* 4. Seasonality & Historical Bias */}
          <div style={{ padding: 16, background: 'var(--neutral-50)', borderRadius: 10, border: '1px solid var(--neutral-200)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#d97706', marginBottom: 6 }}>
              <Compass size={18} />
              <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>Historical Model Bias</span>
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--neutral-900)' }}>
              {weather.fingerprint.historicalBias}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--neutral-600)', marginTop: 4 }}>
              {lang === 'hi' ? weather.fingerprint.hindiSeasonality : weather.fingerprint.seasonality}
            </div>
          </div>
        </div>

        <div style={{ padding: 14, background: '#eff6ff', borderRadius: 8, border: '1px solid #bfdbfe', fontSize: '0.88rem', color: '#1e3a8a', lineHeight: 1.5 }}>
          <strong>Why this Fingerprint matters:</strong> {lang === 'hi' ? weather.fingerprint.hindiWhyItMatters : weather.fingerprint.whyItMatters}
        </div>
      </div>

      {/* Physics-Guided Downscaling Engine Architecture */}
      <div className="gov-card" style={{ marginBottom: 28 }}>
        <div className="gov-card-header">
          <div className="gov-card-title">
            <Cpu size={20} color="var(--gov-navy)" />
            <span>Downscaling Methodology (Under The Hood)</span>
          </div>
          <span className="badge badge-low">Physics + Data Fusion</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          <div style={{ padding: 14, background: 'var(--neutral-50)', borderRadius: 8, border: '1px solid var(--neutral-200)' }}>
            <div style={{ fontWeight: 700, color: 'var(--gov-navy)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Satellite size={16} color="#0284c7" />
              <span>1. Satellite & Radar Observables</span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--neutral-700)', lineHeight: 1.45 }}>
              Combines INSAT-3DR Thermal Infrared (TIR1/TIR2) cloud top temperature with Doppler weather radar reflectivity for real-time convective development.
            </p>
          </div>

          <div style={{ padding: 14, background: 'var(--neutral-50)', borderRadius: 8, border: '1px solid var(--neutral-200)' }}>
            <div style={{ fontWeight: 700, color: 'var(--gov-navy)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Mountain size={16} color="#059669" />
              <span>2. High-Resolution Digital Elevation</span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--neutral-700)', lineHeight: 1.45 }}>
              Incorporates SRTM 30m terrain elevation to model adiabatic cooling, valley wind funneling, and orographic precipitation enhancement across plateau slopes.
            </p>
          </div>

          <div style={{ padding: 14, background: 'var(--neutral-50)', borderRadius: 8, border: '1px solid var(--neutral-200)' }}>
            <div style={{ fontWeight: 700, color: 'var(--gov-navy)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Cpu size={16} color="#d97706" />
              <span>3. Adaptive Error Kalman Filter</span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--neutral-700)', lineHeight: 1.45 }}>
              Compares past cycle predictions against ground observations to identify systematic diurnal biases and self-adjusts parameters for subsequent forecast cycles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
