// --- 1. DOMAIN TYPES (Use these in your Components) ---

export type ConstructionStatus = 'Planned' | 'In Progress' | 'Completed';
export type MarketStatus = 'Available' | 'Sold' | 'Leased' | 'Not Applicable';
export type ProjectCategory = 'Living' | 'Landmarks';
export type ClientType = 'Investor' | 'Homeowner' | 'Institution' | 'General Inquiry';
export type NewsCategory = 'Press Release' | 'Project Update' | 'Milestone' | 'Industry Insight';
export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
export type UserRole = 'super_admin' | 'admin' | 'staff';
export type UserStatus = 'active' | 'suspended';

export interface ProjectStats {
  area?: string;
  value?: string;
  units?: string;
  floors?: string;
}

export interface Project {
  id: string;
  created_at: string;
  title: string;
  slug: string;
  tagline: string | null;
  description: string | null;
  location: string | null;
  construction_status: ConstructionStatus;
  market_status: MarketStatus;
  category: ProjectCategory;
  image_urls: string[];
  features: string[];
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
  is_flagged: boolean;
  flagged_by: string | null;
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

// FIX: Updated Career Interface to match Database Schema
export interface Career {
  id: string;
  created_at: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  type: JobType;
  description: string; // HTML content
  requirements: string[]; // Array of strings (bullet points)
  application_email: string | null;
  is_active: boolean;
  posted_at?: string;
}

// Alias 'Job' to 'Career' for backward compatibility
export type Job = Career;

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  role: UserRole;
  status: UserStatus;
  job_title: string | null;
  last_login: string | null;
  created_at: string;
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
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: UserRole
          status: UserStatus
          job_title: string | null
          last_login: string | null
          created_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          role?: UserRole
          status?: UserStatus
          job_title?: string | null
          last_login?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          role?: UserRole
          status?: UserStatus
          job_title?: string | null
          last_login?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
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
          is_flagged: boolean
          flagged_by: string | null
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
          is_flagged?: boolean
          flagged_by?: string | null
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
          is_flagged?: boolean
          flagged_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leads_flagged_by_fkey"
            columns: ["flagged_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
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
      careers: {
        Row: {
          id: string
          created_at: string
          title: string
          slug: string
          location: string
          department: string
          type: JobType
          description: string
          requirements: string[]
          application_email: string | null
          is_active: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          slug: string
          location: string
          department: string
          type: JobType
          description: string
          requirements?: string[]
          application_email?: string | null
          is_active?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          slug?: string
          location?: string
          department?: string
          type?: JobType
          description?: string
          requirements?: string[]
          application_email?: string | null
          is_active?: boolean
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_my_profile: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          email: string
          full_name: string | null
          role: UserRole
          status: UserStatus
          job_title: string | null
          last_login: string | null
          created_at: string
        }[]
      }
    }
    Enums: {
      app_role: 'super_admin' | 'admin' | 'staff'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}