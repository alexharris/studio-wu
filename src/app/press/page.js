import Image from "next/image";
import { client } from "../../sanity/lib/client";
import { urlFor } from "../../sanity/lib/image";
import { getAllPressQuery } from "../../utils/sanity-queries";

export default async function Press() {
  const pressItems = await client.fetch(getAllPressQuery);

  return (
    <>
      <div className="px-8 flex-1">
        <main className="">
          <h1 className="text-6xl mb-24 text-center">Press</h1>

          {pressItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {pressItems.map((pressItem) => (
                <div key={pressItem._id} className="block">
                  <div className="">
                    {pressItem.image && (
                      <a 
                        href={pressItem.link.url}
                      >              
                        <div className="relative w-full aspect-[2/3] mb-4">
                          <Image
                            src={urlFor(pressItem.image).url()}
                            alt={pressItem.title || 'Press image'}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </a>
                    )}
                    <div className="">
                      <a href={pressItem.link.url}>
                        <h2 className="text-xl mb-2 self">{pressItem.link.text}</h2>
                      </a>                      

                      {pressItem.link && (
                        <a href={pressItem.link.url}>
                          {pressItem.title && <p className="angie mb-2"><em>{pressItem.source}</em>{pressItem.date && <span> - {pressItem.date}</span>}</p>}
                          
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No press coverage found.</p>
          )}
        </main>
      </div>
    </>
  );
}