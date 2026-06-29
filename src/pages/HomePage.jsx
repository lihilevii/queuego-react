import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import Header from '../components/Header/Header';
import SearchBar from '../components/SearchBar/SearchBar';
import QueueCard from '../components/QueueCard/QueueCard';
import PlaceCard from '../components/PlaceCard/PlaceCard';
import BottomNav from '../components/BottomNav/BottomNav';
import { useAuth } from '../context/AuthContext';
import { categories, categoryMap, categoryLabel } from '../lib/categories';
import './HomePage.css';

const levelToWait = { low: 10, medium: 25, high: 45 };

function getLatestReportPerPlace(reports) {
  const map = {};
  reports.forEach((r) => {
    if (!map[r.place_id] || new Date(r.created_at) > new Date(map[r.place_id].created_at)) {
      map[r.place_id] = r;
    }
  });
  return map;
}

export default function HomePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [places, setPlaces] = useState([]);
  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('הכל');
  const [loading, setLoading] = useState(true);

  const firstName = user?.user_metadata?.full_name?.split(' ')[0]
    || user?.email?.split('@')[0]
    || 'שם';

  useEffect(() => {
    async function fetchData() {
      const [{ data: placesData }, { data: reportsData }] = await Promise.all([
        supabase.from('places').select('*').order('name'),
        supabase.from('queue_reports').select('*').order('created_at', { ascending: false }).limit(100),
      ]);
      setPlaces(placesData || []);
      setReports(reportsData || []);
      setLoading(false);
    }
    fetchData();

    const channel = supabase
      .channel('queue_reports_changes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'queue_reports' }, (payload) => {
        setReports((prev) => [payload.new, ...prev]);
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  function goToReport(placeId) {
    navigate('/report', { state: { placeId } });
  }

  const latestReports = getLatestReportPerPlace(reports);

  const filteredPlaces = places.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const englishCategory = categoryMap[activeCategory];
    const matchesCategory = activeCategory === 'הכל' || p.category === englishCategory;
    return matchesSearch && matchesCategory;
  });

  const activeQueues = filteredPlaces
    .filter((p) => latestReports[p.id])
    .map((p) => ({
      id: p.id,
      place: p.name,
      category: categoryLabel(p.category),
      level: latestReports[p.id].level,
      waitTime: levelToWait[latestReports[p.id].level],
    }));

  return (
    <div className="page home-page">
      <Header />

      <div className="home-greeting">
        <h1 className="home-greeting-title">שלום, {firstName} 👋</h1>
        <p className="home-greeting-sub">בדוק זמני המתנה ליד הבית</p>
      </div>

      <div className="home-search">
        <SearchBar placeholder="חפש מקומות ושירותים..." value={search} onChange={setSearch} />
      </div>

      <div className="home-categories">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-chip ${activeCategory === cat ? 'category-chip--active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="home-loading">טוען...</p>
      ) : (
        <>
          {activeQueues.length > 0 && (
            <section className="home-section">
              <h2 className="home-section-title">
                תורים פעילים
                <span className="realtime-dot" title="עדכון חי" />
              </h2>
              <div className="queue-list">
                {activeQueues.map((q) => (
                  <QueueCard key={q.id} {...q} onClick={() => goToReport(q.id)} />
                ))}
              </div>
            </section>
          )}

          <section className="home-section">
            <h2 className="home-section-title">מקומות בקרבתך</h2>
            {filteredPlaces.length === 0 ? (
              <p className="home-empty">לא נמצאו מקומות.</p>
            ) : (
              <div className="places-scroll">
                {filteredPlaces.map((p) => (
<PlaceCard
  key={p.id}
  name={p.name}
  category={categoryLabel(p.category)}
  rating={p.rating}
  emoji={p.emoji}
  openingHours={p.opening_hours || 'לא צוינו שעות פתיחה'}
loadLevel={p.load_level || 'לא ידוע'}  onClick={() => goToReport(p.id)}
/>                ))}
              </div>
            )}
          </section>
        </>
      )}

      <div className="page-bottom-spacer" />
      <BottomNav />
    </div>
  );
}
