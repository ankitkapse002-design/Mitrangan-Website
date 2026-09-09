import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, VolumeX, ArrowRight, Sparkles } from 'lucide-react';
import { soundManager } from '../lib/audio';

interface IntroDoorProps {
  onComplete: () => void;
}

export const IntroDoor: React.FC<IntroDoorProps> = ({ onComplete }) => {
  // Central normalized door progress: 0.0 (closed) -> 1.0 (fully open)
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isMuted, setIsMuted] = useState(soundManager.getMuted());
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [showInvitation, setShowInvitation] = useState(false);

  // Refs for physics and interpolation
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const hasChimedRef = useRef(false);
  const isCompletingRef = useRef(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Drag tracking refs
  const isPointerDownRef = useRef(false);
  const startXRef = useRef(0);
  const startProgressRef = useRef(0);

  // Lock body scrolling and detect touch device
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    const prevTouchAction = document.body.style.touchAction;
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    const hasTouch =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      (window.matchMedia && window.matchMedia('(pointer: coarse)').matches);
    setIsTouchDevice(hasTouch);

    // Short calm moment before displaying the invitation CTA
    const timer = setTimeout(() => {
      setShowInvitation(true);
    }, 450);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.touchAction = prevTouchAction;
      clearTimeout(timer);
    };
  }, []);

  // Reduced motion detection
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      onComplete();
    }
  }, [onComplete]);

  // Complete and enter website
  const triggerComplete = useCallback(() => {
    if (isCompletingRef.current) return;
    isCompletingRef.current = true;
    setIsFadingOut(true);

    if (!isMuted && !hasChimedRef.current) {
      soundManager.playGentleChime();
      hasChimedRef.current = true;
    }

    setTimeout(() => {
      onComplete();
    }, 700);
  }, [isMuted, onComplete]);

  // Physics animation loop: smoothly interpolates currentProgress -> targetProgress
  useEffect(() => {
    let animId: number;

    const updatePhysics = () => {
      // Smooth lerp damping (0.09 factor creates weighted, physical door feel)
      const diff = targetProgressRef.current - currentProgressRef.current;
      currentProgressRef.current += diff * 0.095;

      // Clamp within [0, 1]
      if (currentProgressRef.current < 0.001) currentProgressRef.current = 0;
      if (currentProgressRef.current > 0.999) currentProgressRef.current = 1;

      // Update React state
      setProgress(currentProgressRef.current);

      // Play chime when unlatching (passed 15% open)
      if (currentProgressRef.current > 0.15 && !hasChimedRef.current && !isMuted) {
        soundManager.playGentleChime();
        hasChimedRef.current = true;
      }

      // Check for completion threshold (~95% open)
      if (currentProgressRef.current >= 0.95 && !isCompletingRef.current) {
        triggerComplete();
      }

      animId = requestAnimationFrame(updatePhysics);
    };

    animId = requestAnimationFrame(updatePhysics);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isMuted, triggerComplete]);

  // Dedicated tap-to-enter trigger (smoothly animates doors open)
  const handleEnter = useCallback(() => {
    if (isCompletingRef.current) return;
    targetProgressRef.current = 1;
    setHasInteracted(true);
  }, []);

  // Desktop-only Wheel & Trackpad scroll listener (active ONLY while intro is mounted)
  useEffect(() => {
    if (isTouchDevice) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isCompletingRef.current) return;
      setHasInteracted(true);

      const rawDelta = e.deltaY;
      const normalizedDelta = Math.sign(rawDelta) * Math.min(Math.abs(rawDelta) * 0.0018, 0.075);
      targetProgressRef.current = Math.min(1, Math.max(0, targetProgressRef.current + normalizedDelta));
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [isTouchDevice]);

  // Pointer Drag handlers for desktop mouse interaction
  const handlePointerDown = (e: React.PointerEvent) => {
    if (isCompletingRef.current || e.pointerType === 'touch') return;
    isPointerDownRef.current = true;
    startXRef.current = e.clientX;
    startProgressRef.current = targetProgressRef.current;
    setHasInteracted(true);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isPointerDownRef.current || isCompletingRef.current || e.pointerType === 'touch') {
      return;
    }

    const deltaX = Math.abs(e.clientX - startXRef.current);
    const progressGain = deltaX / 300;
    targetProgressRef.current = Math.min(1, Math.max(0, startProgressRef.current + progressGain));
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (e.pointerType === 'touch') return;
    isPointerDownRef.current = false;
  };

  // Ambient floating gold particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.6,
      speedY: -(Math.random() * 0.3 + 0.1),
      speedX: (Math.random() - 0.5) * 0.15,
      opacity: Math.random() * 0.6 + 0.2
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

        ctx.fillStyle = `rgba(225, 205, 140, ${p.opacity})`;
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

  const toggleSound = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  const handleSkip = () => {
    triggerComplete();
  };

  // Derived animation values based on progress (0 -> 1)
  const leftDoorAngle = -86 * progress;
  const rightDoorAngle = 86 * progress;
  const lightOpacity = Math.min(1, progress * 1.35);
  const lightScale = 0.96 + progress * 0.18;

  // Reveal calculation for Mitrangan brand inside doorway (emerges from 25% -> 85%)
  const revealProgress = Math.min(1, Math.max(0, (progress - 0.25) / 0.65));
  const mitranganOpacity = revealProgress;
  const mitranganScale = 0.85 + revealProgress * 0.15;
  const mitranganTranslateY = (1 - revealProgress) * 20;
  const mitranganBlur = (1 - revealProgress) * 4;

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#050D09',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        cursor: progress < 0.95 ? 'pointer' : 'default',
        userSelect: 'none',
        transition: 'opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
        opacity: isFadingOut ? 0 : 1,
        pointerEvents: isFadingOut ? 'none' : 'auto',
        touchAction: 'none'
      }}
      aria-label="Welcome to Mitrangan Rehabilitation Kendra - Door Opening Intro"
    >
      {/* Background Particle Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: 0.85 - progress * 0.45,
          transition: 'opacity 0.5s ease'
        }}
      />

      {/* Top Floating Controls */}
      <div
        style={{
          position: 'absolute',
          top: '1.8rem',
          right: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.85rem',
          zIndex: 60
        }}
      >
        <button
          onClick={e => {
            e.stopPropagation();
            toggleSound();
          }}
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            borderRadius: '9999px',
            color: '#FAF8F5',
            padding: '0.45rem 0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            cursor: 'pointer',
            fontSize: '0.85rem',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.2s ease'
          }}
          title={isMuted ? 'Turn Sound On' : 'Turn Sound Off'}
          aria-label={isMuted ? 'Turn Sound On' : 'Turn Sound Off'}
        >
          {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} color="#D4AF37" />}
          <span style={{ fontSize: '0.82rem' }}>{isMuted ? 'Sound Off' : 'Sound On'}</span>
        </button>

        <button
          onClick={e => {
            e.stopPropagation();
            handleSkip();
          }}
          style={{
            background: 'transparent',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            borderRadius: '9999px',
            color: '#FAF8F5',
            padding: '0.45rem 1.05rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            cursor: 'pointer',
            fontSize: '0.85rem',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.2s ease'
          }}
          aria-label="Skip intro and enter site"
        >
          <span>Enter Site</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Main Composition: Text Above -> Double Door Portal -> Interactive Hint */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'clamp(1rem, 2.5vh, 1.8rem)',
          width: '100%',
          maxWidth: '840px',
          maxHeight: '96vh',
          padding: '1rem 1.5rem',
          zIndex: 30,
          boxSizing: 'border-box'
        }}
      >
        {/* 1. EXISTING INTRODUCTORY CONTENT (ABOVE THE DOOR) */}
        <div
          style={{
            textAlign: 'center',
            maxWidth: '650px',
            transition: 'opacity 0.6s ease'
          }}
        >
          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1.55rem, 4vw, 2.2rem)',
              fontWeight: 500,
              color: '#FAF8F5',
              letterSpacing: '0.03em',
              marginBottom: '0.35rem',
              lineHeight: 1.25,
              textShadow: '0 2px 14px rgba(0, 0, 0, 0.85)'
            }}
          >
            {progress >= 0.4
              ? 'A Door Towards a New Beginning'
              : 'You are entering a safe place.'}
          </p>
          <p
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 'clamp(0.76rem, 1.8vw, 0.9rem)',
              color: '#D4AF37',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              fontWeight: 600,
              margin: 0,
              opacity: 0.95
            }}
          >
            Mitrangan De-Addiction Cum Rehabilitation Center
          </p>
        </div>

        {/* 2. SYMMETRICAL 3D DOUBLE-DOOR PORTAL (TAP OR CLICK TO OPEN) */}
        <div
          onClick={handleEnter}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleEnter();
            }
          }}
          style={{
            position: 'relative',
            width: 'clamp(300px, 85vw, 420px)',
            height: 'clamp(410px, 56vh, 530px)',
            perspective: '1500px',
            perspectiveOrigin: 'center center',
            cursor: progress < 0.95 ? 'pointer' : 'default'
          }}
          title={isTouchDevice ? 'Tap to open the door' : 'Click to open the door'}
        >
          {/* Architectural Arch Outer Frame */}
          <div
            style={{
              position: 'absolute',
              inset: -8,
              border: '2px solid rgba(212, 175, 55, 0.42)',
              borderRadius: '210px 210px 10px 10px',
              boxShadow:
                progress > 0.1
                  ? `0 0 ${40 + progress * 40}px rgba(233, 196, 106, ${0.2 + progress * 0.3}), 0 25px 60px rgba(0, 0, 0, 0.9), inset 0 0 ${20 + progress * 20}px rgba(212, 175, 55, 0.35)`
                  : '0 0 35px rgba(212, 175, 55, 0.2), 0 20px 50px rgba(0, 0, 0, 0.8)',
              transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
              pointerEvents: 'none',
              zIndex: 25
            }}
          />

          {/* Inner Doorway Surround */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '202px 202px 8px 8px',
              border: '1px solid rgba(212, 175, 55, 0.25)',
              overflow: 'hidden',
              backgroundColor: '#06130D'
            }}
          >
            {/* INNER SANCTUARY: Warm Light Expansion Controlled by User */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(circle at 50% 48%, #FFF8DE 0%, #E9C46A 32%, #A17622 65%, #0A1E16 95%)',
                opacity: lightOpacity,
                transform: `scale(${lightScale})`,
                filter: 'blur(0.5px)',
                zIndex: 2,
                pointerEvents: 'none'
              }}
            />

            {/* 3. CENTER REVEAL — MITRANGAN IDENTITY EMERGING ACCORDING TO USER PROGRESS */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '2.5rem 1.75rem',
                zIndex: 3,
                opacity: mitranganOpacity,
                transform: `scale(${mitranganScale}) translateY(${mitranganTranslateY}px)`,
                filter: `blur(${mitranganBlur}px)`,
                pointerEvents: 'none'
              }}
            >
              {/* Mitrangan Official Brand Logo Crest */}
              <div
                style={{
                  width: '74px',
                  height: '74px',
                  borderRadius: '50%',
                  background: 'rgba(7, 18, 13, 0.75)',
                  border: '1.5px solid #D4AF37',
                  boxShadow: '0 0 25px rgba(212, 175, 55, 0.6), inset 0 0 15px rgba(212, 175, 55, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '0.95rem',
                  padding: '9px'
                }}
              >
                <img
                  src="/assets/logo.png"
                  alt="Mitrangan Logo"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.6))'
                  }}
                />
              </div>

              {/* Grand Mitrangan Title */}
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 'clamp(2.2rem, 5.2vw, 2.9rem)',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  color: '#07120D',
                  margin: '0 0 0.25rem 0',
                  lineHeight: 1.1,
                  textShadow: '0 1px 2px rgba(255, 255, 255, 0.6), 0 0 20px rgba(255, 255, 255, 0.4)'
                }}
              >
                MITRANGAN
              </h2>

              {/* Subtitle */}
              <span
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: '#1C4837',
                  display: 'block',
                  marginBottom: '0.75rem'
                }}
              >
                Rehabilitation Kendra
              </span>

              {/* Symbolic Tagline */}
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontStyle: 'italic',
                  fontSize: '1.08rem',
                  color: '#2A4A3C',
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                  borderTop: '1px solid rgba(28, 72, 55, 0.3)',
                  paddingTop: '0.5rem',
                  display: 'inline-block'
                }}
              >
                A Door Towards a New Beginning
              </span>
            </div>

            {/* 4. LEFT DOOR LEAF (Rotates with User Progress) */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '50%',
                height: '100%',
                borderRadius: '202px 0 0 8px',
                background:
                  'linear-gradient(135deg, #143628 0%, #0D241B 45%, #081711 100%)',
                borderRight: '1px solid rgba(0, 0, 0, 0.8)',
                borderTop: '1px solid rgba(212, 175, 55, 0.35)',
                borderLeft: '1px solid rgba(212, 175, 55, 0.35)',
                borderBottom: '1px solid rgba(212, 175, 55, 0.35)',
                transformOrigin: 'left center',
                transformStyle: 'preserve-3d',
                transform: `rotateY(${leftDoorAngle}deg)`,
                boxShadow:
                  progress > 0.05
                    ? `inset -10px 0 35px rgba(0, 0, 0, 0.9), ${12 * progress}px 0 30px rgba(0, 0, 0, 0.7)`
                    : 'inset 0 0 25px rgba(0, 0, 0, 0.7)',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.2rem',
                overflow: 'hidden'
              }}
            >
              {/* Left Door Carved Inlay */}
              <div
                style={{
                  width: '88%',
                  height: '89%',
                  border: '1px solid rgba(212, 175, 55, 0.28)',
                  borderRadius: '165px 0 0 5px',
                  background: 'rgba(7, 18, 13, 0.45)',
                  boxShadow: 'inset 0 0 15px rgba(0, 0, 0, 0.6)',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    border: '1px solid rgba(212, 175, 55, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(212, 175, 55, 0.08)'
                  }}
                >
                  <Sparkles size={17} color="#D4AF37" />
                </div>

                {/* Left Door Handle near center seam */}
                <div
                  style={{
                    position: 'absolute',
                    right: '8px',
                    top: '52%',
                    transform: 'translateY(-50%)',
                    width: '7px',
                    height: '50px',
                    borderRadius: '4px',
                    background: 'linear-gradient(to right, #FAF0CA, #D4AF37, #8C6A1E)',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.7), 0 0 8px rgba(212, 175, 55, 0.3)'
                  }}
                />
              </div>
            </div>

            {/* 5. RIGHT DOOR LEAF (Rotates with User Progress) */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '50%',
                height: '100%',
                borderRadius: '0 202px 8px 0',
                background:
                  'linear-gradient(225deg, #143628 0%, #0D241B 45%, #081711 100%)',
                borderLeft: '1px solid rgba(0, 0, 0, 0.8)',
                borderTop: '1px solid rgba(212, 175, 55, 0.35)',
                borderRight: '1px solid rgba(212, 175, 55, 0.35)',
                borderBottom: '1px solid rgba(212, 175, 55, 0.35)',
                transformOrigin: 'right center',
                transformStyle: 'preserve-3d',
                transform: `rotateY(${rightDoorAngle}deg)`,
                boxShadow:
                  progress > 0.05
                    ? `inset 10px 0 35px rgba(0, 0, 0, 0.9), ${-12 * progress}px 0 30px rgba(0, 0, 0, 0.7)`
                    : 'inset 0 0 25px rgba(0, 0, 0, 0.7)',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.2rem',
                overflow: 'hidden'
              }}
            >
              {/* Right Door Carved Inlay */}
              <div
                style={{
                  width: '88%',
                  height: '89%',
                  border: '1px solid rgba(212, 175, 55, 0.28)',
                  borderRadius: '0 165px 5px 0',
                  background: 'rgba(7, 18, 13, 0.45)',
                  boxShadow: 'inset 0 0 15px rgba(0, 0, 0, 0.6)',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    border: '1px solid rgba(212, 175, 55, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(212, 175, 55, 0.08)'
                  }}
                >
                  <Sparkles size={17} color="#D4AF37" />
                </div>

                {/* Right Door Handle near center seam */}
                <div
                  style={{
                    position: 'absolute',
                    left: '8px',
                    top: '52%',
                    transform: 'translateY(-50%)',
                    width: '7px',
                    height: '50px',
                    borderRadius: '4px',
                    background: 'linear-gradient(to right, #FAF0CA, #D4AF37, #8C6A1E)',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.7), 0 0 8px rgba(212, 175, 55, 0.3)'
                  }}
                />
              </div>
            </div>

            {/* 6. CENTER SEAM & UNLATCHING LIGHT CRACK */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: '50%',
                width: `${2 + progress * 10}px`,
                transform: 'translateX(-50%)',
                background:
                  progress > 0.05
                    ? 'linear-gradient(to bottom, #FFF8DE, #E9C46A, #FFF8DE)'
                    : 'rgba(212, 175, 55, 0.25)',
                boxShadow:
                  progress > 0.05
                    ? `0 0 ${15 + progress * 25}px #FFF6D6, 0 0 ${30 + progress * 30}px #E9C46A`
                    : 'none',
                opacity: progress > 0.35 ? 0 : 1,
                transition: 'opacity 0.3s ease',
                zIndex: 15,
                pointerEvents: 'none'
              }}
            />
          </div>
        </div>

        {/* 3. DEDICATED INVITATION / ENTER BUTTON */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleEnter();
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.65rem',
            padding: isTouchDevice ? '0.75rem 1.85rem' : '0.62rem 1.6rem',
            borderRadius: '9999px',
            background: 'linear-gradient(135deg, rgba(26, 77, 54, 0.95) 0%, rgba(7, 18, 13, 0.98) 100%)',
            border: '1.5px solid var(--accent-gold)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            color: 'var(--text-ivory)',
            fontSize: isTouchDevice ? '0.96rem' : '0.88rem',
            fontWeight: 600,
            letterSpacing: '0.06em',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.8), 0 0 24px rgba(212, 175, 55, 0.28)',
            cursor: 'pointer',
            opacity: showInvitation ? Math.max(0, 1 - progress * 4.5) : 0,
            transform: `translateY(${progress * -15}px) scale(${showInvitation ? 1 : 0.92})`,
            transition: 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), background 0.2s ease',
            pointerEvents: progress > 0.15 ? 'none' : 'auto',
            outline: 'none'
          }}
          aria-label={isTouchDevice ? 'Tap to enter Mitrangan website' : 'Click or scroll to enter Mitrangan website'}
        >
          <Sparkles size={16} color="var(--accent-gold)" />
          <span style={{ color: 'var(--accent-gold)' }}>
            {isTouchDevice ? 'Tap to Enter' : 'Click or Scroll to Enter'}
          </span>
          <ArrowRight size={15} color="var(--text-ivory)" />
        </button>
      </div>
    </div>
  );
};
