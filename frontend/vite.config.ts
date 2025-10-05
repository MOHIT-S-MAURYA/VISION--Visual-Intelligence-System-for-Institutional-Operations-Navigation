import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Code splitting configuration for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks for better caching
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['lucide-react', 'react-hot-toast'],
          'form-vendor': ['react-hook-form', '@hookform/resolvers', 'yup'],
          'utils': ['axios', 'clsx', 'tailwind-merge', 'date-fns', 'jwt-decode'],
          'state': ['zustand'],
        },
      },
    },
    // Optimize chunk size warning limit
    chunkSizeWarningLimit: 600,
    // Enable minification
    minify: 'esbuild', // Using esbuild for faster builds
    // Source maps for production debugging (disable for smaller builds)
    sourcemap: false,
  },
  // Development server configuration
  server: {
    port: 5173,
    strictPort: false,
    open: false,
  },
  // Preview server configuration
  preview: {
    port: 4173,
  },
})
