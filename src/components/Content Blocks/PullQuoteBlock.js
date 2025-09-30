import { PortableText } from '@portabletext/react';

// Component to render a pull quote block
export default function PullQuoteBlock({ block }) {
  const { quote, attribution, size = 'text-3xl' } = block;
  
  if (!quote) return null;

  // Custom components for PortableText rendering
  const portableTextComponents = {
    block: {
      normal: ({ children }) => (
        <p className={`${size} font-light leading-relaxed text-gray-900 mb-4`}>
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
    <div className="content-block mb-12 md:mb-24 py-8">
      <blockquote className="text-center max-w-4xl mx-auto">
        <PortableText 
          value={quote} 
          components={portableTextComponents}
        />
        {attribution && (
          <cite className="text-lg text-gray-600 not-italic">
            — {attribution}
          </cite>
        )}
      </blockquote>
    </div>
  );
}