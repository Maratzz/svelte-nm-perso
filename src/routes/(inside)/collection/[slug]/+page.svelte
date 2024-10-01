<script>
  import { formatDate } from "$lib/utils/index.js"
  import HeadSEO from "$lib/components/HeadSEO.svelte"
  import CultureItemStatus from "$lib/components/CultureItemStatus.svelte"

  export let data

  let { item, supabase } = data
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
        <p class="info-small">{#if item.item_type === "BD" | item.item_type === "série"}Une{:else}Un{/if} {item.item_type} de {item.developers}, sorti le {formatDate(item.date_released, "numeric", "long", "numeric")}</p>
        <p class="info-small"><b>Status:</b> <CultureItemStatus {item}/></p>
      </div>
    </div>

  {#if item.notes}
    <p>{item.notes}</p>
  {/if}

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