import { defineConfig } from 'astro/config'
import preact from '@astrojs/preact'

// import vue from '@astrojs/vue'
// import svelte from '@astrojs/svelte'
// import solid from '@astrojs/solid-js'
// import lit from '@astrojs/lit'
// import partytown from '@astrojs/partytown'
import sitemap from "@astrojs/sitemap"

// https://astro.build/config
export default defineConfig({
  root: '.',
  srcDir: './src',
  publicDir: './public',
  integrations: [preact(), sitemap()],
  trailingSlash: 'ignore',
  site: 'https://ndemasie.github.io',
  vite: {
    ssr: {
      noExternal: ['modern-normalize'],
    }
  }
});