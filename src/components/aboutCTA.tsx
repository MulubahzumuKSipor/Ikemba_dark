import Link from "next/link";
import styles from "@/styles/aboutCTA.module.css";

export default function AboutCta() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.container}`}>
        <div className={styles.content}>
          <span className={styles.label}>Next Step</span>
          <h2 className={styles.title}>
            Ready to Build the Future <span className={styles.accent}>Together?</span>
          </h2>
          <p className={styles.text}>
            Whether you&apos;re an investor seeking opportunities in African real estate, 
            a developer looking for expert construction management, or an institution 
            planning your next landmark project—we&apos;re ready to talk.
          </p>
          <div className={styles.buttons}>
            <Link href="/contact" className={`btn btn-primary ${styles.btnPrimary}`}>
              Request Consultation
            </Link>
            <Link href="/" className={styles.btnOutline}>
              View Our Portfolio
              <svg 
                className={styles.btnIcon} 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className={styles.decoration}>
          <div className={styles.decorLine} />
          <span className={styles.decorText}>IKEMBA</span>
          <div className={styles.decorLine} />
        </div>
      </div>
    </section>
  );
}