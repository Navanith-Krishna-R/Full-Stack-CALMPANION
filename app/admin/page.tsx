import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/admin';
import Header from '@/components/header';
import Footer from '@/components/footer';
import AdminDashboard from '@/components/admin/AdminDashboard';

// This check runs on the server for every request to /admin — a signed-out
// visitor or a logged-in non-admin user gets redirected before any admin
// markup or data ever reaches the client. Hiding an "Admin" nav link is a
// UX nicety elsewhere in the app, never the actual gate.
export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const admin = await getAdminSession();

  if (!admin) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <AdminDashboard adminName={admin.name} />
      </main>
      <Footer />
    </div>
  );
}
