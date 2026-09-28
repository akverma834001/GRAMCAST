import React from 'react';
import { Home, MapPin, Map, AlertTriangle, Sprout, MoreHorizontal } from 'lucide-react';
import { NavTab, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface MobileNavProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  lang: Language;
  onOpenMore: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  activeTab,
  setActiveTab,
  lang,
  onOpenMore
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <nav className="mobile-bottom-nav">
      <button 
        className={`mobile-nav-btn ${activeTab === 'home' || activeTab === 'overview' ? 'active' : ''}`}
        onClick={() => setActiveTab('home')}
      >
        <Home size={20} />
        <span>{lang === 'hi' ? "होम" : "Home"}</span>
      </button>

      {/* CORE DOWNSCALING BUTTON */}
      <button 
        className={`mobile-nav-btn ${activeTab === 'downscale' ? 'active' : ''}`}
        onClick={() => setActiveTab('downscale')}
        style={{ color: activeTab === 'downscale' ? '#0284c7' : 'inherit' }}
      >
        <span style={{ fontSize: '1.2rem' }}>⚡</span>
        <span style={{ fontWeight: 700 }}>{lang === 'hi' ? "डाउनस्केल" : "Downscale"}</span>
      </button>

      <button 
        className={`mobile-nav-btn ${activeTab === 'map' ? 'active' : ''}`}
        onClick={() => setActiveTab('map')}
      >
        <Map size={20} />
        <span>{lang === 'hi' ? "नक्शा" : "Map"}</span>
      </button>

      <button 
        className={`mobile-nav-btn ${activeTab === 'agriculture' || activeTab === 'advisory' ? 'active' : ''}`}
        onClick={() => setActiveTab('agriculture')}
      >
        <Sprout size={20} />
        <span>{lang === 'hi' ? "सलाह" : "Advisory"}</span>
      </button>

      <button 
        className="mobile-nav-btn"
        onClick={onOpenMore}
      >
        <MoreHorizontal size={20} />
        <span>{lang === 'hi' ? "अधिक" : "More"}</span>
      </button>
    </nav>
  );
};
