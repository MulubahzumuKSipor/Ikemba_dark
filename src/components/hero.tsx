'use client'; // <--- Required for interactivity

import { useState, useRef } from 'react';
import Link from 'next/link';
import styles from '@/styles/hero.module.css';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleAudio = () => {
    if (videoRef.current) {
      // Toggle the actual video element property
      videoRef.current.muted = !videoRef.current.muted;
      // Update the React state to switch the icon
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section className={styles.hero}>
      
      {/* 1. BACKGROUND VIDEO */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted // Default start state
        playsInline
        className={styles.bgVideo}
        poster="/ghana_ins_campus.avif"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* 2. AUDIO TOGGLE BUTTON */}
      <button
        onClick={toggleAudio}
        className={styles.audioBtn}
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        {isMuted ? (
          // Muted Icon (Speaker with X)
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          // Sound On Icon (Speaker with Waves)
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        )}
      </button>

      {/* <div className={styles.overlay} />
      <div className={`container ${styles.content}`}>
         ... (Your commented out content) ...
      </div>
      */}

      {/* 4. SCROLL INDICATOR */}
      <div className={styles.scrollIndicator}>
        <div className={styles.mouse}>
          <div className={styles.wheel} />
        </div>
      </div>
    </section>
  );
}