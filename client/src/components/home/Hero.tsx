import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'wouter';
import { Phone, ArrowRight, ShieldCheck, HeartHandshake, Sparkles, RotateCcw } from 'lucide-react';

interface HeroProps {
  onReplayIntro?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onReplayIntro }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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
            We are a trusted Nasha Mukti Kendra in Nagpur &amp; Durg dedicated to helping individuals overcome addiction through structured rehabilitation, professional counseling, and holistic healing programs. Our goal is to restore confidence, health, and purpose in every life we support.
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
  );
};
