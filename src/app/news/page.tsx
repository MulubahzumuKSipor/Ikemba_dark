import { createClient } from '@/lib/server';
import NewsSection, { Article } from '@/components/newsSection';
import styles from '@/styles/news.module.css';

export const metadata = {
  title: 'Market Intelligence | Ikemba Investment Group',
  description: 'Strategic updates, press releases, and real estate insights from West Africa.',
};

export default async function NewsPage() {
  const supabase = await createClient();

  // 1. SECURE FETCH: Only get published news
  const { data } = await supabase
    .from('news')
    .select('*')
    .eq('is_published', true)
    .order('is_featured', { ascending: false }) // Pinned items first
    .order('published_at', { ascending: false }); // Newest items next

  // Cast data to our strict Type
  const articles = (data || []) as Article[];

  

  return (
    <main className={styles.main}>
      {/* 2. STATIC HEADER (Good for SEO) */}
      <section className={styles.header}>
        <div className="container">
          <span className={styles.label}>Corporate Communications</span>
          <h1 className={styles.pageTitle}>
            Market <span className={styles.gold}>Intelligence.</span>
          </h1>
          <p className={styles.subtitle}>
            Updates on our developments, strategic partnerships, and 
            insights into the West African real estate landscape.
          </p>
        </div>
      </section>

      {/* 3. INTERACTIVE SECTION */}
      <section className={styles.feedSection}>
        <div className="container">
          <NewsSection articles={articles} />
        </div>
      </section>
    </main>
  );
}