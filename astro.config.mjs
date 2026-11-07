// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import sitemap from '@astrojs/sitemap';
import keystatic from '@keystatic/astro';

// Keystatic's editor (/keystatic) only runs in `npm run dev`.
// Production builds are 100% static HTML — no server, no admin surface.
const isDev = process.argv.includes('dev');

export default defineConfig({
  site: 'https://example.com', // TODO: your domain
  output: 'static',
  integrations: [react(), markdoc(), sitemap(), ...(isDev ? [keystatic()] : [])],
});
