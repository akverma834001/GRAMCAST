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
  HelpCircle 
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
          {lang === 'hi' ? "किसान डैशबोर्ड" : "Farmer Experience"}
        </div>

        <button 
          className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
        >
          <Home size={18} />
          <span>{t.navHome}</span>
        </button>

        <button 
          className={`nav-link ${activeTab === 'panchayat' ? 'active' : ''}`}
          onClick={() => setActiveTab('panchayat')}
        >
          <MapPin size={18} />
          <span>{t.navPanchayat}</span>
        </button>

        <button 
          className={`nav-link ${activeTab === 'map' ? 'active' : ''}`}
          onClick={() => setActiveTab('map')}
        >
          <Map size={18} />
          <span>{t.navMap}</span>
        </button>

        <button 
          className={`nav-link ${activeTab === 'forecast' ? 'active' : ''}`}
          onClick={() => setActiveTab('forecast')}
        >
          <CalendarDays size={18} />
          <span>{t.navForecast}</span>
        </button>

        <button 
          className={`nav-link ${activeTab === 'risks' ? 'active' : ''}`}
          onClick={() => setActiveTab('risks')}
        >
          <AlertTriangle size={18} />
          <span>{t.navRisks}</span>
          {activeRiskCount > 0 && (
            <span className="nav-badge-count" style={{ background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca' }}>
              {activeRiskCount}
            </span>
          )}
        </button>

        <button 
          className={`nav-link ${activeTab === 'agriculture' ? 'active' : ''}`}
          onClick={() => setActiveTab('agriculture')}
        >
          <Sprout size={18} />
          <span>{t.navAgri}</span>
        </button>

        <button 
          className={`nav-link ${activeTab === 'insights' ? 'active' : ''}`}
          onClick={() => setActiveTab('insights')}
        >
          <Fingerprint size={18} />
          <span>{t.navInsights}</span>
        </button>

        <div className="nav-category" style={{ marginTop: 12 }}>
          {lang === 'hi' ? "सुपर-रेज़ोल्यूशन व विश्लेषण" : "Intelligence & Validation"}
        </div>

        <button 
          className={`nav-link ${activeTab === 'insights' ? '' : ''}`}
          onClick={() => setActiveTab('insights')}
          style={{ display: 'none' }} // placeholder
        />

        <button 
          className={`nav-link ${activeTab === 'officer' ? 'active' : ''}`}
          onClick={() => setActiveTab('officer')}
        >
          <Users size={18} />
          <span>{t.navOfficer}</span>
          {currentRole === 'officer' && (
            <span className="nav-badge-count" style={{ background: '#ecfdf5', color: '#059669' }}>
              Active
            </span>
          )}
        </button>

        <button 
          className={`nav-link ${activeTab === 'validation' ? 'active' : ''}`}
          onClick={() => setActiveTab('validation')}
        >
          <LineChart size={18} />
          <span>{t.navValidation}</span>
        </button>

        <button 
          className={`nav-link ${activeTab === 'self-correction' ? 'active' : ''}`}
          onClick={() => setActiveTab('self-correction')}
        >
          <RefreshCw size={18} />
          <span>{t.navSelfCorrection}</span>
        </button>

        <div className="nav-category" style={{ marginTop: 12 }}>
          {lang === 'hi' ? "प्रणाली विवरण" : "Platform"}
        </div>

        <button 
          className={`nav-link ${activeTab === 'about' ? 'active' : ''}`}
          onClick={() => setActiveTab('about')}
        >
          <HelpCircle size={18} />
          <span>{t.navAbout}</span>
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
