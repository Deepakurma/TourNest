import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ user, onLogout, searchVal, setSearchVal }) => {
  const navigate = useNavigate();
  const [localSearch, setLocalSearch] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchVal(localSearch);
    navigate('/');
  };

  const handleClearSearch = () => {
    setLocalSearch('');
    setSearchVal('');
  };

  return (
    <header className="header">
      {/* Tours Navigation */}
      <nav className="nav nav--tours">
        <Link to="/" className="nav__el" onClick={handleClearSearch}>
          All tours
        </Link>
        <form className="nav__search" onSubmit={handleSearchSubmit}>
          <button type="submit" className="nav__search-btn">
            <svg viewBox="0 0 24 24" style={{ width: '18px', height: '18px', fill: 'currentColor' }}>
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
          </button>
          <input
            type="text"
            placeholder="Search tours..."
            className="nav__search-input"
            value={localSearch}
            onChange={(e) => {
              setLocalSearch(e.target.value);
              setSearchVal(e.target.value); // Live filtering support
            }}
          />
        </form>
      </nav>

      {/* Brand Logo */}
      <div className="header__logo">
        <Link to="/">
          <img src="/img/logo-white.png" alt="TourNest logo" onError={(e) => {
            // Fallback in case starter/public/img logo is served/located differently
            e.target.src = 'https://raw.githubusercontent.com/jonasschmedtmann/complete-node-bootcamp/master/4-natours/after-section-12/public/img/logo-white.png';
          }} />
        </Link>
      </div>

      {/* User Actions Navigation */}
      <nav className="nav nav--user">
        {user ? (
          <>
            <Link to="/bookings" className="nav__el">
              My bookings
            </Link>
            <button onClick={onLogout} className="nav__el" style={{ background: 'none', border: 'none' }}>
              Log out
            </button>
            <Link to="/bookings" className="nav__el">
              <img
                src={user.photo || "/img/user.jpg"}
                alt={`Photo of ${user.name}`}
                className="nav__user-img"
                onError={(e) => {
                  e.target.src = 'https://raw.githubusercontent.com/jonasschmedtmann/complete-node-bootcamp/master/4-natours/after-section-12/public/img/users/default.jpg';
                }}
              />
              <span>{user.name.split(' ')[0]}</span>
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="nav__el">
              Log in
            </Link>
            <Link to="/signup" className="nav__el btn btn--small btn--green" style={{ color: 'white' }}>
              Sign up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
