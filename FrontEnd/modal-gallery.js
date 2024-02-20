const modal = document.getElementById("modal1");
const closeButton1 = document.querySelector(".close-button1");
const galleryContainer = document.querySelector(".gallery-container");
// editButton est déclaré dans admin.js

function loadWorks() {
  fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((worksData) => {
      // Ajouter les éléments récupérés à la galerie
      worksData.forEach((work) => {
        const img = document.createElement("img");
        img.src = work.imageUrl;
        img.alt = work.title;
        const blockImg = document.createElement("div");
        blockImg.classList.add("block-img");
        const trash = document.createElement("i");
        trash.classList.add("fa-solid", "fa-trash-can");
        blockImg.appendChild(img);
        blockImg.appendChild(trash);
        galleryContainer.appendChild(blockImg);
        // Ecoute du clic sur la corbeille et suppression des travaux
        trash.addEventListener("click", (e) => {
          e.stopPropagation(); // Arrêter la propagation de l'événement
          const workId = work.id;
          deleteWork(workId, e);
        });
      });
    });
}

// Ouvrir la modale lorsqu'on clique sur "modifier" et charger les travaux
editButton.addEventListener("click", () => {
  loadWorks();
  modal.style.display = "block";
});

// Supprimer les travaux via l'API
function deleteWork(workId, e) {
  fetch(`http://localhost:5678/api/works/${workId}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        e.target.parentElement.remove();
      } else {
        // Gérer les erreurs de suppression
        console.error("Erreur lors de la suppression du travail");
      }
    })
    .catch((error) => {
      console.error("Erreur lors de la suppression du travail :", error);
    });
  refreshWorks();
}

// Fermer la modale lorsqu'on clique sur la croix
closeButton1.addEventListener("click", () => {
  galleryContainer.innerHTML = "";
  modal.style.display = "none";
});

// Fermer la modale lorsqu'on clique en dehors de la modale
modal.addEventListener("click", () => {
  galleryContainer.innerHTML = "";
  modal.style.display = "none";
});
