import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/server';
import { updateArticle } from '@/lib/news';
import styles from '@/styles/adminNewsForm.module.css';
import RichEditor from '@/components/admin/quillEditor';
import DeleteArticleButton from '@/components/admin/deleteArticle';
import { Article } from '@/types/database';

const Icons = {
  Back: () => <path d="M19 12H5m7 7-7-7 7-7" />,
  Save: () => <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
};

export default async function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: articleData, error } = await supabase
    .from('news')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !articleData) notFound();

  const article = articleData as Article;
  
  const dateValue = article.published_at 
    ? new Date(article.published_at).toISOString().split('T')[0] 
    : '';

  return (
    <div className={styles.container}>
      
      {/* HEADER */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Link href="/admin/news" className={styles.backLink}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.icon}>
              <Icons.Back />
            </svg>
            Cancel & Back
          </Link>
          <h1 className={styles.title}>Edit Article</h1>
        </div>
        
        {/* REPLACED THE OLD FORM WITH THIS COMPONENT */}
        <DeleteArticleButton id={article.id} />
      </div>

      {/* EDIT FORM */}
      <form action={updateArticle} className={styles.formGrid}>
        <input type="hidden" name="id" value={article.id} />

        {/* LEFT COLUMN */}
        <div className={styles.mainColumn}>
          
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Article Headline</label>
            <input 
              type="text" 
              name="title" 
              className={styles.inputLg} 
              defaultValue={article.title}
              required 
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>URL Slug</label>
            <input 
              type="text" 
              name="slug" 
              className={styles.input} 
              defaultValue={article.slug}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Summary / Excerpt</label>
            <textarea 
              name="excerpt" 
              className={styles.textareaShort} 
              defaultValue={article.excerpt || ''}
              required
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Article Content</label>
            <RichEditor 
              name="content" 
              initialValue={article.content || ''} 
              placeholder="Write your article here..." 
            />
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className={styles.sidebarColumn}>
          <div className={styles.sidebarCard}>
            <h3 className={styles.cardTitle}>Publishing Settings</h3>
            
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Category</label>
              <select name="category" className={styles.select} defaultValue={article.category} required>
                <option value="Press Release">Press Release</option>
                <option value="Project Update">Project Update</option>
                <option value="Milestone">Milestone</option>
                <option value="Industry Insight">Industry Insight</option>
              </select>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Publish Date</label>
              <input 
                type="date" 
                name="published_at" 
                className={styles.input} 
                defaultValue={dateValue}
              />
            </div>

            <div className={styles.checkboxGroup}>
              <input 
                type="checkbox" 
                name="is_published" 
                id="is_published" 
                className={styles.checkbox} 
                defaultChecked={article.is_published}
              />
              <label htmlFor="is_published" className={styles.checkboxLabel}>
                Published (Live)
              </label>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Cover Image URL</label>
              <input 
                type="url" 
                name="image_url" 
                className={styles.input} 
                defaultValue={article.image_url || ''}
              />
            </div>

            <div className={styles.separator} />

            <button type="submit" className={styles.submitButton}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.btnIcon}>
                <Icons.Save />
              </svg>
              Save Changes
            </button>

          </div>
        </div>
      </form>
    </div>
  );
}