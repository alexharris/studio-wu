import Image from "next/image";
import { notFound } from "next/navigation";
import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/lib/image";
import { getProjectBySlugQuery } from "../../../utils/sanity-queries";
import ContentBlocks from "../../../components/ContentBlocks";

export default async function Project({ params }) {
  const { slug } = params;
  
  const project = await client.fetch(getProjectBySlugQuery, { slug });

  if (!project) {
    notFound();
  }

  return (
    <div className="px-4 md:px-8 flex-1">

        <h1 className="text-6xl mb-12 text-center">{project.title}</h1>
        <p className="angie mb-8 text-center">–</p>
        {project.location && (
          <p className="angie mb-24 text-xl text-center">{project.location}</p>
        )}
        

        {/* Render content blocks */}
        <ContentBlocks blocks={project.contentBlocks} />
 
    </div>
  );
}

// Generate static params for all projects (optional, for better performance)
export async function generateStaticParams() {
  const projects = await client.fetch(`
    *[_type == "project" && defined(slug.current)]{
      "slug": slug.current
    }
  `);

  return projects.map((project) => ({
    slug: project.slug,
  }));
}
