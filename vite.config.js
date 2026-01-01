import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Plugin to make CSS non-render-blocking
const asyncCssPlugin = () => ({
  name: 'async-css',
  transformIndexHtml(html) {
    // Convert CSS links to preload + onload pattern
    return html.replace(
      /<link rel="stylesheet"([^>]*href="[^"]*\.css"[^>]*)>/g,
      '<link rel="preload" as="style"$1 onload="this.onload=null;this.rel=\'stylesheet\'"><noscript><link rel="stylesheet"$1></noscript>'
    )
  }
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    asyncCssPlugin(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@context': path.resolve(__dirname, './src/context'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@data': path.resolve(__dirname, './src/data'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
  build: {
    // Optimize CSS
    cssCodeSplit: true,
    // Smaller chunks for faster parsing
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          icons: ['lucide-react'],
        },
        // Optimize chunk names for caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
  },
})
