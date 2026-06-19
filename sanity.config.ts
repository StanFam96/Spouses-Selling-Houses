import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemaTypes'
import { HomeIcon, UserIcon, DocumentIcon } from '@sanity/icons'

const singletonActions = new Set(['publish', 'discardChanges', 'restore'])
const singletonTypes = new Set(['aboutPage'])

export default defineConfig({
  name: 'default',
  title: 'Spouses Selling Houses',
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('About Page')
              .icon(DocumentIcon)
              .child(
                S.document()
                  .schemaType('aboutPage')
                  .documentId('aboutPage'),
              ),
            S.divider(),
            S.documentTypeListItem('agent')
              .title('Agents')
              .icon(UserIcon),
            S.documentTypeListItem('listing')
              .title('Listings')
              .icon(HomeIcon),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
})
