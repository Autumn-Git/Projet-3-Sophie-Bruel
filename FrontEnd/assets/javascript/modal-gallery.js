import { readStorageWorks, saveWorks } from "./storage.js";
import { displayWorks } from "./gallery.js";
import { changeModalImage, fillCategoryForm, initAddForm } from "./modal-add.js"; 

const galleryModal = document.getElementById("galleryModal");
const addModal = document.getElementById("addModal");
const openModal = document.getElementById("openModal");
const modalWindow = document.querySelector(".modalWindow");
const closeModal = document.querySelectorAll(".closeModal");
const btnGalleryModal = document.getElementById("btnGalleryModal");
const returnGalleryModal = document.getElementById("returnGalleryModal");
const body = document.querySelector("body");



function closeModalOnClickOutside(event) {

  if (event.target === modalWindow) { // si on clique pas sur la modal, on ferme la modal.
    modalWindow.style.display = "none";
  }
}


function openAndCloseModal(event) {

  event.preventDefault();

  //essayer de mettre des classes plutot que le css dans le js
  if (this.id === "openModal") {
    modalWindow.style.display = "flex";
  } 
  
  else if (this.classList.contains("closeModal")) {
    modalWindow.style.display = "none";
  } 
  
  else if (this.id === "btnGalleryModal") {
    galleryModal.style.display = "none";
    addModal.style.display = "block";
  } 
  
  else if (this.id === "returnGalleryModal") {
    galleryModal.style.display = "flex";
    addModal.style.display = "none";
  }
}


export function displayWorksModal(works) {

  const displayGalleryModal = document.getElementById("displayGalleryModal");

  displayGalleryModal.replaceChildren();

  for (let i = 0; i < works.length; i++) {

    const workElementModal = document.createElement("figure");
    workElementModal.classList.add("workElementModal");

    const imageElementModal = document.createElement("img");
    imageElementModal.src = works[i].imageUrl;
    imageElementModal.alt = works[i].title;

    const trashElementModal = document.createElement("button");
    trashElementModal.classList.add("fa-solid", "fa-trash-can", "trashModal");
    trashElementModal.ariaLabel = `Supprimer le projet : ${works[i].title}`;

    workElementModal.appendChild(imageElementModal);
    workElementModal.appendChild(trashElementModal);

    displayGalleryModal.appendChild(workElementModal);

    trashElementModal.addEventListener("click", function () { // quand on click sur la corbeille, le travaux qui porte l'id est sup (on appelle la fonction de suppression)
      deleteWorks(works[i].id);
    });

  }
}


function deleteWorks(getId) {

  const errorMessage = document.getElementById("deleteError");
  const token = localStorage.getItem("token");

  fetch(`http://localhost:5678/api/works/${getId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`, // le token doit etre valide
    },
  })

    .then(function (response) {
      if (!response.ok) {
        throw new Error("La suppression a échoué.");
      }

      errorMessage.innerText = "";
      errorMessage.classList.remove("error-message");
      const allWorks = readStorageWorks();

      const remainingWorks = allWorks.filter(function (work) { // travaux restants
        return work.id !== getId; // on retourne la liste sans l'id qu'on veut sup
      });

      saveWorks(remainingWorks); // on mets la nouvelle liste dans saveWorks...
      displayWorksModal(remainingWorks); // ...et on l'affiche
      displayWorks(remainingWorks);  //...et on l'affiche
    })

    .catch(function (error) {
      errorMessage.innerText =
        "La demande a échoué. Veuillez réessayer en vérifiant votre connexion.";
      errorMessage.classList.add("error-message");

      console.error(error);
    });
}


export function initModal(categories) {

  fillCategoryForm(categories)
  changeModalImage()
  initAddForm()
  
  openModal.addEventListener("click", openAndCloseModal); // quand on clique sur modfier on appelle cette fonction
  closeModal.forEach((button) => { // chacun des deux croix
    button.addEventListener("click", openAndCloseModal);
  });
  
  btnGalleryModal.addEventListener("click", openAndCloseModal); 
  returnGalleryModal.addEventListener("click", openAndCloseModal);

  body.addEventListener("click", closeModalOnClickOutside);
}
