<script>
  import { enhance } from "$app/forms"
  import { onMount } from "svelte"
  import { formatDate } from "$lib/utils/index.js"
  import HeadSEO from "$lib/components/HeadSEO.svelte"
  import CultureItemStatus from "$lib/components/CultureItemStatus.svelte"
  import FormDatalist from "$lib/components/FormDatalist.svelte"

  import FormItemUpdate from "$lib/components/FormItemUpdate.svelte"

  export let data

  $: ({ item, lists, allLists, session } = data)
  $: itemLists = lists[0].lists
  $: innerList = []
  $: itemLists.forEach(list => 
    innerList.push( list )
  )

  onMount(() => {
    if ( session ) {
      const modalEdit = document.getElementById("modalEdit")
      const modalOpenButton = document.getElementById("openModal")
      modalOpenButton.addEventListener("click", () => {
        modalEdit.style.visibility = "visible"
      })
    }
  })
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

    <div id="item-info__image">
      <img src={item.cover} alt="Affiche du {item.item_type} {item.name}">
    </div>

    <div id="item-info__data">
      <h1>{item.name}</h1>
      <p class="info-small">{#if item.item_type === "BD" | item.item_type === "série"}Une{:else}Un{/if} {item.item_type} de {item.author}, sorti le {formatDate( item.date_released )}</p>
      <p class="info-small"><b>Status:</b> <CultureItemStatus {item} {formatDate}/></p>
      {#if session}
      <button id="openModal">Editer</button>
      {/if}
    </div>
  </div>

  {#if session}
  <div id="modalEdit" class="border border-1">
    <FormItemUpdate {item} />
  </div>
  {/if}

  {#if session}
  <form method="POST" action="?/addToList" use:enhance>
    <FormDatalist query="new_list" query_name="Nouvelle liste" items={allLists}/>
    <button type="submit">Ajouter à une liste</button>
  </form>
  {/if}

  {#if item.notes}
  <p>{item.notes}</p>
  {/if}

  {#key innerList}
  {#if innerList.length}
    <p>Dans {innerList.length <= 1 ? 'la liste suivante' : 'les listes suivantes'}:</p>
      <ul>
        {#each innerList as list (list.name)}
        <li><a href="/listes/{list.slug}">{list.name}</a></li>
        {/each}
      </ul>
  {/if}
  {/key}

</div>

<style lang="scss">
  #item-info {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    gap: 10px;
    &__image {
      flex: 1 1 50%;
      img {
        width: 100%;
      }
    }
    &__data {
      flex: 1 2 50%;
    }
  }

  h1 {
    font-size: 1.7em;
    margin-bottom: 10px;
    margin-top: 0;
  }

  .info-small {
    margin-top: 0;
  }

  #modalEdit {
    visibility: hidden;
    position: absolute;
    top: 100px;
    left: 10px;
    padding: 15px 45px;
    z-index: 10;
    background-color: white;
    transition: all .3s ease-in-out;
  }

  @media (min-width: 900px) {
    #item-info {
      justify-content: space-evenly;
      margin-bottom: 60px;
      margin-top: 30px;
      img {
        width: 256px;
        aspect-ratio: 3/4;
      }
    }
  }
</style>