import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/server';
import { Lead } from '@/types/database';
import styles from '@/styles/adminLeadDetail.module.css';
import { updateStatus } from '@/lib/leads'; // Import Action
import DeleteLeadButton from '@/components/admin/deleteButton'; // Import Component

// --- ICONS (Keep these here) ---
const Icons = {
  Back: () => <path d="M19 12H5m7 7-7-7 7-7" />,
  Mail: () => <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />,
  Phone: () => <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />,
  Check: () => <path d="M20 6 9 17l-5-5" />,
  Archive: () => <path d="M21 8v13H3V8M1 3h22v5H1z" />
};

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  // 1. Fetch Lead
  const { data: leadData, error } = await supabase
    .from('leads')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !leadData) notFound();

  // 2. Fetch User Role
  const { data: currentUser } = await supabase.rpc('get_my_profile').single();
  const userRole = currentUser?.role || 'staff';

  const lead = leadData as Lead;
  const statusKey = lead.internal_status?.toLowerCase() || 'new';

  return (
    <div className={styles.container}>

      {/* NAV */}
      <div className={styles.navBar}>
        <Link href="/admin/leads" className={styles.backLink}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.icon}>
            <Icons.Back />
          </svg>
          Back to Inbox
        </Link>
        <div className={styles.metaActions}>
           <span className={styles.date}>Received: {new Date(lead.created_at).toLocaleString()}</span>
        </div>
      </div>

      {/* GRID */}
      <div className={styles.grid}>

        {/* MAIN CARD */}
        <div className={styles.mainCard}>
          <div className={styles.cardHeader}>
            <h1 className={styles.subject}>{lead.client_type} Inquiry</h1>
            <div className={`${styles.statusBadge} ${styles[statusKey]}`}>
              {lead.internal_status}
            </div>
          </div>

          <div className={styles.messageBody}>
            <p className={styles.messageText}>{lead.message}</p>
          </div>

          <div className={styles.actionsBar}>
            {/* Status Buttons */}
            <div className={styles.buttonGroup}>
              {lead.internal_status !== 'Contacted' && (
                <form action={updateStatus}>
                  <input type="hidden" name="id" value={lead.id} />
                  <input type="hidden" name="status" value="Contacted" />
                  <button type="submit" className={styles.actionBtn}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.btnIcon}>
                      <Icons.Check />
                    </svg>
                    Mark Contacted
                  </button>
                </form>
              )}

              {lead.internal_status !== 'Closed' && (
                <form action={updateStatus}>
                  <input type="hidden" name="id" value={lead.id} />
                  <input type="hidden" name="status" value="Closed" />
                  <button type="submit" className={styles.actionBtn}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.btnIcon}>
                      <Icons.Archive />
                    </svg>
                    Close Ticket
                  </button>
                </form>
              )}
            </div>

            {/* Delete Button (Now using the Client Component) */}
            {(userRole === 'super_admin' || userRole === 'admin') && (
              <DeleteLeadButton id={lead.id} />
            )}

          </div>
        </div>

        {/* SIDEBAR */}
        <div className={styles.sidebar}>
          <div className={styles.detailCard}>
            <h3 className={styles.detailTitle}>Sender Details</h3>

            <div className={styles.detailItem}>
              <div className={styles.label}>Full Name</div>
              <div className={styles.value}>{lead.full_name}</div>
            </div>

            <div className={styles.detailItem}>
              <div className={styles.label}>Email Address</div>
              <a href={`mailto:${lead.email}`} className={styles.linkValue}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.miniIcon}>
                  <Icons.Mail />
                </svg>
                {lead.email}
              </a>
            </div>

            {lead.phone && (
              <div className={styles.detailItem}>
                <div className={styles.label}>Phone Number</div>
                <a href={`tel:${lead.phone}`} className={styles.linkValue}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.miniIcon}>
                    <Icons.Phone />
                  </svg>
                  {lead.phone}
                </a>
              </div>
            )}

            <div className={styles.separator} />

            <div className={styles.detailItem}>
              <div className={styles.label}>Client Segment</div>
              <div className={styles.tag}>{lead.client_type}</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}