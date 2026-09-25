import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Router } from 'wouter';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Layout & Components
import { Navbar } from '../client/src/components/layout/Navbar';
import { Footer } from '../client/src/components/layout/Footer';
import { HomePage } from '../client/src/pages/HomePage';
import { AboutPage } from '../client/src/pages/AboutPage';
import { ServicesPage } from '../client/src/pages/ServicesPage';
import { AlcoholDeaddictionPage } from '../client/src/pages/services/AlcoholDeaddictionPage';
import { DrugRehabilitationPage } from '../client/src/pages/services/DrugRehabilitationPage';
import { DetoxificationPage } from '../client/src/pages/services/DetoxificationPage';
import { AdmissionProcessPage } from '../client/src/pages/AdmissionProcessPage';
import { SelfAssessmentPage } from '../client/src/pages/SelfAssessmentPage';
import { JourneyPage } from '../client/src/pages/JourneyPage';
import { GalleryPage } from '../client/src/pages/GalleryPage';
import { PressPage } from '../client/src/pages/PressPage';
import { CausesPage } from '../client/src/pages/CausesPage';
import { BlogsPage } from '../client/src/pages/BlogsPage';
import { BlogPostPage } from '../client/src/pages/BlogPostPage';
import { ContactPage } from '../client/src/pages/ContactPage';
import { RegisterPage } from '../client/src/pages/RegisterPage';
import { PrivacyPolicyPage } from '../client/src/pages/PrivacyPolicyPage';
import { BLOG_POSTS, type BlogPost } from '../client/src/content/blogs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, '../dist/public');
const BASE_URL = 'https://nagpurnashamuktikendra.com';

interface RouteDefinition {
  path: string;
  title: string;
  description: string;
  ogType?: string;
  ogImage?: string;
  component: React.ComponentType;
  breadcrumbs: { name: string; path: string }[];
  extraSchemas?: object[];
}

// Medical & Facility Base Schema
const MEDICAL_ORGANIZATION_SCHEMA = {
  '@type': ['MedicalBusiness', 'SubstanceAbuseTreatmentFacility'],
  '@id': `${BASE_URL}/#organization`,
  name: 'Mitrangan Nasha Mukti Kendra Nagpur',
  url: `${BASE_URL}/`,
  logo: `${BASE_URL}/assets/logo.png`,
  image: `${BASE_URL}/assets/facility_walkway.jpg`,
  telephone: '+919767362388',
  priceRange: '₹₹',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Plot No. 7, Manasvi Multi-speciality Hospital, Khangar Layout, Opp. Satyam Garden, Godhani',
    addressLocality: 'Nagpur',
    addressRegion: 'Maharashtra',
    postalCode: '441123',
    addressCountry: 'IN'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 21.2185,
    longitude: 79.0832
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '00:00',
    closes: '23:59'
  },
  isAcceptingNewPatients: true,
  medicalSpecialty: [
    'https://schema.org/AddictionMedicine',
    'https://schema.org/Psychiatric',
    'https://schema.org/Emergency'
  ]
};

const STATIC_ROUTES: RouteDefinition[] = [
  {
    path: '/',
    title: 'Nasha Mukti Kendra in Nagpur | Mitrangan De-Addiction & Rehab Centre',
    description: 'Trusted Nasha Mukti Kendra in Nagpur providing structured alcohol & drug rehabilitation, medical detox support, counseling & 24/7 discrete emergency pickup.',
    ogType: 'website',
    ogImage: '/assets/facility_walkway.jpg',
    component: HomePage,
    breadcrumbs: [
      { name: 'Home', path: '/' }
    ]
  },
  {
    path: '/about',
    title: 'About Us | Mitrangan Nasha Mukti Kendra Nagpur',
    description: 'Learn about Mitrangan Rehabilitation Kendra in Nagpur. Discover our mission, multidisciplinary clinical team, ethical values, and holistic recovery philosophy.',
    ogType: 'website',
    ogImage: '/assets/counseling_session.jpg',
    component: AboutPage,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'About Us', path: '/about' }
    ]
  },
  {
    path: '/services',
    title: 'Addiction Treatment & Recovery Services | Nasha Mukti Kendra Nagpur',
    description: 'Comprehensive addiction recovery programs in Nagpur including medical detoxification, alcohol de-addiction, drug rehab, and 12-step structured therapies.',
    ogType: 'website',
    ogImage: '/assets/facility_walkway.jpg',
    component: ServicesPage,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Treatment Services', path: '/services' }
    ]
  },
  {
    path: '/services/alcohol-deaddiction',
    title: 'Alcohol De-Addiction Centre in Nagpur | Alcohol Rehab & Detox | Mitrangan',
    description: 'Leading alcohol de-addiction centre in Nagpur. Medically supervised alcohol detox, withdrawal management, psychiatric counseling & 24/7 discrete emergency pickup.',
    ogType: 'website',
    ogImage: '/assets/facility_walkway.jpg',
    component: AlcoholDeaddictionPage,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      { name: 'Alcohol De-Addiction', path: '/services/alcohol-deaddiction' }
    ],
    extraSchemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'MedicalTherapy',
        name: 'Alcohol De-Addiction & Medical Detoxification',
        description: 'Medically monitored withdrawal management and inpatient rehabilitation for alcohol use disorder in Nagpur.',
        provider: MEDICAL_ORGANIZATION_SCHEMA
      }
    ]
  },
  {
    path: '/services/drug-rehabilitation',
    title: 'Drug Rehabilitation Centre in Nagpur | Substance Abuse Treatment | Mitrangan',
    description: 'Specialized drug rehabilitation centre in Nagpur for brown sugar, opioids, cannabis, and prescription drug dependency with 24/7 medical supervision.',
    ogType: 'website',
    ogImage: '/assets/facility_walkway.jpg',
    component: DrugRehabilitationPage,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      { name: 'Drug Rehabilitation', path: '/services/drug-rehabilitation' }
    ],
    extraSchemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'MedicalTherapy',
        name: 'Drug Rehabilitation & Substance Recovery Program',
        description: 'Inpatient rehabilitation for narcotic, chemical, and synthetic drug dependency.',
        provider: MEDICAL_ORGANIZATION_SCHEMA
      }
    ]
  },
  {
    path: '/services/detoxification-support',
    title: 'Medical Detoxification Centre in Nagpur | 24/7 Withdrawal Management | Mitrangan',
    description: '24/7 medically supervised detoxification centre in Nagpur. Safe withdrawal stabilization, delirium tremens monitoring & physician oversight at Mitrangan.',
    ogType: 'website',
    ogImage: '/assets/facility_walkway.jpg',
    component: DetoxificationPage,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      { name: 'Detoxification Support', path: '/services/detoxification-support' }
    ],
    extraSchemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'MedicalTherapy',
        name: 'Clinical Medical Detoxification',
        description: '24/7 physician-guided clinical detox and acute withdrawal management in Nagpur.',
        provider: MEDICAL_ORGANIZATION_SCHEMA
      }
    ]
  },
  {
    path: '/admission-process',
    title: 'Admission Process & Rehab Guide | Nasha Mukti Kendra Nagpur | Mitrangan',
    description: 'Step-by-step admission process for Mitrangan Nasha Mukti Kendra Nagpur. Transparent admission criteria, documents needed, pickup service & family guidelines.',
    ogType: 'website',
    ogImage: '/assets/counseling_session.jpg',
    component: AdmissionProcessPage,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Admission Process', path: '/admission-process' }
    ]
  },
  {
    path: '/self-assessment',
    title: 'Addiction Severity Self-Assessment & Triage | Nasha Mukti Kendra Nagpur',
    description: 'Confidential 2-minute clinical addiction severity assessment for alcohol & drug abuse. Instant triage score, withdrawal risk check & emergency guidance in Nagpur.',
    ogType: 'website',
    ogImage: '/assets/counseling_session.jpg',
    component: SelfAssessmentPage,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Addiction Screener', path: '/self-assessment' }
    ]
  },
  {
    path: '/journey',
    title: 'Recovery Journey & Daily Schedule | Mitrangan Nasha Mukti Kendra Nagpur',
    description: 'Explore the daily therapeutic routine at Mitrangan Kendra Nagpur. From morning yoga and mindfulness to group counseling, cognitive therapy & skill building.',
    ogType: 'website',
    ogImage: '/assets/facility_walkway.jpg',
    component: JourneyPage,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Recovery Journey', path: '/journey' }
    ]
  },
  {
    path: '/gallery',
    title: 'Facility Tour & Gallery | Mitrangan Nasha Mukti Kendra Nagpur',
    description: 'Take a visual tour of Mitrangan Rehabilitation Kendra in Godhani, Nagpur. View our hygienic residential rooms, therapy halls, recreation zones, and serene campus.',
    ogType: 'website',
    ogImage: '/assets/facility_walkway.jpg',
    component: GalleryPage,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Campus Gallery', path: '/gallery' }
    ]
  },
  {
    path: '/press',
    title: 'Press Releases & Community Outreach | Mitrangan Nasha Mukti Kendra Nagpur',
    description: 'News, community awareness programs, and public health initiatives organized by Mitrangan De-Addiction Kendra across Nagpur and Central India.',
    ogType: 'website',
    ogImage: '/assets/facility_walkway.jpg',
    component: PressPage,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Press & Initiatives', path: '/press' }
    ]
  },
  {
    path: '/causes',
    title: 'Our Causes & Social Mission | Mitrangan Nasha Mukti Kendra Nagpur',
    description: 'Discover our community initiatives to battle substance dependency in youth, raise addiction awareness, and provide subsidized care for underprivileged families.',
    ogType: 'website',
    ogImage: '/assets/facility_walkway.jpg',
    component: CausesPage,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Social Causes', path: '/causes' }
    ]
  },
  {
    path: '/contact',
    title: 'Contact & Center Navigation | Mitrangan Nasha Mukti Kendra Nagpur',
    description: 'Contact Mitrangan Nasha Mukti Kendra in Godhani, Nagpur. 24/7 emergency helpline (+91 9767362388), location map, and immediate admission assistance.',
    ogType: 'website',
    ogImage: '/assets/facility_walkway.jpg',
    component: ContactPage,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Contact Us', path: '/contact' }
    ]
  },
  {
    path: '/register',
    title: 'Online Admission Registration | Mitrangan Nasha Mukti Kendra Nagpur',
    description: 'Confidential online pre-admission registration for Mitrangan De-Addiction Kendra in Nagpur. Fast intake processing and 24/7 emergency ambulance dispatch.',
    ogType: 'website',
    ogImage: '/assets/counseling_session.jpg',
    component: RegisterPage,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Admission Registration', path: '/register' }
    ]
  },
  {
    path: '/privacy',
    title: 'Privacy Policy & Patient Confidentiality | Mitrangan Kendra Nagpur',
    description: 'Mitrangan\'s privacy policy and confidentiality commitment. How patient health information and admissions data are protected under strict medical privacy standards.',
    ogType: 'website',
    ogImage: '/assets/facility_walkway.jpg',
    component: PrivacyPolicyPage,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Privacy Policy', path: '/privacy' }
    ]
  },
  {
    path: '/blogs',
    title: 'Addiction Recovery & Mental Health Blog | Nasha Mukti Kendra Nagpur',
    description: 'Read expert clinical guides on addiction symptoms, alcohol detox timelines, family counseling, and recovery roadmaps by Mitrangan Nagpur.',
    ogType: 'website',
    ogImage: '/assets/facility_walkway.jpg',
    component: BlogsPage,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Articles & Guides', path: '/blogs' }
    ]
  }
];

// Generate blog post routes dynamically
const BLOG_ROUTES: RouteDefinition[] = BLOG_POSTS.map((post: BlogPost) => {
  const coverImage = post.coverImage || '/assets/facility_walkway.jpg';
  return {
    path: `/blogs/${post.slug}`,
    title: `${post.title} | Mitrangan Nagpur`,
    description: post.excerpt || post.subtitle,
    ogType: 'article',
    ogImage: coverImage,
    component: BlogPostPage,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Articles & Guides', path: '/blogs' },
      { name: post.title.split(':')[0], path: `/blogs/${post.slug}` }
    ],
    extraSchemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        '@id': `${BASE_URL}/blogs/${post.slug}#article`,
        headline: post.title,
        description: post.excerpt || post.subtitle,
        image: `${BASE_URL}${coverImage.startsWith('/') ? coverImage : `/${coverImage}`}`,
        datePublished: '2026-09-16T08:00:00+05:30',
        dateModified: '2026-09-25T12:00:00+05:30',
        author: {
          '@type': 'Organization',
          name: post.author || 'Mitrangan Clinical Editorial Board',
          url: `${BASE_URL}/about`
        },
        publisher: MEDICAL_ORGANIZATION_SCHEMA,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${BASE_URL}/blogs/${post.slug}`
        },
        ...(post.reviewer ? {
          reviewedBy: {
            '@type': 'Person',
            name: post.reviewer,
            jobTitle: 'Consulting Addiction Specialist',
            worksFor: {
              '@type': 'Organization',
              name: 'Mitrangan Rehabilitation Kendra'
            }
          }
        } : {})
      }
    ]
  };
});

const ALL_ROUTES: RouteDefinition[] = [...STATIC_ROUTES, ...BLOG_ROUTES];

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function buildBreadcrumbSchema(breadcrumbs: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: crumb.name,
      item: `${BASE_URL}${crumb.path === '/' ? '/' : crumb.path}`
    }))
  };
}

async function prerenderAll() {
  console.log('🚀 Starting Mitrangan SEO Pre-Rendering Pipeline...');

  const indexPath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.error(`❌ Error: dist/public/index.html not found! Run "vite build" first.`);
    process.exit(1);
  }

  const templateHtml = fs.readFileSync(indexPath, 'utf8');

  let successCount = 0;

  for (const route of ALL_ROUTES) {
    try {
      console.log(`  ⚙️ Pre-rendering: ${route.path} ...`);

      // 1. Render React tree
      const bodyHtml = ReactDOMServer.renderToString(
        React.createElement(
          Router,
          { hook: () => [route.path, () => {}] },
          React.createElement(
            'div',
            { style: { minHeight: '100vh', display: 'flex', flexDirection: 'column' } },
            React.createElement(Navbar),
            React.createElement('div', { style: { flex: 1 } }, React.createElement(route.component)),
            React.createElement(Footer)
          )
        )
      );

      // 2. Prepare Structured Data Schemas
      const breadcrumbSchema = buildBreadcrumbSchema(route.breadcrumbs);
      const allSchemas = [
        breadcrumbSchema,
        ...(route.extraSchemas || [])
      ];

      const schemaTags = allSchemas.map(s => 
        `<script type="application/ld+json">${JSON.stringify(s)}</script>`
      ).join('\n    ');

      // 3. Construct URL & Canonical
      const canonicalUrl = `${BASE_URL}${route.path === '/' ? '/' : route.path}`;
      const ogImageUrl = route.ogImage?.startsWith('http') 
        ? route.ogImage 
        : `${BASE_URL}${route.ogImage?.startsWith('/') ? route.ogImage : `/${route.ogImage || 'assets/facility_walkway.jpg'}`}`;

      // 4. Inject into HTML Shell
      let pageHtml = templateHtml;

      // Title
      pageHtml = pageHtml.replace(
        /<title>[\s\S]*?<\/title>/i,
        `<title>${escapeHtml(route.title)}</title>`
      );

      // Meta Description
      pageHtml = pageHtml.replace(
        /<meta name="description" content="[\s\S]*?" \/>/i,
        `<meta name="description" content="${escapeHtml(route.description)}" />`
      );

      // Canonical link
      pageHtml = pageHtml.replace(
        /<link rel="canonical"[\s\S]*?\/>/i,
        `<link rel="canonical" href="${canonicalUrl}" />`
      );

      // Open Graph Tags
      pageHtml = pageHtml.replace(
        /<meta property="og:title" content="[\s\S]*?" \/>/i,
        `<meta property="og:title" content="${escapeHtml(route.title)}" />`
      );
      pageHtml = pageHtml.replace(
        /<meta property="og:description" content="[\s\S]*?" \/>/i,
        `<meta property="og:description" content="${escapeHtml(route.description)}" />`
      );
      pageHtml = pageHtml.replace(
        /<meta property="og:url" content="[\s\S]*?" \/>/i,
        `<meta property="og:url" content="${canonicalUrl}" />`
      );
      pageHtml = pageHtml.replace(
        /<meta property="og:type" content="[\s\S]*?" \/>/i,
        `<meta property="og:type" content="${route.ogType || 'website'}" />`
      );
      pageHtml = pageHtml.replace(
        /<meta property="og:image" content="[\s\S]*?" \/>/i,
        `<meta property="og:image" content="${ogImageUrl}" />`
      );

      // Twitter Cards
      pageHtml = pageHtml.replace(
        /<meta name="twitter:title" content="[\s\S]*?" \/>/i,
        `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`
      );
      pageHtml = pageHtml.replace(
        /<meta name="twitter:description" content="[\s\S]*?" \/>/i,
        `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`
      );
      pageHtml = pageHtml.replace(
        /<meta name="twitter:image" content="[\s\S]*?" \/>/i,
        `<meta name="twitter:image" content="${ogImageUrl}" />`
      );

      // Inject Schemas before </head>
      pageHtml = pageHtml.replace(
        '</head>',
        `    ${schemaTags}\n  </head>`
      );

      // Inject Pre-rendered Body into #root
      pageHtml = pageHtml.replace(
        '<div id="root"></div>',
        `<div id="root">${bodyHtml}</div>`
      );

      // 5. Output file
      const targetDir = route.path === '/' 
        ? DIST_DIR 
        : path.join(DIST_DIR, route.path.replace(/^\//, ''));

      fs.mkdirSync(targetDir, { recursive: true });
      const targetFile = path.join(targetDir, 'index.html');
      fs.writeFileSync(targetFile, pageHtml, 'utf8');

      successCount++;
    } catch (err) {
      console.error(`❌ Failed to pre-render route "${route.path}":`, err);
    }
  }

  console.log(`\n✅ Successfully pre-rendered ${successCount} / ${ALL_ROUTES.length} static pages!`);
  console.log(`🎯 Googlebot & crawlers will now receive complete, crawlable HTML with exact canonical tags & structured data.`);
}

prerenderAll().catch((err) => {
  console.error('Fatal prerender error:', err);
  process.exit(1);
});
