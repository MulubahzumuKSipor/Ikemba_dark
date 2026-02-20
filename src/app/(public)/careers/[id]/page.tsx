import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/server';
import styles from '@/styles/jobDetail.module.css';

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  // 1. Fetch Job Data from 'careers' table based on your SQL output
  const { data: job, error } = await supabase
    .from('careers')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !job) {
    notFound();
  }

  // --- THE SPACE SANITIZER ---
  // This cleans the raw HTML from the database by converting all &nbsp; back to ' '
  // It also strips out any hardcoded inline styles that might force a specific width.
  const cleanDescription = job.description
    ? job.description
        .replace(/&nbsp;/g, ' ')
        .replace(/style="[^"]*"/gi, '')
    : 'No description provided.';

  // Parse Requirements (assuming they are stored as a JSON string in SQL)
  let parsedRequirements: string[] = [];
  try {
    parsedRequirements = typeof job.requirements === 'string'
      ? JSON.parse(job.requirements)
      : job.requirements || [];
  } catch (e) {
    console.error("Error parsing requirements:", e);
  }

  const targetEmail = job.application_email || 'careers@ikembagroupintl.com';
  const mailSubject = encodeURIComponent(`Application: ${job.title}`);
  const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${targetEmail}&su=${mailSubject}`;

  return (
    <main className={styles.pageWrapper}>
      
      {/* --- HERO HEADER --- */}
      <header className={styles.header}>
        <div className={`container ${styles.headerContainer}`}>
          <Link href="/careers" className={styles.backLink}>
            &larr; Back to All Openings
          </Link>
          
          <div className={styles.badges}>
            <span className={styles.badgeSolid}>{job.department}</span>
            <span className={styles.badgeOutline}>{job.type}</span>
          </div>
          
          <h1 className={styles.title}>{job.title}</h1>
          <p className={styles.location}>📍 {job.location}</p>
        </div>
      </header>

      {/* --- MAIN CONTENT GRID --- */}
      <section className={`container ${styles.contentGrid}`}>
        
        {/* Left Column: Sanitized Prose Content */}
        <div className={styles.mainColumn}>
          <h2 className={styles.sectionHeading}>The Role</h2>
          
          <div 
            className={styles.richText}
            dangerouslySetInnerHTML={{ __html: cleanDescription }}
          />

          {parsedRequirements.length > 0 && (
            <div className={styles.requirementsSection}>
              <h2 className={styles.sectionHeading}>Key Requirements</h2>
              <ul className={styles.requirementsList}>
                {parsedRequirements.map((req: string, index: number) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column: Sticky Action Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.stickyCard}>
            <h3 className={styles.cardTitle}>Ready to apply?</h3>
            <p className={styles.cardText}>
              Send us an email with your resume and a brief introduction. We review applications on a rolling basis.
            </p>
            
            <a 
              href={mailtoLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.applyBtn}
            >
              Apply via Gmail
            </a>

            <div className={styles.metaInfo}>
              <strong>Job ID:</strong> {job.id.split('-')[0]}<br/>
              <strong>Posted:</strong> {new Date(job.created_at).toLocaleDateString()}
            </div>
          </div>
        </aside>

      </section>
    </main>
  );
}