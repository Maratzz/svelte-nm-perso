<script>
  import {flip} from "svelte/animate"
  import {dndzone} from "svelte-dnd-action"

  let { tier, items, onUpdateItems } = $props()

  const flipDurationMs = 300

  function handleDndConsider(e) {
    items = e.detail.items
  }
  function handleDndFinalize(e) {
    items = e.detail.items
    onUpdateItems(items)
  }
</script>

<div class="tier">
  <div class="tier-label">{tier.name}</div>
  <div
    id={tier.id}
    class="tier-content"
    use:dndzone="{{items, flipDurationMs}}"
    onconsider={handleDndConsider}
    onfinalize={handleDndFinalize}>
    {#each items as item(item.id)}
      <div
        id={item.collection.id}
        class="tier-item"
        animate:flip="{{duration: flipDurationMs}}">
        <a href="/collection/{item.collection.slug}">
          <img src={item.collection.cover} alt="Affiche du {item.collection.item_type} {item.collection.name}" >
        </a>
      </div>
    {/each}

  </div>
</div>

<style lang="scss">
  .tier, .tier-content {
    display: flex;
  }

  .tier {
    width: 100%;
    min-height: 120px;
    height: fit-content;
    border: 1px solid black;
    flex-flow: column wrap;
    margin-bottom: 10px;
    &-label {
      background-color: var(--color);
      padding: 15px 0;
      text-align: center;
      font-size: 1.2em;
    }
    &-content {
      padding: 20px 10px;
      background-color: #FFFFFF;
      flex-flow: row wrap;
      justify-content: center;
      gap: 10px;
    }
    &-item img {
      width: 90px;
      aspect-ratio: 3/4;
      position: relative;
      object-fit: cover;
    }
  }
</style>
