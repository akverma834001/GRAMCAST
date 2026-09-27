import React from 'react';
import { 
  HelpCircle, 
  ShieldAlert 
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
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--gov-navy)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <HelpCircle size={26} color="var(--gov-navy)" />
          <span>{lang === 'hi' ? "ग्रामकास्ट के बारे में (About GRAMCAST)" : "About GRAMCAST"}</span>
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--neutral-500)' }}>
          {t.tagline} • Smart India Hackathon 2026 Project
        </p>
      </div>

      {/* SECTION 27: What is GRAMCAST? */}
      <div className="gov-card" style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: 12 }}>
          {lang === 'hi' ? "ग्रामकास्ट क्या है? (What is GRAMCAST?)" : "What is GRAMCAST?"}
        </h2>
        <p style={{ fontSize: '0.95rem', color: 'var(--neutral-700)', lineHeight: 1.6 }}>
          <em>“GRAMCAST transforms broader Block-level weather forecasts into localized Panchayat-level weather intelligence using weather observations, satellite information, geography, and physics-guided spatial downscaling.”</em>
        </p>
        <p style={{ fontSize: '0.9rem', color: 'var(--neutral-600)', lineHeight: 1.5, marginTop: 12 }}>
          In India, official weather forecasts are typically issued at the Sub-Division, District, or Block level (covering 12–25 km cells). 
          However, agricultural operations like irrigation, pesticide spraying, and harvesting depend on conditions within a single village boundary. 
          GRAMCAST bridges this spatial gap.
        </p>
      </div>

      {/* SECTION 27: Why? */}
      <div className="gov-card" style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: 12 }}>
          {lang === 'hi' ? "इसकी आवश्यकता क्यों है? (Why?)" : "Why Does Local Resolution Matter?"}
        </h2>
        <p style={{ fontSize: '0.95rem', color: 'var(--neutral-700)', lineHeight: 1.6 }}>
          <em>“Weather can vary significantly across locations within the same Block. More localized information can support better agricultural decisions.”</em>
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14, marginTop: 16 }}>
          <div style={{ padding: 12, background: 'var(--neutral-50)', borderRadius: 8, border: '1px solid var(--neutral-200)' }}>
            <strong style={{ color: 'var(--gov-navy)', display: 'block', marginBottom: 4 }}>Topographical Variance</strong>
            <span style={{ fontSize: '0.84rem', color: 'var(--neutral-600)' }}>
              A ridge-top Panchayat (like Pithoria at 672m) may experience cool breezes and rapid drainage, while a low-lying valley Panchayat (like Sukurhutu at 614m) faces flash waterlogging from the same storm system.
            </span>
          </div>

          <div style={{ padding: 12, background: 'var(--neutral-50)', borderRadius: 8, border: '1px solid var(--neutral-200)' }}>
            <strong style={{ color: 'var(--gov-navy)', display: 'block', marginBottom: 4 }}>Preventing Input Waste</strong>
            <span style={{ fontSize: '0.84rem', color: 'var(--neutral-600)' }}>
              A farmer who irrigates or applies expensive pesticides hours before an unpredicted localized downpour suffers heavy financial losses.
            </span>
          </div>
        </div>
      </div>

      {/* SECTION 27: How It Works */}
      <div className="gov-card" style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: 16 }}>
          {lang === 'hi' ? "यह कैसे काम करता है? (How?)" : "How Does It Work?"}
        </h2>
        
        {/* Step Flow */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          padding: '16px 20px',
          background: 'var(--neutral-50)',
          borderRadius: 10,
          border: '1px solid var(--neutral-200)',
          marginBottom: 16
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 800, color: 'var(--gov-navy)' }}>1. Data</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--neutral-500)' }}>IMD NWP + Sat</div>
          </div>
          <div style={{ color: 'var(--neutral-400)' }}>→</div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 800, color: '#0284c7' }}>2. Downscaling</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--neutral-500)' }}>Physics + DEM</div>
          </div>
          <div style={{ color: 'var(--neutral-400)' }}>→</div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 800, color: '#d97706' }}>3. Validation</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--neutral-500)' }}>Ground AWS Error</div>
          </div>
          <div style={{ color: 'var(--neutral-400)' }}>→</div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 800, color: '#7c3aed' }}>4. Calibration</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--neutral-500)' }}>Kalman Filter</div>
          </div>
          <div style={{ color: 'var(--neutral-400)' }}>→</div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 800, color: '#059669' }}>5. Intelligence</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--neutral-500)' }}>Panchayat Advisory</div>
          </div>
        </div>

        <ul style={{ fontSize: '0.88rem', color: 'var(--neutral-700)', paddingLeft: 20, lineHeight: 1.6 }}>
          <li><strong>Physics Invariance:</strong> Respects mass conservation, hydrostatic equilibrium, and moist adiabatic lapse rate.</li>
          <li><strong>Farmer-Centric Presentation:</strong> Never exposes neural network architectures or complex formulas to farmers.</li>
          <li><strong>Accessible Multilingual Delivery:</strong> Available in farmer-friendly Hindi and English with built-in voice narration.</li>
        </ul>
      </div>

      {/* SECTION 27: Important Disclaimer */}
      <div style={{
        background: '#fffbeb',
        border: '1px solid #fde68a',
        borderRadius: 12,
        padding: '20px 24px',
        marginBottom: 28
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#92400e', fontWeight: 700, fontSize: '1.05rem', marginBottom: 8 }}>
          <ShieldAlert size={22} color="#d97706" />
          <span>Important Official Disclaimer</span>
        </div>
        <p style={{ fontSize: '0.9rem', color: '#78350f', lineHeight: 1.6 }}>
          <em>“GRAMCAST is a decision-support prototype developed for Smart India Hackathon 2026. Forecasts and recommendations should be interpreted alongside official India Meteorological Department (IMD) weather advisories and local agricultural guidance from Krishi Vigyan Kendras (KVKs).”</em>
        </p>
      </div>
    </div>
  );
};
