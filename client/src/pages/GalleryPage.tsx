import React, { useState } from 'react';
import { GALLERY_ITEMS, type GalleryItem } from '../content/gallery';
import { X, ZoomIn } from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'campus' | 'therapy' | 'events' | 'press'>('all');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const filtered = GALLERY_ITEMS.filter(item => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  return (
    <div style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3.5rem auto' }}>
          <span className="section-tag">Visual Walkthrough</span>
          <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', marginBottom: '1.25rem' }}>
            Campus &amp; Activity Gallery
          </h1>
          <p style={{ color: 'var(--text-cream)', fontSize: '1.15rem', lineHeight: 1.7 }}>
            Explore real, authentic photographs from our rehabilitation facility in Godhani, Nagpur, capturing therapeutic sessions, yoga practice, residential wards, community celebrations, and press features.
          </p>

          {/* Category Filter Tabs */}
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
              { id: 'all', label: 'All Photos (16)' },
              { id: 'campus', label: 'Campus & Facilities' },
              { id: 'therapy', label: 'Therapy & Healing' },
              { id: 'events', label: 'Events & Celebrations' },
              { id: 'press', label: 'Press & Media' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                style={{
                  padding: '0.55rem 1.25rem',
                  borderRadius: '9999px',
                  border: 'none',
                  background: activeCategory === tab.id ? 'var(--accent-gold)' : 'transparent',
                  color: activeCategory === tab.id ? '#07120D' : 'var(--text-cream)',
                  fontWeight: activeCategory === tab.id ? 600 : 500,
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

        {/* Gallery Masonry / Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.75rem'
          }}
        >
          {filtered.map(item => (
            <div
              key={item.id}
              className="glass-panel glass-panel-hover"
              onClick={() => setActiveItem(item)}
              style={{
                cursor: 'pointer',
                borderRadius: '16px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ position: 'relative', height: '250px', overflow: 'hidden' }}>
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease'
                  }}
                  onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.06)')}
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

                <div
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '12px',
                    background: 'rgba(7, 18, 13, 0.8)',
                    borderRadius: '50%',
                    width: '34px',
                    height: '34px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-ivory)'
                  }}
                >
                  <ZoomIn size={16} />
                </div>
              </div>

              <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--text-ivory)', marginBottom: '0.5rem' }}>
                    {item.title}
                  </h3>
                  <p style={{ color: 'var(--text-cream)', fontSize: '0.88rem', lineHeight: 1.55 }}>
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeItem && (
          <div
            onClick={() => setActiveItem(null)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 200,
              backgroundColor: 'rgba(4, 10, 7, 0.94)',
              backdropFilter: 'blur(16px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem'
            }}
          >
            <div
              onClick={e => e.stopPropagation()}
              className="glass-panel-gold"
              style={{
                maxWidth: '900px',
                width: '100%',
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              <button
                onClick={() => setActiveItem(null)}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'rgba(7, 18, 13, 0.85)',
                  border: '1px solid var(--border-gold)',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-ivory)',
                  cursor: 'pointer',
                  zIndex: 10
                }}
              >
                <X size={20} />
              </button>

              <img
                src={activeItem.imageSrc}
                alt={activeItem.title}
                style={{
                  width: '100%',
                  maxHeight: '65vh',
                  objectFit: 'contain',
                  backgroundColor: '#050D09'
                }}
              />

              <div style={{ padding: '1.75rem', borderTop: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {activeItem.tag}
                </span>
                <h3 style={{ fontSize: '1.5rem', color: 'var(--text-ivory)', margin: '0.35rem 0 0.5rem 0' }}>
                  {activeItem.title}
                </h3>
                <p style={{ color: 'var(--text-cream)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  {activeItem.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
