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

  // Close sidebar automatically when navigating to a new page (mobile UX)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  return (
    <div className={styles.layoutContainer}>

      {/* MOBILE OVERLAY (Darkens background when menu is open) */}
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

        {/* Mobile Menu Toggle Button */}
        <div className={styles.mobileHeaderBar}>
           <button
             className={styles.hamburgerBtn}
             onClick={() => setIsSidebarOpen(!isSidebarOpen)}
             aria-label="Toggle Menu"
           >
             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
               <path d="M4 6h16M4 12h16M4 18h16" />
             </svg>
           </button>
           <span className={styles.mobileBrand}>IKEMBA <span className={styles.gold}>ADMIN</span></span>
        </div>

        {/* Desktop Header (Hidden on Mobile usually, or adapted) */}
        <div className={styles.desktopHeaderWrapper}>
           {header}
        </div>

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