import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import registrationRoutes from './routes/registrations.js';
import blogRoutes from './routes/blogs.js';
import legacyRedirects from './routes/redirects.js';
import { securityHeadersMiddleware } from './middleware/security.js';

dotenv.config();

export const app = express();

app.use(securityHeadersMiddleware);
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Normalize path if Netlify prefixes with /.netlify/functions/api
app.use((req, _res, next) => {
  if (req.url.startsWith('/.netlify/functions/api')) {
    let stripped = req.url.replace('/.netlify/functions/api', '');
    if (!stripped.startsWith('/')) {
      stripped = '/' + stripped;
    }
    req.url = stripped;
  }
  next();
});

// Legacy SEO URL Redirects
app.use(legacyRedirects);

// Static assets from public (only in standalone Node runtime, Netlify CDN serves publish directory directly)
const isServerless = Boolean(process.env.NETLIFY || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.LAMBDA_TASK_ROOT);
if (!isServerless) {
  try {
    app.use(express.static(path.resolve(process.cwd(), 'client/public')));
  } catch {
    // ignore
  }
}

// API Routes - mounted at both /api and root / to support any proxy/rewrite path
app.use('/api/auth', authRoutes);
app.use('/auth', authRoutes);

app.use('/api', registrationRoutes);
app.use('/', registrationRoutes);

app.use('/api', blogRoutes);
app.use('/', blogRoutes);

// Health check
app.get(['/api/health', '/health'], (_req, res) => {
  res.json({ status: 'ok', service: 'Mitrangan Rehabilitation API', timestamp: new Date().toISOString() });
});

export default app;
