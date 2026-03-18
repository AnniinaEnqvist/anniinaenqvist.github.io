// ==============================
// TYPEWRITER EFFECT
// ==============================
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
// DOM LOADED (SLIDER + POPUPS)
// ==============================
document.addEventListener("DOMContentLoaded", function () {

    // ==============================
    // SLIDER
    // ==============================
    const slider = document.querySelector(".slider-wrapper .image-list");
    const prevButton = document.getElementById("prev-slide");
    const nextButton = document.getElementById("next-slide");

    const scrollStep = 200;

    if (slider) {

        slider.addEventListener("wheel", function (event) {
            event.preventDefault();

            if (event.deltaY > 0) {
                slider.scrollLeft += scrollStep;
            } else {
                slider.scrollLeft -= scrollStep;
            }
        });




        const updateButtons = () => {
    const maxScrollLeft = slider.scrollWidth - slider.clientWidth;

    // Piilota vasen nappi alussa
    if (slider.scrollLeft <= 0) {
        prevButton.style.display = "none";
    } else {
        prevButton.style.display = "flex";
    }

    // Piilota oikea nappi lopussa
    if (slider.scrollLeft >= maxScrollLeft - 1) {
        nextButton.style.display = "none";
    } else {
        nextButton.style.display = "flex";
    }
};

// Päivitä scrollatessa
slider.addEventListener("scroll", updateButtons);

// Aseta oikea tila heti alussa
updateButtons();

        prevButton.addEventListener("click", () => slider.scrollLeft -= scrollStep);
        nextButton.addEventListener("click", () => slider.scrollLeft += scrollStep);
    }


    // ==============================
    // SLIDER POPUP
    // ==============================
    const sliderPopup = document.getElementById("slider-popup");
    const sliderPopupImg = document.getElementById("slider-popup-img");
    const closeSliderPopup = document.getElementById("close-slider-popup");

    const sliderImages = document.querySelectorAll(".slider-wrapper .image-item");

    sliderImages.forEach(img => {
        img.addEventListener("click", () => {
            sliderPopupImg.src = img.src;
            sliderPopup.style.display = "flex";
        });
    });

    closeSliderPopup.addEventListener("click", () => {
        sliderPopup.style.display = "none";
    });

    sliderPopup.addEventListener("click", (e) => {
        if (e.target === sliderPopup) {
            sliderPopup.style.display = "none";
        }
    });

    sliderPopupImg.addEventListener("click", () => {
        sliderPopup.style.display = "none";
    });


    // ==============================
    // GALLERY POPUP
    // ==============================
    const galleryPopup = document.getElementById("gallery-popup");
    const galleryPopupImg = document.getElementById("gallery-popup-img");
    const closeGalleryPopup = document.getElementById("close-gallery-popup");

    const galleryImages = document.querySelectorAll(".other-works-section .thumb");

    galleryImages.forEach(img => {
        img.addEventListener("click", () => {

            galleryPopupImg.src = img.src;

            const caption = galleryPopup.querySelector(".gallery-caption");
            if (caption) {
                caption.textContent = img.alt;
            }

            galleryPopup.style.display = "flex";
        });
    });

    closeGalleryPopup.addEventListener("click", () => {
        galleryPopup.style.display = "none";
    });

    galleryPopup.addEventListener("click", (e) => {
        if (e.target === galleryPopup) {
            galleryPopup.style.display = "none";
        }
    });

    galleryPopupImg.addEventListener("click", () => {
        galleryPopup.style.display = "none";
    });
    const galleryPopupLink = document.getElementById("gallery-popup-link");

galleryImages.forEach((img, index) => {
    img.addEventListener("click", () => {
        galleryPopupImg.src = img.src;

        const caption = galleryPopup.querySelector(".gallery-caption");
        if (caption) {
            caption.textContent = img.alt;
        }

        // Näytetään linkki vain ensimmäiselle kuvalle
        if(index === 0){
            galleryPopupLink.style.display = "block";
            galleryPopupLink.href = "https://www.figma.com/proto/yDzcSrA4eXCumpD8D5pqfV/Presentation-merchant---customer?t=1cFdldhhkeRU1N3T-1&scaling=contain&content-scaling=fixed&page-id=0%3A1&node-id=1108-80&starting-point-node-id=1108%3A80"; // haluamasi URL
        } else {
            galleryPopupLink.style.display = "none";
        }

        galleryPopup.style.display = "flex";
    });
});

});








// ==============================
// SLIDER SCROLLBAR
// ==============================
const initSlider = () => {

    const imageList = document.querySelector(".slider-wrapper .image-list");
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
    const sliderScrollbar = document.querySelector(".slider-scrollbar");

    if (!imageList || !sliderScrollbar) return;

    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");

    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

    scrollbarThumb.addEventListener("mousedown", (e) => {

        const startX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft;

        const maxThumbPosition =
            sliderScrollbar.getBoundingClientRect().width -
            scrollbarThumb.offsetWidth;

        const handleMouseMove = (e) => {

            const deltaX = e.clientX - startX;

            const newThumbPosition = thumbPosition + deltaX;

            const boundedPosition =
                Math.max(0, Math.min(maxThumbPosition, newThumbPosition));

            const scrollPosition =
                (boundedPosition / maxThumbPosition) * maxScrollLeft;

            scrollbarThumb.style.left = `${boundedPosition}px`;
            imageList.scrollLeft = scrollPosition;
        };

        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });

    slideButtons.forEach(button => {

        button.addEventListener("click", () => {

            const direction = button.id === "prev-slide" ? -1 : 1;

            const scrollAmount = 1360;

            imageList.scrollBy({
                left: scrollAmount * direction,
                behavior: "smooth"
            });
        });

    });

};

window.addEventListener("load", initSlider);
window.addEventListener("resize", initSlider);