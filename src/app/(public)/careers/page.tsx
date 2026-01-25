import { createClient } from '@/lib/server';
import { Job } from '@/types/database';
import styles from '@/styles/careers.module.css';

export const metadata = {
  title: 'Careers | Ikemba Investment Group',
  description: 'Join our team of architects, engineers, and visionaries building the future of Africa.',
};

export default async function CareersPage() {
  const supabase = await createClient();

  // 1. SECURE FETCH: Only Active Jobs
  const { data } = await supabase
    .from('careers')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  // 2. CASTING
  const jobs = (data || []) as unknown as Job[];

  return (
    <main className={styles.main}>
      
      {/* HEADER */}
      <section className={styles.header}>
        <div className="container">
          <span className={styles.label}>Join the Firm</span>
          <h1 className={styles.pageTitle}>
            Build the <span className={styles.gold}>Future.</span>
          </h1>
          <p className={styles.subtitle}>
            We are looking for exceptional talent to lead our projects in Liberia, 
            Ghana, and beyond. If you strive for accuracy, speed, and quality, 
            you belong here.
          </p>
        </div>
      </section>

      {/* JOBS GRID */}
      <section className={styles.jobsSection}>
        <div className="container">
          {jobs.length > 0 ? (
            <div className={styles.grid}>
              {jobs.map((job) => (
                <div key={job.id} className={styles.card}>
                  <div className={styles.cardHeader}>
                    <span className={styles.department}>{job.department}</span>
                    <span className={styles.type}>{job.type}</span>
                  </div>
                  
                  <h3 className={styles.jobTitle}>{job.title}</h3>
                  <div className={styles.locationRow}>
                    <span className={styles.locationIcon}>📍</span>
                    {job.location}
                  </div>
                  
                  <p className={styles.description}>{job.description}</p>
                  
                  <div className={styles.requirements}>
                    <span className={styles.reqLabel}>Key Requirements:</span>
                    <ul>
                      {job.requirements.slice(0, 3).map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  <a 
                    href={`mailto:${job.application_email || 'careers@ikembagroupintl.com'}?subject=Application for ${job.title}`} 
                    className={styles.applyBtn}
                  >
                    Apply for Position &rarr;
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <h3>No Open Positions</h3>
              <p>We are not currently hiring, but we are always interested in meeting exceptional talent.</p>
              <a href="mailto:info@ikembagroupintl.com" className={styles.link}>Send us your CV</a>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}