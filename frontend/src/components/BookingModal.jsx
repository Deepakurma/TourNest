import React, { useState } from 'react';

const BookingModal = ({ tour, isOpen, onClose, onConfirm }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [participants, setParticipants] = useState(1);
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !tour) return null;

  const handleBook = (e) => {
    e.preventDefault();
    if (!selectedDate) {
      alert('Please select a tour date');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call for checkout booking
    setTimeout(() => {
      setIsSubmitting(false);
      onConfirm({
        tourId: tour._id || tour.id,
        tourName: tour.name,
        imageCover: tour.imageCover,
        price: tour.price,
        date: selectedDate,
        participants: participants,
        totalPrice: tour.price * participants,
      });
      onClose();
    }, 1500);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
      day: 'numeric',
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        
        <h2 className="heading-secondary" style={{ marginBottom: '1rem' }}>Book {tour.name}</h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
          Select dates and confirm your adventure booking below.
        </p>

        <form onSubmit={handleBook}>
          {/* Select Date */}
          <div className="form-group">
            <label className="form-label">Choose Departure Date</label>
            <select
              className="form-input"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              required
              style={{ background: '#111827', color: 'white' }}
            >
              <option value="">-- Select departure --</option>
              {tour.startDates && tour.startDates.map((date, idx) => (
                <option key={idx} value={date}>
                  {formatDate(date)}
                </option>
              ))}
            </select>
          </div>

          {/* Participants */}
          <div className="form-group">
            <label className="form-label">Number of travelers</label>
            <input
              type="number"
              min="1"
              max={tour.maxGroupSize || 20}
              className="form-input"
              value={participants}
              onChange={(e) => setParticipants(parseInt(e.target.value) || 1)}
              required
            />
          </div>

          {/* Pricing Summary */}
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
            padding: '1.2rem',
            marginBottom: '1.8rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Price per Person</span>
              <h4 style={{ fontSize: '1.2rem', fontWeight: '700' }}>${tour.price}</h4>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Total Amount</span>
              <h4 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--color-primary-light)' }}>
                ${tour.price * participants}
              </h4>
            </div>
          </div>

          {/* Payment Fields (Mock) */}
          <div className="form-group">
            <label className="form-label">Card Details (Demo Mode)</label>
            <input
              type="text"
              placeholder="4111 2222 3333 4444"
              className="form-input"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
              style={{ marginBottom: '0.8rem' }}
            />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
              <input
                type="text"
                placeholder="MM/YY"
                className="form-input"
                value={cardExpiry}
                onChange={(e) => setCardExpiry(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="CVC"
                className="form-input"
                value={cardCvc}
                onChange={(e) => setCardCvc(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn btn--green"
            style={{ width: '100%', marginTop: '1rem' }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing Payment...' : `Pay & Book Now`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
