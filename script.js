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

  document.addEventListener("click", function (event) {
    if (event.target.hasAttribute("data-theme")) {
      const themeFile = event.target.getAttribute("data-theme");
      const themeButtons = document.querySelectorAll("[data-theme]");
      themeButtons.forEach((btn) => btn.classList.remove("active-theme"));
      event.target.classList.add("active-theme");
      document.getElementById("themeStylesheet").setAttribute("href", themeFile);
    }
  });
