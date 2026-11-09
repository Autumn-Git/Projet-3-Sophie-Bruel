//Quand le formulaire de connexion est envoyé, elle transmet l’e-mail et le mot de passe à l’API. 
//Si l’API renvoie un token, elle l’enregistre et redirige vers l’accueil ; sinon, elle affiche un message d’erreur.
function listenerConnexion() { // pas d'export parce qu'il se lance tout seul en bas
  const formConnexion = document.querySelector(".formConnexion");
  formConnexion.addEventListener("submit", function (event) {
    event.preventDefault();

    const credentials = {
      email: event.target.querySelector("[name=email]").value, // C’est l’élément sur lequel l’événement s’est produit.
      password: event.target.querySelector("[name=password]").value,
    };

    fetch("http://localhost:5678/api/users/login", {
      method: "POST", // on envoie des données
      headers: {
        "Content-Type": "application/json",  // le contenu est du JSON
      },
      body: JSON.stringify(credentials),  // on transforme en texte Json
    })
      .then((response) => response.json())
      .then(function (data) {
        if (data.token) { // si c'est les bon credentials, alors on enregistre le token et on va sur la page d'acceuil
          localStorage.setItem("token", data.token);
          window.location.href = "index.html";
        } else {
          const error = document.querySelector(".error-message");
          error.innerText = "Erreur dans l'identifiant ou le mot de passe";
        }
      })
      .catch(function (error) { // Si le serveur est injoignable, fetch échoue, et le .catch() affiche un message différent.
        console.error("Erreur lors de la requête :", error);
        const errorMessage = document.querySelector(".error-message");
        errorMessage.innerText =
          "Une erreur côté serveur s'est produite. Veuillez réessayer plus tard.";
      });
  });
}

listenerConnexion();
