import Link from 'next/link';
import { createClient } from '@/lib/server';
import { Lead } from '@/types/database';
import styles from '@/styles/adminLeads.module.css';

// Helper to format dates cleanly
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

export default async function LeadsPage() {
  const supabase = await createClient();

  // 1. Fetch Leads (Newest First)
  const { data: leadsData, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching leads:', error);
  }

  const leads = (leadsData || []) as unknown as Lead[];

  return (
    <div className={styles.container}>

      {/* HEADER */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Inbox</h1>
          <p className={styles.subtitle}>Manage incoming inquiries and client communications.</p>
        </div>
        <div className={styles.controls}>
          <span className={styles.countBadge}>{leads.length} Messages</span>
        </div>
      </div>

      {/* DATA GRID */}
      <div className={styles.card}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.thStatus}>Status</th>
              <th className={styles.thSender}>Sender Identity</th>
              <th>Client Type</th>
              <th className={styles.thMessage}>Message Preview</th>
              <th>Received</th>
              <th className={styles.thAction}>Action</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => {
              // Normalize status for CSS class (new, contacted, closed)
              const statusClass = lead.internal_status?.toLowerCase() || 'new';

              return (
                <tr key={lead.id} className={styles.row}>

                  {/* Status Badge */}
                  <td>
                    <span className={`${styles.badge} ${styles[statusClass]}`}>
                      {lead.internal_status || 'New'}
                    </span>
                  </td>

                  {/* Sender Info */}
                  <td>
                    <div className={styles.senderInfo}>
                      <span className={styles.senderName}>{lead.full_name}</span>
                      <span className={styles.senderEmail}>{lead.email}</span>
                      {lead.phone && <span className={styles.senderPhone}>{lead.phone}</span>}
                    </div>
                  </td>

                  {/* Client Type */}
                  <td>
                    <span className={styles.clientType}>{lead.client_type}</span>
                  </td>

                  {/* Message Snippet */}
                  <td>
                    <p className={styles.messagePreview} title={lead.message}>
                      {lead.message}
                    </p>
                  </td>

                  {/* Date */}
                  <td className={styles.dateCell}>
                    {formatDate(lead.created_at)}
                  </td>

                  {/* Action Button */}
                  <td>
                    <Link href={`/admin/leads/${lead.id}`} className={styles.actionButton}>
                      View
                    </Link>
                  </td>
                </tr>
              );
            })}

            {/* Empty State */}
            {leads.length === 0 && (
              <tr>
                <td colSpan={6} className={styles.emptyState}>
                  <div className={styles.emptyContent}>
                    <p>No messages found in the system.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}