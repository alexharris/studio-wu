import Image from "next/image";
import { PortableText } from '@portabletext/react';
import { urlFor } from "../../sanity/lib/image";

// Component to render a two-column block with image + quote (3/5) and single image (2/5)
export default function ImageQuoteImageBlock({ block }) {
  const { leftImage, leftAlt, quote, attribution, rightImage, rightAlt, layout = 'quote-left' } = block;
  
  if (!leftImage || !quote || !rightImage) return null;

  // Custom components for PortableText rendering (large quote)
  const portableTextComponents = {
    block: {
      normal: ({ children }) => (
        <p className="text-3xl font-light leading-relaxed text-gray-900 mb-4">
          "{children}"
        </p>
      ),
    },
    marks: {
      strong: ({ children }) => <strong className="font-medium">{children}</strong>,
      em: ({ children }) => <em className="italic">{children}</em>,
    },
  };

  // Quote section (image + quote)
  const quoteSection = (
    <div className="md:col-span-3">
      <div className="mb-6">
        <Image
          src={urlFor(leftImage).url()}
          alt={leftAlt || 'Quote section image'}
          width={0}
          height={0}
          sizes="(max-width: 768px) 100vw, 60vw"
          className="w-full h-auto"
        />
      </div>
      <blockquote className="text-center">
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

  // Single image section
  const singleImageSection = (
    <div className="md:col-span-2 flex items-center">
      <Image
        src={urlFor(rightImage).url()}
        alt={rightAlt || 'Side image'}
        width={0}
        height={0}
        sizes="(max-width: 768px) 100vw, 40vw"
        className="w-full h-auto"
      />
    </div>
  );

  return (
    <div className="content-block mb-12 md:mb-24">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8">
        {layout === 'quote-left' ? (
          <>
            {quoteSection}
            {singleImageSection}
          </>
        ) : (
          <>
            {singleImageSection}
            {quoteSection}
          </>
        )}
      </div>
    </div>
  );
}