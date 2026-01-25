import styles from "@/styles/aboutTimeline.module.css";

const milestones = [
  {
    year: "2011",
    title: "Foundation",
    description: "Ikemba Investment Group established in Monrovia, Liberia with a focus on residential development.",
    location: "Monrovia, Liberia",
  },
  {
    year: "2014",
    title: "First Major Project",
    description: "Completion of the SG Residence, a $2.5M luxury residential development that established our reputation.",
    location: "Monrovia, Liberia",
  },
  {
    year: "2018",
    title: "West African Expansion",
    description: "Opened our Accra office and secured the 61-acre Ghana Insurance College campus development contract.",
    location: "Accra, Ghana",
  },
  {
    year: "2021",
    title: "US Operations",
    description: "Launched Philadelphia headquarters to serve diaspora investors and facilitate capital flow.",
    location: "Philadelphia, USA",
  },
  {
    year: "2024",
    title: "7th & Tubman",
    description: "Broke ground on our flagship mixed-use high-rise development in central Monrovia.",
    location: "Monrovia, Liberia",
  },
];

export default function AboutTimeline() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.container}`}>

        <div className={styles.header}>
          <span className={styles.label}>Our History</span>
          <h2 className={styles.title}>
            A Decade of <span className={styles.accent}>Impact</span>
          </h2>
        </div>

        <div className={styles.timeline}>
          {/* The Continuous Vertical Track */}
          <div className={styles.trackLine} />

          {milestones.map((milestone) => (
            <div key={milestone.year} className={styles.row}>

              {/* COL 1: THE TIME (The Anchor) */}
              <div className={styles.timeColumn}>
                <span className={styles.year}>{milestone.year}</span>
              </div>

              {/* COL 2: THE MARKER (The Tick) */}
              <div className={styles.markerColumn}>
                <div className={styles.marker}>
                  <div className={styles.innerDot} />
                </div>
              </div>

              {/* COL 3: THE LEDGER (The Content) */}
              <div className={styles.contentColumn}>
                <div className={styles.card}>
                  <h3 className={styles.cardTitle}>{milestone.title}</h3>
                  <p className={styles.cardText}>{milestone.description}</p>
                  <div className={styles.locationTag}>
                    <span className={styles.icon}>📍</span>
                    {milestone.location}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}