import React, { useState } from 'react';
import { Link } from 'wouter';
import { SEO, type FAQItem } from '../components/SEO';
import {
  FileText,
  ShieldCheck,
  Phone,
  HeartHandshake,
  Ambulance,
  Sparkles,
  ChevronDown,
  CheckCircle2,
  XCircle,
  Clock,
  Users,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

const ADMISSION_FAQS: FAQItem[] = [
  {
    question: "How fast can an emergency admission be arranged at Mitrangan Nagpur?",
    answer: "Emergency admissions can be coordinated within hours. Our 24/7 crisis dispatch team and admission desk operate round the clock. If emergency pickup is required, our ambulance team can deploy immediately across Nagpur and surrounding districts."
  },
  {
    question: "What legal documents are required during admission?",
    answer: "We require government-issued photo identification (Aadhaar Card, Voter ID, or Driving License) for both the patient and the primary family guardian/sponsor, along with 2 passport-size photographs and any prior medical prescription records."
  },
  {
    question: "How does the discrete emergency pickup service work?",
    answer: "Our trained crisis intervention team travels to your location in an unmarked, confidential vehicle equipped for medical transport. Our counselors handle the situation with dignity, calm de-escalation, and ensure the patient is safely escorted to our facility with family authorization."
  },
  {
    question: "When and how can families communicate with admitted patients?",
    answer: "During the first 7 to 14 days of acute detox, communication is restricted to allow physical stabilization and focus. After this initial stabilization phase, scheduled weekly counselor phone calls are set up, followed by supervised family counseling visits."
  },
  {
    question: "What is the fee structure and payment mode?",
    answer: "Mitrangan believes in total financial transparency with no hidden charges. Fees cover residential lodging, daily doctor visits, psychological therapy, 4 daily nutritious meals, yoga, and laundry. Flexible payment plans and online/UPI transfers are supported."
  }
];

export const AdmissionProcessPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div style={{ paddingTop: '7.5rem', paddingBottom: '6rem' }}>
      <SEO
        title="Admission Process & Rehab Guide | Nasha Mukti Kendra Nagpur | Mitrangan"
        description="Step-by-step admission process for Mitrangan Nasha Mukti Kendra Nagpur. Transparent admission criteria, documents needed, pickup service & family guidelines."
        canonicalPath="/admission-process"
        faqSchema={ADMISSION_FAQS}
      />

      {/* Hero Section */}
      <section className="container" style={{ marginBottom: '5rem' }}>
        <div style={{ maxWidth: '880px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <span className="section-tag">
              <FileText size={14} color="#D4AF37" />
              <span>Transparent &amp; Dignified Intake • Nagpur</span>
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.3rem, 5vw, 3.8rem)', lineHeight: 1.18, marginBottom: '1.5rem' }}>
            A Smooth, Respectful &amp; Confidential Admission Process
          </h1>

          <p style={{ color: 'var(--text-cream)', fontSize: '1.18rem', lineHeight: 1.75, marginBottom: '2.5rem' }}>
            Seeking help for a loved one is an emotional and courageous decision. At Mitrangan Nagpur, we have streamlined our admission process to be transparent, welcoming, and completely free of red tape.
          </p>

          {/* Key Trust Signals */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.25rem',
              justifyContent: 'center',
              marginBottom: '2.75rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-ivory)', fontSize: '0.95rem' }}>
              <Clock size={18} color="#D4AF37" />
              <span>24/7 Round-the-Clock Intake</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-ivory)', fontSize: '0.95rem' }}>
              <Ambulance size={18} color="#D4AF37" />
              <span>Discrete Home Pickup Available</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-ivory)', fontSize: '0.95rem' }}>
              <ShieldCheck size={18} color="#D4AF37" />
              <span>100% Medical Confidentiality</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <a
              href="tel:+919767362388"
              className="btn btn-gold"
              style={{ padding: '0.9rem 2.2rem', fontSize: '1.05rem', display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}
            >
              <Phone size={18} />
              <span>Admissions Desk: +91 9767362388</span>
            </a>
            <Link
              href="/register"
              className="btn btn-outline"
              style={{ padding: '0.9rem 2rem', fontSize: '1.05rem', display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}
            >
              <FileText size={18} />
              <span>Fill Online Admission Form</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4-Step Intake Journey */}
      <section className="container" style={{ marginBottom: '5rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3.5rem auto' }}>
          <span className="section-tag">Step-by-Step Pathway</span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.9rem)', marginBottom: '1rem' }}>
            How Admission Works: From Crisis to Care
          </h2>
          <p style={{ color: 'var(--text-cream)', fontSize: '1.05rem', lineHeight: 1.7 }}>
            Every step is designed to reduce family stress while ensuring the highest clinical standards of safety and comfort for the individual.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '1.75rem' }}>
          {/* Step 1 */}
          <div
            className="glass-panel"
            style={{
              padding: '2.25rem',
              borderRadius: '16px',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{ color: 'var(--accent-gold)', fontSize: '1.3rem', fontWeight: 700, fontFamily: 'var(--font-display)', marginBottom: '0.5rem' }}>
              STEP 01
            </div>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--text-ivory)', marginBottom: '0.85rem' }}>
              Confidential Consultation
            </h3>
            <p style={{ color: 'var(--text-cream)', fontSize: '0.92rem', lineHeight: 1.65, flex: 1 }}>
              Call our 24/7 admissions helpline or submit our confidential inquiry form. Our senior counselor discusses the substance history, medical background, family dynamics, and answers all logistical queries.
            </p>
            <div style={{ color: 'var(--accent-gold)', fontSize: '0.86rem', display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '1rem' }}>
              <Clock size={15} /> Immediate 10-Minute Assessment
            </div>
          </div>

          {/* Step 2 */}
          <div
            className="glass-panel"
            style={{
              padding: '2.25rem',
              borderRadius: '16px',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{ color: 'var(--accent-gold)', fontSize: '1.3rem', fontWeight: 700, fontFamily: 'var(--font-display)', marginBottom: '0.5rem' }}>
              STEP 02
            </div>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--text-ivory)', marginBottom: '0.85rem' }}>
              Transit &amp; Discrete Pickup
            </h3>
            <p style={{ color: 'var(--text-cream)', fontSize: '0.92rem', lineHeight: 1.65, flex: 1 }}>
              You may accompany your loved one directly to our Godhani, Nagpur campus, or request our 24/7 dedicated crisis pickup team to coordinate safe, compassionate transportation from anywhere in Maharashtra and Central India.
            </p>
            <div style={{ color: 'var(--accent-gold)', fontSize: '0.86rem', display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '1rem' }}>
              <Ambulance size={15} /> 24/7 Ambulance &amp; Escort
            </div>
          </div>

          {/* Step 3 */}
          <div
            className="glass-panel"
            style={{
              padding: '2.25rem',
              borderRadius: '16px',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{ color: 'var(--accent-gold)', fontSize: '1.3rem', fontWeight: 700, fontFamily: 'var(--font-display)', marginBottom: '0.5rem' }}>
              STEP 03
            </div>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--text-ivory)', marginBottom: '0.85rem' }}>
              Medical &amp; Legal Intake
            </h3>
            <p style={{ color: 'var(--text-cream)', fontSize: '0.92rem', lineHeight: 1.65, flex: 1 }}>
              On arrival, consulting physicians conduct a full physical examination, check vital signs, and initiate toxicology tests. Family sponsors complete simple legal consent paperwork and finalize room preferences.
            </p>
            <div style={{ color: 'var(--accent-gold)', fontSize: '0.86rem', display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '1rem' }}>
              <ShieldCheck size={15} /> Doctor &amp; Nursing Review
            </div>
          </div>

          {/* Step 4 */}
          <div
            className="glass-panel"
            style={{
              padding: '2.25rem',
              borderRadius: '16px',
              border: '1px solid var(--border-gold)',
              background: 'rgba(212, 175, 55, 0.04)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{ color: 'var(--accent-gold)', fontSize: '1.3rem', fontWeight: 700, fontFamily: 'var(--font-display)', marginBottom: '0.5rem' }}>
              STEP 04
            </div>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--text-ivory)', marginBottom: '0.85rem' }}>
              Settling In &amp; Orientation
            </h3>
            <p style={{ color: 'var(--text-cream)', fontSize: '0.92rem', lineHeight: 1.65, flex: 1 }}>
              The individual is settled into their residential room, introduced to their recovery buddy and lead counselor, and served fresh nutritious food. Immediate detox medical protocol begins without delay.
            </p>
            <div style={{ color: 'var(--accent-gold)', fontSize: '0.86rem', display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '1rem' }}>
              <HeartHandshake size={15} /> Compassionate Welcoming
            </div>
          </div>
        </div>
      </section>

      {/* Admission Checklist: Packing & Documentation */}
      <section className="container" style={{ marginBottom: '5rem' }}>
        <div
          className="glass-panel"
          style={{
            padding: 'clamp(2.5rem, 5vw, 4rem)',
            borderRadius: '20px',
            border: '1px solid var(--border-gold)'
          }}
        >
          <div style={{ maxWidth: '800px', margin: '0 auto 3rem auto', textAlign: 'center' }}>
            <span className="section-tag">Preparation Guide</span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 3.8vw, 2.7rem)', marginBottom: '1rem' }}>
              What to Bring &amp; Admission Checklist
            </h2>
            <p style={{ color: 'var(--text-cream)', fontSize: '1.05rem', lineHeight: 1.7 }}>
              To ensure safety and smooth functioning, please review the required documentation and packing guidelines before arrival.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {/* Required Documentation */}
            <div style={{ padding: '2rem', background: 'rgba(7, 18, 13, 0.75)', borderRadius: '14px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--accent-gold)', marginBottom: '1.25rem' }}>
                <FileText size={22} />
                <h3 style={{ fontSize: '1.25rem', margin: 0, color: 'var(--text-ivory)' }}>Required Documents</h3>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <li style={{ display: 'flex', gap: '0.6rem', fontSize: '0.92rem', color: 'var(--text-cream)' }}>
                  <CheckCircle2 size={18} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>Government Photo ID of Patient (Aadhaar Card, Voter ID, or Passport).</span>
                </li>
                <li style={{ display: 'flex', gap: '0.6rem', fontSize: '0.92rem', color: 'var(--text-cream)' }}>
                  <CheckCircle2 size={18} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>Government Photo ID of Primary Family Guardian / Sponsor.</span>
                </li>
                <li style={{ display: 'flex', gap: '0.6rem', fontSize: '0.92rem', color: 'var(--text-cream)' }}>
                  <CheckCircle2 size={18} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>Prior medical prescriptions, psychiatric records, or diagnostic reports (if any).</span>
                </li>
                <li style={{ display: 'flex', gap: '0.6rem', fontSize: '0.92rem', color: 'var(--text-cream)' }}>
                  <CheckCircle2 size={18} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>2 passport-size photographs of the patient.</span>
                </li>
              </ul>
            </div>

            {/* Allowed Clothing & Essentials */}
            <div style={{ padding: '2rem', background: 'rgba(7, 18, 13, 0.75)', borderRadius: '14px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--accent-gold)', marginBottom: '1.25rem' }}>
                <CheckCircle2 size={22} />
                <h3 style={{ fontSize: '1.25rem', margin: 0, color: 'var(--text-ivory)' }}>Permitted Personal Items</h3>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <li style={{ display: 'flex', gap: '0.6rem', fontSize: '0.92rem', color: 'var(--text-cream)' }}>
                  <CheckCircle2 size={18} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>4 to 5 sets of comfortable, modest daily clothing (kurta-pajama, t-shirts, track pants).</span>
                </li>
                <li style={{ display: 'flex', gap: '0.6rem', fontSize: '0.92rem', color: 'var(--text-cream)' }}>
                  <CheckCircle2 size={18} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>1 pair of comfortable walking shoes and 1 pair of bathroom slippers.</span>
                </li>
                <li style={{ display: 'flex', gap: '0.6rem', fontSize: '0.92rem', color: 'var(--text-cream)' }}>
                  <CheckCircle2 size={18} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>Personal hygiene essentials (toothbrush, comb, towel).</span>
                </li>
                <li style={{ display: 'flex', gap: '0.6rem', fontSize: '0.92rem', color: 'var(--text-cream)' }}>
                  <CheckCircle2 size={18} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>Inspirational books, notebooks, or personal religious scriptures.</span>
                </li>
              </ul>
            </div>

            {/* Strictly Prohibited Items */}
            <div style={{ padding: '2rem', background: 'rgba(239, 68, 68, 0.05)', borderRadius: '14px', border: '1px solid rgba(239, 68, 68, 0.25)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#EF4444', marginBottom: '1.25rem' }}>
                <ShieldAlert size={22} />
                <h3 style={{ fontSize: '1.25rem', margin: 0, color: 'var(--text-ivory)' }}>Strictly Prohibited</h3>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <li style={{ display: 'flex', gap: '0.6rem', fontSize: '0.92rem', color: 'var(--text-cream)' }}>
                  <XCircle size={18} color="#EF4444" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>All alcohol, tobacco, gutka, paan masala, or illicit substances.</span>
                </li>
                <li style={{ display: 'flex', gap: '0.6rem', fontSize: '0.92rem', color: 'var(--text-cream)' }}>
                  <XCircle size={18} color="#EF4444" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>Personal mobile phones, laptops, and smartwatches (safely inventoried).</span>
                </li>
                <li style={{ display: 'flex', gap: '0.6rem', fontSize: '0.92rem', color: 'var(--text-cream)' }}>
                  <XCircle size={18} color="#EF4444" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>Cash, expensive jewelry, gold chains, or high-value electronics.</span>
                </li>
                <li style={{ display: 'flex', gap: '0.6rem', fontSize: '0.92rem', color: 'var(--text-cream)' }}>
                  <XCircle size={18} color="#EF4444" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>Sharp objects, scissors, razors, glass bottles, or matches/lighters.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Localized FAQ Section with Schema Sync */}
      <section className="container" style={{ marginBottom: '5rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3rem auto' }}>
          <span className="section-tag">Clarity for Families</span>
          <h2 style={{ fontSize: 'clamp(2rem, 3.8vw, 2.7rem)', marginBottom: '0.85rem' }}>
            Frequently Asked Questions: Admission &amp; Center Policies
          </h2>
          <p style={{ color: 'var(--text-cream)', fontSize: '1.02rem', lineHeight: 1.65 }}>
            Direct answers regarding timelines, family visits, fees, and privacy.
          </p>
        </div>

        <div style={{ maxWidth: '840px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {ADMISSION_FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="glass-panel"
                style={{
                  border: isOpen ? '1px solid var(--border-gold)' : '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease'
                }}
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '1.35rem 1.6rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    background: isOpen ? 'rgba(212, 175, 55, 0.05)' : 'transparent',
                    border: 'none',
                    color: 'var(--text-ivory)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '1.05rem',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600
                  }}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    size={20}
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                      transition: 'transform 0.3s ease',
                      flexShrink: 0,
                      color: 'var(--accent-gold)'
                    }}
                  />
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: '0 1.6rem 1.4rem 1.6rem',
                      color: 'var(--text-cream)',
                      fontSize: '0.96rem',
                      lineHeight: 1.7,
                      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                      paddingTop: '1rem'
                    }}
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Direct Admission CTA Banner */}
      <section className="container">
        <div
          style={{
            padding: 'clamp(2.5rem, 5vw, 4rem)',
            background: 'linear-gradient(135deg, rgba(28, 72, 55, 0.7) 0%, rgba(11, 30, 23, 0.95) 100%)',
            border: '1px solid var(--border-gold)',
            borderRadius: '20px',
            textAlign: 'center'
          }}
        >
          <span className="section-tag" style={{ background: 'rgba(212, 175, 55, 0.15)' }}>
            Start Today
          </span>
          <h3 style={{ fontSize: 'clamp(1.9rem, 3.8vw, 2.7rem)', color: 'var(--text-ivory)', margin: '1rem 0' }}>
            We Are Here to Guide You Every Step of the Way
          </h3>
          <p style={{ color: 'var(--text-cream)', fontSize: '1.08rem', maxWidth: '680px', margin: '0 auto 2.25rem auto', lineHeight: 1.7 }}>
            Speak directly with our admissions coordinator or begin your registration online. Confidentiality is strictly protected.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <a
              href="tel:+919767362388"
              className="btn btn-gold"
              style={{ padding: '0.9rem 2.2rem', fontSize: '1.05rem', display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}
            >
              <Phone size={18} />
              <span>Call Admissions: +91 9767362388</span>
            </a>
            <Link
              href="/register"
              className="btn btn-outline"
              style={{ padding: '0.9rem 2rem', fontSize: '1.05rem', display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}
            >
              <HeartHandshake size={18} />
              <span>Submit Admission Form Online</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
