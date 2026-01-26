'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/news.module.css';

// 1. FIX: Allow nullable fields to match Supabase
export type Article = {
  id: string;
  title: string;
  slug: string;
  category: string;
  published_at: string | null;
  image_url: string | null;
  excerpt: string | null;
  is_featured: boolean;
};

interface NewsGridProps {
  articles: Article[];
  variant?: 'full' | 'home';
}

export default function NewsGrid({ articles, variant = 'full' }: NewsGridProps) {
  const [filter, setFilter] = useState('All');
  const isHome = variant === 'home';

  let displayedArticles = articles;

  if (!isHome) {
    displayedArticles = articles.filter(article =>
      filter === 'All' ? true : article.category === filter
    );
  }

  if (isHome) {
    displayedArticles = displayedArticles.slice(0, 3);
  }

  return (
    <div className={styles.sectionWrapper}>
      
      {/* HEADER LOGIC (Unchanged) */}
      {isHome ? (
        <div className={styles.homeHeader}>
          <div>
             <span className={styles.label}>Market Intelligence</span>
             <h2 className={styles.homeTitle}>Latest <span className={styles.accent}>Insights</span></h2>
          </div>
          <Link href="/news" className={styles.viewAllBtn}>
            View All News &rarr;
          </Link>
        </div>
      ) : (
        <div className={styles.filterBar}>
          {['All', 'Press Release', 'Project Update', 'Milestone', 'Industry Insight'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`${styles.filterBtn} ${filter === cat ? styles.active : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* GRID */}
      <div className={styles.grid}>
        {displayedArticles.length > 0 ? (
          displayedArticles.map((article, index) => {
            const isHero = !isHome && index === 0 && filter === 'All';
            
            // 2. FIX: specific fallback for the date
            // If published_at is null, we don't crash.
            const dateString = article.published_at
              ? new Date(article.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
              : 'Recently Added';

            // 3. FIX: specific fallback for image
            const imageSrc = article.image_url || '/placeholder-news.jpg';

            return (
              <Link
                href={`/news/${article.slug}`}
                key={article.id}
                className={`${styles.card} ${isHero ? styles.heroCard : ''}`}
              >
                <div className={styles.imageWrapper}>
                  <Image
                    src={imageSrc}
                    alt={article.title}
                    fill
                    className={styles.image}
                  />
                  <div className={styles.categoryBadge}>{article.category}</div>
                </div>

                <div className={styles.content}>
                  <div className={styles.meta}>
                    <time>{dateString}</time>
                  </div>

                  <h3 className={styles.title}>{article.title}</h3>

                  <p className={styles.excerpt}>
                    {article.excerpt || ''}
                  </p>

                  <span className={styles.readMore}>Read Analysis &rarr;</span>
                </div>
              </Link>
            );
          })
        ) : (
          <div className={styles.emptyState}>
            <p>No updates found.</p>
          </div>
        )}
      </div>

      {isHome && (
        <div className={styles.mobileViewAll}>
           <Link href="/news" className={styles.btnSecondary}>View All News</Link>
        </div>
      )}

    </div>
  );
}