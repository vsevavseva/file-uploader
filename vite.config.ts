import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import graphqlLoader from "vite-plugin-graphql-loader";
import path from 'path';

export default defineConfig({
  plugins: [react(), graphqlLoader()],
  resolve: {alias: {
      'entities': path.resolve(__dirname, 'src/entities'),
      'shared': path.resolve(__dirname, 'src/shared'),
      'features': path.resolve(__dirname, 'src/features'),
      'widgets': path.resolve(__dirname, 'src/widgets'),
      'pages': path.resolve(__dirname, 'src/pages'),
    }},
    server: {
        proxy: {
            '/graphql': {
                target: 'http://188.225.32.102:3000',
                changeOrigin: true,
                secure: false,
            }
        }
    }
})
