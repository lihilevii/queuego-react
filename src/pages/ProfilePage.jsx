import { useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import PlaceCard from '../components/PlaceCard/PlaceCard';
import BottomNav from '../components/BottomNav/BottomNav';
import './ProfilePage.css';

const stats = [
  { label: 'Reports', value: '24' },
  { label: 'Favorites', value: '8' },
  { label: 'Saved Time', value: '3h' },
];

const favorites = [
  { id: 1, name: 'City Hall',     category: 'Government', rating: '4.2', emoji: '🏛️' },
  { id: 2, name: 'Health Clinic', category: 'Health',     rating: '4.5', emoji: '🏥' },
  { id: 3, name: 'Post Office',   category: 'Post Office',rating: '3.8', emoji: '📮' },
];

const updates = [
  { id: 1, text: 'City Hall wait dropped to 5 min',      time: '2 min ago'  },
  { id: 2, text: 'Health Clinic is now fully open',       time: '15 min ago' },
  { id: 3, text: 'Post Office: moderate wait reported',   time: '1 hour ago' },
];

export default function ProfilePage() {
  const navigate = useNavigate();

  return (
    <div className="page profile-page">
      <Header title="Profile" />

      <div className="profile-content">
        <div className="profile-hero">
          <div className="profile-avatar">LH</div>
          <div>
            <p className="profile-name">Lihi Hadad</p>
            <p className="profile-email">lihi@example.com</p>
          </div>
        </div>

        <div className="profile-stats">
          {stats.map((s) => (
            <div key={s.label} className="stat-card">
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        <section className="profile-section">
          <h2 className="profile-section-title">Favorite Places</h2>
          <div className="profile-places-scroll">
            {favorites.map((p) => (
              <PlaceCard key={p.id} {...p} />
            ))}
          </div>
        </section>

        <section className="profile-section">
          <h2 className="profile-section-title">Recent Updates</h2>
          {updates.map((u) => (
            <div key={u.id} className="update-item">
              <div className="update-dot" />
              <div>
                <p className="update-text">{u.text}</p>
                <p className="update-time">{u.time}</p>
              </div>
            </div>
          ))}
        </section>

        <button className="logout-btn" onClick={() => navigate('/login')}>
          Log Out
        </button>
      </div>

      <div className="page-bottom-spacer" />
      <BottomNav />
    </div>
  );
}
