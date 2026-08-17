import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  // Ensure the page scrolls to the top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);



  const values = [
    {
      title: 'Expert Guidance',
      desc: 'All treks are led by certified guides who undergo rigorous rescue training and local environmental coaching.',
    },
    {
      title: 'Sustainable Journeys',
      desc: 'We operate under a strict Leave-No-Trace ethos, donating a percentage of profits directly to environmental preservation.',
    },
    {
      title: 'Curated Adventure',
      desc: 'We limit groups to small sizes (max 10-25) to ensure high-fidelity interactions, security, and personalized training.',
    }
  ];

  return (
    <main className="main" style={{ minHeight: '80vh' }}>
      {/* 1. Header Hero section */}
      <section
        style={{
          background: 'linear-gradient(135deg, rgba(9, 13, 22, 0.95) 0%, rgba(17, 24, 39, 0.9) 100%)',
          border: '1px solid var(--color-border)',
          borderRadius: '12px',
          padding: '5rem 3rem',
          textAlign: 'center',
          marginBottom: '4rem',
        }}
      >
        <span
          style={{
            fontSize: '0.8rem',
            fontWeight: '700',
            color: 'var(--color-primary-light)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            display: 'block',
            marginBottom: '0.8rem',
          }}
        >
          Our Story
        </span>
        <h1 className="hero-title" style={{ fontSize: '3rem', color: 'white', marginBottom: '1rem', textAlign: 'center' }}>
          Redefining Adventure Travel
        </h1>
        <p style={{ color: '#9ca3af', maxWidth: '600px', margin: '0 auto', fontSize: '1.05rem', lineHeight: '1.7' }}>
          We design immersive, sustainable expeditions for travelers seeking genuine connections with wild nature and remote cultures.
        </p>
      </section>

      {/* 2. Mission & Values */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginBottom: '5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 className="heading-secondary" style={{ borderLeft: '2px solid var(--color-primary)', paddingLeft: '0.8rem', marginBottom: '1.5rem' }}>
            Our Mission
          </h2>
          <p style={{ color: '#9ca3af', fontSize: '0.95rem', lineHeight: '1.8', marginBottom: '1.2rem' }}>
            We believe that exploring wild habitats increases our collective desire to protect them. Our goal is to provide safe, educational, and low-impact treks that inspire a deeper environmental awareness.
          </p>
          <p style={{ color: '#9ca3af', fontSize: '0.95rem', lineHeight: '1.8' }}>
            From high alpine peaks in Aspen to the pristine marine environments of Key West, we map out every trail with sustainability and local communities at the center.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {values.map((v, i) => (
            <div
              key={i}
              style={{
                background: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                padding: '1.8rem',
              }}
            >
              <h4 style={{ fontSize: '1rem', fontWeight: '600', color: 'white', marginBottom: '0.5rem' }}>{v.title}</h4>
              <p style={{ fontSize: '0.85rem', color: '#9ca3af', lineHeight: '1.6' }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Operational Stats Bar */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          textAlign: 'center',
          background: '#111827',
          border: '1px solid var(--color-border)',
          borderRadius: '8px',
          padding: '2.5rem 1.5rem',
          gap: '1.5rem',
          marginBottom: '5rem',
        }}
      >
        <div>
          <h3 style={{ fontSize: '2.2rem', fontWeight: '700', color: 'var(--color-primary-light)' }}>10K+</h3>
          <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Happy Travelers
          </span>
        </div>
        <div style={{ borderLeft: '1px solid var(--color-border)', borderRight: '1px solid var(--color-border)' }}>
          <h3 style={{ fontSize: '2.2rem', fontWeight: '700', color: 'var(--color-primary-light)' }}>150+</h3>
          <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Destinations Mapped
          </span>
        </div>
        <div>
          <h3 style={{ fontSize: '2.2rem', fontWeight: '700', color: 'var(--color-primary-light)' }}>100%</h3>
          <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Safety Audit Record
          </span>
        </div>
      </section>



      {/* 5. Back to All Tours button */}
      <div style={{ textAlign: 'center', marginTop: '4rem' }}>
        <Link to="/" className="btn btn--green">
          Explore our treks
        </Link>
      </div>
    </main>
  );
};

export default AboutUs;
