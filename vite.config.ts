import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? '/react-mfe-shell-demo/' : '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      // Handle dependency resolution issues in CI
      external: [],
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          charts: ['recharts'],
        },
      },
    },
    // Increase chunk size warning limit to handle large bundles
    chunkSizeWarningLimit: 1000,
  },
  // Optimize dependencies to avoid resolution issues
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'recharts',
      'react-is',
    ],
    // Force pre-bundling of problematic dependencies
    force: true,
  },
  // Enhanced resolve configuration
  resolve: {
    dedupe: ['react', 'react-dom', 'react-is'],
  },
}))
