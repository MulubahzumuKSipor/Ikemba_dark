import Link from 'next/link';
import { Job } from '@/types/database';
import styles from '@/styles/careers.module.css';

export default function JobBoard({ jobs }: { jobs: Job[] }) {
  return (
    <div className={styles.grid}>
      {jobs.map((job) => (
        <div key={job.id} className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.department}>{job.department}</span>
            <span className={styles.type}>{job.type}</span>
          </div>

          <div className={styles.cardBody}>
            <h3 className={styles.jobTitle}>{job.title}</h3>
            <div className={styles.locationRow}>
              <span className={styles.locationIcon}>📍</span>
              {job.location}
            </div>
            <p className={styles.previewText}>
              Click to view full description, requirements, and application details.
            </p>
          </div>

          <div className={styles.cardFooter}>
            <Link
              href={`/careers/${job.id}`}
              className={styles.viewBtn}
            >
              View Details &rarr;
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}