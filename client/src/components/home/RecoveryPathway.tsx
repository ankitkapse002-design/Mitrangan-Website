import React, { useState } from 'react';
import { Link } from 'wouter';
import { RECOVERY_STEPS } from '../../content/siteContent';
import { ArrowRight, Phone, Sparkles, CheckCircle2 } from 'lucide-react';

export const RecoveryPathway: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  // Symbolic atmospheric lighting progression representing "From Darkness to Light"
  const stageAtmospheres = [
    {
      theme: 'Deep Twilight & Medical Stabilization',
      brightness: 0.65,
      sunGlow: 'rgba(212, 175, 55, 0.1)',
      bgPosition: '15% center',
      subtitle: 'The journey starts with physical safety, medically supervised detox, and relief from chemical crisis.'
    },
    {
      theme: 'Dawn Awakening & Emotional Counseling',
      brightness: 0.78,
      sunGlow: 'rgba(233, 196, 106, 0.25)',
      bgPosition: '38% center',
      subtitle: 'Cognitive behavioral therapy, trauma healing, and uncovering personal triggers with empathy.'
    },
    {
      theme: 'Morning Sunlight & Holistic Renewal',
      brightness: 0.92,
      sunGlow: 'rgba(244, 211, 126, 0.42)',
      bgPosition: '65% center',
      subtitle: 'Daily yoga, physical fitness, creative expression, and cultivating self-discipline.'
    },
    {
      theme: 'Radiant Dawn & Family Reintegration',
      brightness: 1.05,
      sunGlow: 'rgba(255, 235, 170, 0.55)',
      bgPosition: '90% center',
      subtitle: 'Reuniting with family, relapse prevention planning, and stepping into a purposeful new life.'
    }
  ];

  const currentAtmosphere = stageAtmospheres[activeStep] || stageAtmospheres[0];

  return (
    <section
      style={{
        position: 'relative',
        padding: '7rem 0',
        overflow: 'hidden',
        minHeight: '850px'
      }}
      aria-label="The Journey Towards Long-Term Freedom - Recovery Pathway"
    >
      {/* 1. CINEMATIC 3D BACKGROUND ENVIRONMENT ("FROM DARKNESS TO LIGHT") */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/assets/recovery_journey_path.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: currentAtmosphere.bgPosition,
          filter: `brightness(${currentAtmosphere.brightness}) saturate(1.18)`,
          transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
          zIndex: 1,
          transform: 'scale(1.03)'
        }}
      />

      {/* 2. ATMOSPHERIC SHADOW & GOLDEN PROGRESSION OVERLAYS */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at 70% 30%, ${currentAtmosphere.sunGlow} 0%, rgba(7, 18, 13, 0.75) 55%, #07120D 95%)`,
          transition: 'background 1.2s ease',
          zIndex: 2,
          pointerEvents: 'none'
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, #07120D 0%, transparent 18%, rgba(7, 18, 13, 0.45) 60%, #07120D 100%)',
          zIndex: 2,
          pointerEvents: 'none'
        }}
      />

      {/* 3. SECTION CONTENT */}
      <div className="container" style={{ position: 'relative', zIndex: 5 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 3.5rem auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <span
              className="section-tag"
              style={{
                backdropFilter: 'blur(16px)',
                backgroundColor: 'rgba(7, 18, 13, 0.85)',
                border: '1px solid rgba(212, 175, 55, 0.4)'
              }}
            >
              <Sparkles size={13} color="#D4AF37" />
              <span>Journey From Darkness to Light</span>
            </span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(2.2rem, 4.2vw, 3.2rem)',
              marginBottom: '1rem',
              lineHeight: 1.15,
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.9)'
            }}
          >
            The Journey Towards Long-Term Freedom
          </h2>
          <p
            style={{
              color: 'var(--text-ivory)',
              fontSize: '1.08rem',
              lineHeight: 1.7,
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.9)'
            }}
          >
            Addiction is an overwhelming dark forest, but every step forward brings greater light and self-worth. Explore how our 4-stage therapeutic progression guides each resident towards lasting peace.
          </p>
        </div>

        {/* Interactive Milestone Navigation Bar */}
        <div
          style={{
            maxWidth: '780px',
            margin: '0 auto 3rem auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
            padding: '0 1rem'
          }}
        >
          {/* Horizontal connecting light beam */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '5%',
              right: '5%',
              height: '3px',
              backgroundColor: 'rgba(212, 175, 55, 0.2)',
              transform: 'translateY(-50%)',
              zIndex: 1
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${(activeStep / (RECOVERY_STEPS.length - 1)) * 100}%`,
                background: 'linear-gradient(to right, #D4AF37, #FFF2B2)',
                boxShadow: '0 0 12px rgba(255, 230, 160, 0.8)',
                transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            />
          </div>

          {/* 4 Interactive Node Buttons */}
          {RECOVERY_STEPS.map((step, idx) => {
            const isActive = activeStep === idx;
            const isCompleted = activeStep > idx;

            return (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                style={{
                  position: 'relative',
                  zIndex: 2,
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  border: isActive
                    ? '2px solid #FFF5D6'
                    : isCompleted
                    ? '2px solid var(--accent-gold)'
                    : '2px solid rgba(212, 175, 55, 0.35)',
                  backgroundColor: isActive
                    ? 'var(--accent-gold)'
                    : isCompleted
                    ? '#0B1E17'
                    : '#07120D',
                  color: isActive ? '#07120D' : isCompleted ? 'var(--accent-gold)' : 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  fontFamily: 'var(--font-display)',
                  boxShadow: isActive
                    ? '0 0 25px rgba(255, 235, 160, 0.9), 0 4px 15px rgba(0, 0, 0, 0.8)'
                    : '0 2px 8px rgba(0, 0, 0, 0.6)',
                  transition: 'all 0.35s ease'
                }}
                aria-label={`Select Step ${idx + 1}: ${step.title}`}
              >
                {isCompleted ? <CheckCircle2 size={18} /> : `0${idx + 1}`}
              </button>
            );
          })}
        </div>

        {/* Active Stage Atmosphere Banner */}
        <div
          style={{
            maxWidth: '680px',
            margin: '0 auto 3rem auto',
            textAlign: 'center',
            padding: '0.85rem 1.5rem',
            borderRadius: '9999px',
            background: 'rgba(7, 18, 13, 0.85)',
            border: '1px solid rgba(212, 175, 55, 0.35)',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.6)'
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.78rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: 'var(--accent-gold)',
              display: 'block',
              marginBottom: '0.2rem'
            }}
          >
            {currentAtmosphere.theme}
          </span>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-cream)', margin: 0, lineHeight: 1.5 }}>
            {currentAtmosphere.subtitle}
          </p>
        </div>

        {/* 4 Cards Grid with 3D Depth Highlighting */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.75rem',
            position: 'relative'
          }}
        >
          {RECOVERY_STEPS.map((step, idx) => {
            const isActive = activeStep === idx;

            return (
              <div
                key={idx}
                onClick={() => setActiveStep(idx)}
                className="glass-panel"
                style={{
                  padding: '2.5rem 2rem',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: '18px',
                  cursor: 'pointer',
                  border: isActive
                    ? '1.5px solid var(--accent-gold)'
                    : '1px solid rgba(212, 175, 55, 0.18)',
                  backgroundColor: isActive
                    ? 'rgba(14, 38, 28, 0.92)'
                    : 'rgba(7, 18, 13, 0.78)',
                  backdropFilter: 'blur(20px)',
                  transform: isActive ? 'translateY(-10px) scale(1.02)' : 'translateY(0)',
                  boxShadow: isActive
                    ? '0 20px 45px rgba(0, 0, 0, 0.8), 0 0 30px rgba(212, 175, 55, 0.3)'
                    : '0 8px 24px rgba(0, 0, 0, 0.5)',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                <div>
                  {/* Step Numeral Header */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '1rem'
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '2.4rem',
                        fontWeight: 700,
                        color: isActive ? 'var(--accent-gold)' : 'rgba(212, 175, 55, 0.35)',
                        lineHeight: 1,
                        transition: 'color 0.3s ease'
                      }}
                    >
                      {step.step}
                    </span>

                    {isActive && (
                      <span
                        style={{
                          fontSize: '0.72rem',
                          fontFamily: 'var(--font-display)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          color: '#07120D',
                          backgroundColor: 'var(--accent-gold)',
                          padding: '0.2rem 0.6rem',
                          borderRadius: '9999px',
                          fontWeight: 700
                        }}
                      >
                        Active Stage
                      </span>
                    )}
                  </div>

                  <h3
                    style={{
                      fontSize: '1.35rem',
                      marginBottom: '0.85rem',
                      color: isActive ? 'var(--text-ivory)' : 'var(--text-cream)',
                      lineHeight: 1.3
                    }}
                  >
                    {step.title}
                  </h3>

                  <p
                    style={{
                      color: isActive ? 'var(--text-ivory)' : 'var(--text-muted)',
                      fontSize: '0.92rem',
                      lineHeight: 1.65
                    }}
                  >
                    {step.description}
                  </p>
                </div>

                <div
                  style={{
                    marginTop: '1.75rem',
                    height: '3px',
                    width: isActive ? '100%' : '35px',
                    backgroundColor: isActive ? 'var(--accent-gold)' : 'rgba(212, 175, 55, 0.3)',
                    borderRadius: '2px',
                    boxShadow: isActive ? '0 0 10px rgba(212, 175, 55, 0.7)' : 'none',
                    transition: 'all 0.4s ease'
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Pathway Bottom CTA */}
        <div
          style={{
            marginTop: '4rem',
            padding: '2.25rem 2.75rem',
            borderRadius: '20px',
            background: 'rgba(7, 18, 13, 0.88)',
            border: '1px solid var(--border-gold)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem'
          }}
        >
          <div>
            <h4 style={{ fontSize: '1.35rem', color: 'var(--text-ivory)', marginBottom: '0.35rem' }}>
              Are you or a loved one ready to take the first step towards the light?
            </h4>
            <p style={{ color: 'var(--text-cream)', fontSize: '0.92rem' }}>
              Our counselors are available 24 hours a day, 7 days a week. All inquiries are strictly confidential.
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem' }}>
            <Link href="/register" className="btn btn-gold">
              <span>Register Admission</span>
              <ArrowRight size={15} />
            </Link>
            <a href="tel:+919767362388" className="btn btn-emerald">
              <Phone size={15} />
              <span>Call Helpline</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
