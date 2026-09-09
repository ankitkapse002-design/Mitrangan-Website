export interface SocialCause {
  id: string;
  title: string;
  category: string;
  summary: string;
  initiatives: string[];
  impact: string;
}

export const SOCIAL_CAUSES: SocialCause[] = [
  {
    id: "de-addiction-outreach",
    title: "Community De-Addiction Programs",
    category: "Addiction Awareness",
    summary: "Counselling, rehabilitation, and awareness campaigns targeting alcohol, tobacco, and substance abuse across urban and rural communities.",
    initiatives: [
      "Grassroots youth de-addiction awareness drives",
      "Free confidential counseling booths at community fairs",
      "Distribution of educational literature on substance harm",
      "Subsidized admission support for economically underprivileged families"
    ],
    impact: "Over 50+ awareness drives conducted across Central India"
  },
  {
    id: "yoga-meditation-camps",
    title: "Yoga & Meditation Camps",
    category: "Holistic Wellness",
    summary: "Promoting mental well-being, nervous system rejuvenation, and emotional calm through ancient pranayam and yoga techniques.",
    initiatives: [
      "Regular open-air community yoga sessions",
      "Stress relief workshops for working professionals",
      "Breathing and meditation training for student groups"
    ],
    impact: "Thousands of participants introduced to daily pranayam"
  },
  {
    id: "naturopathy-healing",
    title: "Naturopathy & Alternative Therapies",
    category: "Natural Healing",
    summary: "Promoting alternative healing methods rooted in nature to restore physical equilibrium alongside clinical rehabilitation.",
    initiatives: [
      "Free and subsidized herbal health consultations",
      "Dietary awareness workshops for digestive and liver detoxification",
      "Natural lifestyle habit guidance"
    ],
    impact: "Holistic balance without synthetic pharmaceutical dependency"
  },
  {
    id: "women-empowerment",
    title: "Women Empowerment Initiatives",
    category: "Social Upliftment",
    summary: "Skill development, self-defense training, vocational programs, and emotional support networks for women facing domestic strain.",
    initiatives: [
      "Vocational handicrafts and tailoring workshops",
      "Counseling for women affected by substance abuse in the household",
      "Legal literacy and emotional resilience networks"
    ],
    impact: "Empowering mothers, sisters, and wives with independence"
  },
  {
    id: "aids-awareness",
    title: "AIDS & HIV Awareness Drives",
    category: "Public Health",
    summary: "Removing social stigma around HIV/AIDS through compassionate education, prevention drives, and confidential check-up camps.",
    initiatives: [
      "Harm-reduction education targeting intravenous drug users",
      "Confidential screening and health counseling camps",
      "Stigma eradication seminars in educational institutes"
    ],
    impact: "Encouraging early screening and medical compassion"
  },
  {
    id: "environmental-protection",
    title: "Environmental & Forest Protection",
    category: "Ecology & Green Living",
    summary: "Plantation drives, eco-awareness workshops, and promoting sustainable, eco-friendly community living.",
    initiatives: [
      "Annual resident tree plantation drives in Godhani, Nagpur",
      "Clean campus and zero-plastic campaigns",
      "Environmental cleanliness workshops"
    ],
    impact: "Hundreds of saplings planted and nurtured annually"
  },
  {
    id: "medical-camps",
    title: "Free Medical & Health Camps",
    category: "Healthcare Outreach",
    summary: "Free health check-ups in underserved rural and urban areas, blood donation drives, and hygiene education.",
    initiatives: [
      "General health check-up camps with volunteer doctors",
      "Blood donation campaigns in collaboration with local hospitals",
      "Preventative health screening for elderly citizens"
    ],
    impact: "Providing essential medical diagnostics to underserved populations"
  },
  {
    id: "general-social-services",
    title: "General Social Upliftment Services",
    category: "Community Welfare",
    summary: "Distribution of food, warm clothes, educational materials, and emergency relief to marginalized families.",
    initiatives: [
      "Seasonal blanket and winter clothing distribution",
      "Nutritious food distribution drives",
      "Educational stationery support for underprivileged children"
    ],
    impact: "Fostering community goodwill, empathy, and social solidarity"
  }
];
