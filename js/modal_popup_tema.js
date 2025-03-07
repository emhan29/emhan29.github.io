
    // Modal Popup Initialization
    const skillsPopup = document.getElementById('skillsPopup');
    const contactPopup = document.getElementById('contactPopup');
    const menuPopup = document.getElementById('menu');
    
    document.getElementById('closeSkillsPopup').addEventListener('click', () => {
      skillsPopup.style.display = 'none';
    });
    document.getElementById('closeContactPopup').addEventListener('click', () => {
      contactPopup.style.display = 'none';
    });
    document.getElementById('closemenuPopup').addEventListener('click', () => {
      menuPopup.style.display = 'none';
    });
    
    // Desktop Menu Interaction (selalu aktif)
    const desktopMenu = document.querySelector('.desktop-menu');
    const homeLink = desktopMenu.querySelector('li[data-popup="home"] a');
    homeLink.addEventListener("click", function(e) {
      desktopMenu.classList.remove("collapsed");
    });
    
    const desktopItems = document.querySelectorAll('.desktop-menu li[data-popup]');
    desktopItems.forEach(item => {
      const dataPopup = item.getAttribute('data-popup');
      if (dataPopup === "home" || dataPopup === "portfolio") return;
      item.addEventListener('click', function(e) {
        e.stopPropagation();
        if (dataPopup === "skills") {
          skillsPopup.style.display = 'flex';
        } else if (dataPopup === "contact") {
          contactPopup.style.display = 'flex';
        } else if (dataPopup === "menu") {
          menuPopup.style.display = 'flex';
        }
      });
    });
    
    // Global Modal Popup Closing
    document.addEventListener('click', function(e) {
      if (skillsPopup.style.display === 'flex' && !skillsPopup.contains(e.target)) {
        skillsPopup.style.display = 'none';
      }
      if (contactPopup.style.display === 'flex' && !contactPopup.contains(e.target)) {
        contactPopup.style.display = 'none';
      }
      if (menuPopup.style.display === 'flex' && !menuPopup.contains(e.target)) {
        menuPopup.style.display = 'none';
      }
    });