import React from 'react';
import { Link } from 'wouter';
import { RELAPSE_PREVENTION_PILLARS } from '../content/programs';
import { ProgramsGrid } from '../components/home/ProgramsGrid';
import { SEO } from '../components/SEO';
import { Phone, HeartHandshake, Sparkles } from 'lucide-react';

export const ServicesPage: React.FC = () => {
  return (
    <div style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
      <SEO
        title="De-Addiction Services in Nagpur | Mitrangan Rehabilitation Centre"
        description="Explore comprehensive de-addiction services in Nagpur including alcohol rehab, drug rehabilitation, detox support, psychological counseling, and relapse prevention."
        canonicalPath="/services"
      />
      {/* Page Hero */}
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 4rem auto' }}>
          <span className="section-tag">
            <Sparkles size={13} />
            <span>Clinical &amp; Holistic Programs</span>
          </span>
          <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', marginBottom: '1.25rem', lineHeight: 1.2 }}>
            Comprehensive Rehabilitation Services
          </h1>
          <p style={{ color: 'var(--text-cream)', fontSize: '1.15rem', lineHeight: 1.7 }}>
            Our evidence-based treatment plans combine supervised clinical detox, one-on-one counseling, group psychotherapy, and holistic lifestyle re-engineering to deliver sustainable freedom from addiction.
          </p>
        </div>
      </div>

      {/* Interactive Programs Grid (Own Section & Container) */}
      <ProgramsGrid />

      {/* Relapse Prevention Section */}
      <div className="container" style={{ marginTop: '2rem' }}>
        <div
          className="glass-panel"
          style={{
            padding: 'clamp(2.5rem, 5vw, 4rem)',
            borderRadius: '20px',
            border: '1px solid var(--border-gold)',
            marginBottom: '4rem'
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem auto' }}>
            <span className="section-tag">Lifelong Sobriety</span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.7rem)', marginBottom: '0.85rem' }}>
              Relapse Prevention Framework
            </h2>
            <p style={{ color: 'var(--text-cream)', fontSize: '1rem', lineHeight: 1.65 }}>
              Detoxification clears the body, but relapse prevention equips the mind with the behavioral armor to thrive in the real world without chemical crutches.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.75rem' }}>
            {RELAPSE_PREVENTION_PILLARS.map((pillar, idx) => (
              <div
                key={idx}
                style={{
                  padding: '1.75rem',
                  borderRadius: '12px',
                  background: 'rgba(7, 18, 13, 0.75)',
                  border: '1px solid var(--border-glass)'
                }}
              >
                <div style={{ color: 'var(--accent-gold)', fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                  Pillar 0{idx + 1}
                </div>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-ivory)', marginBottom: '0.65rem' }}>
                  {pillar.title}
                </h3>
                <p style={{ color: 'var(--text-cream)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Admission CTA Box */}
        <div
          style={{
            padding: '3rem',
            background: 'linear-gradient(135deg, rgba(28, 72, 55, 0.6) 0%, rgba(14, 34, 26, 0.9) 100%)',
            border: '1px solid var(--border-gold)',
            borderRadius: '20px',
            textAlign: 'center'
          }}
        >
          <h3 style={{ fontSize: '2rem', color: 'var(--text-ivory)', marginBottom: '0.85rem' }}>
            Begin Your Personalized Care Assessment
          </h3>
          <p style={{ color: 'var(--text-cream)', fontSize: '1.05rem', maxWidth: '680px', margin: '0 auto 2rem auto', lineHeight: 1.65 }}>
            Our admissions counselors are available around the clock to answer questions, outline program options, and coordinate immediate admission.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <Link href="/register" className="btn btn-gold" style={{ padding: '0.85rem 2rem' }}>
              <HeartHandshake size={18} />
              <span>Register Admission Now</span>
            </Link>
            <a href="tel:+919767362388" className="btn btn-emerald" style={{ padding: '0.85rem 1.8rem' }}>
              <Phone size={18} />
              <span>Helpline: +91 9767362388</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
