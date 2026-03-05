// @ts-check
import { defineConfig } from 'astro/config';
import lenis from 'astro-lenis';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp', // Usar Sharp para máxima calidad
      config: {
        limitInputPixels: false, // Permite procesar imágenes muy pesadas
      },
    },
  },
  integrations: [lenis(), react()],
  vite: {
    plugins: [tailwindcss()]
  },
  server: {
    host: true
  }
});