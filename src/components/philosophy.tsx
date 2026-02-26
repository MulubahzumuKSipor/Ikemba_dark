import Link from 'next/link';
import styles from '@/styles/philosophy.module.css';

export default function Philosophy() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.container}`}>

        {/* LEFT: The Visual Anchor (Tall Image) */}
        <div className={styles.imageSide}>
          <div className={styles.imageWrapper}>
            {/* Creates a "Frame" effect */}
            <div className={styles.imageFrame} />
            <div className={styles.mainImage} style={{ backgroundImage: "url('/tower.avif')" }} />
          </div>
        </div>

        {/* RIGHT: The Executive Summary */}
        <div className={styles.contentSide}>

          <div className={styles.header}>
            <span className={styles.label}>Our Philosophy</span>
            <h2 className={styles.title}>
              A Responsibility to <br />
              <span className={styles.accent}>Make a Lasting Impression.</span>
            </h2>
          </div>

          <div className={styles.bodyText}>
            <p className={styles.paragraph}>
              Ikemba Investment Group was founded by a partnership of African professionals with experience across <strong> real estate development, design, and project management.</strong> We are in passing with the responsibility to provide meaningful contributions to developing Africa.
            </p>

            <p className={styles.paragraph}>
              With offices in <strong>Monrovia, Accra, and the United States,</strong> our approach centers on collaborating with public and private partners to plan, coordinate, and deliver real estate developments that align global investment with locally led execution across Africa’s emerging markets.
            </p>

            <div className={styles.quoteBox}>
              &quot;We don&apos;t just build structures; we redefine what real estate looks like across the continent.&quot;
            </div>

            <p className={styles.paragraph}>
              Whether you’re looking to invest, hire us for design, or seek market entry
              consultation, we aim to be an active leader in supporting the sector&apos;s growth.
            </p>

            <Link href="/contact" className={styles.btn}>
              Work With Us &rarr;
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}