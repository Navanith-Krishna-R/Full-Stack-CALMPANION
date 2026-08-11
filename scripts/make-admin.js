// scripts/make-admin.js
//
// The ONLY way to create an admin account. Deliberately not exposed over
// HTTP anywhere in the app — registration always creates USER-role accounts
// (see app/api/register/route.ts), and no API route accepts a client-supplied
// role. Promoting someone to ADMIN requires direct access to this codebase
// and the database connection string, which is the intended bar.
//
// Usage:
//   node scripts/make-admin.js someone@example.com
//   npm run make-admin -- someone@example.com
//
// The user must already have registered a normal account first — this
// script only flips their existing role, it doesn't create accounts.

const { PrismaClient } = require('../lib/generated/prisma');

async function main() {
  const email = process.argv[2];

  if (!email) {
    console.error('Usage: node scripts/make-admin.js <email>');
    process.exit(1);
  }

  const prisma = new PrismaClient();

  try {
    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase().trim() } });

    if (!user) {
      console.error(`No account found for "${email}". Ask them to register first, then run this again.`);
      process.exit(1);
    }

    if (user.role === 'ADMIN') {
      console.log(`${email} is already an admin.`);
      return;
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { role: 'ADMIN' },
    });

    // Admin status is re-checked against the database on every request (see
    // lib/admin.ts) rather than being baked into the session token, so this
    // takes effect immediately — no re-login required.
    console.log(`✔ ${email} is now an admin — takes effect immediately, no re-login needed.`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((err) => {
  console.error('Failed to promote user:', err);
  process.exit(1);
});
