import styles from "@/styles/aboutStory.module.css";
import Image from "next/image";

export default function AboutStory() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.container}`}>
        {/* BLOCK 1: Image Left / Text Right */}
        <div className={styles.block}>
          <div className={styles.imageWrapper}>
            <div 
              className={styles.image}
              style={{ backgroundImage: "url('/avr.avif')" }}
            />
            <span className={styles.imageTag}>Monrovia, 2011</span>
          </div>
          <div className={styles.content}>
            <span className={styles.label}>Our Origin</span>
            <h2 className={styles.title}>
              A Vision Born in <span className={styles.accent}>Liberia</span>
            </h2>
            <p className={styles.text}>
              Ikemba Investment Group was founded in 2011 with a singular mission: 
              to transform the landscape of African real estate development. What began 
              as a small consultancy in Monrovia has grown into a <strong>Pan-African 
              powerhouse</strong> with operations spanning three continents.
            </p>
            <p className={styles.text}>
              Our founders recognized a critical gap—Africa&apos;s rapid urbanization demanded 
              world-class development expertise that understood both <strong>local context 
              and international standards</strong>. Ikemba was built to bridge that divide.
            </p>
          </div>
        </div>

        {/* BLOCK 2: Text Left / Image Right (Reversed) */}
        <div className={`${styles.block} ${styles.reversed}`}>
          <div className={styles.imageWrapper}>
            <div 
              className={styles.image}
              style={{ backgroundImage: "url('/construct.avif')" }}
            />
            <span className={styles.imageTag}>Accra Expansion, 2018</span>
          </div>
          <div className={styles.content}>
            <span className={styles.label}>Our Growth</span>
            <h2 className={styles.title}>
              From Local to <span className={styles.accent}>Continental</span>
            </h2>
            <p className={styles.text}>
              By 2018, our track record in Liberia had earned us the trust of institutional 
              investors and government agencies alike. We expanded into <strong>Ghana</strong>, 
              taking on landmark projects like the 61-acre Ghana Insurance College development.
            </p>
            <p className={styles.text}>
              Today, with offices in <strong>Monrovia, Accra, and Philadelphia</strong>, we 
              operate as a truly global firm—bringing diaspora capital back to Africa while 
              maintaining the operational excellence that defines our work.
            </p>
          </div>
        </div>

        {/* EXPERIENCE BANNER */}
        <div className={styles.experienceBanner}>
          <div className={styles.experienceNumber}>14+</div>
          <div className={styles.experienceText}>
            <span className={styles.experienceLabel}>Years of Combined Experience</span>
            <p className={styles.experienceDesc}>
              Our leadership team brings together decades of expertise in architecture, 
              construction management, and real estate investment across Africa, Europe, and America.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}