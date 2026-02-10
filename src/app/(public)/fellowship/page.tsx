import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/fellowship.module.css';

export default function FellowshipPage() {
  return (
    <main className={styles.main}>
      
      {/* HERO SECTION */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={`container ${styles.heroContainer}`}>
          <span className={styles.label}>Capacity Building</span>
          <h1 className={styles.heroTitle}>
            Building People to <br />
            <span className={styles.accent}>Build Africa.</span>
          </h1>
          <p className={styles.heroSubtitle}>
            The Ikemba Liberia Fellowship is a selective, hands-on experience designed 
            to equip the next generation of Liberian leaders with real exposure to 
            development, finance, and execution.
          </p>
          <div className={styles.heroActions}>
            <Link href="#join" className={styles.primaryBtn}>
              Join the Movement
            </Link>
          </div>
        </div>
      </section>

      {/* MANIFESTO SECTION */}
      <section className={styles.manifestoSection}>
        <div className={`container ${styles.manifestoGrid}`}>
          <div className={styles.manifestoContent}>
            <h2 className={styles.sectionTitle}>Not a Classroom. <br />This is the Field.</h2>
            <div className={styles.divider} />
            <p className={styles.text}>
              Ikemba Investment Group believe Africa’s future will be built
              by well-trained, values-driven people, not just capital.
            </p>
            <p className={styles.text}>
              This program is practical, immersive, and impact-driven. The goal is simple: 
              give high-potential students in Liberia the opportunity to learn transferable 
              skills on the ground, across affiliated project sites and firms in the region.
            </p>
          </div>
          <div className={styles.manifestoVisual}>
            {/* Placeholder for an image of mentorship or construction site discussion */}
            <div className={styles.imageCard}>
               <Image 
                 src="/workers.avif"
                 alt="Mentorship in action" 
                 fill 
                 className={styles.image} 
               />
               <div className={styles.floatingCard}>
                 <span className={styles.cardText}>Real-world Execution</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAM FOCUS AREAS */}
      <section className={styles.focusSection}>
        <div className="container">
          <div className={styles.centerHeader}>
            <span className={styles.label}>Curriculum Pillars</span>
            <h2 className={styles.sectionTitle}>What Fellows Will Learn</h2>
          </div>

          <div className={styles.grid}>
            <div className={styles.card}>
              <span className={styles.cardIndex}>01</span>
              <h3>Project Development</h3>
              <p>From land acquisition to feasibility studies, understanding how a concept becomes a project.</p>
            </div>
            <div className={styles.card}>
              <span className={styles.cardIndex}>02</span>
              <h3>Construction & Engineering</h3>
              <p>On-site exposure to modern building techniques, safety standards, and project management.</p>
            </div>
            <div className={styles.card}>
              <span className={styles.cardIndex}>03</span>
              <h3>Real Estate Finance</h3>
              <p>Understanding the numbers behind the build—valuation, investment modeling, and asset management.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION / TIERS */}
      <section id="join" className={styles.ctaSection}>
        <div className="container">
          <h2 className={styles.ctaTitle}>Be Part of the First Cohort</h2>
          <p className={styles.ctaSubtitle}>
            We are currently opening early conversations for our inaugural launch.
          </p>

          <div className={styles.ctaGrid}>
            
            {/* CARD 1: STUDENTS */}
            <div className={styles.ctaCard}>
              <div className={styles.ctaHeader}>
                <h3>For Students</h3>
                <span className={styles.tag}>Future Leaders</span>
              </div>
              <p>
                Are you a high-potential student or young professional in Liberia? 
                Register your interest to be notified when applications open.
              </p>
              <Link href="/contact?subject=Fellowship_Student" className={styles.linkBtn}>
                Join Waitlist &rarr;
              </Link>
            </div>

            {/* CARD 2: PARTNERS */}
            <div className={`${styles.ctaCard} ${styles.featuredCard}`}>
              <div className={styles.ctaHeader}>
                <h3>For Partners</h3>
                <span className={styles.tag}>Mentors & Hosts</span>
              </div>
              <p>
                Host fellows at your firm, provide mentorship, or contribute technical expertise 
                to the curriculum. Let&apos;s build the workforce together.
              </p>
              <Link href="/contact?subject=Fellowship_Partner" className={styles.primaryBtnFull}>
                Become a Partner
              </Link>
            </div>

            {/* CARD 3: SPONSORS */}
            <div className={styles.ctaCard}>
              <div className={styles.ctaHeader}>
                <h3>For Sponsors</h3>
                <span className={styles.tag}>Impact Investors</span>
              </div>
              <p>
                Directly fund the program or sponsor specific fellows. Your investment 
                builds the human capital infrastructure of Liberia.
              </p>
              <Link href="/contact?subject=Fellowship_Sponsor" className={styles.linkBtn}>
                Discuss Sponsorship &rarr;
              </Link>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}