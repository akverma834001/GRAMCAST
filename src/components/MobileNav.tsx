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
        className={`mobile-nav-btn ${activeTab === 'home' ? 'active' : ''}`}
        onClick={() => setActiveTab('home')}
      >
        <Home size={20} />
        <span>{t.navHome}</span>
      </button>

      <button 
        className={`mobile-nav-btn ${activeTab === 'panchayat' ? 'active' : ''}`}
        onClick={() => setActiveTab('panchayat')}
      >
        <MapPin size={20} />
        <span>{lang === 'hi' ? "पंचायत" : "My Panchayat"}</span>
      </button>

      <button 
        className={`mobile-nav-btn ${activeTab === 'map' ? 'active' : ''}`}
        onClick={() => setActiveTab('map')}
      >
        <Map size={20} />
        <span>{lang === 'hi' ? "नक्शा" : "Map"}</span>
      </button>

      <button 
        className={`mobile-nav-btn ${activeTab === 'risks' ? 'active' : ''}`}
        onClick={() => setActiveTab('risks')}
      >
        <AlertTriangle size={20} />
        <span>{lang === 'hi' ? "जोखिम" : "Risks"}</span>
      </button>

      <button 
        className={`mobile-nav-btn ${activeTab === 'agriculture' ? 'active' : ''}`}
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
