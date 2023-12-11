/* eslint-disable import/no-extraneous-dependencies */
// import path from 'path';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [
    react(),
    checker({
      eslint: {
        lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx}"',
      },
    }),
  ],
  server: {
    port: 3030,
  },
  preview: {
    port: 3030,
  },
});
