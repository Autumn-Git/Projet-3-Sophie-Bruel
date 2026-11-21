import { getCategories, getWorks } from "./api.js";
import { displayFilter, displayWorks } from "./gallery.js";
import { handleEditionModeDisplay } from "./edition.js";
import { displayWorksModal, initModal } from "./modal-gallery.js";
import { fillCategoryForm } from "./modal-add.js";

const errorGallery = document.getElementById("errorGallery");


export function initWorks(isAuthenticated) {
  getWorks()
    .then((works) => {
      displayWorks(works); 

      if (isAuthenticated) {
        displayWorksModal(works);
      }
    })

    .catch((error) => {
      console.error("Erreur lors de la récupération des travaux :", error);
      errorGallery.classList.add("error-message");
      errorGallery.innerText =
        "Impossible de charger les projets. Veuillez réessayer plus tard.";
    });
}


export function initCategories(isAuthenticated) {
  getCategories()
    .then((categories) => {
      displayFilter(categories);

      if (isAuthenticated) {
        fillCategoryForm(categories);
      }
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des categories :", error);
    });
}


export function initEditionMode(isAuthenticated) {
  if (isAuthenticated) {
    handleEditionModeDisplay();
    initModal();
  }
}
