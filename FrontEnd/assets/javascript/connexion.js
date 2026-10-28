function listenerConnexion() {
  const formulaireConnexion = document.querySelector(".formulaireConnexion");
  formulaireConnexion.addEventListener("submit", function (event) {
    event.preventDefault();
    //console.log("j'ai cliqué");

    const identifiants = {
      email: event.target.querySelector("[name=email]").value,
      password: event.target.querySelector("[name=password]").value,
    };

    fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(identifiants),
    })
      .then((response) => response.json())
      .then(function (data) {
        // ← 2e .then : reçoit le CONTENU
        console.log(data);
        if (data.token) {
          localStorage.setItem("token", data.token);
          window.location.href = "index.html";
          //console.log("c'est bon t'es connecté mon pote");
        } else {
          const error = document.querySelector(".error-message");
          error.innerText = "Erreur dans l'identifiant ou le mot de passe";
        }

        console.log(localStorage.getItem("token"));
      });
  });
}
listenerConnexion();


// sophie.bluel@test.tld
// S0phie