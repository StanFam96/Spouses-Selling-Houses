import { defineType, defineField } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'agents',
      title: 'Agents',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'agent' }],
        },
      ],
      validation: (rule) => rule.min(1).max(10),
    }),
    defineField({
      name: 'quoteTitle',
      title: 'Quote Section Title',
      type: 'string',
    }),
    defineField({
      name: 'quoteText',
      title: 'Quote Text',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    prepare() {
      return { title: 'About Page' }
    },
  },
})
