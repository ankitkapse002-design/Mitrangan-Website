import React, { useState, useEffect } from 'react';
import { GOOGLE_REVIEWS } from '../../content/siteContent';
import { Star, CheckCircle, Quote, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  const totalReviews = GOOGLE_REVIEWS.length;

  useEffect(() => {
    if (!isAutoplay) return;
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % totalReviews);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoplay, totalReviews]);

  const handlePrev = () => {
    setIsAutoplay(false);
    setCurrentIndex(prev => (prev - 1 + totalReviews) % totalReviews);
  };

  const handleNext = () => {
    setIsAutoplay(false);
    setCurrentIndex(prev => (prev + 1) % totalReviews);
  };

  return (
    <section
      style={{
        padding: '6rem 0',
        backgroundColor: 'rgba(7, 18, 13, 0.75)',
        position: 'relative',
        overflow: 'hidden'
      }}
      id="testimonials"
      aria-label="Google Reviews and Patient Feedback"
    >
      {/* Background Soft Glow */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '700px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, rgba(31, 90, 80, 0.06) 50%, transparent 75%)',
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header with Aggregate Rating Pill */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3.5rem auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
            <span className="section-tag">
              <Sparkles size={13} />
              <span>Verified Google Reviews</span>
            </span>
          </div>

          <h2 style={{ fontSize: 'clamp(2rem, 3.8vw, 2.9rem)', marginBottom: '1.25rem', lineHeight: 1.2 }}>
            Voices of Hope, Healing &amp; Transformation
          </h2>

          <p style={{ color: 'var(--text-cream)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem' }}>
            Authentic feedback from residents and families across Central India who entrusted Mitrangan for medical detox, counseling, and life renewal.
          </p>

          {/* Aggregate Trust Score Banner */}
          <div
            style={{
              display: 'inline-flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.25rem',
              padding: '0.75rem 1.6rem',
              borderRadius: '9999px',
              background: 'rgba(14, 34, 26, 0.85)',
              border: '1px solid var(--border-gold)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent-gold)' }}>
                5.0
              </span>
              <div style={{ display: 'flex', gap: '2px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="#D4AF37" color="#D4AF37" />
                ))}
              </div>
            </div>

            <span style={{ width: '1px', height: '18px', backgroundColor: 'var(--border-subtle)' }} />

            <span style={{ fontSize: '0.85rem', color: 'var(--text-cream)', fontWeight: 500 }}>
              100% 5-Star Rated Patient &amp; Family Feedback
            </span>

            <span style={{ width: '1px', height: '18px', backgroundColor: 'var(--border-subtle)' }} />

            <span style={{ fontSize: '0.82rem', color: '#10B981', display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 600 }}>
              <CheckCircle size={14} />
              <span>Verified Clinical Registry</span>
            </span>
          </div>
        </div>

        {/* Carousel / Grid View */}
        <div style={{ position: 'relative', maxWidth: '1200px', margin: '0 auto' }}>
          {/* Controls Bar for Desktop / Tablet */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '0.5rem',
              marginBottom: '1.25rem'
            }}
          >
            <button
              onClick={handlePrev}
              aria-label="Previous Review"
              className="btn btn-ghost"
              style={{
                width: '42px',
                height: '42px',
                padding: 0,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ChevronLeft size={19} />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next Review"
              className="btn btn-ghost"
              style={{
                width: '42px',
                height: '42px',
                padding: 0,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ChevronRight size={19} />
            </button>
          </div>

          {/* Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.75rem',
              alignItems: 'stretch'
            }}
          >
            {GOOGLE_REVIEWS.map((rev, idx) => {
              const isCurrent = idx === currentIndex;
              return (
                <div
                  key={idx}
                  className="glass-panel"
                  style={{
                    padding: '2.2rem 1.8rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    borderRadius: '16px',
                    border: isCurrent ? '1px solid var(--border-gold)' : '1px solid var(--border-subtle)',
                    background: isCurrent ? 'rgba(14, 34, 26, 0.95)' : 'rgba(11, 30, 23, 0.65)',
                    boxShadow: isCurrent ? 'var(--shadow-gold)' : 'var(--shadow-sm)',
                    transition: 'all 0.35s ease'
                  }}
                  onMouseEnter={() => setIsAutoplay(false)}
                >
                  <div>
                    {/* Stars & Quote */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                      <div style={{ display: 'flex', gap: '3px' }}>
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} size={16} fill="#D4AF37" color="#D4AF37" />
                        ))}
                      </div>
                      <Quote size={24} color="rgba(212, 175, 55, 0.3)" />
                    </div>

                    {/* Highlight pill */}
                    {rev.highlight && (
                      <span
                        style={{
                          display: 'inline-block',
                          fontSize: '0.75rem',
                          fontFamily: 'var(--font-display)',
                          color: 'var(--accent-gold)',
                          background: 'rgba(212, 175, 55, 0.1)',
                          padding: '0.2rem 0.6rem',
                          borderRadius: '9999px',
                          marginBottom: '1rem'
                        }}
                      >
                        "{rev.highlight}"
                      </span>
                    )}

                    {/* Review text */}
                    <p style={{ fontSize: '0.98rem', fontStyle: 'italic', color: 'var(--text-ivory)', lineHeight: 1.65, marginBottom: '1.75rem' }}>
                      "{rev.text}"
                    </p>
                  </div>

                  {/* Reviewer Signature */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-glass)' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(212, 175, 55, 0.15)',
                        border: '1px solid rgba(212, 175, 55, 0.35)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        color: 'var(--accent-gold)',
                        fontSize: '1.05rem',
                        fontFamily: 'var(--font-display)'
                      }}
                    >
                      {rev.name[0]}
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <span style={{ fontWeight: 600, color: 'var(--text-ivory)', fontSize: '0.95rem' }}>
                          {rev.name}
                        </span>
                        <CheckCircle size={14} color="#10B981" />
                      </div>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        {rev.role} • Verified Google Review
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dots Indicator */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '2.5rem' }}>
            {GOOGLE_REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setIsAutoplay(false);
                  setCurrentIndex(i);
                }}
                aria-label={`Go to review ${i + 1}`}
                style={{
                  width: currentIndex === i ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  backgroundColor: currentIndex === i ? 'var(--accent-gold)' : 'rgba(255, 255, 255, 0.2)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
