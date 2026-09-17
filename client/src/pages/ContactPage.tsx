import React, { useState } from 'react';
import { MITRANGAN_CENTERS } from '../content/siteContent';
import { SEO } from '../components/SEO';
import { Phone, Mail, MapPin, CheckCircle2, Clock, Send, MessageSquare, MessageCircle, Navigation } from 'lucide-react';
import { Link } from 'wouter';
import { LocalCatchmentSection } from '../components/home/LocalCatchmentSection';

export const ContactPage: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    center: 'Nagpur',
    message: ''
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
      <SEO
        title="Contact Nasha Mukti Kendra Nagpur | 24/7 Emergency Helpline"
        description="Get in touch with our 24/7 de-addiction helpline in Nagpur. Located at Godhani, Nagpur. Call +91 9767362388 for confidential addiction guidance and ambulance pickup."
        canonicalPath="/contact"
      />
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 4.5rem auto' }}>
          <span className="section-tag">Direct Confidential Support</span>
          <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', marginBottom: '1.25rem' }}>
            Get In Touch With Mitrangan
          </h1>
          <p style={{ color: 'var(--text-cream)', fontSize: '1.15rem', lineHeight: 1.7 }}>
            Reach out to us for any queries, admission support, or emergency pickup requests. We are here 24 hours a day, 7 days a week to help rebuild lives with dignity and care.
          </p>
        </div>

        {/* Center Details */}
        <div style={{ maxWidth: '680px', margin: '0 auto 4.5rem auto' }}>
          {MITRANGAN_CENTERS.map((center, idx) => (
            <div key={idx} className="glass-panel-gold" style={{ padding: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-gold)', marginBottom: '0.75rem' }}>
                <MapPin size={20} />
                <span style={{ fontFamily: 'var(--font-display)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, fontSize: '0.88rem' }}>
                  {center.city} Center
                </span>
              </div>

              <h3 style={{ fontSize: '1.6rem', color: 'var(--text-ivory)', marginBottom: '1rem' }}>
                {center.name}
              </h3>

              <p style={{ color: 'var(--text-cream)', fontSize: '0.96rem', lineHeight: 1.6, marginBottom: '1.75rem' }}>
                {center.address}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
                <a href={`tel:${center.phone}`} style={{ color: 'var(--text-ivory)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '1.02rem', fontWeight: 600 }}>
                  <Phone size={18} color="var(--accent-gold)" />
                  <span>{center.phoneDisplay}</span>
                </a>

                <a href={`mailto:${center.email}`} style={{ color: 'var(--text-cream)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.92rem' }}>
                  <Mail size={18} color="var(--accent-gold)" />
                  <span>{center.email}</span>
                </a>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.9rem', color: '#10B981' }}>
                  <Clock size={18} />
                  <span>24/7 Intake &amp; Admission Service</span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <a href={`tel:${center.phone}`} className="btn btn-emerald" style={{ width: '100%', padding: '0.75rem 0.5rem', justifyContent: 'center' }}>
                  <Phone size={16} />
                  <span>Call {center.city}</span>
                </a>
                <a
                  href={`https://wa.me/${center.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello Mitrangan ${center.city} Center, I would like to inquire about rehabilitation admission.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                  style={{ width: '100%', padding: '0.75rem 0.5rem', justifyContent: 'center' }}
                >
                  <MessageCircle size={16} />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Form and 24x7 Pickup Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'flex-start' }}>
          {/* Left Column: 24/7 Pickup Information */}
          <div>
            <span className="section-tag">Emergency Logistics</span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.5rem)', marginBottom: '1.25rem' }}>
              24x7 Emergency Pickup Service
            </h2>
            <p style={{ color: 'var(--text-cream)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Families often face situations where an individual struggling with severe chemical dependency or withdrawal cannot safely travel on their own. Mitrangan operates discrete, safe pickup support across Maharashtra and surrounding regions.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', padding: '1rem', background: 'rgba(7, 18, 13, 0.7)', borderRadius: '10px', border: '1px solid var(--border-glass)' }}>
                <CheckCircle2 size={18} color="#10B981" style={{ flexShrink: 0, marginTop: '3px' }} />
                <div>
                  <strong style={{ color: 'var(--text-ivory)', display: 'block', fontSize: '0.95rem' }}>Dignified &amp; Non-Violent Approach</strong>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Trained medical and counseling staff escort the resident respectfully without coercion.</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', padding: '1rem', background: 'rgba(7, 18, 13, 0.7)', borderRadius: '10px', border: '1px solid var(--border-glass)' }}>
                <CheckCircle2 size={18} color="#10B981" style={{ flexShrink: 0, marginTop: '3px' }} />
                <div>
                  <strong style={{ color: 'var(--text-ivory)', display: 'block', fontSize: '0.95rem' }}>Full Medical Oversight</strong>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Equipped for immediate stabilization during transportation.</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/register" className="btn btn-gold" style={{ padding: '0.85rem 1.8rem' }}>
                <span>Submit Admission with Pickup</span>
              </Link>
              <a
                href="https://wa.me/919767362388?text=Hello%20Mitrangan,%20I%20urgently%20require%20doorstep%20pickup%20assistance."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
                style={{ padding: '0.85rem 1.5rem' }}
              >
                <MessageCircle size={16} />
                <span>WhatsApp Pickup SOS</span>
              </a>
            </div>
          </div>

          {/* Right Column: Direct Message Form */}
          <div className="glass-panel" style={{ padding: 'clamp(1.75rem, 4vw, 2.75rem)', border: '1px solid var(--border-gold)' }}>
            <h3 style={{ fontSize: '1.6rem', color: 'var(--text-ivory)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MessageSquare size={22} color="var(--accent-gold)" />
              <span>Send Us a Confidential Message</span>
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.75rem' }}>
              We aim to respond promptly to all inquiries and support requests.
            </p>

            {formSubmitted ? (
              <div
                style={{
                  padding: '2rem',
                  textAlign: 'center',
                  background: 'rgba(16, 185, 129, 0.1)',
                  borderRadius: '12px',
                  border: '1px solid rgba(16, 185, 129, 0.3)'
                }}
              >
                <CheckCircle2 size={38} color="#10B981" style={{ margin: '0 auto 0.75rem auto' }} />
                <h4 style={{ fontSize: '1.3rem', color: 'var(--text-ivory)', marginBottom: '0.5rem' }}>
                  Message Transmitted
                </h4>
                <p style={{ color: 'var(--text-cream)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                  Thank you for reaching out. A Mitrangan counselor will review your message and reach out confidentially.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit}>
                <div className="form-group">
                  <label className="form-label">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ankit"
                    className="form-input"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Contact Mobile / Phone</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9767362388"
                    className="form-input"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Message / Inquiry Details</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="How can we assist you or your family member?"
                    className="form-textarea"
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn btn-gold" style={{ width: '100%', padding: '0.9rem', fontSize: '1rem' }}>
                  <Send size={16} />
                  <span>Send Confidential Message</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Google Map & Transit Guidance Section */}
        <div style={{ marginTop: '5rem' }}>
          <div
            className="glass-panel"
            style={{
              padding: 'clamp(2rem, 4vw, 3.5rem)',
              borderRadius: '20px',
              border: '1px solid var(--border-gold)',
              overflow: 'hidden'
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'center' }}>
              <div>
                <span className="section-tag">
                  <MapPin size={14} color="#D4AF37" />
                  <span>Physical Center &amp; Navigation</span>
                </span>
                <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', margin: '0.85rem 0' }}>
                  Locate Our Nagpur Center
                </h2>
                <p style={{ color: 'var(--text-cream)', fontSize: '1rem', lineHeight: 1.65, marginBottom: '1.75rem' }}>
                  Conveniently situated in Godhani, North Nagpur, in a tranquil, recovery-oriented residential atmosphere far from urban chaos and substance temptations.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <MapPin size={20} color="var(--accent-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <strong style={{ color: 'var(--text-ivory)', display: 'block', fontSize: '0.96rem' }}>Center Address</strong>
                      <span style={{ color: 'var(--text-cream)', fontSize: '0.88rem', lineHeight: 1.5 }}>
                        Plot no. 7, Manasvi Multi-speciality Hospital, Khangar Layout, Opp. Satyam Garden, Godhani, Nagpur – 441123, Maharashtra
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <Navigation size={20} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <strong style={{ color: 'var(--text-ivory)', display: 'block', fontSize: '0.96rem' }}>Transit &amp; Landmarks</strong>
                      <span style={{ color: 'var(--text-cream)', fontSize: '0.88rem', lineHeight: 1.5 }}>
                        • Godhani Railway Station: ~2.2 km (5 mins)<br />
                        • Nagpur Junction Railway Station: ~9.5 km (25 mins)<br />
                        • Nagpur International Airport (NAG): ~18 km (35 mins)<br />
                        • Landmark: Directly opposite Satyam Garden, Khangar Layout
                      </span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <a
                    href="https://maps.google.com/?q=Plot+No.+7,+Manasvi+Multi-speciality+Hospital,+Khangar+Layout,+Opp.+Satyam+Garden,+Godhani,+Nagpur"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-gold"
                    style={{ padding: '0.8rem 1.6rem', fontSize: '0.95rem' }}
                  >
                    <Navigation size={16} />
                    <span>Open in Google Maps</span>
                  </a>
                  <a
                    href="tel:+919767362388"
                    className="btn btn-outline"
                    style={{ padding: '0.8rem 1.6rem', fontSize: '0.95rem' }}
                  >
                    <Phone size={16} />
                    <span>Call for Driving Directions</span>
                  </a>
                </div>
              </div>

              {/* Responsive Google Maps Iframe */}
              <div
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid var(--border-glass)',
                  boxShadow: '0 12px 35px rgba(0, 0, 0, 0.5)',
                  height: '380px',
                  width: '100%',
                  background: 'rgba(7, 18, 13, 0.9)'
                }}
              >
                <iframe
                  title="Mitrangan Nasha Mukti Kendra Nagpur Google Map"
                  src="https://maps.google.com/maps?q=Plot+No.+7,+Manasvi+Multi-speciality+Hospital,+Khangar+Layout,+Opp.+Satyam+Garden,+Godhani,+Nagpur&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'contrast(1.05) saturate(1.1)' }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Local Catchment & Emergency Response Network */}
      <div style={{ marginTop: '2rem' }}>
        <LocalCatchmentSection />
      </div>
    </div>
  );
};
