import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [preact(), tailwindcss()],
  build: {
    target: 'es2022',
    minify: 'esbuild',
    sourcemap: true,
  },
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
});
