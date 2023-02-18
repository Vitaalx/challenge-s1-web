const slideImage = document.querySelectorAll(".slide");
const slidesContainer = document.querySelector(".slides-ctnr");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");
const navigationDots = document.querySelector(".nav-dots");

let numberOfImages = slideImage.length;
let slideWidth = slideImage[0].clientWidth;
let currentSlide = 0;


// Set up the slider

function init() {

    slideImage.forEach((img, i) => {
        img.style.left = i * 100 + "%";
    });

    slideImage[0].classList.add("active");

    createNavigationDots();
}

init();


// Create navigation dots

function createNavigationDots() {
    for (let i = 0; i < numberOfImages; i++) {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        dot.innerHTML = i + 1;
        navigationDots.appendChild(dot);
        dot.addEventListener("click", () => {
            goToSlide(i);
        });
    }

    navigationDots.children[0].classList.add("active");
}

// Next Button

nextBtn.addEventListener("click", () => {
    if (currentSlide >= numberOfImages - 1) {
        goToSlide(0);
        return;

    }
    currentSlide++;
    goToSlide(currentSlide);
});

// Prev Button

prevBtn.addEventListener("click", () => {
    if (currentSlide <= 0) {
        goToSlide(numberOfImages - 1);
        return;

    }
    currentSlide--;
    goToSlide(currentSlide);
});


// Go To Slide

function goToSlide(slideNumber) {
    slidesContainer.style.transform = `translateX(-${slideWidth * slideNumber}px)`;
    currentSlide = slideNumber;
    setActiveClass();
}

// Set Active Class

function setActiveClass() {
    // Set active class for Slide Image

    let currentActive = document.querySelector(".slide.active");
    currentActive.classList.remove("active");
    slideImage[currentSlide].classList.add("active");


    // Set active class for Navigation Dots

    let currentDot = document.querySelector(".dot.active");
    currentDot.classList.remove("active");
    navigationDots.children[currentSlide].classList.add("active");
}

// Automatic Slider

function automateSlider() {

    let slideNumber = currentSlide;

    setInterval(() => {

        slideNumber++;

        if (slideNumber > numberOfImages - 1) slideNumber = 0;

        goToSlide(slideNumber);

    }, 15000);

}


automateSlider();

// Fixes the width when resizing the window

window.onresize = function () {
    slideWidth = slideImage[0].clientWidth;
    slidesContainer.style.transform = `translateX(-${slideWidth * currentSlide}px)`;
}