import Image from "next/image";
import { PortableText } from '@portabletext/react';
import { urlFor } from "../sanity/lib/image";

// Component to render a full width image block
const FullWidthImageBlock = ({ block }) => {
  const { image, alt, caption } = block;
  
  if (!image) return null;

  return (
    <div className="mb-12 md:mb-24 ">
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
    <div className="mb-12 md:mb-24 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
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
    <div className="mb-12 md:mb-24  flex flex-col items-center">
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
    <div className="mb-12 md:mb-24 py-8">
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

// Component to render an image and text block
const ImageTextBlock = ({ block }) => {
  const { image, alt, text, layout = 'image-left' } = block;
  
  if (!image || !text) return null;

  // Standard body text styling for PortableText rendering
  const portableTextComponents = {
    block: {
      normal: ({ children }) => (
        <p className="text-base leading-relaxed text-gray-900 mb-4">
          {children}
        </p>
      ),
      h2: ({ children }) => (
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          {children}
        </h3>
      ),
      h4: ({ children }) => (
        <h4 className="text-lg font-semibold text-gray-900 mb-2">
          {children}
        </h4>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="list-disc ml-6 mb-4 space-y-2">
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className="list-decimal ml-6 mb-4 space-y-2">
          {children}
        </ol>
      ),
    },
    listItem: ({ children }) => (
      <li className="text-base leading-relaxed text-gray-900">
        {children}
      </li>
    ),
    marks: {
      strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
      em: ({ children }) => <em className="italic">{children}</em>,
      underline: ({ children }) => <span className="underline">{children}</span>,
      code: ({ children }) => (
        <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">
          {children}
        </code>
      ),
      link: ({ children, value }) => (
        <a 
          href={value?.href} 
          className="text-blue-600 hover:text-blue-800 underline"
          target={value?.href?.startsWith('http') ? '_blank' : '_self'}
          rel={value?.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      ),
    },
    types: {
      break: () => <br />,
    },
  };

  const imageElement = (
    <div className="flex-1">
      <Image
        src={urlFor(image).url()}
        alt={alt || 'Content image'}
        width={0}
        height={0}
        sizes="(max-width: 768px) 100vw, 50vw"
        className="w-full h-auto"
      />
    </div>
  );

  const textElement = (
    <div className="flex-1">
      <div className="prose prose-gray max-w-none">
        <PortableText 
          value={text} 
          components={portableTextComponents}
        />
      </div>
    </div>
  );

  return (
    <div className="mb-12 md:mb-24 ">
      <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">
        {layout === 'image-left' ? (
          <>
            {imageElement}
            {textElement}
          </>
        ) : (
          <>
            {textElement}
            {imageElement}
          </>
        )}
      </div>
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
    <div className="mb-12 md:mb-24 ">
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
          case 'imageText':
            return <ImageTextBlock key={block._key} block={block} />;
          default:
            console.warn(`Unknown block type: ${block._type}`);
            return null;
        }
      })}
    </div>
  );
}
