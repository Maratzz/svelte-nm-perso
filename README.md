# Refonte d'un site personnel

Après plusieurs années passées avec un vieux site qui tournait sur un CMS vieillissant sous PHP, j'ai reconstruit de zéro mon site personnel. J'ai profité de l'exercice pour me familiariser avec des technologies plus récentes. Bienvenue en 202X!

## Construit avec

- [Svelte(Kit)](https://kit.svelte.dev/) pour le routing serveur et le framework JS
- [Supabase](https://supabase.com) pour la base PostgreSQL qui contient les éléments des collections, listes, cartes, etc.
- [IGDB API](https://www.igdb.com/api) pour les infos sur les jeux
- [TMDB API](https://www.themoviedb.org/) pour les infos sur les films et séries
- Markdown combiné avec [mdsvex](https://mdsvex.pngwn.io/) pour les textes et les billets de blog
- [Sveaflet](https://sveaflet.vercel.app/) pour la carte
- [PaperCSS](https://www.getpapercss.com/) pour le CSS.


## C'est cool, je veux le même en local

1. Clone ce repositoire avec [la méthode de ton choix](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)
2. Vérifie que tu as *NodeJS* installés avec un gestionnaire de paquets (npm, pnpm, yarn...)
3. Installe les dépendances (pour npm: `npm install`)
4. Crée les comptes nécessaires sur les différents services (Supabase, IGDB, TMDB) pour ensuite générer et récupérer les différentes clés et tokens nécessaires pour les API à mettre dans un fichier `.env`, en suivant les exemples du `.env.example`
5. Lance le serveur de développement (pour npm: `npm  run  dev `)
6. Ouvre un navigateur et tape `localhost:5173`, le site devrait apparaître.

## C'est cool, je veux le même mais pour le mettre sur Internet

SvelteKit c'est bien parce que [c'est documenté](https://kit.svelte.dev/docs/building-your-app).

## Licences

Le code est disponible sans conditions.

Si tu diffuses sur Internet les textes, billets de blog, et autres *shitposts* qui ne sont pas des bouts de code, sois sympa et: 
- essaie de me mentionner et d'inclure un lien vers mon site perso ou pro
- ne gagne pas des sous avec (comme dit l'autre, si je l'apprends ça va barder)