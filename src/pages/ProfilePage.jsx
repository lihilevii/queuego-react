import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header/Header';
import BottomNav from '../components/BottomNav/BottomNav';
import './ProfilePage.css';

const levelColors = { low: 'var(--color-success)', medium: '#b45309', high: 'var(--color-error)' };
const levelLabels = { low: 'נמוך', medium: 'בינוני', high: 'גבוה' };

export default function ProfilePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ reports: 0, favorites: 0 });
  const [recentReports, setRecentReports] = useState([]);

  const rawName = user?.user_metadata?.full_name
    || user?.email?.split('@')[0]?.replace(/[0-9]+$/, '') || 'משתמש';
  const displayName = rawName.charAt(0).toUpperCase() + rawName.slice(1);
  const initials = displayName.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);

  useEffect(() => {
    async function fetchStats() {
      const [{ count: reportCount }, { count: favCount }, { data: reportsData }] = await Promise.all([
        supabase.from('queue_reports').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
        supabase.from('favorites').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
        supabase
          .from('queue_reports')
          .select('id, level, created_at, places(name)')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(5),
      ]);
      setStats({ reports: reportCount || 0, favorites: favCount || 0 });
      setRecentReports(reportsData || []);
    }
    fetchStats();
  }, [user.id]);

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate('/login');
  }

  function timeAgo(dateStr) {
    const diff = Math.floor((Date.now() - new Date(dateStr)) / 60000);
    if (diff < 1) return 'עכשיו';
    if (diff < 60) return `לפני ${diff} דק'`;
    if (diff < 1440) return `לפני ${Math.floor(diff / 60)} שעות`;
    return `לפני ${Math.floor(diff / 1440)} ימים`;
  }

  return (
    <div className="page profile-page">
      <Header title="פרופיל" />

      <div className="profile-content">
        <div className="profile-hero">
          <div className="profile-avatar">{initials}</div>
          <div>
            <p className="profile-name">{displayName}</p>
            <p className="profile-email">{user?.email}</p>
          </div>
        </div>

        <div className="profile-stats">
          {[
            { label: 'דיווחים', value: stats.reports },
            { label: 'מועדפים', value: stats.favorites },
          ].map((s) => (
            <div key={s.label} className="stat-card">
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        {recentReports.length > 0 && (
          <section className="profile-section">
            <h2 className="profile-section-title">הדיווחים שלי</h2>
            {recentReports.map((r) => (
              <div key={r.id} className="update-item">
                <div className="update-dot" style={{ background: levelColors[r.level] }} />
                <div>
                  <p className="update-text">
                    {r.places?.name} -{' '}
                    <span style={{ color: levelColors[r.level], fontWeight: 600 }}>
                      {levelLabels[r.level]}
                    </span>
                  </p>
                  <p className="update-time">{timeAgo(r.created_at)}</p>
                </div>
              </div>
            ))}
          </section>
        )}

        <button className="logout-btn" onClick={handleLogout}>
          התנתקות
        </button>
      </div>

      <div className="page-bottom-spacer" />
      <BottomNav />
    </div>
  );
}
