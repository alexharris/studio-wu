import Link from "next/link";

const filters = [
  { label: "All", value: null },
  { label: "Residential", value: "residential" },
  { label: "Commercial", value: "commercial" },
];

export const categoryValues = filters.map((f) => f.value).filter(Boolean);

// Left-hand category nav shared by the projects index and project pages.
// - activeFilter: highlights the selected category (index page)
// - expandedCategory + projects + currentSlug: lists that category's projects (project page)
export default function ProjectsSidebar({ activeFilter = null, expandedCategory = null, projects = [], currentSlug = null }) {
  return (
    <nav aria-label="Projects" className="md:w-[calc(25%_+_100px)] shrink-0 md:sticky md:top-8 md:self-start">
      <ul className="flex md:flex-col gap-6 self text-2xl">
        {filters.map((filter) => {
          const children = filter.value && filter.value === expandedCategory
            ? projects.filter((project) => project.category === filter.value)
            : [];

          const isActive = activeFilter === filter.value && (activeFilter !== null || !expandedCategory);

          return (
            <li key={filter.label}>
              <Link
                href={filter.value ? `/projects?category=${filter.value}` : "/projects"}
                aria-current={isActive ? "page" : undefined}
                className={isActive ? "underline underline-offset-4" : ""}
              >
                {filter.label}
              </Link>
              {children.length > 0 && (
                <ul className="hidden md:flex flex-col gap-2 mt-4 ml-6 text-base">
                  {children.map((project) => (
                    <li key={project._id}>
                      <Link
                        href={`/projects/${project.slug?.current}`}
                        aria-current={project.slug?.current === currentSlug ? "page" : undefined}
                        className={project.slug?.current === currentSlug ? "underline underline-offset-4" : ""}
                      >
                        {project.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
