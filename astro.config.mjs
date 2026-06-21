import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import tailwind from '@astrojs/tailwind';
import sanity from '@sanity/astro';
import react from '@astrojs/react';
import netlify from '@astrojs/netlify';

const env = loadEnv(
  process.env.NODE_ENV ?? 'development',
  process.cwd(),
  'PUBLIC_',
);
const PUBLIC_SANITY_PROJECT_ID = env.PUBLIC_SANITY_PROJECT_ID;
const PUBLIC_SANITY_DATASET = env.PUBLIC_SANITY_DATASET;

if (!PUBLIC_SANITY_PROJECT_ID || !PUBLIC_SANITY_DATASET) {
  throw new Error(
    'Missing Sanity credentials. Set PUBLIC_SANITY_PROJECT_ID and PUBLIC_SANITY_DATASET ' +
    'in a .env file or in your Netlify environment variables.',
  );
}

export default defineConfig({
  adapter: netlify(),
  vite: {
    optimizeDeps: {
      include: ['axobject-query'],
    },
  },
  integrations: [
    tailwind(),
    react(),
    sanity({
      projectId: PUBLIC_SANITY_PROJECT_ID,
      dataset: PUBLIC_SANITY_DATASET,
      useCdn: false,
      studioBasePath: '/admin',
    }),
  ],
});
