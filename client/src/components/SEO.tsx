import React, { useEffect } from 'react';

export interface FAQItem {
  question: string;
  answer: string;
}

interface SEOProps {
  title: string;
  description: string;
  canonicalPath?: string;
  faqSchema?: FAQItem[];
  schemaJson?: object;
  noindex?: boolean;
}

const BASE_URL = 'https://nagpurnashamuktikendra.com';
const DEFAULT_ROBOTS = 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonicalPath = '',
  faqSchema,
  schemaJson,
  noindex = false
}) => {
  useEffect(() => {
    // 1. Update Document Title
    document.title = title;

    // 2. Update Robots Meta Tag
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.setAttribute('name', 'robots');
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute('content', noindex ? 'noindex, nofollow' : DEFAULT_ROBOTS);

    // 3. Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // 3. Update Canonical Tag
    const fullCanonicalUrl = `${BASE_URL}${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`;
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', fullCanonicalUrl);

    // 4. Update OpenGraph Tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', fullCanonicalUrl);

    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', title);

    const twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (twitterDesc) twitterDesc.setAttribute('content', description);

    // 5. Dynamic Structured Data / Schema.org
    const SCHEMA_SCRIPT_ID = 'dynamic-seo-schema';
    let scriptTag = document.getElementById(SCHEMA_SCRIPT_ID) as HTMLScriptElement | null;

    let payload: object | null = null;
    if (schemaJson) {
      payload = schemaJson;
    } else if (faqSchema && faqSchema.length > 0) {
      payload = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqSchema.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
          }
        }))
      };
    }

    if (payload) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = SCHEMA_SCRIPT_ID;
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(payload);
    } else if (scriptTag) {
      scriptTag.remove();
    }

    return () => {
      const existingScript = document.getElementById(SCHEMA_SCRIPT_ID);
      if (existingScript) {
        existingScript.remove();
      }
      const robots = document.querySelector('meta[name="robots"]');
      if (robots) {
        robots.setAttribute('content', DEFAULT_ROBOTS);
      }
    };
  }, [title, description, canonicalPath, faqSchema, schemaJson, noindex]);

  return null;
};

