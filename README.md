# Portfolio de Sophie Bluel, architecte d'intérieur

Projet 3 de la formation **Développeur Web** d'OpenClassrooms.

Ce projet rend **dynamique** le site portfolio de Sophie Bluel : les projets et les catégories sont récupérés depuis une API, et l'architecte peut se connecter pour **ajouter** ou **supprimer** ses projets directement depuis le site.

Le front-end a été développé en JavaScript, à partir du HTML et du CSS fournis. Le back-end (API Node.js) a été fourni par OpenClassrooms.

## Fonctionnalités

### Pour tous les visiteurs

- **Galerie dynamique** : les projets sont chargés depuis l'API.
- **Filtres par catégorie** : les catégories sont récupérées depuis l'API, et un clic sur un filtre masque les projets qui ne correspondent pas.

### Pour l'architecte (après connexion)

- **Page de connexion** avec un message d'erreur en cas d'identifiants incorrects.
- **Mode édition** : un bandeau « Mode édition », un bouton « modifier », le lien « logout », et les filtres masqués.
- **Fenêtre modale** en deux vues :
  - la **galerie**, pour supprimer un projet ;
  - le **formulaire d'ajout**, avec un aperçu de l'image, la liste des catégories et une vérification des champs.
- Les ajouts et les suppressions mettent à jour les galeries **sans recharger la page**.

### Gestion des erreurs

- Un message s'affiche dans la page si le serveur ne répond pas, si la session a expiré ou si un champ du formulaire est vide.
- Si le serveur est injoignable, le site affiche la dernière liste de projets enregistrée, avec un avertissement.

## Technologies

- HTML5, CSS3
- JavaScript (modules ES, `fetch`, `FormData`, `sessionStorage`, `localStorage`)
- API Node.js / Express (fournie)
- Outils : Visual Studio Code, Live Server, Prettier, Figma, GitHub

## Lancer le projet

### 1. Le back-end

```bash
cd Backend
npm install
npm start
```

Laissez ce terminal ouvert pendant toute la durée du travail. L'API est alors disponible à l'adresse `http://localhost:5678`.

Le compte de test de l'architecte et le lien vers la documentation Swagger sont décrits dans [`Backend/README.md`](Backend/README.md).

### 2. Le front-end

Ouvrez le fichier `FrontEnd/index.html` avec l'extension **Live Server** de Visual Studio Code.

> Le site utilise des modules JavaScript : il doit être ouvert via un serveur local (comme Live Server), et non en double-cliquant sur le fichier HTML.

## Organisation du code

Le JavaScript est découpé en modules : chaque fichier a un rôle précis.

| Fichier | Rôle |
| --- | --- |
| `main.js` | Point d'entrée de la page d'accueil : charge les données et lance les autres modules |
| `api.js` | Récupère les projets et les catégories depuis l'API |
| `storage.js` | Enregistre et relit la liste des projets dans le `sessionStorage` |
| `gallery.js` | Affiche la galerie et gère les filtres |
| `edition.js` | Active le mode édition et la déconnexion |
| `modal-gallery.js` | Ouvre et ferme la modale, affiche les miniatures et gère la suppression |
| `modal-add.js` | Gère le formulaire d'ajout : aperçu de l'image, catégories, vérifications et envoi |
| `connexion.js` | Gère le formulaire de la page de connexion |

## Auteure

Projet réalisé par **Mayline Duchant** dans le cadre de la formation OpenClassrooms.