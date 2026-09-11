import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { HeartHandshake, AlertCircle, Loader2 } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    mobileNumber: '',
    address: '',
    programPreference: 'General Rehabilitation',
    pickupRequired: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Client-side quick check
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      setError('Please enter a valid full name (at least 2 letters).');
      return;
    }
    const parsedAge = parseInt(formData.age, 10);
    if (isNaN(parsedAge) || parsedAge < 10 || parsedAge > 115) {
      setError('Please enter a valid age (10 - 115).');
      return;
    }
    const cleanMobile = formData.mobileNumber.replace(/\D/g, '');
    if (cleanMobile.length < 10) {
      setError('Please provide a valid 10-digit mobile number.');
      return;
    }
    if (!formData.address.trim() || formData.address.trim().length < 5) {
      setError('Please provide a full residential address.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          age: parsedAge,
          mobileNumber: formData.mobileNumber.trim(),
          address: formData.address.trim(),
          programPreference: formData.programPreference,
          pickupRequired: formData.pickupRequired
        })
      });

      let data: any = {};
      try {
        data = await res.json();
      } catch {
        // Fallback for non-JSON response
      }

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit registration. Please verify your connection.');
      }

      // Redirect to confirmation page with generated User ID
      setLocation(`/register/success?userId=${encodeURIComponent(data.userId)}&name=${encodeURIComponent(data.record.full_name)}`);
    } catch (err: any) {
      setError(err.message || 'Failed to submit registration. Please verify your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ paddingTop: '8rem', paddingBottom: '6rem', minHeight: '90vh' }}>
      <div className="container" style={{ maxWidth: '820px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-tag">Admission &amp; Care Enrollment</span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)', marginBottom: '0.85rem' }}>
            Register for Rehabilitation Admission
          </h1>
          <p style={{ color: 'var(--text-cream)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Take the crucial step toward recovery. Submit your admission details below to generate your unique admission ID and initiate personalized care planning.
          </p>
        </div>

        {/* Form Container */}
        <div className="glass-panel" style={{ padding: 'clamp(1.75rem, 4vw, 3rem)', border: '1px solid var(--border-gold)' }}>
          {error && (
            <div
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.12)',
                border: '1px solid rgba(239, 68, 68, 0.35)',
                color: '#FCA5A5',
                padding: '1rem 1.25rem',
                borderRadius: '10px',
                marginBottom: '1.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                fontSize: '0.92rem'
              }}
            >
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
              {/* Full Name */}
              <div className="form-group">
                <label className="form-label">
                  Full Name of Patient <span style={{ color: 'var(--accent-gold)' }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  className="form-input"
                  value={formData.fullName}
                  onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>

              {/* Age */}
              <div className="form-group">
                <label className="form-label">
                  Age <span style={{ color: 'var(--accent-gold)' }}>*</span>
                </label>
                <input
                  type="number"
                  required
                  min="10"
                  max="115"
                  placeholder="e.g. 28"
                  className="form-input"
                  value={formData.age}
                  onChange={e => setFormData({ ...formData, age: e.target.value })}
                />
              </div>
            </div>

            {/* Mobile Number */}
            <div className="form-group">
              <label className="form-label">
                Contact Mobile Number <span style={{ color: 'var(--accent-gold)' }}>*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="e.g. 9767362388"
                className="form-input"
                value={formData.mobileNumber}
                onChange={e => setFormData({ ...formData, mobileNumber: e.target.value })}
              />
              <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '0.35rem', display: 'block' }}>
                Used for private communication, admission coordination, and status access.
              </span>
            </div>

            {/* Address */}
            <div className="form-group">
              <label className="form-label">
                Residential Address <span style={{ color: 'var(--accent-gold)' }}>*</span>
              </label>
              <textarea
                required
                rows={3}
                placeholder="Full street address, city, district, pin code (e.g. Godhani Road, Nagpur)"
                className="form-textarea"
                value={formData.address}
                onChange={e => setFormData({ ...formData, address: e.target.value })}
              />
            </div>

            {/* Program Preference */}
            <div className="form-group">
              <label className="form-label">Program of Primary Concern</label>
              <select
                className="form-select"
                value={formData.programPreference}
                onChange={e => setFormData({ ...formData, programPreference: e.target.value })}
              >
                <option value="Alcohol Addiction Treatment">Alcohol Addiction Treatment</option>
                <option value="Drug & Substance Abuse Treatment">Drug &amp; Substance Abuse Treatment</option>
                <option value="Opioid & Heroin Addiction">Opioid &amp; Heroin Addiction</option>
                <option value="Cannabis & Synthetic Drug Addiction">Cannabis &amp; Synthetic Drug Addiction</option>
                <option value="Prescription Drug Dependency">Prescription Drug Dependency</option>
                <option value="Mobile & Digital Addiction">Mobile &amp; Digital Addiction</option>
                <option value="General Rehabilitation">General Rehabilitation &amp; Wellness</option>
              </select>
            </div>

            {/* 24x7 Pickup Request Checkbox */}
            <div
              style={{
                padding: '1.25rem',
                backgroundColor: 'rgba(212, 175, 55, 0.08)',
                border: '1px solid rgba(212, 175, 55, 0.25)',
                borderRadius: '12px',
                marginBottom: '2rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem'
              }}
            >
              <input
                type="checkbox"
                id="pickupRequired"
                style={{ width: '18px', height: '18px', marginTop: '2px', accentColor: '#D4AF37' }}
                checked={formData.pickupRequired}
                onChange={e => setFormData({ ...formData, pickupRequired: e.target.checked })}
              />
              <label htmlFor="pickupRequired" style={{ fontSize: '0.92rem', color: 'var(--text-ivory)', cursor: 'pointer' }}>
                <strong style={{ color: 'var(--accent-gold)' }}>*Request 24x7 Discreet Pickup Assistance</strong>
                <span style={{ display: 'block', color: 'var(--text-cream)', fontSize: '0.82rem', marginTop: '0.2rem' }}>
                  Check this if the patient or family requires safe, supportive transportation to our center.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-gold"
              style={{ width: '100%', padding: '1rem', fontSize: '1.05rem' }}
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="spin" />
                  <span>Processing Admission...</span>
                </>
              ) : (
                <>
                  <HeartHandshake size={19} />
                  <span>Submit Admission &amp; Generate User ID</span>
                </>
              )}
            </button>

            {/* Privacy Assurance */}
            <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '1.25rem' }}>
              Your information is protected with medical confidentiality. We do not share personal records with third parties.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
