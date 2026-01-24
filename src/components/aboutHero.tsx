import styles from "@/styles/aboutHero.module.css";

export default function AboutHero() {
  return (
    <section className={styles.section}>
      <div className={styles.overlay} />
      <div className={`container ${styles.container}`}>
        <div className={styles.content}>
          <span className={styles.established}>Est. 2011</span>
          <h1 className={styles.title}>
            Building the Future of <span className={styles.accent}>Africa</span>
          </h1>
          <p className={styles.subtitle}>
            A Pan-African vision rooted in over 50 years of combined expertise 
            in Real Estate Development, Architecture, and Construction Management.
          </p>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>15+</span>
              <span className={styles.statLabel}>Years Active</span>
            </div>
            <div className={styles.divider} />
            <div className={styles.stat}>
              <span className={styles.statNumber}>600+</span>
              <span className={styles.statLabel}>Acres Managed</span>
            </div>
            <div className={styles.divider} />
            <div className={styles.stat}>
              <span className={styles.statNumber}>3</span>
              <span className={styles.statLabel}>Global Offices</span>
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
}