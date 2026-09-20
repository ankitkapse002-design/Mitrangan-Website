import React, { useState } from 'react';
import { useLocation, Link } from 'wouter';
import { UserCheck, AlertCircle, Loader2 } from 'lucide-react';
import { SEO } from '../components/SEO';

export const LoginPage: React.FC = () => {
  const [, setLocation] = useLocation();
  const [userId, setUserId] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!userId.trim() || userId.trim().length < 4) {
      setError('Please enter a valid User ID (e.g. RAHU2026-001).');
      return;
    }
    if (!mobileNumber.trim()) {
      setError('Please enter the registered contact mobile number.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userId.trim().toUpperCase(),
          mobileNumber: mobileNumber.trim()
        })
      });

      let data: any = {};
      try {
        data = await res.json();
      } catch {
        // Fallback if response is not JSON
      }

      if (!res.ok) {
        throw new Error(data.error || 'Login verification failed. Please check your credentials.');
      }

      if (data.token) {
        localStorage.setItem('mitrangan_patient_token', data.token);
      }

      setLocation('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login verification failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ paddingTop: '9rem', paddingBottom: '7rem', minHeight: '90vh' }}>
      <SEO
        title="Patient Portal Login | Mitrangan Rehabilitation"
        description="Confidential patient portal authentication."
        noindex={true}
      />
      <div className="container" style={{ maxWidth: '480px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: 'rgba(212, 175, 55, 0.12)',
              border: '1px solid var(--border-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem auto'
            }}
          >
            <UserCheck size={26} color="var(--accent-gold)" />
          </div>

          <h1 style={{ fontSize: '2rem', marginBottom: '0.4rem' }}>
            Patient Portal
          </h1>
          <p style={{ color: 'var(--text-cream)', fontSize: '0.92rem' }}>
            Access your admission record, counseling schedule, and program progress.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '2.5rem', border: '1px solid var(--border-gold)' }}>
          {error && (
            <div
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#FCA5A5',
                padding: '0.85rem 1.1rem',
                borderRadius: '8px',
                marginBottom: '1.5rem',
                fontSize: '0.88rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label" htmlFor="patientLoginUserId">Admission User ID</label>
              <input
                id="patientLoginUserId"
                type="text"
                required
                placeholder="e.g. RAHU2026-001"
                className="form-input"
                style={{ textTransform: 'uppercase' }}
                value={userId}
                onChange={e => setUserId(e.target.value.toUpperCase())}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="patientLoginMobile">Registered Mobile Number</label>
              <input
                id="patientLoginMobile"
                type="tel"
                required
                placeholder="10-digit registered number"
                className="form-input"
                value={mobileNumber}
                onChange={e => setMobileNumber(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-gold"
              style={{ width: '100%', padding: '0.9rem', fontSize: '1rem', marginTop: '0.5rem' }}
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <UserCheck size={18} />
                  <span>Log In to Dashboard</span>
                </>
              )}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-glass)', fontSize: '0.85rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Don't have an admission User ID yet? </span>
            <Link href="/register" style={{ color: 'var(--accent-gold)', textDecoration: 'none', fontWeight: 600 }}>
              Submit Admission Form
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
