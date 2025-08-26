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
      // Fallback configuration for CI environments with Rollup native dependency issues
      external: [],
    },
  },
  // Optimize dependencies to avoid optional dependency issues in CI
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
}))
