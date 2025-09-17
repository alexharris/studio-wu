import Image from "next/image";
import { PortableText } from '@portabletext/react';
import { urlFor } from "../sanity/lib/image";

// Component to render a full width image block
const FullWidthImageBlock = ({ block }) => {
  const { image, alt, caption } = block;
  
  if (!image) return null;

  return (
    <div className="mb-8">
      <Image
        src={urlFor(image).url()}
        alt={alt || 'Content image'}
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-auto"
      />
      {caption && (
        <p className="text-sm text-gray-600 mt-2 text-center italic">
          {caption}
        </p>
      )}
    </div>
  );
};

// Component to render a two column image block
const TwoColumnImageBlock = ({ block }) => {
  const { leftImage, leftAlt, rightImage, rightAlt, caption } = block;
  
  if (!leftImage || !rightImage) return null;

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Image
            src={urlFor(leftImage).url()}
            alt={leftAlt || 'Left image'}
            width={0}
            height={0}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="w-full h-auto"
          />
        </div>
        <div>
          <Image
            src={urlFor(rightImage).url()}
            alt={rightAlt || 'Right image'}
            width={0}
            height={0}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

// Component to render a centered image block
const CenteredImageBlock = ({ block }) => {
  const { image, alt, caption, maxWidth = 'max-w-lg' } = block;
  
  if (!image) return null;

  return (
    <div className="mb-8 flex flex-col items-center">
      <div className={`${maxWidth} w-full`}>
        <Image
          src={urlFor(image).url()}
          alt={alt || 'Content image'}
          width={0}
          height={0}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 60vw"
          className="w-full h-auto"
        />
      </div>
      {caption && (
        <p className="text-sm text-gray-600 mt-2 text-center italic">
          {caption}
        </p>
      )}
    </div>
  );
};

// Component to render a pull quote block
const PullQuoteBlock = ({ block }) => {
  const { quote, attribution, size = 'text-3xl' } = block;
  
  if (!quote) return null;

  // Custom components for PortableText rendering
  const portableTextComponents = {
    block: {
      normal: ({ children }) => (
        <p className={`${size} font-light leading-relaxed text-gray-900 mb-4`}>
          "{children}"
        </p>
      ),
    },
    marks: {
      strong: ({ children }) => <strong className="font-medium">{children}</strong>,
      em: ({ children }) => <em className="italic">{children}</em>,
    },
  };

  return (
    <div className="mb-8 py-8">
      <blockquote className="text-center max-w-4xl mx-auto">
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
};

// Component to render an image and quote block
const ImageQuoteBlock = ({ block }) => {
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
    <div className="flex-1">
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
    <div className="flex-1 flex flex-col px-6 md:px-8">
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
    <div className="mb-8">
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
};

// Main ContentBlocks component that renders different block types
export default function ContentBlocks({ blocks }) {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  return (
    <div className="content-blocks">
      {blocks.map((block) => {
        switch (block._type) {
          case 'fullWidthImage':
            return <FullWidthImageBlock key={block._key} block={block} />;
          case 'twoColumnImage':
            return <TwoColumnImageBlock key={block._key} block={block} />;
          case 'centeredImage':
            return <CenteredImageBlock key={block._key} block={block} />;
          case 'pullQuote':
            return <PullQuoteBlock key={block._key} block={block} />;
          case 'imageQuote':
            return <ImageQuoteBlock key={block._key} block={block} />;
          default:
            console.warn(`Unknown block type: ${block._type}`);
            return null;
        }
      })}
    </div>
  );
}
