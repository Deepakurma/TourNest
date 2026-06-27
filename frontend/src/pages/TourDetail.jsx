import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import RatingStars from '../components/RatingStars';
import InteractiveMap from '../components/InteractiveMap';
import BookingModal from '../components/BookingModal';

import usersFallback from '../data/usersFallback.json';
import reviewsFallback from '../data/reviewsFallback.json';

const TourDetail = ({ tours = [], onBookTour }) => {
  const { id } = useParams();
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);

  // Find tour
  const tour = useMemo(() => {
    return tours.find((t) => (t._id || t.id) === id);
  }, [tours, id]);

  // Resolve guides for this tour
  const tourGuides = useMemo(() => {
    if (!tour || !tour.guides) return [];
    return tour.guides.map((guideId) => {
      // If guide details are already populated objects
      if (typeof guideId === 'object' && guideId !== null) {
        return guideId;
      }
      // If they are IDs, search in users fallback
      const foundUser = usersFallback.find((u) => u._id === guideId);
      return foundUser || { name: 'Expert Guide', role: 'guide', photo: 'default.jpg' };
    });
  }, [tour]);

  // Filter reviews for this tour
  const tourReviews = useMemo(() => {
    if (!tour) return [];
    const tourId = tour._id || tour.id;
    return reviewsFallback.filter((rev) => {
      const revTourId = typeof rev.tour === 'object' ? (rev.tour._id || rev.tour.id) : rev.tour;
      return revTourId === tourId;
    });
  }, [tour]);

  if (!tour) {
    return (
      <main className="main" style={{ textAlign: 'center', padding: '10rem 2rem' }}>
        <h2 className="heading-secondary">Adventure Not Found</h2>
        <p style={{ color: 'var(--color-text-muted)', marginTop: '1rem', marginBottom: '2rem' }}>
          We couldn't find the trek or tour you are looking for.
        </p>
        <Link to="/" className="btn btn--green">
          Back to all tours
        </Link>
      </main>
    );
  }

  // Formatting dates
  const nextDate = tour.startDates && tour.startDates.length > 0
    ? new Date(tour.startDates[0]).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : 'N/A';

  // Format description lines
  const descriptionParagraphs = tour.description ? tour.description.split('\n') : [];

  return (
    <>
      {/* 1. Header Hero section */}
      <section className="section-header">
        <div className="section-header__overlay">&nbsp;</div>
        <img
          className="section-header__img"
          src={`/img/tours/${tour.imageCover}`}
          alt={tour.name}
          onError={(e) => {
            e.target.src = `https://raw.githubusercontent.com/jonasschmedtmann/complete-node-bootcamp/master/4-natours/after-section-12/public/img/tours/${tour.imageCover}`;
          }}
        />

        <div className="heading-box">
          <h1 className="heading-primary">
            <span>{tour.name}</span>
          </h1>
          <div className="heading-box__group">
            <div className="heading-box__detail">
              <svg className="heading-box__icon" viewBox="0 0 24 24">
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2C11.99 2zm3.3 14.79L11 13V7h2v5.2l3.7 2.2-1 1.59z" />
              </svg>
              <span className="heading-box__text">{tour.duration} days</span>
            </div>
            <div className="heading-box__detail">
              <svg className="heading-box__icon" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <span className="heading-box__text">{tour.startLocation ? tour.startLocation.description : 'N/A'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Fact Sheet / Guides / Description Section */}
      <section className="section-description">
        {/* Left container columns */}
        <div className="overview-box">
          <div>
            <div className="overview-box__group">
              <h2 className="heading-secondary">Quick facts</h2>
              
              <div className="overview-box__detail">
                <svg className="overview-box__icon" viewBox="0 0 24 24">
                  <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10z" />
                </svg>
                <span className="overview-box__label">Next date</span>
                <span className="overview-box__text">{nextDate}</span>
              </div>
              
              <div className="overview-box__detail">
                <svg className="overview-box__icon" viewBox="0 0 24 24">
                  <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6.18-6.18 4 4L20 9.41 22.29 11.7 23 6z" />
                </svg>
                <span className="overview-box__label">Difficulty</span>
                <span className="overview-box__text" style={{ textTransform: 'capitalize' }}>{tour.difficulty}</span>
              </div>
              
              <div className="overview-box__detail">
                <svg className="overview-box__icon" viewBox="0 0 24 24">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                </svg>
                <span className="overview-box__label">Participants</span>
                <span className="overview-box__text">{tour.maxGroupSize} people</span>
              </div>
              
              <div className="overview-box__detail">
                <svg className="overview-box__icon" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <span className="overview-box__label">Rating</span>
                <span className="overview-box__text">{tour.ratingsAverage} / 5</span>
              </div>
            </div>

            {/* Guides Section */}
            {tourGuides.length > 0 && (
              <div className="overview-box__group">
                <h2 className="heading-secondary">Your tour guides</h2>
                {tourGuides.map((guide, index) => (
                  <div key={index} className="overview-box__detail">
                    <img
                      src={`/img/users/${guide.photo}`}
                      alt={guide.name}
                      className="overview-box__img"
                      onError={(e) => {
                        e.target.src = `https://raw.githubusercontent.com/jonasschmedtmann/complete-node-bootcamp/master/4-natours/after-section-12/public/img/users/${guide.photo || 'default.jpg'}`;
                      }}
                    />
                    <span className="overview-box__label">
                      {guide.role === 'lead-guide' ? 'Lead guide' : 'Tour guide'}
                    </span>
                    <span className="overview-box__text">{guide.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right container description */}
        <div className="description-box">
          <h2 className="heading-secondary">About {tour.name}</h2>
          {descriptionParagraphs.map((para, idx) => (
            <p key={idx} className="description__text">
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* 3. Photo Gallery Section */}
      {tour.images && tour.images.length > 0 && (
        <section className="section-pictures">
          {tour.images.map((img, idx) => (
            <div key={idx} className="picture-box">
              <img
                className="picture-box__img"
                src={`/img/tours/${img}`}
                alt={`${tour.name} scene ${idx + 1}`}
                onError={(e) => {
                  e.target.src = `https://raw.githubusercontent.com/jonasschmedtmann/complete-node-bootcamp/master/4-natours/after-section-12/public/img/tours/${img}`;
                }}
              />
            </div>
          ))}
        </section>
      )}

      {/* 4. Interactive SVG Route Map Visualizer */}
      <section className="section-map">
        <InteractiveMap locations={tour.locations} startLocation={tour.startLocation} />
      </section>

      {/* 5. Reviews Section */}
      {tourReviews.length > 0 && (
        <section className="section-reviews">
          <div className="reviews-header">
            <h2 className="heading-secondary">What travelers say</h2>
          </div>
          <div className="reviews">
            {tourReviews.map((rev) => (
              <div key={rev._id || rev.id} className="reviews__card">
                <div className="reviews__avatar">
                  <img
                    className="reviews__avatar-img"
                    src={`/img/users/${rev.user ? rev.user.photo : 'default.jpg'}`}
                    alt={rev.user ? rev.user.name : 'Explorer'}
                    onError={(e) => {
                      e.target.src = `https://raw.githubusercontent.com/jonasschmedtmann/complete-node-bootcamp/master/4-natours/after-section-12/public/img/users/${rev.user ? rev.user.photo : 'default.jpg'}`;
                    }}
                  />
                  <h6 className="reviews__user">{rev.user ? rev.user.name : 'Anonymous Explorer'}</h6>
                </div>
                <p className="reviews__text">{rev.review}</p>
                <div className="reviews__rating">
                  <RatingStars rating={rev.rating} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. Call to Action / Booking section */}
      <section className="section-cta">
        <div className="cta">
          <div className="cta__content" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <h2 className="heading-secondary">What are you waiting for?</h2>
            <p className="cta__text">
              {tour.duration} days. 1 adventure. Infinite memories. Make it yours today!
            </p>
          </div>
          <button className="btn btn--green" onClick={() => setIsBookModalOpen(true)}>
            Book tour now!
          </button>
        </div>
      </section>

      {/* Booking Dialog Modal overlay */}
      <BookingModal
        tour={tour}
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
        onConfirm={onBookTour}
      />
    </>
  );
};

export default TourDetail;
