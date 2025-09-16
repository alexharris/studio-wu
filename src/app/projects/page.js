import Image from "next/image";
import { client } from "../../sanity/lib/client";
import { urlFor } from "../../sanity/lib/image";
import { getAllProjectsQuery } from "../../utils/sanity-queries";

export default async function Projects() {
  const projects = await client.fetch(getAllProjectsQuery);

  return (
    <>
      <div className="px-8">
        <main className="">
          <h1 className="sr-only">Projects</h1>

          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project._id} className="">
                  {console.log(project)}
                  {project.featuredImage && (
                    <Image
                      src={urlFor(project.featuredImage).url()}
                      alt={project.title || 'Project image'}
                      width={300}
                      height={200}
                      className="w-full mb-4"
                    />
                  )}
                  <div className="">
                    <h2 className="text-xl mb-2">{project.title}</h2>
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
