<script>
  import { enhance } from "$app/forms"
  import { formatDate } from "$lib/utils/index.js"
  import HeadSEO from "$lib/components/HeadSEO.svelte"
  import CultureItemStatus from "$lib/components/CultureItemStatus.svelte"
  import FormDatalist from "$lib/components/FormDatalist.svelte"

  export let data

  $: ({ item, lists, allLists } = data)
  $: itemLists = lists[0].lists
  $: innerList = []
  $: itemLists.forEach(list => 
    innerList.push( list )
  )
</script>

<HeadSEO 
  title="Nico Moisson | {item.name}"
  description="Fiche de {item.name}"
  author="Nico 'Maratz' Moisson"
  siteName="Site personnel de Nico Moisson"
  imageURL="{item.cover}"
/>

<div>

  <div id="item-info">
    <div>
      <img src={item.cover} alt="Affiche du {item.item_type} {item.name}">
    </div>
    <div id="item-info-data">
      <h1>{item.name}</h1>
      <p class="info-small">{#if item.item_type === "BD" | item.item_type === "série"}Une{:else}Un{/if} {item.item_type} de {item.author}, sorti le {formatDate( item.date_released )}</p>
      <p class="info-small"><b>Status:</b> <CultureItemStatus {item} {formatDate}/></p>
    </div>
  </div>

  <form method="POST" action="?/addToList" use:enhance>
    <FormDatalist query="new_list" query_name="Nouvelle liste" items={allLists}/>
    <button type="submit">Ajouter à une liste</button>
  </form>

  {#if item.notes}
  <p>{item.notes}</p>
  {/if}

  {#key innerList}
  {#if innerList.length}
  <div>
    <div class="collapsible">
      <input type="checkbox" id="collapsible2" name="collapsible2">
      <label for="collapsible2">Dans les listes suivantes:</label>
      <div class="collapsible-body">
        <ul>
          {#each innerList as list (list.name)}
          <li><a href="/listes/{list.slug}">{list.name}</a></li>
          {/each}
        </ul>
      </div>
    </div>
  </div>
  {/if}
  {/key}

</div>

<style lang="scss">
  #item-info {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    //align-items: flex-start;
    gap: 10px;
  }

  h1 {
    font-size: 1.7em;
    margin-bottom: 10px;
    margin-top: 0;
  }

  .info-small {
    margin-top: 0;
  }

  @media (min-width: 900px) {
    #item-info {
      justify-content: space-evenly;
      margin-bottom: 60px;
      margin-top: 30px;
    }
  }
</style>