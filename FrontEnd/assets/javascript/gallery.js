export function createWorkFigure(work) {
  const workFigure = document.createElement("figure");
  workFigure.dataset.workId = work.id;
  workFigure.dataset.categoryId = work.categoryId;

  const imageElement = document.createElement("img");
  imageElement.src = work.imageUrl;
  imageElement.alt = work.title;
  const titleElement = document.createElement("figcaption");
  titleElement.innerText = work.title;

  workFigure.appendChild(imageElement);
  workFigure.appendChild(titleElement);
  return workFigure;
}


export function displayWorks(works) {
  const gallery = document.querySelector(".gallery");

  for (let i = 0; i < works.length; i++) {
    gallery.appendChild(createWorkFigure(works[i]));
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
    });
  }

  buttonAll.addEventListener("click", () => {
    const figures = document.querySelectorAll(".gallery figure");

    for (let i = 0; i < figures.length; i++) {
      figures[i].classList.remove("hidden");
    }
  });
}


function filterWorks(categoryId) {
  const figures = document.querySelectorAll(".gallery figure");

  for (let i = 0; i < figures.length; i++) {
    const figureCategory = Number(figures[i].dataset.categoryId);

    if (figureCategory === categoryId) {
      figures[i].classList.remove("hidden");
    } else {
      figures[i].classList.add("hidden");
    }
  }
}
