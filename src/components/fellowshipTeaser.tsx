import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/fellowshipTeaser.module.css';

export default function FellowshipTeaser() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.container}`}>
        
        {/* TEXT CONTENT */}
        <div className={styles.content}>
          <span className={styles.label}>Capacity Building</span>
          <h2 className={styles.title}>
            Building People to <br/>
            <span className={styles.accent}>Build Africa.</span>
          </h2>
          <p className={styles.description}>
            We believe Africa&apos;s future will be built by well-trained, values-driven people, not just capital. The Ikemba Liberia Fellowship is a selective, hands-on experience equipping the next generation of leaders with real-world exposure to development, finance, and execution.
          </p>
          <ul className={styles.highlights}>
            <li>Not a classroom. Real project execution.</li>
            <li>Mentorship from industry executives.</li>
            <li>Direct exposure to emerging markets.</li>
          </ul>
          <Link href="/fellowship" className={styles.ctaButton}>
            Discover the Fellowship &rarr;
          </Link>
        </div>

        {/* VISUAL / IMAGE */}
        <div className={styles.visual}>
          <div className={styles.imageWrapper}>
            <Image
              src="/workers.avif"
              alt="Ikemba Liberia Fellowship"
              fill
              className={styles.image}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Subtle inner shadow for depth */}
            <div className={styles.imageOverlay} />
          </div>

          {/* Web-style floating badge */}
          <div className={styles.floatingBadge}>
            <span>Inaugural Cohort</span>
          </div>
        </div>

      </div>
    </section>
  );
}