import { defineType, defineField } from 'sanity'
import { BlockquoteIcon } from '@sanity/icons'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: BlockquoteIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'town',
      title: 'Town',
      type: 'string',
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'town',
      media: 'image',
    },
  },
})
