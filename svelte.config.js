import { mdsvex } from 'mdsvex'
import adapter from '@sveltejs/adapter-vercel'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import { remarkSvelteEmbed } from './remark-svelte-component-embed-plugin.mjs'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [
    vitePreprocess(),
    mdsvex({
      extensions: [".md", ".svx"],
      remarkPlugins: [[remarkSvelteEmbed, {}]]
    })
  ],
	kit: { adapter: adapter() },
	extensions: ['.svelte', '.md']
};

export default config
