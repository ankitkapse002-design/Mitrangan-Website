export type AdmissionStatus = 'Pending' | 'Under Review' | 'Approved' | 'Not Approved';

export interface RegistrationRecord {
  id: number;
  user_id: string;
  full_name: string;
  age: number;
  mobile_number: string;
  address: string;
  admission_status: AdmissionStatus;
  program_preference?: string;
  pickup_required?: boolean;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface AdminUser {
  id: number;
  username: string;
  created_at: string;
}

export interface AuditLogEntry {
  id: number;
  action: string;
  performed_by: string;
  target_id?: string;
  details?: Record<string, any>;
  timestamp: string;
}

export interface StatsOverview {
  totalRegistrations: number;
  pendingCount: number;
  underReviewCount: number;
  approvedCount: number;
  notApprovedCount: number;
}

export interface BlogContentSection {
  sectionHeading: string;
  paragraphs: string[];
  bulletPoints?: string[];
}

export interface BlogPostRecord {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  author: string;
  read_time: string;
  excerpt: string;
  cover_image: string;
  content: BlogContentSection[];
  created_at: string;
  updated_at: string;
}

