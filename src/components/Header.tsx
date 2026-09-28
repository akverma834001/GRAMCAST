import React, { useState } from 'react';
import { CloudRain, Globe, User, ShieldAlert, Info, X } from 'lucide-react';
import { UserRole, Language, NavTab } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface HeaderProps {
  currentRole: UserRole;
  setRole: (role: UserRole) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  onOpenLocationModal: () => void;
  currentPanchayatName: string;
  onRunDemoWalkthrough?: () => void;
  onNavigateTo?: (tab: NavTab) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  setRole,
  lang,
  setLang,
  onOpenLocationModal,
  currentPanchayatName,
  onRunDemoWalkthrough,
  onNavigateTo
}) => {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const t = TRANSLATIONS[lang];

  return (
    <>
      <div className="gov-top-accent"></div>
      
      {/* Demo Data Disclaimer Banner */}
      <div className="demo-banner">
        <div className="demo-banner-content">
          <span className="demo-pill">{t.demoBadge}</span>
          <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            <strong>SIH 2026 Problem SIH26074:</strong> Weather Forecast Downscaling from Block to Panchayat Level
          </span>
          {onRunDemoWalkthrough && (
            <button 
              className="btn btn-sm"
              style={{ background: '#f59e0b', color: '#78350f', fontWeight: 700, padding: '2px 10px', fontSize: '0.74rem', border: 'none', cursor: 'pointer', borderRadius: 4, display: 'flex', alignItems: 'center', gap: 4 }}
              onClick={onRunDemoWalkthrough}
            >
              <span>⚡</span>
              <span>Run 45s SIH Demo Walkthrough</span>
            </button>
          )}
          <button 
            className="btn btn-sm" 
            style={{ color: '#93c5fd', background: 'transparent', padding: '2px 8px', fontSize: '0.72rem' }}
            onClick={() => setShowDemoModal(true)}
          >
            <Info size={13} style={{ marginRight: 4 }} />
            Data Transparency
          </button>
        </div>
      </div>

      {/* Main Top Header */}
      <header className="top-header">
        <div className="header-content">
          <div className="brand-section" onClick={() => onNavigateTo ? onNavigateTo('home') : onOpenLocationModal()} style={{ cursor: 'pointer' }} title="GRAMCAST Home">
            <div className="emblem-icon">
              <CloudRain size={24} />
            </div>
            <div className="brand-titles">
              <div className="brand-name">
                GRAMCAST
                <span style={{ fontSize: '0.65rem', background: '#059669', color: '#fff', padding: '1px 6px', borderRadius: 4, fontWeight: 600 }}>
                  SIH26074
                </span>
              </div>
              <div className="brand-tagline">Block-level forecasts. Panchayat-level intelligence.</div>
            </div>
          </div>

          <div className="header-controls">
            {/* Resolution Transformation Pill */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              padding: '4px 10px',
              borderRadius: 20,
              fontSize: '0.75rem',
              color: '#e2e8f0'
            }}>
              <span style={{ color: '#94a3b8' }}>Resolution:</span>
              <span style={{ fontWeight: 600, color: '#f59e0b' }}>Block (12 km)</span>
              <span style={{ color: '#38bdf8' }}>──►</span>
              <span style={{ fontWeight: 700, color: '#10b981' }}>Panchayat (1 km)</span>
            </div>

            {/* Quick Location Badge */}
            <button 
              className="btn btn-secondary btn-sm"
              style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', borderColor: 'rgba(255,255,255,0.2)' }}
              onClick={onOpenLocationModal}
            >
              <span style={{ color: '#38bdf8' }}>📍</span>
              <span style={{ fontWeight: 600 }}>{currentPanchayatName}</span>
              <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>({t.changeLocation})</span>
            </button>

            {/* Language Switcher */}
            <div className="lang-switch-group">
              <button 
                className={`switch-btn ${lang === 'en' ? 'active' : ''}`}
                onClick={() => setLang('en')}
                title="Switch to English"
              >
                <Globe size={13} /> EN
              </button>
              <button 
                className={`switch-btn ${lang === 'hi' ? 'active' : ''}`}
                onClick={() => setLang('hi')}
                title="हिंदी में देखें"
              >
                हिंदी
              </button>
            </div>

            {/* Role Switcher */}
            <div className="role-switch-group">
              <button 
                className={`switch-btn ${currentRole === 'farmer' ? 'active' : ''}`}
                onClick={() => setRole('farmer')}
                title="Farmer First View"
              >
                <User size={13} /> {t.farmerRole}
              </button>
              <button 
                className={`switch-btn ${currentRole === 'officer' ? 'active' : ''}`}
                onClick={() => setRole('officer')}
                title="Officer Multi-Panchayat View"
              >
                {t.officerRole}
              </button>
              <button 
                className={`switch-btn ${currentRole === 'technical' ? 'active' : ''}`}
                onClick={() => setRole('technical')}
                title="Technical & Downscaling Metrics"
              >
                {t.techRole}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Demo Modal */}
      {showDemoModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          padding: 16
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: 12,
            maxWidth: 540,
            width: '100%',
            padding: 24,
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, borderBottom: '1px solid #e2e8f0', paddingBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#0f2744', fontWeight: 700, fontSize: '1.1rem' }}>
                <ShieldAlert size={20} color="#d97706" />
                Prototype & Data Fidelity Notice
              </div>
              <button onClick={() => setShowDemoModal(false)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#64748b' }}>
                <X size={20} />
              </button>
            </div>
            
            <p style={{ fontSize: '0.9rem', color: '#334155', marginBottom: 14, lineHeight: 1.5 }}>
              <strong>GRAMCAST is an academic prototype for Smart India Hackathon 2026.</strong>
            </p>
            <p style={{ fontSize: '0.88rem', color: '#475569', marginBottom: 12, lineHeight: 1.5 }}>
              The numerical values, satellite overlays, and localized downscaling maps shown here represent 
              <strong> realistic demonstration data calibrated on Kanke Block (Ranchi, Jharkhand)</strong>.
            </p>
            <ul style={{ fontSize: '0.85rem', color: '#475569', paddingLeft: 20, marginBottom: 18, lineHeight: 1.6 }}>
              <li>Designed for seamless integration with operational IMD NWP feeds (GFS/NCUM).</li>
              <li>Physics-guided super-resolution accounts for SRTM DEM elevation, Sentinel-2 NDVI, and local telemetry.</li>
              <li>Official agricultural decisions should always reference district KVK advisories.</li>
            </ul>

            <button 
              className="btn btn-primary" 
              style={{ width: '100%' }}
              onClick={() => setShowDemoModal(false)}
            >
              Understood / Continue Exploring
            </button>
          </div>
        </div>
      )}
    </>
  );
};
