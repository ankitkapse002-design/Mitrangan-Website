import React, { useEffect, Suspense, lazy } from 'react';
import { Route, Switch, useLocation } from 'wouter';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Core Landing Page (static for instantaneous first paint)
import { HomePage } from './pages/HomePage';

// Lazy-loaded routes for optimal Core Web Vitals & code-splitting
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ServicesPage = lazy(() => import('./pages/ServicesPage').then(m => ({ default: m.ServicesPage })));
const JourneyPage = lazy(() => import('./pages/JourneyPage').then(m => ({ default: m.JourneyPage })));
const GalleryPage = lazy(() => import('./pages/GalleryPage').then(m => ({ default: m.GalleryPage })));
const PressPage = lazy(() => import('./pages/PressPage').then(m => ({ default: m.PressPage })));
const CausesPage = lazy(() => import('./pages/CausesPage').then(m => ({ default: m.CausesPage })));
const BlogsPage = lazy(() => import('./pages/BlogsPage').then(m => ({ default: m.BlogsPage })));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage').then(m => ({ default: m.BlogPostPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const RegisterPage = lazy(() => import('./pages/RegisterPage').then(m => ({ default: m.RegisterPage })));
const RegisterSuccessPage = lazy(() => import('./pages/RegisterSuccessPage').then(m => ({ default: m.RegisterSuccessPage })));
const StatusPage = lazy(() => import('./pages/StatusPage').then(m => ({ default: m.StatusPage })));
const LoginPage = lazy(() => import('./pages/LoginPage').then(m => ({ default: m.LoginPage })));
const DashboardPage = lazy(() => import('./pages/DashboardPage').then(m => ({ default: m.DashboardPage })));
const AdminLoginPage = lazy(() => import('./pages/AdminLoginPage').then(m => ({ default: m.AdminLoginPage })));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage').then(m => ({ default: m.AdminDashboardPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

// Specialized High-Intent SEO Landing Pages (lazy-loaded)
const AlcoholDeaddictionPage = lazy(() => import('./pages/services/AlcoholDeaddictionPage').then(m => ({ default: m.AlcoholDeaddictionPage })));
const DrugRehabilitationPage = lazy(() => import('./pages/services/DrugRehabilitationPage').then(m => ({ default: m.DrugRehabilitationPage })));
const DetoxificationPage = lazy(() => import('./pages/services/DetoxificationPage').then(m => ({ default: m.DetoxificationPage })));
const AdmissionProcessPage = lazy(() => import('./pages/AdmissionProcessPage').then(m => ({ default: m.AdmissionProcessPage })));
const SelfAssessmentPage = lazy(() => import('./pages/SelfAssessmentPage').then(m => ({ default: m.SelfAssessmentPage })));

import { MitranganChatbot } from './chatbot';

const PageLoadingFallback: React.FC = () => (
  <div style={{
    minHeight: '60vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    color: 'var(--text-muted)'
  }}>
    <div style={{
      width: '36px',
      height: '36px',
      border: '2px solid rgba(212, 175, 55, 0.2)',
      borderTopColor: 'var(--accent-gold)',
      borderRadius: '50%',
      animation: 'mitranganSpin 0.8s linear infinite'
    }} />
    <span style={{ fontSize: '0.85rem', letterSpacing: '0.04em', color: 'var(--text-muted)' }}>
      Loading Mitrangan Care...
    </span>
    <style>{`
      @keyframes mitranganSpin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

export const App: React.FC = () => {
  const [location] = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const isAdminRoute = location.startsWith('/admin');

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <div style={{ flex: 1 }}>
        <Suspense fallback={<PageLoadingFallback />}>
          <Switch>
            <Route path="/" component={HomePage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/about-us" component={AboutPage} />
            <Route path="/services" component={ServicesPage} />
            <Route path="/services/alcohol-deaddiction" component={AlcoholDeaddictionPage} />
            <Route path="/services/drug-rehabilitation" component={DrugRehabilitationPage} />
            <Route path="/services/detoxification-support" component={DetoxificationPage} />
            <Route path="/admission-process" component={AdmissionProcessPage} />
            <Route path="/self-assessment" component={SelfAssessmentPage} />
            <Route path="/addiction-screener" component={SelfAssessmentPage} />
            <Route path="/journey" component={JourneyPage} />
            <Route path="/gallery" component={GalleryPage} />
            <Route path="/press" component={PressPage} />
            <Route path="/press-or-government-program" component={PressPage} />
            <Route path="/causes" component={CausesPage} />
            <Route path="/blogs" component={BlogsPage} />
            <Route path="/blogs/:slug" component={BlogPostPage} />
            <Route path="/contact" component={ContactPage} />
            <Route path="/contact-us" component={ContactPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/register/success" component={RegisterSuccessPage} />
            <Route path="/status" component={StatusPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/dashboard" component={DashboardPage} />
            <Route path="/admin/login" component={AdminLoginPage} />
            <Route path="/admin" component={AdminDashboardPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Suspense>
      </div>

      {!isAdminRoute && (
        <MitranganChatbot />
      )}

      <Footer />
    </div>
  );
};
