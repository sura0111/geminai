import { defineConfig } from 'vite'

export default defineConfig({
  root: __dirname,
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
