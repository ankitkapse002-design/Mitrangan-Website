import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { Phone, Menu, X, ShieldCheck, UserCheck, HeartHandshake, MessageCircle, User, Lock, FileText, Activity } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileOpen(false);
    setIsUserMenuOpen(false);
  }, [location]);

  // Handle click outside or Escape key to dismiss menus
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsUserMenuOpen(false);
        setIsMobileOpen(false);
      }
    };
    if (isUserMenuOpen || isMobileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isUserMenuOpen, isMobileOpen]);

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
            maxWidth: '1440px',
            width: '100%',
            paddingTop: isScrolled ? '0.75rem' : '1.05rem',
            paddingBottom: isScrolled ? '0.75rem' : '1.05rem',
            paddingLeft: 'clamp(1rem, 2vw, 2rem)',
            paddingRight: 'clamp(1rem, 2vw, 2rem)',
            transition: 'padding 0.35s ease',
            position: 'relative'
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
              gap: 'clamp(0.75rem, 1.1vw, 1.25rem)',
              margin: '0 0.5rem'
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexShrink: 0 }}>
            <Link
              href="/self-assessment"
              className="btn btn-ghost"
              style={{
                display: 'none',
                height: '38px',
                padding: '0 0.95rem',
                fontSize: '0.84rem',
                alignItems: 'center',
                whiteSpace: 'nowrap',
                lineHeight: 1,
                border: '1px solid rgba(212, 175, 55, 0.3)',
                color: 'var(--accent-gold)'
              }}
              id="desktop-screener"
            >
              <Activity size={15} color="#D4AF37" />
              <span>Addiction Screener</span>
            </Link>

            <Link
              href="/status"
              rel="nofollow"
              className="btn btn-ghost"
              style={{
                display: 'none',
                height: '38px',
                padding: '0 0.95rem',
                fontSize: '0.84rem',
                alignItems: 'center',
                whiteSpace: 'nowrap',
                lineHeight: 1,
                border: '1px solid rgba(255, 255, 255, 0.12)'
              }}
              id="desktop-check-status"
            >
              <ShieldCheck size={15} color="#D4AF37" />
              <span>Check Status</span>
            </Link>

            <Link
              href="/register"
              className="btn btn-gold"
              style={{
                display: 'none',
                height: '38px',
                padding: '0 1.15rem',
                fontSize: '0.85rem',
                fontWeight: 600,
                alignItems: 'center',
                whiteSpace: 'nowrap',
                lineHeight: 1
              }}
              id="desktop-register"
            >
              <HeartHandshake size={15} />
              <span>Admission</span>
            </Link>

            {/* Login / User Button with Dropdown Menu */}
            <div ref={userMenuRef} style={{ position: 'relative', flexShrink: 0 }}>
              <button
                type="button"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                aria-expanded={isUserMenuOpen}
                aria-haspopup="true"
                aria-label="User Account and Portal Access"
                title="Account & Login Portals"
                id="header-login-btn"
                style={{
                  height: '38px',
                  padding: '0 0.85rem',
                  borderRadius: '20px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.45rem',
                  background: isUserMenuOpen ? 'rgba(212, 175, 55, 0.22)' : 'rgba(212, 175, 55, 0.08)',
                  border: isUserMenuOpen ? '1px solid var(--accent-gold)' : '1px solid rgba(212, 175, 55, 0.35)',
                  color: isUserMenuOpen ? 'var(--text-ivory)' : 'var(--accent-gold)',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  boxShadow: isUserMenuOpen ? '0 0 16px rgba(212, 175, 55, 0.35)' : '0 2px 8px rgba(0, 0, 0, 0.25)',
                  flexShrink: 0,
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  fontFamily: 'var(--font-display)',
                  lineHeight: 1
                }}
                onMouseEnter={(e) => {
                  if (!isUserMenuOpen) {
                    e.currentTarget.style.background = 'rgba(212, 175, 55, 0.18)';
                    e.currentTarget.style.borderColor = 'var(--accent-gold)';
                    e.currentTarget.style.color = 'var(--text-ivory)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isUserMenuOpen) {
                    e.currentTarget.style.background = 'rgba(212, 175, 55, 0.08)';
                    e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.35)';
                    e.currentTarget.style.color = 'var(--accent-gold)';
                    e.currentTarget.style.transform = 'none';
                  }
                }}
              >
                <User size={15} />
                <span className="header-login-text">Login</span>
              </button>

              {/* Compact Premium Dropdown */}
              {isUserMenuOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 10px)',
                    right: 0,
                    width: '215px',
                    background: 'linear-gradient(165deg, rgba(14, 34, 25, 0.98) 0%, rgba(7, 18, 13, 0.99) 100%)',
                    border: '1px solid rgba(212, 175, 55, 0.38)',
                    borderRadius: '14px',
                    boxShadow: '0 18px 45px rgba(0, 0, 0, 0.85), 0 0 25px rgba(212, 175, 55, 0.16)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    padding: '0.45rem',
                    zIndex: 200,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.2rem',
                    animation: 'fadeIn 0.18s ease-out'
                  }}
                  role="menu"
                  aria-orientation="vertical"
                >
                  <div style={{ padding: '0.35rem 0.65rem 0.25rem', borderBottom: '1px solid rgba(212, 175, 55, 0.15)', marginBottom: '0.2rem' }}>
                    <span style={{ fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent-gold)', fontWeight: 600 }}>
                      Portals &amp; Status
                    </span>
                  </div>

                  {/* 1. Patient Login */}
                  <Link
                    href="/login"
                    rel="nofollow"
                    onClick={() => setIsUserMenuOpen(false)}
                    role="menuitem"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.65rem',
                      padding: '0.55rem 0.75rem',
                      borderRadius: '8px',
                      color: 'var(--text-cream)',
                      textDecoration: 'none',
                      fontSize: '0.88rem',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 500,
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(212, 175, 55, 0.14)';
                      e.currentTarget.style.color = 'var(--text-ivory)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = 'var(--text-cream)';
                    }}
                  >
                    <UserCheck size={16} color="var(--accent-gold)" />
                    <span>Patient Login</span>
                  </Link>

                  {/* 2. Admin Login */}
                  <Link
                    href="/admin/login"
                    rel="nofollow"
                    onClick={() => setIsUserMenuOpen(false)}
                    role="menuitem"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.65rem',
                      padding: '0.55rem 0.75rem',
                      borderRadius: '8px',
                      color: 'var(--text-cream)',
                      textDecoration: 'none',
                      fontSize: '0.88rem',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 500,
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(212, 175, 55, 0.14)';
                      e.currentTarget.style.color = 'var(--text-ivory)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = 'var(--text-cream)';
                    }}
                  >
                    <Lock size={16} color="var(--accent-gold)" />
                    <span>Admin Login</span>
                  </Link>

                  <div style={{ height: '1px', background: 'rgba(212, 175, 55, 0.15)', margin: '0.2rem 0.35rem' }} />

                  {/* 3. Check Status */}
                  <Link
                    href="/status"
                    rel="nofollow"
                    onClick={() => setIsUserMenuOpen(false)}
                    role="menuitem"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.65rem',
                      padding: '0.55rem 0.75rem',
                      borderRadius: '8px',
                      color: 'var(--text-cream)',
                      textDecoration: 'none',
                      fontSize: '0.88rem',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 500,
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(212, 175, 55, 0.14)';
                      e.currentTarget.style.color = 'var(--text-ivory)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = 'var(--text-cream)';
                    }}
                  >
                    <ShieldCheck size={16} color="var(--accent-gold)" />
                    <span>Check Admission Status</span>
                  </Link>

                  {/* 4. Addiction Screener */}
                  <Link
                    href="/self-assessment"
                    onClick={() => setIsUserMenuOpen(false)}
                    role="menuitem"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.65rem',
                      padding: '0.55rem 0.75rem',
                      borderRadius: '8px',
                      color: 'var(--text-cream)',
                      textDecoration: 'none',
                      fontSize: '0.88rem',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 500,
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(212, 175, 55, 0.14)';
                      e.currentTarget.style.color = 'var(--text-ivory)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = 'var(--text-cream)';
                    }}
                  >
                    <Activity size={16} color="var(--accent-gold)" />
                    <span>Addiction Screener</span>
                  </Link>
                </div>
              )}
            </div>

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
              aria-expanded={isMobileOpen}
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

            <Link href="/admission-process" className="btn btn-outline" style={{ width: '100%', borderColor: 'rgba(212, 175, 55, 0.4)' }}>
              <FileText size={18} color="var(--accent-gold)" />
              <span>Admission Guide &amp; Checklist</span>
            </Link>

            <Link href="/self-assessment" className="btn btn-outline" style={{ width: '100%', borderColor: 'rgba(212, 175, 55, 0.5)' }}>
              <Activity size={18} color="var(--accent-gold)" />
              <span>Addiction Screener (Quiz)</span>
            </Link>

            <Link href="/status" rel="nofollow" className="btn btn-outline-gold" style={{ width: '100%' }}>
              <ShieldCheck size={18} />
              <span>Check Admission Status</span>
            </Link>

            <Link href="/login" rel="nofollow" className="btn btn-ghost" style={{ width: '100%' }}>
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

            <div style={{ marginTop: '0.2rem' }}>
              <a
                href="tel:+919767362388"
                className="btn btn-emerald"
                style={{ width: '100%', padding: '0.65rem 0.5rem', fontSize: '0.85rem', justifyContent: 'center' }}
              >
                <Phone size={15} />
                <span>Call 24/7 Helpline: +91 9767362388</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Inline styles for responsive visibility */}
      <style>{`
        /* Ultra-wide screens (1600px and up) */
        @media (min-width: 1600px) {
          .desktop-nav {
            display: flex !important;
            gap: 1.15rem !important;
          }
          #desktop-screener {
            display: inline-flex !important;
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

        /* Large desktop screens (1360px to 1599px) */
        @media (min-width: 1360px) and (max-width: 1599px) {
          .desktop-nav {
            display: flex !important;
            gap: 0.85rem !important;
          }
          .desktop-nav a {
            font-size: 0.86rem !important;
          }
          #desktop-screener {
            display: none !important;
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

        /* Standard PC & Laptop screens (1180px to 1359px) */
        @media (min-width: 1180px) and (max-width: 1359px) {
          .desktop-nav {
            display: flex !important;
            gap: 0.65rem !important;
            margin: 0 0.25rem !important;
          }
          .desktop-nav a {
            font-size: 0.82rem !important;
            padding: 0.35rem 0.12rem !important;
          }
          #desktop-screener {
            display: none !important;
          }
          #desktop-check-status {
            display: inline-flex !important;
            height: 38px !important;
            padding: 0 0.85rem !important;
            font-size: 0.82rem !important;
          }
          #desktop-register {
            display: inline-flex !important;
            height: 38px !important;
            padding: 0 0.95rem !important;
            font-size: 0.83rem !important;
          }
          .mobile-hamburger {
            display: none !important;
          }
        }

        /* Compact Desktop & Tablets Landscape (1024px to 1179px) */
        @media (min-width: 1024px) and (max-width: 1179px) {
          .desktop-nav {
            display: flex !important;
            gap: 0.45rem !important;
            margin: 0 0.2rem !important;
          }
          .desktop-nav a {
            font-size: 0.78rem !important;
            padding: 0.3rem 0.08rem !important;
          }
          #desktop-screener {
            display: none !important;
          }
          #desktop-check-status {
            display: none !important;
          }
          #desktop-register {
            display: inline-flex !important;
            height: 38px !important;
            padding: 0 0.9rem !important;
            font-size: 0.82rem !important;
          }
          .mobile-hamburger {
            display: none !important;
          }
        }

        /* Small screens (< 520px) - keep login button compact */
        @media (max-width: 520px) {
          .header-login-text {
            display: none !important;
          }
          #header-login-btn {
            width: 38px !important;
            padding: 0 !important;
            border-radius: 50% !important;
          }
        }
      `}</style>
    </>
  );
};
