import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/ListRating/',
  server: {
    proxy: {
      // PokeAPI — for data fetching
      '/pokeapi': {
        target: 'https://pokeapi.co',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/pokeapi/, ''),
      },
      // GitHub raw — for static sprite images
      '/ghraw': {
        target: 'https://raw.githubusercontent.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/ghraw/, ''),
      },
    },
  },
})
