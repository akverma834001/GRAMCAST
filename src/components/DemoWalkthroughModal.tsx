import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  X, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  ArrowRight,
  Cpu,
  Layers,
  ShieldCheck,
  Sprout,
  ExternalLink
} from 'lucide-react';
import { Language } from '../types';

interface DemoWalkthroughModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTo: (tab: any) => void;
  onSelectPanchayat: (name: string) => void;
  lang: Language;
}

export const DemoWalkthroughModal: React.FC<DemoWalkthroughModalProps> = ({
  isOpen,
  onClose,
  onNavigateTo,
  onSelectPanchayat,
  lang
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const demoSteps = [
    {
      stepNumber: 1,
      title: "Coarse Block Forecast Input (12 km)",
      badge: "Step 1: Source Forecast",
      desc: "NWP model (GFS/NCUM) predicts a generalized 45 mm rainfall and 31.4°C across all of Bodh Gaya Block. In traditional forecasts, every single Panchayat receives the identical number.",
      highlight: "Bodh Gaya Block Forecast: 45 mm Rainfall • 31.4°C Temp • Spatial Scale: 12 km",
      icon: <Layers size={28} color="#0284c7" />,
      actionTab: 'downscale'
    },
    {
      stepNumber: 2,
      title: "Micro-Spatial & Terrain Feature Ingest",
      badge: "Step 2: Physics Grids",
      desc: "GRAMCAST ingests 30m Digital Elevation Models (DEM), Sentinel-2 vegetative canopy (NDVI), and proximity vectors to the Falgu River basin to understand localized terrain physics.",
      highlight: "Features: 111m–125m ASL elevation gradient, river moisture plume, soil permeability index",
      icon: <Cpu size={28} color="#059669" />,
      actionTab: 'downscale'
    },
    {
      stepNumber: 3,
      title: "Physics-Guided Downscaling Execution",
      badge: "Step 3: Downscaling Engine",
      desc: "Applying atmospheric thermodynamic lapse rate (-0.65°C/100m) and mass-conservative moisture transport equations to transform the 12km grid into 1km Panchayat cells.",
      highlight: "Engine Status: Ingesting NWP ──► Computing Orographic Flux ──► Calibrating 1km Grid",
      icon: <RotateCcw size={28} color="#7c3aed" />,
      actionTab: 'downscale'
    },
    {
      stepNumber: 4,
      title: "Panchayat-Level Forecast Reconstruction",
      badge: "Step 4: Localized Output",
      desc: "The single 45 mm block value is downscaled into distinct, accurate local estimates: Bakrour (54 mm), Mocharim (48 mm), Bodh Gaya Rural (41 mm), and Itawan (36 mm).",
      highlight: "Bakrour: 54 mm (+9mm) • Mocharim: 48 mm (+3mm) • Bodh Gaya: 41 mm (-4mm) • Itawan: 36 mm (-9mm)",
      icon: <CheckCircle2 size={28} color="#16a34a" />,
      actionTab: 'map'
    },
    {
      stepNumber: 5,
      title: "Quantified Uncertainty & Validation Bounds",
      badge: "Step 5: Error Analysis",
      desc: "Each prediction carries empirical uncertainty bounds (e.g., Bakrour: 54 ± 6 mm, 91% confidence). Historical AWS comparison demonstrates a 58.4% bias reduction over the coarse Block model.",
      highlight: "Uncertainty: ±5 to ±8 mm • Historical Bias Reduction: 58.4% • Correlation: 0.94",
      icon: <ShieldCheck size={28} color="#0284c7" />,
      actionTab: 'validation'
    },
    {
      stepNumber: 6,
      title: "Actionable Agro-Meteorological Advisory",
      badge: "Step 6: Farmer Action",
      desc: "Downscaled forecasts are converted into targeted field advisories. Lowland Bakrour is warned of waterlogging and advised to clear drains, while Itawan farmers can safely carry out intercultural field work.",
      highlight: "Advisory: Postpone foliar spraying; inspect paddy bund drainage; safe for upland weeding",
      icon: <Sprout size={28} color="#059669" />,
      actionTab: 'advisory'
    }
  ];

  // Auto-play through 6 steps (approx 6 seconds per step = 36s total)
  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    const timer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < demoSteps.length - 1) {
          return prev + 1;
        } else {
          setIsPlaying(false);
          return prev;
        }
      });
    }, 6500);

    return () => clearInterval(timer);
  }, [isOpen, isPlaying, demoSteps.length]);

  if (!isOpen) return null;

  const activeStepData = demoSteps[currentStep];

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.82)',
        backdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 3000,
        padding: 16
      }}
    >
      <div 
        style={{
          background: '#ffffff',
          borderRadius: 16,
          maxWidth: 680,
          width: '100%',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
          border: '1px solid var(--neutral-300)'
        }}
      >
        {/* Modal Header */}
        <div style={{ background: 'var(--gov-navy)', padding: '16px 22px', color: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="badge" style={{ background: '#38bdf8', color: '#0f172a', fontWeight: 800, fontSize: '0.68rem' }}>
                SIH26074 DEMONSTRATION
              </span>
              <span style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>
                Automated 40-Second Evaluation Walkthrough
              </span>
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginTop: 4 }}>
              GRAMCAST Downscaling Pipeline Demo
            </h3>
          </div>

          <button 
            onClick={onClose}
            style={{ border: 'none', background: 'transparent', color: '#ffffff', cursor: 'pointer', fontSize: '1.2rem', padding: 4 }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Progress Bar */}
        <div style={{ display: 'flex', height: 4, background: '#e2e8f0' }}>
          {demoSteps.map((_, i) => (
            <div 
              key={i} 
              style={{ 
                flex: 1, 
                background: i <= currentStep ? 'var(--gov-navy)' : 'transparent',
                transition: 'background 0.3s ease'
              }}
            />
          ))}
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <span className="badge badge-navy" style={{ fontSize: '0.74rem' }}>
              {activeStepData.badge}
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--neutral-500)', fontWeight: 600 }}>
              Step {currentStep + 1} of {demoSteps.length}
            </span>
          </div>

          <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start', marginBottom: 20 }}>
            <div style={{ 
              width: 54, 
              height: 54, 
              borderRadius: 12, 
              background: '#f8fafc', 
              border: '1px solid var(--neutral-300)',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              flexShrink: 0
            }}>
              {activeStepData.icon}
            </div>

            <div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--gov-navy)', marginBottom: 6 }}>
                {activeStepData.title}
              </h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--neutral-700)', lineHeight: 1.5, margin: 0 }}>
                {activeStepData.desc}
              </p>
            </div>
          </div>

          {/* Highlight Card */}
          <div style={{ background: '#f0fdf4', padding: '12px 16px', borderRadius: 8, border: '1px solid #bbf7d0', fontSize: '0.84rem', color: '#166534', fontWeight: 600, marginBottom: 20 }}>
            {activeStepData.highlight}
          </div>

          {/* Controls Footer */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 14, borderTop: '1px solid var(--neutral-200)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setIsPlaying(!isPlaying)}
                style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.78rem' }}
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                <span>{isPlaying ? 'Pause' : 'Play'}</span>
              </button>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  setCurrentStep(0);
                  setIsPlaying(true);
                }}
                style={{ fontSize: '0.78rem' }}
                title="Restart"
              >
                <RotateCcw size={14} />
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button
                className="btn btn-secondary btn-sm"
                disabled={currentStep === 0}
                onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
              >
                <ChevronLeft size={16} />
              </button>

              {currentStep < demoSteps.length - 1 ? (
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => setCurrentStep(prev => Math.min(demoSteps.length - 1, prev + 1))}
                  style={{ display: 'flex', alignItems: 'center', gap: 4 }}
                >
                  <span>Next Step</span>
                  <ChevronRight size={16} />
                </button>
              ) : (
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    onClose();
                    onNavigateTo(activeStepData.actionTab);
                  }}
                  style={{ display: 'flex', alignItems: 'center', gap: 6 }}
                >
                  <span>Explore in Prototype</span>
                  <ExternalLink size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
