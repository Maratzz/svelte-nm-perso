---
title: Apprendre SvelteKit en créant un blog Markdown statique
date: "2021-12-14"
categories:
- "blog"
- "sveltekit"
---

En démarrant la refonte de mon site perso j'avais plusieurs objectifs en tête:
- me familiariser avec Svelte et SvelteKit à travers un projet qui me tient à coeur
- documenter ma progression, ainsi que les difficultés rencontrées, les solutions, et les améliorations au fil du temps, jusqu'à obtenir le site et les fonctionnalités que je voulais
- contribuer en français à la documentation autour de ces nouveaux outils qui est très limitée dans cette langue.

En faisant des recherches préliminaires je suis tombé sur [l'excellent billet de Josh Collinsworth](https://joshcollinsworth.com/blog/build-static-sveltekit-markdown-blog) sur son blog, qui m'a permis de démarrer et d'appréhender les différentes facettes de SvelteKit.

Sa concision et sa pédagogie sont un modèle pour la transmission d'informations, aussi ai-je demandé à Josh si je pouvais adapter son billet et le traduire pour en faire profiter les personnes francophones désireuses de se lancer à leur tour dans l'apprentissage de ces nouveaux outils.

Merci encore à Josh pour son aide ! À noter que son site, https://joshcollinsworth.com/ , est lui aussi entièrement fait avec Svelte et SvelteKit, et qu'il contient de nombreux articles tout aussi passionnants et informatifs que celui que j'ai choisi de traduire aujourd'hui, n'hésitez pas à y faire un tour.

---

## Ce que nous allons faire, et ce qu'il faut savoir avant de commencer

Cet article est un tutoriel pour créer un blog statique pré-rendu avec l'aide de SvelteKit, Markdown, Sass et une API (ce site est construit comme cela, au fait)

C'est aussi une introduction à SvelteKit en soi, avec une bonne vue d'ensemble des fondamentaux qui devraient être utilisables pour n'importe quel projet.

C'est en dernier lieu *fun*!*

**mon avis perso*

## Vous bénéficierez le plus de ce tuto si vous:

- connaissez déjà les bases du développement front-end et de JavaScript;
- avez au préalable une connaissance basique de Svelte (vous pouvez certainement suivre l'article sans ça, mais je recommande de lire le [tutoriel de Svelte](https://svelte.dev/tutorial/basics) d'abord si vous êtes complètement novices)
- connaissez les bases de Markdown et de Sass;
- connaissez les bases de récupérer des données en JSON depuis une API
- savez déjà installer des paquets avec npm

Pour finir, si vous ne souhaitez pas faire tout le tutoriel et préféreriez avoir directement la structure complète du blog clé en main, allez voir [le dossier de démarrage SvelteKit](https://github.com/josh-collinsworth/sveltekit-blog-starter) (c'est plus abouti que ce qu'on va fabriquer ici, mais les concepts sous-jacents sont les mêmes.)

C'est parti !

## Créer une nouvelle application SvelteKit

Pour générer un nouveau projet SvelteKit, exécutez cette commande dans votre terminal (évidemment, vous pouvez changer `my-app` pour n'importe quel autre nom que vous préférez)

```bash
npm create svelte@latest my-app
```

Quand vous exécutez la commande `init` pour démarrer, SvelteKit va vous poser quelques questions sur votre projet et ce que vous voulez faire:

![Questionnaire pour préciser le projet](/img/blog/sveltekit_setup.png)

Nous allons choisir l'option **"Skeleton project"** (*attention, pas Library skeleton project, car nous simplement faisons un site, pas une librairie*)

> Si c'est la première fois que vous utilisez SvelteKit, n'hésitez pas à choisir "SvelteKit demo app", explorer un peu le projet pour se faire une idée de comment ça marche, et revenir après. C'est une bonne introduction, mais c'est fourni avec plusieurs fichiers et styles qui prendraient du temps à effacer pour commencer

L'outil de préparation va également demander vos préférences au sujet de TypeScript, ESlint et Prettier. Je n'utiliserai pas TypeScript pour rester simple dans ce tutoriel, mais vous pouvez l'utiliser si vous le souhaitez (Svelte marche plutôt bien avec.)

Après avoir fait vos choix et quelques secondes d'installation, vous devriez voir apparaître `Your project is ready!` dans votre terminal, ainsi que les prochaines étapes et des liens utiles:

![Finalisation de l'installation de SvelteKit](/img/blog/sveltekit_setup_complete.png)

À ce moment-là, ouvrez votre projet dans VS Code (ou dans votre éditeur de texte préféré). Puis installez les dépendances dans le terminal et lancez le serveur de développement:
  
```bash
npm install
npm run dev -- --open
```
  
Terminez ces commandes et votre nouveau site s'affichera dans la fenêtre de votre navigateur

![La base du site après installation de SvelteKit](/img/blog/localhost_welcome.png)

Le squelette tel quel n'est pas très excitant, et il n'y a même pas de CSS. Mais c'est okay; ça nous laisse le champ libre pour personnaliser notre application comme on le souhaite, sans avoir à supprimer ou à modifier du code déjà présent.

C'est notre canvas blanc, et nous allons prochainement peindre dessus.

## Créer des routes dans SvelteKit

Comme beaucoup de frameworks (et PHP également, en fait), SvelteKit a une approche du *routing* et des pages formée sur les dossiers et les fichiers; la structure de `src/routes` va définir la structure de votre site.

N'importe quel dossier dans `src/routes` devient le nom d'une page. Un fichier `+page.svelte` à l'intérieur de ce dossier constitue le contenu HTML de la page.

Du coup, à l'intérieur de `src/route`:

-  `+page.svelte` est la page d'accueil
-  `a-propos/+page.svelte` serait la page `/a-propos`
-  `blog/+page.svelte` serait la page `/blog`
-  `blog/un-post/+page.svelte` deviendrait `/blog/un-post`

> La convention de `+page.svelte` peut prêter à confusion ou sembler inutilement complexe, surtout si vous étiez habitué·e·s à l'ancienne convention `index.svelte`. Mais comme nous le verrons prochainement, le préfixe `+` permet de faire la différence entre les pages et les composants. Il y a d'autres choses également que l'ont peut rajouter aux routes en plus des pages, comme des chemins dynamiques de serveur; nous verrons cela plus tard.

### Ajouter des pages

Histoire de démarrer avec quelques pages sur notre site, créons les dossiers `a-propos`, `contact` et `blog` à l'intérieur de `src/routes` (on peut toujours les supprimer ou les modifier plus tard.)
Dans chacun de ces dossiers nous ajouterons un fichier `+page.svelte`, pour générer le contenu de la page, ce que les personnes verront lorsqu'elles navigueront vers cette route du site.
Dans chacun de ces fichiers insérons un petit *header* et un peu de texte, juste pour avoir un peu de contenu

> Les fichiers Svelte peuvent être du HTML pur.

dans `a-propos/+page.svelte`

```svelte
<h1>Salut, je suis Nico !</h1>
<p>Ceci est ma page "à propos"</p>
```

dans `contact/+page.svelte`

```svelte
<h1>Restons en contact</h1>
<p><a href="mailto:test@test.com">Envoyez-moi un mail!</a></p>
```
  
dans `blog/+page.svelte`

```svelte
<h1>Blog</h1>
<p>My blog posts will go here eventually…</p>
```

Notre dossier `src/routes` devrait ressembler à cela maintenant:

```fs
📂 src
┗ 📂 routes
  ┣ 📜 +page.svelte
  ┣ 📂 blog
  ┃ ┗ 📜 +page.svelte
  ┣ 📂 about
  ┃ ┗ 📜 +page.svelte
  ┗ 📂 contact
    ┗ 📜 +page.svelte
```

Vous pouvez à présent visiter `/contact`, `/a-propos` ou `/blog` et voir les pages que vous venez de créer. Il n'y a pas grand-chose encore, bien sûr, mais c'est chouette de voir au moins que le *routing* est pris en charge automatiquement juste en créant des dossiers à l'intérieur de `routes` et en y ajoutant des fichiers `+page.svelte` à l'intérieur.

### Ajouter un layout

La plupart des sites et des applications ont des éléments qui sont réutilisés sur chaque page (les exemples les plus communs sont un `header` et un `footer`.) Etant donné qu'ajouter ces éléments à la main dans chaque page serait à la fois répétitif et augmente le risque de faire une erreur, SvelteKit (comme beaucoup de frameworks) nous facilite la tâche et permet de définir des *layouts*.

Dans `src/routes`, créons un nouveau fichier appelé `+layout.svelte`.

```fs
📂 src
┗ 📂 routes
  ┗ 📜 +layout.svelte
  ```

**Ce fichier a un rôle spécial:** SvelteKit vérifie automatiquement s'il y a un fichier `+layout.svelte` dans le dossier `routes` (et tous les sous-dossiers). Ce *layout* va s'appliquer à tout le contenu chargé depuis cette route et les sous-routes.

Un *layout* devient un composant parent, et la page actuelle sera insérée dedans en tant que composant enfant.

Donc un *layout* directement placé dans le dossier routes va s'appliquer de manière globale, sur chaque page.

Faisons un exemple pour illustrer ça: ouvrez le nouveau `+layout.svelte` et ajoutez un *header* et *footer* modèle:

```svelte
<!-- +layout.svelte -->
<header>Hi, I'm a header</header>

<main>
  <slot />
</main>

<footer>Hello, I'm the footer.</footer>
```

Sauvegardez et vous devriez voir le texte du *header* apparaître au-dessus du contenu de la page, et le texte du *footer* en-dessous.

![Le layout avec le header et le footer est appliqué](/img/blog/localhost_header_and_footer.png)

## Créer des composants

Taper le chemin des routes dans le navigateur n'est pas terrible alors ajoutons un peu de navigation. On en profitera pour créer notre premier composant.

D'abord, créez un nouveau dossier appelé `lib` à l'intérieur de `src` (`lib` est une autre convention de SvelteKit; on en reparle plus tard).

A l'intérieur de `src/lib`, on va créer un dossier appelé `components`, juste pour s'y retrouver, et dans ce dossier créez un nouveau composant appelé `Header.svelte`

```fs
📂 src
┣ 📁 routes
┗ 📂 lib
  ┗ 📂 components
    ┗ 📜 Header.svelte
```

> Ce n'est pas obligatoire de nommer les composants avec une majuscule, ou de les garder dans leur propre dossier, mais c'est en général encouragé.

Dans notre nouveau composant `Header` on va insérer une navigation basique mais efficace

```svelte
<!-- Header.svelte -->
<header>
  <a href="/">Home</a>

  <nav>
    <ul>
      <li>
        <a href="/blog">Blog</a>
      </li>
      <li>
        <a href="/about">About</a>
      </li>
      <li>
        <a href="/contact">Contact</a>
      </li>
    </ul>
  </nav>
</header>
```

Sauvegardez tout ça et revenez sur `+layout.svelte` pour l'utiliser !
Pour ce faire, nous devons d'abord l'importer avec `import`, ce qui veut dire que nous devons ajouter un tag `<script>` à notre layout (je préfère l'ajouter tout en haut du fichier, mais Svelte est assez permissif et permet d'organiser l'ordre des composants comme vous voulez.) Une fois importé, on peut remplacer le *header* temporaire avec le composant

```svelte
<!-- +layout.svelte -->
<script>
  import Header from '$lib/components/Header.svelte'
</script>

<Header />
<!-- The rest of the HTML here -->
```

Remarquez le chemin de l'`import`. `$lib` est un alias pratique qui pointe directement vers `src/lib`, ce qui évite de devoir péniblement taper des chemins relatifs (vous pouvez personnaliser cet alias ou ajouter le vôtre dans `jsconfig.json`, mais je n'aborderai pas ce sujet ici.)

Quoi qu'il en soit, vous devriez voir maintenant quelque chose d'un peu plus ergonomique pour l'utilisateur·rice:

img screen

L'apparence n'est toujours pas en place, mais c'est fonctionnel. On peut désormais naviguer entre les pages, ce qui va permettre de tester les choses un peu plus facilement.

### L'apparence des composants

Le style associé aux composants Svelte a une portée locale (*scope*) par défaut. On peut ainsi écrire du CSS sans avoir à se soucier d'effets de débordement à l'extérieur du composant.

Pour tester cela, ajoutons un tag `<style>` dans le `Header.svelte` (il peut se mettre n'importe où mais je préfère le mettre à la fin.)

```svelte
<!-- Header.svelte -->

<!-- ... The rest of the file's contents here -->

<style>
  header {
    padding: 1rem;
    background: lightskyblue;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  ul {
    margin: 0;
    list-style-type: none;
    display: flex;
    gap: 1rem;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
</style>
```

Si vous sauvegardez et jetez un oeil au site désormais, vous devriez voir votre *header* avec une apparence plus standard pour un *header*. Vous pouvez également constater que les règles CSS ne s'appliquent pas au contenu principal de la page. C'est le pouvoir de la portée locale !

Si vous le souhaitez, vous pouvez répéter ce processus avec un composant `<Footer />`. Je passe l'exercice étant donné que c'est la même chose, mais ce serait une bonne chose à faire au stade où on en est.

Rappel: les composants liées au *routing* (comme les pages, layouts et les points d'accès) commencent par un `+`. Les composants normaux, réutilisables n'ont pas ça, et commencent d'ordinaire avec une majuscule (Vous pouvez tout garder dans le dossier `routes`, mais c'est souvent préférable d'avoir les composants réutilisables dans `lib` plutôt.)

## Les feuilles de styles dans SvelteKit

Svelte vous permet d'importer des feuilles de style directement dans les composants, y compris les pages et les *layouts*. Il y a d'autres manières de charger des feuilles de style, mais je pense que c'est la meilleure. D'abord c'est simple, mais surtout Svelte les préprocess automatiquement, ce qui sera pratique lorsqu'on voudra ajouter Sass.

Créons un nouveau dossier `styles` dans `src/lib` et ajoutons un fichier `style.css` à l'intérieur

```fs
📂 src
┣ 📁 routes
┗ 📂 lib
  ┣ 📁 components
  ┗ 📂 styles
    ┗ 📜 style.css 
```

> Il n'y a pas règles sur comment organiser les choses à l'intérieur de `src/lib`. Vous n'êtes même pas obligé·e·s d'utiliser `lib`. Faites selon votre propre logique et/ou vos préférences.

Vous pouvez ajouter le CSS que vous voulez, mais si vous avez besoin d'un début, voici une série de règles qui devraient rendre l'ensemble un peu plus joli:

```css
/* style.css */
body {
  margin: 0;
  background: #eee;
  color: #333;
  font-family: sans-serif;
}

main {
  padding: 1rem;
  margin: 2rem auto;
  max-width: 40rem;
}
```

Une fois que nous avons la feuille de styles avec du CSS dedans, nous pouvons l'importer de manière globale comme pour le composant *Header*:

```svelte
<!-- +layout.svelte -->
<script>
  import Header from '$lib/components/Header.svelte'
  import '$lib/styles/style.css'
</script>

<!-- ...HTML here -->
```

img rendu css

Etant donné que SvelteKit est compilé et généré sur le serveur (*server-side rendering*, ou SSR), on peut inspecter la page et voir que notre CSS a été directement rajouté au HTML au lieu d'être construite côté client (*client-side rendering* ou CSR). Chouette !

> Importer des feuilles de style dans des fichiers JavaScript n'est pas un standard du web; c'est simplement pris en charge par quelques *bundlers* et outils de compilation.

### Ajouter Sass à SvelteKit

Svelte permet d'ajouter facilement des processeurs externes, grâce à `[svelte-preprocess](https://github.com/sveltejs/svelte-preprocess)`.

> *`svelte-preprocess` transforme automatiquement le code dans vos gabarits Svelte pour fournir une prise en charge intégrée de TypeScript, PostCSS, scss/sass, Less, et de nombreuses autres technologies.*

La prochaine étape consiste à installer à la fois `svelte-preprocess` et `sass`, ce qu'on va faire dans le même mouvement

```bash    
npm i -D svelte-preprocess sass
```

> Depuis la version 1.0 SvelteKit est installé avec `vitePreprocess` en tant qu'alternative embarquée de `svelte-preprocess`. Bien que `vitePreprocess` soit fourni avec SvelteKit, ce qui le rend plus simple à utiliser hors de la boîte, ce n'est toutefois pas à l'heure actuelle aussi versatile que `svelte-preprocess`. Il manque des fonctionnalités qui sont indispensables pour moi, comme le modificateur `global` pour les styles des composants. C'est pour cela que j'ai préféré garder `svelte-preprocess` dans ce tutoriel. [Vous pouvez en lire plus sur les deux préprocesseurs dans la documentation](npm%20i%20-D%20svelte-preprocess%20sass).

#### Modifier la configuration Svelte

Ensuite, ouvrez le fichier svelte.config.js qu'on trouve à la racine du projet.
Comme son nom l'indique, svelte.config.js est le coeur de, ben la configuration. C'est là que nous effectuerons tous les changements nécessaires concernant les options de SvelteKit et le compilateur.

Ce changement-ci est minime: nous devons simplement importer svelte-preprocess et l'ajouter à la liste des pré-processeurs de SvelteKit.

```js
// svelte.config.js
import sveltePreprocess from 'svelte-preprocess'

const config = {
  kit: { /* ...other kit options here already */ },

  preprocess: [
    sveltePreprocess(),
  ],
}
```

Veuillez notez qu'il faudra créer l'option `preprocess`, elle n'est pas là par défaut (on rajoutera le preprocessing de Markdown ici également, plus tard.)

Veuillez également noter que vous *pouvez* passer un objet avec plus d'options à l'intérieur de la fonction `sveltePreprocess()`, mais nous ne ferons pas ça pour l'instant. La fonction sait déjà quoi faire avec Sass par défaut, du coup pas besoin de personnalisation supplémentaire.

> Ça vaut le coup de mentionner l'option `scss.prependData`, qui permet d'injecter automatiquement du code au début de n'importe quel traitement Sass (tel que des variables Sass ou un `@import`). Vous pouvez en lire plus dans [la documentation autour de `svelte-preprocess`](https://github.com/sveltejs/svelte-preprocess/blob/main/docs/getting-started.md#31-prepending-content); je voulais simplement le mentionner vu que c'est assez pratique.

Une dernière chose importante à savoir: chaque changement de configuration demande de redémarrer le serveur de développement pour appliquer les nouveaux changements.

### Ajouter SCSS au style des composants

Maintenant que nous avons à la fois Sass et le pré-processeur installés, nous pouvons utiliser Sass dans n'importe quel bloc de `<style>` d'un composant en ajoutant un attribut `lang`, comme ceci:

```svelte
<style lang="scss">
// We can write SCSS here!
</style>
```

### Utiliser des fichiers SCSS globaux

Faire référence à des fichiers SCSS se fait de la même manière que pour des fichiers CSS. En fait vous pouvez simplement renommer le fichier existant `style.css` en `style.scss`. (Il faudra aussi mettre à jour l'`import` dans notre *layout* aussi, mais c'est tout.)

```svelte
<!-- +layout.svelte -->
<script>
  import '$lib/styles/style.scss'
</script>
```

OK, nous avons maintenant une idée assez précise de la structure du projet et de la personnalisation. Il est temps de s'occuper de la dernière pièce du puzzle: la prise en charge de Markdown.

## Ajouter Markdown à SvelteKit avec mdsvex

Si vous avez entendu parler de MDX (généralement utilisé dans les projets sous React), vous pouvez considérer [mdsvex](https://mdsvex.pngwn.io/), drôle de nom, comme l'équivalent pour Svelte.

Hélas le mot *svelte* est compliqué à utiliser pour faire des portemanteaux élégants, mais ça n'arrête pas la communauté Svelte pour autant.

Quoi qu'il en soit, mdsvex fait tout ce dont nous avons besoin avec Markdown:
- ça prend en charge la conversion de Markdown vers HTML
- ça permet d'utiliser des fichiers Markdown comme des composants
- et ça permet d'utiliser des composants Svelte *à l'intérieur* de Markdown

D'abord, installons msdvex

```bash
npm i -D mdsvex
```

Ensuite nous devons ajouter mdsvex à notre configuration. Ouvrez `svelte.config.js` et mofidiez le code pour avoir ceci:

```js
// svelte.config.js
/* Other imports here */
import { mdsvex } from 'mdsvex'

const config = {
  kit: { /* Kit options here */ },
  
  extensions: ['.svelte', '.md'],

  preprocess: [
    sveltePreprocess(),
    mdsvex({
      extensions: ['.md']
    })
  ]
}
```

Pour les détails:
- la propriété `extensions` dans `config` liste les types de fichiers qu'il faut traiter comme des composants (ce qui permet à Svelte de les importer et de les utiliser comme des composants classiques)
- la fonction `mdsvex()` pré-processe le Markdown en HTML, mais ça cible uniquement les fichiers `.svx` par défaut, alors on modifie cet argument pour inclure également les fichiers `.md`

**Rappel:** n'oubliez pas de redémarrer le serveur de développement après avoir effectué les changements de configuration.

Si vous rencontre des erreurs, vérifiez que tout est bien correctement installé, que toutes les importations sont présentes dans votre fichier de configuration, et qu'il n'y a pas d'erreurs de syntaxe.

### Les pages Markdown

Grâce aux changements dans la configuration, nous pouvons désormais importer et utiliser les fichiers Markdown comme des composants Svelte.

Grâce à mdsvex, nous pouvons donc utiliser les fichiers Markdown comme des pages.

Pour tester, créons `src/routes/uses/+page.md` et écrivons du Markdown dedans. Vous pouvez voir le contenu en allant sur `/uses`

```fs
📂 src
┗ 📂 routes
  ┗ 📂 uses
    ┗  📜 +page.md
```

```md
# Uses

**Here's some stuff I use**

- SvelteKit
- VS Code
- Emojis 😎
```

img result

Vous pouvez même importer et utiliser du contenu Markdown à l'intérieur d'autres fichiers, si vous avez besoin qu'une partie de la page soit intéractive par exemple, mais que le reste soit juste du texte Markdown statique.

Les pages Markdown sont une option intéressantes pour du contenu principalement textuel, vu que c'est souvent plus rapide et facile d'écrire du Markdown que de la syntaxe HTML.

La page `/uses` n'a pas besoin d'être permanente, mais gardons-la pour le moment; nous l'utiliserons à nouveau bientôt. Parlons de quelques fonctionnalités sympa de mdsvex.

### Blocs de code dans Markdown

Pratique, mdsvex vient avec [prism.js](https://prismjs.com/) pré-installé pour mettre en évidence la syntaxe du code. Tout ce que vous avez à faire est de préciser le langage (en l'ajoutant au triple ` du début de bloc) et mdsvex va l'interpréter correctement.

```js
// JavaScript goes here,
// And will be syntax-highlighted!
```

Tous les blocs de code sur ce site sont générés avec cette technique. Bonus: mdsvex a même `svelte` dans les langages disponibles !
Notez qu'il vous faudra un peu de CSS pour faire les couleurs, mais il y a de [nombreux thèmes utilisables tels quel](https://github.com/PrismJS/prism-themes), ou en tant que base pour faire le vôtre.

### Utiliser les composants Svelte dans Markdown

Comme dit précédemment: mdsvex vous permet d'utiliser les composants Svelte à l'intérieur de Markdown !

Pour ce faire, insérez un tag script au début du fichier (juste après le [frontmatter](https://docusaurus.io/fr/docs/2.0.1/markdown-features#front-matter)) et importer le composant dedans. Vous pouvez ensuite ajouter celui-ci dans votre Markdown comme d'habitude:

```md
---
# frontmatter goes here
---
<script>
import SomeComponent from '$lib/components/SomeComponent.svelte'
</script>

# Markdown content here

<SomeComponent />

More markdown _here_!
```

> Comme vous pouvez vous en douter peut-être: oui, vous pouvez importer des fichiers Markdown *à l'intérieur* d'autres fichiers Markdown !

## Mettre en place le blog

Maintenant que nous avons fini la mise en place du traitement Markdown, nous pouvons aborder le coeur de ce tutoriel et commencer la mise en place du blog.

*[ À ce moment là de l'article, Josh présente deux manières d'organiser les billets Markdown, une où chaque billet est dans un dossier séparé, c'est la méthode #1 et une autre où les billets sont tous réunis dans un seul dossier, c'est la méthode #2. Etant donné que j'ai choisi d'implémenter la méthode #2, je ne vais traduire que celle-là pour le moment, le billet est déjà bien assez long comme ça. Si des personnes souhaitent une traduction de l'autre méthode, je le ferai à ce moment-là. ]*

### Méthode #2: les routes dynamiques

Comme mentionné plus tôt: on pourrait avoir un dossier dans `src/routes/blog` pour chaque billet de blog, mais ce serait pénible et compliqué de gérer autant de fichiers passé un certain volume.

Au lieu de faire ça nous allons simplement mettre tous nos billets markdown dans `src/routes/blog` et utiliser une seule route dynamique pour les afficher ! Ce faisant on va aussi découvrir plusieurs nouveaux aspects du *routing* dans SvelteKit.

Démarrons avec quelques billets Markdown dans le dossier blog. 

```fs
📂 src
┗ 📂 routes
  ┗ 📂 blog
    ┣ 📜 +page.svelte
    ┣ 📜 1.md
    ┗ 📜 2.md
```

Dans chaque billet vous pouvez mettre ce template:

```md
---
title: Un titre de post
date: "2021-12-14"
---
Bonjour, ceci est un _billet de blog._
**Enchanté!**
```

Pour le moment `/blog/1` et `/blog/2` ne s'afficheront pas. C'est parce que chaque route sur notre site doit avoir un `+page.svelte` (ou un fichier valide commençant par `+`) à afficher.

> Vous pouvez créer un sous-dossier pour mettre tous les billets dedans, ou même les mettre complètement ailleurs, comme bon vous semble. J'ai juste utilisé le chemin le plus facile. Si vous changez l'endroit où sont les fichiers, veillez à corriger le chemin dans le code.

Du coup comment peut-on charger le contenu d'un billet ? C'est là qu'interviennent les routes dynamiques !

Créons un dossier `[slug]` à l'intérieur de `src/routes/blog` (en incluant les crochets dans le nom du dossier).

```fs
📂 src
┗ 📂 routes
  ┗ 📂 blog
    ┣ 📜 +page.svelte
    ┣ 📜 1.md
    ┣ 📜 2.md
    ┗ 📂 [slug]
```

Les crochets ( `[ ]` ) indiquent que cette route est dynamique; elle correspondra à n'importe quel chemin `/blog/*` (sauf la page `/blog` qui est bien sûr gérée par le fichier `+page.svelte`).

En d'autres termes: nous ne connaissons pas à l'avance la partie qui va remplacer `slug`, mais nous savons qu'il y aura quelque chose, et ce dossier va gérer ce scénario.

Pour faire ça, nous allons devoir utiliser la fonction `load`.

### Précharger le contenu de la page côté serveur

En plus d'avoir +page.svelte qui permet de générer le contenu d'une route, SvelteKit possède également `+page.js` qui précharge sur le serveur avant la génération de la page. C'est aussi exécuté sur le client, afin de pouvoir l'[hydrater](https://en.wikipedia.org/wiki/Hydration_%28web_development%29) si besoin.

Prenons un peu de recul pour expliquer plus en détails:

À chaque fois qu'on visite une route dans SvelteKit (par exemple `/blog`), le router cherche une `+page.js` dans cette route.

Si ce fichier existe (et exporte une function `load`, comme attendu), SvelteKit va exécuter cette fonction sur le serveur avant de générer la route `+page.svelte`, et va passer à celle-ci n'importe quelle donnée renvoyée par la function.

Pour le dire simplement: `+page.js` est lue en premier puis passe tout ce qui est nécessaire au modèle`+page.svelte` pour le générer.

Voici une illustration:

```fs
📂 src
┗ 📂 routes
  ┗ 📂 any-route
    ┣ 📜 +page.js -- Précharge les données
    ┗ 📜 +page.svelte -- Génère la page
```

> Si vous préférez TypeScript, vous pouvez utiliser `.ts` au lieu de `.js`

Vu qu'on fait les choses de manière dynamique, nous allons nous reposer sur les capacités de préchargement de `+page.js`. Créons donc ce fichier:

```fs
📂 src
┗ 📂 routes
  ┗ 📂 blog
    ┗ 📂 [slug]
      ┗ +page.js
```

À l'intérieur de `+page.js` nous devons exporter une function `load` qui va renvoyer des données utilisables par le modèle. Au minimum ça ressemble à ça:

```js
// src/routes/blog/[slug]/+page.js
export async function load({ params }){
  const post = await import(`../${params.slug}.md`)
  const { title, date } = post.metadata
  const content = post.default

  return {
    content,
    title,
    date,
  }
}
```

Explicitons le code en détails:

- le plus important: `+page.js` exporte une function `load` asynchrone qui cherche à charger le fichier Markdown correspondant à la route visitée
	- au fait, `params.slug` s'appelle comme ça parce qu'on a nommé notre route `[slug]`. Si nous avions nommé notre route dynamic `[pizza]`, il aurait fallu utiliser `params.pizza` à la place.
- une fois que nous avons le fichier chargé de manière asynchrone, nous le déconstruisons et `return` ce que nous souhaitons utiliser (ce sera disponible pour nous dans le modèle, juste après). `.metadata` contient toutes les propriétés *frontmatter* du billet, et `.default` est le contenu en lui-même. Ce n'est pas obligatoire de renvoyer les champs individuels comme ceci, on pourrait simplement renvoyer le billet en entier, mais j'aime bien déconstruire un peu sur le serveur afin d'avoir un modèle plus propre.
- idéalement nous devrions entourer tout ça d'un bloc `try`/`catch` pour gérer les problèmes éventuels, mais on va juste faire le modèle minimal et fonctionnel pour le moment.

Une fois ceci en place nous pouvons créer un `+page.svelte` qui va accompagner notre `+page.js`. Nous avons chargé nos données, nous pouvons les utiliser.

```fs
📂 src
┗ 📂 routes
  ┗ 📂 blog
    ┗ 📂 [slug]
      ┣ +page.js
      ┗ +page.svelte
```

A l'intérieur de `+page.svelte` il suffit de peu de code pour terminer le tout !

Les données de la function `load` sont automatiquement disponibles à l'utilisation avec le prop `data`. Donc tout ce que nous avons à faire est d'exporter ce prop (pour que ce soit passé à l'intérieur) et l'exploiter !

```svelte
<!-- src/routes/[slug]/+page.svelte -->
<script>
  export let data;
</script>

<article>
  <h1>{ data.title }</h1>
  <p>Published: {data.date}</p>
  <svelte:component this={data.content} />
</article>
```

En chargeant un billet de blog nous devrions maintenant voir tout son contenu

img result

> Au cas où vous ne le sauriez pas, `<svelte: component />` est ce qu'on appelle un composant dynamique; il génère un composant Svelte arbitraire (fourni en tant que valeur de la prop `this`), quand le composant final est inconnu à ce moment-là. C'est parfait dans cette situation parce que nous ne sommes pas certain·e·s du billet et du contenu qui sera généré. Aussi: tout ça fonctionne parce que nous avons préalablement déclaré les fichiers .md comme utilisables en tant que composant dans notre `svelte.config.js`

Autre syntaxe possible: on pourrait déconstruire tous les props de `data`, et les utiliser individuellement. Cela nécessite un peu plus de préparation, mais ça a l'avantage de nous laisser utiliser `Content` en tant que composant à part.

Ceci est équivalent à l'exemple ci-dessus:

```svelte
<!-- Alternate approach! 👀 -->
<script>
  export let data
  const { title, date, Content } = data
</script>

<article>
  <h1>{title}</h1>
  <p>Published: {date}</p>
  <Content />
</article>
```

C'est comme vous voulez. Personnellement j'aime la practicité de la déconstruction, mais ça peut tendre vers plus de squelettage. Les deux syntaxes fonctionnent de la même façon.

> Si vous choisissez la deuxième option, veillez à mettre une majuscule pour le nom du contenu/composant (`Content`, dans ce cas-là), afin de l'identifier en composant - à la fois dans le modèle et dans les données retournées depuis la fonction `load`.

Bien, nous avons à présent une bonne gestion des billets individuels. Maintenant nous allons construire la page d'index du blog, sur laquelle nous allons lister tous nos billets. Pour ce faire, et parce que nous allons sans doute lister les billets de plusieurs manières et à différents endroits, nous allons construire nos endpoints d'API.

## Les routes serveur de SvelteKit

Jusqu'à présent chaque route que nous avons créées étaient des pages. Mais SvelteKit offre également un autre type de route: [les routes serveur](https://kit.svelte.dev/docs/routing#server) (que vous pouvez considérer comme des endpoints d'API).

Les routes serveur fonctionnent de la même manière que les pages, mais là où les deuxièmes renvoient du HTML, les premières renvoient des données.

Il y a trois conventions importantes à respecter au moment de créer une route serveur (qui sont, j'insiste, similaire à des endpoints d'API):
1. Une route serveur doit être appelée `+server.js`
2. Le `+server.js` doit exporter une fonction nommée (non-anonyme) pour chaque [verbe HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) auquel il répond (Souvent ce sera une fonction `GET`, mais vous pouvez aussi utiliser `POST`, etc.)
3. Le serveur doit renvoyer une nouvelle `Response` (Plus d'infos sur [les spécificités web de Response](https://developer.mozilla.org/en-US/docs/Web/API/Response)).

En guise d'exemple: si vous faites `src/routes/api/+server.js` et que vous mettez une fonction `GET` à l'intérieur, n'importe quelle requête `GET` à `/api` invoquerait cette fonction.

**Pourquoi une route serveur ?** Parce qu'on pourrait vouloir afficher les billets à d'autres endroits dans notre application/site et utiliser un endpoint réduit la réécriture du code pour couvrir tous les endroits.
Quoi qu'il en soit, voici les détails dans la [documentation pour les routes serveur](https://kit.svelte.dev/docs/routing#server), mais c'est moins compliqué qu'il n'y paraît, alors allons-y !

### Créer un endpoint pour nos billets

Puisque nous pourrions envisager de créer des endpoints supplémentaires plus tard, créons un dossier `src/routes/api`. À l'intérieur nous ajouterons un dossier `posts` et dans celui-ci un fichier `+server.js` qui permettra de renvoyer les billets.

```fs
src
┗ 📂 routes
  ┗ 📂 api
    ┗ 📂 posts
      ┗ 📜 +server.js
```

Nous allons exporter dans ce nouveau fichier une méthode `GET` (puisque "get" est le seul verbe HTTP que nous accepterons: cet endpoint va uniquement renvoyer des données, et jamais en accepter).

Faisons un essaie rapide, juste pour voir le code en action:

```js
// +server.js

export const GET = () => {
  return new Response('Welcome to my API')
}
```

Avec ça en place nous pouvons visiter `/api/posts` et voir le texte suivant (peu impressionnant, mais néanmoins chouette) qui s'affiche dans le navigateur

Pas mal non? Notre route API ne renvoie rien d'utile pour l'instant, à l'évidence, mais c'est quand même excitant de faire tourner ça aussi rapidement et facilement!

> Bien que nous n'allons pas aborder ça ici, il existe des paramètres qu'on peut rajouter à l'intérieur de la fonction `GET` qui exposent les headers, les paramètres de recherche et d'autres informations sur la requête.

### Créer un utilitaire pour récupérer les billets

La prochaine étape consiste à récupérer les billets Markdown. Je pense qu'utiliser une fonction d'aide est adéquat ici, une que l'on pourra importer et réutiliser à différents endroits et qui permettra de garder le code un petit peu plus propre.

On va créer un dossier `src/lib/utils` dans lequel on ajoute un fichier ìndex.js`

```fs
📂 src
┗ 📂 lib
  ┗ 📂 utils
    ┗ 📜 index.js
```

Dans notre fichier JS nous allons exporter une fonction `fetchMarkdownPosts` asynchrone. Son but sera de récupérer tous nos billets Markdown et renvoyer leurs données. Nous nous aiderons de Vite pour ça (l'outil de compilation qui alimente SvelteKit sous le capot).

```js
export const fetchMarkdownPosts = async () => {
  const allPostFiles = import.meta.glob('/src/routes/blog/*.md')
  const iterablePostFiles = Object.entries(allPostFiles)
  
  const allPosts = await Promise.all(
    iterablePostFiles.map(async ([path, resolver]) => {
      const { metadata } = await resolver()
      const postPath = path.slice(11, -3)

      return {
        meta: metadata,
        path: postPath,
      }
    })
  )

  return allPosts
}
```

Il se passe beaucoup de choses dans cette fonction. Explicitons:

- `import.meta.glob` est une fonction Vite. Elle importe tous les fichiers qui correspondent au `glob` indiqué - dans ce cas présent, tous les fichiers `.md` dans `src/routes/blog`.
  - cette fonction renvoie un objet qui a pour clés chaque chemin relatif des fichiers, et pour valeurs une fonction "resolver" (ma dénomination, pas officielle) qui charge le contenu du fichier en tant que promesse JavaScript.
- La méthode `map` est juste là pour mettre en forme les données, pour les traiter plus facilement.
- Etant donné que chaque élément attend la résolution d'une promesse, on entoure le tout d'un `await Promise.all`

Une dernière chose à noter: le chemin d'un fichier est différent de la route en place. Par exemple:
- ce fichier: `/src/routes/blog/post-title.md`
- charge à: `/blog/post-title`

Il nous faut donc découper un peu la route pour extraire le chemin. Puisqu'on sait de manière sûre que la route commencera toujours par `/src/routes`et finira toujours par `.md`, on peut sereinement utiliser `.slice(11, -3)` pour retirer ces caractères, soit les 11 premiers et les 3 derniers, afin d'avoir le bon chemin relatif. (On pourrait aussi utiliser `.replace` ou du regex pour être un tout petit peu plus explicite, mais vu qu'on connaît déjà le chemin avec lequel on travaille, je ne vois pas l'intérêt. `.slice`marche très bien.)

### Récupérer les posts à partir d'un endpoint de la route serveur

Maintenant que nous avons notre fonction d'aide pour attraper nos données Markdown, la prochaine étape consiste à récupérer ces données sur le endpoint de l'API.

Dans `+server.js` nous allons mettre le code suivant:

```js
// src/routes/api/posts/+server.js
import { fetchMarkdownPosts } from '$lib/utils'
import { json } from '@sveltejs/kit'

export const GET = async () => {
  const allPosts = await fetchMarkdownPosts()

  const sortedPosts = allPosts.sort((a, b) => {
    return new Date(b.meta.date) - new Date(a.meta.date)
  })

  return json(sortedPosts)
}
```

Ça l'air beaucoup vu comme ça mais quand on se rend compte que c'est *tout* ce qu'il nous faut pour créer un endpoint à partir duquel on récupère tous nos billets, triés par date, c'est en fait *incroyable* !

Explicitons:

- D'abord on import et on utilise la fonction `fetchMarkdownPosts` créée ci-dessus pour récupérer les données.
- On importe également l'outil pratique json. Il gère la conversion des données au format JSON pour nous et paramètres automatiquement les bonnes options pour les headers.
- Ensuite on trie les billets par date, du plus récent au plus ancien. (On pourrait trier les posts dans la fonction d'aide, mais pour moi la logique devrait rester côté endpoint.)
- Pour finir on `return` le produit final à l'intérieur d'une fonction `json()`

Faisons un test ! Actualisez votre `/api/posts` et vous devriez voir de vraies données.

img result api

Encore mieux: cet endpoint se mettra automatiquement à jour dès qu'on ajoutera un billet Markdown au reste.

> Dans l'idéal il faudrait entourer tout ça de blocs `try`/`catch` pour gérer les imprévus.

## Terminer la page d'index du blog

Avec notre *endpoint* en place c'est très facile de construire la page d'index du blog.

On *pourrait* faire la démarche côté client, avec un `fetch` inséré dans une fonction `onMount`, et ça serait okay, mais on se retrouverait alors avec un chargement qui n'affiche rien le temps que ça s'exécute, ce qui n'est pas terrible pour l'expérience utilisateur·rice. Au lieu de ça, exploitons la génération côté serveur de SvelteKit.

### Récupérer les billets côté serveur

Vous vous rappelez que nous pouvons ajouter un `+page.js` à notre `+page.svelte` afin de précharger une fonction `load` ? Eh bien, c'est tout à fait indiqué pour récupérer des données d'API telles que nos billets de blog !

Quelques éléments supplémentaires à connaître sur `load`: 
- Il a un accès contextuel à certains arguments spécifiques, notamment:
  - `url` et `params` qui contiennent des informations sur la requête
  - `fetch` qui est une aide permettant de normaliser l'implémentation `fetch` (qui n'est pas la même entre le navigateur et Node)
- `load` doit renvoyer un objet. Peu importe ce qu'il y a dedans, mais tout son contenu sera disponible pour nous dans `data`.
- `+page.js` s'exécute à la fois côté serveur et côté client. Ce n'est pas très important quand il s'agit de précharger des fichiers statiques, mais il ne faudrait pas faire référence à des choses propres à l'environnement comme `window` ou `process`. (Si vous voulez que `load` s'exécute uniquement sur le serveur, utilisez plutôt `+page.server.js`. À noter que `fetch` est disponible de manière native)

```js
// src/routes/blog/+page.js
export const load = async ({ fetch }) => {
  const response = await fetch(`/api/posts`)
  const posts = await response.json()

  return {
    posts
  }
}
```

Ce morceau de pré-chargement gère tout ce dont on a besoin ! Nous avons des `posts` qui sont transmis au composant (en tant que `data`), et on peut l'utiliser pour itérer parmi nos billets et les générer dans le fichier `+page.svelte` correspondant

```svelte
<!-- src/routes/blog/+page.svelte -->
<script>
export let data
</script>

<h1>Blog</h1>
  
<ul>
  {#each data.posts as post}
    <li>
      <h2>
        <a href={post.path}>
          {post.meta.title}
        </a>
      </h2>
      Publié le {post.meta.date}
    </li>
  {/each}
</ul>
```

Dans l'exemple ci-dessus le HTML est simplifié (et ne prend pas bien en compte le scénario où il n'y aurait pas de billets à afficher), mais vous voyez le genre. Vous pouvez augmenter le code en fonction du frontmatter de vos propres billets, en ajoutant une image/lien d'accroche, un extrait, etc.

img result index

## Précharger avec l'adaptateur statique

SvelteKit est généré côté serveur par défaut, ce qui est bien car le SSR est en général meilleur pour les performances, l'accessibilité et le SEO. Ça veut aussi dire que le préchargement statique des fichiers (qui est ce que nous voulons) est opt-in.

On pourrait précharger manuellement n'importe quelle page, ce qui est pratique pour des sections telles qu'un "à propos" ou une "FAQ" qui n'ont pas de contenu dynamique. On peut aussi précharger au niveau du layout, pour gérer des dossiers entiers d'un coup. Peu importe l'option, elle est activée en exporant une constante appelée `prerender` avec pour valeur `true` [voir la documentation](https://kit.svelte.dev/docs/page-options#prerender).

Maintenant si on veut que le site entier soit préchargé de manière statique c'est préférable d'utiliser directement [l'adaptateur statique](https://github.com/sveltejs/kit/tree/master/packages/adapter-static) de SvelteKit, comme ça pas besoin de retenir quelle route est statique ou non en fonction du code. Elles le seront toutes.

SvelteKit a de nombreux [adaptateurs], et vient clé en main avec un qui détecte automatiquement et compile en conséquence pour Netlify, Vercel ou Cloudfare, ce qui est pratique et aussi impressionnant ! Mais pour le statique, il nous faudra l'`adapter-static`

```bash
npm i -D @sveltejs/adapter-static
```

Une fois installé il faut faire quelques changements pour précharger toutes nos pages. D'abord, changez `adapter-auto` en `adapter-static` dans le fichier `svelte.config.js` (tout en haut, dans les `import`)

```js
// Replace the original `adapter-auto` line with this in svelte.config.js
import adapter from '@sveltejs/adapter-static'
```

Ensuite nous devons activer l'option en exportant une prop `prerender` avec une valeur `true`.
On *pourrait* faire ça manuellement pour chaque page, mais ce serait pénible. La meilleure façon de faire est de créer un `+layout.js` dans `src.routes` et d'y ajouter le *prop*. (Attention: c'est un fichier `.js`, pas notre fichier existant `+layout.svelte`; le nouveau fichier gère le préchargement, et non pas la génération.)

```js
// src/routes/+layout.js
export const prerender = true
```

Tout comme `+layout.svelte` gère le layout sur chaque page, `+layout.js` gère les scripts côté serveur sur chaque page. En mettant notre prop `prerender` à l'intérieur de ce fichier JS, il va se *diffuser* sur chaque page, ce qui nous évite de devoir le répéter dans chaque page enfant.

Pour en savoir plus sur l'adaptateur statique, vous pouvez lire [la documentation](https://github.com/sveltejs/kit/tree/master/packages/adapter-static).

---

Avec notre adaptateur installé et activé dans notre fichier de configuration, toutes les pages du site seront préchargées en HTML statique au moment de la compilation !

> Un avantage de l'option statique de SvelteKit est que ça transforme toutes les pages en HTML statique, mais ça charge également un peu de JavaScript côté client pour aider à la navigation et au pré-chargement en fond. Ainsi, le site fonctionne très bien sans JavaScript, mais reste ouvert à l'amélioration progressive. Si vous voulez désactiver ce comportement pour empaqueter moins de JS, contre une navigation potentiellement moins fluide, ajoutez `export const csr = false` à votre `+layout.js`.

Un dernier point à ce sujet: vous n'êtes pas *obligé·e·s* d'utiliser l'adaptateur statique. Vous pouvez sauter cette étape et faire avec l'adaptateur par défaut livré avec SvelteKit. Il vous permetta de déployer le site sur Netlify, Vercel ou Cloudfare, et le site serait généré côté serveur avec des fonctions serverless, au lieu d'être construit de manière statique.

Les deux options marchent bien, et cela dépendra surtout de votre usage et de vos préférences. Je reviens dessus simplement pour signaler à quel point c'est chouette que SvelteKit puisse passer d'une chose à l'autre simplement en échangeant d'adaptateur.

*[ Le billet de Josh continue ensuite avec des améliorations optionnelles et des détails qui paufinent la base qu'on vient de faire, mais je pense qu'avec tout ce qu'on a fait c'est déjà un bon morceau. Si vous êtes intéressé·e·s n'hésitez pas à reprendre la lecture en anglais sur [le site de Josh](https://joshcollinsworth.com/blog/build-static-sveltekit-markdown-blog#optional-finishing-touches-and-extra-features), et si besoin je traduirai la deuxième partie optionnelle plus tard. ]*