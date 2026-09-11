import React from 'react';
import { SOCIAL_CAUSES } from '../content/causes';
import { CheckCircle2, HandHeart } from 'lucide-react';
import { Link } from 'wouter';

export const CausesPage: React.FC = () => {
  return (
    <div style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
      <div className="container">
        {/* Page Hero */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 4.5rem auto' }}>
          <span className="section-tag">Community Outreach &amp; Philanthropy</span>
          <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', marginBottom: '1.25rem' }}>
            Popular Causes &amp; Social Initiatives
          </h1>
          <p style={{ color: 'var(--text-cream)', fontSize: '1.15rem', lineHeight: 1.7 }}>
            Beyond residential rehabilitation, Mitrangan actively organizes social initiatives to uplift underprivileged families, promote environmental protection, conduct free healthcare checkups, and empower women in local communities.
          </p>
        </div>

        {/* Causes Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '2rem',
            marginBottom: '5rem'
          }}
        >
          {SOCIAL_CAUSES.map((cause, idx) => (
            <div
              key={cause.id}
              className="glass-panel"
              style={{
                padding: '2.25rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRadius: '16px',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.75rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--accent-gold)',
                      background: 'rgba(212, 175, 55, 0.1)',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '9999px',
                      border: '1px solid rgba(212, 175, 55, 0.25)'
                    }}
                  >
                    {cause.category}
                  </span>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-dim)' }}>0{idx + 1}</span>
                </div>

                <h3 style={{ fontSize: '1.4rem', color: 'var(--text-ivory)', marginBottom: '0.75rem' }}>
                  {cause.title}
                </h3>

                <p style={{ color: 'var(--text-cream)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  {cause.summary}
                </p>

                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '0.88rem', color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem' }}>
                  Key Program Activities
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '1.5rem' }}>
                  {cause.initiatives.map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      <CheckCircle2 size={15} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ paddingTop: '1.25rem', borderTop: '1px solid var(--border-glass)', fontSize: '0.85rem', color: 'var(--accent-sage)' }}>
                <strong>Impact:</strong> {cause.impact}
              </div>
            </div>
          ))}
        </div>

        {/* Community Partnership Notice */}
        <div
          className="glass-panel-gold"
          style={{
            padding: '3rem',
            textAlign: 'center',
            maxWidth: '840px',
            margin: '0 auto'
          }}
        >
          <HandHeart size={38} color="#D4AF37" style={{ margin: '0 auto 1rem auto' }} />
          <h3 style={{ fontSize: '1.8rem', color: 'var(--text-ivory)', marginBottom: '0.75rem' }}>
            Collaborate With Us for Social Outreach
          </h3>
          <p style={{ color: 'var(--text-cream)', fontSize: '1rem', lineHeight: 1.65, marginBottom: '2rem' }}>
            We regularly collaborate with local community organizations, corporate CSR initiatives, and educational institutions for youth guidance seminars and de-addiction awareness drives.
          </p>

          <Link href="/contact" className="btn btn-gold" style={{ padding: '0.85rem 2rem' }}>
            <span>Connect with Outreach Coordinator</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
