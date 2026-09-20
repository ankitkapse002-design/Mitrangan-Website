import React from 'react';
import { Link } from 'wouter';
import { Home, Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import { SEO } from '../components/SEO';

export const NotFoundPage: React.FC = () => {
  return (
    <div style={{ paddingTop: '10rem', paddingBottom: '8rem', textAlign: 'center', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <SEO
        title="404 - Page Not Found | Mitrangan Rehabilitation Nagpur"
        description="The requested rehabilitation page or link could not be located."
        noindex={true}
      />
      <div className="container" style={{ maxWidth: '640px' }}>
        <div className="glass-panel-gold" style={{ padding: '3.5rem 2rem' }}>
          <span style={{ fontSize: '4.5rem', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--accent-gold)', display: 'block', lineHeight: 1 }}>
            404
          </span>
          <h1 style={{ fontSize: '2.2rem', color: 'var(--text-ivory)', margin: '1rem 0 0.5rem 0' }}>
            Page Not Found
          </h1>
          <p style={{ color: 'var(--text-cream)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
            The destination you are looking for does not exist or has been relocated. You can return home or choose from the direct assistance options below:
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', justifyContent: 'center', marginBottom: '2rem' }}>
            <Link href="/" className="btn btn-gold" style={{ padding: '0.85rem 1.8rem' }}>
              <Home size={18} />
              <span>Return to Homepage</span>
            </Link>

            <Link href="/services" className="btn btn-outline-gold" style={{ padding: '0.85rem 1.5rem' }}>
              <span>Browse Services</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', alignItems: 'center', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            <span>Need urgent assistance?</span>
            <a href="tel:+919767362388" style={{ color: 'var(--accent-gold)', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <Phone size={14} />
              <span>Call 24/7 Helpline (+91 9767362388)</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
