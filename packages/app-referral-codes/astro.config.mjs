import node from '@astrojs/node'
import tailwind from '@astrojs/tailwind'
import vue from '@astrojs/vue'
import { defineConfig } from 'astro/config'

import packageJson from './package.json' assert { type: 'json' }

// https://astro.build/config
export default defineConfig({
  root: '.',
  srcDir: './src',
  publicDir: './public',
  outDir: './dist',
  integrations: [tailwind(), vue()],
  trailingSlash: 'ignore',
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  site:
    process.env.ENVIRONMENT_MODE === 'production'
      ? packageJson.homepage
      : 'http://localhost:9001',
  server: {
    host: '0.0.0.0',
    port: 9001,
  },
})
