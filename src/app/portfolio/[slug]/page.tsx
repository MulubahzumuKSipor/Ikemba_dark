import { supabase, Project } from "@/lib/supabase";
import { notFound } from "next/navigation";
import ProjectDetail from "@/components/projectDetail";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

async function getProject(slug: string): Promise<Project | null> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}

async function getRelatedProjects(
  category: string,
  currentId: string
): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("category", category)
    .neq("id", currentId)
    .limit(2);

  if (error) {
    return [];
  }

  return data || [];
}

export const revalidate = 60;

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = await getRelatedProjects(project.category, project.id);

  return <ProjectDetail project={project} relatedProjects={relatedProjects} />;
}

// Generate static params for all projects (optional, improves performance)
export async function generateStaticParams() {
  const { data } = await supabase.from("projects").select("slug");

  return (data || []).map((project) => ({
    slug: project.slug,
  }));
}