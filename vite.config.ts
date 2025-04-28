import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/diamond_construct/',
  // base: '/',
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'build',
  },
  // css: {
  //   postcss: './postcss.config.js',
  // },
});
