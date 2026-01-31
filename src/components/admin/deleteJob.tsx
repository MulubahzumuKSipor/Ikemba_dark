'use client';

import { deleteJob } from '@/lib/career';
import styles from '@/styles/adminNewsForm.module.css'; 

const TrashIcon = () => (
  <path d="M3 6h18m-2 0v14c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
);

export default function DeleteJobButton({ id }: { id: string }) {
  // FIX: Bind the ID to the server action here.
  // This creates a function that takes the ID automatically, fixing the Type error.
  const deleteJobWithId = deleteJob.bind(null, id);

  const handleSubmit = (e: React.FormEvent) => {
    const isConfirmed = confirm('Are you sure you want to delete this job posting?');
    if (!isConfirmed) {
      e.preventDefault();
    }
  };

  return (
    // FIX: Use the bound action 'deleteJobWithId'
    <form action={deleteJobWithId} onSubmit={handleSubmit}>
      {/* We removed the <input type="hidden"> because .bind handles the ID now */}

      <button type="submit" className={styles.deleteLink}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 18, height: 18 }}>
          <TrashIcon />
        </svg>
        Delete Job
      </button>
    </form>
  );
}