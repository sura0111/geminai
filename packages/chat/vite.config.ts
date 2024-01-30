import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: {
      '@': __dirname,
    },
  },
  test: {
    globals: true,
    setupFiles: ['./test/setup.ts'],
  },
})
