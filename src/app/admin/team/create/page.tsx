import Link from 'next/link';
import { createNewUser } from '@/lib/team';
import styles from '@/styles/adminNewsForm.module.css'; // Reusing the form styles

const Icons = {
  Back: () => <path d="M19 12H5m7 7-7-7 7-7" />,
  UserPlus: () => <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M20 8v6M23 11h-6M12 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
};

export default function AddMemberPage() {
  return (
    <div className={styles.container}>
      
      {/* HEADER */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Link href="/admin/team" className={styles.backLink}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.icon}>
              <Icons.Back />
            </svg>
            Back to Team
          </Link>
          <h1 className={styles.title}>Add Team Member</h1>
        </div>
      </div>

      <div className={styles.formGrid}>
        
        {/* Main Form Card */}
        <div className={styles.mainColumn}>
          <div className={styles.sidebarCard} style={{ position: 'static' }}>
            
            <form action={createNewUser}>
              
              <h3 className={styles.cardTitle}>Account Credentials</h3>
              
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Full Name</label>
                <input name="full_name" type="text" className={styles.input} required placeholder="e.g. Sarah Johnson" />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Email Address</label>
                <input name="email" type="email" className={styles.input} required placeholder="sarah@ikemba.com" />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Temporary Password</label>
                <input name="password" type="text" className={styles.input} required placeholder="Generate a strong password..." minLength={6} />
                <span className={styles.hint}>Share this with the user securely. They can change it later.</span>
              </div>

              <div className={styles.separator} />

              <h3 className={styles.cardTitle}>Role & Permissions</h3>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Job Title</label>
                <input name="job_title" type="text" className={styles.input} placeholder="e.g. Senior Analyst" />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Access Level</label>
                <select name="role" className={styles.select} required>
                  <option value="staff">Staff (View Only / Basic Edit)</option>
                  <option value="admin">Admin (Full Control)</option>
                  <option value="super_admin">Super Admin (Can manage team)</option>
                </select>
              </div>

              <div className={styles.separator} />

              <button type="submit" className={styles.submitButton}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.btnIcon}>
                  <Icons.UserPlus />
                </svg>
                Create Account
              </button>

            </form>

          </div>
        </div>

        {/* Info Sidebar */}
        <div className={styles.sidebarColumn}>
          <div className={styles.sidebarCard}>
            <h3 className={styles.cardTitle}>Access Guidelines</h3>
            <p style={{ color: '#94A3B8', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1rem' }}>
              <strong>Super Admin:</strong> Can manage team members, change roles, and has full access to all system data.
            </p>
            <p style={{ color: '#94A3B8', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1rem' }}>
              <strong>Admin:</strong> Can manage content (News, Careers, Projects) and view all leads. Cannot delete other admins.
            </p>
            <p style={{ color: '#94A3B8', fontSize: '0.9rem', lineHeight: '1.6' }}>
              <strong>Staff:</strong> Restricted access. Can view leads and update basic status. Cannot delete records.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}