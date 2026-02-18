import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://comunicacion.adecra.org.ar',
  output: 'static',
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
