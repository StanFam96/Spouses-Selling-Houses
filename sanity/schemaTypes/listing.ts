import { defineType, defineField } from 'sanity'
import { HomeIcon } from '@sanity/icons'

export const listing = defineType({
  name: 'listing',
  title: 'Listing',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'beds',
      title: 'Bedrooms',
      type: 'number',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'baths',
      title: 'Bathrooms',
      type: 'number',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'sqft',
      title: 'Square Feet',
      type: 'number',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Available', value: 'available' },
          { title: 'Sold', value: 'sold' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
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
      title: 'address',
      subtitle: 'price',
      media: 'image',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? `$${subtitle.toLocaleString()}` : undefined,
        media,
      }
    },
  },
})
