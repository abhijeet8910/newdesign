import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss(), react()],
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-state': ['zustand'],
        },
      },
    },
  },
  preview: {
    // Serve index.html for all routes when previewing production build
    headers: {
      'Cache-Control': 'public, max-age=31536000',
    },
  },
})
