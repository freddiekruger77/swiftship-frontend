import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',
    'process.env': {},
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
      external: (id) => {
        // Exclude SES-related modules from bundling if they cause issues
        return id.includes('lockdown') || id.includes('ses')
      }
    },
    // Suppress SES warnings and optimize build
    minify: 'esbuild',
    target: 'esnext',
    // Add polyfills for better compatibility
    commonjsOptions: {
      transformMixedEsModules: true,
    }
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
    include: ['react', 'react-dom', '@mui/material', '@emotion/react', '@emotion/styled'],
    exclude: ['lockdown', 'ses']
  },
  // Enable legacy support for better browser compatibility
  esbuild: {
    target: 'esnext',
    supported: {
      'destructuring': true
    }
  }
})
