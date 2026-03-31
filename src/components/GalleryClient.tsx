"use client";

import { useState, useMemo } from "react";
import styles from "@/styles/gallery.module.css";

// Updated Type to handle the "Album" structure
type GalleryProject = {
  title: string;
  category: string;
  slug: string;
  coverImage: string;
  allImages: string[];
};

interface GalleryClientProps {
  projects: GalleryProject[];
}

export default function GalleryClient({ projects }: GalleryClientProps) {
  const [filter, setFilter] = useState("All");

  // Lightbox State now tracks the currently active project and which image index is showing
  const [lightbox, setLightbox] = useState<{
    project: GalleryProject;
    currentIndex: number;
  } | null>(null);

  const filteredProjects = useMemo(() => {
    if (filter === "All") return projects;
    return projects.filter((proj) => proj.category === filter);
  }, [projects, filter]);

  const categories = ["All", "Residential", "Commercial"];

  // --- LIGHTBOX LOGIC ---
  const openLightbox = (project: GalleryProject) => {
    // Open the modal and set the carousel to start at the first image (index 0)
    setLightbox({ project, currentIndex: 0 });
  };

  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents the modal from closing
    if (lightbox) {
      setLightbox({
        ...lightbox,
        currentIndex: (lightbox.currentIndex + 1) % lightbox.project.allImages.length,
      });
    }
  };

  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightbox) {
      setLightbox({
        ...lightbox,
        currentIndex:
          (lightbox.currentIndex - 1 + lightbox.project.allImages.length) %
          lightbox.project.allImages.length,
      });
    }
  };

  return (
    <section className={styles.section}>
      {/* HERO */}
      <div className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={`container ${styles.heroContainer}`}>
          <span className={styles.label}>Visuals</span>
          <h1 className={styles.heroTitle}>
            Project <span className={styles.accent}>Gallery</span>
          </h1>
          <p className={styles.heroSubtitle}>
            A curated collection of architectural photography, interiors, and 
            renderings from our flagship developments.
          </p>
        </div>
      </div>

      {/* FILTERS */}
      <div className={styles.filters}>
        <div className={`container ${styles.filtersContainer}`}>
          <div className={styles.categoryTabs}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`${styles.categoryTab} ${
                  filter === cat ? styles.categoryTabActive : ""
                }`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* MASONRY GRID (ALBUM COVERS) */}
      <div className={styles.gallery}>
        <div className={`container ${styles.galleryContainer}`}>
          {filteredProjects.length > 0 ? (
            <div className={styles.masonryGrid}>
              {filteredProjects.map((proj) => (
                <div
                  key={proj.slug}
                  className={styles.masonryItem}
                  onClick={() => openLightbox(proj)}
                >
                  <img
                    src={proj.coverImage}
                    alt={`${proj.title} Cover`}
                    className={styles.image} 
                    loading="lazy" 
                  />
                  <div className={styles.imageOverlay}>
                    <span className={styles.imageCaption}>{proj.title}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}>◇</span>
              <h3 className={styles.emptyTitle}>No Images Found</h3>
            </div>
          )}
        </div>
      </div>

      {/* LIGHTBOX MODAL WITH CAROUSEL */}
      {lightbox && (
        <div className={styles.lightbox} onClick={() => setLightbox(null)}>
          <button className={styles.closeBtn} onClick={() => setLightbox(null)}>✕</button>

          {/* Previous Arrow (Only show if project has more than 1 image) */}
          {lightbox.project.allImages.length > 1 && (
            <button className={`${styles.navBtn} ${styles.prevBtn}`} onClick={prevImg}>
              ‹
            </button>
          )}

          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <img
              src={lightbox.project.allImages[lightbox.currentIndex]}
              alt={lightbox.project.title}
              className={styles.lightboxImage} 
            />
            <div className={styles.lightboxCaption}>
              <h3>{lightbox.project.title}</h3>
              <div className={styles.lightboxMeta}>
                <span>{lightbox.project.category}</span>
                {lightbox.project.allImages.length > 1 && (
                  <span className={styles.imageCounter}>
                    {lightbox.currentIndex + 1} / {lightbox.project.allImages.length}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Next Arrow */}
          {lightbox.project.allImages.length > 1 && (
            <button className={`${styles.navBtn} ${styles.nextBtn}`} onClick={nextImg}>
              ›
            </button>
          )}
        </div>
      )}
    </section>
  );
}