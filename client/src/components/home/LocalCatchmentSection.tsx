import React, { useState } from 'react';
import { Link } from 'wouter';
import {
  MapPin,
  Ambulance,
  Phone,
  MessageCircle,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Navigation,
  Compass,
  ArrowRight
} from 'lucide-react';

interface LocalityItem {
  name: string;
  distance: string;
  eta: string;
  tag: string;
}

const NAGPUR_LOCALITIES: LocalityItem[] = [
  { name: 'Godhani (Center Campus)', distance: '0 km', eta: 'Immediate Walk-in / 5 mins', tag: 'Headquarters' },
  { name: 'Koradi & Koradi Road', distance: '4.5 km', eta: '15 – 20 mins', tag: 'Fast Response' },
  { name: 'Mankapur & Zingabai Takli', distance: '5.2 km', eta: '15 – 20 mins', tag: 'Fast Response' },
  { name: 'Jaripatka & Clark Town', distance: '6.8 km', eta: '20 – 25 mins', tag: 'Fast Response' },
  { name: 'Sadar & Civil Lines', distance: '8.5 km', eta: '20 – 30 mins', tag: 'Central Nagpur' },
  { name: 'Sitabuldi & Railway Station Area', distance: '9.8 km', eta: '25 – 35 mins', tag: 'Central Transit' },
  { name: 'Dharampeth & Ramdaspeth', distance: '11.5 km', eta: '25 – 35 mins', tag: 'West Nagpur' },
  { name: 'Wadi & Amravati Road', distance: '13.8 km', eta: '30 – 40 mins', tag: 'West Corridor' },
  { name: 'Hingna MIDC & Trimurti Nagar', distance: '16.5 km', eta: '35 – 45 mins', tag: 'South-West Hub' },
  { name: 'Kamptee & Automotive Square', distance: '15.2 km', eta: '30 – 40 mins', tag: 'North Corridor' },
  { name: 'Wardha Road, Besa & Manish Nagar', distance: '17.8 km', eta: '35 – 45 mins', tag: 'Airport Corridor' },
  { name: 'Mahal & Gandhibagh', distance: '11.2 km', eta: '25 – 35 mins', tag: 'East Nagpur' }
];

const VIDARBHA_DISTRICTS: LocalityItem[] = [
  { name: 'Wardha & Sevagram', distance: '80 km', eta: '1.2 – 1.5 hours', tag: 'Vidarbha Core' },
  { name: 'Bhandara & Tumsar', distance: '65 km', eta: '1.0 – 1.3 hours', tag: 'Vidarbha Core' },
  { name: 'Amravati & Badnera', distance: '155 km', eta: '2.5 – 3.0 hours', tag: 'Western Vidarbha' },
  { name: 'Chandrapur & Ballarpur', distance: '150 km', eta: '2.5 – 3.0 hours', tag: 'Southern Vidarbha' },
  { name: 'Gondia & Tirora', distance: '160 km', eta: '2.5 – 3.0 hours', tag: 'Eastern Vidarbha' },
  { name: 'Yavatmal & Pusad', distance: '150 km', eta: '2.5 – 3.0 hours', tag: 'Vidarbha Belt' },
  { name: 'Gadchiroli & Bramhapuri', distance: '180 km', eta: '3.0 – 3.5 hours', tag: 'Eastern Belt' }
];

const INTERSTATE_HUBS: LocalityItem[] = [
  { name: 'Chhindwara (Madhya Pradesh)', distance: '125 km', eta: '2.0 – 2.5 hours', tag: 'MP Border Hub' },
  { name: 'Seoni (Madhya Pradesh)', distance: '130 km', eta: '2.0 – 2.5 hours', tag: 'MP Border Hub' },
  { name: 'Bhilai & Surrounding Region', distance: '270 km', eta: '4.0 – 4.5 hours', tag: 'Interstate Hub' },
  { name: 'Raipur (Chhattisgarh)', distance: '295 km', eta: 'CG Capital Zone', tag: 'Interstate Hub' }
];

export const LocalCatchmentSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'nagpur' | 'vidarbha' | 'interstate'>('nagpur');

  const getActiveList = () => {
    switch (activeTab) {
      case 'nagpur':
        return NAGPUR_LOCALITIES;
      case 'vidarbha':
        return VIDARBHA_DISTRICTS;
      case 'interstate':
        return INTERSTATE_HUBS;
      default:
        return NAGPUR_LOCALITIES;
    }
  };

  return (
    <section style={{ padding: '5.5rem 0', position: 'relative' }} id="local-coverage">
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 3.5rem auto' }}>
          <span className="section-tag">
            <Compass size={14} color="#D4AF37" />
            <span>Local Catchment &amp; Fast Emergency Transit</span>
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.9rem)', marginBottom: '1.25rem', lineHeight: 1.25 }}>
            Areas We Serve Across Nagpur &amp; Central India
          </h2>
          <p style={{ color: 'var(--text-cream)', fontSize: '1.08rem', lineHeight: 1.7 }}>
            Headquartered in Godhani, Nagpur, Mitrangan provides 24/7 rapid emergency ambulance dispatch and discrete doorstep pickup across all Nagpur metropolitan pin codes and neighboring Vidarbha districts.
          </p>
        </div>

        {/* Tab Filter Switcher */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.75rem',
            marginBottom: '2.75rem',
            flexWrap: 'wrap'
          }}
        >
          <button
            onClick={() => setActiveTab('nagpur')}
            style={{
              padding: '0.75rem 1.6rem',
              borderRadius: '9999px',
              border: activeTab === 'nagpur' ? '1px solid var(--accent-gold)' : '1px solid var(--border-subtle)',
              background: activeTab === 'nagpur' ? 'var(--accent-gold)' : 'rgba(7, 18, 13, 0.7)',
              color: activeTab === 'nagpur' ? '#07120D' : 'var(--text-ivory)',
              fontWeight: 600,
              fontSize: '0.92rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.25s ease'
            }}
          >
            <MapPin size={16} />
            <span>Nagpur Localities (Metro Core)</span>
          </button>

          <button
            onClick={() => setActiveTab('vidarbha')}
            style={{
              padding: '0.75rem 1.6rem',
              borderRadius: '9999px',
              border: activeTab === 'vidarbha' ? '1px solid var(--accent-gold)' : '1px solid var(--border-subtle)',
              background: activeTab === 'vidarbha' ? 'var(--accent-gold)' : 'rgba(7, 18, 13, 0.7)',
              color: activeTab === 'vidarbha' ? '#07120D' : 'var(--text-ivory)',
              fontWeight: 600,
              fontSize: '0.92rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.25s ease'
            }}
          >
            <Navigation size={16} />
            <span>Vidarbha Districts (Regional)</span>
          </button>

          <button
            onClick={() => setActiveTab('interstate')}
            style={{
              padding: '0.75rem 1.6rem',
              borderRadius: '9999px',
              border: activeTab === 'interstate' ? '1px solid var(--accent-gold)' : '1px solid var(--border-subtle)',
              background: activeTab === 'interstate' ? 'var(--accent-gold)' : 'rgba(7, 18, 13, 0.7)',
              color: activeTab === 'interstate' ? '#07120D' : 'var(--text-ivory)',
              fontWeight: 600,
              fontSize: '0.92rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.25s ease'
            }}
          >
            <Ambulance size={16} />
            <span>Central India Hubs (MP &amp; CG)</span>
          </button>
        </div>

        {/* Localities Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.25rem',
            marginBottom: '3.5rem'
          }}
        >
          {getActiveList().map((loc, idx) => (
            <div
              key={idx}
              className="glass-panel"
              style={{
                padding: '1.4rem 1.5rem',
                borderRadius: '14px',
                border: '1px solid var(--border-glass)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.2s ease, border-color 0.2s ease'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontFamily: 'var(--font-display)',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: 'var(--accent-gold)',
                      background: 'rgba(212, 175, 55, 0.1)',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '9999px'
                    }}
                  >
                    {loc.tag}
                  </span>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    {loc.distance}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.15rem', color: 'var(--text-ivory)', marginBottom: '0.35rem' }}>
                  {loc.name}
                </h3>
              </div>

              <div style={{ marginTop: '1rem', paddingTop: '0.85rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#10B981', fontSize: '0.82rem' }}>
                  <Clock size={14} />
                  <span>ETA: {loc.eta}</span>
                </div>

                <a
                  href="tel:+919767362388"
                  style={{
                    color: 'var(--accent-gold)',
                    textDecoration: 'none',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}
                >
                  <span>Pickup SOS</span>
                  <Phone size={12} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Localized Emergency Pickup Guarantee Box */}
        <div
          className="glass-panel"
          style={{
            padding: 'clamp(2rem, 4vw, 3rem)',
            borderRadius: '20px',
            border: '1px solid var(--border-gold)',
            background: 'linear-gradient(135deg, rgba(14, 34, 26, 0.95) 0%, rgba(7, 18, 13, 0.98) 100%)'
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-gold)', marginBottom: '0.75rem', fontWeight: 600, fontSize: '0.9rem' }}>
                <Ambulance size={20} />
                <span>24/7 Discrete Crisis Transport Guarantee</span>
              </div>
              <h3 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: 'var(--text-ivory)', marginBottom: '0.85rem' }}>
                Need Immediate Doorstep Assistance?
              </h3>
              <p style={{ color: 'var(--text-cream)', fontSize: '0.96rem', lineHeight: 1.65, margin: 0 }}>
                Our experienced counselors and medical team travel in unmarked, comfortable vehicles. We de-escalate emotional distress and provide safe transit with complete family consent.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-cream)', fontSize: '0.9rem' }}>
                <CheckCircle2 size={18} color="#10B981" />
                <span>Zero Physical Force • Certified Motivational Counseling</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-cream)', fontSize: '0.9rem' }}>
                <CheckCircle2 size={18} color="#10B981" />
                <span>Emergency Medical Stabilization on Board</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-cream)', fontSize: '0.9rem' }}>
                <CheckCircle2 size={18} color="#10B981" />
                <span>Available Across All Nagpur Pincodes &amp; Vidarbha</span>
              </div>

              <div style={{ display: 'flex', gap: '0.85rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                <a
                  href="tel:+919767362388"
                  className="btn btn-gold"
                  style={{ padding: '0.75rem 1.5rem', fontSize: '0.95rem' }}
                >
                  <Phone size={16} />
                  <span>Call +91 9767362388</span>
                </a>
                <a
                  href="https://wa.me/919767362388?text=Hello%20Mitrangan,%20I%20need%20emergency%20pickup%20support%20in%20my%20area."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                  style={{ padding: '0.75rem 1.5rem', fontSize: '0.95rem' }}
                >
                  <MessageCircle size={16} />
                  <span>WhatsApp Location</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
