import React from 'react';
import { Link } from 'wouter';
import { Phone, Mail, MapPin, Shield, Lock, ArrowRight, Instagram, Facebook } from 'lucide-react';

export const Footer: React.FC = () => {
  const quickNavCol1 = [
    { label: 'About Us', href: '/about' },
    { label: 'Recovery Journey', href: '/journey' },
    { label: 'Admission Guide', href: '/admission-process' },
    { label: 'Addiction Screener (Quiz)', href: '/self-assessment', isSpecial: true },
    { label: 'Articles & FAQs', href: '/blogs' },
    { label: 'Check Status', href: '/status' }
  ];

  const quickNavCol2 = [
    { label: 'Alcohol De-Addiction', href: '/services/alcohol-deaddiction' },
    { label: 'Drug Rehabilitation', href: '/services/drug-rehabilitation' },
    { label: 'Medical Detox Support', href: '/services/detoxification-support' },
    { label: 'All Services Hub', href: '/services' },
    { label: 'Admission Form', href: '/register', isSpecial: true }
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
          width: '700px',
          height: '280px',
          background: 'radial-gradient(circle, rgba(42, 102, 79, 0.16) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Main Three-Column Layout: Brand, Quick Links, Our Centers + Socials */}
        <div className="footer-main-grid">
          {/* COLUMN 1: Brand Identity & 24x7 Assistance */}
          <div className="footer-col-1" style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Top Brand Header */}
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
                fontSize: '0.9rem',
                color: 'var(--text-muted)',
                lineHeight: 1.7,
                marginBottom: '1.35rem'
              }}
            >
              We are a trusted Nasha Mukti Kendra in Nagpur dedicated to helping individuals overcome addiction through structured rehabilitation, professional counseling, and holistic healing programs.
            </p>

            {/* 24x7 Pickup Assistance Card */}
            <div
              style={{
                padding: '0.9rem 1.15rem',
                background: 'rgba(212, 175, 55, 0.07)',
                borderRadius: '10px',
                border: '1px solid rgba(212, 175, 55, 0.22)',
                marginTop: 'auto'
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
                  marginBottom: '0.3rem'
                }}
              >
                <Shield size={16} />
                <span>24x7 Discrete Pickup Assistance</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-cream)', lineHeight: 1.5, margin: 0 }}>
                Immediate confidential ambulance response for admissions across Maharashtra and surrounding regions.
              </p>
            </div>
          </div>

          {/* COLUMN 2: Quick Links */}
          <div className="footer-col-2" style={{ display: 'flex', flexDirection: 'column' }}>
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
                  fontWeight: 600,
                  margin: 0
                }}
              >
                Quick Links
              </h4>
            </div>

            {/* Two-Subcolumn Links Arrangement */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                columnGap: '1.5rem',
                rowGap: '0.75rem',
                fontSize: '0.88rem'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {quickNavCol1.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="footer-nav-link"
                    style={{
                      color: link.isSpecial ? 'var(--accent-gold)' : 'var(--text-cream)',
                      fontWeight: link.isSpecial ? 600 : 400,
                      textDecoration: 'none',
                      lineHeight: 1.4,
                      transition: 'color 0.2s ease, transform 0.2s ease',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem'
                    }}
                  >
                    <span>{link.label}</span>
                  </Link>
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {quickNavCol2.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="footer-nav-link"
                    style={{
                      color: link.isSpecial ? 'var(--accent-gold)' : 'var(--text-cream)',
                      fontWeight: link.isSpecial ? 600 : 400,
                      textDecoration: 'none',
                      lineHeight: 1.4,
                      transition: 'color 0.2s ease, transform 0.2s ease',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem'
                    }}
                  >
                    <span>{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* COLUMN 3: Our Centers, Google Maps Action & Social Links */}
          <div className="footer-col-3" style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Section Header: Our Centers */}
            <div
              style={{
                minHeight: '52px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1.25rem'
              }}
            >
              <MapPin size={19} color="var(--accent-gold)" />
              <h4
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.08rem',
                  color: 'var(--accent-gold)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  fontWeight: 700,
                  margin: 0
                }}
              >
                Our Centers
              </h4>
            </div>

            {/* Nagpur Center Card */}
            <div className="footer-center-card">
              <div>
                <h5
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.96rem',
                    fontWeight: 600,
                    color: 'var(--text-ivory)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    margin: '0 0 0.5rem 0'
                  }}
                >
                  <MapPin size={15} color="var(--accent-gold)" />
                  <span>Nagpur Center</span>
                </h5>
                <p
                  style={{
                    fontSize: '0.84rem',
                    color: 'var(--text-cream)',
                    lineHeight: 1.55,
                    margin: '0 0 0.75rem 0'
                  }}
                >
                  Plot no. 7, Manasvi Multi-speciality hospital, Khangar layout, opposite Satyam Garden, Godhani, Nagpur - 441123, Maharashtra
                </p>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', fontSize: '0.84rem' }}>
                <a
                  href="tel:+919767362388"
                  className="footer-contact-item"
                  style={{
                    color: 'var(--text-ivory)',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'color 0.2s ease'
                  }}
                >
                  <Phone size={14} color="#D4AF37" />
                  <span>+91 9767362388</span>
                </a>
                <a
                  href="mailto:mitranganrehab@gmail.com"
                  className="footer-contact-item"
                  style={{
                    color: 'var(--text-ivory)',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'color 0.2s ease'
                  }}
                >
                  <Mail size={14} color="#D4AF37" />
                  <span>mitranganrehab@gmail.com</span>
                </a>
              </div>
            </div>

            {/* Single Common Google Maps Action */}
            <div style={{ marginTop: '1.25rem', marginBottom: '1.25rem' }}>
              <a
                href="https://maps.app.goo.gl/a4ESFjDuZMCW1hsb9"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-maps-action-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.55rem',
                  padding: '0.62rem 1.15rem',
                  background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.14) 0%, rgba(42, 102, 79, 0.18) 100%)',
                  border: '1px solid rgba(212, 175, 55, 0.38)',
                  borderRadius: '8px',
                  color: 'var(--accent-gold)',
                  fontSize: '0.86rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'all 0.22s ease',
                  boxShadow: '0 3px 10px rgba(0, 0, 0, 0.35)'
                }}
              >
                <MapPin size={15} color="var(--accent-gold)" />
                <span>Find Us on Google Maps</span>
                <ArrowRight size={15} className="maps-arrow-icon" style={{ transition: 'transform 0.2s ease' }} />
              </a>
            </div>

            {/* Connect With Us: Instagram | Facebook */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                paddingTop: '1rem'
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em'
                }}
              >
                Connect With Us
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <a
                  href="https://www.instagram.com/mitrangan_rehab?utm_source=qr&stkn=MXRrZjVrZjh0bzkwOQ=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-pill"
                  title="Follow Mitrangan Rehab on Instagram"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.45rem 0.85rem',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '6px',
                    color: 'var(--text-cream)',
                    fontSize: '0.82rem',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Instagram size={15} color="#E1306C" />
                  <span>@mitrangan_rehab</span>
                </a>

                <a
                  href="https://www.facebook.com/share/18iP5btKBp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-pill"
                  title="Follow Mitrangan Rehab on Facebook"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.45rem 0.85rem',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '6px',
                    color: 'var(--text-cream)',
                    fontSize: '0.82rem',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Facebook size={15} color="#1877F2" />
                  <span>Facebook</span>
                </a>
              </div>
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

      {/* Footer Responsive & Interactive Styles */}
      <style>{`
        .footer-main-grid {
          display: grid;
          grid-template-columns: minmax(300px, 1.2fr) minmax(240px, 0.95fr) minmax(340px, 1.35fr);
          gap: 3.25rem;
          margin-bottom: 3.5rem;
        }

        .footer-center-card {
          padding: 1.1rem 1.25rem;
          background: rgba(255, 255, 255, 0.025);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 10px;
          transition: border-color 0.2s ease, background-color 0.2s ease;
        }

        .footer-center-card:hover {
          border-color: rgba(212, 175, 55, 0.25);
          background: rgba(212, 175, 55, 0.03);
        }

        .footer-nav-link:hover {
          color: var(--accent-gold) !important;
          transform: translateX(3px);
        }

        .footer-contact-item:hover {
          color: var(--accent-gold) !important;
        }

        .footer-maps-action-btn:hover {
          background: linear-gradient(135deg, rgba(212, 175, 55, 0.22) 0%, rgba(42, 102, 79, 0.28) 100%) !important;
          border-color: var(--accent-gold) !important;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(212, 175, 55, 0.15) !important;
        }

        .footer-maps-action-btn:hover .maps-arrow-icon {
          transform: translateX(4px) !important;
        }

        .footer-social-pill:hover {
          background: rgba(255, 255, 255, 0.08) !important;
          border-color: rgba(212, 175, 55, 0.4) !important;
          color: var(--text-ivory) !important;
          transform: translateY(-2px);
        }

        @media (max-width: 1080px) and (min-width: 768px) {
          .footer-main-grid {
            grid-template-columns: 1fr 1fr;
            gap: 2.5rem;
          }
          .footer-col-1 {
            grid-column: 1 / 2;
          }
          .footer-col-2 {
            grid-column: 2 / 3;
          }
          .footer-col-3 {
            grid-column: 1 / -1;
            border-top: 1px solid rgba(255, 255, 255, 0.08);
            padding-top: 2rem;
          }
        }

        @media (max-width: 767px) {
          .footer-main-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }
      `}</style>
    </footer>
  );
};
