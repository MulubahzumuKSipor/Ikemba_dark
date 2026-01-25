'use client';

import { useActionState } from 'react';
import { login } from '@/lib/login';
import styles from '@/styles/login.module.css';

interface LoginState {
  error: string;
}

const initialState: LoginState = { error: '' };

export default function LoginPage() {
  async function handleLogin(prevState: LoginState, formData: FormData): Promise<LoginState> {
    const result = await login(formData);

    if (result && typeof result === 'object' && 'error' in result) {
      return result as LoginState;
    }

    return prevState;
  }

  const [state, formAction, isPending] = useActionState(handleLogin, initialState);

  return (
    <main className={styles.container}>

      <div className={styles.imageSide}>
        <div className={styles.watermark}>IKEMBA</div>
      </div>

      <div className={styles.formSide}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h1 className={styles.title}>Ikemba Group</h1>
            <p className={styles.subtitle}>Authorized Access Only</p>
          </div>

          <form action={formAction} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>Identity</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="admin@ikemba.com"
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>Key</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password" // 4. Helps password managers
                required
                placeholder="••••••••"
                className={styles.input}
              />
            </div>

            {state?.error && (
              <div className={styles.error} role="alert">
                {state.error}
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className={styles.button}
            >
              {isPending ? 'Authenticating...' : 'Enter Console'}
            </button>
          </form>

          <div className={styles.footer}>
            <p>System Protected by Identity Access Management</p>
          </div>
        </div>
      </div>
    </main>
  );
}