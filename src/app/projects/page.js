import Image from "next/image";
import Link from "next/link";
import { client } from "../../sanity/lib/client";
import { urlFor } from "../../sanity/lib/image";
import { getAllProjectsQuery } from "../../utils/sanity-queries";

export default async function Projects() {
  const projects = await client.fetch(getAllProjectsQuery);

  return (
    <>
      <div className="px-4 md:px-8 flex-1">
        <main className="">
          <h1 className="sr-only">Projects</h1>

          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {projects.map((project) => (
                
                  <div className="">
                    {project.featuredImage && (
                      <Link key={project._id} href={`/projects/${project.slug?.current}`} className="block">
                        <Image
                          src={urlFor(project.featuredImage).url()}
                          alt={project.title || 'Project image'}
                          width={300}
                          height={200}
                          className="w-full mb-4"
                        />
                      </Link>
                    )}
                    <div className="">
                      <Link key={project._id} href={`/projects/${project.slug?.current}`} className="block">
                        <h2 className="text-xl mb-2 self">{project.title}</h2>
                      </Link>
                      {project.location && <p className="angie">{project.location}</p>}
                    </div>
                  </div>
                
              ))}
            </div>
          ) : (
            <p>No projects found.</p>
          )}
        </main>
      </div>
    </>
  );
}
