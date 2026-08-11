import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { hashResetToken } from '@/lib/reset-token';
import { hashPassword } from '@/lib/auth';

const ResetPasswordSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export async function POST(req: Request, { params }: { params: { token: string } }) {
  try {
    const { token } = params;
    if (!token) {
      return NextResponse.json({ message: 'Missing reset token' }, { status: 400 });
    }

    const body = await req.json();
    const parsed = ResetPasswordSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.issues[0]?.message ?? 'Invalid input' },
        { status: 400 }
      );
    }

    const tokenHash = hashResetToken(token);

    const user = await prisma.user.findFirst({
      where: { resetTokenHash: tokenHash },
    });

    if (!user || !user.resetTokenExpiresAt) {
      return NextResponse.json({ message: 'This reset link is invalid. Request a new one.' }, { status: 400 });
    }

    if (user.resetTokenExpiresAt.getTime() < Date.now()) {
      // Clear the stale token so it can never be replayed.
      await prisma.user.update({
        where: { id: user.id },
        data: { resetTokenHash: null, resetTokenExpiresAt: null },
      });
      return NextResponse.json({ message: 'This reset link has expired. Request a new one.' }, { status: 400 });
    }

    const passwordHash = await hashPassword(parsed.data.password);

    await prisma.user.update({
      where: { id: user.id },
      // Clearing the token here makes the link single-use: a second
      // request with the same token will hit the "invalid" branch above.
      data: { passwordHash, resetTokenHash: null, resetTokenExpiresAt: null },
    });

    return NextResponse.json({ message: 'Your password has been updated. You can now log in.' });
  } catch (err) {
    console.error('reset-password error:', err);
    return NextResponse.json({ message: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
