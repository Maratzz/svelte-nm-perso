<script>
  import { enhance } from "$app/forms"
  import { onMount } from "svelte"
  import { goto } from "$app/navigation"
  import { formatDate, slugify } from "$lib/utils/index.js"
  import HeadSEO from "$lib/components/HeadSEO.svelte"
  import CultureItemStatus from "$lib/components/CultureItemStatus.svelte"
  import FormDatalist from "$lib/components/FormDatalist.svelte"
  import FormItemUpdate from "$lib/components/FormItemUpdate.svelte"
  import TextPreview from "$lib/components/TextPreview.svelte"

  export let data

  $: ({ item, tierlists, session } = data)

  let handleClick = ( item ) => {
    goto(item.path)
  }

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
      <img src={item.cover} alt="Affiche {item.item_type === "BD" || item.item_type === "série" ? 'de la' : 'du'} {item.item_type} {item.name}">
    </div>

    <div id="item-info__data">
      <h1>{item.name}</h1>
      <p class="info-small">
        {#if item.item_type === "BD" | item.item_type === "série"}
          Une{:else}Un{/if} {item.item_type} de
          {#each item.author as author, index}
            <a href="artiste/{slugify(author)}" on:click={() => localStorage.setItem("authorName", author)}>{author}</a>{#if index < item.author.length - 1}{', '}{/if}
          {/each},
        {#if item.item_type === "BD" | item.item_type === "série"}
          sortie{:else}sorti{/if} le {formatDate( item.date_released )}
      </p>
      <p class="info-small"><b>Status:</b> <CultureItemStatus {item} {formatDate}/></p>
      {#if item.tags}
      <div>
        {#each item.tags as tag}
          <span>{tag}</span>
        {/each}
      </div>
      {/if}
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

  <TextPreview itemName={item.name} {handleClick}/>

  {#if item.notes}
    <p class="notes">{item.notes}</p>
  {/if}

  {#if tierlists.length}
    <div class="liste">
      <p>Dans {tierlists.length <= 1 ? 'la liste suivante' : 'les listes suivantes'}:</p>
      <ul>
        {#each tierlists as list (list.name)}
        <li><a href="/listes/{list.slug}">{list.name}</a></li>
        {/each}
      </ul>
    </div>
  {/if}

</div>

<style lang="scss">
  $color: hsl(253, 27%, 80%);

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
      flex: 1 1 50%;
    }
  }

  #item-info__data {
    div {
      display: flex;
      flex-flow: row wrap;
      gap: 5px;
    }
    span {
      padding: 5px 10px;
      border-radius: 15px;
      background-color: $color;
      font-size: 0.8em;
    }
  }

  h1 {
    font-size: 1.2em;
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

  // handle break lines in supabase to avoid big chunk of text
  .notes {
    white-space: pre-wrap;
  }

  .liste {
    margin-top: 50px;
  }

  @media (min-width: 900px) {
    h1 {
      font-size: 1.5em;
    }
    #item-info {
      justify-content: space-evenly;
      margin-bottom: 60px;
      margin-top: 30px;
      img {
        width: 256px;
      }
    }
  }
</style>