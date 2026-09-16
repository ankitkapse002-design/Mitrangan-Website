import React, { useState } from 'react';
import { Link } from 'wouter';
import { SEO, type FAQItem } from '../../components/SEO';
import {
  ShieldAlert,
  ShieldCheck,
  Phone,
  HeartHandshake,
  Brain,
  Sparkles,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  Clock,
  Layers,
  Activity,
  ArrowRight
} from 'lucide-react';

const DRUG_FAQS: FAQItem[] = [
  {
    question: "What types of drug addictions are treated at Mitrangan Nagpur?",
    answer: "We treat dependencies on opioids (Brown Sugar, Heroin), cannabis (Ganja, Charas, Hashish), synthetic narcotics (MDMA, Mephedrone/Meow Meow), prescription pharmaceuticals (alprazolam, tramadol, codeine cough syrups), and inhalants."
  },
  {
    question: "How do you handle severe withdrawal cravings from Brown Sugar or Opioids?",
    answer: "Opioid withdrawal can be agonizing with intense bone aches, nausea, insomnia, and chills. Our medical team administers supervised clinical tapering protocols, non-addictive comfort medications, and continuous electrolyte support to make the detox phase safe, humane, and tolerable."
  },
  {
    question: "What is Dual Diagnosis treatment in drug rehabilitation?",
    answer: "More than 60% of drug addiction cases are accompanied by co-occurring mental health challenges like clinical depression, generalized anxiety, PTSD, or bipolar disorder. Our psychiatric team diagnoses and treats the underlying emotional pain simultaneously with the addiction."
  },
  {
    question: "Can an unwilling family member be admitted for drug rehabilitation?",
    answer: "Many individuals struggling with deep addiction suffer from severe denial. We offer professional crisis intervention and 24/7 discrete emergency pickup. Our counselors visit the home and use motivational interviewing to calmly de-escalate hostility and safely escort the individual to the centre with full legal family consent."
  },
  {
    question: "What security and surveillance measures protect patients?",
    answer: "Our Nagpur campus operates under 24/7 secure surveillance with trained wardens and strictly controlled access. No prohibited substances, phones, or unauthorized contacts are permitted inside, guaranteeing a 100% drug-free healing sanctuary."
  }
];

export const DrugRehabilitationPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div style={{ paddingTop: '7.5rem', paddingBottom: '6rem' }}>
      <SEO
        title="Drug Rehabilitation Centre in Nagpur | Substance Abuse Treatment | Mitrangan"
        description="Premier drug rehabilitation centre in Nagpur for brown sugar, charas, ganja, MDMA, opioid & synthetic drug de-addiction. Dual diagnosis care & 24/7 pickup."
        canonicalPath="/services/drug-rehabilitation"
        faqSchema={DRUG_FAQS}
      />

      {/* Hero Section */}
      <section className="container" style={{ marginBottom: '5rem' }}>
        <div style={{ maxWidth: '880px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <span className="section-tag">
              <ShieldAlert size={14} color="#D4AF37" />
              <span>Evidence-Based Substance Rehabilitation • Nagpur</span>
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.3rem, 5vw, 3.8rem)', lineHeight: 1.18, marginBottom: '1.5rem' }}>
            Specialized Drug &amp; Substance Abuse Treatment in Nagpur
          </h1>

          <p style={{ color: 'var(--text-cream)', fontSize: '1.18rem', lineHeight: 1.75, marginBottom: '2.5rem' }}>
            Compassionate, medically supervised recovery for opioid, cannabis, synthetic, and prescription drug dependence. Reclaim mental clarity, emotional health, and family dignity in Godhani, Nagpur.
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
              <ShieldCheck size={18} color="#D4AF37" />
              <span>100% Drug-Free Secure Environment</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-ivory)', fontSize: '0.95rem' }}>
              <Brain size={18} color="#D4AF37" />
              <span>Dual-Diagnosis Psychiatric Care</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-ivory)', fontSize: '0.95rem' }}>
              <Sparkles size={18} color="#D4AF37" />
              <span>24/7 Discrete Ambulance Escort</span>
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
              <span>Urgent Assistance: +91 9767362388</span>
            </a>
            <Link
              href="/register"
              className="btn btn-outline"
              style={{ padding: '0.9rem 2rem', fontSize: '1.05rem', display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}
            >
              <HeartHandshake size={18} />
              <span>Confidential Online Intake</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Substances Treated Matrix */}
      <section className="container" style={{ marginBottom: '5rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3.5rem auto' }}>
          <span className="section-tag">Targeted Modalities</span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.9rem)', marginBottom: '1rem' }}>
            Substances We Treat at Mitrangan
          </h2>
          <p style={{ color: 'var(--text-cream)', fontSize: '1.05rem', lineHeight: 1.7 }}>
            Different substances interact with distinct neural pathways. Our clinical detox protocols are customized to the exact pharmacological profile of each drug.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.75rem' }}>
          {/* Substance 1 */}
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
            <div style={{ color: 'var(--accent-gold)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              Opioid &amp; Brown Sugar
            </div>
            <h3 style={{ fontSize: '1.35rem', color: 'var(--text-ivory)', marginBottom: '0.85rem' }}>
              Heroin, Brown Sugar &amp; Opioids
            </h3>
            <p style={{ color: 'var(--text-cream)', fontSize: '0.92rem', lineHeight: 1.65, marginBottom: '1.25rem', flex: 1 }}>
              Opioid addiction leads to rapid physiological tolerance and intense withdrawal agony. Our specialized tapering and non-addictive symptom relief shields patients from extreme withdrawal discomfort.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <CheckCircle2 size={15} color="#D4AF37" /> Bone Ache &amp; Restless Leg Relief
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <CheckCircle2 size={15} color="#D4AF37" /> Neurochemical Receptor Stabilization
              </li>
            </ul>
          </div>

          {/* Substance 2 */}
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
            <div style={{ color: 'var(--accent-gold)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              Cannabis &amp; Synthetic Cannabinoids
            </div>
            <h3 style={{ fontSize: '1.35rem', color: 'var(--text-ivory)', marginBottom: '0.85rem' }}>
              Ganja, Charas &amp; Weed
            </h3>
            <p style={{ color: 'var(--text-cream)', fontSize: '0.92rem', lineHeight: 1.65, marginBottom: '1.25rem', flex: 1 }}>
              Chronic cannabis abuse frequently triggers severe amotivational syndrome, memory impairment, paranoia, and latent psychiatric disorders. We rebuild focus and cognitive clarity.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <CheckCircle2 size={15} color="#D4AF37" /> Paranoia &amp; Anxiety De-escalation
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <CheckCircle2 size={15} color="#D4AF37" /> Dopamine &amp; Motivation Restoration
              </li>
            </ul>
          </div>

          {/* Substance 3 */}
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
            <div style={{ color: 'var(--accent-gold)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              Synthetic Stimulants
            </div>
            <h3 style={{ fontSize: '1.35rem', color: 'var(--text-ivory)', marginBottom: '0.85rem' }}>
              MDMA, Mephedrone &amp; Amphetamines
            </h3>
            <p style={{ color: 'var(--text-cream)', fontSize: '0.92rem', lineHeight: 1.65, marginBottom: '1.25rem', flex: 1 }}>
              Party drugs cause violent serotonin and dopamine depletion, resulting in intense suicidal ideation, psychosis, and aggressive mood swings upon cessation. Our psychiatric team provides continuous stabilization.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <CheckCircle2 size={15} color="#D4AF37" /> Post-Stimulant Crash Management
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <CheckCircle2 size={15} color="#D4AF37" /> Neurotransmitter Balance Therapy
              </li>
            </ul>
          </div>

          {/* Substance 4 */}
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
            <div style={{ color: 'var(--accent-gold)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              Pharmaceuticals &amp; Sedatives
            </div>
            <h3 style={{ fontSize: '1.35rem', color: 'var(--text-ivory)', marginBottom: '0.85rem' }}>
              Sleeping Pills, Benzos &amp; Cough Syrups
            </h3>
            <p style={{ color: 'var(--text-cream)', fontSize: '0.92rem', lineHeight: 1.65, marginBottom: '1.25rem', flex: 1 }}>
              Addiction to alprazolam, clonazepam, tramadol, and codeine combinations requires slow, methodical clinical tapering to protect against life-threatening rebound seizures.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <CheckCircle2 size={15} color="#D4AF37" /> Controlled Pharmaceutical Tapering
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <CheckCircle2 size={15} color="#D4AF37" /> Natural Sleep Architecture Restoration
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Dual Diagnosis & Behavioral Therapy */}
      <section className="container" style={{ marginBottom: '5rem' }}>
        <div
          className="glass-panel"
          style={{
            padding: 'clamp(2.5rem, 5vw, 4rem)',
            borderRadius: '20px',
            border: '1px solid var(--border-gold)'
          }}
        >
          <div style={{ maxWidth: '820px', margin: '0 auto 3rem auto', textAlign: 'center' }}>
            <span className="section-tag">Dual Diagnosis</span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 3.8vw, 2.7rem)', marginBottom: '1rem' }}>
              Treating Mind, Body &amp; Emotion Simultaneously
            </h2>
            <p style={{ color: 'var(--text-cream)', fontSize: '1.05rem', lineHeight: 1.7 }}>
              Substance abuse is rarely an isolated disorder. It is most commonly an attempt to self-medicate unresolved pain, chronic anxiety, depression, or emotional neglect.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.75rem' }}>
            <div style={{ padding: '1.75rem', background: 'rgba(7, 18, 13, 0.75)', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <Brain size={28} color="#D4AF37" style={{ marginBottom: '0.85rem' }} />
              <h4 style={{ fontSize: '1.15rem', color: 'var(--text-ivory)', marginBottom: '0.5rem' }}>Cognitive Behavioral Therapy</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-cream)', lineHeight: 1.6 }}>
                Patients learn to identify automatic negative thoughts, peer pressure vulnerabilities, and high-risk triggers before they escalate into compulsive cravings.
              </p>
            </div>

            <div style={{ padding: '1.75rem', background: 'rgba(7, 18, 13, 0.75)', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <Layers size={28} color="#D4AF37" style={{ marginBottom: '0.85rem' }} />
              <h4 style={{ fontSize: '1.15rem', color: 'var(--text-ivory)', marginBottom: '0.5rem' }}>Daily Structured Milieu</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-cream)', lineHeight: 1.6 }}>
                A disciplined timetable from 6:00 AM to 10:00 PM including meditation, yoga, academic reading, sports, and introspective journaling resets biological clocks.
              </p>
            </div>

            <div style={{ padding: '1.75rem', background: 'rgba(7, 18, 13, 0.75)', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <HeartHandshake size={28} color="#D4AF37" style={{ marginBottom: '0.85rem' }} />
              <h4 style={{ fontSize: '1.15rem', color: 'var(--text-ivory)', marginBottom: '0.5rem' }}>Family Healing &amp; Mediation</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-cream)', lineHeight: 1.6 }}>
                We guide families through boundaries, eliminating codependency and enabler dynamics so the patient returns to an empowered, recovery-friendly household.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Localized FAQ Section with Schema Sync */}
      <section className="container" style={{ marginBottom: '5rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3rem auto' }}>
          <span className="section-tag">Direct Answers</span>
          <h2 style={{ fontSize: 'clamp(2rem, 3.8vw, 2.7rem)', marginBottom: '0.85rem' }}>
            Frequently Asked Questions: Drug Rehabilitation in Nagpur
          </h2>
          <p style={{ color: 'var(--text-cream)', fontSize: '1.02rem', lineHeight: 1.65 }}>
            Common questions from families facing drug crises in Nagpur, Vidarbha, and Central India.
          </p>
        </div>

        <div style={{ maxWidth: '840px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {DRUG_FAQS.map((faq, idx) => {
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
            Immediate Intervention
          </span>
          <h3 style={{ fontSize: 'clamp(1.9rem, 3.8vw, 2.7rem)', color: 'var(--text-ivory)', margin: '1rem 0' }}>
            Help Your Loved One Escape the Grip of Drugs Today
          </h3>
          <p style={{ color: 'var(--text-cream)', fontSize: '1.08rem', maxWidth: '680px', margin: '0 auto 2.25rem auto', lineHeight: 1.7 }}>
            Do not wait for an overdose or a legal disaster. Our discrete crisis pickup team is available 24/7 across Nagpur and surrounding districts.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <a
              href="tel:+919767362388"
              className="btn btn-gold"
              style={{ padding: '0.9rem 2.2rem', fontSize: '1.05rem', display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}
            >
              <Phone size={18} />
              <span>Call Helpline: +91 9767362388</span>
            </a>
            <Link
              href="/register"
              className="btn btn-outline"
              style={{ padding: '0.9rem 2rem', fontSize: '1.05rem', display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}
            >
              <HeartHandshake size={18} />
              <span>Submit Admission Request</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
