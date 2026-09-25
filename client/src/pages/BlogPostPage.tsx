import React, { useState, useEffect } from 'react';
import { useRoute, Link } from 'wouter';
import { BLOG_POSTS } from '../content/blogs';
import { SEO } from '../components/SEO';
import { Calendar, Clock, User, ArrowLeft, Phone, HeartHandshake, CheckCircle2, MessageCircle, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';

export const BlogPostPage: React.FC = () => {
  const [, params] = useRoute('/blogs/:slug');
  const slug = params?.slug;

  const staticFound = slug ? BLOG_POSTS.find(p => p.slug === slug) : null;
  const [post, setPost] = useState<any | null>(() => staticFound || null);
  const [loading, setLoading] = useState<boolean>(() => !staticFound);

  useEffect(() => {
    if (!slug) return;

    const staticArticle = BLOG_POSTS.find(p => p.slug === slug);
    if (staticArticle && !post) {
      setPost(staticArticle);
      setLoading(false);
    }

    const loadArticle = async () => {
      try {
        const res = await fetch(`/api/blogs/${encodeURIComponent(slug)}`);
        if (res.ok) {
          const data = await res.json();
          if (data.blog) {
            setPost(data.blog);
          }
        }
      } catch {
        // Already initialized with static content fallback
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

  const postSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `https://nagpurnashamuktikendra.com/blogs/${post.slug}#article`,
        headline: post.title,
        description: post.excerpt || post.subtitle,
        image: `https://nagpurnashamuktikendra.com${coverImage.startsWith('/') ? coverImage : `/${coverImage}`}`,
        datePublished: post.date,
        dateModified: '2026-09-16',
        author: {
          '@type': 'Organization',
          name: post.author || 'Mitrangan Clinical Editorial Board',
          url: 'https://nagpurnashamuktikendra.com/about'
        },
        reviewedBy: {
          '@type': 'Person',
          name: post.reviewer || 'Dr. S. K. Deshmukh, Consulting Neuropsychiatrist',
          jobTitle: 'Consulting Neuropsychiatrist'
        },
        publisher: {
          '@type': 'Organization',
          name: 'Mitrangan Nasha Mukti Kendra Nagpur',
          url: 'https://nagpurnashamuktikendra.com/',
          logo: {
            '@type': 'ImageObject',
            url: 'https://nagpurnashamuktikendra.com/assets/logo.png'
          }
        },
        mainEntityOfPage: `https://nagpurnashamuktikendra.com/blogs/${post.slug}`
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://nagpurnashamuktikendra.com/'
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Articles & Guides',
            item: 'https://nagpurnashamuktikendra.com/blogs'
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: post.title,
            item: `https://nagpurnashamuktikendra.com/blogs/${post.slug}`
          }
        ]
      }
    ]
  };

  return (
    <article style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
      <SEO
        title={`${post.title} | Nasha Mukti Kendra Nagpur`}
        description={post.excerpt || post.subtitle || 'Expert clinical guidance from Mitrangan De-Addiction Kendra Nagpur.'}
        canonicalPath={`/blogs/${post.slug}`}
        schemaJson={postSchema}
      />
      <div className="container" style={{ maxWidth: '860px' }}>
        {/* Visual Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: '1.25rem' }}>
          <ol style={{ listStyle: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: 0, margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <li>
              <Link href="/" style={{ color: 'var(--text-cream)', textDecoration: 'none' }}>Home</Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/blogs" style={{ color: 'var(--text-cream)', textDecoration: 'none' }}>Articles</Link>
            </li>
            <li>/</li>
            <li style={{ color: 'var(--accent-gold)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '380px' }}>
              {post.title}
            </li>
          </ol>
        </nav>

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
            marginBottom: '1.5rem'
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
            paddingBottom: '1.5rem',
            borderBottom: '1px solid var(--border-subtle)',
            marginBottom: '1.5rem'
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

        {/* Medical Review E-E-A-T Attribution Card */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '1rem 1.35rem',
            background: 'rgba(212, 175, 55, 0.07)',
            borderRadius: '12px',
            border: '1px solid rgba(212, 175, 55, 0.25)',
            marginBottom: '2.5rem'
          }}
        >
          <ShieldCheck size={26} color="var(--accent-gold)" style={{ flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-ivory)', fontWeight: 600 }}>
              Clinically Reviewed By: {post.reviewer || 'Dr. S. K. Deshmukh, Consulting Neuropsychiatrist'}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-cream)', lineHeight: 1.4 }}>
              Evidence-based protocol alignment with WHO addiction withdrawal standards &amp; Mental Healthcare Act (MHCA 2017).
            </div>
          </div>
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

        {/* Contextual Internal Linking: Related Clinical Protocols */}
        <div style={{ marginTop: '4.5rem', paddingTop: '3rem', borderTop: '1px solid var(--border-subtle)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="section-tag">Direct Care Pathways</span>
            <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: 'var(--text-ivory)', margin: '0.6rem 0' }}>
              Explore Specialized Recovery Services in Nagpur
            </h3>
            <p style={{ color: 'var(--text-cream)', fontSize: '0.96rem', maxWidth: '640px', margin: '0 auto' }}>
              If you or a family member need clinical assistance, review our dedicated residential programs:
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.25rem' }}>
            <Link
              href="/services/alcohol-deaddiction"
              className="glass-panel"
              style={{
                padding: '1.5rem',
                borderRadius: '14px',
                border: '1px solid var(--border-subtle)',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'border-color 0.25s ease'
              }}
            >
              <div>
                <h4 style={{ fontSize: '1.15rem', color: 'var(--text-ivory)', marginBottom: '0.4rem' }}>
                  Alcohol De-Addiction
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-cream)', lineHeight: 1.5, margin: 0 }}>
                  Supervised medical detox, withdrawal stabilization, and 90-day residential rehab.
                </p>
              </div>
              <div style={{ marginTop: '1rem', color: 'var(--accent-gold)', fontSize: '0.84rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span>View Alcohol Protocol</span>
                <ArrowRight size={13} />
              </div>
            </Link>

            <Link
              href="/services/drug-rehabilitation"
              className="glass-panel"
              style={{
                padding: '1.5rem',
                borderRadius: '14px',
                border: '1px solid var(--border-subtle)',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'border-color 0.25s ease'
              }}
            >
              <div>
                <h4 style={{ fontSize: '1.15rem', color: 'var(--text-ivory)', marginBottom: '0.4rem' }}>
                  Drug Rehabilitation
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-cream)', lineHeight: 1.5, margin: 0 }}>
                  Specialized treatment for brown sugar, opioids, cannabis, and synthetic drugs.
                </p>
              </div>
              <div style={{ marginTop: '1rem', color: 'var(--accent-gold)', fontSize: '0.84rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span>View Drug Protocol</span>
                <ArrowRight size={13} />
              </div>
            </Link>

            <Link
              href="/admission-process"
              className="glass-panel"
              style={{
                padding: '1.5rem',
                borderRadius: '14px',
                border: '1px solid var(--border-gold)',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: 'rgba(212, 175, 55, 0.04)',
                transition: 'border-color 0.25s ease'
              }}
            >
              <div>
                <h4 style={{ fontSize: '1.15rem', color: 'var(--text-ivory)', marginBottom: '0.4rem' }}>
                  Admission &amp; Checklists
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-cream)', lineHeight: 1.5, margin: 0 }}>
                  Step-by-step intake rules, documentation required, packing lists, and fees.
                </p>
              </div>
              <div style={{ marginTop: '1rem', color: 'var(--accent-gold)', fontSize: '0.84rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span>View Admission Guide</span>
                <ArrowRight size={13} />
              </div>
            </Link>

            <Link
              href="/self-assessment"
              className="glass-panel"
              style={{
                padding: '1.5rem',
                borderRadius: '14px',
                border: '1px solid rgba(16, 185, 129, 0.35)',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: 'rgba(16, 185, 129, 0.04)',
                transition: 'border-color 0.25s ease'
              }}
            >
              <div>
                <h4 style={{ fontSize: '1.15rem', color: 'var(--text-ivory)', marginBottom: '0.4rem' }}>
                  Addiction Severity Screener
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-cream)', lineHeight: 1.5, margin: 0 }}>
                  Take our confidential 2-minute clinical quiz to calculate risk and next steps.
                </p>
              </div>
              <div style={{ marginTop: '1rem', color: '#10B981', fontSize: '0.84rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span>Take Clinical Quiz</span>
                <ArrowRight size={13} />
              </div>
            </Link>
          </div>
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
