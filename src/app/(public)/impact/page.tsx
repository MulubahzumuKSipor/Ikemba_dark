import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/impact.module.css';

export default function ImpactPage() {
  return (
    <main className={styles.main}>

      {/* --- HERO SECTION --- */}
      <section className={styles.hero}>
        {/* Native Next.js Image Optimization for the Hero Background */}
        <Image
          src="/impact-hero-bg.jpeg" // Add a high-quality community or architecture image to public/
          alt="Ikemba Corporate Social Responsibility"
          fill
          className={styles.heroImage}
          priority // Tells Next.js to load this image instantly
        />

        {/* The Dark Navy Gradient Overlay */}
        <div className={styles.heroOverlay} />

        {/* The Content */}
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

      {/* --- SPOTLIGHT 1: FLASGHIP PROJECT --- */}
      <section className={styles.spotlightSection}>
        <div className={`container ${styles.spotlightContainer}`}>

          <div className={styles.spotlightImageWrapper}>
            <Image
              src="/llc-hero.jpeg"
              alt="Liberian Learning Center"
              fill
              className={styles.spotlightImage}
            />
            <div className={styles.imageBorder} />
          </div>

          <div className={styles.spotlightContent}>
            <span className={styles.sectionLabel}>Impact Partnership</span>
            <h2 className={styles.sectionTitle}>The Liberian Learning Center</h2>
            <p className={styles.text}>
              As part of our commitment to capacity-building and inclusive development, Ikemba team members served as the design and construction leads for the Liberian Learning Center — a community-based facility created to expand access to digital literacy, entrepreneurship training, and collaborative workspaces. <br />

              The project supports workforce readiness and small business development by providing students, professionals, and emerging entrepreneurs with access to internet connectivity, learning programs, and shared innovation space.
            </p>
            <ul className={styles.checkList}>
              <li>Free access to digital resources and internet.</li>
              <li>&quot;Born Before Computer&quot; digital literacy programs.</li>
              <li>Co-working spaces for emerging startups.</li>
            </ul>
            <Link href="/contact" className={styles.textLink}>
              Read more &rarr;
            </Link>
          </div>

        </div>
      </section>

      {/* --- SPOTLIGHT 2: LFA (CSS Reversal) --- */}
      {/* Removed the inline white background style here */}
      <section className={`${styles.spotlightSection} ${styles.spotlightReverse}`}>
        <div className={`container ${styles.spotlightContainer}`}>

          <div className={styles.spotlightImageWrapper}>
            <Image
              src="/lfa-team.jpeg"
              alt="Liberia Football Academy Team"
              fill
              className={styles.spotlightImage}
            />
            <div className={styles.imageBorder} />
          </div>

          <div className={styles.spotlightContent}>
            <span className={styles.sectionLabel}>Community & Sports</span>
            <h2 className={styles.sectionTitle}>Liberia Football Academy</h2>
            <p className={styles.text}>
              More than just a football team, the Liberia Football Academy is a community-rooted
              platform for opportunity, mentorship, and positive engagement. Built on the core
              values of discipline, teamwork, and respect, LFA nurtures young talent from the
              grassroots level up to the 3rd Division League.
            </p>
            <p className={styles.text} style={{ marginBottom: '2.5rem' }}>
              Backed by thousands of passionate supporters, the team stands as a powerful symbol
              of growth, unity, and hope for young Liberians through the beautiful game.
            </p>

            <Link href="/impact/lfa" className={styles.btnPrimary}>
              View the Full Story & Gallery
            </Link>
          </div>

        </div>
      </section>

      {/* --- THREE PILLARS GRID --- */}
      <section className={styles.pillarsSection}>
        <div className="container">
          <div className={styles.centerHeader}>
            <h2 className={styles.sectionTitle}>Our Impact Pillars</h2>
            <p className={styles.sectionSubtitle}>
              How we ensure every project leaves a lasting legacy.
            </p>
          </div>

          <div className={styles.pillarGrid}>
            <div className={styles.pillarCard}>
              <div className={styles.iconWrapper}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3>Education & Skills</h3>
              <p>
                We don&apos;t just hire; we train. Every construction site serves as a
                training ground for local artisans, ensuring skills transfer.
              </p>
            </div>

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
                our carbon footprint while maximizing efficiency.
              </p>
            </div>

            <div className={styles.pillarCard}>
              <div className={styles.iconWrapper}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M16 11V7a4 4 0 0 0-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3>Economic Growth</h3>
              <p>
                We prioritize Liberian vendors and supply chains. By sourcing locally,
                we ensure our investment circulates locally.
              </p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}