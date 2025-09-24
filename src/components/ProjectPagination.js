import Link from "next/link";

export default function ProjectPagination({ previousProject, nextProject }) {
  if (!previousProject && !nextProject) {
    return null;
  }

  return (
    <div className="mt-24 pt-12 border-t border-gray-200 text-md md:text-2xl">
      <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
        <div className="flex-1 order-0">
          {previousProject && (
            <Link 
              href={`/projects/${previousProject.slug.current}`}
              className="group flex items-center"
            >

              <div className="text-left flex flex-row-reverse items-center">
                <p className="sr-only">Previous</p>
                <p className="font-medium">{previousProject.title}</p>
                <span className="mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>                
                </span>                
              </div>
            </Link>
          )}
        </div>

        <div className="order-2 md:order-1 flex-1 text-center">
          <Link 
            href="/projects"
            className="inline-flex items-center"
          >
            All Projects
          </Link>
        </div>

        <div className="order-1 md:order-2 flex-1 text-right">
          {nextProject && (
            <Link 
              href={`/projects/${nextProject.slug.current}`}
              className="group flex items-center justify-end"
            >
              <div className="text-right flex flex-row items-center">
                <p className="sr-only">Next</p>
                <p className="font-medium">{nextProject.title}</p>
                <span className="ml-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>                  
                </span>
              </div>
              
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}