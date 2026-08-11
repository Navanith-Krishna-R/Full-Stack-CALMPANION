import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { attachSessionCookie } from '@/lib/session';

const RegisterSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = RegisterSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.issues[0]?.message ?? 'Invalid input' },
        { status: 400 }
      );
    }

    const { name, email, password } = parsed.data;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: 'An account with this email already exists' }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: { name, email, passwordHash },
    });

    const response = NextResponse.json(
      { message: 'Account created', user: { id: user.id, name: user.name, email: user.email } },
      { status: 201 }
    );

    return attachSessionCookie(response, { sub: user.id, email: user.email, name: user.name });
  } catch (err) {
    console.error('register error:', err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
