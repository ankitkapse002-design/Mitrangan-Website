import React from 'react';
import { Link } from 'wouter';
import { RECOVERY_STEPS } from '../content/siteContent';
import { SEO } from '../components/SEO';
import { Clock, Sun, Moon, Utensils, Users, Heart, Phone, ArrowRight } from 'lucide-react';

export const JourneyPage: React.FC = () => {
  const dailySchedule = [
    {
      time: "06:00 AM",
      activity: "Morning Bell & Herbal Detox Tea",
      description: "Gentle awakening and digestive hydration to begin the day with biological balance.",
      icon: <Sun size={18} color="#D4AF37" />
    },
    {
      time: "06:45 AM - 08:00 AM",
      activity: "Guided Yoga Asanas & Pranayam",
      description: "Deep breathwork to clear respiratory toxins, calm cortisol levels, and restore bodily flexibility.",
      icon: <Sun size={18} color="#D4AF37" />
    },
    {
      time: "08:30 AM - 09:15 AM",
      activity: "Wholesome Nutritious Breakfast",
      description: "Balanced whole foods designed to repair neurological and liver health damaged by substance use.",
      icon: <Utensils size={18} color="#D4AF37" />
    },
    {
      time: "09:30 AM - 11:30 AM",
      activity: "Individual Counseling & Psychological Evaluation",
      description: "One-on-one therapy exploring emotional triggers, childhood trauma, and Cognitive Behavioral Therapy.",
      icon: <Heart size={18} color="#D4AF37" />
    },
    {
      time: "11:45 AM - 01:00 PM",
      activity: "Facilitated Group Discussion & Peer Circles",
      description: "Shared vulnerability, dismantling isolation, and cultivating community accountability.",
      icon: <Users size={18} color="#D4AF37" />
    },
    {
      time: "01:15 PM - 02:00 PM",
      activity: "Nutritious Lunch & Rest Period",
      description: "Home-style vegetarian meals followed by a restful recharge period.",
      icon: <Utensils size={18} color="#D4AF37" />
    },
    {
      time: "03:30 PM - 05:00 PM",
      activity: "Life-Skills Workshops & Creative Expression",
      description: "Stress management workshops, vocational art, reading, music, and psychoeducational seminars.",
      icon: <Clock size={18} color="#D4AF37" />
    },
    {
      time: "05:15 PM - 06:30 PM",
      activity: "Outdoor Sports & Physical Fitness",
      description: "Lawn walks, volleyball, badminton, and natural endorphin stimulation in campus grounds.",
      icon: <Sun size={18} color="#D4AF37" />
    },
    {
      time: "07:00 PM - 08:00 PM",
      activity: "Evening Mindfulness & Meditation",
      description: "Inner peace contemplation, craving regulation techniques, and silent grounding.",
      icon: <Moon size={18} color="#D4AF37" />
    },
    {
      time: "08:15 PM - 09:00 PM",
      activity: "Community Dinner & Social Fellowship",
      description: "Sharing wholesome dinner in fellowship with fellow residents and care supervisors.",
      icon: <Utensils size={18} color="#D4AF37" />
    },
    {
      time: "09:30 PM - 10:00 PM",
      activity: "Gratitude Journaling & Lights Out",
      description: "Reflective journaling of daily wins and restful sleep to reinforce circadian rhythms.",
      icon: <Moon size={18} color="#D4AF37" />
    }
  ];

  return (
    <div style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
      <SEO
        title="Recovery Journey & Daily Schedule | Nasha Mukti Kendra Nagpur"
        description="Discover the structured daily routine, therapeutic phases, and recovery pathway at Mitrangan Rehabilitation Kendra in Nagpur."
        canonicalPath="/journey"
      />
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 4.5rem auto' }}>
          <span className="section-tag">The Therapeutic Routine</span>
          <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', marginBottom: '1.25rem' }}>
            The Recovery Journey &amp; Daily Life
          </h1>
          <p style={{ color: 'var(--text-cream)', fontSize: '1.15rem', lineHeight: 1.7 }}>
            Addiction disrupts body clocks and mental order. At Mitrangan, structured daily routines, dignified medical supervision, and holistic nourishment re-establish internal harmony step by step.
          </p>
        </div>

        {/* 4-Step Pathway Grid */}
        <div style={{ marginBottom: '6rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 3rem auto' }}>
            <span className="section-tag">Admission to Reintegration</span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.6rem)' }}>
              The 4 Stages of Admission &amp; Care
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
            {RECOVERY_STEPS.map((step, idx) => (
              <div key={idx} className="glass-panel-gold" style={{ padding: '2.5rem 2rem' }}>
                <span style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--accent-gold)', display: 'block', lineHeight: 1, marginBottom: '1rem' }}>
                  {step.step}
                </span>
                <h3 style={{ fontSize: '1.35rem', color: 'var(--text-ivory)', marginBottom: '0.85rem' }}>
                  {step.title}
                </h3>
                <p style={{ color: 'var(--text-cream)', fontSize: '0.92rem', lineHeight: 1.65 }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Schedule Timeline */}
        <div className="glass-panel" style={{ padding: 'clamp(2rem, 5vw, 4rem)', borderRadius: '20px', border: '1px solid var(--border-gold)' }}>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem auto' }}>
            <span className="section-tag">Circadian Restoration</span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.6rem)', marginBottom: '0.85rem' }}>
              A Typical Day at Mitrangan
            </h2>
            <p style={{ color: 'var(--text-cream)', fontSize: '0.98rem' }}>
              Structure replaces chaos. Every hour serves purpose, recovery, emotional growth, and bodily restoration.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '850px', margin: '0 auto' }}>
            {dailySchedule.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'flex-start',
                  gap: '1.5rem',
                  padding: '1.25rem 1.5rem',
                  borderRadius: '12px',
                  background: 'rgba(7, 18, 13, 0.7)',
                  border: '1px solid var(--border-glass)',
                  transition: 'border-color 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flex: '0 0 190px' }}>
                  {item.icon}
                  <strong style={{ fontFamily: 'var(--font-display)', color: 'var(--accent-gold)', fontSize: '0.95rem' }}>
                    {item.time}
                  </strong>
                </div>

                <div style={{ flex: '1 1 300px' }}>
                  <h4 style={{ fontSize: '1.1rem', color: 'var(--text-ivory)', marginBottom: '0.25rem' }}>
                    {item.activity}
                  </h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-cream)', lineHeight: 1.55 }}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Bar */}
        <div style={{ marginTop: '5rem', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>
            Ready to Begin Your Recovery Journey?
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <Link href="/register" className="btn btn-gold" style={{ padding: '0.85rem 2rem' }}>
              <span>Enroll for Admission</span>
              <ArrowRight size={16} />
            </Link>
            <a href="tel:+919767362388" className="btn btn-emerald" style={{ padding: '0.85rem 1.8rem' }}>
              <Phone size={16} />
              <span>Call +91 9767362388</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
