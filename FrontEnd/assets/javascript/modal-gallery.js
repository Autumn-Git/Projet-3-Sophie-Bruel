import { API_URL } from "./api.js";
import { createWorkFigure } from "./gallery.js";
import { changeModalImage } from "./modal-add.js";
import { initAddForm } from "./modal-add.js";

const galleryModal = document.getElementById("galleryModal");
const addModal = document.getElementById("addModal");
const openModal = document.getElementById("openModal");
const modalWindow = document.querySelector(".modalWindow");
const closeModal = document.querySelectorAll(".closeModal");
const btnGalleryModal = document.getElementById("btnGalleryModal");
const returnGalleryModal = document.getElementById("returnGalleryModal");


function closeModalOnClickOutside(event) {
  if (event.target === modalWindow) {
    modalWindow.style.display = "none";
  }
}

function openAndCloseModal(event) {
  event.preventDefault();

  if (this.id === "openModal") {
    galleryModal.style.display = "flex";
    addModal.style.display = "none";
    modalWindow.style.display = "flex";
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

function createWorkModalFigure(work) {
  const workFigureModal = document.createElement("figure");
  workFigureModal.classList.add("workElementModal");
  workFigureModal.dataset.workId = work.id;

  const imageElementModal = document.createElement("img");
  imageElementModal.src = work.imageUrl;
  imageElementModal.alt = work.title;

  const trashElementModal = document.createElement("button");
  trashElementModal.classList.add("fa-solid", "fa-trash-can", "trashModal");
  trashElementModal.ariaLabel = `Supprimer le projet : ${work.title}`;

  workFigureModal.appendChild(imageElementModal);
  workFigureModal.appendChild(trashElementModal);

  trashElementModal.addEventListener("click", function () {
    deleteWorks(work.id);
  });

  return workFigureModal;
}

export function displayWorksModal(works) {
  const displayGalleryModal = document.getElementById("displayGalleryModal");

  for (let i = 0; i < works.length; i++) {
    displayGalleryModal.appendChild(createWorkModalFigure(works[i]));
  }
}

function deleteWorks(workId) {
  const errorMessage = document.getElementById("deleteError");
  const token = localStorage.getItem("token");

  fetch(`${API_URL}/works/${workId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  })
    .then(function (response) {
      if (!response.ok) {
        throw new Error("La suppression a échoué.");
      }

      errorMessage.innerText = "";
      errorMessage.classList.remove("error-message");
      const workFigures = document.querySelectorAll(
        `[data-work-id="${workId}"]`,
      );
      workFigures.forEach((workFigure) => {
        workFigure.remove();
      });
    })

    .catch(function (error) {
      errorMessage.innerText =
        "La demande a échoué. Veuillez réessayer en vérifiant votre connexion.";
      errorMessage.classList.add("error-message");
      console.error(error);
    });
}

export function initModal() {
  changeModalImage();
  initAddForm(addWorkGalleryAndModal);

  openModal.addEventListener("click", openAndCloseModal); 
  closeModal.forEach((button) => {
    button.addEventListener("click", openAndCloseModal);
  });

  btnGalleryModal.addEventListener("click", openAndCloseModal);
  returnGalleryModal.addEventListener("click", openAndCloseModal);

  modalWindow.addEventListener("click", closeModalOnClickOutside); 
}

export function addWorkGalleryAndModal(work) {
  const gallery = document.querySelector(".gallery");
  const displayGalleryModal = document.getElementById("displayGalleryModal");
  gallery.appendChild(createWorkFigure(work));
  displayGalleryModal.appendChild(createWorkModalFigure(work));
}