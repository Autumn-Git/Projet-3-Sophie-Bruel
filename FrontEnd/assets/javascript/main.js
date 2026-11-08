import { readStorageWorks, saveWorks } from "./storage.js";
import { getWorks, getCategories } from "./api.js"
import { displayWorks, displayFilter } from "./gallery.js";
import { fillCategoryForm, changeModalImage, initAddForm } from "./modal-add.js";
import { initModal } from "./modal-gallery.js";
import { changeEditionMode } from "./edition.js";



getWorks()
 .then((data) => {
    saveWorks(data);
    displayWorks(data);
 })
 .catch((error) => {
    console.error("Erreur lors de la récupération des travaux :", error);
    const savedWorks = readStorageWorks();
    displayWorks(savedWorks);
  })



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