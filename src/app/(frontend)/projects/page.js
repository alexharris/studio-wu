import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { getAllProjectsQuery } from "@/utils/sanity-queries";
import ProjectsSidebar, { categoryValues } from "@/components/ProjectsSidebar";

export default async function Projects({ searchParams }) {
  const { category } = await searchParams;
  const allProjects = await client.fetch(getAllProjectsQuery);
  const active = categoryValues.includes(category) ? category : null;
  const projects = active
    ? allProjects.filter((project) => project.category === active)
    : allProjects;

  return (
    <div className="px-4 md:px-8 flex-1">
      <main className="flex flex-col md:flex-row gap-6 md:gap-8">
        <h1 className="sr-only">Projects</h1>

        <ProjectsSidebar activeFilter={active} expandedCategory={active} projects={allProjects} />

        <div key={active ?? "all"} className="list-flash flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-6 md:gap-x-8 gap-y-12 md:gap-y-16 content-start">
          {projects.length > 0 ? (
            projects.map((project) => (
              <div key={project._id}>
                {project.featuredImage && (
                  <Link href={`/projects/${project.slug?.current}`} className="block">
                    <Image
                      src={urlFor(project.featuredImage).width(1600).height(980).fit("crop").url()}
                      alt={project.title || "Project image"}
                      width={1600}
                      height={980}
                      sizes="(min-width: 768px) 38vw, 100vw"
                      className="w-full aspect-[1600/980] object-cover"
                    />
                  </Link>
                )}
                <Link href={`/projects/${project.slug?.current}`} className="block mt-4">
                  <h2 className="text-2xl mb-2 self">{project.title}</h2>
                </Link>
                {project.location && <p className="angie">{project.location}</p>}
              </div>
            ))
          ) : (
            <p>No projects found.</p>
          )}
        </div>
      </main>
    </div>
  );
}

// Force dynamic rendering - fetch fresh content on every request
export const dynamic = 'force-dynamic';

// Metadata for the page
export const metadata = {
  title: 'Projects - Studio Wu',
  description: 'Studio Wu Projects',
}
