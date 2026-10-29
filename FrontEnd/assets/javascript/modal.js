

const openModal = document.getElementById("openModal")
const modalWindow = document.querySelector(".modalWindow")
const closeModal = document.getElementById("closeModal")
const btnGalleryModal = document.getElementById("btnGalleryModal")
const returnGalleryModal = document.getElementById("returnGalleryModal")


openModal.addEventListener("click", openAndCloseModal);
closeModal.addEventListener("click", openAndCloseModal);
btnGalleryModal.addEventListener("click", openAndCloseModal)
returnGalleryModal.addEventListener("click", openAndCloseModal)

function openAndCloseModal(event) {
    event.preventDefault();

    if (this.id === "openModal") {
        modalWindow.style.display = "flex";
        displayWorksModale(works)
    } else if (this.id === "closeModal") {
        modalWindow.style.display = "none";
    }
    else if (this.id === "btnGalleryModal") {
        galleryModal.style.display = "none";
        addModal.style.display = "block"
    }
    else if (this.id === "returnGalleryModal") {
        galleryModal.style.display = "block";
        addModal.style.display = "none"
    }
}

function displayWorksModale(works){
    const displayGalleryModal = document.getElementById("displayGalleryModal");

      displayGalleryModal.innerHTML = "";
    
    for (let i = 0; i < works.length; i++) {
       const workElementModal = document.createElement("figure");

       const imageElementModal = document.createElement("img");
       imageElementModal.src = works[i].imageUrl;
       const trashElementModal = document.createElement("button");
       trashElementModal.classList.add("fa-solid", "fa-trash-can", "trashModal")


       workElementModal.appendChild(imageElementModal);
       workElementModal.appendChild(trashElementModal);

       displayGalleryModal.appendChild(workElementModal);
}
}


// function displayWorks(works) {
//   const gallery = document.querySelector(".gallery");

//   for (let i = 0; i < works.length; i++) {
//     const workElement = document.createElement("figure");

//     const imageElement = document.createElement("img");
//     imageElement.src = works[i].imageUrl;
//     const titleElement = document.createElement("figcaption");
//     titleElement.innerText = works[i].title;

//     workElement.appendChild(imageElement);
//     workElement.appendChild(titleElement);

//     gallery.appendChild(workElement);
//   }
// }