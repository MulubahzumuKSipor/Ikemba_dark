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
              Ikemba Investment Group was founded by a partnership of African professionals with over 
              <strong> 50 years of industry experience</strong>. We are impassioned with the 
              responsibility to provide meaningful contributions to developing Africa’s vast 
              economies.
            </p>
            
            <p className={styles.paragraph}>
              With offices in <strong>Monrovia and Accra</strong>, our core approach involves 
              working with public and private partners to identify, plan, and execute unique 
              real estate investment opportunities.
            </p>

            <div className={styles.quoteBox}>
              "We don't just build structures; we redefine what real estate looks like across the continent."
            </div>

            <p className={styles.paragraph}>
              Whether you’re looking to invest, hire us for design, or seek market entry 
              consultation, we aim to be an active leader in supporting the sector's growth.
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