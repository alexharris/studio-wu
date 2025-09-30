import Image from "next/image";
import { urlFor } from "../../sanity/lib/image";

// Component to render a centered image block
export default function CenteredImageBlock({ block }) {
  const { image, alt, maxWidth = 'max-w-lg' } = block;
  
  if (!image) return null;

  return (
    <div className="content-block mb-12 md:mb-24  flex flex-col items-center">
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
    </div>
  );
}