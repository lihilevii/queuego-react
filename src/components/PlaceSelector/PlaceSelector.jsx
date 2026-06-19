import './PlaceSelector.css';

export default function PlaceSelector({ value, onChange, places = [] }) {
  return (
    <div className="place-selector">
      <label className="place-selector-label">בחר מקום</label>
      <div className="place-selector-wrap">
        <svg className="place-selector-icon" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
          <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
        <select className="place-selector-select" value={value} onChange={(e) => onChange(e.target.value)}>
          <option value="">בחר מקום...</option>
          {places.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
