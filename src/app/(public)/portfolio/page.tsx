// import { notFound } from 'next/navigation';
import { supabase, Project } from "@/lib/supabase";
import PortfolioShowcase from "@/components/portfolioShowcase";

async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching projects:", error);
    return [];
  }

  return data || [];
}

export const revalidate = 60; // Revalidate every 60 seconds

export default async function PortfolioPage() {
  const projects = await getProjects();

  return <PortfolioShowcase projects={projects} />;
}