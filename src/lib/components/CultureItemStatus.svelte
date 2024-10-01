<script>
  export let item
</script>

{#if item.status === "wishlist"}
  <span>📋</span>
{:else if item.status === "backlog"}
  <span>🎒 {#if item.type === "BD" | item.type === "série"}acquise{:else}acquis{/if}</span>
{:else if item.status === "currently playing"}
  <span>🔁 en cours</span>
{:else if item.status === "finished"}
  <span>✅ {#if item.type === "BD" | item.type === "série"}terminée{:else}terminé{/if}</span>
{:else if item.status === "flushed"}
  <span>💩 {#if item.type === "BD" | item.type === "série"}abandonnée{:else}abandonné{/if}</span>
{/if}

