import React, { useEffect } from 'react';
import { Route, Switch, useLocation } from 'wouter';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { JourneyPage } from './pages/JourneyPage';
import { GalleryPage } from './pages/GalleryPage';
import { PressPage } from './pages/PressPage';
import { CausesPage } from './pages/CausesPage';
import { BlogsPage } from './pages/BlogsPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { ContactPage } from './pages/ContactPage';
import { RegisterPage } from './pages/RegisterPage';
import { RegisterSuccessPage } from './pages/RegisterSuccessPage';
import { StatusPage } from './pages/StatusPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Specialized High-Intent SEO Landing Pages
import { AlcoholDeaddictionPage } from './pages/services/AlcoholDeaddictionPage';
import { DrugRehabilitationPage } from './pages/services/DrugRehabilitationPage';
import { DetoxificationPage } from './pages/services/DetoxificationPage';
import { AdmissionProcessPage } from './pages/AdmissionProcessPage';
import { SelfAssessmentPage } from './pages/SelfAssessmentPage';

import { MitranganChatbot } from './chatbot';

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
      </div>

      {!isAdminRoute && (
        <MitranganChatbot />
      )}

      <Footer />
    </div>
  );
};
