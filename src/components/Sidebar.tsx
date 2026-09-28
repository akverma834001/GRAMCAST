import React from 'react';
import { 
  Home, 
  MapPin, 
  Map, 
  CalendarDays, 
  AlertTriangle, 
  Sprout, 
  Fingerprint, 
  Users, 
  LineChart, 
  RefreshCw, 
  HelpCircle,
  Cpu 
} from 'lucide-react';
import { NavTab, UserRole, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface SidebarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  currentRole: UserRole;
  lang: Language;
  activeRiskCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  currentRole,
  lang,
  activeRiskCount
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <div className="nav-category">
          {lang === 'hi' ? "कोर डाउनस्केलिंग इंजन" : "Core Downscaling Engine"}
        </div>

        <button 
          className={`nav-link ${activeTab === 'home' || activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
        >
          <Home size={18} />
          <span>{lang === 'hi' ? "अवलोकन (Overview)" : "Overview"}</span>
        </button>

        {/* PRIMARY CORE FEATURE: Downscale Engine (Section 2 & 25) */}
        <button 
          className={`nav-link ${activeTab === 'downscale' ? 'active' : ''}`}
          onClick={() => setActiveTab('downscale')}
          style={{
            background: activeTab === 'downscale' ? 'linear-gradient(135deg, #1e3a8a 0%, #0369a1 100%)' : 'rgba(30, 58, 138, 0.06)',
            color: activeTab === 'downscale' ? '#ffffff' : 'var(--gov-navy)',
            fontWeight: 700,
            border: '1px solid rgba(2, 132, 199, 0.3)',
            boxShadow: activeTab === 'downscale' ? '0 4px 12px rgba(2, 132, 199, 0.25)' : 'none'
          }}
        >
          <Cpu size={18} color={activeTab === 'downscale' ? '#38bdf8' : '#0284c7'} />
          <span style={{ flex: 1 }}>{lang === 'hi' ? "डाउनस्केल इंजन" : "Downscale Engine"}</span>
          <span style={{
            fontSize: '0.65rem',
            background: activeTab === 'downscale' ? '#38bdf8' : '#0284c7',
            color: activeTab === 'downscale' ? '#0f172a' : '#ffffff',
            padding: '1px 6px',
            borderRadius: 10,
            fontWeight: 800,
            letterSpacing: '0.02em'
          }}>
            CORE
          </span>
        </button>

        <button 
          className={`nav-link ${activeTab === 'map' ? 'active' : ''}`}
          onClick={() => setActiveTab('map')}
        >
          <Map size={18} />
          <span>{lang === 'hi' ? "पंचायत नक्शा (Map)" : "Panchayat Map"}</span>
        </button>

        <div className="nav-category" style={{ marginTop: 14 }}>
          {lang === 'hi' ? "मौसम पूर्वानुमान व कृषि" : "Forecast & Advisory"}
        </div>

        <button 
          className={`nav-link ${activeTab === 'panchayat' ? 'active' : ''}`}
          onClick={() => setActiveTab('panchayat')}
        >
          <MapPin size={18} />
          <span>{lang === 'hi' ? "मेरी पंचायत" : "My Panchayat"}</span>
        </button>

        <button 
          className={`nav-link ${activeTab === 'forecast' ? 'active' : ''}`}
          onClick={() => setActiveTab('forecast')}
        >
          <CalendarDays size={18} />
          <span>{lang === 'hi' ? "7-दिवसीय पूर्वानुमान" : "7-Day Forecast"}</span>
        </button>

        <button 
          className={`nav-link ${activeTab === 'agriculture' || activeTab === 'advisory' ? 'active' : ''}`}
          onClick={() => setActiveTab('agriculture')}
        >
          <Sprout size={18} />
          <span>{lang === 'hi' ? "कृषि सलाह (Advisory)" : "Agro Advisory"}</span>
        </button>

        <button 
          className={`nav-link ${activeTab === 'risks' ? 'active' : ''}`}
          onClick={() => setActiveTab('risks')}
        >
          <AlertTriangle size={18} />
          <span>{lang === 'hi' ? "मौसम जोखिम" : "Weather Risks"}</span>
          {activeRiskCount > 0 && (
            <span className="nav-badge-count" style={{ background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca' }}>
              {activeRiskCount}
            </span>
          )}
        </button>

        <div className="nav-category" style={{ marginTop: 14 }}>
          {lang === 'hi' ? "सत्यापन व तकनीकी विवरण" : "Validation & Technical"}
        </div>

        <button 
          className={`nav-link ${activeTab === 'validation' ? 'active' : ''}`}
          onClick={() => setActiveTab('validation')}
        >
          <LineChart size={18} />
          <span>{lang === 'hi' ? "पूर्वानुमान सत्यापन" : "Forecast Validation"}</span>
        </button>

        <button 
          className={`nav-link ${activeTab === 'insights' || activeTab === 'methodology' ? 'active' : ''}`}
          onClick={() => setActiveTab('insights')}
        >
          <Fingerprint size={18} />
          <span>{lang === 'hi' ? "डेटा व पद्धति" : "Data & Method"}</span>
        </button>

        <button 
          className={`nav-link ${activeTab === 'officer' ? 'active' : ''}`}
          onClick={() => setActiveTab('officer')}
        >
          <Users size={18} />
          <span>{lang === 'hi' ? "अधिकारी डैशबोर्ड" : "Officer Dashboard"}</span>
          {currentRole === 'officer' && (
            <span className="nav-badge-count" style={{ background: '#ecfdf5', color: '#059669' }}>
              Active
            </span>
          )}
        </button>

        <button 
          className={`nav-link ${activeTab === 'about' ? 'active' : ''}`}
          onClick={() => setActiveTab('about')}
        >
          <HelpCircle size={18} />
          <span>{lang === 'hi' ? "ग्रामकास्ट परिचय" : "About GRAMCAST"}</span>
        </button>
      </nav>

      {/* Sidebar Footer Info */}
      <div style={{ marginTop: 'auto', padding: '16px 20px', borderTop: '1px solid var(--neutral-200)', fontSize: '0.75rem', color: 'var(--neutral-500)' }}>
        <div style={{ fontWeight: 600, color: 'var(--neutral-700)', marginBottom: 2 }}>GRAMCAST Engine v2.4</div>
        <div>Physics Super-Resolution: Active</div>
        <div style={{ color: '#059669', display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#059669' }}></span>
          <span>IMD/NWP Downscaled</span>
        </div>
      </div>
    </aside>
  );
};
