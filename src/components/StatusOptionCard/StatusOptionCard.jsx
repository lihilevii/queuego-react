import './StatusOptionCard.css';

const config = {
  low:    { emoji: '🟢', label: 'נמוך',   desc: 'המתנה קצרה' },
  medium: { emoji: '🟡', label: 'בינוני', desc: 'המתנה סבירה' },
  high:   { emoji: '🔴', label: 'גבוה',   desc: 'המתנה ארוכה' },
};

export default function StatusOptionCard({ level, selected, onClick }) {
  const { emoji, label, desc } = config[level];
  return (
    <button
      type="button"
      className={`status-card ${selected ? 'status-card--selected' : ''}`}
      onClick={onClick}
    >
      <span className="status-card-emoji">{emoji}</span>
      <span className="status-card-label">{label}</span>
      <span className="status-card-desc">{desc}</span>
    </button>
  );
}
