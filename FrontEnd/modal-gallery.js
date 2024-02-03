const modal = document.getElementById("modal1");
const closeButton = document.querySelector(".close-button");
const galleryContainer = document.querySelector(".gallery-container");
// editButton est déclaré dans admin.js

// Ouvrir la modale lorsqu'on clique sur "modifier" et récupérer des travaux
editButton.addEventListener("click", () => {
  fetch("http://localhost:5678/api/works")
    .then((reponse) => reponse.json())
    .then((worksData) => {
      // Ajouter les éléments récupérés à la galerie
      worksData.forEach((work) => {
        const img = document.createElement("img");
        img.src = work.imageUrl;
        img.alt = work.title;
        img.style.height = "80px";
        const blockImg = document.createElement("div");
        blockImg.classList.add("block-img");
        const trash = document.createElement("i");
        trash.classList.add("fa-solid", "fa-trash-can");
        blockImg.appendChild(img);
        blockImg.appendChild(trash);
        galleryContainer.appendChild(blockImg);
      });
    });
  modal.style.display = "block";
});

// Fermer la modale lorsqu'on clique sur la croix
closeButton.addEventListener("click", () => {
  galleryContainer.innerHTML = "";
  modal.style.display = "none";
});

// Fermer la modale lorsqu'on clique en dehors de la modale
modal.addEventListener("click", () => {
  galleryContainer.innerHTML = "";
  modal.style.display = "none";
});
