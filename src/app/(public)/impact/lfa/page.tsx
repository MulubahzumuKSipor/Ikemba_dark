import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/lfa.module.css';

// --- INSTAGRAM ICON ---
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );
}

export default function LFAPage() {
  const galleryImages = [
    '/gallery-1.jpeg',
    '/gallery-2.jpeg',
    '/gallery-3.jpeg',
    '/gallery-4.jpeg',
    '/gallery-5.jpeg',
  ];

  return (
    <main className={styles.main}>

      {/* 1. CINEMATIC HERO */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image
            src="/lfa-team.jpeg"
            alt="Liberia Football Academy Matchday"
            fill
            className={styles.heroImage}
            priority
          />
          <div className={styles.heroOverlay} />
        </div>

        <div className={`container ${styles.heroContainer}`}>
          <Link href="/impact" className={styles.backLink}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.backIcon}>
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Impact
          </Link>
          <span className={styles.label}>Community Spotlight</span>
          <h1 className={styles.title}>Liberia Football Academy</h1>
          <p className={styles.subtitle}>A symbol of growth, unity, and hope through sport.</p>
        </div>
      </section>

      {/* 2. THE STORY */}
      <section className={styles.storySection}>
        <div className={`container ${styles.storyContainer}`}>

          <div className={styles.prose}>
            <p className={styles.leadText}>
              Liberia Football Academy (LFA) is a community-rooted football team competing in the
              Sinkor Sub-Committee 3rd Division League under the Liberia Football Association.
              The team is made up largely of young players developed through the Academy&apos;s
              grassroots and youth system.
            </p>

            <p>
              The senior team reflects the Academy&apos;s long-term investment in player development,
              with many players progressing from U-15 and below into competitive senior football.
              The squad is built on discipline, teamwork, consistency, and respect—values that
              guide both performance on the pitch and conduct off it.
            </p>

            <blockquote className={styles.pullQuote}>
              &ldquo;Beyond competition, the team serves as a platform for opportunity, mentorship,
              and positive engagement for young Liberians.&rdquo;
            </blockquote>

            <p>
              LFA enjoys strong community support, with thousands of spectators attending matches
              throughout the season, creating a vibrant and competitive matchday atmosphere. The
              team has also produced players who have gone on to represent county teams and higher
              levels of competition.
            </p>

            {/* --- INSTAGRAM REDIRECT CTA --- */}
            <div className={styles.socialCTA}>
              <a
                href="https://www.instagram.com/lfa231?igsh=MWlpdmZqMnMwOXljbQ=="
                target="_blank"
                rel="noopener noreferrer"
                className={styles.igButton}
              >
                <InstagramIcon className={styles.igIcon} />
                <span>Follow LFA on Instagram</span>
                <span className={styles.externalArrow}>↗</span>
              </a>
              <p className={styles.igHelperText}>Redirects to official Instagram page.</p>
            </div>

          </div>

        </div>
      </section>

      {/* 3. EDITORIAL BENTO GRID GALLERY */}
      <section className={styles.gallerySection}>
        <div className={`container ${styles.galleryHeader}`}>
          <h2 className={styles.galleryTitle}>The Matchday Experience</h2>
          <p className={styles.gallerySubtitle}>Thousands of supporters. One community.</p>
        </div>

        <div className={`container ${styles.galleryGrid}`}>
          {galleryImages.map((src, index) => (
            <div
              key={index}
              className={`${styles.galleryItem} ${index === 0 ? styles.galleryItemLarge : ''}`}
            >
              <Image
                src={src}
                alt={`LFA Matchday ${index + 1}`}
                fill
                className={styles.galleryImage}
              />
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}