import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/admin';

const VALID_STATUSES = ['PENDING', 'ACCEPTED', 'REJECTED'] as const;

// Admin-only: list every appointment across all users, optionally filtered
// by status. A normal (non-admin) session gets a 403 here regardless of
// what the client sends — authorization is entirely server-side.
export async function GET(req: Request) {
  const admin = await getAdminSession();
  if (!admin) {
    return NextResponse.json({ message: 'Admin access required' }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const statusParam = searchParams.get('status');

  if (statusParam && !VALID_STATUSES.includes(statusParam as (typeof VALID_STATUSES)[number])) {
    return NextResponse.json({ message: 'Invalid status filter' }, { status: 400 });
  }

  const appointments = await prisma.appointment.findMany({
    where: statusParam ? { status: statusParam as (typeof VALID_STATUSES)[number] } : undefined,
    orderBy: { createdAt: 'desc' },
    include: { user: { select: { name: true, email: true } } },
  });

  return NextResponse.json({ appointments });
}
