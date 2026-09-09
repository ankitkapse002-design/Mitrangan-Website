import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { CheckCircle2, Copy, Check, ShieldCheck, ArrowRight, Phone } from 'lucide-react';

export const RegisterSuccessPage: React.FC = () => {
  const [copied, setCopied] = useState(false);

  // Parse query params
  const searchParams = new URLSearchParams(window.location.search);
  const userId = searchParams.get('userId') || 'RAHU2026-001';
  const name = searchParams.get('name') || 'Resident';

  const handleCopy = () => {
    navigator.clipboard.writeText(userId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div style={{ paddingTop: '8.5rem', paddingBottom: '6rem', minHeight: '90vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: '680px' }}>
        <div
          className="glass-panel-gold"
          style={{
            padding: 'clamp(2rem, 5vw, 3.5rem)',
            textAlign: 'center',
            position: 'relative',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.7)'
          }}
        >
          {/* Success Check Icon */}
          <div
            style={{
              width: '74px',
              height: '74px',
              borderRadius: '50%',
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              border: '2px solid rgba(16, 185, 129, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto'
            }}
          >
            <CheckCircle2 size={40} color="#10B981" />
          </div>

          <span className="section-tag" style={{ color: '#10B981', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
            Admission Initiated
          </span>

          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.6rem)', marginBottom: '0.5rem', color: 'var(--text-ivory)' }}>
            Registration Successful
          </h1>

          <p style={{ color: 'var(--text-cream)', fontSize: '1.02rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
            Thank you, <strong>{name}</strong>. Your admission inquiry has been logged in our secure clinical registry.
          </p>

          {/* Prominent User ID Display Box */}
          <div
            style={{
              padding: '1.75rem',
              background: 'rgba(7, 18, 13, 0.9)',
              border: '2px dashed var(--accent-gold)',
              borderRadius: '16px',
              marginBottom: '2rem'
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.82rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                display: 'block',
                marginBottom: '0.5rem'
              }}
            >
              Your Official Admission User ID
            </span>

            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.2rem, 5vw, 3rem)',
                fontWeight: 700,
                color: 'var(--accent-gold)',
                letterSpacing: '0.08em',
                marginBottom: '1rem'
              }}
            >
              {userId}
            </div>

            <button
              onClick={handleCopy}
              className="btn btn-gold"
              style={{ padding: '0.65rem 1.6rem', fontSize: '0.9rem' }}
            >
              {copied ? (
                <>
                  <Check size={16} />
                  <span>User ID Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={16} />
                  <span>Copy User ID</span>
                </>
              )}
            </button>
          </div>

          {/* Instructions Notice */}
          <p
            style={{
              backgroundColor: 'rgba(212, 175, 55, 0.08)',
              padding: '1rem 1.25rem',
              borderRadius: '10px',
              border: '1px solid rgba(212, 175, 55, 0.2)',
              fontSize: '0.92rem',
              color: 'var(--text-cream)',
              lineHeight: 1.6,
              marginBottom: '2.5rem'
            }}
          >
            <strong>Important:</strong> Please write down or copy your <strong>User ID</strong>. You or your family can use this ID anytime on our website to check admission status, review care plans, or access your patient dashboard.
          </p>

          {/* Direct Actions */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <Link href={`/status?userId=${encodeURIComponent(userId)}`} className="btn btn-outline-gold" style={{ padding: '0.85rem 1.75rem' }}>
              <ShieldCheck size={18} />
              <span>Check Admission Status Now</span>
            </Link>

            <Link href="/" className="btn btn-ghost" style={{ padding: '0.85rem 1.5rem' }}>
              <span>Return to Homepage</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
