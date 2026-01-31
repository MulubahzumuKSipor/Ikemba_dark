'use client';

import { useState } from 'react';
import { Job } from '@/types/database';
import styles from '@/styles/careers.module.css';

export default function JobBoard({ jobs }: { jobs: Job[] }) {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // Helper to close modal on background click
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) setSelectedJob(null);
  };

  return (
    <>
      {/* 1. THE GRID */}
      <div className={styles.grid}>
        {jobs.map((job) => (
          <div key={job.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.department}>{job.department}</span>
              <span className={styles.type}>{job.type}</span>
            </div>
            
            <h3 className={styles.jobTitle}>{job.title}</h3>
            <div className={styles.locationRow}>
              <span className={styles.locationIcon}>📍</span>
              {job.location}
            </div>

            {/* Preview text (Optional: Truncated plain text) */}
            <p className={styles.previewText}>
              Click below to view full requirements and application details.
            </p>

            <button 
              onClick={() => setSelectedJob(job)} 
              className={styles.applyBtn}
            >
              View Details & Apply &rarr;
            </button>
          </div>
        ))}
      </div>

      {/* 2. THE MODAL */}
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

            {/* Scrollable Description */}
            <div 
              className={styles.modalBody}
              dangerouslySetInnerHTML={{ __html: selectedJob.description }} 
            />

            {/* Modal Footer */}
            <div className={styles.modalFooter}>
              <a 
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${
                  selectedJob.application_email || 'isekajipo@ikembagroupintl.com'
                }&su=${encodeURIComponent(`Application for ${selectedJob.title}`)}`}
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