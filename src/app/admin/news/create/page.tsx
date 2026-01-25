import Link from 'next/link';
import { createArticle } from '@/lib/news';
import styles from '@/styles/adminNewsForm.module.css';
import RichEditor from '@/components/admin/quillEditor'; // <--- Import the Editor

// Icons
const Icons = {
  Back: () => <path d="M19 12H5m7 7-7-7 7-7" />,
  Save: () => <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
};

export default function CreateNewsPage() {
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
          <h1 className={styles.title}>New Article</h1>
        </div>
      </div>

      {/* EDITOR FORM */}
      <form action={createArticle} className={styles.formGrid}>
        
        {/* LEFT COLUMN: Main Content */}
        <div className={styles.mainColumn}>
          
          {/* Title */}
          <div className={styles.fieldGroup}>
            <label htmlFor="title" className={styles.label}>Article Headline</label>
            <input 
              type="text" 
              id="title" 
              name="title" 
              className={styles.inputLg} 
              placeholder="Enter an engaging headline..." 
              required 
            />
          </div>

          {/* Slug (Optional) */}
          <div className={styles.fieldGroup}>
            <label htmlFor="slug" className={styles.label}>URL Slug (Optional)</label>
            <input 
              type="text" 
              id="slug" 
              name="slug" 
              className={styles.input} 
              placeholder="auto-generated-from-title" 
            />
            <span className={styles.hint}>Leave blank to auto-generate from headline.</span>
          </div>

          {/* Excerpt (Keep as plain text for SEO/Previews) */}
          <div className={styles.fieldGroup}>
            <label htmlFor="excerpt" className={styles.label}>Summary / Excerpt</label>
            <textarea 
              id="excerpt" 
              name="excerpt" 
              className={styles.textareaShort} 
              placeholder="A brief summary for card previews (Plain text only)..."
              required
            />
          </div>

          {/* Main Content (RICH TEXT EDITOR) */}
          <div className={styles.fieldGroup}>
            <label htmlFor="content" className={styles.label}>Article Content</label>

            {/* The RichEditor handles the "content" field via a hidden input */}
            <RichEditor
              name="content" 
              placeholder="Write your article here using the rich text tools..."
            />

          </div>

        </div>

        {/* RIGHT COLUMN: Metadata & Settings */}
        <div className={styles.sidebarColumn}>
          
          <div className={styles.sidebarCard}>
            <h3 className={styles.cardTitle}>Publishing Settings</h3>
            
            {/* Category */}
            <div className={styles.fieldGroup}>
              <label htmlFor="category" className={styles.label}>Category</label>
              <select id="category" name="category" className={styles.select} required>
                <option value="" disabled defaultValue="">Select Category...</option>
                <option value="Press Release">Press Release</option>
                <option value="Project Update">Project Update</option>
                <option value="Milestone">Milestone</option>
                <option value="Industry Insight">Industry Insight</option>
              </select>
            </div>

            {/* Publish Date */}
            <div className={styles.fieldGroup}>
              <label htmlFor="published_at" className={styles.label}>Publish Date</label>
              <input 
                type="date" 
                id="published_at" 
                name="published_at" 
                className={styles.input} 
              />
            </div>

            {/* Published Toggle */}
            <div className={styles.checkboxGroup}>
              <input 
                type="checkbox" 
                id="is_published" 
                name="is_published" 
                className={styles.checkbox} 
              />
              <label htmlFor="is_published" className={styles.checkboxLabel}>
                Publish Immediately
              </label>
            </div>

            {/* Image URL */}
            <div className={styles.fieldGroup}>
              <label htmlFor="image_url" className={styles.label}>Cover Image URL</label>
              <input 
                type="url" 
                id="image_url" 
                name="image_url" 
                className={styles.input} 
                placeholder="https://..." 
              />
            </div>

            <div className={styles.separator} />

            {/* Submit Button */}
            <button type="submit" className={styles.submitButton}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.btnIcon}>
                <Icons.Save />
              </svg>
              Save Article
            </button>

          </div>
        </div>

      </form>
    </div>
  );
}