import serverless from 'serverless-http';
import app from '../../server/app.js';
import { initDatabase } from '../../server/db/index.js';

let dbInitialized = false;

const serverlessHandler = serverless(app);

export const handler = async (event: any, context: any) => {
  // Ensure database schema and seeds are initialized once per lambda instance
  if (!dbInitialized) {
    await initDatabase();
    dbInitialized = true;
  }
  return serverlessHandler(event, context);
};
