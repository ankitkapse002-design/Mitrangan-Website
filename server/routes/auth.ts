import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { adminLoginSchema, userLoginSchema } from '../../shared/schema.js';
import { getAdminByUsername, getRegistrationByUserId, logAudit } from '../db/index.js';
import { signAdminToken, signPatientToken, requireAdmin, requirePatient, type AuthenticatedAdminRequest, type AuthenticatedPatientRequest } from '../middleware/auth.js';

const router = Router();

// Admin Login
router.post('/admin/login', async (req, res) => {
  try {
    const parseResult = adminLoginSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ error: parseResult.error.errors[0].message });
    }

    const { username, password } = parseResult.data;
    const admin = await getAdminByUsername(username);

    if (!admin) {
      return res.status(401).json({ error: 'Invalid administrator credentials.' });
    }

    const isMatch = await bcrypt.compare(password, admin.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid administrator credentials.' });
    }

    const token = signAdminToken({ id: admin.id, username: admin.username });

    res.cookie('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 12 * 60 * 60 * 1000 // 12 hours
    });

    await logAudit('ADMIN_LOGIN', admin.username, undefined, { ip: req.ip });

    return res.json({
      success: true,
      token,
      admin: {
        id: admin.id,
        username: admin.username
      }
    });
  } catch (err: any) {
    console.error('Admin login error:', err);
    return res.status(500).json({ error: 'Internal server error during administrator login.' });
  }
});

// Admin Me
router.get('/admin/me', requireAdmin, (req: AuthenticatedAdminRequest, res) => {
  return res.json({
    authenticated: true,
    admin: req.admin
  });
});

// Admin Logout
router.post('/admin/logout', (_req, res) => {
  res.clearCookie('admin_token');
  return res.json({ success: true, message: 'Logged out successfully.' });
});

// Patient Login
router.post('/user/login', async (req, res) => {
  try {
    const parseResult = userLoginSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ error: parseResult.error.errors[0].message });
    }

    const { userId, mobileNumber } = parseResult.data;
    const registration = await getRegistrationByUserId(userId);

    if (!registration) {
      return res.status(404).json({ error: 'No registration record found for this User ID.' });
    }

    // Match mobile number (ignoring spaces/dashes)
    const cleanInputMobile = mobileNumber.replace(/\D/g, '');
    const cleanStoredMobile = registration.mobile_number.replace(/\D/g, '');

    if (!cleanStoredMobile.endsWith(cleanInputMobile.slice(-10))) {
      return res.status(401).json({ error: 'Mobile number does not match registration record.' });
    }

    const token = signPatientToken({ userId: registration.user_id, mobileNumber: registration.mobile_number });

    res.cookie('patient_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    await logAudit('PATIENT_LOGIN', registration.user_id, registration.user_id);

    return res.json({
      success: true,
      token,
      patient: {
        userId: registration.user_id,
        fullName: registration.full_name,
        admissionStatus: registration.admission_status,
        createdAt: registration.created_at
      }
    });
  } catch (err: any) {
    console.error('Patient login error:', err);
    return res.status(500).json({ error: 'Internal server error during patient identification.' });
  }
});

// Patient Me
router.get('/user/me', requirePatient, async (req: AuthenticatedPatientRequest, res) => {
  if (!req.patient) return res.status(401).json({ error: 'Not authenticated' });
  const reg = await getRegistrationByUserId(req.patient.userId);
  if (!reg) return res.status(404).json({ error: 'Record not found' });
  return res.json({
    authenticated: true,
    patient: reg
  });
});

// Patient Logout
router.post('/user/logout', (_req, res) => {
  res.clearCookie('patient_token');
  return res.json({ success: true, message: 'Logged out successfully.' });
});

export default router;
