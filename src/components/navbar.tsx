'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/navbar.module.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // State for mobile sub-menu toggle
  const [isMobileImpactOpen, setIsMobileImpactOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => {
    setIsOpen(false);
    setIsMobileImpactOpen(false); // Reset mobile sub-menu
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.navContainer}`}>
        
        {/* LOGO */}
        <Link href="/" className={styles.logo} onClick={closeMenu}>
          <Image 
            src="/logo.png" 
            alt="Ikemba Group Logo" 
            width={110} 
            height={45} 
            priority
            className={styles.logoImage}
            style={{ width: 'auto', height: 'auto' }}
          />
        </Link>

        {/* DESKTOP NAV */}
        <nav className={styles.nav}>
          <Link href="/about" className={styles.link}>About</Link>
          <Link href="/leadership" className={styles.link}>Leadership</Link>
          <Link href="/services" className={styles.link}>Services</Link>
          <Link href="/portfolio" className={styles.link}>Portfolio</Link>

          {/* MEGA MENU: CSR */}
          <div className={styles.megaMenuWrapper}>
            <button className={`${styles.link} ${styles.megaMenuTrigger}`}>
              CSR & Impact
              <svg className={styles.chevron} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            <div className={styles.megaMenuDropdown}>
              <div className={styles.megaMenuContent}>
                <span className={styles.megaMenuLabel}>Corporate Social Responsibility</span>

                <Link href="/impact" className={styles.megaMenuItem}>
                  <div>
                    <span className={styles.menuTitle}>Community & Impact</span>
                    <span className={styles.menuDesc}>Our commitment to sustainability.</span>
                  </div>
                </Link>

                <Link href="/fellowship" className={styles.megaMenuItem}>
                  <div>
                    <span className={styles.menuTitle}>Ikemba Fellowship</span>
                    <span className={styles.menuDesc}>Empowering the next generation.</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <Link href="/news" className={styles.link}>News</Link>
          <Link href="/careers" className={styles.link}>Careers</Link>
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
            <Link href="/about" className={styles.mobileLink} onClick={closeMenu}>About</Link>
            <Link href="/leadership" className={styles.mobileLink} onClick={closeMenu}>Leadership</Link>
            <Link href="/services" className={styles.mobileLink} onClick={closeMenu}>Services</Link>
            <Link href="/portfolio" className={styles.mobileLink} onClick={closeMenu}>Portfolio</Link>

            {/* MOBILE DROPDOWN */}
            <div className={styles.mobileSubGroup}>
              <button
                className={styles.mobileLink} 
                onClick={() => setIsMobileImpactOpen(!isMobileImpactOpen)}
                style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
              >
                CSR & Impact
                <span style={{ transform: isMobileImpactOpen ? 'rotate(180deg)' : 'rotate(0)' }}>▼</span>
              </button>

              {isMobileImpactOpen && (
                <div className={styles.mobileSubLinks}>
                  <Link href="/impact" className={styles.mobileSubLink} onClick={closeMenu}>
                    Community & Impact
                  </Link>
                  <Link href="/fellowship" className={styles.mobileSubLink} onClick={closeMenu}>
                    Ikemba Fellowship
                  </Link>
                </div>
              )}
            </div>

            <Link href="/news" className={styles.mobileLink} onClick={closeMenu}>News</Link>
            <Link href="/careers" className={styles.mobileLink} onClick={closeMenu}>Careers</Link>
          </div>
          <Link href="/contact" className={styles.mobileCta} onClick={closeMenu}>
            Partner With Us
          </Link>
        </div>

      </div>
    </header>
  );
}