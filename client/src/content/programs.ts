export interface Program {
  id: string;
  category: 'addiction' | 'modality' | 'holistic';
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  icon: string;
}

export const ALL_PROGRAMS: Program[] = [
  // Addictions
  {
    id: "alcohol-addiction",
    category: "addiction",
    title: "Alcohol Addiction Treatment",
    subtitle: "Structured Detox & Psychological Freedom",
    description: "Our structured rehabilitation program helps individuals overcome alcohol dependence through medical supervision, behavioral therapy, and supportive daily routines that encourage long-term recovery.",
    features: [
      "Supervised alcohol withdrawal & craving stabilization",
      "Cognitive Behavioral Therapy (CBT) for alcohol triggers",
      "Daily structured routine rebuilding healthy sleep and meals",
      "Peer group reinforcement and relapse prevention"
    ],
    icon: "WineOff"
  },
  {
    id: "drug-addiction",
    category: "addiction",
    title: "Drug & Substance Abuse Treatment",
    subtitle: "Comprehensive Substance Rehabilitation",
    description: "We provide professional treatment for individuals struggling with substance abuse, including emotional counseling, structured daily schedules, and personalized relapse prevention strategies.",
    features: [
      "Clinical assessment and multi-stage stabilization",
      "Deep emotional counseling to address underlying trauma",
      "Substance-free disciplined living environment",
      "Post-recovery family reintegration support"
    ],
    icon: "ShieldAlert"
  },
  {
    id: "opioid-addiction",
    category: "addiction",
    title: "Opioid & Heroin Addiction Treatment",
    subtitle: "Medically Monitored Care & Therapy",
    description: "Specialized clinical programs designed to help individuals recover from opioid-based addictions through supervised detox support, intensive psychological therapy, and emotional healing.",
    features: [
      "24/7 medical oversight during acute withdrawal",
      "Non-judgmental psychiatric guidance",
      "Emotional stabilization and anxiety management",
      "Long-term neurochemical balance restoration"
    ],
    icon: "Activity"
  },
  {
    id: "cannabis-synthetic",
    category: "addiction",
    title: "Cannabis & Synthetic Drug Addiction",
    subtitle: "Psychological De-escalation & Mental Clarity",
    description: "Behavioral therapy and structured rehabilitation help individuals overcome psychological dependence on cannabis and synthetic drugs, restoring mental clarity and personal control.",
    features: [
      "Clearing cognitive fog and mood imbalances",
      "Addressing behavioral habits and peer pressures",
      "Developing proactive problem-solving coping mechanisms",
      "Healthy dopamine regulation through physical exercise"
    ],
    icon: "Leaf"
  },
  {
    id: "prescription-dependency",
    category: "addiction",
    title: "Prescription Drug Dependency",
    subtitle: "Pharmaceutical Tapering & Rebalance",
    description: "Treatment programs tailored for addiction to prescription medications such as benzodiazepines, morphine, sleeping pills, and pharmaceutical stimulants.",
    features: [
      "Gradual, safe tapering protocols under supervision",
      "Replacing sedative dependence with natural sleep hygiene",
      "Stress resilience and somatic calming techniques",
      "Chronic pain and stress alternative coping strategies"
    ],
    icon: "Pill"
  },
  {
    id: "mobile-digital-addiction",
    category: "addiction",
    title: "Mobile & Digital Addiction",
    subtitle: "Digital Detox & Lifestyle Realignment",
    description: "Customized wellness programs for individuals struggling with excessive screen time, mobile gaming, and digital dependency, focusing on healthy digital habits and emotional balance.",
    features: [
      "Structured screen-free detox periods",
      "Restoration of natural attention span and sleep rhythms",
      "Direct human connection, sports, and creative arts",
      "Sustainable digital boundary setting"
    ],
    icon: "Smartphone"
  },

  // Modalities
  {
    id: "structured-detox",
    category: "modality",
    title: "Structured Detox Support",
    subtitle: "Safe, Monitored Transition",
    description: "A supervised and supportive clinical environment that helps individuals safely begin the recovery process, manage acute withdrawal symptoms, and transition away from substance dependence.",
    features: [
      "24/7 medical and nursing monitoring",
      "Nutritional replenishments and hydration protocols",
      "Safe and humane symptom alleviation",
      "Calm, private, restful environment"
    ],
    icon: "HeartPulse"
  },
  {
    id: "individual-counseling",
    category: "modality",
    title: "Individual Counseling",
    subtitle: "1-on-1 Psychological Healing",
    description: "One-on-one therapy sessions with qualified counselors to address emotional challenges, unpack deep-rooted trauma, uncover personal triggers, and reconstruct positive self-worth.",
    features: [
      "Confidential personal therapy sessions",
      "Trigger management and emotional processing",
      "Building healthy coping mechanisms",
      "Personal life-goal restructuring"
    ],
    icon: "UserCheck"
  },
  {
    id: "group-therapy",
    category: "modality",
    title: "Group Therapy Sessions",
    subtitle: "Peer Solidarity & Shared Courage",
    description: "Peer-based support sessions that encourage sharing lived experiences, dismantling loneliness, cultivating empathy, and developing collective accountability for lifelong recovery.",
    features: [
      "Guided facilitator-led discussions",
      "Breaking isolation through shared patient experiences",
      "Empathy development and social skills renewal",
      "Mutual accountability circles"
    ],
    icon: "Users"
  },
  {
    id: "family-counseling",
    category: "modality",
    title: "Family Counseling & Healing",
    subtitle: "Restoring Broken Bonds",
    description: "Guidance and counseling sessions for families to heal from the strain of addiction, understand the recovery process, rebuild trust, and cultivate an empowering home environment.",
    features: [
      "Family communication bridge rebuilding",
      "Educating loved ones on recovery dynamics",
      "Boundary setting and codependency resolution",
      "Home transition guidance prior to discharge"
    ],
    icon: "Home"
  },

  // Holistic
  {
    id: "yoga-therapy",
    category: "holistic",
    title: "Yoga Therapy & Asanas",
    subtitle: "Physical Vitality & Somatic Balance",
    description: "Daily guided yoga sessions that rebuild muscular strength, detoxify vital organs, restore hormonal balance, and foster physical discipline and bodily harmony.",
    features: [
      "Daily sunrise therapeutic yoga postures",
      "Rebuilding physical stamina and flexibility",
      "Detoxification through movement and breath",
      "Accessible to all physical conditions"
    ],
    icon: "Sun"
  },
  {
    id: "meditation-mindfulness",
    category: "holistic",
    title: "Meditation & Mindfulness",
    subtitle: "Mental Stillness & Craving Control",
    description: "Guided meditation and Pranayam breathing practices designed to calm nervous tension, reduce anxiety, control psychological cravings, and enhance daily mental focus.",
    features: [
      "Pranayam deep breathwork techniques",
      "Guided visualization and mindfulness practices",
      "Managing compulsive urge spikes naturally",
      "Achieving sustained mental tranquility"
    ],
    icon: "Sparkles"
  },
  {
    id: "spiritual-healing",
    category: "holistic",
    title: "Spiritual Healing Sessions",
    subtitle: "Inner Peace & Life Purpose",
    description: "Reflective programs that encourage residents to rediscover moral grounding, self-awareness, inner peace, and personal accountability beyond chemical dependence.",
    features: [
      "Value realignment and moral reflection",
      "Gratitude journaling and evening contemplation",
      "Rebuilding self-forgiveness and personal purpose",
      "Universal spiritual grounding (secular and respectful)"
    ],
    icon: "Compass"
  }
];

export const RELAPSE_PREVENTION_PILLARS = [
  {
    title: "Trigger Identification & Management",
    description: "Recognizing high-risk emotional states (HALT: Hungry, Angry, Lonely, Tired), social environments, and personal triggers before they lead to relapse."
  },
  {
    title: "Habit Transformation Protocols",
    description: "Replacing destructive habitual loops with life-affirming physical exercise, productive hobbies, and positive dopamine sources."
  },
  {
    title: "Stress & Anger Regulation",
    description: "Equipping patients with somatic grounding, verbal de-escalation, and mindfulness tools to handle life's unavoidable pressures."
  },
  {
    title: "Routine Building & Ongoing Follow-up",
    description: "Cultivating rigorous morning and evening routines, scheduled check-ins, and outpatient counseling support after discharge."
  }
];
