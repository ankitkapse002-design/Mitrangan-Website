import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { ShieldCheck, Search, Clock, CheckCircle2, AlertCircle, Phone, ArrowRight, User, Calendar, MapPin } from 'lucide-react';
import type { AdmissionStatus } from '@shared/types';

interface StatusResult {
  found: boolean;
  userId: string;
  maskedName: string;
  admissionStatus: AdmissionStatus;
  programPreference: string;
  pickupRequired: boolean;
  registeredDate: string;
  updatedDate: string;
}

export const StatusPage: React.FC = () => {
  const [userIdInput, setUserIdInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<StatusResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Auto-lookup if userId passed in query param
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paramId = params.get('userId');
    if (paramId) {
      setUserIdInput(paramId);
      performLookup(paramId);
    }
  }, []);

  const performLookup = async (idToQuery: string) => {
    const cleanId = idToQuery.trim();
    if (!cleanId || cleanId.length < 4) {
      setError('Please enter a valid User ID (e.g. RAHU2026-001).');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`/api/status/${encodeURIComponent(cleanId)}`);
      let data: any = {};
      try {
        data = await res.json();
      } catch {
        // Fallback for non-JSON response
      }

      if (!res.ok) {
        throw new Error(data.error || 'No admission record found with this ID.');
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Error querying admission status.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performLookup(userIdInput);
  };

  const getStatusBadge = (status: AdmissionStatus) => {
    switch (status) {
      case 'Pending':
        return (
          <span className="badge badge-pending" style={{ fontSize: '1rem', padding: '0.4rem 1rem' }}>
            <Clock size={16} />
            <span>Pending Review</span>
          </span>
        );
      case 'Under Review':
        return (
          <span className="badge badge-review" style={{ fontSize: '1rem', padding: '0.4rem 1rem' }}>
            <Clock size={16} />
            <span>Under Clinical Review</span>
          </span>
        );
      case 'Approved':
        return (
          <span className="badge badge-approved" style={{ fontSize: '1rem', padding: '0.4rem 1rem' }}>
            <CheckCircle2 size={16} />
            <span>Admission Approved</span>
          </span>
        );
      case 'Not Approved':
        return (
          <span className="badge badge-rejected" style={{ fontSize: '1rem', padding: '0.4rem 1rem' }}>
            <AlertCircle size={16} />
            <span>Application Closed / Consult Counselor</span>
          </span>
        );
      default:
        return null;
    }
  };

  const getStatusDescription = (status: AdmissionStatus) => {
    switch (status) {
      case 'Pending':
        return 'Your registration has been received and queued for initial intake assessment by our admissions team. A coordinator will contact you shortly.';
      case 'Under Review':
        return 'Our clinical counselors and medical staff are currently reviewing the patient history and bed availability to assign the optimal care program.';
      case 'Approved':
        return 'Admission has been approved. The facility is prepared to welcome the resident. If 24x7 pickup was requested, dispatch coordination is underway.';
      case 'Not Approved':
        return 'Based on the initial information, our center may not be the optimal acute facility, or specialized alternate medical care is advised. Please call our 24/7 hotline to discuss alternatives.';
    }
  };

  return (
    <div style={{ paddingTop: '8.5rem', paddingBottom: '6rem', minHeight: '90vh' }}>
      <div className="container" style={{ maxWidth: '780px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-tag">Patient Status Tracking</span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)', marginBottom: '0.85rem' }}>
            Admission Status Inquiry
          </h1>
          <p style={{ color: 'var(--text-cream)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Enter your unique <strong>User ID</strong> below to check the current review stage and admission progress of your rehabilitation enrollment.
          </p>
        </div>

        {/* Search Box */}
        <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2.5rem', border: '1px solid var(--border-gold)' }}>
          <form onSubmit={handleSearch} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem' }}>
            <div style={{ flex: '1 1 280px', position: 'relative' }}>
              <input
                type="text"
                placeholder="Enter User ID (e.g. RAHU2026-001)"
                value={userIdInput}
                onChange={e => setUserIdInput(e.target.value.toUpperCase())}
                className="form-input"
                style={{ paddingLeft: '2.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}
              />
              <Search size={18} color="var(--accent-gold)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-gold"
              style={{ padding: '0.85rem 1.8rem', minWidth: '150px' }}
            >
              {loading ? 'Searching...' : 'Check Status'}
            </button>
          </form>
        </div>

        {/* Error Display */}
        {error && (
          <div
            style={{
              backgroundColor: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.35)',
              color: '#FCA5A5',
              padding: '1.25rem 1.5rem',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.85rem',
              lineHeight: 1.6
            }}
          >
            <AlertCircle size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <p style={{ fontWeight: 600, marginBottom: '0.2rem' }}>Lookup Notice</p>
              <p style={{ fontSize: '0.92rem' }}>{error}</p>
            </div>
          </div>
        )}

        {/* Result Card */}
        {result && (
          <div className="glass-panel-gold" style={{ padding: '2.5rem', animation: 'fadeIn 0.4s ease' }}>
            {/* Status Header */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                paddingBottom: '1.75rem',
                borderBottom: '1px solid var(--border-subtle)',
                marginBottom: '1.75rem'
              }}
            >
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Admission Record
                </span>
                <h3 style={{ fontSize: '1.8rem', color: 'var(--text-ivory)', marginTop: '0.2rem' }}>
                  {result.userId}
                </h3>
              </div>

              <div>{getStatusBadge(result.admissionStatus)}</div>
            </div>

            {/* Explanation of Status */}
            <div
              style={{
                padding: '1.25rem',
                borderRadius: '10px',
                background: 'rgba(7, 18, 13, 0.75)',
                border: '1px solid var(--border-glass)',
                marginBottom: '2rem'
              }}
            >
              <p style={{ color: 'var(--text-cream)', fontSize: '0.96rem', lineHeight: 1.65 }}>
                {getStatusDescription(result.admissionStatus)}
              </p>
            </div>

            {/* Record Summary Details */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1.25rem',
                marginBottom: '2rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <User size={18} color="var(--accent-gold)" />
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block' }}>Patient Name</span>
                  <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-ivory)' }}>{result.maskedName}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Calendar size={18} color="var(--accent-gold)" />
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block' }}>Registered Date</span>
                  <span style={{ fontSize: '0.95rem', color: 'var(--text-ivory)' }}>
                    {new Date(result.registeredDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <ShieldCheck size={18} color="var(--accent-gold)" />
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block' }}>Program Interest</span>
                  <span style={{ fontSize: '0.95rem', color: 'var(--text-ivory)' }}>{result.programPreference}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <MapPin size={18} color="var(--accent-gold)" />
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block' }}>24x7 Pickup Service</span>
                  <span style={{ fontSize: '0.95rem', color: result.pickupRequired ? '#10B981' : 'var(--text-muted)' }}>
                    {result.pickupRequired ? 'Requested & Verified' : 'Not Requested'}
                  </span>
                </div>
              </div>
            </div>

            {/* Support Hotline Box */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--border-subtle)'
              }}
            >
              <div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-cream)' }}>
                  Questions regarding this status or need immediate guidance?
                </p>
              </div>

              <a href="tel:+919767362388" className="btn btn-emerald" style={{ padding: '0.65rem 1.4rem', fontSize: '0.9rem' }}>
                <Phone size={15} />
                <span>Call Admissions: +91 9767362388</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
