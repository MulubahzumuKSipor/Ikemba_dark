import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/identity.module.css';

export default function Identity() {
  return (
    <section className={styles.section}>
      
      {/* PART 1: STRATEGIC PARTNERS STRIP */}
      <div className={styles.trustStrip}>
        <div className={`container ${styles.trustContainer}`}>
          <span className={styles.trustLabel}>Strategic Partners</span>
          
          <div className={styles.partnerGrid}>
            
            {/* PARTNER 1: CONSTRUCTION */}
            <div className={styles.partnerItem}>
              <div className={styles.logoWrapper}>
                <Image 
                  src="/tri_buchanan.webp" 
                  alt="Tri Buchanan Development Logo" 
                  fill
                  sizes="(max-width: 768px) 100vw, 200px"
                  className={styles.logoImage}
                />
              </div>
              <div className={styles.partnerText}>
                <span className={styles.partnerName}>Tri Buchanan Development</span>
                <span className={styles.partnerRole}>General Contractor</span>
              </div>
            </div>

            {/* PARTNER 2: SALES */}
            <div className={styles.partnerItem}>
              <div className={styles.logoWrapper}>
                <Image 
                  src="/KG.webp" 
                  alt="Gateway Realty Logo" 
                  fill 
                  sizes="(max-width: 768px) 100vw, 200px"
                  className={styles.logoImage}
                />
              </div>
              <div className={styles.partnerText}>
                <span className={styles.partnerName}>Gateway Realty</span>
                <span className={styles.partnerRole}>Sales & Management</span>
              </div>
            </div>

            {/* PARTNER 3: MARKETING */}
            <div className={styles.partnerItem}>
              <div className={styles.logoWrapper}>
                <Image 
                  src="/KG.avif" 
                  alt="Kanree Global Logo" 
                  fill
                  sizes="(max-width: 768px) 100vw, 200px"
                  className={styles.logoImage}
                />
              </div>
              <div className={styles.partnerText}>
                <span className={styles.partnerName}>Kanree Global</span>
                <span className={styles.partnerRole}>Branding & Marketing</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* PART 2: THE VISION */}
      <div className={`container ${styles.container}`}>
        
        {/* LEFT: MISSION */}
        <div className={styles.mission}>
          <h2 className={styles.title}>
            Redefining the African <br />
            <span className={styles.accent}>Built Environment.</span>
          </h2>
          <p className={styles.text}>
            Ikemba Investment Group is a Pan-African firm strategically focused on 
            Development, Architecture, and Construction Management. 
            <br /><br />
            Supported by our licensed general contractor <strong>Tri Buchanan</strong> and 
            sales prowess of <strong>Gateway Realty</strong>, we execute unique real estate 
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
            <div className={styles.cardBg} style={{ backgroundImage: "url('/images/atlantic-view.jpg')" }} />
            <div className={styles.cardContent}>
              <span className={styles.cardTag}>For Homeowners</span>
              <h3 className={styles.cardTitle}>Ikemba Living</h3>
              <p className={styles.cardDesc}>
                Luxury homes, gated communities, and automated residences.
              </p>
            </div>
          </Link>

          <Link href="/portfolio?filter=Landmarks" className={styles.card}>
            <div className={styles.cardBg} style={{ backgroundImage: "url('/images/7th-tubman.jpg')" }} />
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