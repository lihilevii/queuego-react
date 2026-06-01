import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import PrimaryButton from '../components/PrimaryButton/PrimaryButton';
import SocialLoginButton from '../components/SocialLoginButton/SocialLoginButton';
import './LoginPage.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    navigate('/');
  }

  return (
    <div className="page login-page">
      <Header />
      <div className="login-logo">
        <div className="login-logo-icon">🔵</div>
        <h1 className="login-logo-text">QueueGo</h1>
        <p className="login-logo-sub">Skip the wait, not the place</p>
      </div>

      <form className="login-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-input"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-input"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="login-forgot">
          <Link to="#" className="login-link">Forgot password?</Link>
        </div>

        <PrimaryButton type="submit">Log In</PrimaryButton>
      </form>

      <div className="login-divider">
        <span>or</span>
      </div>

      <div className="login-social">
        <SocialLoginButton provider="Google" onClick={() => navigate('/')} />
      </div>

      <p className="login-signup">
        Don't have an account?{' '}
        <Link to="#" className="login-link">Sign up</Link>
      </p>
    </div>
  );
}
