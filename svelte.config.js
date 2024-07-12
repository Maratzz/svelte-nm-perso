
// --- switch to the adapter you want by uncommenting, static for static pages and auto for platforms like Vercel, Netlify, etc. Remember to install the static adapter first if you want to use it! >npm install @sveltejs/adapter-static

import adapter from '@sveltejs/adapter-auto'
//import adapter from '@sveltejs/adapter-static'

import { sveltePreprocess } from 'svelte-preprocess'
import { mdsvex } from 'mdsvex'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter()
	},

  extensions: ['.svelte', '.md'],

  preprocess: [
    mdsvex({
      extensions: ['.md']
    }),
    sveltePreprocess()
  ]
};

export default config;
