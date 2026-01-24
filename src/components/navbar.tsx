'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/navbar.module.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Helper to close menu when a link is clicked
  const closeMenu = () => setIsOpen(false);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.navContainer}`}>
        
        {/* LOGO */}
        <Link href="/" className={styles.logo} onClick={closeMenu}>
          <Image 
            src="/logo.png" 
            alt="Ikemba Group Logo" 
            width={100} 
            height={50} 
            priority
            style={{ width: 'auto', height: 'auto' }}
          />
        </Link>

        {/* DESKTOP NAVIGATION (Hidden on mobile via CSS) */}
        <nav className={styles.nav}>
          <Link href="/about" className={styles.link}>About</Link>
          <Link href="/leadership" className={styles.link}>Leadership</Link>
          <Link href="/services" className={styles.link}>Services</Link>
          <Link href="/portfolio" className={styles.link}>Portfolio</Link>
          <Link href="/news" className={styles.link}>News</Link>
          <Link href="/careers" className={styles.link}>Careers</Link>
        </nav>

        {/* DESKTOP CTA (Hidden on mobile via CSS) */}
        <Link href="/contact" className={styles.ctaButton}>
          Partner With Us
        </Link>

        {/* HAMBURGER BUTTON (Visible on mobile via CSS) */}
        <button 
          className={`${styles.hamburger} ${isOpen ? styles.open : ''}`} 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
        </button>

        {/* MOBILE MENU OVERLAY */}
        <div className={`${styles.mobileMenu} ${isOpen ? styles.open : ''}`}>
          <Link href="/about" className={styles.mobileLink} onClick={closeMenu}>About</Link>
          <Link href="/leadership" className={styles.mobileLink} onClick={closeMenu}>Leadership</Link>
          <Link href="/services" className={styles.mobileLink} onClick={closeMenu}>Services</Link>
          <Link href="/portfolio" className={styles.mobileLink} onClick={closeMenu}>Portfolio</Link>
          <Link href="/news" className={styles.mobileLink} onClick={closeMenu}>News</Link>
          <Link href="/careers" className={styles.mobileLink} onClick={closeMenu}>Careers</Link>
          <Link href="/contact" className={styles.ctaButton} onClick={closeMenu}>
            Partner With Us
          </Link>
        </div>

      </div>
    </header>
  );
}