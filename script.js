const texts = [
    "an INDUSTRIAL DESIGNER",
    "a PRODUCT DEVELOPER",
    "an INNOVATOR",
    "an ARTISAN"
];

let speed = 100;
const textElements = document.querySelector(".typewriter-text");
let textIndex = 0;
let charcterIndex = 0;

function typeWriter() {
    if (charcterIndex < texts[textIndex].length) {
        textElements.innerHTML += texts[textIndex].charAt(charcterIndex);
        charcterIndex++;
        setTimeout(typeWriter, speed);
    } else {
        setTimeout(eraseText, 1000);
    }
}

function eraseText() {
    if (textElements.innerHTML.length > 0) {
        textElements.innerHTML = textElements.innerHTML.slice(0, -1);
        setTimeout(eraseText, 50);
    } else {
        textIndex = (textIndex + 1) % texts.length;
        charcterIndex = 0;
        setTimeout(typeWriter, 500);
    }
}

window.onload = typeWriter;

// ==============================
// HAMBURGER MENU
// ==============================
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// ==============================
// SLIDER + POPUP
// ==============================
document.addEventListener("DOMContentLoaded", function () {

    const slider = document.querySelector(".image-list");
    const prevButton = document.getElementById("prev-slide");
    const nextButton = document.getElementById("next-slide");

    const popup = document.getElementById("popup");
    const popupImg = document.getElementById("popup-img");
    const closePopup = document.getElementById("close-popup");

    const scrollStep = 200;

    // HIIREN RULLAUS SLIDERILLE
    slider.addEventListener("wheel", function (event) {
        event.preventDefault();
        if (event.deltaY > 0) {
            slider.scrollLeft += scrollStep;
        } else {
            slider.scrollLeft -= scrollStep;
        }
    });

    // SLIDER NAPIT
    prevButton.addEventListener("click", () => slider.scrollLeft -= scrollStep);
    nextButton.addEventListener("click", () => slider.scrollLeft += scrollStep);

    // POPUP SLIDER-KUVILLE
    const sliderImages = document.querySelectorAll(".image-item");
    sliderImages.forEach(img => {
        img.addEventListener("click", () => {
            popupImg.src = img.src;
            popup.style.display = "flex";
        });
    });

    // POPUP OTHER WORKS -GALLERIALLE
    const galleryImages = document.querySelectorAll('.other-works-section .thumb');
    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            popupImg.src = img.src;
            popup.style.display = 'flex';
        });
    });

    // POPUP SULKEUTUMINEN
    closePopup.addEventListener('click', () => popup.style.display = 'none');
    popup.addEventListener('click', (e) => {
        if (e.target === popup) popup.style.display = 'none';
    });
});

// ==============================
// SLIDER SCROLLBAR SYSTEM
// ==============================
const initSlider = () => {
    const imageList = document.querySelector(".slider-wrapper .image-list");
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
    const sliderScrollbar = document.querySelector(".container .slider-scrollbar");
    if (!sliderScrollbar) return; // jos ei ole slider-scrollbar
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");

    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

    // SCROLLBAR DRAG
    scrollbarThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft;
        const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;

        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;
            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;
            scrollbarThumb.style.left = `${boundedPosition}px`;
            imageList.scrollLeft = scrollPosition;
        }

        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });

    // SLIDE BUTTONS
    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollAmount = 1360;
            imageList.scrollBy({ left: scrollAmount * direction, behavior: "smooth" });
        });
    });

    const handleSlideButtons = () => {
        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
    }

    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;
    }

    imageList.addEventListener("scroll", () => {
        updateScrollThumbPosition();
        handleSlideButtons();
    });
}

// INIT SLIDER
window.addEventListener("resize", initSlider);
window.addEventListener("load", initSlider);
// ==============================
// POPUP SULKEUTUMINEN
// ==============================
const popup = document.getElementById('popup');
const popupImg = document.getElementById('popup-img');
const closePopup = document.getElementById('close-popup');

popupImg.addEventListener('click', () => popup.style.display = 'none');

// Sulkee popup, jos klikataan taustaa
popup.addEventListener('click', (e) => {
    if (e.target === popup) popup.style.display = 'none';
});

// Sulkee popup, jos klikataan itse kuvaa
popupImg.addEventListener('click', () => popup.style.display = 'none');
