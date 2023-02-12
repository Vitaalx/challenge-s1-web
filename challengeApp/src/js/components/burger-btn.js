const burgerBtn = document.querySelector(".burger-button");
burgerBtn.addEventListener("click", burgerMenuToggle);

function burgerMenuToggle() {
  burgerBtn.classList.toggle("active");
}