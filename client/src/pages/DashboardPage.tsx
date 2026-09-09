import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'wouter';
import { UserCheck, ShieldCheck, Calendar, Phone, MapPin, LogOut, CheckCircle2, Clock, AlertCircle, Loader2 } from 'lucide-react';
import type { RegistrationRecord } from '@shared/types';
import { MITRANGAN_CENTERS } from '../content/siteContent';

export const DashboardPage: React.FC = () => {
  const [, setLocation] = useLocation();
  const [patient, setPatient] = useState<RegistrationRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/patient/record');
        if (!res.ok) {
          if (res.status === 401) {
            setLocation('/login');
            return;
          }
          throw new Error('Failed to load patient record.');
        }
        const data = await res.json();
        setPatient(data.record);
      } catch (err: any) {
        setError(err.message || 'Error loading dashboard.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [setLocation]);

  const handleLogout = async () => {
    await fetch('/api/auth/user/logout', { method: 'POST' });
    setLocation('/login');
  };

  if (loading) {
    return (
      <div style={{ paddingTop: '10rem', textAlign: 'center', minHeight: '80vh' }}>
        <Loader2 size={36} className="spin" color="var(--accent-gold)" />
        <p style={{ marginTop: '1rem', color: 'var(--text-cream)' }}>Loading patient record...</p>
      </div>
    );
  }

  if (error || !patient) {
    return (
      <div style={{ paddingTop: '10rem', textAlign: 'center', minHeight: '80vh' }}>
        <div className="container" style={{ maxWidth: '500px' }}>
          <AlertCircle size={40} color="#F87171" style={{ margin: '0 auto 1rem auto' }} />
          <h2>Unable to Load Profile</h2>
          <p style={{ color: 'var(--text-cream)', margin: '1rem 0 2rem 0' }}>{error || 'Please log in to view your dashboard.'}</p>
          <Link href="/login" className="btn btn-gold">Return to Login</Link>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pending':
        return <span className="badge badge-pending"><Clock size={14} /> Pending Review</span>;
      case 'Under Review':
        return <span className="badge badge-review"><Clock size={14} /> Under Review</span>;
      case 'Approved':
        return <span className="badge badge-approved"><CheckCircle2 size={14} /> Admission Approved</span>;
      case 'Not Approved':
        return <span className="badge badge-rejected"><AlertCircle size={14} /> Application Closed</span>;
      default:
        return null;
    }
  };

  return (
    <div style={{ paddingTop: '8.5rem', paddingBottom: '6rem', minHeight: '90vh' }}>
      <div className="container" style={{ maxWidth: '920px' }}>
        {/* Top Bar with Logout */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '2.5rem' }}>
          <div>
            <span className="section-tag">Patient Sanctuary Portal</span>
            <h1 style={{ fontSize: '2.4rem', color: 'var(--text-ivory)' }}>
              Welcome, {patient.full_name}
            </h1>
          </div>

          <button onClick={handleLogout} className="btn btn-ghost" style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}>
            <LogOut size={15} />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Status Highlight Banner */}
        <div
          className="glass-panel-gold"
          style={{
            padding: '2rem',
            marginBottom: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem'
          }}
        >
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Your Admission Reference
            </span>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 700, color: 'var(--accent-gold)' }}>
              {patient.user_id}
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.4rem' }}>
              Current Status
            </span>
            {getStatusBadge(patient.admission_status)}
          </div>
        </div>

        {/* Profile Details Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
          {/* Card 1: Intake Information */}
          <div className="glass-panel" style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <UserCheck size={18} />
              <span>Personal Details</span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.92rem' }}>
              <div>
                <span style={{ color: 'var(--text-dim)', display: 'block', fontSize: '0.78rem' }}>Full Legal Name</span>
                <strong style={{ color: 'var(--text-ivory)' }}>{patient.full_name}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-dim)', display: 'block', fontSize: '0.78rem' }}>Age</span>
                <span style={{ color: 'var(--text-cream)' }}>{patient.age} years</span>
              </div>
              <div>
                <span style={{ color: 'var(--text-dim)', display: 'block', fontSize: '0.78rem' }}>Registered Phone</span>
                <span style={{ color: 'var(--text-cream)' }}>{patient.mobile_number}</span>
              </div>
              <div>
                <span style={{ color: 'var(--text-dim)', display: 'block', fontSize: '0.78rem' }}>Registered Residential Address</span>
                <span style={{ color: 'var(--text-cream)', lineHeight: 1.5 }}>{patient.address}</span>
              </div>
            </div>
          </div>

          {/* Card 2: Care & Program Info */}
          <div className="glass-panel" style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={18} />
              <span>Care Program &amp; Logistics</span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.92rem' }}>
              <div>
                <span style={{ color: 'var(--text-dim)', display: 'block', fontSize: '0.78rem' }}>Enrolled Program Area</span>
                <strong style={{ color: 'var(--text-ivory)' }}>{patient.program_preference || 'General Rehabilitation'}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-dim)', display: 'block', fontSize: '0.78rem' }}>24x7 Pickup Service</span>
                <span style={{ color: patient.pickup_required ? '#10B981' : 'var(--text-muted)' }}>
                  {patient.pickup_required ? 'Requested (Discreet Ambulance Support)' : 'Self Arrival / Family Escort'}
                </span>
              </div>
              <div>
                <span style={{ color: 'var(--text-dim)', display: 'block', fontSize: '0.78rem' }}>Registration Date</span>
                <span style={{ color: 'var(--text-cream)' }}>
                  {new Date(patient.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
              <div>
                <span style={{ color: 'var(--text-dim)', display: 'block', fontSize: '0.78rem' }}>Assigned Center Facility</span>
                <span style={{ color: 'var(--text-cream)' }}>
                  {MITRANGAN_CENTERS[0].name} (Godhani, Nagpur)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Assigned Center & Emergency Contact Support */}
        <div
          style={{
            padding: '2rem',
            background: 'rgba(14, 34, 26, 0.75)',
            border: '1px solid var(--border-gold)',
            borderRadius: '16px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem'
          }}
        >
          <div>
            <h4 style={{ fontSize: '1.25rem', color: 'var(--text-ivory)', marginBottom: '0.35rem' }}>
              Need immediate assistance or wish to speak with your care coordinator?
            </h4>
            <p style={{ color: 'var(--text-cream)', fontSize: '0.9rem' }}>
              Direct line to admissions director: Plot no. 7, Manasvi Hospital, Godhani, Nagpur.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <a href="tel:+919767362388" className="btn btn-gold">
              <Phone size={16} />
              <span>Call +91 9767362388</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
