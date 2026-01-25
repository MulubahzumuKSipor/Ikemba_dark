'use client';

import { useState } from 'react';
import { createClient } from '@/lib/client'; // Use your CLIENT-SIDE supabase helper
import styles from '@/styles/adminUpload.module.css';

interface ImageUploadProps {
  name: string; // The form field name (e.g., "image_url")
  defaultValue?: string | null;
  bucket: string; // e.g. "news"
}

export default function ImageUpload({ name, defaultValue, bucket }: ImageUploadProps) {
  const [imageUrl, setImageUrl] = useState<string>(defaultValue || '');
  const [isUploading, setIsUploading] = useState(false);
  const supabase = createClient();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setIsUploading(true);
      
      const file = e.target.files?.[0];
      if (!file) return;

      // 1. Generate unique file path
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;

      // 2. Upload to Supabase
      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 3. Get Public URL
      const { data } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      setImageUrl(data.publicUrl);

    } catch (error) {
      console.error('Upload failed:', error);
      alert('Error uploading image');
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = () => {
    setImageUrl('');
    // Note: We don't delete from storage immediately to prevent accidental data loss 
    // if the user cancels the form edit.
  };

  return (
    <div className={styles.container}>
      {/* HIDDEN INPUT: This sends the URL to your Server Action */}
      <input type="hidden" name={name} value={imageUrl} />

      {!imageUrl ? (
        // UPLOAD STATE
        <div className={styles.uploadBox}>
          <label className={styles.uploadLabel}>
            {isUploading ? (
              <span className={styles.spinner} />
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.icon}>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                </svg>
                <span>Click to Upload Image</span>
              </>
            )}
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleUpload} 
              disabled={isUploading}
              className={styles.hiddenInput} 
            />
          </label>
        </div>
      ) : (
        // PREVIEW STATE
        <div className={styles.previewBox}>
          <img src={imageUrl} alt="Preview" className={styles.imagePreview} />
          
          <div className={styles.overlay}>
             <button type="button" onClick={removeImage} className={styles.removeBtn}>
               Remove Image
             </button>
          </div>
        </div>
      )}
    </div>
  );
}