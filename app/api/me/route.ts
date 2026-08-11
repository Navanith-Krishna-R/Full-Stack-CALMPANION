import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from '@/lib/session';

// Returns the currently authenticated user based on the session cookie, or
// 401 if there is none. Never returns passwordHash or any reset-token fields.
export async function GET() {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  // `role` here is for UI purposes only (e.g. showing an "Admin" nav link) —
  // every actual admin-gated page/API independently re-verifies the role
  // server-side via lib/admin.ts rather than trusting this response.
  const user = await prisma.user.findUnique({
    where: { id: session.sub },
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  });

  if (!user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({ user });
}
