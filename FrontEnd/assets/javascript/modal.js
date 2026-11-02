/*tu maitrises cette partie*/
const openModal = document.getElementById("openModal");
const modalWindow = document.querySelector(".modalWindow");
const closeModal = document.querySelectorAll(".closeModal");
const btnGalleryModal = document.getElementById("btnGalleryModal");
const returnGalleryModal = document.getElementById("returnGalleryModal");
const body = document.querySelector("body");

openModal.addEventListener("click", openAndCloseModal);
closeModal.forEach((button) => {
  button.addEventListener("click", openAndCloseModal);
});
btnGalleryModal.addEventListener("click", openAndCloseModal);
returnGalleryModal.addEventListener("click", openAndCloseModal);

function closeModalOnClickOutside(event) {
  if (event.target === modalWindow) {
    modalWindow.style.display = "none";
  }
}
body.addEventListener("click", closeModalOnClickOutside);

/*tu maitrises cette fonction*/
function openAndCloseModal(event) {
  event.preventDefault();

  if (this.id === "openModal") {
    modalWindow.style.display = "flex";
    displayWorksModale(works);
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
function displayWorksModale(works) {
  const displayGalleryModal = document.getElementById("displayGalleryModal");

  displayGalleryModal.innerHTML = "";

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
      getId = works[i].id;

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
      works = works.filter(function (work) {
        return work.id !== getId;
      });
      displayWorksModale(works);
      const gallery = document.querySelector(".gallery");
      gallery.innerHTML = "";
      displayWorks(works);
    } else {
      const error = document.querySelector(".error-message");
      error.innerText =
        "La demande à échoué. Veuillez réessayer en vérifiant votre connexion";
      console.log(error);
    }
  });
}

function changeModalImage() {
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
changeModalImage();
