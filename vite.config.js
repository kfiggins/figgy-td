import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@enums': path.resolve(__dirname, 'src/enums'),
      '@screens': path.resolve(__dirname, 'src/screens'),
    }
  }
})