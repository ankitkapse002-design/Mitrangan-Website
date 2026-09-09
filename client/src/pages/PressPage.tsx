import React from 'react';
import { Link } from 'wouter';
import { Newspaper, Flag, Music, Award, ArrowRight } from 'lucide-react';

export const PressPage: React.FC = () => {
  return (
    <div style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
      <div className="container">
        {/* Page Hero */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 4.5rem auto' }}>
          <span className="section-tag">Public Record &amp; Events</span>
          <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', marginBottom: '1.25rem' }}>
            Press &amp; Government Programs
          </h1>
          <p style={{ color: 'var(--text-cream)', fontSize: '1.15rem', lineHeight: 1.7 }}>
            Mitrangan Rehabilitation Center actively engages with community stakeholders, media publications, and government health initiatives to advocate for de-addiction awareness, youth guidance, and societal transformation.
          </p>
        </div>

        {/* Featured Events Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', marginBottom: '6rem' }}>
          {/* Event 1: Independence Day */}
          <div className="glass-panel-gold" style={{ overflow: 'hidden', borderRadius: '18px' }}>
            <img
              src="/assets/independence_day.jpg"
              alt="Independence Day Celebration at Mitrangan"
              style={{ width: '100%', height: '260px', objectFit: 'cover' }}
            />
            <div style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-gold)', marginBottom: '0.5rem' }}>
                <Flag size={18} />
                <span style={{ fontSize: '0.82rem', fontFamily: 'var(--font-display)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                  Annual Cultural Gathering
                </span>
              </div>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--text-ivory)', marginBottom: '0.85rem' }}>
                Mitrangan Rehabilitation Centre Celebrates Independence Day with Joy and Recovery
              </h3>
              <p style={{ color: 'var(--text-cream)', fontSize: '0.94rem', lineHeight: 1.65 }}>
                Mitrangan Rehabilitation Centre celebrated Independence Day with patriotic spirit and joyful activities. The event symbolized freedom from chemical dependency, renewed hope, and the dignified journey toward recovery for all residents.
              </p>
            </div>
          </div>

          {/* Event 2: Music Night */}
          <div className="glass-panel" style={{ overflow: 'hidden', borderRadius: '18px' }}>
            <img
              src="/assets/music_night.jpg"
              alt="Music Night at Mitrangan"
              style={{ width: '100%', height: '260px', objectFit: 'cover' }}
            />
            <div style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-gold)', marginBottom: '0.5rem' }}>
                <Music size={18} />
                <span style={{ fontSize: '0.82rem', fontFamily: 'var(--font-display)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                  Awareness Through Art
                </span>
              </div>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--text-ivory)', marginBottom: '0.85rem' }}>
                Music Night Spreads the Message of Recovery and a Drug-Free Society
              </h3>
              <p style={{ color: 'var(--text-cream)', fontSize: '0.94rem', lineHeight: 1.65 }}>
                Mitrangan Centre hosted an inspiring music night that highlighted recovery and a drug-free life. Through acoustic song, poetry, and resident performances, the event encouraged hope, unity, and positive lifestyle change in the community.
              </p>
            </div>
          </div>
        </div>

        {/* Newspaper & Media Clippings */}
        <div style={{ marginBottom: '5rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 3rem auto' }}>
            <span className="section-tag">Print Media Coverage</span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.6rem)' }}>
              Newspaper Publications &amp; Editorial Features
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <img
                src="/assets/press_clipping_1.png"
                alt="Newspaper Clipping 1"
                style={{ width: '100%', height: 'auto', borderRadius: '12px', marginBottom: '1rem', border: '1px solid var(--border-glass)' }}
              />
              <h4 style={{ fontSize: '1.15rem', color: 'var(--text-ivory)', marginBottom: '0.35rem' }}>
                Media Feature: Community De-Addiction Drives
              </h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                Coverage highlighting youth intervention seminars and community awareness camps organized by Mitrangan.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <img
                src="/assets/press_clipping_2.png"
                alt="Newspaper Clipping 2"
                style={{ width: '100%', height: 'auto', borderRadius: '12px', marginBottom: '1rem', border: '1px solid var(--border-glass)' }}
              />
              <h4 style={{ fontSize: '1.15rem', color: 'var(--text-ivory)', marginBottom: '0.35rem' }}>
                Press Report: Social Outreach &amp; Family Counseling
              </h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                Regional reporting emphasizing free consultations, moral support, and structured residential rehabilitation.
              </p>
            </div>
          </div>
        </div>

        {/* Link to Causes */}
        <div
          style={{
            padding: '2.5rem',
            background: 'rgba(14, 34, 26, 0.7)',
            borderRadius: '16px',
            border: '1px solid var(--border-gold)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem'
          }}
        >
          <div>
            <h3 style={{ fontSize: '1.4rem', color: 'var(--text-ivory)', marginBottom: '0.35rem' }}>
              Explore Our Broader Social &amp; Community Causes
            </h3>
            <p style={{ color: 'var(--text-cream)', fontSize: '0.92rem' }}>
              Discover our initiatives in Women Empowerment, Free Medical Camps, AIDS Awareness, and Environmental Protection.
            </p>
          </div>

          <Link href="/causes" className="btn btn-gold">
            <span>Explore Social Causes</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
};
