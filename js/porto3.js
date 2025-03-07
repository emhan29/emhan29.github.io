document.addEventListener('DOMContentLoaded', function() {
  /* ===========================
     MODIF 1: Modal dan Navbar
  =========================== */
  // Fungsi untuk menutup semua modal
  function closeAllModals() {
    document.querySelectorAll('.box, .keahlian-box').forEach(b => b.classList.remove('active'));
    document.body.classList.remove('modal-active');
  }

  const toggleBtn = document.getElementById('toggleBtn');
  const navbar = document.getElementById('navbar');

  if (toggleBtn && navbar) {
    // Toggle navbar saat tombol diklik
    toggleBtn.addEventListener('click', function(e) {
      e.preventDefault();
      navbar.classList.toggle('open');
    });

    // Menutup navbar saat mouse meninggalkan area navbar
    navbar.addEventListener('mouseleave', function() {
      navbar.classList.remove('open');
    });
  }

  // Event untuk tombol close di modal
  const closeButtons = document.querySelectorAll('.close-btn');
  closeButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      this.parentElement.classList.remove('active');
      document.body.classList.remove('modal-active');
    });
  });

  // Pemetaan ID link dengan modal yang sesuai
  const modalMap = {
    'minat-link': 'minat-modal',
    'pendidikan-link': 'pendidikan-modal',
    'pengalaman-link': 'pengalaman-modal',
    'skill-link': 'skill-modal',
    'sertifikat-link': 'sertifikat-modal'
  };

  // Event listener untuk membuka modal yang sesuai saat link diklik
  Object.keys(modalMap).forEach(linkId => {
    const link = document.getElementById(linkId);
    if (link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        closeAllModals();
        document.getElementById(modalMap[linkId]).classList.add('active');
        document.body.classList.add('modal-active');
      });
    }
  });

  // Menutup modal saat klik di luar modal
  const modalBoxes = document.querySelectorAll('.box, .keahlian-box');
  modalBoxes.forEach(box => {
    box.addEventListener('click', function() {
      modalBoxes.forEach(b => { if (b !== this) b.classList.remove('active'); });
      this.classList.toggle('active');
      document.body.classList.toggle('modal-active', this.classList.contains('active'));
    });
  });

  /* ===========================
     MODIF 3: Popup Menu
  =========================== */
  const popupTrigger = document.getElementById('popup-trigger');
  const popupMenu = document.getElementById('popup-menu');
  const popupHome = document.getElementById('popup-home');
  const popupChangeTheme = document.getElementById('popup-change-theme');
  const themePopup = document.getElementById('theme-popup');

  if (popupTrigger && popupMenu) {
    popupTrigger.addEventListener('click', function(e) {
      e.preventDefault();
      popupMenu.style.display = 'flex';
    });

    popupMenu.addEventListener('click', function(e) {
      if (e.target === popupMenu) popupMenu.style.display = 'none';
    });
  }

  if (popupHome) {
    popupHome.addEventListener('click', function(e) {
      e.preventDefault();
      window.location.href = '../index.html?target=tema3';
    });
  }

  if (popupChangeTheme && themePopup) {
    popupChangeTheme.addEventListener('click', function(e) {
      e.preventDefault();
      popupMenu.style.display = 'none';
      themePopup.style.display = 'flex';
    });

    themePopup.addEventListener('click', function(e) {
      if (e.target === themePopup) themePopup.style.display = 'none';
    });
  }

  /* ===========================
     MODIF 3.1: Popup Kedua
  =========================== */
  const secondPopupTrigger = document.getElementById('second-popup-trigger');
  const secondPopupMenu = document.getElementById('second-popup-menu');
  const secondPopupClose = document.getElementById('second-popup-close');

  if (secondPopupTrigger && secondPopupMenu) {
    secondPopupTrigger.addEventListener('click', function(e) {
      e.preventDefault();
      secondPopupMenu.style.display = 'flex';
    });

    if (secondPopupClose) {
      secondPopupClose.addEventListener('click', function(e) {
        e.preventDefault();
        secondPopupMenu.style.display = 'none';
      });
    }

    secondPopupMenu.addEventListener('click', function(e) {
      if (e.target === secondPopupMenu) secondPopupMenu.style.display = 'none';
    });
  }

  /* ===========================
     MODIF 4: SLIDER DENGAN DRAG/SWIPE & TOMBOL PANAH
  =========================== */
  const slidesContainer = document.querySelector('#pengalaman-modal .slides');
  const slides = document.querySelectorAll('#pengalaman-modal .slide');
  const dots = document.querySelectorAll('#pengalaman-modal .slider-indicators .dot');
  // Tombol panah
  const prevButton = document.querySelector('#pengalaman-modal .slider-prev');
  const nextButton = document.querySelector('#pengalaman-modal .slider-next');

  if (slidesContainer && slides.length > 0) {
    let index = 0;
    let autoSlideInterval = null; // Variabel untuk interval auto slide

    // Fungsi untuk mengubah posisi slider dan update dot indikator
    function updateSlider() {
      slidesContainer.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    }

    updateSlider();

    // Event klik pada dot untuk berpindah slide
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        index = i;
        updateSlider();
      });
    });

    // Fungsi untuk memulai auto slide
    function startAutoSlide() {
      if (autoSlideInterval) return; // Hindari interval ganda
      autoSlideInterval = setInterval(() => {
        index = (index + 1) % slides.length;
        updateSlider();
      }, 3000);
    }

    // Fungsi untuk menghentikan auto slide
    function stopAutoSlide() {
      if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
      }
    }

    // Mulai auto slide sejak awal
    startAutoSlide();

    // Event untuk tombol panah kiri & kanan
    if (prevButton && nextButton) {
      prevButton.addEventListener('click', () => {
        stopAutoSlide();
        index = (index - 1 + slides.length) % slides.length;
        updateSlider();
        startAutoSlide();
      });

      nextButton.addEventListener('click', () => {
        stopAutoSlide();
        index = (index + 1) % slides.length;
        updateSlider();
        startAutoSlide();
      });
    }

    // Variabel dan fungsi untuk drag/swipe
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;

    function getPositionX(e) {
      return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    }

    function dragStart(e) {
      isDragging = true;
      startPos = getPositionX(e);
      stopAutoSlide(); // Hentikan auto slide saat interaksi dimulai
    }

    function dragMove(e) {
      if (!isDragging) return;
      const currentPosition = getPositionX(e);
      currentTranslate = prevTranslate + (currentPosition - startPos);
      slidesContainer.style.transform = `translateX(${currentTranslate}px)`;
    }

    function dragEnd() {
      if (!isDragging) return; // Pastikan hanya dijalankan saat sedang drag
      isDragging = false;
      // Update slider (bisa ditambahkan logika untuk snap ke slide terdekat)
      updateSlider();
      prevTranslate = -index * slidesContainer.clientWidth;
      startAutoSlide(); // Mulai kembali auto slide setelah drag selesai
    }

    // Event listener untuk drag/swipe
    slidesContainer.addEventListener('mousedown', dragStart);
    slidesContainer.addEventListener('mousemove', dragMove);
    slidesContainer.addEventListener('mouseup', dragEnd);
    slidesContainer.addEventListener('touchstart', dragStart);
    slidesContainer.addEventListener('touchmove', dragMove);
    slidesContainer.addEventListener('touchend', dragEnd);

    // Event listener tambahan: saat kursor keluar dari area slider,
    // jika tidak sedang drag, maka auto slide akan dijalankan kembali
    slidesContainer.addEventListener('mouseleave', () => {
      if (!isDragging) {
        startAutoSlide();
      }
    });
  }
});
