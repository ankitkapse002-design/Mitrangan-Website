import React, { useState } from 'react';
import { Phone, MessageCircle, ShieldCheck, X, LifeBuoy, HeartHandshake } from 'lucide-react';
import { Link } from 'wouter';

export const FloatingHelpWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className="floating-help-widget-container"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '88px',
          zIndex: 90,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '0.75rem'
        }}
        aria-label="Immediate 24/7 Emergency Support and WhatsApp Helpline"
      >
      {/* Expanded Quick Options Menu */}
      {isOpen && (
        <div
          className="glass-panel-gold"
          style={{
            padding: '1.25rem',
            width: '280px',
            borderRadius: '16px',
            boxShadow: '0 12px 35px rgba(0, 0, 0, 0.7)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            animation: 'fadeIn 0.25s ease'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-glass)', paddingBottom: '0.5rem' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.82rem', fontWeight: 600, color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              24/7 Urgent Care Helpline
            </span>
            <button
              onClick={() => setIsOpen(false)}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', padding: '2px' }}
              aria-label="Close support menu"
            >
              <X size={16} />
            </button>
          </div>

          {/* WhatsApp Direct */}
          <a
            href="https://wa.me/919767362388?text=Hello%20Mitrangan,%20I%20would%20like%20to%20inquire%20about%20rehabilitation%20admission"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
            style={{ width: '100%', fontSize: '0.88rem', padding: '0.65rem 1rem' }}
          >
            <MessageCircle size={17} />
            <span>Chat on WhatsApp</span>
          </a>

          {/* 24/7 Direct Calls */}
          <a
            href="tel:+919767362388"
            className="btn btn-emerald"
            style={{ width: '100%', fontSize: '0.86rem', padding: '0.6rem 0.9rem' }}
          >
            <Phone size={16} />
            <span>Call Nagpur: +91 9767362388</span>
          </a>

          <a
            href="tel:+917666890795"
            className="btn btn-ghost"
            style={{ width: '100%', fontSize: '0.86rem', padding: '0.6rem 0.9rem', justifyContent: 'center', borderColor: 'rgba(212, 175, 55, 0.3)' }}
          >
            <Phone size={16} color="var(--accent-gold)" />
            <span>Call Durg: +91 7666890795</span>
          </a>

          {/* 24x7 Pickup Assistance */}
          <Link
            href="/register"
            onClick={() => setIsOpen(false)}
            className="btn btn-gold"
            style={{ width: '100%', fontSize: '0.88rem', padding: '0.65rem 1rem' }}
          >
            <HeartHandshake size={17} />
            <span>Request 24/7 Pickup</span>
          </Link>
        </div>
      )}

      {/* Toggle Main Bubble */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={isOpen ? 'btn btn-ghost' : 'btn btn-gold'}
        style={{
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 6px 18px rgba(0, 0, 0, 0.5), 0 0 14px rgba(212, 175, 55, 0.25)',
          cursor: 'pointer'
        }}
        aria-expanded={isOpen}
        aria-label="Toggle 24/7 helpline and WhatsApp support"
        title="24/7 Emergency Support & WhatsApp"
      >
        {isOpen ? <X size={18} /> : <Phone size={18} />}
      </button>
    </div>

    <style>{`
      @media (max-width: 1023px) and (min-width: 641px) {
        .floating-help-widget-container {
          bottom: 20px !important;
          right: 80px !important;
        }
      }
      @media (max-width: 640px) {
        .floating-help-widget-container {
          bottom: 16px !important;
          right: 70px !important;
        }
      }
    `}</style>
  </>
  );
};
