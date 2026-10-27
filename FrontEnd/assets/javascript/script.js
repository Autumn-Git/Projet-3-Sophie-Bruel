let works = [];

fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(function (data) {
        works = data;
        displayWorks(works);
    });

  fetch("http://localhost:5678/api/categories")
  .then(response => response.json())
  .then(function (categories) {
    console.log(categories);    //a retirer
    displayFilter(categories)
  });





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




function displayFilter(categories) {
    const filter = document.querySelector(".filter");
    const gallery = document.querySelector(".gallery");

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

        button.addEventListener("click", function() {
          console.log(works[i].categoryId)
          filterWorks(categories[i].id, works);
        })
    }
    buttonAll.addEventListener("click", function() {
        gallery.innerHTML = "";
        displayWorks(works)
    })
}



function filterWorks(categoryId, works){
      const listeFilter = []
      
      for (let i = 0; i < works.length; i++) {
        if (categoryId === works[i].categoryId) {
          listeFilter.push(works[i]);
        }
      }
      const gallery = document.querySelector(".gallery");
      gallery.innerHTML = "";
      displayWorks(listeFilter)
}
