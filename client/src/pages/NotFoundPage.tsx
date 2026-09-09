import React from 'react';
import { Link } from 'wouter';
import { ArrowLeft, Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div style={{ paddingTop: '10rem', paddingBottom: '8rem', textAlign: 'center', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: '600px' }}>
        <div className="glass-panel-gold" style={{ padding: '3.5rem 2rem' }}>
          <span style={{ fontSize: '4rem', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--accent-gold)', display: 'block', lineHeight: 1 }}>
            404
          </span>
          <h1 style={{ fontSize: '2rem', color: 'var(--text-ivory)', margin: '1rem 0 0.5rem 0' }}>
            Page Not Found
          </h1>
          <p style={{ color: 'var(--text-cream)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
            The destination you are looking for does not exist or has been relocated to our reimagined navigation structure.
          </p>

          <Link href="/" className="btn btn-gold" style={{ padding: '0.85rem 2rem' }}>
            <Home size={18} />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
