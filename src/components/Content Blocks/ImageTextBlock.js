import Image from "next/image";
import { PortableText } from '@portabletext/react';
import { urlFor } from "../../sanity/lib/image";

// Component to render an image and text block
export default function ImageTextBlock({ block }) {
  const { image, alt, text, layout = 'image-left' } = block;
  
  if (!image || !text) return null;

  // Standard body text styling for PortableText rendering
  const portableTextComponents = {
    block: {
      normal: ({ children }) => (
        <p className="text-base leading-relaxed mb-4">
          {children}
        </p>
      ),
      h2: ({ children }) => (
        <h2 className="text-2xl mb-4">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-xl mb-3">
          {children}
        </h3>
      ),
      h4: ({ children }) => (
        <h4 className="text-l mb-2">
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
    <div className="flex-1 w-full self-center flex justify-center">
      <Image
        src={urlFor(image).url()}
        alt={alt || 'Content image'}
        width={0}
        height={0}
        sizes="(max-width: 768px) 100vw, 50vw"
        className="w-1/2 h-auto"
      />
    </div>
  );

  const textElement = (
    <div className="flex-1 w-full">
      <div className="max-w-none">
        <PortableText 
          value={text} 
          components={portableTextComponents}
        />
      </div>
    </div>
  );

  return (
    <div className="content-block mb-12 md:mb-24 ">
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
}