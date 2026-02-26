"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/lib/supabase";
import styles from "@/styles/projectDetail.module.css";

interface ProjectDetailProps {
  project: Project;
  relatedProjects: Project[];
}

export default function ProjectDetail({
  project,
  relatedProjects,
}: ProjectDetailProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const images = project.image_urls?.length > 0 
    ? project.image_urls 
    : ["/images/placeholder-project.jpg"];

  // --- MODAL NAVIGATION LOGIC ---
  const handleNextImage = useCallback(() => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrevImage = useCallback(() => {
    setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      if (e.key === "Escape") setIsModalOpen(false);
      if (e.key === "ArrowRight") handleNextImage();
      if (e.key === "ArrowLeft") handlePrevImage();
    };

    window.addEventListener("keydown", handleKeyDown);

    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen, handleNextImage, handlePrevImage]);

  // FIX 1: Updated to match strict SQL constraints
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Completed": return styles.statusCompleted;
      case "Under Construction": return styles.statusInProgress;
      case "Planned": return styles.statusPlanned;
      default: return styles.statusDefault;
    }
  };

  const openModal = (index: number) => {
    setActiveImageIndex(index);
    setIsModalOpen(true);
  };

  // FIX 2: Sanitize description to prevent layout blowouts and render HTML properly
  const cleanDescription = project.description
    ? project.description.replace(/&nbsp;/g, ' ').replace(/style="[^"]*"/gi, '')
    : '';

  return (
    <div className={styles.pageWrapper}>

      {/* --- 1. HERO HEADER --- */}
      <header className={styles.header}>
        <div
          className={styles.headerBackground}
          style={{ backgroundImage: `url(${images[activeImageIndex]})` }}
        />
        <div className={styles.headerOverlay} />

        <div className={`container ${styles.headerContainer}`}>
          <nav className={styles.breadcrumbs}>
            <Link href="/portfolio">Portfolio</Link>
            <span className={styles.separator}>/</span>
            <span className={styles.current}>{project.category}</span>
          </nav>

          <div className={styles.headerContent}>
            <div className={styles.badges}>
              <span className={`${styles.badge} ${getStatusStyle(project.construction_status)}`}>
                {project.construction_status}
              </span>
              {project.market_status && project.market_status !== "Not Applicable" && (
                <span className={`${styles.badge} ${styles.marketBadge}`}>
                  {project.market_status}
                </span>
              )}
            </div>
            <h1 className={styles.title}>{project.title}</h1>
            {project.location && (
              <p className={styles.location}>
                <span className={styles.icon}>📍</span> {project.location}
              </p>
            )}
          </div>
        </div>
      </header>

      {/* --- 2. MAIN CONTENT GRID --- */}
      <section className={styles.contentSection}>
        <div className={`container ${styles.gridContainer}`}>

          <div className={styles.mainColumn}>
            {project.tagline && (
              <h2 className={styles.tagline}>{project.tagline}</h2>
            )}

            <div className={styles.description}>
              <h3 className={styles.sectionLabel}>The Project</h3>

              {/* FIX 2 Applied: Safe HTML Injection */}
              {cleanDescription ? (
                 <div
                   className={styles.richText}
                   dangerouslySetInnerHTML={{ __html: cleanDescription }}
                 />
              ) : (
                <p>Project details regarding this development are currently being updated.</p>
              )}
            </div>
            <br />
            <br />

            {project.features && project.features.length > 0 && (
              <div className={styles.features}>
                <h3 className={styles.sectionLabel}>Key Features</h3>
                <ul className={styles.featureList}>
                  {project.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* --- VISUAL GALLERY (Triggers Modal) --- */}
            {images.length > 0 && (
              <div className={styles.gallery}>
                <h3 className={styles.sectionLabel}>Visual Gallery</h3>
                <div className={styles.galleryGrid}>
                  {images.map((img, index) => (
                    <button
                      key={index}
                      className={`${styles.galleryItem} ${activeImageIndex === index ? styles.activeGalleryItem : ''}`}
                      onClick={() => openModal(index)}
                      aria-label={`View full image ${index + 1}`}
                    >
                      <div
                        className={styles.galleryImage}
                        style={{ backgroundImage: `url(${img})` }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className={styles.sidebarColumn}>
            <div className={styles.stickyCard}>
              <h3 className={styles.cardTitle}>Project Data</h3>
              <div className={styles.dataRow}>
                <span className={styles.dataLabel}>Type</span>
                <span className={styles.dataValue}>{project.category}</span>
              </div>
              <div className={styles.dataRow}>
                <span className={styles.dataLabel}>Status</span>
                <span className={styles.dataValue}>{project.construction_status}</span>
              </div>

              {/* Added safe check for object entries */}
              {project.stats && typeof project.stats === 'object' && Object.entries(project.stats).map(([key, value]) => (
                <div key={key} className={styles.dataRow}>
                  <span className={styles.dataLabel}>{key}</span>
                  <span className={styles.dataValue}>{String(value)}</span>
                </div>
              ))}

              <div className={styles.divider} />
              <div className={styles.inquirySection}>
                <p className={styles.inquiryText}>Interested in this development?</p>
                <Link href={`/contact?project=${encodeURIComponent(project.title)}`} className={styles.inquiryButton}>
                  Request Information
                </Link>
              </div>
            </div>
          </aside>

        </div>
      </section>

      {/* --- 3. RELATED PROJECTS FOOTER --- */}
      {relatedProjects.length > 0 && (
        <section className={styles.relatedSection}>
          <div className={`container ${styles.relatedContainer}`}>
            <h3 className={styles.relatedHeading}>More in {project.category}</h3>
            <div className={styles.relatedGrid}>
              {relatedProjects.map((p) => (
                <Link key={p.id} href={`/portfolio/${p.slug}`} className={styles.relatedCard}>
                  <div
                    className={styles.relatedImage}
                    style={{ backgroundImage: `url(${p.image_urls?.[0] || '/images/placeholder-project.jpg'})` }}
                  />
                  <div className={styles.relatedInfo}>
                    <h4>{p.title}</h4>
                    <span>{p.location}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* --- 4. FULLSCREEN LIGHTBOX MODAL --- */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <button className={styles.closeModalBtn} onClick={() => setIsModalOpen(false)} aria-label="Close modal">
            ✕
          </button>

          {images.length > 1 && (
            <button
              className={`${styles.modalNavBtn} ${styles.prevBtn}`}
              onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
              aria-label="Previous image"
            >
              &#10094;
            </button>
          )}

          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[activeImageIndex]}
              alt={`${project.title} - Image ${activeImageIndex + 1}`}
              fill
              className={styles.modalImage}
              unoptimized
              priority
            />
          </div>

          {images.length > 1 && (
            <button
              className={`${styles.modalNavBtn} ${styles.nextBtn}`}
              onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
              aria-label="Next image"
            >
              &#10095;
            </button>
          )}

          <div className={styles.modalCounter}>
            {activeImageIndex + 1} / {images.length}
          </div>
        </div>
      )}

    </div>
  );
}