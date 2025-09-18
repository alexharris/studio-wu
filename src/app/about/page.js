import { notFound } from "next/navigation";
import { client } from "../../sanity/lib/client";
import { getAboutPageQuery } from "../../utils/sanity-queries";
import ContentBlocks from "../../components/ContentBlocks";

export default async function About() {
  const aboutPage = await client.fetch(getAboutPageQuery);

  if (!aboutPage) {
    notFound();
  }

  return (
    <div className="px-4 md:px-8 flex-1">
      <main>
        <h1 className="sr-only">{aboutPage.title}</h1>
        
        {/* Render content blocks */}
        <ContentBlocks blocks={aboutPage.contentBlocks} />
      </main>
    </div>
  );
}

// Metadata for the page
export const metadata = {
  title: 'About - Studio Wu',
  description: 'Learn more about Studio Wu',
}
