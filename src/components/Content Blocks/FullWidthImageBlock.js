import Image from "next/image";
import { urlFor } from "../../sanity/lib/image";

// Component to render a full width image block
export default function FullWidthImageBlock({ block }) {
  const { image, alt, imageSize } = block;
  
  if (!image) return null;

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

  return (
    <div className="content-block mb-12 md:mb-24 flex self-center justify-center">
      <Image
        src={urlFor(image).url()}
        alt={alt || 'Content image'}
        width={0}
        height={0}
        sizes="100vw"
        className={`${widthClass} h-auto`}
      />
    </div>
  );
}