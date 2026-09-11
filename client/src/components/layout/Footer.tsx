import React from 'react';
import { Link } from 'wouter';
import { Phone, Mail, MapPin, Shield, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  const quickNavCol1 = [
    { label: 'About Us', href: '/about' },
    { label: 'Recovery Journey', href: '/journey' },
    { label: 'Press & Events', href: '/press' },
    { label: 'Articles & FAQs', href: '/blogs' },
    { label: 'Check Status', href: '/status', isSpecial: true }
  ];

  const quickNavCol2 = [
    { label: 'All Services', href: '/services' },
    { label: 'Photo Gallery', href: '/gallery' },
    { label: 'Social Causes', href: '/causes' },
    { label: 'Admission Form', href: '/register', isSpecial: true },
    { label: 'Contact Us', href: '/contact' }
  ];

  return (
    <footer
      style={{
        backgroundColor: '#050D09',
        borderTop: '1px solid rgba(212, 175, 55, 0.2)',
        paddingTop: '4.5rem',
        paddingBottom: '2.5rem',
        color: 'var(--text-cream)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background radial glow */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '250px',
          background: 'radial-gradient(circle, rgba(42, 102, 79, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Main Three-Column Grid */}
        <div className="footer-main-grid">
          {/* COLUMN 1: Brand, Philosophy, 24x7 Pickup & Quick Navigation */}
          <div className="footer-col-1" style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Top Brand Header aligned with location headers */}
            <div
              style={{
                minHeight: '52px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.25rem'
              }}
            >
              <img
                src="/assets/logo.png"
                alt="Mitrangan Logo"
                style={{ height: '48px', width: 'auto', objectFit: 'contain' }}
              />
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.45rem',
                    fontWeight: 700,
                    color: 'var(--text-ivory)',
                    display: 'block',
                    lineHeight: 1.15
                  }}
                >
                  MITRANGAN
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.74rem',
                    color: 'var(--accent-gold)',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase'
                  }}
                >
                  De-Addiction Cum Rehabilitation
                </span>
              </div>
            </div>

            {/* Description */}
            <p
              style={{
                fontSize: '0.92rem',
                color: 'var(--text-muted)',
                lineHeight: 1.7,
                marginBottom: '1.35rem'
              }}
            >
              We are a trusted Nasha Mukti Kendra in Nagpur & Durg dedicated to helping individuals overcome addiction through structured rehabilitation, professional counseling, and holistic healing programs.
            </p>

            {/* 24x7 Pickup Assistance Card */}
            <div
              style={{
                padding: '0.85rem 1.1rem',
                background: 'rgba(212, 175, 55, 0.08)',
                borderRadius: '10px',
                border: '1px solid rgba(212, 175, 55, 0.2)',
                marginBottom: '1.75rem'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'var(--accent-gold)',
                  fontWeight: 600,
                  fontSize: '0.86rem',
                  marginBottom: '0.25rem'
                }}
              >
                <Shield size={16} />
                <span>*24x7 Pickup Assistance</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-cream)', lineHeight: 1.5 }}>
                Immediate confidential response for admissions across Maharashtra and Chhattisgarh.
              </p>
            </div>

            {/* Quick Navigation: Clean Two-Column Grid */}
            <div
              style={{
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                paddingTop: '1.35rem'
              }}
            >
              <h5
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: 'var(--accent-gold)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '1rem'
                }}
              >
                Quick Navigation
              </h5>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  columnGap: '2rem',
                  rowGap: '0.7rem',
                  fontSize: '0.88rem'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                  {quickNavCol1.map(link => (
                    <Link
                      key={link.href}
                      href={link.href}
                      style={{
                        color: link.isSpecial ? 'var(--accent-gold)' : 'var(--text-cream)',
                        fontWeight: link.isSpecial ? 600 : 400,
                        textDecoration: 'none',
                        lineHeight: 1.4,
                        transition: 'color 0.2s ease',
                        display: 'inline-flex',
                        alignItems: 'center'
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                  {quickNavCol2.map(link => (
                    <Link
                      key={link.href}
                      href={link.href}
                      style={{
                        color: link.isSpecial ? 'var(--accent-gold)' : 'var(--text-cream)',
                        fontWeight: link.isSpecial ? 600 : 400,
                        textDecoration: 'none',
                        lineHeight: 1.4,
                        transition: 'color 0.2s ease',
                        display: 'inline-flex',
                        alignItems: 'center'
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* COLUMN 2: Nagpur Center */}
          <div className="footer-col-2" style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Location Heading aligned with Col 1 and Col 3 */}
            <div
              style={{
                minHeight: '52px',
                display: 'flex',
                alignItems: 'center',
                marginBottom: '1.25rem'
              }}
            >
              <h4
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.05rem',
                  color: 'var(--accent-gold)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  margin: 0
                }}
              >
                <MapPin size={17} />
                <span>Nagpur Center (Headquarters)</span>
              </h4>
            </div>

            {/* Address */}
            <div className="footer-address-block">
              <p style={{ fontSize: '0.9rem', color: 'var(--text-cream)', lineHeight: 1.6, margin: 0 }}>
                Plot no. 7, Manasvi Multi-speciality hospital, Khangar layout, opposite Satyam Garden, Godhani, Nagpur - 441123, Maharashtra
              </p>
            </div>

            {/* Contact Rows (Phone & Email) */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                fontSize: '0.9rem',
                marginTop: '1.25rem'
              }}
            >
              <a
                href="tel:+919767362388"
                style={{
                  color: 'var(--text-ivory)',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  transition: 'color 0.2s ease'
                }}
              >
                <Phone size={15} color="#D4AF37" />
                <span>+91 9767362388</span>
              </a>
              <a
                href="mailto:mitranganrehab@gmail.com"
                style={{
                  color: 'var(--text-ivory)',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  transition: 'color 0.2s ease'
                }}
              >
                <Mail size={15} color="#D4AF37" />
                <span>mitranganrehab@gmail.com</span>
              </a>
            </div>
          </div>

          {/* COLUMN 3: Durg Center */}
          <div className="footer-col-3" style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Location Heading aligned with Col 1 and Col 2 */}
            <div
              style={{
                minHeight: '52px',
                display: 'flex',
                alignItems: 'center',
                marginBottom: '1.25rem'
              }}
            >
              <h4
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.05rem',
                  color: 'var(--accent-gold)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  margin: 0
                }}
              >
                <MapPin size={17} />
                <span>Durg Center</span>
              </h4>
            </div>

            {/* Address */}
            <div className="footer-address-block">
              <p style={{ fontSize: '0.9rem', color: 'var(--text-cream)', lineHeight: 1.6, margin: 0 }}>
                Janardan Prasad, near Sharma Sahu Sadan, Ward No. 40, Durg - 491001, Chhattisgarh
              </p>
            </div>

            {/* Contact Rows (Phone & Email) */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                fontSize: '0.9rem',
                marginTop: '1.25rem'
              }}
            >
              <a
                href="tel:+917666890795"
                style={{
                  color: 'var(--text-ivory)',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  transition: 'color 0.2s ease'
                }}
              >
                <Phone size={15} color="#D4AF37" />
                <span>+91 7666890795</span>
              </a>
              <a
                href="mailto:mitranganrehab@gmail.com"
                style={{
                  color: 'var(--text-ivory)',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  transition: 'color 0.2s ease'
                }}
              >
                <Mail size={15} color="#D4AF37" />
                <span>mitranganrehab@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Medical & Voluntary Recovery Disclaimer */}
        <div
          style={{
            padding: '1.25rem',
            background: 'rgba(11, 30, 23, 0.5)',
            borderRadius: '12px',
            border: '1px solid var(--border-glass)',
            fontSize: '0.8rem',
            color: 'var(--text-dim)',
            lineHeight: 1.6,
            marginBottom: '2.5rem'
          }}
        >
          <strong style={{ color: 'var(--text-muted)' }}>Disclaimer & Ethical Care Notice:</strong> Rehabilitation outcomes depend on individual commitment, personal circumstances, emotional factors, and adherence to therapeutic routines. Mitrangan De-Addiction Cum Rehabilitation Center operates with strict dignity, compassion, non-violence, and medically monitored support. We do not invent medical guarantees or fictitious treatment outcomes.
        </div>

        {/* Lower Strip */}
        <div
          style={{
            paddingTop: '1.5rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            fontSize: '0.85rem',
            color: 'var(--text-dim)'
          }}
        >
          <div>
            Copyright © {new Date().getFullYear()} Mitrangan De-Addiction Cum Rehabilitation Center. All Rights Reserved.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <Link href="/login" style={{ color: 'var(--text-cream)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span>Patient Login</span>
            </Link>

            <Link href="/admin/login" style={{ color: 'var(--text-dim)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Lock size={12} />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Responsive Styles */}
      <style>{`
        .footer-main-grid {
          display: grid;
          grid-template-columns: minmax(360px, 1.4fr) minmax(250px, 1fr) minmax(250px, 1fr);
          gap: 3.5rem;
          margin-bottom: 3.5rem;
        }
        .footer-address-block {
          min-height: 76px;
        }
        @media (max-width: 1023px) and (min-width: 768px) {
          .footer-main-grid {
            grid-template-columns: 1fr 1fr;
            gap: 2.5rem;
          }
          .footer-col-1 {
            grid-column: 1 / -1;
          }
          .footer-address-block {
            min-height: auto;
          }
        }
        @media (max-width: 767px) {
          .footer-main-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .footer-address-block {
            min-height: auto;
          }
        }
      `}</style>
    </footer>
  );
};
