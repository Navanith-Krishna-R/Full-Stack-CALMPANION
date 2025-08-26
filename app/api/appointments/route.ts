import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Validate incoming appointment data
const AppointmentSchema = z.object({
  userEmail: z.string().email(),
  date: z.string(),      // ISO date string
  time: z.string(),      // e.g., "09:00 AM"
  type: z.string(),      // appointment type id
  notes: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = AppointmentSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ message: 'Invalid input' }, { status: 400 });
    }

    const { userEmail, date, time, type, notes } = parsed.data;

    // Find user by email
    const user = await prisma.user.findUnique({ where: { email: userEmail } });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Create appointment
    const appointment = await prisma.appointment.create({
      data: {
        userId: user.id,
        date: new Date(date),
        time,
        type,
        notes,
      },
    });

    return NextResponse.json({ message: 'Appointment booked successfully', appointment }, { status: 200 });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
