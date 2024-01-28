const login_button = document.getElementById("se_connecter");

login_button.addEventListener("click", function () {
  loginUser();
});

function loginUser() {
  // Récupérer les valeurs saisies dans le formulaire
  let user = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
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
        // Je le coderai plus tard je veux d'abord voir si ça fonctionne avec le login ok
      }
    })
    .then((data) => {
      if (data) {
        //Si login OK
        // Stockage du token dans le session storage
        sessionStorage.setItem("token", data.token);
        // Redirection vers la page d'accueil
        window.location.href = "index.html";
      }
    });
}
