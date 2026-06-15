<script>
  export let item
  export let formatDate = () => {}
</script>

{#if item.status === "wishlist"}
  📋 dans les envies
{:else if item.status === "backlog"}
  🎒 dans le sac depuis le {formatDate(item.date_acquired)}
{:else if item.status === "currently playing"}
  🔁 en cours depuis le {formatDate(item.date_started)}
{:else if item.status === "paused"}
  ⏸️ en pause, commencé le {formatDate(item.date_started)}
{:else if item.status === "finished"}
  ✅
  {#if item.item_type === "film"}Vu
  {:else if item.item_type === "série" || item.item_type === "série d'animation"}Regardée
  {:else if item.item_type === "anime"}Regardé
  {:else if item.item_type === "livre" || item.item_type === "manga"}Lu
  {:else if item.item_type === "BD"}Lue
  {:else}Joué{/if} 

  {#if item.date_finished === null}
    il y a un certain temps
  {:else}
    {#if item.item_type === "film" || item.date_started === item.date_finished}
      le {formatDate(item.date_finished)}
    {:else}
      entre le
      {#if new Date(item.date_started).getFullYear() === new Date(item.date_finished).getFullYear()}
        {#if new Date(item.date_started).getMonth() === new Date(item.date_finished).getMonth()}
          {new Date(item.date_started).toLocaleDateString("fr", { day: "numeric" })}
        {:else}
          {new Date(item.date_started).toLocaleDateString("fr", { day: "numeric", month: "long"})}
        {/if}
      {:else}
        {formatDate(item.date_started)}
      {/if}
      et le {formatDate(item.date_finished)}
    {/if}
  {/if}

{:else if item.status === "flushed"}
  💩 {#if item.item_type === "BD" || item.item_type === "série" || item.item_type === "série d'animation"}abandonnée{:else}abandonné{/if} {item.date_finished ? `le ${formatDate(item.date_finished)}` : "il y a un certain temps"}
{/if}