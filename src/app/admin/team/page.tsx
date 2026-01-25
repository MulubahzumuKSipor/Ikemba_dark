import Link from 'next/link';
import { createClient } from '@/lib/server';
import { Profile } from '@/types/database';
import RoleSelect from '@/components/admin/roleSelect';
import { toggleUserStatus } from '@/lib/team'; // Ensure this points to your server action file
import styles from '@/styles/adminTeam.module.css';

// --- SERVER COMPONENT: Status Toggle Button ---
async function ToggleStatusButton({ id, status, isSelf }: { id: string, status: string, isSelf: boolean }) {
  'use server';

  if (isSelf) return <span className={styles.selfLabel}>Current User</span>;

  const isSuspended = status === 'suspended';
  
  return (
    <form action={async () => {
      'use server';
      await toggleUserStatus(id, status);
    }}>
      <button 
        type="submit" 
        className={`${styles.statusToggle} ${isSuspended ? styles.activateBtn : styles.suspendBtn}`}
      >
        <span className={styles.toggleIcon}>{isSuspended ? '▶' : '⏸'}</span>
        {isSuspended ? 'Activate Access' : 'Suspend Access'}
      </button>
    </form>
  );
}

// --- MAIN PAGE ---
export default async function TeamPage() {
  const supabase = await createClient();

  // 1. SECURITY CHECK
  const { data: currentUser } = await supabase.rpc('get_my_profile').single();
  
  if (currentUser?.role !== 'super_admin') {
    return (
      <div className={styles.accessDenied}>
        <div className={styles.lockIcon}>🔒</div>
        <h1>Access Restricted</h1>
        <p>This command center is restricted to Super Administrators.</p>
        <Link href="/admin" className={styles.returnLink}>Return to Dashboard</Link>
      </div>
    );
  }

  // 2. FETCH DATA
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) console.error('Error fetching team:', error);

  const team = (profiles || []) as unknown as Profile[];

  return (
    <div className={styles.container}>
      
      {/* HEADER SECTION */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Team Access <span className={styles.goldDot}>.</span></h1>
          <p className={styles.subtitle}>Manage permissions, roles, and system security.</p>
        </div>

        <div className={styles.controls}>
          <div className={styles.statBox}>
             <span className={styles.statNumber}>{team.length}</span>
             <span className={styles.statLabel}>Active Members</span>
          </div>

          <Link href="/admin/team/create" className={styles.createButton}>
            <span className={styles.plusIcon}>+</span> Add Member
          </Link>
        </div>
      </div>

      {/* FLOATING CARD LIST */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.thUser}>Identity</th>
              <th>System Role</th>
              <th>Job Title</th>
              <th>Status</th>
              <th>Last Login</th>
              <th className={styles.thAction}>Control</th>
            </tr>
          </thead>
          <tbody>
            {team.map((member) => {
              const isSelf = member.id === currentUser.id;
              
              return (
                <tr key={member.id} className={styles.row}>
                  
                  {/* User Identity */}
                  <td className={styles.tdFirst}>
                    <div className={styles.userInfo}>
                      <div className={`${styles.avatar} ${styles[`avatar-${member.role}`]}`}>
                        {member.full_name?.[0] || member.email[0]}
                      </div>
                      <div className={styles.userMeta}>
                        <span className={styles.name}>
                          {member.full_name || 'System User'}
                          {isSelf && <span className={styles.youTag}>YOU</span>}
                        </span>
                        <span className={styles.email}>{member.email}</span>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td>
                    <RoleSelect 
                      userId={member.id} 
                      currentRole={member.role} 
                      isSelf={isSelf} 
                    />
                  </td>

                  {/* Job Title */}
                  <td className={styles.jobCell}>
                    {member.job_title || <span className={styles.empty}>—</span>}
                  </td>

                  {/* Status */}
                  <td>
                    <div className={`${styles.statusBadge} ${styles[member.status]}`}>
                      <span className={styles.statusDot} />
                      {member.status}
                    </div>
                  </td>

                  {/* Last Login */}
                  <td className={styles.dateCell}>
                    {member.last_login 
                      ? new Date(member.last_login).toLocaleDateString('en-US', {
                          month: 'short', day: 'numeric'
                        })
                      : <span className={styles.empty}>Never</span>}
                  </td>

                  {/* Actions */}
                  <td className={styles.tdLast}>
                    <ToggleStatusButton 
                      id={member.id} 
                      status={member.status} 
                      isSelf={isSelf} 
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}