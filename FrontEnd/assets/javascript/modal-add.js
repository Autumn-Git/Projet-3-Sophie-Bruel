import { API_URL } from "./api.js";

const modalWindow = document.querySelector(".modalWindow");


export function changeModalImage() {
  const addImage = document.getElementById("addImage");
  const fileInput = document.getElementById("fileInput");
  const iconAddImage = document.querySelector(".iconAddImage");
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
      iconAddImage.style.display = "none";
      addImageModal.style.padding = 0;
      textAddImage.classList.add("hidden");
      addImage.classList.add("hidden");
      previewImage.classList.remove("hidden");
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


export function initAddForm(handleAddSuccess) {
  const formAddPhoto = document.getElementById("formAddPhoto");
  const errorSelect = document.getElementById("errorSelect");

  formAddPhoto.addEventListener("submit", (event) => {
    event.preventDefault();

    const fileInput = document.getElementById("fileInput");
    const image = fileInput.files[0];
    const title = document.getElementById("title").value.trim();
    const category = document.getElementById("categorySelect").value;

    if (!image) {
      errorSelect.innerText = "Veuillez sélectionner une image";
      errorSelect.classList.add("error-message");
      return;
    }

    if (!title) {
      errorSelect.innerText = "Veuillez saisir un titre";
      errorSelect.classList.add("error-message");
      return;
    }

    if (!category) {
      errorSelect.innerText = "Veuillez sélectionner une catégorie";
      errorSelect.classList.add("error-message");
      return;
    }

    errorSelect.innerText = "";

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("category", category);

    const token = localStorage.getItem("token");

    fetch(`${API_URL}/works`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })

      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erreur ${response.status}`);
        }
        return response.json();
      })

      .then((newWork) => {
        newWork.categoryId = parseInt(newWork.categoryId);
        handleAddSuccess(newWork);
        resetAddForm();
        modalWindow.style.display = "none";
      })

      .catch((error) => {
        console.error(error);
        errorSelect.innerText =
          "L'ajout a échoué. Vérifiez que vous êtes bien connectée, puis réessayez.";
        errorSelect.classList.add("error-message");
      });
  });
}


function resetAddForm() {
  const formAddPhoto = document.getElementById("formAddPhoto");
  const fileInput = document.getElementById("fileInput");
  const previewImage = document.getElementById("previewImage");
  const iconAddImage = document.querySelector(".iconAddImage");
  const textAddImage = document.querySelector(".textAddImage");
  const addImage = document.getElementById("addImage");
  const addImageModal = document.querySelector(".addImageModal");

  formAddPhoto.reset();
  fileInput.value = "";

  previewImage.removeAttribute("src");
  previewImage.classList.add("hidden");
  iconAddImage.style.display = "";
  addImageModal.style.padding = "";
  textAddImage.classList.remove("hidden");
  addImage.classList.remove("hidden");
}
