import { notFound } from "next/navigation";
import { client } from "../../sanity/lib/client";
import { getContactPageQuery } from "../../utils/sanity-queries";
import { urlFor } from "../../sanity/lib/image";

export default async function Contact() {
  const contactPage = await client.fetch(getContactPageQuery);

  if (!contactPage) {
    notFound();
  }

  return (
    <div className="px-8 flex-1">
      <main className="w-full flex flex-col items-center">
        <h1 className="mb-4 text-2xl">{contactPage.title}</h1>
        <p className="mb-4">email address</p>
        <p className="mb-16">phone number</p>
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

// Metadata for the page
export const metadata = {
  title: 'Contact - Studio Wu',
  description: 'Contact Studio Wu',
}
