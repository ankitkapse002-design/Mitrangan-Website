import React, { useState, useEffect, useRef } from 'react';
import { MITRANGAN_STATS, type StatItem } from '../../content/siteContent';
import { Shield, Sparkles, HeartPulse, Award, Clock } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  recovered: <HeartPulse size={20} color="#D4AF37" />,
  years: <Award size={20} color="#D4AF37" />,
  staff: <Shield size={20} color="#D4AF37" />,
  programs: <Sparkles size={20} color="#D4AF37" />,
  support: <Clock size={20} color="#D4AF37" />
};

export const StatsCounter: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    MITRANGAN_STATS.forEach(stat => {
      if (stat.targetNumber !== null) {
        initial[stat.id] = 0;
      }
    });
    return initial;
  });

  useEffect(() => {
    const currentSection = sectionRef.current;
    if (!currentSection || hasAnimated) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      const finalCounts: Record<string, number> = {};
      MITRANGAN_STATS.forEach(stat => {
        if (stat.targetNumber !== null) {
          finalCounts[stat.id] = stat.targetNumber;
        }
      });
      setCounts(finalCounts);
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const duration = 1800; // 1.8 seconds smooth animation
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Smooth easeOutQuad function: 1 - (1 - progress) * (1 - progress)
            const easeProgress = 1 - (1 - progress) * (1 - progress);

            const nextCounts: Record<string, number> = {};
            MITRANGAN_STATS.forEach(stat => {
              if (stat.targetNumber !== null) {
                nextCounts[stat.id] = Math.round(easeProgress * stat.targetNumber);
              }
            });

            setCounts(nextCounts);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    observer.observe(currentSection);

    return () => {
      observer.disconnect();
    };
  }, [hasAnimated]);

  return (
    <section
      ref={sectionRef}
      aria-label="Mitrangan Clinical Impact and Verified Statistics"
      style={{
        position: 'relative',
        padding: '4.5rem 0',
        backgroundColor: 'rgba(8, 20, 15, 0.82)',
        borderTop: '1px solid rgba(212, 175, 55, 0.2)',
        borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
        overflow: 'hidden'
      }}
    >
      {/* Background Subtle Atmospheric Light */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          height: '140%',
          background: 'radial-gradient(ellipse at center, rgba(212, 175, 55, 0.08) 0%, rgba(31, 90, 80, 0.08) 45%, transparent 75%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Lead Tag */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="section-tag">
            <Sparkles size={13} />
            <span>Proven Track Record &amp; Clinical Reach</span>
          </span>
        </div>

        {/* 5-Metric Responsive Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.75rem',
            alignItems: 'stretch'
          }}
          className="stats-grid-container"
        >
          {MITRANGAN_STATS.map((stat, idx) => {
            const isStatic = stat.targetNumber === null;
            const displayValue = isStatic
              ? stat.staticValue
              : `${counts[stat.id] || 0}${stat.suffix || ''}`;

            return (
              <div
                key={stat.id}
                className="glass-panel"
                style={{
                  padding: '1.75rem 1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  justifyContent: 'space-between',
                  borderRadius: '16px',
                  border: '1px solid rgba(212, 175, 55, 0.18)',
                  background: 'rgba(11, 30, 23, 0.65)',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={e => {
                  e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.45)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.4)';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.18)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                }}
              >
                {/* Icon Pill */}
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(212, 175, 55, 0.1)',
                    border: '1px solid rgba(212, 175, 55, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem'
                  }}
                >
                  {iconMap[stat.id] || <Sparkles size={18} color="#D4AF37" />}
                </div>

                {/* Big Animated Number */}
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2.5rem, 4vw, 3.4rem)',
                    fontWeight: 700,
                    lineHeight: 1.05,
                    marginBottom: '0.4rem',
                    letterSpacing: '-0.02em',
                    color: 'var(--accent-gold)'
                  }}
                  aria-live="polite"
                >
                  {displayValue}
                </div>

                {/* Descriptive Title Label */}
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.05rem',
                    fontWeight: 600,
                    color: 'var(--text-ivory)',
                    marginBottom: '0.35rem',
                    lineHeight: 1.25
                  }}
                >
                  {stat.label}
                </div>

                {/* Supporting Description */}
                <p
                  style={{
                    fontSize: '0.82rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.5,
                    maxWidth: '220px',
                    margin: '0 auto'
                  }}
                >
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
