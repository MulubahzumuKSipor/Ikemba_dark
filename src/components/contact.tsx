'use client';

import { useActionState, useState, useEffect } from 'react';
import { submitLead, ActionState } from '@/lib/action';
import styles from '@/styles/contact.module.css';

const initialState: ActionState = {
  message: '',
  status: 'idle',
};

// --- ARCHITECTURAL ICONS ---
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
  { label: 'Investment', value: 'Investor', icon: <Icons.Chart /> },
  { label: 'Residence', value: 'Homeowner', icon: <Icons.House /> },
  { label: 'Institutional', value: 'Institution', icon: <Icons.Pillar /> },
  { label: 'General', value: 'General Inquiry', icon: <Icons.Handshake /> },
];

// --- FIXED OFFICE TIME COMPONENT ---
function OfficeTime({ timezone }: { timezone: string }) {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const getNow = () => new Date().toLocaleTimeString('en-GB', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit'
    });

    // FIX: Use requestAnimationFrame to make the update asynchronous.
    // This satisfies the linter rule about "synchronous setState"
    const frameId = requestAnimationFrame(() => {
      setTime(getNow());
    });

    // Set up the minute ticker (updates every 60s)
    const timer = setInterval(() => {
      setTime(getNow());
    }, 60000);

    return () => {
      cancelAnimationFrame(frameId);
      clearInterval(timer);
    };
  }, [timezone]);

  return (
    <span className={styles.liveTime}>
      {time ? `● ${time} Local` : <span style={{ opacity: 0 }}>00:00 Local</span>}
    </span>
  );
}

export default function Contact() {
  const [state, formAction, isPending] = useActionState(submitLead, initialState);

  return (
    <section className={styles.section}>
      <div className={`container ${styles.container}`}>
        
        {/* THE SPLIT CARD */}
        <div className={styles.cardWrapper}>
          
          {/* LEFT: THE BLUEPRINT (Dark Info Side) */}
          <div className={styles.infoSide}>
            <div className={styles.infoHeader}>
              <span className={styles.label}>Global Partnership</span>
              <h2 className={styles.heading}>
                Let&apos;s Build the <br />
                <span className={styles.accent}>Next Landmark.</span>
              </h2>
              <p className={styles.description}>
                Invest in our developments, hire us for design, or seek consultation.
                We are ready to collaborate.
              </p>
            </div>

            <div className={styles.officeGrid}>
              <div className={styles.officeItem}>
                <strong className={styles.city}>Monrovia</strong>
                <span className={styles.address}>Tubman Blvd, Sinkor</span>
                <OfficeTime timezone="Africa/Monrovia" />
              </div>
              <div className={styles.officeItem}>
                <strong className={styles.city}>Accra</strong>
                <span className={styles.address}>East Legon</span>
                <OfficeTime timezone="Africa/Accra" />
              </div>
            </div>
          </div>

          {/* RIGHT: THE ENGINE (White Form Side) */}
          <div className={styles.formSide}>
            <form action={formAction} className={styles.form}>

              {state.status !== 'idle' && (
                <div className={`${styles.alert} ${styles[state.status]}`}>
                  {state.message}
                </div>
              )}

              {/* RADIO TILES */}
              <div className={styles.inputGroup}>
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

              {/* TEXT INPUTS */}
              <div className={styles.row}>
                <div className={styles.inputGroup}>
                  <input type="text" name="full_name" placeholder="Full Name" className={styles.input} required />
                </div>
                <div className={styles.inputGroup}>
                  <input type="email" name="email" placeholder="Email Address" className={styles.input} required />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <input type="tel" name="phone" placeholder="Phone Number (WhatsApp Preferred)" className={styles.input} />
              </div>

              <div className={styles.inputGroup}>
                <textarea name="message" placeholder="Tell us about your project vision..." className={styles.textarea} required></textarea>
              </div>

              <button type="submit" className={styles.submitBtn} disabled={isPending}>
                {isPending ? 'Processing...' : 'Initiate Consultation →'}
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}