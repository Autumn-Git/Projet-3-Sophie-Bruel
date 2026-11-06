import { readStorageWorks, saveWorks } from "./storage.js";
import { displayWorks } from "./gallery.js";
import { displayWorksModale } from "./modal-gallery.js";

const modalWindow = document.querySelector(".modalWindow");

export function changeModalImage() {
  const addImage = document.getElementById("addImage");
  const fileInput = document.getElementById("fileInput");
  const iconeAddImage = document.querySelector(".iconeAddImage");
  const textAddImage = document.querySelector(".textAddImage");
  const addImageModal = document.querySelector(".addImageModal");
  const previewImage = document.getElementById("previewImage");

  addImage.addEventListener("click", () => {
    fileInput.click();
  });
  fileInput.addEventListener("change", () => {
    const image = fileInput.files[0];

    if (image) {
      previewImage.src = URL.createObjectURL(image);
      iconeAddImage.style.display = "none";
      addImageModal.style.padding = 0;
      textAddImage.classList.add("cache");
      addImage.classList.add("cache");
      previewImage.classList.remove("cache");
    }
  });
}



export function fillCategoryForm(categories) {
    const categorySelect = document.getElementById("categorySelect");

    const optionDefault = document.createElement("option");
    optionDefault.innerText = "";
    optionDefault.value = "";
    categorySelect.appendChild(optionDefault);
    
    for (let i = 0; i < categories.length; i++) {
        const option = document.createElement("option");
        option.innerText = categories[i].name;
        option.value = categories[i].id;
        categorySelect.appendChild(option);
    }
}




// Vérifie le formulaire d'ajout, puis envoie le nouveau projet à l'API
export function validerFormulaire() {
  const formulaireAjoutPhoto = document.getElementById("formulaireAjoutPhoto");
  const errorSelect = document.getElementById("errorSelect");

  formulaireAjoutPhoto.addEventListener("submit", (event) => {
    event.preventDefault();

    // On lit les valeurs AU MOMENT de la soumission
    const fileInput = document.getElementById("fileInput");
    const image = fileInput.files[0];
    const titreForm = document.getElementById("titreForm").value.trim();
    const categorie = document.getElementById("categorySelect").value;

    // 1. Vérifications : on s'arrête au premier champ manquant
    if (!image) {
      errorSelect.innerText = "Veuillez sélectionner une image";
      errorSelect.classList.add("error-message");
      return;
    }
    if (!titreForm) {
      errorSelect.innerText = "Veuillez saisir un titre";
      errorSelect.classList.add("error-message");
      return;
    }
    if (!categorie) {
      errorSelect.innerText = "Veuillez sélectionner une catégorie";
      errorSelect.classList.add("error-message");
      return;
    }

    // Tout est rempli : on efface l'ancien message
    errorSelect.innerText = "";

    // 2. Le colis à envoyer (noms attendus par l'API, voir le Swagger)
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", titreForm);
    formData.append("category", categorie);

    const token = localStorage.getItem("token");

    // 3. L'envoi
    fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => {
        // Le serveur a répondu, mais est-ce un succès (201) ?
        if (!response.ok) {
          throw new Error(`Erreur ${response.status}`);
        }
        return response.json();
      })
      .then((newWork) => {
        // Le serveur renvoie la catégorie en texte ("2") : on la remet en nombre
        // pour que les filtres fonctionnent sans recharger la page
        newWork.categoryId = parseInt(newWork.categoryId);

        // 4. Mise à jour de la liste et des deux galeries
        const works = readStorageWorks();
        works.push(newWork);
        saveWorks(works);
        displayWorksModale(works); // on récupère la dernière version des travaux stockée dans le localStorage
        displayWorks(works); // on récupère la dernière version des travaux stockée dans le localStorage

        // 5. On vide le formulaire et l'aperçu
        resetAddForm();
        modalWindow.style.display = "none";
      })
      .catch((error) => {
        // Refus du serveur (400, 401, 500...) ou serveur injoignable
        console.error(error);
        errorSelect.innerText =
          "L'ajout a échoué. Vérifiez que vous êtes bien connectée, puis réessayez.";
        errorSelect.classList.add("error-message");
      });
  });
}




// Remet le formulaire d'ajout et la zone d'aperçu dans leur état de départ
function resetAddForm() {
  const formulaireAjoutPhoto = document.getElementById("formulaireAjoutPhoto");
  const fileInput = document.getElementById("fileInput");
  const previewImage = document.getElementById("previewImage");
  const iconeAddImage = document.querySelector(".iconeAddImage");
  const textAddImage = document.querySelector(".textAddImage");
  const addImage = document.getElementById("addImage");
  const addImageModal = document.querySelector(".addImageModal");

  // Les champs du <form> (titre, catégorie)
  formulaireAjoutPhoto.reset();
  // L'input fichier est en dehors du <form> : on le vide à part
  fileInput.value = "";

  // L'inverse de changeModalImage
  previewImage.removeAttribute("src");
  previewImage.classList.add("cache");
  iconeAddImage.style.display = "";
  addImageModal.style.padding = "";
  textAddImage.classList.remove("cache");
  addImage.classList.remove("cache");
}