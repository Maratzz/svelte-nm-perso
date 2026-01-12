<script>
  import { supabase } from "$lib/utils/supabaseClient"
  import approved from "$lib/assets/icons/approved.png"
  import rejected  from "$lib/assets/icons/rejected.png"

  let { year, type } = $props()
  let items = $state([])
  const fetchItems = async (params) => {
    const { data, error } = await supabase
      .from("collection")
      .select("*")
      .eq("item_type", type)
      .gte("date_finished", `${year}-01-01`)
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
      {#if item.is_approved === (true)}
        <img src={approved} alt="Tampon qui approuve l'oeuvre" class="stamp border no-border">
      {:else if item.is_approved === (false)}
        <img src={rejected} alt="Tampon qui désapprouve l'oeuvre" class="stamp border no-border">
      {/if}
      <a href="/collection/{item.slug}"><img src={item.cover} alt="Illustration pour l'oeuvre {item.name}" class="image"></a>
      <div>
        <h2>{item.name} ({item.date_released.slice(0,4)})</h2>
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
    width: 100%;
    &-info {
      flex-direction: row;
      gap: 10px;
      position: relative;
      h2 {
        margin: 0;
      }
      .stamp {
        position: absolute;
        right: -25px;
        top: 10px;
        height: 80px;
        transform: rotate(15deg);
      }
      div {
        flex-basis: 80%;
      }
      .image {
        width: 150px;
        aspect-ratio: 3/4;
        object-fit: cover;
      }
    }
  }

  .notes {
    white-space: pre-wrap;
  }

  @media (min-width: 900px) {
    .container-info .stamp {
      height: 100px;
    }
  }
</style>