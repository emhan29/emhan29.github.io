// --- Top Bar Expand/Collapse ---
const topBar = document.getElementById('topBar');
function expandTopBar() {
  if (topBar.classList.contains('collapsed')) {
    topBar.classList.remove('collapsed');
  }
}
topBar.addEventListener('mouseleave', () => {
  topBar.classList.add('collapsed');
});

// --- Fungsi Home & Back ---
function goHome() {
  window.location.href = 'index.html';
}
function goBack() {
  window.history.back();
}

// --- Fungsi Download PDF ---
function downloadPDF() {
  window.location.href = 'your-file.pdf';
}

// --- Popup Login: Tampilkan saat halaman dimuat ---
window.addEventListener('load', () => {
  document.getElementById('overlay').style.display = 'block';
  document.getElementById('loginPopup').style.display = 'block';
  // Pastikan kolom Username kosong saat refresh
  document.getElementById('loginForm').elements[0].value = '';
});

// --- Popup Error (untuk password salah) ---
function showError() {
  document.getElementById('errorPopup').style.display = 'block';
}
function closeError() {
  document.getElementById('errorPopup').style.display = 'none';
}

// --- Form Login ---
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const password = this.elements[1].value;
    // Validasi sederhana: password harus '1234'
    if (password === '1234') {
      alert('Login berhasil!');
      document.getElementById('overlay').style.display = 'none';
      document.getElementById('loginPopup').style.display = 'none';
    } else {
      showError();
    }
  });

  // --- Popup Lock: Tampilkan saat ikon kunci diklik ---
  const lockIcon = document.getElementById('lockIcon');
  const lockPopup = document.getElementById('lockPopup');
  lockIcon.addEventListener('click', (event) => {
    event.stopPropagation();
    lockPopup.style.display = 'block';
  });
  function closeLockPopup() {
    lockPopup.style.display = 'none';
  }
  document.addEventListener('click', function (e) {
    if (lockPopup.style.display === 'block' && !lockPopup.contains(e.target) && e.target !== lockIcon) {
      lockPopup.style.display = 'none';
    }
  });

  // --- Slider di dalam Popup Login (6 gambar PNG) ---
  let slideIndex = 0;
  const slides = document.querySelectorAll('.slider-container .slide');

  function showSlides() {
    slides.forEach((slide, idx) => {
      slide.style.display = idx === slideIndex ? 'block' : 'none';
    });
  }

  function nextSlide() {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlides();
  }

  function prevSlide() {
    slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    showSlides();
  }

  // Otomatis slide setiap 3 detik (opsional)
  setInterval(() => {
    nextSlide();
  }, 3000);

  // Tampilkan slide pertama saat load
  showSlides();
});
