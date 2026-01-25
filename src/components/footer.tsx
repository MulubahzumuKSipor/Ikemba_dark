import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        
        {/* BRAND & MISSION */}
        <div className={styles.brandSide}>
          <Link href="/" className={styles.logo}>
            <Image 
              src="/logo.png" 
              alt="Ikemba Group Logo" 
              width={180} 
              height={60} 
              style={{ width: 'auto', height: 'auto' }}
            />
          </Link>
          <p className={styles.missionSnippet}>
            A Pan-African firm redefining the built environment through 
            strategic development and world-class architecture.
          </p>
          <div className={styles.socials}>
            <a href="#" className={styles.socialLink}>LinkedIn</a>
            <a href="#" className={styles.socialLink}>Instagram</a>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div className={styles.linksSide}>
          <h4 className={styles.columnTitle}>Company</h4>
          <nav className={styles.footerNav}>
            <Link href="/about">About Us</Link>
            <Link href="/leadership">Leadership</Link>
            <Link href="/services">Our Services</Link>
            <Link href="/portfolio">Portfolio</Link>
            <Link href="/news">News</Link>
            <Link href="/careers">Careers</Link>
          </nav>
        </div>

        {/* GLOBAL OFFICES */}
        <div className={styles.officesSide}>
          <h4 className={styles.columnTitle}>Global Presence</h4>
          <div className={styles.officeGrid}>
            <div className={styles.officeItem}>
              <strong>Monrovia, Liberia</strong>
              <p>Tubman Blvd</p>
            </div>
            <div className={styles.officeItem}>
              <strong>Accra, Ghana</strong>
              <p>East Legon</p>
            </div>
            <div className={styles.officeItem}>
              <strong>United States</strong>
              <p>Philadelphia, PA</p>
            </div>
          </div>
        </div>

      </div>

      {/* BOTTOM BAR: LEGAL & PARTNERS */}
      <div className={styles.bottomBar}>
        <div className={`container ${styles.bottomContainer}`}>
          <Link href={'/admin'}>
            <p className={styles.copyright}>
              &copy; {currentYear} Ikemba Investment Group. All Rights Reserved.
            </p>
          </Link>
          <div className={styles.partnerLogos}>
            <span>Partnered with:</span>
            <strong>Tri Buchanan</strong>
            <span className={styles.divider}>|</span>
            <strong>Gateway Realty</strong>
            <span className={styles.divider}>|</span>
            <strong>Kanree Global</strong>
          </div>
        </div>
      </div>
    </footer>
  );
}