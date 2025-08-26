import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';
import { hashPassword } from '@/lib/auth';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

export async function POST(req: Request, { params }: { params: { token: string } }) {
  try {
    const { password } = await req.json();
    const { token } = params;

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    const hashedPassword = await hashPassword(password);
    await prisma.user.update({
      where: { id: decoded.userId },
      data: { passwordHash: hashedPassword },
    });

    return NextResponse.json({ message: 'Password updated successfully ✅' });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Invalid or expired token' }, { status: 400 });
  }
}
