'use client';

import { deleteArticle } from '@/lib/news';
import styles from '@/styles/adminNewsForm.module.css';

const TrashIcon = () => (
  <path d="M3 6h18m-2 0v14c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
);

export default function DeleteArticleButton({ id }: { id: string }) {
  
  const handleSubmit = (e: React.FormEvent) => {
    const isConfirmed = confirm('Are you sure you want to delete this article? This cannot be undone.');
    if (!isConfirmed) {
      e.preventDefault();
    }
  };

  return (
    <form action={deleteArticle} onSubmit={handleSubmit}>
      <input type="hidden" name="id" value={id} />
      <button type="submit" className={styles.deleteLink}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 18, height: 18 }}>
          <TrashIcon />
        </svg>
        Delete Article
      </button>
    </form>
  );
}