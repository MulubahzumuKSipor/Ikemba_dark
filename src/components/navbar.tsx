'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/navbar.module.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // 1. SCROLL LISTENER
  useEffect(() => {
    const handleScroll = () => {
      // Threshold: 50px triggers the design swap
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.navContainer}`}>
        
        {/* LOGO */}
        <Link href="/" className={styles.logo} onClick={closeMenu}>
          {/* We use the Dark Blue logo by default. CSS handles the color swap on scroll. */}
          <Image 
            src="/logo.png" 
            alt="Ikemba Group Logo" 
            width={110} 
            height={45} 
            priority
            className={styles.logoImage} // Added class for the filter effect
            style={{ width: 'auto', height: 'auto' }}
          />
        </Link>

        {/* DESKTOP NAV */}
        <nav className={styles.nav}>
          {['About', 'Leadership', 'Services', 'Portfolio', 'News', 'Careers'].map((item) => (
            <Link 
              key={item} 
              href={`/${item.toLowerCase()}`} 
              className={styles.link}
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* CTA BUTTON */}
        <div className={styles.ctaWrapper}>
          <Link href="/contact" className={styles.ctaButton}>
            Partner With Us
          </Link>
        </div>

        {/* HAMBURGER */}
        <button 
          className={`${styles.hamburger} ${isOpen ? styles.open : ''}`} 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
        </button>

        {/* MOBILE MENU */}
        <div className={`${styles.mobileMenu} ${isOpen ? styles.open : ''}`}>
          <div className={styles.mobileLinks}>
            {['About', 'Leadership', 'Services', 'Portfolio', 'News', 'Careers'].map((item) => (
              <Link 
                key={item} 
                href={`/${item.toLowerCase()}`} 
                className={styles.mobileLink} 
                onClick={closeMenu}
              >
                {item}
              </Link>
            ))}
          </div>
          <Link href="/contact" className={styles.mobileCta} onClick={closeMenu}>
            Partner With Us
          </Link>
        </div>

      </div>
    </header>
  );
}