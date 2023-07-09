import lit from '@astrojs/lit'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import svelte from '@astrojs/svelte'
import { defineConfig } from 'astro/config'

import packageJson from './package.json' assert { type: 'json' }

// https://astro.build/config
export default defineConfig({
  root: '.',
  srcDir: './src',
  publicDir: './public',
  outDir: './dist',
  integrations: [lit(), react(), svelte(), sitemap()],
  trailingSlash: 'ignore',
  site:
    process.env.ENVIRONMENT_MODE === 'production'
      ? packageJson.homepage
      : 'http://localhost:10000',

  server: {
    port: 10100,
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
    },
  },

  vite: {
    ssr: {
      // https://docs.astro.build/en/guides/styling/#import-a-stylesheet-from-an-npm-package
      // https://vitejs.dev/config/ssr-options.html#ssr-noexternal
      noExternal: ['modern-normalize'],
    },
  },
})
