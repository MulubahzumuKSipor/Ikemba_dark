'use client';

import { useActionState } from 'react';
import { submitLead, ActionState } from '@/lib/action'; // Ensure this path matches your file
import styles from '@/styles/contactForm.module.css';

const initialState: ActionState = {
  message: '',
  status: 'idle',
};

// --- CUSTOM ARCHITECTURAL ICONS ---
// These replace the "AI-looking" emojis with bespoke SVG geometry.

const Icons = {
  Chart: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 3v18h18" />
      <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
    </svg>
  ),
  House: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  Pillar: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 4h12M6 20h12" />
      <path d="M8 4v16M16 4v16" />
      <path d="M4 2h16M4 22h16" />
    </svg>
  ),
  Handshake: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20 12l-4-4-6 6-4-4" />
      <path d="M4 12l4 4 6-6 4 4" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  ),
};

const INTENT_OPTIONS = [
  { label: 'Real Estate Investment', value: 'Investor', icon: <Icons.Chart /> },
  { label: 'Private Residence', value: 'Homeowner', icon: <Icons.House /> },
  { label: 'Institutional Project', value: 'Institution', icon: <Icons.Pillar /> },
  { label: 'General Consultation', value: 'General Inquiry', icon: <Icons.Handshake /> },
];

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitLead, initialState);

  return (
    <form action={formAction} className={styles.form}>
      
      {/* 1. INTENT SELECTOR */}
      <div className={styles.sectionBlock}>
        <label className={styles.fieldLabel}>I am interested in...</label>
        <div className={styles.radioGrid}>
          {INTENT_OPTIONS.map((option) => (
            <label key={option.value} className={styles.radioCard}>
              <input 
                type="radio" 
                name="client_type" 
                value={option.value} 
                required 
                defaultChecked={option.value === 'Investor'}
                className={styles.radioInput}
              />
              <div className={styles.radioContent}>
                <span className={styles.radioIcon}>{option.icon}</span>
                <span className={styles.radioLabel}>{option.label}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* 2. CONTACT DETAILS */}
      <div className={styles.sectionBlock}>
        <label className={styles.fieldLabel}>Contact Details</label>
        <div className={styles.row}>
          <input 
            type="text" 
            name="full_name" 
            placeholder="Full Name" 
            className={styles.input} 
            required 
          />
          <input 
            type="email" 
            name="email" 
            placeholder="Email Address" 
            className={styles.input} 
            required 
          />
        </div>
        <input 
          type="tel" 
          name="phone" 
          placeholder="Phone Number" 
          className={styles.input} 
        />
      </div>

      {/* 3. THE VISION */}
      <div className={styles.sectionBlock}>
        <label className={styles.fieldLabel}>Project Vision</label>
        <textarea 
          name="message" 
          placeholder="Tell us about your project goals, location preferences, or specific requirements..." 
          className={styles.textarea} 
          required
        ></textarea>
      </div>

      {/* 4. FEEDBACK & ACTION */}
      <div className={styles.actionRow}>
        {state.status !== 'idle' && (
          <div className={`${styles.alert} ${styles[state.status]}`}>
            {state.status === 'success' && '✦ '}
            {state.message}
          </div>
        )}

        <button 
          type="submit" 
          className={styles.submitBtn} 
          disabled={isPending}
        >
          {isPending ? 'Processing...' : 'Request Consultation →'}
        </button>
      </div>
      
      <p className={styles.disclaimer}>
        By submitting this form, you agree to our privacy policy.
      </p>
    </form>
  );
}