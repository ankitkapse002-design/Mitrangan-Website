import React from 'react';
import { Link } from 'wouter';
import { CORE_VALUES } from '../content/siteContent';
import { CheckCircle2, Phone, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const whyChooseUsPoints = [
    "Trusted Nasha Mukti centre in Nagpur with verified clinical track record",
    "Safe and structured recovery programs designed for emotional & physical healing",
    "Experienced counselors, psychiatrists, and empathetic residential support staff",
    "Personalized treatment plans tailored to the individual's history and challenges",
    "Active family involvement and relationship healing workshops",
    "24x7 emergency support and respectful pickup transportation",
    "Comfortable, hygienic, and disciplined residential living quarters",
    "Holistic therapies including daily yoga, pranayam, and guided mindfulness"
  ];

  return (
    <div style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
      <div className="container">
        {/* Page Hero */}
        <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 4.5rem auto' }}>
          <span className="section-tag">Restoring Hope &amp; Life</span>
          <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', marginBottom: '1.25rem' }}>
            About Mitrangan Rehabilitation Kendra
          </h1>
          <p style={{ color: 'var(--text-cream)', fontSize: '1.15rem', lineHeight: 1.7 }}>
            Mitrangan Rehabilitation Kendra is a professional de-addiction and rehabilitation center in Nagpur focused on long-term recovery and emotional healing. We provide a safe, supportive, and structured environment where individuals can overcome substance dependence and rebuild their lives with dignity and discipline.
          </p>
        </div>

        {/* Mission & Vision Showcase */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            marginBottom: '5rem'
          }}
        >
          {/* Mission Card */}
          <div className="glass-panel-gold" style={{ padding: '2.5rem' }}>
            <span style={{ fontSize: '0.82rem', fontFamily: 'var(--font-display)', color: 'var(--accent-gold)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Our Foundational Mission
            </span>
            <h3 style={{ fontSize: '1.8rem', color: 'var(--text-ivory)', margin: '0.5rem 0 1rem 0' }}>
              To Rebuild Lives with Compassion
            </h3>
            <p style={{ color: 'var(--text-cream)', fontSize: '1.05rem', lineHeight: 1.7, fontStyle: 'italic' }}>
              "To help individuals break free from addiction and rebuild healthy, meaningful lives through structured rehabilitation and compassionate support."
            </p>
          </div>

          {/* Vision Card */}
          <div className="glass-panel" style={{ padding: '2.5rem' }}>
            <span style={{ fontSize: '0.82rem', fontFamily: 'var(--font-display)', color: 'var(--accent-sage)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Our Enduring Vision
            </span>
            <h3 style={{ fontSize: '1.8rem', color: 'var(--text-ivory)', margin: '0.5rem 0 1rem 0' }}>
              Excellence in Nasha Mukti Care
            </h3>
            <p style={{ color: 'var(--text-cream)', fontSize: '1.05rem', lineHeight: 1.7, fontStyle: 'italic' }}>
              "To become a trusted Nasha Mukti Kendra in Nagpur known for safe, effective, and long-term recovery programs."
            </p>
          </div>
        </div>

        {/* Philosophy & Approach Section */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3.5rem',
            alignItems: 'center',
            marginBottom: '6rem'
          }}
        >
          <div>
            <span className="section-tag">Clinical &amp; Human Approach</span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.7rem)', marginBottom: '1.25rem' }}>
              Our Philosophy: Healing the Whole Person
            </h2>
            <p style={{ color: 'var(--text-cream)', fontSize: '1.02rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              We are committed to helping individuals overcome addiction and rebuild their lives with dignity, discipline, and emotional strength. Our approach combines structured rehabilitation, professional counseling, and holistic healing practices to support long-term recovery.
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '2rem' }}>
              We work closely with individuals and families affected by addiction. Our goal is long-term recovery, emotional stability, and a meaningful life beyond chemical dependence.
            </p>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link href="/register" className="btn btn-gold">
                <span>Start Recovery Today</span>
                <ArrowRight size={15} />
              </Link>
              <a href="tel:+919767362388" className="btn btn-emerald">
                <Phone size={15} />
                <span>Call Helpline</span>
              </a>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '0.85rem', borderRadius: '20px' }}>
            <img
              src="/assets/resident_support_1.jpg"
              alt="Mitrangan Resident Support"
              style={{ width: '100%', height: '380px', objectFit: 'cover', borderRadius: '14px' }}
            />
          </div>
        </div>

        {/* Core Values */}
        <div style={{ marginBottom: '6rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 3.5rem auto' }}>
            <span className="section-tag">Guiding Principles</span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.6rem)', marginBottom: '0.75rem' }}>
              The 5 Pillars of Mitrangan Care
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {CORE_VALUES.map((val, idx) => (
              <div key={idx} className="glass-panel" style={{ padding: '2rem 1.5rem' }}>
                <span style={{ color: 'var(--accent-gold)', fontSize: '1.2rem', fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                  0{idx + 1}
                </span>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--text-ivory)', margin: '0.5rem 0 0.75rem 0' }}>
                  {val.title}
                </h3>
                <p style={{ color: 'var(--text-cream)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Mitrangan Grid */}
        <div
          className="glass-panel"
          style={{
            padding: 'clamp(2rem, 5vw, 4rem)',
            border: '1px solid var(--border-gold)',
            borderRadius: '20px'
          }}
        >
          <div style={{ maxWidth: '720px', marginBottom: '2.5rem' }}>
            <span className="section-tag">The Mitrangan Difference</span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 3.2vw, 2.5rem)', marginBottom: '0.75rem' }}>
              Why Choose Mitrangan Rehabilitation Kendra?
            </h2>
            <p style={{ color: 'var(--text-cream)', fontSize: '0.98rem' }}>
              Every aspect of our center is purposefully designed to foster safety, emotional renewal, and disciplined progress.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.25rem'
            }}
          >
            {whyChooseUsPoints.map((point, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  padding: '1rem',
                  background: 'rgba(7, 18, 13, 0.65)',
                  borderRadius: '10px',
                  border: '1px solid var(--border-glass)'
                }}
              >
                <CheckCircle2 size={18} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '0.92rem', color: 'var(--text-cream)', lineHeight: 1.5 }}>
                  {point}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
