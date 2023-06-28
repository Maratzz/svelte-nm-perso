import { c as create_ssr_component } from "./index3.js";
const metadata = {
  "title": "Apprendre SvelteKit en créant un blog Markdown statique",
  "date": "2021-12-14",
  "categories": ["blog", "sveltekit"]
};
const Apprendre_sveltekit = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<p>En démarrant la refonte de mon site perso j’avais plusieurs objectifs en tête:</p>
<ul><li>me familiariser avec Svelte et SvelteKit à travers un projet qui me tient à coeur</li>
<li>documenter ma progression, ainsi que les difficultés rencontrées, les solutions, et les améliorations au fil du temps, jusqu’à obtenir le site et les fonctionnalités que je voulais</li>
<li>contribuer en français à la documentation autour de ces nouveaux outils qui est très limitée dans cette langue.</li></ul>
<p>En faisant des recherches préliminaires je suis tombé sur <a href="https://joshcollinsworth.com/blog/build-static-sveltekit-markdown-blog" rel="nofollow">l’excellent billet de Josh Collinsworth</a> sur son blog, qui m’a permis de démarrer et d’appréhender les différentes facettes de SvelteKit.</p>
<p>Sa concision et sa pédagogie sont un modèle pour la transmission d’informations, aussi ai-je demandé à Josh si je pouvais adapter son billet et le traduire pour en faire profiter les personnes francophones désireuses de se lancer à leur tour dans l’apprentissage de ces nouveaux outils.</p>
<p>Merci encore à Josh pour son aide ! À noter que son site, <a href="https://joshcollinsworth.com/" rel="nofollow">https://joshcollinsworth.com/</a> , est lui aussi entièrement fait avec Svelte et SvelteKit, et qu’il contient de nombreux articles tout aussi passionnants et informatifs que celui que j’ai choisi de traduire aujourd’hui, n’hésitez pas à y faire un tour.</p>
<hr>
<h2>Ce que nous allons faire, et ce qu’il faut savoir avant de commencer</h2>
<p>Cet article est un tutoriel pour créer un blog statique pré-rendu avec l’aide de SvelteKit, Markdown, Sass et une API (ce site est construit comme cela, au fait)</p>
<p>C’est aussi une introduction à SvelteKit en soi, avec une bonne vue d’ensemble des fondamentaux qui devraient être utilisables pour n’importe quel projet.</p>
<p>C’est en dernier lieu <em>fun</em>!*</p>
<p>*<em>mon avis perso</em></p>
<h2>Vous bénéficierez le plus de ce tuto si vous:</h2>
<ul><li>connaissez déjà les bases du développement front-end et de JavaScript;</li>
<li>avez au préalable une connaissance basique de Svelte (vous pouvez certainement suivre l’article sans ça, mais je recommande de lire le <a href="https://svelte.dev/tutorial/basics" rel="nofollow">tutoriel de Svelte</a> d’abord si vous êtes complètement novices)</li>
<li>connaissez les bases de Markdown et de Sass;</li>
<li>connaissez les bases de récupérer des données en JSON depuis une API</li>
<li>savez déjà installer des paquets avec npm</li></ul>
<p>Pour finir, si vous ne souhaitez pas faire tout le tutoriel et préféreriez avoir directement la structure complète du blog clé en main, allez voir <a href="https://github.com/josh-collinsworth/sveltekit-blog-starter" rel="nofollow">le dossier de démarrage SvelteKit</a> (c’est plus abouti que ce qu’on va fabriquer ici, mais les concepts sous-jacents sont les mêmes.)</p>
<p>C’est parti !</p>
<h2>Créer une nouvelle application SvelteKit</h2>
<p>Pour générer un nouveau projet SvelteKit, exécutez cette commande dans votre terminal (évidemment, vous pouvez changer <code>my-app</code> pour n’importe quel autre nom que vous préférez)</p>
<pre class="language-bash"><!-- HTML_TAG_START -->${`<code class="language-bash"><span class="token function">npm</span> create svelte@latest my-app</code>`}<!-- HTML_TAG_END --></pre>
<p>Quand vous exécutez la commande <code>init</code> pour démarrer, SvelteKit va vous poser quelques questions sur votre projet et ce que vous voulez faire:</p>
<p><img src="/img/blog/sveltekit_setup.png" alt="Questionnaire pour préciser le projet"></p>
<p>Nous allons choisir l’option <strong>“Skeleton project”</strong> (<em>attention, pas Library skeleton project, car nous simplement faisons un site, pas une librairie</em>)</p>
<blockquote><p>Si c’est la première fois que vous utilisez SvelteKit, n’hésitez pas à choisir “SvelteKit demo app”, explorer un peu le projet pour se faire une idée de comment ça marche, et revenir après. C’est une bonne introduction, mais c’est fourni avec plusieurs fichiers et styles qui prendraient du temps à effacer pour commencer</p></blockquote>
<p>L’outil de préparation va également demander vos préférences au sujet de TypeScript, ESlint et Prettier. Je n’utiliserai pas TypeScript pour rester simple dans ce tutoriel, mais vous pouvez l’utiliser si vous le souhaitez (Svelte marche plutôt bien avec.)</p>
<p>Après avoir fait vos choix et quelques secondes d’installation, vous devriez voir apparaître <code>Your project is ready!</code> dans votre terminal, ainsi que les prochaines étapes et des liens utiles:</p>
<p><img src="/img/blog/sveltekit_setup_complete.png" alt="Finalisation de l'installation de SvelteKit"></p>
<p>À ce moment-là, ouvrez votre projet dans VS Code (ou dans votre éditeur de texte préféré). Puis installez les dépendances dans le terminal et lancez le serveur de développement:</p>
<pre class="language-bash"><!-- HTML_TAG_START -->${`<code class="language-bash"><span class="token function">npm</span> <span class="token function">install</span>
<span class="token function">npm</span> run dev -- <span class="token parameter variable">--open</span></code>`}<!-- HTML_TAG_END --></pre>
<p>Terminez ces commandes et votre nouveau site s’affichera dans la fenêtre de votre navigateur</p>
<p><img src="/img/blog/localhost_welcome.png" alt="La base du site après installation de SvelteKit"></p>
<p>Le squelette tel quel n’est pas très excitant, et il n’y a même pas de CSS. Mais c’est okay; ça nous laisse le champ libre pour personnaliser notre application comme on le souhaite, sans avoir à supprimer ou à modifier du code déjà présent.</p>
<p>C’est notre canvas blanc, et nous allons prochainement peindre dessus.</p>
<h2>Créer des routes dans SvelteKit</h2>
<p>Comme beaucoup de frameworks (et PHP également, en fait), SvelteKit a une approche du <em>routing</em> et des pages formée sur les dossiers et les fichiers; la structure de <code>src/routes</code> va définir la structure de votre site.</p>
<p>N’importe quel dossier dans <code>src/routes</code> devient le nom d’une page. Un fichier <code>+page.svelte</code> à l’intérieur de ce dossier constitue le contenu HTML de la page.</p>
<p>Du coup, à l’intérieur de <code>src/route</code>:</p>
<ul><li><code>+page.svelte</code> est la page d’accueil</li>
<li><code>a-propos/+page.svelte</code> serait la page <code>/a-propos</code></li>
<li><code>blog/+page.svelte</code> serait la page <code>/blog</code></li>
<li><code>blog/un-post/+page.svelte</code> deviendrait <code>/blog/un-post</code></li></ul>
<blockquote><p>La convention de <code>+page.svelte</code> peut prêter à confusion ou sembler inutilement complexe, surtout si vous étiez habitué·e·s à l’ancienne convention <code>index.svelte</code>. Mais comme nous le verrons prochainement, le préfixe <code>+</code> permet de faire la différence entre les pages et les composants. Il y a d’autres choses également que l’ont peut rajouter aux routes en plus des pages, comme des chemins dynamiques de serveur; nous verrons cela plus tard.</p></blockquote>
<h3>Ajouter des pages</h3>
<p>Histoire de démarrer avec quelques pages sur notre site, créons les dossiers <code>a-propos</code>, <code>contact</code> et <code>blog</code> à l’intérieur de <code>src/routes</code> (on peut toujours les supprimer ou les modifier plus tard.)
Dans chacun de ces dossiers nous ajouterons un fichier <code>+page.svelte</code>, pour générer le contenu de la page, ce que les personnes verront lorsqu’elles navigueront vers cette route du site.
Dans chacun de ces fichiers insérons un petit <em>header</em> et un peu de texte, juste pour avoir un peu de contenu</p>
<blockquote><p>Les fichiers Svelte peuvent être du HTML pur.</p></blockquote>
<p>dans <code>a-propos/+page.svelte</code></p>
<pre class="language-svelte"><!-- HTML_TAG_START -->${`<code class="language-svelte"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span>Salut, je suis Nico !<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>Ceci est ma page "à propos"<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span></code>`}<!-- HTML_TAG_END --></pre>
<p>dans <code>contact/+page.svelte</code></p>
<pre class="language-svelte"><!-- HTML_TAG_START -->${`<code class="language-svelte"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span>Restons en contact<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>mailto:test@test.com<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Envoyez-moi un mail!<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span></code>`}<!-- HTML_TAG_END --></pre>
<p>dans <code>blog/+page.svelte</code></p>
<pre class="language-svelte"><!-- HTML_TAG_START -->${`<code class="language-svelte"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span>Blog<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>My blog posts will go here eventually…<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span></code>`}<!-- HTML_TAG_END --></pre>
<p>Notre dossier <code>src/routes</code> devrait ressembler à cela maintenant:</p>
<pre class="language-fs"><!-- HTML_TAG_START -->${`<code class="language-fs">📂 src
┗ 📂 routes
  ┣ 📜 +page.svelte
  ┣ 📂 blog
  ┃ ┗ 📜 +page.svelte
  ┣ 📂 about
  ┃ ┗ 📜 +page.svelte
  ┗ 📂 contact
    ┗ 📜 +page.svelte</code>`}<!-- HTML_TAG_END --></pre>
<p>Vous pouvez à présent visiter <code>/contact</code>, <code>/a-propos</code> ou <code>/blog</code> et voir les pages que vous venez de créer. Il n’y a pas grand-chose encore, bien sûr, mais c’est chouette de voir au moins que le <em>routing</em> est pris en charge automatiquement juste en créant des dossiers à l’intérieur de <code>routes</code> et en y ajoutant des fichiers <code>+page.svelte</code> à l’intérieur.</p>
<h3>Ajouter un layout</h3>
<p>La plupart des sites et des applications ont des éléments qui sont réutilisés sur chaque page (les exemples les plus communs sont un <code>header</code> et un <code>footer</code>.) Etant donné qu’ajouter ces éléments à la main dans chaque page serait à la fois répétitif et augmente le risque de faire une erreur, SvelteKit (comme beaucoup de frameworks) nous facilite la tâche et permet de définir des <em>layouts</em>.</p>
<p>Dans <code>src/routes</code>, créons un nouveau fichier appelé <code>+layout.svelte</code>.</p>
<pre class="language-fs"><!-- HTML_TAG_START -->${`<code class="language-fs">📂 src
┗ 📂 routes
  ┗ 📜 +layout.svelte</code>`}<!-- HTML_TAG_END --></pre>
<p><strong>Ce fichier a un rôle spécial:</strong> SvelteKit vérifie automatiquement s’il y a un fichier <code>+layout.svelte</code> dans le dossier <code>routes</code> (et tous les sous-dossiers). Ce <em>layout</em> va s’appliquer à tout le contenu chargé depuis cette route et les sous-routes.</p>
<p>Un <em>layout</em> devient un composant parent, et la page actuelle sera insérée dedans en tant que composant enfant.</p>
<p>Donc un <em>layout</em> directement placé dans le dossier routes va s’appliquer de manière globale, sur chaque page.</p>
<p>Faisons un exemple pour illustrer ça: ouvrez le nouveau <code>+layout.svelte</code> et ajoutez un <em>header</em> et <em>footer</em> modèle:</p>
<pre class="language-svelte"><!-- HTML_TAG_START -->${`<code class="language-svelte"><span class="token comment">&lt;!-- +layout.svelte --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>header</span><span class="token punctuation">></span></span>Hi, I'm a header<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>header</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>main</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>slot</span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>main</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>footer</span><span class="token punctuation">></span></span>Hello, I'm the footer.<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>footer</span><span class="token punctuation">></span></span></code>`}<!-- HTML_TAG_END --></pre>
<p>Sauvegardez et vous devriez voir le texte du <em>header</em> apparaître au-dessus du contenu de la page, et le texte du <em>footer</em> en-dessous.</p>
<p><img src="/img/blog/localhost_header_and_footer.png" alt="Le layout avec le header et le footer est appliqué"></p>
<h2>Créer des composants</h2>
<p>Taper le chemin des routes dans le navigateur n’est pas terrible alors ajoutons un peu de navigation. On en profitera pour créer notre premier composant.</p>
<p>D’abord, créez un nouveau dossier appelé <code>lib</code> à l’intérieur de <code>src</code> (<code>lib</code> est une autre convention de SvelteKit; on en reparle plus tard).</p>
<p>A l’intérieur de <code>src/lib</code>, on va créer un dossier appelé <code>components</code>, juste pour s’y retrouver, et dans ce dossier créez un nouveau composant appelé <code>Header.svelte</code></p>
<pre class="language-fs"><!-- HTML_TAG_START -->${`<code class="language-fs">📂 src
┣ 📁 routes
┗ 📂 lib
  ┗ 📂 components
    ┗ 📜 Header.svelte</code>`}<!-- HTML_TAG_END --></pre>
<blockquote><p>Ce n’est pas obligatoire de nommer les composants avec une majuscule, ou de les garder dans leur propre dossier, mais c’est en général encouragé.</p></blockquote>
<p>Dans notre nouveau composant <code>Header</code> on va insérer une navigation basique mais efficace</p>
<pre class="language-svelte"><!-- HTML_TAG_START -->${`<code class="language-svelte"><span class="token comment">&lt;!-- Header.svelte --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>header</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>/<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Home<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>

  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>nav</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>/blog<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Blog<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>/about<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>About<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>/contact<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Contact<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>nav</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>header</span><span class="token punctuation">></span></span></code>`}<!-- HTML_TAG_END --></pre>
<p>Sauvegardez tout ça et revenez sur <code>+layout.svelte</code> pour l’utiliser !
Pour ce faire, nous devons d’abord l’importer avec <code>import</code>, ce qui veut dire que nous devons ajouter un tag <code>&lt;script&gt;</code> à notre layout (je préfère l’ajouter tout en haut du fichier, mais Svelte est assez permissif et permet d’organiser l’ordre des composants comme vous voulez.) Une fois importé, on peut remplacer le <em>header</em> temporaire avec le composant</p>
<pre class="language-svelte"><!-- HTML_TAG_START -->${`<code class="language-svelte"><span class="token comment">&lt;!-- +layout.svelte --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">import</span> Header <span class="token keyword">from</span> <span class="token string">'$lib/components/Header.svelte'</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Header</span> <span class="token punctuation">/></span></span>
<span class="token comment">&lt;!-- The rest of the HTML here --></span></code>`}<!-- HTML_TAG_END --></pre>
<p>Remarquez le chemin de l’<code>import</code>. <code>$lib</code> est un alias pratique qui pointe directement vers <code>src/lib</code>, ce qui évite de devoir péniblement taper des chemins relatifs (vous pouvez personnaliser cet alias ou ajouter le vôtre dans <code>jsconfig.json</code>, mais je n’aborderai pas ce sujet ici.)</p>
<p>Quoi qu’il en soit, vous devriez voir maintenant quelque chose d’un peu plus ergonomique pour l’utilisateur·rice:</p>
<p>img screen</p>
<p>L’apparence n’est toujours pas en place, mais c’est fonctionnel. On peut désormais naviguer entre les pages, ce qui va permettre de tester les choses un peu plus facilement.</p>
<h3>L’apparence des composants</h3>
<p>Le style associé aux composants Svelte a une portée locale (<em>scope</em>) par défaut. On peut ainsi écrire du CSS sans avoir à se soucier d’effets de débordement à l’extérieur du composant.</p>
<p>Pour tester cela, ajoutons un tag <code>&lt;style&gt;</code> dans le <code>Header.svelte</code> (il peut se mettre n’importe où mais je préfère le mettre à la fin.)</p>
<pre class="language-svelte"><!-- HTML_TAG_START -->${`<code class="language-svelte"><span class="token comment">&lt;!-- Header.svelte --></span>

<span class="token comment">&lt;!-- ... The rest of the file's contents here --></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
  <span class="token selector">header</span> <span class="token punctuation">&#123;</span>
    <span class="token property">padding</span><span class="token punctuation">:</span> 1rem<span class="token punctuation">;</span>
    <span class="token property">background</span><span class="token punctuation">:</span> lightskyblue<span class="token punctuation">;</span>
    <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
    <span class="token property">flex-wrap</span><span class="token punctuation">:</span> wrap<span class="token punctuation">;</span>
    <span class="token property">justify-content</span><span class="token punctuation">:</span> space-between<span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>

  <span class="token selector">ul</span> <span class="token punctuation">&#123;</span>
    <span class="token property">margin</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
    <span class="token property">list-style-type</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
    <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
    <span class="token property">gap</span><span class="token punctuation">:</span> 1rem<span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>

  <span class="token selector">a</span> <span class="token punctuation">&#123;</span>
    <span class="token property">text-decoration</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
    <span class="token property">color</span><span class="token punctuation">:</span> inherit<span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span></code>`}<!-- HTML_TAG_END --></pre>
<p>Si vous sauvegardez et jetez un oeil au site désormais, vous devriez voir votre <em>header</em> avec une apparence plus standard pour un <em>header</em>. Vous pouvez également constater que les règles CSS ne s’appliquent pas au contenu principal de la page. C’est le pouvoir de la portée locale !</p>
<p>Si vous le souhaitez, vous pouvez répéter ce processus avec un composant <code>&lt;Footer /&gt;</code>. Je passe l’exercice étant donné que c’est la même chose, mais ce serait une bonne chose à faire au stade où on en est.</p>
<p>Rappel: les composants liées au <em>routing</em> (comme les pages, layouts et les points d’accès) commencent par un <code>+</code>. Les composants normaux, réutilisables n’ont pas ça, et commencent d’ordinaire avec une majuscule (Vous pouvez tout garder dans le dossier <code>routes</code>, mais c’est souvent préférable d’avoir les composants réutilisables dans <code>lib</code> plutôt.)</p>
<h2>Les feuilles de styles dans SvelteKit</h2>
<p>Svelte vous permet d’importer des feuilles de style directement dans les composants, y compris les pages et les <em>layouts</em>. Il y a d’autres manières de charger des feuilles de style, mais je pense que c’est la meilleure. D’abord c’est simple, mais surtout Svelte les préprocess automatiquement, ce qui sera pratique lorsqu’on voudra ajouter Sass.</p>
<p>Créons un nouveau dossier <code>styles</code> dans <code>src/lib</code> et ajoutons un fichier <code>style.css</code> à l’intérieur</p>
<pre class="language-fs"><!-- HTML_TAG_START -->${`<code class="language-fs">📂 src
┣ 📁 routes
┗ 📂 lib
  ┣ 📁 components
  ┗ 📂 styles
    ┗ 📜 style.css </code>`}<!-- HTML_TAG_END --></pre>
<blockquote><p>Il n’y a pas règles sur comment organiser les choses à l’intérieur de <code>src/lib</code>. Vous n’êtes même pas obligé·e·s d’utiliser <code>lib</code>. Faites selon votre propre logique et/ou vos préférences.</p></blockquote>
<p>Vous pouvez ajouter le CSS que vous voulez, mais si vous avez besoin d’un début, voici une série de règles qui devraient rendre l’ensemble un peu plus joli:</p>
<pre class="language-css"><!-- HTML_TAG_START -->${`<code class="language-css"><span class="token comment">/* style.css */</span>
<span class="token selector">body</span> <span class="token punctuation">&#123;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> #eee<span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #333<span class="token punctuation">;</span>
  <span class="token property">font-family</span><span class="token punctuation">:</span> sans-serif<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

<span class="token selector">main</span> <span class="token punctuation">&#123;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 1rem<span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 2rem auto<span class="token punctuation">;</span>
  <span class="token property">max-width</span><span class="token punctuation">:</span> 40rem<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`}<!-- HTML_TAG_END --></pre>
<p>Une fois que nous avons la feuille de styles avec du CSS dedans, nous pouvons l’importer de manière globale comme pour le composant <em>Header</em>:</p>
<pre class="language-svelte"><!-- HTML_TAG_START -->${`<code class="language-svelte"><span class="token comment">&lt;!-- +layout.svelte --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">import</span> Header <span class="token keyword">from</span> <span class="token string">'$lib/components/Header.svelte'</span>
  <span class="token keyword">import</span> <span class="token string">'$lib/styles/style.css'</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token comment">&lt;!-- ...HTML here --></span></code>`}<!-- HTML_TAG_END --></pre>
<p>img rendu css</p>
<p>Etant donné que SvelteKit est compilé et généré sur le serveur (<em>server-side rendering</em>, ou SSR), on peut inspecter la page et voir que notre CSS a été directement rajouté au HTML au lieu d’être construite côté client (<em>client-side rendering</em> ou CSR). Chouette !</p>
<blockquote><p>Importer des feuilles de style dans des fichiers JavaScript n’est pas un standard du web; c’est simplement pris en charge par quelques <em>bundlers</em> et outils de compilation.</p></blockquote>
<h3>Ajouter Sass à SvelteKit</h3>
<p>Svelte permet d’ajouter facilement des processeurs externes, grâce à <code>[svelte-preprocess](https://github.com/sveltejs/svelte-preprocess)</code>.</p>
<blockquote><p><em><code>svelte-preprocess</code> transforme automatiquement le code dans vos gabarits Svelte pour fournir une prise en charge intégrée de TypeScript, PostCSS, scss/sass, Less, et de nombreuses autres technologies.</em></p></blockquote>
<p>La prochaine étape consiste à installer à la fois <code>svelte-preprocess</code> et <code>sass</code>, ce qu’on va faire dans le même mouvement</p>
<pre class="language-bash"><!-- HTML_TAG_START -->${`<code class="language-bash"><span class="token function">npm</span> i <span class="token parameter variable">-D</span> svelte-preprocess sass</code>`}<!-- HTML_TAG_END --></pre>
<blockquote><p>Depuis la version 1.0 SvelteKit est installé avec <code>vitePreprocess</code> en tant qu’alternative embarquée de <code>svelte-preprocess</code>. Bien que <code>vitePreprocess</code> soit fourni avec SvelteKit, ce qui le rend plus simple à utiliser hors de la boîte, ce n’est toutefois pas à l’heure actuelle aussi versatile que <code>svelte-preprocess</code>. Il manque des fonctionnalités qui sont indispensables pour moi, comme le modificateur <code>global</code> pour les styles des composants. C’est pour cela que j’ai préféré garder <code>svelte-preprocess</code> dans ce tutoriel. <a href="npm%20i%20-D%20svelte-preprocess%20sass">Vous pouvez en lire plus sur les deux préprocesseurs dans la documentation</a>.</p></blockquote>
<h4>Modifier la configuration Svelte</h4>
<p>Ensuite, ouvrez le fichier svelte.config.js qu’on trouve à la racine du projet.
Comme son nom l’indique, svelte.config.js est le coeur de, ben la configuration. C’est là que nous effectuerons tous les changements nécessaires concernant les options de SvelteKit et le compilateur.</p>
<p>Ce changement-ci est minime: nous devons simplement importer svelte-preprocess et l’ajouter à la liste des pré-processeurs de SvelteKit.</p>
<pre class="language-js"><!-- HTML_TAG_START -->${`<code class="language-js"><span class="token comment">// svelte.config.js</span>
<span class="token keyword">import</span> sveltePreprocess <span class="token keyword">from</span> <span class="token string">'svelte-preprocess'</span>

<span class="token keyword">const</span> config <span class="token operator">=</span> <span class="token punctuation">&#123;</span>
  <span class="token literal-property property">kit</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span> <span class="token comment">/* ...other kit options here already */</span> <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>

  <span class="token literal-property property">preprocess</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token function">sveltePreprocess</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">&#125;</span></code>`}<!-- HTML_TAG_END --></pre>
<p>Veuillez notez qu’il faudra créer l’option <code>preprocess</code>, elle n’est pas là par défaut (on rajoutera le preprocessing de Markdown ici également, plus tard.)</p>
<p>Veuillez également noter que vous <em>pouvez</em> passer un objet avec plus d’options à l’intérieur de la fonction <code>sveltePreprocess()</code>, mais nous ne ferons pas ça pour l’instant. La fonction sait déjà quoi faire avec Sass par défaut, du coup pas besoin de personnalisation supplémentaire.</p>
<blockquote><p>Ça vaut le coup de mentionner l’option <code>scss.prependData</code>, qui permet d’injecter automatiquement du code au début de n’importe quel traitement Sass (tel que des variables Sass ou un <code>@import</code>). Vous pouvez en lire plus dans <a href="https://github.com/sveltejs/svelte-preprocess/blob/main/docs/getting-started.md#31-prepending-content" rel="nofollow">la documentation autour de <code>svelte-preprocess</code></a>; je voulais simplement le mentionner vu que c’est assez pratique.</p></blockquote>
<p>Une dernière chose importante à savoir: chaque changement de configuration demande de redémarrer le serveur de développement pour appliquer les nouveaux changements.</p>
<h3>Ajouter SCSS au style des composants</h3>
<p>Maintenant que nous avons à la fois Sass et le pré-processeur installés, nous pouvons utiliser Sass dans n’importe quel bloc de <code>&lt;style&gt;</code> d’un composant en ajoutant un attribut <code>lang</code>, comme ceci:</p>
<pre class="language-svelte"><!-- HTML_TAG_START -->${`<code class="language-svelte"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>scss<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
// We can write SCSS here!
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span></code>`}<!-- HTML_TAG_END --></pre>
<h3>Utiliser des fichiers SCSS globaux</h3>
<p>Faire référence à des fichiers SCSS se fait de la même manière que pour des fichiers CSS. En fait vous pouvez simplement renommer le fichier existant <code>style.css</code> en <code>style.scss</code>. (Il faudra aussi mettre à jour l’<code>import</code> dans notre <em>layout</em> aussi, mais c’est tout.)</p>
<pre class="language-svelte"><!-- HTML_TAG_START -->${`<code class="language-svelte"><span class="token comment">&lt;!-- +layout.svelte --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">import</span> <span class="token string">'$lib/styles/style.scss'</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span></code>`}<!-- HTML_TAG_END --></pre>
<p>OK, nous avons maintenant une idée assez précise de la structure du projet et de la personnalisation. Il est temps de s’occuper de la dernière pièce du puzzle: la prise en charge de Markdown.</p>
<h2>Ajouter Markdown à SvelteKit avec mdsvex</h2>
<p>Si vous avez entendu parler de MDX (généralement utilisé dans les projets sous React), vous pouvez considérer <a href="https://mdsvex.pngwn.io/" rel="nofollow">mdsvex</a>, drôle de nom, comme l’équivalent pour Svelte.</p>
<p>Hélas le mot <em>svelte</em> est compliqué à utiliser pour faire des portemanteaux élégants, mais ça n’arrête pas la communauté Svelte pour autant.</p>
<p>Quoi qu’il en soit, mdsvex fait tout ce dont nous avons besoin avec Markdown:</p>
<ul><li>ça prend en charge la conversion de Markdown vers HTML</li>
<li>ça permet d’utiliser des fichiers Markdown comme des composants</li>
<li>et ça permet d’utiliser des composants Svelte <em>à l’intérieur</em> de Markdown</li></ul>
<p>D’abord, installons msdvex</p>
<pre class="language-bash"><!-- HTML_TAG_START -->${`<code class="language-bash"><span class="token function">npm</span> i <span class="token parameter variable">-D</span> mdsvex</code>`}<!-- HTML_TAG_END --></pre>
<p>Ensuite nous devons ajouter mdsvex à notre configuration. Ouvrez <code>svelte.config.js</code> et mofidiez le code pour avoir ceci:</p>
<pre class="language-js"><!-- HTML_TAG_START -->${`<code class="language-js"><span class="token comment">// svelte.config.js</span>
<span class="token comment">/* Other imports here */</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> mdsvex <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'mdsvex'</span>

<span class="token keyword">const</span> config <span class="token operator">=</span> <span class="token punctuation">&#123;</span>
  <span class="token literal-property property">kit</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span> <span class="token comment">/* Kit options here */</span> <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
  
  <span class="token literal-property property">extensions</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'.svelte'</span><span class="token punctuation">,</span> <span class="token string">'.md'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>

  <span class="token literal-property property">preprocess</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token function">sveltePreprocess</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function">mdsvex</span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
      <span class="token literal-property property">extensions</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'.md'</span><span class="token punctuation">]</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">&#125;</span></code>`}<!-- HTML_TAG_END --></pre>
<p>Pour les détails:</p>
<ul><li>la propriété <code>extensions</code> dans <code>config</code> liste les types de fichiers qu’il faut traiter comme des composants (ce qui permet à Svelte de les importer et de les utiliser comme des composants classiques)</li>
<li>la fonction <code>mdsvex()</code> pré-processe le Markdown en HTML, mais ça cible uniquement les fichiers <code>.svx</code> par défaut, alors on modifie cet argument pour inclure également les fichiers <code>.md</code></li></ul>
<p><strong>Rappel:</strong> n’oubliez pas de redémarrer le serveur de développement après avoir effectué les changements de configuration.</p>
<p>Si vous rencontre des erreurs, vérifiez que tout est bien correctement installé, que toutes les importations sont présentes dans votre fichier de configuration, et qu’il n’y a pas d’erreurs de syntaxe.</p>
<h3>Les pages Markdown</h3>
<p>Grâce aux changements dans la configuration, nous pouvons désormais importer et utiliser les fichiers Markdown comme des composants Svelte.</p>
<p>Grâce à mdsvex, nous pouvons donc utiliser les fichiers Markdown comme des pages.</p>
<p>Pour tester, créons <code>src/routes/uses/+page.md</code> et écrivons du Markdown dedans. Vous pouvez voir le contenu en allant sur <code>/uses</code></p>
<pre class="language-fs"><!-- HTML_TAG_START -->${`<code class="language-fs">📂 src
┗ 📂 routes
  ┗ 📂 uses
    ┗  📜 +page.md</code>`}<!-- HTML_TAG_END --></pre>
<pre class="language-md"><!-- HTML_TAG_START -->${`<code class="language-md"><span class="token title important"><span class="token punctuation">#</span> Uses</span>

<span class="token bold"><span class="token punctuation">**</span><span class="token content">Here's some stuff I use</span><span class="token punctuation">**</span></span>

<span class="token list punctuation">-</span> SvelteKit
<span class="token list punctuation">-</span> VS Code
<span class="token list punctuation">-</span> Emojis 😎</code>`}<!-- HTML_TAG_END --></pre>
<p>img result</p>
<p>Vous pouvez même importer et utiliser du contenu Markdown à l’intérieur d’autres fichiers, si vous avez besoin qu’une partie de la page soit intéractive par exemple, mais que le reste soit juste du texte Markdown statique.</p>
<p>Les pages Markdown sont une option intéressantes pour du contenu principalement textuel, vu que c’est souvent plus rapide et facile d’écrire du Markdown que de la syntaxe HTML.</p>
<p>La page <code>/uses</code> n’a pas besoin d’être permanente, mais gardons-la pour le moment; nous l’utiliserons à nouveau bientôt. Parlons de quelques fonctionnalités sympa de mdsvex.</p>
<h3>Blocs de code dans Markdown</h3>
<p>Pratique, mdsvex vient avec <a href="https://prismjs.com/" rel="nofollow">prism.js</a> pré-installé pour mettre en évidence la syntaxe du code. Tout ce que vous avez à faire est de préciser le langage (en l’ajoutant au triple \` du début de bloc) et mdsvex va l’interpréter correctement.</p>
<pre class="language-js"><!-- HTML_TAG_START -->${`<code class="language-js"><span class="token comment">// JavaScript goes here,</span>
<span class="token comment">// And will be syntax-highlighted!</span></code>`}<!-- HTML_TAG_END --></pre>
<p>Tous les blocs de code sur ce site sont générés avec cette technique. Bonus: mdsvex a même <code>svelte</code> dans les langages disponibles !
Notez qu’il vous faudra un peu de CSS pour faire les couleurs, mais il y a de <a href="https://github.com/PrismJS/prism-themes" rel="nofollow">nombreux thèmes utilisables tels quel</a>, ou en tant que base pour faire le vôtre.</p>
<h3>Utiliser les composants Svelte dans Markdown</h3>
<p>Comme dit précédemment: mdsvex vous permet d’utiliser les composants Svelte à l’intérieur de Markdown !</p>
<p>Pour ce faire, insérez un tag script au début du fichier (juste après le <a href="https://docusaurus.io/fr/docs/2.0.1/markdown-features#front-matter" rel="nofollow">frontmatter</a>) et importer le composant dedans. Vous pouvez ensuite ajouter celui-ci dans votre Markdown comme d’habitude:</p>
<pre class="language-md"><!-- HTML_TAG_START -->${`<code class="language-md"><span class="token front-matter-block"><span class="token punctuation">---</span>
<span class="token front-matter yaml language-yaml"># frontmatter goes here</span>
<span class="token punctuation">---</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span>
import SomeComponent from '$lib/components/SomeComponent.svelte'
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token title important"><span class="token punctuation">#</span> Markdown content here</span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>SomeComponent</span> <span class="token punctuation">/></span></span>

More markdown <span class="token italic"><span class="token punctuation">_</span><span class="token content">here</span><span class="token punctuation">_</span></span>!</code>`}<!-- HTML_TAG_END --></pre>
<blockquote><p>Comme vous pouvez vous en douter peut-être: oui, vous pouvez importer des fichiers Markdown <em>à l’intérieur</em> d’autres fichiers Markdown !</p></blockquote>
<h2>Mettre en place le blog</h2>
<p>Maintenant que nous avons fini la mise en place du traitement Markdown, nous pouvons aborder le coeur de ce tutoriel et commencer la mise en place du blog.</p>
<p><em>[ À ce moment là de l’article, Josh présente deux manières d’organiser les billets Markdown, une où chaque billet est dans un dossier séparé, c’est la méthode #1 et une autre où les billets sont tous réunis dans un seul dossier, c’est la méthode #2. Etant donné que j’ai choisi d’implémenter la méthode #2, je ne vais traduire que celle-là pour le moment, le billet est déjà bien assez long comme ça. Si des personnes souhaitent une traduction de l’autre méthode, je le ferai à ce moment-là. ]</em></p>
<h3>Méthode #2: les routes dynamiques</h3>
<p>Comme mentionné plus tôt: on pourrait avoir un dossier dans <code>src/routes/blog</code> pour chaque billet de blog, mais ce serait pénible et compliqué de gérer autant de fichiers passé un certain volume.</p>
<p>Au lieu de faire ça nous allons simplement mettre tous nos billets markdown dans <code>src/routes/blog</code> et utiliser une seule route dynamique pour les afficher ! Ce faisant on va aussi découvrir plusieurs nouveaux aspects du <em>routing</em> dans SvelteKit.</p>
<p>Démarrons avec quelques billets Markdown dans le dossier blog. </p>
<pre class="language-fs"><!-- HTML_TAG_START -->${`<code class="language-fs">📂 src
┗ 📂 routes
  ┗ 📂 blog
    ┣ 📜 +page.svelte
    ┣ 📜 1.md
    ┗ 📜 2.md</code>`}<!-- HTML_TAG_END --></pre>
<p>Dans chaque billet vous pouvez mettre ce template:</p>
<pre class="language-md"><!-- HTML_TAG_START -->${`<code class="language-md"><span class="token front-matter-block"><span class="token punctuation">---</span>
<span class="token front-matter yaml language-yaml">title: Un titre de post
date: "2021-12-14"</span>
<span class="token punctuation">---</span></span>
Bonjour, ceci est un <span class="token italic"><span class="token punctuation">_</span><span class="token content">billet de blog.</span><span class="token punctuation">_</span></span>
<span class="token bold"><span class="token punctuation">**</span><span class="token content">Enchanté!</span><span class="token punctuation">**</span></span></code>`}<!-- HTML_TAG_END --></pre>
<p>Pour le moment <code>/blog/1</code> et <code>/blog/2</code> ne s’afficheront pas. C’est parce que chaque route sur notre site doit avoir un <code>+page.svelte</code> (ou un fichier valide commençant par <code>+</code>) à afficher.</p>
<blockquote><p>Vous pouvez créer un sous-dossier pour mettre tous les billets dedans, ou même les mettre complètement ailleurs, comme bon vous semble. J’ai juste utilisé le chemin le plus facile. Si vous changez l’endroit où sont les fichiers, veillez à corriger le chemin dans le code.</p></blockquote>
<p>Du coup comment peut-on charger le contenu d’un billet ? C’est là qu’interviennent les routes dynamiques !</p>
<p>Créons un dossier <code>[slug]</code> à l’intérieur de <code>src/routes/blog</code> (en incluant les crochets dans le nom du dossier).</p>
<pre class="language-fs"><!-- HTML_TAG_START -->${`<code class="language-fs">📂 src
┗ 📂 routes
  ┗ 📂 blog
    ┣ 📜 +page.svelte
    ┣ 📜 1.md
    ┣ 📜 2.md
    ┗ 📂 [slug]</code>`}<!-- HTML_TAG_END --></pre>
<p>Les crochets ( <code>[ ]</code> ) indiquent que cette route est dynamique; elle correspondra à n’importe quel chemin <code>/blog/*</code> (sauf la page <code>/blog</code> qui est bien sûr gérée par le fichier <code>+page.svelte</code>).</p>
<p>En d’autres termes: nous ne connaissons pas à l’avance la partie qui va remplacer <code>slug</code>, mais nous savons qu’il y aura quelque chose, et ce dossier va gérer ce scénario.</p>
<p>Pour faire ça, nous allons devoir utiliser la fonction <code>load</code>.</p>
<h3>Précharger le contenu de la page côté serveur</h3>
<p>En plus d’avoir +page.svelte qui permet de générer le contenu d’une route, SvelteKit possède également <code>+page.js</code> qui précharge sur le serveur avant la génération de la page. C’est aussi exécuté sur le client, afin de pouvoir l’<a href="https://en.wikipedia.org/wiki/Hydration_%28web_development%29" rel="nofollow">hydrater</a> si besoin.</p>
<p>Prenons un peu de recul pour expliquer plus en détails:</p>
<p>À chaque fois qu’on visite une route dans SvelteKit (par exemple <code>/blog</code>), le router cherche une <code>+page.js</code> dans cette route.</p>
<p>Si ce fichier existe (et exporte une function <code>load</code>, comme attendu), SvelteKit va exécuter cette fonction sur le serveur avant de générer la route <code>+page.svelte</code>, et va passer à celle-ci n’importe quelle donnée renvoyée par la function.</p>
<p>Pour le dire simplement: <code>+page.js</code> est lue en premier puis passe tout ce qui est nécessaire au modèle<code>+page.svelte</code> pour le générer.</p>
<p>Voici une illustration:</p>
<pre class="language-fs"><!-- HTML_TAG_START -->${`<code class="language-fs">📂 src
┗ 📂 routes
  ┗ 📂 any-route
    ┣ 📜 +page.js -- Précharge les données
    ┗ 📜 +page.svelte -- Génère la page</code>`}<!-- HTML_TAG_END --></pre>
<blockquote><p>Si vous préférez TypeScript, vous pouvez utiliser <code>.ts</code> au lieu de <code>.js</code></p></blockquote>
<p>Vu qu’on fait les choses de manière dynamique, nous allons nous reposer sur les capacités de préchargement de <code>+page.js</code>. Créons donc ce fichier:</p>
<pre class="language-fs"><!-- HTML_TAG_START -->${`<code class="language-fs">📂 src
┗ 📂 routes
  ┗ 📂 blog
    ┗ 📂 [slug]
      ┗ +page.js</code>`}<!-- HTML_TAG_END --></pre>
<p>À l’intérieur de <code>+page.js</code> nous devons exporter une function <code>load</code> qui va renvoyer des données utilisables par le modèle. Au minimum ça ressemble à ça:</p>
<pre class="language-js"><!-- HTML_TAG_START -->${`<code class="language-js"><span class="token comment">// src/routes/blog/[slug]/+page.js</span>
<span class="token keyword">export</span> <span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">load</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">&#123;</span> params <span class="token punctuation">&#125;</span></span><span class="token punctuation">)</span><span class="token punctuation">&#123;</span>
  <span class="token keyword">const</span> post <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">../</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>params<span class="token punctuation">.</span>slug<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token string">.md</span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">)</span>
  <span class="token keyword">const</span> <span class="token punctuation">&#123;</span> title<span class="token punctuation">,</span> date <span class="token punctuation">&#125;</span> <span class="token operator">=</span> post<span class="token punctuation">.</span>metadata
  <span class="token keyword">const</span> content <span class="token operator">=</span> post<span class="token punctuation">.</span>default

  <span class="token keyword">return</span> <span class="token punctuation">&#123;</span>
    content<span class="token punctuation">,</span>
    title<span class="token punctuation">,</span>
    date<span class="token punctuation">,</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`}<!-- HTML_TAG_END --></pre>
<p>Explicitons le code en détails:</p>
<ul><li>le plus important: <code>+page.js</code> exporte une function <code>load</code> asynchrone qui cherche à charger le fichier Markdown correspondant à la route visitée<ul><li>au fait, <code>params.slug</code> s’appelle comme ça parce qu’on a nommé notre route <code>[slug]</code>. Si nous avions nommé notre route dynamic <code>[pizza]</code>, il aurait fallu utiliser <code>params.pizza</code> à la place.</li></ul></li>
<li>une fois que nous avons le fichier chargé de manière asynchrone, nous le déconstruisons et <code>return</code> ce que nous souhaitons utiliser (ce sera disponible pour nous dans le modèle, juste après). <code>.metadata</code> contient toutes les propriétés <em>frontmatter</em> du billet, et <code>.default</code> est le contenu en lui-même. Ce n’est pas obligatoire de renvoyer les champs individuels comme ceci, on pourrait simplement renvoyer le billet en entier, mais j’aime bien déconstruire un peu sur le serveur afin d’avoir un modèle plus propre.</li>
<li>idéalement nous devrions entourer tout ça d’un bloc <code>try</code>/<code>catch</code> pour gérer les problèmes éventuels, mais on va juste faire le modèle minimal et fonctionnel pour le moment.</li></ul>
<p>Une fois ceci en place nous pouvons créer un <code>+page.svelte</code> qui va accompagner notre <code>+page.js</code>. Nous avons chargé nos données, nous pouvons les utiliser.</p>
<pre class="language-fs"><!-- HTML_TAG_START -->${`<code class="language-fs">📂 src
┗ 📂 routes
  ┗ 📂 blog
    ┗ 📂 [slug]
      ┣ +page.js
      ┗ +page.svelte</code>`}<!-- HTML_TAG_END --></pre>
<p>A l’intérieur de <code>+page.svelte</code> il suffit de peu de code pour terminer le tout !</p>
<p>Les données de la function <code>load</code> sont automatiquement disponibles à l’utilisation avec le prop <code>data</code>. Donc tout ce que nous avons à faire est d’exporter ce prop (pour que ce soit passé à l’intérieur) et l’exploiter !</p>
<pre class="language-svelte"><!-- HTML_TAG_START -->${`<code class="language-svelte"><span class="token comment">&lt;!-- src/routes/[slug]/+page.svelte --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">export</span> <span class="token keyword">let</span> data<span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>article</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span><span class="token language-javascript"><span class="token punctuation">&#123;</span> data<span class="token punctuation">.</span>title <span class="token punctuation">&#125;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>Published: <span class="token language-javascript"><span class="token punctuation">&#123;</span>data<span class="token punctuation">.</span>date<span class="token punctuation">&#125;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">svelte:</span>component</span> <span class="token attr-name">this=</span><span class="token language-javascript"><span class="token punctuation">&#123;</span>data<span class="token punctuation">.</span>content<span class="token punctuation">&#125;</span></span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>article</span><span class="token punctuation">></span></span></code>`}<!-- HTML_TAG_END --></pre>
<p>En chargeant un billet de blog nous devrions maintenant voir tout son contenu</p>
<p>img result</p>
<blockquote><p>Au cas où vous ne le sauriez pas, <code>&lt;svelte: component /&gt;</code> est ce qu’on appelle un composant dynamique; il génère un composant Svelte arbitraire (fourni en tant que valeur de la prop <code>this</code>), quand le composant final est inconnu à ce moment-là. C’est parfait dans cette situation parce que nous ne sommes pas certain·e·s du billet et du contenu qui sera généré. Aussi: tout ça fonctionne parce que nous avons préalablement déclaré les fichiers .md comme utilisables en tant que composant dans notre <code>svelte.config.js</code></p></blockquote>
<p>Autre syntaxe possible: on pourrait déconstruire tous les props de <code>data</code>, et les utiliser individuellement. Cela nécessite un peu plus de préparation, mais ça a l’avantage de nous laisser utiliser <code>Content</code> en tant que composant à part.</p>
<p>Ceci est équivalent à l’exemple ci-dessus:</p>
<pre class="language-svelte"><!-- HTML_TAG_START -->${`<code class="language-svelte"><span class="token comment">&lt;!-- Alternate approach! 👀 --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">export</span> <span class="token keyword">let</span> data
  <span class="token keyword">const</span> <span class="token punctuation">&#123;</span> title<span class="token punctuation">,</span> date<span class="token punctuation">,</span> Content <span class="token punctuation">&#125;</span> <span class="token operator">=</span> data
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>article</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span><span class="token language-javascript"><span class="token punctuation">&#123;</span>title<span class="token punctuation">&#125;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>Published: <span class="token language-javascript"><span class="token punctuation">&#123;</span>date<span class="token punctuation">&#125;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Content</span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>article</span><span class="token punctuation">></span></span></code>`}<!-- HTML_TAG_END --></pre>
<p>C’est comme vous voulez. Personnellement j’aime la practicité de la déconstruction, mais ça peut tendre vers plus de squelettage. Les deux syntaxes fonctionnent de la même façon.</p>
<blockquote><p>Si vous choisissez la deuxième option, veillez à mettre une majuscule pour le nom du contenu/composant (<code>Content</code>, dans ce cas-là), afin de l’identifier en composant - à la fois dans le modèle et dans les données retournées depuis la fonction <code>load</code>.</p></blockquote>
<p>Bien, nous avons à présent une bonne gestion des billets individuels. Maintenant nous allons construire la page d’index du blog, sur laquelle nous allons lister tous nos billets. Pour ce faire, et parce que nous allons sans doute lister les billets de plusieurs manières et à différents endroits, nous allons construire nos endpoints d’API.</p>
<h2>Les routes serveur de SvelteKit</h2>
<p>Jusqu’à présent chaque route que nous avons créées étaient des pages. Mais SvelteKit offre également un autre type de route: <a href="https://kit.svelte.dev/docs/routing#server" rel="nofollow">les routes serveur</a> (que vous pouvez considérer comme des endpoints d’API).</p>
<p>Les routes serveur fonctionnent de la même manière que les pages, mais là où les deuxièmes renvoient du HTML, les premières renvoient des données.</p>
<p>Il y a trois conventions importantes à respecter au moment de créer une route serveur (qui sont, j’insiste, similaire à des endpoints d’API):</p>
<ol><li>Une route serveur doit être appelée <code>+server.js</code></li>
<li>Le <code>+server.js</code> doit exporter une fonction nommée (non-anonyme) pour chaque <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods" rel="nofollow">verbe HTTP</a> auquel il répond (Souvent ce sera une fonction <code>GET</code>, mais vous pouvez aussi utiliser <code>POST</code>, etc.)</li>
<li>Le serveur doit renvoyer une nouvelle <code>Response</code> (Plus d’infos sur <a href="https://developer.mozilla.org/en-US/docs/Web/API/Response" rel="nofollow">les spécificités web de Response</a>).</li></ol>
<p>En guise d’exemple: si vous faites <code>src/routes/api/+server.js</code> et que vous mettez une fonction <code>GET</code> à l’intérieur, n’importe quelle requête <code>GET</code> à <code>/api</code> invoquerait cette fonction.</p>
<p><strong>Pourquoi une route serveur ?</strong> Parce qu’on pourrait vouloir afficher les billets à d’autres endroits dans notre application/site et utiliser un endpoint réduit la réécriture du code pour couvrir tous les endroits.
Quoi qu’il en soit, voici les détails dans la <a href="https://kit.svelte.dev/docs/routing#server" rel="nofollow">documentation pour les routes serveur</a>, mais c’est moins compliqué qu’il n’y paraît, alors allons-y !</p>
<h3>Créer un endpoint pour nos billets</h3>
<p>Puisque nous pourrions envisager de créer des endpoints supplémentaires plus tard, créons un dossier <code>src/routes/api</code>. À l’intérieur nous ajouterons un dossier <code>posts</code> et dans celui-ci un fichier <code>+server.js</code> qui permettra de renvoyer les billets.</p>
<pre class="language-fs"><!-- HTML_TAG_START -->${`<code class="language-fs">src
┗ 📂 routes
  ┗ 📂 api
    ┗ 📂 posts
      ┗ 📜 +server.js</code>`}<!-- HTML_TAG_END --></pre>
<p>Nous allons exporter dans ce nouveau fichier une méthode <code>GET</code> (puisque “get” est le seul verbe HTTP que nous accepterons: cet endpoint va uniquement renvoyer des données, et jamais en accepter).</p>
<p>Faisons un essaie rapide, juste pour voir le code en action:</p>
<pre class="language-js"><!-- HTML_TAG_START -->${`<code class="language-js"><span class="token comment">// +server.js</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">GET</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Response</span><span class="token punctuation">(</span><span class="token string">'Welcome to my API'</span><span class="token punctuation">)</span>
<span class="token punctuation">&#125;</span></code>`}<!-- HTML_TAG_END --></pre>
<p>Avec ça en place nous pouvons visiter <code>/api/posts</code> et voir le texte suivant (peu impressionnant, mais néanmoins chouette) qui s’affiche dans le navigateur</p>
<p>Pas mal non? Notre route API ne renvoie rien d’utile pour l’instant, à l’évidence, mais c’est quand même excitant de faire tourner ça aussi rapidement et facilement!</p>
<blockquote><p>Bien que nous n’allons pas aborder ça ici, il existe des paramètres qu’on peut rajouter à l’intérieur de la fonction <code>GET</code> qui exposent les headers, les paramètres de recherche et d’autres informations sur la requête.</p></blockquote>
<h3>Créer un utilitaire pour récupérer les billets</h3>
<p>La prochaine étape consiste à récupérer les billets Markdown. Je pense qu’utiliser une fonction d’aide est adéquat ici, une que l’on pourra importer et réutiliser à différents endroits et qui permettra de garder le code un petit peu plus propre.</p>
<p>On va créer un dossier <code>src/lib/utils</code> dans lequel on ajoute un fichier ìndex.js\`</p>
<pre class="language-fs"><!-- HTML_TAG_START -->${`<code class="language-fs">📂 src
┗ 📂 lib
  ┗ 📂 utils
    ┗ 📜 index.js</code>`}<!-- HTML_TAG_END --></pre>
<p>Dans notre fichier JS nous allons exporter une fonction <code>fetchMarkdownPosts</code> asynchrone. Son but sera de récupérer tous nos billets Markdown et renvoyer leurs données. Nous nous aiderons de Vite pour ça (l’outil de compilation qui alimente SvelteKit sous le capot).</p>
<pre class="language-js"><!-- HTML_TAG_START -->${`<code class="language-js"><span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">fetchMarkdownPosts</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
  <span class="token keyword">const</span> allPostFiles <span class="token operator">=</span> <span class="token keyword">import</span><span class="token punctuation">.</span>meta<span class="token punctuation">.</span><span class="token function">glob</span><span class="token punctuation">(</span><span class="token string">'/src/routes/blog/*.md'</span><span class="token punctuation">)</span>
  <span class="token keyword">const</span> iterablePostFiles <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">entries</span><span class="token punctuation">(</span>allPostFiles<span class="token punctuation">)</span>
  
  <span class="token keyword">const</span> allPosts <span class="token operator">=</span> <span class="token keyword">await</span> Promise<span class="token punctuation">.</span><span class="token function">all</span><span class="token punctuation">(</span>
    iterablePostFiles<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">[</span>path<span class="token punctuation">,</span> resolver<span class="token punctuation">]</span></span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
      <span class="token keyword">const</span> <span class="token punctuation">&#123;</span> metadata <span class="token punctuation">&#125;</span> <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">resolver</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token keyword">const</span> postPath <span class="token operator">=</span> path<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">3</span><span class="token punctuation">)</span>

      <span class="token keyword">return</span> <span class="token punctuation">&#123;</span>
        <span class="token literal-property property">meta</span><span class="token operator">:</span> metadata<span class="token punctuation">,</span>
        <span class="token literal-property property">path</span><span class="token operator">:</span> postPath<span class="token punctuation">,</span>
      <span class="token punctuation">&#125;</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
  <span class="token punctuation">)</span>

  <span class="token keyword">return</span> allPosts
<span class="token punctuation">&#125;</span></code>`}<!-- HTML_TAG_END --></pre>
<p>Il se passe beaucoup de choses dans cette fonction. Explicitons:</p>
<ul><li><code>import.meta.glob</code> est une fonction Vite. Elle importe tous les fichiers qui correspondent au <code>glob</code> indiqué - dans ce cas présent, tous les fichiers <code>.md</code> dans <code>src/routes/blog</code>.<ul><li>cette fonction renvoie un objet qui a pour clés chaque chemin relatif des fichiers, et pour valeurs une fonction “resolver” (ma dénomination, pas officielle) qui charge le contenu du fichier en tant que promesse JavaScript.</li></ul></li>
<li>La méthode <code>map</code> est juste là pour mettre en forme les données, pour les traiter plus facilement.</li>
<li>Etant donné que chaque élément attend la résolution d’une promesse, on entoure le tout d’un <code>await Promise.all</code></li></ul>
<p>Une dernière chose à noter: le chemin d’un fichier est différent de la route en place. Par exemple:</p>
<ul><li>ce fichier: <code>/src/routes/blog/post-title.md</code></li>
<li>charge à: <code>/blog/post-title</code></li></ul>
<p>Il nous faut donc découper un peu la route pour extraire le chemin. Puisqu’on sait de manière sûre que la route commencera toujours par <code>/src/routes</code>et finira toujours par <code>.md</code>, on peut sereinement utiliser <code>.slice(11, -3)</code> pour retirer ces caractères, soit les 11 premiers et les 3 derniers, afin d’avoir le bon chemin relatif. (On pourrait aussi utiliser <code>.replace</code> ou du regex pour être un tout petit peu plus explicite, mais vu qu’on connaît déjà le chemin avec lequel on travaille, je ne vois pas l’intérêt. <code>.slice</code>marche très bien.)</p>
<h3>Récupérer les posts à partir d’un endpoint de la route serveur</h3>
<p>Maintenant que nous avons notre fonction d’aide pour attraper nos données Markdown, la prochaine étape consiste à récupérer ces données sur le endpoint de l’API.</p>
<p>Dans <code>+server.js</code> nous allons mettre le code suivant:</p>
<pre class="language-js"><!-- HTML_TAG_START -->${`<code class="language-js"><span class="token comment">// src/routes/api/posts/+server.js</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> fetchMarkdownPosts <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'$lib/utils'</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> json <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@sveltejs/kit'</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">GET</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
  <span class="token keyword">const</span> allPosts <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">fetchMarkdownPosts</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

  <span class="token keyword">const</span> sortedPosts <span class="token operator">=</span> allPosts<span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span>b<span class="token punctuation">.</span>meta<span class="token punctuation">.</span>date<span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span>a<span class="token punctuation">.</span>meta<span class="token punctuation">.</span>date<span class="token punctuation">)</span>
  <span class="token punctuation">&#125;</span><span class="token punctuation">)</span>

  <span class="token keyword">return</span> <span class="token function">json</span><span class="token punctuation">(</span>sortedPosts<span class="token punctuation">)</span>
<span class="token punctuation">&#125;</span></code>`}<!-- HTML_TAG_END --></pre>
<p>Ça l’air beaucoup vu comme ça mais quand on se rend compte que c’est <em>tout</em> ce qu’il nous faut pour créer un endpoint à partir duquel on récupère tous nos billets, triés par date, c’est en fait <em>incroyable</em> !</p>
<p>Explicitons:</p>
<ul><li>D’abord on import et on utilise la fonction <code>fetchMarkdownPosts</code> créée ci-dessus pour récupérer les données.</li>
<li>On importe également l’outil pratique json. Il gère la conversion des données au format JSON pour nous et paramètres automatiquement les bonnes options pour les headers.</li>
<li>Ensuite on trie les billets par date, du plus récent au plus ancien. (On pourrait trier les posts dans la fonction d’aide, mais pour moi la logique devrait rester côté endpoint.)</li>
<li>Pour finir on <code>return</code> le produit final à l’intérieur d’une fonction <code>json()</code></li></ul>
<p>Faisons un test ! Actualisez votre <code>/api/posts</code> et vous devriez voir de vraies données.</p>
<p>img result api</p>
<p>Encore mieux: cet endpoint se mettra automatiquement à jour dès qu’on ajoutera un billet Markdown au reste.</p>
<blockquote><p>Dans l’idéal il faudrait entourer tout ça de blocs <code>try</code>/<code>catch</code> pour gérer les imprévus.</p></blockquote>
<h2>Terminer la page d’index du blog</h2>
<p>Avec notre <em>endpoint</em> en place c’est très facile de construire la page d’index du blog.</p>
<p>On <em>pourrait</em> faire la démarche côté client, avec un <code>fetch</code> inséré dans une fonction <code>onMount</code>, et ça serait okay, mais on se retrouverait alors avec un chargement qui n’affiche rien le temps que ça s’exécute, ce qui n’est pas terrible pour l’expérience utilisateur·rice. Au lieu de ça, exploitons la génération côté serveur de SvelteKit.</p>
<h3>Récupérer les billets côté serveur</h3>
<p>Vous vous rappelez que nous pouvons ajouter un <code>+page.js</code> à notre <code>+page.svelte</code> afin de précharger une fonction <code>load</code> ? Eh bien, c’est tout à fait indiqué pour récupérer des données d’API telles que nos billets de blog !</p>
<p>Quelques éléments supplémentaires à connaître sur <code>load</code>: </p>
<ul><li>Il a un accès contextuel à certains arguments spécifiques, notamment:<ul><li><code>url</code> et <code>params</code> qui contiennent des informations sur la requête</li>
<li><code>fetch</code> qui est une aide permettant de normaliser l’implémentation <code>fetch</code> (qui n’est pas la même entre le navigateur et Node)</li></ul></li>
<li><code>load</code> doit renvoyer un objet. Peu importe ce qu’il y a dedans, mais tout son contenu sera disponible pour nous dans <code>data</code>.</li>
<li><code>+page.js</code> s’exécute à la fois côté serveur et côté client. Ce n’est pas très important quand il s’agit de précharger des fichiers statiques, mais il ne faudrait pas faire référence à des choses propres à l’environnement comme <code>window</code> ou <code>process</code>. (Si vous voulez que <code>load</code> s’exécute uniquement sur le serveur, utilisez plutôt <code>+page.server.js</code>. À noter que <code>fetch</code> est disponible de manière native)</li></ul>
<pre class="language-js"><!-- HTML_TAG_START -->${`<code class="language-js"><span class="token comment">// src/routes/blog/+page.js</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">load</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">&#123;</span> fetch <span class="token punctuation">&#125;</span></span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
  <span class="token keyword">const</span> response <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">/api/posts</span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">)</span>
  <span class="token keyword">const</span> posts <span class="token operator">=</span> <span class="token keyword">await</span> response<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

  <span class="token keyword">return</span> <span class="token punctuation">&#123;</span>
    posts
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`}<!-- HTML_TAG_END --></pre>
<p>Ce morceau de pré-chargement gère tout ce dont on a besoin ! Nous avons des <code>posts</code> qui sont transmis au composant (en tant que <code>data</code>), et on peut l’utiliser pour itérer parmi nos billets et les générer dans le fichier <code>+page.svelte</code> correspondant</p>
<pre class="language-svelte"><!-- HTML_TAG_START -->${`<code class="language-svelte"><span class="token comment">&lt;!-- src/routes/blog/+page.svelte --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">export</span> <span class="token keyword">let</span> data
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span>Blog<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>
  
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span><span class="token punctuation">></span></span>
  <span class="token each"><span class="token punctuation">&#123;</span><span class="token keyword">#each</span> <span class="token language-javascript">data<span class="token punctuation">.</span>posts </span><span class="token keyword">as</span> <span class="token language-javascript">post<span class="token punctuation">&#125;</span></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h2</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href=</span><span class="token language-javascript"><span class="token punctuation">&#123;</span>post<span class="token punctuation">.</span>path<span class="token punctuation">&#125;</span></span><span class="token punctuation">></span></span>
          <span class="token language-javascript"><span class="token punctuation">&#123;</span>post<span class="token punctuation">.</span>meta<span class="token punctuation">.</span>title<span class="token punctuation">&#125;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h2</span><span class="token punctuation">></span></span>
      Publié le <span class="token language-javascript"><span class="token punctuation">&#123;</span>post<span class="token punctuation">.</span>meta<span class="token punctuation">.</span>date<span class="token punctuation">&#125;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>
  <span class="token each"><span class="token punctuation">&#123;</span><span class="token keyword">/each</span><span class="token punctuation">&#125;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">></span></span></code>`}<!-- HTML_TAG_END --></pre>
<p>Dans l’exemple ci-dessus le HTML est simplifié (et ne prend pas bien en compte le scénario où il n’y aurait pas de billets à afficher), mais vous voyez le genre. Vous pouvez augmenter le code en fonction du frontmatter de vos propres billets, en ajoutant une image/lien d’accroche, un extrait, etc.</p>
<p>img result index</p>
<h2>Précharger avec l’adaptateur statique</h2>
<p>SvelteKit est généré côté serveur par défaut, ce qui est bien car le SSR est en général meilleur pour les performances, l’accessibilité et le SEO. Ça veut aussi dire que le préchargement statique des fichiers (qui est ce que nous voulons) est opt-in.</p>
<p>On pourrait précharger manuellement n’importe quelle page, ce qui est pratique pour des sections telles qu’un “à propos” ou une “FAQ” qui n’ont pas de contenu dynamique. On peut aussi précharger au niveau du layout, pour gérer des dossiers entiers d’un coup. Peu importe l’option, elle est activée en exporant une constante appelée <code>prerender</code> avec pour valeur <code>true</code> <a href="https://kit.svelte.dev/docs/page-options#prerender" rel="nofollow">voir la documentation</a>.</p>
<p>Maintenant si on veut que le site entier soit préchargé de manière statique c’est préférable d’utiliser directement <a href="https://github.com/sveltejs/kit/tree/master/packages/adapter-static" rel="nofollow">l’adaptateur statique</a> de SvelteKit, comme ça pas besoin de retenir quelle route est statique ou non en fonction du code. Elles le seront toutes.</p>
<p>SvelteKit a de nombreux [adaptateurs], et vient clé en main avec un qui détecte automatiquement et compile en conséquence pour Netlify, Vercel ou Cloudfare, ce qui est pratique et aussi impressionnant ! Mais pour le statique, il nous faudra l’<code>adapter-static</code></p>
<pre class="language-bash"><!-- HTML_TAG_START -->${`<code class="language-bash"><span class="token function">npm</span> i <span class="token parameter variable">-D</span> @sveltejs/adapter-static</code>`}<!-- HTML_TAG_END --></pre>
<p>Une fois installé il faut faire quelques changements pour précharger toutes nos pages. D’abord, changez <code>adapter-auto</code> en <code>adapter-static</code> dans le fichier <code>svelte.config.js</code> (tout en haut, dans les <code>import</code>)</p>
<pre class="language-js"><!-- HTML_TAG_START -->${`<code class="language-js"><span class="token comment">// Replace the original &#96;adapter-auto&#96; line with this in svelte.config.js</span>
<span class="token keyword">import</span> adapter <span class="token keyword">from</span> <span class="token string">'@sveltejs/adapter-static'</span></code>`}<!-- HTML_TAG_END --></pre>
<p>Ensuite nous devons activer l’option en exportant une prop <code>prerender</code> avec une valeur <code>true</code>.
On <em>pourrait</em> faire ça manuellement pour chaque page, mais ce serait pénible. La meilleure façon de faire est de créer un <code>+layout.js</code> dans <code>src.routes</code> et d’y ajouter le <em>prop</em>. (Attention: c’est un fichier <code>.js</code>, pas notre fichier existant <code>+layout.svelte</code>; le nouveau fichier gère le préchargement, et non pas la génération.)</p>
<pre class="language-js"><!-- HTML_TAG_START -->${`<code class="language-js"><span class="token comment">// src/routes/+layout.js</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> prerender <span class="token operator">=</span> <span class="token boolean">true</span></code>`}<!-- HTML_TAG_END --></pre>
<p>Tout comme <code>+layout.svelte</code> gère le layout sur chaque page, <code>+layout.js</code> gère les scripts côté serveur sur chaque page. En mettant notre prop <code>prerender</code> à l’intérieur de ce fichier JS, il va se <em>diffuser</em> sur chaque page, ce qui nous évite de devoir le répéter dans chaque page enfant.</p>
<p>Pour en savoir plus sur l’adaptateur statique, vous pouvez lire <a href="https://github.com/sveltejs/kit/tree/master/packages/adapter-static" rel="nofollow">la documentation</a>.</p>
<hr>
<p>Avec notre adaptateur installé et activé dans notre fichier de configuration, toutes les pages du site seront préchargées en HTML statique au moment de la compilation !</p>
<blockquote><p>Un avantage de l’option statique de SvelteKit est que ça transforme toutes les pages en HTML statique, mais ça charge également un peu de JavaScript côté client pour aider à la navigation et au pré-chargement en fond. Ainsi, le site fonctionne très bien sans JavaScript, mais reste ouvert à l’amélioration progressive. Si vous voulez désactiver ce comportement pour empaqueter moins de JS, contre une navigation potentiellement moins fluide, ajoutez <code>export const csr = false</code> à votre <code>+layout.js</code>.</p></blockquote>
<p>Un dernier point à ce sujet: vous n’êtes pas <em>obligé·e·s</em> d’utiliser l’adaptateur statique. Vous pouvez sauter cette étape et faire avec l’adaptateur par défaut livré avec SvelteKit. Il vous permetta de déployer le site sur Netlify, Vercel ou Cloudfare, et le site serait généré côté serveur avec des fonctions serverless, au lieu d’être construit de manière statique.</p>
<p>Les deux options marchent bien, et cela dépendra surtout de votre usage et de vos préférences. Je reviens dessus simplement pour signaler à quel point c’est chouette que SvelteKit puisse passer d’une chose à l’autre simplement en échangeant d’adaptateur.</p>
<p><em>[ Le billet de Josh continue ensuite avec des améliorations optionnelles et des détails qui paufinent la base qu’on vient de faire, mais je pense qu’avec tout ce qu’on a fait c’est déjà un bon morceau. Si vous êtes intéressé·e·s n’hésitez pas à reprendre la lecture en anglais sur <a href="https://joshcollinsworth.com/blog/build-static-sveltekit-markdown-blog#optional-finishing-touches-and-extra-features" rel="nofollow">le site de Josh</a>, et si besoin je traduirai la deuxième partie optionnelle plus tard. ]</em></p>`;
});
export {
  Apprendre_sveltekit as default,
  metadata
};
