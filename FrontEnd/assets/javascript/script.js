
getWorks()
 .then((data) => {
    saveWorks(data);
    displayWorks(data);
 })
 .catch((error) => {
    console.error("Erreur lors de la récupération des travaux :", error);
    const savedWorks = readStorageWorks(); // mode secours, on appelle la derniere version des travaux stockée dans le localStorage
    displayWorks(savedWorks);
  })


function getWorks() {
  return fetch("http://localhost:5678/api/works")
  .then(response => {
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des travaux");
    }
    return response.json();
  })
}


// cette fonction en une phrase : « Je reçois un tableau, je le traduis en texte, et je le range dans le casier. »
function saveWorks(works) { // la fonction saveWorks permet faire un tableau des travaux et de sauvegarder les travaux dans le localStorage
  const worksString = JSON.stringify(works);  // on transforme le tableau en chaîne de caractères pour pouvoir le stocker dans le localStorage
  localStorage.setItem("works", worksString); // on stocke la chaîne de caractères dans le localStorage avec la clé "works"
}



// « J’ouvre le casier ; s’il y a du texte, je le retraduis en tableau et je le renvoie ; sinon, je renvoie un tableau vide. »
function readStorageWorks() {
  const worksString = localStorage.getItem("works"); // elle va chercher works
  if (worksString) { // le truthy : un texte non vide est considéré comme vrai
    return JSON.parse(worksString);  // on transforme la chaîne de caractères en tableau pour pouvoir l'utiliser dans le code (l'inverse de JSON.stringify)
  } else {
    return [];
  }
}


fetch("http://localhost:5678/api/categories")
  .then((response) => response.json())
  .then(categories => {
    displayFilter(categories)
    fillCategoryForm(categories);
  })




function displayWorks(works) {
  const gallery = document.querySelector(".gallery");
  gallery.replaceChildren();

  for (let i = 0; i < works.length; i++){
    const workElement = document.createElement("figure");

    const imageElement = document.createElement("img");
    imageElement.src = works[i].imageUrl;
    const titleElement = document.createElement("figcaption");
    titleElement.innerText = works[i].title

    workElement.appendChild(imageElement);
    workElement.appendChild(titleElement);

    gallery.appendChild(workElement);
  }
}


function displayFilter(categories) {
  const filter = document.querySelector(".filter");

  const buttonAll = document.createElement("button");
  buttonAll.innerText = "Tous";
  buttonAll.classList.add("btn-filter");
  filter.appendChild(buttonAll);

  for (let i = 0; i < categories.length; i++) {
    const button = document.createElement("button");
    button.innerText = categories[i].name;
    button.classList.add("btn-filter");
    filter.appendChild(button);

    button.addEventListener("click", () => {
      filterWorks(categories[i].id);
    })
}
buttonAll.addEventListener("click", () => {
  const gallery = document.querySelector(".gallery");
  gallery.replaceChildren();
  displayWorks(readStorageWorks()); // on récupère la dernière version des travaux stockée dans le localStorage
})
}









function filterWorks(categoryId) {
  const works = readStorageWorks(); // on récupère la dernière version des travaux stockée dans le localStorage
  const listeFilter = [];

  for (let i = 0; i < works.length; i++) {
    if (categoryId === works[i].categoryId) {
      listeFilter.push(works[i]);
    }
  }
  const gallery = document.querySelector(".gallery");
  gallery.replaceChildren();
  displayWorks(listeFilter);

}






// Fonction comprises

function changeEditionMode() {
  const token = localStorage.getItem("token");

  if (token) {
    const edition_mode = document.querySelector(".edition_mode");
    const title_section_content = document.querySelector(
      ".title_section_content",
    );
    const filter = document.querySelector(".filter");
    const connexion = document.getElementById("connexion");
    const header = document.querySelector(".header");

    edition_mode.style.display = "flex";
    title_section_content.style.display = "flex";
    filter.classList.add("cache");
    title_section_content.classList.add("cache");
    connexion.innerText = "logout";
    header.style.margin = "100px 0 50px";

    connexion.addEventListener("click", function (event) {
      event.preventDefault();
      localStorage.removeItem("token");
      window.location.href = "index.html";
    });
  }
}

changeEditionMode();

