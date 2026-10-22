import { Hono } from 'hono';
import { handle } from 'hono/vercel';

import plaid from './plaid';
import summary from './summary';
import accounts from './accounts';
import categories from './categories';
import transactions from './transactions';

import { auth } from '@/lib/auth';
import { sql } from 'drizzle-orm';
import { db } from '@/db/drizzle';

export const runtime = 'nodejs';

// The whole API. src/app/api/[[...route]]/route.ts serves it through Next.js, and
// the tests in tests/ call it directly.
const app = new Hono().basePath('/api');

// For uptime monitoring and the container health check: is the app up and can
// it reach the database?
app.get('/health', async (c) => {
  try {
    await db.execute(sql`select 1`);
    return c.json({ ok: true });
  } catch {
    return c.json({ ok: false }, 503);
  }
});

// Better Auth handles sign-up, sign-in, sign-out and sessions under /api/auth
app.on(['GET', 'POST'], '/auth/*', (c) => auth.handler(c.req.raw));

const routes = app
  .route('/plaid', plaid)
  .route('/summary', summary)
  .route('/accounts', accounts)
  .route('/categories', categories)
  .route('/transactions', transactions);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
