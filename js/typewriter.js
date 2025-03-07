// Typewriter Effect untuk Profile Section
const typingElement = document.querySelector('.typing-effect');
const textToType = "Sulawesi Tengah";
let currentIndex = 0;
let isDeleting = false;

function typeWriter() {
  if (!isDeleting) {
    typingElement.textContent = textToType.substring(0, currentIndex);
    if (currentIndex < textToType.length) {
      currentIndex++;
      setTimeout(typeWriter, 150);
    } else {
      typingElement.textContent = textToType + " ";
      setTimeout(() => { 
        isDeleting = true; 
        typeWriter(); 
      }, 2000);
    }
  } else {
    typingElement.textContent = textToType.substring(0, currentIndex);
    if (currentIndex > 0) {
      currentIndex--;
      setTimeout(typeWriter, 100);
    } else {
      setTimeout(() => { 
        isDeleting = false; 
        typeWriter(); 
      }, 500);
    }
  }
}
typeWriter();
