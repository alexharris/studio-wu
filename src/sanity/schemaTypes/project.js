import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Projects',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
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
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'contentBlocks',
      title: 'Content Blocks',
      type: 'array',
      of: [
        {
          name: 'fullWidthImage',
          title: 'Full Width Image',
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
              name: 'caption',
              title: 'Caption',
              type: 'string',
              description: 'Optional caption displayed below the image',
            },
          ],
          preview: {
            select: {
              title: 'alt',
              media: 'image',
            },
            prepare(selection) {
              const {title, media} = selection;
              return {
                title: title || 'Full Width Image',
                subtitle: 'Image Block',
                media: media,
              };
            },
          },
        },
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
              name: 'caption',
              title: 'Caption',
              type: 'string',
              description: 'Optional caption displayed below the image',
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
                  {title: 'Medium', value: 'text-2xl'},
                  {title: 'Large', value: 'text-3xl'},
                  {title: 'XL', value: 'text-4xl'},
                  {title: 'XXL', value: 'text-5xl'},
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
              const sizeLabel = size === 'text-2xl' ? 'Medium' :
                               size === 'text-3xl' ? 'Large' :
                               size === 'text-4xl' ? 'XL' : 'XXL';
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
          name: 'imageQuote',
          title: 'Image & Quote',
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
              description: 'The quote text with rich formatting',
            },
            {
              name: 'attribution',
              title: 'Attribution',
              type: 'string',
              description: 'Optional attribution (author, source, etc.)',
            },
            {
              name: 'layout',
              title: 'Layout',
              type: 'string',
              options: {
                list: [
                  {title: 'Image Left, Quote Right', value: 'image-left'},
                  {title: 'Quote Left, Image Right', value: 'quote-left'},
                ],
              },
              initialValue: 'image-left',
              description: 'Choose which side the image and quote appear on',
            },
          ],
          preview: {
            select: {
              image: 'image',
              quote: 'quote',
              attribution: 'attribution',
              layout: 'layout',
            },
            prepare(selection) {
              const {image, quote, attribution, layout} = selection;
              const layoutLabel = layout === 'image-left' ? 'Image Left' : 'Quote Left';
              const plainText = quote?.[0]?.children?.[0]?.text || '';
              const truncatedQuote = plainText.length > 30 ? plainText.substring(0, 30) + '...' : plainText;
              return {
                title: truncatedQuote || 'Image & Quote',
                subtitle: `${layoutLabel}${attribution ? ` - ${attribution}` : ''}`,
                media: image,
              };
            },
          },
        },
      ],
    }),
  ],
})
