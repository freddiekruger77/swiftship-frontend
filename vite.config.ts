import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      }
    },
    // Suppress SES warnings and optimize build
    minify: 'esbuild',
    target: 'esnext'
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'https://swiftship-backend-c5iz.onrender.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  // Suppress CSS warnings
  css: {
    devSourcemap: false,
    postcss: {
      plugins: []
    }
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', '@mui/material', '@emotion/react', '@emotion/styled']
  }
})
