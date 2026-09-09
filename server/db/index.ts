import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import pg from 'pg';
import type { RegistrationRecord, AdmissionStatus, StatsOverview, AuditLogEntry, AdminUser, BlogPostRecord } from '../../shared/types.js';
import type { BlogPostInput } from '../../shared/schema.js';

const { Pool } = pg;

// Check if PostgreSQL DATABASE_URL is configured
const dbUrl = process.env.DATABASE_URL?.trim();
let pgPool: pg.Pool | null = null;

if (dbUrl) {
  try {
    pgPool = new Pool({ connectionString: dbUrl, ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined });
    console.log('[DB] Connecting to PostgreSQL database...');
  } catch (err) {
    console.warn('[DB] Could not initialize PostgreSQL Pool, falling back to durable local storage:', err);
    pgPool = null;
  }
}

// Fallback JSON storage setup
const DATA_DIR = path.resolve(process.cwd(), 'server/data');
const DATA_FILE = path.join(DATA_DIR, 'database.json');

interface LocalDatabaseState {
  registrations: RegistrationRecord[];
  admins: { id: number; username: string; password_hash: string; created_at: string }[];
  auditLogs: AuditLogEntry[];
  blogs: BlogPostRecord[];
  nextId: { registrations: number; admins: number; auditLogs: number; blogs: number };
}

function loadLocalDB(): LocalDatabaseState {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    const initialState: LocalDatabaseState = {
      registrations: [],
      admins: [],
      auditLogs: [],
      blogs: [],
      nextId: { registrations: 1, admins: 1, auditLogs: 1, blogs: 1 }
    };
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialState, null, 2), 'utf-8');
    return initialState;
  }
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    if (!parsed.blogs) parsed.blogs = [];
    if (!parsed.nextId.blogs) parsed.nextId.blogs = 1;
    return parsed;
  } catch {
    return { registrations: [], admins: [], auditLogs: [], blogs: [], nextId: { registrations: 1, admins: 1, auditLogs: 1, blogs: 1 } };
  }
}

function saveLocalDB(state: LocalDatabaseState) {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(DATA_FILE, JSON.stringify(state, null, 2), 'utf-8');
}

const INITIAL_BLOGS = [
  {
    slug: "chhindwara-recovery-guide",
    title: "Best Nasha Mukti Kendra Chhindwara: Complete Guide to Addiction Recovery",
    subtitle: "Understanding Addiction, Structured Care, and Steps Toward Sustainable Healing",
    category: "Recovery Guide",
    date: "August 1, 2026",
    author: "Mitrangan Clinical Editorial Team",
    read_time: "6 min read",
    excerpt: "Addiction affects health, relationships, work, and overall quality of life. Learn what to look for in a rehabilitation center and how structured recovery transforms lives.",
    cover_image: "/assets/facility_walkway.jpg",
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
    category: "Clinical Advice",
    date: "February 18, 2026",
    author: "Mitrangan Clinical Editorial Team",
    read_time: "4 min read",
    excerpt: "Addiction often develops quietly, and many families fail to recognize the warning signs until severe harm occurs. Discover the early signs and how to seek help.",
    cover_image: "/assets/counseling_session.jpg",
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

// Ensure database schema and initial admin seed
export async function initDatabase() {
  const initialAdminUser = process.env.ADMIN_INITIAL_USERNAME || 'kartik';
  const initialAdminPass = process.env.ADMIN_INITIAL_PASSWORD || '@kartik9767';
  const passwordHash = await bcrypt.hash(initialAdminPass, 10);

  if (pgPool) {
    try {
      // Create PostgreSQL tables
      await pgPool.query(`
        CREATE TABLE IF NOT EXISTS registrations (
          id SERIAL PRIMARY KEY,
          user_id VARCHAR(30) UNIQUE NOT NULL,
          full_name VARCHAR(150) NOT NULL,
          age INTEGER NOT NULL,
          mobile_number VARCHAR(20) NOT NULL,
          address TEXT NOT NULL,
          program_preference VARCHAR(100) DEFAULT 'General Rehabilitation',
          pickup_required BOOLEAN DEFAULT FALSE,
          admission_status VARCHAR(50) DEFAULT 'Pending',
          notes TEXT,
          created_at TIMESTAMPTZ DEFAULT NOW(),
          updated_at TIMESTAMPTZ DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS admin_users (
          id SERIAL PRIMARY KEY,
          username VARCHAR(50) UNIQUE NOT NULL,
          password_hash VARCHAR(255) NOT NULL,
          created_at TIMESTAMPTZ DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS audit_logs (
          id SERIAL PRIMARY KEY,
          action VARCHAR(100) NOT NULL,
          performed_by VARCHAR(50) NOT NULL,
          target_id VARCHAR(50),
          details JSONB,
          timestamp TIMESTAMPTZ DEFAULT NOW()
        );
      `);

      // Seed initial admin if not exists
      const checkAdmin = await pgPool.query('SELECT id FROM admin_users WHERE username = $1', [initialAdminUser]);
      if (checkAdmin.rowCount === 0) {
        await pgPool.query('INSERT INTO admin_users (username, password_hash) VALUES ($1, $2)', [initialAdminUser, passwordHash]);
        console.log(`[DB] Seeded initial administrator: ${initialAdminUser}`);
      }
      console.log('[DB] PostgreSQL initialized successfully.');
      return;
    } catch (err) {
      console.warn('[DB] PostgreSQL connection error. Falling back to local file storage.', err);
      pgPool = null;
    }
  }

  // Local storage initialization
  const db = loadLocalDB();
  const existingAdmin = db.admins.find(a => a.username.toLowerCase() === initialAdminUser.toLowerCase());
  if (!existingAdmin) {
    db.admins.push({
      id: db.nextId.admins++,
      username: initialAdminUser,
      password_hash: passwordHash,
      created_at: new Date().toISOString()
    });
    saveLocalDB(db);
    console.log(`[DB-Local] Seeded initial administrator: ${initialAdminUser}`);
  }

  // Seed initial blogs if none exist
  if (!db.blogs || db.blogs.length === 0) {
    const now = new Date().toISOString();
    db.blogs = INITIAL_BLOGS.map((b, idx) => ({
      ...b,
      id: idx + 1,
      created_at: now,
      updated_at: now
    }));
    db.nextId.blogs = db.blogs.length + 1;
    saveLocalDB(db);
    console.log(`[DB-Local] Seeded ${db.blogs.length} initial clinical blog articles.`);
  }

  console.log('[DB] Local storage initialized.');
}

// Generate Unique User ID
// Rule: First 4 capital letters of the user's name + year + unique sequence
export async function generateUniqueUserId(fullName: string): Promise<string> {
  const lettersOnly = fullName.replace(/[^a-zA-Z]/g, '').toUpperCase();
  let prefix = lettersOnly.slice(0, 4);
  if (prefix.length < 4) {
    prefix = (prefix + 'XXXX').slice(0, 4);
  }
  const year = new Date().getFullYear().toString();

  // Find existing IDs matching prefix + year
  let counter = 1;
  while (true) {
    const candidate = `${prefix}${year}-${String(counter).padStart(3, '0')}`;
    const existing = await getRegistrationByUserId(candidate);
    if (!existing) {
      return candidate;
    }
    counter++;
  }
}

// Database API operations
export async function getRegistrations(filter?: { status?: string; search?: string }): Promise<RegistrationRecord[]> {
  if (pgPool) {
    let query = 'SELECT * FROM registrations WHERE 1=1';
    const params: any[] = [];

    if (filter?.status && filter.status !== 'All') {
      params.push(filter.status);
      query += ` AND admission_status = $${params.length}`;
    }
    if (filter?.search) {
      params.push(`%${filter.search.toLowerCase()}%`);
      query += ` AND (LOWER(full_name) LIKE $${params.length} OR LOWER(user_id) LIKE $${params.length} OR mobile_number LIKE $${params.length})`;
    }

    query += ' ORDER BY created_at DESC';
    const res = await pgPool.query(query, params);
    return res.rows.map(r => ({
      id: r.id,
      user_id: r.user_id,
      full_name: r.full_name,
      age: r.age,
      mobile_number: r.mobile_number,
      address: r.address,
      admission_status: r.admission_status,
      program_preference: r.program_preference,
      pickup_required: r.pickup_required,
      notes: r.notes,
      created_at: r.created_at.toISOString(),
      updated_at: r.updated_at.toISOString()
    }));
  }

  const db = loadLocalDB();
  let list = [...db.registrations];

  if (filter?.status && filter.status !== 'All') {
    list = list.filter(r => r.admission_status === filter.status);
  }
  if (filter?.search) {
    const s = filter.search.toLowerCase();
    list = list.filter(r =>
      r.full_name.toLowerCase().includes(s) ||
      r.user_id.toLowerCase().includes(s) ||
      r.mobile_number.includes(s)
    );
  }

  return list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export async function getRegistrationByUserId(userId: string): Promise<RegistrationRecord | null> {
  const cleanId = userId.trim().toUpperCase();
  if (pgPool) {
    const res = await pgPool.query('SELECT * FROM registrations WHERE UPPER(user_id) = $1', [cleanId]);
    if (res.rowCount === 0) return null;
    const r = res.rows[0];
    return {
      id: r.id,
      user_id: r.user_id,
      full_name: r.full_name,
      age: r.age,
      mobile_number: r.mobile_number,
      address: r.address,
      admission_status: r.admission_status,
      program_preference: r.program_preference,
      pickup_required: r.pickup_required,
      notes: r.notes,
      created_at: r.created_at.toISOString(),
      updated_at: r.updated_at.toISOString()
    };
  }

  const db = loadLocalDB();
  const found = db.registrations.find(r => r.user_id.toUpperCase() === cleanId);
  return found || null;
}

export async function createRegistration(data: {
  fullName: string;
  age: number;
  mobileNumber: string;
  address: string;
  programPreference?: string;
  pickupRequired?: boolean;
}): Promise<RegistrationRecord> {
  const userId = await generateUniqueUserId(data.fullName);
  const now = new Date().toISOString();

  if (pgPool) {
    const res = await pgPool.query(`
      INSERT INTO registrations 
        (user_id, full_name, age, mobile_number, address, program_preference, pickup_required, admission_status, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *
    `, [
      userId,
      data.fullName,
      data.age,
      data.mobileNumber,
      data.address,
      data.programPreference || 'General Rehabilitation',
      !!data.pickupRequired,
      'Pending',
      now,
      now
    ]);
    const r = res.rows[0];
    await logAudit('REGISTRATION_CREATED', 'System / Online Form', userId, { fullName: data.fullName, mobile: data.mobileNumber });
    return {
      id: r.id,
      user_id: r.user_id,
      full_name: r.full_name,
      age: r.age,
      mobile_number: r.mobile_number,
      address: r.address,
      admission_status: r.admission_status,
      program_preference: r.program_preference,
      pickup_required: r.pickup_required,
      notes: r.notes,
      created_at: r.created_at.toISOString(),
      updated_at: r.updated_at.toISOString()
    };
  }

  const db = loadLocalDB();
  const newRecord: RegistrationRecord = {
    id: db.nextId.registrations++,
    user_id: userId,
    full_name: data.fullName,
    age: data.age,
    mobile_number: data.mobileNumber,
    address: data.address,
    program_preference: data.programPreference || 'General Rehabilitation',
    pickup_required: !!data.pickupRequired,
    admission_status: 'Pending',
    created_at: now,
    updated_at: now
  };

  db.registrations.push(newRecord);
  saveLocalDB(db);
  await logAudit('REGISTRATION_CREATED', 'System / Online Form', userId, { fullName: data.fullName, mobile: data.mobileNumber });
  return newRecord;
}

export async function updateRegistrationStatus(
  userId: string,
  newStatus: AdmissionStatus,
  notes?: string,
  performedBy: string = 'Admin'
): Promise<RegistrationRecord | null> {
  const cleanId = userId.trim().toUpperCase();
  const now = new Date().toISOString();

  if (pgPool) {
    const prevRes = await pgPool.query('SELECT * FROM registrations WHERE UPPER(user_id) = $1', [cleanId]);
    if (prevRes.rowCount === 0) return null;
    const oldStatus = prevRes.rows[0].admission_status;

    const res = await pgPool.query(`
      UPDATE registrations 
      SET admission_status = $1, notes = COALESCE($2, notes), updated_at = $3
      WHERE UPPER(user_id) = $4
      RETURNING *
    `, [newStatus, notes || null, now, cleanId]);

    const updated = res.rows[0];
    await logAudit('STATUS_CHANGED', performedBy, cleanId, { oldStatus, newStatus, notes });
    return {
      id: updated.id,
      user_id: updated.user_id,
      full_name: updated.full_name,
      age: updated.age,
      mobile_number: updated.mobile_number,
      address: updated.address,
      admission_status: updated.admission_status,
      program_preference: updated.program_preference,
      pickup_required: updated.pickup_required,
      notes: updated.notes,
      created_at: updated.created_at.toISOString(),
      updated_at: updated.updated_at.toISOString()
    };
  }

  const db = loadLocalDB();
  const index = db.registrations.findIndex(r => r.user_id.toUpperCase() === cleanId);
  if (index === -1) return null;

  const oldStatus = db.registrations[index].admission_status;
  db.registrations[index].admission_status = newStatus;
  if (notes !== undefined) {
    db.registrations[index].notes = notes;
  }
  db.registrations[index].updated_at = now;
  saveLocalDB(db);

  await logAudit('STATUS_CHANGED', performedBy, cleanId, { oldStatus, newStatus, notes });
  return db.registrations[index];
}

export async function getStats(): Promise<StatsOverview> {
  const registrations = await getRegistrations();
  return {
    totalRegistrations: registrations.length,
    pendingCount: registrations.filter(r => r.admission_status === 'Pending').length,
    underReviewCount: registrations.filter(r => r.admission_status === 'Under Review').length,
    approvedCount: registrations.filter(r => r.admission_status === 'Approved').length,
    notApprovedCount: registrations.filter(r => r.admission_status === 'Not Approved').length
  };
}

export async function getAdminByUsername(username: string): Promise<{ id: number; username: string; password_hash: string } | null> {
  const cleanUser = username.trim().toLowerCase();
  if (pgPool) {
    const res = await pgPool.query('SELECT * FROM admin_users WHERE LOWER(username) = $1', [cleanUser]);
    if (res.rowCount === 0) return null;
    return res.rows[0];
  }

  const db = loadLocalDB();
  const admin = db.admins.find(a => a.username.toLowerCase() === cleanUser);
  return admin || null;
}

export async function logAudit(action: string, performedBy: string, targetId?: string, details?: any) {
  const now = new Date().toISOString();
  if (pgPool) {
    try {
      await pgPool.query(
        'INSERT INTO audit_logs (action, performed_by, target_id, details, timestamp) VALUES ($1, $2, $3, $4, $5)',
        [action, performedBy, targetId || null, details ? JSON.stringify(details) : null, now]
      );
      return;
    } catch (e) {
      console.error('[DB] Failed to write audit log to PostgreSQL:', e);
    }
  }

  const db = loadLocalDB();
  db.auditLogs.unshift({
    id: db.nextId.auditLogs++,
    action,
    performed_by: performedBy,
    target_id: targetId,
    details,
    timestamp: now
  });
  // Keep last 100 entries in local db
  if (db.auditLogs.length > 100) {
    db.auditLogs = db.auditLogs.slice(0, 100);
  }
  saveLocalDB(db);
}

export async function getAuditLogs(limit: number = 30): Promise<AuditLogEntry[]> {
  if (pgPool) {
    const res = await pgPool.query('SELECT * FROM audit_logs ORDER BY timestamp DESC LIMIT $1', [limit]);
    return res.rows.map(r => ({
      id: r.id,
      action: r.action,
      performed_by: r.performed_by,
      target_id: r.target_id,
      details: r.details,
      timestamp: r.timestamp.toISOString()
    }));
  }

  const db = loadLocalDB();
  return db.auditLogs.slice(0, limit);
}

// -------------------------------------------------------------
// Dynamic Blog Platform Operations
// -------------------------------------------------------------
export async function getBlogs(): Promise<BlogPostRecord[]> {
  const db = loadLocalDB();
  return [...db.blogs].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export async function getBlogBySlug(slug: string): Promise<BlogPostRecord | null> {
  const db = loadLocalDB();
  const cleanSlug = slug.trim().toLowerCase();
  const found = db.blogs.find(b => b.slug.toLowerCase() === cleanSlug);
  return found || null;
}

export async function getLatestBlogs(limit: number = 3): Promise<BlogPostRecord[]> {
  const all = await getBlogs();
  return all.slice(0, limit);
}

export async function createBlog(data: BlogPostInput, performedBy: string = 'Admin'): Promise<BlogPostRecord> {
  const db = loadLocalDB();
  const now = new Date().toISOString();
  
  // Format readable date e.g. "September 8, 2026"
  const formattedDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  // Generate unique slug if duplicate
  let slug = data.slug.trim().toLowerCase();
  let counter = 1;
  while (db.blogs.some(b => b.slug.toLowerCase() === slug)) {
    slug = `${data.slug.trim().toLowerCase()}-${counter++}`;
  }

  const newPost: BlogPostRecord = {
    id: db.nextId.blogs++,
    slug,
    title: data.title.trim(),
    subtitle: data.subtitle.trim(),
    category: data.category || 'Recovery Guide',
    date: formattedDate,
    author: data.author || 'Mitrangan Clinical Editorial Team',
    read_time: data.read_time || '5 min read',
    excerpt: data.excerpt.trim(),
    cover_image: data.cover_image.trim(),
    content: data.content,
    created_at: now,
    updated_at: now
  };

  db.blogs.unshift(newPost);
  saveLocalDB(db);
  await logAudit('BLOG_CREATED', performedBy, String(newPost.id), { title: newPost.title, slug: newPost.slug });
  return newPost;
}

export async function updateBlog(id: number, data: Partial<BlogPostInput>, performedBy: string = 'Admin'): Promise<BlogPostRecord | null> {
  const db = loadLocalDB();
  const index = db.blogs.findIndex(b => b.id === id);
  if (index === -1) return null;

  const now = new Date().toISOString();
  const existing = db.blogs[index];

  const updated: BlogPostRecord = {
    ...existing,
    title: data.title ? data.title.trim() : existing.title,
    slug: data.slug ? data.slug.trim().toLowerCase() : existing.slug,
    subtitle: data.subtitle ? data.subtitle.trim() : existing.subtitle,
    category: data.category !== undefined ? data.category : existing.category,
    author: data.author !== undefined ? data.author : existing.author,
    read_time: data.read_time !== undefined ? data.read_time : existing.read_time,
    excerpt: data.excerpt ? data.excerpt.trim() : existing.excerpt,
    cover_image: data.cover_image ? data.cover_image.trim() : existing.cover_image,
    content: data.content ? data.content : existing.content,
    updated_at: now
  };

  db.blogs[index] = updated;
  saveLocalDB(db);
  await logAudit('BLOG_UPDATED', performedBy, String(id), { title: updated.title, slug: updated.slug });
  return updated;
}

export async function deleteBlog(id: number, performedBy: string = 'Admin'): Promise<boolean> {
  const db = loadLocalDB();
  const index = db.blogs.findIndex(b => b.id === id);
  if (index === -1) return false;

  const deleted = db.blogs.splice(index, 1)[0];
  saveLocalDB(db);
  await logAudit('BLOG_DELETED', performedBy, String(id), { title: deleted.title, slug: deleted.slug });
  return true;
}

