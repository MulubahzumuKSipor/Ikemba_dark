import Link from 'next/link';
import styles from '@/styles/leadership.module.css';

// Added IDs to match the LeadershipShowcase data
const leaders = [
  {
    id: 'bleejay',
    name: 'Bleejay Innis',
    role: 'CEO',
    image: '/CEO.avif' 
  },
  {
    id: 'imari',
    name: 'Imari Sekajipo',
    role: 'COO',
    image: '/COO1.avif'
  },
  {
    id: 'samuel',
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
          {leaders.map((leader) => (
            <Link
              key={leader.id}
              href={`/leadership?id=${leader.id}`} // Pass the ID in the URL
              className={styles.leaderCard}
            >
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
            </Link>
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