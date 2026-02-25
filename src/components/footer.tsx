import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      {/* NO MORE SEPARATE STRIP - Everything is merged into one cohesive grid */}
      <div className={`container ${styles.container}`}>
        
        {/* 1. BRAND & MISSION (With Logo Fix) */}
        <div className={styles.brandSide}>
          <Link href="/" className={styles.logoLink}>
            {/* The white background pad to make the dark blue logo pop */}
            <div className={styles.logoBg}>
              <Image
                src="/logo.png"
                alt="Ikemba Group Logo"
                width={160}
                height={50}
                style={{ width: 'auto', height: 'auto' }}
                priority
              />
            </div>
          </Link>
          <p className={styles.missionSnippet}>
            A Pan-African firm redefining the African built environment through
            strategic development and world-class architecture.
          </p>
          <div className={styles.socials}>
            <a href="https://www.linkedin.com/company/ikemba-investment-group" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>LinkedIn</a>
            <a href="https://www.instagram.com/ikembagroup/profilecard/?igsh=aHA4cGw1NXl3aGZ5" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>Instagram</a>
          </div>
        </div>

        {/* 2. QUICK LINKS */}
        <div className={styles.linksSide}>
          <h4 className={styles.columnTitle}>Company</h4>
          <nav className={styles.footerNav}>
            <Link href="/about">About Us</Link>
            <Link href="/leadership">Leadership</Link>
            <Link href="/services">Our Services</Link>
            <Link href="/portfolio">Portfolio</Link>
            <Link href="/news">News</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>

        {/* 3. GLOBAL OFFICES */}
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
              <strong>Delaware, USA</strong>
              <p>Wilmington</p>
            </div>
          </div>
        </div>

        {/* 4. STRATEGIC PARTNERS (Merged into the footer layout) */}
        <div className={styles.partnersSide}>
          <h4 className={styles.columnTitle}>Strategic Partners</h4>
          <div className={styles.partnerList}>

            <a href="https://www.saraivaeassociados.com/" target="_blank" rel="noopener noreferrer" className={styles.partnerListItem}>
              <div className={styles.smallPartnerLogoWrapper}>
                <Image src="/sa.png" alt="Saraiva + Associados" fill className={styles.smallPartnerLogo} />
              </div>
              <div className={styles.partnerText}>
                <span className={styles.partnerName}>Saraiva + Associados</span>
                <span className={styles.partnerRole}>Architecture</span>
              </div>
            </a>

            <a href="https://buildformltd.com/" target="_blank" rel="noopener noreferrer" className={styles.partnerListItem}>
              <div className={styles.smallPartnerLogoWrapper}>
                <Image src="/build_form.png" alt="Build Form Ltd." fill className={styles.smallPartnerLogo} />
              </div>
              <div className={styles.partnerText}>
                <span className={styles.partnerName}>Build Form Ltd.</span>
                <span className={styles.partnerRole}>Construction</span>
              </div>
            </a>

            <a href="https://vilalta.studio/" target="_blank" rel="noopener noreferrer" className={styles.partnerListItem}>
              <div className={styles.smallPartnerLogoWrapper}>
                <Image src="/vilalta.jpg" alt="Vilalta Studio" fill className={styles.smallPartnerLogo} />
              </div>
              <div className={styles.partnerText}>
                <span className={styles.partnerName}>Vilalta Studio</span>
                <span className={styles.partnerRole}>Architecture</span>
              </div>
            </a>

          </div>
        </div>

      </div>

      {/* BOTTOM BAR: LEGAL */}
      <div className={styles.bottomBar}>
        <div className={`container ${styles.bottomContainer}`}>
          <Link href={'/admin'} style={{ textDecoration: 'none' }}>
            <p className={styles.copyright}>
              &copy; {currentYear} Ikemba Investment Group. All Rights Reserved.
            </p>
          </Link>
        </div>
      </div>
    </footer>
  );
}