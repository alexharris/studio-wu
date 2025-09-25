import Image from "next/image";
import { notFound } from "next/navigation";
import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/lib/image";
import { getProjectBySlugQuery, getAdjacentProjectsQuery } from "../../../utils/sanity-queries";
import ContentBlocks from "../../../components/ContentBlocks";
import ProjectPagination from "../../../components/ProjectPagination";

export default async function Project({ params }) {
  const { slug } = params;
  
  const project = await client.fetch(getProjectBySlugQuery, { slug });

  if (!project) {
    notFound();
  }

  // Fetch adjacent projects for pagination
  const { currentProject, allProjects } = await client.fetch(getAdjacentProjectsQuery, { slug });
  
  // Find current project index and get adjacent projects
  const currentIndex = allProjects.findIndex(p => p._id === currentProject._id);
  const previousProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  return (
    <div className="px-4 md:px-8 flex-1">

        <h1 className="text-6xl mb-12 text-center">{project.title}</h1>
        <p className="angie mb-8 text-center">–</p>
        {project.location && (
          <p className="angie mb-24 text-xl text-center">{project.location}</p>
        )}
        

        {/* Render content blocks */}
        <ContentBlocks blocks={project.contentBlocks} />

        {/* Project Pagination */}
        <ProjectPagination 
          previousProject={previousProject}
          nextProject={nextProject}
        />
 
    </div>
  );
}

// Force dynamic rendering - fetch fresh content on every request
export const dynamic = 'force-dynamic';

// Metadata for the page
export async function generateMetadata({ params }) {
  const { slug } = params;
  const project = await client.fetch(getProjectBySlugQuery, { slug });
  
  return {
    title: `${project?.title || 'Project'} - Studio Wu`,
    description: 'Learn more about Studio Wu',
  };
}

