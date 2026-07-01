import Image from "next/image";
import { urlFor } from "../../sanity/lib/image";
import { getBottomMarginProps } from "../../utils/bottomMargin";

// Component to render a centered image block
export default function CenteredImageBlock({ block }) {
  const { image, alt, imageSize, bottomMargin, customBottomMargin } = block;

  if (!image) return null;

  const marginProps = getBottomMarginProps({ bottomMargin, customBottomMargin });

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
    <div className={`content-block centered-image-block ${marginProps.className} flex flex-col items-center`} style={marginProps.style}>

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