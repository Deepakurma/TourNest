
import { Link } from 'react-router-dom';
import RatingStars from './RatingStars';

const TourCard = ({ tour }) => {
  const tourId = tour._id || tour.id;
  const tourImage = `/img/tours/${tour.imageCover}`;
  
  // Format dates
  const nextDate = tour.startDates && tour.startDates.length > 0
    ? new Date(tour.startDates[0]).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    : 'N/A';

  const stopCount = tour.locations ? tour.locations.length : 0;

  return (
    <div className="card">
      <div className="card__header">
        <div className="card__picture">
          <div className="card__picture-overlay">&nbsp;</div>
          <img
            src={tourImage}
            alt={tour.name}
            className="card__picture-img"
            onError={(e) => {
              // Fallback to github repo CDN in case local files are served on different base url
              e.target.src = `https://raw.githubusercontent.com/jonasschmedtmann/complete-node-bootcamp/master/4-natours/after-section-12/public/img/tours/${tour.imageCover}`;
            }}
          />
        </div>

        <h3 className="heading-tertirary">
          <span>{tour.name}</span>
        </h3>
      </div>

      <div className="card__details">
        <h4 className="card__sub-heading">
          {tour.difficulty} {tour.duration}-day tour
        </h4>
        <p className="card__text">{tour.summary}</p>
        
        <div className="card__data">
          <svg className="card__icon" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
          <span>{tour.startLocation ? tour.startLocation.description : 'N/A'}</span>
        </div>
        
        <div className="card__data">
          <svg className="card__icon" viewBox="0 0 24 24">
            <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm-5-5h5v5h-5z" />
          </svg>
          <span>{nextDate}</span>
        </div>
        
        <div className="card__data">
          <svg className="card__icon" viewBox="0 0 24 24">
            <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z" />
          </svg>
          <span>{stopCount} stops</span>
        </div>
        
        <div className="card__data">
          <svg className="card__icon" viewBox="0 0 24 24">
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
          </svg>
          <span>{tour.maxGroupSize} people</span>
        </div>
      </div>

      <div className="card__footer">
        <div className="card__footer-stats">
          <p>
            <span className="card__footer-value">${tour.price}</span>
            <span className="card__footer-text">per person</span>
          </p>
          <p className="card__ratings">
            <span className="card__footer-value" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              {tour.ratingsAverage}
              <RatingStars rating={tour.ratingsAverage} />
            </span>
            <span className="card__footer-text">rating ({tour.ratingsQuantity})</span>
          </p>
        </div>
        <Link to={`/tour/${tourId}`} className="btn btn--green btn--small card__footer-btn">
          Details
        </Link>
      </div>
    </div>
  );
};

export default TourCard;
