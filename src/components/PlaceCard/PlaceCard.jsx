import './PlaceCard.css';

export default function PlaceCard({ name, category, rating, emoji }) {
  return (
    <div className="place-card">
      <div className="place-card-image">{emoji || '📍'}</div>
      <div className="place-card-body">
        <p className="place-card-name">{name}</p>
        <p className="place-card-category">{category}</p>
        <div className="place-card-rating">
          <span className="place-card-star">★</span>
          <span>{rating}</span>
        </div>
      </div>
    </div>
  );
}
