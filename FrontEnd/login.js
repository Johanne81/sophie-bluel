const loginButton = document.querySelector("#se-connecter");

loginButton.addEventListener("click", function () {
  loginUser();
});

function loginUser() {
  // Récupérer les valeurs saisies dans le formulaire
  let user = {
    email: document.querySelector("#email").value,
    password: document.querySelector("#password").value,
  };

  // Envoi de la requête POST à l'API
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    //Récupération de la réponse de la requête
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        // Afficher le message d'erreur
        const loginError = document.querySelector("#login-error");
        loginError.style.display = "block";
      }
    })
    .then((data) => {
      // éxécuté que si la réponse est un succés
      // Stockage du token dans le session storage
      sessionStorage.setItem("token", data.token);
      // Stockage de l'état de connexion dans le session storage
      sessionStorage.setItem("isLoggedIn", true);
      // Redirection vers la page d'accueil
      window.location.href = "index.html";
    });
}
