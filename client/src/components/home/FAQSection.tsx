import React, { useState } from 'react';
import { MITRANGAN_FAQS } from '../../content/faqs';
import { ChevronDown, HelpCircle, PhoneCall } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section style={{ padding: '6rem 0', position: 'relative' }} id="faqs">
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem auto' }}>
          <span className="section-tag">Clarity &amp; Guidance</span>
          <h2 style={{ fontSize: 'clamp(2rem, 3.8vw, 2.8rem)', marginBottom: '1rem' }}>
            Frequently Asked Questions
          </h2>
          <p style={{ color: 'var(--text-cream)', fontSize: '1.05rem', lineHeight: 1.7 }}>
            Find answers to common questions about our admission process, rehabilitation methodology, family support, and emergency pickup services.
          </p>
        </div>

        {/* Accordion List */}
        <div style={{ maxWidth: '840px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {MITRANGAN_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
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
                  onClick={() => toggle(idx)}
                  style={{
                    width: '100%',
                    padding: '1.4rem 1.75rem',
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ color: 'var(--accent-gold)', fontSize: '0.85rem' }}>0{idx + 1}.</span>
                    <span>{faq.question}</span>
                  </div>
                  <ChevronDown
                    size={19}
                    color="var(--accent-gold)"
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                      transition: 'transform 0.3s ease',
                      flexShrink: 0
                    }}
                  />
                </button>

                {isOpen && (
                  <div style={{ padding: '0 1.75rem 1.5rem 1.75rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <p style={{ color: 'var(--text-cream)', fontSize: '0.96rem', lineHeight: 1.7, marginTop: '1rem' }}>
                      {faq.answer}
                    </p>
                    <div style={{ marginTop: '0.75rem' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--accent-sage)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        Category: {faq.category}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions */}
        <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
          <p style={{ color: 'var(--text-cream)', fontSize: '1rem', marginBottom: '1rem' }}>
            Have a specific or sensitive question not answered here?
          </p>
          <a href="tel:+919767362388" className="btn btn-outline-gold">
            <PhoneCall size={16} />
            <span>Speak Privately with a Counselor: +91 9767362388</span>
          </a>
        </div>
      </div>
    </section>
  );
};
