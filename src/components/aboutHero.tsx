import styles from '@/styles/about.module.css';

export default function AboutHero() {
  return (
    <section className={styles.heroSection}>
      {/* NEW: Background Image Container */}
      <div
        className={styles.heroBackground}
        style={{ backgroundImage: 'url(/service.avif)' }} // Replace with your preferred image path
      />

      {/* NEW: Dark Gradient Overlay */}
      <div className={styles.heroOverlay} />

      <div className={`container ${styles.heroContainer}`}>
        <span className={styles.heroLabel}>Who We Are</span>
        <h1 className={styles.heroTitle}>
          Bridging Capital & <br />
          <span className={styles.accent}>African Innovation.</span>
        </h1>
        <p className={styles.heroSubtitle}>
          Ikemba Investment Group is not just a development firm. We are the architects of a new economic era, connecting the Diaspora&apos;s resources with Africa&apos;s limitless potential.
        </p>
      </div>

      <div className={styles.heroGlow} />
    </section>
  );
}