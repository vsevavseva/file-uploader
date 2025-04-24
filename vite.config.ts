import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {alias: {
      'entities': path.resolve(__dirname, 'src/entities'),
      'shared': path.resolve(__dirname, 'src/shared'),
      'features': path.resolve(__dirname, 'src/features'),
      'widgets': path.resolve(__dirname, 'src/widgets'),
      'pages': path.resolve(__dirname, 'src/pages'),
    }},

})
