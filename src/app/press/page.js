import Image from "next/image";
import { client } from "../../sanity/lib/client";
import { urlFor } from "../../sanity/lib/image";
import { getAllPressQuery } from "../../utils/sanity-queries";

export default async function Press() {
  const pressItems = await client.fetch(getAllPressQuery);

  return (
    <>
      <div className="px-4 md:px-8 flex-1 w-full mx-auto">
        <main className="">
          <h1 className="text-4xl mb-24 text-center">Press</h1>
          <div className="flex flex-col md:flex-row gap-8">
            {pressItems.length > 0 ? (
              <div className="w-full md:w-1/2 flex flex-col gap-8">
                {pressItems.map((pressItem) => (
                  <div key={pressItem._id} className="block">
                    <div className="">
                      <div className="">
                        <a href={pressItem.link.url}>
                          <h2 className="text-xl mb-2 self">{pressItem.link.text}</h2>
                        </a>                      
                        {pressItem.title && <p className="angie mb-2"><em>{pressItem.source}</em>{pressItem.date && <span> - {pressItem.date}</span>}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No press coverage found.</p>
            )}
            <div className="w-full md:w-1/2">
              <Image
                src="/2024_0521_StudioWu_609McCorkle_PlayBarn_2.jpg"
                alt={pressItems[0].alt || "Press Image"}
                width={0}
                height={0}
                sizes="100vw"
                className="w-full"
              />
            </div>
          </div>

        </main>
      </div>
    </>
  );
}

// Force dynamic rendering - fetch fresh content on every request
export const dynamic = 'force-dynamic';

// Metadata for the page
export const metadata = {
  title: 'Press - Studio Wu',
  description: 'Press for Studio Wu',
}
