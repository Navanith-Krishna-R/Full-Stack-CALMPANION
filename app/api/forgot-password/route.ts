import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import nodemailer from 'nodemailer';
import { z } from 'zod';
import { generateResetToken } from '@/lib/reset-token';

const ForgotPasswordSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
});

// Always returns the same generic message regardless of whether the email
// exists, so this endpoint can't be used to enumerate registered accounts.
const GENERIC_RESPONSE = { message: 'If an account exists for that email, a reset link has been sent.' };

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = ForgotPasswordSchema.safeParse(body);
    if (!parsed.success) {
      // Still generic — don't reveal validation details tied to enumeration.
      return NextResponse.json(GENERIC_RESPONSE);
    }

    const { email } = parsed.data;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json(GENERIC_RESPONSE);
    }

    const { raw, hash, expiresAt } = generateResetToken();

    await prisma.user.update({
      where: { id: user.id },
      data: { resetTokenHash: hash, resetTokenExpiresAt: expiresAt },
    });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const resetUrl = `${baseUrl}/reset-password/${raw}`;

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Reset your CALMPANION password',
        html: `<p>We received a request to reset your CALMPANION password.</p>
               <p><a href="${resetUrl}">Click here to choose a new password</a>. This link expires in 15 minutes.</p>
               <p>If you didn't request this, you can safely ignore this email.</p>`,
      });
    } else {
      // No email credentials configured (e.g. local dev). Log so the flow is
      // still testable without sending real mail.
      console.warn('EMAIL_USER/EMAIL_PASS not set — password reset link:', resetUrl);
    }

    return NextResponse.json(GENERIC_RESPONSE);
  } catch (err) {
    console.error('forgot-password error:', err);
    // Still generic on unexpected errors, to avoid leaking system state.
    return NextResponse.json(GENERIC_RESPONSE);
  }
}
