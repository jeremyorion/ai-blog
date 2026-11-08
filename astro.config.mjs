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
    // Hostnames other devices may use to reach `npm run dev:lan`
    // (IP addresses always work):
    //   .local  - Bonjour on your home network, e.g. jeremys-mac-studio.local
    //   .ts.net - Tailscale MagicDNS, e.g. jeremys-mac-studio.tail2b5263.ts.net
    allowedHosts: ['.local', '.ts.net', 'jeremys-mac-studio'],
  },
  integrations: [react(), markdoc(), sitemap(), ...(isDev ? [keystatic()] : [])],
});
