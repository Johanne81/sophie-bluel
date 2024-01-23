// Récupération des catégories sur l'API
const categories = document.querySelector(".categories");

fetch("http://localhost:5678/api/categories")
  .then((response) => response.json())
  .then((categoriesData) => {
    // Créer le boutton "Tous"
    const allButton = document.createElement("button");
    allButton.textContent = "Tous";
    allButton.dataset.categoryId = "all";

    categories.appendChild(allButton);

    // Créer les bouttons pour chaque catégorie
    categoriesData.forEach((category) => {
      const button = document.createElement("button");
      button.textContent = category.name;
      button.dataset.categoryId = category.id;

      categories.appendChild(button);
    });
  });

// Supprimer les travaux existants du HTML
const gallery = document.querySelector(".gallery");
gallery.innerHTML = "";

// Récupération des travaux sur l'API
fetch("http://localhost:5678/api/works")
  .then((reponse) => reponse.json())
  .then((worksData) => {
    // Ajouter les éléments récupérés à la galerie
    worksData.forEach((work) => {
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      const figcaption = document.createElement("figcaption");

      img.src = work.imageUrl;
      img.alt = work.title;
      figcaption.textContent = work.title;

      figure.appendChild(img);
      figure.appendChild(figcaption);
      gallery.appendChild(figure);
    });
  });
