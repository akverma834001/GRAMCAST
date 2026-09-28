import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import { 
  Layers, 
  MapPin, 
  Droplets, 
  Thermometer, 
  ShieldAlert, 
  ExternalLink,
  ArrowRight,
  Sparkles,
  Info,
  CheckCircle2
} from 'lucide-react';
import { Language, PanchayatData } from '../types';
import { 
  KANKE_PANCHAYATS_GEOJSON, 
  KANKE_BLOCK_COARSE_GRID,
  BODH_GAYA_PANCHAYATS_GEOJSON,
  BODH_GAYA_BLOCK_COARSE_GRID
} from '../data/geoJsonData';
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

  // Active block selection: Bodh Gaya (Bihar) or Kanke (Jharkhand)
  const [selectedBlock, setSelectedBlock] = useState<'Bodh Gaya' | 'Kanke'>(
    weather.block === 'Bodh Gaya' ? 'Bodh Gaya' : 'Bodh Gaya'
  );

  const [activeLayer, setActiveLayer] = useState<MapLayerType>('rainfall');
  const [resolutionView, setResolutionView] = useState<'block' | 'gramcast'>('gramcast');

  // Currently inspected feature
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
    description: string;
  }>({
    name: selectedBlock === 'Bodh Gaya' ? "Bakrour" : "Sukurhutu",
    hindiName: selectedBlock === 'Bodh Gaya' ? "बकरौर" : "सुकुरहुटू",
    rainfallMm: selectedBlock === 'Bodh Gaya' ? 54.0 : 21.0,
    rainProb: selectedBlock === 'Bodh Gaya' ? 88 : 84,
    tempC: selectedBlock === 'Bodh Gaya' ? 30.2 : 27.5,
    humidity: selectedBlock === 'Bodh Gaya' ? 84 : 84,
    risk: "High",
    confidence: "High (91%)",
    elevation: selectedBlock === 'Bodh Gaya' ? 114 : 614,
    description: selectedBlock === 'Bodh Gaya' ? "Falgu river eastern riparian lowlands" : "Low-lying valley basin"
  });

  // Color functions based on layer and resolution
  const getFeatureColor = (props: any, layer: MapLayerType, isBlock: boolean) => {
    if (isBlock) {
      return '#3b82f6'; // Uniform block color
    }

    if (layer === 'rainfall') {
      const r = props.rainfallMm || 10;
      if (r >= 50) return '#1e3a8a'; // Deep navy
      if (r >= 40) return '#0284c7'; // Ocean blue
      if (r >= 20) return '#0369a1';
      if (r >= 15) return '#38bdf8'; // Sky blue
      return '#7dd3fc';
    } else if (layer === 'temperature') {
      const temp = props.tempC || 30;
      if (temp >= 32) return '#dc2626';
      if (temp >= 30) return '#ea580c';
      if (temp >= 28) return '#f59e0b';
      return '#eab308';
    } else if (layer === 'humidity') {
      const h = props.humidity || 75;
      if (h >= 82) return '#065f46';
      if (h >= 78) return '#059669';
      return '#10b981';
    } else {
      // Risk layer
      const risk = props.risk || 'Low';
      if (risk === 'High') return '#dc2626';
      if (risk === 'Moderate') return '#f59e0b';
      return '#10b981';
    }
  };

  // Initialize or update map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const centerCoords: [number, number] = selectedBlock === 'Bodh Gaya' 
      ? [24.695, 84.975] 
      : [23.45, 85.32];

    const zoomLevel = selectedBlock === 'Bodh Gaya' ? 13 : 12;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: centerCoords,
        zoom: zoomLevel,
        scrollWheelZoom: true
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors | IMD/GRAMCAST Downscaling',
        maxZoom: 18
      }).addTo(map);

      mapInstanceRef.current = map;
    } else {
      mapInstanceRef.current.setView(centerCoords, zoomLevel);
    }

    const map = mapInstanceRef.current;

    // Remove old layer
    if (geoJsonLayerRef.current) {
      map.removeLayer(geoJsonLayerRef.current);
    }

    // Select GeoJSON based on block and resolution
    const dataSource = selectedBlock === 'Bodh Gaya'
      ? (resolutionView === 'gramcast' ? BODH_GAYA_PANCHAYATS_GEOJSON : BODH_GAYA_BLOCK_COARSE_GRID)
      : (resolutionView === 'gramcast' ? KANKE_PANCHAYATS_GEOJSON : KANKE_BLOCK_COARSE_GRID);

    const isBlockMode = resolutionView === 'block';

    const newGeoJsonLayer = L.geoJSON(dataSource as any, {
      style: (feature) => {
        const props = feature?.properties || {};
        return {
          fillColor: getFeatureColor(props, activeLayer, isBlockMode),
          weight: isBlockMode ? 3 : 2,
          opacity: 1,
          color: isBlockMode ? '#1e3a8a' : '#ffffff',
          dashArray: isBlockMode ? '6, 6' : '',
          fillOpacity: isBlockMode ? 0.45 : 0.78
        };
      },
      onEachFeature: (feature, layer) => {
        const props = feature.properties || {};
        const labelText = isBlockMode 
          ? `<strong>${props.name}</strong><br/>Uniform Coarse Forecast: ${props.uniformRainfallMm || 45} mm`
          : `<strong>${props.name} (${props.hindiName || ''})</strong><br/>Downscaled Rain: <strong>${props.rainfallMm} mm</strong><br/>Temp: ${props.tempC}°C | Risk: ${props.risk}`;

        layer.bindTooltip(labelText, { sticky: true, className: 'map-custom-tooltip' });

        layer.on({
          click: () => {
            if (!isBlockMode) {
              setSelectedFeature({
                name: props.name,
                hindiName: props.hindiName || props.name,
                rainfallMm: props.rainfallMm,
                rainProb: props.rainProb || 70,
                tempC: props.tempC,
                humidity: props.humidity || 75,
                risk: props.risk || 'Moderate',
                confidence: props.confidence || 'High',
                elevation: props.elevation || 620,
                description: props.description || ''
              });
            }
          },
          mouseover: (e) => {
            const target = e.target;
            target.setStyle({
              weight: 3,
              fillOpacity: 0.9
            });
          },
          mouseout: (e) => {
            newGeoJsonLayer.resetStyle(e.target);
          }
        });
      }
    }).addTo(map);

    geoJsonLayerRef.current = newGeoJsonLayer;

  }, [selectedBlock, activeLayer, resolutionView]);

  return (
    <div>
      {/* Title & Core Problem Transformation Statement */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span className="badge badge-navy" style={{ fontSize: '0.72rem' }}>
            SIH Problem Statement SIH26074
          </span>
          <span className="badge badge-high" style={{ fontSize: '0.72rem' }}>
            5-Second Evaluation Visual
          </span>
        </div>
        <h1 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--gov-navy)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Layers size={24} color="var(--gov-navy)" />
          <span>{lang === 'hi' ? "पंचायत स्तर मौसम मानचित्र (GIS नक्शा)" : "Spatial Downscaling GIS Map — Before vs After"}</span>
        </h1>
        <p style={{ fontSize: '0.84rem', color: 'var(--neutral-600)', marginTop: 2 }}>
          {lang === 'hi'
            ? "एक ही प्रखंड में एक समान मौसम नहीं रहता। ब्लॉक के मोटे 12 किमी पूर्वानुमान को अलग-अलग पंचायतों के 1 किमी रिजॉल्यूशन में देखें।"
            : "Demonstrating how a single coarse Block-level prediction (12 km) is resolved into contrasting Panchayat-level micro-forecasts (1 km)."}
        </p>
      </div>

      {/* SECTION 9: THE 5-SECOND VISUAL COMPARISON BANNER */}
      <div 
        className="gov-card" 
        style={{ 
          padding: 16, 
          marginBottom: 20, 
          background: 'linear-gradient(135deg, #f8fafc 0%, #edf2f7 100%)',
          border: '1px solid #cbd5e1'
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 14 }}>
          {/* Before downscaling pill */}
          <div 
            onClick={() => setResolutionView('block')}
            style={{ 
              flex: 1, 
              minWidth: 260,
              padding: '12px 16px', 
              background: resolutionView === 'block' ? '#eff6ff' : '#ffffff', 
              borderRadius: 8, 
              border: resolutionView === 'block' ? '2px solid #2563eb' : '1px solid var(--neutral-300)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
              <span className="badge" style={{ background: '#fef3c7', color: '#92400e', fontWeight: 700, fontSize: '0.68rem' }}>
                BEFORE DOWNSCALING
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--neutral-500)' }}>Resolution: 10–12 km</span>
            </div>
            <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--gov-navy)', margin: '4px 0' }}>
              Coarse Block-Level Forecast
            </h4>
            <div style={{ fontSize: '0.82rem', color: 'var(--neutral-700)' }}>
              {selectedBlock === 'Bodh Gaya' ? (
                <span>One uniform value: <strong>Rainfall: 45 mm</strong> for all Panchayats</span>
              ) : (
                <span>One uniform value: <strong>Rainfall: 8.5 mm</strong> for all Panchayats</span>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--neutral-400)' }}>
            <ArrowRight size={22} color="var(--gov-navy)" />
          </div>

          {/* After downscaling pill */}
          <div 
            onClick={() => setResolutionView('gramcast')}
            style={{ 
              flex: 1, 
              minWidth: 260,
              padding: '12px 16px', 
              background: resolutionView === 'gramcast' ? '#f0fdf4' : '#ffffff', 
              borderRadius: 8, 
              border: resolutionView === 'gramcast' ? '2px solid #16a34a' : '1px solid var(--neutral-300)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
              <span className="badge badge-low" style={{ fontWeight: 800, fontSize: '0.68rem' }}>
                AFTER DOWNSCALING (GRAMCAST)
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--neutral-500)' }}>Resolution: 1 km</span>
            </div>
            <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#14532d', margin: '4px 0' }}>
              GRAMCAST Panchayat-Level Forecast
            </h4>
            <div style={{ fontSize: '0.82rem', color: '#166534', fontWeight: 600 }}>
              {selectedBlock === 'Bodh Gaya' ? (
                <span>Itawan: 36mm • Bodh Gaya: 41mm • Mocharim: 48mm • Bakrour: 54mm</span>
              ) : (
                <span>Pithoria: 10mm • Nagri: 12mm • Kanke HQ: 15mm • Borea: 17mm • Sukurhutu: 21mm</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Map Controls Bar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        {/* Demonstration Block Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--gov-navy)' }}>
            Block:
          </span>
          <button
            className={`btn btn-sm ${selectedBlock === 'Bodh Gaya' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setSelectedBlock('Bodh Gaya')}
            style={{ fontSize: '0.78rem' }}
          >
            Bodh Gaya (Gaya, Bihar)
          </button>
          <button
            className={`btn btn-sm ${selectedBlock === 'Kanke' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setSelectedBlock('Kanke')}
            style={{ fontSize: '0.78rem' }}
          >
            Kanke (Ranchi, Jharkhand)
          </button>
        </div>

        {/* Resolution Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#ffffff', padding: 4, borderRadius: 8, border: '1px solid var(--neutral-300)' }}>
          <button
            onClick={() => setResolutionView('block')}
            style={{
              padding: '6px 12px',
              borderRadius: 6,
              border: 'none',
              fontSize: '0.78rem',
              fontWeight: resolutionView === 'block' ? 700 : 500,
              background: resolutionView === 'block' ? '#e2e8f0' : 'transparent',
              color: resolutionView === 'block' ? 'var(--gov-navy)' : 'var(--neutral-600)',
              cursor: 'pointer'
            }}
          >
            1. Before: Coarse Block Forecast (12km)
          </button>
          <button
            onClick={() => setResolutionView('gramcast')}
            style={{
              padding: '6px 12px',
              borderRadius: 6,
              border: 'none',
              fontSize: '0.78rem',
              fontWeight: resolutionView === 'gramcast' ? 700 : 500,
              background: resolutionView === 'gramcast' ? 'var(--gov-navy)' : 'transparent',
              color: resolutionView === 'gramcast' ? '#ffffff' : 'var(--neutral-600)',
              cursor: 'pointer'
            }}
          >
            2. After: GRAMCAST Downscaled (1km)
          </button>
        </div>
      </div>

      {/* Layer Switcher Bar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, marginBottom: 14 }}>
        <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--neutral-600)', marginRight: 4 }}>
          {lang === 'hi' ? "मौसम पैरामीटर:" : "Weather Parameter:"}
        </span>
        {[
          { key: 'rainfall', label: lang === 'hi' ? 'वर्षा (Rainfall mm)' : 'Rainfall (mm)', icon: <Droplets size={14} /> },
          { key: 'temperature', label: lang === 'hi' ? 'तापमान (Temperature °C)' : 'Temperature (°C)', icon: <Thermometer size={14} /> },
          { key: 'humidity', label: lang === 'hi' ? 'आर्द्रता (Humidity %)' : 'Humidity (%)', icon: <Droplets size={14} /> },
          { key: 'risk', label: lang === 'hi' ? 'मौसम जोखिम (Risk)' : 'Agricultural Risk', icon: <ShieldAlert size={14} /> }
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => setActiveLayer(item.key as MapLayerType)}
            className={`btn btn-sm ${activeLayer === item.key ? 'btn-primary' : 'btn-secondary'}`}
            style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.76rem', padding: '5px 10px' }}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Map Layout: GIS Left, Inspection Panel Right */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 340px', gap: 18, marginBottom: 24 }}>
        {/* Left: Map Container */}
        <div style={{ position: 'relative' }}>
          <div 
            ref={mapContainerRef} 
            style={{ 
              height: 520, 
              width: '100%', 
              borderRadius: 12, 
              overflow: 'hidden', 
              border: '1px solid var(--neutral-300)',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
            }}
          />

          {/* Map Overlay Badge */}
          <div style={{
            position: 'absolute',
            top: 14,
            left: 14,
            zIndex: 1000,
            background: 'rgba(15, 23, 42, 0.88)',
            backdropFilter: 'blur(6px)',
            color: '#ffffff',
            padding: '6px 12px',
            borderRadius: 6,
            fontSize: '0.74rem',
            border: '1px solid rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: resolutionView === 'gramcast' ? '#34d399' : '#f59e0b' }}></span>
            <span>
              {resolutionView === 'gramcast' 
                ? `GRAMCAST 1km Downscaled Panchayats (${selectedBlock} Block)`
                : `Source 12km Coarse NWP Grid (${selectedBlock} Block)`}
            </span>
          </div>

          {/* Map Legend */}
          <div style={{
            position: 'absolute',
            bottom: 16,
            left: 16,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(4px)',
            borderRadius: 8,
            padding: '10px 14px',
            fontSize: '0.74rem',
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
                  <span>&gt; 50 mm (Heavy rain spell)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 14, height: 14, background: '#0284c7', borderRadius: 2 }}></span>
                  <span>40 – 50 mm (Moderate-Heavy)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 14, height: 14, background: '#38bdf8', borderRadius: 2 }}></span>
                  <span>15 – 40 mm (Moderate rain)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 14, height: 14, background: '#7dd3fc', borderRadius: 2 }}></span>
                  <span>&lt; 15 mm (Light showers)</span>
                </div>
              </div>
            )}

            {activeLayer === 'risk' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 14, height: 14, background: '#dc2626', borderRadius: 2 }}></span>
                  <span>High Risk (Waterlogging alert)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 14, height: 14, background: '#f59e0b', borderRadius: 2 }}></span>
                  <span>Moderate Risk (Spray / harvest delay)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 14, height: 14, background: '#10b981', borderRadius: 2 }}></span>
                  <span>Low Risk (Normal field operations)</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Inspection Side Panel */}
        <div className="gov-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 18 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.74rem', color: 'var(--neutral-500)', textTransform: 'uppercase', marginBottom: 4 }}>
              <MapPin size={14} color="#0284c7" />
              <span>Inspected Panchayat Polygon</span>
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--gov-navy)', marginBottom: 2 }}>
              {selectedFeature.name}
            </h3>
            <div style={{ fontSize: '0.78rem', color: 'var(--neutral-500)', marginBottom: 10 }}>
              {selectedBlock} Block • Elevation: {selectedFeature.elevation}m ASL
            </div>

            {/* Real Area Photo */}
            {(() => {
              const pImage = getPanchayatImage(selectedFeature.name);
              return (
                <div style={{ position: 'relative', height: 130, borderRadius: 8, overflow: 'hidden', marginBottom: 12, border: '1px solid var(--neutral-200)' }}>
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
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)', padding: '6px 8px', color: '#ffffff', fontSize: '0.68rem', lineHeight: 1.25 }}>
                    {lang === 'hi' ? pImage.hindiCaption : pImage.caption}
                  </div>
                </div>
              );
            })()}

            {/* Metric Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, background: 'var(--neutral-50)', padding: 12, borderRadius: 8, border: '1px solid var(--neutral-200)', marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--neutral-600)' }}>Downscaled rain:</span>
                <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--gov-navy)' }}>
                  {selectedFeature.rainfallMm} mm
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--neutral-600)' }}>Rain probability:</span>
                <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0284c7' }}>
                  {selectedFeature.rainProb}%
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--neutral-600)' }}>Temperature:</span>
                <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--neutral-800)' }}>
                  {selectedFeature.tempC}°C
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--neutral-600)' }}>Risk level:</span>
                <span className={`badge ${selectedFeature.risk === 'High' ? 'badge-high' : selectedFeature.risk === 'Moderate' ? 'badge-moderate' : 'badge-low'}`} style={{ fontSize: '0.68rem' }}>
                  {selectedFeature.risk}
                </span>
              </div>
            </div>

            {/* Spatial Influence explanation */}
            <div style={{ fontSize: '0.76rem', color: 'var(--neutral-600)', lineHeight: 1.45, padding: '8px 10px', background: '#eff6ff', borderRadius: 6, border: '1px solid #bfdbfe' }}>
              <strong>Model considers:</strong> {selectedFeature.description || "Local elevation and drainage curvature."}
            </div>
          </div>

          <button 
            className="btn btn-primary"
            style={{ width: '100%', marginTop: 14 }}
            onClick={() => {
              onSelectPanchayat(selectedFeature.name);
              onNavigateTo('advisory');
            }}
          >
            <span>{lang === 'hi' ? "कृषि सलाह देखें" : "View Crop Advisory"}</span>
            <ExternalLink size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};
