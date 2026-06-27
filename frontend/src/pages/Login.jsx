import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please enter both email and password');
      return;
    }
    setErrorMsg('');
    setIsLoading(true);

    // Call back login logic
    setTimeout(() => {
      setIsLoading(false);
      onLogin({
        name: 'Jonas Schmedtmann',
        email: email,
        photo: 'user-1.jpg',
        role: 'admin',
      });
      navigate('/');
    }, 1200);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="heading-secondary" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
          Log into your account
        </h2>
        
        {errorMsg && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid var(--color-error)',
            color: '#fca5a5',
            padding: '0.8rem 1.2rem',
            borderRadius: '8px',
            fontSize: '0.9rem',
            marginBottom: '1.5rem'
          }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: '2.2rem' }}>
            <label className="form-label" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn--green"
            style={{ width: '100%', marginBottom: '1.5rem' }}
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{ color: 'var(--color-primary-light)', fontWeight: '600' }}>
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
