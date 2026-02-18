import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://comunicacion.adecra.org.ar',
  output: 'static',
  adapter: cloudflare({
    imageService: 'cloudflare',
  }),
  integrations: [
    sitemap(),
    tailwind()
  ],
  build: {
    inlineStylesheets: 'auto',
  },
  server: {
    port: 4321,
  }
});
