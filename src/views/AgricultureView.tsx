import React, { useState } from 'react';
import { 
  Sprout, 
  Wheat, 
  ShoppingBag, 
  Droplets, 
  ShieldCheck, 
  AlertCircle 
} from 'lucide-react';
import { PanchayatData, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface AgricultureViewProps {
  weather: PanchayatData;
  lang: Language;
}

export const AgricultureView: React.FC<AgricultureViewProps> = ({ weather, lang }) => {
  const t = TRANSLATIONS[lang];
  const [selectedCrop, setSelectedCrop] = useState<'paddy' | 'maize' | 'vegetables'>('paddy');

  const cropSpecificAdvisories = {
    paddy: {
      cropName: "Paddy (धान)",
      stage: "Grain filling & dough stage",
      irrigation: "12–18 mm expected rain will recharge standing water table. Maintain 3–5 cm water depth by sealing outer bunds.",
      spraying: "Do not apply systemic blast fungicides or urea top-dressing today due to surface wash-off risk.",
      harvesting: "For early maturing varieties (Vandana / Sahbhagi Dhan), delay cutting by 48 hours until sunshine clears on Wednesday."
    },
    maize: {
      cropName: "Maize (मक्का)",
      stage: "Cob development / Maturation",
      irrigation: "No irrigation needed. Ensure no prolonged standing water pools around root crowns.",
      spraying: "Avoid Fall Armyworm (FAW) whorl sprays today; rain will dilute insecticide.",
      harvesting: "Harvested cobs must be moved inside ventilated covered storehouses immediately."
    },
    vegetables: {
      cropName: "Tomato & Cauliflower (सब्जियां)",
      stage: "Fruiting and flowering",
      irrigation: "Drip irrigation systems should be paused for next 36 hours.",
      spraying: "High humidity (78%) after afternoon showers raises late blight threat. Plan copper oxychloride spray on Thursday morning.",
      harvesting: "Pick mature fruits/heads early in the morning before afternoon precipitation starts."
    }
  };

  const activeCrop = cropSpecificAdvisories[selectedCrop];

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--agri-green-dark)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Sprout size={24} color="var(--agri-green)" />
          <span>{lang === 'hi' ? "मुझे क्या करना चाहिए? (मौसम आधारित कृषि सलाह)" : "What Should I Do? (Farm Decision Support)"}</span>
        </h1>
        <p style={{ fontSize: '0.84rem', color: 'var(--neutral-500)' }}>
          {weather.name} • {t.weatherBasedGuidance}
        </p>
      </div>

      {/* Official Advisory Status Banner */}
      <div style={{
        background: '#ecfdf5',
        border: '1px solid #a7f3d0',
        borderRadius: 12,
        padding: '16px 20px',
        marginBottom: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <ShieldCheck size={28} color="#059669" />
          <div>
            <div style={{ fontWeight: 700, color: '#064e3b', fontSize: '1rem' }}>
              Weather-Based Agricultural Advisory Bulletin
            </div>
            <div style={{ fontSize: '0.82rem', color: '#047857' }}>
              Tailored for <strong>{weather.name}</strong> • Expected Rain: <strong>{weather.current.rainfallExpected}</strong>
            </div>
          </div>
        </div>

        <div style={{ fontSize: '0.78rem', color: '#065f46', background: '#ffffff', padding: '6px 12px', borderRadius: 6, border: '1px solid #a7f3d0' }}>
          Valid: Next 24 Hours
        </div>
      </div>

      {/* 4 Core Action Decision Cards (Section 9) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 18, marginBottom: 28 }}>
        {/* 1. Irrigation */}
        <div className="gov-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--agri-green-dark)', fontWeight: 700, fontSize: '1.05rem' }}>
              <Sprout size={20} color="var(--agri-green)" />
              <span>{t.irrigation}</span>
            </div>
            <span className="badge badge-moderate">Delay / Hold</span>
          </div>

          <p style={{ fontSize: '0.9rem', color: 'var(--neutral-700)', lineHeight: 1.5, marginBottom: 14 }}>
            {lang === 'hi' 
              ? "आज 12–18 मिमी वर्षा की संभावना है। ट्यूबवेल या नहर से सिंचाई की आवश्यकता नहीं है। बिजली और पानी की बचत करें।"
              : "Rain is expected today (12–18 mm). Irrigation may not be necessary for standing crops. Hold irrigation till soil dries."}
          </p>

          <div style={{ fontSize: '0.76rem', color: 'var(--neutral-500)', background: 'var(--neutral-50)', padding: 8, borderRadius: 6 }}>
            <strong>Threshold:</strong> Soil moisture index currently 72% • Evapotranspiration is low.
          </div>
        </div>

        {/* 2. Field Work */}
        <div className="gov-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--agri-green-dark)', fontWeight: 700, fontSize: '1.05rem' }}>
              <Wheat size={20} color="var(--agri-green)" />
              <span>{t.fieldWork}</span>
            </div>
            <span className="badge" style={{ background: '#f1f5f9', color: '#475569' }}>Morning Only</span>
          </div>

          <p style={{ fontSize: '0.9rem', color: 'var(--neutral-700)', lineHeight: 1.5, marginBottom: 14 }}>
            {lang === 'hi'
              ? "दोपहर 01:30 बजे से पहले निराई-गुड़ाई, मेड़बंदी या खेत की तैयारी पूरी कर लें। दोपहर बाद बारिश से मिट्टी गीली हो जाएगी।"
              : "Consider completing harvesting, weeding, and tractor land preparation before the expected afternoon rainfall window."}
          </p>

          <div style={{ fontSize: '0.76rem', color: 'var(--neutral-500)', background: 'var(--neutral-50)', padding: 8, borderRadius: 6 }}>
            <strong>Safe Window:</strong> 06:00 AM to 01:00 PM • Clear morning conditions.
          </div>
        </div>

        {/* 3. Harvesting */}
        <div className="gov-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--agri-green-dark)', fontWeight: 700, fontSize: '1.05rem' }}>
              <ShoppingBag size={20} color="var(--agri-green)" />
              <span>{t.harvesting}</span>
            </div>
            <span className="badge badge-high">High Caution</span>
          </div>

          <p style={{ fontSize: '0.9rem', color: 'var(--neutral-700)', lineHeight: 1.5, marginBottom: 14 }}>
            {lang === 'hi'
              ? "कटी हुई फसल को बारिश से बचाएं। खलिहान में खुले में पड़ा अनाज तुरंत तिरपाल से सुरक्षित करें। नई कटाई 48 घंटे टालें।"
              : "Rain may affect harvested produce. Keep storage protected. Delay open threshing and ensure proper tarpaulin cover."}
          </p>

          <div style={{ fontSize: '0.76rem', color: 'var(--neutral-500)', background: 'var(--neutral-50)', padding: 8, borderRadius: 6 }}>
            <strong>Risk:</strong> Damp grain is prone to mold and aflatoxin development.
          </div>
        </div>

        {/* 4. Spraying */}
        <div className="gov-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--agri-green-dark)', fontWeight: 700, fontSize: '1.05rem' }}>
              <Droplets size={20} color="var(--agri-green)" />
              <span>{t.spraying}</span>
            </div>
            <span className="badge badge-high">Strictly Avoid</span>
          </div>

          <p style={{ fontSize: '0.9rem', color: 'var(--neutral-700)', lineHeight: 1.5, marginBottom: 14 }}>
            {lang === 'hi'
              ? "कीटनाशक या उर्वरक का छिड़काव आज न करें। बारिश से दवा धुल जाएगी और प्रभाव समाप्त हो जाएगा। गुरुवार को छिड़काव करें।"
              : "Rain may reduce the effectiveness of pesticide/fertilizer application. Avoid foliar chemical application before rainfall."}
          </p>

          <div style={{ fontSize: '0.76rem', color: 'var(--neutral-500)', background: 'var(--neutral-50)', padding: 8, borderRadius: 6 }}>
            <strong>Next Recommended Window:</strong> Thursday 07:00 AM (dry conditions).
          </div>
        </div>
      </div>

      {/* Crop-Specific Deep Dive Tabs */}
      <div className="gov-card" style={{ marginBottom: 28 }}>
        <div className="gov-card-header">
          <div className="gov-card-title">
            <Wheat size={18} color="var(--gov-navy)" />
            <span>Crop-Specific Advisory for {weather.name}</span>
          </div>

          {/* Crop Selector Tabs */}
          <div style={{ display: 'flex', gap: 6 }}>
            {[
              { key: 'paddy', label: 'Paddy (धान)' },
              { key: 'maize', label: 'Maize (मक्का)' },
              { key: 'vegetables', label: 'Vegetables (सब्जियां)' }
            ].map((c) => (
              <button
                key={c.key}
                onClick={() => setSelectedCrop(c.key as any)}
                style={{
                  padding: '5px 12px',
                  borderRadius: 6,
                  border: '1px solid var(--neutral-300)',
                  fontSize: '0.8rem',
                  fontWeight: selectedCrop === c.key ? 700 : 500,
                  background: selectedCrop === c.key ? 'var(--gov-navy)' : '#ffffff',
                  color: selectedCrop === c.key ? '#ffffff' : 'var(--neutral-700)',
                  cursor: 'pointer'
                }}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
          <div style={{ padding: 14, background: 'var(--neutral-50)', borderRadius: 8, border: '1px solid var(--neutral-200)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--neutral-500)', fontWeight: 600 }}>Active Growth Stage</div>
            <div style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--gov-navy)', marginTop: 2 }}>
              {activeCrop.stage}
            </div>
          </div>

          <div style={{ padding: 14, background: 'var(--neutral-50)', borderRadius: 8, border: '1px solid var(--neutral-200)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--neutral-500)', fontWeight: 600 }}>Irrigation Strategy</div>
            <div style={{ fontSize: '0.86rem', color: 'var(--neutral-800)', marginTop: 2, lineHeight: 1.4 }}>
              {activeCrop.irrigation}
            </div>
          </div>

          <div style={{ padding: 14, background: 'var(--neutral-50)', borderRadius: 8, border: '1px solid var(--neutral-200)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--neutral-500)', fontWeight: 600 }}>Protection & Spraying</div>
            <div style={{ fontSize: '0.86rem', color: 'var(--neutral-800)', marginTop: 2, lineHeight: 1.4 }}>
              {activeCrop.spraying}
            </div>
          </div>
        </div>
      </div>

      {/* Advisory Disclaimer Notice */}
      <div style={{ padding: 14, background: '#f8fafc', borderRadius: 8, border: '1px solid var(--neutral-200)', fontSize: '0.82rem', color: 'var(--neutral-600)', display: 'flex', alignItems: 'center', gap: 8 }}>
        <AlertCircle size={16} color="var(--neutral-500)" flex-shrink={0} />
        <span>
          <strong>Disclaimer:</strong> Weather-based agricultural advisories are intended for operational decision support and should be interpreted in conjunction with official district Krishi Vigyan Kendra (KVK) guidelines and personal field inspection.
        </span>
      </div>
    </div>
  );
};
