'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/server';

export async function login(formData: FormData) {
  const supabase = await createClient();

  // 1. Get data from form
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // 2. Ask Supabase: "Do these credentials match?"
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    // If password is wrong, Supabase tells us here
    return { error: 'Invalid credentials. Access denied.' };
  }

  // 3. If successful, Supabase sets the cookie automatically.
  // We just redirect to the dashboard.
  revalidatePath('/', 'layout');
  redirect('/admin');
}