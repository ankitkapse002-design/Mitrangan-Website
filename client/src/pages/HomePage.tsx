import React, { useState } from 'react';
import { Hero } from '../components/home/Hero';
import { StatsCounter } from '../components/home/StatsCounter';
import { ProgramsGrid } from '../components/home/ProgramsGrid';
import { RecoveryPathway } from '../components/home/RecoveryPathway';
import { FacilityPreview } from '../components/home/FacilityPreview';
import { Testimonials } from '../components/home/Testimonials';
import { LatestBlogs } from '../components/home/LatestBlogs';
import { FAQSection } from '../components/home/FAQSection';
import { IntroDoor } from '../3d/IntroDoor';
import { CORE_VALUES, MITRANGAN_CENTERS } from '../content/siteContent';
import { Link } from 'wouter';
import { Heart, ShieldCheck, Phone, CheckCircle2, ArrowRight, Sparkles, MapPin, MessageCircle, HeartHandshake } from 'lucide-react';

export const HomePage: React.FC = () => {
  // One-time door intro: only plays on first entrance per browser session
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      return !sessionStorage.getItem('mitrangan_door_intro_shown');
    } catch {
      return false;
    }
  });
  const [aboutVisualMode, setAboutVisualMode] = useState<'sanctuary' | 'actual'>('sanctuary');

  const handleIntroComplete = () => {
    try {
      sessionStorage.setItem('mitrangan_door_intro_shown', 'true');
    } catch {
      // ignore in storage-restricted contexts
    }
    setShowIntro(false);
  };

  const handleReplayIntro = () => {
    setShowIntro(true);
  };

  return (
    <>
      {showIntro && <IntroDoor onComplete={handleIntroComplete} />}

      <main>
        {/* 1. Cinematic Hero */}
        <Hero onReplayIntro={handleReplayIntro} />

        {/* 2. About Mitrangan Overview Section */}
        <section style={{ padding: '6.5rem 0', position: 'relative', overflow: 'hidden' }}>
          {/* Subtle Ambient Depth Glow */}
          <div
            style={{
              position: 'absolute',
              top: '20%',
              right: '-10%',
              width: '500px',
              height: '500px',
              background: 'radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, rgba(42, 102, 79, 0.06) 50%, transparent 75%)',
              filter: 'blur(50px)',
              pointerEvents: 'none',
              zIndex: 1
            }}
          />

          <div className="container" style={{ position: 'relative', zIndex: 5 }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '3.5rem',
                alignItems: 'center'
              }}
            >
              {/* Left Column: Genuine Content */}
              <div>
                <span className="section-tag">Restoring Human Dignity</span>
                <h2 style={{ fontSize: 'clamp(2.1rem, 4vw, 3rem)', marginBottom: '1.25rem', lineHeight: 1.15 }}>
                  About Mitrangan Rehabilitation Kendra
                </h2>

                <p style={{ color: 'var(--text-ivory)', fontSize: '1.1rem', fontWeight: 500, lineHeight: 1.6, marginBottom: '1rem' }}>
                  Mitrangan Rehabilitation Kendra is a professional de-addiction and rehabilitation Kendra in Nagpur focused on long-term recovery and emotional healing.
                </p>

                <p style={{ color: 'var(--text-cream)', fontSize: '0.98rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                  We provide a safe, supportive, and structured environment where individuals can overcome substance dependence and rebuild their lives with dignity and discipline.
                </p>

                {/* Mission & Vision Quote Card */}
                <div
                  className="glass-panel-gold"
                  style={{
                    padding: '1.75rem',
                    marginBottom: '2rem',
                    borderLeft: '4px solid var(--accent-gold)'
                  }}
                >
                  <h4 style={{ fontSize: '1.1rem', color: 'var(--accent-gold)', marginBottom: '0.4rem', fontFamily: 'var(--font-display)' }}>
                    Our Mission
                  </h4>
                  <p style={{ color: 'var(--text-cream)', fontSize: '0.92rem', lineHeight: 1.6, fontStyle: 'italic' }}>
                    "To help individuals break free from addiction and rebuild healthy, meaningful lives through structured rehabilitation and compassionate support."
                  </p>

                  <h4 style={{ fontSize: '1.1rem', color: 'var(--accent-gold)', margin: '1rem 0 0.4rem 0', fontFamily: 'var(--font-display)' }}>
                    Our Vision
                  </h4>
                  <p style={{ color: 'var(--text-cream)', fontSize: '0.92rem', lineHeight: 1.6, fontStyle: 'italic' }}>
                    "To become a trusted Nasha Mukti Kendra in Nagpur known for safe, effective, and long-term recovery programs."
                  </p>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                  <Link href="/about" className="btn btn-gold">
                    <span>Learn More About Us</span>
                    <ArrowRight size={15} />
                  </Link>
                  <Link href="/register" className="btn btn-outline-gold">
                    <span>Register Admission</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Layered Vision & Real Campus Visual Showcase */}
              <div style={{ position: 'relative' }}>
                {/* Visual View Switcher Pills */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '1rem',
                    background: 'rgba(7, 18, 13, 0.75)',
                    padding: '0.35rem',
                    borderRadius: '9999px',
                    border: '1px solid var(--border-subtle)',
                    width: 'fit-content'
                  }}
                >
                  <button
                    onClick={() => setAboutVisualMode('sanctuary')}
                    style={{
                      padding: '0.4rem 1rem',
                      borderRadius: '9999px',
                      border: 'none',
                      background: aboutVisualMode === 'sanctuary' ? 'var(--accent-gold)' : 'transparent',
                      color: aboutVisualMode === 'sanctuary' ? '#07120D' : 'var(--text-cream)',
                      fontWeight: aboutVisualMode === 'sanctuary' ? 700 : 500,
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease'
                    }}
                  >
                    Sanctuary Vision
                  </button>

                  <button
                    onClick={() => setAboutVisualMode('actual')}
                    style={{
                      padding: '0.4rem 1rem',
                      borderRadius: '9999px',
                      border: 'none',
                      background: aboutVisualMode === 'actual' ? 'var(--accent-gold)' : 'transparent',
                      color: aboutVisualMode === 'actual' ? '#07120D' : 'var(--text-cream)',
                      fontWeight: aboutVisualMode === 'actual' ? 700 : 500,
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease'
                    }}
                  >
                    Nagpur Grounds (Actual)
                  </button>
                </div>

                <div
                  className="glass-panel-gold"
                  style={{
                    padding: '0.75rem',
                    borderRadius: '20px',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.75)',
                    overflow: 'hidden',
                    position: 'relative'
                  }}
                >
                  <img
                    src={aboutVisualMode === 'sanctuary' ? '/assets/healing_sanctuary_zen.jpg' : '/assets/facility_walkway.jpg'}
                    alt={aboutVisualMode === 'sanctuary' ? 'Mitrangan Healing Sanctuary Vision' : 'Mitrangan Facility Walkway'}
                    style={{
                      width: '100%',
                      height: '420px',
                      objectFit: 'cover',
                      borderRadius: '14px',
                      transition: 'all 0.5s ease'
                    }}
                  />

                  {/* Caption badge */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '1.25rem',
                      right: '1.25rem',
                      background: 'rgba(7, 18, 13, 0.85)',
                      backdropFilter: 'blur(8px)',
                      color: 'var(--accent-gold)',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      padding: '0.3rem 0.75rem',
                      borderRadius: '9999px',
                      border: '1px solid rgba(212, 175, 55, 0.3)'
                    }}
                  >
                    {aboutVisualMode === 'sanctuary' ? 'Healing Atmosphere' : 'Verified Campus'}
                  </div>
                </div>

                {/* Floating Value Pill */}
                <div
                  className="glass-panel"
                  style={{
                    position: 'absolute',
                    bottom: '-25px',
                    left: '25px',
                    padding: '1rem 1.4rem',
                    border: '1px solid var(--border-gold)',
                    backdropFilter: 'blur(16px)',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.8)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <ShieldCheck size={22} color="#10B981" />
                    <div>
                      <strong style={{ fontSize: '0.92rem', color: 'var(--text-ivory)', display: 'block' }}>
                        Non-Judgemental Care
                      </strong>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        Confidential, Safe &amp; Medically Monitored
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Full-Width Impact Statistics / Verified Counters */}
        <StatsCounter />

        {/* 4. Comprehensive Programs Grid (Treatments & Modalities) */}
        <ProgramsGrid />

        {/* 5. The Step-by-Step Recovery Pathway */}
        <RecoveryPathway />

        {/* 6. Authentic Campus Sanctuary Preview */}
        <FacilityPreview />

        {/* 7. 5 Core Values Highlight (Why Choose Mitrangan) */}
        <section style={{ padding: '5rem 0', backgroundColor: 'rgba(9, 23, 17, 0.55)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem auto' }}>
              <span className="section-tag">Ethical Philosophy</span>
              <h2 style={{ fontSize: 'clamp(2rem, 3.8vw, 2.8rem)', marginBottom: '0.75rem' }}>
                The 5 Pillars of Mitrangan Care
              </h2>
              <p style={{ color: 'var(--text-cream)', fontSize: '1.02rem', lineHeight: 1.65 }}>
                Every protocol is guided by medical ethics, human warmth, psychological empathy, and long-term relapse prevention.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1.5rem'
              }}
            >
              {CORE_VALUES.map((val, idx) => (
                <div
                  key={idx}
                  className="glass-panel glass-panel-hover"
                  style={{
                    padding: '2rem 1.6rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    borderRadius: '16px'
                  }}
                >
                  <div>
                    <span style={{ color: 'var(--accent-gold)', fontSize: '1.1rem', fontWeight: 700, fontFamily: 'var(--font-display)' }}>
                      0{idx + 1}
                    </span>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--text-ivory)', margin: '0.45rem 0 0.75rem 0' }}>
                      {val.title}
                    </h3>
                    <p style={{ color: 'var(--text-cream)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                      {val.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. Verified Google Reviews Carousel */}
        <Testimonials />

        {/* 9. Latest Clinical Articles & Knowledge Hub */}
        <LatestBlogs />

        {/* 10. Verified FAQs Accordion */}
        <FAQSection />

        {/* 11. Dual Center Regional Presence & Urgent Contact Section */}
        <section style={{ padding: '6rem 0', backgroundColor: 'rgba(7, 18, 13, 0.95)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem auto' }}>
              <span className="section-tag">Accessible Regional Care</span>
              <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.7rem)', marginBottom: '0.75rem' }}>
                Our Two Dedicated Campuses
              </h2>
              <p style={{ color: 'var(--text-cream)', fontSize: '1.02rem', lineHeight: 1.65 }}>
                Operating fully equipped rehabilitation centers in Godhani, Nagpur (Maharashtra HQ) and Ward 40, Durg (Chhattisgarh).
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
              {MITRANGAN_CENTERS.map((center, idx) => (
                <div key={idx} className="glass-panel-gold" style={{ padding: '2.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-gold)', marginBottom: '0.75rem' }}>
                    <MapPin size={18} />
                    <span style={{ fontFamily: 'var(--font-display)', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.85rem', fontWeight: 600 }}>
                      {center.city} Campus {center.isHeadquarters ? '(Headquarters)' : ''}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.5rem', color: 'var(--text-ivory)', marginBottom: '0.85rem' }}>
                    {center.name}
                  </h3>

                  <p style={{ color: 'var(--text-cream)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.75rem' }}>
                    {center.address}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                    <a href={`tel:${center.phone}`} className="btn btn-gold" style={{ padding: '0.65rem 1.4rem', fontSize: '0.88rem' }}>
                      <Phone size={15} />
                      <span>{center.phoneDisplay}</span>
                    </a>
                    <a
                      href={`https://wa.me/${center.phone.replace(/\D/g, '')}?text=Hello%20Mitrangan,%20I%20would%20like%20to%20inquire%20about%20admissions`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-whatsapp"
                      style={{ padding: '0.65rem 1.25rem', fontSize: '0.88rem' }}
                    >
                      <MessageCircle size={15} />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* High-Impact Final Urgent Assistance Banner */}
            <div
              style={{
                padding: 'clamp(2rem, 5vw, 3.5rem)',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, rgba(28, 72, 55, 0.7) 0%, rgba(14, 34, 26, 0.95) 100%)',
                border: '1px solid var(--border-gold)',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '2rem'
              }}
            >
              <div style={{ maxWidth: '640px' }}>
                <span className="section-tag" style={{ background: 'rgba(212, 175, 55, 0.15)' }}>
                  *24x7 Immediate Response
                </span>
                <h3 style={{ fontSize: 'clamp(1.7rem, 3vw, 2.2rem)', color: 'var(--text-ivory)', margin: '0.5rem 0 0.75rem 0' }}>
                  Facing an Addiction Crisis in the Family?
                </h3>
                <p style={{ color: 'var(--text-cream)', fontSize: '1rem', lineHeight: 1.65 }}>
                  Speak privately with our senior admissions counselor. We provide compassionate guidance, rapid enrollment, and dignified 24/7 doorstep pickup assistance.
                </p>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                <Link href="/register" className="btn btn-gold" style={{ padding: '0.9rem 2rem' }}>
                  <HeartHandshake size={18} />
                  <span>Register Admission Now</span>
                </Link>
                <a href="tel:+919767362388" className="btn btn-emerald" style={{ padding: '0.9rem 1.8rem' }}>
                  <Phone size={18} />
                  <span>Call: +91 9767362388</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
