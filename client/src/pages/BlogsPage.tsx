import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { BLOG_POSTS } from '../content/blogs';
import { Calendar, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { FAQSection } from '../components/home/FAQSection';

export const BlogsPage: React.FC = () => {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const res = await fetch('/api/blogs');
        if (res.ok) {
          const data = await res.json();
          if (data.blogs && data.blogs.length > 0) {
            setBlogs(data.blogs);
            return;
          }
        }
        setBlogs(BLOG_POSTS);
      } catch {
        setBlogs(BLOG_POSTS);
      }
    };

    loadBlogs();
  }, []);

  return (
    <div style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 4.5rem auto' }}>
          <span className="section-tag">
            <Sparkles size={13} />
            <span>Educational Knowledge Hub</span>
          </span>
          <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', marginBottom: '1.25rem', lineHeight: 1.2 }}>
            Articles, Guides &amp; FAQs
          </h1>
          <p style={{ color: 'var(--text-cream)', fontSize: '1.15rem', lineHeight: 1.7 }}>
            Read clinical insights, family guidance resources, addiction warning signs, and comprehensive answers to frequently asked rehabilitation questions.
          </p>
        </div>

        {/* Featured Blog Posts Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2.5rem', marginBottom: '5rem' }}>
          {blogs.map(post => {
            const coverImage = post.cover_image || post.coverImage || '/assets/facility_walkway.jpg';
            const readTime = post.read_time || post.readTime || '5 min read';

            return (
              <div
                key={post.slug}
                className="glass-panel glass-panel-hover"
                style={{
                  borderRadius: '18px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                    <img
                      src={coverImage}
                      alt={post.title}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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
                      {post.category || 'Recovery Guide'}
                    </span>
                  </div>

                  <div style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.82rem', color: 'var(--text-dim)', marginBottom: '0.85rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Calendar size={13} color="var(--accent-gold)" />
                        <span>{post.date}</span>
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Clock size={13} color="var(--accent-gold)" />
                        <span>{readTime}</span>
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.45rem', color: 'var(--text-ivory)', marginBottom: '0.5rem', lineHeight: 1.3 }}>
                      {post.title}
                    </h3>

                    <p style={{ color: 'var(--accent-gold)', fontSize: '0.88rem', fontWeight: 500, marginBottom: '1rem' }}>
                      {post.subtitle}
                    </p>

                    <p style={{ color: 'var(--text-cream)', fontSize: '0.94rem', lineHeight: 1.6 }}>
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div style={{ padding: '0 2rem 2rem 2rem' }}>
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="btn btn-outline-gold"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <span>Read Complete Guide</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Integrated FAQ Section (Outside inner container to maintain proper section rhythm) */}
      <FAQSection />
    </div>
  );
};
