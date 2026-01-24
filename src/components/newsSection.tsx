'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/news.module.css';

// Define the shape of your data
export type Article = {
  id: string;
  title: string;
  slug: string;
  category: string;
  published_at: string;
  image_url: string;
  excerpt: string;
  is_featured: boolean;
};

export default function NewsSection({ articles }: { articles: Article[] }) {
  const [filter, setFilter] = useState('All');

  // Filter Logic: If 'All', show everything; otherwise match category
  const filteredArticles = articles.filter(article => 
    filter === 'All' ? true : article.category === filter
  );

  return (
    <div className={styles.sectionWrapper}>
      
      {/* 1. THE INTELLIGENCE FILTER (Ticker Style) */}
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

      {/* 2. THE EDITORIAL GRID */}
      <div className={styles.grid}>
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article, index) => {
            // The first article is the "Hero" only if we are viewing 'All'
            const isHero = index === 0 && filter === 'All';
            
            return (
              <Link 
                href={`/news/${article.slug}`} 
                key={article.id} 
                className={`${styles.card} ${isHero ? styles.heroCard : ''}`}
              >
                <div className={styles.imageWrapper}>
                  <Image 
                    src={article.image_url} 
                    alt={article.title} 
                    fill 
                    className={styles.image}
                  />
                  <div className={styles.categoryBadge}>{article.category}</div>
                </div>
                
                <div className={styles.content}>
                  <div className={styles.meta}>
                    <time>
                      {new Date(article.published_at).toLocaleDateString('en-GB', {
                        day: 'numeric', month: 'long', year: 'numeric'
                      })}
                    </time>
                  </div>
                  
                  <h3 className={styles.title}>{article.title}</h3>
                  
                  <p className={styles.excerpt}>
                    {article.excerpt}
                  </p>
                  
                  <span className={styles.readMore}>Read Analysis &rarr;</span>
                </div>
              </Link>
            );
          })
        ) : (
          <div className={styles.emptyState}>
            <p>No updates found for this category.</p>
          </div>
        )}
      </div>
      
    </div>
  );
}