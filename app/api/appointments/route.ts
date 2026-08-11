import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { getServerSession } from '@/lib/session';

// Note: the user is always taken from the server-verified session, never
// from the request body — a client can no longer book (or read) appointments
// on behalf of another user's email address.
const AppointmentSchema = z.object({
  date: z.string().refine((v) => !Number.isNaN(Date.parse(v)), 'Invalid date'),
  time: z.string().min(1, 'Time is required'),
  type: z.string().min(1, 'Appointment type is required'),
  notes: z.string().max(2000).optional(),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ message: 'Please log in to book an appointment' }, { status: 401 });
    }

    const body = await req.json();
    const parsed = AppointmentSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.issues[0]?.message ?? 'Invalid input' },
        { status: 400 }
      );
    }

    const { date, time, type, notes } = parsed.data;

    const parsedDate = new Date(date);
    if (parsedDate.getTime() < Date.now() - 24 * 60 * 60 * 1000) {
      return NextResponse.json({ message: 'Appointment date cannot be in the past' }, { status: 400 });
    }

    const appointment = await prisma.appointment.create({
      data: {
        userId: session.sub,
        date: parsedDate,
        time,
        type,
        notes,
      },
    });

    return NextResponse.json({ message: 'Appointment booked successfully', appointment }, { status: 201 });
  } catch (err) {
    console.error('appointments POST error:', err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

// Lists only the authenticated caller's own appointments.
export async function GET() {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ message: 'Please log in to view your appointments' }, { status: 401 });
  }

  const appointments = await prisma.appointment.findMany({
    where: { userId: session.sub },
    orderBy: { date: 'asc' },
  });

  return NextResponse.json({ appointments });
}
