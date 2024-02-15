const modal2 = document.querySelector("#modal2");
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

// Ouvrir la boite de téléchargement de la nouvelle image
addButton2.addEventListener("click", (e) => {
  e.preventDefault();
  inputPicture.click();
});

// Afficher la nouvelle image
inputPicture.addEventListener("change", () => {
  const file = inputPicture.files[0];
  const reader = new FileReader();

  // Vérifier le type de fichier
  const acceptedTypes = ["image/jpeg", "image/png"];
  if (!acceptedTypes.includes(file.type)) {
    alert("Seuls les fichiers JPG et PNG sont autorisés.");
    return;
  }
  // Vérifier la taille du fichier
  const maxSize = 4 * 1024 * 1024; // 4 Mo
  if (file.size > maxSize) {
    alert("La taille du fichier ne doit pas dépasser 4 Mo.");
    return;
  }
  reader.onload = () => {
    picturePreview.src = reader.result;
    pictureSelection.style.display = "none";
    picturePreview.style.display = "block";
  };

  if (file) {
    reader.readAsDataURL(file);
  }
});
