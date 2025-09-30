import Image from "next/image";
import { urlFor } from "../../sanity/lib/image";

// Component to render a two column image block
export default function TwoColumnImageBlock({ block }) {
  const { leftImage, leftAlt, rightImage, rightAlt } = block;
  
  if (!leftImage || !rightImage) return null;

  return (
    <div className="content-block mb-12 md:mb-24 ">
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
}