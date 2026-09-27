import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  ArrowUpDown, 
  Scale
} from 'lucide-react';
import { Language, RiskSeverity } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { KANKE_BLOCK_OFFICER_SUMMARY } from '../data/validationData';

interface OfficerDashboardViewProps {
  onSelectPanchayat: (name: string) => void;
  onNavigateTo: (tab: any) => void;
  lang: Language;
}

export const OfficerDashboardView: React.FC<OfficerDashboardViewProps> = ({
  onSelectPanchayat,
  onNavigateTo,
  lang
}) => {
  const t = TRANSLATIONS[lang];
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState<'ALL' | RiskSeverity>('ALL');
  const [sortBy, setSortBy] = useState<'rainfall' | 'name' | 'risk'>('rainfall');
  const [sortAsc, setSortAsc] = useState(false);
  const [compareList, setCompareList] = useState<string[]>(['Sukurhutu', 'Pithoria']);
  const [showCompareModal, setShowCompareModal] = useState(false);

  const panchayats = KANKE_BLOCK_OFFICER_SUMMARY.panchayats;

  // Filter and Sort
  const filteredRows = panchayats
    .filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            p.hindiName.includes(searchTerm);
      const matchesRisk = riskFilter === 'ALL' || p.risk === riskFilter;
      return matchesSearch && matchesRisk;
    })
    .sort((a, b) => {
      if (sortBy === 'rainfall') {
        return sortAsc ? a.rainfallMm - b.rainfallMm : b.rainfallMm - a.rainfallMm;
      }
      if (sortBy === 'name') {
        return sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      }
      if (sortBy === 'risk') {
        const order = { High: 3, Moderate: 2, Low: 1 };
        return sortAsc ? order[a.risk] - order[b.risk] : order[b.risk] - order[a.risk];
      }
      return 0;
    });

  const toggleCompare = (name: string) => {
    if (compareList.includes(name)) {
      setCompareList(compareList.filter(n => n !== name));
    } else {
      if (compareList.length < 3) {
        setCompareList([...compareList, name]);
      } else {
        alert("You can compare up to 3 Panchayats simultaneously.");
      }
    }
  };

  const comparedPanchayatsData = panchayats.filter(p => compareList.includes(p.name));

  return (
    <div>
      {/* Title & Officer Subheader */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="badge badge-low">Administrative Portal</span>
            <span className="demo-pill">{t.demoBadge}</span>
          </div>
          <h1 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--gov-navy)', marginTop: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Users size={24} color="var(--gov-navy)" />
            <span>Agricultural Officer Dashboard — Kanke Block</span>
          </h1>
          <p style={{ fontSize: '0.84rem', color: 'var(--neutral-500)' }}>
            Consolidated Panchayat-level spatial monitoring, risk zoning, and advisory dispatch
          </p>
        </div>

        {compareList.length > 0 && (
          <button 
            className="btn btn-secondary"
            onClick={() => setShowCompareModal(true)}
            style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600 }}
          >
            <Scale size={16} color="var(--gov-navy)" />
            <span>Compare Selected ({compareList.length})</span>
          </button>
        )}
      </div>

      {/* SECTION 18: Summary Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, marginBottom: 24 }}>
        <div className="gov-card" style={{ padding: 18 }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--neutral-500)', fontWeight: 600, textTransform: 'uppercase' }}>
            Panchayats Monitored
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--gov-navy)', marginTop: 4 }}>
            {KANKE_BLOCK_OFFICER_SUMMARY.totalPanchayatsMonitored}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--neutral-600)', marginTop: 2 }}>
            100% of Kanke Block covered
          </div>
        </div>

        <div className="gov-card" style={{ padding: 18, borderLeft: '4px solid #dc2626' }}>
          <div style={{ fontSize: '0.78rem', color: '#991b1b', fontWeight: 600, textTransform: 'uppercase' }}>
            High-Risk Panchayats
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#dc2626', marginTop: 4 }}>
            {KANKE_BLOCK_OFFICER_SUMMARY.highRiskCount}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#b91c1c', marginTop: 2 }}>
            Waterlogging & Cloudburst Alert
          </div>
        </div>

        <div className="gov-card" style={{ padding: 18, borderLeft: '4px solid #d97706' }}>
          <div style={{ fontSize: '0.78rem', color: '#92400e', fontWeight: 600, textTransform: 'uppercase' }}>
            Moderate-Risk Panchayats
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#d97706', marginTop: 4 }}>
            {KANKE_BLOCK_OFFICER_SUMMARY.moderateRiskCount}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#b45309', marginTop: 2 }}>
            Spraying & Harvest Postponement
          </div>
        </div>

        <div className="gov-card" style={{ padding: 18, borderLeft: '4px solid #059669' }}>
          <div style={{ fontSize: '0.78rem', color: '#065f46', fontWeight: 600, textTransform: 'uppercase' }}>
            Forecast Status
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#059669', marginTop: 8 }}>
            Updated (06Z Cycle)
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--neutral-500)', marginTop: 2 }}>
            {KANKE_BLOCK_OFFICER_SUMMARY.lastUpdated}
          </div>
        </div>
      </div>

      {/* Block NWP vs Downscaled Spread Bar */}
      <div style={{
        background: '#ffffff',
        border: '1px solid var(--neutral-200)',
        borderRadius: 12,
        padding: '14px 20px',
        marginBottom: 24,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: '0.86rem', color: 'var(--neutral-700)' }}>
            Original Block NWP Uniform Rainfall: <strong>{KANKE_BLOCK_OFFICER_SUMMARY.blockNwpRainfallAvg} mm</strong>
          </div>
          <span style={{ color: 'var(--neutral-400)' }}>→</span>
          <div style={{ fontSize: '0.86rem', color: 'var(--gov-navy)', fontWeight: 700 }}>
            Downscaled Panchayat Spread: {KANKE_BLOCK_OFFICER_SUMMARY.downscaledRainfallSpread}
          </div>
        </div>

        <div style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 600 }}>
          ✓ Micro-climate variance detected across terrain gradients
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 260, maxWidth: 420 }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <Search size={16} color="var(--neutral-400)" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search Panchayat by name..."
              className="form-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: 36 }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--neutral-500)', fontWeight: 600 }}>Risk Filter:</span>
          {(['ALL', 'High', 'Moderate', 'Low'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRiskFilter(r)}
              style={{
                padding: '5px 12px',
                borderRadius: 6,
                border: '1px solid var(--neutral-300)',
                fontSize: '0.78rem',
                fontWeight: riskFilter === r ? 700 : 500,
                background: riskFilter === r ? 'var(--gov-navy)' : '#ffffff',
                color: riskFilter === r ? '#ffffff' : 'var(--neutral-700)',
                cursor: 'pointer'
              }}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* SECTION 18: Panchayat Data Table */}
      <div className="data-table-container" style={{ marginBottom: 28 }}>
        <table className="gov-table">
          <thead>
            <tr>
              <th style={{ width: 40 }}>Compare</th>
              <th 
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setSortBy('name');
                  setSortAsc(!sortAsc);
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span>Panchayat</span>
                  <ArrowUpDown size={13} />
                </div>
              </th>
              <th>Elevation</th>
              <th 
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setSortBy('rainfall');
                  setSortAsc(!sortAsc);
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span>Downscaled Rain</span>
                  <ArrowUpDown size={13} />
                </div>
              </th>
              <th>Rain Prob</th>
              <th 
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setSortBy('risk');
                  setSortAsc(!sortAsc);
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span>Risk Level</span>
                  <ArrowUpDown size={13} />
                </div>
              </th>
              <th>Risk Category</th>
              <th>Confidence</th>
              <th>Officer Action Advisory</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row) => (
              <tr key={row.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={compareList.includes(row.name)}
                    onChange={() => toggleCompare(row.name)}
                    style={{ cursor: 'pointer' }}
                  />
                </td>
                <td style={{ fontWeight: 700, color: 'var(--gov-navy)' }}>
                  {row.name}
                  <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--neutral-500)', fontWeight: 400 }}>
                    {row.hindiName}
                  </span>
                </td>
                <td>{row.elevation}m</td>
                <td style={{ fontWeight: 700, color: row.rainfallMm > 18 ? '#dc2626' : row.rainfallMm > 12 ? 'var(--gov-navy)' : '#059669' }}>
                  {row.rainfallMm} mm
                </td>
                <td>{row.rainProb}%</td>
                <td>
                  <span className={`badge ${row.risk === 'High' ? 'badge-high' : row.risk === 'Moderate' ? 'badge-moderate' : 'badge-low'}`}>
                    {row.risk}
                  </span>
                </td>
                <td style={{ fontSize: '0.8rem', color: 'var(--neutral-600)' }}>
                  {row.riskType}
                </td>
                <td>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: row.confidence === 'High' ? '#059669' : '#d97706' }}>
                    {row.confidence}
                  </span>
                </td>
                <td style={{ fontSize: '0.82rem', color: 'var(--neutral-700)' }}>
                  {row.primaryAdvisory}
                </td>
                <td>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      onSelectPanchayat(row.name);
                      onNavigateTo('panchayat');
                    }}
                    style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Comparison Modal */}
      {showCompareModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.75)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2500,
          padding: 16
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: 16,
            maxWidth: 820,
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: 24,
            boxShadow: '0 25px 50px rgba(0,0,0,0.25)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, borderBottom: '1px solid var(--neutral-200)', paddingBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--gov-navy)', fontWeight: 700, fontSize: '1.2rem' }}>
                <Scale size={22} color="var(--gov-navy)" />
                Side-by-Side Panchayat Comparison
              </div>
              <button 
                onClick={() => setShowCompareModal(false)}
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '1.2rem', color: 'var(--neutral-500)' }}
              >
                ✕
              </button>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--neutral-600)', marginBottom: 20 }}>
              Comparing micro-climatic parameters across selected Panchayats within Kanke Block. Notice the impact of elevation on rainfall and waterlogging risk.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${comparedPanchayatsData.length}, 1fr)`, gap: 16, marginBottom: 20 }}>
              {comparedPanchayatsData.map((p) => (
                <div key={p.name} style={{ background: 'var(--neutral-50)', border: '1px solid var(--neutral-300)', borderRadius: 10, padding: 16 }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--gov-navy)', marginBottom: 4 }}>
                    {p.name}
                  </h3>
                  <div style={{ fontSize: '0.75rem', color: 'var(--neutral-500)', marginBottom: 12 }}>
                    Elevation: <strong>{p.elevation} m</strong>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.85rem' }}>
                    <div>
                      <span style={{ color: 'var(--neutral-500)' }}>Expected Rainfall:</span>{' '}
                      <strong style={{ color: p.rainfallMm > 18 ? '#dc2626' : 'var(--gov-navy)' }}>{p.rainfallMm} mm</strong>
                    </div>

                    <div>
                      <span style={{ color: 'var(--neutral-500)' }}>Rain Probability:</span>{' '}
                      <strong>{p.rainProb}%</strong>
                    </div>

                    <div>
                      <span style={{ color: 'var(--neutral-500)' }}>Risk Status:</span>{' '}
                      <span className={`badge ${p.risk === 'High' ? 'badge-high' : p.risk === 'Moderate' ? 'badge-moderate' : 'badge-low'}`} style={{ fontSize: '0.65rem' }}>
                        {p.risk} Risk
                      </span>
                    </div>

                    <div>
                      <span style={{ color: 'var(--neutral-500)' }}>Hazard Nature:</span>{' '}
                      <span style={{ fontWeight: 600 }}>{p.riskType}</span>
                    </div>

                    <div style={{ background: '#ffffff', padding: 8, borderRadius: 6, border: '1px solid var(--neutral-200)', marginTop: 8 }}>
                      <span style={{ fontSize: '0.72rem', color: 'var(--neutral-500)', display: 'block', fontWeight: 700 }}>OFFICER ADVISORY:</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--neutral-800)' }}>{p.primaryAdvisory}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => setShowCompareModal(false)}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
