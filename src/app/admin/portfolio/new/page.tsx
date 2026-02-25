"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/client";
import styles from "@/styles/adminPortfolio.module.css";

// --- STRICT TYPES UPDATED TO MATCH SQL CONSTRAINTS ---
type ProjectCategory = "Residential" | "Commercial";
type ConstructionStatus = "Planned" | "Under Construction" | "Completed";

interface ProjectFormData {
  title: string;
  slug: string;
  category: ProjectCategory;
  construction_status: ConstructionStatus;
  location: string;
  tagline: string;
  description: string;
}

export default function NewProjectAdmin() {
  const router = useRouter();
  const supabase = createClient();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // --- DEFAULT STATE UPDATED ---
  const [formData, setFormData] = useState<ProjectFormData>({
    title: "",
    slug: "",
    category: "Residential",
    construction_status: "Planned",
    location: "",
    tagline: "",
    description: "",
  });

  const [imageUrls, setImageUrls] = useState<string[]>([]);

  // --- SUPABASE STORAGE UPLOAD ---
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      const fileExt = file.name.split('.').pop() || 'jpg';
      const uniqueFileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('project-images')
        .upload(uniqueFileName, file, { cacheControl: '3600', upsert: false });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('project-images')
        .getPublicUrl(uniqueFileName);

      setImageUrls((prev) => [...prev, publicUrl]);

    } catch (err: any) {
      setError(`Image upload failed: ${err.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (indexToRemove: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== indexToRemove));
  };

  // --- SUBMIT TO DATABASE ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const { error: dbError } = await supabase
      .from("projects")
      .insert([{
        ...formData,
        image_urls: imageUrls
      } as any]);

    if (dbError) {
      setError(dbError.message);
      setIsSubmitting(false);
    } else {
      router.push("/admin/portfolio");
      router.refresh();
    }
  };

  return (
    <main className={styles.adminMain}>
      <div className={`container ${styles.adminContainer}`}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Add New Project</h1>
            <p className={styles.subtitle}>Create a new portfolio entry.</p>
          </div>
          <button onClick={() => router.push("/admin/portfolio")} className={styles.cancelBtn}>
            Cancel
          </button>
        </div>

        {error && <div className={styles.errorMessage}>Error: {error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* BASIC INFO */}
          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>Basic Information</h3>
            <div className={styles.inputGroup}>
              <label>Project Title *</label>
              <input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="e.g., Tri-Buchanan Development" />
            </div>
            <div className={styles.inputGroup}>
              <label>URL Slug *</label>
              <input type="text" required value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} placeholder="e.g., tri-buchanan" />
            </div>

            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label>Category</label>
                <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value as ProjectCategory})}>
                  {/* --- SELECT OPTIONS UPDATED --- */}
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label>Construction Status</label>
                <select value={formData.construction_status} onChange={(e) => setFormData({...formData, construction_status: e.target.value as ConstructionStatus})}>
                  {/* --- SELECT OPTIONS UPDATED --- */}
                  <option value="Planned">Planned</option>
                  <option value="Under Construction">Under Construction</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
            <div className={styles.inputGroup}>
              <label>Location</label>
              <input type="text" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} placeholder="e.g., Buchanan, Liberia" />
            </div>
          </div>

          {/* PROJECT IMAGES */}
          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>Project Images</h3>
            <p className={styles.helpText}>The first image uploaded will serve as the Hero background.</p>
            
            <div className={styles.imageGalleryGrid}>
              {imageUrls.map((url, index) => (
                <div key={index} className={styles.uploadedImageWrapper}>
                  <Image src={url} alt={`Uploaded ${index}`} fill unoptimized className={styles.previewImage} />
                  <button type="button" onClick={() => removeImage(index)} className={styles.removeImgBadge} aria-label="Remove image">✕</button>
                  {index === 0 && <span className={styles.heroBadge}>Hero</span>}
                </div>
              ))}
            </div>

            <label className={`${styles.addBtn} ${isUploading ? styles.uploading : ''}`}>
              {isUploading ? 'Uploading to server...' : '+ Upload New Image'}
              <input
                type="file"
                accept="image/png, image/jpeg, image/webp, image/avif"
                style={{ display: 'none' }}
                onChange={handleFileUpload}
                disabled={isUploading}
              />
            </label>
          </div>

          {/* DETAILS */}
          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>Details</h3>
            <div className={styles.inputGroup}>
              <label>Tagline</label>
              <input type="text" value={formData.tagline} onChange={(e) => setFormData({...formData, tagline: e.target.value})} />
            </div>
            <div className={styles.inputGroup}>
              <label>Full Description</label>
              <textarea rows={6} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
            </div>
          </div>

          {/* SUBMIT */}
          <div className={styles.submitRow}>
            <button type="submit" disabled={isSubmitting || isUploading} className={styles.submitBtn}>
              {isSubmitting ? "Publishing..." : "Publish Project"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}