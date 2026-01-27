import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/identity.module.css';

export default function Identity() {
  return (
    <section className={styles.section}>
      {/* PART 2: THE VISION */}
      <div className={`container ${styles.container}`}>
        {/* LEFT: MISSION */}
        <div className={styles.mission}>
          <h2 className={styles.title}>
            Redefining the African <br />
            <span className={styles.accent}>Built Environment.</span>
          </h2>
          <p className={styles.text}>
            Ikemba Investment Group is a Pan African firm strategically focused on Development, Architecture, Construction Management and Consulting towards real estate in Africa’s emerging economies. With offices in Monrovia, Liberia and Accra, Ghana, our firm’s core approach involves working with public and private partners to help identify, plan and execute unique real estate investment opportunities across the African continent.
            <br /><br />
            Supported by our licensed general contractor <strong>Saraiva + Associados</strong> and <strong>Buildforms Construction Pte Ltd</strong>, we execute unique real estate
            investment opportunities across the continent.
          </p>
          
          <div className={styles.statRow}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>15+</span>
              <span className={styles.statLabel}>Years Active</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>$50M+</span>
              <span className={styles.statLabel}>Project Value</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>3</span>
              <span className={styles.statLabel}>Global Offices</span>
            </div>
          </div>

          <Link href="/about" className={styles.textLink}>
            Read Our Story &rarr;
          </Link>
        </div>

        {/* RIGHT: CARDS */}
        <div className={styles.cards}>

          <Link href="/portfolio?filter=Living" className={styles.card}>
            <div className={styles.cardBg} style={{ backgroundImage: "url('/images/projects/atlantic.png')" }} />
            <div className={styles.cardContent}>
              <span className={styles.cardTag}>For Homeowners</span>
              <h3 className={styles.cardTitle}>Ikemba Living</h3>
              <p className={styles.cardDesc}>
                Luxury homes, gated communities, and automated residences.
              </p>
            </div>
          </Link>

          <Link href="/portfolio?filter=Landmarks" className={styles.card}>
            <div className={styles.cardBg} style={{ backgroundImage: "url('/tower.avif')" }} />
            <div className={styles.cardContent}>
              <span className={styles.cardTag}>For Investors</span>
              <h3 className={styles.cardTitle}>Major Landmarks</h3>
              <p className={styles.cardDesc}>
                High-rise towers, institutional campuses, and commercial infrastructure.
              </p>
            </div>
          </Link>

        </div>
      </div>
    </section>
  );
}