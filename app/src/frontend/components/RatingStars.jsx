

const RatingStars = ({ rating, maxRating = 5 }) => {
  const stars = [];
  const roundedRating = Math.round(rating);

  for (let i = 1; i <= maxRating; i++) {
    const isActive = i <= roundedRating;
    stars.push(
      <svg
        key={i}
        className={`reviews__star ${isActive ? 'reviews__star--active' : 'reviews__star--inactive'}`}
        viewBox="0 0 24 24"
        style={{
          width: '20px',
          height: '20px',
          marginRight: '2px',
          fill: isActive ? 'var(--color-accent)' : 'rgba(255, 255, 255, 0.1)',
        }}
      >
        <path d="M12 .587l3.668 7.431 8.2 1.191-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.409l8.2-1.191z" />
      </svg>
    );
  }

  return <div style={{ display: 'flex', alignItems: 'center' }}>{stars}</div>;
};

export default RatingStars;
