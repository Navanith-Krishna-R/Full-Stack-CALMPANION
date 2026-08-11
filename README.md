# CALMPANION 🧘

*A calmer space for your mental wellbeing.*

👤 **Portfolio:** https://portfolio-bim74nzsl-navanith-krishna-rs-projects.vercel.app/

---

## Overview

CALMPANION is a full-stack mental wellness platform: self-assessments, professional appointment
booking, a community blog, and educational resources, held together by a real (not decorative)
authentication and authorization layer. It's built on Next.js (App Router) with MongoDB Atlas via
Prisma.

## Features

- 🔐 **Real authentication** — bcrypt-hashed passwords, httpOnly signed session cookies, no
  client-trusted identity. Register, login, logout, session verification, and a token-based
  (single-use, hashed, expiring) password reset flow.
- 🩺 **Appointments** — a guided, step-based booking flow. The server derives the booking user from
  the session; appointments are only ever readable by their owner. Every booking starts `PENDING`
  and moves to `ACCEPTED`/`REJECTED` only through an admin decision — never self-service.
- 🛡️ **Admin dashboard** (`/admin`) — role-gated appointment triage: filter by status, accept or
  reject pending requests (with a confirmation step before rejecting), see live counts. Protected
  server-side on both the page and its APIs — see [Admin Access](#admin-access) below.
- 📝 **Blog** — database-backed posts (create, list, read), authored by logged-in users.
- 🧠 **Self-assessment** — a lightweight, informational-only screener with real scoring, clearly
  labeled as not a medical diagnosis, with history stored per user.
- 👩‍⚕️ **Doctors directory**, **donation flow**, and static resource pages (about, docs, terms,
  privacy, cookies).
- 🎨 **Design system** — a calm, nature-inspired sage/forest palette, Fraunces + Inter typography,
  and one signature WebGL scene (a floating zen garden) in the homepage hero — lazy-loaded,
  WebGL-gated, and disabled under `prefers-reduced-motion`.

## Tech Stack

**Frontend:** Next.js 13 (App Router), React 18, Tailwind CSS, shadcn/ui (Radix primitives),
`@react-three/fiber` + `three` for the hero scene.

**Backend:** Next.js Route Handlers, Prisma ORM.

**Database:** MongoDB Atlas.

**Auth:** bcrypt password hashing + signed JWT session cookie (httpOnly, sameSite=lax). No
third-party auth provider.

**Email:** nodemailer (Gmail transport) for password-reset links; falls back to logging the link
server-side when email credentials aren't configured, so the flow stays testable in local dev.

**Deployment:** Vercel.

## Architecture

```
app/
  api/                  Route Handlers — auth, appointments, blogs, assessments
  <page routes>/         one folder per route, colocated page.tsx
components/
  header.tsx, footer.tsx
  hero/                 the signature 3D scene + its WebGL/reduced-motion gate
  motion/                scroll-reveal helper
  ui/                    shadcn/ui primitives
  admin/
    AdminDashboard.tsx    client component: stats, filters, accept/reject, confirmation modal
context/
  UserContext.tsx        client-side session state, hydrated from /api/me
lib/
  prisma.ts              Prisma client singleton
  session.ts              session cookie sign/verify (no fallback secret)
  admin.ts                server-side admin authorization (DB role check, not JWT-trusted)
  reset-token.ts          hashed, single-use password-reset tokens
  assessment-scoring.ts   self-assessment scoring logic
  auth.ts                 bcrypt hash/verify helpers
prisma/
  schema.prisma           MongoDB datasource + models (User.role, Appointment.status enums)
scripts/
  make-admin.js           the only way to create an admin — see Admin Access below
```

**Session model:** login/register set an httpOnly JWT cookie. Every API route that needs to know
"who is calling" reads that cookie server-side (`getServerSession()`) — nothing is inferred from a
request body or from `localStorage`. `context/UserContext.tsx` mirrors the server session for the
UI by calling `/api/me`, and calls `/api/logout` to clear it.

**Role model:** `User.role` is `USER` or `ADMIN` (Prisma enum), defaulting to `USER` and never
settable by a client — the registration schema doesn't even accept a `role` field. Every admin
surface (`/admin` page, `/api/admin/*` routes) calls `getAdminSession()`, which re-reads the role
from the database on every request rather than trusting a claim embedded in the session JWT — so a
promotion/demotion takes effect immediately, and a stale token can never grant stale privileges.

## Database (MongoDB Atlas)

1. Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas).
2. Create a database user and get its connection string.
3. Put it in `.env` as `DATABASE_URL`, including a database name, e.g.:
   ```
   DATABASE_URL="mongodb+srv://<user>:<password>@<cluster>.mongodb.net/calmpanion?retryWrites=true&w=majority"
   ```
4. Push the schema (MongoDB uses `db push`, not relational migrations):
   ```bash
   npx prisma db push
   ```

## Environment Variables

Copy `.env.example` to `.env` and fill in real values. Nothing here has a hardcoded fallback in
code — a missing `JWT_SECRET` fails loudly rather than silently signing with a default.

| Variable | Required | Purpose |
|---|---|---|
| `DATABASE_URL` | Yes | MongoDB Atlas connection string |
| `JWT_SECRET` | Yes | Signs session cookies. Generate with `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"` |
| `NEXT_PUBLIC_BASE_URL` | Yes | Used to build links in password-reset emails |
| `EMAIL_USER` / `EMAIL_PASS` | No | Gmail credentials for sending real reset emails. Without these, reset links are logged to the server console instead (dev-only fallback) |

## Local Development

```bash
git clone https://github.com/Navanith-Krishna-R/Full-Stack-CALMPANION.git
cd Full-Stack-CALMPANION
npm install
cp .env.example .env   # then fill in DATABASE_URL, JWT_SECRET, etc.
npx prisma generate
npx prisma db push
npm run dev
```

Other useful commands:

```bash
npx prisma studio       # browse the database
npx prisma validate     # check schema.prisma
npm run lint            # ESLint
npx tsc --noEmit        # type check
npm run build            # production build
```

## API Routes

| Method | Route | Auth | Purpose |
|---|---|---|---|
| POST | `/api/register` | — | Create an account, sets session cookie |
| POST | `/api/login` | — | Authenticate, sets session cookie |
| POST | `/api/logout` | session | Clears session cookie |
| GET | `/api/me` | session | Current authenticated user |
| POST | `/api/forgot-password` | — | Request a reset link (always returns a generic response) |
| POST | `/api/reset-password/[token]` | — | Complete a password reset with a valid token |
| GET / POST | `/api/appointments` | session | List / book the caller's own appointments |
| GET / POST | `/api/blogs` | GET public, POST session | List published posts / publish a post |
| GET | `/api/blogs/[id]` | — | Read a single published post |
| GET / POST | `/api/assessments` | session | List / submit the caller's own assessment results |
| GET | `/api/admin/appointments` | admin | List every appointment (optional `?status=` filter) |
| PATCH | `/api/admin/appointments/[id]` | admin | Accept or reject a specific appointment |

## Admin Access

There is no "register as admin" option anywhere — public registration always creates a `USER`.
The only way to create an admin is to run the bootstrap script directly against the database, after
the person has registered a normal account:

```bash
npm run make-admin -- someone@example.com
```

This requires access to this codebase and `DATABASE_URL`, which is the intended bar — it's not
reachable over HTTP. Once run, the promotion is effective immediately (no re-login needed) because
admin checks always re-read the role from the database rather than trusting the session token.

Visit `/admin` while logged in as that user to manage appointment requests: filter by status, and
accept or reject pending ones (rejecting asks for confirmation first — never a browser `confirm()`).

## Deployment (Vercel)

1. Push the repository to GitHub.
2. Import it into Vercel.
3. Add the environment variables above in the Vercel project settings.
4. Deploy. Vercel runs `prisma generate` automatically as part of the build; run
   `npx prisma db push` once against your production `DATABASE_URL` (locally or via a one-off
   script) before the first deploy so the collections/indexes exist.

## Security Notes

- Passwords are hashed with bcrypt (cost factor 12) and never returned to the client.
- Sessions are httpOnly, signed JWTs — inaccessible to client-side JavaScript, unlike the
  `localStorage`-based approach this project used previously.
- Password-reset tokens are random, hashed before storage, single-use (cleared on redemption), and
  expire after 15 minutes. The forgot-password endpoint always returns the same message regardless
  of whether the email exists, to avoid account enumeration.
- Every API route that touches user-owned data derives the user from the verified session, never
  from a client-supplied ID or email.
- No secrets have hardcoded fallbacks; a misconfigured deployment fails instead of running insecurely.
- Admin access is a database role, checked server-side on every request (`lib/admin.ts`) for both
  the `/admin` page and every `/api/admin/*` route — never inferred from `localStorage`, a hidden
  UI element, or a client-supplied `role`/`admin` field. Verified directly: a non-admin session gets
  403 from the admin APIs and is redirected off `/admin`, even when calling the API for their own
  appointment.
- The appointment-status update endpoint only accepts `ACCEPTED` or `REJECTED` via a strict enum —
  arbitrary status strings are rejected with 400, not silently coerced.

**Navanith Krishna R**
🔗 Portfolio: https://portfolio-bim74nzsl-navanith-krishna-rs-projects.vercel.app/
💻 GitHub: https://github.com/Navanith-Krishna-R
