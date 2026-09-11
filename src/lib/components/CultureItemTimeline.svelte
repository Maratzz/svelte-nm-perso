<script>
  export let item
  export let date
  export let formatDate = () => {}
</script>

<ul>
  {#each date as period}
  <li>
  {#if period.status === "wishlist"}
    📋 dans les envies depuis {period.date_started ? `le ${formatDate(period.date_started)}` : "un certain temps"}

  {:else if period.status === "backlog"}
    🎒 dans le sac depuis {period.date_started ? `le ${formatDate(period.date_started)}` : "un certain temps"}

  {:else if period.status === "currently playing"}
    🔁 en cours depuis le {formatDate(period.date_started)}

  {:else if period.status === "finished"}
    ✅
    {#if item.item_type === "film"}Vu
    {:else if item.item_type === "série" || item.item_type === "série d'animation"}Regardée
    {:else if item.item_type === "anime"}Regardé
    {:else if item.item_type === "livre" || item.item_type === "manga"}Lu
    {:else if item.item_type === "BD"}Lue
    {:else}Joué{/if}

    {#if period.date_started === null}
      il y a un certain temps

      {:else if period.date_started !== null && period.date_started === period.date_finished}
      le {formatDate(period.date_started)}

      {:else}
      entre le

        {#if new Date(period.date_started).getFullYear() === new Date(period.date_finished).getFullYear()}

          {#if new Date(period.date_started).getMonth() === new Date(period.date_finished).getMonth()}
            {new Date(period.date_started).toLocaleDateString("fr", { day: "numeric" })}
          {:else}
            {new Date(period.date_started).toLocaleDateString("fr", { day: "numeric", month: "long"})}
          {/if}

        {:else}
          {formatDate(period.date_started)}
        {/if}

        et le {formatDate(period.date_finished)}
    {/if}

  {:else}
    💩 {#if item.item_type === "BD" || item.item_type === "série" || item.item_type === "série d'animation"}abandonnée{:else}abandonné{/if} le {formatDate(period.date_finished)}
  {/if}
  </li>

{/each}
</ul>

<style>
  ul li:before {
    content: '';
  }
</style>
