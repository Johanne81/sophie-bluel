const categories = document.querySelector(".categories");

// Récupération des catégories sur l'API
fetch("http://localhost:5678/api/categories").then((reponse) => reponse.json());

// Supprimer les travaux existants du HTML
const gallery = document.querySelector(".gallery");
gallery.innerHTML = "";

// Récupération des travaux sur l'API
fetch("http://localhost:5678/api/works")
  .then((reponse) => reponse.json())
  .then((data) => {
    // Ajouter les éléments récupérés à la galerie
    data.forEach((work) => {
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
