import nodejs from '@astrojs/node'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import svelte from '@astrojs/svelte'
import { defineConfig } from 'astro/config'

import packageJson from './package.json' assert { type: 'json' }
console.log('HELP', packageJson.name?.split('/').at(-1))
// https://astro.build/config
export default defineConfig({
  root: '.',
  srcDir: './src',
  publicDir: './public',
  outDir: './dist',
  integrations: [react(), svelte(), sitemap()],
  trailingSlash: 'ignore',

  // SSR
  adapter: nodejs({ mode: 'standalone' }),
  output: 'server',

  site:
    process.env.ENVIRONMENT_MODE === 'production'
      ? packageJson.homepage
      : 'http://localhost:10100',

  server: {
    host: process.env.HOST || '0.0.0.0',
    port: parseInt(process.env.PORT, 10) || 10100,
    allowedHosts: [packageJson.name?.split('/').at(-1)],
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
