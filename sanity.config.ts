import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemaTypes'
import { HomeIcon, UserIcon } from '@sanity/icons'

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
            S.documentTypeListItem('agent').title('Agents').icon(UserIcon),
            S.divider(),
            S.documentTypeListItem('listing').title('Listings').icon(HomeIcon),
          ]),
    }),
  ],
  schema: { types: schemaTypes },
})
