
// --- switch the adapter you want, static for static pages and auto for platforms like Vercel, Netlify, etc.

//import adapter from '@sveltejs/adapter-auto'
import adapter from '@sveltejs/adapter-static'

import sveltePreprocess from 'svelte-preprocess'
import { mdsvex } from 'mdsvex'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter()
	},

  extensions: ['.svelte', '.md'],

  preprocess: [
    sveltePreprocess(),
    mdsvex({
      extensions: ['.md']
    })
  ]
};

export default config;
