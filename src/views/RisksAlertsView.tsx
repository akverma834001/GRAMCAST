import React, { useState } from 'react';
import { 
  AlertTriangle, 
  MapPin, 
  ArrowRight, 
  Filter 
} from 'lucide-react';
import { Language, RiskSeverity } from '../types';

interface RisksAlertsViewProps {
  onSelectPanchayat: (name: string) => void;
  onNavigateTo: (tab: any) => void;
  lang: Language;
}

export const RisksAlertsView: React.FC<RisksAlertsViewProps> = ({
  onSelectPanchayat,
  onNavigateTo,
  lang
}) => {
  const [filterSeverity, setFilterSeverity] = useState<RiskSeverity | 'ALL'>('ALL');

  // Aggregated realistic alerts across Kanke Block Panchayats
  const allAlerts = [
    {
      id: "alert-1",
      severity: "High" as const,
      category: "Heavy Rainfall",
      panchayat: "Sukurhutu",
      timeWindow: "Today, 01:30 PM – 06:00 PM",
      headline: "Intense Downpour & Lowland Waterlogging Alert",
      description: "Convective cell convergence is anticipated to deliver 18–24 mm localized rain. Low-lying paddy tracts and canal junctions face moderate inundation.",
      actionAdvisory: "Halt all tube-well irrigation; open drainage furrows in low-lying bunds.",
      affectedPlots: "Sukurhutu depression and river drainage tracts"
    },
    {
      id: "alert-2",
      severity: "High" as const,
      category: "Heavy Rainfall",
      panchayat: "Nagri Rural",
      timeWindow: "Today, 02:00 PM – 07:00 PM",
      headline: "Localized Runoff & Surface Surge Alert",
      description: "High elevation catchment (648m) with rapid runoff velocity. Rainfall expected 23.5 mm.",
      actionAdvisory: "Protect loose topsoil in newly tilled fields; delay tractor operations.",
      affectedPlots: "Western ridge slope farms"
    },
    {
      id: "alert-3",
      severity: "Moderate" as const,
      category: "Harvest & Storage",
      panchayat: "Kanke (HQ)",
      timeWindow: "Today, 02:00 PM – 05:30 PM",
      headline: "Rain During Harvest Window",
      description: "Rainfall expected 12–18 mm. Moisture on standing or harvested produce may trigger fungal infection.",
      actionAdvisory: "Keep harvested maize bundles covered under tarpaulins; delay open-yard grain drying.",
      affectedPlots: "All harvested agricultural plots"
    },
    {
      id: "alert-4",
      severity: "Moderate" as const,
      category: "Chemical Wash-Off",
      panchayat: "Borea",
      timeWindow: "Today, 12:00 PM Onwards",
      headline: "Pesticide & Urea Wash-Off Hazard",
      description: "Precipitation of 14–20 mm will cause foliar runoff and nutrient leaching into Jumar tributary.",
      actionAdvisory: "Do not apply chemical fertilizers or pesticide sprays today. Reschedule for Wednesday.",
      affectedPlots: "Vegetable and floriculture belts"
    },
    {
      id: "alert-5",
      severity: "Low" as const,
      category: "Breezy Conditions",
      panchayat: "Pithoria",
      timeWindow: "Next 48 Hours",
      headline: "Normal Ridge Breeze & Mild Showers",
      description: "Expected rain 8–12 mm. Slopes will drain effectively without water accumulation. Ambient temperature pleasant at 26°C.",
      actionAdvisory: "Routine vegetable staking and weeding can proceed normally.",
      affectedPlots: "Terraced vegetable fields"
    }
  ];

  const filteredAlerts = filterSeverity === 'ALL' 
    ? allAlerts 
    : allAlerts.filter(a => a.severity === filterSeverity);

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--gov-navy)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <AlertTriangle size={22} color="var(--warning-amber)" />
            <span>{lang === 'hi' ? "मौसम जोखिम व चेतावनी केंद्र" : "Weather Alerts & Risk Center"}</span>
          </h1>
          <p style={{ fontSize: '0.84rem', color: 'var(--neutral-500)' }}>
            Active Panchayat-level agricultural risk alerts for Kanke Block (Demo Data)
          </p>
        </div>

        {/* Severity Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#ffffff', padding: 4, borderRadius: 8, border: '1px solid var(--neutral-300)' }}>
          <Filter size={14} color="var(--neutral-500)" style={{ marginLeft: 6 }} />
          {(['ALL', 'High', 'Moderate', 'Low'] as const).map((sev) => (
            <button
              key={sev}
              onClick={() => setFilterSeverity(sev)}
              style={{
                padding: '5px 12px',
                borderRadius: 6,
                border: 'none',
                fontSize: '0.78rem',
                fontWeight: filterSeverity === sev ? 700 : 500,
                background: filterSeverity === sev ? 'var(--gov-navy)' : 'transparent',
                color: filterSeverity === sev ? '#ffffff' : 'var(--neutral-600)',
                cursor: 'pointer'
              }}
            >
              {sev === 'ALL' ? 'All Risks' : `${sev} Risk`}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Counters */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 24 }}>
        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: 14 }}>
          <div style={{ fontSize: '0.78rem', color: '#991b1b', fontWeight: 600 }}>High Risk Alerts</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#dc2626' }}>2</div>
          <div style={{ fontSize: '0.72rem', color: '#b91c1c' }}>Immediate action required</div>
        </div>

        <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 10, padding: 14 }}>
          <div style={{ fontSize: '0.78rem', color: '#92400e', fontWeight: 600 }}>Moderate Risk Alerts</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#d97706' }}>2</div>
          <div style={{ fontSize: '0.72rem', color: '#b45309' }}>Harvest / spray caution</div>
        </div>

        <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: 10, padding: 14 }}>
          <div style={{ fontSize: '0.78rem', color: '#065f46', fontWeight: 600 }}>Low Risk / Normal</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#059669' }}>1</div>
          <div style={{ fontSize: '0.72rem', color: '#047857' }}>Favourable conditions</div>
        </div>
      </div>

      {/* Alert Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {filteredAlerts.map((alert) => (
          <div 
            key={alert.id}
            className={`gov-card risk-card risk-${alert.severity.toLowerCase()}`}
            style={{ padding: 20 }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span className={`badge ${alert.severity === 'High' ? 'badge-high' : alert.severity === 'Moderate' ? 'badge-moderate' : 'badge-low'}`}>
                  {alert.severity} Risk
                </span>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--neutral-500)' }}>
                  {alert.category}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--neutral-400)' }}>•</span>
                <span style={{ fontSize: '0.78rem', color: 'var(--neutral-500)' }}>{alert.timeWindow}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.9rem', fontWeight: 700, color: 'var(--gov-navy)' }}>
                <MapPin size={16} color="#0284c7" />
                <span>Panchayat: {alert.panchayat}</span>
              </div>
            </div>

            <h3 style={{ fontSize: '1.12rem', fontWeight: 700, color: 'var(--neutral-900)', marginBottom: 6 }}>
              {alert.headline}
            </h3>

            <p style={{ fontSize: '0.9rem', color: 'var(--neutral-700)', lineHeight: 1.5, marginBottom: 12 }}>
              {alert.description}
            </p>

            <div style={{
              background: alert.severity === 'High' ? '#fef2f2' : alert.severity === 'Moderate' ? '#fffbeb' : '#ecfdf5',
              padding: '10px 14px',
              borderRadius: 8,
              border: `1px solid ${alert.severity === 'High' ? '#fecaca' : alert.severity === 'Moderate' ? '#fde68a' : '#a7f3d0'}`,
              marginBottom: 14,
              fontSize: '0.86rem',
              color: 'var(--neutral-800)'
            }}>
              <strong>Recommended Action:</strong> {alert.actionAdvisory}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, borderTop: '1px solid var(--neutral-100)' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--neutral-500)' }}>
                Vulnerable Zones: <strong>{alert.affectedPlots}</strong>
              </span>

              <button
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  onSelectPanchayat(alert.panchayat);
                  onNavigateTo('panchayat');
                }}
                style={{ fontWeight: 600 }}
              >
                <span>View {alert.panchayat}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
