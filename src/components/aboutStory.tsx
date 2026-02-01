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
              <span className={styles.dropCap}>I</span>t began with a single conviction: that the future of Africa would be built by those willing to return and reinvest. Founded in 2011 by Bleejay Innis, Ikemba Investment Group emerged from a desire to bridge the gap between international capital markets and the on-the-ground realities of West African infrastructure.
            </p>
            <p>
              What started as a boutique consultancy has evolved into a full-scale development powerhouse. We realized early on that to change the skyline, we had to control the process—from the first sketch to the final brick.
            </p>
            <p>
              Today, we stand at the intersection of <strong>vision and execution</strong>. We don&apos;t just build structures; we build ecosystems that empower communities, creating tangible wealth that lasts for generations.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}