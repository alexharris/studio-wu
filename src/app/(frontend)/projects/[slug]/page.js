import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { getProjectBySlugQuery, getAllProjectsQuery } from "@/utils/sanity-queries";
import ContentBlocks from "@/components/ContentBlocks";
import ProjectsSidebar from "@/components/ProjectsSidebar";
import Lightbox from "@/components/Lightbox";
import ExpandOnHover from "@/components/ExpandOnHover";

// Other block types remain in the Studio but are not shown on the project page
const DISPLAYED_BLOCK_TYPES = ["twoColumnImage", "fullWidthImage"];

const descriptionComponents = {
  block: {
    normal: ({ children }) => <p className="mb-4 last:mb-0">{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc ml-6 mb-4 space-y-1">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal ml-6 mb-4 space-y-1">{children}</ol>,
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="underline underline-offset-4"
        target={value?.href?.startsWith("http") ? "_blank" : undefined}
        rel={value?.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
  },
};

// Flatten portable text to a plain string (used for the meta description)
const toPlainText = (blocks) =>
  (blocks || [])
    .map((block) => (block.children || []).map((child) => child.text).join(""))
    .join(" ")
    .trim();

export default async function Project({ params }) {
  const { slug } = (await params);

  const [project, projects] = await Promise.all([
    client.fetch(getProjectBySlugQuery, { slug }),
    client.fetch(getAllProjectsQuery),
  ]);

  if (!project) {
    notFound();
  }

  const blocks = project.contentBlocks?.filter((block) => DISPLAYED_BLOCK_TYPES.includes(block._type)) || [];

  return (
    <div className="px-4 md:px-8 flex-1">
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        <ProjectsSidebar expandedCategory={project.category} projects={projects} currentSlug={slug} />

        <main id="project-page" className="flex-1 min-w-0 md:pb-16">
          <Lightbox>
          {project.featuredImage && (
            <ExpandOnHover>
            <Image
              src={urlFor(project.featuredImage).url()}
              alt={project.title || "Project image"}
              width={0}
              height={0}
              sizes="(min-width: 768px) 75vw, 100vw"
              priority
              data-lightbox={urlFor(project.featuredImage).width(2400).fit("max").auto("format").url()}
              className="w-full h-auto cursor-zoom-in"
            />
            </ExpandOnHover>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-12 md:mt-16 mb-12 md:mb-16">
            <div>
              <h1 className="text-3xl mb-3">{project.title}</h1>
              {project.location && <p className="angie">{project.location}</p>}
            </div>
            {project.description?.length > 0 && (
              <div className="angie text-[1.15rem] leading-[1.7]">
                <PortableText value={project.description} components={descriptionComponents} />
              </div>
            )}
          </div>

          <ContentBlocks blocks={blocks} />
          </Lightbox>
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
    description: toPlainText(project?.description) || 'Learn more about Studio Wu',
  };
}
