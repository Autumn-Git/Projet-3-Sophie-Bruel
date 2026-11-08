import { readStorageWorks } from "./storage.js";


export function displayWorks(works) {
  const gallery = document.querySelector(".gallery");
  gallery.replaceChildren();

  for (let i = 0; i < works.length; i++){
    const workElement = document.createElement("figure");

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
  const gallery = document.querySelector(".gallery");
  gallery.replaceChildren();
  displayWorks(readStorageWorks()); 
})
}




function filterWorks(categoryId) {
  const works = readStorageWorks(); 
  const listFilter = [];

  for (let i = 0; i < works.length; i++) {
    if (categoryId === works[i].categoryId) {
      listFilter.push(works[i]);
    }
  }
  const gallery = document.querySelector(".gallery");
  gallery.replaceChildren();
  displayWorks(listFilter);

}