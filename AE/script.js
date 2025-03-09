// Get the modal elements
var modal1 = document.getElementById("myModal1");
var modal2 = document.getElementById("myModal2");

// Get the buttons that open the modals
var modalTrigger1 = document.getElementById("modalTrigger1");
var modalTrigger2 = document.getElementById("modalTrigger2");

// Get the <span> elements that close the modals
var close1 = document.getElementsByClassName("close1")[0];
var close2 = document.getElementsByClassName("close2")[0];

// When the user clicks on the first link, open Modal 1
modalTrigger1.onclick = function() {
  modal1.style.display = "block";
}

// When the user clicks on the second link, open Modal 2
modalTrigger2.onclick = function() {
  modal2.style.display = "block";
}

// When the user clicks on <span> (x), close Modal 1
close1.onclick = function() {
  modal1.style.display = "none";
}

// When the user clicks on <span> (x), close Modal 2
close2.onclick = function() {
  modal2.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close the respective modal
window.onclick = function(event) {
  if (event.target == modal1) {
    modal1.style.display = "none";
  } else if (event.target == modal2) {
    modal2.style.display = "none";
  }
}
modalTrigger1.onclick = function() {
    modal1.style.display = "block";
    modal2.style.display = "none"; // Close Modal 2 when opening Modal 1
  }
  
  modalTrigger2.onclick = function() {
    modal2.style.display = "block";
    modal1.style.display = "none"; // Close Modal 1 when opening Modal 2
  }