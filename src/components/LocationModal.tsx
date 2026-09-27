import React, { useState } from 'react';
import { X, MapPin, Check } from 'lucide-react';
import { LocationHierarchy, Language } from '../types';
import { LOCATIONS_DATA } from '../data/locations';
import { TRANSLATIONS } from '../data/translations';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocation: LocationHierarchy;
  onSelectLocation: (loc: LocationHierarchy) => void;
  lang: Language;
}

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  currentLocation,
  onSelectLocation,
  lang
}) => {
  const t = TRANSLATIONS[lang];
  const [selectedState, setSelectedState] = useState(currentLocation.state);
  const [selectedDistrict, setSelectedDistrict] = useState(currentLocation.district);
  const [selectedBlock, setSelectedBlock] = useState(currentLocation.block);
  const [selectedPanchayat, setSelectedPanchayat] = useState(currentLocation.panchayat);

  if (!isOpen) return null;

  const states = Object.keys(LOCATIONS_DATA);
  const districts = LOCATIONS_DATA[selectedState] ? Object.keys(LOCATIONS_DATA[selectedState]) : [];
  const blocks = LOCATIONS_DATA[selectedState]?.[selectedDistrict] ? Object.keys(LOCATIONS_DATA[selectedState][selectedDistrict]) : [];
  const panchayats = LOCATIONS_DATA[selectedState]?.[selectedDistrict]?.[selectedBlock] || [];

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newState = e.target.value;
    setSelectedState(newState);
    const newDistricts = Object.keys(LOCATIONS_DATA[newState] || {});
    const firstDistrict = newDistricts[0] || '';
    setSelectedDistrict(firstDistrict);
    const newBlocks = Object.keys(LOCATIONS_DATA[newState]?.[firstDistrict] || {});
    const firstBlock = newBlocks[0] || '';
    setSelectedBlock(firstBlock);
    const newPanchayats = LOCATIONS_DATA[newState]?.[firstDistrict]?.[firstBlock] || [];
    setSelectedPanchayat(newPanchayats[0] || '');
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDistrict = e.target.value;
    setSelectedDistrict(newDistrict);
    const newBlocks = Object.keys(LOCATIONS_DATA[selectedState]?.[newDistrict] || {});
    const firstBlock = newBlocks[0] || '';
    setSelectedBlock(firstBlock);
    const newPanchayats = LOCATIONS_DATA[selectedState]?.[newDistrict]?.[firstBlock] || [];
    setSelectedPanchayat(newPanchayats[0] || '');
  };

  const handleBlockChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newBlock = e.target.value;
    setSelectedBlock(newBlock);
    const newPanchayats = LOCATIONS_DATA[selectedState]?.[selectedDistrict]?.[newBlock] || [];
    setSelectedPanchayat(newPanchayats[0] || '');
  };

  const handleApply = () => {
    onSelectLocation({
      state: selectedState,
      district: selectedDistrict,
      block: selectedBlock,
      panchayat: selectedPanchayat
    });
    onClose();
  };

  const handleQuickPick = (panchayat: string) => {
    setSelectedState("Jharkhand");
    setSelectedDistrict("Ranchi");
    setSelectedBlock("Kanke");
    setSelectedPanchayat(panchayat);
    onSelectLocation({
      state: "Jharkhand",
      district: "Ranchi",
      block: "Kanke",
      panchayat
    });
    onClose();
  };

  return (
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
        maxWidth: 580,
        width: '100%',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          backgroundColor: 'var(--gov-navy)',
          color: '#ffffff',
          padding: '18px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <MapPin size={22} color="#38bdf8" />
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>
                {lang === 'hi' ? "अपनी पंचायत चुनें" : "Select Your Panchayat"}
              </h3>
              <p style={{ fontSize: '0.78rem', color: '#93c5fd' }}>
                {t.subhead}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            style={{ background: 'transparent', border: 'none', color: '#ffffff', cursor: 'pointer', padding: 4 }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px' }}>
          {/* Quick Demo Panchayats */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--neutral-500)', textTransform: 'uppercase', marginBottom: 8 }}>
              {lang === 'hi' ? "त्वरित चयन (कांके प्रखंड डेमो)" : "Quick Select (Kanke Demonstration Block)"}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {[
                { name: "Kanke (HQ)", note: "Central Plateau (628m)" },
                { name: "Sukurhutu", note: "Valley / Waterlog (614m)" },
                { name: "Pithoria", note: "Ridge / Drained (672m)" },
                { name: "Borea", note: "River Catchment (622m)" }
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleQuickPick(item.name)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    padding: '8px 12px',
                    borderRadius: 8,
                    border: selectedPanchayat === item.name ? '2px solid var(--gov-navy)' : '1px solid var(--neutral-300)',
                    background: selectedPanchayat === item.name ? 'var(--gov-blue-subtle)' : '#ffffff',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--gov-navy)' }}>
                    {item.name}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--neutral-500)' }}>
                    {item.note}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div style={{ height: 1, backgroundColor: 'var(--neutral-200)', margin: '16px 0' }}></div>

          {/* Cascading Dropdowns */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--neutral-700)', marginBottom: 6 }}>
                1. {t.selectState}
              </label>
              <select className="form-select" value={selectedState} onChange={handleStateChange}>
                {states.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--neutral-700)', marginBottom: 6 }}>
                2. {t.selectDistrict}
              </label>
              <select className="form-select" value={selectedDistrict} onChange={handleDistrictChange}>
                {districts.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--neutral-700)', marginBottom: 6 }}>
                3. {t.selectBlock}
              </label>
              <select className="form-select" value={selectedBlock} onChange={handleBlockChange}>
                {blocks.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--neutral-700)', marginBottom: 6 }}>
                4. {t.selectPanchayat}
              </label>
              <select className="form-select" value={selectedPanchayat} onChange={e => setSelectedPanchayat(e.target.value)}>
                {panchayats.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 24 }}>
            <button className="btn btn-secondary" onClick={onClose}>
              {lang === 'hi' ? "रद्द करें" : "Cancel"}
            </button>
            <button className="btn btn-primary btn-lg" onClick={handleApply}>
              <Check size={18} />
              {t.viewMyWeather}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
