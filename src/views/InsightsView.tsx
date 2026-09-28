import React from 'react';
import { 
  Fingerprint, 
  Cpu, 
  Compass, 
  TrendingUp, 
  Mountain, 
  TreePine, 
  Satellite,
  ShieldCheck,
  Database,
  Layers,
  Activity,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { PanchayatData, Language } from '../types';
import { SuperResolutionVisual } from '../components/SuperResolutionVisual';
import { DATA_SOURCES_TRANSPARENCY } from '../data/downscalingData';

interface InsightsViewProps {
  weather: PanchayatData;
  lang: Language;
}

export const InsightsView: React.FC<InsightsViewProps> = ({ weather, lang }) => {
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      {/* Page Header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <div style={{
            background: 'linear-gradient(135deg, #1e3a8a 0%, #0369a1 100%)',
            color: '#fff',
            padding: '6px 10px',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }}>
            <Cpu size={20} />
            <span style={{ fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.04em' }}>SIH26074 METHODOLOGY</span>
          </div>
          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Technical & Research Documentation</span>
        </div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--gov-navy)' }}>
          {lang === 'hi' ? "डेटा, पद्धति व तकनीकी वास्तुकला" : "Data, Methodology & Technical Architecture"}
        </h1>
        <p style={{ fontSize: '0.86rem', color: 'var(--neutral-600)' }}>
          Physics-guided adaptive spatial downscaling pipeline transforming coarse Block-level NWP models into 1 km Panchayat intelligence.
        </p>
      </div>

      {/* SECTION 19: TECHNICAL VIEW SPECIFICATION CARD */}
      <div className="gov-card" style={{ marginBottom: 28 }}>
        <div className="gov-card-header">
          <div className="gov-card-title">
            <Cpu size={20} color="var(--gov-navy)" />
            <span>Downscaling Engine Architecture & Formulation</span>
          </div>
          <span className="badge badge-navy">Physics-Guided ML</span>
        </div>

        {/* Resolution Transformation Bar */}
        <div style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          color: '#ffffff',
          borderRadius: 12,
          padding: 20,
          marginBottom: 20
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, alignItems: 'center' }}>
            <div style={{ textAlign: 'center', padding: 12, background: 'rgba(255,255,255,0.06)', borderRadius: 8 }}>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>INPUT RESOLUTION</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f59e0b', marginTop: 4 }}>Block Level (~12 km)</div>
              <div style={{ fontSize: '0.76rem', color: '#cbd5e1' }}>Coarse NWP GFS / NCUM Grid</div>
            </div>

            <div style={{ textAlign: 'center', color: '#38bdf8', fontWeight: 800, fontSize: '1.4rem' }}>
              ──► ⚡ Downscaling Engine ──►
            </div>

            <div style={{ textAlign: 'center', padding: 12, background: 'rgba(255,255,255,0.06)', borderRadius: 8 }}>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>OUTPUT RESOLUTION</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#10b981', marginTop: 4 }}>Panchayat (~1 km)</div>
              <div style={{ fontSize: '0.76rem', color: '#cbd5e1' }}>Field-scale micro-catchments</div>
            </div>
          </div>
        </div>

        {/* Predictor Categories (Section 6 & 19) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 20 }}>
          {/* 1. Meteorological Inputs */}
          <div style={{ padding: 16, background: 'var(--neutral-50)', borderRadius: 10, border: '1px solid var(--neutral-200)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#0284c7', marginBottom: 8 }}>
              <Activity size={18} />
              <strong style={{ fontSize: '0.9rem', color: 'var(--gov-navy)' }}>1. Meteorological Predictors</strong>
            </div>
            <ul style={{ fontSize: '0.82rem', color: '#334155', paddingLeft: 18, lineHeight: 1.6, margin: 0 }}>
              <li>Rainfall accumulation (mm)</li>
              <li>Surface 2m temperature (°C)</li>
              <li>Relative humidity & dew point (%)</li>
              <li>10m Wind speed & wind vectors (u, v)</li>
              <li>Mean sea-level pressure (MSLP)</li>
            </ul>
          </div>

          {/* 2. Spatial Predictors */}
          <div style={{ padding: 16, background: 'var(--neutral-50)', borderRadius: 10, border: '1px solid var(--neutral-200)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#059669', marginBottom: 8 }}>
              <Mountain size={18} />
              <strong style={{ fontSize: '0.9rem', color: 'var(--gov-navy)' }}>2. Spatial & Environmental</strong>
            </div>
            <ul style={{ fontSize: '0.82rem', color: '#334155', paddingLeft: 18, lineHeight: 1.6, margin: 0 }}>
              <li>SRTM 30m Digital Elevation Model (DEM)</li>
              <li>Terrain slope, aspect & ridge curvature</li>
              <li>Sentinel-2 10m NDVI canopy density</li>
              <li>HydroSHEDS drainage basin flow network</li>
              <li>Land-use / Land-cover (LULC) classification</li>
            </ul>
          </div>

          {/* 3. Physics Constraints */}
          <div style={{ padding: 16, background: 'var(--neutral-50)', borderRadius: 10, border: '1px solid var(--neutral-200)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#d97706', marginBottom: 8 }}>
              <ShieldCheck size={18} />
              <strong style={{ fontSize: '0.9rem', color: 'var(--gov-navy)' }}>3. Physics-Guided Constraints</strong>
            </div>
            <ul style={{ fontSize: '0.82rem', color: '#334155', paddingLeft: 18, lineHeight: 1.6, margin: 0 }}>
              <li>Orographic uplift & adiabatic cooling (6.5°C/km)</li>
              <li>Mass conservation across coarse block cell boundary</li>
              <li>Thermal inertia of water bodies & vegetative canopies</li>
              <li>Gravity-driven cold air drainage pooling</li>
              <li>Valley wind convergence & funneling effects</li>
            </ul>
          </div>

          {/* 4. Historical Climatology */}
          <div style={{ padding: 16, background: 'var(--neutral-50)', borderRadius: 10, border: '1px solid var(--neutral-200)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#7c3aed', marginBottom: 8 }}>
              <Compass size={18} />
              <strong style={{ fontSize: '0.9rem', color: 'var(--gov-navy)' }}>4. Climatological Bias Correction</strong>
            </div>
            <ul style={{ fontSize: '0.82rem', color: '#334155', paddingLeft: 18, lineHeight: 1.6, margin: 0 }}>
              <li>10-year IMD gridded seasonal rainfall distribution</li>
              <li>Local telemetry weather station residual calibration</li>
              <li>Diurnal convective thunderstorm timing index</li>
              <li>Kalman-filter recursive bias estimation</li>
              <li>Probabilistic quantile mapping for extreme rain events</li>
            </ul>
          </div>
        </div>

        {/* Explainability Note */}
        <div style={{ padding: 14, background: '#eff6ff', borderRadius: 8, border: '1px solid #bfdbfe', fontSize: '0.85rem', color: '#1e3a8a', lineHeight: 1.5 }}>
          <strong>Downscaling Principle:</strong> Instead of generic spatial interpolation (such as nearest-neighbor or bilinear), GRAMCAST uses 
          physics-guided super-resolution where local topography, vegetative boundary-layer transpiration, and orographic lifting 
          strictly constrain precipitation distribution while preserving the total moisture budget of the source Block forecast.
        </div>
      </div>

      {/* SECTION 20: DATA TRANSPARENCY MATRIX */}
      <div className="gov-card" style={{ marginBottom: 28 }}>
        <div className="gov-card-header">
          <div className="gov-card-title">
            <Database size={20} color="var(--gov-navy)" />
            <span>Data Sources Transparency Matrix (Fidelity Audit)</span>
          </div>
          <span className="badge badge-low">Operational Transparency</span>
        </div>

        <p style={{ fontSize: '0.86rem', color: 'var(--neutral-600)', marginBottom: 16 }}>
          In accordance with scientific and hackathon integrity guidelines, GRAMCAST clearly categorizes the origin, resolution, and operational status of all data pipelines:
        </p>

        <div style={{ overflowX: 'auto' }}>
          <table className="gov-table" style={{ width: '100%', fontSize: '0.84rem' }}>
            <thead>
              <tr>
                <th>Category</th>
                <th>Dataset Name</th>
                <th>Source Provider</th>
                <th>Resolution</th>
                <th>Fidelity Status</th>
                <th>Operational Role</th>
              </tr>
            </thead>
            <tbody>
              {DATA_SOURCES_TRANSPARENCY.map((item, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 700, color: 'var(--gov-navy)' }}>{item.category}</td>
                  <td style={{ fontWeight: 600 }}>{item.name}</td>
                  <td style={{ color: '#475569' }}>{item.provider}</td>
                  <td>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: 4,
                      background: '#f1f5f9',
                      color: '#334155',
                      fontWeight: 600,
                      fontSize: '0.76rem'
                    }}>
                      {item.nominalResolution}
                    </span>
                  </td>
                  <td>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: 12,
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      background: item.status.includes('Live') ? '#ecfdf5' : '#eff6ff',
                      color: item.status.includes('Live') ? '#059669' : '#1d4ed8',
                      border: `1px solid ${item.status.includes('Live') ? '#a7f3d0' : '#bfdbfe'}`
                    }}>
                      {item.status}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.8rem', color: '#64748b' }}>{item.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: 14, padding: 12, background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: '0.8rem', color: '#475569', display: 'flex', alignItems: 'center', gap: 8 }}>
          <AlertCircle size={16} color="#64748b" style={{ flexShrink: 0 }} />
          <span>
            <strong>Integrity Notice:</strong> The prototype runs on calibrated historical simulations matching real geographical coordinates of Bodh Gaya and Kanke blocks. It does not fabricate operational live API connections.
          </span>
        </div>
      </div>

      {/* Visual Downscaling Component */}
      <SuperResolutionVisual weather={weather} lang={lang} />

      {/* Panchayat Weather Fingerprint */}
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
    </div>
  );
};
