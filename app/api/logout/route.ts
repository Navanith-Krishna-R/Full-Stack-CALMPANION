import { NextResponse } from 'next/server';
import { clearSessionCookie } from '@/lib/session';

export async function POST() {
  const response = NextResponse.json({ message: 'Logged out' }, { status: 200 });
  return clearSessionCookie(response);
}
