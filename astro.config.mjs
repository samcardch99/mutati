// @ts-check
import { defineConfig } from 'astro/config';
import lenis from 'astro-lenis';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [lenis()],
  vite: {
    plugins: [tailwindcss()]
  },
  server: {
    host: true
  }
});