import Link from 'next/link';
import { createClient } from '@/lib/server';
import { redirect } from 'next/navigation';
import styles from '@/styles/adminComponents.module.css';

export default function AdminSidebar({ role }: { role: string }) {

  // Inline Server Action for Logout
  const signOut = async () => {
    'use server';
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect('/login');
  };

  return (
    <div className={styles.sidebar}>

      {/* Brand Logo */}
      <div className={styles.brand}>
        IKEMBA <span className={styles.gold}>ADMIN</span>
      </div>

      {/* Navigation Links */}
      <nav className={styles.nav}>
        <Link href="/admin" className={styles.navLink}>
          Dashboard
        </Link>
        <Link href="/admin/leads" className={styles.navLink}>
          Messages
        </Link>
        <Link href="/admin/news" className={styles.navLink}>
          News
        </Link>
        <Link href="/admin/careers" className={styles.navLink}>
          Careers
        </Link>
        {(role === 'super_admin' || role === 'admin') && (
          <Link href="/admin/team" className={styles.navLink}>
            Team Access
          </Link>
        )}
      </nav>

      {/* Logout Button (Pinned to Bottom) */}
      <div className={styles.logoutArea}>
        <form action={signOut}>
          <button type="submit" className={styles.logoutButton}>
            Sign Out
          </button>
        </form>
      </div>

    </div>
  );
}