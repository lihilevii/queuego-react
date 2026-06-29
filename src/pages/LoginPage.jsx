import { useState } from 'react';
import { supabase } from '../lib/supabase';
import Header from '../components/Header/Header';
import PrimaryButton from '../components/PrimaryButton/PrimaryButton';
import SocialLoginButton from '../components/SocialLoginButton/SocialLoginButton';
import './LoginPage.css';

// כשנחבר את Google ב-Supabase (Authentication > Providers), נשנה ל-true והכפתור יעבוד מיד
const GOOGLE_ENABLED = false;

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setSuccessMsg('נשלח אליך מייל אישור - בדוק את תיבת הדואר שלך');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setError('');
    if (!GOOGLE_ENABLED) {
      setSuccessMsg('התחברות עם Google תהיה זמינה בקרוב - בינתיים אפשר להתחבר עם מייל וסיסמה');
      return;
    }
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    });
    if (error) setError(error.message);
  }

  return (
    <div className="page login-page">
      <Header />
      <div className="login-logo">
        <div className="login-logo-icon">🔵</div>
        <h1 className="login-logo-text">QueueGo</h1>
        <p className="login-logo-sub">דלג על התור, לא על המקום</p>
      </div>

      {error && <div className="login-error">{error}</div>}
      {successMsg && <div className="login-success">{successMsg}</div>}

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">אימייל</label>
          <input
            type="email"
            className="form-input"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">סיסמה</label>
          <input
            type="password"
            className="form-input"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <PrimaryButton type="submit" disabled={loading}>
          {loading ? 'רגע...' : isSignUp ? 'הרשמה' : 'כניסה'}
        </PrimaryButton>
      </form>

      <div className="login-divider"><span>או</span></div>

      <div className="login-social">
        <SocialLoginButton provider="Google" onClick={handleGoogleLogin} />
      </div>

      <p className="login-signup">
        {isSignUp ? 'כבר יש לך חשבון? ' : 'אין לך חשבון? '}
        <button
          type="button"
          className="login-link login-toggle"
          onClick={() => { setIsSignUp(!isSignUp); setError(''); setSuccessMsg(''); }}
        >
          {isSignUp ? 'כניסה' : 'הרשמה'}
        </button>
      </p>
    </div>
  );
}
