import Link from 'next/link';
import styles from '@/styles/hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      {/* Background Image Layer */}
      <div className={styles.bgImage} />
      
      {/* Adaptive Gradient: Shifts from radial on desktop to linear on mobile */}
      <div className={styles.overlay} />

      <div className={`container ${styles.content}`}>
        <div className={styles.textWrapper}>
          <span className={styles.tagline}>
            Pan-African Development • Architecture • Construction
          </span>
          
          <h1 className={styles.title}>
            BUILDING AFRICA&apos;S <br />
            <span className={styles.highlight}>FUTURE</span>
          </h1>
          
          <p className={styles.description}>
            From the 61-acre Ghana Insurance College to the skyline of Monrovia. 
            We deliver world-class infrastructure and mixed-use towers across 
            the continent.
          </p>

          <div className={styles.buttonGroup}>
            <Link href="/portfolio" className={styles.primaryBtn}>
              View Our Portfolio
            </Link>
            <Link href="/contact" className={styles.secondaryBtn}>
              Start Your Project
            </Link>
          </div>
        </div>
      </div>

      {/* Hidden on small mobile to save vertical space */}
      <div className={styles.scrollIndicator}>
        <div className={styles.mouse}>
          <div className={styles.wheel} />
        </div>
      </div>
    </section>
  );
}