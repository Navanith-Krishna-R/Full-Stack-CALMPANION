import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { getAdminSession } from '@/lib/admin';

const OBJECT_ID_RE = /^[a-f\d]{24}$/i;

// Admin action only — accept or reject a pending request. Deliberately does
// NOT accept 'PENDING' as a target status: that's the system default on
// creation, not something an admin "sets" via this action endpoint.
const UpdateStatusSchema = z.object({
  status: z.enum(['ACCEPTED', 'REJECTED']),
});

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const admin = await getAdminSession();
  if (!admin) {
    return NextResponse.json({ message: 'Admin access required' }, { status: 403 });
  }

  if (!OBJECT_ID_RE.test(params.id)) {
    return NextResponse.json({ message: 'Invalid appointment id' }, { status: 400 });
  }

  const body = await req.json().catch(() => null);
  const parsed = UpdateStatusSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { message: parsed.error.issues[0]?.message ?? 'A valid status (ACCEPTED or REJECTED) is required' },
      { status: 400 }
    );
  }

  const existing = await prisma.appointment.findUnique({ where: { id: params.id } });
  if (!existing) {
    return NextResponse.json({ message: 'Appointment not found' }, { status: 404 });
  }

  const appointment = await prisma.appointment.update({
    where: { id: params.id },
    data: { status: parsed.data.status },
    include: { user: { select: { name: true, email: true } } },
  });

  return NextResponse.json({ message: `Appointment ${parsed.data.status.toLowerCase()}`, appointment });
}

// Admin action only — permanently removes an appointment record. Deliberately
// restricted to REJECTED appointments: pending requests still need a
// decision, and accepted ones are a real commitment to a patient, so neither
// should be reachable through a delete button. This is a data-cleanup tool
// for closed-out rejections, not a general-purpose delete.
export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const admin = await getAdminSession();
  if (!admin) {
    return NextResponse.json({ message: 'Admin access required' }, { status: 403 });
  }

  if (!OBJECT_ID_RE.test(params.id)) {
    return NextResponse.json({ message: 'Invalid appointment id' }, { status: 400 });
  }

  const existing = await prisma.appointment.findUnique({ where: { id: params.id } });
  if (!existing) {
    return NextResponse.json({ message: 'Appointment not found' }, { status: 404 });
  }

  if (existing.status !== 'REJECTED') {
    return NextResponse.json(
      { message: 'Only rejected appointments can be deleted' },
      { status: 409 }
    );
  }

  await prisma.appointment.delete({ where: { id: params.id } });

  return NextResponse.json({ message: 'Appointment deleted' });
}
