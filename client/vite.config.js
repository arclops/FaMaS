/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [
    react(),
    checker({
      eslint: {
        lintCommand: 'eslint "./@/**/*.{js,jsx,ts,tsx}"',
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './@/components'),
      '@hooks': path.resolve(__dirname, './@/hooks'),
      '@utils': path.resolve(__dirname, './@/utils'),
      '@images': path.resolve(__dirname, './@/images'),
      '@layouts': path.resolve(__dirname, './@/layouts'),
      '@pages': path.resolve(__dirname, './@/pages'),
      '@routes': path.resolve(__dirname, './@/routes'),
      '@sections': path.resolve(__dirname, './@/sections'),
      '@theme': path.resolve(__dirname, './@/theme'),
      '@assets': path.resolve(__dirname, './@/assets'),
      '@_mock': path.resolve(__dirname, './@/_mock'),
    }
  },
  server: {
    port: 3030,
  },
  preview: {
    port: 3030,
  },
});
