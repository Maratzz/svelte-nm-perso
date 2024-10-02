<script>
  export let item
  export let formatDate = () => {}
</script>

{#if item.status === "wishlist"}
  <span>📋</span>
{:else if item.status === "backlog"}
  <span>🎒 dans le sac depuis le {formatDate(item.date_acquired)}</span>
{:else if item.status === "currently playing"}
  <span>🔁 en cours</span> depuis le {formatDate(item.date_started)}
{:else if item.status === "finished"}
  <span>✅ {#if item.type === "BD" | item.type === "série"}terminée{:else}terminé{/if} depuis le {formatDate(item.date_finished)}</span>
{:else if item.status === "flushed"}
  <span>💩 {#if item.type === "BD" | item.type === "série"}abandonnée{:else}abandonné{/if} le {formatDate(item.date_finished)}</span>
{/if}

