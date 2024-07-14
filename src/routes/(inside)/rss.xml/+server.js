import * as config from "$lib/config.js"

export async function GET({ fetch }) {

  const response = await fetch( `/api/every-texts` )
  const posts = await response.json()
  const headers = {
    'Cache-Control': 'max-age=0, s-maxage=3600',
    'Content-Type': 'application/xml'
  }

  const xml = `
    <?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>${config.title}</title>
        <description>${config.description}</description>
        <link>${config.url}</link>
        <atom:link href="${config.url}/rss.xml" rel="self" type="application/rss+xml" />
        <language>fr-fr</language>
        ${posts
					.map(
						(post) => `
						<item>
							<title>${post.meta.title}</title>
							<description>${post.meta.headline}</description>
							<link>${config.url}${post.path}</link>
							<guid isPermaLink="true">${config.url}${post.path}</guid>
							<pubDate>${new Date(post.meta.date).toUTCString()}</pubDate>
						</item>
					`
					)
					.join('')}
      </channel>
    </rss>
  `.trim()

  return new Response(xml, { headers })
}