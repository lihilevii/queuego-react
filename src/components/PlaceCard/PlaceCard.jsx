import './PlaceCard.css';

export default function PlaceCard({ name, category, rating, emoji, onClick }) {
  return (
    <button type="button" className="place-card" onClick={onClick} aria-label={`דווח על ${name}`}>
      <div className="place-card-image">{emoji || '📍'}</div>
      <div className="place-card-body">
        <p className="place-card-name">{name}</p>
        <p className="place-card-category">{category}</p>
        <div className="place-card-rating">
          <span className="place-card-star">★</span>
          <span>{rating}</span>
        </div>
      </div>
    </button>
  );
}
