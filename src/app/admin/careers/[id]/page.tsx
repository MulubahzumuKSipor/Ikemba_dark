import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/server';
import { updateJob } from '@/lib/career';
import styles from '@/styles/adminCareerForm.module.css';
import RichEditor from '@/components/admin/quillEditor';
import DeleteJobButton from '@/components/admin/deleteJob';
import { Career } from '@/types/database';

const Icons = {
  Back: () => <path d="M19 12H5m7 7-7-7 7-7" />,
  Save: () => <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
};

export default async function EditJobPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  // 1. Fetch Job
  const { data: jobData, error } = await supabase
    .from('careers')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !jobData) {
    notFound();
  }

  const job = jobData as Career;

  const requirementsString = Array.isArray(job.requirements)
    ? job.requirements.join('\n')
    : '';

  return (
    <div className={styles.container}>

      {/* HEADER */}
      <div className={styles.header}>
        <Link href="/admin/careers" className={styles.backLink}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <Icons.Back />
          </svg>
          Cancel & Back
        </Link>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 className={styles.title}>Edit Position</h1>
          {/* DELETE BUTTON */}
          <DeleteJobButton id={job.id} />
        </div>
      </div>

      {/* EDIT FORM */}
      <form action={updateJob} className={styles.formGrid}>
        <input type="hidden" name="id" value={job.id} />

        {/* LEFT COLUMN: Content */}
        <div>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Position Title</label>
            <input
              name="title"
              type="text"
              className={styles.inputLg}
              defaultValue={job.title}
              required
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Job Overview</label>
            <p className={styles.hint}>Overview of the role, team culture, and responsibilities.</p>
            <RichEditor
              name="description"
              initialValue={job.description}
              placeholder="Detail the role responsibilities..."
            />
          </div>

          {/* NEW FIELD: Requirements (Textarea) */}
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Key Requirements</label>
            <p className={styles.hint}>Edit requirements (one per line).</p>
            <textarea
              name="requirements"
              className={styles.textarea}
              rows={8}
              defaultValue={requirementsString}
              placeholder="• Bachelor's Degree&#10;• 5+ years experience"
              required
            />
          </div>
        </div>

        {/* RIGHT COLUMN: Sidebar Metadata */}
        <div className={styles.sidebarCard}>
          <h3 className={styles.cardTitle}>Role Details</h3>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Department</label>
            <select name="department" className={styles.select} defaultValue={job.department} required>
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
              defaultValue={job.location}
              required
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Employment Type</label>
            <select name="type" className={styles.select} defaultValue={job.type} required>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          {/* NEW FIELD: Application Email */}
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Application Email</label>
            <input
              name="application_email"
              type="email"
              className={styles.input}
              defaultValue={job.application_email || 'careers@ikembagroupintl.com'}
              required
            />
          </div>

          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              name="is_active"
              id="is_active"
              className={styles.checkbox}
              defaultChecked={job.is_active}
            />
            <label htmlFor="is_active" className={styles.checkboxLabel}>Publish Immediately</label>
          </div>

          <button type="submit" className={styles.submitButton}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <Icons.Save />
            </svg>
            Save Changes
          </button>

        </div>
      </form>
    </div>
  );
}