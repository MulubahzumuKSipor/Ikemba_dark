'use server';

import { createClient } from '@/lib/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function updateStatus(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get('id') as string;
  const newStatus = formData.get('status') as string;

  await supabase
    .from('leads')
    .update({ internal_status: newStatus })
    .eq('id', id);

  revalidatePath(`/admin/leads/${id}`);
  revalidatePath('/admin/leads');
}

export async function deleteLead(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get('id') as string;
  
  await supabase.from('leads').delete().eq('id', id);
  
  revalidatePath('/admin/leads');
  redirect('/admin/leads');
}