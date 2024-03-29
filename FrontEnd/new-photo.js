// Constantes
const modal2 = document.querySelector("#modal2");
const modalWrapper2 = document.querySelector("#modal-wrapper2");
const addButton = document.querySelector(".add-photo-button");
const addButton2 = document.querySelector(".add-photo-button2");
const form = document.querySelector("#form-new-photo");
const inputPicture = document.querySelector("#input-picture");
const pictureSelection = document.querySelector(".picture-selection");
const picturePreview = document.querySelector("#picture-preview");
const inputTitle = document.querySelector("#title");
const selectCategory = document.querySelector("#select-category");
const submitButton = document.querySelector("#form-submit-photo");
const closeButton2 = document.querySelector(".close-button2");
const arrowLeft = document.querySelector(".fa-arrow-left");
const errorMessage = document.querySelector("#form-error-message");

// Ouvrir la modal2 lorsqu'on clique sur "Ajouter une photo"
addButton.addEventListener("click", () => {
  modal2.style.display = "block";
  modal1.style.display = "none";
});

// Revenir sur la modal1 au clic sur la flèche gauche
arrowLeft.addEventListener("click", () => {
  modal2.style.display = "none";
  modal1.style.display = "block";
  galleryContainer.innerHTML = "";
  resetForms();
  loadWorks();
});

// Fermer la modale lorsqu'on clique sur la croix
closeButton2.addEventListener("click", () => {
  modal2.style.display = "none";
});

// Fermer la modale lorsqu'on clique en dehors de la modale et ne pas fermer lorsqu'on clique à l'intérieur
modal2.addEventListener("click", (e) => {
  if (!modalWrapper2.contains(e.target)) {
    modal2.style.display = "none";
  }
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

// Mettre à jour le bouton d'envoi lorsque tous les champs sont remplis
function updateSubmitButton() {
  const pictureLoaded = inputPicture.value !== "";
  const formFilled = inputTitle.value !== "";

  if (pictureLoaded && formFilled) {
    submitButton.style.backgroundColor = "#1D6154";
    submitButton.style.cursor = "pointer";
  } else {
    submitButton.style.backgroundColor = "#A7A7A7";
    submitButton.style.cursor = "default";
  }
}
inputPicture.addEventListener("change", updateSubmitButton);
inputTitle.addEventListener("change", updateSubmitButton);

// Récupérer les catégories depuis l'API et créer les options
fetch("http://localhost:5678/api/categories")
  .then((response) => response.json())
  .then((categoriesData) => {
    categoriesData.forEach((category) => {
      // Créer une nouvelle option
      let option = document.createElement("option");
      option.value = category.id;
      option.textContent = category.name;
      selectCategory.appendChild(option);
    });
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

  if (!response.ok) {
    errorMessage.style.display = "flex";
    // Afficher un message d'erreur Bad Request
    if (response.status === 400) {
      errorMessage.textContent = "Le formulaire n'est pas correctement rempli.";
      inputTitle.addEventListener("click", () => {
        errorMessage.textContent = "";
      });
    } else {
      // Afficher un message d'erreur + général
      errorMessage.textContent =
        "Une erreur s'est produite lors de l'envoi du formulaire.";
      inputPicture.addEventListener("click", () => {
        errorMessage.textContent = "";
      });
    }
  } else {
    // Afficher un message de succès à l'utilisateur
    errorMessage.style.display = "none";
    alert("Formulaire envoyé avec succès!");

    // Réinitialiser les champs de formulaire
    resetForms();
    // Réinitialiser le bouton d'envoi
    updateSubmitButton();
    // Actualiser les travaux
    refreshWorks();
  }
}
// Réinitialiser les champs de formulaire
function resetForms() {
  form.reset();
  inputPicture.value = "";
  picturePreview.src = "";
  pictureSelection.style.display = "block";
  picturePreview.style.display = "none";
}
// Ajouter un eventListener sur le bouton "submit"
submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  // Récupérer les données saisies dans le formulaire et les envoyer
  const formData = new FormData(form);
  sendData(formData);
});
