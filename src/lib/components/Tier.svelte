<script lang="ts">
  import ItemTier from "./ItemTier.svelte"

  let { tierName, tierItems, tierID, supabase, session } : { tierName: string, tierItems: any[], tierID: number, supabase: any, session: any } = $props()
</script>

<div class="tier">
  <div class="tier-label">{tierName}</div>
  <div class="tier-content" data-tier-id={tierID}>
    {#each tierItems as item}
    <ItemTier {item} {supabase} {session}/>
    {/each}
  </div>
</div>

<style lang="scss">
  .tier {
    width: 100%;
    min-height: 120px;
    height: fit-content;
    border: 1px solid black;
    display: flex;
    flex-flow: row wrap;
    margin-bottom: 10px;
    &-label {
      flex-basis: 20%;
      background-color: var(--color);
      align-content: center;
      text-align: center;
      font-size: 1.2em;
    }
    &-content {
      padding: 10px;
      flex-basis: 80%;
      background-color: #FFFFFF;
      display: flex;
      flex-flow: row wrap;
      gap: 10px;
    }
  }
</style>
