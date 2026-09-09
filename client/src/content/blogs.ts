export interface BlogPost {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  author: string;
  readTime: string;
  excerpt: string;
  coverImage: string;
  content: {
    sectionHeading: string;
    paragraphs: string[];
    bulletPoints?: string[];
  }[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "chhindwara-recovery-guide",
    title: "Best Nasha Mukti Kendra Chhindwara: Complete Guide to Addiction Recovery",
    subtitle: "Understanding Addiction, Structured Care, and Steps Toward Sustainable Healing",
    date: "August 1, 2026",
    author: "Mitrangan Clinical Editorial Team",
    readTime: "6 min read",
    excerpt: "Addiction affects health, relationships, work, and overall quality of life. Learn what to look for in a rehabilitation center and how structured recovery transforms lives.",
    coverImage: "/assets/facility_walkway.jpg",
    content: [
      {
        sectionHeading: "Understanding Addiction and the Need for Professional Support",
        paragraphs: [
          "Addiction can affect a person's physical health, relationships, work, confidence, and overall quality of life. Whether the problem involves alcohol, prescription drugs, synthetic substances, or digital habits, overcoming dependency requires more than willpower alone.",
          "Addiction alters brain chemistry, thoughts, emotions, and habitual reactions. Professional rehabilitation provides a safe, structured, and compassionate environment where individuals can decompress, detoxify, and receive expert psychological counseling away from everyday triggers."
        ]
      },
      {
        sectionHeading: "What Should You Look for in a Nasha Mukti Kendra?",
        paragraphs: [
          "When searching for a trusted Nasha Mukti Kendra for yourself or a family member, evaluating the core treatment philosophy and facility standards is paramount:"
        ],
        bulletPoints: [
          "A calm, clean, and disciplined residential living environment",
          "Qualified counselors, psychologists, and medical supervision",
          "Personalized treatment plans tailored to the specific substance and emotional history",
          "Daily holistic wellness practices including yoga, pranayam, and guided meditation",
          "Active family counseling and transparent communication during recovery",
          "Clear admission processes and discrete 24/7 pickup arrangements"
        ]
      },
      {
        sectionHeading: "The Importance of a Structured Recovery Programme",
        paragraphs: [
          "Addiction thrives in chaotic, unstructured environments. The foundation of rehabilitation at Mitrangan is restoring circadian rhythm, balanced nutrition, emotional equilibrium, and social responsibility through a disciplined daily routine.",
          "Residents participate in morning yoga, group therapy circles, individual counseling, educational workshops, recreational activities, and evening reflection sessions. Over time, healthy habits displace addictive compulsions."
        ]
      },
      {
        sectionHeading: "Why Family Support and Relapse Prevention Matter",
        paragraphs: [
          "Family members are often deeply affected by a loved one's addiction. Rehabilitation is not solely about treating the individual—it involves healing family trust and teaching loved ones how to encourage sobriety without enabling old patterns.",
          "Relapse prevention training prepares individuals to recognize high-risk situations, navigate interpersonal conflicts calmly, build healthy boundary systems, and seek immediate support whenever cravings arise."
        ]
      }
    ]
  },
  {
    slug: "signs-addiction-nagpur",
    title: "Signs Someone Needs a Nasha Mukti Centre in Nagpur",
    subtitle: "Recognizing Early Warning Symptoms and Taking Timely Action",
    date: "February 18, 2026",
    author: "Mitrangan Clinical Editorial Team",
    readTime: "4 min read",
    excerpt: "Addiction often develops quietly, and many families fail to recognize the warning signs until severe harm occurs. Discover the early signs and how to seek help.",
    coverImage: "/assets/counseling_session.jpg",
    content: [
      {
        sectionHeading: "Recognizing the Early Warning Signs",
        paragraphs: [
          "Addiction rarely happens overnight; it progresses gradually from experimental use to regular reliance, and eventually to uncontrollable compulsion. Recognizing the signs early can prevent irreversible health damage, financial ruin, and emotional heartbreak."
        ],
        bulletPoints: [
          "1. Loss of Control: Inability to stop drinking or using substances even after promising family members or experiencing negative consequences.",
          "2. Sudden Behavioral Changes: Uncharacteristic mood swings, sudden anger, emotional withdrawal, isolation, and defensive secrecy.",
          "3. Neglecting Responsibilities: Declining performance at work, unexcused absences, failing academic marks, or neglecting child/family obligations.",
          "4. Financial Strain: Unexplained spending, borrowing money repeatedly, or sudden disappearance of household valuables.",
          "5. Physical Health Deterioration: Sudden weight fluctuations, poor hygiene, bloodshot eyes, disrupted sleep patterns, and chronic fatigue.",
          "6. Withdrawal Symptoms: Shaking hands, heavy sweating, severe nausea, anxiety, or irritability when the substance is not consumed."
        ]
      },
      {
        sectionHeading: "When to Seek Professional Rehabilitation",
        paragraphs: [
          "If an individual displays multiple signs and has been unable to maintain sobriety at home, professional residential rehabilitation is strongly indicated. Overcoming physical and psychological dependence requires medical supervision, emotional coaching, and a supportive community.",
          "Mitrangan De-Addiction Kendra in Nagpur provides 24x7 admission assistance, confidential telephone consultations, and safe, respectful pickup services to assist families during this critical turning point."
        ]
      }
    ]
  }
];
