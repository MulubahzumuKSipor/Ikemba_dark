// lib/data.ts
import { createClient } from '@/lib/server';
import { Project, ProjectCategory } from '@/types/database';

/**
 * Fetch all projects, ordered by creation date.
 * Best for: Portfolio Index Page
 */
export async function getProjects() {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }

  return data as Project[];
}

/**
 * Fetch a single project by its slug (e.g., '7th-tubman').
 * Best for: Project Detail Page
 */
export async function getProjectBySlug(slug: string) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    // It's common to return null if not found so the page can show a 404
    return null;
  }

  return data as Project;
}

/**
 * Fetch specific categories ("Living" vs "Landmarks").
 * Best for: Homepage Tabs
 */
export async function getProjectsByCategory(category: ProjectCategory) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false });

  if (error) {
    console.error(`Error fetching ${category} projects:`, error);
    return [];
  }

  return data as Project[];
}

/**
 * Fetch 3 featured projects for the Homepage Hero/Highlights.
 * (We can filter by a 'featured' flag or just take the latest 3)
 */
export async function getFeaturedProjects() {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .limit(3)
    .order('created_at', { ascending: false });

  if (error) {
    return [];
  }

  return data as Project[];
}