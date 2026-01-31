'use server';

import { createClient } from '@/lib/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { JobType } from '@/types/database';

export async function createJob(formData: FormData) {
  const supabase = await createClient();

  const title = formData.get('title') as string;
  const department = formData.get('department') as string;
  const location = formData.get('location') as string;
  const type = formData.get('type') as JobType; 
  const description = formData.get('description') as string;
  const is_active = formData.get('is_active') === 'on';

  // Generate slug from title
  const slug = title
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');

  const { error } = await supabase
    .from('careers')
    .insert({
      title,
      slug,
      department,
      location,
      type,
      description,
      is_active,
    });

  if (error) {
    console.error('Error creating job:', error);
    throw new Error('Failed to post job');
  }

  revalidatePath('/admin/careers');
  redirect('/admin/careers');
}

// FIX 1: Simpler logic. We just set it to the 'isActive' value passed in.
export async function toggleJobStatus(id: string, isActive: boolean) {
  const supabase = await createClient();
  
  await supabase
    .from('careers')
    .update({ is_active: isActive }) // Set directly, don't flip it again
    .eq('id', id);

  revalidatePath('/admin/careers');
}

// FIX 2: Accept 'id' directly as a string to match your component call
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

export async function updateJob(formData: FormData) {
  const supabase = await createClient();

  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const department = formData.get('department') as string;
  const location = formData.get('location') as string;
  const type = formData.get('type') as JobType;
  const description = formData.get('description') as string;
  const is_active = formData.get('is_active') === 'on';

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