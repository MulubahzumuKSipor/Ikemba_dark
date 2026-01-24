import styles from "@/styles/aboutPresence.module.css";

const offices = [
  {
    city: "Monrovia",
    country: "Liberia",
    role: "Headquarters",
    description:
      "Our founding office and operational hub for all West African development projects.",
    image: "/avr.avif",
  },
  {
    city: "Accra",
    country: "Ghana",
    role: "Regional Office",
    description:
      "Leading our expansion across Anglophone West Africa, including the Ghana Insurance College project.",
    image: "/construct.avif",
  },
  {
    city: "Philadelphia",
    country: "USA",
    role: "Investment Office",
    description:
      "Connecting diaspora investors with African opportunities. Financial operations and investor relations.",
    image: "/workers.avif",
  },
];

export default function AboutPresence() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <span className={styles.label}>Global Reach</span>
          <h2 className={styles.title}>
            Three Continents, <span className={styles.accent}>One Vision</span>
          </h2>
          <p className={styles.subtitle}>
            Our strategic presence across Africa and North America enables us to mobilize 
            capital, talent, and expertise for transformative development projects.
          </p>
        </div>

        <div className={styles.grid}>
          {offices.map((office) => (
            <div key={office.city} className={styles.card}>
              <div 
                className={styles.cardImage}
                style={{ backgroundImage: `url('${office.image}')` }}
              >
                <div className={styles.cardOverlay} />
                <span className={styles.cardRole}>{office.role}</span>
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardCity}>{office.city}</h3>
                <span className={styles.cardCountry}>{office.country}</span>
                <p className={styles.cardText}>{office.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Connection Lines Visual */}
        <div className={styles.connections}>
          <div className={styles.connectionLine} />
          <span className={styles.connectionLabel}>Connected Operations</span>
          <div className={styles.connectionLine} />
        </div>
      </div>
    </section>
  );
}