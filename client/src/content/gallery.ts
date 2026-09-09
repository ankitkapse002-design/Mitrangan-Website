export interface GalleryItem {
  id: string;
  category: 'campus' | 'therapy' | 'events' | 'press';
  title: string;
  description: string;
  imageSrc: string;
  tag: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    category: "campus",
    title: "Mitrangan Campus Garden & Outdoor Lawns",
    description: "Serene greenery where residents engage in morning walks, reflective journaling, and outdoor group conversations.",
    imageSrc: "/assets/facility_garden.jpg",
    tag: "Campus Environment"
  },
  {
    id: "gal-2",
    category: "campus",
    title: "Reflective Campus Walkway",
    description: "Quiet outdoor pathway supporting daily physical activity, gentle meditation, and fresh air.",
    imageSrc: "/assets/facility_walkway.jpg",
    tag: "Campus Environment"
  },
  {
    id: "gal-3",
    category: "therapy",
    title: "Confidential Counseling & Consultation Room",
    description: "Private, welcoming therapeutic room designed for 1-on-1 psychological sessions and emotional assessment.",
    imageSrc: "/assets/counseling_room.jpg",
    tag: "Therapy & Care"
  },
  {
    id: "gal-4",
    category: "therapy",
    title: "Daily Yoga & Somatic Wellness Session",
    description: "Resident community practicing morning therapeutic asanas and deep pranayam breathing under guided instruction.",
    imageSrc: "/assets/yoga_activity.jpg",
    tag: "Holistic Healing"
  },
  {
    id: "gal-5",
    category: "campus",
    title: "Resident Dining & Community Hall",
    description: "Hygienic, comfortable dining hall where residents share balanced, nutritious meals together in fellowship.",
    imageSrc: "/assets/dining_hall.jpg",
    tag: "Campus Environment"
  },
  {
    id: "gal-6",
    category: "campus",
    title: "Comfortable Residential Ward Accommodation",
    description: "Clean, organized, and ventilated living spaces ensuring restful sleep, dignity, and personal safety.",
    imageSrc: "/assets/residential_ward.jpg",
    tag: "Residential Facilities"
  },
  {
    id: "gal-7",
    category: "campus",
    title: "Indoor Recreation & Activity Hall",
    description: "Equipped hall for indoor board games, recreational reading, creative pursuits, and social bonding.",
    imageSrc: "/assets/recreation_hall.jpg",
    tag: "Recreation & Life"
  },
  {
    id: "gal-8",
    category: "therapy",
    title: "Group Therapy Circle & Peer Support",
    description: "Structured group discussion circle where residents share recovery milestones and build mutual accountability.",
    imageSrc: "/assets/group_therapy.jpg",
    tag: "Therapy & Care"
  },
  {
    id: "gal-9",
    category: "events",
    title: "Independence Day Celebration at Mitrangan",
    description: "Residents and staff celebrating national freedom with patriotic enthusiasm, symbolizing personal liberation from addiction.",
    imageSrc: "/assets/independence_day.jpg",
    tag: "Community Events"
  },
  {
    id: "gal-10",
    category: "events",
    title: "Music Night for Drug-Free Awareness",
    description: "Live musical gathering bringing therapeutic joy, songs of hope, and cultural connection to all residents.",
    imageSrc: "/assets/music_night.jpg",
    tag: "Community Events"
  },
  {
    id: "gal-11",
    category: "campus",
    title: "Main Facility Building & Administrative Office",
    description: "Exterior view of Mitrangan Rehabilitation Center housing clinical consultation, reception, and resident wings.",
    imageSrc: "/assets/campus_building.webp",
    tag: "Campus Facilities"
  },
  {
    id: "gal-12",
    category: "campus",
    title: "Ward Bedding & Hygiene Management",
    description: "Daily maintained residential quarters adhering to strict sanitation and orderliness standards.",
    imageSrc: "/assets/campus_ward.webp",
    tag: "Residential Facilities"
  },
  {
    id: "gal-13",
    category: "therapy",
    title: "Resident Workshop & Group Activity Hall",
    description: "Multipurpose room used for psychoeducation seminars, motivational talks, and relapse prevention workshops.",
    imageSrc: "/assets/activity_hall.webp",
    tag: "Therapy & Care"
  },
  {
    id: "gal-14",
    category: "therapy",
    title: "Clinical Consultation & Health Monitoring",
    description: "Periodic health screenings, vital monitoring, and medical consultations for holistic well-being.",
    imageSrc: "/assets/doctor_consultation.webp",
    tag: "Medical Monitoring"
  },
  {
    id: "gal-15",
    category: "press",
    title: "Newspaper Coverage: Mitrangan De-Addiction Initiative",
    description: "Press feature detailing community awareness initiatives and free rehabilitation guidance provided by Mitrangan.",
    imageSrc: "/assets/press_clipping_1.png",
    tag: "Press & Media"
  },
  {
    id: "gal-16",
    category: "press",
    title: "Media Report: Social Outreach & Rehabilitation Work",
    description: "Regional publication highlighting Mitrangan's efforts in drug-free advocacy and youth habit transformation.",
    imageSrc: "/assets/press_clipping_2.png",
    tag: "Press & Media"
  }
];
