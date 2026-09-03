<script>
  export let item
  export let date
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

  {#each date as IntermediaryDate, index}

    {#if (IntermediaryDate !== date[0]) && (index + 1 === date.length)}{" et"}{/if}
    {#if IntermediaryDate.date_finished === null}
      il y a un certain temps
    {:else}
      {#if item.item_type === "film" || IntermediaryDate.date_started === IntermediaryDate.date_finished}
        le {formatDate(IntermediaryDate.date_finished)}
      {:else}
        entre le
        {#if new Date(IntermediaryDate.date_started).getFullYear() === new Date(IntermediaryDate.date_finished).getFullYear()}
          {#if new Date(IntermediaryDate.date_started).getMonth() === new Date(IntermediaryDate.date_finished).getMonth()}
            {new Date(IntermediaryDate.date_started).toLocaleDateString("fr", { day: "numeric" })}
          {:else}
            {new Date(IntermediaryDate.date_started).toLocaleDateString("fr", { day: "numeric", month: "long"})}
          {/if}
        {:else}
          {formatDate(IntermediaryDate.date_started)}
        {/if}
        et le {formatDate(IntermediaryDate.date_finished)}
      {/if}
    {/if}{#if index + 1 < date.length}{", "}{/if}

  {/each}

{:else if item.status === "flushed"}
  💩 {#if item.item_type === "BD" || item.item_type === "série" || item.item_type === "série d'animation"}abandonnée{:else}abandonné{/if} {date[0].date_finished ? `le ${formatDate(date[0].date_finished)}` : "il y a un certain temps"}
{/if}