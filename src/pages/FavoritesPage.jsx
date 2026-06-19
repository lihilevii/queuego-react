import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header/Header';
import BottomNav from '../components/BottomNav/BottomNav';
import './FavoritesPage.css';

export default function FavoritesPage() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [allPlaces, setAllPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [{ data: favsData }, { data: placesData }] = await Promise.all([
        supabase
          .from('favorites')
          .select('id, place_id, places(id, name, category, emoji, rating)')
          .eq('user_id', user.id),
        supabase.from('places').select('*').order('name'),
      ]);
      setFavorites(favsData || []);
      setAllPlaces(placesData || []);
      setLoading(false);
    }
    fetchData();
  }, [user.id]);

  const favoritePlaceIds = new Set(favorites.map((f) => f.place_id));

  async function toggleFavorite(place) {
    if (favoritePlaceIds.has(place.id)) {
      const fav = favorites.find((f) => f.place_id === place.id);
      await supabase.from('favorites').delete().eq('id', fav.id);
      setFavorites((prev) => prev.filter((f) => f.place_id !== place.id));
    } else {
      const { data } = await supabase
        .from('favorites')
        .insert({ user_id: user.id, place_id: place.id })
        .select('id, place_id, places(id, name, category, emoji, rating)')
        .single();
      if (data) setFavorites((prev) => [...prev, data]);
    }
  }

  if (loading) return <div className="page-loading">טוען...</div>;

  return (
    <div className="page favorites-page">
      <Header title="מועדפים" />

      <div className="favorites-content">
        <p className="favorites-count">{favorites.length} מקומות שמורים</p>

        <h2 className="favorites-section-title">המקומות שלי</h2>
        {favorites.length === 0 ? (
          <p className="favorites-empty">עדיין אין מועדפים - הוסף מקומות למטה</p>
        ) : (
          <div className="favorites-grid">
            {favorites.map((f) => {
              const p = f.places;
              return (
                <div key={f.id} className="fav-card">
                  <div className="fav-card-emoji">{p.emoji || '📍'}</div>
                  <div className="fav-card-body">
                    <p className="fav-card-name">{p.name}</p>
                    <p className="fav-card-category">{p.category}</p>
                  </div>
                  <button className="fav-toggle fav-toggle--active" onClick={() => toggleFavorite(p)}>
                    ♥
                  </button>
                </div>
              );
            })}
          </div>
        )}

        <h2 className="favorites-section-title" style={{ marginTop: '24px' }}>כל המקומות</h2>
        <div className="favorites-grid">
          {allPlaces.map((p) => (
            <div key={p.id} className="fav-card">
              <div className="fav-card-emoji">{p.emoji || '📍'}</div>
              <div className="fav-card-body">
                <p className="fav-card-name">{p.name}</p>
                <p className="fav-card-category">{p.category}</p>
              </div>
              <button
                className={`fav-toggle ${favoritePlaceIds.has(p.id) ? 'fav-toggle--active' : ''}`}
                onClick={() => toggleFavorite(p)}
              >
                {favoritePlaceIds.has(p.id) ? '♥' : '♡'}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="page-bottom-spacer" />
      <BottomNav />
    </div>
  );
}
