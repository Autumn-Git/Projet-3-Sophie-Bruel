/*tu maitrises cette partie*/
const openModal = document.getElementById("openModal")
const modalWindow = document.querySelector(".modalWindow")
const closeModal = document.getElementById("closeModal")
const btnGalleryModal = document.getElementById("btnGalleryModal")
const returnGalleryModal = document.getElementById("returnGalleryModal")


openModal.addEventListener("click", openAndCloseModal);
closeModal.addEventListener("click", openAndCloseModal);
btnGalleryModal.addEventListener("click", openAndCloseModal)
returnGalleryModal.addEventListener("click", openAndCloseModal)

/*tu maitrises cette fonction*/
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

/*tu maitrises cette fonction*/
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

       trashElementModal.addEventListener("click", function (){
        getId = works[i].id

        deleteWorks(works[i].id);
       })
}
}



function deleteWorks(getId){
    const token = localStorage.getItem("token");


    fetch(`http://localhost:5678/api/works/${getId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then(function (response) {
        if(response.ok){
            works = works.filter(function(work){
                return work.id !== getId;
            })
            displayWorksModale(works)
            const gallery = document.querySelector(".gallery");
            gallery.innerHTML = "";
            displayWorks(works);

        }else{
            const error = document.querySelector(".error-message");
            error.innerText = "La demande à échoué. Veuillez réessayer en vérifiant votre connexion";
            console.log(error)
        }
      })
    }