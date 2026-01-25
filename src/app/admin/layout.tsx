import { redirect } from 'next/navigation';
import { createClient } from '@/lib/server';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/adminHeader';
import AdminFooter from '@/components/admin/adminFooter';
import AdminLayoutClient from '@/components/admin/adminLayout'; // Import the new wrapper

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase.rpc('get_my_profile').single();
  if (!profile) redirect('/login');

  return (
    // Pass everything as props to the Client Component
    <AdminLayoutClient
      sidebar={<AdminSidebar role={profile.role} />}
      header={<AdminHeader profile={profile} />}
      footer={<AdminFooter />}
    >
      {children}
    </AdminLayoutClient>
  );
}