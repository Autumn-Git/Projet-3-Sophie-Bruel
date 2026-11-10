export function displayWorks(works) { // Je transmets data à la fonction, qui la reçoit dans son paramètre works
  const gallery = document.querySelector(".gallery");
  gallery.replaceChildren(); // elle la vide pour pas afficher les projet en double, ça remplace innerHTML

  for (let i = 0; i < works.length; i++) {
    const workElement = document.createElement("figure");
    workElement.dataset.categoryId = works[i].categoryId;

    const imageElement = document.createElement("img");
    imageElement.src = works[i].imageUrl;
    imageElement.alt = works[i].title;
    const titleElement = document.createElement("figcaption");
    titleElement.innerText = works[i].title;

    workElement.appendChild(imageElement);
    workElement.appendChild(titleElement);

    gallery.appendChild(workElement);
  }
}

export function displayFilter(categories) {
  const filter = document.querySelector(".filter");

  const buttonAll = document.createElement("button"); // le bouton est créé en dehors de la boucle car il existe pas de categorie "tous"
  buttonAll.innerText = "Tous";
  buttonAll.classList.add("btn-filter");
  filter.appendChild(buttonAll);

  for (let i = 0; i < categories.length; i++) { // Un bouton par catégorie, avec son nom venu de l’API.
    const button = document.createElement("button");
    button.innerText = categories[i].name;
    button.classList.add("btn-filter");
    filter.appendChild(button);

    button.addEventListener("click", () => {
      filterWorks(categories[i].id); //chaque bouton recoit un ecouteur, au click, il appelle filterWorks avec l'id de la categorie du bouton.
    });
  }
  buttonAll.addEventListener("click", () => { // il retire la classe hidden à toutes les figures
    const figures = document.querySelectorAll("figure");
    for (let i = 0; i < figures.length; i++) {
      figures[i].classList.remove("hidden");
    }
  });
}

function filterWorks(categoryId) { // il recoit la catégories demandé
  const figures = document.querySelectorAll(".gallery figure");

  for (let i = 0; i < figures.length; i++) { // on parcourt toutes les figures
    const figureCategory = Number(figures[i].dataset.categoryId);   // la categorie de la figure = le nb de la figures (categorie)
    // dataset permet de stocker des informations personnalisées directement dans un élément HTML grâce aux attributs data-*. en gros pour la figure actuel, mets sur le HTML l'id de la categorie
    if (figureCategory === categoryId) { // si l'id de categorie de la figure est le meme que l'id de la categorie
      figures[i].classList.remove("hidden"); // on affiche
    } else {
      figures[i].classList.add("hidden");
    }
  }
}
