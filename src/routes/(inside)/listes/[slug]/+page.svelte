<script>
  import { enhance } from "$app/forms"
  import { invalidateAll } from "$app/navigation"
  import Tier from "$lib/components/Tier.svelte"

  import HeadSEO from "$lib/components/HeadSEO.svelte"
  import full_image from "$lib/assets/homepage/full_image.webp"

  let { data } = $props()
  let { liste, session, supabase } = $state(data)
  let temporaryList = $state(liste)
</script>

<HeadSEO
  title="Nico Moisson | {temporaryList.name}"
  description={temporaryList.description}
  author="Nico 'Maratz' Moisson"
  siteName="Site personnel de Nico Moisson"
  imageURL={full_image}
/>

<div>
  <h1>{temporaryList.name}</h1>
  <p>{temporaryList.description}</p>
  <p class="info-small">
    <a href="/listes">Revenir à toutes les listes</a>
  </p>

  <section class="tierlist">
    <!-- all the tiers -->
    {#each temporaryList.tiers as tier (tier.id) }
      <!-- svelte-dnd needs items to be isolated so I use a component to hold them -->
      <Tier {tier} items={tier.tier_items} --color={tier.color}/>
    {/each}
  </section>

  {#if session}
  <form action="?/insertNewTier" method="POST" use:enhance>
    <input type="text" name="tier_to_add" required placeholder="ajouter un label">
    <input type="color" name="color_for_new_tier" required>
    <input type="number" name="tier_order" required>
    <input type="number" name="tierlist" value={liste.id}>
    <button type="submit">Ajouter le tier</button>
  </form>
  {/if}
</div>