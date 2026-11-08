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
  // Dev runs at the root: Keystatic's editor hard-codes /api/keystatic and breaks under a base path.
  base: isDev ? undefined : '/ai-blog',
  output: 'static',
  server: {
    // Lets other devices reach `npm run dev:lan` by your Mac's Bonjour name,
    // e.g. http://jeremys-mac-studio.local:4321 (IP addresses work without this).
    allowedHosts: ['.local'],
  },
  integrations: [react(), markdoc(), sitemap(), ...(isDev ? [keystatic()] : [])],
});
