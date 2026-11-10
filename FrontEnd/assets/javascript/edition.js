//la différence entre un utilisateur connecté et non connecté
export function handleEditionModeDisplay() {

    const edition_mode = document.querySelector(".edition_mode");
    const title_section_content = document.querySelector(".title_section_content");
    const filter = document.querySelector(".filter");
    const connexion = document.getElementById("connexion");
    const header = document.querySelector(".header");

    edition_mode.classList.add("show");
    title_section_content.classList.add("show");
    filter.classList.add("hidden");
    connexion.innerText = "logout";
    header.style.margin = "100px 0 50px";

    connexion.addEventListener("click", function (event) {
      event.preventDefault(); // permet d'attendre avant d'aller sur la page de connexion.html, voir le HTML.
      localStorage.removeItem("token");
      window.location.href = "index.html";
    });
}
