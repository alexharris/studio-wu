import Image from "next/image";
import { urlFor } from "../../sanity/lib/image";

// Component to render a three column image block
export default function ThreeImagesBlock({ block }) {
  const { leftImage, leftAlt, centerImage, centerAlt, rightImage, rightAlt, imageSize } = block;
  
  if (!leftImage || !centerImage || !rightImage) return null;

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
    <div className={`content-block three-images-block mb-12 md:mb-24 flex self-center justify-center ${widthClass}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 w-full">
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
        <div>
          <Image
            src={urlFor(centerImage).url()}
            alt={centerAlt || 'Center image'}
            width={0}
            height={0}
            sizes="(max-width: 768px) 100vw, 33vw"
            className="w-full h-auto"
          />
        </div>
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
      </div>
    </div>
  );
}