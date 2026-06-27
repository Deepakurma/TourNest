import React from 'react';
import { Link } from 'react-router-dom';

const Bookings = ({ bookings = [], onCancelBooking }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
      day: 'numeric',
    });
  };

  return (
    <main className="main">
      <div style={{ marginBottom: '3rem' }}>
        <h2 className="heading-secondary">My Booked Adventures</h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
          Here are the expeditions and excursions you have booked. Get ready for your next journey!
        </p>
      </div>

      {bookings.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {bookings.map((booking, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                background: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-md)',
                padding: '1.5rem',
                flexWrap: 'wrap',
                gap: '2rem',
              }}
            >
              {/* Tour Cover Image */}
              <img
                src={`/img/tours/${booking.imageCover}`}
                alt={booking.tourName}
                style={{
                  width: '180px',
                  height: '120px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                }}
                onError={(e) => {
                  e.target.src = `https://raw.githubusercontent.com/jonasschmedtmann/complete-node-bootcamp/master/4-natours/after-section-12/public/img/tours/${booking.imageCover}`;
                }}
              />

              {/* Booking specifications */}
              <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <span
                  style={{
                    alignSelf: 'flex-start',
                    background: 'rgba(16, 185, 129, 0.1)',
                    color: 'var(--color-primary-light)',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '30px',
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                  }}
                >
                  CONFIRMED &bull; ACTIVE
                </span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: 'white' }}>{booking.tourName}</h3>
                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginTop: '0.3rem' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', display: 'block' }}>DEPARTURE DATE</span>
                    <span style={{ fontSize: '0.95rem', fontWeight: '600' }}>{formatDate(booking.date)}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', display: 'block' }}>TRAVELERS</span>
                    <span style={{ fontSize: '0.95rem', fontWeight: '600' }}>{booking.participants} persons</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', display: 'block' }}>PRICE PAID</span>
                    <span style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--color-primary-light)' }}>
                      ${booking.totalPrice}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Link to={`/tour/${booking.tourId}`} className="btn btn--white btn--small">
                  View Tour
                </Link>
                <button
                  onClick={() => {
                    if (window.confirm(`Are you sure you want to cancel your booking for ${booking.tourName}?`)) {
                      onCancelBooking(idx);
                    }
                  }}
                  className="btn btn--small"
                  style={{
                    background: 'rgba(239, 68, 68, 0.08)',
                    color: '#ef4444',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#ef4444';
                    e.target.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(239, 68, 68, 0.08)';
                    e.target.style.color = '#ef4444';
                  }}
                >
                  Cancel Trip
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{
            textAlign: 'center',
            padding: '6rem 2rem',
            background: 'var(--color-bg-card)',
            border: '1px solid var(--color-border)',
            borderRadius: '12px',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          <svg
            viewBox="0 0 24 24"
            style={{ width: '64px', height: '64px', fill: 'var(--color-text-muted)', marginBottom: '1.5rem' }}
          >
            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2C11.99 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
          </svg>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem' }}>No adventures booked yet</h3>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', marginBottom: '2rem' }}>
            Browse through our handpicked expeditions and book your next trip!
          </p>
          <Link to="/" className="btn btn--green">
            Explore All Tours
          </Link>
        </div>
      )}
    </main>
  );
};

export default Bookings;
