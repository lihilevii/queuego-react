import Header from '../components/Header/Header';
import SearchBar from '../components/SearchBar/SearchBar';
import QueueCard from '../components/QueueCard/QueueCard';
import PlaceCard from '../components/PlaceCard/PlaceCard';
import BottomNav from '../components/BottomNav/BottomNav';
import './HomePage.css';

const categories = ['All', 'Government', 'Health', 'Post Office', 'DMV', 'Banks'];

const activeQueues = [
  { id: 1, place: 'City Hall',       category: 'Government', waitTime: 12, level: 'low'    },
  { id: 2, place: 'Health Clinic',   category: 'Health',     waitTime: 35, level: 'high'   },
  { id: 3, place: 'Post Office',     category: 'Post Office',waitTime: 20, level: 'medium' },
  { id: 4, place: 'DMV Branch',      category: 'DMV',        waitTime: 8,  level: 'low'    },
];

const nearbyPlaces = [
  { id: 1, name: 'City Hall',       category: 'Government', rating: '4.2', emoji: '🏛️' },
  { id: 2, name: 'Health Clinic',   category: 'Health',     rating: '4.5', emoji: '🏥' },
  { id: 3, name: 'Post Office',     category: 'Post Office',rating: '3.8', emoji: '📮' },
  { id: 4, name: 'DMV Branch',      category: 'DMV',        rating: '3.5', emoji: '🚗' },
  { id: 5, name: 'Public Library',  category: 'Education',  rating: '4.7', emoji: '📚' },
];

export default function HomePage() {
  return (
    <div className="page home-page">
      <Header />

      <div className="home-greeting">
        <h1 className="home-greeting-title">Good morning, Lihi 👋</h1>
        <p className="home-greeting-sub">Check wait times near you</p>
      </div>

      <div className="home-search">
        <SearchBar placeholder="Search places and services..." />
      </div>

      <div className="home-categories">
        {categories.map((cat) => (
          <button key={cat} className={`category-chip ${cat === 'All' ? 'category-chip--active' : ''}`}>
            {cat}
          </button>
        ))}
      </div>

      <section className="home-section">
        <h2 className="home-section-title">Active Queues</h2>
        <div className="queue-list">
          {activeQueues.map((q) => (
            <QueueCard key={q.id} {...q} />
          ))}
        </div>
      </section>

      <section className="home-section">
        <h2 className="home-section-title">Nearby Places</h2>
        <div className="places-scroll">
          {nearbyPlaces.map((p) => (
            <PlaceCard key={p.id} {...p} />
          ))}
        </div>
      </section>

      <div className="page-bottom-spacer" />
      <BottomNav />
    </div>
  );
}
