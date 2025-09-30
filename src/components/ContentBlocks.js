import {
  FullWidthImageBlock,
  TwoColumnImageBlock,
  ThreeImagesBlock,
  QuoteTwoImagesBlock,
  CenteredImageBlock,
  PullQuoteBlock,
  ImageTextBlock,
  QuoteImageBlock,
  ImageQuoteImageBlock
} from './Content Blocks';

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
          case 'threeImages':
            return <ThreeImagesBlock key={block._key} block={block} />;
          case 'quoteTwoImages':
            return <QuoteTwoImagesBlock key={block._key} block={block} />;
          case 'centeredImage':
            return <CenteredImageBlock key={block._key} block={block} />;
          case 'pullQuote':
            return <PullQuoteBlock key={block._key} block={block} />;
          case 'imageQuoteImage':
            return <ImageQuoteImageBlock key={block._key} block={block} />;
          case 'imageText':
            return <ImageTextBlock key={block._key} block={block} />;
          case 'quoteImage':
            return <QuoteImageBlock key={block._key} block={block} />;
          default:
            console.warn(`Unknown block type: ${block._type}`);
            return null;
        }
      })}
    </div>
  );
}
