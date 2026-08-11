// lib/session.ts
//
// Server-verifiable session handling. Replaces the old approach of trusting
// whatever `userEmail` a client stored in localStorage. A session is now a
// signed JWT stored in an httpOnly cookie, so it cannot be read or forged by
// client-side JavaScript, and every API route derives "who is calling" from
// this cookie rather than from request bodies.

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export const SESSION_COOKIE_NAME = 'calmpanion_session';
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

export interface SessionPayload {
  sub: string; // user id
  email: string;
  name: string;
}

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    // Intentionally no fallback secret. A missing JWT_SECRET must fail loudly
    // rather than silently signing tokens with a guessable default.
    throw new Error('JWT_SECRET environment variable is not set');
  }
  return secret;
}

export function createSessionToken(payload: SessionPayload): string {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: SESSION_MAX_AGE_SECONDS });
}

/** Attach a signed session cookie to an outgoing response (login/register). */
export function attachSessionCookie(response: NextResponse, payload: SessionPayload): NextResponse {
  const token = createSessionToken(payload);
  response.cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
  return response;
}

/** Remove the session cookie (logout). */
export function clearSessionCookie(response: NextResponse): NextResponse {
  response.cookies.set(SESSION_COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
  return response;
}

/** Read and verify the session cookie for the current request (Route Handlers). */
export async function getServerSession(): Promise<SessionPayload | null> {
  const token = cookies().get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    return jwt.verify(token, getJwtSecret()) as SessionPayload;
  } catch {
    return null;
  }
}
