// Cek apakah elemen menu desktop tersedia
const desktopMenu = document.querySelector('.desktop-menu');
if (desktopMenu) {
  const homeLink = desktopMenu.querySelector('li[data-popup="home"] a');
  
  if (homeLink) {
    homeLink.addEventListener("click", function(e) {
      desktopMenu.classList.remove("collapsed");
    });
  }

  const desktopItems = document.querySelectorAll('.desktop-menu li[data-popup]');
  desktopItems.forEach(item => {
    const dataPopup = item.getAttribute('data-popup');
    
    if (dataPopup !== "home" && dataPopup !== "portfolio") {
      item.addEventListener('click', function(e) {
        e.stopPropagation();

        // Pastikan elemen popup tersedia sebelum digunakan
        const skillsPopup = document.getElementById('skills-popup');
        const contactPopup = document.getElementById('contact-popup');
        const menuPopup = document.getElementById('menu-popup');

        if (dataPopup === "skills" && skillsPopup) {
          skillsPopup.style.display = 'flex';
        } else if (dataPopup === "contact" && contactPopup) {
          contactPopup.style.display = 'flex';
        } else if (dataPopup === "menu" && menuPopup) {
          menuPopup.style.display = 'flex';
        }
      });
    }
  });
}
