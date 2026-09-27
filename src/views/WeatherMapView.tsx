import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import { 
  Layers, 
  MapPin, 
  Droplets, 
  Thermometer, 
  ShieldAlert, 
  ExternalLink 
} from 'lucide-react';
import { Language, PanchayatData } from '../types';
import { KANKE_PANCHAYATS_GEOJSON, KANKE_BLOCK_COARSE_GRID } from '../data/geoJsonData';
import { getPanchayatImage } from '../data/weatherData';

interface WeatherMapViewProps {
  weather: PanchayatData;
  onSelectPanchayat: (name: string) => void;
  onNavigateTo: (tab: any) => void;
  lang: Language;
}

type MapLayerType = 'rainfall' | 'temperature' | 'humidity' | 'risk';

export const WeatherMapView: React.FC<WeatherMapViewProps> = ({
  weather,
  onSelectPanchayat,
  onNavigateTo,
  lang
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const geoJsonLayerRef = useRef<L.GeoJSON | null>(null);

  const [activeLayer, setActiveLayer] = useState<MapLayerType>('rainfall');
  const [resolutionView, setResolutionView] = useState<'gramcast' | 'block'>('gramcast');
  const [selectedFeature, setSelectedFeature] = useState<{
    name: string;
    hindiName: string;
    rainfallMm: number;
    rainProb: number;
    tempC: number;
    humidity: number;
    risk: 'Low' | 'Moderate' | 'High';
    confidence: string;
    elevation: number;
  }>({
    name: weather.name,
    hindiName: weather.hindiName,
    rainfallMm: weather.current.rainfallExpectedMm,
    rainProb: weather.current.rainProb,
    tempC: weather.current.temp,
    humidity: weather.current.humidity,
    risk: (weather.risks[0]?.severity || 'Moderate') as any,
    confidence: weather.confidence.level,
    elevation: weather.elevation
  });

  // Color functions based on layer
  const getFeatureColor = (props: any, layer: MapLayerType, isBlock: boolean) => {
    if (isBlock) {
      return '#3b82f6';
    }

    if (layer === 'rainfall') {
      const r = props.rainfallMm || 10;
      if (r > 20) return '#1e3a8a'; // deep navy
      if (r > 15) return '#0284c7'; // ocean blue
      if (r > 10) return '#38bdf8'; // light sky blue
      return '#bae6fd';
    } else if (layer === 'temperature') {
      const temp = props.tempC || 28;
      if (temp > 28) return '#ea580c'; // orange
      if (temp > 27) return '#f59e0b'; // amber
      return '#eab308'; // yellow
    } else if (layer === 'humidity') {
      const h = props.humidity || 75;
      if (h > 82) return '#065f46'; // dark emerald
      if (h > 78) return '#059669'; // emerald
      return '#10b981';
    } else {
      // Risk layer
      const risk = props.risk || 'Low';
      if (risk === 'High') return '#dc2626';
      if (risk === 'Moderate') return '#f59e0b';
      return '#10b981';
    }
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Initialize map centered on Kanke Block (lat: 23.45, lng: 85.32)
      const map = L.map(mapContainerRef.current, {
        center: [23.45, 85.32],
        zoom: 12,
        scrollWheelZoom: true
      });

      // Credible OpenStreetMap base layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors | IMD/GRAMCAST',
        maxZoom: 18
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Remove existing GeoJSON layer
    if (geoJsonLayerRef.current) {
      map.removeLayer(geoJsonLayerRef.current);
    }

    // Determine data source based on resolutionView
    const dataSource = resolutionView === 'gramcast' ? KANKE_PANCHAYATS_GEOJSON : KANKE_BLOCK_COARSE_GRID;

    const newGeoJsonLayer = L.geoJSON(dataSource as any, {
      style: (feature) => {
        const props = feature?.properties || {};
        const isBlock = resolutionView === 'block';
        return {
          fillColor: getFeatureColor(props, activeLayer, isBlock),
          weight: isBlock ? 3 : 1.8,
          opacity: 1,
          color: isBlock ? '#1e3a8a' : '#0f2744',
          dashArray: isBlock ? '6, 6' : '',
          fillOpacity: isBlock ? 0.35 : 0.65
        };
      },
      onEachFeature: (feature, layer) => {
        const props = feature.properties || {};
        const name = props.name || "Panchayat";

        // Bind tooltip
        layer.bindTooltip(name, {
          permanent: false,
          direction: 'center',
          className: 'panchayat-polygon-tooltip'
        });

        // Click handler
        layer.on({
          click: () => {
            if (resolutionView === 'gramcast') {
              setSelectedFeature({
                name: props.name,
                hindiName: props.hindiName || props.name,
                rainfallMm: props.rainfallMm || 15,
                rainProb: props.rainProb || 70,
                tempC: props.tempC || 28,
                humidity: props.humidity || 78,
                risk: props.risk || 'Moderate',
                confidence: props.confidence || 'Moderate',
                elevation: props.elevation || 620
              });
            } else {
              setSelectedFeature({
                name: props.name,
                hindiName: props.name,
                rainfallMm: props.uniformRainfallMm || 8.5,
                rainProb: 60,
                tempC: props.uniformTempC || 29,
                humidity: 75,
                risk: 'Low',
                confidence: 'Coarse NWP',
                elevation: 620
              });
            }
          },
          mouseover: (e) => {
            const target = e.target;
            target.setStyle({
              weight: 3,
              fillOpacity: 0.85
            });
          },
          mouseout: (e) => {
            newGeoJsonLayer.resetStyle(e.target);
          }
        });
      }
    }).addTo(map);

    geoJsonLayerRef.current = newGeoJsonLayer;

  }, [activeLayer, resolutionView]);

  return (
    <div>
      {/* Map Header & Controls */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--gov-navy)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Layers size={22} color="var(--gov-navy)" />
            <span>{lang === 'hi' ? "पंचायत मौसम मानचित्र (GIS नक्शा)" : "Panchayat Weather Map (GIS)"}</span>
          </h1>
          <p style={{ fontSize: '0.82rem', color: 'var(--neutral-500)' }}>
            Kanke Block, Ranchi District • Click any Panchayat to inspect localized micro-climate
          </p>
        </div>

        {/* Resolution Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#ffffff', padding: 4, borderRadius: 8, border: '1px solid var(--neutral-300)' }}>
          <button
            onClick={() => setResolutionView('block')}
            style={{
              padding: '6px 12px',
              borderRadius: 6,
              border: 'none',
              fontSize: '0.8rem',
              fontWeight: resolutionView === 'block' ? 700 : 500,
              background: resolutionView === 'block' ? 'var(--neutral-100)' : 'transparent',
              color: resolutionView === 'block' ? 'var(--gov-navy)' : 'var(--neutral-600)',
              cursor: 'pointer'
            }}
          >
            Block View (12km Coarse)
          </button>
          <button
            onClick={() => setResolutionView('gramcast')}
            style={{
              padding: '6px 12px',
              borderRadius: 6,
              border: 'none',
              fontSize: '0.8rem',
              fontWeight: resolutionView === 'gramcast' ? 700 : 500,
              background: resolutionView === 'gramcast' ? 'var(--gov-navy)' : 'transparent',
              color: resolutionView === 'gramcast' ? '#ffffff' : 'var(--neutral-600)',
              cursor: 'pointer'
            }}
          >
            GRAMCAST View (1km Downscaled)
          </button>
        </div>
      </div>

      {/* Layer Toggle Bar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--neutral-600)', marginRight: 4 }}>
          {lang === 'hi' ? "परतें (Layers):" : "Active Weather Layer:"}
        </span>

        {[
          { key: 'rainfall', label: lang === 'hi' ? 'वर्षा (Rainfall)' : 'Rainfall (mm)', icon: <Droplets size={14} /> },
          { key: 'temperature', label: lang === 'hi' ? 'तापमान (Temperature)' : 'Temperature (°C)', icon: <Thermometer size={14} /> },
          { key: 'humidity', label: lang === 'hi' ? 'आर्द्रता (Humidity)' : 'Humidity (%)', icon: <Droplets size={14} /> },
          { key: 'risk', label: lang === 'hi' ? 'मौसम जोखिम (Risk)' : 'Weather Risk', icon: <ShieldAlert size={14} /> }
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => setActiveLayer(item.key as MapLayerType)}
            className={`btn btn-sm ${activeLayer === item.key ? 'btn-primary' : 'btn-secondary'}`}
            style={{ display: 'flex', alignItems: 'center', gap: 6 }}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Map Layout: Left Map, Right Panel */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 320px', gap: 20 }}>
        {/* Leaflet Map Div */}
        <div style={{ position: 'relative', height: 520, borderRadius: 12, overflow: 'hidden', border: '1px solid var(--neutral-300)', boxShadow: 'var(--shadow-sm)' }}>
          <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }}></div>

          {/* Map Legend Overlay */}
          <div style={{
            position: 'absolute',
            bottom: 16,
            left: 16,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(4px)',
            borderRadius: 8,
            padding: '10px 14px',
            fontSize: '0.75rem',
            border: '1px solid rgba(0,0,0,0.1)',
            zIndex: 1000,
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontWeight: 700, color: 'var(--gov-navy)', marginBottom: 6, textTransform: 'uppercase' }}>
              {activeLayer === 'rainfall' ? 'Rainfall Scale (mm)' :
               activeLayer === 'temperature' ? 'Temperature Scale (°C)' :
               activeLayer === 'humidity' ? 'Relative Humidity (%)' : 'Risk Severity'}
            </div>

            {activeLayer === 'rainfall' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 14, height: 14, background: '#1e3a8a', borderRadius: 2 }}></span>
                  <span>&gt; 20 mm (Heavy rain spell)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 14, height: 14, background: '#0284c7', borderRadius: 2 }}></span>
                  <span>15 – 20 mm (Moderate rain)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 14, height: 14, background: '#38bdf8', borderRadius: 2 }}></span>
                  <span>10 – 15 mm (Light-Moderate)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 14, height: 14, background: '#bae6fd', borderRadius: 2 }}></span>
                  <span>&lt; 10 mm (Scattered showers)</span>
                </div>
              </div>
            )}

            {activeLayer === 'risk' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 14, height: 14, background: '#dc2626', borderRadius: 2 }}></span>
                  <span>High Risk (Runoff / Saturated)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 14, height: 14, background: '#f59e0b', borderRadius: 2 }}></span>
                  <span>Moderate Risk (Spray / Harvest delay)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 14, height: 14, background: '#10b981', borderRadius: 2 }}></span>
                  <span>Low Risk (Normal field conditions)</span>
                </div>
              </div>
            )}

            {activeLayer === 'temperature' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 14, height: 14, background: '#ea580c', borderRadius: 2 }}></span>
                  <span>&gt; 28°C (Warmer valley floor)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 14, height: 14, background: '#eab308', borderRadius: 2 }}></span>
                  <span>&lt; 27°C (Cooler plateau ridge)</span>
                </div>
              </div>
            )}

            {activeLayer === 'humidity' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 14, height: 14, background: '#059669', borderRadius: 2 }}></span>
                <span>70% — 88% Moisture Saturation</span>
              </div>
            )}
          </div>
        </div>

        {/* SECTION 12: Compact Information Panel */}
        <div className="gov-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', color: 'var(--neutral-500)', textTransform: 'uppercase', marginBottom: 4 }}>
              <MapPin size={14} color="#0284c7" />
              <span>Selected Panchayat</span>
            </div>

            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--gov-navy)', marginBottom: 2 }}>
              {selectedFeature.name}
            </h3>
            <div style={{ fontSize: '0.8rem', color: 'var(--neutral-500)', marginBottom: 12 }}>
              Kanke Block • Elev: {selectedFeature.elevation}m
            </div>

            {/* Real Area Photo */}
            {(() => {
              const pImage = getPanchayatImage(selectedFeature.name);
              return (
                <div style={{ position: 'relative', height: 135, borderRadius: 8, overflow: 'hidden', marginBottom: 14, border: '1px solid var(--neutral-200)' }}>
                  <img 
                    src={pImage.url} 
                    alt={pImage.alt} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
                  />
                  <span 
                    className="badge" 
                    style={{ 
                      position: 'absolute', 
                      top: 6, 
                      left: 6, 
                      background: 'rgba(15, 23, 42, 0.85)', 
                      color: '#ffffff', 
                      backdropFilter: 'blur(4px)', 
                      fontSize: '0.65rem',
                      padding: '2px 6px'
                    }}
                  >
                    Real Ground View
                  </span>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)', padding: '6px 8px', color: '#ffffff', fontSize: '0.7rem', lineHeight: 1.25 }}>
                    {lang === 'hi' ? pImage.hindiCaption : pImage.caption}
                  </div>
                </div>
              );
            })()}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, background: 'var(--neutral-50)', padding: 14, borderRadius: 8, border: '1px solid var(--neutral-200)', marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.84rem', color: 'var(--neutral-600)' }}>Expected rainfall:</span>
                <span style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--gov-navy)' }}>
                  {selectedFeature.rainfallMm} mm
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.84rem', color: 'var(--neutral-600)' }}>Rain probability:</span>
                <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0284c7' }}>
                  {selectedFeature.rainProb}%
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.84rem', color: 'var(--neutral-600)' }}>Temperature:</span>
                <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--neutral-800)' }}>
                  {selectedFeature.tempC}°C
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.84rem', color: 'var(--neutral-600)' }}>Risk:</span>
                <span className={`badge ${selectedFeature.risk === 'High' ? 'badge-high' : selectedFeature.risk === 'Moderate' ? 'badge-moderate' : 'badge-low'}`}>
                  {selectedFeature.risk}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.84rem', color: 'var(--neutral-600)' }}>Confidence:</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--agri-green-dark)' }}>
                  {selectedFeature.confidence}
                </span>
              </div>
            </div>

            <div style={{ fontSize: '0.8rem', color: 'var(--neutral-600)', lineHeight: 1.45, padding: '8px 10px', background: '#eff6ff', borderRadius: 6, border: '1px solid #bfdbfe' }}>
              <strong>Notice:</strong> Click on different Panchayats on the map to compare micro-climatic variances across Kanke block.
            </div>
          </div>

          <button 
            className="btn btn-primary"
            style={{ width: '100%', marginTop: 16 }}
            onClick={() => {
              onSelectPanchayat(selectedFeature.name);
              onNavigateTo('panchayat');
            }}
          >
            <span>{lang === 'hi' ? "विवरण देखें" : "VIEW DETAILS"}</span>
            <ExternalLink size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
