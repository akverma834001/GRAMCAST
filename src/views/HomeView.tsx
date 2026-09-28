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

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 860 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.12)', padding: '5px 14px', borderRadius: 20, fontSize: '0.78rem', fontWeight: 700, color: '#38bdf8', marginBottom: 14 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#38bdf8' }}></span>
            <span>SIH Problem Statement: SIH26074 • Weather Forecast Downscaling</span>
          </div>

          <h1 style={{ fontSize: '2.6rem', fontWeight: 800, lineHeight: 1.12, letterSpacing: '-0.02em', marginBottom: 8 }}>
            GRAMCAST
          </h1>

          <p style={{ fontSize: '1.25rem', fontWeight: 700, color: '#38bdf8', marginBottom: 10 }}>
            Block-level forecasts. Panchayat-level intelligence.
          </p>

          <p style={{ fontSize: '0.98rem', color: '#e2e8f0', lineHeight: 1.6, marginBottom: 20, maxWidth: 740, fontWeight: 500 }}>
            {lang === 'hi' 
              ? "ग्रामकास्ट भौतिकी-निर्देशित स्थानिक डाउनस्केलिंग का उपयोग करके मोटे ब्लॉक-स्तरीय (10-12 किमी) मौसम पूर्वानुमानों को उच्च-रिजॉल्यूशन ग्राम पंचायत स्तर (1 किमी) के मौसम पूर्वानुमान में बदलता है, जिससे लक्षित कृषि-मौसम सलाह संभव होती है।"
              : "GRAMCAST transforms coarse Block-level weather forecasts into high-resolution Panchayat-level weather intelligence using physics-guided spatial downscaling, enabling localized agro-meteorological advisory services."}
          </p>

          {/* Core Pipeline Visual Banner */}
          <div style={{
            background: 'rgba(15, 23, 42, 0.75)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: 12,
            padding: '12px 18px',
            marginBottom: 24,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 10,
            fontSize: '0.8rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="badge" style={{ background: '#fef3c7', color: '#92400e', fontWeight: 700, fontSize: '0.68rem' }}>SOURCE</span>
              <span style={{ fontWeight: 600, color: '#ffffff' }}>Block Forecast (12 km)</span>
            </div>
            <ArrowRight size={14} color="#38bdf8" />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="badge badge-navy" style={{ fontSize: '0.68rem', background: '#0284c7' }}>ENGINE</span>
              <span style={{ fontWeight: 600, color: '#ffffff' }}>Physics Downscaling</span>
            </div>
            <ArrowRight size={14} color="#38bdf8" />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="badge badge-low" style={{ fontSize: '0.68rem' }}>OUTPUT</span>
              <span style={{ fontWeight: 600, color: '#ffffff' }}>Panchayat Grid (1 km)</span>
            </div>
            <ArrowRight size={14} color="#38bdf8" />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="badge" style={{ background: '#dcfce7', color: '#166534', fontWeight: 700, fontSize: '0.68rem' }}>ACTION</span>
              <span style={{ fontWeight: 600, color: '#ffffff' }}>Farmer Advisory</span>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 28 }}>
            <button 
              className="btn btn-success btn-lg"
              onClick={() => onNavigateTo('panchayat')}
              style={{ fontWeight: 700, padding: '12px 24px', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: 8 }}
            >
              <span>{lang === 'hi' ? "पूर्वानुमान एक्सप्लोर करें" : "Explore Forecast"}</span>
              <ArrowRight size={18} />
            </button>

            <button 
              className="btn btn-secondary btn-lg"
              onClick={() => onNavigateTo('downscale')}
              style={{ fontWeight: 700, padding: '12px 22px', fontSize: '0.95rem', background: 'rgba(255,255,255,0.15)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', gap: 8 }}
            >
              <Cpu size={18} />
              <span>{lang === 'hi' ? "देखें ग्रामकास्ट कैसे काम करता है" : "See How GRAMCAST Works (Downscale Engine)"}</span>
            </button>
          </div>

          {/* Location Selector Card */}
          <div style={{
            background: '#ffffff',
            borderRadius: 14,
            padding: '20px 24px',
            color: 'var(--neutral-800)',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.92rem', fontWeight: 700, color: 'var(--gov-navy)' }}>
                <MapPin size={18} color="#0284c7" />
                <span>{lang === 'hi' ? "सक्रिय स्थान चुनें" : "Select Target Administrative Hierarchy"}</span>
              </div>
              <span className="badge badge-navy" style={{ fontSize: '0.7rem' }}>
                Resolution: Block (12 km) ──► Panchayat (1 km)
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
                className="btn btn-primary"
                onClick={() => onNavigateTo('downscale')}
                style={{ padding: '12px 20px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}
              >
                <Cpu size={16} />
                <span>Downscale Block</span>
              </button>
            </div>

            <div style={{ marginTop: 14, fontSize: '0.75rem', color: 'var(--neutral-500)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <ShieldCheck size={14} color="#059669" />
              <span>Demonstration Locations Available: Bodh Gaya Block (Bihar) & Kanke Block (Jharkhand)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contextual Weather & Terrain Visual Showcase */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 18 }}>
          {/* Card 1: Agricultural Ground Reality */}
          <div className="gov-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'relative', height: 190, overflow: 'hidden' }}>
              <img 
                src="/images/plateau_paddy_farmland.jpg" 
                alt="Chota Nagpur Plateau Farmland"
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
              />
              <span className="badge" style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(15, 23, 42, 0.85)', color: '#ffffff', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.2)', fontSize: '0.72rem' }}>
                Field Topography
              </span>
              <span style={{ position: 'absolute', bottom: 8, right: 12, fontSize: '0.7rem', color: '#ffffff', background: 'rgba(0,0,0,0.6)', padding: '2px 8px', borderRadius: 4 }}>
                Kanke Basin (614–672m ASL)
              </span>
            </div>
            <div style={{ padding: '16px 20px' }}>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: 6 }}>
                {lang === 'hi' ? "पठारी कृषि परिदृश्य एवं सूक्ष्म जलवायु" : "Plateau Terrain & Local Microclimates"}
              </h4>
              <p style={{ fontSize: '0.84rem', color: 'var(--neutral-600)', lineHeight: 1.5 }}>
                {lang === 'hi'
                  ? "सीढ़ीदार धान के खेत और प्राकृतिक ढलानें एक ही प्रखंड में अलग-अलग जलभराव और वर्षा अवशोषण की स्थिति पैदा करती हैं।"
                  : "Terraced paddy plots and plateau slopes create contrasting rainfall retention and waterlogging risks across neighboring Panchayats."}
              </p>
            </div>
          </div>

          {/* Card 2: Space & Satellite Observation */}
          <div className="gov-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'relative', height: 190, overflow: 'hidden' }}>
              <img 
                src="/images/satellite_weather_view.jpg" 
                alt="INSAT-3DR Satellite Weather View"
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
              />
              <span className="badge" style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(5, 150, 105, 0.9)', color: '#ffffff', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.2)', fontSize: '0.72rem' }}>
                Space Telemetry Input
              </span>
              <span style={{ position: 'absolute', bottom: 8, right: 12, fontSize: '0.7rem', color: '#ffffff', background: 'rgba(0,0,0,0.6)', padding: '2px 8px', borderRadius: 4 }}>
                INSAT-3DR TIR Radiance
              </span>
            </div>
            <div style={{ padding: '16px 20px' }}>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: 6 }}>
                {lang === 'hi' ? "उपग्रह प्रेक्षण एवं रडार इनपुट" : "INSAT-3DR Synoptic Observation"}
              </h4>
              <p style={{ fontSize: '0.84rem', color: 'var(--neutral-600)', lineHeight: 1.5 }}>
                {lang === 'hi'
                  ? "इन्फ्रारेड बादलों के तापमान और मानसूनी दबाव प्रणालियों को ग्रामकास्ट 1 किमी सुपर-रेज़ोल्यूशन मॉडल में प्रोसेस करता है।"
                  : "Thermal infrared cloud top temperatures and synoptic low-pressure bands are downscaled with local digital elevation models."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Select Demo Panchayats in Kanke Block */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--gov-navy)' }}>
              {lang === 'hi' ? "विभिन्न ग्राम पंचायत क्षेत्रों की वास्तविक स्थितियां" : "Real Field Conditions Across Different Gram Panchayats"}
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--neutral-500)', marginTop: 2 }}>
              {lang === 'hi' 
                ? "प्रत्येक पंचायत का अलग भूगोल, ऊंचाई व वास्तविक कृषि परिदृश्य" 
                : "Distinct physical landscapes, elevation profiles & micro-climates in the same Block"}
            </p>
          </div>
          <span className="badge badge-navy" style={{ fontSize: '0.72rem' }}>
            5 Real Micro-Zones
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
          {[
            {
              name: "Kanke (HQ)",
              hindiName: "कांके (मुख्यालय)",
              terrainType: "Reservoir Margin (628m)",
              hindiTerrainType: "जलाशय बेसिन (628 मी)",
              image: "/images/panchayat_kanke_hq.jpg",
              rain: "12–18 mm",
              prob: "72%",
              temp: "28°C",
              risk: "Moderate",
              desc: "Reservoir lake margin & terraced farm plots; afternoon shower band",
              hindiDesc: "जलाशय तटवर्ती क्षेत्र व सीढ़ीदार खेत; दोपहर में वर्षा का दौर",
              badgeColor: "var(--warning-amber-bg)",
              textColor: "var(--warning-amber)"
            },
            {
              name: "Sukurhutu",
              hindiName: "सुकुरहुटू",
              terrainType: "Valley Basin (614m)",
              hindiTerrainType: "निचली घाटी (614 मी)",
              image: "/images/panchayat_sukurhutu.jpg",
              rain: "18–24 mm",
              prob: "84%",
              temp: "27.5°C",
              risk: "High",
              desc: "Low-lying clay-loam paddy basin; acute waterlogging vulnerability",
              hindiDesc: "निचले धान के खेत व दोमट मिट्टी; अत्यधिक जलभराव का खतरा",
              badgeColor: "var(--danger-red-bg)",
              textColor: "var(--danger-red)"
            },
            {
              name: "Pithoria",
              hindiName: "पिठोरिया",
              terrainType: "Elevated Ridge (672m)",
              hindiTerrainType: "ऊंची पहाड़ी कटक (672 मी)",
              image: "/images/panchayat_pithoria.jpg",
              rain: "8–12 mm",
              prob: "65%",
              temp: "26.2°C",
              risk: "Low",
              desc: "Elevated rocky slopes with terraced vegetable horticulture; rapid drainage",
              hindiDesc: "सीढ़ीदार सब्जी की खेती व पहाड़ी ढलान; तेज प्राकृतिक जल निकासी",
              badgeColor: "var(--agri-green-bg)",
              textColor: "var(--agri-green-dark)"
            },
            {
              name: "Borea",
              hindiName: "बोड़ेया",
              terrainType: "Riverfront Alluvial (622m)",
              hindiTerrainType: "नदी तट जलोढ़ (622 मी)",
              image: "/images/panchayat_borea.jpg",
              rain: "14–20 mm",
              prob: "76%",
              temp: "28.4°C",
              risk: "Moderate",
              desc: "Jumar River riparian corridor with marigold beds & riverbank moisture",
              hindiDesc: "जुमार नदी तटीय गलियारा, गेंदा फूल की खेती व दोपहर की नमी",
              badgeColor: "var(--warning-amber-bg)",
              textColor: "var(--warning-amber)"
            },
            {
              name: "Nagri Rural",
              hindiName: "नगड़ी ग्रामीण",
              terrainType: "Upland Plateau (648m)",
              hindiTerrainType: "ऊपरी पठार (648 मी)",
              image: "/images/panchayat_nagri.jpg",
              rain: "10–15 mm",
              prob: "68%",
              temp: "27.8°C",
              risk: "Moderate",
              desc: "Open plateau upland maize fields with red loam soil; wind bursts",
              hindiDesc: "खुले ऊपरी पठारी खेत, लाल मिट्टी व मक्का; हवादार मौसम",
              badgeColor: "var(--warning-amber-bg)",
              textColor: "var(--warning-amber)"
            }
          ].map((item) => (
            <div 
              key={item.name}
              className="gov-card"
              style={{ 
                cursor: 'pointer', 
                padding: 0, 
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                border: '1px solid var(--neutral-200)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              onClick={() => {
                onSelectPanchayat(item.name);
                onNavigateTo('panchayat');
              }}
            >
              {/* Individual Real Panchayat Image */}
              <div style={{ position: 'relative', height: 130, width: '100%', overflow: 'hidden' }}>
                <img 
                  src={item.image} 
                  alt={item.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  loading="lazy"
                />
                <span 
                  className="badge" 
                  style={{ 
                    position: 'absolute', 
                    top: 8, 
                    left: 8, 
                    background: 'rgba(15, 23, 42, 0.85)', 
                    color: '#ffffff', 
                    backdropFilter: 'blur(4px)', 
                    fontSize: '0.66rem',
                    padding: '2px 6px',
                    borderRadius: 4
                  }}
                >
                  {lang === 'hi' ? item.hindiTerrainType : item.terrainType}
                </span>

                <span 
                  className="badge" 
                  style={{ 
                    position: 'absolute', 
                    top: 8, 
                    right: 8, 
                    background: item.badgeColor, 
                    color: item.textColor, 
                    fontSize: '0.66rem',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: 4
                  }}
                >
                  {item.risk} Risk
                </span>

                <div 
                  style={{ 
                    position: 'absolute', 
                    bottom: 0, 
                    left: 0, 
                    right: 0, 
                    padding: '6px 10px', 
                    background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end'
                  }}
                >
                  <div>
                    <span style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.92rem', display: 'block' }}>
                      {item.name}
                    </span>
                    <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.7rem' }}>
                      {item.hindiName}
                    </span>
                  </div>
                  <span style={{ color: '#38bdf8', fontWeight: 700, fontSize: '0.82rem' }}>
                    {item.temp}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 6 }}>
                  <div>
                    <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--neutral-900)' }}>
                      {item.rain}
                    </span>
                    <span style={{ fontSize: '0.74rem', color: '#0284c7', fontWeight: 600, marginLeft: 6 }}>
                      {item.prob} rain
                    </span>
                  </div>
                </div>

                <p style={{ fontSize: '0.76rem', color: 'var(--neutral-600)', marginBottom: 10, lineHeight: 1.4, flex: 1 }}>
                  {lang === 'hi' ? item.hindiDesc : item.desc}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8, borderTop: '1px solid var(--neutral-100)', fontSize: '0.74rem', color: 'var(--gov-navy)', fontWeight: 600 }}>
                  <span>{lang === 'hi' ? "मौसम देखें" : "View Weather"}</span>
                  <ChevronRight size={13} />
                </div>
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
