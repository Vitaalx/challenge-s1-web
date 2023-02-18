const burgerBtn = document.querySelector(".burger-button");
const burgerWrapper = document.querySelector(".burger-wrapper");
burgerBtn.addEventListener("click", burgerMenuToggle);

function burgerMenuToggle() {
  burgerBtn.classList.toggle("active");
  burgerWrapper.classList.toggle("active");
}

window.addEventListener("resize", () => {
  const width = window.innerWidth;

  if (width > 768) {
    burgerBtn.classList.remove("active");
    burgerWrapper.classList.remove("active");
  }
});