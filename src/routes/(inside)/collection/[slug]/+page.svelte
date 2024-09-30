<script>
  export let data

  let { item } = data
</script>

<h2>{item.name}</h2>
<p>Un type de {item.developers}, sorti le {item.date_relased}</p>
{#if item.platform}
  {item.platform}
{/if}


<img src={item.cover} alt="">

{#if item.notes}
  <p>{item.notes}</p>
{/if}