import React from 'react';
import { 
  MapPin, 
  Compass, 
  ArrowRight, 
  ShieldCheck, 
  Layers, 
  Cpu, 
  CheckCircle2, 
  ChevronRight 
} from 'lucide-react';
import { LocationHierarchy, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface HomeViewProps {
  currentLocation: LocationHierarchy;
  onOpenLocationModal: () => void;
  onSelectPanchayat: (panchayatName: string) => void;
  onNavigateTo: (tab: any) => void;
  lang: Language;
}

export const HomeView: React.FC<HomeViewProps> = ({
  currentLocation,
  onOpenLocationModal,
  onSelectPanchayat,
  onNavigateTo,
  lang
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #091a30 0%, #0f2744 60%, #1e3a8a 100%)',
        color: '#ffffff',
        borderRadius: 20,
        padding: '36px 32px',
        boxShadow: 'var(--shadow-lg)',
        marginBottom: 28,
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle decorative grid lines */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: '45%',
          backgroundImage: 'radial-gradient(#38bdf8 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          opacity: 0.15,
          pointerEvents: 'none'
        }}></div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 760 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.12)', padding: '4px 12px', borderRadius: 20, fontSize: '0.78rem', fontWeight: 600, color: '#38bdf8', marginBottom: 16 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#38bdf8' }}></span>
            <span>Smart India Hackathon 2026 Prototype</span>
          </div>

          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: 12 }}>
            GRAMCAST
          </h1>

          <p style={{ fontSize: '1.28rem', fontWeight: 600, color: '#93c5fd', marginBottom: 8 }}>
            {t.tagline}
          </p>

          <p style={{ fontSize: '0.98rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: 28, maxWidth: 640 }}>
            {lang === 'hi' 
              ? "पारंपरिक मौसम मॉडल पूरे प्रखंड (ब्लॉक) को एक समान मानते हैं। ग्रामकास्ट स्थलाकृति, उपग्रह चित्रों और भौतिकी-आधारित डाउनस्केलिंग का उपयोग करके आपकी पंचायत के लिए सटीक मौसम पूर्वानुमान और कृषि सलाह प्रदान करता है।"
              : "Traditional models provide coarse block forecasts that miss local terrain and rainfall variations. GRAMCAST downscales numerical weather prediction into high-resolution Panchayat-level intelligence designed for Indian farmers."}
          </p>

          {/* Location Selector Card */}
          <div style={{
            background: '#ffffff',
            borderRadius: 14,
            padding: '20px 24px',
            color: 'var(--neutral-800)',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.92rem', fontWeight: 700, color: 'var(--gov-navy)' }}>
                <MapPin size={18} color="#0284c7" />
                <span>{t.subhead}</span>
              </div>
              <span className="badge badge-low" style={{ fontSize: '0.7rem' }}>
                Default: Kanke Block (Ranchi)
              </span>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>
              <div style={{
                flex: 1,
                minWidth: 260,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: 'var(--neutral-100)',
                padding: '12px 16px',
                borderRadius: 8,
                border: '1px solid var(--neutral-300)'
              }}>
                <Compass size={18} color="var(--neutral-500)" />
                <span style={{ fontSize: '0.9rem', color: 'var(--neutral-700)' }}>
                  <strong>{currentLocation.state}</strong> → {currentLocation.district} → {currentLocation.block} → <span style={{ color: 'var(--gov-navy)', fontWeight: 700 }}>{currentLocation.panchayat}</span>
                </span>
              </div>

              <button 
                className="btn btn-secondary"
                onClick={onOpenLocationModal}
                style={{ padding: '12px 18px', fontWeight: 600 }}
              >
                {t.changeLocation}
              </button>

              <button 
                className="btn btn-success btn-lg"
                onClick={() => onNavigateTo('panchayat')}
                style={{ flexShrink: 0 }}
              >
                <span>{t.viewMyWeather}</span>
                <ArrowRight size={18} />
              </button>
            </div>

            <div style={{ marginTop: 14, fontSize: '0.75rem', color: 'var(--neutral-500)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <ShieldCheck size={14} color="#059669" />
              <span>{t.demoNote}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Select Demo Panchayats in Kanke Block */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--gov-navy)' }}>
            {lang === 'hi' ? "कांके प्रखंड के विभिन्न पंचायत परिदृश्य" : "Explore Kanke Block Panchayat Variations"}
          </h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--neutral-500)' }}>
            Different conditions in the same block
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
          {[
            {
              name: "Kanke (HQ)",
              rain: "12–18 mm",
              prob: "72%",
              temp: "28°C",
              risk: "Moderate",
              desc: "Plateau slope, rain likely this afternoon",
              badgeColor: "var(--warning-amber-bg)",
              textColor: "var(--warning-amber)"
            },
            {
              name: "Sukurhutu",
              rain: "18–24 mm",
              prob: "84%",
              temp: "27.5°C",
              risk: "High",
              desc: "Low-lying valley basin, waterlogging vulnerability",
              badgeColor: "var(--danger-red-bg)",
              textColor: "var(--danger-red)"
            },
            {
              name: "Pithoria",
              rain: "8–12 mm",
              prob: "65%",
              temp: "26.2°C",
              risk: "Low",
              desc: "Elevated ridge (672m), cooler, zero water stagnation",
              badgeColor: "var(--agri-green-bg)",
              textColor: "var(--agri-green-dark)"
            },
            {
              name: "Borea",
              rain: "14–20 mm",
              prob: "76%",
              temp: "28.4°C",
              risk: "Moderate",
              desc: "River corridor, afternoon moisture build-up",
              badgeColor: "var(--warning-amber-bg)",
              textColor: "var(--warning-amber)"
            }
          ].map((item) => (
            <div 
              key={item.name}
              className="gov-card"
              style={{ cursor: 'pointer', padding: 18 }}
              onClick={() => {
                onSelectPanchayat(item.name);
                onNavigateTo('panchayat');
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontWeight: 700, color: 'var(--gov-navy)', fontSize: '1rem' }}>
                  {item.name}
                </span>
                <span className="badge" style={{ background: item.badgeColor, color: item.textColor, fontSize: '0.68rem' }}>
                  {item.risk} Risk
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--neutral-900)' }}>
                  {item.rain}
                </span>
                <span style={{ fontSize: '0.8rem', color: '#0284c7', fontWeight: 600 }}>
                  {item.prob} rain
                </span>
              </div>

              <p style={{ fontSize: '0.8rem', color: 'var(--neutral-600)', marginBottom: 12, minHeight: 36 }}>
                {item.desc}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8, borderTop: '1px solid var(--neutral-100)', fontSize: '0.78rem', color: 'var(--gov-navy)', fontWeight: 600 }}>
                <span>View My Weather</span>
                <ChevronRight size={14} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Core Value Pillars Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 18, marginBottom: 32 }}>
        <div className="gov-card">
          <div style={{ width: 40, height: 40, borderRadius: 8, background: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
            <Layers size={22} />
          </div>
          <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: 8 }}>
            {lang === 'hi' ? "ब्लॉक से पंचायत स्तर तक" : "Block to Panchayat Resolution"}
          </h4>
          <p style={{ fontSize: '0.88rem', color: 'var(--neutral-600)', lineHeight: 1.5 }}>
            {lang === 'hi'
              ? "मौसम मॉडल 12–25 किमी के बड़े क्षेत्रों में अनुमान देते हैं। ग्रामकास्ट इसे 1 किमी पंचायत स्तर तक रिफाइन करता है।"
              : "Coarse meteorological grids span 12–25 km. GRAMCAST downscales this to 1 km precision to reflect field reality."}
          </p>
        </div>

        <div className="gov-card">
          <div style={{ width: 40, height: 40, borderRadius: 8, background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
            <Cpu size={22} />
          </div>
          <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: 8 }}>
            {lang === 'hi' ? "भौतिकी-निर्देशित एडाप्टिव मॉडल" : "Physics-Guided Intelligence"}
          </h4>
          <p style={{ fontSize: '0.88rem', color: 'var(--neutral-600)', lineHeight: 1.5 }}>
            {lang === 'hi'
              ? "पठारी ढलान, उपग्रह से प्राप्त बादल की स्थिति और मिट्टी की नमी को मिलाकर सही पूर्वानुमान तैयार किया जाता है।"
              : "Integrates elevation gradients (SRTM DEM), INSAT-3DR convective signatures, and soil moisture dynamics."}
          </p>
        </div>

        <div className="gov-card">
          <div style={{ width: 40, height: 40, borderRadius: 8, background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
            <CheckCircle2 size={22} />
          </div>
          <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: 8 }}>
            {lang === 'hi' ? "किसानों के लिए सीधी सलाह" : "Actionable Agricultural Advice"}
          </h4>
          <p style={{ fontSize: '0.88rem', color: 'var(--neutral-600)', lineHeight: 1.5 }}>
            {lang === 'hi'
              ? "सिंचाई रोकें या चालू रखें? कीटनाशक छिड़काव करें या टालें? फसल कटाई कब करें? सीधी भाषा में स्पष्ट मार्गदर्शन।"
              : "Translates complex weather forecasts into unambiguous farming recommendations: irrigation, spraying, and harvest timing."}
          </p>
        </div>
      </div>
    </div>
  );
};
