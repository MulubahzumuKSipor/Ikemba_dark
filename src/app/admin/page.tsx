import styles from '@/styles/adminDashboard.module.css';
import Link from 'next/link';

// SVG Icons for the feature cards
const Icons = {
  Message: () => <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2-2z" />,
  News: () => <path d="M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1m2 13a2 2 0 0 1-2-2V7m2 13a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />,
  Users: () => <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M16 3.13a4 4 0 0 1 0 7.75M23 21v-2a4 4 0 0 0-3-3.87" />,
  Briefcase: () => <path d="M20 7h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2z" />
};

export default function AdminDashboard() {
  return (
    <div className={styles.container}>

      {/* 1. WELCOME BANNER */}
      <div className={styles.welcomeBanner}>
        <h1 className={styles.welcomeTitle}>
          Welcome to <span className={styles.gold}>Ikemba Command</span>
        </h1>
        <p className={styles.welcomeText}>
          Select a module from the left sidebar or the cards below to manage operations.
          This system is restricted to authorized personnel.
        </p>
      </div>

      {/* 2. FEATURE LAUNCHPAD */}
      <div className={styles.grid}>

        {/* Module: Messages */}
        <div className={styles.card}>
          <Link href="/admin/leads" className={styles.cardLink}>
            <div className={styles.iconWrapper}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.icon}>
                <Icons.Message />
              </svg>
            </div>
            <h3 className={styles.cardTitle}>Client Communications</h3>
            <p className={styles.cardText}>
              Review inquiries from investors, homeowners, and institutions.
            </p>
            <span className={styles.shortcut}>Go to Messages →</span>
          </Link>
        </div>

        {/* Module: News */}
        <div className={styles.card}>
          <Link href="/admin/news" className={styles.cardLink}>
            <div className={styles.iconWrapper}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.icon}>
                <Icons.News />
              </svg>
            </div>
            <h3 className={styles.cardTitle}>Market Intelligence</h3>
            <p className={styles.cardText}>
              Publish press releases, project updates, and industry insights.
            </p>
            <span className={styles.shortcut}>Manage News →</span>
          </Link>
        </div>

        {/* Module: Careers */}
        <div className={styles.card}>
          <Link href="/admin/careers" className={styles.cardLink}>
            <div className={styles.iconWrapper}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.icon}>
                <Icons.Briefcase />
              </svg>
            </div>
            <h3 className={styles.cardTitle}>Talent Acquisition</h3>
            <p className={styles.cardText}>
              Post new job openings and manage recruitment status.
            </p>
            <span className={styles.shortcut}>Manage Careers →</span>
        </Link>
        </div>

        {/* Module: Team */}
        <div className={styles.card}>
          <Link href="/admin/team" className={styles.cardLink}>
            <div className={styles.iconWrapper}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.icon}>
                <Icons.Users />
              </svg>
            </div>
            <h3 className={styles.cardTitle}>Team Access</h3>
          <p className={styles.cardText}>
            Control staff roles, permissions, and system access levels.
          </p>
          <span className={styles.shortcut}>Manage Users →</span>
        </Link>
        </div>

      </div>

      {/* 3. SYSTEM STATUS FOOTER */}
      <div className={styles.statusFooter}>
        <div className={styles.statusItem}>
          <span className={styles.statusDot}></span>
          System Status: <span className={styles.statusValue}>Operational</span>
        </div>
        <div className={styles.statusItem}>
          Secure Connection: <span className={styles.statusValue}>Encrypted (TLS 1.3)</span>
        </div>
      </div>

    </div>
  );
}