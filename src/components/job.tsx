'use client';

import { useState } from 'react';
import { Job } from '@/types/database';
import styles from '@/styles/careers.module.css';

export default function JobBoard({ jobs }: { jobs: Job[] }) {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // Close modal when clicking the dark overlay
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) setSelectedJob(null);
  };

  return (
    <>
      {/* --- 1. THE GRID (Preview Cards) --- */}
      <div className={styles.grid}>
        {jobs.map((job) => (
          <div key={job.id} className={styles.card}>
            {/* Card Header */}
            <div className={styles.cardHeader}>
              <span className={styles.department}>{job.department}</span>
              <span className={styles.type}>{job.type}</span>
            </div>
            
            {/* Card Content */}
            <h3 className={styles.jobTitle}>{job.title}</h3>
            <div className={styles.locationRow}>
              <span className={styles.locationIcon}>📍</span>
              {job.location}
            </div>

            <p className={styles.previewText}>
              Click to view full description, requirements, and application details.
            </p>

            {/* Card Action */}
            <button 
              onClick={() => setSelectedJob(job)} 
              className={styles.applyBtn}
            >
              View Details & Apply &rarr;
            </button>
          </div>
        ))}
      </div>

      {/* --- 2. THE MODAL (Detailed View) --- */}
      {selectedJob && (
        <div className={styles.modalOverlay} onClick={handleOverlayClick}>
          <div className={styles.modalContent}>
            
            {/* Modal Header */}
            <div className={styles.modalHeader}>
              <div>
                <span className={styles.modalBadge}>{selectedJob.department}</span>
                <h2 className={styles.modalTitle}>{selectedJob.title}</h2>
                <span className={styles.modalSubtitle}>
                  {selectedJob.location} • {selectedJob.type}
                </span>
              </div>
              <button 
                onClick={() => setSelectedJob(null)}
                className={styles.closeBtn}
              >
                &times;
              </button>
            </div>

            {/* Modal Body */}
            <div className={styles.modalBody}>
              {/* 1. Rich Text Description */}
              <div dangerouslySetInnerHTML={{ __html: selectedJob.description }} />

              {/* 2. Explicit Requirements List (from Array) */}
              {selectedJob.requirements && selectedJob.requirements.length > 0 && (
                <div style={{ marginTop: '2rem' }}>
                  <strong>Key Requirements:</strong>
                  <ul>
                    {selectedJob.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Modal Footer (Gmail Link) */}
            <div className={styles.modalFooter}>
              <a 
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${
                  selectedJob.application_email || 'careers@ikembagroupintl.com'
                }&su=${encodeURIComponent(`Application: ${selectedJob.title}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.modalApplyBtn}
              >
                Apply via Gmail
              </a>
            </div>

          </div>
        </div>
      )}
    </>
  );
}