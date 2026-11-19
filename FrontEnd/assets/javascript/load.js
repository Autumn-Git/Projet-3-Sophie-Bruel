import { getCategories, getWorks } from "./api.js";
import { readStorageWorks, saveWorks } from "./storage.js";
import { displayFilter, displayWorks } from "./gallery.js";
import { handleEditionModeDisplay } from "./edition.js";
import { displayWorksModal, initModal } from "./modal-gallery.js";
import { fillCategoryForm } from "./modal-add.js";


const errorGallery = document.getElementById("errorGallery");


export function initWorks(isAuthenticated) {
  getWorks()
    .then((works) => {
      saveWorks(works); // ranger les projets dans le casier
      displayWorks(works); // afficher la galerie
      errorGallery.innerText = "";

      if (isAuthenticated) {
        displayWorksModal(works);
      }
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des travaux :", error);

      const savedWorks = readStorageWorks();
      errorGallery.classList.add("error-message");

      if (savedWorks.length === 0) {
        // si y'a pas de travaux
        errorGallery.innerText =
          "Impossible de charger les projets. Veuillez réessayer plus tard.";
      } else {
        displayWorks(savedWorks);
        errorGallery.innerText =
          "Les projets affichés ne sont peut-être pas à jour.";
      }

      if (isAuthenticated) {
        displayWorksModal(savedWorks);
      }
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
