import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@mui/utils': path.resolve(__dirname, 'node_modules/@mui/utils'),
      '@mui/material': path.resolve(__dirname, 'node_modules/@mui/material'),
      '@mui/icons-material': path.resolve(__dirname, 'node_modules/@mui/icons-material'),
      '@mui/private-theming': path.resolve(__dirname, 'node_modules/@mui/private-theming'),
      '@mui/styled-engine': path.resolve(__dirname, 'node_modules/@mui/styled-engine'),
      '@mui/system': path.resolve(__dirname, 'node_modules/@mui/system'),
      '@emotion/react': path.resolve(__dirname, 'node_modules/@emotion/react'),
      '@emotion/styled': path.resolve(__dirname, 'node_modules/@emotion/styled'),
      '@emotion/cache': path.resolve(__dirname, 'node_modules/@emotion/cache'),
      '@babel/runtime': path.resolve(__dirname, 'node_modules/@babel/runtime'),
    },
  },
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
      },
      treeshake: {
        moduleSideEffects: false,
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
    include: [
      'react',
      'react-dom',
      '@mui/material',
      '@mui/icons-material',
      '@mui/system',
      '@emotion/react',
      '@emotion/styled',
      '@emotion/cache'
    ],
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
