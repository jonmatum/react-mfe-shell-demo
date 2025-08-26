import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const base = mode === 'production' ? '/react-mfe-shell-demo/' : '/';
  
  return {
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
        manifest: {
          name: 'Maturity Assessment Platform',
          short_name: 'MaturityApp',
          description: 'Comprehensive organizational maturity evaluation tool for Platform Engineering and Software Development practices',
          theme_color: '#3b82f6',
          background_color: '#ffffff',
          display: 'standalone',
          orientation: 'portrait-primary',
          scope: base,
          start_url: base,
          categories: ['business', 'productivity', 'utilities'],
          lang: 'en-US',
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable'
            }
          ],
          screenshots: [
            {
              src: 'screenshot-wide.png',
              sizes: '1280x720',
              type: 'image/png',
              form_factor: 'wide',
              label: 'Maturity Assessment Dashboard'
            },
            {
              src: 'screenshot-narrow.png',
              sizes: '640x1136',
              type: 'image/png',
              form_factor: 'narrow',
              label: 'Mobile Assessment View'
            }
          ]
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
                }
              }
            },
            {
              urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'gstatic-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
                }
              }
            }
          ]
        },
        devOptions: {
          enabled: true
        }
      })
    ],
    base,
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
  }
})
