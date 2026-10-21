import Image from "next/image";
import ExpandOnHover from "../ExpandOnHover";
import { urlFor } from "../../sanity/lib/image";
import { getBottomMarginProps } from "../../utils/bottomMargin";

const CROPS = {
  wide: { width: 1800, height: 900, className: 'aspect-[2/1]' },
  landscape: { width: 1800, height: 1200, className: 'aspect-[3/2]' },
};

// Component to render a single image spanning the full content width
export default function FullWidthImageBlock({ block }) {
  const { image, alt, aspectRatio, bottomMargin, customBottomMargin } = block;

  if (!image) return null;

  const marginProps = getBottomMarginProps({ bottomMargin, customBottomMargin });
  const crop = CROPS[aspectRatio];

  return (
    <div className={`content-block full-width-image-block ${marginProps.className}`} style={marginProps.style}>
      <ExpandOnHover>
      <Image
        src={crop ? urlFor(image).width(crop.width).height(crop.height).fit('crop').url() : urlFor(image).url()}
        alt={alt || 'Content image'}
        data-lightbox={urlFor(image).width(2400).fit('max').auto('format').url()}
        width={0}
        height={0}
        sizes="(min-width: 768px) 75vw, 100vw"
        className={`w-full h-auto cursor-zoom-in ${crop ? `${crop.className} object-cover` : ''}`}
      />
      </ExpandOnHover>
    </div>
  );
}
