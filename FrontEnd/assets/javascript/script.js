
function displayWorks(works) {
    const gallery = document.querySelector(".gallery");

    for (let i = 0; i < works.length; i++) {
        const workElement = document.createElement("figure");

        const imageElement = document.createElement("img");
        imageElement.src = works[i].imageUrl;
        const titleElement = document.createElement("figcaption");
        titleElement.innerText = works[i].title;

        workElement.appendChild(imageElement);
        workElement.appendChild(titleElement);

        gallery.appendChild(workElement);
  }
}
fetch("http://localhost:5678/api/works")
  .then(function (reponse) {
    return reponse.json();
  })
  .then(function (works) {
    console.log(works);   //a retirer
    displayWorks(works)
  });





function displayFilter(categories) {
    const filter = document.querySelector(".filter");

    const buttonAll = document.createElement("button")
    buttonAll.innerText = "Tous"
    buttonAll.classList.add("btn-filter")
    buttonAll.classList.add("all")

    filter.appendChild(buttonAll)

    for (let i = 0; i < categories.length; i++) {
        const button = document.createElement("button")
        button.innerText = categories[i].name
        button.classList.add("btn-filter")
        filter.appendChild(button)
    }
}

fetch("http://localhost:5678/api/categories")
  .then(function (reponse) {
    return reponse.json();
  })
  .then(function (categories) {
    console.log(categories);    //a retirer
    displayFilter(categories)
  });