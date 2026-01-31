import { createClient } from '@/lib/server';
import { Job } from '@/types/database';
import JobBoard from '@/components/job'; // Import the new component
import styles from '@/styles/careers.module.css';

export const metadata = {
  title: 'Careers | Ikemba Investment Group',
  description: 'Join our team of architects, engineers, and visionaries.',
};

export default async function CareersPage() {
  const supabase = await createClient();

  const { data } = await supabase
    .from('careers')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  const jobs = (data || []) as unknown as Job[];

  return (
    <main className={styles.main}>
      <section className={styles.header}>
        <div className="container">
          <span className={styles.label}>Join the Firm</span>
          <h1 className={styles.pageTitle}>Build the <span className={styles.gold}>Future.</span></h1>
          <p className={styles.subtitle}>
            We are looking for exceptional talent to lead our projects in Liberia, Ghana, and beyond.
          </p>
        </div>
      </section>

      <section className={styles.jobsSection}>
        <div className="container">
          {jobs.length > 0 ? (
            <JobBoard jobs={jobs} />
          ) : (
             <div className={styles.emptyState}>
               <h3>No Open Positions</h3>
               <p>We are not currently hiring.</p>
             </div>
          )}
        </div>
      </section>
    </main>
  );
}