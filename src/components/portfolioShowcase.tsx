"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Project } from "@/lib/supabase";
import styles from "@/styles/portfolioShowcase.module.css";

interface PortfolioShowcaseProps {
  projects: Project[];
}

type CategoryFilter = "All" | "Living" | "Landmarks";
type StatusFilter = "All" | "Planned" | "In Progress" | "Completed";

export default function PortfolioShowcase({ projects }: PortfolioShowcaseProps) {
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("All");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");

  // Filter projects based on selected filters
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const categoryMatch =
        categoryFilter === "All" || project.category === categoryFilter;
      const statusMatch =
        statusFilter === "All" || project.construction_status === statusFilter;
      return categoryMatch && statusMatch;
    });
  }, [projects, categoryFilter, statusFilter]);

  // Count projects by category for tab badges
  const categoryCounts = useMemo(() => {
    return {
      All: projects.length,
      Living: projects.filter((p) => p.category === "Living").length,
      Landmarks: projects.filter((p) => p.category === "Landmarks").length,
    };
  }, [projects]);

  // Get status badge styling
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
        return styles.marketNA;
    }
  };

  return (
    <section className={styles.section}>
      {/* HERO */}
      <div className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={`container ${styles.heroContainer}`}>
          <span className={styles.label}>Our Work</span>
          <h1 className={styles.heroTitle}>
            Project <span className={styles.accent}>Portfolio</span>
          </h1>
          <p className={styles.heroSubtitle}>
            From luxury residences to landmark developments, explore our portfolio 
            of transformative projects across West Africa.
          </p>

          {/* Stats Row */}
          <div className={styles.heroStats}>
            <div className={styles.heroStat}>
              <span className={styles.heroStatNumber}>{projects.length}</span>
              <span className={styles.heroStatLabel}>Total Projects</span>
            </div>
            <div className={styles.heroStatDivider} />
            <div className={styles.heroStat}>
              <span className={styles.heroStatNumber}>
                {projects.filter((p) => p.construction_status === "Completed").length}
              </span>
              <span className={styles.heroStatLabel}>Completed</span>
            </div>
            <div className={styles.heroStatDivider} />
            <div className={styles.heroStat}>
              <span className={styles.heroStatNumber}>
                {projects.filter((p) => p.market_status === "Available").length}
              </span>
              <span className={styles.heroStatLabel}>Available</span>
            </div>
          </div>
        </div>
      </div>

      {/* FILTERS */}
      <div className={styles.filters}>
        <div className={`container ${styles.filtersContainer}`}>
          {/* Category Tabs */}
          <div className={styles.categoryTabs}>
            {(["All", "Living", "Landmarks"] as CategoryFilter[]).map((category) => (
              <button
                key={category}
                className={`${styles.categoryTab} ${
                  categoryFilter === category ? styles.categoryTabActive : ""
                }`}
                onClick={() => setCategoryFilter(category)}
              >
                {category}
                <span className={styles.categoryCount}>
                  {categoryCounts[category]}
                </span>
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div className={styles.statusFilters}>
            <span className={styles.statusLabel}>Status:</span>
            <div className={styles.statusTags}>
              {(["All", "Planned", "In Progress", "Completed"] as StatusFilter[]).map(
                (status) => (
                  <button
                    key={status}
                    className={`${styles.statusTag} ${
                      statusFilter === status ? styles.statusTagActive : ""
                    }`}
                    onClick={() => setStatusFilter(status)}
                  >
                    {status}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* PROJECT GRID */}
      <div className={styles.portfolio}>
        <div className={`container ${styles.portfolioContainer}`}>
          {filteredProjects.length > 0 ? (
            <div className={styles.grid}>
              {filteredProjects.map((project, index) => (
                <Link
                  key={project.id}
                  href={`/portfolio/${project.slug}`}
                  className={`${styles.card} ${
                    index === 0 ? styles.cardFeatured : ""
                  }`}
                >
                  {/* Image */}
                  <div className={styles.cardImageWrapper}>
                    <div
                      className={styles.cardImage}
                      style={{
                        backgroundImage: `url(${
                          project.image_urls?.[0] || "/images/placeholder-project.jpg"
                        })`,
                      }}
                    />
                    <div className={styles.cardOverlay} />

                    {/* Status Badges */}
                    <div className={styles.cardBadges}>
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

                    {/* Category Tag */}
                    <span className={styles.cardCategory}>{project.category}</span>
                  </div>

                  {/* Content */}
                  <div className={styles.cardContent}>
                    <div className={styles.cardHeader}>
                      <h3 className={styles.cardTitle}>{project.title}</h3>
                      {project.location && (
                        <span className={styles.cardLocation}>
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

                    {project.tagline && (
                      <p className={styles.cardTagline}>{project.tagline}</p>
                    )}

                    {/* Stats */}
                    {project.stats && Object.keys(project.stats).length > 0 && (
                      <div className={styles.cardStats}>
                        {Object.entries(project.stats)
                          .slice(0, 3)
                          .map(([key, value]) => (
                            <div key={key} className={styles.cardStat}>
                              <span className={styles.cardStatValue}>{value}</span>
                              <span className={styles.cardStatKey}>{key}</span>
                            </div>
                          ))}
                      </div>
                    )}

                    <span className={styles.cardLink}>
                      View Project
                      <svg
                        className={styles.arrowIcon}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}>◇</span>
              <h3 className={styles.emptyTitle}>No Projects Found</h3>
              <p className={styles.emptyText}>
                No projects match your current filters. Try adjusting your selection.
              </p>
              <button
                className={styles.emptyButton}
                onClick={() => {
                  setCategoryFilter("All");
                  setStatusFilter("All");
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* CTA */}
      <div className={styles.cta}>
        <div className={`container ${styles.ctaContainer}`}>
          <div className={styles.ctaContent}>
            <h3 className={styles.ctaTitle}>
              Interested in <span className={styles.accent}>Partnering?</span>
            </h3>
            <p className={styles.ctaText}>
              Whether you&apos;re an investor, developer, or institution—we&apos;re 
              always looking for partners who share our vision for Africa&apos;s future.
            </p>
            <Link href="/contact" className={`btn btn-primary ${styles.ctaBtn}`}>
              Start a Conversation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}