import styles from "@/styles/aboutValues.module.css";

const values = [
  {
    number: "01",
    title: "Pan-African Vision",
    description:
      "We believe Africa's future must be built by Africans. Our projects prioritize local partnerships, diaspora investment, and sustainable development that benefits communities for generations.",
    icon: "◆",
  },
  {
    number: "02",
    title: "End-to-End Excellence",
    description:
      "From initial concept through final construction, we control every phase of development. Our vertically integrated approach—spanning architecture, engineering, and construction—ensures uncompromising quality.",
    icon: "■",
  },
  {
    number: "03",
    title: "Institutional Integrity",
    description:
      "We operate to the highest international standards. Transparent governance, rigorous financial controls, and meticulous documentation define every engagement with our partners and investors.",
    icon: "●",
  },
];

export default function AboutValues() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <span className={styles.label}>Our Principles</span>
          <h2 className={styles.title}>
            The Foundation of <span className={styles.accent}>Everything We Build</span>
          </h2>
        </div>

        <div className={styles.grid}>
          {values.map((value) => (
            <div key={value.number} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardNumber}>{value.number}</span>
                <span className={styles.cardIcon}>{value.icon}</span>
              </div>
              <h3 className={styles.cardTitle}>{value.title}</h3>
              <p className={styles.cardText}>{value.description}</p>
              <div className={styles.cardAccent} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}