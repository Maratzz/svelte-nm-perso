<script>
  import HeadSEO from "$lib/components/HeadSEO.svelte"
</script>

<HeadSEO 
  title="Nico Moisson | Contact"
  description="Comment me contacter à travers les Internets ?"
  author="Nico 'Maratz' Moisson"
  siteName="Site personnel de Nico Moisson"
  imageURL="$lib/assets/homepage/full_image.png"
  twitter
  openGraph
/>

<div>
  <h1>Contact</h1>
  
  <p>Voici les différentes méthodes pour me contacter. Toute sollicitation sur une autre plateforme que celles listées ci-dessous sera ignorée. Pareil si c'est pour de la publicité ou des messages farfelus. Je ne mords pas mais j'ai la correspondance irrégulière, ne m'en voulez pas trop !</p>
  
  <h2>Par mail</h2>
  <a href="mailto:nicolas.moisson@protonmail.com">nicolas.moisson@protonmail.com</a>
  
  <h2>Sur les plateformes numériques</h2>
  
  <a href="https://discordapp.com/users/maratz_">Discord</a>
  <a href="https://t.me/nmoisson">Telegram</a>
  <a href="https://steamcommunity.com/id/Maratz/">Steam</a>
  <a href="https://twitch.tv/maratz_">Twitch</a>
</div>

<style lang="scss">
  h1 {
    position: relative;
    z-index: 2;
    &::after {
      z-index: -1;
      display: inline-block;
      content: "";
      background-color: #C3BDD9;
      width: 90px;
      height: 20px;
      position: absolute;
      bottom: 0;
      left: 60px;
    }
  }

  a {
    display: block;
    &:visited {
      color: #4895DC;
    }
  }
</style>