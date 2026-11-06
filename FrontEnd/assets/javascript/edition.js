// Fonction comprises
export function changeEditionMode() {
  const token = localStorage.getItem("token");

  if (token) {
    const edition_mode = document.querySelector(".edition_mode");
    const title_section_content = document.querySelector(
      ".title_section_content",
    );
    const filter = document.querySelector(".filter");
    const connexion = document.getElementById("connexion");
    const header = document.querySelector(".header");

    edition_mode.style.display = "flex";
    title_section_content.style.display = "flex";
    filter.classList.add("cache");
    title_section_content.classList.add("cache");
    connexion.innerText = "logout";
    header.style.margin = "100px 0 50px";

    connexion.addEventListener("click", function (event) {
      event.preventDefault();
      localStorage.removeItem("token");
      window.location.href = "index.html";
    });
  }
}
