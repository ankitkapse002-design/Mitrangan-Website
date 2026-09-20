import React from 'react';
import { SEO } from '../components/SEO';
import { ShieldCheck, Lock, HeartHandshake, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'wouter';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div style={{ paddingTop: '8.5rem', paddingBottom: '6rem', minHeight: '90vh' }}>
      <SEO
        title="Privacy Policy & Patient Confidentiality | Mitrangan Rehabilitation Nagpur"
        description="Mitrangan Rehabilitation Center's commitment to patient privacy, strict confidentiality of medical records, and ethical data protection standards."
        canonicalPath="/privacy"
      />
      <div className="container" style={{ maxWidth: '900px' }}>
        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="section-tag">
            <Lock size={13} color="#D4AF37" />
            <span>Ethical Care &amp; Data Protection</span>
          </span>
          <h1 style={{ fontSize: 'clamp(2.3rem, 4.5vw, 3.5rem)', marginBottom: '1rem' }}>
            Privacy Policy &amp; Patient Confidentiality
          </h1>
          <p style={{ color: 'var(--text-cream)', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '750px', margin: '0 auto' }}>
            At Mitrangan De-Addiction Cum Rehabilitation Center, we consider the privacy, dignity, and personal safety of our residents and their families to be our highest moral and clinical responsibility.
          </p>
        </div>

        {/* Content Body */}
        <div className="glass-panel" style={{ padding: 'clamp(2rem, 4vw, 3.5rem)', border: '1px solid var(--border-gold)', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {/* Section 1 */}
          <div>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--accent-gold)', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <ShieldCheck size={22} />
              <span>1. Strict Healthcare Confidentiality Pledge</span>
            </h2>
            <p style={{ color: 'var(--text-cream)', fontSize: '0.98rem', lineHeight: 1.7 }}>
              Chemical dependency and psychiatric recovery require an environment of absolute trust. Mitrangan operates under strict confidentiality protocols. No patient identifying details, admission records, therapy notes, or family communications are ever sold, shared, rented, or publicized to commercial third parties, marketers, or unauthorized entities.
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--accent-gold)', marginBottom: '0.85rem' }}>
              2. Information We Collect
            </h2>
            <p style={{ color: 'var(--text-cream)', fontSize: '0.98rem', lineHeight: 1.7, marginBottom: '0.85rem' }}>
              When you interact with our website, request admission, or utilize our 24/7 helpline, we may collect the following voluntary information:
            </p>
            <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: 1.8 }}>
              <li><strong>Contact Information:</strong> Patient name, family contact person, telephone number, residential address, and district.</li>
              <li><strong>Clinical &amp; Admission Details:</strong> Age, primary substance of dependency (e.g., alcohol, opioids, cannabis, prescription sedatives), duration of dependency, and special requests such as 24/7 ambulance/doorstep pickup.</li>
              <li><strong>Self-Assessment Screener Inputs:</strong> Non-personally identifiable questionnaire answers evaluating addiction severity.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--accent-gold)', marginBottom: '0.85rem' }}>
              3. How We Use Collected Information
            </h2>
            <p style={{ color: 'var(--text-cream)', fontSize: '0.98rem', lineHeight: 1.7 }}>
              All submitted data is utilized exclusively for genuine medical and rehabilitation purposes:
            </p>
            <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: 1.8, marginTop: '0.6rem' }}>
              <li>Generating your unique confidential Admission User ID for status tracking.</li>
              <li>Coordinating immediate doctor consultation and medically monitored detoxification intake.</li>
              <li>Arranging discreet, safe 24x7 emergency pickup assistance from your residence.</li>
              <li>Communicating recovery milestones and counseling appointments with authorized family guardians.</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--accent-gold)', marginBottom: '0.85rem' }}>
              4. Cookies &amp; Session Authentication
            </h2>
            <p style={{ color: 'var(--text-cream)', fontSize: '0.98rem', lineHeight: 1.7 }}>
              Our platform uses secure, HTTP-only session cookies strictly required for authentication to the Patient Portal and Administrator Console. We do not employ third-party tracking pixels or intrusive advertising surveillance cookies.
            </p>
          </div>

          {/* Section 5 */}
          <div>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--accent-gold)', marginBottom: '0.85rem' }}>
              5. Data Security &amp; Encryption
            </h2>
            <p style={{ color: 'var(--text-cream)', fontSize: '0.98rem', lineHeight: 1.7 }}>
              We employ industry-standard cryptographic protocols including SSL/TLS HTTPS encryption in transit, parameterized database queries, role-based administrative access controls, and hashed password storage using bcrypt.
            </p>
          </div>

          {/* Section 6 */}
          <div>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--accent-gold)', marginBottom: '0.85rem' }}>
              6. Voluntary Recovery &amp; Ethics Notice
            </h2>
            <p style={{ color: 'var(--text-cream)', fontSize: '0.98rem', lineHeight: 1.7 }}>
              Mitrangan operates in adherence to Indian clinical standards, the Mental Healthcare Act, and the Digital Personal Data Protection Act (DPDPA). We strictly uphold patient dignity, physical safety, and ethical non-violent therapeutic practices.
            </p>
          </div>

          {/* Section 7 */}
          <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '1.5rem' }}>
            <h2 style={{ fontSize: '1.3rem', color: 'var(--text-ivory)', marginBottom: '0.75rem' }}>
              Contact Our Privacy &amp; Patient Grievance Officer
            </h2>
            <p style={{ color: 'var(--text-cream)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              If you have any questions regarding your confidential admission records, data protection, or wish to update your registered contact information, please contact us directly:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', color: 'var(--accent-gold)', fontSize: '0.92rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <MapPin size={16} />
                <span style={{ color: 'var(--text-cream)' }}>Mitrangan De-Addiction Center, Plot No. 7, Khangar Layout, Godhani, Nagpur – 441123</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Phone size={16} />
                <a href="tel:+919767362388" style={{ color: 'var(--accent-gold)', textDecoration: 'none' }}>+91 9767362388 (24/7 Helpline)</a>
              </div>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link href="/" className="btn btn-outline-gold">
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
