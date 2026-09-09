import React, { useState } from 'react';
import { Link } from 'wouter';
import { ALL_PROGRAMS, type Program } from '../../content/programs';
import {
  WineOff,
  ShieldAlert,
  Activity,
  Leaf,
  Pill,
  Smartphone,
  HeartPulse,
  UserCheck,
  Users,
  Home,
  Sun,
  Sparkles,
  Compass,
  CheckCircle2,
  ArrowRight,
  X
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  WineOff: <WineOff size={24} color="#D4AF37" />,
  ShieldAlert: <ShieldAlert size={24} color="#D4AF37" />,
  Activity: <Activity size={24} color="#D4AF37" />,
  Leaf: <Leaf size={24} color="#D4AF37" />,
  Pill: <Pill size={24} color="#D4AF37" />,
  Smartphone: <Smartphone size={24} color="#D4AF37" />,
  HeartPulse: <HeartPulse size={24} color="#D4AF37" />,
  UserCheck: <UserCheck size={24} color="#D4AF37" />,
  Users: <Users size={24} color="#D4AF37" />,
  Home: <Home size={24} color="#D4AF37" />,
  Sun: <Sun size={24} color="#D4AF37" />,
  Sparkles: <Sparkles size={24} color="#D4AF37" />,
  Compass: <Compass size={24} color="#D4AF37" />
};

export const ProgramsGrid: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'addiction' | 'modality' | 'holistic'>('all');
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  const filtered = ALL_PROGRAMS.filter(p => {
    if (activeFilter === 'all') return true;
    return p.category === activeFilter;
  });

  return (
    <section style={{ padding: '6.5rem 0', position: 'relative', overflow: 'hidden' }} id="services-preview">
      {/* Organic Holistic Healing Background Art */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/assets/healing_botanical_zen.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.14,
          filter: 'blur(1px)',
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, #07120D 0%, rgba(7, 18, 13, 0.7) 40%, rgba(7, 18, 13, 0.85) 80%, #07120D 100%)',
          zIndex: 2,
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 5 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem auto' }}>
          <span className="section-tag">Comprehensive Care Architecture</span>
          <h2 style={{ fontSize: 'clamp(2rem, 3.8vw, 2.8rem)', marginBottom: '1rem' }}>
            Structured Recovery &amp; Rehabilitation Programs
          </h2>
          <p style={{ color: 'var(--text-cream)', fontSize: '1.05rem', lineHeight: 1.7 }}>
            Combining clinical detoxification, individual psychological counseling, and ancient holistic healing to address both chemical dependency and emotional distress.
          </p>

          {/* Filter Tabs */}
          <div
            style={{
              display: 'inline-flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              padding: '0.4rem',
              background: 'rgba(11, 30, 23, 0.75)',
              borderRadius: '9999px',
              border: '1px solid var(--border-subtle)',
              marginTop: '2rem'
            }}
          >
            {[
              { id: 'all', label: 'All Programs' },
              { id: 'addiction', label: 'Addiction Recovery' },
              { id: 'modality', label: 'Rehabilitation Modalities' },
              { id: 'holistic', label: 'Holistic & Alternative Healing' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                style={{
                  padding: '0.55rem 1.25rem',
                  borderRadius: '9999px',
                  border: 'none',
                  background: activeFilter === tab.id ? 'var(--accent-gold)' : 'transparent',
                  color: activeFilter === tab.id ? '#07120D' : 'var(--text-cream)',
                  fontWeight: activeFilter === tab.id ? 600 : 500,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '1.75rem'
          }}
        >
          {filtered.map(program => (
            <div
              key={program.id}
              className="glass-panel glass-panel-hover"
              style={{
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div>
                {/* Icon & Category Pill */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(212, 175, 55, 0.1)',
                      border: '1px solid rgba(212, 175, 55, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {iconMap[program.icon] || <Sparkles size={24} color="#D4AF37" />}
                  </div>

                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-display)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--accent-sage)',
                      background: 'rgba(139, 168, 155, 0.08)',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '9999px'
                    }}
                  >
                    {program.category}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.45rem', marginBottom: '0.35rem', color: 'var(--text-ivory)' }}>
                  {program.title}
                </h3>
                <p style={{ color: 'var(--accent-gold)', fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.85rem' }}>
                  {program.subtitle}
                </p>

                <p style={{ color: 'var(--text-cream)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  {program.description}
                </p>

                {/* Key Features preview */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  {program.features.slice(0, 3).map((feat, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      <CheckCircle2 size={15} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1.25rem', borderTop: '1px solid var(--border-glass)' }}>
                <button
                  onClick={() => setSelectedProgram(program)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--accent-gold)',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: 0
                  }}
                >
                  <span>Program Details</span>
                  <ArrowRight size={14} />
                </button>

                <Link
                  href="/register"
                  style={{
                    fontSize: '0.82rem',
                    color: 'var(--text-cream)',
                    textDecoration: 'none',
                    padding: '0.35rem 0.85rem',
                    borderRadius: '9999px',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  Inquire
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Detail View */}
        {selectedProgram && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 150,
              backgroundColor: 'rgba(5, 13, 9, 0.85)',
              backdropFilter: 'blur(12px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem'
            }}
          >
            <div
              className="glass-panel-gold"
              style={{
                maxWidth: '600px',
                width: '100%',
                padding: '2.5rem',
                position: 'relative',
                maxHeight: '90vh',
                overflowY: 'auto'
              }}
            >
              <button
                onClick={() => setSelectedProgram(null)}
                style={{
                  position: 'absolute',
                  top: '1.25rem',
                  right: '1.25rem',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-ivory)',
                  cursor: 'pointer'
                }}
              >
                <X size={18} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '10px', backgroundColor: 'rgba(212, 175, 55, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {iconMap[selectedProgram.icon]}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.6rem', color: 'var(--text-ivory)' }}>{selectedProgram.title}</h3>
                  <p style={{ color: 'var(--accent-gold)', fontSize: '0.9rem' }}>{selectedProgram.subtitle}</p>
                </div>
              </div>

              <p style={{ color: 'var(--text-cream)', lineHeight: 1.7, marginBottom: '1.75rem' }}>
                {selectedProgram.description}
              </p>

              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.85rem' }}>
                Clinical &amp; Therapeutic Components
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                {selectedProgram.features.map((feat, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                    <CheckCircle2 size={17} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ color: 'var(--text-cream)', fontSize: '0.92rem' }}>{feat}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '1rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)' }}>
                <Link href="/register" className="btn btn-gold" style={{ flex: 1 }}>
                  <span>Apply for Admission</span>
                  <ArrowRight size={15} />
                </Link>
                <a href="tel:+919767362388" className="btn btn-emerald" style={{ flex: 1 }}>
                  <span>Call Consultant</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
