import Link from 'next/link';
import { createClient } from '@/lib/server';
import { Career } from '@/types/database'; // You might need to add this type
import { toggleJobStatus, deleteJob } from '@/lib/career';
import styles from '@/styles/adminCareers.module.css';

// --- SERVER ACTIONS COMPONENTS ---


async function StatusToggle({ id, isActive }: { id: string, isActive: boolean }) {
  'use server';
  return (
    <form action={async () => {
      'use server';
      await toggleJobStatus(id, isActive);
    }}>
      <button
        type="submit"
        className={`${styles.statusBadge} ${isActive ? styles.active : styles.closed}`}
      >
        <span className={styles.dot} />
        {isActive ? 'Open' : 'Closed'}
      </button>
    </form>
  );
}

async function DeleteButton({ id }: { id: string }) {
  'use server';
  return (
    <form action={deleteJob}>
      <input type="hidden" name="id" value={id} />
      <button type="submit" className={styles.deleteBtn}>
        Delete
      </button>
    </form>
  );
}

// --- MAIN PAGE ---
export default async function CareersPage() {
  const supabase = await createClient();

  const { data: jobs, error } = await supabase
    .from('careers')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) console.error(error);

  const careerList = (jobs || []) as unknown as Career[];

  return (
    <div className={styles.container}>

      {/* HEADER */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Talent Acquisition</h1>
          <p className={styles.subtitle}>Manage job listings and recruitment status.</p>
        </div>
        <Link href="/admin/careers/create" className={styles.createButton}>
          + Post New Job
        </Link>
      </div>

      {/* JOBS GRID */}
      <div className={styles.grid}>
        {careerList.map((job) => (
          <div key={job.id} className={styles.card}>

            <div className={styles.cardHeader}>
              <div className={styles.roleInfo}>
                <h3 className={styles.jobTitle}>{job.title}</h3>
                <span className={styles.meta}>
                  {job.department} • {job.location} • {job.type}
                </span>
              </div>
              <StatusToggle id={job.id} isActive={job.is_active} />
            </div>

            <div className={styles.cardFooter}>
              <span className={styles.date}>
                Posted: {new Date(job.created_at).toLocaleDateString()}
              </span>
              <div className={styles.actions}>
                <Link href={`/admin/careers/${job.id}`} className={styles.editLink}>
                  Edit
                </Link>
                <DeleteButton id={job.id} />
              </div>
            </div>
          </div>
        ))}

        {careerList.length === 0 && (
          <div className={styles.emptyState}>
            <p>No active job postings. Click &quot;Post New Job&quot; to start recruiting.</p>
          </div>
        )}
      </div>
    </div>
  );
}