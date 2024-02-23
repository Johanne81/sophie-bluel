const categories = document.querySelector(".categories");
const gallery = document.querySelector(".gallery");

// Fonction pour rafraîchir les travaux
function refreshWorks() {
  // Récupération des travaux sur l'API
  fetch("http://localhost:5678/api/works")
    .then((reponse) => reponse.json())
    .then((worksData) => {
      gallery.innerHTML = "";
      // Ajouter les éléments récupérés à la galerie
      worksData.forEach((work) => {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");

        figure.dataset.category = work.categoryId;
        figure.classList.add("project");

        img.src = work.imageUrl;
        img.alt = work.title;
        figcaption.textContent = work.title;

        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
      });
    });
}

// Récupération des catégories sur l'API
fetch("http://localhost:5678/api/categories")
  .then((response) => response.json())
  .then((categoriesData) => {
    // Créer le bouton "Tous"
    const allButton = document.createElement("div");
    allButton.textContent = "Tous";
    allButton.dataset.categoryId = "all";
    allButton.classList.add("filter-btn");
    allButton.classList.add("selected");
    allButton.addEventListener("click", (e) => {
      const categoryId = e.target.dataset.categoryId;
      const clickedButton = e.target;
      applyFilter(categoryId, clickedButton);
    });

    categories.appendChild(allButton);

    // Créer les boutons pour chaque catégorie
    categoriesData.forEach((category) => {
      const button = document.createElement("div");
      button.textContent = category.name;
      button.dataset.categoryId = category.id;
      button.classList.add("filter-btn");
      button.addEventListener("click", (e) => {
        const categoryId = e.target.dataset.categoryId;
        const clickedButton = e.target;
        applyFilter(categoryId, clickedButton);
      });
      categories.appendChild(button);
    });

    // Rafraichir les travaux
    refreshWorks();
  });

// Fonction pour appliquer le filtre
function applyFilter(categoryId, clickedButton) {
  //Etape 1, j'ajoute selected sur le bouton et je l'enlève sur les autres
  const allButtons = document.querySelectorAll(".filter-btn");
  allButtons.forEach((button) => {
    button.classList.remove("selected");
  });
  clickedButton.classList.add("selected");

  //Etape 2, je filtre
  const figures = document.querySelectorAll(".project");
  figures.forEach((figure) => {
    if (categoryId === "all" || figure.dataset.category === categoryId) {
      figure.style.display = "block";
    } else {
      figure.style.display = "none";
    }
  });
}
