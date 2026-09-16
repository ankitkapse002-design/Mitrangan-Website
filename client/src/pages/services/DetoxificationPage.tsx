import React, { useState } from 'react';
import { Link } from 'wouter';
import { SEO, type FAQItem } from '../../components/SEO';
import {
  Activity,
  ShieldCheck,
  Phone,
  HeartHandshake,
  Stethoscope,
  Sparkles,
  ChevronDown,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  HeartPulse,
  ArrowRight
} from 'lucide-react';

const DETOX_FAQS: FAQItem[] = [
  {
    question: "Why is self-detox or 'Cold Turkey' quitting dangerous at home?",
    answer: "Abruptly quitting alcohol or heavy sedatives without medical supervision can provoke life-threatening complications including Delirium Tremens (DTs), grand mal seizures, severe electrolyte depletion, and cardiac arrhythmias. Medical detox at Mitrangan ensures constant physiological oversight and medication to suppress these risks safely."
  },
  {
    question: "How many days does the medical detox process take in Nagpur?",
    answer: "The acute medical detoxification phase typically lasts between 5 to 10 days depending on the substance, dosage, and patient's physical health. Once vitals and sleep patterns stabilize, the patient transitions into the psychological therapy phase."
  },
  {
    question: "Are medications used during detoxification addictive?",
    answer: "No. The medications prescribed by our consulting physicians are strictly clinical, non-addictive stabilization agents (such as tapering sedatives, anti-emetics, neuro-protectants, and high-dose vitamin B-complex infusions) designed purely to ease acute withdrawal symptoms."
  },
  {
    question: "What emergency medical tie-ups exist for critical complications?",
    answer: "While our in-house medical staff manages standard withdrawal, Mitrangan maintains active tie-ups with leading tertiary hospitals and 24/7 cardiac ICU facilities in Nagpur for immediate transfer via dedicated ambulance in the rare event of acute complications."
  },
  {
    question: "Is detox alone sufficient to stay sober permanently?",
    answer: "Detox cleanses the physical body, but does not cure the psychological addiction. Without comprehensive counseling, behavioral therapy, and relapse prevention, the probability of relapse within 30 days is over 80%. Detox must always be followed by structured rehabilitation."
  }
];

export const DetoxificationPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div style={{ paddingTop: '7.5rem', paddingBottom: '6rem' }}>
      <SEO
        title="Medical Detoxification Centre in Nagpur | Supervised Detox & Withdrawal | Mitrangan"
        description="Safe, 24/7 medically supervised alcohol & drug detox in Nagpur. Clinical vital monitoring, withdrawal pain relief, safe tapering, and ICU hospital tie-ups."
        canonicalPath="/services/detoxification-support"
        faqSchema={DETOX_FAQS}
      />

      {/* Hero Section */}
      <section className="container" style={{ marginBottom: '5rem' }}>
        <div style={{ maxWidth: '880px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <span className="section-tag">
              <Stethoscope size={14} color="#D4AF37" />
              <span>24/7 Physician-Supervised Clinical Detox • Nagpur</span>
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.3rem, 5vw, 3.8rem)', lineHeight: 1.18, marginBottom: '1.5rem' }}>
            Medically Supervised Detoxification &amp; Withdrawal Management
          </h1>

          <p style={{ color: 'var(--text-cream)', fontSize: '1.18rem', lineHeight: 1.75, marginBottom: '2.5rem' }}>
            Safely cleanse the body from toxic substances without agony or danger. Our clinical team in Godhani, Nagpur provides around-the-clock vital monitoring, pain management, and nutritional rehydration.
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
              <HeartPulse size={18} color="#D4AF37" />
              <span>Continuous Vital &amp; ECG Monitoring</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-ivory)', fontSize: '0.95rem' }}>
              <ShieldCheck size={18} color="#D4AF37" />
              <span>Tertiary Hospital &amp; ICU Tie-Ups</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-ivory)', fontSize: '0.95rem' }}>
              <Sparkles size={18} color="#D4AF37" />
              <span>Non-Addictive Comfort Medication</span>
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
              <span>Call Detox Helpline: +91 9767362388</span>
            </a>
            <Link
              href="/register"
              className="btn btn-outline"
              style={{ padding: '0.9rem 2rem', fontSize: '1.05rem', display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}
            >
              <HeartHandshake size={18} />
              <span>Book Medical Assessment</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Cold Turkey vs Medically Managed Detox Comparison Table */}
      <section className="container" style={{ marginBottom: '5rem' }}>
        <div
          className="glass-panel"
          style={{
            padding: 'clamp(2rem, 4vw, 3.5rem)',
            borderRadius: '20px',
            border: '1px solid var(--border-gold)'
          }}
        >
          <div style={{ maxWidth: '800px', margin: '0 auto 3rem auto', textAlign: 'center' }}>
            <span className="section-tag">Clinical Comparison</span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 3.8vw, 2.7rem)', marginBottom: '1rem' }}>
              Why Home "Cold Turkey" Quitting Is High-Risk
            </h2>
            <p style={{ color: 'var(--text-cream)', fontSize: '1.05rem', lineHeight: 1.7 }}>
              Withdrawal is an intense physiological shock. See how unassisted withdrawal compares against medically managed clinical detox at Mitrangan.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {/* Unassisted */}
            <div
              style={{
                padding: '2rem',
                borderRadius: '14px',
                background: 'rgba(239, 68, 68, 0.06)',
                border: '1px solid rgba(239, 68, 68, 0.25)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#EF4444', marginBottom: '1.25rem' }}>
                <XCircle size={24} />
                <h3 style={{ fontSize: '1.3rem', margin: 0, color: 'var(--text-ivory)' }}>Unassisted / Home Detox</h3>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li style={{ display: 'flex', gap: '0.6rem', fontSize: '0.92rem', color: 'var(--text-cream)' }}>
                  <span style={{ color: '#EF4444' }}>✕</span>
                  <span>High risk of grand mal seizures and heart arrhythmias.</span>
                </li>
                <li style={{ display: 'flex', gap: '0.6rem', fontSize: '0.92rem', color: 'var(--text-cream)' }}>
                  <span style={{ color: '#EF4444' }}>✕</span>
                  <span>Severe delirium tremens, hallucinations, and suicidal agitation.</span>
                </li>
                <li style={{ display: 'flex', gap: '0.6rem', fontSize: '0.92rem', color: 'var(--text-cream)' }}>
                  <span style={{ color: '#EF4444' }}>✕</span>
                  <span>Extreme physical agony leading to relapse within 24–48 hours.</span>
                </li>
                <li style={{ display: 'flex', gap: '0.6rem', fontSize: '0.92rem', color: 'var(--text-cream)' }}>
                  <span style={{ color: '#EF4444' }}>✕</span>
                  <span>Zero medical monitoring or professional emergency escalation.</span>
                </li>
              </ul>
            </div>

            {/* Medically Supervised */}
            <div
              style={{
                padding: '2rem',
                borderRadius: '14px',
                background: 'rgba(16, 185, 129, 0.08)',
                border: '1px solid rgba(16, 185, 129, 0.35)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#10B981', marginBottom: '1.25rem' }}>
                <CheckCircle2 size={24} />
                <h3 style={{ fontSize: '1.3rem', margin: 0, color: 'var(--text-ivory)' }}>Mitrangan Medical Detox</h3>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li style={{ display: 'flex', gap: '0.6rem', fontSize: '0.92rem', color: 'var(--text-cream)' }}>
                  <span style={{ color: '#10B981' }}>✓</span>
                  <span>24/7 nursing and vital monitoring to preempt seizure spikes.</span>
                </li>
                <li style={{ display: 'flex', gap: '0.6rem', fontSize: '0.92rem', color: 'var(--text-cream)' }}>
                  <span style={{ color: '#10B981' }}>✓</span>
                  <span>Doctor-prescribed comfort medications eliminate agonizing symptoms.</span>
                </li>
                <li style={{ display: 'flex', gap: '0.6rem', fontSize: '0.92rem', color: 'var(--text-cream)' }}>
                  <span style={{ color: '#10B981' }}>✓</span>
                  <span>Electrolyte IV therapy and neuro-nutritional rebuilding.</span>
                </li>
                <li style={{ display: 'flex', gap: '0.6rem', fontSize: '0.92rem', color: 'var(--text-cream)' }}>
                  <span style={{ color: '#10B981' }}>✓</span>
                  <span>Immediate hospital ICU transfer tie-up for high-risk patients.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step Clinical Protocol */}
      <section className="container" style={{ marginBottom: '5rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3.5rem auto' }}>
          <span className="section-tag">Medical Roadmap</span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.9rem)', marginBottom: '1rem' }}>
            Our 3-Step Medical Detoxification Protocol
          </h2>
          <p style={{ color: 'var(--text-cream)', fontSize: '1.05rem', lineHeight: 1.7 }}>
            A methodical, dignified transition from toxic dependence to neurochemical baseline stabilization.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.75rem' }}>
          <div
            className="glass-panel"
            style={{
              padding: '2.25rem',
              borderRadius: '16px',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <div style={{ color: 'var(--accent-gold)', fontSize: '1.25rem', fontWeight: 700, fontFamily: 'var(--font-display)', marginBottom: '0.5rem' }}>
              STEP 01
            </div>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--text-ivory)', marginBottom: '0.85rem' }}>
              Clinical &amp; Biochemical Intake
            </h3>
            <p style={{ color: 'var(--text-cream)', fontSize: '0.92rem', lineHeight: 1.65 }}>
              On arrival, consulting medical officers perform an extensive health screening: toxicology panel, liver enzyme status, baseline ECG, and vital signs assessment to define the precise detox tapering regimen.
            </p>
          </div>

          <div
            className="glass-panel"
            style={{
              padding: '2.25rem',
              borderRadius: '16px',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <div style={{ color: 'var(--accent-gold)', fontSize: '1.25rem', fontWeight: 700, fontFamily: 'var(--font-display)', marginBottom: '0.5rem' }}>
              STEP 02
            </div>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--text-ivory)', marginBottom: '0.85rem' }}>
              Symptom Tapering &amp; Hydration
            </h3>
            <p style={{ color: 'var(--text-cream)', fontSize: '0.92rem', lineHeight: 1.65 }}>
              Continuous administration of medically calibrated oral medications and IV fluids to neutralize tremors, nausea, insomnia, and tachycardia. Our nursing team monitors vital parameters every 2 to 4 hours.
            </p>
          </div>

          <div
            className="glass-panel"
            style={{
              padding: '2.25rem',
              borderRadius: '16px',
              border: '1px solid var(--border-gold)',
              background: 'rgba(212, 175, 55, 0.04)'
            }}
          >
            <div style={{ color: 'var(--accent-gold)', fontSize: '1.25rem', fontWeight: 700, fontFamily: 'var(--font-display)', marginBottom: '0.5rem' }}>
              STEP 03
            </div>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--text-ivory)', marginBottom: '0.85rem' }}>
              Transition to Active Rehabilitation
            </h3>
            <p style={{ color: 'var(--text-cream)', fontSize: '0.92rem', lineHeight: 1.65 }}>
              Once the patient is physically stable and thinking clearly (typically Day 7–10), they graduate smoothly from the detox ward into the active psychological counseling and holistic wellness curriculum.
            </p>
          </div>
        </div>
      </section>

      {/* Localized FAQ Section with Schema Sync */}
      <section className="container" style={{ marginBottom: '5rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3rem auto' }}>
          <span className="section-tag">Clinical Answers</span>
          <h2 style={{ fontSize: 'clamp(2rem, 3.8vw, 2.7rem)', marginBottom: '0.85rem' }}>
            Frequently Asked Questions: Detoxification in Nagpur
          </h2>
          <p style={{ color: 'var(--text-cream)', fontSize: '1.02rem', lineHeight: 1.65 }}>
            Medical insights into safety, medications, hospital backups, and withdrawal care.
          </p>
        </div>

        <div style={{ maxWidth: '840px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {DETOX_FAQS.map((faq, idx) => {
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

      {/* Emergency CTA Banner */}
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
            Safe Clinical Oversight
          </span>
          <h3 style={{ fontSize: 'clamp(1.9rem, 3.8vw, 2.7rem)', color: 'var(--text-ivory)', margin: '1rem 0' }}>
            Do Not Risk Withdrawal Alone. Get Safe Medical Detox Support.
          </h3>
          <p style={{ color: 'var(--text-cream)', fontSize: '1.08rem', maxWidth: '680px', margin: '0 auto 2.25rem auto', lineHeight: 1.7 }}>
            Our medical team is ready 24 hours a day to stabilize acute withdrawal and provide immediate relief. Emergency ambulance dispatch available.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <a
              href="tel:+919767362388"
              className="btn btn-gold"
              style={{ padding: '0.9rem 2.2rem', fontSize: '1.05rem', display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}
            >
              <Phone size={18} />
              <span>Call 24/7 Helpline: +91 9767362388</span>
            </a>
            <Link
              href="/register"
              className="btn btn-outline"
              style={{ padding: '0.9rem 2rem', fontSize: '1.05rem', display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}
            >
              <HeartHandshake size={18} />
              <span>Schedule Intake Assessment</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
