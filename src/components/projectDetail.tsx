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
  const images = project.image_urls?.length > 0 
    ? project.image_urls 
    : ["/images/placeholder-project.jpg"];

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Completed":
        return styles.statusCompleted;
      case "In Progress":
        return styles.statusInProgress;
      case "Planned":
        return styles.statusPlanned;
      default:
        return "";
    }
  };

  const getMarketStatusClass = (status: string) => {
    switch (status) {
      case "Available":
        return styles.marketAvailable;
      case "Sold":
        return styles.marketSold;
      case "Leased":
        return styles.marketLeased;
      default:
        return "";
    }
  };

  return (
    <section className={styles.section}>
      {/* HERO */}
      <div className={styles.hero}>
        <div
          className={styles.heroImage}
          style={{ backgroundImage: `url(${images[activeImageIndex]})` }}
        />
        <div className={styles.heroOverlay} />

        <div className={`container ${styles.heroContainer}`}>
          {/* Breadcrumb */}
          <nav className={styles.breadcrumb}>
            <Link href="/portfolio" className={styles.breadcrumbLink}>
              Portfolio
            </Link>
            <span className={styles.breadcrumbSep}>/</span>
            <span className={styles.breadcrumbCurrent}>{project.title}</span>
          </nav>

          {/* Project Title */}
          <div className={styles.heroContent}>
            <div className={styles.heroBadges}>
              <span
                className={`${styles.badge} ${getStatusClass(
                  project.construction_status
                )}`}
              >
                {project.construction_status}
              </span>
              {project.market_status !== "Not Applicable" && (
                <span
                  className={`${styles.badge} ${getMarketStatusClass(
                    project.market_status
                  )}`}
                >
                  {project.market_status}
                </span>
              )}
            </div>

            <h1 className={styles.heroTitle}>{project.title}</h1>

            {project.tagline && (
              <p className={styles.heroTagline}>{project.tagline}</p>
            )}

            {project.location && (
              <span className={styles.heroLocation}>
                <svg
                  className={styles.locationIcon}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {project.location}
              </span>
            )}
          </div>

          {/* Image Thumbnails */}
          {images.length > 1 && (
            <div className={styles.heroThumbnails}>
              {images.map((img, index) => (
                <button
                  key={index}
                  className={`${styles.thumbnail} ${
                    index === activeImageIndex ? styles.thumbnailActive : ""
                  }`}
                  onClick={() => setActiveImageIndex(index)}
                  style={{ backgroundImage: `url(${img})` }}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* DETAILS */}
      <div className={styles.details}>
        <div className={`container ${styles.detailsContainer}`}>
          <div className={styles.detailsGrid}>
            {/* Main Content */}
            <div className={styles.mainContent}>
              <div className={styles.descriptionSection}>
                <h2 className={styles.sectionTitle}>About This Project</h2>
                <p className={styles.description}>
                  {project.description ||
                    "Detailed project information coming soon. This development represents our commitment to quality construction and innovative design across Africa."}
                </p>
              </div>

              {/* Features */}
              {project.features && project.features.length > 0 && (
                <div className={styles.featuresSection}>
                  <h3 className={styles.sectionSubtitle}>Key Features</h3>
                  <ul className={styles.featuresList}>
                    {project.features.map((feature, index) => (
                      <li key={index} className={styles.featureItem}>
                        <span className={styles.featureBullet}>◆</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className={styles.sidebar}>
              {/* Quick Stats */}
              <div className={styles.statsCard}>
                <h3 className={styles.statsTitle}>Project Details</h3>

                <div className={styles.statsGrid}>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Category</span>
                    <span className={styles.statValue}>{project.category}</span>
                  </div>

                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Status</span>
                    <span className={styles.statValue}>
                      {project.construction_status}
                    </span>
                  </div>

                  {project.location && (
                    <div className={styles.statItem}>
                      <span className={styles.statLabel}>Location</span>
                      <span className={styles.statValue}>{project.location}</span>
                    </div>
                  )}

                  {project.stats &&
                    Object.entries(project.stats).map(([key, value]) => (
                      <div key={key} className={styles.statItem}>
                        <span className={styles.statLabel}>{key}</span>
                        <span className={styles.statValue}>{value}</span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Inquiry CTA */}
              <div className={styles.inquiryCard}>
                <h3 className={styles.inquiryTitle}>Interested?</h3>
                <p className={styles.inquiryText}>
                  {project.market_status === "Available"
                    ? "This property is currently available. Contact us to schedule a viewing or learn more."
                    : "Contact us to discuss similar opportunities or future projects."}
                </p>
                <Link
                  href={`/contact?project=${encodeURIComponent(project.title)}`}
                  className={`btn btn-primary ${styles.inquiryBtn}`}
                >
                  Inquire Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* IMAGE GALLERY */}
      {images.length > 1 && (
        <div className={styles.gallery}>
          <div className={`container ${styles.galleryContainer}`}>
            <h2 className={styles.galleryTitle}>Project Gallery</h2>
            <div className={styles.galleryGrid}>
              {images.map((img, index) => (
                <button
                  key={index}
                  className={styles.galleryItem}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <div
                    className={styles.galleryImage}
                    style={{ backgroundImage: `url(${img})` }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* RELATED PROJECTS */}
      {relatedProjects.length > 0 && (
        <div className={styles.related}>
          <div className={`container ${styles.relatedContainer}`}>
            <div className={styles.relatedHeader}>
              <h2 className={styles.relatedTitle}>
                More in <span className={styles.accent}>{project.category}</span>
              </h2>
              <Link href="/portfolio" className={styles.relatedLink}>
                View All Projects
                <svg
                  className={styles.arrowIcon}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className={styles.relatedGrid}>
              {relatedProjects.map((related) => (
                <Link
                  key={related.id}
                  href={`/portfolio/${related.slug}`}
                  className={styles.relatedCard}
                >
                  <div
                    className={styles.relatedImage}
                    style={{
                      backgroundImage: `url(${
                        related.image_urls?.[0] || "/images/placeholder-project.jpg"
                      })`,
                    }}
                  />
                  <div className={styles.relatedContent}>
                    <h3 className={styles.relatedCardTitle}>{related.title}</h3>
                    {related.location && (
                      <span className={styles.relatedLocation}>
                        {related.location}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* BACK LINK */}
      <div className={styles.backSection}>
        <div className={`container ${styles.backContainer}`}>
          <Link href="/portfolio" className={styles.backLink}>
            <svg
              className={styles.backIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Portfolio
          </Link>
        </div>
      </div>
    </section>
  );
}