import Image from "next/image";
import { PortableText } from '@portabletext/react';
import { urlFor } from "../../sanity/lib/image";

// Component to render an image and quote block
export default function QuoteImageBlock({ block }) {
  const { image, alt, quote, attribution, layout = 'image-left' } = block;
  
  if (!image || !quote) return null;

  // Custom components for PortableText rendering (medium size)
  const portableTextComponents = {
    block: {
      normal: ({ children }) => (
        <p className="text-2xl font-light leading-relaxed text-gray-900 mb-4">
          "{children}"
        </p>
      ),
    },
    marks: {
      strong: ({ children }) => <strong className="font-medium">{children}</strong>,
      em: ({ children }) => <em className="italic">{children}</em>,
    },
  };

  const imageElement = (
    <div className="flex-1 w-full">
      <Image
        src={urlFor(image).url()}
        alt={alt || 'Quote image'}
        width={0}
        height={0}
        sizes="(max-width: 768px) 100vw, 50vw"
        className="w-full h-auto"
      />
    </div>
  );

  const quoteElement = (
    <div className="flex-1 flex flex-col">
      <blockquote>
        <PortableText 
          value={quote} 
          components={portableTextComponents}
        />
        {attribution && (
          <cite className="text-lg text-gray-600 not-italic">
            — {attribution}
          </cite>
        )}
      </blockquote>
    </div>
  );

  return (
    <div className="content-block mb-12 md:mb-24 ">
      <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">
        {layout === 'image-left' ? (
          <>
            {imageElement}
            {quoteElement}
          </>
        ) : (
          <>
            {quoteElement}
            {imageElement}
          </>
        )}
      </div>
    </div>
  );
}