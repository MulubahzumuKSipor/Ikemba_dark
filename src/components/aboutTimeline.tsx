import styles from "@/styles/aboutTimeline.module.css";

const milestones = [
  {
    year: "2011",
    title: "Foundation",
    description:
      "Ikemba Investment Group established in Monrovia, Liberia with a focus on residential development and architectural consulting.",
    location: "Monrovia, Liberia",
  },
  {
    year: "2014",
    title: "First Major Project",
    description:
      "Completion of the SG Residence, a $2.5M luxury residential development that established our reputation for high-end construction.",
    location: "Monrovia, Liberia",
  },
  {
    year: "2018",
    title: "West African Expansion",
    description:
      "Opened our Accra office and secured the 61-acre Ghana Insurance College campus development contract.",
    location: "Accra, Ghana",
  },
  {
    year: "2021",
    title: "US Operations",
    description:
      "Launched Philadelphia headquarters to serve diaspora investors and facilitate capital flow into African development projects.",
    location: "Philadelphia, USA",
  },
  {
    year: "2024",
    title: "7th & Tubman",
    description:
      "Broke ground on our flagship mixed-use high-rise development in central Monrovia—a landmark for modern African urbanism.",
    location: "Monrovia, Liberia",
  },
];

export default function AboutTimeline() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <span className={styles.label}>Our Journey</span>
          <h2 className={styles.title}>
            Milestones That Define <span className={styles.accent}>Our Legacy</span>
          </h2>
        </div>

        <div className={styles.timeline}>
          <div className={styles.line} />
          {milestones.map((milestone, index) => (
            <div 
              key={milestone.year} 
              className={`${styles.item} ${index % 2 === 1 ? styles.itemRight : ''}`}
            >
              <div className={styles.marker}>
                <span className={styles.markerDot} />
              </div>
              <div className={styles.card}>
                <span className={styles.year}>{milestone.year}</span>
                <h3 className={styles.cardTitle}>{milestone.title}</h3>
                <p className={styles.cardText}>{milestone.description}</p>
                <span className={styles.location}>
                  <svg 
                    className={styles.locationIcon} 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {milestone.location}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}