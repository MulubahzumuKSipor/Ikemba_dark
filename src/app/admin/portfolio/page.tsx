import Link from "next/link";
import { createClient } from "@/lib/server"; // Ensure path matches your setup
import styles from "@/styles/adminPortfolio.module.css";

export default async function AdminProjectsPage() {
  const supabase = await createClient();

  // Fetch all projects, ordered by newest first
  const { data: projects, error } = await supabase
    .from("projects")
    .select("id, title, slug, category, construction_status")
    .order("created_at", { ascending: false });

  return (
    <main className={styles.adminMain}>
      <div className={`container ${styles.adminContainer}`}>
        
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Manage Projects</h1>
            <p className={styles.subtitle}>View and edit your portfolio entries.</p>
          </div>
          <Link href="/admin/portfolio/new" className={styles.submitBtn}>
            + New Project
          </Link>
        </div>

        {error ? (
          <div className={styles.errorMessage}>Failed to load projects: {error.message}</div>
        ) : (
          <div className={styles.tableWrapper}>
            <table className={styles.adminTable}>
              <thead>
                <tr>
                  <th>Project Title</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects?.map((project) => (
                  <tr key={project.id}>
                    <td className={styles.tdTitle}>{project.title}</td>
                    <td>{project.category}</td>
                    <td>
                      <span className={`${styles.statusBadge} ${
                        project.construction_status === 'Completed' ? styles.statusGreen : 
                        project.construction_status === 'In Progress' ? styles.statusGold : styles.statusGray
                      }`}>
                        {project.construction_status}
                      </span>
                    </td>
                    <td>
                      <Link 
                        href={`/admin/portfolio/${project.slug}/edit`}
                        className={styles.editLink}
                      >
                        Edit Project &rarr;
                      </Link>
                    </td>
                  </tr>
                ))}
                {(!projects || projects.length === 0) && (
                  <tr>
                    <td colSpan={4} className={styles.emptyState}>
                      No projects found. Start by creating one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        
      </div>
    </main>
  );
}