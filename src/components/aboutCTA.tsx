import Link from 'next/link';
import styles from '@/styles/about.module.css';

export default function AboutCta() {
  return (
    <section className={styles.ctaSection}>
      <div className={`container ${styles.ctaContainer}`}>
        <h2 className={styles.ctaTitle}>Ready to shape the future?</h2>
        <p className={styles.ctaText}>
          Whether you are an investor seeking returns or a landowner with a vision, let&apos;s build something remarkable together.
        </p>
        <div className={styles.ctaButtons}>
          <Link href="/contact" className={styles.primaryBtn}>
            Start a Conversation
          </Link>
          <Link href="/portfolio" className={styles.secondaryBtn}>
            View Our Work
          </Link>
        </div>
      </div>
    </section>
  );
}