<script>
  import { supabase } from "$lib/utils/supabaseClient"

  let { year, type } = $props()
  let items = $state([])
  const fetchItems = async (params) => {
    const { data, error } = await supabase
      .from("collection")
      .select("*")
      .eq("item_type", type)
      .gte("date_started", `${year}-01-01`)
      .lte("date_finished", `${year}-12-31`)
      .order("date_started", { ascending: true })
    items = data || []
  }
  fetchItems()
</script>

<div>
  {#each items as item}
  <div class="container">
    <div class="container-info">
      <a href="/collection/{item.slug}"><img src={item.cover} alt="Illustration pour l'oeuvre {item.name}"></a>
      <div>
        <p style="font-size: 25px;">{item.name} ({item.date_released.slice(0,4)})</p>
        <p>par {item.author}</p>
      </div>
    </div>
    {#if item.notes}
      <div class="container-notes">
        <p class="notes">{item.notes}</p>
      </div>
    {/if}

  </div>
  {/each}
</div>

<style lang="scss">
  .container, .container-info {
    display: flex;
  }
  .container {
    flex-direction: column;
    margin-bottom: 35px;
    background-color: #fffffff6;
    border-radius: 25px;
    padding: 10px 15px;
    &-info {
      flex-direction: row;
      gap: 25px;
      div {
        flex-basis: 80%;
      }
      img {
        height: 150px;
        aspect-ratio: 3/4;
        object-fit: cover;
        //flex-basis: 15%;
      }
    }
  }

  .notes {
    white-space: pre-wrap;
  }
</style>