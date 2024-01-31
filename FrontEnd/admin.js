const isLoggedIn = sessionStorage.getItem("isLoggedIn");
const editingBanner = document.querySelector(".editing_banner");
const loginLink = document.querySelector(".login_link");
const logoutLink = document.querySelector(".logout_link");
const blockCategories = document.querySelector(".categories");
const editButton = document.querySelector(".edit_button");

if (isLoggedIn) {
  editingBanner.style.display = "flex";
  loginLink.style.display = "none";
  logoutLink.style.display = "flex";
  blockCategories.style.display = "none";
  editButton.style.display = "flex";
}
