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
  const maxSize = 4 * 1024 * 1024;
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

const form = document.querySelector("#form-new-photo");
const submitButton = document.querySelector("#form-submit-photo");

//Envoyer le formulaire
submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  // Récupérer les données saisies dans le formulaire
  const formData = new FormData(form);
  sendData(formData);
});

// Fonction pour envoyer le formulaire
async function sendData(formData) {
  const response = await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
    body: formData,
  });

  // Afficher le statut de la réponse dans la console
  console.log("Réponse du serveur :", response.status);

  const errorMessage = document.querySelector("#form-error-message");
  if (!response.ok) {
    // Afficher un message d'erreur Bad Request
    if (response.status === 400) {
      errorMessage.textContent = "Le formulaire n'est pas correctement rempli.";
    } else {
      // Afficher un message d'erreur général
      errorMessage.textContent =
        "Une erreur s'est produite lors de l'envoi du formulaire.";
    }
    errorMessage.style.display = "flex";
  } else {
    // Afficher un message de succès à l'utilisateur
    errorMessage.style.display = "none";
    alert("Formulaire envoyé avec succès!");
    // Réinitialiser les champs de formulaire
    form.reset();
    inputPicture.value = "";
    picturePreview.src = "";
    pictureSelection.style.display = "block";
    picturePreview.style.display = "none";
  }
}
