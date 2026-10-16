// Remark plugin for mdsvex: converts `:::ComponentName prop="value"`
// lines in markdown into Svelte component tags AND auto-injects the matching
// import statement.

import { visit } from 'unist-util-visit'

export function remarkSvelteEmbed(options = {}) {
	//where are the components stored?
	const componentsDir = options.componentsDir ?? '$lib/components'

	// regex to detect the pattern :::ComponentName
	const TOKEN = /^:::([A-Z][\w-]*)\s*(.*)$/

	return (tree) => {
		const used = new Set(); // component names found

		visit(tree, 'paragraph', (node, index, parent) => {
			if (!parent || index === undefined) return

			// Reconstruct the paragraph text (tokens are expected on one line).
			const text = node.children
				.filter((c) => c.type === 'text')
				.map((c) => c.value)
				.join('')
				.trim()

			const match = TOKEN.exec(text)
			if (!match) return

			const [, name, rawProps] = match
			used.add(name)

      //weird bug where my double quotes were actually curly double quotes...? messing with the string passed as props for the Bilan component
			const props = [...rawProps.matchAll(
				/([\w-]+)\s*=\s*(\{[^}]*\}|"[^"]*"|'[^']*'|“[^”]*”|‘[^’]*’|[^\s]+)/g
			)]
				.map(([, key, val]) => {
					if (val.startsWith('{')) {
						return `${key}=${val}`; // Svelte expression, pass through
					}
					// Strip wrapping quotes (straight or curly) and normalize
					// any curly quotes left inside the value.
					const inner = val
						.replace(/^["'“‘]/, '')
						.replace(/["'”’]$/, '')
						.replace(/[“”]/g, '"')
						.replace(/[‘’]/g, "'")
						.trim()
					return `${key}="${inner}"`
				})
				.join(' ')

			// Replace the paragraph with the component tag.
			parent.children[index] = {
				type: 'html',
				value: `<${name} ${props} />`
			}
		})

		// Auto-inject one module script with all the needed imports at the top
		// of the file. mdsvex picks up <script context="module"> in markdown.
		if (used.size > 0) {
			const imports = [...used]
				.map(
					(name) =>
						`import ${name} from '${componentsDir}/${name}.svelte';`
				)
				.join('\n')

			tree.children.unshift({
				type: 'html',
				value: `<script context="module">\n${imports}\n</script>`
			})
		}
	}
}