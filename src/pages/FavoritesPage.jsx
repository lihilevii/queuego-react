import Header from '../components/Header/Header';
import PlaceCard from '../components/PlaceCard/PlaceCard';
import BottomNav from '../components/BottomNav/BottomNav';
import './FavoritesPage.css';

const favorites = [
  { id: 1, name: 'City Hall',      category: 'Government', rating: '4.2', emoji: '🏛️' },
  { id: 2, name: 'Health Clinic',  category: 'Health',     rating: '4.5', emoji: '🏥' },
  { id: 3, name: 'Post Office',    category: 'Post Office',rating: '3.8', emoji: '📮' },
  { id: 4, name: 'DMV Branch',     category: 'DMV',        rating: '3.5', emoji: '🚗' },
  { id: 5, name: 'Public Library', category: 'Education',  rating: '4.7', emoji: '📚' },
  { id: 6, name: 'City Tax Office',category: 'Government', rating: '3.9', emoji: '🏢' },
];

export default function FavoritesPage() {
  return (
    <div className="page favorites-page">
      <Header title="Favorites" />

      <div className="favorites-content">
        <p className="favorites-count">{favorites.length} saved places</p>
        <div className="favorites-grid">
          {favorites.map((p) => (
            <PlaceCard key={p.id} {...p} />
          ))}
        </div>
      </div>

      <div className="page-bottom-spacer" />
      <BottomNav />
    </div>
  );
}
