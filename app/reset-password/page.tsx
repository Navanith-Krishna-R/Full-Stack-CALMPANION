import Link from 'next/link';
import Header from '@/components/header';
import Footer from '@/components/footer';

// Reached when someone visits /reset-password without a token (e.g. a bookmarked
// or truncated link). Real reset links point to /reset-password/[token].
export default function ResetPasswordMissingToken() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center px-4 py-32">
        <div className="bg-card p-8 rounded-2xl shadow-lg border border-border w-full max-w-md text-center space-y-4">
          <h1 className="text-2xl font-display font-medium">Reset link missing</h1>
          <p className="text-sm text-muted-foreground">
            This link is missing a reset token. Request a new password reset email to continue.
          </p>
          <Link
            href="/forgot-password"
            className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold hover:bg-sage-800 transition"
          >
            Request a new link
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
