import styles from '@/styles/leadership.module.css';

const leaders = [
  {
    name: 'Bleejay Innis',
    role: 'CEO',
    image: '/CEO.avif' 
  },
  {
    name: 'Imari Sekajipo',
    role: 'COO',
    image: '/COO1.avif'
  },
  {
    name: 'Samuel Adabie',
    role: 'CCO',
    image: '/CCO.avif'
  }
];

export default function Leadership() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.container}`}>
        
        {/* HEADER */}
        <div className={styles.header}>
          <span className={styles.label}>Executive Team</span>
          <h2 className={styles.title}>Leadership</h2>
        </div>

        {/* TEAM GRID */}
        <div className={styles.grid}>
          {leaders.map((leader, index) => (
            <div key={leader.name} className={styles.leaderCard}>
                <div className={styles.imageWrapper}>
                    <div
                    className={styles.portrait}
                    style={{ backgroundImage: `url(${leader.image})` }}
                    />
                </div>
                <div className={styles.info}>
                    <h3 className={styles.name}>{leader.name}</h3>
                    <p className={styles.role}>{leader.role}</p>
                </div>
            </div>

          ))}
        </div>

        {/* LARGE STATEMENT FOOTER */}
        <div className={styles.footer}>
          <p className={styles.tagline}>
            &ldquo;Building the future of Africa together&rdquo;
          </p>
          <div className={styles.divider} />
        </div>

      </div>
    </section>
  );
}