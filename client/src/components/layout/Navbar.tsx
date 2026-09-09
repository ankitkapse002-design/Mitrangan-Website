import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Phone, Menu, X, ShieldCheck, UserCheck, HeartHandshake, MessageCircle } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location]);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Recovery Journey', href: '/journey' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Press & Causes', href: '/press' },
    { label: 'Articles & FAQs', href: '/blogs' },
    { label: 'Contact', href: '/contact' }
  ];

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          backgroundColor: isScrolled ? 'rgba(7, 18, 13, 0.95)' : 'rgba(7, 18, 13, 0.72)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          borderBottom: isScrolled ? '1px solid rgba(212, 175, 55, 0.22)' : '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: isScrolled ? '0 12px 32px rgba(0, 0, 0, 0.65)' : 'none',
          minHeight: isScrolled ? '76px' : '82px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {/* Main Navbar */}
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: isScrolled ? '0.75rem' : '1.05rem',
            paddingBottom: isScrolled ? '0.75rem' : '1.05rem',
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem',
            transition: 'padding 0.35s ease',
            width: '100%'
          }}
        >
          {/* Logo & Brand */}
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.85rem',
              textDecoration: 'none',
              flexShrink: 0
            }}
          >
            <img
              src="/assets/logo.png"
              alt="Mitrangan Logo"
              style={{
                height: '52px',
                width: 'auto',
                objectFit: 'contain',
                filter: 'drop-shadow(0 2px 10px rgba(0, 0, 0, 0.65))'
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.45rem',
                  fontWeight: 700,
                  letterSpacing: '0.03em',
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
                  fontSize: '0.72rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-gold)',
                  lineHeight: 1.2,
                  marginTop: '1px'
                }}
              >
                Rehabilitation Kendra
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: 'clamp(0.9rem, 1.25vw, 1.55rem)',
              margin: '0 0.85rem'
            }}
            className="desktop-nav"
          >
            {navLinks.map(item => {
              const isActive = location === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.9rem',
                    fontWeight: isActive ? 600 : 450,
                    color: isActive ? 'var(--accent-gold)' : 'var(--text-cream)',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                    position: 'relative',
                    padding: '0.4rem 0.2rem',
                    whiteSpace: 'nowrap',
                    display: 'inline-flex',
                    alignItems: 'center',
                    lineHeight: 1
                  }}
                >
                  {item.label}
                  {isActive && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: -1,
                        left: 0,
                        right: 0,
                        height: '2px',
                        backgroundColor: 'var(--accent-gold)',
                        borderRadius: '2px',
                        boxShadow: '0 0 8px rgba(212, 175, 55, 0.6)'
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Header Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
            <Link
              href="/status"
              className="btn btn-ghost"
              style={{
                display: 'none',
                height: '40px',
                padding: '0 1.15rem',
                fontSize: '0.86rem',
                alignItems: 'center',
                whiteSpace: 'nowrap',
                lineHeight: 1
              }}
              id="desktop-check-status"
            >
              <ShieldCheck size={16} color="#D4AF37" />
              <span>Check Status</span>
            </Link>

            <Link
              href="/register"
              className="btn btn-gold"
              style={{
                display: 'none',
                height: '40px',
                padding: '0 1.35rem',
                fontSize: '0.86rem',
                fontWeight: 600,
                alignItems: 'center',
                whiteSpace: 'nowrap',
                lineHeight: 1
              }}
              id="desktop-register"
            >
              <HeartHandshake size={16} />
              <span>Admission</span>
            </Link>

            {/* Mobile Menu Hamburger Button */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '8px',
                color: 'var(--text-ivory)',
                padding: '0.55rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '40px',
                width: '40px'
              }}
              className="mobile-hamburger"
              aria-label="Toggle navigation menu"
            >
              {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {isMobileOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99,
            backgroundColor: 'rgba(5, 13, 9, 0.98)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            padding: '7rem 2rem 2rem 2rem',
            overflowY: 'auto'
          }}
        >
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
            {navLinks.map(item => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.5rem',
                  fontWeight: 500,
                  color: location === item.href ? 'var(--accent-gold)' : 'var(--text-ivory)',
                  textDecoration: 'none'
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <Link href="/register" className="btn btn-gold" style={{ width: '100%' }}>
              <HeartHandshake size={18} />
              <span>Register Admission</span>
            </Link>

            <Link href="/status" className="btn btn-outline-gold" style={{ width: '100%' }}>
              <ShieldCheck size={18} />
              <span>Check Admission Status</span>
            </Link>

            <Link href="/login" className="btn btn-ghost" style={{ width: '100%' }}>
              <UserCheck size={18} />
              <span>Patient Dashboard Login</span>
            </Link>

            <a
              href="https://wa.me/919767362388?text=Hello%2C%20I%20need%20assistance%20regarding%20Mitrangan%20rehabilitation%20services"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
              style={{ width: '100%', marginTop: '0.4rem' }}
            >
              <MessageCircle size={18} />
              <span>WhatsApp Confidential Support</span>
            </a>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '0.2rem' }}>
              <a
                href="tel:+919767362388"
                className="btn btn-emerald"
                style={{ width: '100%', padding: '0.65rem 0.5rem', fontSize: '0.85rem', justifyContent: 'center' }}
              >
                <Phone size={15} />
                <span>Nagpur Call</span>
              </a>
              <a
                href="tel:+917666890795"
                className="btn btn-ghost"
                style={{ width: '100%', padding: '0.65rem 0.5rem', fontSize: '0.85rem', justifyContent: 'center', borderColor: 'rgba(212, 175, 55, 0.4)' }}
              >
                <Phone size={15} color="var(--accent-gold)" />
                <span>Durg Call</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Inline styles for responsive visibility */}
      <style>{`
        @media (min-width: 1140px) {
          .desktop-nav {
            display: flex !important;
          }
          #desktop-check-status {
            display: inline-flex !important;
          }
          #desktop-register {
            display: inline-flex !important;
          }
          .mobile-hamburger {
            display: none !important;
          }
        }
        @media (min-width: 1024px) and (max-width: 1139px) {
          .desktop-nav {
            display: flex !important;
            gap: 0.75rem !important;
            margin: 0 0.4rem !important;
          }
          .desktop-nav a {
            font-size: 0.82rem !important;
            padding: 0.35rem 0.15rem !important;
          }
          #desktop-check-status {
            display: none !important;
          }
          #desktop-register {
            display: inline-flex !important;
            height: 38px !important;
            padding: 0 1rem !important;
            font-size: 0.82rem !important;
          }
          .mobile-hamburger {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};
