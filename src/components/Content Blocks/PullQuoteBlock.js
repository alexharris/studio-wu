import { PortableText } from '@portabletext/react';
import { getBottomMarginProps } from "../../utils/bottomMargin";

// Component to render a pull quote block
export default function PullQuoteBlock({ block }) {
  const { quote, attribution, bottomMargin, customBottomMargin } = block;

  if (!quote) return null;

  const marginProps = getBottomMarginProps({ bottomMargin, customBottomMargin });

  // Custom components for PortableText rendering
  const portableTextComponents = {
    block: {
      normal: ({ children }) => (
        <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-900 mb-4">
          "{children}"
        </p>
      ),
    },
    marks: {
      strong: ({ children }) => <strong className="font-medium">{children}</strong>,
      em: ({ children }) => <em className="italic">{children}</em>,
    },
  };

  return (
    <div className={`content-block pull-quote-block ${marginProps.className} py-8`} style={marginProps.style}>
      <blockquote className="text-center max-w-4xl mx-auto">
        <PortableText 
          value={quote} 
          components={portableTextComponents}
        />
        {attribution && (
          <cite className="text-base md:text-lg text-gray-600 not-italic">
            — {attribution}
          </cite>
        )}
      </blockquote>
    </div>
  );
}