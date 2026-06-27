import React, { useState } from 'react';

const InteractiveMap = ({ locations = [], startLocation }) => {
  const [hoveredStop, setHoveredStop] = useState(null);

  if (!locations || locations.length === 0) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
        No map locations available
      </div>
    );
  }

  // Combine startLocation and stops to plot
  const allPoints = [];
  if (startLocation) {
    allPoints.push({
      description: `Departure: ${startLocation.description}`,
      coordinates: startLocation.coordinates,
      day: 0,
    });
  }
  locations.forEach((loc) => {
    allPoints.push({
      description: loc.description,
      coordinates: loc.coordinates,
      day: loc.day,
    });
  });

  // Calculate coordinates bounds
  const longs = allPoints.map(p => p.coordinates[0]);
  const lats = allPoints.map(p => p.coordinates[1]);

  const minLong = Math.min(...longs);
  const maxLong = Math.max(...longs);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);

  const padding = 50;
  const width = 800;
  const height = 400;

  // Scaling helpers
  const getX = (long) => {
    if (maxLong === minLong) return width / 2;
    return padding + ((long - minLong) / (maxLong - minLong)) * (width - 2 * padding);
  };

  const getY = (lat) => {
    if (maxLat === minLat) return height / 2;
    return height - (padding + ((lat - minLat) / (maxLat - minLat)) * (height - 2 * padding));
  };

  // Build the path string
  const pathPoints = allPoints.map(p => `${getX(p.coordinates[0])},${getY(p.coordinates[1])}`);
  const pathData = pathPoints.length > 1 ? `M ${pathPoints.join(' L ')}` : '';

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', padding: '20px', background: '#111827' }}>
      <div style={{ position: 'absolute', top: '1.2rem', left: '1.5rem', zIndex: 10 }}>
        <h4 style={{ fontSize: '0.75rem', fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Route checkpoints</h4>
      </div>

      {/* SVG Container */}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        height="100%"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255, 255, 255, 0.015)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Minimal border */}
        <rect width="100%" height="100%" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />

        {/* Connector Path - Thin, solid, elegant desaturated green */}
        {pathData && (
          <path
            d={pathData}
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.6"
          />
        )}

        {/* Plotting points */}
        {allPoints.map((pt, idx) => {
          const cx = getX(pt.coordinates[0]);
          const cy = getY(pt.coordinates[1]);
          const isHovered = hoveredStop === idx;

          return (
            <g key={idx} style={{ cursor: 'pointer' }} onMouseEnter={() => setHoveredStop(idx)} onMouseLeave={() => setHoveredStop(null)}>
              {/* Outer clean border circle */}
              <circle
                cx={cx}
                cy={cy}
                r={isHovered ? 12 : 7}
                fill="none"
                stroke={pt.day === 0 ? '#d97706' : 'var(--color-primary)'}
                strokeWidth="1.5"
                opacity={isHovered ? 1 : 0.5}
                style={{ transition: 'all 0.25s ease' }}
              />

              {/* Core solid circle */}
              <circle
                cx={cx}
                cy={cy}
                r="3"
                fill={pt.day === 0 ? '#d97706' : 'var(--color-primary)'}
              />

              {/* Day Label inside Map */}
              <text
                x={cx}
                y={cy - (isHovered ? 18 : 12)}
                textAnchor="middle"
                fill="#f3f4f6"
                fontSize={isHovered ? '9.5px' : '8.5px'}
                fontWeight={isHovered ? '600' : '500'}
                style={{
                  transition: 'all 0.25s ease',
                  userSelect: 'none',
                  letterSpacing: '0.02em',
                }}
              >
                {pt.day === 0 ? 'Start' : `Day ${pt.day}`}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Elegant Tooltip overlay */}
      {hoveredStop !== null && (
        <div
          style={{
            position: 'absolute',
            bottom: '1.2rem',
            right: '1.2rem',
            background: '#1f2937',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '6px',
            padding: '0.7rem 1rem',
            width: '230px',
            color: 'white',
            zIndex: 10,
            boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
            pointerEvents: 'none',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              fontSize: '0.65rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: allPoints[hoveredStop].day === 0 ? '#d97706' : 'var(--color-primary-light)',
              marginBottom: '0.2rem',
            }}
          >
            {allPoints[hoveredStop].day === 0 ? 'Departure Point' : `Stop • Day ${allPoints[hoveredStop].day}`}
          </span>
          <h5 style={{ fontSize: '0.85rem', fontWeight: '500', color: '#f3f4f6' }}>
            {allPoints[hoveredStop].description}
          </h5>
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;
