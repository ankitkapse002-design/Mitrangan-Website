import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import registrationRoutes from './routes/registrations.js';
import blogRoutes from './routes/blogs.js';
import legacyRedirects from './routes/redirects.js';
import { initDatabase } from './db/index.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Legacy SEO URL Redirects
app.use(legacyRedirects);

// Static assets from public
app.use(express.static(path.resolve(rootDir, 'client/public')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api', registrationRoutes);
app.use('/api', blogRoutes);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'Mitrangan Rehabilitation API', timestamp: new Date().toISOString() });
});

async function startServer() {
  await initDatabase();

  // Vite integration in development
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
      root: path.resolve(rootDir, 'client')
    });
    app.use(vite.middlewares);
  } else {
    // Serve static frontend in production
    const distPath = path.resolve(rootDir, 'dist/public');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(` MITRANGAN DE-ADDICTION CUM REHABILITATION CENTER`);
    console.log(` Web Server running at: http://localhost:${PORT}`);
    console.log(` Admin Portal:         http://localhost:${PORT}/admin/login`);
    console.log(`======================================================\n`);
  });
}

startServer().catch(err => {
  console.error('Fatal server startup error:', err);
  process.exit(1);
});
