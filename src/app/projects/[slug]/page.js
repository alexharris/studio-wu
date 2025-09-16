import Image from "next/image";
import { notFound } from "next/navigation";
import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/lib/image";
import { getProjectBySlugQuery } from "../../../utils/sanity-queries";

export default async function Project({ params }) {
  const { slug } = params;
  
  const project = await client.fetch(getProjectBySlugQuery, { slug });

  if (!project) {
    notFound();
  }

  return (
    <div className="px-8">
      <main>
        <h1 className="text-6xl mb-8 text-center">{project.title}</h1>
        <p className="angie mb-8 text-center">–</p>
        {project.location && (
          <p className="angie mb-8 text-xl text-center">{project.location}</p>
        )}
        
        {project.featuredImage && (
          <div className="mb-8">
            <Image
              src={urlFor(project.featuredImage).url()}
              alt={project.title || 'Project image'}
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto"
            />
          </div>
        )}
      </main>
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
