import { useState } from 'react';
import Header from '../components/Header/Header';
import PlaceSelector from '../components/PlaceSelector/PlaceSelector';
import StatusOptionCard from '../components/StatusOptionCard/StatusOptionCard';
import PrimaryButton from '../components/PrimaryButton/PrimaryButton';
import BottomNav from '../components/BottomNav/BottomNav';
import './ReportPage.css';

const recentReports = [
  { id: 1, place: 'City Hall',     level: 'low',    time: '5 min ago',  user: 'Noa R.' },
  { id: 2, place: 'Health Clinic', level: 'high',   time: '12 min ago', user: 'Dan K.' },
  { id: 3, place: 'Post Office',   level: 'medium', time: '18 min ago', user: 'Mia T.' },
];

const levelColors = { low: 'var(--color-success)', medium: '#b45309', high: 'var(--color-error)' };

export default function ReportPage() {
  const [place, setPlace] = useState('');
  const [level, setLevel] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!place || !level) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
    setPlace('');
    setLevel('');
    setNotes('');
  }

  return (
    <div className="page report-page">
      <Header title="Report" />

      <div className="report-content">
        {submitted && (
          <div className="report-success">
            ✅ Report submitted successfully!
          </div>
        )}

        <form className="report-form" onSubmit={handleSubmit}>
          <PlaceSelector value={place} onChange={setPlace} />

          <div className="report-section-label">Crowding Level</div>
          <div className="status-row">
            {['low', 'medium', 'high'].map((l) => (
              <StatusOptionCard
                key={l}
                level={l}
                selected={level === l}
                onClick={() => setLevel(l)}
              />
            ))}
          </div>

          <div className="form-group">
            <label className="form-label">Notes (optional)</label>
            <textarea
              className="report-textarea"
              placeholder="Add any details about the queue situation..."
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <PrimaryButton type="submit" disabled={!place || !level}>
            Submit Report
          </PrimaryButton>
        </form>

        <section className="recent-reports">
          <h2 className="home-section-title">Recent Reports</h2>
          {recentReports.map((r) => (
            <div key={r.id} className="recent-report-card">
              <div className="recent-report-left">
                <p className="recent-report-place">{r.place}</p>
                <p className="recent-report-meta">{r.user} · {r.time}</p>
              </div>
              <span className="recent-report-badge" style={{ color: levelColors[r.level] }}>
                ● {r.level.charAt(0).toUpperCase() + r.level.slice(1)}
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
