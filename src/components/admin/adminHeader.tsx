import { Profile } from '@/types/database';
import styles from '@/styles/adminComponents.module.css';

// Define the props interface for clarity
interface AdminHeaderProps {
  profile: Profile;
}

export default function AdminHeader({ profile }: AdminHeaderProps) {
  return (
    <header className={styles.header}>
      <h2 className={styles.pageTitle}>Command Center</h2>
      <div className={styles.userBadge}>
        <div className={styles.userInfo}>
          {/* Add fallback text if name is null */}
          <span className={styles.userName}>
            {profile.full_name || 'System User'}
          </span>

          <span className={`${styles.userRole} ${styles[profile.role]}`}>
            {profile.role.replace('_', ' ')}
          </span>
        </div>

        {/* Add fallback initial if name is null */}
        <div className={styles.avatar}>
          {profile.full_name?.[0] || 'U'}
        </div>
      </div>
    </header>
  );
}