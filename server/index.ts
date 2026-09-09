import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import app from './app.js';
import { initDatabase } from './db/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const PORT = process.env.PORT || 5000;

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
