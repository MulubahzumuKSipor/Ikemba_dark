'use server';

import { createClient } from '@/lib/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { JobType } from '@/types/database';

// --- HELPER: Slug Generator ---
function generateSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove non-word chars (like & or :)
    .replace(/[\s_-]+/g, '-') // Replace spaces/underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Trim leading/trailing hyphens
}

// --- ACTION: Create Job ---
export async function createJob(formData: FormData) {
  const supabase = await createClient();

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const department = formData.get('department') as string;
  const location = formData.get('location') as string;
  const type = formData.get('type') as JobType; 
  const application_email = formData.get('application_email') as string;

  // Checkbox: If checked, it sends 'on', otherwise null
  const is_active = formData.get('is_active') === 'on';

  // 1. Requirements Logic: Convert newline-separated string to Array
  const requirementsRaw = formData.get('requirements') as string;
  const requirements = requirementsRaw
    ? requirementsRaw.split('\n').map(line => line.trim()).filter(line => line.length > 0)
    : [];

  // 2. Slug Logic
  const slug = generateSlug(title);

  const { error } = await supabase.from('careers').insert({
    title,
    slug,
    department,
    location,
    type,
    description, // HTML string
    requirements, // text[] array
    application_email,
    is_active,
  });

  if (error) {
    console.error('Error creating job:', error);
    throw new Error('Failed to create job');
  }

  revalidatePath('/admin/careers');
  redirect('/admin/careers');
}

// --- ACTION: Update Job ---
export async function updateJob(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get('id') as string;
  const title = formData.get('title') as string;

  // 1. Requirements Logic
  const requirementsRaw = formData.get('requirements') as string;
  const requirements = requirementsRaw
    ? requirementsRaw.split('\n').map(r => r.trim()).filter(r => r.length > 0)
    : [];

  // 2. Regenerate slug (Keeps URL in sync with Title)
  const slug = generateSlug(title);

  const { error } = await supabase
    .from('careers')
    .update({
      title,
      slug,
      department: formData.get('department') as string,
      location: formData.get('location') as string,
      type: formData.get('type') as JobType,
      description: formData.get('description') as string,
      requirements,
      application_email: formData.get('application_email') as string,
      is_active: formData.get('is_active') === 'on',
    })
    .eq('id', id);

  if (error) {
    console.error('Error updating job:', error);
    throw new Error('Failed to update job');
  }

  revalidatePath('/admin/careers');
  redirect('/admin/careers');
}

// --- ACTION: Toggle Status ---
// Accepts the *new* status directly to avoid logic confusion
export async function toggleJobStatus(id: string, isActive: boolean) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('careers')
    .update({ is_active: isActive })
    .eq('id', id);

  if (error) {
    console.error('Error toggling status:', error);
    throw new Error('Failed to update status');
  }

  revalidatePath('/admin/careers');
}

// --- ACTION: Delete Job ---
// Accepts strict ID string (compatible with .bind)
export async function deleteJob(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('careers')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting job:', error);
    throw new Error('Failed to delete job');
  }

  revalidatePath('/admin/careers');
}