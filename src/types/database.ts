// --- 1. DOMAIN TYPES (Use these in your Components) ---

export type ConstructionStatus = 'Planned' | 'In Progress' | 'Completed';
export type MarketStatus = 'Available' | 'Sold' | 'Leased' | 'Not Applicable';
export type ProjectCategory = 'Living' | 'Landmarks';
export type ClientType = 'Investor' | 'Homeowner' | 'Institution' | 'General Inquiry';
export type NewsCategory = 'Press Release' | 'Project Update' | 'Milestone' | 'Industry Insight';

export interface ProjectStats {
  area?: string;   // e.g. "1.5 Acres" or "1,500 sqm"
  value?: string;  // e.g. "$6 Million"
  units?: string;  // e.g. "15 Units"
  floors?: string; // e.g. "7 Stories"
}

export interface Project {
  id: string;
  created_at: string;
  title: string;
  slug: string;
  tagline: string | null;
  description: string | null;
  location: string | null;
  
  // The Split Statuses
  construction_status: ConstructionStatus;
  market_status: MarketStatus;
  
  category: ProjectCategory;
  
  // Arrays
  image_urls: string[];
  features: string[];
  
  // JSONB Data
  stats: ProjectStats; 
}

export interface Lead {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone?: string;
  client_type: ClientType;
  message: string;
  internal_status: 'New' | 'Contacted' | 'Closed';
}

export interface Article {
  id: string;
  created_at: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  image_url: string | null;
  category: NewsCategory;
  published_at: string | null;
  is_published: boolean;
  is_featured: boolean;
}


// --- 2. DATABASE TYPES (For Supabase Client) ---

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          created_at: string
          title: string
          slug: string
          tagline: string | null
          description: string | null
          location: string | null
          construction_status: ConstructionStatus
          market_status: MarketStatus
          category: ProjectCategory
          image_urls: string[]
          features: string[]
          stats: Json
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          slug: string
          tagline?: string | null
          description?: string | null
          location?: string | null
          construction_status: ConstructionStatus
          market_status: MarketStatus
          category: ProjectCategory
          image_urls?: string[]
          features?: string[]
          stats?: Json
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          slug?: string
          tagline?: string | null
          description?: string | null
          location?: string | null
          construction_status?: ConstructionStatus
          market_status?: MarketStatus
          category?: ProjectCategory
          image_urls?: string[]
          features?: string[]
          stats?: Json
        }
        Relationships: []
      }
      leads: {
        Row: {
          id: string
          created_at: string
          full_name: string
          email: string
          phone: string | null
          client_type: ClientType
          message: string
          internal_status: string
        }
        Insert: {
          id?: string
          created_at?: string
          full_name: string
          email: string
          phone?: string | null
          client_type: ClientType
          message: string
          internal_status?: string
        }
        Update: {
          id?: string
          created_at?: string
          full_name?: string
          email?: string
          phone?: string | null
          client_type?: ClientType
          message?: string
          internal_status?: string
        }
        Relationships: []
      }
      news: {
        Row: {
          id: string
          created_at: string
          title: string
          slug: string
          excerpt: string | null
          content: string | null
          image_url: string | null
          category: NewsCategory
          published_at: string | null
          is_published: boolean
          is_featured: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          slug: string
          excerpt?: string | null
          content?: string | null
          image_url?: string | null
          category?: NewsCategory
          published_at?: string | null
          is_published?: boolean
          is_featured?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          slug?: string
          excerpt?: string | null
          content?: string | null
          image_url?: string | null
          category?: NewsCategory
          published_at?: string | null
          is_published?: boolean
          is_featured?: boolean
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}