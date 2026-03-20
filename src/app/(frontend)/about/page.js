import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { getAboutPageQuery } from "@/utils/sanity-queries";
import { urlFor } from "@/sanity/lib/image";
import ContentBlocks from "@/components/ContentBlocks";

export default async function About() {
  const aboutPage = await client.fetch(getAboutPageQuery);

  if (!aboutPage) {
    notFound();
  }

  return (
    <div className="px-4 md:px-8 flex-1">
      <main id="about-page">
        <h1 className="sr-only">{aboutPage.title}</h1>
        
        {/* Render content blocks */}
        <ContentBlocks blocks={aboutPage.contentBlocks} />

        {/* Logos row */}
        {aboutPage.logos && aboutPage.logos.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-24 my-32 w-full">
            {aboutPage.logos.map((logo) => (
              <img
                key={logo._key}
                src={urlFor(logo.image).url()}
                alt={logo.alt || ''}
                className="h-24 w-auto object-contain"
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

// Force dynamic rendering - fetch fresh content on every request
export const dynamic = 'force-dynamic';

// Metadata for the page
export const metadata = {
  title: 'About - Studio Wu',
  description: 'Learn more about Studio Wu',
}
