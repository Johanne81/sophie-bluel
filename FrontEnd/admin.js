const isLoggedIn = sessionStorage.getItem("isLoggedIn");
const editingBanner = document.querySelector(".editing-banner");
const loginLink = document.querySelector(".login-link");
const logoutLink = document.querySelector(".logout-link");
const blockCategories = document.querySelector(".categories");
const editButton = document.querySelector(".edit-button");

if (isLoggedIn) {
  editingBanner.style.display = "flex";
  loginLink.style.display = "none";
  logoutLink.style.display = "flex";
  blockCategories.style.display = "none";
  editButton.style.display = "flex";
}

const logoutButton = document.querySelector("#logout-button");

logoutButton.addEventListener("click", function () {
  logoutUser();
});

// Fonction de déconnexion
function logoutUser() {
  // Supprimer le token et l'état de connexion du sessionStorage
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("isLoggedIn");
  // Redirection vers la page d'accueil
  window.location.href = "index.html";
}
