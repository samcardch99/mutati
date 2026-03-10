// @ts-check
import { defineConfig } from 'astro/config';
import lenis from 'astro-lenis';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://mutatidesign.com',
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp', // Usar Sharp para máxima calidad
      config: {
        limitInputPixels: false, // Permite procesar imágenes muy pesadas
      },
    },
  },
  integrations: [lenis(), react(), sitemap()],
  vite: {
    plugins: [tailwindcss()]
  },
  server: {
    host: true
  }
});