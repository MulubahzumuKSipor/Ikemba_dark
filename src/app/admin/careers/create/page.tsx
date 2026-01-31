'use client';

import Link from 'next/link';
import { createJob } from '@/lib/career';
import RichEditor from '@/components/admin/quillEditor';
import styles from '@/styles/adminCareerForm.module.css';

const Icons = {
  Back: () => <path d="M19 12H5m7 7-7-7 7-7" />,
  Briefcase: () => <path d="M20 7h-3a2 2 0 0 0-2-2h-6a2 2 0 0 0-2 2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
};

export default function CreateJobPage() {
  return (
    <div className={styles.container}>
      
      {/* HEADER */}
      <div className={styles.header}>
        <Link href="/admin/careers" className={styles.backLink}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <Icons.Back />
          </svg>
          Back to Talent Acquisition
        </Link>
        <h1 className={styles.title}>Post New Opportunity</h1>
      </div>

      <form action={createJob} className={styles.formGrid}>
        
        {/* LEFT COLUMN: Main Content */}
        <div>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Position Title</label>
            <input
              name="title"
              type="text"
              className={styles.inputLg}
              placeholder="e.g. Senior Project Architect"
              required
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Job Overview</label>
            <p className={styles.hint}>
              Describe the role, responsibilities, and team culture.
            </p>
            {/* Make sure RichEditor outputs to a name="description" field,
                or use a hidden input synced to state if needed. */}
            <RichEditor 
              name="description"
              placeholder="Start typing the job description..."
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Key Requirements</label>
            <p className={styles.hint}>
              List requirements one per line. These will be formatted as bullet points.
            </p>
            <textarea
              name="requirements"
              className={styles.textarea}
              rows={8}
              placeholder="• Bachelor's Degree in Civil Engineering&#10;• 5+ years of site management&#10;• Proficiency in AutoCAD"
              required
            />
          </div>
        </div>

        {/* RIGHT COLUMN: Sidebar Metadata */}
        <div className={styles.sidebarCard}>
          <h3 className={styles.cardTitle}>Role Details</h3>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Department</label>
            <select name="department" className={styles.select} required>
              <option value="Construction">Construction</option>
              <option value="Design">Design</option>
              <option value="Engineering">Engineering</option>
              <option value="Operations">Operations</option>
              <option value="Legal">Legal</option>
              <option value="Finance">Finance</option>
              <option value="Marketing">Marketing</option>
              <option value="Executive">Executive</option>
            </select>
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Location</label>
            <input
              name="location"
              type="text"
              className={styles.input}
              placeholder="e.g. Monrovia, Liberia"
              required
            />
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

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Application Email</label>
            <input
              name="application_email"
              type="email"
              className={styles.input}
              defaultValue="careers@ikembagroupintl.com"
              required
            />
          </div>

          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              name="is_active"
              id="is_active"
              className={styles.checkbox}
              defaultChecked
            />
            <label htmlFor="is_active" className={styles.checkboxLabel}>
              Publish Immediately
            </label>
          </div>

          <button type="submit" className={styles.submitButton}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <Icons.Briefcase />
            </svg>
            Post Position
          </button>
        </div>

      </form>
    </div>
  );
}