import { notFound } from "next/navigation";
import { client } from "../../sanity/lib/client";
import { getContactPageQuery, getSettingsQuery } from "../../utils/sanity-queries";
import { urlFor } from "../../sanity/lib/image";

export default async function Contact() {
  const [contactPage, settings] = await Promise.all([
    client.fetch(getContactPageQuery),
    client.fetch(getSettingsQuery)
  ]);

  if (!contactPage) {
    notFound();
  }

  return (
    <div className="px-4 md:px-8 flex-1">
      <main className="w-full flex flex-col items-center">
        <h1 className="mb-8 text-4xl sr-only">{contactPage.title}</h1>
        <p className="my-8 pt-4 pb-6">Get in touch at <a href={`mailto:${settings?.emailAddress || ''}`} className="underline underline-offset-4">{settings?.emailAddress || ''}</a></p>
        {/* Render contact image */}
        {contactPage.image && (

            <img 
              src={urlFor(contactPage.image).url()} 
              alt={contactPage.alt || ''} 
              className="w-full md:w-3/5 h-auto"
            />
       
        )}
      </main>
    </div>
  );
}

// Force dynamic rendering - fetch fresh content on every request
export const dynamic = 'force-dynamic';

// Metadata for the page
export const metadata = {
  title: 'Contact - Studio Wu',
  description: 'Contact Studio Wu',
}
