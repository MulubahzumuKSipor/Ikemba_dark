import Link from 'next/link';
import styles from '@/styles/hero.module.css';

export default function Hero() {
  return (
    <section className={styles.heroSection}>
      
      {/* 1. CINEMATIC BACKGROUND */}
      {/* Replace '/images/llc-hero.jpg' with your actual LLC picture file path */}
      <div
        className={styles.heroBackground}
        style={{ backgroundImage: "url('/llc-hero.webp')" }}
      />

      {/* 2. ATMOSPHERIC OVERLAYS */}
      {/* Darkens the image slightly so text is readable */}
      <div className={styles.overlayPrimary} />
      {/* Adds a subtle gold glow from the bottom for a "sunrise" effect */}
      <div className={styles.overlayGlow} />

      {/* 3. HERO CONTENT */}
      <div className={`container ${styles.heroContainer}`}>
        <div className={styles.contentWrapper}>

          {/* <span className={styles.label}>Ikemba Investment Group</span> */}

          <h1 className={styles.headline}>
            Building the <span className={styles.accent}>Architecture</span> <br />
            of a New Africa.
          </h1>

          <p className={styles.subheadline}>
            We bridge the gap between global capital and West African infrastructure.
            From the Liberian Learning Center to mixed-use urban landmarks,
            we develop spaces that inspire.
          </p>

          <div className={styles.buttonGroup}>
            <Link href="/portfolio" className={styles.primaryBtn}>
              Explore Our Work
            </Link>
            <Link href="/about" className={styles.secondaryBtn}>
              Our Vision
            </Link>
          </div>

        </div>
      </div>

      {/* Optional: Scroll Indicator */}
      <div className={styles.scrollIndicator}>
        <span className={styles.scrollText}>Scroll to Discover</span>
        <div className={styles.scrollLine} />
      </div>

    </section>
  );
}