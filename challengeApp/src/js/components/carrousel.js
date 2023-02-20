const slideImage = document.querySelectorAll(".slide");
const slidesContainer = document.querySelector(".slides-ctnr");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");
const navigationDots = document.querySelector(".nav-dots");

let numberOfImages = slideImage.length;
let slideWidth = slideImage[0].clientWidth;
let currentSlide = 0;

let screenWidth = screen.width;

const mobileWidth = 768;
const tabletWidth = 1024;

let isMobileOrTablet = screenWidth <= mobileWidth || screenWidth <= tabletWidth ? true : false;

function mobileCarrousel() {
    // Définir la position initiale du carrousel
    let currentPosition = 0;

    // Définir la position initiale du touch
    let xDown = null;
    let touchStartX = 0;
    let touchMoveX = 0;

    // Définir la transition entre les diapositives
    const transitionDuration = 300; // en millisecondes

    // Ajouter un écouteur d'événements pour suivre les mouvements de doigts
    slidesContainer.addEventListener('touchstart', handleTouchStart, false);
    slidesContainer.addEventListener('touchmove', handleTouchMove, false);
    slidesContainer.addEventListener('touchend', handleTouchEnd, false);
    function handleTouchStart(event) {
        if (!isMobileOrTablet) return;
        const firstTouch = event.touches[0];
        xDown = firstTouch.clientX;
        touchStartX = currentPosition;
    }

    function handleTouchMove(event) {
        if (!xDown || !isMobileOrTablet) {
            return;
        }

        const xUp = event.touches[0].clientX;
        const xDiff = xDown - xUp;
        touchMoveX = touchStartX - xDiff;

        // Empêcher de glisser vers la gauche lorsque la première diapositive est affichée
        if (currentPosition === 0 && xDiff < 0) {
            return;
        }

        // Empêcher de glisser vers la droite lorsque la dernière diapositive est affichée
        if (currentPosition === -(slideImage.length - 1) * slideWidth && xDiff > 0) {
            return;
        }

        // Mettre à jour la position du carrousel en utilisant translateX()
        slidesContainer.style.transform = `translateX(${touchMoveX}px)`;

        event.preventDefault();
    }

    function handleTouchEnd(event) {
        if (!xDown) {
            return;
        }

        const xUp = event.changedTouches[0].clientX;
        const xDiff = xDown - xUp;

        if (xDiff > 0 && xDiff > 200) {
            // swipe à gauche
            if (currentPosition > -(slideImage.length - 1) * slideWidth) {
                currentPosition -= slideWidth;
            }
        } else if (xDiff < 0 && Math.abs(xDiff) > 200) {
            // swipe à droite
            if (currentPosition < 0) {
                currentPosition += slideWidth;
            }
        }

        // Ajouter la classe "active" à la diapositive actuelle
        const activeIndex = Math.abs(currentPosition / slideWidth);

        let currentDot = document.querySelector(".dot.active");
        currentDot.classList.remove("active");
        navigationDots.children[activeIndex].classList.add("active");

        slideImage.forEach((item, index) => {
            if (index === activeIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Mettre à jour la position du carrousel avec une transition
        slidesContainer.style.transition = `transform ${transitionDuration}ms ease-out`;
        slidesContainer.style.transform = `translateX(${currentPosition}px)`;

        // Réinitialiser xDown et la transition après la fin du mouvement
        xDown = null;
        slidesContainer.addEventListener('transitionend', () => {
            slidesContainer.style.transition = '';
        }, { once: true });
    }
}

mobileCarrousel();

// Set up the slider

function init() {

    prevBtn.style.display = 'none';

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
        return;
    }
    prevBtn.style.display = 'flex';
    currentSlide++;
    goToSlide(currentSlide);
});

// Prev Button

prevBtn.addEventListener("click", () => {
    if (currentSlide <= 0) {
        return;
    }
    nextBtn.style.display = 'flex';
    currentSlide--;
    goToSlide(currentSlide);
});


// Go To Slide

function goToSlide(slideNumber) {
    if (slideNumber === 0) {
        prevBtn.style.display = 'none';
    } else if (slideNumber === numberOfImages - 1) {
        nextBtn.style.display = 'none';
    }
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
    screenWidth = screen.width;

    isMobileOrTablet = screenWidth <= mobileWidth || screenWidth <= tabletWidth ? true : false;

    mobileCarrousel();

    slidesContainer.style.transform = `translateX(-${slideWidth * currentSlide}px)`;
}