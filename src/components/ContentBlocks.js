import Image from "next/image";
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
          default:
            console.warn(`Unknown block type: ${block._type}`);
            return null;
        }
      })}
    </div>
  );
}
