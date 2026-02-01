import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@/lib/server';
import { Article } from '@/types/database';
import styles from '@/styles/article.module.css';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// 1. DYNAMIC SEO
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();
  
  const { data: article } = await supabase
    .from('news')
    .select('title, excerpt')
    .eq('slug', slug)
    .single();

  if (!article) return { title: 'Article Not Found' };

  return {
    title: `${article.title} | Ikemba Market Intelligence`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  // 2. SECURE FETCH
  const { data } = await supabase
    .from('news')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (!data) return notFound();

  // 3. TYPE SAFE CASTING
  const article = data as unknown as Article;

  return (
    <main className={styles.main}>
      <article className={styles.articleContainer}>
        
        {/* EDITORIAL HEADER */}
        <header className={styles.header}>
          <div className={styles.metaRow}>
            <span className={styles.category}>{article.category}</span>
            <span className={styles.separator}>—</span>
            <time className={styles.date}>
              {new Date(article.published_at || '').toLocaleDateString('en-GB', {
                day: 'numeric', month: 'long', year: 'numeric'
              })}
            </time>
          </div>

          <h1 className={styles.headline}>{article.title}</h1>
          
          {article.excerpt && (
            <p className={styles.leadParagraph}>{article.excerpt}</p>
          )}
        </header>

        {/* CINEMATIC HERO IMAGE */}
        <div className={styles.heroImageWrapper}>
          <Image 
            src={article.image_url || '/images/placeholder.jpg'} 
            alt={article.title}
            fill
            className={styles.heroImage}
            priority
          />
        </div>

        {/* THE READING COLUMN */}
        {/* FIX: Render HTML correctly using dangerouslySetInnerHTML */}
        <div
          className={styles.contentBody}
          dangerouslySetInnerHTML={{ __html: article.content || '' }}
        />

        {/* FOOTER NAVIGATION */}
        <footer className={styles.footer}>
          <Link href="/news" className={styles.backLink}>
            ← Return to Market Intelligence
          </Link>
        </footer>

      </article>
    </main>
  );
}