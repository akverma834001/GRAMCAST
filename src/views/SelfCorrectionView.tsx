import React, { useState } from 'react';
import { 
  RefreshCw, 
  ChevronRight 
} from 'lucide-react';
import { Language } from '../types';
import { LEARNING_CYCLE_SAMPLE } from '../data/validationData';

interface SelfCorrectionViewProps {
  lang: Language;
}

export const SelfCorrectionView: React.FC<SelfCorrectionViewProps> = ({ lang }) => {
  const [activeStep, setActiveStep] = useState(3); // default showing comparison

  const steps = [
    {
      num: 1,
      title: "Forecast Generated",
      subtitle: "Cycle 00Z Initialization",
      desc: "NWP coarse model combined with DEM topography and INSAT-3DR satellite radiance predicts 18.0 mm for Kanke basin.",
      value: "18.0 mm",
      label: "Predicted Rainfall"
    },
    {
      num: 2,
      title: "Actual Observation",
      subtitle: "Ground Station Ingestion",
      desc: "Local AWS ground telemetry station records cumulative 24-hour rainfall at 08:30 AM IST.",
      value: "15.0 mm",
      label: "Observed Rainfall"
    },
    {
      num: 3,
      title: "Compare & Detect Error",
      subtitle: "Residual Variance Analysis",
      desc: "The system identifies a +3.0 mm overprediction during evening convective dissipation.",
      value: "+3.0 mm",
      label: "Residual Error"
    },
    {
      num: 4,
      title: "Calibration Applied",
      subtitle: "Adaptive Kalman Matrix",
      desc: "Boundary layer moisture decay parameter adjusted by -1.8 mm to counteract evening dissipation delay.",
      value: "-1.8 mm Offset",
      label: "Correction Matrix"
    },
    {
      num: 5,
      title: "Next Cycle Calibrated",
      subtitle: "Cycle 12Z Forecast",
      desc: "Updated model weights and localized bias corrections applied to the next Panchayat forecast bulletin.",
      value: "Ready",
      label: "Status"
    }
  ];

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--gov-navy)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <RefreshCw size={24} color="var(--gov-navy)" />
          <span>{lang === 'hi' ? "ग्रामकास्ट कैसे सीखता है (सेल्फ-करेक्शन लूप)" : "How GRAMCAST Improves (Adaptive Learning Loop)"}</span>
        </h1>
        <p style={{ fontSize: '0.84rem', color: 'var(--neutral-500)' }}>
          Continuous feedback loop between numerical prediction and ground automated telemetry
        </p>
      </div>

      {/* Visual Flow Stages Header */}
      <div className="gov-card" style={{ marginBottom: 28, padding: 24 }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: 20 }}>
          {lang === 'hi' ? "पांच-चरणीय स्व-सुधार चक्र" : "Five-Step Closed-Loop Calibration Cycle"}
        </h3>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          {steps.map((st, idx) => (
            <React.Fragment key={st.num}>
              <div 
                onClick={() => setActiveStep(idx)}
                style={{
                  flex: 1,
                  minWidth: 150,
                  background: activeStep === idx ? 'var(--gov-navy)' : 'var(--neutral-50)',
                  color: activeStep === idx ? '#ffffff' : 'var(--neutral-800)',
                  border: activeStep === idx ? '2px solid var(--gov-navy)' : '1px solid var(--neutral-300)',
                  borderRadius: 10,
                  padding: '14px 12px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  textAlign: 'center',
                  boxShadow: activeStep === idx ? 'var(--shadow-md)' : 'none'
                }}
              >
                <div style={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: activeStep === idx ? '#38bdf8' : 'var(--neutral-200)',
                  color: activeStep === idx ? '#0f2744' : 'var(--neutral-700)',
                  fontWeight: 800,
                  fontSize: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 8px auto'
                }}>
                  {st.num}
                </div>

                <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>
                  {st.title}
                </div>
                <div style={{ fontSize: '0.72rem', opacity: 0.8, marginTop: 2 }}>
                  {st.subtitle}
                </div>
              </div>

              {idx < steps.length - 1 && (
                <div style={{ color: 'var(--neutral-400)', display: 'flex', alignItems: 'center' }}>
                  <ChevronRight size={18} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Active Step Deep-Dive Card */}
      <div className="gov-card" style={{ marginBottom: 28 }}>
        <div className="gov-card-header">
          <div className="gov-card-title">
            <span style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--gov-navy)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>
              {steps[activeStep].num}
            </span>
            <span>{steps[activeStep].title} — {steps[activeStep].subtitle}</span>
          </div>

          <span className="badge badge-low">
            {steps[activeStep].label}: {steps[activeStep].value}
          </span>
        </div>

        <p style={{ fontSize: '0.95rem', color: 'var(--neutral-700)', lineHeight: 1.6, marginBottom: 20 }}>
          {steps[activeStep].desc}
        </p>

        {/* Step-specific demonstration box */}
        <div style={{ background: 'var(--neutral-50)', padding: 18, borderRadius: 10, border: '1px solid var(--neutral-200)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--neutral-500)', fontWeight: 600 }}>Test Panchayat</div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--gov-navy)' }}>{LEARNING_CYCLE_SAMPLE.panchayat}</div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--neutral-500)', fontWeight: 600 }}>Cycle Identifier</div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--gov-navy)' }}>{LEARNING_CYCLE_SAMPLE.cycleId}</div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--neutral-500)', fontWeight: 600 }}>Physical Feedback Mechanism</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--neutral-700)' }}>{LEARNING_CYCLE_SAMPLE.physicsFeedback}</div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--neutral-500)', fontWeight: 600 }}>Adaptive Status</div>
            <div style={{ fontSize: '0.82rem', color: '#059669', fontWeight: 600 }}>{LEARNING_CYCLE_SAMPLE.status}</div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => setActiveStep((activeStep - 1 + steps.length) % steps.length)}
          >
            ← Previous Step
          </button>

          <button 
            className="btn btn-primary btn-sm"
            onClick={() => setActiveStep((activeStep + 1) % steps.length)}
          >
            Next Step →
          </button>
        </div>
      </div>

      {/* Technical Honesty Note */}
      <div style={{ padding: 14, background: '#f8fafc', borderRadius: 8, border: '1px solid var(--neutral-200)', fontSize: '0.82rem', color: 'var(--neutral-600)' }}>
        <strong>Scientific Integrity Principle:</strong> GRAMCAST continuously updates local bias offsets through recursive state estimation rather than claiming arbitrary automatic percentage accuracy improvements.
      </div>
    </div>
  );
};
