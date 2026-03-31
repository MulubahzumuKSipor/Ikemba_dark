import { supabase } from "@/lib/supabase";
import GalleryClient from "@/components/GalleryClient";

// Revalidate cache every 1 hour to protect Supabase Free Tier limits
export const revalidate = 3600;

export default async function GalleryPage() {
  const { data: projects, error } = await supabase
    .from("projects")
    .select("title, category, slug, image_urls");

  if (error) {
    console.error("Error fetching gallery images:", error.message);
    return <GalleryClient projects={[]} />;
  }

  // Filter out any projects that don't have images, then format them for the gallery
  const galleryProjects = (projects || [])
    .filter((project) => project.image_urls && project.image_urls.length > 0)
    .map((project) => ({
      title: project.title,
      category: project.category,
      slug: project.slug,
      coverImage: project.image_urls[0], // The single thumbnail shown in the masonry grid
      allImages: project.image_urls,     // The full array passed to the lightbox slideshow
    }));

  return <GalleryClient projects={galleryProjects} />;
}