<script>
  import { slugify } from "$lib/utils/index.js"

  export let data

  let { collection, supabase, session } = data
  console.log(collection)
  const updateSupabase = async (item) => {
    if (item.slug != "") {
      return
    }
    let slugResult = ""
    slugResult = slugify(item.name)
    try {
      let { data, error } = await supabase
      .from("collection")
      .update({slug: slugResult})
      .eq('name', item.name)
    } catch(error) {
      console.warn(error)
    } finally {
      slugResult = ""
    }
    
  }

  const slugifyCollection = () => {
    collection.forEach(item => {
      updateSupabase(item)
    });
  }
</script>

{#if session}
  <button on:click={slugifyCollection}>Slugify collection</button>
{/if}
