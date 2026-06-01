import './SocialLoginButton.css';

export default function SocialLoginButton({ provider = 'Google', onClick }) {
  return (
    <button className="social-login-btn" onClick={onClick} type="button">
      <span className="social-login-icon">G</span>
      <span>Continue with {provider}</span>
    </button>
  );
}
