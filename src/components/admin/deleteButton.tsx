'use client';

import { deleteLead } from '@/lib/leads';
import styles from '@/styles/adminLeadDetail.module.css';

const TrashIcon = () => (
  <path d="M3 6h18m-2 0v14c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
);

export default function DeleteLeadButton({ id }: { id: string }) {
  const handleSubmit = (e: React.FormEvent) => {
    const isConfirmed = confirm('Are you sure you want to permanently delete this message?');
    if (!isConfirmed) {
      e.preventDefault(); // Stop the form if they click Cancel
    }
  };

  return (
    <form action={deleteLead} onSubmit={handleSubmit}>
      <input type="hidden" name="id" value={id} />
      <button type="submit" className={styles.deleteBtn}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.btnIcon}>
          <TrashIcon />
        </svg>
        Delete
      </button>
    </form>
  );
}