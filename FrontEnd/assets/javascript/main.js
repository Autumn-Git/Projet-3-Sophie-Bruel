import { readStorageWorks, saveWorks } from "./storage.js";
import { getWorks, getCategories } from "./api.js"
import { displayWorks, displayFilter } from "./gallery.js";
import { fillCategoryForm, changeModalImage, initAddForm } from "./modal-add.js";
import { initModal } from "./modal-gallery.js";
import { changeEditionMode } from "./edition.js";



getWorks()
 .then((data) => {
    saveWorks(data);
    const errorGallery = document.getElementById("errorGallery");
    if (data.length === 0) {
      errorGallery.innerText = "Impossible de charger les projets. Veuillez réessayer plus tard.";
    } else {
        displayWorks(data);
      errorGallery.innerText = "";
    }
 })
 .catch((error) => {
    console.error("Erreur lors de la récupération des travaux :", error);
    const savedWorks = readStorageWorks();
    displayWorks(savedWorks);
  })


  getWorks()

    .then((data) => {
        saveWorks(data);
        displayWorks(data);
        const errorGallery = document.getElementById("errorGallery");
        errorGallery.classList.add("error-message");
        errorGallery.innerText = "";
    })
    .catch((error) => {
        console.error("Erreur lors de la récupération des travaux :", error);
        const savedWorks = readStorageWorks();
        const errorGallery = document.getElementById("errorGallery");
        errorGallery.classList.add("error-message");
        if (savedWorks.length === 0) {
            errorGallery.innerText = "Impossible de charger les projets. Veuillez réessayer plus tard.";
        } else {
            displayWorks(savedWorks);
            errorGallery.innerText = "Les projets affichés ne sont peut-être pas à jour";
        }
    });

getCategories()
  .then(categories => {
    displayFilter(categories)
    fillCategoryForm(categories);
  })
    .catch(error => {
    console.error("Erreur lors de la récupération des catégories :", error);
    })



changeEditionMode();
changeModalImage();
initAddForm();
initModal()