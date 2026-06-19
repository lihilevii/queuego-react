import './QueueCard.css';

const levelConfig = {
  low:    { label: 'נמוך',   color: 'success' },
  medium: { label: 'בינוני', color: 'accent'  },
  high:   { label: 'גבוה',   color: 'error'   },
};

export default function QueueCard({ place, waitTime, level, category }) {
  const cfg = levelConfig[level] || levelConfig.medium;

  return (
    <div className="queue-card">
      <div className="queue-card-left">
        <div className="queue-card-avatar">{place[0]}</div>
        <div>
          <p className="queue-card-name">{place}</p>
          <p className="queue-card-category">{category}</p>
        </div>
      </div>
      <div className="queue-card-right">
        <span className={`queue-card-badge queue-card-badge--${cfg.color}`}>{cfg.label}</span>
        <p className="queue-card-wait">{waitTime} דק'</p>
      </div>
    </div>
  );
}
