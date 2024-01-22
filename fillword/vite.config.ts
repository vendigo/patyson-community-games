import { defineConfig, splitVendorChunkPlugin } from 'vite'

export default defineConfig({
  plugins: [splitVendorChunkPlugin()],
  server: {host: '0.0.0.0', port: 8000},
  clearScreen: false,
})
