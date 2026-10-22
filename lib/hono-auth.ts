import { Context } from 'hono';
import { createMiddleware } from 'hono/factory';

import { auth } from '@/lib/auth';

declare module 'hono' {
  interface ContextVariableMap {
    userId: string | null;
  }
}

export const authMiddleware = () =>
  createMiddleware(async (c, next) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });
    c.set('userId', session?.user.id ?? null);
    await next();
  });

export const getAuth = (c: Context) => ({ userId: c.get('userId') });
