import { PortableText } from '@portabletext/react';
import { getBottomMarginProps } from "../../utils/bottomMargin";

// Component to render a text-only block
export default function TextBlock({ block }) {
  const { text, layout = 'full', bottomMargin, customBottomMargin } = block;

  if (!text) return null;

  const marginProps = getBottomMarginProps({ bottomMargin, customBottomMargin });

  const isTwoColumn = layout === 'left' || layout === 'right';

  // Standard body text styling for PortableText rendering
  const portableTextComponents = {
    block: {
      normal: ({ children }) => (
        <p className="text-base leading-relaxed mb-4">
          {children}
        </p>
      ),
      h2: ({ children }) => (
        <h2 className="text-xl mb-2 self">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-lg mb-2 self">
          {children}
        </h3>
      ),
      h4: ({ children }) => (
        <h4 className="text-base mb-2 self">
          {children}
        </h4>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="list-disc ml-6 mb-4 space-y-2">
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className="list-decimal ml-6 mb-4 space-y-2">
          {children}
        </ol>
      ),
    },
    listItem: ({ children }) => (
      <li className="text-base leading-relaxed text-gray-900">
        {children}
      </li>
    ),
    marks: {
      strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
      em: ({ children }) => <em className="italic">{children}</em>,
      underline: ({ children }) => <span className="underline">{children}</span>,
      code: ({ children }) => (
        <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">
          {children}
        </code>
      ),
      link: ({ children, value }) => (
        <a
          href={value?.href}
          className="text-blue-600 hover:text-blue-800 underline"
          target={value?.href?.startsWith('http') ? '_blank' : '_self'}
          rel={value?.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      ),
    },
    types: {
      break: () => <br />,
    },
  };

  const textElement = (
    <div className="flex-1 w-full prose max-w-none">
      <PortableText
        value={text}
        components={portableTextComponents}
      />
    </div>
  );

  if (!isTwoColumn) {
    return (
      <div className={`content-block text-block ${marginProps.className}`} style={marginProps.style}>
        <div className="prose max-w-none">
          <PortableText
            value={text}
            components={portableTextComponents}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`content-block text-block ${marginProps.className}`} style={marginProps.style}>
      <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8 w-full">
        {layout === 'left' ? (
          <>
            {textElement}
            <div className="hidden md:block flex-1 w-full" />
          </>
        ) : (
          <>
            <div className="hidden md:block flex-1 w-full" />
            {textElement}
          </>
        )}
      </div>
    </div>
  );
}
