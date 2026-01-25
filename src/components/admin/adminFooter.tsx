import styles from '@/styles/adminComponents.module.css';

export default function AdminFooter() {
  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} Ikemba Investment Group. System v2.0</p>
      <span className={styles.status}>● System Active</span>
    </footer>
  );
}