'use server';

import { createClient } from '@/lib/server';
import { createAdminClient } from '@/lib/admin';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { UserRole, UserStatus } from '@/types/database';

// Helper to ensure only Super Admins can perform these actions
async function requireSuperAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized');

  // Use our "VIP Function" to check role securely
  const { data: profile } = await supabase.rpc('get_my_profile').single();
  
  if (profile?.role !== 'super_admin') {
    throw new Error('Permission Denied: Only Super Admins can manage the team.');
  }
  return supabase;
}

export async function updateUserRole(userId: string, newRole: string) {
  const supabase = await requireSuperAdmin();

  // Prevent changing your own role (to avoid locking yourself out)
  const { data: { user } } = await supabase.auth.getUser();
  if (user?.id === userId) {
    throw new Error('You cannot change your own role.');
  }

  const { error } = await supabase
    .from('profiles')
    // Fix: Cast the string to the UserRole enum type
    .update({ role: newRole as UserRole })
    .eq('id', userId);

  if (error) throw new Error('Failed to update role');
  revalidatePath('/admin/team');
}

export async function toggleUserStatus(userId: string, currentStatus: string) {
  const supabase = await requireSuperAdmin();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (user?.id === userId) {
    throw new Error('You cannot suspend your own account.');
  }

  const newStatus = currentStatus === 'active' ? 'suspended' : 'active';

  const { error } = await supabase
    .from('profiles')
    // Fix: Cast the string to the UserStatus enum type
    .update({ status: newStatus as UserStatus })
    .eq('id', userId);

  if (error) throw new Error('Failed to update status');
  revalidatePath('/admin/team');
}

export async function createNewUser(formData: FormData) {
  // 1. Check Permissions (Only Super Admins can add users)
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized');

  const { data: currentUser } = await supabase.rpc('get_my_profile').single();
  if (currentUser?.role !== 'super_admin') {
    throw new Error('Only Super Admins can create new users.');
  }

  // 2. Extract Form Data
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const fullName = formData.get('full_name') as string;

  // Fix: Cast the role string to UserRole immediately
  const role = formData.get('role') as UserRole;

  const jobTitle = formData.get('job_title') as string;

  // 3. Create Auth User (Using Admin Client)
  const supabaseAdmin = createAdminClient();

  const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true, // Auto-confirm their email so they can login immediately
    user_metadata: { full_name: fullName }
  });

  if (authError) {
    console.error('Auth Error:', authError);
    throw new Error(authError.message);
  }

  if (!authData.user) throw new Error('Failed to create user account');

  // 4. Create Profile (The Trigger usually does this, but we update it to be sure)
  // We wait 1 second to let the Database Trigger run, then we update the role
  await new Promise(resolve => setTimeout(resolve, 1000));

  const { error: profileError } = await supabaseAdmin
    .from('profiles')
    .update({
      full_name: fullName,
      role: role,
      job_title: jobTitle,
      status: 'active' as UserStatus // Explicit cast for strict typing
    })
    .eq('id', authData.user.id);

  if (profileError) {
    console.error('Profile Error:', profileError);
    // User exists but profile failed - we don't throw, just warn
  }

  revalidatePath('/admin/team');
  redirect('/admin/team');
}