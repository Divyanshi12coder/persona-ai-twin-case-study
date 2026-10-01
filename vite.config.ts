import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/persona-ai-twin-case-study/',
  plugins: [react()],
})