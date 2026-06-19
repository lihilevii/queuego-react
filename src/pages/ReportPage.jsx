import { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header/Header';
import PlaceSelector from '../components/PlaceSelector/PlaceSelector';
import StatusOptionCard from '../components/StatusOptionCard/StatusOptionCard';
import PrimaryButton from '../components/PrimaryButton/PrimaryButton';
import BottomNav from '../components/BottomNav/BottomNav';
import './ReportPage.css';

const levelColors = { low: 'var(--color-success)', medium: '#b45309', high: 'var(--color-error)' };
const levelLabels = { low: 'נמוך', medium: 'בינוני', high: 'גבוה' };

export default function ReportPage() {
  const { user } = useAuth();
  const [places, setPlaces] = useState([]);
  const [place, setPlace] = useState('');
  const [level, setLevel] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [recentReports, setRecentReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      const [{ data: placesData }, { data: reportsData }] = await Promise.all([
        supabase.from('places').select('id, name').order('name'),
        supabase
          .from('queue_reports')
          .select('id, level, notes, created_at, place_id, places(name)')
          .order('created_at', { ascending: false })
          .limit(10),
      ]);
      setPlaces(placesData || []);
      setRecentReports(reportsData || []);
    }
    fetchData();
  }, [submitted]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!place || !level) return;
    setLoading(true);
    setError('');

    const { error: insertError } = await supabase.from('queue_reports').insert({
      place_id: place,
      user_id: user.id,
      level,
      notes: notes || null,
    });

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
      return;
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (serviceId && templateId && publicKey) {
      const placeName = places.find((p) => p.id === place)?.name || '';
      await emailjs.send(serviceId, templateId, {
        to_email: user.email,
        to_name: user.user_metadata?.full_name || user.email,
        place_name: placeName,
        queue_level: levelLabels[level],
        notes: notes || 'ללא הערות',
      }, publicKey).catch(() => {});
    }

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setPlace('');
    setLevel('');
    setNotes('');
    setLoading(false);
  }

  function timeAgo(dateStr) {
    const diff = Math.floor((Date.now() - new Date(dateStr)) / 60000);
    if (diff < 1) return 'עכשיו';
    if (diff < 60) return `לפני ${diff} דק'`;
    return `לפני ${Math.floor(diff / 60)} שעות`;
  }

  return (
    <div className="page report-page">
      <Header title="דיווח" />

      <div className="report-content">
        {submitted && <div className="report-success">✅ הדיווח נשלח! אישור נשלח למייל שלך.</div>}
        {error && <div className="report-error">⚠️ {error}</div>}

        <form className="report-form" onSubmit={handleSubmit}>
          <PlaceSelector value={place} onChange={setPlace} places={places} />

          <div className="report-section-label">רמת עומס</div>
          <div className="status-row">
            {['low', 'medium', 'high'].map((l) => (
              <StatusOptionCard key={l} level={l} selected={level === l} onClick={() => setLevel(l)} />
            ))}
          </div>

          <div className="form-group">
            <label className="form-label">הערות (אופציונלי)</label>
            <textarea
              className="report-textarea"
              placeholder="הוסף פרטים על מצב התור..."
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <PrimaryButton type="submit" disabled={!place || !level || loading}>
            {loading ? 'שולח...' : 'שלח דיווח'}
          </PrimaryButton>
        </form>

        <section className="recent-reports">
          <h2 className="home-section-title">דיווחים אחרונים</h2>
          {recentReports.map((r) => (
            <div key={r.id} className="recent-report-card">
              <div className="recent-report-left">
                <p className="recent-report-place">{r.places?.name}</p>
                <p className="recent-report-meta">{timeAgo(r.created_at)}</p>
              </div>
              <span className="recent-report-badge" style={{ color: levelColors[r.level] }}>
                ● {levelLabels[r.level]}
              </span>
            </div>
          ))}
        </section>
      </div>

      <div className="page-bottom-spacer" />
      <BottomNav />
    </div>
  );
}
