import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/impact.module.css';

export default function ImpactPage() {
  return (
    <main className={styles.main}>

      {/* HERO SECTION */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={`container ${styles.heroContainer}`}>
          <span className={styles.label}>Corporate Social Responsibility</span>
          <h1 className={styles.heroTitle}>
            Building Beyond <br />
            <span className={styles.accent}>The Blueprint.</span>
          </h1>
          <p className={styles.heroSubtitle}>
            True development isn&apos;t just measured in square meters. It&apos;s measured in
            lives changed. We are committed to fostering education, sustainability,
            and economic resilience in every community we touch.
          </p>
        </div>
      </section>

      {/* STATS STRIP */}
      {/* <section className={styles.statsSection}>
        <div className={`container ${styles.statsGrid}`}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>500+</span>
            <span className={styles.statLabel}>Local Jobs Created</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statNumber}>$2M+</span>
            <span className={styles.statLabel}>Community Investment</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statNumber}>10k</span>
            <span className={styles.statLabel}>Students Impacted</span>
          </div>
        </div>
      </section> */}

      {/* SPOTLIGHT: FLASGHIP PROJECT */}
      <section className={styles.spotlightSection}>
        <div className={`container ${styles.spotlightContainer}`}>

          <div className={styles.spotlightImageWrapper}>
            <Image
              src="/llc-hero.webp"
              alt="Liberian Learning Center"
              fill
              className={styles.spotlightImage}
            />
            <div className={styles.imageBorder} />
          </div>

          <div className={styles.spotlightContent}>
            <span className={styles.sectionLabel}>Flagship Initiative</span>
            <h2 className={styles.sectionTitle}>The Liberian Learning Center</h2>
            <p className={styles.text}>
              As part of our commitment to the future, Ikemba is the lead technical partner
              for the Liberian Learning Center (LLC). This state-of-the-art facility is more
              than a library—it is a hub for innovation, technology, and entrepreneurship.
            </p>
            <ul className={styles.checkList}>
              <li>Free access to digital resources and internet.</li>
              <li>&quot;Born Before Computer&quot; digital literacy programs.</li>
              <li>Co-working spaces for emerging startups.</li>
            </ul>
            <Link href="/contact" className={styles.textLink}>
              Partner on this Project &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* THREE PILLARS GRID */}
      <section className={styles.pillarsSection}>
        <div className="container">
          <div className={styles.centerHeader}>
            <h2 className={styles.sectionTitle}>Our Impact Pillars</h2>
            <p className={styles.sectionSubtitle}>
              How we ensure every project leaves a lasting legacy.
            </p>
          </div>

          <div className={styles.pillarGrid}>
            {/* PILLAR 1 */}
            <div className={styles.pillarCard}>
              <div className={styles.iconWrapper}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3>Education & Skills</h3>
              <p>
                We don&apos;t just hire; we train. Every construction site serves as a
                training ground for local artisans, ensuring skills transfer in modern
                building techniques.
              </p>
            </div>

            {/* PILLAR 2 */}
            <div className={styles.pillarCard}>
              <div className={styles.iconWrapper}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3.055 11H5a2 2 0 0 1 2 2v1a2 2 0 0 0 2 2 2 2 0 0 1 2 2v2.945M8 3.935V5.5A2.5 2.5 0 0 0 10.5 8h.5a2 2 0 0 1 2 2 2 2 0 1 0 4 0h.5A2.5 2.5 0 0 0 20 7.5v-1.103" />
                  <path d="M12 3a9 9 0 1 0 9 9 9 9 0 0 0-9-9z" />
                </svg>
              </div>
              <h3>Sustainability</h3>
              <p>
                From solar-integrated designs to locally sourced materials, we minimize
                our carbon footprint while maximizing energy efficiency for our tenants.
              </p>
            </div>

            {/* PILLAR 3 */}
            <div className={styles.pillarCard}>
              <div className={styles.iconWrapper}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M16 11V7a4 4 0 0 0-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3>Economic Growth</h3>
              <p>
                We prioritize Liberian vendors and supply chains. By sourcing locally,
                we ensure our investment circulates within the local economy.
              </p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}