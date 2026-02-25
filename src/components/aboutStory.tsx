import Image from 'next/image';
import styles from '@/styles/about.module.css';

export default function AboutStory() {
  return (
    <section className={styles.storySection}>
      <div className={`container ${styles.storyGrid}`}>

        {/* Left: Visual Narrative */}
        <div className={styles.storyVisual}>
          <div className={styles.imageFrame}>
            <Image
              src="/construct.avif" // Ensure this path exists or replace
              alt="Ikemba Construction Site"
              fill
              className={styles.storyImage}
              priority
            />
          </div>
          <div className={styles.storyBadge}>
            <span className={styles.badgeYear}>2011</span>
            <span className={styles.badgeText}>Established</span>
          </div>
        </div>

        {/* Right: Editorial Content */}
        <div className={styles.storyContent}>
          <h2 className={styles.sectionHeading}>The Origin Story</h2>
          <div className={styles.storyDivider} />

          <div className={styles.prose}>
            <p>
              <span className={styles.dropCap}>I</span>kemba Investment Group was founded by a partnership of African professionals committed to contributing meaningfully to the long-term development of the continent’s emerging economies.
            </p>
            <p>
              As investment interest in Liberia and West Africa continued to grow, it became increasingly clear that the challenge was not access to capital alone — but the ability to plan, coordinate, and deliver development projects locally in a way that aligns with international standards while remaining grounded in the realities of African markets.
            </p>
            <p>
              What began as a collaborative effort to identify and advance real estate opportunities through public and private partnerships has evolved into a development platform focused on strengthening local execution across the project lifecycle — from early-stage planning and capital coordination to design support and construction oversight.
            </p>
            <p>
              Today, Ikemba works across both sponsored developments and client-led projects, supporting the delivery of real estate initiatives that contribute to workforce development, local capacity building, and long-term asset creation within the communities they serve.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}