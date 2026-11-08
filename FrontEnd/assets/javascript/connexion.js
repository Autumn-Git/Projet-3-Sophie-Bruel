function listenerConnexion() {
  const formConnexion = document.querySelector(".formConnexion");
  formConnexion.addEventListener("submit", function (event) {
    event.preventDefault();


    const credentials = {
      email: event.target.querySelector("[name=email]").value,
      password: event.target.querySelector("[name=password]").value,
    };

    fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        
      },
      body: JSON.stringify(credentials),
    })
      .then((response) => response.json())
      .then(function (data) {
        if (data.token) {
          localStorage.setItem("token", data.token);
          window.location.href = "index.html";
        } else {
          const error = document.querySelector(".error-message");
          error.innerText = "Erreur dans l'identifiant ou le mot de passe";
        }
      })
       .catch(function (error) {
         console.error("Erreur lors de la requête :", error);
         const errorMessage = document.querySelector(".error-message");
         errorMessage.innerText = "Une erreur côté serveur s'est produite. Veuillez réessayer plus tard.";
     });
  });
}

listenerConnexion();

