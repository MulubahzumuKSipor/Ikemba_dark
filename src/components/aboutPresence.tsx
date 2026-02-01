import styles from '@/styles/about.module.css';

export default function AboutPresence() {
  return (
    <section className={styles.presenceSection}>
      {/* 1. BACKGROUND MAP / TEXTURE */}
      <div
        className={styles.presenceBackground}
        style={{ backgroundImage: 'url(/dark_map.jpg)' }}
        // Tip: Use a dark, subtle world map or architectural texture here
      />

      {/* 2. GRADIENT OVERLAY */}
      <div className={styles.presenceOverlay} />

      <div className={`container ${styles.presenceContainer}`}>
        <h2 className={styles.presenceTitle}>Global Presence, Local Impact</h2>
        <p className={styles.presenceSubtitle}>
          Operating across time zones to deliver world-class results.
        </p>

        {/* 3. CENTERED GRID FOR 2 ITEMS */}
        <div className={styles.locationsGrid}>
          {/* Location 1: Monrovia */}
          <div className={styles.locationCard}>
            <div className={styles.cardContent}>
              <span className={styles.locationIcon}>LR</span>
              <h3 className={styles.locationCity}>Monrovia</h3>
              <p className={styles.locationCountry}>Liberia</p>
              <div className={styles.locationDivider} />
              <p className={styles.locationDetail}>
                Headquarters & <br/>Development Operations
              </p>
            </div>
          </div>

          {/* Location 2: Accra */}
          <div className={styles.locationCard}>
            <div className={styles.cardContent}>
              <span className={styles.locationIcon}>GH</span>
              <h3 className={styles.locationCity}>Accra</h3>
              <p className={styles.locationCountry}>Ghana</p>
              <div className={styles.locationDivider} />
              <p className={styles.locationDetail}>
                Regional Hub & <br/>Design Studio
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}