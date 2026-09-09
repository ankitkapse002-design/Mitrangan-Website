import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'wouter';
import {
  Shield,
  Users,
  Clock,
  CheckCircle2,
  AlertCircle,
  Search,
  Filter,
  LogOut,
  Edit3,
  FileText,
  Loader2,
  X,
  History,
  Phone,
  Calendar,
  Check,
  Plus,
  Trash2,
  ExternalLink,
  BookOpen,
  Sparkles
} from 'lucide-react';
import type { RegistrationRecord, AdmissionStatus, StatsOverview, AuditLogEntry, BlogPostRecord, BlogContentSection } from '@shared/types';

interface BlogSectionForm {
  sectionHeading: string;
  paragraphsText: string;
  bulletPointsText: string;
}

const DEFAULT_BLOG_FORM = {
  title: '',
  slug: '',
  subtitle: '',
  category: 'Recovery Guide',
  author: 'Mitrangan Clinical Editorial Team',
  read_time: '5 min read',
  excerpt: '',
  cover_image: '/assets/facility_walkway.jpg',
  sections: [
    {
      sectionHeading: 'Clinical Insight & Recovery Context',
      paragraphsText: 'Write the primary clinical context and therapeutic explanation here...',
      bulletPointsText: 'Key takeaway or recommendation 1\nKey takeaway or recommendation 2'
    }
  ]
};

const PRESET_IMAGES = [
  { label: 'Campus Walkway', url: '/assets/facility_walkway.jpg' },
  { label: 'Counseling Session', url: '/assets/counseling_session.jpg' },
  { label: 'Yoga Activity', url: '/assets/yoga_activity.jpg' },
  { label: 'Group Therapy', url: '/assets/group_therapy.jpg' },
  { label: 'Facility Garden', url: '/assets/facility_garden.jpg' },
  { label: 'Campus Building', url: '/assets/campus_building.webp' }
];

export const AdminDashboardPage: React.FC = () => {
  const [, setLocation] = useLocation();
  const [stats, setStats] = useState<StatsOverview | null>(null);
  const [registrations, setRegistrations] = useState<RegistrationRecord[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);
  const [blogs, setBlogs] = useState<BlogPostRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Active Main Tab: registrations | blogs | audit
  const [activeTab, setActiveTab] = useState<'registrations' | 'blogs' | 'audit'>('registrations');

  // Registration Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  // Status update modal state
  const [activeRecord, setActiveRecord] = useState<RegistrationRecord | null>(null);
  const [newStatus, setNewStatus] = useState<AdmissionStatus>('Pending');
  const [statusNotes, setStatusNotes] = useState('');
  const [updating, setUpdating] = useState(false);
  const [updateMsg, setUpdateMsg] = useState<string | null>(null);

  // Blog Management state
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState<number | null>(null);
  const [blogFormData, setBlogFormData] = useState(DEFAULT_BLOG_FORM);
  const [blogSaving, setBlogSaving] = useState(false);
  const [blogFeedback, setBlogFeedback] = useState<string | null>(null);

  const adminFetch = (url: string, options: RequestInit = {}) => {
    const token = localStorage.getItem('mitrangan_admin_token');
    const headers = new Headers(options.headers || {});
    if (token && !headers.has('Authorization')) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return fetch(url, { ...options, headers });
  };

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Verify session
      const authRes = await adminFetch('/api/auth/admin/me');
      if (!authRes.ok) {
        localStorage.removeItem('mitrangan_admin_token');
        setLocation('/admin/login');
        return;
      }

      // Fetch stats
      const statsRes = await adminFetch('/api/admin/stats');
      if (statsRes.ok) {
        setStats(await statsRes.json());
      }

      // Fetch registrations
      let url = '/api/admin/registrations';
      const params = new URLSearchParams();
      if (selectedStatus !== 'All') params.append('status', selectedStatus);
      if (searchQuery.trim()) params.append('search', searchQuery.trim());
      if (params.toString()) url += `?${params.toString()}`;

      const regRes = await adminFetch(url);
      if (regRes.ok) {
        const data = await regRes.json();
        setRegistrations(data.registrations || []);
      }

      // Fetch audit logs
      const auditRes = await adminFetch('/api/admin/audit-logs');
      if (auditRes.ok) {
        const aData = await auditRes.json();
        setAuditLogs(aData.logs || []);
      }

      // Fetch blogs
      const blogRes = await fetch('/api/blogs');
      if (blogRes.ok) {
        const bData = await blogRes.json();
        setBlogs(bData.blogs || []);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load administration data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [selectedStatus]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchDashboardData();
  };

  const handleLogout = async () => {
    localStorage.removeItem('mitrangan_admin_token');
    try {
      await fetch('/api/auth/admin/logout', { method: 'POST' });
    } catch {
      // ignore network errors on logout
    }
    setLocation('/admin/login');
  };

  // Status Modal Controls
  const openStatusModal = (rec: RegistrationRecord) => {
    setActiveRecord(rec);
    setNewStatus(rec.admission_status);
    setStatusNotes(rec.notes || '');
    setUpdateMsg(null);
  };

  const submitStatusUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeRecord) return;

    setUpdating(true);
    setUpdateMsg(null);
    try {
      const res = await adminFetch(`/api/admin/registrations/${encodeURIComponent(activeRecord.user_id)}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, notes: statusNotes })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update admission status.');
      }

      setUpdateMsg('Status successfully updated!');
      setTimeout(() => {
        setActiveRecord(null);
        fetchDashboardData();
      }, 800);
    } catch (err: any) {
      setUpdateMsg(`Error: ${err.message}`);
    } finally {
      setUpdating(false);
    }
  };

  // Blog Management Controls
  const openCreateBlogModal = () => {
    setEditingBlogId(null);
    setBlogFormData({
      ...DEFAULT_BLOG_FORM,
      slug: `guide-${Date.now().toString().slice(-4)}`
    });
    setBlogFeedback(null);
    setIsBlogModalOpen(true);
  };

  const openEditBlogModal = (blog: BlogPostRecord) => {
    setEditingBlogId(blog.id);
    setBlogFormData({
      title: blog.title,
      slug: blog.slug,
      subtitle: blog.subtitle,
      category: blog.category,
      author: blog.author,
      read_time: blog.read_time,
      excerpt: blog.excerpt,
      cover_image: blog.cover_image,
      sections: blog.content.map(sec => ({
        sectionHeading: sec.sectionHeading,
        paragraphsText: sec.paragraphs.join('\n\n'),
        bulletPointsText: (sec.bulletPoints || []).join('\n')
      }))
    });
    setBlogFeedback(null);
    setIsBlogModalOpen(true);
  };

  const handleAddSection = () => {
    setBlogFormData({
      ...blogFormData,
      sections: [
        ...blogFormData.sections,
        { sectionHeading: 'New Therapeutic Section', paragraphsText: '', bulletPointsText: '' }
      ]
    });
  };

  const handleRemoveSection = (idx: number) => {
    if (blogFormData.sections.length <= 1) return;
    const updated = [...blogFormData.sections];
    updated.splice(idx, 1);
    setBlogFormData({ ...blogFormData, sections: updated });
  };

  const handleSectionChange = (idx: number, field: keyof BlogSectionForm, val: string) => {
    const updated = [...blogFormData.sections];
    updated[idx] = { ...updated[idx], [field]: val };
    setBlogFormData({ ...blogFormData, sections: updated });
  };

  const submitBlogForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setBlogSaving(true);
    setBlogFeedback(null);

    // Format content sections
    const parsedSections: BlogContentSection[] = blogFormData.sections.map(s => ({
      sectionHeading: s.sectionHeading.trim() || 'General Insights',
      paragraphs: s.paragraphsText
        .split('\n')
        .map(p => p.trim())
        .filter(p => p.length > 0),
      bulletPoints: s.bulletPointsText
        ? s.bulletPointsText.split('\n').map(b => b.trim()).filter(b => b.length > 0)
        : []
    }));

    if (parsedSections.length === 0 || parsedSections[0].paragraphs.length === 0) {
      setBlogFeedback('Error: Please write at least one paragraph in the content section.');
      setBlogSaving(false);
      return;
    }

    const payload = {
      title: blogFormData.title.trim(),
      slug: blogFormData.slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-'),
      subtitle: blogFormData.subtitle.trim(),
      category: blogFormData.category.trim(),
      author: blogFormData.author.trim(),
      read_time: blogFormData.read_time.trim(),
      excerpt: blogFormData.excerpt.trim(),
      cover_image: blogFormData.cover_image.trim(),
      content: parsedSections
    };

    try {
      let res: Response;
      if (editingBlogId) {
        res = await adminFetch(`/api/admin/blogs/${editingBlogId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        res = await adminFetch('/api/admin/blogs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save blog post.');
      }

      setBlogFeedback('Article successfully saved and published!');
      setTimeout(() => {
        setIsBlogModalOpen(false);
        fetchDashboardData();
      }, 900);
    } catch (err: any) {
      setBlogFeedback(`Error: ${err.message}`);
    } finally {
      setBlogSaving(false);
    }
  };

  const handleDeleteBlog = async (id: number, title: string) => {
    if (!window.confirm(`Are you sure you want to delete article "${title}"? This action is permanent.`)) {
      return;
    }

    try {
      const res = await adminFetch(`/api/admin/blogs/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Failed to delete article.');
        return;
      }
      fetchDashboardData();
    } catch (err: any) {
      alert(`Error deleting blog: ${err.message}`);
    }
  };

  const renderBadge = (status: AdmissionStatus) => {
    switch (status) {
      case 'Pending':
        return <span className="badge badge-pending">Pending</span>;
      case 'Under Review':
        return <span className="badge badge-review">Under Review</span>;
      case 'Approved':
        return <span className="badge badge-approved">Approved</span>;
      case 'Not Approved':
        return <span className="badge badge-rejected">Not Approved</span>;
    }
  };

  return (
    <div style={{ paddingTop: '7.5rem', paddingBottom: '6rem', minHeight: '95vh', backgroundColor: '#07120D' }}>
      <div className="container" style={{ maxWidth: '1360px' }}>
        {/* Top Header */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            marginBottom: '2rem',
            paddingBottom: '1.5rem',
            borderBottom: '1px solid var(--border-subtle)'
          }}
        >
          <div>
            <span className="section-tag">Clinical &amp; Editorial Management</span>
            <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', color: 'var(--text-ivory)', marginTop: '0.35rem' }}>
              Mitrangan Control Console
            </h1>
          </div>

          {/* Primary Navigation Tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={() => setActiveTab('registrations')}
              className={activeTab === 'registrations' ? 'btn btn-gold' : 'btn btn-ghost'}
              style={{ fontSize: '0.85rem', padding: '0.55rem 1.1rem' }}
            >
              <Users size={15} />
              <span>Admissions Registry ({registrations.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('blogs')}
              className={activeTab === 'blogs' ? 'btn btn-gold' : 'btn btn-ghost'}
              style={{ fontSize: '0.85rem', padding: '0.55rem 1.1rem' }}
            >
              <BookOpen size={15} />
              <span>Articles &amp; Blog CMS ({blogs.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('audit')}
              className={activeTab === 'audit' ? 'btn btn-gold' : 'btn btn-ghost'}
              style={{ fontSize: '0.85rem', padding: '0.55rem 1.1rem' }}
            >
              <History size={15} />
              <span>Audit History ({auditLogs.length})</span>
            </button>

            <button
              onClick={handleLogout}
              className="btn btn-outline-gold"
              style={{ fontSize: '0.85rem', padding: '0.55rem 1rem' }}
              title="Sign Out of Administration"
            >
              <LogOut size={15} />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Stats Cards (KPI Overview) */}
        {stats && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
              gap: '1.25rem',
              marginBottom: '2.5rem'
            }}
          >
            {/* Total */}
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Total Registrations
                </span>
                <Users size={18} color="var(--accent-gold)" />
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 700, color: 'var(--text-ivory)' }}>
                {stats.totalRegistrations}
              </div>
            </div>

            {/* Pending */}
            <div className="glass-panel" style={{ padding: '1.5rem', borderLeft: '4px solid #F59E0B' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Pending Review
                </span>
                <Clock size={18} color="#F59E0B" />
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 700, color: '#F59E0B' }}>
                {stats.pendingCount}
              </div>
            </div>

            {/* Under Review */}
            <div className="glass-panel" style={{ padding: '1.5rem', borderLeft: '4px solid #0EA5E9' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Under Clinical Review
                </span>
                <Clock size={18} color="#0EA5E9" />
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 700, color: '#0EA5E9' }}>
                {stats.underReviewCount}
              </div>
            </div>

            {/* Approved */}
            <div className="glass-panel" style={{ padding: '1.5rem', borderLeft: '4px solid #10B981' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Approved
                </span>
                <CheckCircle2 size={18} color="#10B981" />
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 700, color: '#10B981' }}>
                {stats.approvedCount}
              </div>
            </div>

            {/* Published Articles */}
            <div className="glass-panel" style={{ padding: '1.5rem', borderLeft: '4px solid #D4AF37' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Live Blog Guides
                </span>
                <BookOpen size={18} color="#D4AF37" />
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 700, color: '#D4AF37' }}>
                {blogs.length}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 1: REGISTRATIONS REGISTRY */}
        {/* ======================================================== */}
        {activeTab === 'registrations' && (
          <div className="glass-panel" style={{ padding: '2rem', border: '1px solid var(--border-gold)' }}>
            {/* Search & Filter Header */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1.25rem',
                marginBottom: '2rem'
              }}
            >
              {/* Search Form */}
              <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '0.5rem', flex: '1 1 320px', maxWidth: '480px' }}>
                <div style={{ position: 'relative', width: '100%' }}>
                  <input
                    type="text"
                    placeholder="Search by User ID, Patient Name, or Mobile..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="form-input"
                    style={{ paddingLeft: '2.5rem', fontSize: '0.9rem' }}
                  />
                  <Search size={16} color="var(--accent-gold)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
                <button type="submit" className="btn btn-gold" style={{ padding: '0.75rem 1.25rem' }}>
                  Search
                </button>
              </form>

              {/* Status Filter Buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', alignItems: 'center' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginRight: '0.4rem' }}>Status:</span>
                {['All', 'Pending', 'Under Review', 'Approved', 'Not Approved'].map(st => (
                  <button
                    key={st}
                    onClick={() => setSelectedStatus(st)}
                    style={{
                      padding: '0.4rem 0.9rem',
                      borderRadius: '9999px',
                      border: selectedStatus === st ? '1px solid var(--accent-gold)' : '1px solid var(--border-subtle)',
                      background: selectedStatus === st ? 'rgba(212, 175, 55, 0.18)' : 'transparent',
                      color: selectedStatus === st ? 'var(--accent-gold)' : 'var(--text-cream)',
                      fontSize: '0.8rem',
                      fontWeight: selectedStatus === st ? 600 : 400,
                      cursor: 'pointer'
                    }}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(212, 175, 55, 0.2)', color: 'var(--accent-gold)' }}>
                    <th style={{ padding: '1rem 0.75rem', fontFamily: 'var(--font-display)', fontWeight: 600 }}>User ID</th>
                    <th style={{ padding: '1rem 0.75rem', fontFamily: 'var(--font-display)', fontWeight: 600 }}>Patient Name</th>
                    <th style={{ padding: '1rem 0.75rem', fontFamily: 'var(--font-display)', fontWeight: 600 }}>Age</th>
                    <th style={{ padding: '1rem 0.75rem', fontFamily: 'var(--font-display)', fontWeight: 600 }}>Mobile</th>
                    <th style={{ padding: '1rem 0.75rem', fontFamily: 'var(--font-display)', fontWeight: 600 }}>Pickup Req.</th>
                    <th style={{ padding: '1rem 0.75rem', fontFamily: 'var(--font-display)', fontWeight: 600 }}>Registered Date</th>
                    <th style={{ padding: '1rem 0.75rem', fontFamily: 'var(--font-display)', fontWeight: 600 }}>Admission Status</th>
                    <th style={{ padding: '1rem 0.75rem', fontFamily: 'var(--font-display)', fontWeight: 600, textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {registrations.length === 0 ? (
                    <tr>
                      <td colSpan={8} style={{ textAlign: 'center', padding: '3.5rem 1rem', color: 'var(--text-muted)' }}>
                        No admissions records match the active criteria.
                      </td>
                    </tr>
                  ) : (
                    registrations.map(rec => (
                      <tr
                        key={rec.user_id}
                        style={{
                          borderBottom: '1px solid var(--border-glass)',
                          transition: 'background 0.2s ease'
                        }}
                        onMouseOver={e => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)')}
                        onMouseOut={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                      >
                        <td style={{ padding: '1rem 0.75rem', fontWeight: 600, color: 'var(--accent-gold)' }}>
                          {rec.user_id}
                        </td>
                        <td style={{ padding: '1rem 0.75rem', color: 'var(--text-ivory)', fontWeight: 500 }}>
                          {rec.full_name}
                        </td>
                        <td style={{ padding: '1rem 0.75rem', color: 'var(--text-cream)' }}>
                          {rec.age}
                        </td>
                        <td style={{ padding: '1rem 0.75rem', color: 'var(--text-cream)' }}>
                          {rec.mobile_number}
                        </td>
                        <td style={{ padding: '1rem 0.75rem' }}>
                          {rec.pickup_required ? (
                            <span style={{ color: '#10B981', fontWeight: 600, fontSize: '0.8rem' }}>*Yes (24/7)</span>
                          ) : (
                            <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>No</span>
                          )}
                        </td>
                        <td style={{ padding: '1rem 0.75rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                          {new Date(rec.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </td>
                        <td style={{ padding: '1rem 0.75rem' }}>
                          {renderBadge(rec.admission_status)}
                        </td>
                        <td style={{ padding: '1rem 0.75rem', textAlign: 'right' }}>
                          <button
                            onClick={() => openStatusModal(rec)}
                            className="btn btn-outline-gold"
                            style={{ padding: '0.35rem 0.85rem', fontSize: '0.8rem' }}
                          >
                            <Edit3 size={13} />
                            <span>Update Status</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: BLOG & ARTICLES CMS */}
        {/* ======================================================== */}
        {activeTab === 'blogs' && (
          <div className="glass-panel" style={{ padding: '2rem', border: '1px solid var(--border-gold)' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '2rem' }}>
              <div>
                <h2 style={{ fontSize: '1.4rem', color: 'var(--text-ivory)' }}>
                  Clinical Articles &amp; Recovery Guides Management
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '0.25rem' }}>
                  Articles published here appear dynamically across the Mitrangan Homepage, the /blogs repository, and individual guide pages.
                </p>
              </div>

              <button
                onClick={openCreateBlogModal}
                className="btn btn-gold"
                style={{ padding: '0.65rem 1.4rem', fontSize: '0.88rem' }}
              >
                <Plus size={16} />
                <span>Publish New Article</span>
              </button>
            </div>

            {/* Blog List Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(212, 175, 55, 0.2)', color: 'var(--accent-gold)' }}>
                    <th style={{ padding: '1rem 0.75rem', fontFamily: 'var(--font-display)', fontWeight: 600 }}>Cover</th>
                    <th style={{ padding: '1rem 0.75rem', fontFamily: 'var(--font-display)', fontWeight: 600 }}>Article Title</th>
                    <th style={{ padding: '1rem 0.75rem', fontFamily: 'var(--font-display)', fontWeight: 600 }}>Category</th>
                    <th style={{ padding: '1rem 0.75rem', fontFamily: 'var(--font-display)', fontWeight: 600 }}>Published Date</th>
                    <th style={{ padding: '1rem 0.75rem', fontFamily: 'var(--font-display)', fontWeight: 600 }}>Read Time</th>
                    <th style={{ padding: '1rem 0.75rem', fontFamily: 'var(--font-display)', fontWeight: 600, textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ textAlign: 'center', padding: '3.5rem 1rem', color: 'var(--text-muted)' }}>
                        No articles published yet. Click "Publish New Article" to add the first guide.
                      </td>
                    </tr>
                  ) : (
                    blogs.map(b => (
                      <tr
                        key={b.id}
                        style={{ borderBottom: '1px solid var(--border-glass)' }}
                      >
                        <td style={{ padding: '0.85rem 0.75rem' }}>
                          <img
                            src={b.cover_image}
                            alt={b.title}
                            style={{ width: '56px', height: '40px', objectFit: 'cover', borderRadius: '6px', border: '1px solid var(--border-glass)' }}
                          />
                        </td>
                        <td style={{ padding: '0.85rem 0.75rem', maxWidth: '380px' }}>
                          <strong style={{ color: 'var(--text-ivory)', display: 'block', fontSize: '0.95rem' }}>
                            {b.title}
                          </strong>
                          <span style={{ color: 'var(--accent-gold)', fontSize: '0.78rem' }}>
                            /blogs/{b.slug}
                          </span>
                        </td>
                        <td style={{ padding: '0.85rem 0.75rem', color: 'var(--accent-sage)', fontSize: '0.85rem' }}>
                          {b.category}
                        </td>
                        <td style={{ padding: '0.85rem 0.75rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                          {b.date}
                        </td>
                        <td style={{ padding: '0.85rem 0.75rem', color: 'var(--text-cream)', fontSize: '0.85rem' }}>
                          {b.read_time}
                        </td>
                        <td style={{ padding: '0.85rem 0.75rem', textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                            <Link
                              href={`/blogs/${b.slug}`}
                              target="_blank"
                              className="btn btn-ghost"
                              style={{ padding: '0.35rem 0.65rem', fontSize: '0.78rem' }}
                              title="View on site"
                            >
                              <ExternalLink size={13} />
                            </Link>

                            <button
                              onClick={() => openEditBlogModal(b)}
                              className="btn btn-outline-gold"
                              style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
                            >
                              <Edit3 size={13} />
                              <span>Edit</span>
                            </button>

                            <button
                              onClick={() => handleDeleteBlog(b.id, b.title)}
                              className="btn btn-ghost"
                              style={{ padding: '0.35rem 0.65rem', fontSize: '0.78rem', color: '#F87171' }}
                              title="Delete article"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: AUDIT LOGS VIEW */}
        {/* ======================================================== */}
        {activeTab === 'audit' && (
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.35rem', color: 'var(--accent-gold)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <History size={20} />
              <span>Administrative Audit History</span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {auditLogs.length === 0 ? (
                <p style={{ color: 'var(--text-muted)', padding: '2rem 0', textAlign: 'center' }}>No administrative audit events recorded yet.</p>
              ) : (
                auditLogs.map(log => (
                  <div
                    key={log.id}
                    style={{
                      padding: '1rem 1.25rem',
                      borderRadius: '10px',
                      background: 'rgba(7, 18, 13, 0.7)',
                      border: '1px solid var(--border-glass)',
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1rem',
                      fontSize: '0.88rem'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.25rem' }}>
                        <span style={{ fontWeight: 600, color: 'var(--text-ivory)' }}>{log.action}</span>
                        {log.target_id && (
                          <span style={{ color: 'var(--accent-gold)', fontWeight: 600 }}>({log.target_id})</span>
                        )}
                      </div>
                      <p style={{ color: 'var(--text-cream)', fontSize: '0.82rem' }}>
                        Performed by: <strong>{log.performed_by}</strong>
                        {log.details && (
                          <span style={{ marginLeft: '0.5rem', color: 'var(--text-muted)' }}>
                            • {JSON.stringify(log.details)}
                          </span>
                        )}
                      </p>
                    </div>

                    <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>
                      {new Date(log.timestamp).toLocaleString()}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* MODAL 1: UPDATE ADMISSION STATUS */}
        {/* ======================================================== */}
        {activeRecord && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 200,
              backgroundColor: 'rgba(5, 13, 9, 0.88)',
              backdropFilter: 'blur(12px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem'
            }}
          >
            <div className="glass-panel-gold" style={{ maxWidth: '560px', width: '100%', padding: '2.5rem', position: 'relative' }}>
              <button
                onClick={() => setActiveRecord(null)}
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

              <span className="section-tag">Status Governance</span>
              <h3 style={{ fontSize: '1.6rem', color: 'var(--text-ivory)', margin: '0.4rem 0 1rem 0' }}>
                Update Admission Status
              </h3>

              <div style={{ padding: '1rem', background: 'rgba(7, 18, 13, 0.8)', borderRadius: '10px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                <p><strong>Patient:</strong> {activeRecord.full_name} ({activeRecord.age} yrs)</p>
                <p><strong>User ID:</strong> <span style={{ color: 'var(--accent-gold)' }}>{activeRecord.user_id}</span></p>
                <p><strong>Mobile:</strong> {activeRecord.mobile_number}</p>
                <p><strong>Address:</strong> {activeRecord.address}</p>
                <p><strong>Pickup Req:</strong> {activeRecord.pickup_required ? 'Yes (24/7)' : 'No'}</p>
              </div>

              {updateMsg && (
                <div
                  style={{
                    padding: '0.85rem',
                    borderRadius: '8px',
                    backgroundColor: updateMsg.startsWith('Error') ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                    color: updateMsg.startsWith('Error') ? '#FCA5A5' : '#6EE7B7',
                    marginBottom: '1.25rem',
                    fontSize: '0.88rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Check size={16} />
                  <span>{updateMsg}</span>
                </div>
              )}

              <form onSubmit={submitStatusUpdate}>
                <div className="form-group">
                  <label className="form-label">New Admission Status</label>
                  <select
                    className="form-select"
                    value={newStatus}
                    onChange={e => setNewStatus(e.target.value as AdmissionStatus)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Approved">Approved</option>
                    <option value="Not Approved">Not Approved</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Internal Clinical Notes (Not shared on public status query)</label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Bed assigned; intake meeting scheduled..."
                    className="form-textarea"
                    value={statusNotes}
                    onChange={e => setStatusNotes(e.target.value)}
                  />
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.75rem' }}>
                  <button type="submit" disabled={updating} className="btn btn-gold" style={{ flex: 1 }}>
                    {updating ? 'Saving Changes...' : 'Save & Publish Status'}
                  </button>
                  <button type="button" onClick={() => setActiveRecord(null)} className="btn btn-ghost">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* MODAL 2: CREATE / EDIT BLOG POST */}
        {/* ======================================================== */}
        {isBlogModalOpen && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 210,
              backgroundColor: 'rgba(4, 10, 7, 0.92)',
              backdropFilter: 'blur(16px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem',
              overflowY: 'auto'
            }}
          >
            <div
              className="glass-panel-gold"
              style={{
                maxWidth: '780px',
                width: '100%',
                maxHeight: '92vh',
                overflowY: 'auto',
                padding: '2.5rem',
                position: 'relative'
              }}
            >
              <button
                onClick={() => setIsBlogModalOpen(false)}
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

              <span className="section-tag">
                <Sparkles size={13} />
                <span>{editingBlogId ? 'Article Editor' : 'Create Article'}</span>
              </span>

              <h3 style={{ fontSize: '1.7rem', color: 'var(--text-ivory)', margin: '0.4rem 0 1.25rem 0' }}>
                {editingBlogId ? 'Edit Clinical Guide' : 'Publish New Rehabilitation Guide'}
              </h3>

              {blogFeedback && (
                <div
                  style={{
                    padding: '0.85rem',
                    borderRadius: '8px',
                    backgroundColor: blogFeedback.startsWith('Error') ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                    color: blogFeedback.startsWith('Error') ? '#FCA5A5' : '#6EE7B7',
                    marginBottom: '1.25rem',
                    fontSize: '0.88rem'
                  }}
                >
                  {blogFeedback}
                </div>
              )}

              <form onSubmit={submitBlogForm}>
                {/* Title */}
                <div className="form-group">
                  <label className="form-label">Article Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alcohol Withdrawal: Clinical Symptoms & Hospitalization Criteria"
                    className="form-input"
                    value={blogFormData.title}
                    onChange={e => {
                      const title = e.target.value;
                      const autoSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                      setBlogFormData({
                        ...blogFormData,
                        title,
                        slug: editingBlogId ? blogFormData.slug : autoSlug
                      });
                    }}
                  />
                </div>

                {/* Slug & Category */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">URL Slug (lowercase &amp; dashes) *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. alcohol-withdrawal-symptoms"
                      className="form-input"
                      value={blogFormData.slug}
                      onChange={e => setBlogFormData({ ...blogFormData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select
                      className="form-select"
                      value={blogFormData.category}
                      onChange={e => setBlogFormData({ ...blogFormData, category: e.target.value })}
                    >
                      <option value="Recovery Guide">Recovery Guide</option>
                      <option value="Clinical Advice">Clinical Advice</option>
                      <option value="Family Support">Family Support</option>
                      <option value="Holistic Healing">Holistic Healing</option>
                      <option value="Community Outreach">Community Outreach</option>
                    </select>
                  </div>
                </div>

                {/* Subtitle */}
                <div className="form-group">
                  <label className="form-label">Subtitle / Deck *</label>
                  <input
                    type="text"
                    required
                    placeholder="A concise summary statement describing the purpose of the article"
                    className="form-input"
                    value={blogFormData.subtitle}
                    onChange={e => setBlogFormData({ ...blogFormData, subtitle: e.target.value })}
                  />
                </div>

                {/* Read Time & Author */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Estimated Read Time</label>
                    <input
                      type="text"
                      placeholder="e.g. 5 min read"
                      className="form-input"
                      value={blogFormData.read_time}
                      onChange={e => setBlogFormData({ ...blogFormData, read_time: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Author / Attribution</label>
                    <input
                      type="text"
                      placeholder="e.g. Mitrangan Clinical Editorial Team"
                      className="form-input"
                      value={blogFormData.author}
                      onChange={e => setBlogFormData({ ...blogFormData, author: e.target.value })}
                    />
                  </div>
                </div>

                {/* Cover Image Preset Picker */}
                <div className="form-group">
                  <label className="form-label">Cover Image</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    {PRESET_IMAGES.map(img => (
                      <button
                        type="button"
                        key={img.url}
                        onClick={() => setBlogFormData({ ...blogFormData, cover_image: img.url })}
                        style={{
                          padding: '0.35rem 0.75rem',
                          borderRadius: '6px',
                          border: blogFormData.cover_image === img.url ? '1px solid var(--accent-gold)' : '1px solid var(--border-glass)',
                          background: blogFormData.cover_image === img.url ? 'rgba(212, 175, 55, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                          color: 'var(--text-cream)',
                          fontSize: '0.8rem',
                          cursor: 'pointer'
                        }}
                      >
                        {img.label}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="/assets/facility_walkway.jpg"
                    className="form-input"
                    value={blogFormData.cover_image}
                    onChange={e => setBlogFormData({ ...blogFormData, cover_image: e.target.value })}
                  />
                </div>

                {/* Excerpt */}
                <div className="form-group">
                  <label className="form-label">Card Excerpt (Shown on Homepage and Blog Archive) *</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Short 2-3 sentence teaser to invite readers..."
                    className="form-textarea"
                    value={blogFormData.excerpt}
                    onChange={e => setBlogFormData({ ...blogFormData, excerpt: e.target.value })}
                  />
                </div>

                {/* Dynamic Content Sections */}
                <div style={{ marginTop: '2rem', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <h4 style={{ fontSize: '1.1rem', color: 'var(--accent-gold)' }}>
                      Article Content Sections ({blogFormData.sections.length})
                    </h4>
                    <button
                      type="button"
                      onClick={handleAddSection}
                      className="btn btn-outline-gold"
                      style={{ padding: '0.35rem 0.85rem', fontSize: '0.8rem' }}
                    >
                      <Plus size={14} />
                      <span>Add Section</span>
                    </button>
                  </div>

                  {blogFormData.sections.map((sec, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '1.25rem',
                        borderRadius: '10px',
                        background: 'rgba(7, 18, 13, 0.7)',
                        border: '1px solid var(--border-glass)',
                        marginBottom: '1.25rem',
                        position: 'relative'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                        <span style={{ fontSize: '0.82rem', color: 'var(--accent-gold)', fontWeight: 600 }}>
                          Section #{idx + 1}
                        </span>
                        {blogFormData.sections.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveSection(idx)}
                            style={{ background: 'transparent', border: 'none', color: '#F87171', cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                          >
                            <Trash2 size={13} />
                            <span>Remove</span>
                          </button>
                        )}
                      </div>

                      <div className="form-group">
                        <label className="form-label">Section Heading</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Recognizing the Early Warning Symptoms"
                          className="form-input"
                          value={sec.sectionHeading}
                          onChange={e => handleSectionChange(idx, 'sectionHeading', e.target.value)}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Paragraphs (Separate multiple paragraphs with blank lines)</label>
                        <textarea
                          rows={4}
                          required
                          placeholder="Write section body here..."
                          className="form-textarea"
                          value={sec.paragraphsText}
                          onChange={e => handleSectionChange(idx, 'paragraphsText', e.target.value)}
                        />
                      </div>

                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Optional Key Bullet Points (One per line)</label>
                        <textarea
                          rows={3}
                          placeholder="Bullet point 1&#10;Bullet point 2"
                          className="form-textarea"
                          value={sec.bulletPointsText}
                          onChange={e => handleSectionChange(idx, 'bulletPointsText', e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
                  <button type="submit" disabled={blogSaving} className="btn btn-gold" style={{ flex: 1 }}>
                    {blogSaving ? 'Publishing Article...' : editingBlogId ? 'Save & Update Article' : 'Publish Article'}
                  </button>
                  <button type="button" onClick={() => setIsBlogModalOpen(false)} className="btn btn-ghost">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
