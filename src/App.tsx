import React, { useState } from 'react';
import { UserRole, Language, NavTab, LocationHierarchy } from './types';
import { DEFAULT_LOCATION } from './data/locations';
import { getPanchayatWeatherData } from './data/weatherData';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { MobileNav } from './components/MobileNav';
import { LocationModal } from './components/LocationModal';
import { HomeView } from './views/HomeView';
import { DownscaleEngineView } from './views/DownscaleEngineView';
import { MyPanchayatView } from './views/MyPanchayatView';
import { WeatherMapView } from './views/WeatherMapView';
import { ForecastView } from './views/ForecastView';
import { RisksAlertsView } from './views/RisksAlertsView';
import { AgricultureView } from './views/AgricultureView';
import { InsightsView } from './views/InsightsView';
import { OfficerDashboardView } from './views/OfficerDashboardView';
import { ValidationView } from './views/ValidationView';
import { SelfCorrectionView } from './views/SelfCorrectionView';
import { AboutView } from './views/AboutView';
import { DemoWalkthroughModal } from './components/DemoWalkthroughModal';
import './App.css';

export function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>('farmer');
  const [lang, setLang] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [currentLocation, setCurrentLocation] = useState<LocationHierarchy>(DEFAULT_LOCATION);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isMobileMoreOpen, setIsMobileMoreOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  // Derive weather data for current Panchayat
  const weather = getPanchayatWeatherData(
    currentLocation.panchayat,
    currentLocation.block,
    currentLocation.district,
    currentLocation.state
  );

  const activeRiskCount = weather.risks.filter(r => r.severity === 'High' || r.severity === 'Moderate').length;

  const handleSelectLocation = (loc: LocationHierarchy) => {
    setCurrentLocation(loc);
  };

  const handleSelectPanchayat = (panchayatName: string) => {
    setCurrentLocation(prev => ({
      ...prev,
      panchayat: panchayatName
    }));
  };

  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
    if (role === 'officer' && activeTab === 'home') {
      setActiveTab('officer');
    } else if (role === 'technical' && activeTab === 'home') {
      setActiveTab('validation');
    } else if (role === 'farmer' && (activeTab === 'officer' || activeTab === 'validation')) {
      setActiveTab('panchayat');
    }
  };

  return (
    <div className="app-container">
      {/* Top Header */}
      <Header
        currentRole={currentRole}
        setRole={handleRoleChange}
        lang={lang}
        setLang={setLang}
        onOpenLocationModal={() => setIsLocationModalOpen(true)}
        currentPanchayatName={currentLocation.panchayat}
        onRunDemoWalkthrough={() => setIsDemoModalOpen(true)}
        onNavigateTo={setActiveTab}
      />

      <div className="main-layout">
        {/* Desktop Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          currentRole={currentRole}
          lang={lang}
          activeRiskCount={activeRiskCount}
        />

        {/* Primary Page Content */}
        <main className="main-content">
          {(activeTab === 'home' || activeTab === 'overview') && (
            <HomeView
              currentLocation={currentLocation}
              onOpenLocationModal={() => setIsLocationModalOpen(true)}
              onSelectPanchayat={handleSelectPanchayat}
              onNavigateTo={setActiveTab}
              lang={lang}
            />
          )}

          {activeTab === 'downscale' && (
            <DownscaleEngineView
              currentLocation={currentLocation}
              onSelectPanchayat={handleSelectPanchayat}
              onNavigateTo={setActiveTab}
              lang={lang}
            />
          )}

          {activeTab === 'panchayat' && (
            <MyPanchayatView
              weather={weather}
              lang={lang}
              onOpenLocationModal={() => setIsLocationModalOpen(true)}
              onNavigateTo={setActiveTab}
            />
          )}

          {activeTab === 'map' && (
            <WeatherMapView
              weather={weather}
              onSelectPanchayat={handleSelectPanchayat}
              onNavigateTo={setActiveTab}
              lang={lang}
            />
          )}

          {activeTab === 'forecast' && (
            <ForecastView
              weather={weather}
              lang={lang}
            />
          )}

          {activeTab === 'risks' && (
            <RisksAlertsView
              onSelectPanchayat={handleSelectPanchayat}
              onNavigateTo={setActiveTab}
              lang={lang}
            />
          )}

          {(activeTab === 'agriculture' || activeTab === 'advisory') && (
            <AgricultureView
              weather={weather}
              lang={lang}
            />
          )}

          {(activeTab === 'insights' || activeTab === 'methodology') && (
            <InsightsView
              weather={weather}
              lang={lang}
            />
          )}

          {activeTab === 'officer' && (
            <OfficerDashboardView
              onSelectPanchayat={handleSelectPanchayat}
              onNavigateTo={setActiveTab}
              lang={lang}
            />
          )}

          {activeTab === 'validation' && (
            <ValidationView
              lang={lang}
            />
          )}

          {activeTab === 'self-correction' && (
            <SelfCorrectionView
              lang={lang}
            />
          )}

          {activeTab === 'about' && (
            <AboutView
              lang={lang}
            />
          )}
        </main>
      </div>

      {/* Demo Walkthrough Modal (45s Automated SIH Evaluator Walkthrough) */}
      <DemoWalkthroughModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onSelectPanchayat={handleSelectPanchayat}
        onNavigateTo={setActiveTab}
        lang={lang}
      />

      {/* Mobile Bottom Navigation */}
      <MobileNav
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        lang={lang}
        onOpenMore={() => setIsMobileMoreOpen(true)}
      />

      {/* Location Modal */}
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        currentLocation={currentLocation}
        onSelectLocation={handleSelectLocation}
        lang={lang}
      />

      {/* Mobile Overflow Menu Drawer */}
      {isMobileMoreOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.7)',
          zIndex: 3000,
          display: 'flex',
          justifyContent: 'flex-end'
        }}
        onClick={() => setIsMobileMoreOpen(false)}
        >
          <div style={{
            background: '#ffffff',
            width: '80%',
            maxWidth: 320,
            height: '100%',
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 12
          }}
          onClick={e => e.stopPropagation()}
          >
            <div style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--gov-navy)', marginBottom: 8 }}>
              GRAMCAST Navigation
            </div>

            <button 
              className={`nav-link ${activeTab === 'downscale' ? 'active' : ''}`}
              style={{ fontWeight: 700, color: '#0284c7' }}
              onClick={() => { setActiveTab('downscale'); setIsMobileMoreOpen(false); }}
            >
              ⚡ Downscale Engine (Core)
            </button>

            <button 
              className={`nav-link ${activeTab === 'panchayat' ? 'active' : ''}`}
              onClick={() => { setActiveTab('panchayat'); setIsMobileMoreOpen(false); }}
            >
              📍 My Panchayat
            </button>

            <button 
              className={`nav-link ${activeTab === 'forecast' ? 'active' : ''}`}
              onClick={() => { setActiveTab('forecast'); setIsMobileMoreOpen(false); }}
            >
              📅 7-Day Forecast
            </button>

            <button 
              className={`nav-link ${activeTab === 'insights' || activeTab === 'methodology' ? 'active' : ''}`}
              onClick={() => { setActiveTab('insights'); setIsMobileMoreOpen(false); }}
            >
              🔬 Data & Method (Technical)
            </button>

            <button 
              className={`nav-link ${activeTab === 'officer' ? 'active' : ''}`}
              onClick={() => { setActiveTab('officer'); setIsMobileMoreOpen(false); }}
            >
              Officer Dashboard
            </button>

            <button 
              className={`nav-link ${activeTab === 'validation' ? 'active' : ''}`}
              onClick={() => { setActiveTab('validation'); setIsMobileMoreOpen(false); }}
            >
              Forecast Validation
            </button>

            <button 
              className={`nav-link ${activeTab === 'self-correction' ? 'active' : ''}`}
              onClick={() => { setActiveTab('self-correction'); setIsMobileMoreOpen(false); }}
            >
              Self-Correction Loop
            </button>

            <button 
              className={`nav-link ${activeTab === 'about' ? 'active' : ''}`}
              onClick={() => { setActiveTab('about'); setIsMobileMoreOpen(false); }}
            >
              About GRAMCAST
            </button>

            <div style={{ marginTop: 'auto' }}>
              <button 
                className="btn btn-secondary" 
                style={{ width: '100%' }}
                onClick={() => setIsMobileMoreOpen(false)}
              >
                Close Menu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
