// lib/reset-token.ts
//
// Password-reset tokens are random, single-use, and stored only as a hash
// (never the raw value) with an expiry. This is deliberately not a JWT:
// a JWT can't be invalidated after use, so a link could be replayed again
// within its validity window even after the password was already reset.
// A stored, hashed, cleared-on-use token can be.

import { randomBytes, createHash } from 'crypto';

export const RESET_TOKEN_TTL_MS = 15 * 60 * 1000; // 15 minutes

export function generateResetToken(): { raw: string; hash: string; expiresAt: Date } {
  const raw = randomBytes(32).toString('hex');
  return {
    raw,
    hash: hashResetToken(raw),
    expiresAt: new Date(Date.now() + RESET_TOKEN_TTL_MS),
  };
}

export function hashResetToken(raw: string): string {
  return createHash('sha256').update(raw).digest('hex');
}
