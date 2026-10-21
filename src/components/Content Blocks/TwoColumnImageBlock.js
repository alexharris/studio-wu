import Image from "next/image";
import ExpandOnHover from "../ExpandOnHover";
import { urlFor } from "../../sanity/lib/image";
import { getBottomMarginProps } from "../../utils/bottomMargin";

// Component to render a two column image block
export default function TwoColumnImageBlock({ block }) {
  const { leftImage, leftAlt, rightImage, rightAlt, aspectRatio, bottomMargin, customBottomMargin } = block;

  if (!leftImage || !rightImage) return null;

  const marginProps = getBottomMarginProps({ bottomMargin, customBottomMargin });

  // Landscape/portrait crop both images to the same shape; anything else keeps the original proportions
  const cropped = aspectRatio === 'landscape' || aspectRatio === 'portrait';
  const [cropWidth, cropHeight] = aspectRatio === 'portrait' ? [1000, 1500] : [1500, 1000];
  const imageUrl = (image) => cropped
    ? urlFor(image).width(cropWidth).height(cropHeight).fit('crop').url()
    : urlFor(image).url();
  const lightboxUrl = (image) => urlFor(image).width(2400).fit('max').auto('format').url();
  const imageClass = cropped
    ? `cursor-zoom-in w-full h-auto object-cover ${aspectRatio === 'portrait' ? 'aspect-[2/3]' : 'aspect-[3/2]'}`
    : 'cursor-zoom-in w-full h-auto';


  return (
    <div className={`content-block two-column-image-block ${marginProps.className} flex self-center justify-center`} style={marginProps.style}>
      <div className="grid grid-cols-2 gap-4 md:gap-8 w-full">
        <div className="w-full self-center">
          <ExpandOnHover>
          <Image
            src={imageUrl(leftImage)}
            alt={leftAlt || 'Left image'}
            data-lightbox={lightboxUrl(leftImage)}
            width={0}
            height={0}
            sizes="100vw"
            className={imageClass}
          />
          </ExpandOnHover>
        </div>
        <div className="w-full self-center">
          <ExpandOnHover>
          <Image
            src={imageUrl(rightImage)}
            alt={rightAlt || 'Right image'}
            data-lightbox={lightboxUrl(rightImage)}
            width={0}
            height={0}
            sizes="100vw"
            className={imageClass}
          />
          </ExpandOnHover>
        </div>
      </div>
    </div>
  );
}