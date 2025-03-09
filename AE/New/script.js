document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".image-list");
    const prevButton = document.getElementById("prev-slide");
    const nextButton = document.getElementById("next-slide");
    const popup = document.getElementById("popup");
    const popupImg = document.getElementById("popup-img");
    const closePopup = document.getElementById("close-popup");
    const goToWebsite = document.getElementById('goToWebsite');

      // Show popup when image is clicked
  images.forEach((image, index) => {
    image.addEventListener('click', function() {
      popup.style.display = 'block';
      popupImg.src = image.src;
      
      // Show link only for the 13th image
      if (index === 12) {
        goToWebsite.style.display = 'block';
      } else {
        goToWebsite.style.display = 'none';
      }
    });

    
  });

    let scrollAmount = 0;
    const scrollStep = 200; // Kuinka paljon kuvia siirretään per scroll

    // Hiiren rullauksen lisäys
    slider.addEventListener("wheel", function (event) {
        event.preventDefault(); // Estetään sivun vieritys
        if (event.deltaY > 0) {
            slider.scrollLeft += scrollStep; // Rullaus alaspäin → oikealle
        } else {
            slider.scrollLeft -= scrollStep; // Rullaus ylöspäin → vasemmalle
        }
    });

    // Napit sliderin siirtämiseen
    prevButton.addEventListener("click", function () {
        slider.scrollLeft -= scrollStep;
    });

    nextButton.addEventListener("click", function () {
        slider.scrollLeft += scrollStep;
    });
});
// Get elements
const images = document.querySelectorAll(".slider-wrapper .image-item");
const popup = document.getElementById("popup");
const popupImg = document.getElementById("popup-img");
const closePopup = document.getElementById("close-popup");

// Function to open the popup with the clicked image
const openPopup = (src) => {
  popup.style.display = "flex"; // Show the popup
  popupImg.src = src; // Set the image source to the clicked image
};

// Function to close the popup
const closePopupHandler = () => {
  popup.style.display = "none"; // Hide the popup
};

// Add event listener to each image to open the popup
images.forEach(image => {
  image.addEventListener("click", (event) => {
    openPopup(event.target.src); // Get the clicked image's source
  });
});

// Close the popup when clicking on the close button
closePopup.addEventListener("click", closePopupHandler);

// Close the popup when clicking anywhere outside the image
popup.addEventListener("click", (e) => {
  if (e.target === popup) {
    closePopupHandler();
  }
});

// Initialize the slider (for proper image positioning during drag or scroll)
const initSlider = () => {
    const imageList = document.querySelector(".slider-wrapper .image-list");
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
    const sliderScrollbar = document.querySelector(".container .slider-scrollbar");
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
    
    // Handle scrollbar thumb drag
    scrollbarThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft;
        const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;
        
        // Update thumb position on mouse move
        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;

            // Ensure the scrollbar thumb stays within bounds
            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;
            
            scrollbarThumb.style.left = `${boundedPosition}px`;
            imageList.scrollLeft = scrollPosition;
        }

        // Remove event listeners on mouse up
        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }

        // Add event listeners for drag interaction
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });

    slideButtons.forEach(button => {
      button.addEventListener("click", () => {
          const direction = button.id === "prev-slide" ? -1 : 1;
          const scrollAmount = 1360; // Siirtää 100 pikseliä per klikkaus
          imageList.scrollBy({ left: scrollAmount * direction, behavior: "smooth" });
      });
  });
     // Show or hide slide buttons based on scroll position
    const handleSlideButtons = () => {
        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
    }

    // Update scrollbar thumb position based on image scroll
    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;
    }

    // Call these two functions when image list scrolls
    imageList.addEventListener("scroll", () => {
        updateScrollThumbPosition();
        handleSlideButtons();
    });
 // Klikattavan kuvan avaaminen popup-ikkunaan
 document.querySelectorAll(".image-item").forEach((img) => {
    img.addEventListener("click", function () {
        popup.style.display = "flex";
        popupImg.src = this.src;
    });
});

// Popup-ikkunan sulkeminen
const closePopupFunction = () => (popup.style.display = "none");

closePopup.addEventListener("click", closePopupFunction); // Sulkunappi
popup.addEventListener("click", closePopupFunction); // Taustan klikkaus
popupImg.addEventListener("click", closePopupFunction); // Kuvan klikkaus
};





// Initialize the slider when the page is loaded
window.addEventListener("resize", initSlider);
window.addEventListener("load", initSlider);