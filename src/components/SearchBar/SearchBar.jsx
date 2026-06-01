import './SearchBar.css';

export default function SearchBar({ placeholder = 'Search places...' }) {
  return (
    <div className="search-bar">
      <svg className="search-icon" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
      </svg>
      <input type="text" placeholder={placeholder} className="search-input" />
    </div>
  );
}
