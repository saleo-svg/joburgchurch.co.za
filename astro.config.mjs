import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://joburgchurch.co.za',
  integrations: [tailwind()],
  output: 'static',
  redirects: {
    '/blog/free-korean-class-community/': '/blog/korean-class-community/',
  },
});