import Image from "next/image";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { getProjectBySlugQuery, getAllProjectsQuery } from "@/utils/sanity-queries";
import ContentBlocks from "@/components/ContentBlocks";
import ProjectsSidebar from "@/components/ProjectsSidebar";

// Other block types remain in the Studio but are not shown on the project page
const DISPLAYED_BLOCK_TYPES = ["twoColumnImage", "fullWidthImage"];

export default async function Project({ params }) {
  const { slug } = (await params);

  const [project, projects] = await Promise.all([
    client.fetch(getProjectBySlugQuery, { slug }),
    client.fetch(getAllProjectsQuery),
  ]);

  if (!project) {
    notFound();
  }

  return (
    <div className="px-4 md:px-8 flex-1">
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        <ProjectsSidebar expandedCategory={project.category} projects={projects} currentSlug={slug} />

        <main id="project-page" className="flex-1 min-w-0 md:pb-16">
          {project.featuredImage && (
            <Image
              src={urlFor(project.featuredImage).url()}
              alt={project.title || "Project image"}
              width={0}
              height={0}
              sizes="(min-width: 768px) 75vw, 100vw"
              priority
              className="w-full h-auto"
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-12 md:mt-16 mb-12 md:mb-16">
            <div>
              <h1 className="text-3xl mb-3">{project.title}</h1>
              {project.location && <p className="angie">{project.location}</p>}
            </div>
            {project.description && (
              <p className="angie whitespace-pre-line text-[1.15rem] leading-[1.7]">{project.description}</p>
            )}
          </div>

          <ContentBlocks blocks={project.contentBlocks?.filter((block) => DISPLAYED_BLOCK_TYPES.includes(block._type))} />
        </main>
      </div>
    </div>
  );
}

// Force dynamic rendering - fetch fresh content on every request
export const dynamic = 'force-dynamic';

// Metadata for the page
export async function generateMetadata({ params }) {
  const { slug } = (await params);
  const project = await client.fetch(getProjectBySlugQuery, { slug });

  return {
    title: `${project?.title || 'Project'} - Studio Wu`,
    description: project?.description || 'Learn more about Studio Wu',
  };
}
