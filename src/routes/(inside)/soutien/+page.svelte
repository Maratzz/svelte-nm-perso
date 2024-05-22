<script>
  import HeadSEO from "$lib/components/HeadSEO.svelte"
  import { browser } from '$app/environment';
</script>




<HeadSEO 
  title="Nico Moisson | Soutien"
  description="Vous appréciez le contenu de ce site ? (merci !) Vous souhaitez me soutenir financièrement ? (mille mercis !)"
  author="Nico 'Maratz' Moisson"
  siteName="Site personnel de Nico Moisson"
  imageURL="$lib/assets/homepage/full_image.png"
  twitter
  openGraph
/>

<div>
  <h1>Soutien</h1>
  
  <p>Actuellement mon activité d'écriture est quelque chose que je fais à côté, mais j'aimerais bien me recentrer dessus et si possible en vivre de manière décente.</p>
  <p>Si la visite du site et la lecture de mes textes vous ont plu et que vous aimeriez me remercier et/ou me soutenir financièrement pour que je puisse continuer à écrire, voici quelques moyens:</p>
  <div class="donation-wrap">
    <img src="/img/kofi-logo.png" alt="Logo de Kofi" srcset="" class="no-border icon">
    <a href="https://ko-fi.com/maratz">Faites un don ponctuel ou mensuel sur Ko-Fi</a>
  </div>
  <div class="donation-wrap">
    <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 256 259"><path fill="#1a1918" d="M127.779 0C60.42 0 5.24 52.412 0 119.014l68.724 28.674a35.812 35.812 0 0 1 20.426-6.366c.682 0 1.356.019 2.02.056l30.566-44.71v-.626c0-26.903 21.69-48.796 48.353-48.796c26.662 0 48.352 21.893 48.352 48.796c0 26.902-21.69 48.804-48.352 48.804c-.37 0-.73-.009-1.098-.018l-43.593 31.377c.028.582.046 1.163.046 1.735c0 20.204-16.283 36.636-36.294 36.636c-17.566 0-32.263-12.658-35.584-29.412L4.41 164.654c15.223 54.313 64.673 94.132 123.369 94.132c70.818 0 128.221-57.938 128.221-129.393C256 57.93 198.597 0 127.779 0M80.352 196.332l-15.749-6.568c2.787 5.867 7.621 10.775 14.033 13.47c13.857 5.83 29.836-.803 35.612-14.799a27.555 27.555 0 0 0 .046-21.035c-2.768-6.79-7.999-12.086-14.706-14.909c-6.67-2.795-13.811-2.694-20.085-.304l16.275 6.79c10.222 4.3 15.056 16.145 10.794 26.46c-4.253 10.314-15.998 15.195-26.22 10.895m121.957-100.29c0-17.925-14.457-32.52-32.217-32.52c-17.769 0-32.226 14.595-32.226 32.52c0 17.926 14.457 32.512 32.226 32.512c17.76 0 32.217-14.586 32.217-32.512m-56.37-.055c0-13.488 10.84-24.42 24.2-24.42c13.368 0 24.208 10.932 24.208 24.42c0 13.488-10.84 24.421-24.209 24.421c-13.359 0-24.2-10.933-24.2-24.42"/></svg>
    <a href="https://store.steampowered.com/wishlist/id/Maratz/">Offrez-moi un jeu sur ma wishlist Steam</a>
  </div>
  <div class="donation-wrap">
    <img src="/img/gog.png" alt="Logo pour la plateforme GOG" class="no-border icon">
    <a href="https://www.gog.com/en/u/Maratz/wishlist">Ou si c'est votre truc, sur GOG</a>
  </div>
</div>

{#if browser}
  <script src='https://storage.ko-fi.com/cdn/scripts/overlay-widget.js'></script>
  <script>
    kofiWidgetOverlay.draw('maratz', {
      'type': 'floating-chat',
      'floating-chat.donateButton.text': 'Donate',
      'floating-chat.donateButton.background-color': '#794bc4',
      'floating-chat.donateButton.text-color': '#fff'
    });
  </script>
{/if}

<style lang="scss">
  .donation-wrap {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 15px;
    margin-bottom: 15px;
  }
  .icon {
    height: 30px;
    width: 30px;
  }
  
  :is(a:link, a:visited) {
    color: purple;
  }
</style>