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

<style lang="scss">
  main {
    padding-top: 100px;
    padding-bottom: 50px;
  }

  @media (min-width: 900px) {
    main { 
      padding-bottom: 150px;
    }
  }
</style>