import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import { defineConfig } from 'astro/config'

import packageJson from './package.json' assert { type: 'json' }

// https://astro.build/config
export default defineConfig({
  root: '.',
  srcDir: './src',
  publicDir: './public',
  outDir: './dist',
  integrations: [react(), sitemap()],
  trailingSlash: 'ignore',
  site:
    process.env.ENVIRONMENT_MODE === 'production'
      ? packageJson.homepage
      : 'http://localhost:3000',

  server: {
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
    },
  },

  vite: {
    ssr: {
      noExternal: ['modern-normalize'],
    },
  },
})
