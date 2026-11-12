import { getCategories, getWorks } from "./api.js";
import { readStorageWorks, saveWorks } from "./storage.js";
import { displayFilter, displayWorks } from "./gallery.js";
import { loadAdmin } from "./load-admin.js";

export function load() {

  const token = localStorage.getItem("token"); // lire le token
  const errorGallery = document.getElementById("errorGallery");

  Promise.all([getWorks(), getCategories()]) // les deux fonctions d'api.js, APPELÉES

    .then(([works, categories]) => {
      // pour TOUT LE MONDE :
      saveWorks(works); // ranger les projets dans le casier
      displayWorks(works); // afficher la galerie
      displayFilter(categories); // afficher les filtres
      errorGallery.innerText = "";

      // seulement pour Sophie :
      if (token) {
        loadAdmin(works, categories); // loadAdmin, avec les DEUX données
      }
    })

    .catch((error) => {

      // le serveur ne réponds pas.
      console.error("Erreur lors de la récupération des travaux :", error);
      const savedWorks = readStorageWorks();
      errorGallery.classList.add("error-message");
      if (savedWorks.length === 0) {
        // si y'a pas de travaux
        errorGallery.innerText =
          "Impossible de charger les projets. Veuillez réessayer plus tard.";
      } 
      
      else {
        displayWorks(savedWorks);
        errorGallery.innerText =
          "Les projets affichés ne sont peut-être pas à jour.";
      }

       if (token) {
        loadAdmin(savedWorks, [])
        }
        
    });
}
