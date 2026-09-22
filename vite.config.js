import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/productos': 'http://localhost:3000',
      '/categorias': 'http://localhost:3000',
      '/usuarios': 'http://localhost:3000',
    },
  },
})