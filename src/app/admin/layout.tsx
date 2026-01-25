import { redirect } from 'next/navigation';
import { createClient } from '@/lib/server';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/adminHeader';
import AdminFooter from '@/components/admin/adminFooter';
import styles from '@/styles/adminLayout.module.css';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  // 1. Check User
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  // 2. GET REAL PROFILE (Using the VIP Function)
  // We use .rpc() instead of .from() to bypass any table locks
  const { data: profile } = await supabase
    .rpc('get_my_profile')
    .single();

  if (!profile) redirect('/login');

  return (
    <div className={styles.layoutContainer}>
      <aside className={styles.sidebarArea}>
        <AdminSidebar role={profile.role} />
      </aside>

      <div className={styles.mainArea}>
        <AdminHeader profile={profile} />
        <main className={styles.contentScrollable}>
          <div className={styles.contentWrapper}>
            {children}
          </div>
          <AdminFooter />
        </main>
      </div>
    </div>
  );
}