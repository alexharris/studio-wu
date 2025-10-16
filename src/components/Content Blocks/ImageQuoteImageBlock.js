import Image from "next/image";
import { PortableText } from '@portabletext/react';
import { urlFor } from "../../sanity/lib/image";

// Component to render a two-column block with image + quote (3/5) and single image (2/5)
export default function ImageQuoteImageBlock({ block }) {
  const { leftImage, leftAlt, quote, attribution, rightImage, rightAlt, layout = 'quote-left', imageSize } = block;
  
  if (!leftImage || !quote || !rightImage) return null;

  // Determine the width class based on imageSize selection
  const getWidthClass = (size) => {
    switch (size) {
      case 'max-w-9/12':
        return 'md:max-w-9/12';
      case 'max-w-1/2':
        return 'md:max-w-1/2';
      case 'none':
      default:
        return 'w-full';
    }
  };

  const widthClass = getWidthClass(imageSize);

  // Custom components for PortableText rendering (large quote)
  const portableTextComponents = {
    block: {
      normal: ({ children }) => (
        <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-900 mb-4">
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
      <blockquote className="text-center py-16 md:py-0">
        <PortableText 
          value={quote} 
          components={portableTextComponents}
        />
        {attribution && (
          <cite className="text-gray-600 not-italic">
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
    <div className={`content-block image-quote-image-block mb-12 md:mb-24 flex self-center justify-center ${widthClass}`}>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-8 w-full">
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