import { redirect } from 'next/navigation';
import { createClient } from '@/lib/server';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/adminHeader';
import AdminFooter from '@/components/admin/adminFooter';
import AdminLayoutClient from '@/components/admin/adminLayout'; // Import the Client Wrapper

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  // 1. Check Auth User
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  // 2. Fetch Profile securely
  const { data: profile } = await supabase
    .rpc('get_my_profile')
    .single();

  if (!profile) redirect('/login');

  // 3. Render the Client Wrapper
  // We pass the Server Components (Sidebar, Header) as props to the Client Component.
  // This "Slot Pattern" keeps the layout interactive but the data fetching secure.
  return (
    <AdminLayoutClient
      sidebar={<AdminSidebar role={profile.role} />}
      header={<AdminHeader profile={profile} />}
      footer={<AdminFooter />}
    >
      {children}
    </AdminLayoutClient>
  );
}