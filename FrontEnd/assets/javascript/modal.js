// let works = [];

// fetch("http://localhost:5678/api/works")
//   .then((response) => response.json())
//   .then(function (data) {
//     works = data;
//     displayWorks(works);
//   });

// import { displayWorks } from "./script.js";


const openModal = document.getElementById("openModal")
const modalWrapper = document.querySelector(".modalWrapper")
const closeModal = document.getElementById("closeModal")
const displayPortfolioModal = document.getElementById("displayPortfolioModal")

openModal.addEventListener("click", openAndCloseModal);
closeModal.addEventListener("click", openAndCloseModal);

function openAndCloseModal(event) {
    event.preventDefault();

    if (this.id === "openModal") {
        modalWindow.style.display = "flex";
    } else if (this.id === "closeModal") {
        modalWindow.style.display = "none";
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