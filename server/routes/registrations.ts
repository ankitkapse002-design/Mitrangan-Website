import { Router } from 'express';
import { registrationSchema, statusUpdateSchema } from '../../shared/schema.js';
import {
  createRegistration,
  getRegistrationByUserId,
  getRegistrations,
  updateRegistrationStatus,
  getStats,
  getAuditLogs
} from '../db/index.js';
import { requireAdmin, requirePatient, type AuthenticatedAdminRequest, type AuthenticatedPatientRequest } from '../middleware/auth.js';

const router = Router();

// Helper to mask name for public status lookup
function maskName(name: string): string {
  const parts = name.trim().split(/\s+/);
  return parts.map(p => {
    if (p.length <= 2) return p[0] + '*';
    return p[0] + '*'.repeat(p.length - 2) + p[p.length - 1];
  }).join(' ');
}

// 1. Public: Create Registration
router.post('/registrations', async (req, res) => {
  try {
    const parseResult = registrationSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ error: parseResult.error.errors[0].message });
    }

    const newRecord = await createRegistration(parseResult.data);
    return res.status(201).json({
      success: true,
      message: 'Registration created successfully.',
      userId: newRecord.user_id,
      record: newRecord
    });
  } catch (err: any) {
    console.error('Registration error:', err);
    return res.status(500).json({ error: 'Failed to complete admission registration. Please try again.' });
  }
});

// 2. Public: Check Admission Status by User ID
router.get('/status/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId || userId.trim().length < 4) {
      return res.status(400).json({ error: 'Valid User ID is required.' });
    }

    const record = await getRegistrationByUserId(userId);
    if (!record) {
      return res.status(404).json({
        found: false,
        error: `No admission record found for User ID "${userId.toUpperCase()}". Please verify the ID or contact our 24/7 helpline.`
      });
    }

    // Return sanitized status response (protecting personal address/mobile from public queries)
    return res.json({
      found: true,
      userId: record.user_id,
      maskedName: maskName(record.full_name),
      admissionStatus: record.admission_status,
      programPreference: record.program_preference,
      pickupRequired: record.pickup_required,
      registeredDate: record.created_at,
      updatedDate: record.updated_at
    });
  } catch (err: any) {
    console.error('Status lookup error:', err);
    return res.status(500).json({ error: 'Error querying admission status.' });
  }
});

// 3. Patient Portal: My Record
router.get('/patient/record', requirePatient, async (req: AuthenticatedPatientRequest, res) => {
  try {
    if (!req.patient) return res.status(401).json({ error: 'Unauthorized' });
    const record = await getRegistrationByUserId(req.patient.userId);
    if (!record) return res.status(404).json({ error: 'Record not found' });
    return res.json({ success: true, record });
  } catch (err: any) {
    console.error('Patient record error:', err);
    return res.status(500).json({ error: 'Error fetching patient profile.' });
  }
});

// 4. Admin: Get Stats
router.get('/admin/stats', requireAdmin, async (_req, res) => {
  try {
    const stats = await getStats();
    return res.json(stats);
  } catch (err: any) {
    console.error('Admin stats error:', err);
    return res.status(500).json({ error: 'Failed to retrieve stats.' });
  }
});

// 5. Admin: List All Registrations
router.get('/admin/registrations', requireAdmin, async (req, res) => {
  try {
    const status = req.query.status as string | undefined;
    const search = req.query.search as string | undefined;
    const list = await getRegistrations({ status, search });
    return res.json({ success: true, count: list.length, registrations: list });
  } catch (err: any) {
    console.error('Admin registrations list error:', err);
    return res.status(500).json({ error: 'Failed to retrieve registrations.' });
  }
});

// 6. Admin: Update Admission Status
router.patch('/admin/registrations/:userId/status', requireAdmin, async (req: AuthenticatedAdminRequest, res) => {
  try {
    const { userId } = req.params;
    const parseResult = statusUpdateSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ error: parseResult.error.errors[0].message });
    }

    const updated = await updateRegistrationStatus(
      userId,
      parseResult.data.status,
      parseResult.data.notes,
      req.admin?.username || 'Administrator'
    );

    if (!updated) {
      return res.status(404).json({ error: 'Registration not found.' });
    }

    return res.json({
      success: true,
      message: `Admission status updated to "${updated.admission_status}".`,
      record: updated
    });
  } catch (err: any) {
    console.error('Status update error:', err);
    return res.status(500).json({ error: 'Failed to update status.' });
  }
});

// 7. Admin: Get Audit Logs
router.get('/admin/audit-logs', requireAdmin, async (_req, res) => {
  try {
    const logs = await getAuditLogs(40);
    return res.json({ success: true, logs });
  } catch (err: any) {
    console.error('Audit logs error:', err);
    return res.status(500).json({ error: 'Failed to retrieve audit logs.' });
  }
});

export default router;
