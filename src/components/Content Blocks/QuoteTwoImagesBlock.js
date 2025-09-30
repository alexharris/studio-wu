import Image from "next/image";
import { PortableText } from '@portabletext/react';
import { urlFor } from "../../sanity/lib/image";

// Component to render a quote with two images block
export default function QuoteTwoImagesBlock({ block }) {
  const { quote, attribution, leftImage, leftAlt, rightImage, rightAlt, layout = 'quote-left', imageSize } = block;
  
  if (!quote || !leftImage || !rightImage) return null;

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

  // Standard body text styling for PortableText rendering
  const portableTextComponents = {
    block: {
      normal: ({ children }) => (
        <p className="text-xl md:text-2xl leading-relaxed mb-4">
          "{children}"
        </p>
      ),
    },
    marks: {
      strong: ({ children }) => <strong className="font-medium">{children}</strong>,
      em: ({ children }) => <em className="italic">{children}</em>,
    },
  };

  const quoteElement = (
    <div className="flex flex-col justify-center h-full text-center">
      <blockquote>
        <PortableText 
          value={quote} 
          components={portableTextComponents}
        />
        {attribution && (
          <cite className="text-base text-gray-600 not-italic">
            — {attribution}
          </cite>
        )}
      </blockquote>
    </div>
  );

  const leftImageElement = (
    <div>
      <Image
        src={urlFor(leftImage).url()}
        alt={leftAlt || 'Left image'}
        width={0}
        height={0}
        sizes="(max-width: 768px) 100vw, 33vw"
        className="w-full h-auto"
      />
    </div>
  );

  const rightImageElement = (
    <div>
      <Image
        src={urlFor(rightImage).url()}
        alt={rightAlt || 'Right image'}
        width={0}
        height={0}
        sizes="(max-width: 768px) 100vw, 33vw"
        className="w-full h-auto"
      />
    </div>
  );

  return (
    <div className={`content-block mb-12 md:mb-24 flex self-center justify-center ${widthClass}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full">
        {layout === 'quote-left' && (
          <>
            {quoteElement}
            {leftImageElement}
            {rightImageElement}
          </>
        )}
        {layout === 'quote-center' && (
          <>
            {leftImageElement}
            {quoteElement}
            {rightImageElement}
          </>
        )}
        {layout === 'quote-right' && (
          <>
            {leftImageElement}
            {rightImageElement}
            {quoteElement}
          </>
        )}
      </div>
    </div>
  );
}