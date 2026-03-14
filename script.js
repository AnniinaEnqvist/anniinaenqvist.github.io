function cancel(){
    const navbar = document.querySelector(".dropdown")
    navbar.style.transform = "translateY(-500px)"
}

const texts = [
    "an INDUSTRIAL DESIGNER",
    "a PRODUCT DEVELOPER",
    "an INNOVATOR",
    "an ARTISAN"
]

let speed  =100;
const textElements = document.querySelector(".typewriter-text");

let textIndex = 0;
let charcterIndex = 0;

function typeWriter(){
    if (charcterIndex < texts[textIndex].length){
        textElements.innerHTML += texts[textIndex].charAt(charcterIndex);
        charcterIndex++;
        setTimeout(typeWriter, speed); 
    }
    else{
        setTimeout(eraseText, 1000)
    }
}

function eraseText(){
    if(textElements.innerHTML.length > 0){
        textElements.innerHTML = textElements.innerHTML.slice(0,-1);
        setTimeout(eraseText, 50)
    }
    else{
        textIndex = (textIndex + 1) % texts.length;
        charcterIndex = 0;
        setTimeout(typeWriter, 500)
    }
}

window.onload = typeWriter



document.addEventListener("DOMContentLoaded", function () {

    const slider = document.querySelector(".image-list");
    const prevButton = document.getElementById("prev-slide");
    const nextButton = document.getElementById("next-slide");

    const popup = document.getElementById("popup");
    const popupImg = document.getElementById("popup-img");
    const closePopup = document.getElementById("close-popup");

    let scrollAmount = 0;
    const scrollStep = 200;

    // hiiren rullaus sliderille
    slider.addEventListener("wheel", function (event) {
        event.preventDefault();

        if (event.deltaY > 0) {
            slider.scrollLeft += scrollStep;
        } else {
            slider.scrollLeft -= scrollStep;
        }
    });

    // slider napit
    prevButton.addEventListener("click", function () {
        slider.scrollLeft -= scrollStep;
    });

    nextButton.addEventListener("click", function () {
        slider.scrollLeft += scrollStep;
    });

    // popup kuville
    const images = document.querySelectorAll(".image-item");

    images.forEach(img => {
        img.addEventListener("click", function () {
            popup.style.display = "flex";
            popupImg.src = this.src;
        });
    });

    const closePopupFunction = () => {
        popup.style.display = "none";
    }

    closePopup.addEventListener("click", closePopupFunction);
    popup.addEventListener("click", closePopupFunction);
    popupImg.addEventListener("click", closePopupFunction);

});



// ==============================
// SLIDER SCROLLBAR SYSTEM
// ==============================

const initSlider = () => {

    const imageList = document.querySelector(".slider-wrapper .image-list");
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
    const sliderScrollbar = document.querySelector(".container .slider-scrollbar");
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
        }

        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }

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

    const handleSlideButtons = () => {

        slideButtons[0].style.display =
        imageList.scrollLeft <= 0 ? "none" : "flex";

        slideButtons[1].style.display =
        imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";

    }

    const updateScrollThumbPosition = () => {

        const scrollPosition = imageList.scrollLeft;

        const thumbPosition =
        (scrollPosition / maxScrollLeft) *
        (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);

        scrollbarThumb.style.left = `${thumbPosition}px`;
    }

    imageList.addEventListener("scroll", () => {
        updateScrollThumbPosition();
        handleSlideButtons();
    });

}

function openPopup(src){
  const popup = document.getElementById("popup");
  const img = document.getElementById("popup-img");

  img.src = src;
  popup.style.display = "flex";
}

function closePopup(){
  document.getElementById("popup").style.display = "none";
}
// slider init
window.addEventListener("resize", initSlider);
window.addEventListener("load", initSlider);
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});
const popup = document.querySelector('.popup');
const popupImg = popup.querySelector('img');
const closeBtn = popup.querySelector('.close-btn');
const popupText = popup.querySelector('.popup-text');

const galleryImages = document.querySelectorAll('.gallery img');

galleryImages.forEach((img, index) => {
  img.addEventListener('click', () => {
    popup.style.display = 'flex';
    popupImg.src = img.src;

    // Näytetään ja tehdään klikattavaksi vain ensimmäisen kuvan teksti
    if(index === 0){
      popupText.style.display = 'block';
      popupText.onclick = () => {
        window.location.href = "https://www.figma.com/proto/yDzcSrA4eXCumpD8D5pqfV/Presentation-merchant---customer?node-id=1027-2&p=f&t=uxmohfnwgdvqdD6b-1&scaling=contain&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1108%3A80"; // korvaa haluamallasi linkillä
      }
    } else {
      popupText.style.display = 'none';
      popupText.onclick = null;
    }
  });
});

// Sulje popup kun klikataan close-nappia tai muuta kuin tekstiä
closeBtn.addEventListener('click', () => popup.style.display = 'none');
popup.addEventListener('click', (e) => {
  if(e.target === popup) popup.style.display = 'none';
});