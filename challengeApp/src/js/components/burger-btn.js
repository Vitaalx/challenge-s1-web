const burgerBtn = document.querySelector(".burger-button");
const burgerWrapper = document.querySelector(".burger-wrapper");
burgerBtn.addEventListener("click", burgerMenuToggle);

let isOpen = false;

function burgerMenuToggle() {
  burgerBtn.classList.toggle("active");
  burgerWrapper.classList.toggle("active");
  isOpen = !isOpen;
}

window.addEventListener("resize", () => {
  const width = window.innerWidth;

  if (width > 768) {
    burgerBtn.classList.remove("active");
    burgerWrapper.classList.remove("active");
    isOpen = false;
  }
});

document.addEventListener('click', function(event) {
  if (!burgerWrapper.contains(event.target) && !burgerBtn.contains(event.target) && isOpen) {
    burgerBtn.classList.remove("active");
    burgerWrapper.classList.remove("active");
    isOpen = false;
  }
});