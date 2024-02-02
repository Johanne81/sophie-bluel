const modal = document.getElementById("modal1");
const closeButton = document.querySelector(".close-button");
// editButton is declared in admin.js

// Ouvrir la modale lorsqu'on clique sur "modifier"
editButton.addEventListener("click", () => {
  console.log("ok");
  modal.style.display = "block";
});

// Ferme la modale lorsqu'on clique sur la croix
closeButton.addEventListener("click", () => {
  modal.style.display = "none";
});

// Ferme la modale lorsqu'on clique en dehors de la modale
window.addEventListener("click", (event) => {
  console.log(event.target);
  if (event.target === modal) {
    modal.style.display = "none";
  }
});
