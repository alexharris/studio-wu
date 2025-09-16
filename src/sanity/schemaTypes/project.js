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
      ],
    }),
  ],
})
