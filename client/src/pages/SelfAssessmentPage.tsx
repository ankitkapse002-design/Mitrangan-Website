import React, { useState } from 'react';
import { Link } from 'wouter';
import { SEO, type FAQItem } from '../components/SEO';
import {
  ShieldCheck,
  AlertTriangle,
  AlertCircle,
  Phone,
  MessageCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  Users,
  User,
  HeartHandshake,
  Activity,
  Sparkles,
  ChevronDown,
  Info,
  Clock,
  HelpCircle,
  FileText
} from 'lucide-react';

interface Question {
  id: number;
  category: string;
  questionForLovedOne: string;
  questionForSelf: string;
  explanation: string;
}

const ASSESSMENT_QUESTIONS: Question[] = [
  {
    id: 1,
    category: "Consumption Control",
    questionForLovedOne: "Do they consume alcohol or substances in larger quantities or over a longer time than they planned?",
    questionForSelf: "Do you find yourself consuming alcohol or substances in larger amounts or for longer periods than you intended?",
    explanation: "Difficulty limiting intake is one of the earliest neurobiological indicators of substance tolerance and compromised impulse control."
  },
  {
    id: 2,
    category: "Morning Cravings & Tremors",
    questionForLovedOne: "Do they require a drink or dose in the morning to steady tremors, relieve anxiety, or start their day?",
    questionForSelf: "Do you feel an urgent morning craving, physical shakiness, or anxiety that only subsides after your first drink or dose?",
    explanation: "Known clinically as an 'eye-opener,' morning cravings indicate that blood substance levels have dropped overnight, triggering acute physical withdrawal."
  },
  {
    id: 3,
    category: "Failed Attempts to Quit",
    questionForLovedOne: "Have they made repeated promises or attempts to cut down or quit that ended in relapse within days or weeks?",
    questionForSelf: "Have you tried to stop or control your consumption multiple times, only to find yourself relapsing despite strong willpower?",
    explanation: "Repeated relapses are not moral failures; they indicate altered neurotransmitter pathways in the brain that require structured clinical intervention."
  },
  {
    id: 4,
    category: "Domestic & Interpersonal Friction",
    questionForLovedOne: "Has their substance use caused frequent family arguments, broken trust, defensive secrecy, or emotional distress?",
    questionForSelf: "Has your substance use triggered arguments with spouse or parents, made you hide consumption, or caused broken promises?",
    explanation: "Deceptive habits, isolation, and uncharacteristic aggression often emerge as individuals subconsciously protect their access to the substance."
  },
  {
    id: 5,
    category: "Neglect of Responsibilities",
    questionForLovedOne: "Have they neglected workplace duties, missed business shifts, fallen into debt, or neglected household obligations?",
    questionForSelf: "Has your job performance, business, attendance, financial stability, or parenting suffered due to substance use or hangovers?",
    explanation: "Prioritizing substance procurement and recovery from its toxic aftermath over professional and familial survival is a benchmark of dependency."
  },
  {
    id: 6,
    category: "Hazardous & Risky Behavior",
    questionForLovedOne: "Have they engaged in dangerous situations while intoxicated—such as drunk driving, mixing medications, or violent outbursts?",
    questionForSelf: "Have you driven under the influence, mixed sedatives/alcohol, or found yourself in risky or violent altercations while using?",
    explanation: "Impaired judgment in high-risk scenarios indicates that prefrontal cortex executive functioning has been significantly dampened."
  },
  {
    id: 7,
    category: "Physical Tolerance Escalation",
    questionForLovedOne: "Do they require noticeably higher doses or stronger substances than before to achieve the same intoxicating effect?",
    questionForSelf: "Do you need substantially more alcohol or drugs today to feel the same effect that smaller amounts used to provide?",
    explanation: "Tolerance escalation occurs as liver enzymes upregulate and neuroreceptors desensitize, necessitating higher toxicity to function."
  },
  {
    id: 8,
    category: "Acute Physical Withdrawal",
    questionForLovedOne: "When they go hours without the substance, do they display sweating, vomiting, restlessness, rapid heartbeat, or sleep failure?",
    questionForSelf: "When you try to stop for 12–24 hours, do you suffer cold sweats, severe nausea, insomnia, racing pulse, or trembling hands?",
    explanation: "Physical withdrawal is medically hazardous. Abrupt cessation of alcohol or sedatives can precipitate seizures or Delirium Tremens without hospital oversight."
  }
];

const ASSESSMENT_FAQS: FAQItem[] = [
  {
    question: "How accurate is this online addiction severity assessment?",
    answer: "This screener is adapted from clinically validated diagnostic criteria (including WHO ASSIST, CAGE, and DAST-10). While it provides an immediate triage rating of risk, it does not replace an in-person clinical psychiatric evaluation by our medical team at Mitrangan Nagpur."
  },
  {
    question: "Can our family admit an addicted member without their initial willingness?",
    answer: "Yes. Under the Mental Healthcare Act (MHCA) 2017, family guardians and nominated representatives have legal rights to authorize medical admission for individuals lacking decision-making capacity due to chronic intoxication. Mitrangan deploys a 24/7 discrete crisis pickup team to assist families safely and with dignity."
  },
  {
    question: "नशा मुक्ति केंद्र कब जाना चाहिए? (When should someone enter a rehab centre?)",
    answer: "जब व्यक्ति शराब या नशे पर नियंत्रण खो दे, सुबह उठते ही तलब महसूस हो, परिवार में तनाव बढ़े, और स्वयं प्रयास करने पर भी नशा न छूट रहा हो, तो तुरंत पेशेवर नशा मुक्ति केंद्र की सहायता लेनी चाहिए। (When someone loses control, experiences morning withdrawal cravings, causes family distress, and repeatedly relapses at home, professional inpatient rehabilitation is urgently required.)"
  },
  {
    question: "दारू सोडण्याचे घरगुती उपाय काम करतात का? (Do home remedies work for alcohol de-addiction?)",
    answer: "घरी अचानक दारू बंद केल्याने झटका येणे (Seizures), कंप सुटणे (Delirium Tremens) किंवा रक्तदाब वाढण्याचा धोका असतो. त्यामुळे वैद्यकीय देखरेखीखाली (Medical Detox) तज्ज्ञ डॉक्टरांच्या मार्गदर्शनाखालीच उपचार करणे सुरक्षित असते. (Abruptly stopping alcohol at home without medical tapering can trigger fatal seizures and hallucinations. Medically supervised detoxification under hospital monitoring is essential for safety.)"
  },
  {
    question: "Is this assessment completely confidential and free?",
    answer: "100% confidential and free. We do not store your personal identity, telephone number, or quiz answers on public servers. You can review your triage result privately or choose to connect directly with our chief medical counselor via WhatsApp or phone call."
  },
  {
    question: "How quickly can an emergency pickup be coordinated across Nagpur and Vidarbha?",
    answer: "For urgent cases, our discrete ambulance response unit can be deployed within 30 to 60 minutes in Nagpur metro (Godhani, Koradi, Dharampeth, Mankapur, Sitabuldi) and within 1 to 3 hours across Vidarbha districts (Wardha, Amravati, Chandrapur, Bhandara, Gondia, Yavatmal)."
  }
];

export const SelfAssessmentPage: React.FC = () => {
  const [assessmentMode, setAssessmentMode] = useState<'family' | 'self'>('family');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const totalQuestions = ASSESSMENT_QUESTIONS.length;
  const currentQ = ASSESSMENT_QUESTIONS[currentQuestionIndex];

  const handleSelectAnswer = (points: number) => {
    const updated = { ...answers, [currentQ.id]: points };
    setAnswers(updated);

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setIsCompleted(false);
  };

  // Calculate score
  const totalScore = Object.values(answers).reduce((acc, curr) => acc + curr, 0);

  // Determine Severity Level
  let severityTier: {
    level: 'Mild' | 'Moderate' | 'Severe';
    title: string;
    badgeColor: string;
    badgeBg: string;
    borderColor: string;
    scoreLabel: string;
    clinicalVerdict: string;
    actionPlan: string[];
    urgencyText: string;
  };

  if (totalScore <= 2) {
    severityTier = {
      level: 'Mild',
      title: 'Early Warning Stage / Low-to-Mild Risk',
      badgeColor: '#10B981',
      badgeBg: 'rgba(16, 185, 129, 0.12)',
      borderColor: 'rgba(16, 185, 129, 0.35)',
      scoreLabel: '0 – 2 Points: Early Stage',
      clinicalVerdict:
        'Early indicators of habitual substance reliance. Physical tolerance and severe neurochemical dependence may not have fully settled yet. However, psychological dependency and regular consumption patterns are beginning to compromise daily wellness.',
      actionPlan: [
        'Outpatient psychological counseling to address root stress, depression, or peer pressure triggers.',
        'Establish firm domestic boundaries and eliminate access to substance stash locations at home.',
        'Weekly accountability checks with a licensed addiction therapist to prevent escalation into physical dependency.'
      ],
      urgencyText: 'Preventive Action Recommended — Avoid waiting until physical withdrawal symptoms worsen.'
    };
  } else if (totalScore <= 5) {
    severityTier = {
      level: 'Moderate',
      title: 'Moderate Dependence / High Escalation Hazard',
      badgeColor: '#F59E0B',
      badgeBg: 'rgba(245, 158, 11, 0.14)',
      borderColor: 'rgba(245, 158, 11, 0.4)',
      scoreLabel: '2.5 – 5 Points: Moderate Dependence',
      clinicalVerdict:
        'Significant neurochemical dependence is established. The brain reward pathway is hijacked, leading to loss of control, repeated failed attempts to quit alone, and rising domestic distress. Attempting unmonitored cold-turkey cessation at home poses high relapse hazards and severe emotional volatility.',
      actionPlan: [
        'Comprehensive clinical psychiatric evaluation by an addiction specialist.',
        'Supervised medical detoxification to manage withdrawal safely without traumatic suffering.',
        'Structured 60 to 90-day residential rehabilitation to break psychological triggers and rebuild broken family dynamics.'
      ],
      urgencyText: 'Clinical Intervention Strongly Advised — The window to intervene before irreversible bodily or legal harm is narrowing.'
    };
  } else {
    severityTier = {
      level: 'Severe',
      title: 'Severe Dependence / Acute Medical Crisis',
      badgeColor: '#EF4444',
      badgeBg: 'rgba(239, 68, 68, 0.16)',
      borderColor: 'rgba(239, 68, 68, 0.5)',
      scoreLabel: '5.5 – 8 Points: Critical Severity',
      clinicalVerdict:
        'CRITICAL HEALTH & SAFETY EMERGENCY: Advanced physical and neurochemical addiction with life-threatening withdrawal risks (including Delirium Tremens, seizures, stroke, organ failure, or drug-induced psychosis). Attempting to stop without round-the-clock medical supervision is hazardous to life.',
      actionPlan: [
        'IMMEDIATE INPATIENT ADMISSION into a 24/7 medically supervised detoxification ICU/center.',
        'Continuous vital sign monitoring, intravenous electrolyte replenishment, and physician-guided pharmaceutical tapering.',
        'Discrete emergency ambulance pickup coordination to prevent dangerous confrontation or flight risk.'
      ],
      urgencyText: 'IMMEDIATE ACTION REQUIRED — Do not delay. Contact our emergency medical desk immediately.'
    };
  }

  // Pre-filled WhatsApp link
  const subjectName = assessmentMode === 'family' ? 'my family member' : 'myself';
  const whatsappMessage = encodeURIComponent(
    `Hello Doctor Mitrangan, I completed your Confidential Addiction Screener for ${subjectName}.\n\n` +
    `• Triage Score: ${totalScore} / 8\n` +
    `• Severity Level: ${severityTier.level.toUpperCase()} (${severityTier.title})\n\n` +
    `Please guide us on immediate clinical evaluation, detox bed availability, and discrete ambulance pickup in Nagpur.`
  );
  const whatsappUrl = `https://wa.me/919767362388?text=${whatsappMessage}`;

  return (
    <div style={{ paddingTop: '7.5rem', paddingBottom: '6rem' }}>
      <SEO
        title="Addiction Severity Self-Assessment & Triage | Nasha Mukti Kendra Nagpur"
        description="Confidential 2-minute clinical addiction severity assessment for alcohol & drug abuse. Instant triage score, withdrawal risk check & emergency guidance in Nagpur."
        canonicalPath="/self-assessment"
        faqSchema={ASSESSMENT_FAQS}
        schemaJson={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "MedicalWebPage",
              "@id": "https://nagpurnashamuktikendra.com/self-assessment#webpage",
              "url": "https://nagpurnashamuktikendra.com/self-assessment",
              "name": "Addiction Severity Self-Assessment & Triage Screener | Nasha Mukti Kendra Nagpur",
              "description": "Confidential 2-minute clinical addiction severity assessment for alcohol & drug abuse. Instant triage score, withdrawal risk check & emergency guidance in Nagpur.",
              "aspect": "Diagnosis, Treatment, HealthCheck",
              "specialty": "Psychiatry",
              "audience": {
                "@type": "MedicalAudience",
                "audienceType": "Patients and Families affected by substance dependence"
              }
            },
            {
              "@type": "FAQPage",
              "mainEntity": ASSESSMENT_FAQS.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              }))
            }
          ]
        }}
      />

      {/* 1. Hero Section */}
      <section className="container" style={{ marginBottom: '4rem' }}>
        <div style={{ maxWidth: '880px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <span className="section-tag">
              <Activity size={14} color="#D4AF37" />
              <span>Evidence-Based Clinical Triage Tool</span>
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.3rem, 4.5vw, 3.5rem)', lineHeight: 1.18, marginBottom: '1.25rem', color: 'var(--text-ivory)' }}>
            Confidential Addiction Severity &amp;{' '}
            <span className="gold-gradient-text">Triage Screener</span>
          </h1>

          <p style={{ fontSize: '1.12rem', color: 'var(--text-cream)', lineHeight: 1.7, maxWidth: '760px', margin: '0 auto 2rem auto' }}>
            Anxious families and individuals frequently ask: <em>"Can we handle this at home, or is residential rehabilitation necessary?"</em> Take this 2-minute clinical screener to understand the medical risk level and determine the safest path forward.
          </p>

          {/* Privacy & Clinical Badges */}
          <div
            style={{
              display: 'inline-flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1.5rem',
              padding: '0.75rem 1.5rem',
              background: 'rgba(212, 175, 55, 0.06)',
              border: '1px solid rgba(212, 175, 55, 0.22)',
              borderRadius: '9999px',
              fontSize: '0.85rem',
              color: 'var(--accent-gold)'
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <ShieldCheck size={16} />
              <span>100% Anonymous &amp; Private</span>
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Clock size={16} />
              <span>Takes ~2 Minutes</span>
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Sparkles size={16} />
              <span>CAGE &amp; DAST-10 Aligned</span>
            </span>
          </div>
        </div>
      </section>

      {/* 2. Screener Container */}
      <section className="container" style={{ marginBottom: '6rem' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          {/* Mode Selector */}
          {!isCompleted && (
            <div
              style={{
                display: 'flex',
                background: 'rgba(7, 18, 13, 0.8)',
                border: '1px solid var(--border-glass)',
                borderRadius: '14px',
                padding: '0.35rem',
                marginBottom: '2rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.4)'
              }}
            >
              <button
                type="button"
                onClick={() => setAssessmentMode('family')}
                style={{
                  flex: 1,
                  padding: '0.85rem 1rem',
                  borderRadius: '10px',
                  border: 'none',
                  background: assessmentMode === 'family' ? 'var(--accent-gold)' : 'transparent',
                  color: assessmentMode === 'family' ? '#07120D' : 'var(--text-cream)',
                  fontWeight: assessmentMode === 'family' ? 700 : 500,
                  fontSize: '0.92rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease'
                }}
              >
                <Users size={18} />
                <span>Evaluating a Loved One (Family Member)</span>
              </button>

              <button
                type="button"
                onClick={() => setAssessmentMode('self')}
                style={{
                  flex: 1,
                  padding: '0.85rem 1rem',
                  borderRadius: '10px',
                  border: 'none',
                  background: assessmentMode === 'self' ? 'var(--accent-gold)' : 'transparent',
                  color: assessmentMode === 'self' ? '#07120D' : 'var(--text-cream)',
                  fontWeight: assessmentMode === 'self' ? 700 : 500,
                  fontSize: '0.92rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease'
                }}
              >
                <User size={18} />
                <span>Evaluating Myself</span>
              </button>
            </div>
          )}

          {/* Interactive Card or Results */}
          {!isCompleted ? (
            <div
              className="glass-panel-gold"
              style={{
                padding: '2.75rem 2.25rem',
                borderRadius: '24px',
                position: 'relative',
                boxShadow: '0 16px 50px rgba(0, 0, 0, 0.65)'
              }}
            >
              {/* Progress Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <span style={{ color: 'var(--accent-gold)', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Question {currentQuestionIndex + 1} of {totalQuestions} • {currentQ.category}
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)}% Complete
                </span>
              </div>

              {/* Progress Bar */}
              <div
                style={{
                  width: '100%',
                  height: '6px',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  borderRadius: '999px',
                  overflow: 'hidden',
                  marginBottom: '2.5rem'
                }}
              >
                <div
                  style={{
                    width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`,
                    height: '100%',
                    backgroundColor: 'var(--accent-gold)',
                    borderRadius: '999px',
                    transition: 'width 0.35s ease'
                  }}
                />
              </div>

              {/* Question Text */}
              <h2
                style={{
                  fontSize: 'clamp(1.35rem, 2.5vw, 1.85rem)',
                  color: 'var(--text-ivory)',
                  lineHeight: 1.4,
                  marginBottom: '1.25rem',
                  minHeight: '70px'
                }}
              >
                {assessmentMode === 'family' ? currentQ.questionForLovedOne : currentQ.questionForSelf}
              </h2>

              {/* Clinical Explanation Hint */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.65rem',
                  padding: '0.85rem 1.15rem',
                  background: 'rgba(212, 175, 55, 0.05)',
                  border: '1px solid rgba(212, 175, 55, 0.15)',
                  borderRadius: '12px',
                  marginBottom: '2.5rem'
                }}
              >
                <Info size={18} color="var(--accent-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <p style={{ fontSize: '0.88rem', color: 'var(--text-cream)', lineHeight: 1.55, margin: 0 }}>
                  <strong style={{ color: 'var(--accent-gold)' }}>Clinical Context:</strong> {currentQ.explanation}
                </p>
              </div>

              {/* Response Options */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', marginBottom: '2.5rem' }}>
                <button
                  type="button"
                  onClick={() => handleSelectAnswer(1)}
                  className="glass-panel"
                  style={{
                    padding: '1.25rem 1.5rem',
                    borderRadius: '14px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    background: 'rgba(239, 68, 68, 0.04)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(239, 68, 68, 0.12)';
                    e.currentTarget.style.borderColor = '#EF4444';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(239, 68, 68, 0.04)';
                    e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.3)';
                    e.currentTarget.style.transform = 'none';
                  }}
                >
                  <div>
                    <span style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-ivory)', display: 'block' }}>
                      Yes / Frequently Observed
                    </span>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      Occurs regularly or represents a consistent pattern
                    </span>
                  </div>
                  <ArrowRight size={18} color="#EF4444" />
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectAnswer(0.5)}
                  className="glass-panel"
                  style={{
                    padding: '1.25rem 1.5rem',
                    borderRadius: '14px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    border: '1px solid rgba(245, 158, 11, 0.3)',
                    background: 'rgba(245, 158, 11, 0.04)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(245, 158, 11, 0.12)';
                    e.currentTarget.style.borderColor = '#F59E0B';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(245, 158, 11, 0.04)';
                    e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.3)';
                    e.currentTarget.style.transform = 'none';
                  }}
                >
                  <div>
                    <span style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-ivory)', display: 'block' }}>
                      Sometimes / Occasionally
                    </span>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      Has happened a few times or during stressful periods
                    </span>
                  </div>
                  <ArrowRight size={18} color="#F59E0B" />
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectAnswer(0)}
                  className="glass-panel"
                  style={{
                    padding: '1.25rem 1.5rem',
                    borderRadius: '14px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    background: 'rgba(16, 185, 129, 0.04)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(16, 185, 129, 0.12)';
                    e.currentTarget.style.borderColor = '#10B981';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(16, 185, 129, 0.04)';
                    e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.3)';
                    e.currentTarget.style.transform = 'none';
                  }}
                >
                  <div>
                    <span style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-ivory)', display: 'block' }}>
                      No / Never
                    </span>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      Not present or has never been observed
                    </span>
                  </div>
                  <ArrowRight size={18} color="#10B981" />
                </button>
              </div>

              {/* Navigation Footer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                  className="btn btn-ghost"
                  style={{
                    opacity: currentQuestionIndex === 0 ? 0.3 : 1,
                    cursor: currentQuestionIndex === 0 ? 'not-allowed' : 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.88rem'
                  }}
                >
                  <ArrowLeft size={16} />
                  <span>Previous Question</span>
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="btn btn-ghost"
                  style={{ fontSize: '0.85rem', color: 'var(--text-dim)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  <RotateCcw size={14} />
                  <span>Restart Screener</span>
                </button>
              </div>
            </div>
          ) : (
            /* 3. Triage Results Display */
            <div
              className="glass-panel-gold"
              style={{
                padding: '3rem 2.5rem',
                borderRadius: '24px',
                border: `2px solid ${severityTier.borderColor}`,
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.75)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Header Status Badge */}
              <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.55rem 1.4rem',
                    borderRadius: '9999px',
                    background: severityTier.badgeBg,
                    border: `1px solid ${severityTier.badgeColor}`,
                    color: severityTier.badgeColor,
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginBottom: '1.25rem'
                  }}
                >
                  {severityTier.level === 'Severe' ? (
                    <AlertCircle size={18} />
                  ) : severityTier.level === 'Moderate' ? (
                    <AlertTriangle size={18} />
                  ) : (
                    <CheckCircle2 size={18} />
                  )}
                  <span>{severityTier.title}</span>
                </div>

                <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: 'var(--text-ivory)', marginBottom: '0.75rem' }}>
                  Clinical Triage Score: <span style={{ color: severityTier.badgeColor }}>{totalScore} / 8</span>
                </h2>

                <p style={{ color: 'var(--text-cream)', fontSize: '1.02rem', maxWidth: '650px', margin: '0 auto', lineHeight: 1.6 }}>
                  {severityTier.urgencyText}
                </p>
              </div>

              {/* Clinical Assessment Breakdown */}
              <div
                style={{
                  padding: '1.75rem',
                  background: 'rgba(7, 18, 13, 0.7)',
                  borderRadius: '16px',
                  border: '1px solid var(--border-glass)',
                  marginBottom: '2rem'
                }}
              >
                <h3 style={{ fontSize: '1.15rem', color: 'var(--accent-gold)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Activity size={18} />
                  <span>Clinical Evaluation &amp; Risk Overview</span>
                </h3>
                <p style={{ color: 'var(--text-cream)', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
                  {severityTier.clinicalVerdict}
                </p>
              </div>

              {/* Recommended Action Checklist */}
              <div
                style={{
                  padding: '1.75rem',
                  background: 'rgba(7, 18, 13, 0.7)',
                  borderRadius: '16px',
                  border: '1px solid var(--border-glass)',
                  marginBottom: '2.5rem'
                }}
              >
                <h3 style={{ fontSize: '1.15rem', color: 'var(--text-ivory)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ShieldCheck size={18} color="var(--accent-gold)" />
                  <span>Recommended Medical Action Plan</span>
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {severityTier.actionPlan.map((step, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                      <span
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          background: 'rgba(212, 175, 55, 0.15)',
                          border: '1px solid var(--accent-gold)',
                          color: 'var(--accent-gold)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          flexShrink: 0,
                          marginTop: '2px'
                        }}
                      >
                        {idx + 1}
                      </span>
                      <p style={{ fontSize: '0.92rem', color: 'var(--text-cream)', lineHeight: 1.55, margin: 0 }}>
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* High-Converting 1-Click Actions */}
              <div style={{ textAlign: 'center', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <h4 style={{ fontSize: '1.25rem', color: 'var(--text-ivory)', marginBottom: '0.5rem' }}>
                  Connect Confidentially With Our Medical Desk
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.75rem' }}>
                  Share this triage assessment directly with our consulting psychiatrist. Instant guidance, 100% discrete.
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp"
                    style={{ padding: '0.85rem 1.6rem', fontSize: '0.95rem' }}
                  >
                    <MessageCircle size={18} />
                    <span>Send Triage Result via WhatsApp</span>
                  </a>

                  <a
                    href="tel:+919767362388"
                    className="btn btn-emerald"
                    style={{ padding: '0.85rem 1.6rem', fontSize: '0.95rem' }}
                  >
                    <Phone size={18} />
                    <span>Call 24/7 Helpline: +91 9767362388</span>
                  </a>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', justifyContent: 'center', fontSize: '0.88rem' }}>
                  <Link
                    href="/admission-process"
                    style={{ color: 'var(--accent-gold)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontWeight: 600 }}
                  >
                    <FileText size={15} />
                    <span>View Admission Checklist &amp; Fees</span>
                    <ArrowRight size={14} />
                  </Link>

                  <Link
                    href="/services/detoxification-support"
                    style={{ color: 'var(--text-cream)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                  >
                    <Activity size={15} color="var(--accent-gold)" />
                    <span>Learn About Clinical Detoxification</span>
                    <ArrowRight size={14} />
                  </Link>

                  <button
                    type="button"
                    onClick={handleReset}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-dim)',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem'
                    }}
                  >
                    <RotateCcw size={14} />
                    <span>Retake Assessment</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. Why Professional Clinical Triage Matters */}
      <section className="container" style={{ marginBottom: '6rem' }}>
        <div style={{ maxWidth: '880px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-tag">Clinical Reality</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)', color: 'var(--text-ivory)', marginBottom: '0.75rem' }}>
              Why Stopping "Cold Turkey" at Home is Dangerous
            </h2>
            <p style={{ color: 'var(--text-cream)', fontSize: '0.98rem', lineHeight: 1.65 }}>
              Many families believe strong willpower alone can cure addiction. In moderate to severe cases, abrupt cessation without medical tapering triggers neurochemical storms.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            <div className="glass-panel" style={{ padding: '1.75rem', borderRadius: '16px' }}>
              <div style={{ color: '#EF4444', marginBottom: '0.85rem' }}>
                <AlertTriangle size={24} />
              </div>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--text-ivory)', marginBottom: '0.5rem' }}>
                Delirium Tremens &amp; Seizures
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
                Alcohol and benzodiazepine withdrawal can trigger sudden grand-mal seizures within 24 to 72 hours of cessation, which are potentially fatal without anticonvulsant medications.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '1.75rem', borderRadius: '16px' }}>
              <div style={{ color: '#F59E0B', marginBottom: '0.85rem' }}>
                <Activity size={24} />
              </div>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--text-ivory)', marginBottom: '0.5rem' }}>
                Cardiac &amp; Hypertensive Spikes
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
                Autonomic nervous system hyperarousal leads to dangerous blood pressure spikes, cardiac arrhythmias, severe dehydration, and electrolyte depletion.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '1.75rem', borderRadius: '16px' }}>
              <div style={{ color: '#10B981', marginBottom: '0.85rem' }}>
                <HeartHandshake size={24} />
              </div>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--text-ivory)', marginBottom: '0.5rem' }}>
                Psychological Despair &amp; Relapse
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
                Intolerable physical agony causes more than 90% of unassisted attempts to end in severe immediate relapse, deepening feelings of shame and hopelessness for the family.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Bilingual Local FAQs Section */}
      <section className="container" style={{ marginBottom: '4rem' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="section-tag">
              <HelpCircle size={14} color="#D4AF37" />
              <span>Common Questions &amp; FAQs</span>
            </span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)', color: 'var(--text-ivory)', marginBottom: '0.5rem' }}>
              Addiction Screener &amp; Admission FAQs
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Answers to common family questions in English, Hindi, and Marathi.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {ASSESSMENT_FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="glass-panel"
                  style={{
                    borderRadius: '14px',
                    border: isOpen ? '1px solid rgba(212, 175, 55, 0.4)' : '1px solid var(--border-subtle)',
                    overflow: 'hidden',
                    transition: 'all 0.25s ease'
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    style={{
                      width: '100%',
                      padding: '1.35rem 1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-ivory)',
                      textAlign: 'left',
                      fontSize: '1.02rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      gap: '1rem'
                    }}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      size={18}
                      color="var(--accent-gold)"
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.25s ease',
                        flexShrink: 0
                      }}
                    />
                  </button>

                  {isOpen && (
                    <div
                      style={{
                        padding: '0 1.5rem 1.35rem 1.5rem',
                        color: 'var(--text-cream)',
                        fontSize: '0.92rem',
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
        </div>
      </section>
    </div>
  );
};
