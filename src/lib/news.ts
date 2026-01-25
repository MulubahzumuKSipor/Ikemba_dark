'use server';

import { createClient } from '@/lib/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { NewsCategory } from '@/types/database';

export async function createArticle(formData: FormData) {
  const supabase = await createClient();

  const title = formData.get('title') as string;
  const rawSlug = (formData.get('slug') as string) || title;
  const slug = rawSlug.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
  
  const excerpt = formData.get('excerpt') as string;
  const content = formData.get('content') as string;
  
  // 2. Fix: Cast the string to the specific Enum type
  const category = formData.get('category') as NewsCategory;
  
  const image_url = formData.get('image_url') as string;
  const is_published = formData.get('is_published') === 'on';
  const published_at = formData.get('published_at') as string || null;

  const { error } = await supabase
    .from('news')
    .insert({
      title,
      slug,
      excerpt,
      content,
      category, // Now TypeScript is happy
      image_url,
      is_published,
      published_at: published_at || (is_published ? new Date().toISOString() : null),
      is_featured: false
    });

  if (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to create article');
  }

  revalidatePath('/admin/news');
  redirect('/admin/news');
}


export async function updateArticle(formData: FormData) {
  const supabase = await createClient();

  // 1. Get the ID
  const id = formData.get('id') as string;

  // 2. Extract Data
  const title = formData.get('title') as string;
  const slug = (formData.get('slug') as string).toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
  const excerpt = formData.get('excerpt') as string;
  const content = formData.get('content') as string;
  const category = formData.get('category') as NewsCategory;
  const image_url = formData.get('image_url') as string;
  const is_published = formData.get('is_published') === 'on';
  const published_at = formData.get('published_at') as string || null;

  // 3. Update Database
  const { error } = await supabase
    .from('news')
    .update({
      title,
      slug,
      excerpt,
      content,
      category,
      image_url,
      is_published,
      // Only update published_at if user explicitly set a date, otherwise keep existing or set new if publishing now
      published_at: published_at || (is_published ? new Date().toISOString() : null)
    })
    .eq('id', id);

  if (error) {
    console.error('Update Error:', error);
    throw new Error('Failed to update article');
  }

  revalidatePath('/admin/news');
  revalidatePath(`/admin/news/${id}`);
  redirect('/admin/news');
}

export async function deleteArticle(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get('id') as string;

  const { error } = await supabase.from('news').delete().eq('id', id);

  if (error) {
    console.error('Delete Error:', error);
    throw new Error('Failed to delete article');
  }

  revalidatePath('/admin/news');
  redirect('/admin/news');
}