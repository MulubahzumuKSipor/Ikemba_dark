"use client";

import { useState } from "react";
import Link from "next/link";
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

  // Fallback if no images exist
  const images = project.image_urls?.length > 0 
    ? project.image_urls 
    : ["/images/placeholder-project.jpg"];

  // Helper for Status Badge Colors
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Completed": return styles.statusCompleted;
      case "In Progress": return styles.statusInProgress;
      case "Planned": return styles.statusPlanned;
      default: return styles.statusDefault;
    }
  };

  return (
    <div className={styles.pageWrapper}>

      {/* --- 1. HERO HEADER --- */}
      <header className={styles.header}>
        <div
          className={styles.headerBackground}
          style={{ backgroundImage: `url(${images[0]})` }}
        />
        <div className={styles.headerOverlay} />

        <div className={`container ${styles.headerContainer}`}>
          {/* Breadcrumbs */}
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

          {/* LEFT COLUMN: Narrative & Features */}
          <div className={styles.mainColumn}>

            {/* Tagline / Intro */}
            {project.tagline && (
              <h2 className={styles.tagline}>{project.tagline}</h2>
            )}

            {/* Description */}
            <div className={styles.description}>
              <h3 className={styles.sectionLabel}>The Project</h3>
              <p>{project.description || "Project details regarding this development are currently being updated. Please contact our team for specific inquiries."}</p>
            </div>

            {/* Features List */}
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

            {/* Image Gallery (Grid Layout) */}
            {images.length > 0 && (
              <div className={styles.gallery}>
                <h3 className={styles.sectionLabel}>Visual Gallery</h3>
                <div className={styles.galleryGrid}>
                  {images.map((img, index) => (
                    <div
                      key={index}
                      className={styles.galleryItem}
                      onClick={() => setActiveImageIndex(index)}
                    >
                      <div
                        className={styles.galleryImage}
                        style={{ backgroundImage: `url(${img})` }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Sticky Sidebar */}
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

              {/* Dynamic Stats */}
              {project.stats && Object.entries(project.stats).map(([key, value]) => (
                <div key={key} className={styles.dataRow}>
                  <span className={styles.dataLabel}>{key}</span>
                  <span className={styles.dataValue}>{String(value)}</span>
                </div>
              ))}

              <div className={styles.divider} />

              {/* CTA */}
              <div className={styles.inquirySection}>
                <p className={styles.inquiryText}>
                  Interested in this development?
                </p>
                <Link
                  href={`/contact?project=${encodeURIComponent(project.title)}`}
                  className={styles.inquiryButton}
                >
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
    </div>
  );
}