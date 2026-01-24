'use client';

import { useActionState } from 'react';
import { submitLead, ActionState } from '@/lib/action';
import styles from '@/styles/contact.module.css';

const initialState: ActionState = {
  message: '',
  status: 'idle',
};

export default function Contact() {
  // useActionState handles the pending state and response automatically
  const [state, formAction, isPending] = useActionState(submitLead, initialState);

  return (
    <section className={styles.section}>
      <div className={`container ${styles.container}`}>
        
        <div className={styles.infoSide}>
          <span className={styles.label}>Global Partnership</span>
          <h2 className={styles.title}>
            Let&apos;s Build the <br /> 
            <span className={styles.accent}>Next Landmark.</span>
          </h2>
          <p className={styles.description}>
            Whether you are looking to invest in one of our developments, hire us for 
            design management, or seeking consultation for market entry, we are 
            ready to collaborate.
          </p>
          
          <div className={styles.officeLinks}>
            <div className={styles.office}>
              <strong>Liberia</strong>
              <p>Tubman Blvd, Monrovia</p>
            </div>
            <div className={styles.office}>
              <strong>Ghana</strong>
              <p>East Legon, Accra</p>
            </div>
          </div>
        </div>

        <div className={styles.formSide}>
          <form action={formAction} className={styles.form}>
            {/* Status Feedback */}
            {state.status !== 'idle' && (
              <div className={`${styles.alert} ${styles[state.status]}`}>
                {state.message}
              </div>
            )}

            <div className={styles.inputGroup}>
              <label htmlFor="client_type">I am interested in...</label>
              <select 
                id="client_type" 
                name="client_type" 
                className={styles.select}
                required
              >
                <option value="Investor">Real Estate Development</option>
                <option value="Client">Architecture & Design</option>
                <option value="Partner">Investment Consulting</option>
                <option value="Other">General Inquiry</option>
              </select>
            </div>

            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <input 
                  type="text" 
                  name="full_name" 
                  placeholder="Your Name" 
                  className={styles.input} 
                  required 
                />
              </div>
              <div className={styles.inputGroup}>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Email Address" 
                  className={styles.input} 
                  required 
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <input 
                type="tel" 
                name="phone" 
                placeholder="Phone Number (Optional)" 
                className={styles.input} 
              />
            </div>

            <div className={styles.inputGroup}>
              <textarea 
                name="message" 
                placeholder="Tell us about your vision..." 
                className={styles.textarea} 
                required
              ></textarea>
            </div>

            <button 
              type="submit" 
              className={styles.submitBtn} 
              disabled={isPending}
            >
              {isPending ? 'Submitting...' : 'Initiate Consultation →'}
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}