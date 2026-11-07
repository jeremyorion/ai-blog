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
  // GitHub Pages project site: https://jeremyorion.github.io/ai-blog/
  // With a custom domain, set `site` to it and remove `base`.
  site: 'https://jeremyorion.github.io',
  base: '/ai-blog',
  output: 'static',
  integrations: [react(), markdoc(), sitemap(), ...(isDev ? [keystatic()] : [])],
});
