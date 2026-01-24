// lib/config.ts

export const config = {
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  },
};

// Simple validation to crash early if keys are missing
if (!config.supabase.url || !config.supabase.anonKey) {
  throw new Error('Missing Supabase environment variables. Check your .env.local file.');
}