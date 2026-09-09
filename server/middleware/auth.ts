import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'mitrangan_secure_jwt_secret_token_2026_key';

export interface AuthenticatedAdminRequest extends Request {
  admin?: {
    id: number;
    username: string;
  };
}

export interface AuthenticatedPatientRequest extends Request {
  patient?: {
    userId: string;
    mobileNumber: string;
  };
}

export function signAdminToken(admin: { id: number; username: string }): string {
  return jwt.sign({ id: admin.id, username: admin.username, role: 'admin' }, JWT_SECRET, { expiresIn: '12h' });
}

export function signPatientToken(patient: { userId: string; mobileNumber: string }): string {
  return jwt.sign({ userId: patient.userId, mobileNumber: patient.mobileNumber, role: 'patient' }, JWT_SECRET, { expiresIn: '7d' });
}

export function requireAdmin(req: AuthenticatedAdminRequest, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    const cookieToken = req.cookies?.admin_token;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : cookieToken;

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: Admin authentication required.' });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    if (decoded.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden: Administrative privileges required.' });
    }

    req.admin = { id: decoded.id, username: decoded.username };
    next();
  } catch {
    return res.status(401).json({ error: 'Unauthorized: Invalid or expired administrator session.' });
  }
}

export function requirePatient(req: AuthenticatedPatientRequest, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    const cookieToken = req.cookies?.patient_token;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : cookieToken;

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: Patient login required.' });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    if (decoded.role !== 'patient') {
      return res.status(403).json({ error: 'Forbidden: Invalid patient session.' });
    }

    req.patient = { userId: decoded.userId, mobileNumber: decoded.mobileNumber };
    next();
  } catch {
    return res.status(401).json({ error: 'Unauthorized: Invalid or expired patient session.' });
  }
}
