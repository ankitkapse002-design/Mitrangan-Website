import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Lock, AlertCircle, Loader2 } from 'lucide-react';
import { SEO } from '../components/SEO';

export const AdminLoginPage: React.FC = () => {
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username.trim() || !password) {
      setError('Please enter both username and password.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), password })
      });

      let data: any = {};
      try {
        data = await res.json();
      } catch {
        // Fallback for non-JSON response
      }

      if (!res.ok) {
        throw new Error(data.error || 'Invalid administrator credentials.');
      }

      if (data.token) {
        localStorage.setItem('mitrangan_admin_token', data.token);
      }

      // Redirect to admin dashboard
      setLocation('/admin');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ paddingTop: '9rem', paddingBottom: '7rem', minHeight: '90vh', display: 'flex', alignItems: 'center' }}>
      <SEO
        title="Admin Portal Login | Mitrangan Rehabilitation"
        description="Administrative authentication portal."
        noindex={true}
      />
      <div className="container" style={{ maxWidth: '440px' }}>
        <div className="glass-panel" style={{ padding: 'clamp(2rem, 5vw, 3rem)', border: '1px solid var(--border-gold)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.25rem' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: 'rgba(212, 175, 55, 0.12)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto'
              }}
            >
              <Lock size={26} color="#D4AF37" />
            </div>

            <span className="section-tag">Clinical Staff &amp; Operations</span>
            <h1 style={{ fontSize: '1.9rem', marginTop: '0.4rem', color: 'var(--text-ivory)' }}>
              Administrator Login
            </h1>
            <p style={{ color: 'var(--text-cream)', fontSize: '0.86rem', marginTop: '0.5rem' }}>
              Authorized management portal for clinical intake, admission records, and patient statuses.
            </p>
          </div>

          {error && (
            <div
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.12)',
                border: '1px solid rgba(239, 68, 68, 0.35)',
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

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="adminUsername">Admin Username</label>
              <input
                id="adminUsername"
                type="text"
                required
                placeholder="Username"
                className="form-input"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="adminPassword">Password</label>
              <input
                id="adminPassword"
                type="password"
                required
                placeholder="••••••••••••"
                className="form-input"
                value={password}
                onChange={e => setPassword(e.target.value)}
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
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <Lock size={18} />
                  <span>Access Admin Console</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
