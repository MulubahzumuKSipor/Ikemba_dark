import Link from 'next/link';
import { createClient } from '@/lib/server';
import { Article } from '@/types/database';
import styles from '@/styles/adminNews.module.css';

// Helper to format dates
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

export default async function NewsPage() {
  const supabase = await createClient();

  // 1. Fetch Articles (Newest First)
  const { data: newsData, error } = await supabase
    .from('news')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) console.error('Error fetching news:', error);

  const articles = (newsData || []) as unknown as Article[];

  return (
    <div className={styles.container}>
      
      {/* HEADER */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Market Intelligence</h1>
          <p className={styles.subtitle}>Publish press releases and project updates.</p>
        </div>
        <Link href="/admin/news/create" className={styles.createButton}>
          + New Article
        </Link>
      </div>

      {/* DATA GRID */}
      <div className={styles.card}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.thStatus}>Status</th>
              <th className={styles.thTitle}>Headline</th>
              <th>Category</th>
              <th>Published Date</th>
              <th className={styles.thAction}>Action</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => {
              const isPublished = article.is_published;
              
              return (
                <tr key={article.id} className={styles.row}>
                  
                  {/* Status Badge */}
                  <td>
                    <span className={`${styles.badge} ${isPublished ? styles.published : styles.draft}`}>
                      {isPublished ? 'Live' : 'Draft'}
                    </span>
                  </td>

                  {/* Headline & Excerpt */}
                  <td>
                    <div className={styles.titleWrapper}>
                      <span className={styles.headline}>{article.title}</span>
                      <span className={styles.excerpt}>{article.excerpt || 'No excerpt provided...'}</span>
                    </div>
                  </td>

                  {/* Category */}
                  <td>
                    <span className={styles.categoryTag}>{article.category}</span>
                  </td>

                  {/* Date */}
                  <td className={styles.dateCell}>
                    {article.published_at ? formatDate(article.published_at) : '—'}
                  </td>

                  {/* Action */}
                  <td className={styles.actionCell}>
                    <Link href={`/admin/news/${article.id}`} className={styles.editLink}>
                      Edit
                    </Link>
                  </td>
                </tr>
              );
            })}

            {/* Empty State */}
            {articles.length === 0 && (
              <tr>
                <td colSpan={5} className={styles.emptyState}>
                  <p>No articles found. Start writing your first post.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}