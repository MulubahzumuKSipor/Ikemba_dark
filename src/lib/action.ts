// lib/actions.ts
'use server';

// Check your file structure. If you saved the server client in lib/supabase/server.ts:
import { createClient } from '@/lib/server'; 
import { ClientType } from '@/types/database'; // Use '@/types' if your file is named index.ts inside types folder
import { revalidatePath } from 'next/cache';

export type ActionState = {
  message: string;
  status: 'success' | 'error' | 'idle';
};

/**
 * Server Action to handle Contact Form submissions.
 */
export async function submitLead(prevState: ActionState, formData: FormData): Promise<ActionState> {
  // 1. Initialize the typed Supabase client
  const supabase = await createClient();

  // 2. Extract and Validate the form data
  // We use strict casting here to satisfy TypeScript
  const full_name = formData.get('full_name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const client_type = formData.get('client_type') as ClientType;
  const message = formData.get('message') as string;

  // Basic validation
  if (!full_name || !email || !message || !client_type) {
    return { 
      status: 'error', 
      message: 'Please fill in all required fields.' 
    };
  }

  // 3. Prepare the object for insertion
  // Crucial: We do NOT include 'internal_status' here. 
  // The database schema defaults it to 'New', and the TypeScript type expects it to be omitted.
  const leadData = {
    full_name,
    email,
    phone,
    client_type,
    message,
  };

  // 4. Insert into Supabase
  const { error } = await supabase
    .from('leads')
    .insert(leadData);

  if (error) {
    console.error('Database Error:', error);
    return { 
      status: 'error', 
      message: 'Failed to submit inquiry. Please try again.' 
    };
  }

  // 5. Revalidate Cache (Optional)
  // If you have an admin page at /admin/leads, this updates it instantly.
  // revalidatePath('/admin/leads');

  return { 
    status: 'success', 
    message: 'Thank you! We will contact you shortly.' 
  };
}

