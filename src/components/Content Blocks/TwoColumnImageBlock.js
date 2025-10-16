import Image from "next/image";
import { urlFor } from "../../sanity/lib/image";

// Component to render a two column image block
export default function TwoColumnImageBlock({ block }) {
  const { leftImage, leftAlt, rightImage, rightAlt, leftImageSize, rightImageSize } = block;
  
  if (!leftImage || !rightImage) return null;

  console.log(leftImageSize, rightImageSize);
  // Determine the width class based on imageSize selection
  const getLeftImageSize = (leftImageSize) => {
    switch (leftImageSize) {
      case 'max-w-9/12':
        return 'md:max-w-9/12';
      case 'max-w-1/2':
        return 'md:max-w-1/2';
      case 'none':
      default:
        return 'w-full';
    }
  };

  const getRightImageSize = (rightImageSize) => {
    switch (rightImageSize) {
      case 'max-w-9/12':
        return 'md:max-w-9/12';
      case 'max-w-1/2':
        return 'md:max-w-1/2';
      case 'none':
      default:
        return 'w-full';
    }
  };

  const leftWidthClass = getLeftImageSize(leftImageSize);
  const rightWidthClass = getRightImageSize(rightImageSize);


  return (
    <div className="content-block two-column-image-block mb-12 md:mb-24 flex self-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 w-full">
        <div className={`flex place-self-center justify-center ${leftWidthClass}`}>
          <Image
            src={urlFor(leftImage).url()}
            alt={leftAlt || 'Left image'}
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto"
          />
        </div>
        <div className={`flex place-self-center justify-center ${rightWidthClass}`}>
          <Image
            src={urlFor(rightImage).url()}
            alt={rightAlt || 'Right image'}
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}