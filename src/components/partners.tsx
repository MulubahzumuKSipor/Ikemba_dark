import Image from 'next/image';
import styles from '@/styles/partners.module.css';

export default function Partners() {
  return (
    <section className={styles.trustStrip}>
      <div className={`container ${styles.trustContainer}`}>

        {/* Left Side: Label */}
        <div className={styles.header}>
          <span className={styles.trustLabel}>Global Strategic Partners</span>
          <div className={styles.divider} />
        </div>

        {/* Right Side: Logos */}
        <div className={styles.partnerGrid}>

          {/* PARTNER 1 */}
          <div className={styles.partnerItem}>
            <div className={styles.logoWrapper}>
              <Image
                src="/sa.png"
                alt="Saraiva + Associados"
                fill
                className={styles.logoImage}
              />
            </div>
            <div className={styles.tooltip}>
              <span className={styles.partnerName}>Saraiva + Associados</span>
              <span className={styles.partnerRole}>Architecture Partner</span>
            </div>
          </div>

          {/* PARTNER 2 */}
          <div className={styles.partnerItem}>
            <div className={styles.logoWrapper}>
              <Image
                src="/build.webp"
                alt="Buildforms Construction"
                fill
                className={styles.logoImage}
              />
            </div>
            <div className={styles.tooltip}>
              <span className={styles.partnerName}>Buildforms Construction</span>
              <span className={styles.partnerRole}>Construction Partner</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}