import { readStorageWorks } from "./storage.js";


export function displayWorks(works) {
  const gallery = document.querySelector(".gallery");
  gallery.replaceChildren();

  for (let i = 0; i < works.length; i++){
    const workElement = document.createElement("figure");
    workElement.dataset.categoryId = works[i].categoryId;

    const imageElement = document.createElement("img");
    imageElement.src = works[i].imageUrl;
    imageElement.alt = works[i].title;
    const titleElement = document.createElement("figcaption");
    titleElement.innerText = works[i].title

    workElement.appendChild(imageElement);
    workElement.appendChild(titleElement);

    gallery.appendChild(workElement);
  }
}



export function displayFilter(categories) {
  const filter = document.querySelector(".filter");

  const buttonAll = document.createElement("button");
  buttonAll.innerText = "Tous";
  buttonAll.classList.add("btn-filter");
  filter.appendChild(buttonAll);

  for (let i = 0; i < categories.length; i++) {
    const button = document.createElement("button");
    button.innerText = categories[i].name;
    button.classList.add("btn-filter");
    filter.appendChild(button);

    button.addEventListener("click", () => {
      filterWorks(categories[i].id);
    })
}
buttonAll.addEventListener("click", () => {
  const figures = document.querySelectorAll("figures")
  for (let i = 0; i < figures.length; i++){
    figures[i].classList.remove("cache");
  }
})
}



function filterWorks(categoryId){
    const figures = document.querySelectorAll(".gallery figure")
    
    for(let i = 0; i < figures.length; i++){
        const figureCategory = Number(figures[i].dataset.categoryId)

        if(figureCategory === categoryId) {
            figures[i].classList.remove("cache")
        }else{
            figures[i].classList.add("cache")
        }
    }
}