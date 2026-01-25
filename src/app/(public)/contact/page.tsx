import ContactForm from '@/components/contactForm';
import styles from '@/styles/contactForm.module.css';

export const metadata = {
  title: 'Request Consultation | Ikemba Investment Group',
  description: 'Partner with us for real estate development, design, and investment in West Africa.',
};

export default function ContactPage() {
  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        
        {/* LEFT COLUMN: The "Global Context" */}
        <aside className={styles.infoSide}>
          <div className={styles.stickyContent}>
            <span className={styles.brandLabel}>Global Partnership</span>
            
            <h1 className={styles.heading}>
              Let&apos;s Build the <br />
              <span className={styles.gold}>Next Landmark.</span>
            </h1>

            <p className={styles.description}>
              Whether you are looking to invest in one of our developments, 
              hire us for design management, or seeking consultation for 
              market entry, we are ready to collaborate.
            </p>

            {/* The Live Office Status */}
            <div className={styles.officeGrid}>
              <div className={styles.officeCard}>
                <span className={styles.officeCity}>Monrovia, LR</span>
                <span className={styles.officeAddress}>Tubman Blvd, Sinkor</span>
                <OfficeTime timezone="Africa/Monrovia" />
              </div>

              <div className={styles.officeCard}>
                <span className={styles.officeCity}>Accra, GH</span>
                <span className={styles.officeAddress}>East Legon</span>
                <OfficeTime timezone="Africa/Accra" />
              </div>
              
               <div className={styles.officeCard}>
                <span className={styles.officeCity}>Philadelphia, USA</span>
                <span className={styles.officeAddress}>International HQ</span>
              </div>
            </div>
          </div>
        </aside>

        {/* RIGHT COLUMN: The "Consultation Engine" */}
        <div className={styles.formSide}>
          <ContactForm />
        </div>

      </div>
    </main>
  );
}

// Micro-component for the "Surprise" Time
function OfficeTime({ timezone }: { timezone: string }) {
  // Simple server-side render of time (or use client for ticking clock)
  const time = new Date().toLocaleTimeString('en-GB', { 
    timeZone: timezone, 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  return <span className={styles.liveTime}>● {time} Local Time</span>;
}