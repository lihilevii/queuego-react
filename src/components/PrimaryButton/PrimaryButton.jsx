import './PrimaryButton.css';

export default function PrimaryButton({ children, onClick, type = 'button', disabled, variant = 'primary' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`primary-btn primary-btn--${variant}`}
    >
      {children}
    </button>
  );
}
