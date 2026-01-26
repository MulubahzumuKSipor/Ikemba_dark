'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import styles from '@/styles/adminLayout.module.css';

interface AdminLayoutClientProps {
  sidebar: React.ReactNode;
  header: React.ReactNode;
  children: React.ReactNode;
  footer: React.ReactNode;
}

export default function AdminLayoutClient({ sidebar, header, children, footer }: AdminLayoutClientProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  // FIX: This pattern prevents the "synchronous setState" error.
  // We check the previous state value inside the setter function.
  useEffect(() => {
    setIsSidebarOpen((prev) => (prev ? false : prev));
  }, [pathname]);

  return (
    <div className={styles.layoutContainer}>

      {/* MOBILE OVERLAY */}
      <div
        className={`${styles.mobileOverlay} ${isSidebarOpen ? styles.overlayVisible : ''}`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* SIDEBAR AREA */}
      <aside className={`${styles.sidebarArea} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarContent}>
          {sidebar}
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className={styles.mainArea}>

        {/* MOBILE HEADER (Hamburger Menu) */}
        <div className={styles.mobileHeaderBar}>
           <button
             className={styles.hamburgerBtn}
             onClick={() => setIsSidebarOpen((prev) => !prev)}
             aria-label="Toggle Menu"
           >
             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
               <path d="M4 6h16M4 12h16M4 18h16" />
             </svg>
           </button>
           <span className={styles.mobileBrand}>IKEMBA <span className={styles.gold}>ADMIN</span></span>
        </div>

        {/* DESKTOP HEADER */}
        <div className={styles.desktopHeaderWrapper}>
           {header}
        </div>

        {/* PAGE CONTENT */}
        <main className={styles.contentScrollable}>
          <div className={styles.contentWrapper}>
            {children}
          </div>
          {footer}
        </main>
      </div>
    </div>
  );
}