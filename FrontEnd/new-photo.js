const modal2 = document.getElementById("modal2");
const addButton = document.querySelector(".add_photo_button");
const addButton2 = document.querySelector(".add_photo_button2");
const inputPicture = document.querySelector("#input-picture");
const pictureSelection = document.querySelector(".picture-selection");
const picturePreview = document.querySelector("#picture-preview");
const selectCategory = document.querySelector("#select-category");
const closeButton2 = document.querySelector(".close-button2");

// Ouvrir la modal2 lorsqu'on clique sur "Ajouter une photo"
addButton.addEventListener("click", () => {
  modal2.style.display = "block";
});

// Ouvrir la boite de téléchargement de la nouvelle image
addButton2.addEventListener("click", (e) => {
  e.preventDefault();
  inputPicture.click();
});

// Afficher la nouvelle image
inputPicture.addEventListener("change", () => {
  const file = inputPicture.files[0];
  const reader = new FileReader();

  reader.onload = () => {
    picturePreview.src = reader.result;
    pictureSelection.style.display = "none";
    picturePreview.style.display = "block";
  };

  if (file) {
    reader.readAsDataURL(file);
  }
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
