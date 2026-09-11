import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { Phone, Menu, X, ShieldCheck, UserCheck, HeartHandshake, MessageCircle, User, Lock } from 'lucide-react';

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

  // Handle click outside or Escape key to dismiss user dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsUserMenuOpen(false);
      }
    };
    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isUserMenuOpen]);

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
            maxWidth: '1380px',
            paddingTop: isScrolled ? '0.75rem' : '1.05rem',
            paddingBottom: isScrolled ? '0.75rem' : '1.05rem',
            paddingLeft: '1.25rem',
            paddingRight: '1.25rem',
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

            {/* Login / User Icon with Dropdown Menu */}
            <div ref={userMenuRef} style={{ position: 'relative' }}>
              <button
                type="button"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                aria-expanded={isUserMenuOpen}
                aria-haspopup="true"
                aria-label="User Account and Portal Access"
                title="Account & Login Portals"
                id="header-login-btn"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: isUserMenuOpen ? 'rgba(212, 175, 55, 0.22)' : 'rgba(255, 255, 255, 0.05)',
                  border: isUserMenuOpen ? '1px solid var(--accent-gold)' : '1px solid rgba(212, 175, 55, 0.32)',
                  color: isUserMenuOpen ? 'var(--text-ivory)' : 'var(--accent-gold)',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  boxShadow: isUserMenuOpen ? '0 0 16px rgba(212, 175, 55, 0.35)' : '0 4px 12px rgba(0, 0, 0, 0.3)',
                  flexShrink: 0
                }}
                onMouseEnter={(e) => {
                  if (!isUserMenuOpen) {
                    e.currentTarget.style.background = 'rgba(212, 175, 55, 0.15)';
                    e.currentTarget.style.borderColor = 'var(--accent-gold)';
                    e.currentTarget.style.color = 'var(--text-ivory)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isUserMenuOpen) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.32)';
                    e.currentTarget.style.color = 'var(--accent-gold)';
                    e.currentTarget.style.transform = 'none';
                  }
                }}
              >
                <User size={18} />
              </button>

              {/* Compact Premium Dropdown */}
              {isUserMenuOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 10px)',
                    right: 0,
                    width: '205px',
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
                  {/* 1. Check Status */}
                  <Link
                    href="/status"
                    onClick={() => setIsUserMenuOpen(false)}
                    role="menuitem"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.65rem',
                      padding: '0.6rem 0.75rem',
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
                    <span>Check Status</span>
                  </Link>

                  {/* 2. Patient Login */}
                  <Link
                    href="/login"
                    onClick={() => setIsUserMenuOpen(false)}
                    role="menuitem"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.65rem',
                      padding: '0.6rem 0.75rem',
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
                    <User size={16} color="var(--accent-gold)" />
                    <span>Patient Login</span>
                  </Link>

                  <div style={{ height: '1px', background: 'rgba(212, 175, 55, 0.18)', margin: '0.2rem 0.35rem' }} />

                  {/* 3. Admin Login */}
                  <Link
                    href="/admin/login"
                    onClick={() => setIsUserMenuOpen(false)}
                    role="menuitem"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.65rem',
                      padding: '0.6rem 0.75rem',
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
        @media (min-width: 1320px) {
          .desktop-nav {
            display: flex !important;
            gap: 1.05rem !important;
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
        @media (min-width: 1080px) and (max-width: 1319px) {
          .desktop-nav {
            display: flex !important;
            gap: 0.65rem !important;
            margin: 0 0.35rem !important;
          }
          .desktop-nav a {
            font-size: 0.82rem !important;
          }
          #desktop-check-status {
            display: inline-flex !important;
            padding: 0 0.85rem !important;
          }
          #desktop-register {
            display: inline-flex !important;
            padding: 0 0.95rem !important;
          }
          .mobile-hamburger {
            display: none !important;
          }
        }
        @media (min-width: 1024px) and (max-width: 1079px) {
          .desktop-nav {
            display: flex !important;
            gap: 0.65rem !important;
            margin: 0 0.35rem !important;
          }
          .desktop-nav a {
            font-size: 0.8rem !important;
            padding: 0.35rem 0.15rem !important;
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
      `}</style>
    </>
  );
};
