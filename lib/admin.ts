// lib/admin.ts
//
// Server-side admin authorization. Deliberately does NOT trust a `role`
// claim baked into the session JWT at login time — if an admin were ever
// demoted (or a user promoted) after their session was issued, a JWT-embedded
// role would keep granting/denying access based on stale data until the
// cookie expired. Instead this re-reads the user's current role from the
// database on every check, at the cost of one extra query, in exchange for
// the role always being correct.
//
// This is the single choke point every admin page and every /api/admin/*
// route must call — never re-implement an inline "is this user an admin"
// check elsewhere.

import { prisma } from '@/lib/prisma';
import { getServerSession } from '@/lib/session';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
}

/**
 * Returns the current session's user if — and only if — they are a verified
 * admin in the database right now. Returns null for: no session, session
 * for a user that no longer exists, or a session for a non-admin user.
 */
export async function getAdminSession(): Promise<AdminUser | null> {
  const session = await getServerSession();
  if (!session) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.sub },
    select: { id: true, name: true, email: true, role: true },
  });

  if (!user || user.role !== 'ADMIN') return null;

  return { id: user.id, name: user.name, email: user.email };
}
