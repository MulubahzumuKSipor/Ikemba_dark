import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/partners.module.css';

export default function Partners() {
  return (
    <section className={styles.trustStrip}>
      <div className={`container ${styles.trustContainer}`}>

        {/* Header */}
        <div className={styles.header}>
          <span className={styles.trustLabel}>Global Strategic Partners</span>
          <div className={styles.divider} />
        </div>

        {/* Partners Grid */}
        <div className={styles.partnerGrid}>

          {/* 1. SARAIVA + ASSOCIADOS */}
          <Link
            href="https://www.saraivaeassociados.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.partnerItem}
          >
            <div className={styles.logoWrapper}>
              <Image
                src="/sa.png"
                alt="Saraiva + Associados"
                fill
                className={styles.logoImage}
              />
            </div>
            <div className={styles.infoWrapper}>
              <span className={styles.partnerName}>Saraiva + Associados</span>
              <span className={styles.partnerRole}>Architecture Partner</span>
            </div>
          </Link>

          {/* 2. BUILD FORM LTD */}
          <Link
            href="#" // Add their website url here if available
            className={styles.partnerItem}
          >
            <div className={styles.logoWrapper}>
              <Image
                src="/build_form.png" // Assuming you updated this file with the clear version
                alt="Build Form Ltd."
                fill
                className={styles.logoImage}
              />
            </div>
            <div className={styles.infoWrapper}>
              <span className={styles.partnerName}>Build Form Ltd.</span>
              <span className={styles.partnerRole}>Construction Partner</span>
            </div>
          </Link>

          {/* 3. VILALTA STUDIO */}
          <Link
            href="https://vilalta.studio/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.partnerItem}
          >
            <div className={styles.logoWrapper}>
              {/* Make sure to add vilalta.png to your public folder */}
              <Image
                src="/vilalta.jpg"
                alt="Vilalta Studio"
                fill
                className={styles.logoImage}
              />
            </div>
            <div className={styles.infoWrapper}>
              <span className={styles.partnerName}>Vilalta Studio</span>
              <span className={styles.partnerRole}>Architecture Partner</span>
            </div>
          </Link>

        </div>
      </div>
    </section>
  );
}