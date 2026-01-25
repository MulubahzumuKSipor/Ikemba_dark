'use client';

import { useEffect } from 'react';

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Admin Error:', error);
  }, [error]);

  return (
    <div style={{ padding: '4rem', textAlign: 'center', color: '#fff' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem', fontFamily: 'serif' }}>
        System Malfunction
      </h2>
      <p style={{ color: '#EF4444', marginBottom: '2rem' }}>
        {error.message || "An unexpected error occurred in the command center."}
      </p>
      <button
        onClick={() => reset()}
        style={{
          padding: '0.75rem 1.5rem',
          background: '#D4AF37',
          color: '#000',
          border: 'none',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        Retry Connection
      </button>
    </div>
  );
}