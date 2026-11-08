import { readStorageWorks, saveWorks } from "./storage.js";
import { displayWorks } from "./gallery.js";


const galleryModal = document.getElementById("galleryModal");
const addModal = document.getElementById("addModal");
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



function openAndCloseModal(event) {
  event.preventDefault();

  if (this.id === "openModal") {
    modalWindow.style.display = "flex";
    displayWorksModal(readStorageWorks());
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

    trashElementModal.addEventListener("click", function () {
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
            Authorization: `Bearer ${token}`,
        },
    }).then(function (response) {
            if (!response.ok) {
                throw new Error("La suppression a échoué.");
            }

            errorMessage.innerText = "";
            errorMessage.classList.remove("error-message");
            const allWorks = readStorageWorks();

            const remainingWorks = allWorks.filter(function (work) {
                return work.id !== getId;
            });

            saveWorks(remainingWorks);
            displayWorksModal(remainingWorks);
            displayWorks(remainingWorks);
        })
        .catch(function (error) {
            errorMessage.innerText = "La demande a échoué. Veuillez réessayer en vérifiant votre connexion.";
            errorMessage.classList.add("error-message");

            console.error(error);
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
