import React, { useState } from 'react';
import { 
  LineChart, 
  TrendingDown, 
  Info, 
  Droplets, 
  Thermometer, 
  Activity 
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { 
  VALIDATION_METRICS_SUMMARY, 
  RAINFALL_VALIDATION_SERIES, 
  TEMPERATURE_VALIDATION_SERIES 
} from '../data/validationData';

interface ValidationViewProps {
  lang: Language;
}

export const ValidationView: React.FC<ValidationViewProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [selectedParam, setSelectedParam] = useState<'rainfall' | 'temperature' | 'humidity'>('rainfall');

  const metric = VALIDATION_METRICS_SUMMARY[selectedParam];
  const timeSeries = selectedParam === 'temperature' ? TEMPERATURE_VALIDATION_SERIES : RAINFALL_VALIDATION_SERIES;

  // Render SVG interactive line chart
  const renderChart = () => {
    const width = 800;
    const height = 300;
    const padding = { top: 20, right: 30, bottom: 40, left: 50 };

    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Calculate max value
    const maxVal = Math.max(...timeSeries.map(d => Math.max(d.observed, d.blockForecast, d.gramcastDownscaled))) * 1.15;

    // Coordinates mapping
    const getX = (index: number) => padding.left + (index / (timeSeries.length - 1)) * chartWidth;
    const getY = (val: number) => padding.top + chartHeight - (val / maxVal) * chartHeight;

    // Generate path data
    const makePath = (key: 'observed' | 'blockForecast' | 'gramcastDownscaled') => {
      return timeSeries.reduce((acc, point, i) => {
        const x = getX(i);
        const y = getY(point[key]);
        return i === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
      }, '');
    };

    return (
      <div style={{ width: '100%', overflowX: 'auto', background: '#ffffff', borderRadius: 8, padding: 12 }}>
        <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', minWidth: 600, height: 'auto' }}>
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
            const y = padding.top + chartHeight * (1 - pct);
            const val = (maxVal * pct).toFixed(1);
            return (
              <g key={idx}>
                <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="#e2e8f0" strokeDasharray="3,3" />
                <text x={padding.left - 8} y={y + 4} fontSize="11" fill="#64748b" textAnchor="end">{val}</text>
              </g>
            );
          })}

          {/* X axis labels */}
          {timeSeries.map((point, idx) => {
            if (idx % 2 === 0 || idx === timeSeries.length - 1) {
              const x = getX(idx);
              return (
                <text key={idx} x={x} y={height - 10} fontSize="11" fill="#64748b" textAnchor="middle">
                  {point.date}
                </text>
              );
            }
            return null;
          })}

          {/* Lines */}
          {/* 1. Coarse Block NWP (Red dashed line) */}
          <path d={makePath('blockForecast')} fill="none" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="5,5" />

          {/* 2. GRAMCAST Downscaled (Green solid line) */}
          <path d={makePath('gramcastDownscaled')} fill="none" stroke="#059669" strokeWidth="3" />

          {/* 3. Observed Weather (Navy solid line with points) */}
          <path d={makePath('observed')} fill="none" stroke="#0f2744" strokeWidth="2" opacity="0.75" />

          {/* Points for Observed Ground Stations */}
          {timeSeries.map((point, idx) => (
            <circle key={idx} cx={getX(idx)} cy={getY(point.observed)} r="3.5" fill="#0f2744" />
          ))}
        </svg>

        {/* Legend */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 12, fontSize: '0.84rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 14, height: 3, background: '#0f2744' }}></span>
            <span><strong>Observed Weather</strong> (Ground AWS Station Truth)</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 14, height: 3, background: '#059669' }}></span>
            <span><strong>GRAMCAST Downscaled</strong> (High-Resolution 1km)</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 14, height: 3, background: '#ef4444', borderBottom: '2px dashed #ef4444' }}></span>
            <span><strong>Original Block Forecast</strong> (Coarse 12km NWP)</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="badge badge-navy">Verification & Telemetry</span>
            <span className="demo-pill">{t.demoBadge}</span>
          </div>
          <h1 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--gov-navy)', marginTop: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Activity size={24} color="var(--gov-navy)" />
            <span>Forecast Validation: Prediction vs Ground Observation</span>
          </h1>
          <p style={{ fontSize: '0.84rem', color: 'var(--neutral-500)' }}>
            Comparing Original Block Forecast vs GRAMCAST Downscaled vs IMD Automated Weather Stations
          </p>
        </div>

        {/* Parameter Switcher */}
        <div style={{ display: 'flex', gap: 6, background: '#ffffff', padding: 4, borderRadius: 8, border: '1px solid var(--neutral-300)' }}>
          {[
            { key: 'rainfall', label: 'Rainfall (mm)', icon: <Droplets size={14} /> },
            { key: 'temperature', label: 'Temperature (°C)', icon: <Thermometer size={14} /> },
            { key: 'humidity', label: 'Humidity (%)', icon: <Activity size={14} /> }
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setSelectedParam(item.key as any)}
              className={`btn btn-sm ${selectedParam === item.key ? 'btn-primary' : 'btn-secondary'}`}
              style={{ display: 'flex', alignItems: 'center', gap: 6 }}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* SECTION 17: Core Accuracy Metrics Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 24 }}>
        {/* MAE Card */}
        <div className="gov-card">
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--neutral-500)', textTransform: 'uppercase' }}>
            Mean Absolute Error (MAE)
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 6 }}>
            <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#059669' }}>
              {metric.gramcastMAE} {selectedParam === 'rainfall' ? 'mm' : selectedParam === 'temperature' ? '°C' : '%'}
            </span>
            <span style={{ fontSize: '0.88rem', color: '#ef4444', textDecoration: 'line-through' }}>
              {metric.originalBlockMAE}
            </span>
          </div>
          <div style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
            <TrendingDown size={14} />
            <span>{(((metric.originalBlockMAE - metric.gramcastMAE) / metric.originalBlockMAE) * 100).toFixed(0)}% Error Reduction</span>
          </div>
        </div>

        {/* RMSE Card */}
        <div className="gov-card">
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--neutral-500)', textTransform: 'uppercase' }}>
            Root Mean Squared Error (RMSE)
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 6 }}>
            <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#059669' }}>
              {metric.gramcastRMSE} {selectedParam === 'rainfall' ? 'mm' : selectedParam === 'temperature' ? '°C' : '%'}
            </span>
            <span style={{ fontSize: '0.88rem', color: '#ef4444', textDecoration: 'line-through' }}>
              {metric.originalBlockRMSE}
            </span>
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--neutral-600)', marginTop: 4 }}>
            Significantly lower peak outlier penalties
          </div>
        </div>

        {/* Bias Reduction Card */}
        <div className="gov-card">
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--neutral-500)', textTransform: 'uppercase' }}>
            Systematic Bias Reduction
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--gov-navy)', marginTop: 6 }}>
            {metric.biasReductionPct}%
          </div>
          <div style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 600, marginTop: 4 }}>
            Terrain lapse rate adjustment
          </div>
        </div>

        {/* Correlation Coefficient */}
        <div className="gov-card">
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--neutral-500)', textTransform: 'uppercase' }}>
            Correlation (Pearson r)
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0284c7', marginTop: 6 }}>
            r = {metric.correlationCoeff}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--neutral-600)', marginTop: 4 }}>
            Strong alignment with AWS ground truth
          </div>
        </div>
      </div>

      {/* Time Series Chart */}
      <div className="gov-card" style={{ marginBottom: 28 }}>
        <div className="gov-card-header">
          <div className="gov-card-title">
            <LineChart size={18} color="var(--gov-navy)" />
            <span>14-Day Forecast Trajectory vs Ground AWS Observation</span>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--neutral-500)' }}>
            N = {metric.observationsCompared} hourly data points compared
          </span>
        </div>

        {renderChart()}

        <div style={{ marginTop: 16, padding: '10px 14px', background: '#f8fafc', borderRadius: 8, border: '1px solid var(--neutral-200)', fontSize: '0.82rem', color: 'var(--neutral-600)' }}>
          <strong>Observation:</strong> Notice how the original coarse Block model (red dashed line) missed the localized convective spike on 20 Sep (predicted 15 mm, observed 31.2 mm), whereas GRAMCAST's physics downscaling captured 29.5 mm by accounting for Kanke reservoir moisture convergence.
        </div>
      </div>

      {/* Validation Disclaimer Notice */}
      <div style={{ padding: 14, background: '#fffbeb', borderRadius: 8, border: '1px solid #fde68a', fontSize: '0.84rem', color: '#92400e', display: 'flex', alignItems: 'center', gap: 8 }}>
        <Info size={18} color="#d97706" flex-shrink={0} />
        <span>
          <strong>Scientific Rigor Notice:</strong> All metrics shown are generated from demonstration sample runs calibrated on Kanke Block telemetry. Real-world validation requires continuous collocated automated weather stations.
        </span>
      </div>
    </div>
  );
};
