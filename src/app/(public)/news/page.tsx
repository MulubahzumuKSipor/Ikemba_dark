import { createClient } from '@/lib/server';
import NewsSection, { Article } from '@/components/newsSection';
import styles from '@/styles/news.module.css';

export const metadata = {
  title: 'Market Intelligence | Ikemba Investment Group',
  description: 'Strategic updates, press releases, and real estate insights from West Africa.',
};

export default async function NewsPage() {
  const supabase = await createClient();

  const { data } = await supabase
    .from('news')
    .select('*')
    .eq('is_published', true)
    .order('is_featured', { ascending: false })
    .order('published_at', { ascending: false });

  const allArticles = (data || []) as Article[];

  // 2. FILTER: Keep ONLY AVR related items
  const avrArticles = allArticles.filter((article) => {
    const searchContent = (
      article.title +
      article.slug +
      (article.excerpt || '')
    ).toLowerCase();

    // UPDATED: Check for correct name
    return (
      searchContent.includes('avr') ||
      searchContent.includes('atlantic view residence')
    );
  });

  return (
    <main className={styles.main}>
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

      <section className={styles.feedSection}>
        <div className={styles.container}>
          <NewsSection articles={avrArticles} />
        </div>
      </section>
    </main>
  );
}