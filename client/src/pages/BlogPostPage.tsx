import React, { useState, useEffect } from 'react';
import { useRoute, Link } from 'wouter';
import { BLOG_POSTS } from '../content/blogs';
import { Calendar, Clock, User, ArrowLeft, Phone, HeartHandshake, CheckCircle2, MessageCircle, Sparkles } from 'lucide-react';

export const BlogPostPage: React.FC = () => {
  const [, params] = useRoute('/blogs/:slug');
  const slug = params?.slug;

  const [post, setPost] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const loadArticle = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/blogs/${encodeURIComponent(slug)}`);
        if (res.ok) {
          const data = await res.json();
          if (data.blog) {
            setPost(data.blog);
            return;
          }
        }
        // Fallback to static
        const staticFound = BLOG_POSTS.find(p => p.slug === slug);
        setPost(staticFound || null);
      } catch {
        const staticFound = BLOG_POSTS.find(p => p.slug === slug);
        setPost(staticFound || null);
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [slug]);

  if (loading) {
    return (
      <div style={{ paddingTop: '10rem', paddingBottom: '6rem', textAlign: 'center', minHeight: '80vh' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <p style={{ color: 'var(--text-cream)' }}>Loading clinical guide...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div style={{ paddingTop: '10rem', paddingBottom: '6rem', textAlign: 'center', minHeight: '80vh' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <h2>Article Not Found</h2>
          <p style={{ color: 'var(--text-cream)', margin: '1rem 0 2rem 0' }}>
            The requested guide or educational resource could not be located.
          </p>
          <Link href="/blogs" className="btn btn-gold">
            <span>Back to All Articles</span>
          </Link>
        </div>
      </div>
    );
  }

  const coverImage = post.cover_image || post.coverImage || '/assets/facility_walkway.jpg';
  const readTime = post.read_time || post.readTime || '5 min read';

  return (
    <article style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
      <div className="container" style={{ maxWidth: '860px' }}>
        {/* Back Link */}
        <Link
          href="/blogs"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            color: 'var(--accent-gold)',
            textDecoration: 'none',
            fontSize: '0.9rem',
            marginBottom: '2rem'
          }}
        >
          <ArrowLeft size={16} />
          <span>Back to Articles &amp; Guides</span>
        </Link>

        {/* Category Pill */}
        <div style={{ marginBottom: '0.75rem' }}>
          <span className="section-tag">
            <Sparkles size={13} />
            <span>{post.category || 'Clinical Recovery Guide'}</span>
          </span>
        </div>

        {/* Title & Metadata */}
        <h1 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', lineHeight: 1.2, marginBottom: '0.85rem', color: 'var(--text-ivory)' }}>
          {post.title}
        </h1>

        <p style={{ color: 'var(--accent-gold)', fontSize: '1.2rem', marginBottom: '1.75rem', lineHeight: 1.5 }}>
          {post.subtitle}
        </p>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '1.5rem',
            fontSize: '0.85rem',
            color: 'var(--text-dim)',
            paddingBottom: '2rem',
            borderBottom: '1px solid var(--border-subtle)',
            marginBottom: '2.5rem'
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <User size={15} color="var(--accent-gold)" />
            <span>{post.author}</span>
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Calendar size={15} color="var(--accent-gold)" />
            <span>{post.date}</span>
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Clock size={15} color="var(--accent-gold)" />
            <span>{readTime}</span>
          </span>
        </div>

        {/* Cover Photo */}
        <div style={{ borderRadius: '18px', overflow: 'hidden', marginBottom: '3.5rem', border: '1px solid var(--border-gold)' }}>
          <img src={coverImage} alt={post.title} style={{ width: '100%', maxHeight: '440px', objectFit: 'cover' }} />
        </div>

        {/* Content Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {post.content.map((sec: any, idx: number) => (
            <section key={idx}>
              <h2 style={{ fontSize: '1.8rem', color: 'var(--text-ivory)', marginBottom: '1.2rem', lineHeight: 1.25 }}>
                {sec.sectionHeading}
              </h2>

              {sec.paragraphs.map((p: string, pIdx: number) => (
                <p key={pIdx} style={{ color: 'var(--text-cream)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                  {p}
                </p>
              ))}

              {sec.bulletPoints && sec.bulletPoints.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.25rem', padding: '1.5rem', background: 'rgba(7, 18, 13, 0.75)', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
                  {sec.bulletPoints.map((bp: string, bIdx: number) => (
                    <div key={bIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                      <CheckCircle2 size={18} color="#10B981" style={{ flexShrink: 0, marginTop: '3px' }} />
                      <span style={{ color: 'var(--text-ivory)', fontSize: '0.98rem', lineHeight: 1.6 }}>{bp}</span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Bottom Assistance & Emergency Actions */}
        <div
          className="glass-panel-gold"
          style={{
            padding: '2.75rem 2rem',
            borderRadius: '18px',
            marginTop: '4.5rem',
            textAlign: 'center'
          }}
        >
          <h3 style={{ fontSize: '1.7rem', color: 'var(--text-ivory)', marginBottom: '0.5rem' }}>
            Need Confidential Guidance for Yourself or a Loved One?
          </h3>
          <p style={{ color: 'var(--text-cream)', fontSize: '1rem', maxWidth: '640px', margin: '0 auto 1.75rem auto', lineHeight: 1.65 }}>
            Our admissions counselors can discuss your specific circumstances, recommend appropriate clinical detoxification options, and coordinate discrete 24/7 doorstep pickup.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', justifyContent: 'center' }}>
            <Link href="/register" className="btn btn-gold">
              <HeartHandshake size={18} />
              <span>Register Admission</span>
            </Link>
            <a href="tel:+919767362388" className="btn btn-emerald">
              <Phone size={18} />
              <span>Call Helpline: +91 9767362388</span>
            </a>
            <a
              href="https://wa.me/919767362388?text=Hello%20Mitrangan,%20I%20am%20inquiring%20about%20rehabilitation%20admission"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              <MessageCircle size={18} />
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};
