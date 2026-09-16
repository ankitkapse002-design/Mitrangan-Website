import React, { useState } from 'react';
import { Link } from 'wouter';
import { SEO, type FAQItem } from '../../components/SEO';
import {
  WineOff,
  ShieldCheck,
  Phone,
  HeartHandshake,
  Activity,
  Sparkles,
  ChevronDown,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Users,
  Compass,
  ArrowRight
} from 'lucide-react';

const ALCOHOL_FAQS: FAQItem[] = [
  {
    question: "How long is the alcohol de-addiction program at Mitrangan Nagpur?",
    answer: "Our residential alcohol rehabilitation program typically spans 90 to 120 days. The first 7 to 10 days focus strictly on medical detox and withdrawal stabilization, followed by intensive cognitive psychotherapy, behavioral discipline, and post-discharge relapse prevention planning."
  },
  {
    question: "Is alcohol withdrawal dangerous without medical supervision?",
    answer: "Yes, sudden cessation of heavy alcohol use can trigger Delirium Tremens (DTs), severe seizures, cardiovascular spikes, and extreme agitation. At Mitrangan Nagpur, detox is medically managed with 24/7 vital monitoring and physician-guided pharmacological support to ensure safe, painless withdrawal."
  },
  {
    question: "Do you provide emergency pickup from home in Nagpur or nearby districts?",
    answer: "Yes, we operate a 24/7 discrete emergency pickup service across Nagpur, Wardha, Bhandara, Chandrapur, Amravati, and neighboring regions. Our trained crisis response team ensures safe, respectful, and confidential transit to our facility."
  },
  {
    question: "Can family members visit or receive regular updates during treatment?",
    answer: "Absolutely. Family is central to sustainable recovery. We schedule weekly counselor update calls with primary guardians and organize structured family counseling sessions to resolve trauma, rebuild trust, and prepare a supportive home environment."
  },
  {
    question: "Is patient identity and admission kept confidential?",
    answer: "Strict medical confidentiality is our foundation. Patient records, medical evaluations, and personal details are protected under strict privacy protocols and never disclosed to employers, third parties, or public registries."
  }
];

export const AlcoholDeaddictionPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div style={{ paddingTop: '7.5rem', paddingBottom: '6rem' }}>
      <SEO
        title="Alcohol De-Addiction Centre in Nagpur | Alcohol Rehab & Detox | Mitrangan"
        description="Leading alcohol de-addiction centre in Nagpur. Medically supervised alcohol detox, withdrawal management, psychiatric counseling & 24/7 discrete emergency pickup."
        canonicalPath="/services/alcohol-deaddiction"
        faqSchema={ALCOHOL_FAQS}
      />

      {/* Hero Section */}
      <section className="container" style={{ marginBottom: '5rem' }}>
        <div style={{ maxWidth: '880px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <span className="section-tag">
              <WineOff size={14} color="#D4AF37" />
              <span>Government Registered Nasha Mukti Kendra • Nagpur</span>
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.3rem, 5vw, 3.8rem)', lineHeight: 1.18, marginBottom: '1.5rem' }}>
            Specialized Alcohol De-Addiction &amp; Rehabilitation in Nagpur
          </h1>

          <p style={{ color: 'var(--text-cream)', fontSize: '1.18rem', lineHeight: 1.75, marginBottom: '2.5rem' }}>
            Break free from the cycle of alcohol dependence. Mitrangan provides 24/7 medically managed detoxification, individual psychiatric therapy, and disciplined lifestyle re-engineering in a serene, judgment-free residential sanctuary.
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
              <span>24/7 Medical Detox Supervision</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-ivory)', fontSize: '0.95rem' }}>
              <Activity size={18} color="#D4AF37" />
              <span>Evidence-Based CBT &amp; Dual Diagnosis</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-ivory)', fontSize: '0.95rem' }}>
              <Sparkles size={18} color="#D4AF37" />
              <span>100% Confidential Care</span>
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
              <span>Call 24/7 Helpline: +91 9767362388</span>
            </a>
            <Link
              href="/register"
              className="btn btn-outline"
              style={{ padding: '0.9rem 2rem', fontSize: '1.05rem', display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}
            >
              <HeartHandshake size={18} />
              <span>Confidential Admission Inquiry</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Understanding Alcohol Dependency & The Crisis */}
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
            <span className="section-tag">Clinical Reality</span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 3.8vw, 2.7rem)', marginBottom: '1rem' }}>
              Alcohol Addiction Is a Chronic Medical Condition, Not a Moral Failure
            </h2>
            <p style={{ color: 'var(--text-cream)', fontSize: '1.05rem', lineHeight: 1.7 }}>
              Prolonged alcohol consumption alters neurotransmitter pathways in the brain (GABA and glutamate receptors), making cessation physically agonizing and mentally overwhelming without professional medical intervention.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.75rem' }}>
            <div
              style={{
                background: 'rgba(7, 18, 13, 0.7)',
                padding: '2rem',
                borderRadius: '14px',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <div style={{ color: 'var(--status-pending)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <AlertTriangle size={20} />
                <h3 style={{ fontSize: '1.2rem', margin: 0, color: 'var(--text-ivory)' }}>Physical Tolerance &amp; Cravings</h3>
              </div>
              <p style={{ color: 'var(--text-cream)', fontSize: '0.92rem', lineHeight: 1.65 }}>
                Needing higher quantities to achieve the same effect, early morning tremors, sweating, or nausea that only settles when alcohol is consumed.
              </p>
            </div>

            <div
              style={{
                background: 'rgba(7, 18, 13, 0.7)',
                padding: '2rem',
                borderRadius: '14px',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <div style={{ color: 'var(--status-pending)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <Clock size={20} />
                <h3 style={{ fontSize: '1.2rem', margin: 0, color: 'var(--text-ivory)' }}>Loss of Personal Control</h3>
              </div>
              <p style={{ color: 'var(--text-cream)', fontSize: '0.92rem', lineHeight: 1.65 }}>
                Inability to stop drinking once started, failed attempts at self-moderation, and spending disproportionate financial resources on alcohol.
              </p>
            </div>

            <div
              style={{
                background: 'rgba(7, 18, 13, 0.7)',
                padding: '2rem',
                borderRadius: '14px',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <div style={{ color: 'var(--status-pending)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <Users size={20} />
                <h3 style={{ fontSize: '1.2rem', margin: 0, color: 'var(--text-ivory)' }}>Family &amp; Social Breakdown</h3>
              </div>
              <p style={{ color: 'var(--text-cream)', fontSize: '0.92rem', lineHeight: 1.65 }}>
                Emotional strain on spouse and children, defensive outbursts, neglect of professional obligations, and social isolation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Stage Clinical Recovery Model */}
      <section className="container" style={{ marginBottom: '5rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3.5rem auto' }}>
          <span className="section-tag">Structured Protocol</span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.9rem)', marginBottom: '1rem' }}>
            The 4 Pillars of Alcohol Rehabilitation at Mitrangan
          </h2>
          <p style={{ color: 'var(--text-cream)', fontSize: '1.05rem', lineHeight: 1.7 }}>
            Our integrated clinical approach addresses both the neurobiological dependency and the psychological triggers behind substance misuse.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '1.75rem' }}>
          {/* Stage 1 */}
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
              Phase 01 • Days 1 to 10
            </div>
            <h3 style={{ fontSize: '1.35rem', color: 'var(--text-ivory)', marginBottom: '1rem' }}>
              Medically Supervised Detoxification
            </h3>
            <p style={{ color: 'var(--text-cream)', fontSize: '0.92rem', lineHeight: 1.65, marginBottom: '1.25rem', flex: 1 }}>
              Safe management of acute withdrawal symptoms under continuous physician and nursing observation. We prevent complications like seizures and delirium tremens using evidence-based pharmaceutical protocols.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <CheckCircle2 size={15} color="#D4AF37" /> 24/7 Vital Monitoring &amp; Hydration
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <CheckCircle2 size={15} color="#D4AF37" /> Nutritional &amp; Vitamin Therapy
              </li>
            </ul>
          </div>

          {/* Stage 2 */}
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
              Phase 02 • Days 11 to 45
            </div>
            <h3 style={{ fontSize: '1.35rem', color: 'var(--text-ivory)', marginBottom: '1rem' }}>
              Psychological Therapy &amp; CBT
            </h3>
            <p style={{ color: 'var(--text-cream)', fontSize: '0.92rem', lineHeight: 1.65, marginBottom: '1.25rem', flex: 1 }}>
              Once mental fog lifts, our clinical psychologists uncover the emotional root causes: unaddressed grief, anxiety, workplace burnout, or relationship conflict. Patients master Cognitive Behavioral Therapy coping mechanisms.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <CheckCircle2 size={15} color="#D4AF37" /> Daily Individual Psychotherapy
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <CheckCircle2 size={15} color="#D4AF37" /> Group Catharsis &amp; Peer Healing
              </li>
            </ul>
          </div>

          {/* Stage 3 */}
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
              Phase 03 • Days 46 to 75
            </div>
            <h3 style={{ fontSize: '1.35rem', color: 'var(--text-ivory)', marginBottom: '1rem' }}>
              Physical &amp; Routine Rebuilding
            </h3>
            <p style={{ color: 'var(--text-cream)', fontSize: '0.92rem', lineHeight: 1.65, marginBottom: '1.25rem', flex: 1 }}>
              Addiction destroys circadian rhythms. Our residential schedule re-engages the body through morning yoga, guided meditation, structured fitness, reading, and healthy communal meals in Godhani, Nagpur.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <CheckCircle2 size={15} color="#D4AF37" /> Morning Pranayama &amp; Yoga
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <CheckCircle2 size={15} color="#D4AF37" /> Organic Wholesome Diet
              </li>
            </ul>
          </div>

          {/* Stage 4 */}
          <div
            className="glass-panel"
            style={{
              padding: '2.25rem',
              borderRadius: '16px',
              border: '1px solid var(--border-gold)',
              display: 'flex',
              flexDirection: 'column',
              background: 'rgba(212, 175, 55, 0.04)'
            }}
          >
            <div style={{ color: 'var(--accent-gold)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              Phase 04 • Days 76 to 90+
            </div>
            <h3 style={{ fontSize: '1.35rem', color: 'var(--text-ivory)', marginBottom: '1rem' }}>
              Relapse Prevention &amp; Aftercare
            </h3>
            <p style={{ color: 'var(--text-cream)', fontSize: '0.92rem', lineHeight: 1.65, marginBottom: '1.25rem', flex: 1 }}>
              Preparing the individual to step back into the real world. We formulate a customized emergency blueprint for high-risk social situations, emotional triggers, and post-discharge recovery monitoring.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <CheckCircle2 size={15} color="#D4AF37" /> High-Risk Trigger Mapping
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <CheckCircle2 size={15} color="#D4AF37" /> 1-Year Follow-up Counseling
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Alcohol Withdrawal Timeline Infographic */}
      <section className="container" style={{ marginBottom: '5rem' }}>
        <div
          className="glass-panel"
          style={{
            padding: 'clamp(2rem, 4vw, 3.5rem)',
            borderRadius: '20px',
            border: '1px solid var(--border-subtle)'
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3rem auto' }}>
            <span className="section-tag">Clinical Timeline</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', marginBottom: '0.75rem' }}>
              What Happens During Alcohol Detoxification?
            </h2>
            <p style={{ color: 'var(--text-cream)', fontSize: '1rem' }}>
              Understanding the critical phases of alcohol withdrawal and why 24/7 medical oversight is non-negotiable.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            <div style={{ padding: '1.5rem', background: 'rgba(7, 18, 13, 0.8)', borderRadius: '12px', borderLeft: '3px solid #F59E0B' }}>
              <span style={{ fontSize: '0.8rem', color: '#F59E0B', fontWeight: 700 }}>HOURS 6 – 12</span>
              <h4 style={{ fontSize: '1.1rem', color: 'var(--text-ivory)', margin: '0.4rem 0' }}>Early Withdrawal</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-cream)', lineHeight: 1.55 }}>
                Anxiety, insomnia, hand tremors, headaches, intense sweating, and rapid heartbeat as blood alcohol levels decline.
              </p>
            </div>

            <div style={{ padding: '1.5rem', background: 'rgba(7, 18, 13, 0.8)', borderRadius: '12px', borderLeft: '3px solid #EF4444' }}>
              <span style={{ fontSize: '0.8rem', color: '#EF4444', fontWeight: 700 }}>HOURS 24 – 72</span>
              <h4 style={{ fontSize: '1.1rem', color: 'var(--text-ivory)', margin: '0.4rem 0' }}>Peak Risk Phase</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-cream)', lineHeight: 1.55 }}>
                Peak danger of alcohol-induced seizures, extreme disorientation, auditory hallucinations, and Delirium Tremens. Doctor intervention is vital.
              </p>
            </div>

            <div style={{ padding: '1.5rem', background: 'rgba(7, 18, 13, 0.8)', borderRadius: '12px', borderLeft: '3px solid #10B981' }}>
              <span style={{ fontSize: '0.8rem', color: '#10B981', fontWeight: 700 }}>DAYS 4 – 7</span>
              <h4 style={{ fontSize: '1.1rem', color: 'var(--text-ivory)', margin: '0.4rem 0' }}>Physical Stabilization</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-cream)', lineHeight: 1.55 }}>
                Vitals stabilize, appetite begins to normalize, physical tremors subside, and deep cognitive recovery commences.
              </p>
            </div>

            <div style={{ padding: '1.5rem', background: 'rgba(7, 18, 13, 0.8)', borderRadius: '12px', borderLeft: '3px solid #D4AF37' }}>
              <span style={{ fontSize: '0.8rem', color: '#D4AF37', fontWeight: 700 }}>WEEKS 2 – 4</span>
              <h4 style={{ fontSize: '1.1rem', color: 'var(--text-ivory)', margin: '0.4rem 0' }}>Cognitive Restoration</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-cream)', lineHeight: 1.55 }}>
                Mental clarity returns. The focus shifts entirely to emotional resilience, trigger identification, and rebuilding family bonds.
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
            Frequently Asked Questions: Alcohol Treatment in Nagpur
          </h2>
          <p style={{ color: 'var(--text-cream)', fontSize: '1.02rem', lineHeight: 1.65 }}>
            Transparent guidance on duration, safety protocols, family involvement, and admission costs.
          </p>
        </div>

        <div style={{ maxWidth: '840px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {ALCOHOL_FAQS.map((faq, idx) => {
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

      {/* Emergency Callout & Admission Banner */}
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
            24/7 Crisis Intervention
          </span>
          <h3 style={{ fontSize: 'clamp(1.9rem, 3.8vw, 2.7rem)', color: 'var(--text-ivory)', margin: '1rem 0' }}>
            Take the First Step Toward Lifelong Freedom Today
          </h3>
          <p style={{ color: 'var(--text-cream)', fontSize: '1.08rem', maxWidth: '680px', margin: '0 auto 2.25rem auto', lineHeight: 1.7 }}>
            Our medical staff and counselors in Godhani, Nagpur are on standby 24 hours a day. Discrete pickup service is available across Maharashtra &amp; Central India.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <a
              href="tel:+919767362388"
              className="btn btn-gold"
              style={{ padding: '0.9rem 2.2rem', fontSize: '1.05rem', display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}
            >
              <Phone size={18} />
              <span>Call +91 9767362388</span>
            </a>
            <Link
              href="/register"
              className="btn btn-outline"
              style={{ padding: '0.9rem 2rem', fontSize: '1.05rem', display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}
            >
              <HeartHandshake size={18} />
              <span>Start Online Admission</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
