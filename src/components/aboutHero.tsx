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
          Building the Future  <br />
          <span className={styles.accent}>of Africa Together</span>
        </h1>
        <p className={styles.heroSubtitle}>
          Ikemba Investment Group is a Pan-African real estate development firm working to align global investment with locally led planning, design, and construction across Africa’s emerging markets.
        </p>
      </div>

      <div className={styles.heroGlow} />
    </section>
  );
}