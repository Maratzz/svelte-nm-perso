export async function load({ params }){

  const post = await import(`../../blog/${params.slug}.md`)
  const { title, date, categories, headline, image } = post.metadata

  return {
    PostContent: post.default,
    title,
    date,
    categories,
    headline,
    image
  }
}