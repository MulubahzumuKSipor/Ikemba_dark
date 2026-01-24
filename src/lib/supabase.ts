import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definitions based on your schema
export interface Project {
  id: string;
  created_at: string;
  title: string;
  slug: string;
  tagline: string | null;
  description: string | null;
  construction_status: 'Planned' | 'In Progress' | 'Completed';
  market_status: 'Available' | 'Sold' | 'Leased' | 'Not Applicable';
  category: 'Living' | 'Landmarks';
  location: string | null;
  image_urls: string[];
  stats: {
    area?: string;
    value?: string;
    units?: string;
    floors?: string;
    [key: string]: string | undefined;
  };
  features: string[];
}

export interface Lead {
  id?: string;
  created_at?: string;
  full_name: string;
  email: string;
  phone?: string;
  client_type: 'Investor' | 'Homeowner' | 'Institution' | 'General Inquiry';
  message?: string;
  internal_status?: string;
}