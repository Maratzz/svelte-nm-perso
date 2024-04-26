<script>
  import "$lib/styles/code_formatter.css"
  import "papercss/dist/paper.min.css"
  import "$lib/styles/styles.scss"
  import Header from "$lib/components/Header.svelte"
  import Footer from "$lib/components/Footer.svelte"
</script>

<Header />

<main>
  <slot />
</main>

<Footer />