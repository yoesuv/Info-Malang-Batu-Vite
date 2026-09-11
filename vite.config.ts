import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      // Firebase Hosting serves the JSON files WITHOUT CORS headers, so in dev
      // we route /api/* through Vite (same-origin for the browser) and let
      // Vite fetch the real host server-side.
      '/api': {
        target: 'https://info-malang-batu.firebaseapp.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
