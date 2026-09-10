import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.png'],
  resolve: {
    alias: {
      config: '/src/config',
      components: '/src/components',
      pages: '/src/pages',
      assets: '/src/assets',
      hooks: '/src/hooks',
      utils: '/src/utils',
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern'
      }
    }
  }
})
