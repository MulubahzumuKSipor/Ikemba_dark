import { supabase, Project } from "@/lib/supabase";
import PortfolioShowcase from "@/components/portfolioShowcase";

export const revalidate = 3600;

async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching projects:", error.message);
    return [];
  }

  const projects = data || [];

  // --- FORCE ATLANTIC VIEW RESIDENCES TO THE TOP ---
  // Use the exact slug from your URL
  const avrIndex = projects.findIndex((p) => p.slug === "atlantic-view-residences");

  if (avrIndex > -1) {
    const [avrProject] = projects.splice(avrIndex, 1);
    projects.unshift(avrProject);
  }

  return projects;
}

export default async function PortfolioPage() {
  const projects = await getProjects();

  return <PortfolioShowcase projects={projects} />;
}