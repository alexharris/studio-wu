import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'about',
  title: 'About Page',
  type: 'document',
  icon: () => '📄',
  __experimental_singleton: true, // Restricts to only one document
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
      initialValue: {
        current: 'about'
      }
    }),
    defineField({
      name: 'contentBlocks',
      title: 'Content Blocks',
      type: 'array',
      of: [
        {
          name: 'twoColumnImage',
          title: 'Two Column Images',
          type: 'object',
          fields: [
            {
              name: 'leftImage',
              title: 'Left Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: Rule => Rule.required(),
            },
            {
              name: 'leftAlt',
              title: 'Left Image Alt Text',
              type: 'string',
              description: 'Alternative text for left image',
            },
            {
              name: 'rightImage',
              title: 'Right Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: Rule => Rule.required(),
            },
            {
              name: 'rightAlt',
              title: 'Right Image Alt Text',
              type: 'string',
              description: 'Alternative text for right image',
            },
            {
              name: 'imageSize',
              title: 'Image Size',
              type: 'string',
              options: {
                list: [
                  {title: 'Original', value: 'none'},
                  {title: 'Medium (3/4)', value: 'max-w-9/12'},
                  {title: 'Small (1/2)', value: 'max-w-1/2'},
                ],
              },
              initialValue: 'none',
            },
          ],
          preview: {
            select: {
              leftImage: 'leftImage',
              rightImage: 'rightImage',
              leftAlt: 'leftAlt',
            },
            prepare(selection) {
              const {leftImage, leftAlt} = selection;
              return {
                title: leftAlt || 'Two Column Images',
                subtitle: 'Two Column Block',
                media: leftImage,
              };
            },
          },
        },
        {
          name: 'centeredImage',
          title: 'Centered Image',
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: Rule => Rule.required(),
            },
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Alternative text for accessibility',
            },
            {
              name: 'maxWidth',
              title: 'Max Width',
              type: 'string',
              options: {
                list: [
                  {title: 'Small (400px)', value: 'max-w-sm'},
                  {title: 'Medium (500px)', value: 'max-w-md'},
                  {title: 'Large (600px)', value: 'max-w-lg'},
                  {title: 'Extra Large (700px)', value: 'max-w-xl'},
                  {title: 'XXL (800px)', value: 'max-w-2xl'},
                ],
              },
              initialValue: 'max-w-lg',
              description: 'Maximum width of the centered image',
            },
            {
              name: 'imageSize',
              title: 'Image Size',
              type: 'string',
              options: {
                list: [
                  {title: 'Original', value: 'none'},
                  {title: 'Medium (3/4)', value: 'max-w-9/12'},
                  {title: 'Small (1/2)', value: 'max-w-1/2'},
                ],
              },
              initialValue: 'none',
            },
          ],
          preview: {
            select: {
              title: 'alt',
              media: 'image',
              maxWidth: 'maxWidth',
            },
            prepare(selection) {
              const {title, media, maxWidth} = selection;
              const widthLabel = maxWidth === 'max-w-sm' ? 'Small' :
                                maxWidth === 'max-w-md' ? 'Medium' :
                                maxWidth === 'max-w-lg' ? 'Large' :
                                maxWidth === 'max-w-xl' ? 'XL' : 'XXL';
              return {
                title: title || 'Centered Image',
                subtitle: `Centered Block (${widthLabel})`,
                media: media,
              };
            },
          },
        },
        {
          name: 'pullQuote',
          title: 'Pull Quote',
          type: 'object',
          fields: [
            {
              name: 'quote',
              title: 'Quote Text',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [
                    {title: 'Normal', value: 'normal'},
                  ],
                  lists: [],
                  marks: {
                    decorators: [
                      {title: 'Strong', value: 'strong'},
                      {title: 'Emphasis', value: 'em'},
                    ],
                    annotations: [],
                  },
                }
              ],
              validation: Rule => Rule.required(),
              description: 'The main quote text with rich formatting',
            },
            {
              name: 'attribution',
              title: 'Attribution',
              type: 'string',
              description: 'Optional attribution (author, source, etc.)',
            },
            {
              name: 'size',
              title: 'Text Size',
              type: 'string',
              options: {
                list: [
                  {title: 'Medium', value: 'text-xl'},
                  {title: 'Large', value: 'text-2xl'},
                  {title: 'XL', value: 'text-3xl'},
                  {title: 'XXL', value: 'text-4xl'},
                ],
              },
              initialValue: 'text-3xl',
              description: 'Size of the quote text',
            },
          ],
          preview: {
            select: {
              quote: 'quote',
              attribution: 'attribution',
              size: 'size',
            },
            prepare(selection) {
              const {quote, attribution, size} = selection;
              const sizeLabel = size === 'text-xl' ? 'Medium' :
                               size === 'text-2xl' ? 'Large' :
                               size === 'text-3xl' ? 'XL' : 'XXL';
              // Extract plain text from portable text for preview
              const plainText = quote?.[0]?.children?.[0]?.text || '';
              const truncatedQuote = plainText.length > 50 ? plainText.substring(0, 50) + '...' : plainText;
              return {
                title: truncatedQuote || 'Pull Quote',
                subtitle: `Quote Block (${sizeLabel})${attribution ? ` - ${attribution}` : ''}`,
              };
            },
          },
        },
        {
          name: 'imageQuoteImage',
          title: 'Image Quote Image Block',
          type: 'object',
          fields: [
            {
              name: 'leftImage',
              title: 'Quote Section Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: Rule => Rule.required(),
              description: 'Image that appears above the quote in the left column',
            },
            {
              name: 'leftAlt',
              title: 'Quote Section Image Alt Text',
              type: 'string',
              description: 'Alternative text for the quote section image',
            },
            {
              name: 'quote',
              title: 'Quote Text',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [
                    {title: 'Normal', value: 'normal'},
                  ],
                  lists: [],
                  marks: {
                    decorators: [
                      {title: 'Strong', value: 'strong'},
                      {title: 'Emphasis', value: 'em'},
                    ],
                    annotations: [],
                  },
                }
              ],
              validation: Rule => Rule.required(),
              description: 'Large quote text that appears below the left image',
            },
            {
              name: 'attribution',
              title: 'Quote Attribution',
              type: 'string',
              description: 'Optional attribution for the quote (author, source, etc.)',
            },
            {
              name: 'rightImage',
              title: 'Side Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: Rule => Rule.required(),
              description: 'Image that appears in the right column',
            },
            {
              name: 'rightAlt',
              title: 'Side Image Alt Text',
              type: 'string',
              description: 'Alternative text for the side image',
            },
            {
              name: 'layout',
              title: 'Layout',
              type: 'string',
              options: {
                list: [
                  {title: 'Quote Section Left, Single Image Right', value: 'quote-left'},
                  {title: 'Single Image Left, Quote Section Right', value: 'quote-right'},
                ],
              },
              initialValue: 'quote-left',
              description: 'Choose which side the quote section and single image appear on',
            },
            {
              name: 'imageSize',
              title: 'Image Size',
              type: 'string',
              options: {
                list: [
                  {title: 'Original', value: 'none'},
                  {title: 'Medium (3/4)', value: 'max-w-9/12'},
                  {title: 'Small (1/2)', value: 'max-w-1/2'},
                ],
              },
              initialValue: 'none',
            },
          ],
          preview: {
            select: {
              leftImage: 'leftImage',
              rightImage: 'rightImage',
              quote: 'quote',
              attribution: 'attribution',
            },
            prepare(selection) {
              const {leftImage, quote, attribution} = selection;
              const plainText = quote?.[0]?.children?.[0]?.text || '';
              const truncatedQuote = plainText.length > 40 ? plainText.substring(0, 40) + '...' : plainText;
              return {
                title: truncatedQuote || 'Quote & Image Block',
                subtitle: `3/5 Quote + 2/5 Image${attribution ? ` - ${attribution}` : ''}`,
                media: leftImage,
              };
            },
          },
        },
        {
          name: 'imageText',
          title: 'Image & Text',
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: Rule => Rule.required(),
            },
            {
              name: 'alt',
              title: 'Image Alt Text',
              type: 'string',
              description: 'Alternative text for accessibility',
            },
            {
              name: 'text',
              title: 'Text Content',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [
                    {title: 'Normal', value: 'normal'},
                    {title: 'H2', value: 'h2'},
                    {title: 'H3', value: 'h3'},
                    {title: 'H4', value: 'h4'},
                  ],
                  lists: [
                    {title: 'Bullet', value: 'bullet'},
                    {title: 'Numbered', value: 'number'},
                  ],
                  marks: {
                    decorators: [
                      {title: 'Strong', value: 'strong'},
                      {title: 'Emphasis', value: 'em'},
                      {title: 'Underline', value: 'underline'},
                      {title: 'Code', value: 'code'},
                    ],
                    annotations: [
                      {
                        title: 'URL',
                        name: 'link',
                        type: 'object',
                        fields: [
                          {
                            title: 'URL',
                            name: 'href',
                            type: 'url',
                          }
                        ]
                      }
                    ],
                  },
                }
              ],
              validation: Rule => Rule.required(),
              description: 'Rich text content with full WYSIWYG editing capabilities',
            },
            {
              name: 'layout',
              title: 'Layout',
              type: 'string',
              options: {
                list: [
                  {title: 'Image Left, Text Right', value: 'image-left'},
                  {title: 'Text Left, Image Right', value: 'text-left'},
                ],
              },
              initialValue: 'image-left',
              description: 'Choose which side the image and text appear on',
            },
            {
              name: 'imageSize',
              title: 'Image Size',
              type: 'string',
              options: {
                list: [
                  {title: 'Original', value: 'none'},
                  {title: 'Medium (3/4)', value: 'max-w-9/12'},
                  {title: 'Small (1/2)', value: 'max-w-1/2'},
                ],
              },
              initialValue: 'none',
            },
          ],
          preview: {
            select: {
              image: 'image',
              text: 'text',
              layout: 'layout',
            },
            prepare(selection) {
              const {image, text, layout} = selection;
              const layoutLabel = layout === 'image-left' ? 'Image Left' : 'Text Left';
              const plainText = text?.[0]?.children?.[0]?.text || '';
              const truncatedText = plainText.length > 30 ? plainText.substring(0, 30) + '...' : plainText;
              return {
                title: truncatedText || 'Image & Text',
                subtitle: `${layoutLabel}`,
                media: image,
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      const {title} = selection;
      return {
        title: title || 'About Page',
        subtitle: 'About page content',
      };
    },
  },
})
