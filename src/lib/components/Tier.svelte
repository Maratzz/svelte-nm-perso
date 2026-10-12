<script>
  import { flip } from "svelte/animate"
  import { dndzone } from "svelte-dnd-action"

  let { tier, items, onUpdateItems, isTierlist, onUpdateTier } = $props()

  const flipDurationMs = 300

  let isEditing = $state(false)
  let editName = $derived(tier.name ?? "")
  let editColor = $derived(tier.color ?? "#C3BDD9")
  let editOrder = $derived(tier.order ?? 0)

  function handleDndConsider(e) {
    items = e.detail.items
  }
  function handleDndFinalize(e) {
    items = e.detail.items
    onUpdateItems(items)
  }

  const startEditing = () => {
    // sync the fields with current values each time we open
    editName = tier.name ?? ""
    editColor = tier.color ?? "#C3BDD9"
    editOrder = tier.order ?? 0
    isEditing = true
  }

  const cancelEdit = () => {
    isEditing = false
  }

  const saveEdit = () => {
    //sending this through $props() for the form
    onUpdateTier(tier.id, {
      name: editName,
      color: editColor,
      order: Number(editOrder),
    })
    isEditing = false
  }
</script>

<div class="tier">
  {#if isTierlist === true }
    <div
      role="form"
      aria-label="tier editing form"
      class="tier-label"
      ondblclick={startEditing}
      title="Double-cliquer pour modifier"
      style="--color: {tier.color}">
      {tier.name}
    </div>
  {/if}

  {#if isEditing}
  <form class="tier-edit" onsubmit={(e) => { e.preventDefault(); saveEdit() }}>
    <label>
      Nom
      <input type="text" bind:value={editName} size="10"/>
    </label>
    <label>
      Couleur
      <input type="color" bind:value={editColor} />
    </label>
    <label>
      Position
      <input type="number" bind:value={editOrder} min="0" size="10"/>
    </label>
    <button type="submit">Enregistrer</button>
    <button type="button" onclick={cancelEdit}>Annuler</button>
  </form>
  {/if}
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
  .tier, .tier-content, .tier-edit {
    display: flex;
  }

  .tier {
    width: 100%;
    min-height: 120px;
    height: fit-content;
    border: 1px solid black;
    flex-flow: column wrap;
    margin-bottom: 10px;
    &-edit {
      flex-flow: row wrap;
      justify-content: space-evenly;
    }
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
