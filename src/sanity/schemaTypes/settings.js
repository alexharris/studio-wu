import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  icon: () => '⚙️',
  __experimental_singleton: true, // Restricts to only one document
  fields: [
    defineField({
      name: 'phoneNumber',
      title: 'Phone Number',
      type: 'string',
      description: 'Contact phone number for the site',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'emailAddress',
      title: 'Email Address',
      type: 'string',
      description: 'Contact email address for the site',
      validation: Rule => Rule.required().email(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      }
    },
  },
})