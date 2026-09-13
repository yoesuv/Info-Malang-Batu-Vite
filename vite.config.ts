import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Firebase Hosting serves the JSON files WITHOUT CORS headers, so locally
// (dev server AND `vite preview`) we route /api/* through Vite — same-origin
// for the browser, and Vite fetches the real host server-side.
const apiProxy = {
  '/api': {
    target: 'https://info-malang-batu.firebaseapp.com',
    changeOrigin: true,
    rewrite: (path: string) => path.replace(/^\/api/, ''),
  },
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: { proxy: apiProxy },
  preview: { proxy: apiProxy },
})
