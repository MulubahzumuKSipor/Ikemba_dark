import Link from 'next/link';
import { createJob } from '@/lib/career';
import RichEditor from '@/components/admin/quillEditor';
import styles from '@/styles/adminNewsForm.module.css';

const Icons = {
  Back: () => <path d="M19 12H5m7 7-7-7 7-7" />,
  Briefcase: () => <path d="M20 7h-3a2 2 0 0 0-2-2h-6a2 2 0 0 0-2 2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
};

export default function CreateJobPage() {
  return (
    <div className={styles.container}>
      
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Link href="/admin/careers" className={styles.backLink}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.icon}>
              <Icons.Back />
            </svg>
            Back to Careers
          </Link>
          <h1 className={styles.title}>Post New Job</h1>
        </div>
      </div>

      <form action={createJob} className={styles.formGrid}>
        
        {/* LEFT: Description */}
        <div className={styles.mainColumn}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Job Title</label>
            <input name="title" type="text" className={styles.inputLg} placeholder="e.g. Senior Project Manager" required />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Job Description & Requirements</label>
            <RichEditor 
              name="description"
              placeholder="Detail the role responsibilities, required skills, and benefits..." 
            />
          </div>
        </div>

        {/* RIGHT: Meta Data */}
        <div className={styles.sidebarColumn}>
          <div className={styles.sidebarCard}>
            <h3 className={styles.cardTitle}>Job Details</h3>
            
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Department</label>
              <select name="department" className={styles.select} required>
                <option value="Engineering">Engineering</option>
                <option value="Operations">Operations</option>
                <option value="Finance">Finance</option>
                <option value="Marketing">Marketing</option>
                <option value="Executive">Executive</option>
              </select>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Location</label>
              <input name="location" type="text" className={styles.input} placeholder="e.g. Monrovia, Liberia" required />
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Employment Type</label>
              <select name="type" className={styles.select} required>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div className={styles.checkboxGroup}>
              <input type="checkbox" name="is_active" id="is_active" className={styles.checkbox} defaultChecked />
              <label htmlFor="is_active" className={styles.checkboxLabel}>Publish Immediately</label>
            </div>

            <div className={styles.separator} />

            <button type="submit" className={styles.submitButton}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.btnIcon}>
                <Icons.Briefcase />
              </svg>
              Post Job
            </button>

          </div>
        </div>
      </form>
    </div>
  );
}