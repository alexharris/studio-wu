import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'press',
  title: 'Press',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      description: 'The publication or source where this press coverage appeared',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Link Text',
          type: 'string',
          description: 'The text to display for the link',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'url',
          title: 'URL',
          type: 'url',
          description: 'The URL this link should point to',
          validation: Rule => Rule.required(),
        }),
      ],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'string',
      description: 'The date when this press coverage was published',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      source: 'source',
      media: 'image',
    },
    prepare(selection) {
      const {title, source, media} = selection;
      return {
        title: title,
        subtitle: source,
        media: media,
      };
    },
  },
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [
        {field: 'date', direction: 'desc'}
      ]
    },
  ],
})