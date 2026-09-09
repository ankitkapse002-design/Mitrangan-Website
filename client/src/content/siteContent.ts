export interface CenterLocation {
  city: string;
  name: string;
  address: string;
  phone: string;
  phoneDisplay: string;
  email: string;
  isHeadquarters?: boolean;
}

export const MITRANGAN_CENTERS: CenterLocation[] = [
  {
    city: "Nagpur",
    name: "Mitrangan De-Addiction Center (Nagpur HQ)",
    address: "Plot no. 7, Manasvi Multi-speciality hospital, Khangar layout, opposite Satyam Garden, Godhani, Nagpur - 441123, Maharashtra",
    phone: "+919767362388",
    phoneDisplay: "+91 9767362388",
    email: "mitranganrehab@gmail.com",
    isHeadquarters: true
  },
  {
    city: "Durg",
    name: "Mitrangan Rehabilitation Center (Durg)",
    address: "Janardan Prasad, near Sharma Sahu Sadan, Ward No. 40, Durg - 491001, Chhattisgarh",
    phone: "+917666890795",
    phoneDisplay: "+91 7666890795",
    email: "mitranganrehab@gmail.com"
  }
];

export interface StatItem {
  id: string;
  targetNumber: number | null;
  suffix?: string;
  staticValue?: string;
  label: string;
  description: string;
}

export const MITRANGAN_STATS: StatItem[] = [
  {
    id: "recovered",
    targetNumber: 500,
    suffix: "+",
    label: "Recovered Individuals",
    description: "Reunited with family and living healthy, purposeful lives"
  },
  {
    id: "years",
    targetNumber: 4,
    suffix: "+",
    label: "Years of Service",
    description: "Dedicated de-addiction service across Maharashtra & Chhattisgarh"
  },
  {
    id: "staff",
    targetNumber: 20,
    suffix: "+",
    label: "Experienced Staff",
    description: "Psychiatrists, counselors, yoga guides & residential support"
  },
  {
    id: "programs",
    targetNumber: 30,
    suffix: "+",
    label: "Recovery Programs",
    description: "Specialized clinical detox & behavioral rehabilitation plans"
  },
  {
    id: "support",
    targetNumber: null,
    staticValue: "24/7",
    label: "Admission & Support",
    description: "Immediate guidance, intake & discrete emergency pickup"
  }
];

export const CORE_VALUES = [
  {
    title: "Compassion and Dignity",
    description: "Every resident is treated with uncompromised human respect, empathy, and positive regard throughout their healing."
  },
  {
    title: "Confidential and Safe Environment",
    description: "Complete discretion, peaceful residential campus, and medically monitored spaces away from triggering habits."
  },
  {
    title: "Structured Recovery Approach",
    description: "Daily regimens combining clinical detox, therapy, physical vitality, balanced nutrition, and emotional coaching."
  },
  {
    title: "Emotional & Behavioral Transformation",
    description: "Targeting root psychological triggers, stress management, and rebuilding cognitive resilience."
  },
  {
    title: "Long-term Support After Treatment",
    description: "Ongoing relapse prevention, family counseling, follow-ups, and community integration to maintain lifelong sobriety."
  }
];

export const GOOGLE_REVIEWS = [
  {
    name: "Binoy Shankar",
    rating: 5,
    role: "Family / Resident Reviewer",
    text: "Best place in central India for any drug or alcohol related rehabilitation. Do drop in for best consultation.",
    highlight: "Best place in central India"
  },
  {
    name: "Vaishali Sahu",
    rating: 5,
    role: "Community Reviewer",
    text: "Good people, nice service affiliated with government also.",
    highlight: "Nice service & government affiliation"
  },
  {
    name: "Ram Sagar",
    rating: 5,
    role: "Recovered Patient",
    text: "Best de-addiction center for alcohol withdrawal, staff is nice, doctors are good. Strongly recommend for alcohol withdrawal.",
    highlight: "Strongly recommend for withdrawal support"
  },
  {
    name: "Shailesh Sharma",
    rating: 5,
    role: "Verified Reviewer",
    text: "Best Team. Dedicated professionals who truly care about patient recovery and dignity.",
    highlight: "Best Team"
  }
];

export interface RecoveryStep {
  step: string;
  title: string;
  description: string;
}

export const RECOVERY_STEPS: RecoveryStep[] = [
  {
    step: "01",
    title: "Confidential Consultation",
    description: "Contact us anytime to speak with our support staff. We listen without judgement and discuss your specific situation with complete privacy."
  },
  {
    step: "02",
    title: "Personalized Care Assessment",
    description: "Our multidisciplinary care team evaluates physical, psychological, and social factors to formulate a structured recovery plan."
  },
  {
    step: "03",
    title: "Secure 24x7 Pickup Assistance",
    description: "Our trained, respectful team provides discrete, safe transportation from your doorstep to our rehabilitation center whenever required."
  },
  {
    step: "04",
    title: "Structured Residential Healing",
    description: "Begin medical detox, individual therapy, peer group support, daily yoga, and life-coaching in a disciplined, peaceful sanctuary."
  }
];
