import React, { useState } from 'react';
import { 
  CalendarDays, 
  Clock 
} from 'lucide-react';
import { PanchayatData, Language } from '../types';

interface ForecastViewProps {
  weather: PanchayatData;
  lang: Language;
}

export const ForecastView: React.FC<ForecastViewProps> = ({ weather, lang }) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const activeDay = weather.forecast7Day[selectedDayIndex];

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--gov-navy)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <CalendarDays size={22} color="var(--gov-navy)" />
          <span>{lang === 'hi' ? "7-दिवसीय पंचायत मौसम पूर्वानुमान" : "7-Day Panchayat Weather Forecast"}</span>
        </h1>
        <p style={{ fontSize: '0.84rem', color: 'var(--neutral-500)' }}>
          {weather.name}, {weather.block} Block • High-resolution downscaled diurnal forecast
        </p>
      </div>

      {/* 7-Day Day Selector Buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 10, marginBottom: 24 }}>
        {weather.forecast7Day.map((dayItem, idx) => {
          const isSelected = idx === selectedDayIndex;
          return (
            <div
              key={dayItem.day}
              onClick={() => setSelectedDayIndex(idx)}
              style={{
                background: isSelected ? 'var(--gov-navy)' : '#ffffff',
                color: isSelected ? '#ffffff' : 'var(--neutral-800)',
                border: isSelected ? '2px solid var(--gov-navy)' : '1px solid var(--neutral-200)',
                borderRadius: 10,
                padding: '12px 8px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                boxShadow: isSelected ? 'var(--shadow-md)' : 'none'
              }}
            >
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                {lang === 'hi' ? dayItem.hindiDay : dayItem.day}
              </div>
              <div style={{ fontSize: '0.72rem', opacity: 0.8, marginBottom: 6 }}>
                {dayItem.date}
              </div>

              <div style={{ fontSize: '1.05rem', fontWeight: 700 }}>
                {dayItem.tempMax}° / {dayItem.tempMin}°
              </div>

              <div style={{ fontSize: '0.75rem', color: isSelected ? '#7dd3fc' : '#0284c7', fontWeight: 600, marginTop: 4 }}>
                {dayItem.rainProb}% rain
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Selected Day Card */}
      <div className="gov-card" style={{ marginBottom: 24 }}>
        <div className="gov-card-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--gov-navy)' }}>
              {lang === 'hi' ? activeDay.hindiDay : activeDay.day} ({activeDay.date})
            </span>
            <span className={`badge ${activeDay.riskLevel === 'High' ? 'badge-high' : activeDay.riskLevel === 'Moderate' ? 'badge-moderate' : 'badge-low'}`}>
              {activeDay.riskLevel} Risk
            </span>
          </div>

          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0284c7' }}>
            {lang === 'hi' ? activeDay.hindiCondition : activeDay.condition}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 20 }}>
          <div style={{ background: 'var(--neutral-50)', padding: 14, borderRadius: 8, border: '1px solid var(--neutral-200)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--neutral-500)' }}>Temperature Range</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--neutral-900)' }}>
              {activeDay.tempMin}°C — {activeDay.tempMax}°C
            </div>
          </div>

          <div style={{ background: 'var(--neutral-50)', padding: 14, borderRadius: 8, border: '1px solid var(--neutral-200)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--neutral-500)' }}>Expected Total Precipitation</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0284c7' }}>
              {activeDay.rainfallMm}
            </div>
          </div>

          <div style={{ background: 'var(--neutral-50)', padding: 14, borderRadius: 8, border: '1px solid var(--neutral-200)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--neutral-500)' }}>Precipitation Likelihood</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#059669' }}>
              {activeDay.rainProb}%
            </div>
          </div>

          <div style={{ background: 'var(--neutral-50)', padding: 14, borderRadius: 8, border: '1px solid var(--neutral-200)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--neutral-500)' }}>Primary Weather Alert</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: activeDay.riskLevel === 'High' ? 'var(--danger-red)' : 'var(--gov-navy)' }}>
              {lang === 'hi' ? activeDay.hindiRiskText : activeDay.riskText}
            </div>
          </div>
        </div>

        {/* Hourly Diurnal Breakdown for Selected Day */}
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
          <Clock size={16} />
          <span>Diurnal 3-Hourly Trajectory ({activeDay.day})</span>
        </h3>

        <div className="data-table-container">
          <table className="gov-table">
            <thead>
              <tr>
                <th>Time Window</th>
                <th>Temperature</th>
                <th>Rain Probability</th>
                <th>Hourly Rainfall (mm)</th>
                <th>Relative Humidity</th>
                <th>Atmospheric Trend</th>
              </tr>
            </thead>
            <tbody>
              {weather.hourly.map((h, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>{h.time}</td>
                  <td>{h.temp}°C</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ flex: 1, maxWidth: 80, height: 6, background: '#e2e8f0', borderRadius: 3, overflow: 'hidden' }}>
                        <div style={{ width: `${h.rainProb}%`, height: '100%', background: '#0284c7' }}></div>
                      </div>
                      <span>{h.rainProb}%</span>
                    </div>
                  </td>
                  <td style={{ fontWeight: 600, color: h.rainfallMm > 2 ? '#0284c7' : 'inherit' }}>
                    {h.rainfallMm} mm
                  </td>
                  <td>{h.humidity}%</td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--neutral-600)' }}>
                    {h.rainProb > 60 ? "Heavy convective clouds active" : h.rainProb > 30 ? "Isolated passing showers" : "Dry surface heating"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
