import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'wouter';
import { Phone, ArrowRight, ShieldCheck, HeartHandshake, Sparkles, RotateCcw, X } from 'lucide-react';

const WhatsAppIcon: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    style={{ flexShrink: 0 }}
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.952 3.71 1.453 5.711 1.454h.005c6.554 0 11.89-5.336 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

interface HeroProps {
  onReplayIntro?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onReplayIntro }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Close support modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsSupportOpen(false);
    };
    if (isSupportOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSupportOpen]);

  // Subtle mouse tracking for gentle 3D parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 2; // -1 to 1
    const y = (clientY / innerHeight - 0.5) * 2; // -1 to 1
    setMousePos({ x, y });
  };

  // Subtle floating golden dust / ember motes on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 800);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || 800;
    };
    window.addEventListener('resize', onResize);

    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.8,
      speedY: -(Math.random() * 0.45 + 0.15),
      speedX: (Math.random() - 0.5) * 0.25,
      opacity: Math.random() * 0.65 + 0.2
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.y += p.speedY;
        p.x += p.speedX;
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }

        ctx.fillStyle = `rgba(235, 215, 150, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <>
      <section
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        minHeight: '94vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '8.5rem',
        paddingBottom: '5.5rem',
        overflow: 'hidden'
      }}
      aria-label="Mitrangan Rehabilitation Center Hero"
    >
      {/* 1. BACKGROUND LAYER: AI-Generated Cinematic Environment ("From Darkness to Light") */}
      <div
        style={{
          position: 'absolute',
          inset: '-20px',
          backgroundImage: 'url(/assets/hero_dawn_path.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 45%',
          transform: `translate3d(${mousePos.x * -14}px, ${mousePos.y * -10}px, 0) scale(1.04)`,
          transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
          filter: 'brightness(0.78) saturate(1.15)',
          willChange: 'transform',
          zIndex: 1
        }}
      />

      {/* 2. ATMOSPHERIC SHADOW & CONTRAST VIGNETTE OVERLAYS */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 65% 42%, rgba(212, 175, 55, 0.15) 0%, rgba(7, 18, 13, 0.65) 45%, rgba(5, 14, 10, 0.94) 85%)',
          zIndex: 2,
          pointerEvents: 'none'
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(5, 13, 9, 0.75) 0%, rgba(7, 18, 13, 0.45) 40%, rgba(7, 18, 13, 0.88) 85%, #07120D 100%)',
          zIndex: 2,
          pointerEvents: 'none'
        }}
      />

      {/* 3. FLOATING GOLD EMBERS CANVAS */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 3,
          pointerEvents: 'none',
          opacity: 0.85
        }}
      />

      {/* 4. HERO CONTENT CONTAINER */}
      <div className="container" style={{ position: 'relative', zIndex: 5 }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          {/* Top Tag */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
            <span
              className="section-tag"
              style={{
                backdropFilter: 'blur(16px)',
                backgroundColor: 'rgba(7, 18, 13, 0.85)',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
              }}
            >
              <Sparkles size={13} color="#D4AF37" />
              <span>A Door Towards a New Beginning</span>
            </span>
          </div>

          {/* Main H1 Title */}
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 5.5vw, 4.4rem)',
              lineHeight: 1.12,
              marginBottom: '1.5rem',
              fontWeight: 700,
              textShadow: '0 4px 25px rgba(0, 0, 0, 0.9)'
            }}
          >
            Welcome to <span className="text-gradient-gold">Mitrangan</span> De-Addiction &amp; Rehabilitation Kendra
          </h1>

          {/* Genuine Subparagraph */}
          <p
            style={{
              fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
              color: 'var(--text-ivory)',
              lineHeight: 1.7,
              marginBottom: '2.5rem',
              maxWidth: '780px',
              marginRight: 'auto',
              marginLeft: 'auto',
              textShadow: '0 2px 14px rgba(0, 0, 0, 0.95)'
            }}
          >
            We are a trusted Nasha Mukti Kendra in Nagpur dedicated to helping individuals overcome addiction through structured rehabilitation, professional counseling, and holistic healing programs. Our goal is to restore confidence, health, and purpose in every life we support.
          </p>

          {/* Primary Action Buttons */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.85rem',
              marginBottom: '2.5rem'
            }}
          >
            <Link
              href="/register"
              className="btn btn-gold"
              style={{
                padding: '0.9rem 2.2rem',
                fontSize: '1.02rem',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6), 0 0 25px rgba(212, 175, 55, 0.35)'
              }}
            >
              <HeartHandshake size={20} />
              <span>Register for Admission</span>
              <ArrowRight size={16} />
            </Link>

            <Link
              href="/status"
              className="btn btn-outline-gold"
              style={{
                padding: '0.9rem 1.8rem',
                fontSize: '1rem',
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(7, 18, 13, 0.6)'
              }}
            >
              <ShieldCheck size={19} />
              <span>Check Admission Status</span>
            </Link>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.65rem'
              }}
            >
              <a
                href="tel:+919767362388"
                className="btn btn-emerald"
                style={{
                  padding: '0.9rem 1.6rem',
                  fontSize: '0.98rem',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.5)'
                }}
              >
                <Phone size={18} />
                <span>24/7 Helpline</span>
              </a>

              <button
                type="button"
                onClick={() => setIsSupportOpen(true)}
                className="btn btn-gold"
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 6px 18px rgba(0, 0, 0, 0.5), 0 0 14px rgba(212, 175, 55, 0.25)',
                  cursor: 'pointer',
                  flexShrink: 0,
                  border: 'none',
                  outline: 'none'
                }}
                aria-label="Talk to Mitrangan Human Support Team"
                title="Talk to Mitrangan Human Support Team"
              >
                <Phone size={18} />
              </button>
            </div>
          </div>

          {/* Emergency Pickup Banner & Replay Intro Control */}
          <div
            style={{
              display: 'inline-flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.5rem',
              padding: '0.85rem 1.75rem',
              background: 'rgba(7, 18, 13, 0.82)',
              border: '1px solid rgba(212, 175, 55, 0.35)',
              borderRadius: '9999px',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.7)',
              fontSize: '0.88rem',
              color: 'var(--text-cream)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#10B981',
                  animation: 'pulse 2s infinite'
                }}
              />
              <span><strong>*Request 24x7 Pickup:</strong> Discrete and safe ambulance pickup assistance available.</span>
            </div>

            {onReplayIntro && (
              <button
                onClick={onReplayIntro}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--accent-gold)',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.82rem',
                  padding: 0,
                  textDecoration: 'underline'
                }}
                title="Experience the opening door animation again"
              >
                <RotateCcw size={13} />
                <span>Re-watch Door Opening</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>

    {/* Talk to Mitrangan Human Support Team Popup / Modal */}
    {isSupportOpen && (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(5, 14, 10, 0.78)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.25rem',
          animation: 'fadeIn 0.2s ease-out'
        }}
        onClick={() => setIsSupportOpen(false)}
        role="dialog"
        aria-modal="true"
        aria-labelledby="support-team-modal-title"
      >
        <div
          className="glass-panel-gold"
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '440px',
            padding: 'clamp(1.75rem, 5vw, 2.25rem)',
            background: 'linear-gradient(165deg, rgba(14, 34, 25, 0.98) 0%, rgba(7, 18, 13, 0.99) 100%)',
            border: '1px solid rgba(212, 175, 55, 0.38)',
            borderRadius: '20px',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.85), 0 0 35px rgba(212, 175, 55, 0.16)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            color: 'var(--text-cream)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={() => setIsSupportOpen(false)}
            style={{
              position: 'absolute',
              top: '1.25rem',
              right: '1.25rem',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(212, 175, 55, 0.25)',
              borderRadius: '50%',
              width: '34px',
              height: '34px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-dim)',
              cursor: 'pointer',
              transition: 'var(--transition-smooth)'
            }}
            aria-label="Close support dialog"
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--text-ivory)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
              e.currentTarget.style.borderColor = 'var(--accent-gold)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-dim)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.25)';
            }}
          >
            <X size={17} />
          </button>

          {/* Header Tag */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontSize: '0.78rem',
              fontWeight: 600,
              color: 'var(--accent-gold)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: '0.65rem'
            }}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: '#10B981',
                boxShadow: '0 0 8px #10B981'
              }}
            />
            <span>Confidential 24/7 Support</span>
          </div>

          {/* Title */}
          <h3
            id="support-team-modal-title"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.35rem',
              fontWeight: 700,
              color: 'var(--text-ivory)',
              margin: '0 0 0.65rem 0',
              lineHeight: 1.3,
              paddingRight: '1.75rem'
            }}
          >
            Talk to Mitrangan Human Support Team
          </h3>

          {/* Description */}
          <p
            style={{
              fontSize: '0.9rem',
              lineHeight: 1.55,
              color: 'var(--text-dim)',
              margin: '0 0 1.6rem 0'
            }}
          >
            Our counselors, doctors, and intake coordinators are available 24 hours a day, 7 days a week. All inquiries are strictly confidential.
          </p>

          {/* Contact Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {/* 1. Chat on WhatsApp */}
            <a
              href="https://wa.me/919767362388?text=Hello%20Mitrangan,%20I%20need%20help%20regarding%20rehabilitation"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
              style={{
                width: '100%',
                padding: '0.85rem 1.25rem',
                fontSize: '0.96rem',
                fontWeight: 600,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.65rem'
              }}
            >
              <WhatsAppIcon size={20} />
              <span>Chat on WhatsApp</span>
            </a>

            {/* 2. Nagpur Phone */}
            <a
              href="tel:+919767362388"
              className="btn btn-emerald"
              style={{
                width: '100%',
                padding: '0.85rem 1.25rem',
                fontSize: '0.96rem',
                fontWeight: 600,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.65rem',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.4)'
              }}
            >
              <Phone size={18} />
              <span>Call 24/7 Helpline: +91 9767362388</span>
            </a>
          </div>
        </div>
      </div>
    )}
  </>
  );
};
