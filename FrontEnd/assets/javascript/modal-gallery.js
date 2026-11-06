import { readStorageWorks, saveWorks } from "./storage.js";
import { displayWorks } from "./gallery.js";


const galleryModal = document.getElementById("galleryModal");
const addModal = document.getElementById("addModal");


/*tu maitrises cette partie*/
const openModal = document.getElementById("openModal");
const modalWindow = document.querySelector(".modalWindow");
const closeModal = document.querySelectorAll(".closeModal");
const btnGalleryModal = document.getElementById("btnGalleryModal");
const returnGalleryModal = document.getElementById("returnGalleryModal");
const body = document.querySelector("body");




function closeModalOnClickOutside(event) {
  if (event.target === modalWindow) {
    modalWindow.style.display = "none";
  }
}





/*tu maitrises cette fonction*/
function openAndCloseModal(event) {
  event.preventDefault();

  if (this.id === "openModal") {
    modalWindow.style.display = "flex";
    displayWorksModale(readStorageWorks());
  } else if (this.classList.contains("closeModal")) {
    modalWindow.style.display = "none";
  } else if (this.id === "btnGalleryModal") {
    galleryModal.style.display = "none";
    addModal.style.display = "block";
  } else if (this.id === "returnGalleryModal") {
    galleryModal.style.display = "flex";
    addModal.style.display = "none";
  }
}

/*tu maitrises cette fonction*/
export function displayWorksModale(works) {
  const displayGalleryModal = document.getElementById("displayGalleryModal");

  displayGalleryModal.replaceChildren();

  for (let i = 0; i < works.length; i++) {
    const workElementModal = document.createElement("figure");
    workElementModal.classList.add("workElementModal");

    const imageElementModal = document.createElement("img");
    imageElementModal.src = works[i].imageUrl;
    const trashElementModal = document.createElement("button");
    trashElementModal.classList.add("fa-solid", "fa-trash-can", "trashModal");

    workElementModal.appendChild(imageElementModal);
    workElementModal.appendChild(trashElementModal);

    displayGalleryModal.appendChild(workElementModal);

    trashElementModal.addEventListener("click", function () {
      deleteWorks(works[i].id);
    });
  }
}

function deleteWorks(getId) {
  const token = localStorage.getItem("token");

  fetch(`http://localhost:5678/api/works/${getId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(function (response) {
    if (response.ok) {
      const allWorks = readStorageWorks();
      const remainingWorks = allWorks.filter(function (work) {
        return work.id !== getId;
      });
      saveWorks(remainingWorks); // on met à jour le localStorage avec la nouvelle liste
      displayWorksModale(remainingWorks);
      displayWorks(remainingWorks); // on met à jour la galerie principale avec la nouvelle liste
    } else {
      const error = document.querySelector(".error-message");
      error.innerText =
        "La demande à échoué. Veuillez réessayer en vérifiant votre connexion";
      console.log(error);
    }
  });
}




export function initModal() {
  openModal.addEventListener("click", openAndCloseModal);
  closeModal.forEach((button) => {
    button.addEventListener("click", openAndCloseModal);
  });
  btnGalleryModal.addEventListener("click", openAndCloseModal);
  returnGalleryModal.addEventListener("click", openAndCloseModal);

  body.addEventListener("click", closeModalOnClickOutside);
}
