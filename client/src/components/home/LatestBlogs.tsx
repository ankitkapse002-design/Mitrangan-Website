import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Calendar, Clock, ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { BLOG_POSTS } from '../../content/blogs';

export const LatestBlogs: React.FC = () => {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await fetch('/api/blogs/latest?limit=3');
        if (res.ok) {
          const data = await res.json();
          if (data.blogs && data.blogs.length > 0) {
            setBlogs(data.blogs);
            return;
          }
        }
        // Fallback to static articles if API not reached
        setBlogs(BLOG_POSTS.slice(0, 3));
      } catch {
        setBlogs(BLOG_POSTS.slice(0, 3));
      }
    };

    fetchLatest();
  }, []);

  return (
    <section
      style={{
        padding: '6rem 0',
        backgroundColor: 'rgba(8, 20, 15, 0.65)',
        position: 'relative'
      }}
      aria-label="Latest Clinical Insights and Rehabilitation Articles"
    >
      <div className="container">
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '1.5rem',
            marginBottom: '3.5rem'
          }}
        >
          <div>
            <span className="section-tag">
              <Sparkles size={13} />
              <span>Educational Knowledge Base</span>
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.8vw, 2.9rem)', marginBottom: '0.75rem', lineHeight: 1.2 }}>
              Clinical Insights &amp; Family Guidance
            </h2>
            <p style={{ color: 'var(--text-cream)', fontSize: '1.05rem', maxWidth: '680px', lineHeight: 1.65 }}>
              Explore expert articles on substance dependency stages, detox procedures, family healing strategies, and rehabilitation advice written by our clinical team.
            </p>
          </div>

          <Link href="/blogs" className="btn btn-outline-gold">
            <BookOpen size={16} />
            <span>View All Guides &amp; FAQs</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Articles Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem'
          }}
        >
          {blogs.map(post => {
            const coverImage = post.cover_image || post.coverImage || '/assets/facility_walkway.jpg';
            const readTime = post.read_time || post.readTime || '5 min read';

            return (
              <div
                key={post.slug}
                className="glass-panel glass-panel-hover"
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ position: 'relative', height: '210px', overflow: 'hidden' }}>
                    <img
                      src={coverImage}
                      alt={post.title}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.4s ease'
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
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        padding: '0.25rem 0.65rem',
                        borderRadius: '9999px',
                        border: '1px solid rgba(212, 175, 55, 0.3)'
                      }}
                    >
                      {post.category || 'Recovery Guide'}
                    </span>
                  </div>

                  <div style={{ padding: '1.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Calendar size={13} color="var(--accent-gold)" />
                        <span>{post.date}</span>
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Clock size={13} color="var(--accent-gold)" />
                        <span>{readTime}</span>
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.35rem', color: 'var(--text-ivory)', marginBottom: '0.5rem', lineHeight: 1.3 }}>
                      {post.title}
                    </h3>

                    <p style={{ color: 'var(--text-cream)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div style={{ padding: '0 1.75rem 1.75rem 1.75rem' }}>
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="btn btn-outline-gold"
                    style={{ width: '100%', justifyContent: 'center', fontSize: '0.88rem' }}
                  >
                    <span>Read Complete Guide</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
