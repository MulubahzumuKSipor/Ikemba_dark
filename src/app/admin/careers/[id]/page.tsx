import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/server';
import { updateJob } from '@/lib/career';
import styles from '@/styles/adminNewsForm.module.css'; // Reusing styles
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

  return (
    <div className={styles.container}>

      {/* HEADER */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Link href="/admin/careers" className={styles.backLink}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.icon}>
              <Icons.Back />
            </svg>
            Cancel & Back
          </Link>
          <h1 className={styles.title}>Edit Job Posting</h1>
        </div>

        {/* DELETE BUTTON */}
        <DeleteJobButton id={job.id} />
      </div>

      {/* EDIT FORM */}
      <form action={updateJob} className={styles.formGrid}>
        <input type="hidden" name="id" value={job.id} />

        {/* LEFT COLUMN: Description */}
        <div className={styles.mainColumn}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Job Title</label>
            <input
              name="title"
              type="text"
              className={styles.inputLg}
              defaultValue={job.title}
              required
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Job Description & Requirements</label>
            {/* Populates the editor with existing HTML */}
            <RichEditor
              name="description"
              initialValue={job.description}
              placeholder="Detail the role responsibilities..."
            />
          </div>
        </div>

        {/* RIGHT COLUMN: Meta Data */}
        <div className={styles.sidebarColumn}>
          <div className={styles.sidebarCard}>
            <h3 className={styles.cardTitle}>Job Details</h3>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Department</label>
              <select name="department" className={styles.select} defaultValue={job.department} required>
                <option value="Engineering">Engineering</option>
                <option value="Operations">Operations</option>
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

            <div className={styles.separator} />

            <button type="submit" className={styles.submitButton}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.btnIcon}>
                <Icons.Save />
              </svg>
              Save Changes
            </button>

          </div>
        </div>
      </form>
    </div>
  );
}