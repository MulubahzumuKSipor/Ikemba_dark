'use server';

import { createClient } from '@/lib/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { JobType } from '@/types/database'; // <--- 1. Import the Type

export async function createJob(formData: FormData) {
  const supabase = await createClient();

  const title = formData.get('title') as string;
  const department = formData.get('department') as string;
  const location = formData.get('location') as string;
  
  // 2. Fix: Cast the string to the JobType enum
  const type = formData.get('type') as JobType; 
  
  const description = formData.get('description') as string;
  const is_active = formData.get('is_active') === 'on';

  // 3. Fix: Generate a slug (Required by Database)
  const slug = title
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');

  const { error } = await supabase
    .from('careers')
    .insert({
      title,
      slug, // <--- Add this
      department,
      location,
      type, // Now TypeScript is happy
      description,
      is_active,
      // Note: 'posted_at' was removed as it wasn't in your type definition. 
      // Supabase auto-handles 'created_at'.
    });

  if (error) {
    console.error('Error creating job:', error);
    throw new Error('Failed to post job');
  }

  revalidatePath('/admin/careers');
  redirect('/admin/careers');
}

export async function toggleJobStatus(id: string, currentStatus: boolean) {
  const supabase = await createClient();
  
  await supabase
    .from('careers')
    .update({ is_active: !currentStatus })
    .eq('id', id);

  revalidatePath('/admin/careers');
}

export async function deleteJob(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get('id') as string;

  await supabase.from('careers').delete().eq('id', id);
  revalidatePath('/admin/careers');
}

export async function updateJob(formData: FormData) {
  const supabase = await createClient();

  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const department = formData.get('department') as string;
  const location = formData.get('location') as string;
  const type = formData.get('type') as JobType;
  const description = formData.get('description') as string;
  const is_active = formData.get('is_active') === 'on';

  // Regenerate slug from title to keep URL sync
  const slug = title
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');

  const { error } = await supabase
    .from('careers')
    .update({
      title,
      slug,
      department,
      location,
      type,
      description,
      is_active
    })
    .eq('id', id);

  if (error) {
    console.error('Error updating job:', error);
    throw new Error('Failed to update job');
  }

  revalidatePath('/admin/careers');
  redirect('/admin/careers');
}