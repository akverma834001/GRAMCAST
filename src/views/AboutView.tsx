import React from 'react';
import { 
  HelpCircle, 
  ShieldAlert,
  ArrowDown,
  Layers,
  CheckCircle2,
  Cpu,
  Sprout,
  Target,
  Sparkles,
  Info
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface AboutViewProps {
  lang: Language;
}

export const AboutView: React.FC<AboutViewProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];

  return (
    <div style={{ maxWidth: 960, margin: '0 auto' }}>
      {/* Page Title */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <span style={{ background: '#0284c7', color: '#fff', fontSize: '0.74rem', padding: '3px 8px', borderRadius: 4, fontWeight: 700 }}>
            SIH 2026 — PROBLEM STATEMENT SIH26074
          </span>
          <span style={{ fontSize: '0.82rem', color: '#64748b' }}>Ministry of Earth Sciences / Agriculture</span>
        </div>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--gov-navy)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <HelpCircle size={26} color="var(--gov-navy)" />
          <span>{lang === 'hi' ? "ग्रामकास्ट के बारे में (About GRAMCAST)" : "About GRAMCAST"}</span>
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--neutral-500)' }}>
          Block-level forecasts. Panchayat-level intelligence. • Weather Forecast Downscaling System
        </p>
      </div>

      {/* CORE STATEMENT CARD (Prompt Section 30) */}
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)',
        color: '#ffffff',
        borderRadius: 14,
        padding: 24,
        marginBottom: 24,
        border: '1px solid rgba(56, 189, 248, 0.3)',
        boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.3)'
      }}>
        <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#38bdf8', fontWeight: 700, marginBottom: 8 }}>
          CORE MANDATE STATEMENT
        </div>
        <p style={{ fontSize: '1.12rem', fontWeight: 600, lineHeight: 1.6, color: '#f8fafc', margin: 0 }}>
          “GRAMCAST transforms coarse Block-level weather forecasts into high-resolution Panchayat-level weather intelligence using physics-guided spatial downscaling, enabling localized agro-meteorological advisory services.”
        </p>
      </div>

      {/* SECTION 27: ONE CRITICAL VISUAL STORY */}
      <div className="gov-card" style={{ marginBottom: 24 }}>
        <div className="gov-card-header">
          <div className="gov-card-title">
            <Layers size={20} color="var(--gov-navy)" />
            <span>The GRAMCAST Transformation Pipeline (The Core Loop)</span>
          </div>
          <span className="badge badge-navy">Block ──► Panchayat Pipeline</span>
        </div>

        <p style={{ fontSize: '0.88rem', color: 'var(--neutral-600)', marginBottom: 20 }}>
          This visual represents the operational architecture required by SIH Problem Statement SIH26074:
        </p>

        {/* Vertical Pipeline Flowchart matching Section 27 */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
          padding: '24px 16px',
          background: '#f8fafc',
          borderRadius: 12,
          border: '1px solid #e2e8f0'
        }}>
          {/* Level 1: Block Weather Forecast */}
          <div style={{
            background: '#ffffff',
            border: '2px solid #f59e0b',
            borderRadius: 10,
            padding: '14px 28px',
            textAlign: 'center',
            boxShadow: '0 4px 6px -1px rgba(245, 158, 11, 0.1)',
            minWidth: 260
          }}>
            <div style={{ fontSize: '0.72rem', color: '#d97706', fontWeight: 800, textTransform: 'uppercase' }}>SOURCE LEVEL</div>
            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--gov-navy)' }}>BLOCK WEATHER FORECAST</div>
            <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: 2 }}>NWP Global Models (~12 km resolution) • e.g. Bodh Gaya: 45 mm</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#0284c7' }}>
            <ArrowDown size={24} strokeWidth={2.5} />
          </div>

          {/* Level 2: GRAMCAST Downscaling Engine */}
          <div style={{
            background: 'linear-gradient(135deg, #1e3a8a 0%, #0369a1 100%)',
            color: '#ffffff',
            borderRadius: 12,
            padding: '18px 24px',
            textAlign: 'center',
            maxWidth: 520,
            width: '100%',
            boxShadow: '0 8px 20px rgba(3, 105, 161, 0.25)',
            border: '1px solid #38bdf8'
          }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.2)', padding: '2px 10px', borderRadius: 20, fontSize: '0.72rem', fontWeight: 800, marginBottom: 6 }}>
              <Cpu size={14} />
              <span>GRAMCAST DOWNSCALING ENGINE</span>
            </div>
            <div style={{ fontSize: '1.05rem', fontWeight: 800 }}>Physics + Spatial + Climatology</div>
            <div style={{ fontSize: '0.82rem', color: '#e0f2fe', marginTop: 6, lineHeight: 1.4 }}>
              SRTM Elevation (DEM) • NDVI Vegetation Transpiration • HydroSHEDS Basin Drainage • Mass-Conservation Constraints • 10-Yr Climatological Bias Correction
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#0284c7' }}>
            <ArrowDown size={24} strokeWidth={2.5} />
          </div>

          {/* Level 3: Panchayat Level Outputs */}
          <div style={{
            background: '#ffffff',
            border: '2px solid #10b981',
            borderRadius: 12,
            padding: 16,
            textAlign: 'center',
            maxWidth: 540,
            width: '100%'
          }}>
            <div style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 800, textTransform: 'uppercase', marginBottom: 6 }}>
              HIGH-RESOLUTION TARGET LEVEL (~1 KM)
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--gov-navy)', marginBottom: 10 }}>
              PANCHAYAT-LEVEL WEATHER INTELLIGENCE
            </div>

            {/* 4 Panchayat Examples */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
              <div style={{ padding: '8px 4px', background: '#ecfdf5', borderRadius: 6, border: '1px solid #a7f3d0' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#065f46' }}>Itawan</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#047857' }}>36 mm</div>
              </div>
              <div style={{ padding: '8px 4px', background: '#ecfdf5', borderRadius: 6, border: '1px solid #a7f3d0' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#065f46' }}>Rural</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#047857' }}>41 mm</div>
              </div>
              <div style={{ padding: '8px 4px', background: '#ecfdf5', borderRadius: 6, border: '1px solid #a7f3d0' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#065f46' }}>Mocharim</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#047857' }}>48 mm</div>
              </div>
              <div style={{ padding: '8px 4px', background: '#fee2e2', borderRadius: 6, border: '1px solid #fca5a5' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#991b1b' }}>Bakrour</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#dc2626' }}>54 mm</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#059669' }}>
            <ArrowDown size={24} strokeWidth={2.5} />
          </div>

          {/* Level 4: Agro-Meteorological Advisory */}
          <div style={{
            background: '#ffffff',
            border: '2px solid #059669',
            borderRadius: 10,
            padding: '12px 24px',
            textAlign: 'center',
            boxShadow: '0 4px 6px -1px rgba(5, 150, 105, 0.1)',
            minWidth: 280
          }}>
            <div style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 800, textTransform: 'uppercase' }}>DECISION LAYER</div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--gov-navy)' }}>AGRO-METEOROLOGICAL ADVISORY</div>
            <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: 2 }}>Crop context: Paddy / Maize / Veg + Growth Stage + Soil</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#059669' }}>
            <ArrowDown size={24} strokeWidth={2.5} />
          </div>

          {/* Level 5: Farmer Action */}
          <div style={{
            background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
            color: '#ffffff',
            borderRadius: 10,
            padding: '12px 24px',
            textAlign: 'center',
            boxShadow: '0 4px 6px -1px rgba(5, 150, 105, 0.2)',
            minWidth: 260
          }}>
            <div style={{ fontSize: '0.72rem', color: '#a7f3d0', fontWeight: 800, textTransform: 'uppercase' }}>OUTCOME</div>
            <div style={{ fontSize: '1rem', fontWeight: 800 }}>ACTIONABLE FARMER ACTION</div>
            <div style={{ fontSize: '0.78rem', color: '#e0f2fe', marginTop: 2 }}>Delay irrigation • Protect harvested produce • Avoid spray wash-off</div>
          </div>
        </div>
      </div>

      {/* SECTION 28: THE 6 FINAL SUCCESS CRITERIA QUESTIONS & ANSWERS */}
      <div className="gov-card" style={{ marginBottom: 24 }}>
        <div className="gov-card-header">
          <div className="gov-card-title">
            <Target size={20} color="var(--gov-navy)" />
            <span>SIH 2026 Evaluation Criteria & Core Defenses</span>
          </div>
          <span className="badge badge-low">Evaluation Q&A</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
          {/* Q1 */}
          <div style={{ padding: 14, background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.76rem', color: '#0284c7', fontWeight: 800, textTransform: 'uppercase' }}>QUESTION 1</div>
            <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--gov-navy)', margin: '4px 0 6px 0' }}>
              What problem are you solving?
            </div>
            <div style={{ fontSize: '0.84rem', color: '#334155', lineHeight: 1.45 }}>
              <strong>Answer:</strong> Weather forecasts are officially available at coarse spatial resolution (~12 km Block level), but agricultural decisions are made at the Panchayat and farm level. Two Panchayats in the same Block experience vastly different weather due to terrain, elevation, and land cover.
            </div>
          </div>

          {/* Q2 */}
          <div style={{ padding: 14, background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.76rem', color: '#0284c7', fontWeight: 800, textTransform: 'uppercase' }}>QUESTION 2</div>
            <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--gov-navy)', margin: '4px 0 6px 0' }}>
              What is your innovation?
            </div>
            <div style={{ fontSize: '0.84rem', color: '#334155', lineHeight: 1.45 }}>
              <strong>Answer:</strong> Physics-guided adaptive spatial downscaling. Rather than unconstrained interpolation, we enforce orographic lapse rates, boundary-layer water conservation, and terrain slope physics.
            </div>
          </div>

          {/* Q3 */}
          <div style={{ padding: 14, background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.76rem', color: '#0284c7', fontWeight: 800, textTransform: 'uppercase' }}>QUESTION 3</div>
            <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--gov-navy)', margin: '4px 0 6px 0' }}>
              What goes into your system?
            </div>
            <div style={{ fontSize: '0.84rem', color: '#334155', lineHeight: 1.45 }}>
              <strong>Answer:</strong> Four categories of data: NWP meteorological forecast variables (rain, temp, wind), spatial features (SRTM DEM, NDVI, HydroSHEDS drainage), INSAT-3DR TIR space telemetry, and 10-year historical station climatology.
            </div>
          </div>

          {/* Q4 */}
          <div style={{ padding: 14, background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.76rem', color: '#0284c7', fontWeight: 800, textTransform: 'uppercase' }}>QUESTION 4</div>
            <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--gov-navy)', margin: '4px 0 6px 0' }}>
              What comes out?
            </div>
            <div style={{ fontSize: '0.84rem', color: '#334155', lineHeight: 1.45 }}>
              <strong>Answer:</strong> Panchayat-level weather intelligence with explicit confidence intervals (e.g. 54 ± 6 mm, 91% confidence) and localized agro-meteorological advisories.
            </div>
          </div>

          {/* Q5 */}
          <div style={{ padding: 14, background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.76rem', color: '#0284c7', fontWeight: 800, textTransform: 'uppercase' }}>QUESTION 5</div>
            <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--gov-navy)', margin: '4px 0 6px 0' }}>
              How do you prove it?
            </div>
            <div style={{ fontSize: '0.84rem', color: '#334155', lineHeight: 1.45 }}>
              <strong>Answer:</strong> Spatial comparison (Block 45mm vs Panchayat 36-54mm), historical station validation benchmarks (MAE & RMSE reduction), and uncertainty bounds.
            </div>
          </div>

          {/* Q6 */}
          <div style={{ padding: 14, background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.76rem', color: '#0284c7', fontWeight: 800, textTransform: 'uppercase' }}>QUESTION 6</div>
            <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--gov-navy)', margin: '4px 0 6px 0' }}>
              Why does it matter?
            </div>
            <div style={{ fontSize: '0.84rem', color: '#334155', lineHeight: 1.45 }}>
              <strong>Answer:</strong> It prevents wasted irrigation electricity, prevents premature pesticide spray wash-off, and protects harvested grain against dampness, directly supporting farmer income.
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 26: Impact Scope */}
      <div className="gov-card" style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: 12 }}>
          Practical Impact on Indian Agro-Meteorological Services
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--neutral-700)', lineHeight: 1.6, marginBottom: 14 }}>
          Better localized weather intelligence provides direct operational benefits to farming communities:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
          <div style={{ padding: 12, background: 'var(--neutral-50)', borderRadius: 8, border: '1px solid var(--neutral-200)' }}>
            <strong style={{ color: 'var(--gov-navy)', fontSize: '0.88rem' }}>1. Irrigation Planning</strong>
            <p style={{ fontSize: '0.8rem', color: '#475569', margin: '4px 0 0 0' }}>Avoid unnecessary tube well pumping and preserve groundwater table.</p>
          </div>
          <div style={{ padding: 12, background: 'var(--neutral-50)', borderRadius: 8, border: '1px solid var(--neutral-200)' }}>
            <strong style={{ color: 'var(--gov-navy)', fontSize: '0.88rem' }}>2. Crop Protection</strong>
            <p style={{ fontSize: '0.8rem', color: '#475569', margin: '4px 0 0 0' }}>Prevent pesticide and chemical wash-off by verifying dry post-application windows.</p>
          </div>
          <div style={{ padding: 12, background: 'var(--neutral-50)', borderRadius: 8, border: '1px solid var(--neutral-200)' }}>
            <strong style={{ color: 'var(--gov-navy)', fontSize: '0.88rem' }}>3. Harvest Preparedness</strong>
            <p style={{ fontSize: '0.8rem', color: '#475569', margin: '4px 0 0 0' }}>Safeguard threshed grain with tarpaulins before localized rain starts.</p>
          </div>
          <div style={{ padding: 12, background: 'var(--neutral-50)', borderRadius: 8, border: '1px solid var(--neutral-200)' }}>
            <strong style={{ color: 'var(--gov-navy)', fontSize: '0.88rem' }}>4. Disaster Mitigation</strong>
            <p style={{ fontSize: '0.8rem', color: '#475569', margin: '4px 0 0 0' }}>Pinpoint specific low-lying Panchayats prone to waterlogging.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
