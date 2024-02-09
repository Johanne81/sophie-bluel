const modal2 = document.getElementById("modal2");
const addButton = document.querySelector(".add_photo_button");
const closeButton2 = document.querySelector(".close-button2");

// Ouvrir la modal2 lorsqu'on clique sur "Ajouter une photo"
addButton.addEventListener("click", () => {
  modal2.style.display = "block";
});

// Revenir sur la modal1 au clic sur la flèche gauche
const arrowLeft = document.querySelector(".fa-arrow-left");
arrowLeft.addEventListener("click", () => {
  modal2.style.display = "none";
  modal1.style.display = "block";
  loadWorks();
});

// Fermer la modale lorsqu'on clique sur la croix
closeButton2.addEventListener("click", () => {
  modal2.style.display = "none";
});

// Fermer la modale lorsqu'on clique en dehors de la modale
modal2.addEventListener("click", () => {
  modal2.style.display = "none";
});
