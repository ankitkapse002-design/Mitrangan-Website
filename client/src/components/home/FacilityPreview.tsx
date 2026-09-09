import React from 'react';
import { Link } from 'wouter';
import { GALLERY_ITEMS } from '../../content/gallery';
import { ArrowRight, Image as ImageIcon } from 'lucide-react';

export const FacilityPreview: React.FC = () => {
  const previewItems = GALLERY_ITEMS.slice(0, 6);

  return (
    <section style={{ padding: '6rem 0', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1.5rem', marginBottom: '3rem' }}>
          <div>
            <span className="section-tag">Authentic Campus Environment</span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.8vw, 2.8rem)', marginBottom: '0.75rem' }}>
              A Safe, Disciplined Sanctuary for Healing
            </h2>
            <p style={{ color: 'var(--text-cream)', fontSize: '1.05rem', maxWidth: '650px', lineHeight: 1.6 }}>
              Explore real photographs of our campus gardens, therapy rooms, living accommodations, and daily wellness spaces.
            </p>
          </div>

          <Link href="/gallery" className="btn btn-outline-gold">
            <ImageIcon size={16} />
            <span>View Full Gallery (16 Photos)</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Gallery Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.5rem'
          }}
        >
          {previewItems.map(item => (
            <div
              key={item.id}
              className="glass-panel"
              style={{
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '14px',
                border: '1px solid var(--border-glass)'
              }}
            >
              <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
                  }}
                  onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: 'rgba(7, 18, 13, 0.85)',
                    backdropFilter: 'blur(8px)',
                    color: 'var(--accent-gold)',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    padding: '0.25rem 0.65rem',
                    borderRadius: '9999px',
                    border: '1px solid rgba(212, 175, 55, 0.3)'
                  }}
                >
                  {item.tag}
                </span>
              </div>

              <div style={{ padding: '1.25rem' }}>
                <h4 style={{ fontSize: '1.15rem', color: 'var(--text-ivory)', marginBottom: '0.35rem' }}>
                  {item.title}
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
